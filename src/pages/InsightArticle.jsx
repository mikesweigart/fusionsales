import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import { getArticle, getAuthor, getRelated, AUTHORS } from '../data/insights';
import AuthorAvatar from '../components/AuthorAvatar';
import ArticleCard from '../components/ArticleCard';
import ReadingProgress from '../components/ReadingProgress';

const CALENDLY = 'https://calendly.com/mike-fusion-advisory/30min';

export default function InsightArticle() {
  const { slug } = useParams();
  const article = getArticle(slug);
  const articleRef = useRef(null);

  // SEO + scroll reset
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!article) {
      document.title = 'Article not found — FusionSales.ai';
      return;
    }
    const title = `${article.title} — FusionSales.ai`;
    document.title = title;
    setMeta('description', article.excerpt);
    setMeta('og:title', article.title, true);
    setMeta('og:description', article.excerpt, true);
    setMeta('og:type', 'article', true);
    setMeta('og:url', `https://fusionsales.ai/insights/${article.slug}`, true);
    setMeta('twitter:title', article.title);
    setMeta('twitter:description', article.excerpt);
    setCanonical(`https://fusionsales.ai/insights/${article.slug}`);
    // NOTE: Article + BreadcrumbList JSON-LD is emitted at build time by
    // scripts/prerender.js (authoritative, enriched). We deliberately do NOT
    // inject it again here on hydration — that would create duplicate nodes.
  }, [article]);

  if (!article) return <ArticleNotFound />;

  // Coming soon stub: show meta but not body
  if (article.status !== 'published' || !article.body) {
    return <ComingSoon article={article} />;
  }

  const author = getAuthor(article.author);
  const related = getRelated(article.related);
  const BodyComponent = article.body;
  const formattedDate = formatDate(article.date);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ReadingProgress targetRef={articleRef} />

      {/* Top nav */}
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

      <article ref={articleRef}>
        {/* Hero */}
        <section className="border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 pt-14 md:pt-20 pb-12 md:pb-16">
            <a href="/insights" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition mb-8 animate-[fadeIn_0.4s_ease-out]">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              All Insights
            </a>

            <p className="text-[11px] uppercase tracking-[0.25em] text-brand-700 mb-5 animate-[fadeUp_0.5s_ease-out]">
              {article.category}
            </p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-[3.25rem] font-light leading-[1.08] tracking-tight text-gray-900 animate-[fadeUp_0.6s_ease-out]">
              {article.title}
            </h1>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-700 animate-[fadeUp_0.7s_ease-out]">
              <a href={`/insights/authors/${article.author}`} className="flex items-center gap-2.5 group">
                <AuthorAvatar author={author} authorKey={article.author} size="sm" />
                <span>
                  <span className="text-gray-900 font-medium group-hover:text-brand-700 transition">{author?.name}</span>
                  <span className="text-gray-600"> · {author?.title}</span>
                </span>
              </a>
              {formattedDate && (
                <>
                  <span className="text-gray-400">·</span>
                  <span>{formattedDate}</span>
                </>
              )}
              {article.readTime && (
                <>
                  <span className="text-gray-400">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {article.readTime} min read
                  </span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="bg-white">
          <div className="max-w-3xl mx-auto px-4 py-14 md:py-20">
            <div className="prose-fs animate-[fadeUp_0.7s_ease-out]">
              <BodyComponent />
            </div>
          </div>
        </section>

        {/* Author bio */}
        {author && (
          <section className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-3xl mx-auto px-4 py-14">
              <div className="flex items-start gap-5">
                <AuthorAvatar author={author} authorKey={article.author} size="lg" />
                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500 mb-2">About the author</p>
                  <a
                    href={`/insights/authors/${article.author}`}
                    className="inline-block font-display text-xl md:text-2xl font-light tracking-tight text-gray-900 mb-1 hover:text-brand-700 transition"
                  >
                    {author.name}
                  </a>
                  <p className="text-sm text-gray-600 mb-4">{author.title} · FusionSales.ai</p>
                  <p className="text-base text-gray-800 leading-relaxed">{author.bio}</p>
                  <a
                    href={`/insights/authors/${article.author}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm text-gray-900 border-b border-gray-300 hover:border-brand-600 pb-0.5 transition"
                  >
                    More from {author.name.split(' ')[0]} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-white border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-8">Keep reading</p>
              <div className="grid md:grid-cols-3 gap-5">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} author={getAuthor(a.author)} authorKey={a.author} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-light leading-tight tracking-tight mb-5">
              Got a workflow that hurts more than it should?
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              We&rsquo;ll model what custom looks like for your business — no slides, no
              proposal, just a real conversation.
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
                href="/#calculator"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white text-white text-sm md:text-base hover:bg-white hover:text-gray-900 transition"
              >
                See your ROI
              </a>
            </div>
          </div>
        </section>
      </article>

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-gray-500">
          <span>© 2026 Arlogix Inc.</span>
          <a href="/insights" className="hover:text-gray-900 inline-flex items-center gap-1.5">
            More Insights <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeUp_0\\.5s_ease-out\\],
          .animate-\\[fadeUp_0\\.6s_ease-out\\],
          .animate-\\[fadeUp_0\\.7s_ease-out\\],
          .animate-\\[fadeIn_0\\.4s_ease-out\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function ComingSoon({ article }) {
  const author = getAuthor(article.author);
  return (
    <div className="min-h-screen bg-white text-gray-900 font-light flex flex-col">
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
      <main className="flex-1 max-w-3xl mx-auto px-4 py-20 md:py-28">
        <a href="/insights" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition mb-8">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          All Insights
        </a>
        <p className="text-[11px] uppercase tracking-[0.25em] text-brand-700 mb-5">{article.category}</p>
        <h1 className="font-display text-3xl md:text-5xl font-light leading-[1.1] tracking-tight text-gray-900 mb-6">
          {article.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10">{article.excerpt}</p>

        <div className="border-l-2 border-brand-600 bg-brand-50 px-6 py-5 mb-10">
          <p className="text-[11px] uppercase tracking-[0.22em] text-brand-700 mb-2 font-medium">Coming soon</p>
          <p className="text-gray-800">
            This article is on the editorial calendar
            {author ? <>, drafted by <span className="font-medium">{author.name}</span> ({author.title})</> : null}.
            Want it next? <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline decoration-brand-200 decoration-2 underline-offset-4 hover:decoration-brand-600">Tell us</a>.
          </p>
        </div>

        <a
          href="/insights"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm hover:bg-brand-600 transition"
        >
          Browse published articles <ArrowRight className="w-4 h-4" />
        </a>
      </main>
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10 text-xs text-gray-500 text-center">
          © 2026 Arlogix Inc.
        </div>
      </footer>
    </div>
  );
}

function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-light flex flex-col">
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="w-7 h-7" />
            <span className="text-xl tracking-tight font-medium">FusionSales</span>
            <span className="text-xl tracking-tight text-gray-400 font-light">.ai</span>
          </a>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto px-4 py-28 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-5">404</p>
        <h1 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight mb-6">
          We couldn&rsquo;t find that article.
        </h1>
        <p className="text-lg text-gray-700 mb-10">It may have moved, or never existed.</p>
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

function formatDate(dateString) {
  if (!dateString) return null;
  try {
    const d = new Date(dateString + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return null;
  }
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
