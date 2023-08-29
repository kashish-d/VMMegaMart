import { EditIcon } from "@chakra-ui/icons";
import { Flex, Image, ListItem, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { selectedItemState } from "../../atoms/selectedItemAtom";
import { useRouter } from "next/router";
import { useState } from "react";

function EditListItem({ item, index, categoryItem, edit = true }) {
	const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
	const router = useRouter();

	const handleEditItem = (item, index) => {
		const itemObj = {
			itemIndex: index,
			...item,
		};
		setSelectedItem(itemObj);
		router.push("/edit");
	};

	return (
		<ListItem
			key={`${item.itemName}_${item.itemPrice}`}
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			py={1}
			flexDirection="column-reverse"
			// bg="#edf2f75e"
			// borderBottom="0.2px solid"
			// borderRadius="6px"
		>
			{item.itemDescription && (
				<Flex
					width="100%"
					mt={2}
					// bg="brand.100"
				>
					<Flex flex={1} pl={3} pr={3}></Flex>
					<Flex
						flex={10}
						justify="flex-start"
						align="center"
						pl={2}
						bg="brand.200"
					>
						<Text fontSize={11} color="white">
							{`(${item.itemDescription})`}
						</Text>
					</Flex>
				</Flex>
			)}
			<Flex
				width={"100%"}
				gap={3}
				justifyContent="space-between"
				alignItems="center"
			>
				<Flex
					justify="center"
					align="center"
					flex={1}
					height="100%"
					p={2}
					bg="brand.300"
					borderRadius="50px"
				>
					<Image
						src={
							categoryItem?.img
								? `images/${categoryItem.img}`
								: "images/product.png"
						}
						alt=""
					/>
				</Flex>

				<Flex justifyContent="space-between" flex={10} align="center">
					<Flex flexDirection={"column"} gap={1}>
						<Text fontSize={16} fontWeight={500}>
							{item.itemName}
						</Text>
						<Text fontSize={12} fontWeight={400} color="gray.500">
							{item.itemQuantity}
						</Text>
					</Flex>
					{edit && (
						<Flex
							justifyContent="flex-end"
							flex={1}
							pr={2}
							pl={2}
							onClick={() => handleEditItem(item, index)}
						>
							<Flex borderColor="brand.100" color="brand.100" p={2}>
								<EditIcon />
							</Flex>
						</Flex>
					)}

					<Text
					//  alignSelf="flex-start"
					>
						${item.itemPrice}
					</Text>
				</Flex>
			</Flex>
		</ListItem>
	);
}

export default EditListItem;
