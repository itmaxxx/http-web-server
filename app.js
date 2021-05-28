require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const Router = require('./classes/Router');
const userRoutes = require('./routes/user.routes');
const pdfRoutes = require('./routes/pdf.routes');
const otherRoutes = require('./routes/other.routes');

const port = process.env.PORT || 5000;

const app = new Router();

app.addRoutes(userRoutes);
app.addRoutes(pdfRoutes);
// Handle any other routes for get, post, delete
app.addRoutes(otherRoutes);

const server = http.createServer(async (req, res) => {
  // Fill req.body
  await req.on('data', (chunk) => {
    let body = chunk.toString().split('&');
    let bodyRes = {};

    body.forEach((p) => {
      let v = p.split('=');

      bodyRes[v[0]] = v[1].replace(/%20/g, ' ');
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
      res.end(
        JSON.stringify({ error: http.STATUS_CODES[404] })
      );
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
    console.error('Server start error', e.message);

    process.exit(1);
  }
}

start();
