require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const Router = require("./classes/Router");

const port = process.env.PORT || 5000;

const app = new Router();

app.get.on(/^\/pdf\/(\d{0,9})$/, function (req, res) {
	res.end(`/pdf/${this.matches[1]}`);
});

app.get.on(/^\/$/, function (req, res) {
	res.end("Hi there");
});

const userRoutes = require("./routes/user.routes");

Object.values(userRoutes.get._patternEvents).forEach((f, i) => {
	if (typeof f !== "function") return;

	let pattern = Object.keys(userRoutes.get._patternEvents)[i];
	let reg = pattern.substr(1, pattern.length - 2);

	app.get.on(new RegExp(reg), function (req, res) {
		f(req, res);
	});

	console.log(`added listener for ${pattern} #${i}`);
});

console.log(app.get._patternEvents);

let pattern = /^\/api\/user$/g;
console.log(new RegExp(pattern));

// app.get = userRoutes.get;

// console.log(app.get);

// ALL OTHER ROUTES CATCHERS

// app.get.on(/.+/, function (req, res) {
// 	res.writeHead(404, {
// 		"Content-Type": "application/json",
// 	});
// 	res.end(JSON.stringify({ error: "Page not found [GET]" }));
// });

// app.post.on(/.+/, function (req, res) {
// 	res.writeHead(404, {
// 		"Content-Type": "application/json",
// 	});
// 	res.end(JSON.stringify({ error: "Page not found [POST]" }));
// });

// app.delete.on(/.+/, function (req, res) {
// 	res.writeHead(404, {
// 		"Content-Type": "application/json",
// 	});
// 	res.end(JSON.stringify({ error: "Page not found [DELETE]" }));
// });

const server = http.createServer(async (req, res) => {
	await req.on("data", (chunk) => {
		let body = chunk.toString().split("&");
		let bodyRes = {};

		body.forEach((p) => {
			let v = p.split("=");

			bodyRes[v[0]] = v[1].replace(/%20/g, " ");
		});

		req.body = bodyRes;
	});

	switch (req.method) {
		case "GET":
			app.get.emit(req.url, req, res);
			break;
		case "POST":
			app.post.emit(req.url, req, res);
			break;
		case "DELETE":
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
			autoIndex: true,
		});

		server.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	} catch (e) {
		console.error("Server start error", e.message);

		process.exit(1);
	}
}

start();
