import React, { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import ToolLayout from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';

function Choice({ label, options, value, onChange }) {
  return (
    <div>
      <p className="text-sm text-gray-800 mb-3">{label}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={[
                'px-3 py-3 border text-sm transition text-center',
                active ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400',
              ].join(' ')}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function gradeFor(pct) {
  if (pct >= 85) return { grade: 'A', label: 'Healthy stack' };
  if (pct >= 70) return { grade: 'B', label: 'Mostly healthy' };
  if (pct >= 55) return { grade: 'C', label: 'Some drag' };
  if (pct >= 40) return { grade: 'D', label: 'Fragmented' };
  return { grade: 'F', label: 'Sprawl' };
}

export default function TechStackHealth() {
  const [tools, setTools] = useState(8);        // count
  const [integration, setIntegration] = useState('some');
  const [spreadsheets, setSpreadsheets] = useState('some');
  const [overlap, setOverlap] = useState('few');

  const r = useMemo(() => {
    const toolScore = tools <= 5 ? 3 : tools <= 10 ? 2 : tools <= 20 ? 1 : 0;
    const intScore = { full: 3, mostly: 2, some: 1, none: 0 }[integration];
    const sheetScore = { minimal: 3, some: 1.5, heavy: 0 }[spreadsheets];
    const overlapScore = { none: 3, few: 1.5, many: 0 }[overlap];
    const total = toolScore + intScore + sheetScore + overlapScore;
    const pct = Math.round((total / 12) * 100);
    const g = gradeFor(pct);

    const findings = [];
    if (tools > 10) findings.push({ t: 'Tool sprawl', d: `You’re running on ${tools}+ separate systems. Each one carries hidden cost — training, integration, vendor management. Consolidation is likely worth real money.` });
    if (integration === 'none' || integration === 'some') findings.push({ t: 'Integration gaps', d: 'Your tools don’t talk to each other well. That means re-entry, stale data, and reports that don’t tie out. The connective layer is where the friction lives.' });
    if (spreadsheets === 'heavy' || spreadsheets === 'some') findings.push({ t: 'Spreadsheet bridges', d: 'Spreadsheets are filling the gaps your tools leave. Each one is an undocumented system with version, error, and key-person risk.' });
    if (overlap === 'many' || overlap === 'few') findings.push({ t: 'Overlapping tools', d: 'You’re likely paying for more than one tool doing a similar job. That’s a consolidation opportunity — fewer, better systems usually cost less and frustrate less.' });
    if (!findings.length) findings.push({ t: 'Solid foundation', d: 'Your stack is coherent. The opportunity now is protecting that as you grow — and owning the workflows that define your business.' });

    return { total, pct, ...g, findings: findings.slice(0, 4) };
  }, [tools, integration, spreadsheets, overlap]);

  return (
    <ToolLayout
      eyebrow="Stack audit"
      title="The Tech Stack Health Check"
      subtitle="Most growing businesses don’t run on a stack — they run on a pile. Answer four quick questions and see where your tools are creating drag, risk, and cost you can’t see."
      seoTitle="Tech Stack Health Check — FusionSales.ai"
      seoDescription="Audit your business software stack in 60 seconds. See your sprawl, integration gaps, spreadsheet risk, and consolidation opportunities — with a health grade. Free tool for mid-sized businesses."
      canonicalPath="/tools/tech-stack-health-check"
    >
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Inputs */}
            <div className="bg-white border border-gray-200 p-8 space-y-9">
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-sm text-gray-800">How many separate tools / systems do you run on?</label>
                  <span className="text-lg text-gray-900 tabular-nums">{tools >= 30 ? '30+' : tools}</span>
                </div>
                <input type="range" min={1} max={30} step={1} value={tools}
                  onChange={(e) => setTools(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between mt-2 text-xs text-gray-400 tabular-nums"><span>1</span><span>30+</span></div>
              </div>

              <Choice label="How well do these tools talk to each other?" value={integration} onChange={setIntegration}
                options={[
                  { value: 'none', label: 'Not at all' },
                  { value: 'some', label: 'Some' },
                  { value: 'mostly', label: 'Mostly' },
                  { value: 'full', label: 'Fully' },
                ]} />

              <Choice label="How much do you rely on spreadsheets to bridge gaps?" value={spreadsheets} onChange={setSpreadsheets}
                options={[
                  { value: 'heavy', label: 'Heavily' },
                  { value: 'some', label: 'Some' },
                  { value: 'minimal', label: 'Minimal' },
                ]} />

              <Choice label="Do you have overlapping tools doing similar jobs?" value={overlap} onChange={setOverlap}
                options={[
                  { value: 'many', label: 'Yes, many' },
                  { value: 'few', label: 'A few' },
                  { value: 'none', label: 'No' },
                ]} />
            </div>

            {/* Results */}
            <div className="lg:sticky lg:top-24 self-start space-y-6">
              <div className="border border-gray-200 p-8 flex items-center gap-6">
                <span className="font-display text-6xl font-light tracking-tight text-brand-600 leading-none">{r.grade}</span>
                <div>
                  <p className="text-3xl font-light text-gray-900 tabular-nums">{r.pct}%</p>
                  <p className="text-sm text-gray-600">{r.label}</p>
                </div>
              </div>

              <div className="space-y-3">
                {r.findings.map((f) => (
                  <div key={f.t} className="border border-gray-200 p-5">
                    <p className="text-gray-900 font-medium mb-1 flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-600 flex-shrink-0" strokeWidth={2.5} />
                      {f.t}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">{f.d}</p>
                  </div>
                ))}
              </div>

              <LeadCapture
                toolName="Tech Stack Health Check"
                resultSummary={`Stack grade ${r.grade} (${r.pct}%). ${tools} tools, integration: ${integration}, spreadsheets: ${spreadsheets}, overlap: ${overlap}.`}
                ctaHeadline="Email me my stack report."
                ctaSub="We’ll send the full breakdown — where to consolidate, where the integration gaps are costing you, and which workflow is worth owning outright."
              />
            </div>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
