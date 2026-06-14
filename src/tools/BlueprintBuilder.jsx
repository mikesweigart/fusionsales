import React, { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Check, Layers, Calendar, DollarSign, Gauge, RotateCcw } from 'lucide-react';
import ToolLayout, { CALENDLY, Slider } from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';

/* Custom Build Blueprint — pick industry + biggest bottleneck + team size,
   and get a tailored build spec: the system to build, the screens, a 6-week
   plan, an investment range, and projected first-year value. A real artifact. */

const usdK = (n) => (n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${Math.round(n)}`);

const INDUSTRIES = [
  'Moving & logistics', 'Insurance', 'Health plans & networks', 'Construction',
  'Manufacturing', 'Professional services', 'Retail / CPG', 'Other',
];

const BOTTLENECKS = [
  { id: 'quoting', label: 'Quoting is slow or inconsistent', system: 'Custom Quote Generator',
    screens: ['A guided quote builder that applies your real pricing logic', 'One-click branded PDF or email', 'Every quote auto-logged to the customer record', 'A pipeline that advances the moment a quote is sent'],
    dash: ['Quotes sent vs. won', 'Average quote turnaround', 'Win rate by rep'], lever: 1.15 },
  { id: 'leads', label: 'Leads slip; follow-up is inconsistent', system: 'AI Sales Copilot (custom CRM)',
    screens: ['Auto-capture of every email, call, and message', 'Next-best-action prompts for your reps', 'Follow-up sequences that fire on their own', 'A pipeline you can finally trust'],
    dash: ['Pipeline by stage', 'Speed-to-lead', 'Follow-ups sent automatically'], lever: 1.2 },
  { id: 'tools', label: 'Too many disconnected tools / manual handoffs', system: 'Workflow Automation Hub',
    screens: ['One hub that connects the tools you already use', 'Triggers: a signed contract creates the project, invoice, and tasks', 'No more copy-pasting between systems', 'Live status everyone can see'],
    dash: ['Automations run today', 'Handoffs completed', 'Hours saved this week'], lever: 1.1 },
  { id: 'support', label: 'After-hours leads go cold; FAQs eat the team', system: '24/7 AI Support & Voice Agents',
    screens: ['AI agents that answer in your voice, around the clock', 'Lead qualification and appointment booking', 'Clean escalation to a human when it matters', 'Every conversation logged'],
    dash: ['Conversations handled', 'Leads qualified', 'Appointments booked'], lever: 1.12 },
  { id: 'scheduling', label: 'Scheduling chaos and no-shows', system: 'Smart Scheduling',
    screens: ['Predictive staffing for your real busy periods', 'Automated swap requests', 'A reminder ladder that kills no-shows', 'Hands-free onboarding for new hires'],
    dash: ['Schedule fill rate', 'No-show rate', 'Open shifts'], lever: 1.1 },
  { id: 'cash', label: 'Cash-flow surprises', system: 'Cash-Flow Co-Pilot',
    screens: ['Your bank and accounting feeds in one view', 'A rolling 90-day cash forecast', 'Anomaly and late-invoice alerts', 'Automated payment reminders'],
    dash: ['90-day runway', 'Cash in vs. out', 'Flagged anomalies'], lever: 1.05 },
  { id: 'inventory', label: 'Over/understock; cash trapped on shelves', system: 'Predictive Inventory',
    screens: ['Forecasting from your real sales and seasonality', 'Reorder suggestions before you stock out', 'Overstock and stockout alerts', 'Supplier lead-time tracking'],
    dash: ['Forecast accuracy', 'Stock position by SKU', 'Reorder queue'], lever: 1.12 },
  { id: 'crm', label: "A generic CRM that doesn't fit how we work", system: 'Custom CRM',
    screens: ['Your pipeline stages — not a template', 'Your data model and the reports leadership needs', 'Cross-sell and renewal signals surfaced automatically', 'Built on top of the email and calendar you already use'],
    dash: ['Pipeline by stage', 'Renewals at risk', 'Activity by rep'], lever: 1.15 },
  { id: 'knowledge', label: 'Tribal knowledge / slow onboarding', system: 'The Company Brain',
    screens: ['Ingests your SOPs, Slack history, and docs', 'Anyone can ask “how do we…?” in plain English', 'Cited answers drawn from your own sources', 'New hires productive on day one'],
    dash: ['Questions answered', 'Most-asked topics', 'Coverage gaps'], lever: 1.08 },
];

function tier(team) {
  if (team <= 5) return { invest: '$15k–$35k', low: 15000, high: 35000 };
  if (team <= 15) return { invest: '$35k–$75k', low: 35000, high: 75000 };
  if (team <= 40) return { invest: '$75k–$120k', low: 75000, high: 120000 };
  return { invest: '$120k–$150k+', low: 120000, high: 150000 };
}

export default function BlueprintBuilder() {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState(null);
  const [bottleneck, setBottleneck] = useState(null);
  const [team, setTeam] = useState(12);

  const bn = BOTTLENECKS.find((b) => b.id === bottleneck);
  const t = tier(team);
  const value = useMemo(() => {
    if (!bn) return { low: 0, high: 0 };
    return { low: Math.round((team * 7000 * bn.lever) / 1000) * 1000, high: Math.round((team * 16000 * bn.lever) / 1000) * 1000 };
  }, [bn, team]);

  const reset = () => { setStep(1); setIndustry(null); setBottleneck(null); setTeam(12); };

  return (
    <ToolLayout
      eyebrow="Custom Build Blueprint"
      title="Get a real build plan for your business — in 60 seconds."
      subtitle="Tell us your industry and your worst bottleneck. We'll generate the system we'd build, the screens it would include, a six-week plan, and what it would cost — a spec you can actually act on."
      seoTitle="Custom Build Blueprint — FusionSales.ai"
      seoDescription="Generate a tailored custom-software build plan: the system to build, the screens, a six-week timeline, the investment range, and projected first-year value — for your industry and your biggest bottleneck."
      canonicalPath="/tools/blueprint"
    >
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-14 md:py-16">
          {/* progress */}
          <div className="flex items-center gap-2 mb-10">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-brand-500' : 'bg-gray-200'}`} />
            ))}
          </div>

          {step === 1 && (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Step 1 of 3</p>
              <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-8">What kind of business do you run?</h2>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {INDUSTRIES.map((i) => (
                  <button key={i} onClick={() => { setIndustry(i); setStep(2); }}
                    className={`text-left px-5 py-4 border text-sm transition ${industry === i ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}>
                    {i}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6"><ArrowLeft className="w-4 h-4" /> Back</button>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Step 2 of 3</p>
              <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-8">What hurts the most right now?</h2>
              <div className="space-y-2.5">
                {BOTTLENECKS.map((b) => (
                  <button key={b.id} onClick={() => { setBottleneck(b.id); setStep(3); }}
                    className={`w-full text-left px-5 py-4 border text-sm transition flex items-center justify-between gap-3 ${bottleneck === b.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}>
                    <span>{b.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <button onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6"><ArrowLeft className="w-4 h-4" /> Back</button>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Step 3 of 3</p>
              <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-8">How big is the team this would touch?</h2>
              <div className="bg-white border border-gray-200 p-8">
                <Slider label="People who'd use it" value={team} min={1} max={60} step={1} onChange={setTeam} display={`${team} ${team === 1 ? 'person' : 'people'}`} />
              </div>
              <button onClick={() => setStep(4)} className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-gray-900 text-white text-sm hover:bg-gray-800 transition">
                Build my blueprint <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 4 && bn && (
            <div className="animate-[fadeIn_0.4s_ease-out]">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-700">Your blueprint</p>
                <button onClick={reset} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"><RotateCcw className="w-3.5 h-3.5" /> Start over</button>
              </div>

              <div className="bg-white border border-gray-200 p-8 md:p-10">
                <p className="text-sm text-gray-500 mb-1">{industry}</p>
                <h3 className="font-display text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2">{bn.system}</h3>
                <p className="text-gray-700 leading-relaxed mb-8">Built to fix: <span className="text-gray-900">{bn.label.toLowerCase()}</span>.</p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2"><Layers className="w-3.5 h-3.5 text-brand-600" /> What it would include</p>
                    <ul className="space-y-3">
                      {bn.screens.map((s) => (
                        <li key={s} className="flex items-start gap-2.5 text-sm text-gray-800 leading-relaxed"><Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" strokeWidth={1.75} />{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2"><Gauge className="w-3.5 h-3.5 text-brand-600" /> Your dashboard would show</p>
                    <ul className="space-y-3">
                      {bn.dash.map((s) => (
                        <li key={s} className="flex items-start gap-2.5 text-sm text-gray-800 leading-relaxed"><span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-100">
                  <div><p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 mb-1.5 flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Timeline</p><p className="font-display text-xl font-light text-gray-900">~6 weeks</p><p className="text-xs text-gray-500 mt-0.5">working demo by week 3</p></div>
                  <div><p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 mb-1.5 flex items-center gap-1.5"><DollarSign className="w-3 h-3" /> Investment</p><p className="font-display text-xl font-light text-gray-900 tabular-nums">{t.invest}</p><p className="text-xs text-gray-500 mt-0.5">one-time, you own it</p></div>
                  <div><p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 mb-1.5 flex items-center gap-1.5"><Gauge className="w-3 h-3" /> First-year value</p><p className="font-display text-xl font-light text-gray-900 tabular-nums">{usdK(value.low)}–{usdK(value.high)}</p><p className="text-xs text-gray-500 mt-0.5">typical, for {team} people</p></div>
                </div>
              </div>

              <div className="mt-6">
                <LeadCapture
                  toolName="Custom Build Blueprint"
                  resultSummary={`${industry} · ${bn.system} · ${t.invest} · ~6 weeks · team of ${team}`}
                  ctaHeadline="Want this blueprint pressure-tested for real?"
                  ctaSub="We'll model it against your actual workflow on a 30-minute call — no slides, no pressure."
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </ToolLayout>
  );
}
