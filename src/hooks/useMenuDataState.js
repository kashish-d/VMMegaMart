import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import { data } from "../../data";
import { useRecoilState } from "recoil";
import { menuDataState } from "../atoms/menuDatatAtom";

const initialState = [
	{
		categoryName: "",
		categoryData: [
			{
				itemName: "",
				itemDescription: "",
				itemQuantity: "",
				itemPrice: "",
			},
		],
		img: "",
	},
];

function useMenuDataState() {
	const [menuData, setMenuData] = useRecoilState(menuDataState);
	const [menuDataLoading, setMenuDataLoading] = useState(true);
	const [menuDataError, setMenuDataError] = useState(false);

	const fetchMenuData = async () => {
		setMenuDataLoading(true);
		setMenuDataError(false);
		try {
			const dataQuery = query(collection(firestore, "menuData"));
			const dataDocs = await getDocs(dataQuery);
			const data = dataDocs.docs.map((doc) => ({ ...doc.data() }));
			setMenuData([...data]);
		} catch (err) {
			console.log("fetchMenuDataError", err);
		}
		setMenuDataLoading(false);
		setMenuDataError(true);
	};

	// useEffect(() => {
	// 	// console.log("i am runnning");

	// 	// setMenuData([...data]); //remove, its taking local object data
	// 	// setMenuDataLoading(false);
	// }, []);

	return [menuData, setMenuData, menuDataLoading, menuDataError];
}

export default useMenuDataState;
