import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const CALENDLY = '/intake';

function setMeta(name, content, isProperty = false) {
  if (typeof document === 'undefined') return;
  const attr = isProperty ? 'property' : 'name';
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}
function setCanonical(url) {
  if (typeof document === 'undefined') return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export default function ToolLayout({ eyebrow, title, subtitle, seoTitle, seoDescription, canonicalPath, children }) {
  useEffect(() => {
    if (seoTitle) document.title = seoTitle;
    if (seoDescription) {
      setMeta('description', seoDescription);
      setMeta('og:description', seoDescription, true);
      setMeta('twitter:description', seoDescription);
    }
    if (seoTitle) {
      setMeta('og:title', seoTitle, true);
      setMeta('twitter:title', seoTitle);
    }
    if (canonicalPath) {
      const full = `https://fusionsales.ai${canonicalPath}`;
      setMeta('og:url', full, true);
      setCanonical(full);
    }
    window.scrollTo(0, 0);
  }, [seoTitle, seoDescription, canonicalPath]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <style>{`
        .tool-range { -webkit-appearance: none; appearance: none; height: 6px; border-radius: 9999px; outline: none; }
        .tool-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 9999px; background: #fff; cursor: pointer; border: 1px solid #e5e7eb; box-shadow: 0 1px 4px rgba(0,0,0,0.18), 0 0 0 4px rgba(217,119,6,0.10); transition: transform .15s; }
        .tool-range::-webkit-slider-thumb:hover { transform: scale(1.08); }
        .tool-range::-moz-range-thumb { width: 22px; height: 22px; border-radius: 9999px; background: #fff; cursor: pointer; border: 1px solid #e5e7eb; }
      `}</style>
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 text-gray-900" aria-label="FusionSales.ai home">
            <img src="/favicon.svg" alt="" className="w-7 h-7" width="28" height="28" />
            <span className="text-xl tracking-tight font-medium">FusionSales</span>
            <span className="text-xl tracking-tight text-gray-400 font-light">.ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition">Home</a>
            <a href="/ideas" className="text-gray-600 hover:text-gray-900 transition">Ideas</a>
            <a href="/tools" className="text-gray-900 relative">
              Tools
              <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-600" />
            </a>
            <a href="/insights" className="text-gray-600 hover:text-gray-900 transition">Insights</a>
          </nav>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
          >
            Schedule a Conversation
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 pt-12 md:pt-16 pb-10 md:pb-12">
            <a href="/tools" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition mb-8">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              All tools
            </a>
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.25em] text-brand-700 mb-5">{eyebrow}</p>
            )}
            <h1 className="font-display text-3xl md:text-5xl font-light leading-[1.08] tracking-tight text-gray-900 max-w-3xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 text-lg md:text-xl text-gray-800 leading-relaxed max-w-2xl">{subtitle}</p>
            )}
          </div>
        </section>

        {children}
      </main>

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-gray-600">
          <span>© 2026 Arlogix Inc.</span>
          <div className="flex gap-6">
            <a href="/tools" className="hover:text-gray-900">Tools</a>
            <a href="/insights" className="hover:text-gray-900">Insights</a>
            <a href="/" className="hover:text-gray-900">fusionsales.ai</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Shared bits tools reuse
export { CALENDLY };

export function Slider({ label, value, min, max, step = 1, onChange, display, hint }) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2.5">
        <label className="text-sm text-gray-700">{label}</label>
        {display != null && <span className="text-sm font-medium text-gray-900 tabular-nums">{display}</span>}
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="tool-range w-full"
        style={{ background: `linear-gradient(to right, #d97706 0%, #f59134 ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)` }}
        aria-label={label}
      />
      {hint && <p className="text-xs text-gray-400 mt-1.5">{hint}</p>}
    </div>
  );
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(options.length, 2)}, minmax(0, 1fr))` }}>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              'text-left px-4 py-3 border text-sm transition',
              active
                ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400',
            ].join(' ')}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
