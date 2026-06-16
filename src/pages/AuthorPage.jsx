import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { getAuthor, articlesByAuthor } from '../data/insights';
import AuthorAvatar from '../components/AuthorAvatar';
import ArticleCard from '../components/ArticleCard';

const CALENDLY = '/intake';

export default function AuthorPage() {
  const { author: authorKey } = useParams();
  const author = getAuthor(authorKey);

  const published = useMemo(
    () =>
      articlesByAuthor(authorKey)
        .filter((a) => a.status === 'published')
        .sort((a, b) => (b.date || '').localeCompare(a.date || '')),
    [authorKey]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!author) {
      document.title = 'Author not found — FusionSales.ai';
      return;
    }
    const title = `${author.name} — ${author.title}, FusionSales.ai`;
    document.title = title;
    setMeta('description', `${author.name}, ${author.title} at FusionSales.ai. ${author.bio}`);
    setMeta('og:title', title, true);
    setMeta('og:description', author.bio, true);
    setMeta('og:url', `https://fusionsales.ai/insights/authors/${authorKey}`, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', author.bio);
    setCanonical(`https://fusionsales.ai/insights/authors/${authorKey}`);
  }, [author, authorKey]);

  if (!author) return <AuthorNotFound />;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 text-gray-900" aria-label="FusionSales.ai home">
            <img src="/favicon.svg" alt="" className="w-7 h-7" width="28" height="28" />
            <span className="text-xl tracking-tight font-medium">FusionSales</span>
            <span className="text-xl tracking-tight text-gray-400 font-light">.ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            <a href="/" className="text-gray-500 hover:text-gray-900 transition">Home</a>
            <a href="/tools" className="text-gray-500 hover:text-gray-900 transition">Tools</a>
            <a href="/insights" className="text-gray-900 relative">
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
        <section className="border-b border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
            <a href="/insights" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition mb-10">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              All Insights
            </a>

            <p className="text-xs uppercase tracking-[0.25em] text-brand-700 mb-6">Contributor</p>
            <div className="flex items-start gap-5 md:gap-6">
              <AuthorAvatar author={author} authorKey={authorKey} size="lg" />
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-3xl md:text-5xl font-light leading-[1.05] tracking-tight text-gray-900">
                  {author.name}
                </h1>
                <p className="mt-2 text-base md:text-lg text-gray-600">
                  {author.title} · FusionSales.ai
                </p>
              </div>
            </div>
            <p className="mt-8 text-lg md:text-xl text-gray-800 leading-relaxed max-w-3xl">
              {author.bio}
            </p>
            <p className="mt-8 text-sm text-gray-600">
              <span className="text-gray-900 font-medium tabular-nums">{published.length}</span>{' '}
              {published.length === 1 ? 'article' : 'articles'} on FusionSales.ai
            </p>
          </div>
        </section>

        {/* Their articles */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-8">
              Articles by {author.name.split(' ')[0]}
            </p>
            {published.length === 0 ? (
              <p className="text-gray-500 py-10">No published articles yet — check back soon.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {published.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    author={author}
                    authorKey={authorKey}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 py-20 md:py-24 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight mb-6">
              Want this kind of thinking applied to your business?
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed mb-10">
              The team behind these articles builds the software too. Bring us a workflow that
              hurts, and we&rsquo;ll model what custom would look like — no slides, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-gray-900 text-sm md:text-base hover:bg-brand-50 transition"
              >
                Schedule a Conversation <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white text-white text-sm md:text-base hover:bg-white hover:text-gray-900 transition"
              >
                Try a free assessment
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-gray-500">
          <span>© 2026 Arlogix Inc.</span>
          <a href="/insights" className="hover:text-gray-900 inline-flex items-center gap-1.5">
            All Insights <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function AuthorNotFound() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="w-7 h-7" />
            <span className="text-xl tracking-tight font-medium">FusionSales</span>
            <span className="text-xl tracking-tight text-gray-400 font-light">.ai</span>
          </a>
          <a href="/insights" className="text-sm text-gray-700 hover:text-gray-900">All Insights</a>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto px-4 py-28 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-5">404</p>
        <h1 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight mb-6">
          We couldn&rsquo;t find that contributor.
        </h1>
        <p className="text-lg text-gray-700 mb-10">They may have moved, or never existed.</p>
        <a
          href="/insights"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm hover:bg-brand-600 transition"
        >
          Browse all Insights <ArrowRight className="w-4 h-4" />
        </a>
      </main>
    </div>
  );
}

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
