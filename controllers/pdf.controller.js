const pdf = require('pdf-creator-node');
const fs = require('fs');
const path = require('path');

function generatePDF(user) {
	let html = fs.readFileSync(
		path.join(__dirname, '../assets/html/template.html'),
		'utf8'
	);

	let options = {
		format: 'A4',
		orientation: 'portrait',
		border: '10mm'
	};

	let document = {
		html: html,
		data: user,
		type: 'stream'
	};

	return pdf.create(document, options);
}

module.exports = { generatePDF };
