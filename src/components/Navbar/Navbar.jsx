import {
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	SkeletonCircle,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { FaUserCheck, FaUserGear } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";
import authContext from "../../contexts/authContext";
import LoginModal from "../Login/LoginModal";

function Navbar() {
	const { userStatus, userLoading } = useContext(authContext);
	const {
		isOpen: isLoginOpen,
		onOpen: onLoginOpen,
		onClose: onLoginClose,
	} = useDisclosure();
	const handleLogin = () => {
		onLoginOpen();
	};

	return (
		<Flex
			bg="brand.100"
			padding="12px"
			align="center"
			// justify="center"
			justify="space-between"
			// boxShadow="0px 0px 10px"
			boxShadow="0 0 13px -6px"
			borderRadius="0px 0px 6px 6px"
		>
			<Flex fontSize={23} color="white" ml={1} mr={1}>
				<MdDarkMode />
			</Flex>
			<Link href={"/"}>
				<Text fontWeight="800" fontSize={20} color="white">
					VM MEGA MART
				</Text>
			</Link>
			{userLoading && <SkeletonCircle size={23} />}
			{!userLoading && userStatus ? (
				<Link href="/admin">
					<IconButton
						colorScheme="transparent"
						color="white"
						icon={<FaUserCheck />}
						variant="ghost"
						fontSize={23}
					/>
				</Link>
			) : (
				<>
					<Menu>
						<MenuButton
							colorScheme="transparent"
							color="white"
							as={IconButton}
							aria-label="Options"
							icon={<FaUserGear />}
							variant="ghost"
							fontSize={23}
						/>
						<MenuList>
							<MenuItem onClick={handleLogin}>Log in</MenuItem>
						</MenuList>
					</Menu>
					<LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
				</>
			)}
		</Flex>
	);
}
9;

export default Navbar;
