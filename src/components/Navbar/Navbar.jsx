import { Flex, Text } from "@chakra-ui/react";
import React from "react";

function Navbar() {
	return (
		<Flex
			bg="brand.100"
			padding="12px"
			align="center"
			justify="center"
			// boxShadow="0px 0px 10px"
			boxShadow="0 0 13px -6px"
		>
			<Text fontWeight="800" fontSize={20} color="white">
				VM MEGA MART
			</Text>
		</Flex>
	);
}
9;

export default Navbar;
