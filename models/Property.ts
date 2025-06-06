import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		name: {
			type: String,
			required: true,
		},

		type: {
			type: String,
			required: true,
		},

		description: {
			type: String,
		},

		location: {
			street: {
				type: String,
			},
			city: {
				type: String,
			},
			state: {
				type: String,
			},
			zipcode: {
				type: String,
			},
		},

		beds: {
			type: Number,
		},

		baths: {
			type: Number,
		},

		square_feet: {
			type: Number,
		},

		amenities: [{ type: String }],

		rates: {
			weekly: {
				type: String,
			},

			monthly: {
				type: String,
			},

			nightly: {
				type: String,
			},
		},

		seller_info: {
			name: {
				type: String,
			},
			email: {
				type: String,
			},
			phone: {
				type: String,
			},
		},

		images: [{ type: String }],

		is_featured: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
