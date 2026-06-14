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
const { render, ARTICLES, AUTHORS, getArticle, getAuthor, FAQS, PRICING } = await import(pathToFileURL(ssrEntry).href);

// ---- Read the built client index.html as our template ----
const templatePath = path.join(distDir, 'index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// ---- Build the route list ----
// Home + Insights index + every article (published and coming-soon get the page;
// coming-soon shows the stub treatment but still gets indexed metadata.)
// Tool pages with their SEO metadata (kept in sync with each tool component)
const TOOLS = {
  'automation-hub': {
    title: 'Workflow Automation Hub — interactive demo — FusionSales.ai',
    description: 'Build a workflow automation in your browser: pick a trigger, add the actions, and watch it run end-to-end. A hands-on demo of the custom automation hubs FusionSales builds.',
  },
  'sales-copilot': {
    title: 'AI Sales Copilot — interactive CRM demo — FusionSales.ai',
    description: 'Try an AI sales copilot: add a lead and watch it get enriched and scored, click a deal for the next-best action and a drafted follow-up, and advance the pipeline. A demo of the custom CRMs FusionSales builds.',
  },
  'smart-scheduling': {
    title: 'Smart Scheduling — interactive demo — FusionSales.ai',
    description: 'Set staff availability and daily demand, then auto-schedule the week and see coverage gaps flagged. A demo of the custom workforce-scheduling software FusionSales builds.',
  },
  'loyalty-engine': {
    title: 'Marketing & Loyalty Engine — interactive demo — FusionSales.ai',
    description: 'Pick customer segments, set a tailored offer for each, run the campaign, and watch personalized sends fill the funnel. A demo of the loyalty software FusionSales builds.',
  },
};

const ROUTES = [
  { url: '/', kind: 'home' },
  { url: '/insights', kind: 'insights-index' },
  ...ARTICLES.map((a) => ({ url: `/insights/${a.slug}`, kind: 'article', slug: a.slug })),
  ...Object.keys(AUTHORS).map((key) => ({ url: `/insights/authors/${key}`, kind: 'author-page', author: key })),
  { url: '/tools', kind: 'tools-index' },
  ...Object.keys(TOOLS).map((slug) => ({ url: `/tools/${slug}`, kind: 'tool', slug })),
  { url: '/ideas', kind: 'ideas-index' },
];

console.log(`[prerender] Rendering ${ROUTES.length} routes`);

// ---- Helpers ----
const SITE = 'https://fusionsales.ai';

// Organization schema (re-emitted on home; the template copy is stripped during build)
const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FusionSales.ai',
  alternateName: 'FusionSales',
  url: SITE,
  logo: `${SITE}/favicon.svg`,
  image: `${SITE}/og.png`,
  description:
    'FusionSales.ai builds custom CRMs, quote tools, and scheduling software for businesses — at a fraction of off-the-shelf cost. Owned, not rented.',
  parentOrganization: { '@type': 'Organization', name: 'Arlogix Inc.' },
  areaServed: 'United States',
  knowsAbout: [
    'Custom CRM',
    'Sales operations',
    'Quote generation software',
    'Scheduling automation',
    'Workflow automation',
  ],
};

// WebSite schema — ties the brand name to the domain (helps Google sitelinks + entity graph)
const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FusionSales.ai',
  alternateName: 'FusionSales',
  url: SITE,
  description:
    'Custom software — CRMs, quote tools, scheduling, and workflow automation — built for mid-sized businesses. Owned, not rented.',
  inLanguage: 'en-US',
  publisher: { '@type': 'Organization', name: 'FusionSales.ai', url: SITE },
};

// FAQPage schema, built from the same FAQS the homepage renders
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: (FAQS || []).map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// Service schema with an OfferCatalog of the public pricing tiers — lets Google
// and AI engines answer "what does FusionSales build, and what does it cost."
function priceSpecFor(priceStr) {
  const nums = (String(priceStr).match(/(\d+(?:\.\d+)?)\s*k/gi) || []).map(
    (s) => parseFloat(s) * 1000
  );
  if (nums.length >= 2) {
    return { '@type': 'PriceSpecification', priceCurrency: 'USD', minPrice: nums[0], maxPrice: nums[1] };
  }
  if (nums.length === 1) {
    return { '@type': 'PriceSpecification', priceCurrency: 'USD', price: nums[0] };
  }
  return undefined;
}

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Custom software development for mid-sized businesses',
  serviceType: 'Custom software development',
  description:
    'FusionSales.ai builds custom CRMs, quote & estimate generators, scheduling tools, project and order tracking, automated workflows, and real-time dashboards — owned outright, not rented. Builds ship in weeks at a fraction of traditional cost.',
  provider: { '@type': 'Organization', name: 'FusionSales.ai', url: SITE },
  areaServed: 'United States',
  url: SITE,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Custom software build packages',
    itemListElement: (PRICING || []).map((tier) => ({
      '@type': 'Offer',
      name: tier.name,
      description: tier.description,
      category: 'One-time custom software build',
      priceSpecification: priceSpecFor(tier.price),
    })),
  },
};

