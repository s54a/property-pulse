"use client";

import { useState, useEffect, ChangeEvent } from "react";

interface PropertyFields {
	type: string;
	name: string;
	description: string;
	location: {
		street: string;
		city: string;
		state: string;
		zipcode: string;
	};
	beds: string;
	baths: string;
	square_feet: string;
	amenities: string[];
	rates: {
		weekly: string;
		monthly: string;
		nightly: string;
	};
	seller_info: {
		name: string;
		email: string;
		phone: string;
	};
	images: string[];
}

const amenitiesList = [
	"Wifi",
	"Full Kitchen",
	"Washer & Dryer",
	"Free Parking",
	"Swimming Pool",
	"Hot Tub",
	"24/7 Security",
	"Wheelchair Accessible",
	"Elevator Access",
	"Dishwasher",
	"Gym/Fitness Center",
	"Air Conditioning",
	"Balcony/Patio",
	"Smart TV",
	"Coffee Maker",
];

const initialFields: PropertyFields = {
	type: "Apartment",
	name: "Test Property",
	description: "",
	location: {
		street: "",
		city: "Test City",
		state: "Test State",
		zipcode: "",
	},
	beds: "3",
	baths: "2",
	square_feet: "1800",
	amenities: [],
	rates: {
		weekly: "",
		monthly: "2000",
		nightly: "",
	},
	seller_info: {
		name: "",
		email: "test@test.com",
		phone: "",
	},
	images: [],
};

