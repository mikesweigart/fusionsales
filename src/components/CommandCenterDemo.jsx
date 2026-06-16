import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Truck, Shield, Stethoscope, Building2, Factory,
  LayoutDashboard, FileText, KanbanSquare, CalendarDays, ClipboardList, GitCompare,
  Megaphone, Zap, Layers, Gauge, ListChecks,
  Bell, Check, CheckCircle2, ArrowRight, Clock, TrendingUp, AlertTriangle,
  Users, Mail, MessageSquare, Play, X, ChevronRight, Activity, DollarSign,
} from 'lucide-react';

/* =================================================================
   COMMAND CENTER — a live, simulated business operating system.
   Not a screenshot. Every surface is real React state. Each industry
   gets its OWN surfaces built from its real workflow, branded as if
   it were that company's deployed product — so a prospect sees their
   own solution, already built. Powered by FusionSales.
   ================================================================= */

// ---- formatting ----
const usd = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const usdK = (n) => (Math.abs(n) >= 1000 ? `$${(n / 1000).toFixed(Math.abs(n) >= 10000 ? 0 : 1).replace(/\.0$/, '')}k` : `$${Math.round(n)}`);
const num = (n) => Math.round(n).toLocaleString('en-US');

const CALENDLY = '/intake';

// ---- tone maps (per-vertical accents inside the dark surface) ----
const BLOCK = {
  brand: 'bg-brand-500/80', blue: 'bg-sky-500/70', emerald: 'bg-emerald-500/70',
  violet: 'bg-violet-500/70', amber: 'bg-amber-500/70', slate: 'bg-slate-400/55', rose: 'bg-rose-500/70',
};
const CHIP = {
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  blue: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
  rose: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
  violet: 'bg-violet-500/15 text-violet-300 border-violet-400/30',
  gray: 'bg-white/10 text-gray-300 border-white/15',
};

// ---- reduced motion ----
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduced;
}

// ---- count-up (animates when scrolled into view; re-runs on key change) ----
function useCountUp(target, key, duration = 1100) {
  const [val, setVal] = useState(target);
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reduced) { setVal(target); return; }
    const el = ref.current;
    if (!el) { setVal(target); return; }
    let raf, started = false;
    const animate = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        setVal(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { started = true; setVal(0); animate(); }
    }, { rootMargin: '-5% 0px' });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, key, reduced]);
  return [val, ref];
}

// ---- local Reveal ----
function useInView(options = { rootMargin: '-10% 0px' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current || inView) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return [ref, inView];
}
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={['transition-all duration-[800ms] ease-apple will-change-transform', inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.985]', className].join(' ')} style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}>
      {children}
    </div>
  );
}

// ---- brand marks ----
function BrandBadge({ mark, color, size = 30 }) {
  return (
    <span className="inline-flex items-center justify-center rounded-md font-semibold text-white shrink-0 shadow-sm" style={{ width: size, height: size, background: color, fontSize: size * 0.4, letterSpacing: '-0.02em' }}>
      {mark}
    </span>
  );
}
function FMark({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" className="shrink-0" aria-hidden>
      <rect width="56" height="56" rx="12" fill="#ffffff" />
      <rect x="17.5" y="12.25" width="7" height="31.5" fill="#0d1117" />
      <rect x="17.5" y="12.25" width="24.5" height="7" fill="#0d1117" />
      <rect x="17.5" y="24.5" width="19.25" height="5.25" fill="#0d1117" />
    </svg>
  );
}

