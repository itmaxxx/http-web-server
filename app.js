require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.method !== 'GET') {
    res.end(
      JSON.stringify({ error: http.STATUS_CODES[405] })
    );
  } else {
    if (req.url === '/') {
      res.end(`<h1>Hello World</h1>`);
    }
    if (req.url === '/hello') {
      res.end(`<h1>Hello</h1>`);
    }
  }

  res.end(
    JSON.stringify({ error: http.STATUS_CODES[404] })
  );
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
