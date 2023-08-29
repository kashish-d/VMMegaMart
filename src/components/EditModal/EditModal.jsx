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
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Box,
	CloseButton,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";

import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { firestore } from "../../firebase/clientApp";
import { doc, getDoc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";

const initialItem = {
	itemName: "",
	itemDescription: "",
	itemPrice: "",
	itemQuantity: "",
	categoryName: "",
	itemIndex: 0,
	categoryIndex: 0,
};

function EditModal({ isOpen, onClose, categoryItem, data, setMenuData }) {
	const [itemDetails, setItemDetails] = useState({ initialItem }); //To manage changes in the input fields
	const [isChanged, setIsChanged] = useState(false);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [editStatus, setEditStatus] = useState(false);
	const [deleteStatus, setDeleteStatus] = useState(false);
	const toast = useToast();

	const handleChange = (e) => {
		setItemDetails({
			...itemDetails,
			[e.target.name]: e.target.value,
		});
		if (categoryItem[e.target.name] != e.target.value) {
			setIsChanged(true);
		}
	};

	const EditItem = async ({
		itemName,
		itemPrice,
		itemQuantity,
		itemDescription,
		categoryName,
		itemIndex,
		categoryIndex,
	}) => {
		try {
			const menuDataDocRef = doc(firestore, "menuData", categoryName);
			const updatedItem = {
				categoryName,
				itemName,
				itemDescription,
				itemQuantity,
				itemPrice,
			};
			const updatedCategory = data[categoryIndex];
			const updatedCategoryData = updatedCategory.categoryData;
			updatedCategoryData[itemIndex] = updatedItem;

			await setDoc(menuDataDocRef, {
				categoryName: categoryName,
				categoryData: updatedCategoryData,
				img: updatedCategory.img,
			});
			const updatedData = data;
			updatedData[categoryIndex] = updatedCategory; // is this redudant?
			setMenuData([...updatedData]);
		} catch (err) {
			console.log("EditItemError", err);
		}
	};

	const deleteItem = async ({
		itemName,
		itemPrice,
		itemQuantity,
		itemDescription,
		categoryName,
		itemIndex,
		categoryIndex,
	}) => {
		try {
			const menuDataDocRef = doc(firestore, "menuData", categoryName);

			let updatedCategory = data[categoryIndex];
			let updatedCategoryData = updatedCategory.categoryData;

			//Directly assigning updatingCategoryData to this causes it to lose its reference to the
			//updatedCategory and just gets re-assigned to the new array formed by filter as a standalone
			updatedCategory.categoryData = updatedCategoryData.filter(
				(each, index) => index != itemIndex
			);

			await setDoc(menuDataDocRef, {
				categoryName: categoryName,
				categoryData: updatedCategory.categoryData,
				img: updatedCategory.img,
			});

			const updatedData = data;
			updatedData[categoryIndex] = updatedCategory;
			setMenuData([...updatedData]);
		} catch (err) {
			console.log("DeleteItemError", err);
		}
	};

	const handleSaveChanges = async () => {
		setEditStatus(false);
		setLoading(true);
		await EditItem(itemDetails);
		setLoading(false);
		setEditStatus(true);
		setTimeout(() => setEditStatus(false), 5000);
		setIsChanged(false);
	};

	const handleDeleteItem = async () => {
		setDeleteStatus(false);
		setDeleteLoading(true);
		await deleteItem(itemDetails);
		setDeleteLoading(false);
		toast({
			// title: "Item Deleted",
			description: "Item deleted successfully!",
			status: "success",
			duration: 4000,
			isClosable: true,
			position: "top",
		});
		onClose();
	};

	useEffect(() => {
		setItemDetails({ ...categoryItem }); //Setting the already set values of the item being editted
		setIsChanged(false);
	}, [categoryItem]);

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					onClose();
					setIsChanged(false);
				}}
				// motionPreset="none"
				trapFocus={false}
				closeOnOverlayClick={false}
				size="xs"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Item</ModalHeader>
					<ModalCloseButton />
					<Flex align="center" justify="flex-end" pr={6} pl={6} pb={2}>
						<Button
							width="100%"
							colorScheme="red"
							onClick={handleDeleteItem}
							isLoading={deleteLoading}
						>
							Delete Item
							<DeleteIcon ml={2} />
						</Button>
					</Flex>
					<ModalBody>
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
					</ModalBody>
					<ModalFooter>
						<Button mr={3} variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button
							colorScheme={editStatus ? "green" : "red"}
							isDisabled={isChanged ? false : true}
							onClick={handleSaveChanges}
							isLoading={loading}
						>
							{editStatus ? "Successful 😄" : "Save Changes"}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default EditModal;
