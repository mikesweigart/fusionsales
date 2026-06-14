import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Play, Check, Users, Mail, MessageSquare, Sparkles, Gift } from 'lucide-react';
import ToolLayout from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';
import { Sandbox, Panel, Toasts, useReduced, nextToastId } from './sandbox';

const num = (n) => Math.round(n).toLocaleString('en-US');
const SEGMENTS_SEED = [
  { id: 'lapsed', label: 'Lapsed customers', size: 2100, on: true, offer: '15% off your usual', open: 0.42, click: 0.34, redeem: 0.18, name: 'Sarah', item: 'oat-milk latte' },
  { id: 'vip', label: 'VIPs', size: 320, on: true, offer: 'Early access + a small gift', open: 0.71, click: 0.52, redeem: 0.4, name: 'Marcus', item: 'usual Friday order' },
  { id: 'first', label: 'First-timers', size: 880, on: true, offer: 'A free add-on next visit', open: 0.55, click: 0.4, redeem: 0.24, name: 'Priya', item: 'first order' },
  { id: 'high', label: 'High-spend', size: 540, on: false, offer: 'Double points this week', open: 0.64, click: 0.46, redeem: 0.33, name: 'Dani', item: 'go-to bundle' },
];
const AOV = 38;

export default function LoyaltyEngine() {
  const [segs, setSegs] = useState(SEGMENTS_SEED);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [counts, setCounts] = useState({}); // id -> {reached, opened, clicked, redeemed}
  const [toasts, setToasts] = useState([]);
  const tref = useRef([]);
  const reduced = useReduced();
  useEffect(() => () => tref.current.forEach(clearTimeout), []);

  const pushToast = useCallback((t) => {
    const id = nextToastId();
    setToasts((p) => [...p.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 3500);
  }, []);

  const active = segs.filter((s) => s.on);
  const targets = useMemo(() => Object.fromEntries(active.map((s) => {
    const opened = s.size * s.open, clicked = opened * s.click, redeemed = clicked * s.redeem;
    return [s.id, { reached: s.size, opened, clicked, redeemed }];
  })), [segs]); // eslint-disable-line

  const setOffer = (id, v) => { setSegs((s) => s.map((x) => (x.id === id ? { ...x, offer: v } : x))); setDone(false); };
  const toggle = (id) => { setSegs((s) => s.map((x) => (x.id === id ? { ...x, on: !x.on } : x))); setDone(false); setCounts({}); };

  const totalRedeemed = active.reduce((a, s) => a + (counts[s.id]?.redeemed || 0), 0);
  const totalAudience = active.reduce((a, s) => a + s.size, 0);

  const run = () => {
    if (running || active.length === 0) return;
    tref.current.forEach(clearTimeout); tref.current = [];
    setRunning(true); setDone(false);
    if (reduced) { setCounts(targets); setRunning(false); setDone(true); fin(); return; }
    setCounts(Object.fromEntries(active.map((s) => [s.id, { reached: 0, opened: 0, clicked: 0, redeemed: 0 }])));
    const steps = 16, per = 90;
    for (let k = 1; k <= steps; k++) {
      tref.current.push(setTimeout(() => {
        setCounts(Object.fromEntries(active.map((s) => {
          const t = targets[s.id]; const f = k / steps;
          return [s.id, { reached: t.reached * f, opened: t.opened * f, clicked: t.clicked * f, redeemed: t.redeemed * f }];
        })));
      }, per * k));
    }
    tref.current.push(setTimeout(() => { setCounts(targets); setRunning(false); setDone(true); fin(); }, per * steps + 200));
    pushToast({ icon: Mail, text: `Sending ${num(totalAudience)} personalized messages…`, sub: 'each one tailored', accent: true });
  };
  const fin = () => {
    const r = active.reduce((a, s) => a + targets[s.id].redeemed, 0);
    pushToast({ icon: Gift, text: `${num(r)} redemptions · ~$${num(r * AOV)} revenue`, sub: 'hands-off' });
  };

  const STAGES = [['reached', 'Sent'], ['opened', 'Opened'], ['clicked', 'Clicked'], ['redeemed', 'Redeemed']];

  return (
    <ToolLayout
      eyebrow="Marketing & Loyalty Engine"
      title="Build a campaign that talks to each customer differently."
      subtitle="Turn segments on or off, set the offer for each, and run it. Watch personalized messages go out and the funnel fill — no generic blasts. This is the loyalty engine we build."
      seoTitle="Marketing & Loyalty Engine — interactive demo — FusionSales.ai"
      seoDescription="Try a behavior-based marketing engine: pick customer segments, set a tailored offer for each, run the campaign and watch the funnel fill with personalized sends. A demo of the loyalty software FusionSales builds."
      canonicalPath="/tools/loyalty-engine"
    >
      <Sandbox domain="loyalty.yourbusiness.com" kicker="Try it — build the campaign">
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Segment builder */}
          <div className="space-y-2.5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 px-0.5">Pick segments &amp; set each offer</p>
            {segs.map((s) => (
              <Panel key={s.id} className={`p-3.5 transition ${s.on ? '' : 'opacity-55'}`}>
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <button onClick={() => toggle(s.id)} className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-4 h-4 rounded border flex items-center justify-center transition shrink-0 ${s.on ? 'bg-brand-500 border-brand-500' : 'border-gray-500'}`}>{s.on && <Check className="w-3 h-3 text-white" strokeWidth={3} />}</span>
                    <span className="text-sm text-gray-100 truncate">{s.label}</span>
                  </button>
                  <span className="text-[11px] text-gray-500 inline-flex items-center gap-1 shrink-0"><Users className="w-3 h-3" />{num(s.size)}</span>
                </div>
                <input value={s.offer} onChange={(e) => setOffer(s.id, e.target.value)} disabled={!s.on} className="w-full rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[12px] text-gray-200 focus:outline-none focus:border-brand-400/60 transition disabled:opacity-50" />
              </Panel>
            ))}
            <button onClick={run} disabled={running || active.length === 0} className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition ${running ? 'bg-white/10 text-gray-400 cursor-wait' : done ? 'bg-white/10 text-gray-200 hover:bg-white/15' : 'bg-brand-500 text-white hover:bg-brand-400'}`}>
              {running ? 'Running…' : done ? 'Run again' : <><Play className="w-4 h-4" fill="currentColor" strokeWidth={0} /> Run campaign</>}
            </button>
          </div>

          {/* Results */}
          <div className="space-y-3 relative">
            <Panel className="p-4">
              <div className="flex items-center justify-between mb-4"><p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">Funnel · live</p>{done && <span className="text-[11px] text-emerald-400">{num(totalRedeemed)} redeemed · ~${num(totalRedeemed * AOV)}</span>}</div>
              <div className="space-y-2.5">
                {STAGES.map(([key, label], i) => {
                  const total = active.reduce((a, s) => a + (counts[s.id]?.[key] || 0), 0);
                  const max = active.reduce((a, s) => a + (targets[s.id]?.reached || 0), 0) || 1;
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span className="w-16 shrink-0 text-[11px] text-gray-400">{label}</span>
                      <div className="flex-1 h-6 rounded-md bg-white/[0.05] overflow-hidden relative">
                        <div className={`h-full rounded-md transition-all duration-200 ${i === 3 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-brand-500/80 to-brand-400/80'}`} style={{ width: `${(total / max) * 100}%` }} />
                        <span className="absolute inset-y-0 left-2.5 flex items-center text-[11px] text-white/90 tabular-nums font-medium">{num(total)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            <Panel className="p-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-3 flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-brand-400" /> Personalized — not a blast</p>
              <div className="space-y-2.5">
                {active.slice(0, 2).map((s) => (
                  <div key={s.id} className="flex justify-start"><div className="max-w-[90%] rounded-xl px-3 py-2 text-[12px] leading-snug bg-white/[0.06] text-gray-200 border border-white/10"><span className="text-gray-400">To {s.name}:</span> &ldquo;{s.name}, {s.id === 'lapsed' ? 'we miss you' : s.id === 'vip' ? 'a little thank-you' : s.id === 'first' ? 'welcome' : 'just for you'} — {s.offer.toLowerCase()} on your {s.item}.&rdquo;</div></div>
                ))}
              </div>
            </Panel>
            <Toasts toasts={toasts} />
          </div>
        </div>
      </Sandbox>

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-14">
          <LeadCapture
            toolName="Marketing & Loyalty Engine"
            resultSummary={`Built a ${active.length}-segment campaign to ${num(totalAudience)} customers`}
            ctaHeadline="Want this running on your customer data?"
            ctaSub="We build the engine around your real segments, offers, and channels — so every message lands personal."
          />
        </div>
      </section>
    </ToolLayout>
  );
}
