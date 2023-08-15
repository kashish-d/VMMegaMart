import {
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
} from "@chakra-ui/react";

function CategoryItems() {
	return (
		<AccordionItem pb={3}>
			<h2>
				<AccordionButton py={2} bg="white" _hover={{ base: { bg: "white" } }}>
					<Box
						as="span"
						flex="1"
						textAlign="left"
						fontSize={16}
						fontWeight={600}
					>
						Atta
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
					{atta.map((item) => (
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
								<Image src="images/flour.png" alt="flour-icon" />
							</Flex>

							<Flex justifyContent="space-between" flex={10}>
								<Flex flexDirection={"column"} gap={1}>
									<Text fontSize={16} fontWeight={500}>
										{item.itemName}
									</Text>
									<Text fontSize={12} fontWeight={400} color="gray.500">
										{item.itemQuantity}
									</Text>
								</Flex>
								<Text>${item.itemPrice}</Text>
							</Flex>
						</ListItem>
					))}
				</List>
			</AccordionPanel>
		</AccordionItem>
	);
}

export default CategoryItems;
