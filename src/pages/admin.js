import {
	ChevronLeftIcon,
	DeleteIcon,
	EditIcon,
	Search2Icon,
} from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	IconButton,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	List,
	ListItem,
	OrderedList,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { deleteDoc, doc } from "firebase/firestore";
import AddModal from "../components/EditModal/AddModal";
import EditModal from "../components/EditModal/EditModal";
import AdminHeader from "../components/Header/AdminHeader";
import { firestore } from "../firebase/clientApp";

import Link from "next/link";
import MenuLoader from "../components/Loader/MenuLoader";
import useMenuDataState from "../hooks/useMenuDataState";
import authContext from "../contexts/authContext";
import { useRouter } from "next/router";

const initialItem = {
	itemName: "",
	itemPrice: "",
	itemQuantity: "",
	categoryName: "",
	itemIndex: 0,
	categoryIndex: 0,
};

function Admin() {
	const { userStatus, userLoading } = useContext(authContext);
	const [selectedItem, setSelectedItem] = useState(initialItem);
	const [menuData, setMenuData, menuDataLoading] = useMenuDataState();
	const router = useRouter();

	//For edit modal
	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onClose: onEditClose,
	} = useDisclosure();
	//For add modal
	const {
		isOpen: isAddOpen,
		onOpen: onAddOpen,
		onClose: onAddClose,
	} = useDisclosure();

	const handleEditItem = (item, cName, index, cIndex) => {
		const itemObj = {
			categoryName: cName,
			itemIndex: index,
			categoryIndex: cIndex,
			...item,
		};
		setSelectedItem(itemObj);
		onEditOpen();
	};

	const handleAddItem = () => {
		onAddOpen();
	};

	const handleDeleteCategory = async (cName) => {
		if (
			confirm("This category and all its items will be deleted PERMANENTLY")
		) {
			await deleteDoc(doc(firestore, "menuData", cName));
			const updatedData = menuData.filter((each) => each.categoryName != cName);
			setMenuData(updatedData);
		}
	};

	// useEffect(() => {
	// 	let timer;
	// 	if (!userStatus && !userLoading) {
	// 		timer = setTimeout(() => {
	// 			console.log("Hey");
	// 			router.push("/");
	// 		}, 2000);
	// 	}
	// 	return () => {
	// 		clearTimeout(timer);
	// 	};
	// }, [userStatus, userLoading, router]);

	return (
		<>
			{userStatus ? (
				<>
					<EditModal
						isOpen={isEditOpen}
						onClose={onEditClose}
						categoryItem={selectedItem}
						data={menuData}
						setMenuData={setMenuData}
					/>
					<AddModal
						isOpen={isAddOpen}
						onClose={onAddClose}
						data={menuData}
						setMenuData={setMenuData}
					/>
					<Flex pt={3}>
						<Link href="/">
							<ChevronLeftIcon />
							<Button variant="link">Back to home</Button>
						</Link>
					</Flex>
					<AdminHeader />
					<Flex
						justifyContent="space-between"
						alignItems="center"
						m={4}
						gap={2}
					>
						<InputGroup flex={3}>
							<InputRightElement mx={1} pointerEvents="none">
								<Search2Icon color="gray.300" />
							</InputRightElement>
							<Input
								variant="filled"
								placeholder="Search "
								focusBorderColor="brand.100"
							/>
						</InputGroup>
						<Button
							flex={1}
							borderRadius="6px"
							bg="brand.100"
							color="white"
							_hover={{ bg: "brand.100" }}
							onClick={handleAddItem}
						>
							Add Item
						</Button>
					</Flex>
					<Flex
						justifyContent="center"
						alignItems="center"
						py={5}
						px={4}
						mt={5}
					>
						<Text fontSize={16} fontWeight={600} color="brand.200">
							Products
						</Text>
					</Flex>
					{menuDataLoading ? (
						<MenuLoader />
					) : menuData && menuData.length > 0 ? (
						menuData.map((categoryItem, cIndex) => (
							<OrderedList mr={4} ml={4} key={cIndex} mb={2}>
								<h2>
									<Flex
										justify={"space-between"}
										align={"center"}
										as="span"
										flex="1"
										textAlign="left"
										fontSize={16}
										fontWeight={600}
										mb={1}
										borderColor="brand.100"
									>
										{categoryItem.categoryName}
										<Box
											// bg="red"
											color="red"
											borderRadius="6px"
											pb={1}
											pr={2}
											pl={2}
											onClick={() =>
												handleDeleteCategory(categoryItem.categoryName)
											}
										>
											<DeleteIcon fontSize={18} />
										</Box>
									</Flex>
								</h2>
								<Box pb={4} pl={1} bg="rgba(255,255,255,0.95)">
									<List spacing={3}>
										{categoryItem.categoryData?.length > 0 ? (
											categoryItem.categoryData.map((item, index) => (
												<ListItem
													key={item.itemName}
													display="flex"
													justifyContent="space-between"
													alignItems="center"
													gap={3}
													py={1}
												>
													<Flex
														justify="center"
														align="center"
														flex={1}
														height="100%"
														p={2}
														bg="brand.300"
														borderRadius="50px"
													>
														<Image src={`images/${categoryItem.img}`} alt="" />
													</Flex>

													<Flex
														justifyContent="space-between"
														flex={10}
														align="center"
													>
														<Flex flexDirection={"column"} gap={1}>
															<Text fontSize={16} fontWeight={500}>
																{item.itemName}
															</Text>
															<Text
																fontSize={12}
																fontWeight={400}
																color="gray.500"
															>
																{item.itemQuantity}
															</Text>
														</Flex>
														<Flex
															justifyContent="flex-end"
															flex={1}
															pr={2}
															pl={2}
															onClick={() =>
																handleEditItem(
																	item,
																	categoryItem.categoryName,
																	index,
																	cIndex
																)
															}
														>
															<IconButton
																borderColor="brand.100"
																variant="outline"
																color="brand.100"
																size="sm"
																icon={<EditIcon />}
															/>
														</Flex>

														<Text>${item.itemPrice}</Text>
													</Flex>
												</ListItem>
											))
										) : (
											<Flex justify={"center"} align={"center"} p={5}>
												No Items yet
											</Flex>
										)}
									</List>
								</Box>
							</OrderedList>
						))
					) : (
						<Flex justify={"center"} align={"center"} p={10}>
							No Categories or Items yet
						</Flex>
					)}
				</>
			) : (
				<Flex justify="center" align="center" flexDirection="column">
					<Image src="images/adminHeader.png" alt="" />
					<Text color="red" fontWeight={600} fontSize={17}>
						You are not Logged In
					</Text>
					{/* <Text>Redirecting...</Text> */}
					<Link href="/">
						<Button m={3}>Go Home</Button>
					</Link>
				</Flex>
			)}
		</>
	);
}

export default Admin;
