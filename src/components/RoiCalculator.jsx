import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowRight, ChevronDown, TrendingUp, Clock, Sparkles } from 'lucide-react';

/* Apple-level ROI calculator. Live model, smooth number tweens, a value
   breakdown, and a five-year outlook chart. Inputs are shareable via URL.
   Deliberately conservative defaults; the math is transparent (expandable). */

const CALENDLY = '/intake';
const LABOR = 45; // $/hr fully-loaded — conservative for ops/admin time

const fmtUsd = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const fmtK = (n) => {
  const a = Math.abs(n);
  if (a >= 1_000_000) return `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (a >= 1_000) return `$${Math.round(n / 1000)}k`;
  return `$${Math.round(n)}`;
};
const fmtNum = (n) => Math.round(n).toLocaleString('en-US');
const fmtMonths = (n) => (!isFinite(n) || n <= 0 ? '<1 mo' : n < 1 ? '<1 mo' : `${n.toFixed(1).replace(/\.0$/, '')} mo`);

const INDUSTRIES = [
  { key: 'moving', label: 'Moving & logistics', note: 'quote-to-dispatch', preset: { team: 8, cost: 1800, hours: 10, deal: 35000 } },
  { key: 'insurance', label: 'Insurance agencies', note: 'quoting & renewals', preset: { team: 12, cost: 2200, hours: 8, deal: 18000 } },
  { key: 'healthplans', label: 'Health plans & networks', note: 'provider network builds & adequacy', preset: { team: 15, cost: 3500, hours: 12, deal: 120000 } },
  { key: 'construction', label: 'Construction', note: 'bids, RFIs & schedules', preset: { team: 20, cost: 2800, hours: 10, deal: 85000 } },
  { key: 'manufacturing', label: 'Manufacturing', note: 'estimating & shop floor', preset: { team: 25, cost: 3200, hours: 9, deal: 44000 } },
  { key: 'services', label: 'Professional services', note: 'engagements & utilization', preset: { team: 10, cost: 1600, hours: 9, deal: 28000 } },
];
const KEYS = INDUSTRIES.map((i) => i.key);

function usePrefersReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setR(mq.matches);
    const on = () => setR(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return r;
}

// Buttery number transitions — chases the target with a short ease (premium feel,
// not janky while dragging). Snaps instantly under reduced-motion.
function useTween(target, ms = 480) {
  const [v, setV] = useState(target);
  const raf = useRef();
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (typeof window === 'undefined' || reduced) { setV(target); return; }
    let from = v, start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ms);
      setV(from + (target - from) * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduced]);
  return v;
}

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current || inView) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); o.disconnect(); } }, { rootMargin: '-10% 0px' });
    o.observe(ref.current);
    return () => o.disconnect();
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

function Slider({ label, value, min, max, step, onChange, display, bound }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="text-xs uppercase tracking-[0.18em] text-gray-500">{label}</label>
        <span className="text-base font-medium text-gray-900 tabular-nums">{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-range w-full"
        style={{ background: `linear-gradient(to right, #d97706 0%, #f59134 ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)` }}
        aria-label={label}
      />
      {bound && (
        <div className="flex justify-between mt-1.5 text-[10px] text-gray-400 tabular-nums">
          <span>{bound(min)}</span><span>{bound(max)}</span>
        </div>
      )}
    </div>
  );
}

