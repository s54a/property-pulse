import GoogleProvider from "next-auth/providers/google";
import { Profile } from "next-auth";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
	throw new Error("Missing Google OAuth environment variables.");
}

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		//Invoked on Successful SignIn
		async signIn({ profile }: { profile: Profile }) {
			// 1. Connect to Database
			// 2. Check if user exists
			// 3. If not, then add user to database
			// 4. Return true to allow sign in
		},
		// Modifies the Session Object
		async session({ profile }: { profile: Profile }) {
			// 1. Get User from database
			// 2. Assign the user id to the session
			// 3. Return the Session
		},
	},
};
