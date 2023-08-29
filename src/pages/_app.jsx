import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";
import { theme } from "../chakra/theme";
import authContext from "../contexts/authContext";
import { useEffect, useState } from "react";
import NextNProgress from "nextjs-progressbar";
import { RecoilRoot, useRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";

function MyApp({ Component, pageProps }) {
	// const [authData,setAuthData] = useRecoilState(authState);

	// const login = ({ username, password }, writeToLocal) => {
	// 	if (
	// 		process.env.NEXT_PUBLIC_APP_ADMIN_USERNAME === username &&
	// 		process.env.NEXT_PUBLIC_APP_ADMIN_PASSWORD === password
	// 	) {
	// 		setUserStatus(true);
	// 		setAuthLoading(false);
	// 		if (writeToLocal) {
	// 			let user = {
	// 				username: username,
	// 				password: password,
	// 			};
	// 			console.log(JSON.stringify(user));
	// 			localStorage.setItem("user", JSON.stringify(user));
	// 		}
	// 		return true;
	// 	} else {

	// 		return false;
	// 	}
	// };

	// useEffect(() => {
	// 	const isUserLoggedIn = () => {
	// 		const user = JSON.parse(localStorage.getItem("user"));
	// 		if (user) {
	// 			login(user, false);
	// 		}
	// 	};
	// 	isUserLoggedIn();
	// }, []);
	return (
		<RecoilRoot>
			<ChakraProvider theme={theme}>
				<Layout>
					<NextNProgress color="#fff" options={{ showSpinner: false }} />
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</RecoilRoot>
	);
}

export default MyApp;
