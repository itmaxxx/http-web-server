const Router = require('../classes/Router');
const { generatePDF } = require('../controllers/pdf.controller');
const { findUser } = require('../controllers/users.controller');

const router = new Router();

router.post.on(/^\/api\/pdf\/create$/, async function (req, res) {
	const { user_id } = req.body;

	let data = await findUser(user_id);
	let user = {};

	Object.assign(user, data);

	let stream = await generatePDF(user['_doc']);

	res.writeHead(200, {
		'Content-Type': 'application/pdf'
	});

	stream.pipe(res);
});

router.post.on(/^\/api\/pdf\/10k$/, function (req, res) {
	res.end(`/api/pdf/10k`);
});

router.get.on(/^\/api\/pdf\/10k$/, function (req, res) {
	res.end(`/api/pdf/10k`);
});

module.exports = router;
