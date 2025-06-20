import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest } from "next/server";

//Get /api/properties
export const GET = async (request: NextRequest) => {
	try {
		await connectDB();
		const properties = await Property.find({});

		return new Response(JSON.stringify(properties), { status: 200 });
	} catch (error) {
		console.error("Error:", error);
		return new Response("Something Went Wrong", { status: 500 });
	}
};

//Post /api/properties
export const POST = async (request: NextRequest) => {
	try {
		const formData = await request.formData();

		const amenities = formData.getAll("amenities");
		const images = formData.getAll("images");

		if (!images.every((item) => item instanceof File)) {
			throw new Error("Invalid form data: 'images' must be files.");
		}

		const filteredImages = (images as File[]).filter((image) => image.name !== "");

		const propertyData = {
			type: formData.get("type"),
			name: formData.get("name"),
			description: formData.get("description"),
			location: {
				street: formData.get("location.street"),
				city: formData.get("location.city"),
				state: formData.get("location.state"),
				zipcode: formData.get("location.zipcode"),
			},
			beds: formData.get("beds"),
			baths: formData.get("baths"),
			square_feet: formData.get("square_feet"),
			amenities,
			rates: {
				nightly: formData.get("rates.nightly"),
				weekly: formData.get("rates.weekly"),
				monthly: formData.get("rates.monthly"),
			},
			seller_info: {
				name: formData.get("seller_info.name"),
				email: formData.get("seller_info.email"),
				phone: formData.get("seller_info.phone"),
			},
			filteredImages,
		};

		console.log(propertyData);

		return new Response(JSON.stringify({ message: propertyData }), { status: 200 });
	} catch (error) {
		console.error("Error:", error);
		return new Response("Failed to Add Property", { status: 500 });
	}
};