const Panel = ({ className = '', children }) => (
  <div className={`rounded-xl border border-white/10 bg-white/[0.03] ${className}`}>{children}</div>
);
const Chip = ({ chip }) => chip ? (
  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${CHIP[chip.tone] || CHIP.gray}`}>
    {chip.dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />}{chip.label}
  </span>
) : null;

// =================================================================
// REUSABLE DETAIL POPOVER (the "pop-up" with automated timeline)
// =================================================================
function DetailPopover({ detail, onClose }) {
  if (!detail) return null;
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-2 motion-safe:animate-[ccfade_0.25s_ease-out]" onClick={onClose}>
      <div className="absolute inset-0 bg-[#0a0d13]/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-md rounded-xl border border-white/15 bg-[#141a24] shadow-2xl p-6 motion-safe:animate-[ccpop_0.28s_cubic-bezier(0.22,1,0.36,1)]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition" aria-label="Close"><X className="w-4 h-4" /></button>
        <p className="text-[10px] uppercase tracking-[0.18em] text-brand-400 mb-1.5">{detail.kicker || 'Detail'}</p>
        <h4 className="font-display text-xl font-light text-white leading-tight pr-6">{detail.title}</h4>
        {detail.sub && <p className="text-xs text-gray-400 mt-1">{detail.sub}</p>}
        {detail.stats && (
          <div className="grid grid-cols-3 gap-2 mt-5">
            {detail.stats.map((s, i) => (
              <div key={i} className="rounded-lg bg-white/[0.04] p-3">
                <p className="text-[9px] uppercase tracking-wider text-gray-500">{s.label}</p>
                <p className="text-sm text-white tabular-nums mt-1">{s.value}</p>
              </div>
            ))}
          </div>
        )}
        {detail.timeline && (
          <div className="mt-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 mb-3">Automated activity</p>
            <div>
              {detail.timeline.map((s, i, arr) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 shrink-0"><Check className="w-3 h-3" strokeWidth={2.5} /></span>
                    {i < arr.length - 1 && <span className="w-px flex-1 bg-white/10 my-1" />}
                  </div>
                  <p className="text-xs text-gray-300 pb-3 leading-snug">{s}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {detail.next && (
          <div className="mt-2 rounded-lg border border-brand-400/30 bg-brand-500/10 p-3 flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-brand-400 shrink-0" strokeWidth={1.75} />
            <p className="text-xs text-brand-200"><span className="text-gray-400">Next, automatically:</span> {detail.next}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// =================================================================
// KPI TILE + DASHBOARD
// =================================================================
const fmtKpi = (raw, fmt) => {
  if (fmt === 'usdK') return usdK(raw);
  if (fmt === 'pct') return `${Math.round(raw)}%`;
  if (fmt === 'sec') return `${Math.round(raw)}s`;
  if (fmt === 'min') return `${Math.round(raw)}m`;
  if (fmt === 'days') return `${Math.round(raw)}d`;
  return num(raw);
};
function Kpi({ kpi, idx, industry }) {
  const [val, ref] = useCountUp(kpi.value, `${industry}-${idx}`);
  return (
    <Panel className="p-4 md:p-5">
      <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-2 leading-tight">{kpi.label}</p>
      <div className="flex items-end gap-2" ref={ref}>
        <span className="font-display text-2xl md:text-3xl xl:text-[2.15rem] font-light text-white tabular-nums tracking-tight leading-none">{fmtKpi(val, kpi.fmt)}</span>
        {kpi.delta && <span className={`text-[11px] font-medium mb-0.5 inline-flex items-center gap-0.5 ${kpi.down ? 'text-emerald-400' : 'text-emerald-400'}`}><TrendingUp className="w-3 h-3" strokeWidth={2} />{kpi.delta}</span>}
      </div>
      {kpi.note && <p className="text-[10px] text-gray-500 mt-1.5">{kpi.note}</p>}
    </Panel>
  );
}
function DashboardView({ ind, industry, activity }) {
  const bars = ind.bars;
  const max = Math.max(...bars.rows.map((r) => r.value), 1);
  return (
    <div className="space-y-3 xl:space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xl:gap-4">
        {ind.kpis.map((k, i) => <Kpi key={k.label} kpi={k} idx={i} industry={industry} />)}
      </div>
      <div className="grid lg:grid-cols-5 gap-3 xl:gap-4">
        <Panel className="lg:col-span-3 p-5">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">{bars.caption}</p>
            {bars.total && <p className="text-xs text-gray-500 tabular-nums">{bars.total}</p>}
          </div>
          <div className="space-y-3.5">
            {bars.rows.map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-xs text-gray-400 truncate">{r.label}</span>
                <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-700 ease-out" style={{ width: `${(r.value / max) * 100}%` }} />
                </div>
                <span className="w-16 shrink-0 text-right text-xs text-gray-300 tabular-nums">{r.display}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="lg:col-span-2 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-3.5 h-3.5 text-brand-400" strokeWidth={2} />
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Live activity</p>
            <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] text-emerald-400"><LiveDot />live</span>
          </div>
          <div className="space-y-3">
            {activity.slice(0, 5).map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={a.key ?? i} className="flex items-start gap-2.5 motion-safe:animate-[ccfade_0.5s_ease-out]">
                  <span className={`mt-0.5 inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-md ${a.accent ? 'bg-brand-500/15 text-brand-400' : 'bg-white/[0.06] text-gray-400'}`}><Icon className="w-3.5 h-3.5" strokeWidth={1.75} /></span>
                  <div className="min-w-0"><p className="text-[12.5px] text-gray-200 leading-snug">{a.text}</p><p className="text-[10px] text-gray-500 mt-0.5">{a.time}</p></div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}
const LiveDot = () => (
  <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" /></span>
);

// =================================================================
// QUOTE BUILDER
// =================================================================
function QuoteView({ data, onSend }) {
  const q = data;
  const [type, setType] = useState(q.types[0].value);
  const [size, setSize] = useState(q.sizes[1].value);
  const [slider, setSlider] = useState(q.slider.def);
  const [sent, setSent] = useState(false);
  useEffect(() => { setType(q.types[0].value); setSize(q.sizes[1].value); setSlider(q.slider.def); setSent(false); }, [q]);
  const items = useMemo(() => q.compute({ type, size, slider }), [q, type, size, slider]);
  const subtotal = items.reduce((a, b) => a + b.amount, 0);
  const tax = Math.round(Math.max(0, subtotal) * 0.07);
  const total = subtotal + tax;
  return (
    <div className="grid lg:grid-cols-2 gap-3">
      <Panel className="p-5 space-y-5">
        <div>
          <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-2 block">{q.typeLabel}</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-brand-400/60 transition">
            {q.types.map((t) => <option key={t.value} value={t.value} className="bg-[#11161f] text-gray-100">{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-2 block">{q.sizeLabel}</label>
          <div className="grid grid-cols-3 gap-2">
            {q.sizes.map((s) => {
              const on = size === s.value;
              return (
                <button key={s.value} onClick={() => setSize(s.value)} className={`rounded-lg border px-2 py-2.5 text-left transition ${on ? 'border-brand-400 bg-brand-500/15' : 'border-white/10 bg-white/[0.02] hover:border-white/25'}`}>
                  <div className={`text-xs ${on ? 'text-white' : 'text-gray-300'}`}>{s.label}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{s.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400">{q.slider.label}</label>
            <span className="text-xs text-brand-400 tabular-nums font-medium">{q.slider.fmt(slider)}</span>
          </div>
          <input type="range" min={q.slider.min} max={q.slider.max} step={q.slider.step} value={slider} onChange={(e) => setSlider(Number(e.target.value))} className="cc-range w-full" />
        </div>
      </Panel>
      <Panel className="p-5 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div><p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">{q.docPrefix}</p><p className="text-sm text-gray-200 tabular-nums">{q.docNumber}</p></div>
          <div className="text-right"><p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">For</p><p className="text-sm text-gray-200">{q.client}</p></div>
        </div>
        <div className="space-y-2.5 border-t border-white/10 pt-4 flex-1">
          {items.map((it, i) => (
            <div key={i} className="flex items-baseline justify-between gap-3">
              <span className="text-xs text-gray-300">{it.label}</span>
              <span className={`text-xs tabular-nums shrink-0 ${it.amount < 0 ? 'text-emerald-400' : 'text-gray-200'}`}>{it.amount < 0 ? `-${usd(-it.amount)}` : usd(it.amount)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 mt-4 pt-3 space-y-1.5">
          <div className="flex justify-between text-xs text-gray-400"><span>Subtotal</span><span className="tabular-nums">{usd(subtotal)}</span></div>
          <div className="flex justify-between text-xs text-gray-400"><span>Tax (7%)</span><span className="tabular-nums">{usd(tax)}</span></div>
          <div className="flex justify-between items-baseline pt-1"><span className="text-sm text-white">Total</span><span className="font-display text-2xl font-light text-white tabular-nums tracking-tight">{usd(total)}</span></div>
        </div>
        <button onClick={() => { setSent(true); onSend(q.client); }} disabled={sent} className={`mt-4 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${sent ? 'bg-emerald-500/15 text-emerald-400 cursor-default' : 'bg-brand-500 text-white hover:bg-brand-400'}`}>
          {sent ? <><Check className="w-4 h-4" /> Sent &amp; logged</> : <>{q.sendLabel || 'Send quote'} <ArrowRight className="w-4 h-4" /></>}
        </button>
      </Panel>
    </div>
  );
}

// =================================================================
// BOARD (kanban + click → popover)
// =================================================================
function BoardView({ data }) {
  const [open, setOpen] = useState(null);
  const card = data.cards.find((c) => c.id === open);
  return (
    <div className="relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {data.columns.map((col) => {
          const cards = data.cards.filter((c) => c.col === col.id);
          const sum = cards.reduce((a, c) => a + (c.value || 0), 0);
          return (
            <div key={col.id}>
              <div className="flex items-center justify-between mb-2.5 px-0.5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-gray-400">{col.label}</span>
                {sum > 0 && <span className="text-[10px] text-gray-500 tabular-nums">{usdK(sum)}</span>}
              </div>
              <div className="space-y-2">
                {cards.map((c) => (
                  <button key={c.id} onClick={() => setOpen(c.id)} className="w-full text-left rounded-lg border border-white/10 bg-white/[0.03] hover:border-brand-400/50 hover:bg-white/[0.05] p-3 transition group">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[12.5px] text-gray-100 leading-tight">{c.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-brand-400 transition shrink-0 mt-0.5" />
                    </div>
                    <p className="text-[10.5px] text-gray-500 mt-0.5 leading-tight">{c.sub}</p>
                    <div className="flex items-center justify-between mt-2.5">
                      {c.value ? <span className="text-xs text-gray-200 tabular-nums">{usdK(c.value)}</span> : <span className="text-[10px] text-gray-500">{c.meta}</span>}
                      {c.touches != null && <span className="text-[10px] text-gray-500 inline-flex items-center gap-1"><Zap className="w-2.5 h-2.5 text-brand-400" strokeWidth={2} />{c.touches}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {card && <DetailPopover onClose={() => setOpen(null)} detail={{
        kicker: data.kicker || 'Record', title: card.name, sub: card.sub,
        stats: [
          ...(card.value ? [{ label: 'Value', value: usdK(card.value) }] : []),
          { label: data.daysLabel || 'Days in stage', value: card.days ?? '—' },
          { label: 'Auto-touches', value: card.touches ?? '—' },
        ],
        timeline: card.timeline || ['Record captured & enriched', 'Documents auto-assembled', `${card.touches ?? 'Several'} follow-ups across email + SMS`, 'Owner notified on activity'],
        next: card.next,
      }} />}
    </div>
  );
}

// =================================================================
// SCHEDULE (resource × time grid — dispatch / calendar / shop floor)
// =================================================================
function ScheduleView({ data }) {
  const [open, setOpen] = useState(null);
  return (
    <Panel className="p-5 relative">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">{data.caption}</p>
        {data.utilization != null && <span className="text-[11px] text-gray-400">Utilization <span className="text-brand-400 tabular-nums font-medium">{Math.round(data.utilization * 100)}%</span></span>}
      </div>
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="min-w-[600px]">
          <div className="flex items-center mb-2">
            <div className="w-28 shrink-0 text-[10px] uppercase tracking-wider text-gray-500">{data.resourceLabel}</div>
            <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${data.cols.length}, minmax(0,1fr))` }}>
              {data.cols.map((c, i) => <div key={i} className="text-[10px] text-gray-500 text-center">{c}</div>)}
            </div>
          </div>
          <div className="space-y-1.5">
            {data.rows.map((r, ri) => (
              <div key={ri} className="flex items-center">
                <div className="w-28 shrink-0 pr-2"><p className="text-xs text-gray-200 truncate">{r.name}</p><p className="text-[10px] text-gray-500 truncate">{r.sub}</p></div>
                <div className="flex-1 grid gap-1 rounded-md bg-white/[0.02] p-1" style={{ gridTemplateColumns: `repeat(${data.cols.length}, minmax(0,1fr))`, minHeight: '2.5rem' }}>
                  {r.blocks.map((b, bi) => (
                    <button key={bi} onClick={() => setOpen(b.detail ? { ...b } : null)} style={{ gridColumn: `${b.col + 1} / span ${b.span}` }} className={`h-9 rounded ${BLOCK[b.tone] || BLOCK.slate} px-2 flex items-center text-[10.5px] text-white/95 hover:brightness-110 transition ${b.detail ? 'cursor-pointer' : 'cursor-default'}`}>
                      <span className="truncate">{b.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {data.legend && <div className="flex flex-wrap gap-3 mt-4">{data.legend.map((l, i) => <span key={i} className="inline-flex items-center gap-1.5 text-[10px] text-gray-400"><span className={`w-2.5 h-2.5 rounded-sm ${BLOCK[l.tone]}`} />{l.label}</span>)}</div>}
      {open && <DetailPopover onClose={() => setOpen(null)} detail={open.detail} />}
    </Panel>
  );
}

// =================================================================
// TABLE (bid leveling / renewals book / intake / RFIs / work orders)
// =================================================================
function TableView({ data }) {
  const [open, setOpen] = useState(null);
  return (
    <Panel className="p-0 overflow-hidden relative">
      <div className="p-4 border-b border-white/10 flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">{data.caption}</p>
        {data.note && <span className="text-[11px] text-gray-500 text-right">{data.note}</span>}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left">
          <thead>
            <tr className="border-b border-white/10">
              {data.columns.map((c) => <th key={c.key} className={`px-4 py-2.5 text-[10px] uppercase tracking-wider text-gray-500 font-medium ${c.align === 'right' ? 'text-right' : ''}`}>{c.label}</th>)}
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r, ri) => (
              <tr key={ri} onClick={() => r.detail && setOpen(ri)} className={`border-b border-white/5 last:border-0 ${r.detail ? 'cursor-pointer hover:bg-white/[0.035]' : ''} transition`}>
                {data.columns.map((c, ci) => (
                  <td key={c.key} className={`px-4 py-3 text-xs ${c.align === 'right' ? 'text-right tabular-nums text-gray-200' : ''}`}>
                    {c.type === 'chip' ? <Chip chip={r[c.key]} />
                      : c.type === 'money' ? <span className="text-gray-200 tabular-nums">{usd(r[c.key])}</span>
                      : <span className={ci === 0 ? 'text-gray-100' : 'text-gray-300'}>{r[c.key]}{r.auto && ci === 0 && <Zap className="inline w-3 h-3 text-brand-400 ml-1.5 align-[-1px]" strokeWidth={2} />}</span>}
                  </td>
                ))}
                <td className="px-2">{r.detail && <ChevronRight className="w-3.5 h-3.5 text-gray-600" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.footer && <div className="p-4 border-t border-white/10 bg-brand-500/[0.06] flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" strokeWidth={1.75} /><p className="text-xs text-brand-200">{data.footer}</p></div>}
      {open != null && <DetailPopover detail={data.rows[open].detail} onClose={() => setOpen(null)} />}
    </Panel>
  );
}

// =================================================================
// CAMPAIGN (outbound simulator — animated funnel)
// =================================================================
function CampaignView({ data, onToast }) {
  const c = data;
  const reduced = usePrefersReducedMotion();
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [counts, setCounts] = useState(() => c.stages.map(() => 0));
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { setRunning(false); setDone(false); setCounts(c.stages.map(() => 0)); timers.current.forEach(clearTimeout); }, [c]);
  const targets = c.stages.map((s) => Math.round(c.audience * s.pct));
  const booked = targets[targets.length - 1];
  const run = useCallback(() => {
    if (running) return;
    timers.current.forEach(clearTimeout); timers.current = [];
    setDone(false); setRunning(true);
    if (reduced) { setCounts(targets); setRunning(false); setDone(true); onToast({ icon: CheckCircle2, text: `${num(booked)} ${c.outcome} — automated`, accent: true }); return; }
    setCounts(c.stages.map(() => 0));
    const per = 720, steps = 18;
    c.stages.forEach((stage, si) => {
      const tgt = targets[si];
      for (let k = 1; k <= steps; k++) timers.current.push(setTimeout(() => setCounts((p) => { const n = [...p]; n[si] = Math.round(tgt * (k / steps)); return n; }), si * per + (k / steps) * per));
      timers.current.push(setTimeout(() => {
        if (si === 1) onToast({ icon: Mail, text: `${num(targets[1])} opened the first touch`, accent: false });
        if (si === 3) onToast({ icon: MessageSquare, text: `${num(targets[3])} responses — AI drafting replies`, accent: false });
      }, si * per + per * 0.6));
    });
    timers.current.push(setTimeout(() => { setRunning(false); setDone(true); onToast({ icon: CheckCircle2, text: `${num(booked)} ${c.outcome} — hands-off`, accent: true }); }, c.stages.length * per + 200));
  }, [running, reduced, c, targets, booked, onToast]);
  const maxT = targets[0] || 1;
  return (
    <div className="space-y-3">
      <Panel className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 mb-1">{c.kicker || 'Outbound campaign'}</p>
            <p className="text-sm text-gray-100 leading-snug">{c.name}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
              <span className="text-[11px] text-gray-400 inline-flex items-center gap-1"><Users className="w-3 h-3" />{num(c.audience)} {c.audienceLabel || 'contacts'}</span>
              {c.channelMix.map((ch) => <span key={ch} className="text-[10px] text-gray-400 rounded-full border border-white/10 px-2 py-0.5">{ch}</span>)}
            </div>
          </div>
          <button onClick={run} disabled={running} className={`shrink-0 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${running ? 'bg-white/10 text-gray-400 cursor-wait' : done ? 'bg-white/10 text-gray-200 hover:bg-white/15' : 'bg-brand-500 text-white hover:bg-brand-400'}`}>
            {running ? 'Running…' : done ? 'Run again' : <><Play className="w-4 h-4" fill="currentColor" strokeWidth={0} /> {c.runLabel || 'Run campaign'}</>}
          </button>
        </div>
      </Panel>
      <Panel className="p-5">
        <div className="space-y-3.5">
          {c.stages.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <span className="w-32 sm:w-44 shrink-0 text-xs text-gray-300">{s.label}</span>
              <div className="flex-1 h-7 rounded-md bg-white/[0.05] overflow-hidden relative">
                <div className={`h-full rounded-md transition-all duration-300 ease-out ${i === c.stages.length - 1 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-brand-500/80 to-brand-400/80'}`} style={{ width: `${(counts[i] / maxT) * 100}%` }} />
                <span className="absolute inset-y-0 left-2.5 flex items-center text-[11px] text-white/90 tabular-nums font-medium">{num(counts[i])}</span>
              </div>
              <span className="w-10 shrink-0 text-right text-[10px] text-gray-500 tabular-nums">{Math.round(s.pct * 100)}%</span>
            </div>
          ))}
        </div>
        {done && (
          <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3 flex items-center gap-2.5 motion-safe:animate-[ccfade_0.4s_ease-out]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.75} />
            <p className="text-xs text-emerald-200"><span className="font-medium text-white tabular-nums">{num(booked)}</span> {c.outcome} from {num(c.audience)} {c.audienceLabel || 'contacts'} — every touch, reply, and handoff ran automatically.</p>
          </div>
        )}
      </Panel>
    </div>
  );
}

// =================================================================
// AUTOMATIONS (workflow chains + test-run animation)
// =================================================================
function AutomationView({ data, industry }) {
  const [testing, setTesting] = useState(null);
  const reduced = usePrefersReducedMotion();
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { setTesting(null); timers.current.forEach(clearTimeout); }, [industry]);
  const test = (ri) => {
    timers.current.forEach(clearTimeout); timers.current = [];
    const steps = data[ri].steps.length;
    if (reduced) { setTesting({ rule: ri, step: steps, done: true }); return; }
    setTesting({ rule: ri, step: 0 });
    for (let k = 1; k <= steps; k++) timers.current.push(setTimeout(() => setTesting({ rule: ri, step: k }), k * 520));
    timers.current.push(setTimeout(() => setTesting({ rule: ri, step: steps, done: true }), steps * 520 + 600));
  };
  return (
    <div className="space-y-3">
      {data.map((rule, ri) => {
        const active = testing?.rule === ri;
        return (
          <Panel key={rule.name} className="p-4 md:p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2"><span className="inline-flex w-6 h-6 items-center justify-center rounded-md bg-brand-500/15 text-brand-400 shrink-0"><Zap className="w-3.5 h-3.5" strokeWidth={2} /></span><p className="text-sm text-gray-100">{rule.name}</p></div>
                <p className="text-[11px] text-gray-500 mt-1.5">When: <span className="text-gray-400">{rule.trigger}</span> · {num(rule.runs)} runs</p>
              </div>
              <button onClick={() => test(ri)} className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-[11px] text-gray-200 hover:border-brand-400/60 hover:text-white transition"><Play className="w-3 h-3" fill="currentColor" strokeWidth={0} /> Test run</button>
            </div>
            <div className="flex flex-wrap items-center gap-y-2">
              {rule.steps.map((s, si) => {
                const reached = active && testing.step > si;
                const current = active && testing.step === si + 1 && !testing.done;
                return (
                  <React.Fragment key={si}>
                    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] transition-all duration-300 ${reached ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-300' : current ? 'border-brand-400/70 bg-brand-500/15 text-white scale-105' : 'border-white/10 bg-white/[0.03] text-gray-400'}`}>
                      {reached ? <Check className="w-3 h-3" strokeWidth={2.5} /> : <span className={`w-1.5 h-1.5 rounded-full ${current ? 'bg-brand-400' : 'bg-gray-600'}`} />}{s}
                    </span>
                    {si < rule.steps.length - 1 && <ArrowRight className={`w-3.5 h-3.5 mx-1 shrink-0 transition-colors ${reached ? 'text-emerald-400/60' : 'text-gray-600'}`} />}
                  </React.Fragment>
                );
              })}
            </div>
          </Panel>
        );
      })}
    </div>
  );
}

