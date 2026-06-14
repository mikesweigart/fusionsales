import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Plus, Sparkles, ArrowRight, Check, Send, RefreshCw, Zap, TrendingUp, Mail } from 'lucide-react';
import ToolLayout from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';
import { Sandbox, Panel, Toasts, nextToastId } from './sandbox';

const COLS = [
  { id: 'new', label: 'New' }, { id: 'working', label: 'Working' },
  { id: 'proposal', label: 'Proposal' }, { id: 'won', label: 'Won' },
];
const NEXT = { new: 'working', working: 'proposal', proposal: 'won', won: 'won' };

const ACTION = {
  new: 'Respond now — speed-to-lead wins. Send the intro and one qualifying question.',
  working: 'They’re engaged. Send the tailored proposal with two clear options.',
  proposal: 'Proposal’s been out a few days. Send a gentle nudge with a deadline.',
  won: 'Won — kick off onboarding and ask for a referral while they’re happy.',
};
const draftFor = (col, first) => {
  const t = {
    new: `Hi ${first}, thanks for reaching out. Quick question so I can tailor this: what timeline are you working toward? I can get options to you today.`,
    working: `Hi ${first}, here’s the proposal we discussed — tailored to your workflow, with two options. Want to walk through them Thursday?`,
    proposal: `Hi ${first}, circling back on the proposal from Monday. Happy to adjust scope — should we aim to get this moving before month-end?`,
    won: `Welcome aboard, ${first}! Your kickoff is set and here’s what happens next. (If you know anyone who’d benefit, we’d love an intro.)`,
  };
  return t[col];
};
const ALT = {
  new: (f) => `${f}, appreciate you getting in touch — what’s the one outcome that would make this a clear win for you?`,
  working: (f) => `${f}, quick recap of what we covered, plus pricing. I think option B fits best — open to a 15-min call?`,
  proposal: (f) => `${f}, no pressure at all — just flagging the proposal’s still open. Anything you’d want changed before you decide?`,
  won: (f) => `So glad to have you, ${f}. I’ll handle the heavy lifting from here — first check-in is on the calendar.`,
};

let _did = 0;
const did = () => ++_did;
const score = (name) => 60 + ((name.replace(/\s/g, '').length * 7) % 36);
const first = (name) => name.split(/[\s.]/)[0];

const SEED = [
  { id: did(), name: 'Riverside Logistics', sub: 'Warehouse software · inbound', col: 'working', value: 42000, touches: 5 },
  { id: did(), name: 'Summit Retail Group', sub: '6-store rollout', col: 'proposal', value: 88000, touches: 9 },
  { id: did(), name: 'Harbor Freight Co.', sub: 'Referral', col: 'new', value: 19500, touches: 1 },
  { id: did(), name: 'Delta Foods', sub: 'Cold-chain ops', col: 'working', value: 56000, touches: 6 },
  { id: did(), name: 'Cobb Industrial', sub: 'Plant reconfigure', col: 'won', value: 31000, touches: 11 },
].map((d) => ({ ...d, score: score(d.name) }));

