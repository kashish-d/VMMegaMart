import React from "react";
import { Flex, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

function Input() {
	return (
		<Flex justifyContent="center" alignItems="center" mb={2}>
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
	);
}

export default Input;
