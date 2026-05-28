import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import ToolLayout from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';

// Each option scored 0–3 (higher = more efficient). 10 questions, max 30.
const QUESTIONS = [
  {
    area: 'Quoting & estimates',
    q: 'How does your team create quotes or estimates?',
    options: [
      { label: 'By hand, from scratch each time', score: 0 },
      { label: 'From a template they edit', score: 1 },
      { label: 'A tool that does part of it', score: 2 },
      { label: 'A tool that generates them instantly', score: 3 },
    ],
  },
  {
    area: 'Scheduling & dispatch',
    q: 'How is scheduling or dispatch managed?',
    options: [
      { label: 'Whiteboard, paper, or someone’s head', score: 0 },
      { label: 'A shared spreadsheet', score: 1 },
      { label: 'A generic calendar app', score: 2 },
      { label: 'A purpose-built scheduling system', score: 3 },
    ],
  },
  {
    area: 'Spreadsheet reliance',
    q: 'How much do core operations depend on spreadsheets?',
    options: [
      { label: 'Heavily — they run the business', score: 0 },
      { label: 'A lot of important work lives there', score: 1 },
      { label: 'Some, for specific tasks', score: 2 },
      { label: 'Minimal — real systems do the work', score: 3 },
    ],
  },
  {
    area: 'Approvals',
    q: 'How do approvals (pricing, POs, exceptions) happen?',
    options: [
      { label: 'Email threads or hallway conversations', score: 0 },
      { label: 'Chat messages', score: 1 },
      { label: 'Partly in a system', score: 2 },
      { label: 'Routed automatically with full context', score: 3 },
    ],
  },
  {
    area: 'Data entry',
    q: 'How does information move between your systems?',
    options: [
      { label: 'Re-typed into each system', score: 0 },
      { label: 'Copy-pasted between tools', score: 1 },
      { label: 'Some systems sync automatically', score: 2 },
      { label: 'Data flows automatically end-to-end', score: 3 },
    ],
  },
  {
    area: 'Reporting speed',
    q: 'How long does it take to pull a report leadership trusts?',
    options: [
      { label: 'Days — someone assembles it', score: 0 },
      { label: 'Hours', score: 1 },
      { label: 'Minutes', score: 2 },
      { label: 'Real-time — it’s always current', score: 3 },
    ],
  },
  {
    area: 'System sprawl',
    q: 'How many separate tools does one core workflow touch?',
    options: [
      { label: 'Five or more', score: 0 },
      { label: 'Three or four', score: 1 },
      { label: 'Two', score: 2 },
      { label: 'One', score: 3 },
    ],
  },
  {
    area: 'Follow-up',
    q: 'How consistent is follow-up with customers and leads?',
    options: [
      { label: 'Manual — things slip', score: 0 },
      { label: 'We set reminders', score: 1 },
      { label: 'Partly automated', score: 2 },
      { label: 'Fully automated — nothing slips', score: 3 },
    ],
  },
  {
    area: 'Key-person risk',
    q: 'If a key person is out, can the team still run the workflow?',
    options: [
      { label: 'No — it stops', score: 0 },
      { label: 'Barely, and slowly', score: 1 },
      { label: 'Mostly', score: 2 },
      { label: 'Yes — it’s all in the system', score: 3 },
    ],
  },
  {
    area: 'Leadership visibility',
    q: 'How much real-time visibility does leadership have into operations?',
    options: [
      { label: 'None — we find out later', score: 0 },
      { label: 'Weekly reports', score: 1 },
      { label: 'A few dashboards', score: 2 },
      { label: 'Live dashboards, always on', score: 3 },
    ],
  },
];

function gradeFor(pct) {
  if (pct >= 85) return { grade: 'A', label: 'Highly efficient', tone: 'Your operations are in strong shape. The opportunities now are at the margins — and worth protecting as you scale.' };
  if (pct >= 70) return { grade: 'B', label: 'Mostly efficient', tone: 'Solid foundation with a few specific drags. Fixing your lowest areas would compound quickly.' };
  if (pct >= 55) return { grade: 'C', label: 'Mixed', tone: 'You’re absorbing real operational cost in a few places. The good news: the fixes are well-defined.' };
  if (pct >= 40) return { grade: 'D', label: 'Strained', tone: 'Your team is working around the tools more than through them. This is costing time and deals every week.' };
  return { grade: 'F', label: 'At capacity', tone: 'The operation is held together by people and spreadsheets. Growth will break it before long. This is fixable — and worth fixing soon.' };
}

