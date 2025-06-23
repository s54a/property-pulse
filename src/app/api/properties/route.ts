import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest } from "next/server";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
import { PropertyData } from "@/types/index";

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
		await connectDB();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response("User ID is required", { status: 401 });
		}

		const { userId } = sessionUser;

		const formData = await request.formData();

		const amenities = formData.getAll("amenities");
		const images = formData.getAll("images");

		if (!images.every((item) => item instanceof File)) {
			throw new Error("Invalid form data: 'images' must be files.");
		}

		const filteredImages = (images as File[]).filter((image) => image.name !== "");

		const propertyData: PropertyData = {
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
			images: [],
			owner: userId,
		};

		const imageUploadPromises = [];

		for (const image of filteredImages) {
			const imageBuffer = await image.arrayBuffer();

			const imageArray = Array.from(new Uint8Array(imageBuffer));
			const imageData = Buffer.from(imageArray);

			// Convert Image Data to base64
			const imageBase64 = imageData.toString("base64");

			// Make Request to upload to Cloudinary
			const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
				folder: "PropertyPulse",
			});

			imageUploadPromises.push(result.secure_url);

			// Wait for All Images to Upload
			const uploadedImages = await Promise.all(imageUploadPromises);

			propertyData.images = uploadedImages;
		}

		const newProperty = new Property(propertyData);
		await newProperty.save();
		// console.log(propertyData);

		// return new Response(JSON.stringify({ message: propertyData }), { status: 200 });

		return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
	} catch (error) {
		console.error("Error:", error);
		return new Response("Failed to Add Property", { status: 500 });
	}
};
