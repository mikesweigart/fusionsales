import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Truck, Shield, Stethoscope, Phone,
  LayoutDashboard, FileText, KanbanSquare, Megaphone, Zap,
  Bell, Check, CheckCircle2, ArrowRight, ArrowUpRight, Clock, TrendingUp,
  Users, Mail, MessageSquare, Play, X, ChevronRight, Activity, DollarSign,
} from 'lucide-react';

/* =================================================================
   COMMAND CENTER — a live, simulated business operating system.
   Not a screenshot. Every surface is real React state. Retheme per
   industry to prove "tailored to your business." Built to show an
   SMB what a 2026 custom build actually feels like to operate.
   ================================================================= */

// ---- formatting ----
const usd = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const usdK = (n) => (n >= 1000 ? `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}k` : `$${Math.round(n)}`);
const num = (n) => Math.round(n).toLocaleString('en-US');

const CALENDLY = 'https://calendly.com/mike-fusion-advisory/30min';

// ---- local Reveal (self-contained; matches the site's ease-apple entrance) ----
function useInView(options = { rootMargin: '-10% 0px' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current || inView) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={[
        'transition-all duration-[800ms] ease-apple will-change-transform',
        inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.985]',
        className,
      ].join(' ')}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

// ---- reduced motion ----
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduced;
}

// ---- count-up (animates when scrolled into view; re-runs on key change) ----
function useCountUp(target, key, duration = 1100) {
  const [val, setVal] = useState(target); // SSR / no-JS shows the real number
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reduced) { setVal(target); return; }
    const el = ref.current;
    if (!el) { setVal(target); return; }
    let raf, started = false;
    const animate = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(target * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { started = true; setVal(0); animate(); }
    }, { rootMargin: '-5% 0px' });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, key, reduced]);
  return [val, ref];
}

