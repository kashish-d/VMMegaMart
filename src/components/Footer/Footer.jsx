import { Flex, Text } from "@chakra-ui/react";
import React from "react";

function Footer() {
	return (
		<Flex bg="brand.100" flexDirection="column" align="center" p={4}>
			<Text fontWeight="800" fontSize={20} color="white" mb={3}>
				VM MEGA MART
			</Text>
			<Text flex={1} p={2} alignSelf="flex-start" color="white">
				Address: Shop 26, G/F Peninsula Apartments 16 Mody Road Tsim Sha Tsui
				Kowloon Hong Kong
			</Text>
			<Text flex={1} p={2} alignSelf="flex-start" color="white">
				Phone: +852-91466422
			</Text>
		</Flex>
	);
}

export default Footer;