// =================================================================
// TOASTS
// =================================================================
function Toasts({ toasts }) {
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 z-40 flex flex-col gap-2 w-[min(20rem,calc(100%-1.5rem))]">
      {toasts.map((t) => {
        const Icon = t.icon || Bell;
        return (
          <div key={t.id} className="pointer-events-auto flex items-start gap-2.5 rounded-lg border border-white/15 bg-[#1a212d]/95 backdrop-blur shadow-xl p-3 motion-safe:animate-[cctoast_0.35s_cubic-bezier(0.22,1,0.36,1)]">
            <span className={`mt-0.5 inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-md ${t.accent ? 'bg-brand-500/20 text-brand-400' : 'bg-emerald-500/15 text-emerald-400'}`}><Icon className="w-3.5 h-3.5" strokeWidth={1.75} /></span>
            <div className="min-w-0"><p className="text-[12px] text-gray-100 leading-snug">{t.text}</p><p className="text-[9.5px] uppercase tracking-wider text-gray-500 mt-0.5">automated · just now</p></div>
          </div>
        );
      })}
    </div>
  );
}

// =================================================================
// PER-INDUSTRY DATA  (each vertical = its own native product)
// =================================================================
const A = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const INDUSTRIES = {
  moving: {
    label: 'Moving', icon: Truck, company: 'Acme Commercial Movers', domain: 'ops.acmemovers.com',
    persona: 'Dispatch & sales cockpit', brand: { mark: 'AC', color: '#d9772f' },
    kpis: [
      { label: 'Booked this month', value: 284500, fmt: 'usdK', delta: '+18%' },
      { label: 'Active jobs', value: 37, fmt: 'num' },
      { label: 'Avg quote time', value: 90, fmt: 'sec', note: 'was 2 hrs' },
      { label: 'Win rate', value: 62, fmt: 'pct', delta: '+14 pts' },
    ],
    bars: { caption: 'Pipeline by stage', total: '$236k open', rows: [
      { label: 'New', value: 19500, display: '$20k' }, { label: 'Quoted', value: 98000, display: '$98k' },
      { label: 'Negotiating', value: 88000, display: '$88k' }, { label: 'Won', value: 31000, display: '$31k' } ] },
    activitySeed: [
      { icon: FileText, text: 'Quote FS-0042 sent to Riverside Logistics', time: 'just now', accent: true },
      { icon: MessageSquare, text: 'Auto follow-up SMS — Delta Foods (no reply 48h)', time: '6m' },
      { icon: DollarSign, text: 'Deposit received — Northside · $5,800', time: '22m' },
      { icon: Users, text: 'New website lead — Harbor Freight Co.', time: '41m' } ],
    activityPool: [
      { icon: FileText, text: 'Quote FS-0048 viewed 3× by Summit Retail', accent: true },
      { icon: MessageSquare, text: 'Crew confirmation texted to 4 movers — Tue 7am' },
      { icon: CheckCircle2, text: 'Job #2291 delivered — survey auto-sent' },
      { icon: Users, text: 'Inbound call transcribed → lead: Vertex Mfg.' },
      { icon: DollarSign, text: 'Final invoice paid — Cobb Industrial · $14,200' } ],
    surfaces: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'dashboard' },
      { id: 'quote', label: 'Quote builder', icon: FileText, type: 'quote', data: {
        docPrefix: 'QUOTE', docNumber: 'FS-2026-0042', client: 'Riverside Logistics', typeLabel: 'Move type', sizeLabel: 'Size',
        types: [{ value: 'office', label: 'Office Move' }, { value: 'warehouse', label: 'Warehouse / Logistics' }, { value: 'industrial', label: 'Industrial / Equipment' }],
        sizes: [{ value: 'small', label: 'Small', desc: '< 2k sqft' }, { value: 'medium', label: 'Medium', desc: '2–10k sqft' }, { value: 'large', label: 'Large', desc: '10k+ sqft' }],
        slider: { label: 'Distance', min: 5, max: 500, step: 5, def: 50, fmt: (v) => `${v} mi` },
        compute: ({ type, size, slider }) => { const base = { small: 2400, medium: 5800, large: 12000 }[size], mult = { office: 1, warehouse: 1.18, industrial: 1.35 }[type], crew = { small: 2, medium: 4, large: 6 }[size], hrs = { small: 4, medium: 8, large: 16 }[size];
          return [{ label: `${type === 'office' ? 'Office Move' : type === 'warehouse' ? 'Warehouse' : 'Industrial'} — ${size}`, amount: Math.round(base * mult) }, { label: `Crew (${crew} movers, ${hrs} hrs)`, amount: crew * hrs * 75 }, { label: `Truck (26-ft) — ${slider} mi`, amount: Math.round(350 + Math.max(0, slider - 25) * 4.25) }, { label: 'Full packing service', amount: Math.round(base * 0.32 * mult) }]; } } },
      { id: 'dispatch', label: 'Dispatch', icon: CalendarDays, type: 'schedule', data: {
        caption: 'Crew dispatch — this week', resourceLabel: 'Crew / truck', cols: A, utilization: 0.84,
        legend: [{ tone: 'brand', label: 'Confirmed job' }, { tone: 'blue', label: 'Tentative' }, { tone: 'slate', label: 'Maintenance' }],
        rows: [
          { name: 'Crew A', sub: '4 movers · 26ft', blocks: [{ col: 0, span: 2, label: 'Riverside whse', tone: 'brand', detail: { kicker: 'Job', title: 'Riverside Logistics', sub: 'Warehouse relocation · Mon–Tue', stats: [{ label: 'Value', value: '$42k' }, { label: 'Crew', value: '4' }, { label: 'Auto-texts', value: '5' }], timeline: ['Crew auto-assigned by skill + availability', 'Confirmation texted to all 4 movers', 'COI sent to building manager'], next: 'Day-of run sheet sends 6am Monday' } }, { col: 3, span: 1, label: 'Delta Foods', tone: 'blue' }] },
          { name: 'Crew B', sub: '6 movers · 26ft', blocks: [{ col: 1, span: 2, label: 'Summit Retail #3', tone: 'brand' }, { col: 4, span: 1, label: 'Harbor Freight', tone: 'blue' }] },
          { name: 'Crew C', sub: '2 movers · box', blocks: [{ col: 0, span: 1, label: 'Cobb Industrial', tone: 'brand' }, { col: 2, span: 1, label: 'Svc', tone: 'slate' }, { col: 3, span: 2, label: 'Vertex Mfg.', tone: 'brand' }] },
          { name: 'Truck 14', sub: 'Lift-gate', blocks: [{ col: 2, span: 2, label: 'Northside Office', tone: 'brand' }] } ] } },
      { id: 'pipeline', label: 'Pipeline', icon: KanbanSquare, type: 'board', data: {
        kicker: 'Deal', columns: [{ id: 'new', label: 'New' }, { id: 'quoted', label: 'Quoted' }, { id: 'negotiating', label: 'Negotiating' }, { id: 'won', label: 'Won' }],
        cards: [
          { id: 'd1', col: 'quoted', name: 'Riverside Logistics', sub: 'Warehouse relocation', value: 42000, days: 2, touches: 5, next: 'Auto follow-up SMS in 1 day' },
          { id: 'd2', col: 'negotiating', name: 'Summit Retail Group', sub: '6-store rollout', value: 88000, days: 4, touches: 9, next: 'Rep call — tomorrow 2pm' },
          { id: 'd3', col: 'new', name: 'Harbor Freight Co.', sub: 'Office move, 12k sqft', value: 19500, days: 0, touches: 1, next: 'Quote auto-drafting…' },
          { id: 'd4', col: 'quoted', name: 'Delta Foods', sub: 'Cold-storage equipment', value: 56000, days: 3, touches: 6, next: 'Reminder email queued' },
          { id: 'd5', col: 'won', name: 'Cobb Industrial', sub: 'Plant floor reconfigure', value: 31000, days: 1, touches: 11, next: 'Deposit invoice sent' } ] } },
      { id: 'automations', label: 'Automations', icon: Zap, type: 'automations', data: [
        { name: 'Quote viewed twice → nudge', trigger: 'Quote opened 2× in 24h', steps: ['Wait 2h', 'Text the prospect', 'Notify rep', 'Create task'], runs: 214 },
        { name: 'No reply → re-engage', trigger: 'No response in 48h', steps: ['Send follow-up email', 'Drop voicemail', 'Flag for rep call'], runs: 489 },
        { name: 'Delivered → review', trigger: 'Job marked delivered', steps: ['Send survey', 'If 5★, request Google review', 'Tag for re-marketing'], runs: 612 } ] },
    ],
  },

  insurance: {
    label: 'Insurance', icon: Shield, company: 'Pinnacle Insurance Group', domain: 'book.pinnacleins.com',
    persona: 'Producer & renewal cockpit', brand: { mark: 'PI', color: '#2563eb' },
    kpis: [
      { label: 'Premium bound (MTD)', value: 612000, fmt: 'usdK', delta: '+9%' },
      { label: 'Renewals at risk', value: 14, fmt: 'num', note: 'flagged early' },
      { label: 'Quote-to-bind', value: 11, fmt: 'min', note: 'was 2 days' },
      { label: 'Cross-sell rate', value: 28, fmt: 'pct', delta: '+11 pts' } ],
    bars: { caption: 'Premium by line of business', total: '$612k MTD', rows: [
      { label: 'Commercial auto', value: 210, display: '$210k' }, { label: 'General liability', value: 168, display: '$168k' },
      { label: 'Property', value: 142, display: '$142k' }, { label: 'Workers comp', value: 92, display: '$92k' } ] },
    activitySeed: [
      { icon: Shield, text: 'Renewal flagged 90 days early — Vance Mfg.', time: 'just now', accent: true },
      { icon: MessageSquare, text: 'Cross-sell nudge: umbrella → 6 eligible clients', time: '9m' },
      { icon: DollarSign, text: 'Policy bound — Cyber liability · $1,850/yr', time: '27m' },
      { icon: Users, text: 'New quote — Atlas Logistics (Comm. Auto)', time: '44m' } ],
    activityPool: [
      { icon: AlertTriangle, text: 'Retention score dropped on 3 accounts — rep alerted', accent: true },
      { icon: Mail, text: 'Renewal packets auto-sent — 22 policies, 60 days out' },
      { icon: CheckCircle2, text: 'COI generated & emailed — Harbor Construction' },
      { icon: DollarSign, text: 'Multi-policy discount applied — saved client $1,240' },
      { icon: Users, text: 'Lead routed to producer by line of business' } ],
    surfaces: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'dashboard' },
      { id: 'quote', label: 'Quote & bind', icon: FileText, type: 'quote', data: {
        docPrefix: 'POLICY QUOTE', docNumber: 'FS-INS-0117', client: 'Atlas Logistics', typeLabel: 'Coverage', sizeLabel: 'Tier', sendLabel: 'Bind policy',
        types: [{ value: 'auto', label: 'Commercial Auto' }, { value: 'gl', label: 'General Liability' }, { value: 'property', label: 'Property & Casualty' }],
        sizes: [{ value: 'small', label: 'Standard', desc: 'up to $1M' }, { value: 'medium', label: 'Enhanced', desc: '$1–5M' }, { value: 'large', label: 'Premium', desc: '$5M+' }],
        slider: { label: 'Revenue insured', min: 250000, max: 10000000, step: 50000, def: 1500000, fmt: (v) => usdK(v) },
        compute: ({ type, size, slider }) => { const rate = { auto: 0.012, gl: 0.008, property: 0.010 }[type], tier = { small: 1, medium: 1.25, large: 1.6 }[size], p = Math.round(slider * rate * tier);
          return [{ label: `${type === 'auto' ? 'Commercial Auto' : type === 'gl' ? 'General Liability' : 'Property & Casualty'} — ${size}`, amount: p }, { label: 'Risk-adjusted modifier (8%)', amount: Math.round(p * 0.08) }, { label: 'Cyber liability rider', amount: 1850 }, { label: 'Multi-policy discount (7%)', amount: -Math.round(p * 0.07) }]; } } },
      { id: 'renewals', label: 'Renewals book', icon: ListChecks, type: 'table', data: {
        caption: 'Book of business — renewal radar', note: 'Retention scored nightly',
        columns: [{ key: 'client', label: 'Client' }, { key: 'line', label: 'Line' }, { key: 'premium', label: 'Premium', align: 'right' }, { key: 'renews', label: 'Renews in' }, { key: 'status', label: 'Retention', type: 'chip' }],
        footer: '14 at-risk renewals surfaced 90 days early — save plays already queued.',
        rows: [
          { client: 'Vance Manufacturing', line: 'Package', premium: '$142k', renews: '88 days', status: { tone: 'rose', label: 'At risk', dot: true }, auto: true, detail: { kicker: 'Renewal', title: 'Vance Manufacturing', sub: 'Package policy · renews in 88 days', stats: [{ label: 'Premium', value: '$142k' }, { label: 'Retention', value: 'At risk' }, { label: 'Tenure', value: '6 yrs' }], timeline: ['Retention score fell below threshold', 'Producer alerted with save play', 'Personalized renewal offer drafted'], next: 'Producer call task scheduled today 4pm' } },
          { client: 'Harbor Construction', line: 'GL + Umbrella', premium: '$39k', renews: '34 days', status: { tone: 'amber', label: 'Watch', dot: true }, detail: { kicker: 'Renewal', title: 'Harbor Construction', sub: 'GL + Umbrella · renews in 34 days', stats: [{ label: 'Premium', value: '$39k' }, { label: 'Retention', value: 'Watch' }, { label: 'Tenure', value: '3 yrs' }], timeline: ['Renewal packet auto-assembled', 'Carrier rates compared', 'COI pre-issued'], next: 'Reminder email sends in 2 days' } },
          { client: 'Crestview Dental', line: 'WC', premium: '$23k', renews: '120 days', status: { tone: 'emerald', label: 'Healthy' } },
          { client: 'Summit Builders', line: 'Property', premium: '$67k', renews: '61 days', status: { tone: 'emerald', label: 'Healthy' }, auto: true },
          { client: 'Atlas Logistics', line: 'Comm. Auto', premium: '$88k', renews: '142 days', status: { tone: 'emerald', label: 'Healthy' } } ] } },
      { id: 'campaign', label: 'Save campaign', icon: Megaphone, type: 'campaign', data: {
        kicker: 'Retention campaign', name: 'Renewal save — falling retention scores', audience: 340, audienceLabel: 'accounts', channelMix: ['Email', 'Producer call', 'Direct mail'], runLabel: 'Run save play',
        stages: [{ id: 'sent', label: 'Engaged', pct: 1.0 }, { id: 'opened', label: 'Opened', pct: 0.64 }, { id: 'clicked', label: 'Reviewed offer', pct: 0.33 }, { id: 'replied', label: 'Responded', pct: 0.19 }, { id: 'booked', label: 'Renewal saved', pct: 0.12 }], outcome: 'renewals saved' } },
      { id: 'automations', label: 'Automations', icon: Zap, type: 'automations', data: [
        { name: 'Score drop → save play', trigger: 'Retention score falls', steps: ['Alert producer', 'Draft personalized offer', 'Schedule call', 'Queue direct mail'], runs: 167 },
        { name: 'Renewal 90 days out', trigger: 'Enters renewal window', steps: ['Assemble packet', 'Compare carrier rates', 'Send to producer'], runs: 731 },
        { name: 'Coverage gap → cross-sell', trigger: 'Gap detected', steps: ['Surface next-best policy', 'Draft tailored email', 'Add to worklist'], runs: 398 } ] },
    ],
  },

  healthcare: {
    label: 'Healthcare', icon: Stethoscope, company: 'Caring Health Partners', domain: 'care.caringhealth.com',
    persona: 'Front-office & intake cockpit', brand: { mark: 'CH', color: '#0d9488' },
    kpis: [
      { label: 'Net collections (MTD)', value: 418000, fmt: 'usdK', delta: '+12%' },
      { label: 'No-show rate', value: 6, fmt: 'pct', note: 'was 19%' },
      { label: 'Intake time', value: 4, fmt: 'min', note: 'was 35 min' },
      { label: 'Schedule fill', value: 91, fmt: 'pct', delta: '+16 pts' } ],
    bars: { caption: 'Visits by type — this week', total: '1,180 visits', rows: [
      { label: 'Wellness', value: 460, display: '460' }, { label: 'Specialty', value: 320, display: '320' },
      { label: 'Procedure', value: 210, display: '210' }, { label: 'Telehealth', value: 190, display: '190' } ] },
    activitySeed: [
      { icon: MessageSquare, text: 'Reminders sent — 142 patients, tomorrow', time: 'just now', accent: true },
      { icon: Users, text: 'Online intake completed — chart auto-created', time: '11m' },
      { icon: CheckCircle2, text: 'Insurance eligibility verified — 38 visits', time: '24m' },
      { icon: DollarSign, text: 'Copay collected at booking — $40', time: '38m' } ],
    activityPool: [
      { icon: CalendarDays, text: 'Waitlist auto-filled a canceled 2pm slot', accent: true },
      { icon: Mail, text: 'Post-visit care plans emailed — 27 patients' },
      { icon: CheckCircle2, text: 'Recall reminders sent — physicals due' },
      { icon: DollarSign, text: 'Balance text → patient paid $120' },
      { icon: Users, text: 'Referral routed to specialty queue' } ],
    surfaces: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'dashboard' },
      { id: 'schedule', label: 'Schedule', icon: CalendarDays, type: 'schedule', data: {
        caption: "Provider schedule — today", resourceLabel: 'Provider', cols: ['8a', '10a', '12p', '2p', '4p'], utilization: 0.91,
        legend: [{ tone: 'emerald', label: 'Confirmed' }, { tone: 'amber', label: 'New patient' }, { tone: 'slate', label: 'Admin / block' }],
        rows: [
          { name: 'Dr. Reyes', sub: 'Family med', blocks: [{ col: 0, span: 1, label: 'Wellness ×3', tone: 'emerald' }, { col: 1, span: 1, label: 'New pt — Alvarez', tone: 'amber', detail: { kicker: 'Appointment', title: 'R. Alvarez — New patient', sub: 'Annual care plan · 10:00a', stats: [{ label: 'Type', value: 'Annual' }, { label: 'Eligibility', value: 'Verified' }, { label: 'Copay', value: '$40' }], timeline: ['Online intake completed before visit', 'Insurance eligibility auto-verified', 'Copay collected at booking'], next: 'Reminder texts 48h + 2h before' } }, { col: 3, span: 2, label: 'Procedures', tone: 'emerald' }] },
          { name: 'Dr. Okafor', sub: 'Specialty', blocks: [{ col: 0, span: 2, label: 'Consults ×4', tone: 'emerald' }, { col: 3, span: 1, label: 'New pt — Boon', tone: 'amber' }] },
          { name: 'NP Lin', sub: 'Telehealth', blocks: [{ col: 1, span: 1, label: 'Admin', tone: 'slate' }, { col: 2, span: 2, label: 'Telehealth ×6', tone: 'emerald' }] },
          { name: 'Room 4', sub: 'Procedure', blocks: [{ col: 0, span: 1, label: 'Open', tone: 'slate' }, { col: 2, span: 2, label: 'J. Okafor', tone: 'emerald' }] } ] } },
      { id: 'intake', label: 'Intake & claims', icon: ListChecks, type: 'table', data: {
        caption: 'Intake & eligibility queue', note: 'Verified automatically on booking',
        columns: [{ key: 'patient', label: 'Patient' }, { key: 'visit', label: 'Visit' }, { key: 'payer', label: 'Payer' }, { key: 'copay', label: 'Copay', align: 'right' }, { key: 'status', label: 'Status', type: 'chip' }],
        footer: 'Eligibility + benefits checked before arrival — front desk starts at "verified."',
        rows: [
          { patient: 'R. Alvarez', visit: 'Annual', payer: 'BCBS', copay: '$40', status: { tone: 'emerald', label: 'Verified' }, auto: true, detail: { kicker: 'Patient', title: 'R. Alvarez', sub: 'Annual care plan · BCBS', stats: [{ label: 'Copay', value: '$40' }, { label: 'Deductible', value: 'Met' }, { label: 'Auth', value: 'N/A' }], timeline: ['Intake form completed online', 'Eligibility + benefits verified', 'Copay collected at booking'], next: 'Claim auto-submits after visit' } },
          { patient: 'T. Boon', visit: 'Specialty', payer: 'Aetna', copay: '$65', status: { tone: 'amber', label: 'Auth needed', dot: true }, auto: true, detail: { kicker: 'Patient', title: 'T. Boon', sub: 'Specialty consult · Aetna', stats: [{ label: 'Copay', value: '$65' }, { label: 'Auth', value: 'Pending' }, { label: 'ETA', value: '1 day' }], timeline: ['Prior-auth auto-requested', 'Clinical notes attached', 'Status tracked with payer'], next: 'Front desk notified when auth clears' } },
          { patient: 'J. Okafor', visit: 'Procedure', payer: 'United', copay: '$250', status: { tone: 'emerald', label: 'Verified' } },
          { patient: 'M. Singh', visit: 'Telehealth', payer: 'Cigna', copay: '$25', status: { tone: 'emerald', label: 'Verified' }, auto: true },
          { patient: 'D. Cole', visit: 'Wellness', payer: 'Medicare', copay: '$0', status: { tone: 'emerald', label: 'Verified' } } ] } },
      { id: 'recall', label: 'Recall', icon: Megaphone, type: 'campaign', data: {
        kicker: 'Patient recall', name: 'Recall — patients overdue for annual visit', audience: 2100, audienceLabel: 'patients', channelMix: ['SMS', 'Email', 'Portal'], runLabel: 'Run recall',
        stages: [{ id: 'sent', label: 'Reached', pct: 1.0 }, { id: 'opened', label: 'Opened', pct: 0.71 }, { id: 'clicked', label: 'Tapped book link', pct: 0.34 }, { id: 'replied', label: 'Started booking', pct: 0.22 }, { id: 'booked', label: 'Appointment booked', pct: 0.16 }], outcome: 'visits booked' } },
      { id: 'automations', label: 'Automations', icon: Zap, type: 'automations', data: [
        { name: 'Booking → reminder ladder', trigger: 'Appointment scheduled', steps: ['Confirm by SMS', 'Remind 48h', 'Remind 2h', 'If no-show, reschedule'], runs: 1840 },
        { name: 'Cancellation → waitlist fill', trigger: 'Slot opens', steps: ['Match waitlist', 'Text the offer', 'Auto-book on accept'], runs: 503 },
        { name: 'Overdue → recall', trigger: 'Patient overdue', steps: ['Send recall', 'Surface in queue', 'Verify insurance on booking'], runs: 922 } ] },
    ],
  },

  construction: {
    label: 'Construction', icon: Building2, company: 'Mercer Build Group', domain: 'build.mercerbuild.com',
    persona: 'Preconstruction & PM cockpit', brand: { mark: 'MB', color: '#ea580c' },
    kpis: [
      { label: 'Bids out (value)', value: 4200000, fmt: 'usdK', delta: '+22%' },
      { label: 'Open RFIs', value: 18, fmt: 'num', note: 'avg 1.2d to close' },
      { label: 'Submittals on time', value: 96, fmt: 'pct', delta: '+19 pts' },
      { label: 'Schedule variance', value: 2, fmt: 'days', note: 'was 11 days' } ],
    bars: { caption: 'Active projects by phase', total: '6 projects', rows: [
      { label: 'Preconstruction', value: 2, display: '2' }, { label: 'Procurement', value: 1, display: '1' },
      { label: 'Construction', value: 2, display: '2' }, { label: 'Closeout', value: 1, display: '1' } ] },
    activitySeed: [
      { icon: GitCompare, text: 'Bid leveling complete — Concrete pkg, 5 subs', time: 'just now', accent: true },
      { icon: ClipboardList, text: 'RFI #214 routed to architect — ball-in-court set', time: '12m' },
      { icon: CheckCircle2, text: 'Submittal #88 approved — auto-logged to schedule', time: '31m' },
      { icon: AlertTriangle, text: 'Long-lead item flagged — steel, 9-week lead', time: '47m' } ],
    activityPool: [
      { icon: GitCompare, text: 'Outlier bid flagged — 22% under scope, review', accent: true },
      { icon: Mail, text: 'Invitation-to-bid sent to 14 prequalified subs' },
      { icon: CheckCircle2, text: 'Daily log + photos captured from the field' },
      { icon: ClipboardList, text: 'Overdue submittal escalated to PM automatically' },
      { icon: DollarSign, text: 'Change order #12 approved — budget updated live' } ],
    surfaces: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'dashboard' },
      { id: 'leveling', label: 'Bid leveling', icon: GitCompare, type: 'table', data: {
        caption: 'Bid leveling — Concrete package', note: 'Normalized to a common scope',
        columns: [{ key: 'sub', label: 'Subcontractor' }, { key: 'base', label: 'Base bid', align: 'right' }, { key: 'adj', label: 'Scope adj.', align: 'right' }, { key: 'leveled', label: 'Leveled', align: 'right' }, { key: 'status', label: 'Flag', type: 'chip' }],
        footer: 'Recommended award: Apex Concrete — lowest leveled, no scope gaps, A-rated.',
        rows: [
          { sub: 'Apex Concrete', base: '$842k', adj: '+$0', leveled: '$842k', status: { tone: 'emerald', label: 'Best value' }, auto: true, detail: { kicker: 'Bid', title: 'Apex Concrete', sub: 'Concrete package · leveled $842k', stats: [{ label: 'Base', value: '$842k' }, { label: 'Leveled', value: '$842k' }, { label: 'Rating', value: 'A' }], timeline: ['Bid auto-parsed from PDF', 'Scope normalized to common basis', 'Inclusions / exclusions compared'], next: 'Award letter drafts on PM approval' } },
          { sub: 'Stoneridge', base: '$798k', adj: '+$71k', leveled: '$869k', status: { tone: 'amber', label: 'Scope gap', dot: true }, auto: true, detail: { kicker: 'Bid', title: 'Stoneridge', sub: 'Concrete package · leveled $869k', stats: [{ label: 'Base', value: '$798k' }, { label: 'Adj.', value: '+$71k' }, { label: 'Rating', value: 'B+' }], timeline: ['Bid auto-parsed from PDF', 'Missing rebar + pumping detected', 'Scope adjustment applied'], next: 'Clarification RFP queued to sub' } },
          { sub: 'Delta Pour', base: '$731k', adj: '+$143k', leveled: '$874k', status: { tone: 'rose', label: 'Outlier', dot: true }, detail: { kicker: 'Bid', title: 'Delta Pour', sub: 'Concrete package · leveled $874k', stats: [{ label: 'Base', value: '$731k' }, { label: 'Adj.', value: '+$143k' }, { label: 'Rating', value: 'B' }], timeline: ['Bid 22% under scope — flagged', 'Major exclusions detected', 'Marked high-risk'], next: 'Held pending scope review' } },
          { sub: 'Granite Works', base: '$905k', adj: '+$0', leveled: '$905k', status: { tone: 'gray', label: 'Complete' } },
          { sub: 'Foundation Co.', base: '$889k', adj: '+$28k', leveled: '$917k', status: { tone: 'gray', label: 'Complete' } } ] } },
      { id: 'submittals', label: 'Submittals & RFIs', icon: ClipboardList, type: 'table', data: {
        caption: 'Submittals & RFIs — ball-in-court', note: 'Auto-routed & escalated',
        columns: [{ key: 'item', label: 'Item' }, { key: 'type', label: 'Type', type: 'chip' }, { key: 'court', label: 'Ball-in-court' }, { key: 'due', label: 'Due' }, { key: 'status', label: 'Status', type: 'chip' }],
        footer: '96% on-time — overdue items escalate to the PM before they slip.',
        rows: [
          { item: '#214 — Slab embed locations', type: { tone: 'blue', label: 'RFI' }, court: 'Architect', due: '2 days', status: { tone: 'amber', label: 'Open', dot: true }, auto: true, detail: { kicker: 'RFI', title: 'RFI #214', sub: 'Slab embed locations', stats: [{ label: 'Court', value: 'Architect' }, { label: 'Due', value: '2 days' }, { label: 'Age', value: '1 day' }], timeline: ['RFI created from field photo', 'Auto-routed to architect of record', 'Reminder scheduled before due date'], next: 'Escalates to PM if not answered in 2 days' } },
          { item: '#88 — Rebar shop drawings', type: { tone: 'violet', label: 'Submittal' }, court: 'GC review', due: 'Today', status: { tone: 'emerald', label: 'Approved' }, auto: true },
          { item: '#215 — Curtain wall anchor', type: { tone: 'blue', label: 'RFI' }, court: 'Engineer', due: '4 days', status: { tone: 'amber', label: 'Open', dot: true } },
          { item: '#91 — Steel mill certs', type: { tone: 'violet', label: 'Submittal' }, court: 'Owner', due: '5 days', status: { tone: 'gray', label: 'Pending' } },
          { item: '#212 — Door hardware', type: { tone: 'blue', label: 'RFI' }, court: 'Closed', due: '—', status: { tone: 'emerald', label: 'Resolved' } } ] } },
      { id: 'schedule', label: 'Project schedule', icon: CalendarDays, type: 'schedule', data: {
        caption: 'Master schedule — Riverside Tower', resourceLabel: 'Phase', cols: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5'], utilization: 0.93,
        legend: [{ tone: 'brand', label: 'On track' }, { tone: 'amber', label: 'At risk' }, { tone: 'emerald', label: 'Complete' }],
        rows: [
          { name: 'Sitework', sub: 'Crew 1', blocks: [{ col: 0, span: 2, label: 'Grading', tone: 'emerald' }] },
          { name: 'Foundation', sub: 'Apex', blocks: [{ col: 1, span: 2, label: 'Footings + slab', tone: 'brand', detail: { kicker: 'Phase', title: 'Foundation', sub: 'Apex Concrete · Weeks 2–3', stats: [{ label: 'Status', value: 'On track' }, { label: 'Float', value: '3 days' }, { label: 'Crews', value: '2' }], timeline: ['Awarded via bid leveling', 'Submittals approved', 'Concrete pour scheduled'], next: 'Inspection auto-requested at pour' } }] },
          { name: 'Structure', sub: 'Steel', blocks: [{ col: 2, span: 1, label: 'Long-lead', tone: 'amber' }, { col: 3, span: 2, label: 'Erection', tone: 'brand' }] },
          { name: 'Envelope', sub: 'Curtain wall', blocks: [{ col: 4, span: 1, label: 'Start', tone: 'brand' }] } ] } },
      { id: 'automations', label: 'Automations', icon: Zap, type: 'automations', data: [
        { name: 'Bid received → level', trigger: 'Sub uploads a bid', steps: ['Parse the PDF', 'Normalize to scope', 'Flag gaps + outliers', 'Update leveling sheet'], runs: 308 },
        { name: 'RFI / submittal overdue', trigger: 'Item past due', steps: ['Remind ball-in-court', 'Escalate to PM', 'Log schedule impact'], runs: 944 },
        { name: 'Long-lead detected', trigger: 'Item lead > 6 weeks', steps: ['Flag in schedule', 'Notify procurement', 'Create PO task'], runs: 121 } ] },
    ],
  },

  manufacturing: {
    label: 'Manufacturing', icon: Factory, company: 'Vance Manufacturing', domain: 'shop.vancemfg.com',
    persona: 'Estimating & shop-floor cockpit', brand: { mark: 'VM', color: '#475569' },
    kpis: [
      { label: 'Booked (MTD)', value: 1080000, fmt: 'usdK', delta: '+15%' },
      { label: 'On-time rate', value: 94, fmt: 'pct', delta: '+21 pts' },
      { label: 'Quote turnaround', value: 4, fmt: 'min', note: 'was 6 days' },
      { label: 'Machine utilization', value: 88, fmt: 'pct', delta: '+12 pts' } ],
    bars: { caption: 'Work in progress by stage', total: '52 jobs', rows: [
      { label: 'Queued', value: 14, display: '14' }, { label: 'In production', value: 21, display: '21' },
      { label: 'QC', value: 9, display: '9' }, { label: 'Shipping', value: 8, display: '8' } ] },
    activitySeed: [
      { icon: FileText, text: 'Estimate auto-built — Job J-2291, 4 min', time: 'just now', accent: true },
      { icon: Gauge, text: 'CNC #3 idle 12 min — next job auto-pulled forward', time: '8m' },
      { icon: CheckCircle2, text: 'Job J-2284 passed QC — shipping label printed', time: '26m' },
      { icon: AlertTriangle, text: 'Material short flagged — reorder PO drafted', time: '39m' } ],
    activityPool: [
      { icon: FileText, text: 'RFQ parsed from email → estimate drafted', accent: true },
      { icon: Gauge, text: 'Bottleneck detected at brake press — reschedule suggested' },
      { icon: CheckCircle2, text: 'Traveler + routing generated for Job J-2293' },
      { icon: DollarSign, text: 'Invoice auto-sent on ship — Job J-2280 · $18,400' },
      { icon: Users, text: 'On-time delivery text sent to customer' } ],
    surfaces: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'dashboard' },
      { id: 'estimate', label: 'Estimating', icon: FileText, type: 'quote', data: {
        docPrefix: 'ESTIMATE', docNumber: 'FS-MFG-2291', client: 'Northwind Equipment', typeLabel: 'Part family', sizeLabel: 'Complexity', sendLabel: 'Send estimate',
        types: [{ value: 'machined', label: 'Machined component' }, { value: 'fab', label: 'Weldment / fab' }, { value: 'assembly', label: 'Assembly' }],
        sizes: [{ value: 'small', label: 'Simple', desc: '1–2 ops' }, { value: 'medium', label: 'Moderate', desc: '3–5 ops' }, { value: 'large', label: 'Complex', desc: '6+ ops' }],
        slider: { label: 'Quantity', min: 1, max: 1000, step: 1, def: 120, fmt: (v) => `${num(v)} pcs` },
        compute: ({ type, size, slider }) => { const mat = { machined: 14, fab: 22, assembly: 31 }[type], ops = { small: 2, medium: 4, large: 7 }[size], setup = { small: 280, medium: 540, large: 1200 }[size];
          return [{ label: `Material — ${type} × ${num(slider)}`, amount: Math.round(mat * slider) }, { label: `Machine time (${ops} ops)`, amount: Math.round(ops * slider * 3.1) }, { label: 'Setup & programming', amount: setup }, { label: 'Finishing & QC', amount: Math.round(slider * 1.4) }]; } } },
      { id: 'jobs', label: 'Job tracking', icon: KanbanSquare, type: 'board', data: {
        kicker: 'Job', daysLabel: 'Days in stage', columns: [{ id: 'new', label: 'Queued' }, { id: 'quoted', label: 'In production' }, { id: 'negotiating', label: 'QC' }, { id: 'won', label: 'Shipped' }],
        cards: [
          { id: 'j1', col: 'quoted', name: 'J-2291 · Brackets', sub: 'Northwind · 120 pcs', value: 18400, days: 1, touches: 4, next: 'Auto-pull to QC when op 4 closes', timeline: ['RFQ parsed → estimate auto-built', 'Routing + traveler generated', 'Scheduled to CNC #3'] },
          { id: 'j2', col: 'negotiating', name: 'J-2284 · Housings', sub: 'Apex · 60 pcs', value: 31000, days: 0, touches: 6, next: 'Ship label prints on QC pass', timeline: ['Passed first-article inspection', 'In final QC', 'Customer ship notice queued'] },
          { id: 'j3', col: 'new', name: 'J-2293 · Weldment', sub: 'Beacon · 25 pcs', value: 12500, days: 0, touches: 2, next: 'Material check in progress' },
          { id: 'j4', col: 'quoted', name: 'J-2289 · Shafts', sub: 'Lumen · 300 pcs', value: 44000, days: 2, touches: 5, next: 'Bottleneck flagged at brake press' },
          { id: 'j5', col: 'won', name: 'J-2280 · Plates', sub: 'Vertex · 500 pcs', value: 18400, days: 1, touches: 9, next: 'Invoice auto-sent on ship' } ] } },
      { id: 'floor', label: 'Shop floor', icon: Gauge, type: 'schedule', data: {
        caption: 'Machine schedule — today', resourceLabel: 'Machine', cols: ['1st shift', '', '2nd shift', '', '3rd'], utilization: 0.88,
        legend: [{ tone: 'brand', label: 'Running' }, { tone: 'amber', label: 'Setup' }, { tone: 'slate', label: 'Idle / PM' }],
        rows: [
          { name: 'CNC #3', sub: 'Mill', blocks: [{ col: 0, span: 2, label: 'J-2291 brackets', tone: 'brand', detail: { kicker: 'Run', title: 'J-2291 · Brackets', sub: 'CNC #3 · 1st shift', stats: [{ label: 'Qty', value: '120' }, { label: 'Cycle', value: '3.1m' }, { label: 'ETA', value: '2:40p' }], timeline: ['Job auto-scheduled by due date', 'Program loaded from library', 'Operator traveler printed'], next: 'Auto-pulls J-2289 when this completes' } }, { col: 3, span: 2, label: 'J-2289 shafts', tone: 'brand' }] },
          { name: 'CNC #5', sub: 'Lathe', blocks: [{ col: 0, span: 1, label: 'Setup', tone: 'amber' }, { col: 1, span: 3, label: 'J-2289 shafts', tone: 'brand' }] },
          { name: 'Brake press', sub: 'Forming', blocks: [{ col: 1, span: 2, label: 'J-2293 weldment', tone: 'brand' }, { col: 4, span: 1, label: 'PM', tone: 'slate' }] },
          { name: 'Weld cell', sub: 'Robotic', blocks: [{ col: 0, span: 1, label: 'Idle', tone: 'slate' }, { col: 2, span: 2, label: 'J-2293', tone: 'brand' }] } ] } },
      { id: 'automations', label: 'Automations', icon: Zap, type: 'automations', data: [
        { name: 'RFQ → estimate', trigger: 'RFQ arrives by email', steps: ['Parse specs + qty', 'Pull material + labor rates', 'Draft estimate', 'Send for 1-click approval'], runs: 642 },
        { name: 'Op complete → pull next', trigger: 'Operation closes', steps: ['Update job status', 'Pull next job to machine', 'Alert if bottleneck'], runs: 2210 },
        { name: 'Shipped → bill', trigger: 'Job ships', steps: ['Generate invoice', 'Send ship notice', 'Request on-time review'], runs: 588 } ] },
    ],
  },
};

