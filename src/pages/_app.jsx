import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";
import { theme } from "../chakra/theme";
import authContext from "../contexts/authContext";
import { useEffect, useState } from "react";
import NextNProgress from "nextjs-progressbar";
import { RecoilRoot, useRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";

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
