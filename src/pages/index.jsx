import { collection, getDocs, query } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { menuDataState } from "../atoms/menuDatatAtom";
import HeaderSec from "../components/Header/HeaderSec";
import Menu from "../components/Menu/Menu";
import { firestore } from "../firebase/clientApp";
import CategoryBar from "../components/CategoryItems/CategoryBar";

export default function Home({}) {
	const [menuData, setMenuData] = useRecoilState(menuDataState);
	const [menuDataLoading, setMenuDataLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchMenuData = async () => {
		setMenuDataLoading(true);
		setError(false);
		try {
			const dataQuery = query(collection(firestore, "menuData"));
			const dataDocs = await getDocs(dataQuery);
			const data = dataDocs.docs.map((doc) => ({ ...doc.data() }));
			setMenuData([...data]);
		} catch (err) {
			console.log("fetchMenuDataError", err);
			setError(true);
		}
		setMenuDataLoading(false);
	};

	useEffect(() => {
		if (menuData.length < 1) {
			console.log("I am running here at index page");
			fetchMenuData();
		} else {
			setMenuDataLoading(false);
		}
	}, []);

	return (
		<>
			<Head>
				<title>VM Mega Mart</title>
				<meta
					name="description"
					content="Check out prices of all the products in our store"
					key="desc"
				/>
				<meta name="theme-color" content="#019cdf" />
			</Head>
			<HeaderSec />
			<CategoryBar />
			<Menu data={menuData} loading={menuDataLoading} />
		</>
	);
}
