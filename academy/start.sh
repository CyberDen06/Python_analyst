#!/bin/sh
# Data Academy launcher — starts the local server and opens the browser.
cd "$(dirname "$0")"
(sleep 2; open "http://localhost:8080" 2>/dev/null || xdg-open "http://localhost:8080" 2>/dev/null || true) &
echo "Starting Data Academy at http://localhost:8080 (Ctrl+C to stop)"
node server.js
