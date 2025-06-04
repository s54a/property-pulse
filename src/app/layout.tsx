import "@/assets/styles/globals.css";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
	title: "Property Pulse | Find local rental properties",
	description: "Find your dream rental property with Property Pulse",
	keywords:
		"rental, property, housing, real estate, rental properties, find rentals, find properties",
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
			</head>
			<body>
				<Navbar />

				<main>{children}</main>

				<Footer />
			</body>
		</html>
	);
};

export default MainLayout;
