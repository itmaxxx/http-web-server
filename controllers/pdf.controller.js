const pdf = require('pdf-creator-node');
const fs = require('fs');
const path = require('path');

function generateUserPDF(user) {
	let html = fs.readFileSync(
		path.join(__dirname, '../assets/html/user.html'),
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

function generateUsersPDF(users) {
	let html = fs.readFileSync(
		path.join(__dirname, '../assets/html/users.html'),
		'utf8'
	);

	let options = {
		format: 'A4',
		orientation: 'portrait',
		border: '10mm',
		footer: {
			height: '28mm',
			contents: {
				default:
					'<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>'
			}
		},
		timeout: 3600 * 60
	};

	let tempPath = path.join(__dirname, '../public/10k-temp.pdf');
	let outputPath = path.join(__dirname, '../public/10k.pdf');

	let document = {
		html: html,
		data: { users },
		path: tempPath
	};

	pdf
		.create(document, options)
		.then((res) => {
			fs.rename(res.filename, outputPath, (error) => {
				if (error) throw error;

				console.log('10k file created and saved');
			});
		})
		.catch((error) => {
			console.error(error);
		});
}

module.exports = { generateUserPDF, generateUsersPDF };
