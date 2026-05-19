// Static prerender for FusionSales.ai
// Renders every published route to a static HTML file at build time so
// AI search crawlers (Perplexity, ChatGPT browse, Brave, You.com) and
// classic crawlers all see full HTML — not an empty SPA shell.
//
// Pipeline:
//   1. `vite build` produces the client bundle in dist/
//   2. `vite build --ssr src/entry-server.jsx --outDir dist/server` produces the SSR bundle
//   3. This script imports the SSR bundle, renders every route, and writes
//      static HTML files into dist/ alongside the client assets

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const serverDir = path.join(distDir, 'server');

// ---- Load the SSR bundle ----
const ssrEntry = path.join(serverDir, 'entry-server.js');
if (!fs.existsSync(ssrEntry)) {
  console.error(`[prerender] SSR bundle not found at ${ssrEntry}`);
  console.error('Run vite build --ssr src/entry-server.jsx --outDir dist/server first.');
  process.exit(1);
}
const { render, ARTICLES, getArticle, getAuthor } = await import(pathToFileURL(ssrEntry).href);

// ---- Read the built client index.html as our template ----
const templatePath = path.join(distDir, 'index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// ---- Build the route list ----
// Home + Insights index + every article (published and coming-soon get the page;
// coming-soon shows the stub treatment but still gets indexed metadata.)
const ROUTES = [
  { url: '/', kind: 'home' },
  { url: '/insights', kind: 'insights-index' },
  ...ARTICLES.map((a) => ({ url: `/insights/${a.slug}`, kind: 'article', slug: a.slug })),
];

console.log(`[prerender] Rendering ${ROUTES.length} routes`);

// ---- Helpers ----
const SITE = 'https://fusionsales.ai';

const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function metaTagsFor(routeInfo) {
  const { url, kind } = routeInfo;
  const canonical = `${SITE}${url === '/' ? '/' : url}`;

  let title;
  let description;
  let ogTitle;
  let ogDescription;
  let ogType = 'website';
  let schema = null;
  let extraMeta = '';

  if (kind === 'home') {
    title = 'FusionSales.ai — Own the software your business runs on';
    description =
      "Stop renting your software. Start owning it. Custom-built CRMs, quote tools, and scheduling — at a fraction of what you pay today. Yours forever. It's finally possible.";
    ogTitle = 'Stop renting your software. Start owning it.';
    ogDescription =
      "Custom-built CRMs, quote tools, and scheduling — at a fraction of what you pay today. Yours forever. It's finally possible.";
  } else if (kind === 'insights-index') {
    title = 'Insights — FusionSales.ai';
    description =
      'Long-form articles on custom software, automation, and operational leverage — from the FusionSales.ai team.';
    ogTitle = 'Insights — FusionSales.ai';
    ogDescription =
      'Long-form articles on custom software, automation, and operational leverage.';
  } else {
    // article
    const article = getArticle(routeInfo.slug);
    if (!article) {
      title = 'Article not found — FusionSales.ai';
      description = '';
      ogTitle = title;
      ogDescription = '';
    } else {
      title = `${article.title} — FusionSales.ai`;
      description = article.excerpt;
      ogTitle = article.title;
      ogDescription = article.excerpt;
      ogType = 'article';
      const author = getAuthor(article.author);
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        author: author
          ? { '@type': 'Person', name: author.name, jobTitle: author.title }
          : undefined,
        publisher: {
          '@type': 'Organization',
          name: 'FusionSales.ai',
          url: SITE,
          logo: { '@type': 'ImageObject', url: `${SITE}/favicon.svg` },
        },
        datePublished: article.date || undefined,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        articleSection: article.category,
      };
      if (article.readTime) {
        extraMeta += `<meta name="twitter:label1" content="Reading time" />\n    <meta name="twitter:data1" content="${article.readTime} min read" />\n    `;
      }
      if (author) {
        extraMeta += `<meta name="author" content="${escapeHtml(author.name)}" />\n    `;
      }
    }
  }

  let head = `<title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(ogDescription)}" />
    <meta property="og:image" content="${SITE}/og.svg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(ogDescription)}" />
    <meta name="twitter:image" content="${SITE}/og.svg" />
    ${extraMeta}`;

  if (schema) {
    head += `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
  }

  return head;
}

function buildHtml(routeInfo, appHtml) {
  const headTags = metaTagsFor(routeInfo);

  // Replace the template's <title> + description + canonical/OG/twitter blocks with our per-route ones.
  // We strip the original block between <meta name="viewport"> and the favicon link, then inject ours.
  let html = template;

  // Remove the original title (template ships with a default)
  html = html.replace(/<title>[\s\S]*?<\/title>/, '');
  // Remove the original description meta
  html = html.replace(/<meta name="description"[^>]*>/, '');
  // Remove the original canonical link
  html = html.replace(/<link rel="canonical"[^>]*>/, '');
  // Remove all original og: meta tags
  html = html.replace(/<meta property="og:[^"]+" content="[^"]*"\s*\/?>/g, '');
  // Remove all original twitter: meta tags
  html = html.replace(/<meta name="twitter:[^"]+" content="[^"]*"\s*\/?>/g, '');
  // Remove old Organization JSON-LD (we re-emit per page; on article pages we add Article schema)
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');

  // Inject our per-route head tags just before </head>
  html = html.replace('</head>', `${headTags}\n  </head>`);

  // Inject pre-rendered body into #root
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  // Add a small crawler hint comment for transparency
  html = html.replace(
    '<body',
    `<!-- Pre-rendered at build time for crawler / AI-search visibility. SPA hydrates on load. -->\n  <body`
  );

  return html;
}

// ---- Render each route ----
let success = 0;
let failures = 0;
for (const routeInfo of ROUTES) {
  try {
    const appHtml = render(routeInfo.url);
    const html = buildHtml(routeInfo, appHtml);

    let outPath;
    if (routeInfo.url === '/') {
      outPath = path.join(distDir, 'index.html');
    } else {
      outPath = path.join(distDir, routeInfo.url, 'index.html');
    }
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf-8');
    success++;
    if (success % 10 === 0) console.log(`[prerender]   ${success}/${ROUTES.length}…`);
  } catch (err) {
    failures++;
    console.error(`[prerender] FAILED ${routeInfo.url}:`, err.message);
  }
}

// ---- Clean up SSR bundle (not needed in production) ----
fs.rmSync(serverDir, { recursive: true, force: true });

console.log(`[prerender] Done. ${success} routes rendered, ${failures} failures.`);
if (failures > 0) process.exit(1);
