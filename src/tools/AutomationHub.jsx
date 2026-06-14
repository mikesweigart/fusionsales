import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play, Plus, X, Check, ArrowRight, RotateCcw, Zap, Activity,
  FileSignature, UserPlus, DollarSign, Eye, PackageCheck,
  FolderPlus, FileText, ListChecks, Bell, CalendarClock, Mail, Database, Star,
} from 'lucide-react';
import ToolLayout from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';
import { Sandbox, Panel, Toasts, useReduced, nextToastId } from './sandbox';

const TRIGGERS = [
  { id: 'contract', label: 'A contract is signed', icon: FileSignature },
  { id: 'lead', label: 'A new lead arrives', icon: UserPlus },
  { id: 'invoice', label: 'An invoice is paid', icon: DollarSign },
  { id: 'quote', label: 'A quote is viewed twice', icon: Eye },
  { id: 'job', label: 'A job is completed', icon: PackageCheck },
];

const PALETTE = [
  { id: 'project', label: 'Create the project', icon: FolderPlus, run: 'Project created from template' },
  { id: 'invoice', label: 'Generate & send invoice', icon: FileText, run: 'Invoice drafted and emailed' },
  { id: 'tasks', label: 'Assign kickoff tasks', icon: ListChecks, run: 'Tasks assigned to the team' },
  { id: 'notify', label: 'Notify the team', icon: Bell, run: 'Posted to the team channel' },
  { id: 'followup', label: 'Schedule a follow-up', icon: CalendarClock, run: 'Follow-up scheduled' },
  { id: 'welcome', label: 'Send a welcome email', icon: Mail, run: 'Welcome email sent' },
  { id: 'crm', label: 'Update the CRM', icon: Database, run: 'CRM record updated' },
  { id: 'review', label: 'Request a review', icon: Star, run: 'Review request queued' },
];

let _aid = 0;
const aid = () => ++_aid;

