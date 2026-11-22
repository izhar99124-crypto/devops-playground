const http = require('http');
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const event = req.headers['x-github-event'] || 'unknown';
      console.log('Received webhook event:', event);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Webhook received\n');
    });
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('GitHub App is alive!\n');
});
server.listen(3000, () => console.log('Server running on port 3000'));
