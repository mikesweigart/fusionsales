import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FRAUNCES, INTER } from './theme';

// ---- Kinetic primitives ---------------------------------------------------

/** Spring-driven rise + fade-in. Use `delay` (frames) to stagger lines on beat. */
export const Rise: React.FC<{
  delay?: number;
  y?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, y = 30, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.8, stiffness: 120 },
  });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const ty = interpolate(s, [0, 1], [y, 0]);
  return <div style={{ opacity, transform: `translateY(${ty}px)`, ...style }}>{children}</div>;
};

/** Scene-level fade: in over first `inF` frames, out over last `outF`. Keeps
 *  cuts from feeling abrupt and gives a soft crossfade over the shared bg. */
export const useSceneFade = (dur: number, inF = 10, outF = 14) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [0, inF, dur - outF, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

/** Small uppercase eyebrow/kicker label. */
export const Kicker: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({
  children,
  dark,
}) => (
  <div
    style={{
      fontFamily: INTER,
      fontWeight: 600,
      fontSize: 24,
      letterSpacing: 8,
      textTransform: 'uppercase',
      color: COLORS.accent,
      marginBottom: 34,
    }}
  >
    {children}
  </div>
);

/** Big display line (Fraunces). */
export const Display: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 96, color = COLORS.ink, weight = 400, style }) => (
  <div
    style={{
      fontFamily: FRAUNCES,
      fontWeight: weight,
      fontSize: size,
      lineHeight: 1.05,
      letterSpacing: -1.5,
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Inter body/support line. */
export const Body: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 36, color = COLORS.inkDim, weight = 400, style }) => (
  <div style={{ fontFamily: INTER, fontWeight: weight, fontSize: size, lineHeight: 1.4, color, ...style }}>
    {children}
  </div>
);

// ---- Logo mark (recreated from og.svg geometry) ---------------------------

export const FMark: React.FC<{ size?: number; square?: string; letter?: string }> = ({
  size = 64,
  square = '#ffffff',
  letter = COLORS.inkDark,
}) => {
  const s = size / 56;
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" style={{ display: 'block' }}>
      <rect width="56" height="56" rx="12" fill={square} />
      <rect x="17.5" y="12.25" width="7" height="31.5" fill={letter} />
      <rect x="17.5" y="12.25" width="24.5" height="7" fill={letter} />
      <rect x="17.5" y="24.5" width="19.25" height="5.25" fill={letter} />
    </svg>
  );
};

export const Wordmark: React.FC<{ color?: string; dim?: string; size?: number }> = ({
  color = COLORS.ink,
  dim = COLORS.inkDim,
  size = 40,
}) => (
  <span style={{ fontFamily: INTER, fontWeight: 500, fontSize: size, letterSpacing: -0.5, color }}>
    FusionSales<span style={{ color: dim, fontWeight: 300 }}>.ai</span>
  </span>
);

export const Lockup: React.FC<{ dark?: boolean; size?: number }> = ({ dark = true, size = 64 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
    <FMark size={size} square={dark ? '#ffffff' : COLORS.inkDark} letter={dark ? COLORS.inkDark : '#ffffff'} />
    <Wordmark
      size={size * 0.62}
      color={dark ? COLORS.ink : COLORS.inkDark}
      dim={dark ? COLORS.inkDim : COLORS.inkDarkDim}
    />
  </div>
);

// ---- Branded UI mocks for the Plan beats ----------------------------------
// Lightweight recreations of the site's preview cards (no real screenshots in
// repo). Built in the brand style so they read as product, not placeholder.

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: `1px solid ${COLORS.hair}`,
  borderRadius: 18,
  padding: 34,
  width: 520,
  boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
};
const chip = (w: number, c = 'rgba(255,255,255,0.16)'): React.CSSProperties => ({
  height: 14,
  width: w,
  borderRadius: 7,
  background: c,
});

/** Step 1 — a "workflow map": labeled nodes connected by a line. */
export const MockWorkflow: React.FC = () => (
  <div style={card}>
    <div style={{ ...chip(120, 'rgba(245,145,52,0.55)'), marginBottom: 28 }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {['Quote', 'Schedule', 'Track', 'Invoice'].map((n, i) => (
        <React.Fragment key={n}>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: INTER,
              fontSize: 20,
              fontWeight: 500,
              color: COLORS.ink,
              padding: '18px 8px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${COLORS.hair}`,
            }}
          >
            {n}
          </div>
          {i < 3 && <div style={{ width: 22, height: 2, background: COLORS.accent }} />}
        </React.Fragment>
      ))}
    </div>
    <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={chip(420)} />
      <div style={chip(360)} />
    </div>
  </div>
);

/** Step 2 — a dashboard with bars (the "you see it daily" preview). */
export const MockDashboard: React.FC<{ animate?: number }> = ({ animate = 1 }) => {
  const bars = [0.5, 0.72, 0.61, 0.88, 0.7, 0.95];
  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
        <div style={chip(160, 'rgba(245,145,52,0.55)')} />
        <div style={chip(70)} />
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: 190 }}>
        {bars.map((b, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${b * 100 * animate}%`,
              borderRadius: 8,
              background:
                i === bars.length - 1
                  ? COLORS.accent
                  : 'linear-gradient(180deg, rgba(255,255,255,0.30), rgba(255,255,255,0.10))',
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: 26, display: 'flex', gap: 14 }}>
        <div style={chip(180)} />
        <div style={chip(120)} />
      </div>
    </div>
  );
};

/** Step 3 — an "owned" badge over a clean app frame. */
export const MockOwned: React.FC = () => (
  <div style={{ ...card, position: 'relative' }}>
    <div style={{ display: 'flex', gap: 10, marginBottom: 26 }}>
      <div style={{ ...chip(14), width: 14, borderRadius: 7 }} />
      <div style={{ ...chip(14), width: 14, borderRadius: 7 }} />
      <div style={{ ...chip(14), width: 14, borderRadius: 7 }} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={chip(440)} />
      <div style={chip(380)} />
      <div style={chip(410)} />
      <div style={chip(300)} />
    </div>
    <div
      style={{
        position: 'absolute',
        right: 28,
        bottom: 28,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: COLORS.accent,
        color: '#1a1205',
        fontFamily: INTER,
        fontWeight: 700,
        fontSize: 22,
        padding: '12px 22px',
        borderRadius: 999,
      }}
    >
      ✓ Yours forever
    </div>
  </div>
);
