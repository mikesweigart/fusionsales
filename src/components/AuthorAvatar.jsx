import React from 'react';

const initialsFor = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

// Small deterministic style variation per author (no real avatars yet — initials on a neutral disc)
const SCHEMES = {
  mike: 'bg-gray-900 text-white',
  lauren: 'bg-gray-100 text-gray-900 ring-1 ring-gray-300',
  david: 'bg-brand-50 text-brand-700 ring-1 ring-brand-200',
  sarah: 'bg-gray-800 text-white',
  evan: 'bg-white text-gray-900 ring-1 ring-gray-300',
};

export default function AuthorAvatar({ author, authorKey, size = 'md' }) {
  if (!author) return null;
  const sizes = {
    xs: 'w-7 h-7 text-[10px]',
    sm: 'w-9 h-9 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base',
  };
  return (
    <span
      className={[
        'inline-flex items-center justify-center rounded-full font-medium tracking-tight shrink-0',
        sizes[size],
        SCHEMES[authorKey] || 'bg-gray-100 text-gray-700',
      ].join(' ')}
      aria-hidden="true"
    >
      {initialsFor(author.name)}
    </span>
  );
}
