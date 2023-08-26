import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Flex,
	Image,
	List,
	ListItem,
	Text,
	InputGroup,
	InputRightElement,
	Input,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import MenuLoader from "../Loader/MenuLoader";

function Menu({ data, loading }) {
	return (
		<>
			<Flex
				justifyContent="center"
				alignItems="center"
				py={5}
				px={4}
				mt={5}
				blur="1px"
			>
				<Text fontSize={16} fontWeight={600} color="brand.200">
					Our products
				</Text>
			</Flex>
			<Flex
				p={3}
				justifyContent="center"
				alignItems="center"
				mb={2}
				// position="sticky"
				// top="10px"
			>
				<InputGroup width="90%">
					<InputRightElement mx={1} pointerEvents="none">
						<Search2Icon color="gray.300" />
					</InputRightElement>
					<Input
						variant="filled"
						placeholder="Search for products"
						focusBorderColor="brand.100"
					/>
				</InputGroup>
			</Flex>
			{loading ? (
				<MenuLoader />
			) : (
				<Accordion
					defaultIndex={[0, 1, 2, 3, 4, 5]}
					allowMultiple
					border="0px transparent"
				>
					{data && data.length > 0 ? (
						data.map((categoryItem) => (
							<AccordionItem pb={3} key={categoryItem.categoryName}>
								<h2>
									<AccordionButton
										py={2}
										bg="white"
										_hover={{ base: { bg: "white" } }}
									>
										<Box
											as="span"
											flex="1"
											textAlign="left"
											fontSize={16}
											fontWeight={600}
										>
											{categoryItem.categoryName}
										</Box>
										<AccordionIcon color="brand.200" opacity={0.5} />
									</AccordionButton>
								</h2>
								<AccordionPanel
									pb={4}
									bg="rgba(255,255,255,0.95)"
									// boxShadow="inset 0px 0px 2px"
								>
									<List spacing={3}>
										{categoryItem.categoryData?.length > 0 ? (
											categoryItem.categoryData.map((item) => (
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
														<Image
															src={`images/${categoryItem.img}`}
															alt="flour-icon"
														/>
													</Flex>

													<Flex justifyContent="space-between" flex={10}>
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
								</AccordionPanel>
							</AccordionItem>
						))
					) : (
						<Flex justify={"center"} align={"center"} p={10}>
							No Categories or Items yet
						</Flex>
					)}
				</Accordion>
			)}
		</>
	);
}

export default Menu;
