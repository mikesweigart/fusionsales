import React from 'react';

export const Lead = ({ children }) => (
  <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-10 font-light">{children}</p>
);

export const P = ({ children }) => (
  <p className="text-lg text-gray-700 leading-relaxed mb-6">{children}</p>
);

export const H2 = ({ children, id }) => (
  <h2 id={id} className="font-display text-2xl md:text-3xl font-light tracking-tight mt-14 mb-6 text-gray-900 scroll-mt-24">
    {children}
  </h2>
);

export const H3 = ({ children, id }) => (
  <h3 id={id} className="font-display text-xl md:text-2xl font-light tracking-tight mt-10 mb-4 text-gray-900 scroll-mt-24">
    {children}
  </h3>
);

export const Quote = ({ children, attribution }) => (
  <blockquote className="border-l-2 border-brand-600 pl-6 py-1 my-10 text-gray-700 italic text-lg leading-relaxed">
    {children}
    {attribution && (
      <footer className="text-sm text-gray-500 mt-3 not-italic">— {attribution}</footer>
    )}
  </blockquote>
);

export const Callout = ({ children, label }) => (
  <aside className="bg-gray-50 border-l-2 border-brand-600 px-6 py-5 my-8 text-gray-800 leading-relaxed">
    {label && (
      <p className="text-[11px] uppercase tracking-[0.2em] text-brand-700 mb-3 font-medium">{label}</p>
    )}
    {children}
  </aside>
);

export const UL = ({ children }) => (
  <ul className="list-disc list-outside pl-6 mb-6 space-y-2 text-lg text-gray-700 leading-relaxed marker:text-brand-600">
    {children}
  </ul>
);

export const OL = ({ children }) => (
  <ol className="list-decimal list-outside pl-6 mb-6 space-y-2 text-lg text-gray-700 leading-relaxed marker:text-brand-600">
    {children}
  </ol>
);

export const LI = ({ children }) => <li className="leading-relaxed">{children}</li>;

export const Em = ({ children }) => <em className="italic text-gray-900">{children}</em>;

export const Strong = ({ children }) => (
  <strong className="font-medium text-gray-900">{children}</strong>
);

export const A = ({ href, children, external }) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className="text-brand-700 underline decoration-brand-200 decoration-2 underline-offset-4 hover:decoration-brand-600 transition-all"
  >
    {children}
  </a>
);

export const Link = ({ slug, children }) => (
  <a
    href={`/insights/${slug}`}
    className="text-brand-700 underline decoration-brand-200 decoration-2 underline-offset-4 hover:decoration-brand-600 transition-all"
  >
    {children}
  </a>
);
