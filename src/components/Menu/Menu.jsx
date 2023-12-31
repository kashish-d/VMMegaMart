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
import { useEffect, useState } from "react";
import EditListItem from "../CategoryItems/EditListItem";
import useDebounce from "../../hooks/useDebounce";
import SearchResults from "../../Search/SearchResults";

function Menu({ data, loading }) {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedValue = useDebounce(searchTerm);

	const handleSearch = (e) => {
		const string = e.target.value.toLowerCase();
		setSearchTerm(string);
	};

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
			{/* <Flex
				justifyContent="flex-start"
				alignItems="center"
				px={4}
				mt={9}
				blur="1px"
			>
				<Text fontSize={16} fontWeight={600} color="brand.200">
					Our Products
				</Text>
			</Flex> */}
			<Flex
				p={3}
				justifyContent="center"
				alignItems="center"
				mb={2}
				backdropFilter="blur(50px)"
				position="sticky"
				top="0px"
				zIndex="90"
			>
				<InputGroup width="90%">
					<InputRightElement mx={1} pointerEvents="none">
						<Search2Icon color="gray.300" />
					</InputRightElement>
					<Input
						variant="filled"
						placeholder="Search for products"
						focusBorderColor="brand.100"
						onChange={handleSearch}
					/>
				</InputGroup>
			</Flex>
			{searchTerm ? (
				<SearchResults searchTerm={debouncedValue} edit={false} />
			) : loading ? (
				<MenuLoader />
			) : (
				<Accordion
					defaultIndex={data.map((each, index) => index)}
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
											id={categoryItem.categoryName}
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
											categoryItem.categoryData.map((item, index) => (
												// <ListItem
												// 	key={`${item.itemName}_${item.itemPrice}`}
												// 	display="flex"
												// 	justifyContent="space-between"
												// 	alignItems="center"
												// 	gap={3}
												// 	py={1}
												// >
												// 	<Flex
												// 		justify="center"
												// 		align="center"
												// 		flex={1}
												// 		height="100%"
												// 		p={2}
												// 		bg="brand.300"
												// 		borderRadius="50px"
												// 	>
												// 		<Image src={`images/${categoryItem.img}`} alt="" />
												// 	</Flex>

												// 	<Flex justifyContent="space-between" flex={10}>
												// 		<Flex flexDirection={"column"} gap={1}>
												// 			<Text fontSize={16} fontWeight={500}>
												// 				{item.itemName}
												// 			</Text>
												// 			<Text
												// 				fontSize={12}
												// 				fontWeight={400}
												// 				color="gray.500"
												// 			>
												// 				{item.itemQuantity}
												// 			</Text>
												// 		</Flex>
												// 		<Text>${item.itemPrice}</Text>
												// 	</Flex>
												// </ListItem>
												<EditListItem
													item={item}
													index={index}
													key={`${item.itemName}_${index}`}
													categoryItem={categoryItem}
													edit={false}
												/>
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
