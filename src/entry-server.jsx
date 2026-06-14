// Server-side entry used by scripts/prerender.js at build time.
// We deliberately import pages DIRECTLY (not via React.lazy) so renderToString
// can resolve their content synchronously. The client entry (main.jsx) keeps
// lazy() for code-splitting in the browser.

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';
import FusionSalesWebsite, { FAQS, PRICING } from './FusionSalesWebsite.jsx';
import InsightsIndex from './pages/InsightsIndex.jsx';
import InsightArticle from './pages/InsightArticle.jsx';
import AuthorPage from './pages/AuthorPage.jsx';
import ToolsIndex from './pages/ToolsIndex.jsx';
import IdeasIndex from './pages/IdeasIndex.jsx';
import BlueprintBuilder from './tools/BlueprintBuilder.jsx';
import RentVsOwnLedger from './tools/RentVsOwnLedger.jsx';
import AiOpportunityMap from './tools/AiOpportunityMap.jsx';
import QuoteToolBuilder from './tools/QuoteToolBuilder.jsx';
import RevenueLeakFinder from './tools/RevenueLeakFinder.jsx';
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
        <Route path="/ideas" element={<IdeasIndex />} />
        <Route path="/tools/blueprint" element={<BlueprintBuilder />} />
        <Route path="/tools/rent-vs-own" element={<RentVsOwnLedger />} />
        <Route path="/tools/ai-opportunity-map" element={<AiOpportunityMap />} />
        <Route path="/tools/quote-builder" element={<QuoteToolBuilder />} />
        <Route path="/tools/revenue-leak" element={<RevenueLeakFinder />} />
        <Route path="*" element={<FusionSalesWebsite />} />
      </Routes>
    </StaticRouter>
  );
}

// Re-export data so the prerender script can build per-route meta tags
export { ARTICLES, AUTHORS, getArticle, getAuthor, FAQS, PRICING };
