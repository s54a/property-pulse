import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authUtils";

export const getSessionUser = async () => {
	try {
		const session = await getServerSession(authOptions);

		if (!session || !session.user) {
			return null;
		}

		return {
			user: session,
			userId: session.user.id,
		};
	} catch (error) {
		console.error(error);
		return null;
	}
};
