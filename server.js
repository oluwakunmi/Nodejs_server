const http = require('node:http');
const os = require('os');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.url === '/') {
    const delay = Math.floor(Math.random() * 5000) + 1000;

    setTimeout(() => {
      res.setHeader('Content-Type', 'text/plain');

      res.end(`Hello, client! (Delayed by ${delay / 1000} seconds)`);
    }, delay);
  } else if (req.url === '/system-info') {
    const cpus = os.cpus();
    const osInfo = {
      platform: os.platform(),
      architecture: os.arch(),
      cpuModel: cpus[0].model,
      cpuCount: cpus.length,
      totalMemory: os.totalmem(),
    };

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(osInfo));
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});

