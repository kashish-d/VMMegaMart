import { Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

function MenuLoader() {
	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<>
			<SkeletonText skeletonHeight={3} noOfLines={1} m={4} mb={5} />
			{arr.map((each) => (
				<Flex justify="space-between" gap={3} mr={4} ml={4} mb={4} key={each}>
					<SkeletonCircle size="12" />
					<SkeletonText
						noOfLines={2}
						spacing="3"
						mt={1}
						skeletonHeight="2"
						flex={4}
					/>
				</Flex>
			))}
		</>
	);
}

export default MenuLoader;
