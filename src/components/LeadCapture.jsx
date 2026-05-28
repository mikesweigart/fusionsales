import React, { useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';

// ============================================================
// LEAD DELIVERY — Formspree (active). Leads from the assessment
// tools POST here and are emailed to the form owner. To rotate
// the destination, edit the form at https://formspree.io.
// ============================================================
const FORM_ENDPOINT = 'https://formspree.io/f/xjgzleoe';
const CALENDLY = 'https://calendly.com/mike-fusion-advisory/30min';

export default function LeadCapture({ toolName, resultSummary, ctaHeadline, ctaSub }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | done

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) return;
    setStatus('submitting');
    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          tool: toolName,
          result: resultSummary,
          _subject: `New lead from ${toolName}`,
        }),
      });
    } catch {
      // Never block the user on delivery failure (e.g. endpoint not yet configured).
    }
    setStatus('done');
  };

  if (status === 'done') {
    return (
      <div className="bg-gray-900 text-white p-8 md:p-10">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-600 mb-5">
          <Check className="w-5 h-5" strokeWidth={2.5} />
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-light tracking-tight mb-3">
          {ctaHeadline || 'Your full breakdown is on its way.'}
        </h3>
        <p className="text-gray-200 leading-relaxed mb-8 max-w-xl">
          {ctaSub ||
            'Want to talk through what we’d fix first? Book a 30-minute conversation — no slides, no pressure.'}
        </p>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-4 bg-white text-gray-900 text-sm md:text-base hover:bg-brand-50 transition"
        >
          Schedule a Conversation <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 p-8 md:p-10">
      <p className="text-[11px] uppercase tracking-[0.22em] text-brand-700 mb-3 font-medium">
        Get the full breakdown
      </p>
      <h3 className="font-display text-2xl font-light tracking-tight text-gray-900 mb-3">
        {ctaHeadline || 'Email me the detailed report.'}
      </h3>
      <p className="text-gray-800 leading-relaxed mb-6 max-w-xl">
        {ctaSub ||
          'We’ll send the complete breakdown plus the specific workflows worth fixing first. No spam — one email, and only a follow-up if you want one.'}
      </p>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
        <div className="flex-1 flex items-center border border-gray-300 bg-white px-3 focus-within:border-gray-900 transition">
          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" strokeWidth={1.5} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 px-3 py-3 text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm hover:bg-brand-600 transition disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'submitting' ? 'Sending…' : 'Email me the report'}
          {status !== 'submitting' && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}
