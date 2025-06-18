import PropertyAddForm from "@/components/PropertyAddForm";

const AddPropertyPage = () => {
	return (
		<section className="bg-blue-50">
			<div className="container m-auto max-w-2xl py-24">
				<div className="m-4 mb-4 rounded-md border border-gray-300 bg-white px-6 py-8 shadow-md focus:outline-gray-400 md:m-0">
					<PropertyAddForm />
				</div>
			</div>
		</section>
	);
};

export default AddPropertyPage;