function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

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
  const schemas = [];
  let extraMeta = '';

  if (kind === 'home') {
    title = 'FusionSales.ai — Own the software your business runs on';
    description =
      "Stop renting your software. Start owning it. Custom-built CRMs, quote tools, and scheduling — at a fraction of what you pay today. Yours forever. It's finally possible.";
    ogTitle = 'Stop renting your software. Start owning it.';
    ogDescription =
      "Custom-built CRMs, quote tools, and scheduling — at a fraction of what you pay today. Yours forever. It's finally possible.";
    schemas.push(ORG_SCHEMA, WEBSITE_SCHEMA, SERVICE_SCHEMA, FAQ_SCHEMA);
  } else if (kind === 'insights-index') {
    title = 'Insights — FusionSales.ai';
    description =
      'Long-form articles on custom software, automation, and operational leverage — from the FusionSales.ai team.';
    ogTitle = 'Insights — FusionSales.ai';
    ogDescription =
      'Long-form articles on custom software, automation, and operational leverage.';
    schemas.push(breadcrumb([
      { name: 'Home', url: `${SITE}/` },
      { name: 'Insights', url: `${SITE}/insights` },
    ]));
    const pubs = ARTICLES.filter((a) => a.status === 'published').sort((a, b) =>
      (b.date || '').localeCompare(a.date || '')
    );
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Insights — FusionSales.ai',
      url: `${SITE}/insights`,
      description,
      inLanguage: 'en-US',
      isPartOf: { '@type': 'WebSite', name: 'FusionSales.ai', url: SITE },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: pubs.length,
        itemListElement: pubs.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/insights/${a.slug}`,
          name: a.title,
        })),
      },
    });
  } else if (kind === 'tools-index') {
    title = 'Free Assessment Tools — FusionSales.ai';
    description =
      'Free tools for mid-sized businesses adding efficiency: the Operational Efficiency Scorecard, Manual Work Cost Calculator, Build vs. Buy Decision Tool, and Tech Stack Health Check.';
    ogTitle = 'Free Assessment Tools — FusionSales.ai';
    ogDescription = description;
    schemas.push(breadcrumb([
      { name: 'Home', url: `${SITE}/` },
      { name: 'Tools', url: `${SITE}/tools` },
    ]));
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Free Assessment Tools — FusionSales.ai',
      url: `${SITE}/tools`,
      description,
      inLanguage: 'en-US',
      isPartOf: { '@type': 'WebSite', name: 'FusionSales.ai', url: SITE },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: Object.keys(TOOLS).length,
        itemListElement: Object.entries(TOOLS).map(([slug, t], i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/tools/${slug}`,
          name: t.title.replace(' — FusionSales.ai', ''),
        })),
      },
    });
  } else if (kind === 'ideas-index') {
    title = 'Custom Software Ideas — 10 ways to out-hustle the big guys — FusionSales.ai';
    description =
      'Ten custom-software builds that let a small team out-hustle the giants — AI sales copilot, automation hub, 24/7 AI support, predictive inventory, cash-flow co-pilot, the Company Brain, and more. See what each dashboard would look like for your business.';
    ogTitle = 'Custom Software Ideas — out-hustle the big guys';
    ogDescription = 'Ten custom builds that make a 10-person team feel like 100. See the dashboard for each.';
    schemas.push(breadcrumb([
      { name: 'Home', url: `${SITE}/` },
      { name: 'Custom Software Ideas', url: `${SITE}/ideas` },
    ]));
  } else if (kind === 'tool') {
    const tool = TOOLS[routeInfo.slug];
    title = tool ? tool.title : 'Assessment Tool — FusionSales.ai';
    description = tool ? tool.description : '';
    ogTitle = title;
    ogDescription = description;
    schemas.push(breadcrumb([
      { name: 'Home', url: `${SITE}/` },
      { name: 'Tools', url: `${SITE}/tools` },
      { name: title.replace(' — FusionSales.ai', ''), url: canonical },
    ]));
    if (tool) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title.replace(' — FusionSales.ai', ''),
        description,
        url: canonical,
        image: `${SITE}/og.png`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        browserRequirements: 'Requires JavaScript',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        provider: { '@type': 'Organization', name: 'FusionSales.ai', url: SITE },
      });
    }
  } else if (kind === 'author-page') {
    const author = AUTHORS[routeInfo.author];
    if (!author) {
      title = 'Author not found — FusionSales.ai';
      description = '';
      ogTitle = title;
      ogDescription = '';
    } else {
      title = `${author.name} — ${author.title}, FusionSales.ai`;
      description = `${author.name}, ${author.title} at FusionSales.ai. ${author.bio}`;
      ogTitle = title;
      ogDescription = author.bio;
      const theirArticles = ARTICLES.filter(
        (a) => a.author === routeInfo.author && a.status === 'published'
      ).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        url: canonical,
        inLanguage: 'en-US',
        mainEntity: {
          '@type': 'Person',
          name: author.name,
          jobTitle: author.title,
          description: author.bio,
          url: canonical,
          worksFor: { '@type': 'Organization', name: 'FusionSales.ai', url: SITE },
        },
      });
      // Separate ItemList node (ItemList is Intangible, not a valid CreativeWork hasPart)
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Articles by ${author.name}`,
        numberOfItems: theirArticles.length,
        itemListElement: theirArticles.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/insights/${a.slug}`,
          name: a.title,
        })),
      });
      schemas.push(breadcrumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Insights', url: `${SITE}/insights` },
        { name: author.name, url: canonical },
      ]));
      extraMeta += `<meta name="author" content="${escapeHtml(author.name)}" />\n    `;
    }
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
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        url: canonical,
        image: `${SITE}/og.png`,
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        ...(article.readTime ? { timeRequired: `PT${article.readTime}M` } : {}),
        ...(article.category ? { keywords: article.category } : {}),
        author: author
          ? {
              '@type': 'Person',
              name: author.name,
              jobTitle: author.title,
              url: `${SITE}/insights/authors/${article.author}`,
            }
          : undefined,
        publisher: {
          '@type': 'Organization',
          name: 'FusionSales.ai',
          url: SITE,
          logo: { '@type': 'ImageObject', url: `${SITE}/favicon.svg` },
        },
        datePublished: article.date || undefined,
        dateModified: article.date || undefined,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        articleSection: article.category,
      });
      schemas.push(breadcrumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Insights', url: `${SITE}/insights` },
        { name: article.title, url: canonical },
      ]));
      // Bonus: per-article HowTo schema for actionable how-to articles
      if (article.howTo) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: article.howTo.name,
          description: article.excerpt,
          ...(article.howTo.totalTime ? { totalTime: article.howTo.totalTime } : {}),
          step: article.howTo.steps.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.name,
            text: s.text,
          })),
        });
      }
      // Bonus: per-article FAQPage schema for definitional articles
      if (article.faqs && article.faqs.length) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        });
      }
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
    <meta property="og:site_name" content="FusionSales.ai" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(ogDescription)}" />
    <meta property="og:image" content="${SITE}/og.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(ogDescription)}" />
    <meta name="twitter:image" content="${SITE}/og.png" />
    ${extraMeta}`;

  for (const s of schemas) {
    head += `<script type="application/ld+json">${JSON.stringify(s)}</script>`;
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

// ---- Generate sitemap.xml from the same route list (single source of truth) ----
function generateSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const lastmodFor = (r) => {
    if (r.kind === 'article') {
      const a = getArticle(r.slug);
      return (a && a.date) || today;
    }
    if (r.kind === 'author-page') {
      const dates = ARTICLES.filter((a) => a.author === r.author && a.status === 'published')
        .map((a) => a.date)
        .filter(Boolean)
        .sort();
      return dates.length ? dates[dates.length - 1] : today;
    }
    return today;
  };
  const priorityFor = (kind) =>
    ({
      home: '1.0',
      'insights-index': '0.8',
      'tools-index': '0.8',
      tool: '0.7',
      article: '0.6',
      'author-page': '0.4',
    }[kind] || '0.5');

  const body = routes
    .map((r) => {
      const loc = `${SITE}${r.url === '/' ? '/' : r.url}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmodFor(r)}</lastmod>\n    <priority>${priorityFor(r.kind)}</priority>\n  </url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  console.log(`[prerender] Wrote sitemap.xml (${routes.length} URLs)`);
}

