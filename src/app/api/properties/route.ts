import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async () => {
	try {
		await connectDB();

		console.log("Collection name:", Property.collection.collectionName);

		const properties = await Property.find({});

		console.log("properties:", properties);

		const count = await Property.countDocuments({});
		console.log("Document count:", count);

		return new Response(JSON.stringify(properties), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("Something Went Wrong", {
			status: 500,
		});
	}
};
