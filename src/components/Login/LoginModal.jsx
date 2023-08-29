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
import { useRecoilState } from "recoil";
import { authState } from "../../atoms/authAtom";

const initialUserDetails = {
	username: "",
	password: "",
};

function LoginModal({ isOpen, onClose }) {
	const [userDetails, setUserDetails] = useState(initialUserDetails);
	const [authData, setAuthData] = useRecoilState(authState);
	const [error, setError] = useState(false);
	const router = useRouter();

	const handleChange = (e) => {
		setUserDetails((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		if (e.target.value != "") {
			setError(false);
		}
	};

	const login = ({ username, password }, writeToLocal) => {
		setAuthData({
			...authData,
			userLoading: true,
		});
		if (
			process.env.NEXT_PUBLIC_APP_ADMIN_USERNAME === username &&
			process.env.NEXT_PUBLIC_APP_ADMIN_PASSWORD === password
		) {
			setAuthData({
				userStatus: true,
				userLoading: false,
			});
			if (writeToLocal) {
				let user = {
					username: username,
					password: password,
				};
				console.log(JSON.stringify(user));
				localStorage.setItem("user", JSON.stringify(user));
			}
			return true;
		} else {
			setError("Username or password is wrong!");
			setAuthData({
				...authData,
				userLoading: false,
			});
			return false;
		}
	};

	const handleLogin = () => {
		setError("");
		if (userDetails.username == "" || userDetails.password == "") {
			setError("Username and Password cannot be empty");
			return;
		}
		//userStatus does not update fast enough for a if statement
		if (login(userDetails, true)) {
			onClose();
			router.push("/admin");
		}
	};

	useEffect(() => {
		const isUserLoggedIn = () => {
			const user = JSON.parse(localStorage.getItem("user"));
			if (user) {
				login(user, false);
			}
		};
		isUserLoggedIn();
	}, []);

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
							{error}
						</Text>
					)}
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" variant="outline" mr={3} onClick={onClose}>
						Close
					</Button>
					<Button
						// isLoading={userLoading}
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
