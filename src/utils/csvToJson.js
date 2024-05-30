export function csvToJson(csvString) {
	const lines = csvString.trim().split('\n');
	const headers = lines[0].split(',');
	const data = [];

	for (let i = 1; i < lines.length; i++) {
		const currentLine = lines[i].split(',');
		const jsonObj = {};
		for (let j = 0; j < headers.length; j++) {
			jsonObj[headers[j]] = currentLine[j];
		}
		data.push(jsonObj);
	}

	return {
		headers,
		data,
	};
}
