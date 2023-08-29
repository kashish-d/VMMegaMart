import React, { useEffect, useState } from "react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton } from "@chakra-ui/react";

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 1400) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);

		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	return (
		<>
			{isVisible && (
				<Box
					onClick={scrollToTop}
					position="fixed"
					bottom="20px"
					right={["16px", "84px"]}
					zIndex={30}
				>
					<IconButton
						icon={<ArrowUpIcon />}
						colorScheme="telegram"
						variant="solid"
						fontSize={25}
						p={3}
					></IconButton>
				</Box>
			)}
		</>
	);
}
