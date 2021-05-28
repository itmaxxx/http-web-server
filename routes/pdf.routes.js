const Router = require('../classes/Router');

const router = new Router();

router.post.on(/^\/pdf\/create$/, function (req, res) {
  res.end(`/pdf/create`);
});

router.post.on(/^\/pdf\/10k$/, function (req, res) {
  res.end(`/pdf/10k`);
});

router.get.on(/^\/pdf\/10k$/, function (req, res) {
  res.end(`/pdf/10k`);
});

module.exports = router;
