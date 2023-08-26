import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";
import { theme } from "../chakra/theme";
import authContext from "../contexts/authContext";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
	const [userStatus, setUserStatus] = useState(false);
	const [authError, setAuthError] = useState(false);
	const [authLoading, setAuthLoading] = useState(false);
	const login = ({ username, password }, writeToLocal) => {
		setAuthLoading(true);
		setAuthError(false);
		if (
			process.env.NEXT_PUBLIC_APP_ADMIN_USERNAME === username &&
			process.env.NEXT_PUBLIC_APP_ADMIN_PASSWORD === password
		) {
			setUserStatus(true);
			setAuthLoading(false);
			if (writeToLocal) {
				let user = {
					username: username,
					password: password,
				};
				console.log(JSON.stringify(user));
				localStorage.setItem("user", JSON.stringify(user));
			}
			return true;
		} else {
			setAuthError(true);
			setAuthLoading(false);
			return false;
		}
	};

	useEffect(() => {
		const isUserLoggedIn = () => {
			const user = JSON.parse(localStorage.getItem("user"));
			if (user) {
				login(user, false);
			}
		};
		isUserLoggedIn();
	}, []);
	return (
		<ChakraProvider theme={theme}>
			<authContext.Provider
				value={{
					login: login,
					userStatus: userStatus,
					userLoading: authLoading,
					userError: authError,
				}}
			>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</authContext.Provider>
		</ChakraProvider>
	);
}

export default MyApp;
