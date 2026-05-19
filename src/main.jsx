import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FusionSalesWebsite from './FusionSalesWebsite.jsx';
import './index.css';

// Lazy-load Insights routes so they don't bloat the landing page bundle
const InsightsIndex = lazy(() => import('./pages/InsightsIndex.jsx'));
const InsightArticle = lazy(() => import('./pages/InsightArticle.jsx'));

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
          <Route path="*" element={<FusionSalesWebsite />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
