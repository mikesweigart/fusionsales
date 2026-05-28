import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import ToolLayout from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';

// Higher score = more custom-favorable. 6 questions, max 12.
const QUESTIONS = [
  {
    key: 'uniqueness',
    q: 'How unique is the workflow you’re trying to support?',
    options: [
      { label: 'Generic — most businesses do it the same way', score: 0 },
      { label: 'Somewhat specific to us', score: 1 },
      { label: 'Highly specific — industry or company rules', score: 2 },
    ],
  },
  {
    key: 'time',
    q: 'How much time does your team lose to this workflow each week?',
    options: [
      { label: 'Not much — under 2 hours total', score: 0 },
      { label: 'A moderate amount — a few hours', score: 1 },
      { label: 'A lot — many hours across the team', score: 2 },
    ],
  },
  {
    key: 'error',
    q: 'What does a single error in this workflow cost you?',
    options: [
      { label: 'Minor — quick to fix', score: 0 },
      { label: 'Moderate — lost time or a discount', score: 1 },
      { label: 'Severe — lost deals, or compliance risk', score: 2 },
    ],
  },
  {
    key: 'fit',
    q: 'How well does an off-the-shelf tool fit this workflow?',
    options: [
      { label: 'A tool fits it well already', score: 0 },
      { label: 'A tool gets ~70% there', score: 1 },
      { label: 'Nothing off-the-shelf really fits', score: 2 },
    ],
  },
  {
    key: 'adoption',
    q: 'How does your team treat the generic tools they’re given?',
    options: [
      { label: 'They adopt them fine', score: 0 },
      { label: 'Mixed — some workarounds', score: 1 },
      { label: 'They route around them with spreadsheets', score: 2 },
    ],
  },
  {
    key: 'volume',
    q: 'What’s the volume of this workflow?',
    options: [
      { label: 'Low — occasional', score: 0 },
      { label: 'Moderate — steady', score: 1 },
      { label: 'High and growing', score: 2 },
    ],
  },
];

function verdictFor(score) {
  if (score <= 3) {
    return {
      verdict: 'Buy',
      headline: 'Buy off-the-shelf.',
      body: 'This workflow is generic enough, and the cost of imperfect fit is low enough, that a proven off-the-shelf tool is the right call. Building custom here would be over-engineering. Pick the market leader, configure it minimally, and move on.',
      accent: 'text-gray-900',
    };
  }
  if (score <= 8) {
    return {
      verdict: 'Customize',
      headline: 'Customize on top of what exists.',
      body: 'A standard tool gets you most of the way, but the gaps are costing real time. The smart move is to keep the off-the-shelf foundation and build a thin custom layer — automation, integrations, or a focused tool — that closes the gap. You get fit without a from-scratch build.',
      accent: 'text-brand-600',
    };
  }
  return {
    verdict: 'Build',
    headline: 'Build it custom.',
    body: 'This workflow is specific to your business, high-volume, expensive to get wrong, and poorly served by generic tools your team already routes around. That’s the exact profile where a custom build pays back — usually inside a few months — and gives you software that fits and that you own.',
    accent: 'text-brand-600',
  };
}

export default function BuildVsBuy() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));

  const choose = (score) => {
    const next = [...answers];
    next[step] = score;
    setAnswers(next);
    setStep((s) => Math.min(s + 1, QUESTIONS.length));
  };

  const result = useMemo(() => {
    const total = answers.reduce((s, a) => s + (a ?? 0), 0);
    return { total, ...verdictFor(total) };
  }, [answers]);

  const reset = () => { setAnswers(Array(QUESTIONS.length).fill(null)); setStep(0); };
  const isResults = step >= QUESTIONS.length;

  return (
    <ToolLayout
      eyebrow="Decision tool"
      title="Build vs. Buy: Get a Straight Answer"
      subtitle="Six questions decide whether you should buy off-the-shelf, customize what exists, or build custom. Answer honestly and you’ll get a clear recommendation — not a sales pitch."
      seoTitle="Build vs. Buy Decision Tool — FusionSales.ai"
      seoDescription="Should you buy off-the-shelf software, customize it, or build custom? Answer six questions and get a clear, honest recommendation. Free decision tool for mid-sized businesses."
      canonicalPath="/tools/build-vs-buy"
    >
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
          {!isResults && (
            <div>
              <div className="mb-10">
                <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
                  <span>Question {step + 1} of {QUESTIONS.length}</span>
                </div>
                <div className="h-0.5 bg-gray-200 relative">
                  <div className="absolute inset-y-0 left-0 bg-brand-600 transition-all duration-300"
                    style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
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
                <button onClick={() => setStep((s) => s - 1)}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back
                </button>
              )}
            </div>
          )}

          {isResults && (
            <div className="animate-[fadeUp_0.5s_ease-out]">
              <div className="text-center border-b border-gray-200 pb-12 mb-12">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">Our recommendation</p>
                <p className={['font-display text-6xl md:text-7xl font-light tracking-tight leading-none', result.accent].join(' ')}>
                  {result.verdict}
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-gray-900 mt-8 mb-5">
                  {result.headline}
                </h2>
                <p className="text-lg text-gray-800 leading-relaxed max-w-xl mx-auto">{result.body}</p>
              </div>

              <div className="mb-8">
                <LeadCapture
                  toolName="Build vs. Buy Decision Tool"
                  resultSummary={`Verdict: ${result.verdict} (score ${result.total}/12).`}
                  ctaHeadline="Email me the full reasoning."
                  ctaSub="We’ll send the detailed breakdown of how each factor played into this recommendation — and what the next step looks like for your specific workflow."
                />
              </div>

              <button onClick={reset} className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
                <RotateCcw className="w-4 h-4" strokeWidth={1.5} /> Start over
              </button>
            </div>
          )}
        </div>
      </section>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </ToolLayout>
  );
}
