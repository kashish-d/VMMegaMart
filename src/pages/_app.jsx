import { ChakraProvider } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";
import { RecoilRoot } from "recoil";
import { theme } from "../chakra/theme";
import Layout from "../components/Layout/Layout";
import "../app.css";

function MyApp({ Component, pageProps }) {
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
