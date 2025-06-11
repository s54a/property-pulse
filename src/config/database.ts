import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
	mongoose.set("strictQuery", true);

	if (connected) {
		console.log("MongoDB is already connected...");
		return;
	}

	// Connect to MongoDB
	try {
		const uri = process.env.MONGODB_URI;

		if (!uri) {
			throw new Error("MONGODB_URI is not defined in environment variables");
		}

		await mongoose.connect(uri);
		connected = true;
		console.log("MongoDB Connected...");
		console.log("Connected to database:", mongoose.connection.name);
	} catch (error) {
		console.log(error);
	}
};

export default connectDB;
