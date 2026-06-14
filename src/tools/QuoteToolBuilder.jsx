import React, { useState, useMemo } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import ToolLayout, { Slider } from '../components/ToolLayout';
import LeadCapture from '../components/LeadCapture';

/* Build-Your-Own Quote Tool — define your pricing rules on the left, and a
   working quote calculator runs live on the right. They build a real pricing
   tool in two minutes — exactly what we'd build them, tailored. */

const usd = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const Field = ({ label, prefix, value, onChange, w = '' }) => (
  <label className="block">
    <span className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-1.5 block">{label}</span>
    <div className="flex items-center border border-gray-200 focus-within:border-gray-900 transition">
      {prefix && <span className="pl-3 text-gray-400 text-sm">{prefix}</span>}
      <input value={value} onChange={(e) => onChange(e.target.value)} className={`px-3 py-2.5 text-sm text-gray-900 focus:outline-none w-full bg-transparent ${w}`} />
    </div>
  </label>
);

export default function QuoteToolBuilder() {
  const [product, setProduct] = useState('Office Move');
  const [base, setBase] = useState(2400);
  const [perUnit, setPerUnit] = useState(85);
  const [unit, setUnit] = useState('crew hour');
  const [tax, setTax] = useState(7);
  const [addons, setAddons] = useState([
    { id: 1, label: 'Full packing service', price: 1200, on: true },
    { id: 2, label: 'Climate-controlled storage', price: 650, on: false },
    { id: 3, label: 'Specialty equipment', price: 900, on: false },
  ]);
  const [qty, setQty] = useState(8);

  const setAddon = (id, key, val) => setAddons((a) => a.map((x) => (x.id === id ? { ...x, [key]: val } : x)));

  const calc = useMemo(() => {
    const b = Number(base) || 0, pu = Number(perUnit) || 0, tx = Number(tax) || 0;
    const items = [
      { label: `${product} — base`, amount: b },
      { label: `${unit} × ${qty}`, amount: pu * qty },
      ...addons.filter((a) => a.on).map((a) => ({ label: a.label, amount: Number(a.price) || 0 })),
    ];
    const subtotal = items.reduce((s, i) => s + i.amount, 0);
    const taxAmt = Math.round(subtotal * (tx / 100));
    return { items, subtotal, taxAmt, total: subtotal + taxAmt };
  }, [product, base, perUnit, unit, tax, addons, qty]);

  return (
    <ToolLayout
      eyebrow="Build-Your-Own Quote Tool"
      title="Build a working quote tool for your business — right now."
      subtitle="Set your pricing rules on the left. A real quote calculator runs live on the right. This is exactly the kind of tool we'd build you — tailored to how you actually price."
      seoTitle="Build-Your-Own Quote Tool — FusionSales.ai"
      seoDescription="Configure your pricing rules and watch a working quote calculator compute live — a hands-on demo of the custom quoting tools FusionSales builds for businesses."
      canonicalPath="/tools/quote-builder"
    >
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-16 grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Config */}
          <div className="bg-white border border-gray-200 p-6 md:p-8 space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Set up your pricing</p>
            <Field label="What you sell" value={product} onChange={setProduct} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Base price" prefix="$" value={base} onChange={(v) => setBase(v.replace(/[^0-9]/g, ''))} />
              <Field label="Tax %" value={tax} onChange={(v) => setTax(v.replace(/[^0-9.]/g, ''))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Price per unit" prefix="$" value={perUnit} onChange={(v) => setPerUnit(v.replace(/[^0-9]/g, ''))} />
              <Field label="Unit name" value={unit} onChange={setUnit} />
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-2 block">Optional add-ons</span>
              <div className="space-y-2">
                {addons.map((a) => (
                  <div key={a.id} className="grid grid-cols-[1fr_5.5rem] gap-2">
                    <input value={a.label} onChange={(e) => setAddon(a.id, 'label', e.target.value)} className="border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-900 transition min-w-0" />
                    <div className="flex items-center border border-gray-200 focus-within:border-gray-900"><span className="pl-2 text-gray-400 text-sm">$</span><input value={a.price} onChange={(e) => setAddon(a.id, 'price', e.target.value.replace(/[^0-9]/g, ''))} className="px-2 py-2 text-sm text-gray-900 text-right focus:outline-none w-full tabular-nums" /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live tool */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
                <span className="text-sm font-medium">Your quote tool</span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> live</span>
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <Slider label={`How many ${unit}s?`} value={qty} min={1} max={40} step={1} onChange={setQty} display={`${qty}`} />
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-gray-500 mb-2">Add-ons</p>
                  {addons.map((a) => (
                    <button key={a.id} onClick={() => setAddon(a.id, 'on', !a.on)} className="w-full flex items-center justify-between gap-3 py-1.5 group">
                      <span className="flex items-center gap-2.5 text-sm text-gray-800">
                        <span className={`w-4 h-4 rounded border flex items-center justify-center transition ${a.on ? 'bg-brand-500 border-brand-500' : 'border-gray-300 group-hover:border-gray-400'}`}>{a.on && <Check className="w-3 h-3 text-white" strokeWidth={3} />}</span>
                        {a.label}
                      </span>
                      <span className="text-sm text-gray-500 tabular-nums">+{usd(a.price)}</span>
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  {calc.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-sm"><span className="text-gray-600">{it.label}</span><span className="text-gray-900 tabular-nums">{usd(it.amount)}</span></div>
                  ))}
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-100"><span className="text-gray-500">Tax ({tax || 0}%)</span><span className="text-gray-500 tabular-nums">{usd(calc.taxAmt)}</span></div>
                  <div className="flex justify-between items-baseline pt-1"><span className="text-base text-gray-900">Total</span><span className="font-display text-3xl font-light text-gray-900 tabular-nums">{usd(calc.total)}</span></div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">That&rsquo;s a working quote tool you just configured. The real version applies your full pricing logic, sends a branded quote, and logs it automatically.</p>
            <LeadCapture
              toolName="Quote Tool Builder"
              resultSummary={`Configured a quote tool for "${product}" — sample total ${usd(calc.total)}`}
              ctaHeadline="Want the real one, built for your pricing?"
              ctaSub="We'll turn this into a production quote tool that fits exactly how you price — usually live in a few weeks."
            />
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
