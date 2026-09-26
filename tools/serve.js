// Local dev server for the whole Rosetta Education site.
//   node tools/serve.js          then open http://localhost:8123
// It serves the repo root and applies the same rewrites as vercel.json, so /marginal works exactly as it does online.
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 8123;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };

let rewrites = [];
try { rewrites = (JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8')).rewrites || []); } catch (e) { /* no rewrites */ }

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  const rw = rewrites.find(r => r.source === url);
  if (rw) url = rw.destination;
  let p = path.join(ROOT, url);
  // never serve hidden files (.git, .env…), dependencies, or the dev tools themselves
  const blocked = path.relative(ROOT, p).split(path.sep).some(s => s.startsWith('.') || s === 'node_modules' || s === 'tools');
  if (!p.startsWith(ROOT) || blocked) { res.writeHead(403, { 'Content-Type': 'text/plain' }); return res.end('Forbidden'); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Rosetta Education running at http://localhost:${PORT}  (course: http://localhost:${PORT}/marginal)`));
