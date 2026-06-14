import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Plus, X, Check, RotateCcw, Gauge, AlertTriangle, Wand2 } from 'lucide-react';
import ToolLayout from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';
import { Sandbox, Panel, Toasts, useReduced, nextToastId } from './sandbox';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
let _sid = 0;
const sid = () => ++_sid;
const mk = (name, role) => ({ id: sid(), name, role, avail: [true, true, true, true, true] });
const SEED = [mk('Alex R.', 'Lead'), mk('Sam T.', 'Crew'), mk('Jordan P.', 'Crew'), mk('Casey L.', 'Part-time')];

export default function SmartScheduling() {
  const [staff, setStaff] = useState(SEED);
  const [demand, setDemand] = useState([2, 2, 3, 3, 2]); // shifts needed per day
  const [sched, setSched] = useState(null); // {assigned: staffId[][5], gaps: number[5]}
  const [running, setRunning] = useState(false);
  const [revealDay, setRevealDay] = useState(-1);
  const [toasts, setToasts] = useState([]);
  const tref = useRef([]);
  const reduced = useReduced();
  useEffect(() => () => tref.current.forEach(clearTimeout), []);

  const pushToast = useCallback((t) => {
    const id = nextToastId();
    setToasts((p) => [...p.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 3500);
  }, []);

  const toggleAvail = (sId, day) => {
    if (running) return;
    setStaff((s) => s.map((x) => (x.id === sId ? { ...x, avail: x.avail.map((a, i) => (i === day ? !a : a)) } : x)));
    setSched(null);
  };
  const cycleDemand = (day) => { if (running) return; setDemand((d) => d.map((v, i) => (i === day ? (v % 4) + 1 : v))); setSched(null); };
  const addStaff = () => setStaff((s) => [...s, mk(`New hire ${s.length + 1}`, 'Crew')]);
  const removeStaff = (id) => { setStaff((s) => s.filter((x) => x.id !== id)); setSched(null); };

  const compute = () => {
    const assigned = DAYS.map(() => []);
    const gaps = DAYS.map((_, day) => {
      const avail = staff.filter((s) => s.avail[day]);
      const take = avail.slice(0, demand[day]); // greedy: leads first (seed order)
      assigned[day] = take.map((s) => s.id);
      return Math.max(0, demand[day] - take.length);
    });
    return { assigned, gaps };
  };

  const run = () => {
    if (running) return;
    tref.current.forEach(clearTimeout); tref.current = [];
    const result = compute();
    setRunning(true); setRevealDay(-1); setSched(result);
    const totalGaps = result.gaps.reduce((a, b) => a + b, 0);
    if (reduced) { setRevealDay(DAYS.length); setRunning(false); done(totalGaps); return; }
    DAYS.forEach((_, i) => tref.current.push(setTimeout(() => setRevealDay(i), 320 * (i + 1))));
    tref.current.push(setTimeout(() => { setRevealDay(DAYS.length); setRunning(false); done(totalGaps); }, 320 * (DAYS.length + 1)));
  };
  const done = (gaps) => pushToast(gaps > 0 ? { icon: AlertTriangle, text: `Schedule built — ${gaps} shift${gaps > 1 ? 's' : ''} short`, sub: 'flagged for you', accent: true } : { icon: Check, text: 'Fully staffed, zero gaps', sub: 'auto-scheduled' });

  const reset = () => { tref.current.forEach(clearTimeout); setRunning(false); setSched(null); setRevealDay(-1); };

  const totalNeeded = demand.reduce((a, b) => a + b, 0);
  const totalFilled = sched ? sched.assigned.reduce((a, d) => a + d.length, 0) : 0;
  const coverage = totalNeeded ? Math.round((totalFilled / totalNeeded) * 100) : 0;

  return (
    <ToolLayout
      eyebrow="Smart Scheduling"
      title="Set your team and your demand. Let it staff the week."
      subtitle="Toggle who’s available, set how many you need each day, and hit auto-schedule. Watch it fill the week and flag any gaps — the workforce scheduling we build for shift-based teams."
      seoTitle="Smart Scheduling — interactive demo — FusionSales.ai"
      seoDescription="Try smart workforce scheduling: set staff availability and daily demand, then auto-schedule the week and see coverage gaps flagged. A demo of the custom scheduling software FusionSales builds."
      canonicalPath="/tools/smart-scheduling"
    >
      <Sandbox domain="schedule.yourbusiness.com" kicker="Try it — staff the week">
        <Panel className="p-4 relative overflow-x-auto">
          <div className="min-w-[560px]">
            {/* demand header */}
            <div className="flex items-center mb-2">
              <div className="w-32 shrink-0 text-[10px] uppercase tracking-wider text-gray-500">Need / day &rarr;</div>
              <div className="flex-1 grid grid-cols-5 gap-1.5">
                {DAYS.map((d, i) => {
                  const gap = sched && revealDay >= i ? sched.gaps[i] : 0;
                  return (
                    <button key={d} onClick={() => cycleDemand(i)} className={`rounded-md border px-2 py-1.5 text-center transition ${gap > 0 ? 'border-amber-400/40 bg-amber-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/25'}`}>
                      <p className="text-[11px] text-gray-300">{d}</p>
                      <p className="text-[10px] tabular-nums"><span className="text-brand-400 font-medium">{demand[i]}</span>{gap > 0 && <span className="text-amber-400"> · short {gap}</span>}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* staff rows */}
            <div className="space-y-1.5">
              {staff.map((s) => (
                <div key={s.id} className="flex items-center group">
                  <div className="w-32 shrink-0 pr-2 flex items-center justify-between">
                    <div className="min-w-0"><p className="text-xs text-gray-200 truncate">{s.name}</p><p className="text-[10px] text-gray-500">{s.role}</p></div>
                    {!running && staff.length > 1 && <button onClick={() => removeStaff(s.id)} className="text-gray-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition shrink-0"><X className="w-3.5 h-3.5" /></button>}
                  </div>
                  <div className="flex-1 grid grid-cols-5 gap-1.5">
                    {DAYS.map((_, day) => {
                      const onShift = sched && revealDay >= day && sched.assigned[day].includes(s.id);
                      const avail = s.avail[day];
                      return (
                        <button key={day} onClick={() => toggleAvail(s.id, day)} disabled={running}
                          className={`h-9 rounded-md border text-[10px] flex items-center justify-center transition ${onShift ? 'border-emerald-400/40 bg-emerald-500/70 text-white' : avail ? 'border-white/10 bg-white/[0.04] text-gray-500 hover:border-white/25' : 'border-transparent bg-white/[0.01] text-gray-700'}`}>
                          {onShift ? <span className="inline-flex items-center gap-1"><Check className="w-3 h-3" strokeWidth={2.5} />On</span> : avail ? 'Free' : 'Off'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Toasts toasts={toasts} />
        </Panel>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <button onClick={run} disabled={running} className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition ${running ? 'bg-white/10 text-gray-400 cursor-wait' : 'bg-brand-500 text-white hover:bg-brand-400'}`}>
            {running ? 'Scheduling…' : <><Wand2 className="w-4 h-4" /> Auto-schedule the week</>}
          </button>
          <button onClick={addStaff} disabled={running} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2.5 text-sm text-gray-300 hover:text-white transition disabled:opacity-40"><Plus className="w-4 h-4" /> Add staff</button>
          {sched && !running && <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2.5 text-sm text-gray-300 hover:text-white transition"><RotateCcw className="w-3.5 h-3.5" /> Reset</button>}
          {sched && revealDay >= DAYS.length && (
            <span className="ml-auto inline-flex items-center gap-2 text-sm text-gray-300"><Gauge className="w-4 h-4 text-brand-400" /> Coverage <span className={`font-medium tabular-nums ${coverage >= 100 ? 'text-emerald-400' : 'text-amber-400'}`}>{coverage}%</span></span>
          )}
        </div>
        <p className="text-[11px] text-gray-500 mt-3">Tip: click a cell to mark someone off, or a day header to change how many you need — then re-run.</p>
      </Sandbox>

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-14">
          <LeadCapture
            toolName="Smart Scheduling"
            resultSummary={`Auto-scheduled a week for ${staff.length} staff · ${coverage}% coverage`}
            ctaHeadline="Want this for your real team?"
            ctaSub="We build scheduling around your roles, certifications, and demand patterns — with swaps and reminders built in."
          />
        </div>
      </section>
    </ToolLayout>
  );
}
