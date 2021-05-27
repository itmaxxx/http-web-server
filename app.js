require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const Emitter = require('./classes/EventEmmiter');

const port = process.env.PORT || 5000;

const app = new Emitter();

app.on(/^\/files\/(\d{0,9})$/, function (req, res) {
  console.log('/files/[id]', this.matches);

  res.end(`/files/${this.matches[1]}`);
});

app.on(/^\/user\/(\d{0,9})\/(.+)$/, function (req, res) {
  console.log('/user/[id]/[string]', this.matches);

  res.end(`/user/${this.matches[1]}/${this.matches[2]}`);
});

app.on(/^\/pdf\/(\d{0,9})$/, function (req, res) {
  console.log('/pdf/[id]', this.matches);

  res.end(`/pdf/${this.matches[1]}`);
});

app.on(/^\/$/, function (req, res) {
  console.log('/');

  res.end('Hi there');
});

app.on(/.+/, function (req, res) {
  res.end('*');
});

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      app.emit(req.url, req, res);
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
