const Router = require('../classes/Router');
const {
	generateUserPDF,
	generateUsersPDF
} = require('../controllers/pdf.controller');
const { findUser, getRandomUser } = require('../controllers/users.controller');

const router = new Router();

router.post.on(/^\/api\/pdf\/create$/, async function (req, res) {
	try {
		const { user_id } = req.body;

		let data = await findUser(user_id);
		let user = {};

		Object.assign(user, data['_doc']);

		let stream = await generateUserPDF(user);

		res.writeHead(200, {
			'Content-Type': 'application/pdf'
		});

		stream.pipe(res);
	} catch (error) {
		console.error(error);

		res.writeHead(400, {
			'Content-Type': 'application/json'
		});

		return res.end(JSON.stringify(error));
	}
});

router.post.on(/^\/api\/pdf\/10k$/, async function (req, res) {
	try {
		let data = await getRandomUser();
		let user = {};

		Object.assign(user, data['_doc']);

		let users = new Array(10000);
		users.fill(user);

		generateUsersPDF(users);

		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		return res.end(
			JSON.stringify({
				success: true,
				message: 'Your file is processing, it will take some time'
			})
		);
	} catch (error) {
		console.error(error);

		res.writeHead(400, {
			'Content-Type': 'application/json'
		});

		return res.end(JSON.stringify(error));
	}
});

router.get.on(/^\/api\/pdf\/10k$/, function (req, res) {
	res.end(`/api/pdf/10k`);
});

module.exports = router;
