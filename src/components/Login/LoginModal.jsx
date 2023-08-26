import React, { useContext, useEffect, useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Flex,
	Text,
	Input,
	Image,
} from "@chakra-ui/react";
import authContext from "../../contexts/authContext";
import { useRouter } from "next/router";

const initialUserDetails = {
	username: "",
	password: "",
};

function LoginModal({ isOpen, onClose }) {
	const [userDetails, setUserDetails] = useState(initialUserDetails);
	const { login, userStatus, userLoading, userError } = useContext(authContext);
	const [error, setError] = useState(false);
	const router = useRouter();

	// console.log(userDetails);
	const handleChange = (e) => {
		setUserDetails((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		if (e.target.value != "") {
			setError(false);
		}
	};

	const handleLogin = () => {
		setError(false);
		if (userDetails.username == "" || userDetails.password == "") {
			setError(true);
			return;
		}
		//userStatus does not update fast enough for a if statement
		if (login(userDetails, true)) {
			onClose();
			router.push("/admin");
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Log In</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex
						justify="center"
						align="center"
						mb={2}
						flexDirection="column"
						gap={2}
					>
						<Image src="images/loginHeader.png" alt="header" height="130px" />
						<Text fontSize={14} color="brand.200">
							(For Admin only)
						</Text>
					</Flex>
					<Flex flexDirection="column" gap={5}>
						<Flex fontSize={12} flexDirection="column">
							<Text m={1} color="brand.200">
								Username
							</Text>
							<Input
								variant="filled"
								focusBorderColor="brand.100"
								value={userDetails.username}
								name="username"
								onChange={handleChange}
							/>
						</Flex>
						<Flex fontSize={12} flexDirection="column">
							<Text m={1} color="brand.200">
								Password
							</Text>
							<Input
								variant="filled"
								focusBorderColor="brand.100"
								value={userDetails.password}
								name="password"
								type="password"
								onChange={handleChange}
							/>
						</Flex>
					</Flex>
					{error && (
						<Text fontSize={12} mt={4} color="red.400">
							Username and Password cannot be empty
						</Text>
					)}
					{userError && !error && (
						<Text fontSize={12} mt={4} color="red.400">
							Username or password is wrong!
						</Text>
					)}
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" variant="outline" mr={3} onClick={onClose}>
						Close
					</Button>
					<Button
						isLoading={userLoading}
						variant="solid"
						colorScheme="green"
						onClick={handleLogin}
					>
						Login
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default LoginModal;
