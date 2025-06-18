import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		// domains: ["lh3.googleusercontent.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;
