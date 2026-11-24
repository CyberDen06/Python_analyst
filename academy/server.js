// Data Academy — minimal static file server (Node.js, no dependencies)
// Serves the academy folder and maps /datasets/* to the CSV files.
// Usage: node server.js [port]   (default port 8080)

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = parseInt(process.argv[2] || process.env.PORT || "8080", 10);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function safePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const full = path.join(ROOT, clean);
  if (!full.startsWith(ROOT)) return null; // path traversal guard
  return full;
}

const server = http.createServer((req, res) => {
  let urlPath = req.url === "/" ? "/index.html" : req.url;
  const full = safePath(urlPath);
  if (!full) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(full, (err, stat) => {
    if (err || !stat.isFile()) {
      // SPA fallback: send index.html for unknown paths without an extension
      if (!path.extname(urlPath)) {
        fs.readFile(path.join(ROOT, "index.html"), (e2, buf) => {
          if (e2) {
            res.writeHead(404);
            res.end("Not found");
            return;
          }
          res.writeHead(200, { "Content-Type": MIME[".html"] });
          res.end(buf);
        });
        return;
      }
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(full).toLowerCase();
    fs.readFile(full, (e, data) => {
      if (e) {
        res.writeHead(500);
        res.end("Server error");
        return;
      }
      res.writeHead(200, {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`\n  Data Academy is running at  http://localhost:${PORT}\n`);
});