// ---- Generate an RSS feed of recent articles (discovery + readers + some AI crawlers) ----
function generateFeed(articles) {
  const pubs = articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, 30);
  const rfc822 = (d) => (d ? new Date(`${d}T12:00:00Z`).toUTCString() : new Date().toUTCString());
  const items = pubs
    .map((a) => {
      const author = getAuthor(a.author);
      const link = `${SITE}/insights/${a.slug}`;
      return `    <item>
      <title>${escapeHtml(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${rfc822(a.date)}</pubDate>${a.category ? `\n      <category>${escapeHtml(a.category)}</category>` : ''}${author ? `\n      <dc:creator>${escapeHtml(author.name)}</dc:creator>` : ''}
      <description><![CDATA[${a.excerpt || ''}]]></description>
    </item>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>FusionSales.ai — Insights</title>
    <link>${SITE}/insights</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Long-form articles on custom software, automation, and operational leverage from the FusionSales.ai team.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  fs.writeFileSync(path.join(distDir, 'rss.xml'), xml, 'utf-8');
  console.log(`[prerender] Wrote rss.xml (${pubs.length} items)`);
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

// ---- Generate sitemap + RSS feed from the route list ----
generateSitemap(ROUTES);
generateFeed(ARTICLES);

// ---- Clean up SSR bundle (not needed in production) ----
fs.rmSync(serverDir, { recursive: true, force: true });

console.log(`[prerender] Done. ${success} routes rendered, ${failures} failures.`);
if (failures > 0) process.exit(1);
