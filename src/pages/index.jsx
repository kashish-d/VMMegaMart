import Menu from "../components/Menu/Menu";
import HeaderSec from "../components/Header/HeaderSec";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import useMenuDataState from "../hooks/useMenuDataState";
import Head from "next/head";

export default function Home({}) {
	const [menuData, setMenudata, menuDataLoading] = useMenuDataState();
	return (
		<>
			<Head>
				<title>VM Mega Mart</title>
				<meta
					name="description"
					content="Check out prices of all the products in our store"
					key="desc"
				/>
				<meta name="theme-color" content="#7785db" />
			</Head>
			<HeaderSec />
			<Menu data={menuData} loading={menuDataLoading} />
		</>
	);
}
