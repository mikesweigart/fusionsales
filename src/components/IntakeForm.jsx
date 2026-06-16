import React, { useRef, useState } from 'react';
import { INTAKE_SECTIONS, INTAKE_INTRO } from '../data/intake.js';

// Real booking link — revealed only after the intake is submitted.
const CALENDLY = 'https://calendly.com/mike-fusion-advisory/30min';

const inputBase =
  'mt-2 w-full rounded-md border bg-white px-3.5 py-2.5 text-[15px] text-gray-900 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500';

export default function IntakeForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const topRef = useRef(null);

  const total = INTAKE_SECTIONS.length;
  const section = INTAKE_SECTIONS[step];
  const isLast = step === total - 1;
  const progress = Math.round(((step + 1) / total) * 100);

  const scrollUp = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  function setField(id, value) {
    setData((d) => ({ ...d, [id]: value }));
    setErrors((e) => ({ ...e, [id]: false }));
  }
  function toggleMulti(id, option) {
    setData((d) => {
      const arr = Array.isArray(d[id]) ? d[id] : [];
      const next = arr.includes(option) ? arr.filter((x) => x !== option) : [...arr, option];
      return { ...d, [id]: next };
    });
    setErrors((e) => ({ ...e, [id]: false }));
  }
  const isEmpty = (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0);

  function validateStep() {
    const errs = {};
    for (const f of section.fields) if (f.required && isEmpty(data[f.id])) errs[f.id] = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }
  function next() {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, total - 1));
      scrollUp();
    }
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
    scrollUp();
  }

  async function handleSubmit() {
    if (!validateStep()) return;
    const sections = INTAKE_SECTIONS.map((s) => ({
      title: s.title,
      items: s.fields.map((f) => ({
        label: f.label,
        value: Array.isArray(data[f.id]) ? data[f.id].join(', ') : (data[f.id] || ''),
      })),
    }));
    const meta = { name: data.fullName || '', company: data.company || '', email: data.email || '' };
    setStatus('submitting');
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meta, data, sections }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setStatus('success');
        scrollUp();
      } else {
        throw new Error(json.error || 'Something went wrong submitting your intake.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.message || 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div ref={topRef} className="rounded-xl border border-brand-200 bg-brand-50 p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.25em] text-brand-700">Intake complete</p>
        <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-gray-900 mt-4">
          You're all set. Thank you.
        </h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-gray-700">
          We've got your answers, so the conversation starts with real context — not a blank page.
          Go ahead and grab a time below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Book your time now →
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-7 py-4 border border-gray-300 text-gray-900 text-sm font-medium hover:border-gray-500 transition"
          >
            Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef}>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em]">
          <span className="text-brand-700">Step {step + 1} of {total}</span>
          <span className="text-gray-400">{progress}%</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full rounded-full bg-brand-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Section header */}
      <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-gray-900">{section.title}</h2>
      <p className="mt-2 text-[15px] text-gray-600">{section.description}</p>

      {/* Fields */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {section.fields.map((f) => (
          <Field
            key={f.id}
            field={f}
            value={data[f.id]}
            error={errors[f.id]}
            onText={(v) => setField(f.id, v)}
            onToggle={(opt) => toggleMulti(f.id, opt)}
          />
        ))}
      </div>

      {status === 'error' && (
        <div className="mt-8 rounded-md border border-red-300 bg-red-50 p-4 text-[14px] text-red-800">
          {errorMsg} Please try again, or email us at{' '}
          <a href="mailto:hello@fusionsales.ai" className="font-semibold underline">hello@fusionsales.ai</a>.
        </div>
      )}

      {/* Nav */}
      <div className="mt-10 flex items-center justify-between gap-4 border-t border-gray-200 pt-6">
        {step > 0 ? (
          <button type="button" onClick={back} className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition">
            ← Back
          </button>
        ) : (
          <span />
        )}
        {isLast ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Submitting…' : 'Submit & unlock booking →'}
          </button>
        ) : (
          <button type="button" onClick={next} className="inline-flex items-center gap-2 px-7 py-3.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition">
            Continue →
          </button>
        )}
      </div>

      {step === 0 && (
        <p className="mt-4 text-xs text-gray-400">
          {INTAKE_INTRO.gateNote} Required fields are marked <span className="text-brand-600">*</span>.
        </p>
      )}
    </div>
  );
}

