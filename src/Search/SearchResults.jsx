import { Box, Flex, List, OrderedList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { menuDataState } from "../atoms/menuDatatAtom";
import EditListItem from "../components/CategoryItems/EditListItem";
import MenuLoader from "../components/Loader/MenuLoader";

function SearchResults({ searchTerm, edit }) {
	const [results, setResults] = useState([]);
	const [menuData, setMenuData] = useRecoilState(menuDataState);
	const [loading, setLoading] = useState(true);
	const [itemList, setItemList] = useState([]);

	const getSearchResults = () => {
		setLoading(true);
		let arr = itemList.filter((each) =>
			each.itemName.toLowerCase().includes(searchTerm)
		);
		setResults(arr);
		setLoading(false);
	};

	useEffect(() => {
		const getItemList = () => {
			if (menuData.length >= 1) {
				let arr = menuData.flatMap((each) => each.categoryData);
				setItemList(arr);
			}
		};
		getItemList();
	}, [menuData]);

	useEffect(() => {
		if (searchTerm) {
			getSearchResults();
		}
	}, [searchTerm]);

	return (
		<>
			<h2>
				<Flex
					justify={"space-between"}
					align={"center"}
					as="span"
					flex="1"
					textAlign="left"
					fontSize={16}
					fontWeight={600}
					m={4}
					borderColor="brand.100"
				>
					Search Results
				</Flex>
			</h2>
			{loading ? (
				<MenuLoader />
			) : results && results.length > 0 ? (
				results.map((item, index) => (
					<OrderedList mr={4} ml={4} key={index} mb={2}>
						<Box pb={4} pl={1} bg="rgba(255,255,255,0.95)">
							<List spacing={3}>
								<EditListItem item={item} index={index} edit={edit} />
							</List>
						</Box>
					</OrderedList>
				))
			) : (
				<Flex justify={"center"} align={"center"} p={10}>
					No results found..
				</Flex>
			)}
		</>
	);
}

export default SearchResults;
