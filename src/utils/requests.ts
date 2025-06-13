const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch All Properties
export async function fetchProperties() {
	try {
		// Handle the case when the domain is not available
		if (!apiDomain) return [];

		const res = await fetch(`${apiDomain}/properties`);
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return res.json();
	} catch (error) {
		console.error("Error fetching properties:", error);
		return [];
	}
}

// Fetch Property by ID
export async function fetchProperty(id: string) {
	try {
		// Handle the case when the domain is not available
		if (!apiDomain) return null;

		const res = await fetch(`${apiDomain}/properties/${id}`);
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return res.json();
	} catch (error) {
		console.error("Error fetching properties:", error);
		return null;
	}
}
