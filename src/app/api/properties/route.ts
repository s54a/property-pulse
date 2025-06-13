import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest } from "next/server";
// import fs from "fs/promises";
// import path from "path";

// export const dynamic = "force-dynamic";

//Get /api/properties
export const GET = async (request: NextRequest) => {
	try {
		await connectDB();

		// console.log("Collection name:", Property.collection.collectionName);

		// // Count documents before deletion
		// const initialCount = await Property.countDocuments({});
		// console.log("Initial document count:", initialCount);

		// // Clear existing documents
		// const deleteResult = await Property.deleteMany({});
		// console.log("Deleted documents:", deleteResult.deletedCount);

		// // Define path to properties.json
		// const filePath = path.join(process.cwd(), "src", "properties.json");
		// console.log("File path:", filePath);

		// // Read JSON file
		// const jsonData = await fs.readFile(filePath, "utf-8");
		// const propertiesData = JSON.parse(jsonData);
		// console.log("Properties to import:", propertiesData.length);

		// // Insert documents from JSON
		// await Property.insertMany(propertiesData);
		// console.log("Properties imported from JSON:", propertiesData.length);

		// Query all properties
		const properties = await Property.find({});
		// console.log("Properties found:", properties);

		// Count documents after insertion
		// const finalCount = await Property.countDocuments({});
		// console.log("Final document count:", finalCount);

		return new Response(JSON.stringify(properties), { status: 200 });
	} catch (error) {
		console.error("Error:", error);
		return new Response("Something Went Wrong", { status: 500 });
	}
};
