import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import FusionSalesWebsite from './FusionSalesWebsite.jsx';
import './index.css';

// Lazy-load secondary routes so they don't bloat the landing page bundle
const InsightsIndex = lazy(() => import('./pages/InsightsIndex.jsx'));
const InsightArticle = lazy(() => import('./pages/InsightArticle.jsx'));
const ToolsIndex = lazy(() => import('./pages/ToolsIndex.jsx'));
const EfficiencyScorecard = lazy(() => import('./tools/EfficiencyScorecard.jsx'));
const ManualWorkCost = lazy(() => import('./tools/ManualWorkCost.jsx'));
const BuildVsBuy = lazy(() => import('./tools/BuildVsBuy.jsx'));
const TechStackHealth = lazy(() => import('./tools/TechStackHealth.jsx'));

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
          <Route path="/insights/:slug" element={<InsightArticle />} />
          <Route path="/tools" element={<ToolsIndex />} />
          <Route path="/tools/efficiency-scorecard" element={<EfficiencyScorecard />} />
          <Route path="/tools/manual-work-cost" element={<ManualWorkCost />} />
          <Route path="/tools/build-vs-buy" element={<BuildVsBuy />} />
          <Route path="/tools/tech-stack-health-check" element={<TechStackHealth />} />
          <Route path="*" element={<FusionSalesWebsite />} />
        </Routes>
      </Suspense>
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);