export default function AutomationHub() {
  const [trigger, setTrigger] = useState('contract');
  const [actions, setActions] = useState([
    { uid: aid(), id: 'project' }, { uid: aid(), id: 'invoice' }, { uid: aid(), id: 'notify' },
  ]);
  const [runStep, setRunStep] = useState(-1); // -1 idle, n = step running, actions.length = done
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState([]);
  const [toasts, setToasts] = useState([]);
  const timers = useRef([]);
  const reduced = useReduced();
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const pushToast = useCallback((t) => {
    const id = nextToastId();
    setToasts((p) => [...p.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 3500);
  }, []);

  const addAction = (id) => { if (actions.length < 6) setActions((a) => [...a, { uid: aid(), id }]); };
  const removeAction = (uid) => setActions((a) => a.filter((x) => x.uid !== uid));
  const meta = (id) => PALETTE.find((p) => p.id === id);
  const trig = TRIGGERS.find((t) => t.id === trigger);

  const run = () => {
    if (running || actions.length === 0) return;
    timers.current.forEach(clearTimeout); timers.current = [];
    setLog([]); setRunning(true); setRunStep(0);
    const step = reduced ? 0 : 620;
    setLog((l) => [...l, { t: 'Trigger', text: `${trig.label}`, accent: true }]);
    actions.forEach((a, i) => {
      timers.current.push(setTimeout(() => {
        setRunStep(i);
        setLog((l) => [...l, { t: `Step ${i + 1}`, text: meta(a.id).run }]);
        if (i === 1 || i === actions.length - 1) pushToast({ icon: meta(a.id).icon, text: meta(a.id).run, sub: 'automated · just now' });
      }, step * (i + 1)));
    });
    timers.current.push(setTimeout(() => {
      setRunStep(actions.length); setRunning(false);
      setLog((l) => [...l, { t: 'Done', text: `Ran ${actions.length} step${actions.length > 1 ? 's' : ''} — 0 humans involved`, done: true }]);
      pushToast({ icon: Check, text: 'Automation complete', sub: 'hands-off' });
    }, step * (actions.length + 1) + 200));
  };

  const reset = () => { timers.current.forEach(clearTimeout); setRunning(false); setRunStep(-1); setLog([]); };

  return (
    <ToolLayout
      eyebrow="Workflow Automation Hub"
      title="Build an automation. Watch it run itself."
      subtitle="Pick what kicks it off, drop in the steps that should happen, and hit run. This is the hub we build to connect your tools — so the busywork between them just happens."
      seoTitle="Workflow Automation Hub — interactive demo — FusionSales.ai"
      seoDescription="Build a workflow automation in your browser: pick a trigger, add the actions, and watch it run end-to-end. A hands-on demo of the custom automation hubs FusionSales builds."
      canonicalPath="/tools/automation-hub"
    >
      <Sandbox domain="ops.yourbusiness.com" kicker="Try it — build a workflow">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
          {/* Builder */}
          <div className="space-y-4">
            {/* Trigger */}
            <Panel className="p-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-3">When this happens</p>
              <div className="flex flex-wrap gap-2">
                {TRIGGERS.map((t) => {
                  const Icon = t.icon; const on = trigger === t.id;
                  return (
                    <button key={t.id} onClick={() => { setTrigger(t.id); reset(); }} className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] transition ${on ? 'border-brand-400/60 bg-brand-500/15 text-white' : 'border-white/10 bg-white/[0.03] text-gray-400 hover:text-gray-200'}`}>
                      <Icon className={`w-3.5 h-3.5 ${on ? 'text-brand-400' : ''}`} strokeWidth={1.75} />{t.label}
                    </button>
                  );
                })}
              </div>
            </Panel>

            {/* Chain */}
            <Panel className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">Then do this, in order</p>
                <span className="text-[10px] text-gray-500">{actions.length}/6 steps</span>
              </div>
              {actions.length === 0 ? (
                <p className="text-xs text-gray-500 py-4 text-center">Add steps from the palette below.</p>
              ) : (
                <div className="flex flex-wrap items-center gap-y-2">
                  {actions.map((a, i) => {
                    const M = meta(a.id); const Icon = M.icon;
                    const reached = running && runStep > i; const current = running && runStep === i;
                    return (
                      <React.Fragment key={a.uid}>
                        <span className={`group inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] transition-all duration-300 ${reached ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-300' : current ? 'border-brand-400/70 bg-brand-500/15 text-white scale-105' : 'border-white/10 bg-white/[0.04] text-gray-300'}`}>
                          {reached ? <Check className="w-3 h-3" strokeWidth={2.5} /> : <Icon className="w-3 h-3" strokeWidth={1.75} />}
                          {M.label}
                          {!running && <button onClick={() => removeAction(a.uid)} className="ml-0.5 text-gray-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition"><X className="w-3 h-3" /></button>}
                        </span>
                        {i < actions.length - 1 && <ArrowRight className={`w-3.5 h-3.5 mx-1 shrink-0 ${reached ? 'text-emerald-400/60' : 'text-gray-600'}`} />}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </Panel>

            {/* Palette */}
            <Panel className="p-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mb-3">Add a step</p>
              <div className="flex flex-wrap gap-2">
                {PALETTE.map((p) => {
                  const Icon = p.icon; const used = actions.length >= 6;
                  return (
                    <button key={p.id} onClick={() => addAction(p.id)} disabled={used} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-gray-300 hover:border-white/25 hover:text-white transition disabled:opacity-40">
                      <Plus className="w-3 h-3 text-gray-500" /><Icon className="w-3 h-3" strokeWidth={1.75} />{p.label}
                    </button>
                  );
                })}
              </div>
            </Panel>

            <div className="flex gap-3">
              <button onClick={run} disabled={running || actions.length === 0} className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition ${running ? 'bg-white/10 text-gray-400 cursor-wait' : 'bg-brand-500 text-white hover:bg-brand-400'} disabled:opacity-50`}>
                {running ? 'Running…' : <><Play className="w-4 h-4" fill="currentColor" strokeWidth={0} /> Run automation</>}
              </button>
              {(runStep >= 0) && <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2.5 text-sm text-gray-300 hover:text-white transition"><RotateCcw className="w-3.5 h-3.5" /> Reset</button>}
            </div>
          </div>

          {/* Activity log */}
          <Panel className="p-4 relative min-h-[16rem]">
            <div className="flex items-center gap-2 mb-4"><Activity className="w-3.5 h-3.5 text-brand-400" strokeWidth={2} /><p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">Run log</p></div>
            {log.length === 0 ? (
              <p className="text-xs text-gray-500">Hit <span className="text-gray-300">Run</span> to watch it fire.</p>
            ) : (
              <div className="space-y-2.5">
                {log.map((e, i) => (
                  <div key={i} className="flex items-start gap-2.5 motion-safe:animate-[sbfade_0.35s_ease-out]">
                    <span className={`mt-0.5 inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-md ${e.done ? 'bg-emerald-500/15 text-emerald-400' : e.accent ? 'bg-brand-500/15 text-brand-400' : 'bg-white/[0.06] text-gray-400'}`}>{e.done ? <Check className="w-3 h-3" strokeWidth={2.5} /> : <Zap className="w-3 h-3" strokeWidth={2} />}</span>
                    <div className="min-w-0"><p className="text-[10px] uppercase tracking-wider text-gray-500">{e.t}</p><p className="text-[12.5px] text-gray-200 leading-snug">{e.text}</p></div>
                  </div>
                ))}
              </div>
            )}
            <Toasts toasts={toasts} />
          </Panel>
        </div>
      </Sandbox>

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-14">
          <LeadCapture
            toolName="Workflow Automation Hub"
            resultSummary={`Built an automation: ${trig.label} → ${actions.map((a) => meta(a.id).label).join(' → ')}`}
            ctaHeadline="Want this wired into your real tools?"
            ctaSub="We'll connect the apps you already use so this runs for real — usually live in a few weeks."
          />
        </div>
      </section>
    </ToolLayout>
  );
}
