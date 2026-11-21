"use strict";
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const {spawn} = require('node:child_process');
const root = path.join(__dirname, 'dist');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.ogg':'audio/ogg','.txt':'text/plain; charset=utf-8'};
let port = Number(process.env.DUSKVAULT_PORT || 8787);
if (!Number.isInteger(port) || port < 1024 || port > 65435) throw Error('Invalid DUSKVAULT_PORT');
const firstPort = port;
const server = http.createServer((req,res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end('Bad request'); return; }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  const relative = path.relative(root, file);
  if (relative.startsWith('..') || path.isAbsolute(relative) || pathname.includes('\0') || pathname.includes(':')) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile() || !types[path.extname(file)]) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type':types[path.extname(file)],'Content-Length':stat.size,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    if (req.method === 'HEAD') {res.end(); return;}
    const stream = fs.createReadStream(file);
    stream.on('error', () => res.destroy());
    stream.pipe(res);
  });
});
server.on('error', err => {
  if (err.code === 'EADDRINUSE' && port < firstPort + 20) { port++; server.listen(port, '127.0.0.1'); return; }
  console.error('Cannot start the game:', err.message); process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  const url = 'http://127.0.0.1:' + port + '/';
  console.log('\nDUSKVAULT - Offline Playtest\n\nOpen: ' + url + '\nKeep this window open while playing. Close it to stop the server.\n');
  if (process.platform === 'win32' && !process.argv.includes('--no-browser')) {
    const browser = spawn('cmd.exe', ['/d','/c','start','',url], {windowsHide:true, stdio:'ignore'});
    browser.on('error', () => console.log('Open the URL above in your browser.'));
  }
});
process.on('SIGINT', () => server.close(() => process.exit(0)));
