export { default } from "next-auth/middleware";

export const config = {
	matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};

// import { withAuth } from "next-auth/middleware";

// export default withAuth({
// 	pages: {
// 		signIn: "/auth/signin", // Redirect to your login page
// 	},
// });

// export const config = {
// 	matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
// };

// import { NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";

// export default withAuth(
// 	function middleware(req) {
// 		console.log("Middleware triggered for:", req.nextUrl.pathname);
// 		return NextResponse.next();
// 	},
// 	{
// 		callbacks: {
// 			authorized: ({ token }) => {
// 				console.log("Token:", token);
// 				return !!token;
// 			},
// 		},
// 	},
// );

// export const config = {
// 	matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
// };