export default function SalesCopilot() {
  const [deals, setDeals] = useState(SEED);
  const [sel, setSel] = useState(SEED[0].id);
  const [variant, setVariant] = useState(0);
  const [newName, setNewName] = useState('');
  const [toasts, setToasts] = useState([]);
  const tref = useRef([]);
  useEffect(() => () => tref.current.forEach(clearTimeout), []);

  const pushToast = useCallback((t) => {
    const id = nextToastId();
    setToasts((p) => [...p.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 3500);
  }, []);

  const deal = deals.find((d) => d.id === sel);

  const addLead = (e) => {
    e?.preventDefault();
    const name = newName.trim();
    if (!name) return;
    const d = { id: did(), name, sub: 'Website · just enriched', col: 'new', value: 10000 + ((name.length * 1300) % 60000), touches: 0, score: score(name) };
    setDeals((x) => [d, ...x]);
    setNewName(''); setSel(d.id); setVariant(0);
    pushToast({ icon: Sparkles, text: `${name} enriched and scored ${d.score}`, sub: 'copilot · just now', accent: true });
  };

  const advance = () => {
    if (!deal) return;
    const nc = NEXT[deal.col];
    setDeals((x) => x.map((d) => (d.id === deal.id ? { ...d, col: nc, touches: d.touches + 1 } : d)));
    pushToast({ icon: Send, text: `Follow-up sent to ${first(deal.name)} — moved to ${COLS.find((c) => c.id === nc).label}`, sub: 'logged automatically' });
    setVariant(0);
  };

  return (
    <ToolLayout
      eyebrow="AI Sales Copilot"
      title="Run a pipeline with a copilot that does the typing."
      subtitle="Add a lead and watch it get scored. Click any deal and the copilot tells you the next move and drafts the message — you just hit send. This is the custom CRM we build for sales teams."
      seoTitle="AI Sales Copilot — interactive CRM demo — FusionSales.ai"
      seoDescription="Try an AI sales copilot: add a lead and watch it get enriched and scored, click a deal to get the next-best action and a drafted follow-up, and advance the pipeline. A demo of the custom CRMs FusionSales builds."
      canonicalPath="/tools/sales-copilot"
    >
      <Sandbox domain="crm.yourbusiness.com" kicker="Try it — work the pipeline">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
          {/* Pipeline */}
          <div className="space-y-3">
            <form onSubmit={addLead} className="flex gap-2">
              <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Add a lead — type a company name…" className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-400/60 transition" />
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 text-white px-3.5 py-2.5 text-sm font-medium hover:bg-brand-400 transition shrink-0"><Plus className="w-4 h-4" /> Add</button>
            </form>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {COLS.map((col) => {
                const ds = deals.filter((d) => d.col === col.id);
                return (
                  <div key={col.id}>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-2 px-0.5">{col.label} · {ds.length}</p>
                    <div className="space-y-2">
                      {ds.map((d) => (
                        <button key={d.id} onClick={() => { setSel(d.id); setVariant(0); }} className={`w-full text-left rounded-lg border p-2.5 transition ${sel === d.id ? 'border-brand-400/60 bg-brand-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/25'}`}>
                          <p className="text-[12px] text-gray-100 leading-tight truncate">{d.name}</p>
                          <div className="flex items-center justify-between mt-1.5">
                            <span className="text-[10px] text-gray-500 tabular-nums">${(d.value / 1000).toFixed(0)}k</span>
                            <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400"><TrendingUp className="w-2.5 h-2.5" strokeWidth={2} />{d.score}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Copilot panel */}
          <Panel className="p-4 relative min-h-[20rem]">
            {deal ? (
              <div className="motion-safe:animate-[sbfade_0.3s_ease-out]" key={deal.id + deal.col + variant}>
                <div className="flex items-center gap-2 mb-3"><span className="inline-flex w-6 h-6 items-center justify-center rounded-md bg-brand-500/20 text-brand-400"><Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} /></span><p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">Copilot</p></div>
                <p className="text-sm text-gray-100">{deal.name}</p>
                <p className="text-[11px] text-gray-500 mb-4">{deal.sub} · score {deal.score} · {deal.touches} touches</p>

                <div className="rounded-lg border border-brand-400/30 bg-brand-500/10 p-3 mb-3">
                  <p className="text-[10px] uppercase tracking-wider text-brand-300 mb-1.5 flex items-center gap-1.5"><Zap className="w-3 h-3" strokeWidth={2} /> Next best action</p>
                  <p className="text-[12.5px] text-brand-100 leading-snug">{ACTION[deal.col]}</p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3 mb-4">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5"><Mail className="w-3 h-3" /> Drafted for you</p>
                  <p className="text-[12.5px] text-gray-200 leading-relaxed">{variant === 0 ? draftFor(deal.col, first(deal.name)) : ALT[deal.col](first(deal.name))}</p>
                </div>

                <div className="flex gap-2">
                  <button onClick={advance} disabled={deal.col === 'won'} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 text-white px-3.5 py-2 text-sm font-medium hover:bg-brand-400 transition disabled:opacity-40"><Send className="w-3.5 h-3.5" /> {deal.col === 'won' ? 'Closed' : 'Send & advance'}</button>
                  <button onClick={() => setVariant((v) => (v + 1) % 2)} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-sm text-gray-300 hover:text-white transition"><RefreshCw className="w-3.5 h-3.5" /> Draft another</button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Click a deal to see what the copilot would do.</p>
            )}
            <Toasts toasts={toasts} />
          </Panel>
        </div>
      </Sandbox>

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-14">
          <LeadCapture
            toolName="AI Sales Copilot"
            resultSummary="Tried the AI sales copilot — lead scoring, next-best-action, drafted follow-ups."
            ctaHeadline="Want this trained on your real pipeline?"
            ctaSub="We build the copilot around your stages, your messaging, and the tools you already use."
          />
        </div>
      </section>
    </ToolLayout>
  );
}
