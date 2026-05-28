// Server-side entry used by scripts/prerender.js at build time.
// We deliberately import pages DIRECTLY (not via React.lazy) so renderToString
// can resolve their content synchronously. The client entry (main.jsx) keeps
// lazy() for code-splitting in the browser.

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';
import FusionSalesWebsite, { FAQS } from './FusionSalesWebsite.jsx';
import InsightsIndex from './pages/InsightsIndex.jsx';
import InsightArticle from './pages/InsightArticle.jsx';
import AuthorPage from './pages/AuthorPage.jsx';
import ToolsIndex from './pages/ToolsIndex.jsx';
import EfficiencyScorecard from './tools/EfficiencyScorecard.jsx';
import ManualWorkCost from './tools/ManualWorkCost.jsx';
import BuildVsBuy from './tools/BuildVsBuy.jsx';
import TechStackHealth from './tools/TechStackHealth.jsx';
import { ARTICLES, AUTHORS, getArticle, getAuthor } from './data/insights.jsx';

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<FusionSalesWebsite />} />
        <Route path="/insights" element={<InsightsIndex />} />
        <Route path="/insights/authors/:author" element={<AuthorPage />} />
        <Route path="/insights/:slug" element={<InsightArticle />} />
        <Route path="/tools" element={<ToolsIndex />} />
        <Route path="/tools/efficiency-scorecard" element={<EfficiencyScorecard />} />
        <Route path="/tools/manual-work-cost" element={<ManualWorkCost />} />
        <Route path="/tools/build-vs-buy" element={<BuildVsBuy />} />
        <Route path="/tools/tech-stack-health-check" element={<TechStackHealth />} />
        <Route path="*" element={<FusionSalesWebsite />} />
      </Routes>
    </StaticRouter>
  );
}

// Re-export data so the prerender script can build per-route meta tags
export { ARTICLES, AUTHORS, getArticle, getAuthor, FAQS };
