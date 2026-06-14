import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

/* Shared dark "app" sandbox for the interactive product-demo tools.
   A framed dark surface (chrome bar + glow) embedded in the light ToolLayout,
   plus the primitives the four tools reuse. */

export const TONE_BG = {
  brand: 'bg-brand-500/80', emerald: 'bg-emerald-500/70', blue: 'bg-sky-500/70',
  violet: 'bg-violet-500/70', amber: 'bg-amber-500/70', slate: 'bg-slate-400/55', rose: 'bg-rose-500/70',
};
export const CHIP = {
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  blue: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
  rose: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
  violet: 'bg-violet-500/15 text-violet-300 border-violet-400/30',
  gray: 'bg-white/10 text-gray-300 border-white/15',
};

export function useReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setR(mq.matches);
    const on = () => setR(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return r;
}

export const Panel = ({ className = '', children }) => (
  <div className={`rounded-lg border border-white/10 bg-white/[0.03] ${className}`}>{children}</div>
);

export const LiveDot = () => (
  <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" /></span>
);

export const Chip = ({ tone = 'gray', children, dot }) => (
  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${CHIP[tone] || CHIP.gray}`}>
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />}{children}
  </span>
);

export function Sandbox({ domain = 'app.yourbusiness.com', kicker, children }) {
  return (
    <section className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        {kicker && <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-5">{kicker}</p>}
        <div className="relative rounded-2xl overflow-hidden border border-gray-900/10 shadow-2xl bg-[#0d1117]">
          <div aria-hidden className="pointer-events-none absolute -inset-x-20 -top-32 h-64 bg-gradient-to-b from-brand-500/15 to-transparent blur-3xl" />
          <div className="relative flex items-center gap-3 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-white/15" /><span className="w-2.5 h-2.5 rounded-full bg-white/15" /><span className="w-2.5 h-2.5 rounded-full bg-white/15" /></div>
            <div className="flex-1 flex justify-center"><div className="inline-flex items-center gap-2 rounded-md bg-white/[0.04] border border-white/10 px-3 py-1 max-w-full"><span className="text-[11px] text-gray-400 truncate">{domain}</span></div></div>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400"><LiveDot /><span className="hidden sm:inline">Live demo</span></span>
          </div>
          <div className="relative p-4 md:p-6">{children}</div>
        </div>
        <p className="mt-4 text-sm text-gray-500 text-center">This is a working demo. The real one is built around your business — your data, your rules.</p>
      </div>
      <style>{`
        @keyframes sbfade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sbpop { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes sbtoast { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </section>
  );
}

export function Toasts({ toasts }) {
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 z-30 flex flex-col gap-2 w-[min(19rem,calc(100%-1.5rem))]">
      {toasts.map((t) => {
        const Icon = t.icon || Bell;
        return (
          <div key={t.id} className="pointer-events-auto flex items-start gap-2.5 rounded-lg border border-white/15 bg-[#1a212d]/95 backdrop-blur shadow-xl p-3 motion-safe:animate-[sbtoast_0.35s_cubic-bezier(0.22,1,0.36,1)]">
            <span className={`mt-0.5 inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-md ${t.accent ? 'bg-brand-500/20 text-brand-400' : 'bg-emerald-500/15 text-emerald-400'}`}><Icon className="w-3.5 h-3.5" strokeWidth={1.75} /></span>
            <div className="min-w-0"><p className="text-[12px] text-gray-100 leading-snug">{t.text}</p>{t.sub && <p className="text-[9.5px] uppercase tracking-wider text-gray-500 mt-0.5">{t.sub}</p>}</div>
          </div>
        );
      })}
    </div>
  );
}

let _tid = 0;
export const nextToastId = () => ++_tid;

// Light "below the sandbox" explainer that pairs with LeadCapture
export const SandboxNote = ({ children }) => (
  <section className="bg-white border-t border-gray-200">
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-14">{children}</div>
  </section>
);
