"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import { Property } from "@/types";
import Link from "next/link";
import PropertyImageHeader from "@/components/PropertyImageHeader";
import PropertyDetails from "@/components/PropertyDetails";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = () => {
	const { id } = useParams();
	const [property, setProperty] = useState<Property | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPropertyData = async () => {
			if (!id) return null;

			// Ensure id is a string
			const propertyId = Array.isArray(id) ? id[0] : id;

			try {
				const property = await fetchProperty(propertyId);
				setProperty(property);
			} catch (error) {
				console.log("Error Fetching Property:" + error);
			} finally {
				setLoading(false);
			}
		};

		if (property === null) {
			fetchPropertyData();
		}
	}, [id, property]);

	if (!property && !loading) {
		return <h1 className="mt-10 text-center text-2xl font-bold">Property Not Found</h1>;
	}

	// console.log(property);

	return (
		<>
			{loading && <Spinner loading={loading} />}
			{!loading && property && (
				<>
					{/* <!-- Property Header Image --> */}
					<PropertyImageHeader image={property.images[0]} />

					{/* <!-- Go Back --> */}
					<section>
						<div className="container m-auto px-6 py-6">
							<Link
								href="/properties"
								className="flex items-center text-blue-500 hover:text-blue-600"
							>
								<FaArrowLeft className="mr-2" /> Back to Properties
							</Link>
						</div>
					</section>

					{/* <!-- Property Info --> */}
					<section className="bg-blue-50">
						<div className="container m-auto px-6 py-10">
							<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[70%_28%]">
								<PropertyDetails property={property} />

								{/* <!-- Sidebar --> */}
								<aside className="space-y-4">
									<button className="flex w-full items-center justify-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
										<i className="fas fa-bookmark mr-2"></i> Bookmark Property
									</button>
									<button className="flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600">
										<i className="fas fa-share mr-2"></i> Share Property
									</button>

									{/* <!-- Contact Form --> */}
									<div className="rounded-lg bg-white p-6 shadow-md">
										<h3 className="mb-6 text-xl font-bold">Contact Property Manager</h3>
										<form>
											<div className="mb-4">
												<label
													className="mb-2 block text-sm font-bold text-gray-700"
													htmlFor="name"
												>
													Name:
												</label>
												<input
													className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
													id="name"
													type="text"
													placeholder="Enter your name"
													required
												/>
											</div>
											<div className="mb-4">
												<label
													className="mb-2 block text-sm font-bold text-gray-700"
													htmlFor="email"
												>
													Email:
												</label>
												<input
													className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
													id="email"
													type="email"
													placeholder="Enter your email"
													required
												/>
											</div>
											<div className="mb-4">
												<label
													className="mb-2 block text-sm font-bold text-gray-700"
													htmlFor="phone"
												>
													Phone:
												</label>
												<input
													className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
													id="phone"
													type="text"
													placeholder="Enter your phone number"
												/>
											</div>
											<div className="mb-4">
												<label
													className="mb-2 block text-sm font-bold text-gray-700"
													htmlFor="message"
												>
													Message:
												</label>
												<textarea
													className="focus:shadow-outline h-44 w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
													id="message"
													placeholder="Enter your message"
												></textarea>
											</div>
											<div>
												<button
													className="focus:shadow-outline flex w-full items-center justify-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
													type="submit"
												>
													<i className="fas fa-paper-plane mr-2"></i> Send Message
												</button>
											</div>
										</form>
									</div>
								</aside>
							</div>
						</div>
					</section>
					<PropertyImages images={property.images} />
				</>
			)}
		</>
	);
};

export default PropertyPage;
