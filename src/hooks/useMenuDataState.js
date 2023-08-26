import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
const initialState = [
	{
		categoryName: "",
		categoryData: [
			{
				itemName: "",
				itemQuantity: "",
				itemPrice: "",
			},
		],
		img: "",
	},
];

function useMenuDataState() {
	const [menuData, setMenuData] = useState([]);
	const [menuDataLoading, setMenuDataLoading] = useState(true);

	const fetchMenuData = async () => {
		setMenuDataLoading(true);
		try {
			const dataQuery = query(collection(firestore, "menuData"));
			const dataDocs = await getDocs(dataQuery);
			const data = dataDocs.docs.map((doc) => ({ ...doc.data() }));
			setMenuData([...data]);
		} catch (err) {
			console.log("fetchMenuDataError", err);
		}
		setMenuDataLoading(false);
	};

	useEffect(() => {
		fetchMenuData();
	}, []);

	return [menuData, setMenuData, menuDataLoading];
}

export default useMenuDataState;
