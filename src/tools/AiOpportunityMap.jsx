import React, { useState, useMemo } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import ToolLayout, { Slider } from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';

/* AI Opportunity Map — rate the repetitive work in each function, get a ranked
   "automate this first" roadmap with the dollar value and the build for each. */

const usdK = (n) => (n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${Math.round(n)}`);
const RATE = 45; // loaded $/hr
const WEEKS = 48;

const FUNCTIONS = [
  { id: 'sales', label: 'Sales & follow-up', def: 8, factor: 0.6, build: 'AI Sales Copilot', note: 'Auto-capture + next-best-action so reps sell, not type.' },
  { id: 'ops', label: 'Operations & handoffs', def: 10, factor: 0.65, build: 'Workflow Automation Hub', note: 'One signed contract → project, invoice, tasks — automatically.' },
  { id: 'support', label: 'Customer support', def: 7, factor: 0.55, build: '24/7 AI Support Agents', note: 'AI answers, qualifies, and books around the clock.' },
  { id: 'finance', label: 'Finance & billing', def: 5, factor: 0.5, build: 'Cash-Flow Co-Pilot', note: '90-day forecast, anomaly flags, auto reminders.' },
  { id: 'marketing', label: 'Marketing & outreach', def: 5, factor: 0.55, build: 'Marketing & Loyalty Engine', note: 'Right message to the right customer, automatically.' },
  { id: 'scheduling', label: 'Scheduling & HR', def: 6, factor: 0.6, build: 'Smart Scheduling', note: 'Predictive staffing, auto swaps, no-show reminders.' },
];

export default function AiOpportunityMap() {
  const [hours, setHours] = useState(() => Object.fromEntries(FUNCTIONS.map((f) => [f.id, f.def])));
  const set = (id, v) => setHours((h) => ({ ...h, [id]: v }));

  const ranked = useMemo(() => {
    const scored = FUNCTIONS.map((f) => {
      const annual = (hours[f.id] || 0) * WEEKS * RATE;
      return { ...f, value: Math.round(annual * f.factor) };
    }).sort((a, b) => b.value - a.value);
    const total = scored.reduce((a, x) => a + x.value, 0);
    return { scored, total, max: Math.max(...scored.map((s) => s.value), 1) };
  }, [hours]);

  const top = ranked.scored[0];

  return (
    <ToolLayout
      eyebrow="AI Opportunity Map"
      title="Where would AI actually pay off in your business?"
      subtitle="Rate how much repetitive work each part of your team loses to manual tasks. We'll rank where custom AI would recover the most — in real dollars — and the build that does it."
      seoTitle="AI Opportunity Map — where AI pays off — FusionSales.ai"
      seoDescription="A function-by-function map of where custom AI automation would recover the most value in your business, ranked in dollars, with the specific build for each opportunity."
      canonicalPath="/tools/ai-opportunity-map"
    >
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-16 grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Inputs */}
          <div className="bg-white border border-gray-200 p-6 md:p-8 space-y-7">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Hours per week lost to repetitive work</p>
            {FUNCTIONS.map((f) => (
              <Slider key={f.id} label={f.label} value={hours[f.id]} min={0} max={30} step={1} onChange={(v) => set(f.id, v)} display={`${hours[f.id]} hrs`} />
            ))}
            <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">Valued at a conservative $45/hr loaded labor cost, 48 working weeks.</p>
          </div>

          {/* Results */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="bg-gray-900 text-white p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400 mb-2">Total annual opportunity</p>
              <p className="font-display text-5xl font-light tabular-nums text-brand-400">{usdK(ranked.total)}</p>
              <p className="text-sm text-gray-300 mt-3">recoverable across your team — most of it from <span className="text-white">{top.label.toLowerCase()}</span> first.</p>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-6">Ranked — automate this first</p>
              <div className="space-y-5">
                {ranked.scored.map((f, i) => (
                  <div key={f.id}>
                    <div className="flex items-baseline justify-between mb-1.5 gap-3">
                      <span className="text-sm text-gray-900 flex items-center gap-2 min-w-0">
                        <span className="text-xs text-gray-400 tabular-nums w-4 shrink-0">{i + 1}</span>
                        <span className="truncate">{f.label}</span>
                      </span>
                      <span className="text-sm font-medium text-gray-900 tabular-nums shrink-0">{usdK(f.value)}/yr</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden ml-6">
                      <div className={`h-full rounded-full transition-all duration-500 ${i === 0 ? 'bg-gradient-to-r from-brand-600 to-brand-400' : 'bg-gray-300'}`} style={{ width: `${Math.max(3, (f.value / ranked.max) * 100)}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 ml-6 flex items-start gap-1.5"><Zap className="w-3 h-3 text-brand-500 shrink-0 mt-0.5" strokeWidth={2} /><span><span className="text-gray-700">{f.build}</span> — {f.note}</span></p>
                  </div>
                ))}
              </div>
            </div>

            <LeadCapture
              toolName="AI Opportunity Map"
              resultSummary={`Total opportunity ${usdK(ranked.total)}/yr · top: ${top.label} (${usdK(top.value)}) → ${top.build}`}
              ctaHeadline="Turn the top one into a build"
              ctaSub={`We'd start with ${top.build} — let's scope it for your business on a 30-minute call.`}
            />
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
