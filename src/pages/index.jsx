import Menu from "../components/Menu/Menu";
import HeaderSec from "../components/Header/HeaderSec";
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
				<meta name="theme-color" content="#019cdf" />
			</Head>
			<HeaderSec />
			<Menu data={menuData} loading={menuDataLoading} />
		</>
	);
}
