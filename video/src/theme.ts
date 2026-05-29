// Brand system, pulled from the FusionSales.ai site (tailwind.config.js):
//   Fraunces (display) + Inter (body); amber accent #d97706 / bright #f59134;
//   dark #111827. Video runs dark with a light Success beat.
import { loadFont as loadFraunces } from '@remotion/google-fonts/Fraunces';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

export const { fontFamily: FRAUNCES } = loadFraunces('normal', {
  weights: ['300', '400', '500'],
  subsets: ['latin'],
});

export const { fontFamily: INTER } = loadInter('normal', {
  weights: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const COLORS = {
  // dark
  bgDark0: '#090c12',
  bgDark1: '#141b2d',
  ink: '#f4f5f7', // near-white on dark
  inkDim: '#9aa3b2', // muted on dark
  hair: 'rgba(255,255,255,0.10)',
  // light (Success beat)
  bgLight0: '#faf7f2',
  bgLight1: '#ffffff',
  inkDark: '#111827',
  inkDarkDim: '#6b7280',
  hairDark: 'rgba(17,24,39,0.12)',
  // accent
  accent: '#f59134', // brand-400 — emphasis only
  accentDeep: '#d97706', // brand-600
};

export const FPS = 30;
export const DURATION = 1800; // 60s

// Scene boundaries (frames @ 30fps)
export const SCENES = {
  hook: { from: 0, dur: 180 }, // 0–6s
  problem: { from: 180, dur: 360 }, // 6–18s
  stakes: { from: 540, dur: 240 }, // 18–26s
  guide: { from: 780, dur: 300 }, // 26–36s
  plan: { from: 1080, dur: 420 }, // 36–50s
  success: { from: 1500, dur: 180 }, // 50–56s
  cta: { from: 1680, dur: 120 }, // 56–60s
};
