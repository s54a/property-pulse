import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import { Profile, Session, User as NextAuthUser, Account } from "next-auth";

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
		// Invoked on successful SignIn
		async signIn({
			user,
			account,
			profile,
		}: {
			user: NextAuthUser;
			account: Account | null;
			profile?: Profile;
		}) {
			// 1. Connect to Database
			await connectDB();
			// 2. Check if user exists
			if (!profile?.email) {
				return false; // Deny sign-in if profile or email is missing
			}
			const userExists = await User.findOne({ email: profile.email });

			// 3. If not, then add user to database
			if (!userExists) {
				const username = profile.name?.slice(0, 20);

				await User.create({
					email: profile.email,
					username,
					image: profile.image,
				});
			}
			// 4. Return true to allow sign in
			return true;
		},
		// Modifies the Session Object
		async session({ session }: { session: Session }) {
			// 1. Get User from database
			const user = await User.findOne({ email: session.user?.email });
			// 2. Assign the user id to the session
			if (user && session.user) {
				session.user.id = user._id.toString();
			}
			// 3. Return the Session
			return session;
		},
	},
};
