import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

function Footer() {
	return (
		<Flex
			bg="brand.100"
			flexDirection="column"
			align="center"
			p={4}
			mt={5}
			borderRadius="6px 6px 0px 0px"
		>
			<Text fontWeight="800" fontSize={20} color="white" mb={3}>
				VM MEGA MART
			</Text>
			{/* <Flex bg="white" borderRadius="50px" p={2}>
				<Image src="/images/logo.png" alt="logo" height="20px" />
			</Flex> */}
			<Text flex={1} p={2} alignSelf="flex-start" color="white">
				Address: Shop 26, G/F Peninsula Apartments 16, Mody Road Tsim Sha Tsui
				Kowloon, Hong Kong
			</Text>
			<Text flex={1} p={2} alignSelf="flex-start" color="white">
				Phone: +852-91466422
			</Text>
		</Flex>
	);
}

export default Footer;
