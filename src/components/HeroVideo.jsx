import React, { useEffect, useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

/**
 * Muted autoplay loop for the hero, in a browser-style frame.
 * Robust autoplay: force `muted` via ref before play(), retry on the media
 * readiness events, and only show a tap-to-play fallback on a real
 * NotAllowedError (so it never flashes a play button when autoplay would work).
 */
export default function HeroVideo({
  src = '/fusionsales-hero.mp4',
  poster = '/fusionsales-hero-poster.jpg',
}) {
  const ref = useRef(null);
  const [needsTap, setNeedsTap] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Autoplay policies require muted to be true *before* play() is called.
    v.muted = true;
    v.defaultMuted = true;

    const tryPlay = () => {
      v.muted = true;
      const p = v.play();
      if (p && typeof p.then === 'function') {
        p.then(() => setNeedsTap(false)).catch((err) => {
          // Only surface the fallback on a genuine autoplay block.
          if (err && err.name === 'NotAllowedError') setNeedsTap(true);
        });
      }
    };

    tryPlay();
    const events = ['loadedmetadata', 'loadeddata', 'canplay'];
    events.forEach((e) => v.addEventListener(e, tryPlay));
    return () => events.forEach((e) => v.removeEventListener(e, tryPlay));
  }, []);

  const handleTap = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.then === 'function') p.then(() => setNeedsTap(false)).catch(() => {});
  };

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !soundOn;
    v.muted = !next;
    if (next && v.paused) v.play().catch(() => {});
    setSoundOn(next);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-2xl bg-gray-900">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-900 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="ml-3 text-[11px] text-white/40 tracking-wide select-none">fusionsales.ai</span>
      </div>

      <div className="relative">
        <video
          ref={ref}
          className="block w-full aspect-video bg-gray-900"
          src={src}
          poster={poster}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          aria-label="FusionSales.ai explainer — custom software built around your business, not the other way around"
        />
        {needsTap && (
          <button
            type="button"
            onClick={handleTap}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/40"
            aria-label="Play explainer video"
          >
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/95 text-gray-900 shadow-lg">
              <Play className="w-7 h-7 ml-0.5" fill="currentColor" strokeWidth={0} />
            </span>
          </button>
        )}

        {/* Sound toggle — autoplay is muted by policy; let viewers opt into audio */}
        <button
          type="button"
          onClick={toggleSound}
          className="absolute bottom-3 right-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/65 transition"
          aria-label={soundOn ? 'Mute video' : 'Unmute video'}
          aria-pressed={soundOn}
        >
          {soundOn ? <Volume2 className="w-4 h-4" strokeWidth={1.75} /> : <VolumeX className="w-4 h-4" strokeWidth={1.75} />}
        </button>
      </div>
    </div>
  );
}
