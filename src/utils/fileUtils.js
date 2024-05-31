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

export function jsonToCsv(jsonData) {
	const header = Object.keys(jsonData[0]);
	const headerString = header.join(',');

	const replacer = (_key, value) => value ?? '';
	const rows = jsonData.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','));

	const csv = [headerString, ...rows].join('\r\n');
	return csv;
}

export function downloadFile(data, fileName, fileType = 'json') {
	let dataString = fileType === 'csv' ? jsonToCsv(data) : JSON.stringify(data);
	let dataType = fileType === 'csv' ? 'text/csv' : 'application/json';

	const blob = new Blob([dataString], {type: dataType});
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = fileName;

	document.body.appendChild(link);
	link.click();

	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}