// =================================================================
// PER-INDUSTRY SIMULATED DATA
// =================================================================
const INDUSTRIES = {
  moving: {
    label: 'Moving', icon: Truck,
    company: 'Acme Commercial Movers', domain: 'ops.acmemovers.com',
    persona: 'Dispatch & sales cockpit',
    kpis: [
      { label: 'Booked this month', value: 284500, fmt: 'usdK', delta: '+18%' },
      { label: 'Active jobs', value: 37, fmt: 'num' },
      { label: 'Avg quote time', value: 90, fmt: 'sec', note: 'was 2 hrs' },
      { label: 'Win rate', value: 62, fmt: 'pct', delta: '+14 pts' },
    ],
    activitySeed: [
      { icon: FileText, text: 'Quote FS-0042 sent to Riverside Logistics', time: 'just now', accent: true },
      { icon: MessageSquare, text: 'Auto follow-up SMS sent — Delta Foods (no reply 48h)', time: '6m' },
      { icon: DollarSign, text: 'Deposit received — Northside Office Move · $5,800', time: '22m' },
      { icon: Users, text: 'New lead from website — Harbor Freight Co.', time: '41m' },
    ],
    activityPool: [
      { icon: FileText, text: 'Quote FS-0048 viewed 3× by Summit Retail', accent: true },
      { icon: MessageSquare, text: 'Crew confirmation texted to 4 movers — Tuesday 7am' },
      { icon: CheckCircle2, text: 'Job #2291 marked delivered — survey auto-sent' },
      { icon: Users, text: 'Inbound call transcribed → lead created: Vertex Mfg.' },
      { icon: DollarSign, text: 'Final invoice paid — Cobb Industrial · $14,200' },
      { icon: Clock, text: 'Reminder: certificate of insurance expires in 7 days' },
    ],
    pipeline: {
      columns: [{ id: 'new', label: 'New' }, { id: 'quoted', label: 'Quoted' }, { id: 'negotiating', label: 'Negotiating' }, { id: 'won', label: 'Won' }],
      deals: [
        { id: 'd1', name: 'Riverside Logistics', sub: 'Warehouse relocation', value: 42000, col: 'quoted', days: 2, touches: 5, next: 'Auto follow-up SMS in 1 day' },
        { id: 'd2', name: 'Summit Retail Group', sub: '6-store rollout', value: 88000, col: 'negotiating', days: 4, touches: 9, next: 'Rep call scheduled — tomorrow 2pm' },
        { id: 'd3', name: 'Harbor Freight Co.', sub: 'Office move, 12k sqft', value: 19500, col: 'new', days: 0, touches: 1, next: 'Quote auto-drafting…' },
        { id: 'd4', name: 'Delta Foods', sub: 'Cold-storage equipment', value: 56000, col: 'quoted', days: 3, touches: 6, next: 'Reminder email queued' },
        { id: 'd5', name: 'Cobb Industrial', sub: 'Plant floor reconfigure', value: 31000, col: 'won', days: 1, touches: 11, next: 'Deposit invoice sent' },
      ],
    },
    campaign: {
      name: 'Q3 Reactivation — dormant commercial accounts',
      audience: 1200, channelMix: ['Email', 'SMS', 'Voicemail drop'],
      stages: [
        { id: 'sent', label: 'Sequenced', pct: 1.0 },
        { id: 'opened', label: 'Opened', pct: 0.58 },
        { id: 'clicked', label: 'Clicked quote link', pct: 0.21 },
        { id: 'replied', label: 'Replied', pct: 0.08 },
        { id: 'booked', label: 'Booked walkthrough', pct: 0.031 },
      ],
      outcome: 'walkthroughs booked',
    },
    automations: [
      { name: 'Quote viewed twice → nudge', trigger: 'Quote opened 2× in 24h', steps: ['Wait 2h', 'Send SMS to prospect', 'Notify rep in Slack', 'Create follow-up task'], runs: 214 },
      { name: 'No reply → re-engage', trigger: 'No response in 48h', steps: ['Send follow-up email', 'If still quiet, drop voicemail', 'Flag for rep call'], runs: 489 },
      { name: 'Job delivered → review', trigger: 'Job marked delivered', steps: ['Send satisfaction survey', 'If 5★, request Google review', 'Tag account for re-marketing'], runs: 612 },
    ],
    quote: {
      docPrefix: 'QUOTE', docNumber: 'FS-2026-0042', client: 'Riverside Logistics',
      types: [{ value: 'office', label: 'Office Move' }, { value: 'warehouse', label: 'Warehouse / Logistics' }, { value: 'industrial', label: 'Industrial / Equipment' }],
      sizes: [{ value: 'small', label: 'Small', desc: '< 2k sqft' }, { value: 'medium', label: 'Medium', desc: '2k–10k sqft' }, { value: 'large', label: 'Large', desc: '10k+ sqft' }],
      slider: { label: 'Distance', min: 5, max: 500, step: 5, def: 50, fmt: (v) => `${v} mi` },
      compute: ({ type, size, slider }) => {
        const base = { small: 2400, medium: 5800, large: 12000 }[size];
        const mult = { office: 1, warehouse: 1.18, industrial: 1.35 }[type];
        const crew = { small: 2, medium: 4, large: 6 }[size];
        const hrs = { small: 4, medium: 8, large: 16 }[size];
        return [
          { label: `${type === 'office' ? 'Office Move' : type === 'warehouse' ? 'Warehouse / Logistics' : 'Industrial'} — ${size}`, amount: Math.round(base * mult) },
          { label: `Crew (${crew} movers, ${hrs} hrs)`, amount: crew * hrs * 75 },
          { label: `Truck (26-ft) — ${slider} mi`, amount: Math.round(350 + Math.max(0, slider - 25) * 4.25) },
          { label: 'Full packing service', amount: Math.round(base * 0.32 * mult) },
        ];
      },
    },
  },

  insurance: {
    label: 'Insurance', icon: Shield,
    company: 'Pinnacle Insurance Group', domain: 'book.pinnacleins.com',
    persona: 'Producer & renewal cockpit',
    kpis: [
      { label: 'Premium bound (MTD)', value: 612000, fmt: 'usdK', delta: '+9%' },
      { label: 'Renewals at risk', value: 14, fmt: 'num', note: 'flagged early' },
      { label: 'Avg quote-to-bind', value: 11, fmt: 'min', note: 'was 2 days' },
      { label: 'Cross-sell rate', value: 28, fmt: 'pct', delta: '+11 pts' },
    ],
    activitySeed: [
      { icon: Shield, text: 'Renewal flagged 90 days early — Vance Manufacturing', time: 'just now', accent: true },
      { icon: MessageSquare, text: 'Cross-sell nudge: umbrella policy → 6 eligible clients', time: '9m' },
      { icon: DollarSign, text: 'Policy bound — Cyber liability · $1,850/yr', time: '27m' },
      { icon: Users, text: 'New quote request — Atlas Logistics (Comm. Auto)', time: '44m' },
    ],
    activityPool: [
      { icon: Shield, text: 'Retention score dropped on 3 accounts — rep alerted', accent: true },
      { icon: Mail, text: 'Renewal packet auto-sent — 22 policies, 60 days out' },
      { icon: CheckCircle2, text: 'COI generated & emailed — Harbor Construction' },
      { icon: Users, text: 'Lead assigned to producer by line of business' },
      { icon: DollarSign, text: 'Multi-policy discount applied — saved client $1,240' },
      { icon: Clock, text: 'E&O documentation reminder cleared for 8 files' },
    ],
    pipeline: {
      columns: [{ id: 'new', label: 'New' }, { id: 'quoted', label: 'Quoted' }, { id: 'negotiating', label: 'Underwriting' }, { id: 'won', label: 'Bound' }],
      deals: [
        { id: 'd1', name: 'Atlas Logistics', sub: 'Commercial auto · 40 units', value: 88000, col: 'quoted', days: 1, touches: 4, next: 'Carrier quotes auto-compared' },
        { id: 'd2', name: 'Vance Manufacturing', sub: 'Renewal + cyber add-on', value: 142000, col: 'negotiating', days: 5, touches: 8, next: 'Producer review — today 4pm' },
        { id: 'd3', name: 'Crestview Dental', sub: 'GL + workers comp', value: 23500, col: 'new', days: 0, touches: 1, next: 'Quote auto-drafting…' },
        { id: 'd4', name: 'Summit Builders', sub: 'Property & casualty', value: 67000, col: 'quoted', days: 3, touches: 5, next: 'Follow-up email queued' },
        { id: 'd5', name: 'Harbor Construction', sub: 'Umbrella + GL', value: 39000, col: 'won', days: 2, touches: 10, next: 'COI issued automatically' },
      ],
    },
    campaign: {
      name: 'Renewal save — accounts with falling retention scores',
      audience: 340, channelMix: ['Email', 'Producer call task', 'Direct mail'],
      stages: [
        { id: 'sent', label: 'Engaged', pct: 1.0 },
        { id: 'opened', label: 'Opened', pct: 0.64 },
        { id: 'clicked', label: 'Reviewed offer', pct: 0.33 },
        { id: 'replied', label: 'Responded', pct: 0.19 },
        { id: 'booked', label: 'Renewal saved', pct: 0.12 },
      ],
      outcome: 'renewals saved',
    },
    automations: [
      { name: 'Retention score drop → save play', trigger: 'Score falls below threshold', steps: ['Alert producer', 'Draft personalized offer', 'Schedule call task', 'Queue direct-mail piece'], runs: 167 },
      { name: 'Renewal 90 days out', trigger: 'Policy enters renewal window', steps: ['Auto-assemble renewal packet', 'Compare carrier rates', 'Send to producer for review'], runs: 731 },
      { name: 'Cross-sell signal', trigger: 'Client has gap in coverage', steps: ['Surface next-best policy', 'Draft tailored email', 'Add to producer worklist'], runs: 398 },
    ],
    quote: {
      docPrefix: 'POLICY QUOTE', docNumber: 'FS-INS-0117', client: 'Atlas Logistics',
      types: [{ value: 'auto', label: 'Commercial Auto' }, { value: 'gl', label: 'General Liability' }, { value: 'property', label: 'Property & Casualty' }],
      sizes: [{ value: 'small', label: 'Standard', desc: 'up to $1M' }, { value: 'medium', label: 'Enhanced', desc: '$1M–$5M' }, { value: 'large', label: 'Premium', desc: '$5M+' }],
      slider: { label: 'Revenue insured', min: 250000, max: 10000000, step: 50000, def: 1500000, fmt: (v) => usdK(v) },
      compute: ({ type, size, slider }) => {
        const rate = { auto: 0.012, gl: 0.008, property: 0.010 }[type];
        const tier = { small: 1, medium: 1.25, large: 1.6 }[size];
        const premium = Math.round(slider * rate * tier);
        return [
          { label: `${type === 'auto' ? 'Commercial Auto' : type === 'gl' ? 'General Liability' : 'Property & Casualty'} — ${size}`, amount: premium },
          { label: 'Risk-adjusted modifier (8%)', amount: Math.round(premium * 0.08) },
          { label: 'Cyber liability rider', amount: 1850 },
          { label: 'Multi-policy discount (7%)', amount: -Math.round(premium * 0.07) },
        ];
      },
    },
  },

  healthcare: {
    label: 'Healthcare', icon: Stethoscope,
    company: 'Caring Health Partners', domain: 'care.caringhealth.com',
    persona: 'Front-office & intake cockpit',
    kpis: [
      { label: 'Net collections (MTD)', value: 418000, fmt: 'usdK', delta: '+12%' },
      { label: 'No-show rate', value: 6, fmt: 'pct', note: 'was 19%' },
      { label: 'Intake time', value: 4, fmt: 'min', note: 'was 35 min' },
      { label: 'Schedule fill', value: 91, fmt: 'pct', delta: '+16 pts' },
    ],
    activitySeed: [
      { icon: MessageSquare, text: 'Appointment reminders sent — 142 patients, tomorrow', time: 'just now', accent: true },
      { icon: Users, text: 'New patient intake completed online — chart auto-created', time: '11m' },
      { icon: CheckCircle2, text: 'Insurance eligibility verified — 38 visits', time: '24m' },
      { icon: DollarSign, text: 'Copay collected at booking — $40 · Telehealth', time: '38m' },
    ],
    activityPool: [
      { icon: MessageSquare, text: 'Waitlist auto-filled a canceled 2pm slot', accent: true },
      { icon: Mail, text: 'Post-visit care plan emailed — 27 patients' },
      { icon: CheckCircle2, text: 'Recall reminders sent — annual physicals due' },
      { icon: Users, text: 'Referral routed to specialty queue automatically' },
      { icon: DollarSign, text: 'Outstanding balance text → patient paid $120' },
      { icon: Clock, text: 'Prior-auth status updated for 5 procedures' },
    ],
    pipeline: {
      columns: [{ id: 'new', label: 'Inquiry' }, { id: 'quoted', label: 'Scheduled' }, { id: 'negotiating', label: 'In care' }, { id: 'won', label: 'Billed' }],
      deals: [
        { id: 'd1', name: 'New patient — R. Alvarez', sub: 'Annual care plan', value: 1140, col: 'quoted', days: 1, touches: 4, next: 'Reminder sequence active' },
        { id: 'd2', name: 'Mercer Group (employer)', sub: 'On-site wellness, 80 staff', value: 24000, col: 'negotiating', days: 6, touches: 7, next: 'Proposal auto-generated' },
        { id: 'd3', name: 'New patient — T. Boon', sub: 'Specialty consult', value: 320, col: 'new', days: 0, touches: 1, next: 'Intake link sent' },
        { id: 'd4', name: 'Riverbend HR', sub: 'Annual physicals, 45', value: 13500, col: 'quoted', days: 2, touches: 5, next: 'Scheduling links sent' },
        { id: 'd5', name: 'New patient — J. Okafor', sub: 'Outpatient procedure', value: 2450, col: 'won', days: 3, touches: 9, next: 'Claim submitted automatically' },
      ],
    },
    campaign: {
      name: 'Recall — patients overdue for annual visit',
      audience: 2100, channelMix: ['SMS', 'Email', 'Patient portal'],
      stages: [
        { id: 'sent', label: 'Reached', pct: 1.0 },
        { id: 'opened', label: 'Opened', pct: 0.71 },
        { id: 'clicked', label: 'Tapped book link', pct: 0.34 },
        { id: 'replied', label: 'Started booking', pct: 0.22 },
        { id: 'booked', label: 'Appointment booked', pct: 0.16 },
      ],
      outcome: 'visits booked',
    },
    automations: [
      { name: 'Booking → reminder ladder', trigger: 'Appointment scheduled', steps: ['Confirm by SMS', 'Remind 48h before', 'Remind 2h before', 'If no-show, offer reschedule'], runs: 1840 },
      { name: 'Cancellation → waitlist fill', trigger: 'Slot opens up', steps: ['Find best waitlist match', 'Text the offer', 'Auto-book on accept'], runs: 503 },
      { name: 'Overdue → recall', trigger: 'Patient overdue for visit', steps: ['Send recall reminder', 'Surface in front-desk queue', 'Verify insurance on booking'], runs: 922 },
    ],
    quote: {
      docPrefix: 'PROPOSAL', docNumber: 'FS-HC-0058', client: 'Mercer Group',
      types: [{ value: 'wellness', label: 'Wellness Program' }, { value: 'specialty', label: 'Specialty Consults' }, { value: 'annual', label: 'Annual Care Plans' }],
      sizes: [{ value: 'small', label: 'Single site', desc: '1 location' }, { value: 'medium', label: 'Multi-site', desc: '2–5 sites' }, { value: 'large', label: 'Network', desc: '6+ sites' }],
      slider: { label: 'Patients / mo', min: 50, max: 5000, step: 50, def: 600, fmt: (v) => `${num(v)}/mo` },
      compute: ({ type, size, slider }) => {
        const fee = { wellness: 28, specialty: 65, annual: 95 }[type];
        const tier = { small: 1, medium: 1.4, large: 1.85 }[size];
        return [
          { label: `${type === 'wellness' ? 'Wellness' : type === 'specialty' ? 'Specialty' : 'Annual care'} × ${num(slider)}/mo`, amount: Math.round(fee * slider * 0.18) },
          { label: `Software platform — ${size}`, amount: Math.round(2400 * tier) },
          { label: 'Setup & integration', amount: 1850 },
          { label: 'Patient reminder automation', amount: 480 },
        ];
      },
    },
  },

  outbound: {
    label: 'Outbound', icon: Phone,
    company: 'Outbound Velocity', domain: 'pipeline.outboundvelocity.com',
    persona: 'Revenue & SDR cockpit',
    kpis: [
      { label: 'Pipeline created (MTD)', value: 1240000, fmt: 'usdK', delta: '+31%' },
      { label: 'Meetings booked', value: 84, fmt: 'num', delta: '+22' },
      { label: 'Reply rate', value: 9, fmt: 'pct', note: 'industry avg 2%' },
      { label: 'Speed to lead', value: 47, fmt: 'sec', note: 'was 4 hrs' },
    ],
    activitySeed: [
      { icon: MessageSquare, text: 'Sequence step 3 sent — 480 contacts, "Pricing" segment', time: 'just now', accent: true },
      { icon: Users, text: 'Inbound lead routed & called in 47 seconds — booked', time: '8m' },
      { icon: TrendingUp, text: 'A/B test winner promoted — subject line +34% opens', time: '19m' },
      { icon: CheckCircle2, text: 'Meeting booked → CRM updated, rep notified', time: '33m' },
    ],
    activityPool: [
      { icon: MessageSquare, text: 'Reply detected → AI drafted response for rep approval', accent: true },
      { icon: Users, text: '1,200 net-new contacts enriched & deduped overnight' },
      { icon: CheckCircle2, text: 'No-show auto-rebooked into next open slot' },
      { icon: TrendingUp, text: 'Cadence paused on bounced domains automatically' },
      { icon: Mail, text: 'Personalized opener generated from prospect news' },
      { icon: Clock, text: 'Follow-up task created — hot lead, call within 1h' },
    ],
    pipeline: {
      columns: [{ id: 'new', label: 'Sequenced' }, { id: 'quoted', label: 'Engaged' }, { id: 'negotiating', label: 'Meeting set' }, { id: 'won', label: 'Opportunity' }],
      deals: [
        { id: 'd1', name: 'Northwind SaaS', sub: 'VP Sales · replied', value: 60000, col: 'quoted', days: 1, touches: 6, next: 'AI reply drafted for approval' },
        { id: 'd2', name: 'Beacon Health Tech', sub: 'Demo booked Thursday', value: 120000, col: 'negotiating', days: 3, touches: 8, next: 'Prep brief auto-generated' },
        { id: 'd3', name: 'Cedar Robotics', sub: 'In cadence, step 2', value: 45000, col: 'new', days: 0, touches: 2, next: 'Next touch in 2 days' },
        { id: 'd4', name: 'Lumen Logistics', sub: 'Opened 4×, no reply', value: 85000, col: 'quoted', days: 2, touches: 5, next: 'Channel switch → LinkedIn' },
        { id: 'd5', name: 'Vertex Financial', sub: 'Qualified opportunity', value: 210000, col: 'won', days: 4, touches: 12, next: 'Handed to AE with full history' },
      ],
    },
    campaign: {
      name: 'New logo blitz — "Series B SaaS, 50–200 HC"',
      audience: 3200, channelMix: ['Email', 'LinkedIn', 'Call task', 'Voicemail'],
      stages: [
        { id: 'sent', label: 'Sequenced', pct: 1.0 },
        { id: 'opened', label: 'Opened', pct: 0.61 },
        { id: 'clicked', label: 'Engaged', pct: 0.27 },
        { id: 'replied', label: 'Replied', pct: 0.09 },
        { id: 'booked', label: 'Meetings booked', pct: 0.026 },
      ],
      outcome: 'meetings booked',
    },
    automations: [
      { name: 'Reply → AI assist', trigger: 'Prospect replies', steps: ['Classify intent', 'Draft tailored response', 'Route to rep for 1-click send', 'Update CRM stage'], runs: 1306 },
      { name: 'Inbound → speed to lead', trigger: 'New inbound lead', steps: ['Enrich instantly', 'Route by territory', 'Trigger call task', 'Text the prospect'], runs: 877 },
      { name: 'No engagement → switch channel', trigger: 'Opened 3×, no reply', steps: ['Pause email', 'Send LinkedIn touch', 'Queue voicemail drop'], runs: 1422 },
    ],
    quote: {
      docPrefix: 'PROGRAM PROPOSAL', docNumber: 'FS-SDR-0204', client: 'Northwind SaaS',
      types: [{ value: 'sdr', label: 'SDR-as-a-Service' }, { value: 'abm', label: 'Account-Based Outreach' }, { value: 'email', label: 'Email Sequencing' }],
      sizes: [{ value: 'small', label: 'Starter', desc: '~1 SDR' }, { value: 'medium', label: 'Growth', desc: '2–3 SDRs' }, { value: 'large', label: 'Scale', desc: '4+ SDRs' }],
      slider: { label: 'Meetings target', min: 5, max: 200, step: 5, def: 30, fmt: (v) => `${v}/mo` },
      compute: ({ type, size, slider }) => {
        const rate = { sdr: 185, abm: 250, email: 65 }[type];
        const base = { small: 4500, medium: 8500, large: 14500 }[size];
        return [
          { label: `${type === 'sdr' ? 'SDR-as-a-Service' : type === 'abm' ? 'Account-Based' : 'Email Sequencing'} — ${size}`, amount: base },
          { label: `Booked meetings (${slider}/mo target)`, amount: Math.round(rate * slider) },
          { label: 'Setup & playbook design', amount: 2400 },
          { label: 'CRM integration', amount: 950 },
        ];
      },
    },
  },
};

