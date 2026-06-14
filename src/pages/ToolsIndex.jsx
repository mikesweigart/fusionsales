import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Zap, Sparkles, CalendarDays, Megaphone } from 'lucide-react';

const CALENDLY = 'https://calendly.com/mike-fusion-advisory/30min';

const TOOLS = [
  {
    slug: 'automation-hub', name: 'Workflow Automation Hub', icon: Zap, featured: true,
    tagline: 'Build it. Watch it run itself.',
    desc: 'Pick what kicks it off, drag in the steps that should happen, and hit run — a signed contract creating the project, invoice, tasks, and notifications on its own. Build your own and watch it fire.',
  },
  {
    slug: 'sales-copilot', name: 'AI Sales Copilot', icon: Sparkles,
    tagline: 'A CRM that does the typing.',
    desc: 'Add a lead and watch it get scored. Click any deal and the copilot tells you the next move and drafts the message — you just hit send. Work a real pipeline, hands-on.',
  },
  {
    slug: 'smart-scheduling', name: 'Smart Scheduling', icon: CalendarDays,
    tagline: 'Staff the week in one click.',
    desc: 'Toggle who’s available, set how many you need each day, and auto-schedule. Watch it fill the week and flag every gap — then tinker and re-run.',
  },
  {
    slug: 'loyalty-engine', name: 'Marketing & Loyalty Engine', icon: Megaphone,
    tagline: 'No more generic blasts.',
    desc: 'Pick your customer segments, set a tailored offer for each, and run the campaign. Watch personalized messages go out and the funnel fill — every customer talked to differently.',
  },
];

function setMeta(name, content, isProperty = false) {
  if (typeof document === 'undefined') return;
  const attr = isProperty ? 'property' : 'name';
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attr, name); document.head.appendChild(tag); }
  tag.setAttribute('content', content);
}

export default function ToolsIndex() {
  useEffect(() => {
    document.title = 'Interactive tools — play with the software we build — FusionSales.ai';
    setMeta('description', 'Four interactive demos you can actually play with: a Workflow Automation Hub, an AI Sales Copilot, Smart Scheduling, and a Marketing & Loyalty Engine. Build and tinker with a working version of the custom software we’d build you.');
    setMeta('og:title', 'Play with the software we build — FusionSales.ai', true);
    setMeta('og:url', 'https://fusionsales.ai/tools', true);
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', 'https://fusionsales.ai/tools');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
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
            <a href="/tools" className="text-gray-900 relative">Tools<span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-600" /></a>
            <a href="/insights" className="text-gray-600 hover:text-gray-900 transition">Insights</a>
          </nav>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm hover:bg-gray-800 transition">
            Schedule a Conversation
          </a>
        </div>
      </header>

      <main>
        <section className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <a href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition mb-10">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back to home
            </a>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6">Interactive demos</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight text-gray-900 max-w-4xl">
              Don&rsquo;t read about it.<span className="text-gray-500"> Play with it.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-gray-800 leading-relaxed max-w-3xl">
              Four working demos of the systems we build. Build an automation and watch it run. Work a
              pipeline with an AI copilot. Staff a week in a click. Launch a personalized campaign. Tinker
              until it fits your business &mdash; then we build the real one.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-6">
              {TOOLS.map((t) => {
                const Icon = t.icon;
                return (
                  <a key={t.slug} href={`/tools/${t.slug}`}
                    className={[
                      'group block border border-gray-200 p-8 md:p-10 transition-all duration-300 ease-apple hover:border-gray-900 hover:-translate-y-0.5 hover:shadow-md',
                      t.featured ? 'md:col-span-2 bg-gray-50' : 'bg-white',
                    ].join(' ')}>
                    <div className="flex items-start justify-between mb-6">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-gray-200">
                        <Icon className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-brand-700 border border-brand-200 bg-brand-50 px-2.5 py-1 rounded-full">Interactive</span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-2">{t.name}</h2>
                    <p className="text-base text-gray-500 italic mb-4 font-light">&ldquo;{t.tagline}&rdquo;</p>
                    <p className="text-gray-800 leading-relaxed mb-6 max-w-2xl">{t.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-300 group-hover:border-brand-600 pb-1 transition">
                      Try it <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                    </span>
                  </a>
                );
              })}
            </div>
            <p className="mt-8 text-sm text-gray-500">
              These four are a taste &mdash; <a href="/ideas" className="text-gray-800 underline decoration-gray-300 hover:decoration-brand-500 underline-offset-4 hover:text-brand-700 transition">see all ten things we build</a>.
            </p>
          </div>
        </section>

        <section className="bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-light leading-tight tracking-tight mb-5">
              Like what you built?
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-10 max-w-2xl mx-auto">
              The real version runs on your data, your rules, the tools you already use — usually live in
              about six weeks. Let’s scope it.
            </p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-gray-900 text-sm md:text-base hover:bg-brand-50 transition">
              Schedule a Conversation <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-gray-600">
          <span>© 2026 Arlogix Inc.</span>
          <div className="flex gap-6">
            <a href="/ideas" className="hover:text-gray-900 inline-flex items-center gap-1.5">Ideas <ArrowUpRight className="w-3 h-3" /></a>
            <a href="/insights" className="hover:text-gray-900 inline-flex items-center gap-1.5">Insights <ArrowUpRight className="w-3 h-3" /></a>
            <a href="/" className="hover:text-gray-900">fusionsales.ai</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
