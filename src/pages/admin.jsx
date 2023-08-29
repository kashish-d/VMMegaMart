import { ChevronLeftIcon, DeleteIcon, Search2Icon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	List,
	OrderedList,
	Spinner,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	setDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { dummyData } from "../../data";
import SearchResults from "../Search/SearchResults";
import { authState } from "../atoms/authAtom";
import { menuDataState } from "../atoms/menuDatatAtom";
import EditListItem from "../components/CategoryItems/EditListItem";
import AdminHeader from "../components/Header/AdminHeader";
import MenuLoader from "../components/Loader/MenuLoader";
import { firestore } from "../firebase/clientApp";
import useDebounce from "../hooks/useDebounce";

function Admin() {
	const { userLoading, userStatus } = useRecoilValue(authState);
	const [menuData, setMenuData] = useRecoilState(menuDataState);
	const [menuDataLoading, setMenuDataLoading] = useState(true);
	const [error, setError] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedValue = useDebounce(searchTerm, 1000);
	const router = useRouter();
	const toast = useToast();

	const handleAddItem = () => {
		router.push("/add");
	};
	const handleSearch = (e) => {
		const string = e.target.value.toLowerCase();
		setSearchTerm(string);
	};

	const handleDeleteCategory = async (cName) => {
		if (
			confirm("This category and all its items will be deleted PERMANENTLY")
		) {
			await deleteDoc(doc(firestore, "menuData", cName));
			const updatedData = menuData.filter((each) => each.categoryName != cName);
			setMenuData(updatedData);
			toast({
				// title: "Item Deleted",
				description: "Category deleted successfully!",
				status: "success",
				duration: 4000,
				isClosable: true,
				// position: "top",
			});
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
			console.log("I am running here at admin page");
			fetchMenuData();
		} else {
			setMenuDataLoading(false);
		}
	}, []);

	return (
		<>
			{userStatus ? (
				<>
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
								onChange={handleSearch}
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
					{searchTerm ? (
						<SearchResults searchTerm={debouncedValue} />
					) : menuDataLoading ? (
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
												<EditListItem
													item={item}
													index={index}
													cIndex={cIndex}
													key={`${item.itemName}_${index}`}
													categoryItem={categoryItem}
												/>
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
				<Flex
					justify="center"
					align="center"
					flexDirection="column"
					m={10}
					gap={5}
				>
					<Image src="images/notAllowed.png" alt="" height="50vmin" />
					<Flex justify="center" align="center" direction="column">
						<Text color="red" fontWeight={600} fontSize={17}>
							{userLoading ? "Loading..." : "You are not Logged In..."}
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
			{/* <Button
				onClick={() => {
					try {
						dummyData.forEach(async (each) => {
							const menuDataDocRef = doc(
								firestore,
								"menuData",
								each.categoryName
							);
							await setDoc(menuDataDocRef, each);
						});
						console.log("Finished");
					} catch (err) {
						console.log(err);
					}
				}}
			>
				Add it
			</Button> */}
		</>
	);
}

export default Admin;