const ORDER = ['moving', 'insurance', 'healthcare', 'outbound'];
const SURFACES = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'quotes', label: 'Quote builder', icon: FileText },
  { id: 'pipeline', label: 'Pipeline', icon: KanbanSquare },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
  { id: 'automations', label: 'Automations', icon: Zap },
];

const fmtKpi = (raw, fmt) => {
  if (fmt === 'usdK') return usdK(raw);
  if (fmt === 'pct') return `${Math.round(raw)}%`;
  if (fmt === 'sec') return `${Math.round(raw)}s`;
  if (fmt === 'min') return `${Math.round(raw)}m`;
  return num(raw);
};

// =================================================================
// SHARED DARK-SURFACE PRIMITIVES
// =================================================================
const Panel = ({ className = '', children }) => (
  <div className={`rounded-xl border border-white/10 bg-white/[0.03] ${className}`}>{children}</div>
);

// =================================================================
// KPI TILE
// =================================================================
function Kpi({ kpi, idx, industry }) {
  const [val, ref] = useCountUp(kpi.value, `${industry}-${idx}`);
  return (
    <Panel className="p-4 md:p-5">
      <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-2 leading-tight">{kpi.label}</p>
      <div className="flex items-end gap-2" ref={ref}>
        <span className="font-display text-2xl md:text-3xl font-light text-white tabular-nums tracking-tight leading-none">
          {fmtKpi(val, kpi.fmt)}
        </span>
        {kpi.delta && (
          <span className="text-[11px] font-medium text-emerald-400 mb-0.5 inline-flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" strokeWidth={2} />{kpi.delta}
          </span>
        )}
      </div>
      {kpi.note && <p className="text-[10px] text-gray-500 mt-1.5">{kpi.note}</p>}
    </Panel>
  );
}

