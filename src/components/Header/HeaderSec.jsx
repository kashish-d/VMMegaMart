import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

function HeaderSec() {
	return (
		<Flex
			bgSize="cover"
			width="100%"
			justifyContent="space-between"
			alignItems={"flex-start"}
			flexDirection="row-reverse"
			p={4}
			// mt={10}
			mt={20}
		>
			<Image
				src="images/header5.png"
				alt="basket"
				alignSelf="flex-end"
				height="45vmin"
				// mb={4}
				transform="rotateY(180deg)"
			/>
			<Flex
				alignSelf="flex-end"
				justifyContent="flex-start"
				alignItems={"flex-start"}
				flexDirection="column"
			>
				<Text fontSize={13} color="brand.200" mb={2}>
					Hello there!
				</Text>
				<Text fontSize={23} fontWeight={600}>
					{"Let's choose fresh"}
				</Text>
				<Text fontSize={23} fontWeight={600}>
					{"items for you."}
				</Text>
			</Flex>
		</Flex>
	);
}

export default HeaderSec;
