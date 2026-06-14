import React, { useState, useEffect, useRef } from 'react';

/* Integrations marquee — an auto-scrolling strip of the enterprise tools a
   custom build connects to. Framed as capability ("works with"), not as
   official partnerships. Pauses on hover; respects reduced motion. */

const LOGOS = [
  { src: '/integrations/microsoft.png', alt: 'Microsoft' },
  { src: '/integrations/netsuite.png', alt: 'Oracle NetSuite' },
  { src: '/integrations/quickbooks.png', alt: 'QuickBooks' },
  { src: '/integrations/procore.png', alt: 'Procore' },
  { src: '/integrations/autodesk.png', alt: 'Autodesk' },
  { src: '/integrations/docusign.png', alt: 'DocuSign' },
  { src: '/integrations/box.png', alt: 'Box' },
  { src: '/integrations/sage.png', alt: 'Sage' },
  { src: '/integrations/kahua.png', alt: 'Kahua' },
];

function useInView(options = { rootMargin: '-10% 0px' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current || inView) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); o.disconnect(); } }, options);
    o.observe(ref.current);
    return () => o.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return [ref, inView];
}
function Reveal({ children, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={['transition-all duration-[800ms] ease-apple will-change-transform', inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.985]', className].join(' ')}>
      {children}
    </div>
  );
}

export default function IntegrationsMarquee() {
  // Duplicate the set so the track can loop seamlessly (-50% lands on the seam).
  const track = [...LOGOS, ...LOGOS];
  return (
    <section className="bg-gray-50 border-b border-gray-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 pt-20 md:pt-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Integrations</p>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
            Your custom build talks to the tools you already run.
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mb-12 leading-relaxed">
            We don&rsquo;t make you rip out your stack. Your software connects to the enterprise
            systems your business already depends on &mdash; so everything works together, and
            nothing gets left behind.
          </p>
        </Reveal>
      </div>

      {/* Full-bleed scrolling logo track */}
      <div className="relative py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-gray-50 to-transparent z-10" />
        <div className="group flex overflow-hidden">
          <div className="flex shrink-0 animate-[fsmarquee_38s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {track.map((l, i) => {
              const dup = i >= LOGOS.length;
              return (
                <div
                  key={i}
                  aria-hidden={dup}
                  className="shrink-0 mr-4 flex items-center justify-center h-[72px] w-[170px] rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-gray-300 hover:shadow-md"
                >
                  <img
                    src={l.src}
                    alt={dup ? '' : `${l.alt} logo`}
                    loading="lazy"
                    width="120"
                    height="32"
                    className="max-h-8 max-w-[124px] w-auto object-contain opacity-90"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20 md:pb-24 pt-10">
        <Reveal>
          <p className="text-sm text-gray-500 max-w-2xl">
            &hellip;and whatever else your business runs on. If it has an API, we connect to it.
          </p>
        </Reveal>
      </div>

      <style>{`@keyframes fsmarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
