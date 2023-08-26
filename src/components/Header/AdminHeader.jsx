import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

function AdminHeader() {
	return (
		<Flex
			// height="55vmin"
			bgSize="cover"
			width="100%"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			p={4}
			mt={10}
			// mb={}
		>
			<Image
				src="images/adminHeader.png"
				alt="basket"
				height="45vmin"
				transform="rotateY(180deg)"
			/>
			<Flex
				// alignSelf="flex-end"
				justifyContent="center"
				alignItems={"center"}
				flexDirection="column"
			>
				<Text fontSize={23} color="brand.200" mb={2} mt={2}>
					Welcome to Admin Panel
				</Text>
				{/* <Text fontSize={23} fontWeight={600}>
					{"Welcome to Admin Panel"}
				</Text> */}
			</Flex>
		</Flex>
	);
}

export default AdminHeader;
