const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;
  res.end('Hello, World!');
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