export default function RoiCalculator() {
  const [industry, setIndustry] = useState('moving');
  const [team, setTeam] = useState(8);
  const [cost, setCost] = useState(1800);
  const [hours, setHours] = useState(10);
  const [deal, setDeal] = useState(35000);
  const [showMath, setShowMath] = useState(false);
  const hydrated = useRef(false);

  // hydrate from URL (shareable)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    const n = (k, mn, mx, fb) => { const v = Number(p.get(k)); return Number.isFinite(v) && v >= mn && v <= mx ? v : fb; };
    if (p.get('industry') && KEYS.includes(p.get('industry'))) setIndustry(p.get('industry'));
    setTeam(n('team', 1, 60, 8));
    setCost(n('cost', 0, 8000, 1800));
    setHours(n('hours', 0, 30, 10));
    setDeal(n('deal', 1000, 500000, 35000));
    hydrated.current = true;
  }, []);
  // persist to URL
  useEffect(() => {
    if (!hydrated.current || typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    p.set('industry', industry); p.set('team', String(team)); p.set('cost', String(cost)); p.set('hours', String(hours)); p.set('deal', String(deal));
    window.history.replaceState({}, '', `${window.location.pathname}?${p.toString()}${window.location.hash}`);
  }, [industry, team, cost, hours, deal]);

  const applyIndustry = (key) => {
    setIndustry(key);
    const ind = INDUSTRIES.find((i) => i.key === key);
    if (ind) { setTeam(ind.preset.team); setCost(ind.preset.cost); setHours(ind.preset.hours); setDeal(ind.preset.deal); }
  };
  const activeIndustry = INDUSTRIES.find((i) => i.key === industry) || INDUSTRIES[0];

  const r = useMemo(() => {
    const softwareSavings = cost * 12 * 0.5;
    const recoveredHours = hours * team * 48;
    const laborRecovered = recoveredHours * LABOR * 0.5;
    const newRevenue = deal * team * 0.06 * (hours / 20);
    const annualValue = softwareSavings + laborRecovered + newRevenue;
    const buildCost = Math.min(150000, Math.max(15000, Math.round((team * 4500) / 1000) * 1000));
    const ongoing = Math.round(buildCost * 0.1);
    const monthlyValue = annualValue / 12;
    const paybackMonths = monthlyValue > 0 ? buildCost / monthlyValue : 0;
    const cumulative = [1, 2, 3, 4, 5].map((y) => annualValue * y - buildCost - ongoing * (y - 1));
    const fiveYearNet = cumulative[4];
    const roi = buildCost + ongoing * 4 > 0 ? (annualValue * 5) / (buildCost + ongoing * 4) : 0;
    return { softwareSavings, recoveredHours, laborRecovered, newRevenue, annualValue, buildCost, ongoing, paybackMonths, cumulative, fiveYearNet, roi };
  }, [cost, hours, team, deal]);

  // tweened display values
  const tAnnual = useTween(r.annualValue);
  const tRoi = useTween(r.roi);
  const tPayback = useTween(r.paybackMonths);
  const tFive = useTween(r.fiveYearNet);
  const tSoft = useTween(r.softwareSavings);
  const tLabor = useTween(r.laborRecovered);
  const tRev = useTween(r.newRevenue);

  const maxBreak = Math.max(r.softwareSavings, r.laborRecovered, r.newRevenue, 1);
  const maxCum = Math.max(...r.cumulative, 1);
  const breakdown = [
    { label: 'Software you stop renting', val: tSoft, tone: 'from-gray-400 to-gray-300' },
    { label: 'Team hours put back to work', val: tLabor, tone: 'from-brand-600 to-brand-400' },
    { label: 'Revenue from moving faster', val: tRev, tone: 'from-gray-700 to-gray-500' },
  ];

  return (
    <section id="calculator" className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">ROI calculator</p>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
            See the math before the meeting.
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mb-12 leading-relaxed">
            Set your numbers. Watch the value, the payback, and the five-year return update live.
            Bring the result to a 30-minute call &mdash; we&rsquo;ll pressure-test it against your real workflow.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-6 lg:gap-8 items-start">
          {/* ---- Inputs ---- */}
          <Reveal>
            <div className="bg-white border border-gray-200 rounded-2xl p-7 md:p-9 space-y-8 lg:sticky lg:top-24">
              <div>
                <label className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-3 block">Your industry</label>
                <div className="grid grid-cols-2 gap-2">
                  {INDUSTRIES.map((i) => {
                    const on = industry === i.key;
                    return (
                      <button key={i.key} onClick={() => applyIndustry(i.key)}
                        className={`text-left px-3.5 py-2.5 rounded-lg border text-sm transition ${on ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}>
                        {i.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-gray-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-600" strokeWidth={1.75} />
                  Tuned for <span className="text-gray-700">{activeIndustry.note}</span>. Adjust anything below.
                </p>
              </div>

              <Slider label="Team size" value={team} min={1} max={60} step={1} onChange={setTeam} display={`${team} ${team === 1 ? 'person' : 'people'}`} bound={(n) => `${n}`} />
              <Slider label="Monthly software spend" value={cost} min={0} max={8000} step={100} onChange={setCost} display={`${fmtUsd(cost)}/mo`} bound={(n) => fmtK(n)} />
              <Slider label="Manual hours / person / week" value={hours} min={0} max={30} step={1} onChange={setHours} display={`${hours} hrs`} bound={(n) => `${n}`} />
              <Slider label="Avg deal / project value" value={deal} min={1000} max={500000} step={1000} onChange={setDeal} display={fmtK(deal)} bound={(n) => fmtK(n)} />
            </div>
          </Reveal>

          {/* ---- Results ---- */}
          <Reveal delay={120}>
            <div className="space-y-4">
              {/* Hero value */}
              <div className="relative overflow-hidden rounded-2xl bg-gray-900 text-white p-8 md:p-10">
                <div aria-hidden className="pointer-events-none absolute -top-24 -right-16 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Estimated value · year one</p>
                  <p className="font-display text-5xl md:text-7xl font-light tracking-tight tabular-nums text-brand-400 leading-none">
                    {fmtUsd(tAnnual)}
                  </p>
                  <div className="mt-7 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/[0.06] border border-white/10 p-4">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-1.5 flex items-center gap-1.5"><Clock className="w-3 h-3" strokeWidth={2} />Pays for itself in</p>
                      <p className="text-2xl font-light tabular-nums text-white">{fmtMonths(tPayback)}</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.06] border border-white/10 p-4">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-1.5 flex items-center gap-1.5"><TrendingUp className="w-3 h-3" strokeWidth={2} />5-year return</p>
                      <p className="text-2xl font-light tabular-nums text-white">{tRoi.toFixed(1)}×</p>
                    </div>
                  </div>
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 px-6 py-3.5 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-brand-50 transition">
                    Bring these numbers to a call <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Breakdown */}
              <div className="rounded-2xl bg-white border border-gray-200 p-7 md:p-8">
                <div className="flex items-baseline justify-between mb-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Where the value comes from</p>
                  <p className="text-xs text-gray-400 tabular-nums">{fmtNum(r.recoveredHours)} hrs/yr recovered</p>
                </div>
                <div className="space-y-5">
                  {breakdown.map((b) => (
                    <div key={b.label}>
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-sm text-gray-700">{b.label}</span>
                        <span className="text-sm font-medium text-gray-900 tabular-nums">{fmtUsd(b.val)}</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r ${b.tone} transition-[width] duration-500 ease-out`} style={{ width: `${Math.max(2, (b.val / maxBreak) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Five-year outlook */}
              <div className="rounded-2xl bg-white border border-gray-200 p-7 md:p-8">
                <div className="flex items-baseline justify-between mb-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Five-year outlook</p>
                  <p className="text-sm text-gray-900 tabular-nums">Net <span className="font-medium">{fmtK(tFive)}</span></p>
                </div>
                <div className="flex items-end justify-between gap-2 md:gap-3 h-40">
                  {r.cumulative.map((c, i) => {
                    const h = Math.max(4, (c / maxCum) * 100);
                    const last = i === 4;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                        <span className="text-[10px] md:text-xs text-gray-600 tabular-nums mb-1.5">{fmtK(c)}</span>
                        <div className={`w-full rounded-t-md transition-all duration-700 ease-apple ${last ? 'bg-gradient-to-t from-brand-600 to-brand-400' : 'bg-gradient-to-t from-gray-300 to-gray-200'}`} style={{ height: `${h}%` }} />
                        <span className="text-[10px] text-gray-400 mt-2">Yr {i + 1}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-5 text-xs text-gray-500 leading-relaxed">
                  Cumulative value after a one-time build of <span className="text-gray-700 tabular-nums">{fmtK(r.buildCost)}</span> and
                  ongoing optimization. Break-even lands around <span className="text-gray-700">month {Math.max(1, Math.round(r.paybackMonths))}</span>.
                </p>
              </div>

              {/* How the math works */}
              <div>
                <button onClick={() => setShowMath((v) => !v)} className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1.5" aria-expanded={showMath}>
                  <ChevronDown className={['w-4 h-4 transition-transform duration-200', showMath ? 'rotate-180' : ''].join(' ')} strokeWidth={1.5} />
                  {showMath ? 'Hide the assumptions' : 'How the math works'}
                </button>
                <div className={['grid transition-all duration-300 ease-out', showMath ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'].join(' ')}>
                  <div className="overflow-hidden">
                    <ul className="bg-white border border-gray-200 rounded-xl p-6 mt-3 space-y-2.5 text-sm text-gray-700">
                      <li><span className="text-gray-500 text-xs uppercase tracking-[0.14em] mr-2">Software</span><span className="tabular-nums">monthly spend × 12 × 50%</span></li>
                      <li><span className="text-gray-500 text-xs uppercase tracking-[0.14em] mr-2">Hours back</span><span className="tabular-nums">hrs/wk × team × 48 × ${LABOR} × 50%</span></li>
                      <li><span className="text-gray-500 text-xs uppercase tracking-[0.14em] mr-2">Revenue</span><span className="tabular-nums">deal × team × 6% × (hrs / 20)</span></li>
                      <li><span className="text-gray-500 text-xs uppercase tracking-[0.14em] mr-2">Build</span><span className="tabular-nums">~$4.5k / person (one-time, capped)</span></li>
                      <li className="pt-2 mt-1 border-t border-gray-200 text-xs text-gray-500 leading-relaxed">
                        Conservative defaults from our average builds. We discount recovered time by half and use a $45/hr loaded rate.
                        Your real numbers depend on your workflow &mdash; we model them with you on the call.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .roi-range { -webkit-appearance: none; appearance: none; height: 6px; border-radius: 9999px; outline: none; }
        .roi-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 9999px; background: #ffffff; cursor: pointer; border: 1px solid #e5e7eb; box-shadow: 0 1px 4px rgba(0,0,0,0.18), 0 0 0 4px rgba(217,119,6,0.10); transition: transform .15s, box-shadow .15s; }
        .roi-range::-webkit-slider-thumb:hover { transform: scale(1.08); box-shadow: 0 2px 8px rgba(0,0,0,0.22), 0 0 0 6px rgba(217,119,6,0.14); }
        .roi-range::-moz-range-thumb { width: 22px; height: 22px; border-radius: 9999px; background: #ffffff; cursor: pointer; border: 1px solid #e5e7eb; box-shadow: 0 1px 4px rgba(0,0,0,0.18); }
      `}</style>
    </section>
  );
}
