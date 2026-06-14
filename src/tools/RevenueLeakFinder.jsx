import React, { useState, useMemo } from 'react';
import { Droplet, Wrench } from 'lucide-react';
import ToolLayout, { Slider, Segmented } from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';

/* Revenue Leak Finder — quantify the money slipping through the sales process:
   slow lead response, inconsistent follow-up, slow quotes, no-shows. Ranked,
   in real dollars, each with the build that plugs it. */

const usd = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const usdK = (n) => (n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${Math.round(n)}`);

const SPEED = { '5min': 0.02, hour: 0.07, sameday: 0.18, nextday: 0.32 };

export default function RevenueLeakFinder() {
  const [leads, setLeads] = useState(120);
  const [deal, setDeal] = useState(8000);
  const [close, setClose] = useState(25);
  const [response, setResponse] = useState('sameday');
  const [followup, setFollowup] = useState(60);
  const [quoteDays, setQuoteDays] = useState(3);
  const [noShow, setNoShow] = useState(15);

  const m = useMemo(() => {
    const annualLeads = leads * 12;
    const closeR = close / 100;
    const baseRevenue = annualLeads * closeR * deal;
    const speed = baseRevenue * (SPEED[response] || 0.18);
    const follow = baseRevenue * (1 - followup / 100) * 0.25;
    const quote = baseRevenue * Math.min(0.3, quoteDays / 14);
    const ns = baseRevenue * (noShow / 100) * 0.5;
    const leaks = [
      { id: 'speed', label: 'Slow lead response', value: Math.round(speed), build: 'AI Sales Copilot', fix: 'Auto-route and respond in seconds, not hours.' },
      { id: 'follow', label: 'Inconsistent follow-up', value: Math.round(follow), build: 'AI Sales Copilot', fix: 'Sequences that touch every lead automatically.' },
      { id: 'quote', label: 'Slow quote turnaround', value: Math.round(quote), build: 'Custom Quote Generator', fix: 'Branded quotes out the door in 90 seconds.' },
      { id: 'noshow', label: 'No-shows', value: Math.round(ns), build: 'Smart Scheduling', fix: 'A reminder ladder + easy reschedule that kills no-shows.' },
    ].sort((a, b) => b.value - a.value);
    const total = leaks.reduce((a, x) => a + x.value, 0);
    return { leaks, total, max: Math.max(...leaks.map((l) => l.value), 1), baseRevenue };
  }, [leads, deal, close, response, followup, quoteDays, noShow]);

  const top = m.leaks[0];

  return (
    <ToolLayout
      eyebrow="Revenue Leak Finder"
      title="How much revenue is leaking through your sales process?"
      subtitle="Slow responses, missed follow-ups, slow quotes, no-shows — each one quietly costs you deals. Put your numbers in and see the annual dollar value of every leak, ranked, with the fix."
      seoTitle="Revenue Leak Finder — FusionSales.ai"
      seoDescription="Quantify the revenue your business loses to slow lead response, inconsistent follow-up, slow quotes, and no-shows — ranked in dollars, each with the custom-software fix."
      canonicalPath="/tools/revenue-leak"
    >
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-16 grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Inputs */}
          <div className="bg-white border border-gray-200 p-6 md:p-8 space-y-7">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Your sales numbers</p>
            <Slider label="New leads / month" value={leads} min={10} max={1000} step={10} onChange={setLeads} display={`${leads}`} />
            <Slider label="Average deal size" value={deal} min={500} max={200000} step={500} onChange={setDeal} display={usdK(deal)} />
            <Slider label="Current close rate" value={close} min={1} max={60} step={1} onChange={setClose} display={`${close}%`} />
            <div>
              <span className="text-sm text-gray-700 mb-2.5 block">How fast do you respond to a new lead?</span>
              <Segmented value={response} onChange={setResponse} options={[{ value: '5min', label: 'Within 5 min' }, { value: 'hour', label: 'Within an hour' }, { value: 'sameday', label: 'Same day' }, { value: 'nextday', label: 'Next day+' }]} />
            </div>
            <Slider label="Follow-up consistency" value={followup} min={0} max={100} step={5} onChange={setFollowup} display={`${followup}%`} hint="How reliably every lead gets multiple touches" />
            <Slider label="Avg quote turnaround" value={quoteDays} min={0} max={14} step={1} onChange={setQuoteDays} display={`${quoteDays} ${quoteDays === 1 ? 'day' : 'days'}`} />
            <Slider label="No-show rate" value={noShow} min={0} max={50} step={1} onChange={setNoShow} display={`${noShow}%`} />
          </div>

          {/* Results */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="bg-gray-900 text-white p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">Estimated annual revenue leak</p>
              <p className="font-display text-5xl font-light tabular-nums text-brand-400">{usd(m.total)}</p>
              <p className="text-sm text-gray-300 mt-3">Biggest hole: <span className="text-white">{top.label.toLowerCase()}</span>, at {usdK(top.value)}/yr.</p>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-6 flex items-center gap-2"><Droplet className="w-3.5 h-3.5 text-brand-600" /> Where it&rsquo;s leaking</p>
              <div className="space-y-5">
                {m.leaks.map((l, i) => (
                  <div key={l.id}>
                    <div className="flex items-baseline justify-between mb-1.5 gap-3">
                      <span className="text-sm text-gray-900">{l.label}</span>
                      <span className="text-sm font-medium text-gray-900 tabular-nums shrink-0">{usd(l.value)}/yr</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${i === 0 ? 'bg-gradient-to-r from-brand-600 to-brand-400' : 'bg-gray-300'}`} style={{ width: `${Math.max(3, (l.value / m.max) * 100)}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 flex items-start gap-1.5"><Wrench className="w-3 h-3 text-brand-500 shrink-0 mt-0.5" strokeWidth={2} /><span><span className="text-gray-700">{l.build}</span> — {l.fix}</span></p>
                  </div>
                ))}
              </div>
            </div>

            <LeadCapture
              toolName="Revenue Leak Finder"
              resultSummary={`~${usd(m.total)}/yr leaking · biggest: ${top.label} (${usdK(top.value)}) → ${top.build}`}
              ctaHeadline="Plug the biggest leak first"
              ctaSub={`Most of yours is ${top.label.toLowerCase()} — ${top.build} fixes it. Let's scope it on a call.`}
            />
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
