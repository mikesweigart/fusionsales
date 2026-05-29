import React from 'react';
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from 'remotion';
import { COLORS } from './theme';
import {
  Body,
  Display,
  Kicker,
  Lockup,
  MockDashboard,
  MockOwned,
  MockWorkflow,
  Rise,
  useSceneFade,
} from './components';

// Opacity segment helper: 0 → 1 (b) → hold → 1 → 0 (d)
const seg = (frame: number, a: number, b: number, c: number, d: number) =>
  interpolate(frame, [a, b, c, d], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Stage: React.FC<{
  children: React.ReactNode;
  align?: 'center' | 'flex-start';
  justify?: 'center' | 'flex-start';
  opacity?: number;
}> = ({ children, align = 'flex-start', justify = 'center', opacity = 1 }) => (
  <AbsoluteFill
    style={{
      padding: '0 150px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: align,
      justifyContent: justify,
      opacity,
    }}
  >
    {children}
  </AbsoluteFill>
);

// ---- 1. HOOK / HERO -------------------------------------------------------
export const SceneHook: React.FC<{ dur: number }> = ({ dur }) => {
  const o = useSceneFade(dur);
  return (
    <Stage opacity={o}>
      <Rise delay={6}>
        <Display size={104}>
          You just want software that{' '}
          <span style={{ color: COLORS.accent }}>fits</span> your business.
        </Display>
      </Rise>
      <Rise delay={42} style={{ marginTop: 30 }}>
        <Display size={104} color={COLORS.inkDim} weight={300}>
          Instead, you bend your business around it.
        </Display>
      </Rise>
    </Stage>
  );
};

// ---- 2. PROBLEM + VILLAIN -------------------------------------------------
export const SceneProblem: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const o = useSceneFade(dur);
  // three phases inside 360 frames
  const pA = seg(frame, 0, 14, 105, 125);
  const pB = seg(frame, 120, 140, 250, 270);
  const pC = seg(frame, 265, 285, 600, 620); // out-points past scene end; useSceneFade closes it
  return (
    <AbsoluteFill style={{ opacity: o }}>
      {/* Phase A — name the external problem */}
      <Stage opacity={pA}>
        <Display size={100}>Your software was built for someone else.</Display>
        <Body size={42} style={{ marginTop: 36 }} color={COLORS.inkDim}>
          And your team pays for it. Every week.
        </Body>
      </Stage>

      {/* Phase B — the daily, internal pain */}
      <Stage opacity={pB}>
        <Kicker>What it costs you</Kicker>
        {['Hours lost to data entry.', 'Deals slipping through the cracks.', 'Reports that eat your Friday nights.'].map(
          (t, i) => (
            <PainLine key={t} text={t} index={i} active={pB > 0.5} />
          )
        )}
      </Stage>

      {/* Phase C — name the villain */}
      <Stage opacity={pC} justify="center">
        <Body size={40} color={COLORS.inkDim} style={{ marginBottom: 18 }}>
          This is
        </Body>
        <Display size={130} color={COLORS.accent} weight={400}>
          the off-the-shelf tax.
        </Display>
      </Stage>
    </AbsoluteFill>
  );
};

const PainLine: React.FC<{ text: string; index: number; active: boolean }> = ({ text, index }) => (
  <Rise delay={140 + index * 26} y={24} style={{ marginTop: index === 0 ? 8 : 22 }}>
    <Display size={64} weight={300}>
      <span style={{ color: COLORS.accent, marginRight: 22 }}>—</span>
      {text}
    </Display>
  </Rise>
);

// ---- 3. STAKES (40%) ------------------------------------------------------
export const SceneStakes: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const o = useSceneFade(dur);
  const pct = Math.round(
    interpolate(frame, [18, 60], [0, 40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const barFill = interpolate(frame, [18, 60], [0, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <Stage opacity={o} align="center" justify="center">
      <Rise delay={6} style={{ textAlign: 'center' }}>
        <Body size={40} color={COLORS.inkDim}>
          Up to
        </Body>
      </Rise>
      <Rise delay={14} style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'Fraunces',
            fontWeight: 500,
            fontSize: 320,
            lineHeight: 1,
            letterSpacing: -8,
            color: COLORS.accent,
            margin: '8px 0',
          }}
        >
          {pct}%
        </div>
      </Rise>
      {/* spend bar */}
      <div
        style={{
          width: 900,
          height: 16,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.10)',
          overflow: 'hidden',
          margin: '6px 0 36px',
        }}
      >
        <div style={{ width: `${barFill * 100}%`, height: '100%', background: COLORS.accent }} />
      </div>
      <Rise delay={70} style={{ textAlign: 'center', maxWidth: 1200 }}>
        <Display size={56} weight={300} style={{ textAlign: 'center' }}>
          of your software spend pays for features nobody uses.
        </Display>
      </Rise>
      <Rise delay={108} style={{ textAlign: 'center', marginTop: 28 }}>
        <Body size={40} color={COLORS.inkDim}>
          You're renting tools that were never yours.
        </Body>
      </Rise>
    </Stage>
  );
};

