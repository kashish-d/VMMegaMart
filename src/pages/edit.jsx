import { useEffect, useState } from "react";

import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Input,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";

import { ChevronLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuDataState } from "../atoms/menuDatatAtom";
import { selectedItemState } from "../atoms/selectedItemAtom";
import Link from "next/link";
import { authState } from "../atoms/authAtom";

const initialItem = {
	itemName: "",
	itemDescription: "",
	itemPrice: "",
	itemQuantity: "",
	category: "",
	itemIndex: 0,
};

function Edit() {
	const { userStatus, userLoading } = useRecoilValue(authState);
	const [menuData, setMenuData] = useRecoilState(menuDataState);
	const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
	const [itemDetails, setItemDetails] = useState(initialItem); //To manage changes in the input fields
	const [isChanged, setIsChanged] = useState(false);
	const [error, setError] = useState(false);
	const [editLoading, setEditLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [editStatus, setEditStatus] = useState(false);
	const router = useRouter();
	const toast = useToast();

	const handleChange = (e) => {
		setItemDetails({
			...itemDetails,
			[e.target.name]: e.target.value,
		});
		if (selectedItem[e.target.name] != e.target.value) {
			setIsChanged(true);
		}
	};
	const deleteItem = async ({ category, itemIndex }) => {
		setError(false);
		try {
			const menuDataDocRef = doc(firestore, "menuData", category);

			const updatedData = JSON.parse(JSON.stringify(menuData)); //Deep Copy

			const categoryIndex = updatedData.findIndex(
				(each) => each.categoryName === category
			);
			let updatedCategory = updatedData[categoryIndex];
			let updatedCategoryData = updatedCategory.categoryData;

			//Directly assigning updatingCategoryData to this causes it to lose its reference to the
			//updatedCategory and just gets re-assigned to the new array formed by filter as a standalone
			updatedCategory.categoryData = updatedCategoryData.filter(
				(each, index) => index != itemIndex
			);

			await setDoc(menuDataDocRef, {
				categoryName: category,
				categoryData: updatedCategory.categoryData,
				img: updatedCategory.img,
			});

			updatedData[categoryIndex] = updatedCategory;
			setMenuData([...updatedData]);
		} catch (err) {
			console.log("DeleteItemError", err);
			setError(true);
		}
	};
	const EditItem = async ({
		itemName,
		itemPrice,
		itemQuantity,
		itemDescription,
		itemIndex,
		category,
	}) => {
		setError(false);
		try {
			const menuDataDocRef = doc(firestore, "menuData", category);
			const updatedItem = {
				itemName,
				itemDescription,
				itemQuantity,
				itemPrice,
				category,
			};

			const updatedData = JSON.parse(JSON.stringify(menuData)); //Deep copy
			const categoryIndex = updatedData.findIndex(
				(each) => each.categoryName === category
			);
			const updatedCategory = updatedData[categoryIndex];
			const updatedCategoryData = updatedCategory.categoryData;
			updatedCategoryData[itemIndex] = updatedItem;

			await setDoc(menuDataDocRef, {
				categoryName: category,
				categoryData: updatedCategoryData,
				img: updatedCategory.img,
			});

			updatedData[categoryIndex] = updatedCategory;
			setMenuData([...updatedData]);
		} catch (err) {
			console.log("EditItemError", err);
			setError(true);
		}
	};

	const handleSaveChanges = async () => {
		setEditStatus(false);
		setEditLoading(true);
		await EditItem(itemDetails);
		setEditLoading(false);
		setEditStatus(true);
		setTimeout(() => setEditStatus(false), 3000);
		setIsChanged(false);
	};
	const handleDeleteItem = async () => {
		if (confirm("Are you sure you want to delete this item PERMANENTLY?")) {
			setDeleteLoading(true);
			await deleteItem(itemDetails);
			setDeleteLoading(false);
			router.push("/admin");
			toast({
				// title: "Item Deleted",
				description: "Item deleted successfully!",
				status: "success",
				duration: 4000,
				isClosable: true,
				// position: "top",
			});
		}
	};

	useEffect(() => {
		setItemDetails({ ...selectedItem }); //Setting the already set values of the item being editted
		setIsChanged(false);
	}, [selectedItem]);

	if (!selectedItem.itemName) {
		return (
			<Flex
				align="center"
				justify="center"
				minHeight={450}
				fontSize={23}
				direction="column"
				gap={10}
				color="red.300"
			>
				<Image height={200} src="images/notAllowed.png" alt="" />
				Not Allowed!
			</Flex>
		);
	}

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
								<Heading fontSize={23}>Edit Item</Heading>
								<Button
									// width="100%"
									colorScheme="red"
									onClick={handleDeleteItem}
									isLoading={deleteLoading}
								>
									Delete Item
									<DeleteIcon ml={2} />
								</Button>
							</Flex>
						</Box>
						<Flex flexDirection="column" gap={5}>
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
								colorScheme={editStatus ? "green" : "red"}
								isDisabled={isChanged ? false : true}
								onClick={handleSaveChanges}
								isLoading={editLoading}
							>
								{editStatus ? "Successful 😄" : "Save Changes"}
							</Button>
						</Flex>
					</Stack>
				</>
			) : (
				<Flex justify="center" align="center" m={5}>
					Only for admins, Login required!
				</Flex>
			)}
		</>
	);
}

export default Edit;
