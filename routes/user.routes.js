const Router = require("../classes/Router");

const router = new Router();

// router.post.on(/^\/api\/user\/(\d{0,9})$/, function (req, res) {
// 	res.end(`/api/user/${this.matches[1]}`);
// });

router.get.on(/^\/api\/user\/(\d{0,9})$/, function (req, res) {
  console.log();
	res.end(`/api/user/${this.matches[1]}`);
});

router.get.on(/^\/api\/user$/, function (req, res) {
	res.end(`/api/user/`);
});

module.exports = router;
