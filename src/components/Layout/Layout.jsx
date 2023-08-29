import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTop from "./ScrollToTop";

function Layout({ children }) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<ScrollToTop />
			<Footer />
		</>
	);
}

export default Layout;
