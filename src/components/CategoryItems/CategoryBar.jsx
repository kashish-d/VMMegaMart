import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { menuDataState } from "../../atoms/menuDatatAtom";
import Link from "next/link";

function CategoryBar() {
	const menuData = useRecoilValue(menuDataState);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const arr = menuData.map((each) => each.categoryName);
		setCategories([...arr]);
	}, []);

	return (
		<>
			<Flex
				justifyContent="flex-start"
				alignItems="center"
				px={4}
				mt={12}
				blur="1px"
			>
				<Text fontSize={16} fontWeight={600} color="brand.200">
					Categories
				</Text>
			</Flex>
			<Box overflowX="hidden" ml={4} mt={3}>
				<Flex
					overflowX="scroll"
					gap={2}
					sx={{
						"::-webkit-scrollbar": {
							display: "none",
						},
						"-ms-overflow-style": "none",
						"scrollbar-width": "none",
					}}
				>
					{menuData.map((each, index) => (
						<Flex
							key={each.categoryName}
							bg={index % 2 === 0 ? "brand.300" : "brand.400"}
							direction="column"
							justify="space-between"
							align="center"
							pb={2}
							borderRadius="15px"
						>
							<Flex
								objectFit="contain"
								height="64px"
								width="64px"
								p={1}
								// mt={5}
								mt={3}
								mx={6}
								// border="1px solid"
							>
								<Image src={`images/${each.img}`} alt="" />
							</Flex>
							<Flex
								fontSize={10}
								bg="white"
								borderRadius="10px"
								width="90%"
								align="center"
								justify="center"
								py={2}
							>
								<Link href={`#${each.categoryName}`}>
									<Text align="center" fontWeight={600}>
										{each.categoryName}
									</Text>
								</Link>
							</Flex>
						</Flex>
					))}
				</Flex>
			</Box>
		</>
	);
}

export default CategoryBar;
