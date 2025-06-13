import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";

// GET /api/properties/:id
export const GET = async (_request: NextRequest, { params }: { params: { id: string } }) => {
	try {
		await connectDB();

		const property = await Property.findById(params.id);

		if (!property) {
			return new NextResponse("Property Not Found", { status: 404 });
		}

		return new NextResponse(JSON.stringify(property), { status: 200 });
	} catch (error) {
		console.error("Error:", error);
		return new NextResponse("Something Went Wrong", { status: 500 });
	}
};
