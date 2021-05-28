const Router = require('../classes/Router');

const router = new Router();

router.get.on(/.+/, function (req, res) {
  res.writeHead(404, {
    'Content-Type': 'application/json',
  });
  res.end(
    JSON.stringify({ error: 'Page not found [GET]' })
  );
});

router.post.on(/.+/, function (req, res) {
  res.writeHead(404, {
    'Content-Type': 'application/json',
  });
  res.end(
    JSON.stringify({ error: 'Page not found [POST]' })
  );
});

router.delete.on(/.+/, function (req, res) {
  res.writeHead(404, {
    'Content-Type': 'application/json',
  });
  res.end(
    JSON.stringify({ error: 'Page not found [DELETE]' })
  );
});

module.exports = router;
