import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { resolve, extname } from 'path';

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

export async function servePages(opts) {
  const { root, port, open: shouldOpen } = opts;
  const docsDir = resolve(root, 'docs');

  const server = createServer((req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url;
    const filePath = resolve(docsDir, url.slice(1));

    if (!existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = extname(filePath);
    const mime = MIME[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': mime });
    res.end(readFileSync(filePath));
  });

  server.listen(parseInt(port), () => {
    console.log(`Serving resume site at http://localhost:${port}`);
  });

  if (shouldOpen) {
    const openModule = await import('open');
    openModule.default(`http://localhost:${port}`);
  }
}
