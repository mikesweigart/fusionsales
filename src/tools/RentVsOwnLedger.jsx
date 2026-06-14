import React, { useState, useMemo } from 'react';
import { Plus, X, TrendingUp } from 'lucide-react';
import ToolLayout, { Slider } from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';

/* The Rent-vs-Own Ledger — enter your real SaaS stack, see the 5-year total
   cost of renting (with seat growth + price hikes) vs. owning a custom build,
   with the break-even year. CFO-grade. */

const usd = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const usdK = (n) => (Math.abs(n) >= 1000 ? `$${(n / 1000).toFixed(Math.abs(n) >= 10000 ? 0 : 1).replace(/\.0$/, '')}k` : `$${Math.round(n)}`);
let _id = 0;
const nid = () => ++_id;

const STARTER = [
  { id: nid(), name: 'CRM (Salesforce / HubSpot)', cost: 120, seats: 10 },
  { id: nid(), name: 'Project / ops tool', cost: 25, seats: 12 },
  { id: nid(), name: 'Accounting / billing', cost: 70, seats: 3 },
  { id: nid(), name: 'Support / help desk', cost: 50, seats: 5 },
];

export default function RentVsOwnLedger() {
  const [rows, setRows] = useState(STARTER);
  const [growth, setGrowth] = useState(10); // % seat growth / yr
  const [hike, setHike] = useState(8); // % price increase / yr
  const [headcount, setHeadcount] = useState(20);

  const update = (id, key, val) => setRows((r) => r.map((x) => (x.id === id ? { ...x, [key]: val } : x)));
  const remove = (id) => setRows((r) => r.filter((x) => x.id !== id));
  const add = () => setRows((r) => [...r, { id: nid(), name: 'New tool', cost: 50, seats: 5 }]);

  const m = useMemo(() => {
    const annualNow = rows.reduce((a, r) => a + (Number(r.cost) || 0) * (Number(r.seats) || 0) * 12, 0);
    const rate = growth / 100 + hike / 100;
    const rentYear = (y) => annualNow * Math.pow(1 + rate, y - 1);
    const rentCum = [1, 2, 3, 4, 5].map((y) => [1, 2, 3, 4, 5].slice(0, y).reduce((a, yy) => a + rentYear(yy), 0));
    const fiveYearRent = rentCum[4];
    // own: one-time build (scaled to the stack being replaced + headcount) + ~10%/yr to run
    const buildCost = Math.min(150000, Math.max(25000, Math.round((30000 + rows.length * 9000 + headcount * 1200) / 1000) * 1000));
    const run = Math.round(buildCost * 0.1);
    const ownCum = [1, 2, 3, 4, 5].map((y) => buildCost + run * y);
    const fiveYearOwn = ownCum[4];
    let breakeven = null;
    for (let y = 1; y <= 5; y++) if (rentCum[y - 1] >= ownCum[y - 1]) { breakeven = y; break; }
    const perEmp = headcount > 0 ? annualNow / headcount : 0;
    return { annualNow, rentCum, fiveYearRent, buildCost, ownCum, fiveYearOwn, breakeven, perEmp, savings: fiveYearRent - fiveYearOwn };
  }, [rows, growth, hike, headcount]);

  const maxBar = Math.max(m.fiveYearRent, m.fiveYearOwn, 1);

  return (
    <ToolLayout
      eyebrow="The Rent-vs-Own Ledger"
      title="What you'll really spend on software over five years."
      subtitle="Enter the tools you rent today. We'll project the true 5-year cost — with realistic seat growth and price hikes — against a one-time build you own, and show you the break-even year."
      seoTitle="Rent-vs-Own Software Ledger (5-Year TCO) — FusionSales.ai"
      seoDescription="Enter your SaaS subscriptions and see the true 5-year total cost of renting software vs. owning a custom build, with the break-even year and cumulative savings."
      canonicalPath="/tools/rent-vs-own"
    >
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-16 grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Inputs */}
          <div className="bg-white border border-gray-200 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-5">Your rented stack</p>
            <div className="space-y-2.5">
              <div className="hidden sm:grid grid-cols-[1fr_5rem_4rem_1.5rem] gap-2 text-[10px] uppercase tracking-wider text-gray-400 px-1">
                <span>Tool</span><span className="text-right">$/seat/mo</span><span className="text-right">Seats</span><span />
              </div>
              {rows.map((r) => (
                <div key={r.id} className="grid grid-cols-[1fr_5rem_4rem_1.5rem] gap-2 items-center">
                  <input value={r.name} onChange={(e) => update(r.id, 'name', e.target.value)} className="border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition min-w-0" />
                  <input type="number" min="0" value={r.cost} onChange={(e) => update(r.id, 'cost', Number(e.target.value))} className="border border-gray-200 px-2 py-2 text-sm text-gray-900 text-right focus:outline-none focus:border-gray-900 transition tabular-nums" />
                  <input type="number" min="0" value={r.seats} onChange={(e) => update(r.id, 'seats', Number(e.target.value))} className="border border-gray-200 px-2 py-2 text-sm text-gray-900 text-right focus:outline-none focus:border-gray-900 transition tabular-nums" />
                  <button onClick={() => remove(r.id)} className="text-gray-300 hover:text-rose-500 transition" aria-label="Remove"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <button onClick={add} className="mt-3 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition"><Plus className="w-4 h-4" /> Add a tool</button>

            <div className="mt-8 pt-6 border-t border-gray-100 space-y-6">
              <Slider label="Seat growth / year" value={growth} min={0} max={40} step={1} onChange={setGrowth} display={`${growth}%`} hint="More people = more seats = more rent" />
              <Slider label="SaaS price increase / year" value={hike} min={0} max={20} step={1} onChange={setHike} display={`${hike}%`} hint="Vendors raise prices; 8% is conservative" />
              <Slider label="Total headcount" value={headcount} min={1} max={200} step={1} onChange={setHeadcount} display={`${headcount}`} />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 p-6"><p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">SaaS spend, this year</p><p className="font-display text-3xl font-light text-gray-900 tabular-nums">{usd(m.annualNow)}</p></div>
              <div className="bg-white border border-gray-200 p-6"><p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">Per employee / mo</p><p className="font-display text-3xl font-light text-gray-900 tabular-nums">{usd(m.perEmp / 12)}</p></div>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-6">5-year cumulative cost</p>
              <div className="flex items-end justify-between gap-3 h-44">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      <div className="w-1/2 rounded-t bg-gradient-to-t from-gray-400 to-gray-300 transition-all duration-500" style={{ height: `${(m.rentCum[i] / maxBar) * 100}%` }} title={`Rent: ${usd(m.rentCum[i])}`} />
                      <div className="w-1/2 rounded-t bg-gradient-to-t from-brand-600 to-brand-400 transition-all duration-500" style={{ height: `${(m.ownCum[i] / maxBar) * 100}%` }} title={`Own: ${usd(m.ownCum[i])}`} />
                    </div>
                    <span className="text-[10px] text-gray-400">Yr {i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-5 mt-4 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-gray-300" /> Keep renting</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand-500" /> Build &amp; own</span>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-6 md:p-8">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div><p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-1.5">5-yr renting</p><p className="text-2xl font-light tabular-nums">{usdK(m.fiveYearRent)}</p></div>
                <div><p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-1.5">5-yr owning</p><p className="text-2xl font-light tabular-nums">{usdK(m.fiveYearOwn)}</p></div>
              </div>
              <div className="rounded-lg bg-brand-500/15 border border-brand-400/30 p-4">
                <p className="text-sm text-brand-200 flex items-center gap-2"><TrendingUp className="w-4 h-4 shrink-0" strokeWidth={2} />
                  {m.savings > 0
                    ? <>Owning saves <span className="font-medium text-white tabular-nums">{usdK(m.savings)}</span> over five years{m.breakeven ? <> — and pays for itself in <span className="font-medium text-white">year {m.breakeven}</span>.</> : '.'}</>
                    : <>At this scale, renting is still cheaper over five years. Custom pays off as you grow.</>}
                </p>
              </div>
              <p className="text-[11px] text-gray-500 mt-3">Build estimate: {usd(m.buildCost)} one-time + ~10%/yr to run. Conservative — we'll model your exact stack on a call.</p>
            </div>

            <LeadCapture
              toolName="Rent-vs-Own Ledger"
              resultSummary={`SaaS now ${usd(m.annualNow)}/yr · 5-yr rent ${usdK(m.fiveYearRent)} vs own ${usdK(m.fiveYearOwn)} · breakeven yr ${m.breakeven || '—'}`}
              ctaHeadline="Want this run against your real stack?"
              ctaSub="Send us your tools and we'll build the exact model — and tell you honestly if owning makes sense yet."
            />
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
