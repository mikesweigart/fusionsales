import React, { useEffect, useState } from 'react';

export default function ReadingProgress({ targetRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = targetRef?.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      if (total <= 0) {
        setProgress(scrolled > 0 ? 1 : 0);
        return;
      }
      setProgress(Math.min(1, Math.max(0, scrolled / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [targetRef]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[55] h-0.5 bg-transparent pointer-events-none">
      <div
        className="h-full bg-brand-600 transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
