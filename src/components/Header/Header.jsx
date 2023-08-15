import { Flex, Text } from "@chakra-ui/react";
import React from "react";

function Header() {
	return (
		<Flex
			bg="linear-gradient(to bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.9)),url('images/header.jpeg')"
			height="55vmin"
			bgSize="cover"
			width="100%"
			justifyContent={"center"}
			alignItems={"flex-end"}
			p={4}
			pr={0}
		>
			<Text color="rgba(255,255,255,0.8)">
				Quality Products at reasonable prices!
			</Text>
		</Flex>
	);
}

export default Header;