function Field({ field: f, value, error, onText, onToggle }) {
  const [otherMode, setOtherMode] = useState(
    f.type === 'selectOther' && typeof value === 'string' && value !== '' && !(f.options || []).includes(value),
  );
  const fullWidth = f.type === 'textarea' || f.type === 'radio' || f.type === 'checkbox';
  const strVal = typeof value === 'string' ? value : '';
  const arrVal = Array.isArray(value) ? value : [];
  const cls = inputBase + ' ' + (error ? 'border-red-400' : 'border-gray-300');

  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <label
        htmlFor={f.type === 'radio' || f.type === 'checkbox' ? undefined : f.id}
        className="block text-[13.5px] font-medium text-gray-900"
      >
        {f.label}
        {f.required && <span className="ml-1 text-brand-600">*</span>}
      </label>

      {f.type === 'textarea' ? (
        <textarea id={f.id} value={strVal} onChange={(e) => onText(e.target.value)} placeholder={f.placeholder} rows={4} className={cls} />
      ) : f.type === 'select' ? (
        <select id={f.id} value={strVal} onChange={(e) => onText(e.target.value)} className={cls + (strVal ? '' : ' text-gray-400')}>
          <option value="" disabled>Select…</option>
          {f.options?.map((o) => (
            <option key={o} value={o} className="text-gray-900">{o}</option>
          ))}
        </select>
      ) : f.type === 'selectOther' ? (
        <>
          <select
            id={f.id}
            value={otherMode ? 'Other' : f.options?.includes(strVal) ? strVal : ''}
            onChange={(e) => {
              if (e.target.value === 'Other') {
                setOtherMode(true);
                onText('');
              } else {
                setOtherMode(false);
                onText(e.target.value);
              }
            }}
            className={cls + (otherMode || f.options?.includes(strVal) ? '' : ' text-gray-400')}
          >
            <option value="" disabled>Select…</option>
            {f.options?.map((o) => (
              <option key={o} value={o} className="text-gray-900">{o}</option>
            ))}
            <option value="Other" className="text-gray-900">Other…</option>
          </select>
          {otherMode && (
            <input type="text" value={strVal} onChange={(e) => onText(e.target.value)} placeholder="Which one? Type it here" className={cls} />
          )}
        </>
      ) : f.type === 'radio' ? (
        <div className="mt-3 grid gap-2.5" role="group" aria-label={f.label}>
          {f.options?.map((opt) => {
            const selected = strVal === opt;
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={selected}
                onClick={() => onText(opt)}
                className={
                  'text-left px-4 py-3 border text-sm transition ' +
                  (selected ? 'bg-gray-900 text-white border-gray-900 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400')
                }
              >
                {opt}
              </button>
            );
          })}
        </div>
      ) : f.type === 'checkbox' ? (
        <div className="mt-3 flex flex-wrap gap-2.5" role="group" aria-label={f.label}>
          {f.options?.map((opt) => {
            const selected = arrVal.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={selected}
                onClick={() => onToggle(opt)}
                className={
                  'rounded-full border px-4 py-2 text-[13.5px] transition ' +
                  (selected ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400')
                }
              >
                {opt}
              </button>
            );
          })}
        </div>
      ) : (
        <input id={f.id} type={f.type} value={strVal} onChange={(e) => onText(e.target.value)} placeholder={f.placeholder} className={cls} />
      )}

      {f.help && !error && <p className="mt-1.5 text-xs text-gray-400">{f.help}</p>}
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">This one's required.</p>}
    </div>
  );
}
