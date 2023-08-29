import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	IconButton,
	Image,
	List,
	ListItem,
	OrderedList,
	Spinner,
	Text,
} from "@chakra-ui/react";

import Link from "next/link";
import MenuLoader from "../Loader/MenuLoader";

function CategoryItemsEditList({ menuData, menuDataLoading }) {
	return (
		<>
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
											key={`${item.itemName}_${index}`}
											display="flex"
											justifyContent="space-between"
											alignItems="center"
											py={1}
											flexDirection="column-reverse"
										>
											{item.itemDescription && (
												<Flex
													width="100%"
													mt={2}
													// bg="brand.100"
												>
													<Flex flex={1} pl={3} pr={3}></Flex>
													<Flex
														flex={10}
														justify="flex-start"
														align="center"
														pl={2}
														bg="brand.200"
													>
														<Text fontSize={11} color="white">
															{`(${item.itemDescription})`}
														</Text>
													</Flex>
												</Flex>
											)}
											<Flex
												width={"100%"}
												gap={3}
												justifyContent="space-between"
												alignItems="center"
											>
												<Flex
													justify="center"
													align="center"
													flex={1}
													height="100%"
													p={2}
													bg="brand.300"
													borderRadius="50px"
													// height="10vmin"
													// width="10vmin"
												>
													<Image
														src={
															categoryItem.img
																? `images/${categoryItem.img}`
																: "images/product.png"
														}
														alt=""
													/>
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
	);
}

export default CategoryItemsEditList;