export default function EfficiencyScorecard() {
  const [step, setStep] = useState(0); // 0..9 questions, 10 = results
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));

  const answeredCount = answers.filter((a) => a !== null).length;

  const choose = (score) => {
    const next = [...answers];
    next[step] = score;
    setAnswers(next);
    setStep((s) => Math.min(s + 1, QUESTIONS.length));
  };

  const results = useMemo(() => {
    const total = answers.reduce((sum, a) => sum + (a ?? 0), 0);
    const pct = Math.round((total / (QUESTIONS.length * 3)) * 100);
    const g = gradeFor(pct);
    // Lowest-scoring areas (the leaks)
    const ranked = QUESTIONS.map((q, i) => ({ area: q.area, score: answers[i] ?? 0 }))
      .sort((a, b) => a.score - b.score);
    const leaks = ranked.filter((r) => r.score <= 1).slice(0, 3);
    const fallbackLeaks = ranked.slice(0, 3);
    return { total, pct, ...g, leaks: leaks.length ? leaks : fallbackLeaks };
  }, [answers]);

  const reset = () => { setAnswers(Array(QUESTIONS.length).fill(null)); setStep(0); };

  const isResults = step >= QUESTIONS.length;

  return (
    <ToolLayout
      eyebrow="Assessment"
      title="The Operational Efficiency Scorecard"
      subtitle="Ten questions. Two minutes. A clear grade on where your business is leaking time — and which workflow to fix first."
      seoTitle="Operational Efficiency Scorecard — FusionSales.ai"
      seoDescription="Free 2-minute assessment for mid-sized businesses. Grade your operational efficiency across quoting, scheduling, approvals, reporting and more — and find out which workflow to fix first."
      canonicalPath="/tools/efficiency-scorecard"
    >
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
          {!isResults && (
            <div>
              {/* Progress */}
              <div className="mb-10">
                <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
                  <span>Question {step + 1} of {QUESTIONS.length}</span>
                  <span>{QUESTIONS[step].area}</span>
                </div>
                <div className="h-0.5 bg-gray-200 relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-brand-600 transition-all duration-300"
                    style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-8 leading-snug">
                {QUESTIONS[step].q}
              </h2>

              <div className="space-y-3">
                {QUESTIONS[step].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => choose(opt.score)}
                    className={[
                      'w-full text-left px-5 py-4 border transition flex items-center justify-between group',
                      answers[step] === opt.score
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-800 border-gray-200 hover:border-gray-900',
                    ].join(' ')}
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" strokeWidth={1.5} />
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back
                </button>
              )}
            </div>
          )}

          {isResults && (
            <div className="animate-[fadeUp_0.5s_ease-out]">
              {/* Grade */}
              <div className="text-center border-b border-gray-200 pb-12 mb-12">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">Your efficiency grade</p>
                <div className="flex items-center justify-center gap-6">
                  <span className="font-display text-7xl md:text-8xl font-light tracking-tight text-brand-600 leading-none">
                    {results.grade}
                  </span>
                  <div className="text-left">
                    <p className="text-3xl md:text-4xl font-light text-gray-900 tabular-nums">{results.pct}%</p>
                    <p className="text-sm text-gray-600">{results.label}</p>
                  </div>
                </div>
                <p className="mt-8 text-lg text-gray-800 leading-relaxed max-w-xl mx-auto">{results.tone}</p>
              </div>

              {/* Leaks */}
              <div className="mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  Your biggest efficiency leaks
                </h2>
                <div className="space-y-4">
                  {results.leaks.map((leak, i) => (
                    <div key={leak.area} className="flex items-start gap-4 border border-gray-200 p-5">
                      <span className="font-display text-2xl font-light text-brand-600 tabular-nums leading-none mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-gray-900 font-medium">{leak.area}</p>
                        <p className="text-sm text-gray-700 mt-1">
                          {leak.score === 0
                            ? 'This is largely manual today — the highest-leverage place to start.'
                            : 'Partly handled, but still costing time and creating risk.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead capture */}
              <div className="mb-8">
                <LeadCapture
                  toolName="Operational Efficiency Scorecard"
                  resultSummary={`Grade ${results.grade} (${results.pct}%). Leaks: ${results.leaks.map((l) => l.area).join(', ')}.`}
                  ctaHeadline="Email me my full scorecard."
                  ctaSub="We’ll send your complete breakdown — every area scored, plus exactly which workflow we’d fix first for a business like yours."
                />
              </div>

              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
              >
                <RotateCcw className="w-4 h-4" strokeWidth={1.5} /> Retake the assessment
              </button>
            </div>
          )}
        </div>
      </section>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </ToolLayout>
  );
}
