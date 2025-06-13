import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types";
import { fetchProperties } from "@/utils/requests";

const PropertiesPage = async () => {
	const properties = await fetchProperties();
	// console.log(properties);

	// Sort By Date
	properties.sort(
		(a: Property, b: Property) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
	);

	return (
		<section className="px-4 py-6">
			<div className="container-xl m-auto px-4 py-6 lg:container">
				{properties.length === 0 ? (
					<p>No Properties Found</p>
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						{properties.map((property: Property) => (
							<PropertyCard key={property._id} property={property}></PropertyCard>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default PropertiesPage;
