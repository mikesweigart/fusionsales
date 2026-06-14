import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import FusionSalesWebsite from './FusionSalesWebsite.jsx';
import './index.css';

// Lazy-load secondary routes so they don't bloat the landing page bundle
const InsightsIndex = lazy(() => import('./pages/InsightsIndex.jsx'));
const InsightArticle = lazy(() => import('./pages/InsightArticle.jsx'));
const AuthorPage = lazy(() => import('./pages/AuthorPage.jsx'));
const ToolsIndex = lazy(() => import('./pages/ToolsIndex.jsx'));
const IdeasIndex = lazy(() => import('./pages/IdeasIndex.jsx'));
const BlueprintBuilder = lazy(() => import('./tools/BlueprintBuilder.jsx'));
const RentVsOwnLedger = lazy(() => import('./tools/RentVsOwnLedger.jsx'));
const AiOpportunityMap = lazy(() => import('./tools/AiOpportunityMap.jsx'));
const QuoteToolBuilder = lazy(() => import('./tools/QuoteToolBuilder.jsx'));
const RevenueLeakFinder = lazy(() => import('./tools/RevenueLeakFinder.jsx'));

function PageFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-gray-400 text-sm">
      Loading…
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
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
      </Suspense>
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);
