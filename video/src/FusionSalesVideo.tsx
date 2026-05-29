import React from 'react';
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from 'remotion';
import { COLORS, SCENES } from './theme';
import {
  SceneCTA,
  SceneGuide,
  SceneHook,
  ScenePlan,
  SceneProblem,
  SceneStakes,
  SceneSuccess,
} from './scenes';

export const FusionSalesVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // The Success beat (50–56s) flips the world to light, then back to dark for CTA.
  const sFrom = SCENES.success.from;
  const sTo = SCENES.success.from + SCENES.success.dur;
  const light = interpolate(frame, [sFrom - 12, sFrom + 12, sTo - 8, sTo + 10], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDark0 }}>
      {/* Dark base */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(1200px 700px at 50% -10%, rgba(245,145,52,0.10), transparent 60%), linear-gradient(160deg, ${COLORS.bgDark0} 0%, ${COLORS.bgDark1} 100%)`,
        }}
      />
      {/* Light layer (Success) */}
      <AbsoluteFill
        style={{
          opacity: light,
          background: `radial-gradient(1100px 700px at 50% 120%, rgba(245,145,52,0.10), transparent 55%), linear-gradient(160deg, ${COLORS.bgLight0} 0%, ${COLORS.bgLight1} 100%)`,
        }}
      />
      {/* Subtle vignette for depth (only meaningful on dark) */}
      <AbsoluteFill
        style={{
          opacity: 1 - light,
          background: 'radial-gradient(1400px 900px at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      <Sequence from={SCENES.hook.from} durationInFrames={SCENES.hook.dur}>
        <SceneHook dur={SCENES.hook.dur} />
      </Sequence>
      <Sequence from={SCENES.problem.from} durationInFrames={SCENES.problem.dur}>
        <SceneProblem dur={SCENES.problem.dur} />
      </Sequence>
      <Sequence from={SCENES.stakes.from} durationInFrames={SCENES.stakes.dur}>
        <SceneStakes dur={SCENES.stakes.dur} />
      </Sequence>
      <Sequence from={SCENES.guide.from} durationInFrames={SCENES.guide.dur}>
        <SceneGuide dur={SCENES.guide.dur} />
      </Sequence>
      <Sequence from={SCENES.plan.from} durationInFrames={SCENES.plan.dur}>
        <ScenePlan dur={SCENES.plan.dur} />
      </Sequence>
      <Sequence from={SCENES.success.from} durationInFrames={SCENES.success.dur}>
        <SceneSuccess dur={SCENES.success.dur} />
      </Sequence>
      <Sequence from={SCENES.cta.from} durationInFrames={SCENES.cta.dur}>
        <SceneCTA dur={SCENES.cta.dur} />
      </Sequence>
    </AbsoluteFill>
  );
};
