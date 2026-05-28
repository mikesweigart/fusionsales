// One-off tooling (run via `npm run og`): rasterize public/og.svg → public/og.png
// at 1200×630. Needed because several share surfaces (LinkedIn, iMessage, some
// Slack/WhatsApp unfurls) won't render an SVG OG image, and because Google's
// Article/Organization rich results want a raster image. The PNG is committed as
// a static asset; this script is NOT part of the deploy build (keeps it fast).
//
// Re-run after editing og.svg:  npm run og

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const svgPath = path.join(root, 'public', 'og.svg');
const pngPath = path.join(root, 'public', 'og.png');

const svg = fs.readFileSync(svgPath);

// Render the SVG at 2× density for crisp text, then fit to exact OG dimensions.
await sharp(svg, { density: 144 })
  .resize(1200, 630, { fit: 'fill', background: '#ffffff' })
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(pngPath);

const { size } = fs.statSync(pngPath);
console.log(`[make-og] Wrote public/og.png — ${(size / 1024).toFixed(0)} KB (1200×630)`);