// =================================================================
// DASHBOARD VIEW
// =================================================================
function DashboardView({ data, industry, activity }) {
  const totalPipe = data.pipeline.deals.reduce((a, d) => a + d.value, 0);
  const byCol = data.pipeline.columns.map((c) => ({
    ...c, sum: data.pipeline.deals.filter((d) => d.col === c.id).reduce((a, d) => a + d.value, 0),
  }));
  const maxCol = Math.max(...byCol.map((c) => c.sum), 1);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {data.kpis.map((k, i) => <Kpi key={k.label} kpi={k} idx={i} industry={industry} />)}
      </div>
      <div className="grid lg:grid-cols-5 gap-3">
        {/* pipeline snapshot */}
        <Panel className="lg:col-span-3 p-5">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Pipeline by stage</p>
            <p className="text-xs text-gray-500 tabular-nums">{usdK(totalPipe)} open</p>
          </div>
          <div className="space-y-3.5">
            {byCol.map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-xs text-gray-400">{c.label}</span>
                <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-700 ease-out" style={{ width: `${(c.sum / maxCol) * 100}%` }} />
                </div>
                <span className="w-14 shrink-0 text-right text-xs text-gray-300 tabular-nums">{usdK(c.sum)}</span>
              </div>
            ))}
          </div>
        </Panel>
        {/* live activity */}
        <Panel className="lg:col-span-2 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-3.5 h-3.5 text-brand-400" strokeWidth={2} />
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Live activity</p>
            <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] text-emerald-400">
              <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" /></span>
              live
            </span>
          </div>
          <div className="space-y-3">
            {activity.slice(0, 5).map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={a.key ?? i} className="flex items-start gap-2.5 motion-safe:animate-[ccfade_0.5s_ease-out]">
                  <span className={`mt-0.5 inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-md ${a.accent ? 'bg-brand-500/15 text-brand-400' : 'bg-white/[0.06] text-gray-400'}`}>
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12.5px] text-gray-200 leading-snug">{a.text}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}

