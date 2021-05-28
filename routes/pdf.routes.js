const Router = require('../classes/Router');

const router = new Router();

router.post.on(/^\/api\/pdf\/create$/, function (req, res) {
  res.end(`/api/pdf/create`);
});

router.post.on(/^\/api\/pdf\/10k$/, function (req, res) {
  res.end(`/api/pdf/10k`);
});

router.get.on(/^\/api\/pdf\/10k$/, function (req, res) {
  res.end(`/api/pdf/10k`);
});

module.exports = router;