// ---- 4. THE GUIDE ---------------------------------------------------------
export const SceneGuide: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const o = useSceneFade(dur);
  const pA = seg(frame, 0, 14, 95, 118);
  const pB = seg(frame, 112, 132, 600, 620); // out-points past scene end; useSceneFade closes it
  return (
    <AbsoluteFill style={{ opacity: o }}>
      {/* Empathy */}
      <Stage opacity={pA} justify="center">
        <Display size={92} weight={300}>
          It's not your fault.
        </Display>
        <Display size={92} weight={300} color={COLORS.inkDim} style={{ marginTop: 18 }}>
          Your software was built for someone else.
        </Display>
      </Stage>

      {/* Authority + logo */}
      <Stage opacity={pB} align="center" justify="center">
        <Rise delay={120}>
          <Lockup dark size={84} />
        </Rise>
        <Rise delay={150} style={{ marginTop: 50, textAlign: 'center', maxWidth: 1300 }}>
          <Display size={72} style={{ textAlign: 'center' }}>
            We build custom software you <span style={{ color: COLORS.accent }}>actually own.</span>
          </Display>
        </Rise>
        <Rise delay={186} style={{ marginTop: 44 }}>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            {['100+ companies transformed', 'OpenAI & Google partners', 'Live in a week'].map((p) => (
              <div
                key={p}
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: 26,
                  color: COLORS.ink,
                  padding: '14px 26px',
                  borderRadius: 999,
                  border: `1px solid ${COLORS.hair}`,
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </Rise>
      </Stage>
    </AbsoluteFill>
  );
};

// ---- 5. THE PLAN (3 steps) ------------------------------------------------
const PlanStep: React.FC<{ n: string; line: React.ReactNode; mock: React.ReactNode; dur: number }> = ({
  n,
  line,
  mock,
  dur,
}) => {
  const o = useSceneFade(dur, 12, 12);
  return (
    <AbsoluteFill
      style={{
        opacity: o,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 150px',
        gap: 70,
      }}
    >
      <div style={{ flex: '0 0 46%' }}>
        <Rise delay={8}>
          <div
            style={{
              fontFamily: 'Fraunces',
              fontWeight: 500,
              fontSize: 150,
              lineHeight: 1,
              color: COLORS.accent,
              marginBottom: 26,
            }}
          >
            {n}
          </div>
        </Rise>
        <Rise delay={24}>
          <Display size={66} weight={400}>
            {line}
          </Display>
        </Rise>
      </div>
      <Rise delay={20} style={{ flex: '0 0 auto' }}>
        {mock}
      </Rise>
    </AbsoluteFill>
  );
};

export const ScenePlan: React.FC<{ dur: number }> = ({ dur }) => {
  const o = useSceneFade(dur, 12, 16);
  const step = Math.floor(dur / 3);
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <div
        style={{
          position: 'absolute',
          top: 90,
          left: 150,
          fontFamily: 'Inter',
          fontWeight: 600,
          fontSize: 24,
          letterSpacing: 8,
          textTransform: 'uppercase',
          color: COLORS.accent,
        }}
      >
        How it works
      </div>
      <Sequence from={0} durationInFrames={step}>
        <PlanStep n="1" line={<>We map how your team actually works.</>} mock={<MockWorkflow />} dur={step} />
      </Sequence>
      <Sequence from={step} durationInFrames={step}>
        <PlanStep n="2" line={<>We build it. You see it every day.</>} mock={<MockDashboard />} dur={step} />
      </Sequence>
      <Sequence from={step * 2} durationInFrames={dur - step * 2}>
        <PlanStep
          n="3"
          line={
            <>
              You go live in weeks — and <span style={{ color: COLORS.accent }}>own it forever.</span>
            </>
          }
          mock={<MockOwned />}
          dur={dur - step * 2}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// ---- 6. SUCCESS (light beat) ----------------------------------------------
export const SceneSuccess: React.FC<{ dur: number }> = ({ dur }) => {
  const o = useSceneFade(dur);
  return (
    <Stage opacity={o} align="center" justify="center">
      <Rise delay={8} style={{ textAlign: 'center', maxWidth: 1400 }}>
        <Display size={88} color={COLORS.inkDark} style={{ textAlign: 'center' }}>
          Now your software fits like it was built for you.
        </Display>
      </Rise>
      <Rise delay={44} style={{ textAlign: 'center', marginTop: 22 }}>
        <Display size={88} color={COLORS.accentDeep} style={{ textAlign: 'center' }}>
          Because it was.
        </Display>
      </Rise>
      <Rise delay={90} style={{ textAlign: 'center', marginTop: 50 }}>
        <Body size={44} color={COLORS.inkDarkDim} weight={500}>
          Your code. Your data.{' '}
          <span style={{ color: COLORS.inkDark, fontWeight: 700 }}>Yours forever.</span>
        </Body>
      </Rise>
    </Stage>
  );
};

// ---- 7. CTA ---------------------------------------------------------------
export const SceneCTA: React.FC<{ dur: number }> = ({ dur }) => {
  const o = useSceneFade(dur, 10, 6);
  return (
    <Stage opacity={o} align="center" justify="center">
      <Rise delay={4}>
        <Lockup dark size={70} />
      </Rise>
      <Rise delay={22} style={{ textAlign: 'center', marginTop: 44, maxWidth: 1500 }}>
        <Display size={78} style={{ textAlign: 'center' }}>
          Stop renting your software.{' '}
          <span style={{ color: COLORS.accent }}>Start owning it.</span>
        </Display>
      </Rise>
      <Rise delay={46} style={{ marginTop: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div
            style={{
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 30,
              color: '#1a1205',
              background: COLORS.accent,
              padding: '20px 38px',
              borderRadius: 12,
            }}
          >
            Schedule a conversation →
          </div>
          <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 27, color: COLORS.inkDim }}>
            or see your ROI in 2 minutes
          </div>
        </div>
      </Rise>
      <Rise delay={70} style={{ marginTop: 40 }}>
        <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 34, letterSpacing: 1, color: COLORS.ink }}>
          fusionsales.ai
        </div>
      </Rise>
    </Stage>
  );
};
