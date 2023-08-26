import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

export const theme = extendTheme({
	colors: {
		brand: {
			// 100: "#7785db",
			100: "#019cdf",
			200: "#889098",
			300: "#fff0da",
		},
	},
	fonts: {
		body: "Poppins,Open Sans,sans-serif",
	},
	styles: {
		global: {
			body: {
				bg: "white",
				height: "100%",
				maxWidth: "480px",
				margin: "auto",
			},
		},
	},
	components: {
		Button,
	},
});
