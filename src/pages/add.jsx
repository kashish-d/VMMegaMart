import { ChevronDownIcon, ChevronLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Input,
	Menu,
	MenuButton,
	MenuGroup,
	MenuItem,
	MenuList,
	Spinner,
	Stack,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/clientApp";
import {
	doc,
	getDoc,
	setDoc,
	arrayUnion,
	updateDoc,
	query,
	collection,
	getDocs,
} from "firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuDataState } from "../atoms/menuDatatAtom";
import { authState } from "../atoms/authAtom";

const initialItemDetails = {
	categoryName: "",
	itemName: "",
	itemDescription: "",
	itemQuantity: "",
	itemPrice: "",
};

function Add() {
	const { userStatus, userLoading } = useRecoilValue(authState);
	const [menuData, setMenuData] = useRecoilState(menuDataState);
	const [itemDetails, setItemDetails] = useState(initialItemDetails); //To manage changes in the input fields
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [addStatus, setAddStatus] = useState(false);
	const [categories, setCategories] = useState([]);
	const [newCategoryAdd, setNewCategoryAdd] = useState(false);
	const [menuDataLoading, setMenuDataLoading] = useState(false);

	const handleChange = (e) => {
		setItemDetails({
			...itemDetails,
			[e.target.name]: e.target.value,
		});
	};

	const addItem = async ({
		itemName,
		itemDescription,
		itemPrice,
		itemQuantity,
		categoryName,
	}) => {
		setError(false);
		try {
			const menuDataDocRef = doc(firestore, "menuData", categoryName);
			const menuDataDoc = await getDoc(menuDataDocRef);

			const item = {
				itemName: itemName,
				itemDescription: itemDescription,
				itemPrice: itemPrice,
				itemQuantity: itemQuantity,
				category: categoryName,
			};
			let updatedCategory;

			//Checking if category already exists
			if (menuDataDoc.exists()) {
				//For managing state
				updatedCategory = menuDataDoc.data();
				updatedCategory.categoryData.push(item);

				//For adding in database
				await updateDoc(menuDataDocRef, {
					categoryName: categoryName,
					categoryData: arrayUnion(item),
					img: updatedCategory.img,
				});
			} else {
				updatedCategory = {
					categoryName: categoryName,
					categoryData: [item],
					img: "product.png",
				};
				await setDoc(menuDataDocRef, updatedCategory);
			}

			const updatedData = JSON.parse(JSON.stringify(menuData)); //Deep copy;

			//because the indexing will remain identical
			let cIndex = categories.findIndex((cName) => cName === categoryName);
			if (cIndex < 0) {
				cIndex = categories.length;

				//Because I am updating data essentially coming from parent component, the useEffect does
				//this part for me so I dont have to
				// setCategories((prev) => [...prev, categoryName]);
			}
			updatedData[cIndex] = updatedCategory;
			setMenuData([...updatedData]);
		} catch (err) {
			console.log("AddItemError", err);
			setError(true);
		}
	};

	const saveItem = async () => {
		for (const [key, value] of Object.entries(itemDetails)) {
			if (!value && key != "itemDescription") {
				alert(`${key} required`);
				return;
			}
		}
		setLoading(true);
		await addItem(itemDetails);
		setLoading(false);
		setItemDetails(initialItemDetails);
		if (!error) {
			setAddStatus(true);
			setTimeout(() => setAddStatus(false), 5000);
		}
		setNewCategoryAdd(false);
	};

	const handleAddCategory = async () => {
		if (newCategoryAdd) {
			setNewCategoryAdd(false);
			itemDetails.categoryName = "";
		} else {
			setNewCategoryAdd(true);
			itemDetails.categoryName = "";
		}
	};

	const fetchMenuData = async () => {
		setMenuDataLoading(true);
		setError(false);
		try {
			const dataQuery = query(collection(firestore, "menuData"));
			const dataDocs = await getDocs(dataQuery);
			const data = dataDocs.docs.map((doc) => ({ ...doc.data() }));
			setMenuData([...data]);
		} catch (err) {
			console.log("fetchMenuDataError", err);
			setError(true);
		}
		setMenuDataLoading(false);
	};

	useEffect(() => {
		if (menuData.length < 1) {
			console.log("I am running here at add page");
			fetchMenuData();
		} else {
			setMenuDataLoading(false);
		}
		const arr = menuData.map((each) => each.categoryName);
		setCategories([...arr]);
	}, [menuData]);

	return (
		<>
			{userStatus ? (
				<>
					<Flex pt={3}>
						<Link href="/admin">
							<ChevronLeftIcon />
							<Button variant="link">Back to dashboard</Button>
						</Link>
					</Flex>
					<Stack m={4} mx={7}>
						<Box>
							<Flex align="center" justify="center" my={5}></Flex>
							<Flex align="center" justify="space-between" my={3}>
								<Heading fontSize={23}>Add Item</Heading>
							</Flex>
						</Box>

						<Flex flexDirection="column" gap={5}>
							<Flex fontSize={14} flexDirection="column">
								<Text m={1} color="brand.200">
									Category Name
								</Text>
								<Flex gap={2}>
									<Menu placement="bottom" width="85%">
										<MenuButton
											isDisabled={newCategoryAdd ? true : false}
											width="100%"
											as={Button}
											rightIcon={<ChevronDownIcon />}
											borderRadius="0.375rem"
										>
											<Text align="left" fontSize={14} fontWeight={500}>
												{itemDetails.categoryName}
											</Text>
										</MenuButton>
										<MenuList>
											<MenuGroup
												type="radio"
												value={itemDetails.categoryName}
												colorScheme="brand.100"
											>
												{categories && categories.length > 0 ? (
													categories.map((each, index) => (
														<MenuItem
															key={index}
															name="categoryName"
															value={each}
															onClick={handleChange}
															_focus={{
																bg: "white",
															}}
														>
															{each}
														</MenuItem>
													))
												) : menuDataLoading ? (
													<Spinner />
												) : (
													<Flex justify="center" align="center">
														{"No Categories added"}
													</Flex>
												)}
											</MenuGroup>
										</MenuList>
									</Menu>
									<Button
										borderRadius="6px"
										bg={newCategoryAdd ? "red" : "brand.100"}
										color="white"
										_hover={{ bg: "brand.100" }}
										onClick={handleAddCategory}
									>
										<Text
											transform={
												newCategoryAdd ? "rotate(45deg)" : "rotate(0deg)"
											}
										>
											+
										</Text>
									</Button>
								</Flex>
							</Flex>
							{newCategoryAdd && (
								<Flex fontSize={12} flexDirection="column">
									<Text m={1} color="brand.200">
										Category Name
									</Text>
									<Input
										variant="filled"
										focusBorderColor="brand.100"
										value={itemDetails.categoryName}
										name="categoryName"
										onChange={handleChange}
									/>
								</Flex>
							)}
							<Flex fontSize={12} flexDirection="column">
								<Text m={1} color="brand.200">
									Item Name
								</Text>
								<Input
									variant="filled"
									focusBorderColor="brand.100"
									value={itemDetails.itemName}
									name="itemName"
									onChange={handleChange}
								/>
							</Flex>
							<Flex fontSize={12} flexDirection="column">
								<Text m={1} color="brand.200">
									Item Description
								</Text>
								<Input
									variant="filled"
									focusBorderColor="brand.100"
									value={itemDetails.itemDescription}
									name="itemDescription"
									onChange={handleChange}
								/>
							</Flex>
							<Flex fontSize={12} flexDirection="column">
								<Text m={1} color="brand.200">
									Item Quantity
								</Text>
								<Input
									variant="filled"
									focusBorderColor="brand.100"
									value={itemDetails.itemQuantity}
									name="itemQuantity"
									onChange={handleChange}
								/>
							</Flex>
							<Flex fontSize={12} flexDirection="column">
								<Text m={1} color="brand.200">
									Item Price
								</Text>
								<Input
									variant="filled"
									focusBorderColor="brand.100"
									value={itemDetails.itemPrice}
									name="itemPrice"
									onChange={handleChange}
								/>
							</Flex>
						</Flex>
						<Flex align="center" py={4} justify="flex-end" gap={3} mt={2}>
							<Button variant="outline" onClick={() => router.back()}>
								Cancel
							</Button>
							<Button
								colorScheme={addStatus ? "green" : "red"}
								onClick={saveItem}
								isLoading={loading}
							>
								{addStatus ? "Added 😄" : "Add Item"}
							</Button>
						</Flex>
					</Stack>
				</>
			) : (
				<Flex
					justify="center"
					align="center"
					flexDirection="column"
					m={10}
					gap={5}
				>
					<Image src="images/notAllowed.png" alt="" height="50vmin" />
					<Flex justify="center" align="center" direction="column">
						<Text color="red" fontWeight={600} fontSize={15} align="center">
							{userLoading ? "Loading..." : "Only for admins, Login required!"}
						</Text>
						{userLoading ? (
							<Spinner />
						) : (
							<Link href="/">
								<Button m={3}>Go Home</Button>
							</Link>
						)}
					</Flex>
				</Flex>
			)}
		</>
	);
}

export default Add;
