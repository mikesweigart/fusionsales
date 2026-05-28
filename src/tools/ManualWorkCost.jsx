import React, { useMemo, useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';

const fmtUsd = (n) => `$${new Intl.NumberFormat('en-US').format(Math.round(n))}`;
const fmtCompact = (n) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
};

function Slider({ label, value, min, max, step, display, onChange, bound }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <label className="text-sm text-gray-800">{label}</label>
        <span className="text-lg text-gray-900 tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between mt-2 text-xs text-gray-400 tabular-nums">
        <span>{bound ? bound(min) : min}</span>
        <span>{bound ? bound(max) : max}</span>
      </div>
    </div>
  );
}

const BUILD_COST = 50000; // representative one-time custom build

export default function ManualWorkCost() {
  const [people, setPeople] = useState(5);
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(55);
  const [txns, setTxns] = useState(200);
  const [errorRate, setErrorRate] = useState(2);
  const [errorCost, setErrorCost] = useState(750);

  const r = useMemo(() => {
    const annualLabor = people * hours * 50 * rate;
    const annualError = txns * 12 * (errorRate / 100) * errorCost;
    const annualTotal = annualLabor + annualError;
    const threeYear = annualTotal * 3;
    const monthlyValue = annualTotal / 12;
    const paybackMonths = monthlyValue > 0 ? BUILD_COST / monthlyValue : 0;
    const threeYearNet = threeYear - BUILD_COST;
    return { annualLabor, annualError, annualTotal, threeYear, paybackMonths, threeYearNet };
  }, [people, hours, rate, txns, errorRate, errorCost]);

  return (
    <ToolLayout
      eyebrow="Calculator"
      title="The Manual Work Cost Calculator"
      subtitle="Manual work is the biggest line item nobody puts on a P&L. Enter your numbers and see what it’s actually costing you — per year, over three years, and against a one-time custom build."
      seoTitle="Manual Work Cost Calculator — FusionSales.ai"
      seoDescription="Calculate the true annual and 3-year cost of manual work in your business — labor plus errors — and compare it to a one-time custom-software build. Free calculator for mid-sized businesses."
      canonicalPath="/tools/manual-work-cost"
    >
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Inputs */}
            <div className="space-y-10">
              <div className="bg-white border border-gray-200 p-8 space-y-9">
                <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500">Your team</p>
                <Slider label="People doing manual / admin work" value={people} min={1} max={50} step={1}
                  display={`${people} ${people === 1 ? 'person' : 'people'}`} onChange={setPeople} />
                <Slider label="Hours per week each on manual tasks" value={hours} min={1} max={40} step={1}
                  display={`${hours} hrs/wk`} onChange={setHours} bound={(n) => `${n} hrs`} />
                <Slider label="Average loaded hourly cost" value={rate} min={25} max={150} step={5}
                  display={`$${rate}/hr`} onChange={setRate} bound={(n) => `$${n}`} />
              </div>

              <div className="bg-white border border-gray-200 p-8 space-y-9">
                <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500">Errors (optional)</p>
                <Slider label="Transactions / tasks per month" value={txns} min={0} max={2000} step={25}
                  display={`${new Intl.NumberFormat('en-US').format(txns)}/mo`} onChange={setTxns} />
                <Slider label="Error rate" value={errorRate} min={0} max={10} step={0.5}
                  display={`${errorRate}%`} onChange={setErrorRate} bound={(n) => `${n}%`} />
                <Slider label="Average cost per error" value={errorCost} min={0} max={10000} step={50}
                  display={fmtUsd(errorCost)} onChange={setErrorCost} bound={(n) => fmtCompact(n)} />
              </div>
            </div>

            {/* Results */}
            <div className="lg:sticky lg:top-24 self-start space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Annual labor cost</p>
                  <p className="font-display text-3xl md:text-4xl font-light tracking-tight text-gray-900 tabular-nums">{fmtCompact(r.annualLabor)}</p>
                  <p className="text-xs text-gray-600 mt-2">Time spent on manual work</p>
                </div>
                <div className="border border-gray-200 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Annual error cost</p>
                  <p className="font-display text-3xl md:text-4xl font-light tracking-tight text-gray-900 tabular-nums">{fmtCompact(r.annualError)}</p>
                  <p className="text-xs text-gray-600 mt-2">Cost of mistakes</p>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Total cost of manual work</p>
                <p className="font-display text-5xl md:text-6xl font-light tracking-tight text-brand-400 tabular-nums">
                  {fmtCompact(r.annualTotal)}<span className="text-2xl text-gray-400"> /yr</span>
                </p>
                <div className="mt-6 pt-6 border-t border-gray-700 grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-[0.15em]">3-year cost</p>
                    <p className="text-2xl font-light tabular-nums mt-1">{fmtCompact(r.threeYear)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-[0.15em]">Payback on a build</p>
                    <p className="text-2xl font-light tabular-nums mt-1">
                      {r.paybackMonths > 0 && r.paybackMonths < 1 ? '<1 mo' : `${r.paybackMonths.toFixed(1).replace(/\.0$/, '')} mo`}
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-gray-200 leading-relaxed">
                  Against a typical {fmtCompact(BUILD_COST)} one-time custom build, you’d be ahead by{' '}
                  <span className="text-white font-medium">{fmtCompact(r.threeYearNet)}</span> over three years —
                  and you’d own the software.
                </p>
              </div>

              <LeadCapture
                toolName="Manual Work Cost Calculator"
                resultSummary={`Annual manual cost ${fmtCompact(r.annualTotal)}, 3yr ${fmtCompact(r.threeYear)}, payback ${r.paybackMonths.toFixed(1)} mo.`}
                ctaHeadline="Email me this analysis."
                ctaSub="We’ll send a clean one-page version you can put in front of your leadership team — plus what a build that eliminates this would actually involve."
              />
            </div>
          </div>

          <p className="mt-10 text-xs text-gray-500 max-w-3xl leading-relaxed">
            Estimates are directional, based on the inputs above and a representative {fmtCompact(BUILD_COST)} build.
            Loaded hourly cost ≈ salary ÷ 2,000 + ~30% for benefits and overhead. Your real numbers depend on your
            specific workflows — we model them precisely in a discovery conversation.
          </p>
        </div>
      </section>
    </ToolLayout>
  );
}
