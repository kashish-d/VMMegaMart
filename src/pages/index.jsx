import { Flex, Text } from "@chakra-ui/react";
import Menu from "../components/Menu/Menu";
import Header from "../components/Header/Header";
import HeaderSec from "../components/Header/HeaderSec";

export default function Home() {
	return (
		<>
			<HeaderSec />
			<Menu />
		</>
	);
}