const PropertyAddForm = () => {
	const [mounted, setMounted] = useState(false);
	const [fields, setFields] = useState<PropertyFields>({ ...initialFields });

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;

		if (name.includes(".")) {
			const [outerKey, innerKey] = name.split(".");

			// Ensure we're only working with the *known* nested objects
			if (outerKey === "location" || outerKey === "rates" || outerKey === "seller_info") {
				setFields((prev) => ({
					...prev,
					[outerKey]: {
						...prev[outerKey],
						[innerKey]: value,
					},
				}));
			}
		} else {
			setFields((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleAmenitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target;

		const updatedAmenities = checked
			? [...fields.amenities, value]
			: fields.amenities.filter((item) => item !== value);

		// Update State with updated Array
		setFields((prev) => ({
			...prev,
			amenities: updatedAmenities,
		}));
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		// Clone Images Array
		const updatedImages = [...fields.images];
		if (files) {
			// Add the New Files to the Array

			for (const file in files) {
				updatedImages.push(file); // Use file.name or customize logic as needed
			}
		}

		setFields((prev) => ({
			...prev,
			images: updatedImages,
		}));
	};

	const resetForm = () => setFields({ ...initialFields });

	const clearAmenities = () =>
		setFields((prev) => ({
			...prev,
			amenities: [],
		}));

	const selectAllAmenities = () =>
		setFields((prev) => ({
			...prev,
			amenities: [...amenitiesList],
		}));

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		mounted && (
			<form action="/api/properties" method="POST" encType="multipart/form-data">
				<h2 className="mb-6 text-center text-3xl font-semibold">Add Property</h2>

				<div className="mb-4">
					<label htmlFor="type" className="mb-2 block font-bold text-gray-700">
						Property Type
					</label>
					<select
						id="type"
						name="type"
						className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
						required
						value={fields.type}
						onChange={handleChange}
					>
						<option value="Apartment">Apartment</option>
						<option value="Condo">Condo</option>
						<option value="House">House</option>
						<option value="Cabin Or Cottage">Cabin or Cottage</option>
						<option value="Room">Room</option>
						<option value="Studio">Studio</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<div className="mb-4">
					<label className="mb-2 block font-bold text-gray-700">Listing Name</label>
					<input
						type="text"
						id="name"
						name="name"
						className="mb-2 w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
						placeholder="eg. Beautiful Apartment In Miami"
						required
						value={fields.name}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="description" className="mb-2 block font-bold text-gray-700">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
						rows={4}
						placeholder="Add an optional description of your property"
						value={fields.description}
						onChange={handleChange}
					></textarea>
				</div>

				<div className="mb-4 bg-blue-50 p-4">
					<label className="mb-2 block font-bold text-gray-700">Location</label>
					<input
						type="text"
						id="street"
						name="location.street"
						className="mb-2 w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
						placeholder="Street"
						value={fields.location.street}
						onChange={handleChange}
					/>
					<input
						type="text"
						id="city"
						name="location.city"
						className="mb-2 w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
						placeholder="City"
						required
						value={fields.location.city}
						onChange={handleChange}
					/>
					<input
						type="text"
						id="state"
						name="location.state"
						className="mb-2 w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
						placeholder="State"
						required
						value={fields.location.state}
						onChange={handleChange}
					/>
					<input
						type="text"
						id="zipcode"
						name="location.zipcode"
						className="mb-2 w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
						placeholder="Zipcode"
						value={fields.location.zipcode}
						onChange={handleChange}
					/>
				</div>

				<div className="mb-4 flex flex-wrap">
					<div className="w-full pr-2 sm:w-1/3">
						<label htmlFor="beds" className="mb-2 block font-bold text-gray-700">
							Beds
						</label>
						<input
							type="number"
							id="beds"
							name="beds"
							className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
							required
							value={fields.beds}
							onChange={handleChange}
						/>
					</div>
					<div className="w-full px-2 sm:w-1/3">
						<label htmlFor="baths" className="mb-2 block font-bold text-gray-700">
							Baths
						</label>
						<input
							type="number"
							id="baths"
							name="baths"
							className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
							required
							value={fields.baths}
							onChange={handleChange}
						/>
					</div>
					<div className="w-full pl-2 sm:w-1/3">
						<label htmlFor="square_feet" className="mb-2 block font-bold text-gray-700">
							Square Feet
						</label>
						<input
							type="number"
							id="square_feet"
							name="square_feet"
							className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
							required
							value={fields.square_feet}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="mb-4">
					<label className="mb-2 block font-bold text-gray-700">Amenities</label>

					<div className="mb-2 flex space-x-2">
						<button
							type="button"
							onClick={clearAmenities}
							className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
						>
							Clear Amenities
						</button>
						<button
							type="button"
							onClick={selectAllAmenities}
							className="rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600"
						>
							Select All Amenities
						</button>
					</div>

					<div className="grid grid-cols-2 gap-2 md:grid-cols-3">
						{amenitiesList.map((amenity) => (
							<div key={amenity}>
								<input
									type="checkbox"
									id={`amenity_${amenity}`}
									name="amenities"
									value={amenity}
									className="mr-2"
									checked={fields.amenities.includes(amenity)}
									onChange={handleAmenitiesChange}
								/>
								<label htmlFor={`amenity_${amenity}`}>{amenity}</label>
							</div>
						))}
					</div>
				</div>

				<div className="mb-4 bg-blue-50 p-4">
					<label className="mb-2 block font-bold text-gray-700">
						Rates (Leave blank if not applicable)
					</label>
					<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
						<div className="flex items-center">
							<label htmlFor="weekly_rate" className="mr-2">
								Weekly
							</label>
							<input
								type="number"
								id="weekly_rate"
								name="rates.weekly"
								className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
								value={fields.rates.weekly}
								onChange={handleChange}
							/>
						</div>
						<div className="flex items-center">
							<label htmlFor="monthly_rate" className="mr-2">
								Monthly
							</label>
							<input
								type="number"
								id="monthly_rate"
								name="rates.monthly"
								className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
								value={fields.rates.monthly}
								onChange={handleChange}
							/>
						</div>
						<div className="flex items-center">
							<label htmlFor="nightly_rate" className="mr-2">
								Nightly
							</label>
							<input
								type="number"
								id="nightly_rate"
								name="rates.nightly"
								className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
								value={fields.rates.nightly}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<label htmlFor="seller_name" className="mb-2 block font-bold text-gray-700">
						Seller Name
					</label>
					<input
						type="text"
						id="seller_name"
						name="seller_info.name"
						className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
						placeholder="Name"
						value={fields.seller_info.name}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="seller_email" className="mb-2 block font-bold text-gray-700">
						Seller Email
					</label>
					<input
						type="email"
						id="seller_email"
						name="seller_info.email"
						className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
						placeholder="Email address"
						required
						value={fields.seller_info.email}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="seller_phone" className="mb-2 block font-bold text-gray-700">
						Seller Phone
					</label>
					<input
						type="tel"
						id="seller_phone"
						name="seller_info.phone"
						className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
						placeholder="Phone"
						value={fields.seller_info.phone}
						onChange={handleChange}
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="images" className="mb-2 block font-bold text-gray-700">
						Images (Select up to 4 images)
					</label>
					<input
						type="file"
						id="images"
						name="images"
						className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-gray-400"
						accept="image/*"
						multiple
						required
						onChange={handleImageChange}
					/>
				</div>

				<div></div>

				<div className="flex space-x-2">
					<button
						className="focus:shadow-outline w-full cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
						type="submit"
					>
						Add Property
					</button>
					<button
						type="button"
						onClick={resetForm}
						className="focus:shadow-outline w-full cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none"
					>
						Reset Form
					</button>
				</div>
			</form>
		)
	);
};

export default PropertyAddForm;
