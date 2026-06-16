import React, { useEffect } from 'react';
import IntakeForm from '../components/IntakeForm.jsx';
import { INTAKE_INTRO } from '../data/intake.js';

const WHY = [
  { h: 'No blind calls', b: "We walk in already understanding your business, your stack, and your goals." },
  { h: 'Your time, respected', b: 'The call is productive because the homework is already done.' },
  { h: 'Total transparency', b: "This is the entire intake — nothing hidden, nothing you can't see up front." },
];

export default function IntakePage() {
  useEffect(() => {
    document.title = 'Start Here — FusionSales.ai';
    if (typeof document !== 'undefined') {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute(
        'content',
        'Before booking time with FusionSales.ai, complete a short intake so the first conversation starts with full context — your business, your stack, and where custom software or AI fits.',
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 text-gray-900" aria-label="FusionSales.ai home">
            <img src="/favicon.svg" alt="" className="w-7 h-7" width="28" height="28" />
            <span className="text-xl tracking-tight font-medium">FusionSales</span>
            <span className="text-xl tracking-tight text-gray-400 font-light">.ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition">Home</a>
            <a href="/ideas" className="text-gray-600 hover:text-gray-900 transition">Ideas</a>
            <a href="/tools" className="text-gray-600 hover:text-gray-900 transition">Tools</a>
            <a href="/insights" className="text-gray-600 hover:text-gray-900 transition">Insights</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Intro */}
        <section className="border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 pt-12 md:pt-16 pb-10 md:pb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-brand-700 mb-5">{INTAKE_INTRO.eyebrow}</p>
            <h1 className="font-display text-3xl md:text-5xl font-light leading-[1.08] tracking-tight text-gray-900 max-w-3xl">
              {INTAKE_INTRO.headline}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-800 leading-relaxed max-w-2xl">{INTAKE_INTRO.subhead}</p>
            <p className="mt-5 max-w-2xl border-l-2 border-brand-500 bg-brand-50 py-4 pl-5 pr-4 text-[15px] leading-relaxed text-gray-700">
              {INTAKE_INTRO.transparencyNote}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {WHY.map((w) => (
                <div key={w.h} className="rounded-lg border border-gray-200 bg-white p-5">
                  <h2 className="text-[15px] font-semibold text-gray-900">{w.h}</h2>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600">{w.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
            <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
              <IntakeForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-gray-600">
          <span>© 2026 Arlogix Inc.</span>
          <div className="flex gap-6">
            <a href="/tools" className="hover:text-gray-900">Tools</a>
            <a href="/insights" className="hover:text-gray-900">Insights</a>
            <a href="/" className="hover:text-gray-900">fusionsales.ai</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
