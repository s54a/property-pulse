interface Location {
	street: string;
	city: string;
	state: string;
	zipcode: string;
}

interface Rates {
	nightly?: number;
	weekly?: number;
	monthly?: number;
}

interface SellerInfo {
	name: string;
	email: string;
	phone: string;
}

export interface Property {
	_id: string;
	owner: string; // ObjectId as a string
	name: string;
	type: string;
	description?: string;
	location: Location;
	beds: number;
	baths: number;
	square_feet: number;
	amenities?: string[];
	rates?: Rates;
	seller_info: SellerInfo;
	images: string[];
	is_featured?: boolean;
	createdAt: Date;
	updatedAt: Date;
	// createdAt: String | Date;
	// updatedAt: String | Date;
}

export interface PropertyData {
	type: FormDataEntryValue | null;
	name: FormDataEntryValue | null;
	description: FormDataEntryValue | null;
	location: {
		street: FormDataEntryValue | null;
		city: FormDataEntryValue | null;
		state: FormDataEntryValue | null;
		zipcode: FormDataEntryValue | null;
	};
	beds: FormDataEntryValue | null;
	baths: FormDataEntryValue | null;
	square_feet: FormDataEntryValue | null;
	amenities: FormDataEntryValue[];
	rates: {
		nightly: FormDataEntryValue | null;
		weekly: FormDataEntryValue | null;
		monthly: FormDataEntryValue | null;
	};
	seller_info: {
		name: FormDataEntryValue | null;
		email: FormDataEntryValue | null;
		phone: FormDataEntryValue | null;
	};
	owner: string;
	images: string[];
}
