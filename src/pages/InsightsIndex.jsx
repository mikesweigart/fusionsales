import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowLeft, Filter } from 'lucide-react';
import { ARTICLES, AUTHORS, CATEGORIES, getAuthor, publishedArticles } from '../data/insights';
import ArticleCard from '../components/ArticleCard';

const CALENDLY = 'https://calendly.com/mike-fusion-advisory/30min';

export default function InsightsIndex() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeAuthor, setActiveAuthor] = useState('all');

  // Set document title + meta tags for SEO
  useEffect(() => {
    document.title = 'Insights — FusionSales.ai';
    setMeta('description', 'Long-form articles on custom software, automation, and operational leverage — from the FusionSales.ai team.');
    setMeta('og:title', 'Insights — FusionSales.ai', true);
    setMeta('og:description', 'Long-form articles on custom software, automation, and operational leverage.', true);
    setMeta('og:url', 'https://fusionsales.ai/insights', true);
    setCanonical('https://fusionsales.ai/insights');
    window.scrollTo(0, 0);
  }, []);

  const featured = ARTICLES.find((a) => a.featured && a.status === 'published');
  const rest = useMemo(() => {
    let list = ARTICLES.filter((a) => !a.featured);
    if (activeCategory !== 'All') list = list.filter((a) => a.category === activeCategory);
    if (activeAuthor !== 'all') list = list.filter((a) => a.author === activeAuthor);
    // Sort: published first (newest date first), then coming-soon
    return list.sort((a, b) => {
      if (a.status !== b.status) return a.status === 'published' ? -1 : 1;
      // Within published: newest date first
      if (a.status === 'published') {
        const da = a.date || '';
        const db = b.date || '';
        return db.localeCompare(da);
      }
      return 0;
    });
  }, [activeCategory, activeAuthor]);

  const publishedCount = publishedArticles().length;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-light">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 text-gray-900" aria-label="FusionSales.ai home">
            <img src="/favicon.svg" alt="" className="w-7 h-7" width="28" height="28" />
            <span className="text-xl tracking-tight font-medium">FusionSales</span>
            <span className="text-xl tracking-tight text-gray-400 font-light">.ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-9 text-sm">
            <a href="/" className="text-gray-500 hover:text-gray-900 transition">Home</a>
            <a href="/#build" className="text-gray-500 hover:text-gray-900 transition">What we build</a>
            <a href="/#work" className="text-gray-500 hover:text-gray-900 transition">Recent work</a>
            <a href="/#pricing" className="text-gray-500 hover:text-gray-900 transition">Pricing</a>
            <a href="/insights" className="text-gray-900 transition relative">
              Insights
              <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-600" />
            </a>
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
          <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
            <a href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition mb-10">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Back to home
            </a>

            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6">Insights</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight text-gray-900 max-w-4xl">
              Sharper thinking on custom software,
              <span className="text-gray-500"> automation, and operational leverage.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
              Long-form articles from the FusionSales team — written for sales, ops, finance, and
              product leaders who are tired of bending their business around someone else&rsquo;s software.
            </p>
            <div className="mt-10 flex items-baseline gap-6 text-sm text-gray-500">
              <span>
                <span className="text-gray-900 font-medium tabular-nums">{publishedCount}</span> published
              </span>
              <span>
                <span className="text-gray-900 font-medium tabular-nums">{ARTICLES.length - publishedCount}</span> coming soon
              </span>
              <span className="hidden sm:inline">
                <span className="text-gray-900 font-medium">{Object.keys(AUTHORS).length}</span> contributors
              </span>
            </div>
          </div>
        </section>

        {/* Featured article */}
        {featured && (
          <section className="border-b border-gray-200 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-16">
              <p className="text-xs uppercase tracking-[0.25em] text-brand-700 mb-8">Flagship</p>
              <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500 mb-4">{featured.category}</p>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-gray-900 mb-6">
                    {featured.title}
                  </h2>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
                    {featured.excerpt}
                  </p>
                  <a
                    href={`/insights/${featured.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm hover:bg-brand-600 transition"
                  >
                    Read the article <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="lg:pt-2">
                  <FeaturedAuthorCard authorKey={featured.author} readTime={featured.readTime} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filter bar */}
        <section className="border-b border-gray-200 bg-white sticky top-[73px] z-30 backdrop-blur bg-white/90">
          <div className="max-w-6xl mx-auto px-4 py-5">
            <div className="flex items-start lg:items-center gap-4 lg:gap-6 flex-col lg:flex-row">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gray-500 shrink-0">
                <Filter className="w-3.5 h-3.5" strokeWidth={1.5} />
                Filter
              </div>
              <div className="flex flex-wrap items-center gap-2 flex-1 overflow-x-auto">
                <CategoryPill
                  label="All"
                  active={activeCategory === 'All'}
                  onClick={() => setActiveCategory('All')}
                />
                {CATEGORIES.map((c) => (
                  <CategoryPill
                    key={c}
                    label={c}
                    active={activeCategory === c}
                    onClick={() => setActiveCategory(c)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs uppercase tracking-[0.22em] text-gray-500">By author</span>
              <button
                onClick={() => setActiveAuthor('all')}
                className={[
                  'text-xs px-3 py-1 border transition',
                  activeAuthor === 'all'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900',
                ].join(' ')}
              >
                All
              </button>
              {Object.entries(AUTHORS).map(([key, a]) => (
                <button
                  key={key}
                  onClick={() => setActiveAuthor(key)}
                  className={[
                    'text-xs px-3 py-1 border transition',
                    activeAuthor === key
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-900',
                  ].join(' ')}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Article grid */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            {rest.length === 0 ? (
              <p className="text-gray-500 text-center py-20">No articles match this filter yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((article, idx) => (
                  <div
                    key={article.slug}
                    style={{ animationDelay: `${Math.min(idx, 11) * 40}ms` }}
                    className="opacity-0 animate-[fadeUp_0.6s_ease-out_forwards] motion-reduce:animate-none motion-reduce:opacity-100"
                  >
                    <ArticleCard
                      article={article}
                      author={getAuthor(article.author)}
                      authorKey={article.author}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 py-20 md:py-24 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight mb-6">
              See your own workflow before the talk.
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              Drag four sliders, see what custom would save you, then book the call with your numbers
              already in hand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#calculator"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-gray-900 text-sm md:text-base hover:bg-brand-50 transition"
              >
                Run the ROI calculator <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white text-white text-sm md:text-base hover:bg-white hover:text-gray-900 transition"
              >
                Schedule a Conversation
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10 text-center text-xs text-gray-500">
          © 2026 Arlogix Inc. · <a href="/" className="hover:text-gray-900">fusionsales.ai</a>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function CategoryPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        'px-4 py-2 text-sm border transition whitespace-nowrap',
        active
          ? 'bg-gray-900 text-white border-gray-900'
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

function FeaturedAuthorCard({ authorKey, readTime }) {
  const author = getAuthor(authorKey);
  if (!author) return null;
  return (
    <div className="bg-white border border-gray-200 p-8">
      <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500 mb-3">Author</p>
      <p className="font-display text-2xl font-light tracking-tight text-gray-900">{author.name}</p>
      <p className="text-sm text-gray-500 mb-4">{author.title}</p>
      <p className="text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
        {author.bio}
      </p>
      {readTime && (
        <p className="text-xs text-gray-500 mt-5 pt-4 border-t border-gray-100">
          {readTime} minute read
        </p>
      )}
    </div>
  );
}

function setMeta(name, content, isProperty = false) {
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
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}
