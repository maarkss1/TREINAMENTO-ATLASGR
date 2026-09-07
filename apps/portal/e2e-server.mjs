import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, 'out');
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  const requestedPath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  let filePath = resolve(root, requestedPath);

  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  try {
    let metadata;
    try {
      metadata = await stat(filePath);
    } catch {
      // If not found directly, try appending .html (Clean URLs in static exports)
      if (existsSync(`${filePath}.html`)) {
        filePath = `${filePath}.html`;
        metadata = await stat(filePath);
      } else {
        throw new Error('Not found');
      }
    }

    if (metadata.isDirectory()) {
      filePath = resolve(filePath, 'index.html');
      await stat(filePath);
    }

    response.writeHead(200, { 'content-type': mimeTypes[extname(filePath)] ?? 'application/octet-stream' });
    createReadStream(filePath).pipe(response);
  } catch {
    // Fallback to 404.html if exists
    const notFoundPath = resolve(root, '404.html');
    if (existsSync(notFoundPath)) {
      response.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
      createReadStream(notFoundPath).pipe(response);
    } else {
      response.writeHead(404).end('Not found');
    }
  }
});

server.listen(3020, '127.0.0.1');

const shutdown = () => server.close(() => process.exit(0));
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