const ORDER = ['moving', 'insurance', 'healthcare', 'construction', 'manufacturing'];

// =================================================================
// ROOT
// =================================================================
let _id = 0;
const nextId = () => ++_id;

export default function CommandCenterDemo() {
  const [industry, setIndustry] = useState('moving');
  const ind = INDUSTRIES[industry];
  const [view, setView] = useState(ind.surfaces[0].id);
  const reduced = usePrefersReducedMotion();

  const surface = ind.surfaces.find((s) => s.id === view) || ind.surfaces[0];

  // live activity feed
  const [activity, setActivity] = useState(() => ind.activitySeed.map((a) => ({ ...a, key: nextId() })));
  const poolIdx = useRef(0);
  useEffect(() => { setActivity(ind.activitySeed.map((a) => ({ ...a, key: nextId() }))); poolIdx.current = 0; }, [industry, ind.activitySeed]);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      const pool = ind.activityPool; const item = pool[poolIdx.current % pool.length]; poolIdx.current += 1;
      setActivity((prev) => [{ ...item, time: 'just now', key: nextId() }, ...prev.map((p, i) => ({ ...p, time: i === 0 ? '1m' : p.time }))].slice(0, 6));
    }, 5200);
    return () => clearInterval(t);
  }, [industry, ind.activityPool, reduced]);

  // toasts
  const [toasts, setToasts] = useState([]);
  const pushToast = useCallback((t) => {
    const id = nextId();
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4200);
  }, []);
  useEffect(() => {
    if (reduced) return;
    const pool = ind.activityPool; let i = 0;
    const t = setInterval(() => { const item = pool[i % pool.length]; i += 1; pushToast({ icon: item.icon, text: item.text, accent: item.accent }); }, 8500);
    return () => clearInterval(t);
  }, [industry, ind.activityPool, reduced, pushToast]);

  const switchIndustry = (key) => { setIndustry(key); setView(INDUSTRIES[key].surfaces[0].id); setToasts([]); };

  return (
    <section id="demo" className="border-b border-gray-200 overflow-hidden py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Live demo</p>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
            See your software, already built.
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mb-4 leading-relaxed">
            Pick your industry. Below is a working command center built for that business &mdash; the real surfaces it would run on, branded as its own product. Movers get dispatch. Insurance gets a renewal radar. Construction gets bid leveling. Manufacturing gets the shop floor. This is what we&rsquo;d build for you.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mb-10 leading-relaxed">
            It&rsquo;s live, not a mockup. Open a record, run a campaign, test an automation. The notifications in the corner are the system working on its own.
          </p>
        </Reveal>

        {/* Industry switcher */}
        <Reveal>
          <div role="tablist" aria-label="Demo industry" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-5">
            {ORDER.map((key) => {
              const c = INDUSTRIES[key]; const Icon = c.icon; const active = industry === key;
              return (
                <button key={key} onClick={() => switchIndustry(key)} role="tab" aria-selected={active}
                  className={`px-4 py-3 border text-sm transition flex items-center gap-2 justify-center ${active ? 'bg-brand-600 text-white border-brand-600 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}>
                  <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} /><span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Wide breakout — the showcase surface gets a real "desktop app" width */}
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* The command center surface */}
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden border border-gray-900/10 shadow-2xl bg-[#0d1117]">
            <div aria-hidden className="pointer-events-none absolute -inset-x-20 -top-32 h-64 bg-gradient-to-b from-brand-500/15 to-transparent blur-3xl" />

            {/* chrome bar */}
            <div className="relative flex items-center gap-3 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" /><span className="w-2.5 h-2.5 rounded-full bg-white/15" /><span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-md bg-white/[0.04] border border-white/10 px-3 py-1 max-w-full">
                  <span className="text-[11px] text-gray-400 truncate">{ind.domain}</span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-gray-500">· <FMark size={11} /> built by FusionSales</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400"><LiveDot /><span className="hidden sm:inline">Live</span></span>
            </div>

            {/* app body */}
            <div className="relative flex flex-col md:flex-row min-h-[31rem] xl:min-h-[36rem]">
              {/* nav rail */}
              <div className="md:w-56 xl:w-64 shrink-0 border-b md:border-b-0 md:border-r border-white/10 p-2.5 md:p-3 flex flex-col">
                <div className="px-1.5 py-2 mb-2 md:mb-1 flex items-center gap-2.5 border-b border-white/10 md:border-b-0 pb-3 md:pb-2">
                  <BrandBadge mark={ind.brand.mark} color={ind.brand.color} />
                  <div className="min-w-0"><p className="text-[12px] text-gray-100 leading-tight truncate">{ind.company}</p><p className="text-[10px] text-gray-500 truncate">{ind.persona}</p></div>
                </div>
                <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
                  {ind.surfaces.map((s) => {
                    const Icon = s.icon; const on = view === s.id;
                    return (
                      <button key={s.id} onClick={() => setView(s.id)} className={`shrink-0 inline-flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition md:w-full whitespace-nowrap ${on ? 'bg-brand-500/15 text-white border border-brand-400/30' : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] border border-transparent'}`}>
                        <Icon className={`w-4 h-4 shrink-0 ${on ? 'text-brand-400' : ''}`} strokeWidth={1.75} /><span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="hidden md:flex items-center gap-1.5 mt-auto pt-3 px-1.5 text-[10px] text-gray-600">
                  <FMark size={12} /> Powered by FusionSales
                </div>
              </div>

              {/* main panel */}
              <div className="flex-1 min-w-0 p-3 md:p-5 xl:p-7 relative">
                <div key={`${industry}-${view}`} className="motion-safe:animate-[ccfade_0.4s_ease-out]">
                  {surface.type === 'dashboard' && <DashboardView ind={ind} industry={industry} activity={activity} />}
                  {surface.type === 'quote' && <QuoteView data={surface.data} onSend={(client) => pushToast({ icon: FileText, text: `${ind.label === 'Insurance' ? 'Policy bound' : ind.label === 'Manufacturing' ? 'Estimate sent' : 'Quote sent'} — ${client} · logged & follow-up scheduled`, accent: true })} />}
                  {surface.type === 'board' && <BoardView data={surface.data} />}
                  {surface.type === 'schedule' && <ScheduleView data={surface.data} />}
                  {surface.type === 'table' && <TableView data={surface.data} />}
                  {surface.type === 'campaign' && <CampaignView data={surface.data} onToast={pushToast} />}
                  {surface.type === 'automations' && <AutomationView data={surface.data} industry={industry} />}
                </div>
                <Toasts toasts={toasts} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <Reveal>
          <p className="mt-6 text-sm text-gray-500 max-w-3xl leading-relaxed">
            Everything above is one custom application &mdash; what a mid-sized business owns outright instead of renting five disconnected tools. <a href="/tools" className="text-gray-800 underline decoration-gray-300 hover:decoration-brand-500 underline-offset-4 hover:text-brand-700 transition">See what your version could do</a>, or <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-gray-800 underline decoration-gray-300 hover:decoration-brand-500 underline-offset-4 hover:text-brand-700 transition">book a 30-minute walkthrough</a>.
          </p>
        </Reveal>
      </div>

      <style>{`
        @keyframes ccfade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ccpop { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes cctoast { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .cc-range { -webkit-appearance: none; appearance: none; height: 4px; border-radius: 9999px; background: rgba(255,255,255,0.12); outline: none; }
        .cc-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 16px; height: 16px; border-radius: 9999px; background: #f59134; cursor: pointer; border: 2px solid #0d1117; box-shadow: 0 0 0 1px rgba(245,145,52,0.4); transition: transform .15s; }
        .cc-range::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .cc-range::-moz-range-thumb { width: 16px; height: 16px; border-radius: 9999px; background: #f59134; cursor: pointer; border: 2px solid #0d1117; }
      `}</style>
    </section>
  );
}
