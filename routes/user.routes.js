const Router = require('../classes/Router');

const router = new Router();

router.post.on(
  /^\/api\/user\/create$/,
  function (req, res) {
    res.end(`/api/users/create`);
  }
);

router.get.on(
  /^\/api\/user\/(\d{0,9})$/,
  function (req, res) {
    console.log();
    res.end(`/api/users/${this.matches[1]}`);
  }
);

router.delete.on(
  /^\/api\/user\/delete$/,
  function (req, res) {
    res.end(`/api/users/delete`);
  }
);

module.exports = router;
