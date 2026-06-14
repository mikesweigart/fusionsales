import React, { useEffect } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, Zap, TrendingUp, Activity,
  Users, Mail, MessageSquare, Clock, AlertTriangle, DollarSign, CheckCircle2,
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/mike-fusion-advisory/30min';

/* /ideas — "Ten ways to out-hustle the big guys."
   Each idea: the problem (villain) → what we build → the win, plus a live
   dashboard preview so a prospect sees what THEIR version would look like.
   StoryBrand + Hormozi: customer is the scrappy hero; generic tools + slow
   giants are the villain; FusionSales is the architect (not the hammers). */

const num = (n) => Math.round(n).toLocaleString('en-US');

// ---------- dark dashboard preview primitives ----------
const Panel = ({ className = '', children }) => (
  <div className={`rounded-lg border border-white/10 bg-white/[0.03] ${className}`}>{children}</div>
);
const LiveDot = () => (
  <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" /></span>
);
const CHIP = {
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  rose: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
  blue: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
};

function Dash({ kind, data }) {
  if (kind === 'metrics') {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {data.kpis.map((k) => (
            <Panel key={k.label} className="p-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-2">{k.label}</p>
              <div className="flex items-end gap-2">
                <span className="font-display text-2xl font-light text-white tabular-nums">{k.value}</span>
                {k.delta && <span className="text-[11px] text-emerald-400 mb-0.5 inline-flex items-center gap-0.5"><TrendingUp className="w-3 h-3" strokeWidth={2} />{k.delta}</span>}
              </div>
            </Panel>
          ))}
        </div>
        <Panel className="p-4">
          <div className="flex items-center gap-2 mb-3"><Activity className="w-3.5 h-3.5 text-brand-400" strokeWidth={2} /><p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">Live</p><span className="ml-auto"><LiveDot /></span></div>
          <div className="space-y-2.5">
            {data.feed.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-md bg-brand-500/15 text-brand-400 inline-flex items-center justify-center shrink-0"><f.icon className="w-3 h-3" strokeWidth={1.75} /></span>
                <p className="text-[12px] text-gray-200 leading-snug">{f.text}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );
  }
  if (kind === 'funnel') {
    const max = data.stages[0].value;
    return (
      <Panel className="p-5">
        <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-4">{data.caption}</p>
        <div className="space-y-3">
          {data.stages.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-xs text-gray-300">{s.label}</span>
              <div className="flex-1 h-6 rounded bg-white/[0.05] overflow-hidden relative">
                <div className={`h-full rounded ${i === data.stages.length - 1 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-brand-500/80 to-brand-400/80'}`} style={{ width: `${(s.value / max) * 100}%` }} />
                <span className="absolute inset-y-0 left-2.5 flex items-center text-[11px] text-white/90 tabular-nums font-medium">{num(s.value)}</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    );
  }
  if (kind === 'chart') {
    const max = Math.max(...data.bars.map((b) => b.v), 1);
    return (
      <Panel className="p-5">
        <div className="flex items-baseline justify-between mb-4"><p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">{data.caption}</p>{data.note && <span className="text-[11px] text-brand-400 tabular-nums">{data.note}</span>}</div>
        <div className="flex items-end justify-between gap-2 h-32">
          {data.bars.map((b, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
              <div className={`w-full rounded-t ${b.hot ? 'bg-gradient-to-t from-brand-600 to-brand-400' : 'bg-gradient-to-t from-white/25 to-white/10'}`} style={{ height: `${(b.v / max) * 100}%` }} />
              <span className="text-[9px] text-gray-500 mt-1.5">{b.l}</span>
            </div>
          ))}
        </div>
        {data.alert && <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 p-2.5 flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" strokeWidth={1.75} /><p className="text-[11px] text-amber-200">{data.alert}</p></div>}
      </Panel>
    );
  }
  if (kind === 'schedule') {
    return (
      <Panel className="p-5">
        <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-4">{data.caption}</p>
        <div className="space-y-2">
          {data.rows.map((r, ri) => (
            <div key={ri} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-[11px] text-gray-400 truncate">{r.name}</span>
              <div className="flex-1 grid gap-1" style={{ gridTemplateColumns: `repeat(5, minmax(0,1fr))` }}>
                {r.blocks.map((b, bi) => (
                  <span key={bi} style={{ gridColumn: `${b.col + 1} / span ${b.span}` }} className={`h-7 rounded px-1.5 flex items-center text-[10px] text-white/95 truncate ${b.tone === 'emerald' ? 'bg-emerald-500/70' : b.tone === 'amber' ? 'bg-amber-500/70' : 'bg-brand-500/80'}`}>{b.label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    );
  }
  if (kind === 'status') {
    return (
      <Panel className="p-0 overflow-hidden">
        <div className="p-3.5 border-b border-white/10 flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">{data.caption}</p>{data.live && <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400"><LiveDot />live</span>}</div>
        <div className="divide-y divide-white/5">
          {data.rows.map((r, i) => (
            <div key={i} className="flex items-center gap-3 px-3.5 py-2.5">
              {r.auto && <Zap className="w-3 h-3 text-brand-400 shrink-0" strokeWidth={2} />}
              <p className="text-[12px] text-gray-200 flex-1 truncate">{r.label}</p>
              <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${CHIP[r.tone] || CHIP.blue}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </Panel>
    );
  }
  if (kind === 'chat') {
    return (
      <Panel className="p-5">
        <div className="flex items-center gap-2 mb-4"><span className="w-6 h-6 rounded-md bg-brand-500/20 text-brand-400 inline-flex items-center justify-center"><MessageSquare className="w-3.5 h-3.5" strokeWidth={1.75} /></span><p className="text-[11px] text-gray-300">{data.caption}</p></div>
        <div className="space-y-3">
          {data.turns.map((t, i) => (
            <div key={i} className={t.me ? 'flex justify-end' : 'flex justify-start'}>
              <div className={`max-w-[85%] rounded-xl px-3 py-2 text-[12px] leading-snug ${t.me ? 'bg-brand-500/20 text-brand-100 border border-brand-400/20' : 'bg-white/[0.06] text-gray-200 border border-white/10'}`}>{t.text}</div>
            </div>
          ))}
        </div>
      </Panel>
    );
  }
  return null;
}

// ---------- the 10 ideas ----------
const IDEAS = [
  {
    n: '01', name: 'AI Sales Copilot', tag: 'Custom CRM',
    villain: 'Your reps spend their day on data entry, and deals slip through the cracks of a CRM nobody likes.',
    build: 'A CRM that logs every email, call, and LinkedIn touch on its own — and tells your reps the next best move.',
    win: 'Reps sell instead of typing. A pipeline you can finally trust.',
    kind: 'metrics',
    dash: { kpis: [{ label: 'Pipeline', value: '$284k', delta: '+18%' }, { label: 'Win rate', value: '62%', delta: '+14' }], feed: [{ icon: MessageSquare, text: 'Auto follow-up sent — Riverside' }, { icon: CheckCircle2, text: 'Call logged + summarized' }, { icon: Users, text: 'New lead routed to rep' }] },
  },
  {
    n: '02', name: 'Workflow Automation Hub', tag: 'Operations',
    villain: 'Eight disconnected tools and a person copy-pasting between them — the “human bridge” that breaks when they’re out.',
    build: 'One hub where a signed contract auto-creates the project, the invoice, the tasks, and the team notifications.',
    win: 'Handoffs happen by themselves. Nothing falls through.',
    kind: 'status',
    dash: { caption: 'Automation runs · today', live: true, rows: [{ label: 'Contract signed → project created', status: 'Done', tone: 'emerald', auto: true }, { label: 'Invoice drafted & sent', status: 'Done', tone: 'emerald', auto: true }, { label: 'Kickoff tasks assigned', status: 'Running', tone: 'amber', auto: true }, { label: 'Team notified in Slack', status: 'Queued', tone: 'blue', auto: true }] },
  },
  {
    n: '03', name: '24/7 AI Support & Voice Agents', tag: 'Customer service',
    villain: 'After-hours leads go cold and FAQs eat your team alive — you can’t answer the phone at 11pm.',
    build: 'Custom AI agents that answer questions, qualify leads, and book appointments around the clock — in your voice.',
    win: 'You never miss a lead again. Your team handles the exceptions, not the basics.',
    kind: 'funnel',
    dash: { caption: 'Conversations handled · this week', stages: [{ label: 'Handled', value: 1240 }, { label: 'Qualified', value: 410 }, { label: 'Booked', value: 96 }] },
  },
  {
    n: '04', name: 'Predictive Inventory', tag: 'Supply & demand',
    villain: 'Cash trapped in overstock on one shelf while you stock out — and lose the sale — on the next.',
    build: 'Forecasting tuned to your real sales history and seasonality, telling you exactly what to order and when.',
    win: 'Order what you’ll actually sell. Free the cash you’ve got sitting on shelves.',
    kind: 'chart',
    dash: { caption: 'Demand forecast · next 6 weeks', note: '94% accuracy', bars: [{ l: 'W1', v: 60 }, { l: 'W2', v: 72 }, { l: 'W3', v: 65 }, { l: 'W4', v: 88, hot: true }, { l: 'W5', v: 70 }, { l: 'W6', v: 80 }] },
  },
  {
    n: '05', name: 'Cash-Flow Co-Pilot', tag: 'FinOps',
    villain: 'Most owners don’t see the cash problem until the account hits zero. By then it’s a crisis, not a decision.',
    build: 'Bank and accounting feeds that forecast your 90-day cash position, flag anomalies, and chase late invoices for you.',
    win: 'See the wall before you hit it. Make the call while you still have options.',
    kind: 'chart',
    dash: { caption: '90-day cash runway', note: 'on track', bars: [{ l: 'M1', v: 70 }, { l: 'M2', v: 64 }, { l: 'M3', v: 58, hot: true }], alert: 'Anomaly flagged: vendor charge 2× the usual — review.' },
  },
  {
    n: '06', name: 'Smart Scheduling', tag: 'Workforce',
    villain: 'Scheduling chaos, no-shows, and a manager fielding swap-request texts all weekend.',
    build: 'Predictive scheduling that staffs for your real busy periods, automates swaps, and onboards new hires hands-free.',
    win: 'The right people on the right shifts — without the Sunday-night Tetris.',
    kind: 'schedule',
    dash: { caption: 'This week · auto-staffed', rows: [{ name: 'Crew A', blocks: [{ col: 0, span: 2, label: 'Open', tone: 'brand' }, { col: 3, span: 1, label: 'Peak', tone: 'amber' }] }, { name: 'Crew B', blocks: [{ col: 1, span: 2, label: 'Shift', tone: 'emerald' }, { col: 4, span: 1, label: 'On', tone: 'brand' }] }, { name: 'Crew C', blocks: [{ col: 0, span: 1, label: 'On', tone: 'brand' }, { col: 2, span: 2, label: 'Cover', tone: 'emerald' }] }] },
  },
  {
    n: '07', name: 'Marketing & Loyalty Engine', tag: 'Growth',
    villain: 'Generic blasts and one-size coupons that train your best customers to ignore you.',
    build: 'Behavior-based segmentation that sends each customer the right message at the right moment — not another spray-and-pray.',
    win: 'The right offer to the right person. Repeat customers who actually feel known.',
    kind: 'funnel',
    dash: { caption: 'Loyalty campaign · live', stages: [{ label: 'Segmented', value: 4200 }, { label: 'Personalized', value: 4200 }, { label: 'Opened', value: 2730 }, { label: 'Reordered', value: 612 }] },
  },
  {
    n: '08', name: 'The Company Brain', tag: 'Knowledge base',
    villain: 'Tribal knowledge — the silent killer of scaling. When your best people leave, the “how” walks out with them.',
    build: 'A knowledge base that ingests your SOPs, Slack history, and docs so anyone can ask “how do we…?” in plain English.',
    win: 'Every new hire is instantly up to speed. The company’s memory stops depending on one person.',
    kind: 'chat',
    dash: { caption: 'Company Brain', turns: [{ me: true, text: 'How do we handle a rush order for a wholesale account?' }, { text: 'Wholesale rush orders: flag in the system, get ops-lead approval, add the 15% expedite fee, and notify the account rep. (Source: Ops SOP §4.2)' }] },
  },
  {
    n: '09', name: 'Computer-Vision QA & Safety', tag: 'Manufacturing',
    villain: 'A defect slips past the line and reaches the customer — or a safety miss becomes an incident.',
    build: 'Standard cameras plus custom AI that spots defects and safety violations in real time, right on the floor.',
    win: 'Catch it on the line, not at the customer. Fewer recalls, fewer incidents.',
    kind: 'status',
    dash: { caption: 'Line 3 · vision monitor', live: true, rows: [{ label: 'Unit #4412 — within spec', status: 'Pass', tone: 'emerald', auto: true }, { label: 'Unit #4413 — surface defect', status: 'Flag', tone: 'rose', auto: true }, { label: 'PPE check — all clear', status: 'Pass', tone: 'emerald', auto: true }, { label: 'Unit #4414 — within spec', status: 'Pass', tone: 'emerald', auto: true }] },
  },
  {
    n: '10', name: 'Vertical AI Copilot', tag: 'Your industry',
    villain: 'Generic AI doesn’t know your jargon, your rules, or how your industry actually works.',
    build: 'A copilot trained on your vertical — the terminology, the regulations, the workflows — built around your business.',
    win: 'An expert assistant that speaks your language, not a chatbot you have to babysit.',
    kind: 'chat',
    dash: { caption: 'Your vertical copilot', turns: [{ me: true, text: 'Draft the change-order language for the added curtain-wall scope.' }, { text: 'Drafted per your contract template + AIA G701. Flagged: the schedule impact (5 days) needs PM sign-off before it goes out.' }] },
  },
];

function setMeta(name, content, isProperty = false) {
  if (typeof document === 'undefined') return;
  const attr = isProperty ? 'property' : 'name';
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attr, name); document.head.appendChild(tag); }
  tag.setAttribute('content', content);
}

export default function IdeasIndex() {
  useEffect(() => {
    document.title = 'Custom Software Ideas — 10 ways to out-hustle the big guys | FusionSales.ai';
    setMeta('description', 'Ten custom-software builds that let a small team out-hustle the giants — AI sales copilot, automation hub, 24/7 AI support, predictive inventory, cash-flow co-pilot, and more. See what each dashboard would look like for your business.');
    setMeta('og:title', 'Custom Software Ideas — out-hustle the big guys', true);
    setMeta('og:description', 'Ten custom builds that make a 10-person team feel like 100. See the dashboard for each.', true);
    setMeta('og:url', 'https://fusionsales.ai/ideas', true);
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', 'https://fusionsales.ai/ideas');
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
            <a href="/ideas" className="text-gray-900 relative">Ideas<span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-600" /></a>
            <a href="/tools" className="text-gray-600 hover:text-gray-900 transition">Tools</a>
            <a href="/insights" className="text-gray-600 hover:text-gray-900 transition">Insights</a>
          </nav>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm hover:bg-gray-800 transition">Schedule a Conversation</a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <a href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition mb-10"><ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back to home</a>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6">Custom software ideas</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight text-gray-900 max-w-4xl">
              Ten ways to <span className="text-gray-500">out-hustle the big guys.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-gray-800 leading-relaxed max-w-3xl">
              Your real competition isn&rsquo;t the shop down the street &mdash; it&rsquo;s a billion-dollar company with a thousand engineers. You can&rsquo;t out-spend them. But you can <span className="text-gray-900 font-medium">out-hustle</span> them. Custom software is how a ten-person team starts to feel like a hundred.
            </p>
            <p className="mt-5 text-base text-gray-600 leading-relaxed max-w-3xl">
              No-code tools are the hammers and nails. We&rsquo;re the architect who builds the house. Here are ten builds we do &mdash; and what each one&rsquo;s dashboard would look like running in your business.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gray-900 text-white text-sm md:text-base hover:bg-gray-800 transition">Build one of these <ArrowRight className="w-4 h-4" /></a>
              <a href="/tools" className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-gray-900 text-gray-900 text-sm md:text-base hover:bg-gray-900 hover:text-white transition">Or play with the live demos</a>
            </div>
          </div>
        </section>

        {/* The 10 ideas — alternating feature rows */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4">
            {IDEAS.map((idea, i) => {
              const flip = i % 2 === 1;
              return (
                <div key={idea.n} className="py-16 md:py-20 border-b border-gray-100 last:border-0">
                  <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    {/* text */}
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="font-display text-3xl font-light text-brand-500 tabular-nums">{idea.n}</span>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 border border-gray-200 rounded-full px-3 py-1">{idea.tag}</span>
                      </div>
                      <h2 className="font-display text-2xl md:text-4xl font-light tracking-tight text-gray-900 mb-5 leading-tight">{idea.name}</h2>
                      <div className="space-y-4 max-w-xl">
                        <p className="text-gray-600 leading-relaxed"><span className="text-[11px] uppercase tracking-[0.18em] text-gray-400 block mb-1">The problem</span>{idea.villain}</p>
                        <p className="text-gray-900 leading-relaxed"><span className="text-[11px] uppercase tracking-[0.18em] text-brand-700 block mb-1">What we build</span>{idea.build}</p>
                        <p className="text-gray-700 leading-relaxed flex items-start gap-2"><Check className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" strokeWidth={1.75} /><span>{idea.win}</span></p>
                      </div>
                    </div>
                    {/* dashboard preview */}
                    <div className="relative">
                      <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-tr from-brand-500/15 via-brand-400/5 to-transparent blur-2xl" />
                      <div className="relative rounded-xl overflow-hidden border border-gray-900/10 shadow-2xl bg-[#0d1117]">
                        <div className="flex items-center gap-1.5 px-3.5 py-2 border-b border-white/10 bg-white/[0.02]">
                          <span className="w-2 h-2 rounded-full bg-white/15" /><span className="w-2 h-2 rounded-full bg-white/15" /><span className="w-2 h-2 rounded-full bg-white/15" />
                          <span className="ml-2 text-[10px] text-gray-500 truncate">{idea.name} · your business</span>
                        </div>
                        <div className="p-4">
                          <Dash kind={idea.kind} data={idea.dash} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 py-20 md:py-24 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight mb-6">The giants are slow. You&rsquo;re fast. Let&rsquo;s keep it that way.</h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed mb-10">Pick the one that would change your week. We&rsquo;ll model it for your business, free — and most builds are live in about six weeks.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-gray-900 text-sm md:text-base hover:bg-brand-50 transition">Schedule a Conversation <ArrowRight className="w-4 h-4" /></a>
              <a href="/insights/10-custom-software-ideas-to-out-hustle-the-big-guys" className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white text-white text-sm md:text-base hover:bg-white hover:text-gray-900 transition">Read the full breakdown</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-gray-600">
          <span>© 2026 Arlogix Inc.</span>
          <div className="flex gap-6">
            <a href="/insights" className="hover:text-gray-900 inline-flex items-center gap-1.5">Insights <ArrowUpRight className="w-3 h-3" /></a>
            <a href="/tools" className="hover:text-gray-900 inline-flex items-center gap-1.5">Tools <ArrowUpRight className="w-3 h-3" /></a>
            <a href="/" className="hover:text-gray-900">fusionsales.ai</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