// =================================================================
// QUOTE BUILDER VIEW (interactive, recomputes live)
// =================================================================
function QuoteView({ data, onSend }) {
  const q = data.quote;
  const [type, setType] = useState(q.types[0].value);
  const [size, setSize] = useState(q.sizes[1].value);
  const [slider, setSlider] = useState(q.slider.def);
  const [sent, setSent] = useState(false);
  useEffect(() => { setType(q.types[0].value); setSize(q.sizes[1].value); setSlider(q.slider.def); setSent(false); }, [q]);

  const items = useMemo(() => q.compute({ type, size, slider }), [q, type, size, slider]);
  const subtotal = items.reduce((a, b) => a + b.amount, 0);
  const tax = Math.round(Math.max(0, subtotal) * 0.07);
  const total = subtotal + tax;

  return (
    <div className="grid lg:grid-cols-2 gap-3">
      {/* controls */}
      <Panel className="p-5 space-y-5">
        <div>
          <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-2 block">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-brand-400/60 transition">
            {q.types.map((t) => <option key={t.value} value={t.value} className="bg-[#11161f] text-gray-100">{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-2 block">Tier</label>
          <div className="grid grid-cols-3 gap-2">
            {q.sizes.map((s) => {
              const on = size === s.value;
              return (
                <button key={s.value} onClick={() => setSize(s.value)} className={`rounded-lg border px-2 py-2.5 text-left transition ${on ? 'border-brand-400 bg-brand-500/15' : 'border-white/10 bg-white/[0.02] hover:border-white/25'}`}>
                  <div className={`text-xs ${on ? 'text-white' : 'text-gray-300'}`}>{s.label}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{s.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] uppercase tracking-[0.18em] text-gray-400">{q.slider.label}</label>
            <span className="text-xs text-brand-400 tabular-nums font-medium">{q.slider.fmt(slider)}</span>
          </div>
          <input type="range" min={q.slider.min} max={q.slider.max} step={q.slider.step} value={slider} onChange={(e) => setSlider(Number(e.target.value))} className="cc-range w-full" />
        </div>
      </Panel>

      {/* live document */}
      <Panel className="p-5 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">{q.docPrefix}</p>
            <p className="text-sm text-gray-200 tabular-nums">{q.docNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">For</p>
            <p className="text-sm text-gray-200">{q.client}</p>
          </div>
        </div>
        <div className="space-y-2.5 border-t border-white/10 pt-4 flex-1">
          {items.map((it, i) => (
            <div key={i} className="flex items-baseline justify-between gap-3">
              <span className="text-xs text-gray-300">{it.label}</span>
              <span className={`text-xs tabular-nums shrink-0 ${it.amount < 0 ? 'text-emerald-400' : 'text-gray-200'}`}>{it.amount < 0 ? `-${usd(-it.amount)}` : usd(it.amount)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 mt-4 pt-3 space-y-1.5">
          <div className="flex justify-between text-xs text-gray-400"><span>Subtotal</span><span className="tabular-nums">{usd(subtotal)}</span></div>
          <div className="flex justify-between text-xs text-gray-400"><span>Tax (7%)</span><span className="tabular-nums">{usd(tax)}</span></div>
          <div className="flex justify-between items-baseline pt-1">
            <span className="text-sm text-white">Total</span>
            <span className="font-display text-2xl font-light text-white tabular-nums tracking-tight">{usd(total)}</span>
          </div>
        </div>
        <button
          onClick={() => { setSent(true); onSend(q.client); }}
          disabled={sent}
          className={`mt-4 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${sent ? 'bg-emerald-500/15 text-emerald-400 cursor-default' : 'bg-brand-500 text-white hover:bg-brand-400'}`}
        >
          {sent ? <><Check className="w-4 h-4" /> Sent &amp; logged</> : <>Send quote <ArrowRight className="w-4 h-4" /></>}
        </button>
      </Panel>
    </div>
  );
}

// =================================================================
// PIPELINE VIEW (kanban + click-to-open deal popover)
// =================================================================
function PipelineView({ data }) {
  const [open, setOpen] = useState(null);
  const deal = data.pipeline.deals.find((d) => d.id === open);
  return (
    <div className="relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {data.pipeline.columns.map((col) => {
          const deals = data.pipeline.deals.filter((d) => d.col === col.id);
          const sum = deals.reduce((a, d) => a + d.value, 0);
          return (
            <div key={col.id}>
              <div className="flex items-center justify-between mb-2.5 px-0.5">
                <span className="text-[11px] uppercase tracking-[0.16em] text-gray-400">{col.label}</span>
                <span className="text-[10px] text-gray-500 tabular-nums">{usdK(sum)}</span>
              </div>
              <div className="space-y-2">
                {deals.map((d) => (
                  <button key={d.id} onClick={() => setOpen(d.id)} className="w-full text-left rounded-lg border border-white/10 bg-white/[0.03] hover:border-brand-400/50 hover:bg-white/[0.05] p-3 transition group">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[12.5px] text-gray-100 leading-tight">{d.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-brand-400 transition shrink-0 mt-0.5" />
                    </div>
                    <p className="text-[10.5px] text-gray-500 mt-0.5 leading-tight">{d.sub}</p>
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-xs text-gray-200 tabular-nums">{usdK(d.value)}</span>
                      <span className="text-[10px] text-gray-500 inline-flex items-center gap-1"><Zap className="w-2.5 h-2.5 text-brand-400" strokeWidth={2} />{d.touches}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deal detail popover — the "pop up" with the automated follow-up timeline */}
      {deal && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-2 motion-safe:animate-[ccfade_0.25s_ease-out]" onClick={() => setOpen(null)}>
          <div className="absolute inset-0 bg-[#0a0d13]/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-xl border border-white/15 bg-[#141a24] shadow-2xl p-6 motion-safe:animate-[ccpop_0.28s_cubic-bezier(0.22,1,0.36,1)]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition"><X className="w-4 h-4" /></button>
            <p className="text-[10px] uppercase tracking-[0.18em] text-brand-400 mb-1.5">Deal</p>
            <h4 className="font-display text-xl font-light text-white leading-tight">{deal.name}</h4>
            <p className="text-xs text-gray-400 mt-1">{deal.sub}</p>
            <div className="grid grid-cols-3 gap-2 mt-5">
              <div className="rounded-lg bg-white/[0.04] p-3"><p className="text-[9px] uppercase tracking-wider text-gray-500">Value</p><p className="text-sm text-white tabular-nums mt-1">{usdK(deal.value)}</p></div>
              <div className="rounded-lg bg-white/[0.04] p-3"><p className="text-[9px] uppercase tracking-wider text-gray-500">Days in stage</p><p className="text-sm text-white tabular-nums mt-1">{deal.days}</p></div>
              <div className="rounded-lg bg-white/[0.04] p-3"><p className="text-[9px] uppercase tracking-wider text-gray-500">Auto-touches</p><p className="text-sm text-white tabular-nums mt-1">{deal.touches}</p></div>
            </div>
            <div className="mt-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 mb-3">Automated activity</p>
              <div className="space-y-0">
                {['Lead captured & enriched', 'Quote auto-drafted from template', `${deal.touches} follow-ups sent across email + SMS`, 'Rep notified on engagement spike'].map((s, i, arr) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 shrink-0"><Check className="w-3 h-3" strokeWidth={2.5} /></span>
                      {i < arr.length - 1 && <span className="w-px flex-1 bg-white/10 my-1" />}
                    </div>
                    <p className="text-xs text-gray-300 pb-3 leading-snug">{s}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2 rounded-lg border border-brand-400/30 bg-brand-500/10 p-3 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-brand-400 shrink-0" strokeWidth={1.75} />
              <p className="text-xs text-brand-200"><span className="text-gray-400">Next, automatically:</span> {deal.next}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =================================================================
// CAMPAIGN VIEW (the outbound simulator — animated funnel)
// =================================================================
function CampaignView({ data, onToast }) {
  const c = data.campaign;
  const reduced = usePrefersReducedMotion();
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [counts, setCounts] = useState(() => c.stages.map(() => 0));
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { setRunning(false); setDone(false); setCounts(c.stages.map(() => 0)); timers.current.forEach(clearTimeout); }, [c]);

  const targets = c.stages.map((s) => Math.round(c.audience * s.pct));
  const booked = targets[targets.length - 1];

  const run = useCallback(() => {
    if (running) return;
    timers.current.forEach(clearTimeout); timers.current = [];
    setDone(false); setRunning(true);
    if (reduced) {
      setCounts(targets); setRunning(false); setDone(true);
      onToast({ icon: CheckCircle2, text: `${num(booked)} ${c.outcome} — fully automated`, accent: true });
      return;
    }
    setCounts(c.stages.map(() => 0));
    const perStage = 720;
    const steps = 18;
    c.stages.forEach((stage, si) => {
      const tgt = targets[si];
      for (let k = 1; k <= steps; k++) {
        timers.current.push(setTimeout(() => {
          setCounts((prev) => { const n = [...prev]; n[si] = Math.round(tgt * (k / steps)); return n; });
        }, si * perStage + (k / steps) * perStage));
      }
      timers.current.push(setTimeout(() => {
        if (si === 1) onToast({ icon: Mail, text: `${num(targets[1])} opened the first touch`, accent: false });
        if (si === 3) onToast({ icon: MessageSquare, text: `${num(targets[3])} replies — AI drafting responses`, accent: false });
      }, si * perStage + perStage * 0.6));
    });
    timers.current.push(setTimeout(() => {
      setRunning(false); setDone(true);
      onToast({ icon: CheckCircle2, text: `${num(booked)} ${c.outcome} — hands-off`, accent: true });
    }, c.stages.length * perStage + 200));
  }, [running, reduced, c, targets, booked, onToast]);

  const maxT = targets[0] || 1;
  return (
    <div className="space-y-3">
      <Panel className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500 mb-1">Outbound campaign</p>
            <p className="text-sm text-gray-100 leading-snug">{c.name}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
              <span className="text-[11px] text-gray-400 inline-flex items-center gap-1"><Users className="w-3 h-3" />{num(c.audience)} contacts</span>
              {c.channelMix.map((ch) => <span key={ch} className="text-[10px] text-gray-400 rounded-full border border-white/10 px-2 py-0.5">{ch}</span>)}
            </div>
          </div>
          <button onClick={run} disabled={running} className={`shrink-0 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${running ? 'bg-white/10 text-gray-400 cursor-wait' : done ? 'bg-white/10 text-gray-200 hover:bg-white/15' : 'bg-brand-500 text-white hover:bg-brand-400'}`}>
            {running ? <>Running…</> : done ? <>Run again</> : <><Play className="w-4 h-4" fill="currentColor" strokeWidth={0} /> Run campaign</>}
          </button>
        </div>
      </Panel>

      <Panel className="p-5">
        <div className="space-y-3.5">
          {c.stages.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <span className="w-32 sm:w-40 shrink-0 text-xs text-gray-300">{s.label}</span>
              <div className="flex-1 h-7 rounded-md bg-white/[0.05] overflow-hidden relative">
                <div className={`h-full rounded-md transition-all duration-300 ease-out ${i === c.stages.length - 1 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-brand-500/80 to-brand-400/80'}`} style={{ width: `${(counts[i] / maxT) * 100}%` }} />
                <span className="absolute inset-y-0 left-2.5 flex items-center text-[11px] text-white/90 tabular-nums font-medium">{num(counts[i])}</span>
              </div>
              <span className="w-10 shrink-0 text-right text-[10px] text-gray-500 tabular-nums">{Math.round(s.pct * 100)}%</span>
            </div>
          ))}
        </div>
        {done && (
          <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3 flex items-center gap-2.5 motion-safe:animate-[ccfade_0.4s_ease-out]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.75} />
            <p className="text-xs text-emerald-200"><span className="font-medium text-white tabular-nums">{num(booked)}</span> {c.outcome} from {num(c.audience)} contacts — every touch, reply, and handoff ran automatically.</p>
          </div>
        )}
      </Panel>
    </div>
  );
}

// =================================================================
// AUTOMATIONS VIEW (workflow chains + test-run animation)
// =================================================================
function AutomationView({ data, industry }) {
  const [testing, setTesting] = useState(null); // {rule, step}
  const reduced = usePrefersReducedMotion();
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { setTesting(null); timers.current.forEach(clearTimeout); }, [industry]);

  const test = (ri) => {
    timers.current.forEach(clearTimeout); timers.current = [];
    const steps = data.automations[ri].steps.length;
    if (reduced) { setTesting({ rule: ri, step: steps }); return; }
    setTesting({ rule: ri, step: 0 });
    for (let k = 1; k <= steps; k++) {
      timers.current.push(setTimeout(() => setTesting({ rule: ri, step: k }), k * 520));
    }
    timers.current.push(setTimeout(() => setTesting({ rule: ri, step: steps, done: true }), steps * 520 + 600));
  };

  return (
    <div className="space-y-3">
      {data.automations.map((rule, ri) => {
        const active = testing?.rule === ri;
        return (
          <Panel key={rule.name} className="p-4 md:p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex w-6 h-6 items-center justify-center rounded-md bg-brand-500/15 text-brand-400 shrink-0"><Zap className="w-3.5 h-3.5" strokeWidth={2} /></span>
                  <p className="text-sm text-gray-100">{rule.name}</p>
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5">When: <span className="text-gray-400">{rule.trigger}</span> · {num(rule.runs)} runs</p>
              </div>
              <button onClick={() => test(ri)} className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-[11px] text-gray-200 hover:border-brand-400/60 hover:text-white transition">
                <Play className="w-3 h-3" fill="currentColor" strokeWidth={0} /> Test run
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-y-2">
              {rule.steps.map((s, si) => {
                const reached = active && testing.step > si;
                const current = active && testing.step === si + 1 && !testing.done;
                return (
                  <React.Fragment key={si}>
                    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] transition-all duration-300 ${reached ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-300' : current ? 'border-brand-400/70 bg-brand-500/15 text-white scale-105' : 'border-white/10 bg-white/[0.03] text-gray-400'}`}>
                      {reached ? <Check className="w-3 h-3" strokeWidth={2.5} /> : <span className={`w-1.5 h-1.5 rounded-full ${current ? 'bg-brand-400' : 'bg-gray-600'}`} />}
                      {s}
                    </span>
                    {si < rule.steps.length - 1 && <ArrowRight className={`w-3.5 h-3.5 mx-1 shrink-0 transition-colors ${reached ? 'text-emerald-400/60' : 'text-gray-600'}`} />}
                  </React.Fragment>
                );
              })}
            </div>
          </Panel>
        );
      })}
    </div>
  );
}

// =================================================================
// TOASTS (autonomous "the system is working" pop-ups)
// =================================================================
function Toasts({ toasts }) {
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 z-30 flex flex-col gap-2 w-[min(20rem,calc(100%-1.5rem))]">
      {toasts.map((t) => {
        const Icon = t.icon || Bell;
        return (
          <div key={t.id} className="pointer-events-auto flex items-start gap-2.5 rounded-lg border border-white/15 bg-[#1a212d]/95 backdrop-blur shadow-xl p-3 motion-safe:animate-[cctoast_0.35s_cubic-bezier(0.22,1,0.36,1)]">
            <span className={`mt-0.5 inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-md ${t.accent ? 'bg-brand-500/20 text-brand-400' : 'bg-emerald-500/15 text-emerald-400'}`}>
              <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="text-[12px] text-gray-100 leading-snug">{t.text}</p>
              <p className="text-[9.5px] uppercase tracking-wider text-gray-500 mt-0.5">automated · just now</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// =================================================================
// ROOT
// =================================================================
let _id = 0;
const nextId = () => ++_id;

export default function CommandCenterDemo() {
  const [industry, setIndustry] = useState('moving');
  const [view, setView] = useState('dashboard');
  const data = INDUSTRIES[industry];
  const reduced = usePrefersReducedMotion();

  // live activity feed (streams new items on a timer)
  const [activity, setActivity] = useState(() => data.activitySeed.map((a) => ({ ...a, key: nextId() })));
  const poolIdx = useRef(0);
  useEffect(() => { setActivity(data.activitySeed.map((a) => ({ ...a, key: nextId() }))); poolIdx.current = 0; }, [industry, data.activitySeed]);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      const pool = data.activityPool;
      const item = pool[poolIdx.current % pool.length];
      poolIdx.current += 1;
      setActivity((prev) => [{ ...item, time: 'just now', key: nextId() }, ...prev.map((p, i) => ({ ...p, time: i === 0 ? '1m' : p.time }))].slice(0, 6));
    }, 5200);
    return () => clearInterval(t);
  }, [industry, data.activityPool, reduced]);

  // toasts
  const [toasts, setToasts] = useState([]);
  const pushToast = useCallback((t) => {
    const id = nextId();
    setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4200);
  }, []);

  // autonomous toasts on a gentle cadence (proof the system runs itself)
  useEffect(() => {
    if (reduced) return;
    const pool = data.activityPool;
    let i = 0;
    const t = setInterval(() => {
      const item = pool[i % pool.length]; i += 1;
      pushToast({ icon: item.icon, text: item.text, accent: item.accent });
    }, 8500);
    return () => clearInterval(t);
  }, [industry, data.activityPool, reduced, pushToast]);

  const reset = (key) => { setIndustry(key); setView('dashboard'); setToasts([]); };

  return (
    <section id="demo" className="border-b border-gray-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Live demo</p>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
            This isn&rsquo;t a screenshot. It&rsquo;s running.
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mb-4 leading-relaxed">
            A working command center &mdash; quotes, pipeline, outbound campaigns, and automations in one place. Switch the industry and watch the whole system retheme. This is the kind of tool we build for a single business: yours would run your workflow, your data, your rules.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mb-10 leading-relaxed">
            Click around. Open a deal. Run the campaign. The notifications firing in the corner are the system working on its own &mdash; follow-ups, handoffs, and updates that normally eat your team&rsquo;s day.
          </p>
        </Reveal>

        {/* Industry switcher */}
        <Reveal>
          <div role="tablist" aria-label="Demo industry" className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {ORDER.map((key) => {
              const c = INDUSTRIES[key];
              const Icon = c.icon;
              const active = industry === key;
              return (
                <button key={key} onClick={() => reset(key)} role="tab" aria-selected={active}
                  className={`px-4 py-3 border text-sm transition flex items-center gap-2 justify-center sm:justify-start ${active ? 'bg-brand-600 text-white border-brand-600 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}>
                  <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* The command center surface (dark app inside the light page) */}
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden border border-gray-900/10 shadow-2xl bg-[#0d1117]">
            {/* glow */}
            <div aria-hidden className="pointer-events-none absolute -inset-x-20 -top-32 h-64 bg-gradient-to-b from-brand-500/15 to-transparent blur-3xl" />

            {/* chrome bar */}
            <div className="relative flex items-center gap-3 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-md bg-white/[0.04] border border-white/10 px-3 py-1 max-w-full">
                  <span className="text-[11px] text-gray-400 truncate">{data.domain}</span>
                  <span className="text-[10px] text-gray-600 hidden sm:inline">· built by FusionSales</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400">
                <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" /></span>
                <span className="hidden sm:inline">Live</span>
              </span>
            </div>

            {/* app body: nav rail + main */}
            <div className="relative flex flex-col md:flex-row min-h-[30rem]">
              {/* nav rail */}
              <div className="md:w-52 shrink-0 border-b md:border-b-0 md:border-r border-white/10 p-2.5 md:p-3">
                <div className="px-2 py-2 mb-1 hidden md:block">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500">{data.company}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{data.persona}</p>
                </div>
                <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
                  {SURFACES.map((s) => {
                    const Icon = s.icon;
                    const on = view === s.id;
                    return (
                      <button key={s.id} onClick={() => setView(s.id)}
                        className={`shrink-0 inline-flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition w-full whitespace-nowrap ${on ? 'bg-brand-500/15 text-white border border-brand-400/30' : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] border border-transparent'}`}>
                        <Icon className={`w-4 h-4 shrink-0 ${on ? 'text-brand-400' : ''}`} strokeWidth={1.75} />
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* main panel */}
              <div className="flex-1 min-w-0 p-3 md:p-5 relative">
                <div key={`${industry}-${view}`} className="motion-safe:animate-[ccfade_0.4s_ease-out]">
                  {view === 'dashboard' && <DashboardView data={data} industry={industry} activity={activity} />}
                  {view === 'quotes' && <QuoteView data={data} onSend={(client) => pushToast({ icon: FileText, text: `Quote sent to ${client} — logged & follow-up scheduled`, accent: true })} />}
                  {view === 'pipeline' && <PipelineView data={data} />}
                  {view === 'campaigns' && <CampaignView data={data} onToast={pushToast} />}
                  {view === 'automations' && <AutomationView data={data} industry={industry} />}
                </div>
                <Toasts toasts={toasts} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* caption */}
        <Reveal>
          <p className="mt-6 text-sm text-gray-500 max-w-3xl leading-relaxed">
            Everything above is one custom application &mdash; the kind a mid-sized business owns outright instead of renting five disconnected tools. <a href="/tools" className="text-gray-800 underline decoration-gray-300 hover:decoration-brand-500 underline-offset-4 hover:text-brand-700 transition">See what your version could do</a>, or <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-gray-800 underline decoration-gray-300 hover:decoration-brand-500 underline-offset-4 hover:text-brand-700 transition">book a 30-minute walkthrough</a>.
          </p>
        </Reveal>
      </div>

      <style>{`
        @keyframes ccfade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ccpop { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes cctoast { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        .cc-range { -webkit-appearance: none; appearance: none; height: 4px; border-radius: 9999px; background: rgba(255,255,255,0.12); outline: none; }
        .cc-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 16px; height: 16px; border-radius: 9999px; background: #f59134; cursor: pointer; border: 2px solid #0d1117; box-shadow: 0 0 0 1px rgba(245,145,52,0.4); transition: transform .15s; }
        .cc-range::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .cc-range::-moz-range-thumb { width: 16px; height: 16px; border-radius: 9999px; background: #f59134; cursor: pointer; border: 2px solid #0d1117; }
        @media (prefers-reduced-motion: reduce) { .cc-range::-webkit-slider-thumb { transition: none; } }
      `}</style>
    </section>
  );
}
