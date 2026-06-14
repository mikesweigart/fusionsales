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
const AutomationHub = lazy(() => import('./tools/AutomationHub.jsx'));
const SalesCopilot = lazy(() => import('./tools/SalesCopilot.jsx'));
const SmartScheduling = lazy(() => import('./tools/SmartScheduling.jsx'));
const LoyaltyEngine = lazy(() => import('./tools/LoyaltyEngine.jsx'));

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
          <Route path="/tools/automation-hub" element={<AutomationHub />} />
          <Route path="/tools/sales-copilot" element={<SalesCopilot />} />
          <Route path="/tools/smart-scheduling" element={<SmartScheduling />} />
          <Route path="/tools/loyalty-engine" element={<LoyaltyEngine />} />
          <Route path="*" element={<FusionSalesWebsite />} />
        </Routes>
      </Suspense>
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);
