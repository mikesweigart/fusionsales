// IndexNow submitter — pings Bing (which powers ChatGPT Search & Copilot),
// Yandex, Seznam, and other participating engines to recrawl our pages within
// hours instead of waiting for an organic crawl.
//
// Usage:  npm run indexnow   (run AFTER a deploy, so the key file + pages are live)
//
// How it works: we host the key at https://fusionsales.ai/<key>.txt. When we
// submit URLs, the engines fetch that file to confirm we own the domain, then
// queue the URLs for recrawl. Re-running is safe (engines dedupe).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SITE = 'https://fusionsales.ai';
const HOST = 'fusionsales.ai';
const KEY = '6735bded0b64755aa53d98829b2d25bb';
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

// Pull the canonical URL list straight from the generated sitemap.
const sitemapPath = path.join(root, 'dist', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('[indexnow] dist/sitemap.xml not found — run `npm run build` first.');
  process.exit(1);
}
const xml = fs.readFileSync(sitemapPath, 'utf-8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) {
  console.error('[indexnow] No <loc> URLs found in sitemap.');
  process.exit(1);
}

const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
console.log(`[indexnow] Submitting ${urlList.length} URLs to IndexNow…`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

console.log(`[indexnow] Response: ${res.status} ${res.statusText}`);
if (res.status === 200 || res.status === 202) {
  console.log('[indexnow] Accepted — participating engines (Bing, Yandex, …) will recrawl shortly.');
} else {
  const text = await res.text().catch(() => '');
  console.error('[indexnow] Unexpected status. Common causes: 403 = key file not live yet (deploy first); 422 = key/host mismatch.');
  if (text) console.error('[indexnow] Body:', text.slice(0, 500));
  process.exit(1);
}
