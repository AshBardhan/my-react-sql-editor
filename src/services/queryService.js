function waitFor(time) {
	return new Promise((resolve) => setTimeout(resolve, time * 1000));
}

export async function QueryService(queryId) {
	await waitFor(0.2);
	const dataIndex = queryId % 3;
	let url = '';
	switch (dataIndex) {
		case 1:
			url = '/data/suppliers.csv';
			break;
		case 2:
			url = '/data/territories.csv';
			break;
		default:
			url = '/data/customers.csv';
			break;
	}

	// Fetch results from mock files
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Network Error ${url}: Status ${response.status}.`);
		}
		return await response.text();
	} catch (error) {
		throw new Error(`Network Error ${url}: ${error.message}`);
	}
}
