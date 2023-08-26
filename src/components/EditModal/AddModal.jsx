import React, { useEffect, useState } from "react";

import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Input,
	Flex,
	Text,
	Select,
	Stack,
} from "@chakra-ui/react";
import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { firestore } from "../../firebase/clientApp";
import { doc, getDoc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";

const initialItemDetails = {
	categoryName: "",
	itemName: "",
	itemQuantity: "",
	itemPrice: "",
};

function AddModal({ isOpen, onClose, data, setMenuData }) {
	const [itemDetails, setItemDetails] = useState(initialItemDetails); //To manage changes in the input fields
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [addStatus, setAddStatus] = useState(false);
	const [categories, setCategories] = useState([]);
	const [newCategoryAdd, setNewCategoryAdd] = useState(false);

	const handleChange = (e) => {
		setItemDetails({
			...itemDetails,
			[e.target.name]: e.target.value,
		});
	};

	const addItem = async ({
		itemName,
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
				itemPrice: itemPrice,
				itemQuantity: itemQuantity,
				categoryName: categoryName,
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
					img: "flour.png",
				});
			} else {
				updatedCategory = {
					categoryName: categoryName,
					categoryData: [item],
					img: "product.png",
				};
				await setDoc(menuDataDocRef, updatedCategory);
			}

			const updatedData = data;

			//because the indexing will remain identical, I used categories.
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
		}
	};

	const saveItem = async () => {
		for (const [key, value] of Object.entries(itemDetails)) {
			if (!value) {
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

	useEffect(() => {
		const arr = data.map((each) => each.categoryName);
		setCategories([...arr]);
	}, [data]);

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				closeOnOverlayClick={false}
				size="xs"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Item</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
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
					</ModalBody>

					<ModalFooter>
						<Button mr={3} variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button
							colorScheme={addStatus ? "green" : "red"}
							onClick={saveItem}
							isLoading={loading}
						>
							{addStatus ? "Added 😄" : "Add Item"}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default AddModal;
