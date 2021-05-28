require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const Router = require('./classes/Router');
const usersRoutes = require('./routes/users.routes');
const pdfRoutes = require('./routes/pdf.routes');

const port = process.env.PORT || 5000;

const app = new Router();

app.addRoutes(usersRoutes);
app.addRoutes(pdfRoutes);

const server = http.createServer(async (req, res) => {
	// Fill req.body
	await req.on('data', (chunk) => {
		let body = chunk.toString().split('&');
		let bodyRes = {};

		body.forEach((p) => {
			let v = p.split('=');

			bodyRes[v[0]] = decodeURIComponent(v[1]);
		});

		req.body = bodyRes;
	});

	switch (req.method) {
		case 'GET':
			app.get.emit(req.url, req, res);
			break;
		case 'POST':
			app.post.emit(req.url, req, res);
			break;
		case 'DELETE':
			app.delete.emit(req.url, req, res);
			break;
		default:
			res.end(JSON.stringify({ error: http.STATUS_CODES[404] }));
			break;
	}
});

async function start() {
	try {
		await mongoose.connect(process.env.MONGOURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			autoIndex: true
		});

		server.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	} catch (e) {
		console.error('Server start error', e.message);

		process.exit(1);
	}
}

start();
