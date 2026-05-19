import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
  Menu,
  ChevronDown,
  FileText,
  Calendar,
  Database,
  ClipboardList,
  Workflow,
  BarChart3,
  Truck,
  Shield,
  Stethoscope,
  Phone,
} from 'lucide-react';

// ===== DATA =====

const INDUSTRIES = {
  moving: {
    key: 'moving',
    label: 'Commercial Moving',
    icon: Truck,
    challenge:
      'Your sales team spends hours formatting quotes. Estimating is manual. Follow-ups slip through cracks.',
    solution:
      'Instant quote generation. Automated project tracking. One place for everything.',
    stat: '$32k',
    statLabel: 'Annual software costs eliminated',
    caseStudy: {
      company: '45-person commercial mover',
      pain: 'Quotes took 48 hours. Lost corporate contracts to faster competitors.',
      results: [
        '2-hour quote turnaround (vs. 48 hours)',
        '40% more corporate contracts',
        '25 hours/week recovered for selling',
      ],
      testimonial:
        'We went from losing bids to Fortune 500 facilities to being their preferred mover.',
    },
  },
  insurance: {
    key: 'insurance',
    label: 'Insurance Agencies',
    icon: Shield,
    challenge:
      'Renewals are manual. Cross-sell opportunities slip. Admin crushes your team.',
    solution:
      'Automated renewal reminders. Custom agency tools. Pipeline visibility.',
    stat: '$38k',
    statLabel: 'Annual software costs eliminated',
    caseStudy: {
      company: 'Independent insurance agency (12 people)',
      pain: 'Manual renewal outreach. No cross-sell tracking. Policy lapses climbing.',
      results: [
        '35% higher renewal rates',
        '2.5x more commercial appointments',
        '50% fewer policy lapses',
      ],
      testimonial:
        'The system alerts us to cross-sell opportunities we never would have caught. It’s like having a manager who never sleeps.',
    },
  },
  healthcare: {
    key: 'healthcare',
    label: 'Healthcare Services',
    icon: Stethoscope,
    challenge:
      'Scheduling chaos. No-shows cost thousands. Patient follow-up doesn’t happen.',
    solution:
      'Smart scheduling. Automated reminders. Custom patient workflows.',
    stat: '$28k',
    statLabel: 'Annual software costs eliminated',
    caseStudy: {
      company: 'Multi-location medical clinic',
      pain: '30% no-show rate. Manual scheduling. Elective services have no marketing.',
      results: [
        '60% reduction in no-shows',
        '$180k in new patient revenue',
        '40 hours/week staff time recovered',
      ],
      testimonial:
        'The system reminds patients in their language and handles rescheduling. Our front desk actually helps people now.',
    },
  },
  outbound: {
    key: 'outbound',
    label: 'Outbound Sales / Consulting',
    icon: Phone,
    challenge:
      'Outbound follow-up is inconsistent. Pipeline leaks. No way to track outreach effectiveness.',
    solution:
      'Automated follow-up sequences. Pipeline tracking. Outreach analytics.',
    stat: '$41k',
    statLabel: 'Annual software costs eliminated',
    caseStudy: {
      company: 'B2B SaaS sales team (8 people)',
      pain: 'Manual follow-ups forgotten. No visibility into outreach. Sales process chaotic.',
      results: [
        '3x higher follow-up consistency',
        '45% increase in qualified meetings',
        '30 hours/week recovered',
      ],
      testimonial:
        'Every lead gets touched automatically. Our team stops making excuses about being too busy to follow up.',
    },
  },
};

const INDUSTRY_ORDER = ['moving', 'insurance', 'healthcare', 'outbound'];

const FEATURES = [
  {
    icon: FileText,
    title: 'Quote & Estimate Generators',
    body: 'Your sales reps click one button. Instant quotes. No manual calculations. No formatting. Ready to send.',
  },
  {
    icon: Calendar,
    title: 'Scheduling & Calendar Tools',
    body: 'Automated reminders. Conflict detection. Integrates with your calendar. Customers stop no-showing.',
  },
  {
    icon: Database,
    title: 'Custom CRM Systems',
    body: 'Not another database. Sales tracking built around your process. Clean. Simple. Fast.',
  },
  {
    icon: ClipboardList,
    title: 'Project & Order Tracking',
    body: 'From inquiry to completion. Full visibility. Everyone knows what’s happening. No more questions.',
  },
  {
    icon: Workflow,
    title: 'Automated Workflows',
    body: 'Follow-ups that happen automatically. Tasks that trigger when they should. Your team stops forgetting.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Dashboards',
    body: 'See your pipeline at a glance. Metrics that matter. No confusion. No spreadsheets.',
  },
];

const PHASES = [
  {
    n: '1',
    title: 'We map your workflow',
    body: 'No vague "requirements gathering." We watch how your team actually works, then write a one-page build plan you approve before we touch code.',
    time: 'Week 1',
  },
  {
    n: '2',
    title: 'We build it. You see it daily.',
    body: 'Daily Loom walkthroughs. Working preview links. No black boxes, no surprise invoices. If something feels off in week two, we change it in week two.',
    time: 'Week 2–3',
  },
  {
    n: '3',
    title: 'Your team learns alongside the build',
    body: 'Training happens during the build, not after. By launch day your team is already comfortable. No "we’ll figure it out later" adoption tax.',
    time: 'Week 3',
  },
  {
    n: '4',
    title: 'You start winning. We stay on call.',
    body: 'Live in your business. First-month adjustments are included — and we don’t disappear when the invoice clears.',
    time: 'Week 4+',
  },
];

const PRICING = [
  {
    name: 'Starter',
    price: '$15k',
    note: 'one-time',
    description: 'Small teams. Single workflow.',
    features: ['Quote generator OR scheduling tool', 'Up to 5 people', '1-week implementation', 'Email support'],
    featured: false,
  },
  {
    name: 'Core',
    price: '$35k–$75k',
    note: 'one-time',
    description: 'Growing teams. Multiple workflows.',
    features: ['Quote generator + CRM + Scheduling', '5–15 people', '2–3 week implementation', 'Priority support'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '$100k–$150k',
    note: 'one-time',
    description: 'Larger operations. Complex needs.',
    features: ['Everything custom-built', '15+ people', '3–4 week implementation', '24/7 dedicated support'],
    featured: false,
  },
];

const FAQS = [
  { q: 'How is this different than Salesforce?', a: 'Salesforce is a tool you fit your business around. We build your business into software. That means no forcing workflows, no training people on complex features, no admin overhead. It’s built exactly for you from day one.' },
  { q: 'Do we have to throw out our existing tools?', a: 'No. We integrate with what you’re already using. Email, calendar, payment processors, accounting software — we build on top of it. Keep what works. Replace what doesn’t.' },
  { q: 'What if we need to change something?', a: 'It’s your system. We built it. Updates and adjustments are part of our relationship. Most clients make changes in the first month. We handle it.' },
  { q: 'Is it secure?', a: 'Enterprise-grade security. Built on Google Cloud and OpenAI infrastructure. HIPAA-compliant for healthcare. SOC 2 certified. Your data is encrypted. Regular backups. You own your data.' },
  { q: 'What about training?', a: 'We train your team during week 3. Live sessions. Q&A. Then we’re on call if anyone gets stuck. Most teams are productive on day one.' },
  { q: 'What if we outgrow this?', a: 'It scales with you. Started with a quote generator? Add a CRM. Add scheduling. Add whatever you need. No rip-and-replace. Just build on what’s working.' },
];

const NAV_LINKS = [
  { href: '#problem', label: 'The problem', id: 'problem' },
  { href: '#industries', label: 'Industries', id: 'industries' },
  { href: '#build', label: 'What we build', id: 'build' },
  { href: '#work', label: 'Recent work', id: 'work' },
  { href: '#calculator', label: 'ROI', id: 'calculator' },
  { href: '#pricing', label: 'Pricing', id: 'pricing' },
];

const CALENDLY = 'https://calendly.com/mike-fusion-advisory/30min';

const CLIENTS = [
  { name: 'Flood Brother Movers' },
  { name: 'ProFloors' },
  { name: 'Southeastern Floors' },
  { name: 'ALL Manufacturing' },
  { name: 'JTI Manufacturing' },
  { name: 'Fulton Industrial 3PL' },
  { name: 'National Moving' },
  { name: 'National insurer', confidential: true },
];

const WORK = [
  {
    name: 'Outcome Engine',
    url: 'https://www.outcomeengineai.com',
    industry: 'Sales Ops',
    tagline: 'A forecast you can actually trust.',
    description:
      'AI-powered CRM where reps update deals by voice or text. Builds accurate forecasts and pipeline insights for revenue leaders — without forcing reps to fill out fields after every call.',
  },
  {
    name: 'EchoLogix',
    url: 'https://echologistix.com',
    industry: 'Enterprise Comms',
    tagline: 'One AI platform. A different agent for every client.',
    description:
      'Compliant omnichannel communications — voice, SMS, email, chat — for regulated sectors like healthcare, utilities, and telecom. Each client gets an agent tuned to their rules.',
  },
  {
    name: 'CredTek',
    url: 'https://cred-tek.com',
    industry: 'Behavioral Health',
    tagline: 'Credentialing in 45 days. Not 120.',
    description:
      'Multi-state credentialing automation for behavioral health groups with 50–500 providers. Handles licensing, payor enrollment, and supervision tracking — cutting time-to-revenue by ~60%.',
  },
  {
    name: 'The IT Connection',
    url: 'https://the-it-connection.vercel.app',
    industry: 'Executive Recruiting',
    tagline: 'Why hire when you can scale.',
    description:
      'AI-powered executive search platform for finance and tech leadership roles. Flat-fee pricing replaces traditional percentage-based recruiter markups.',
  },
  {
    name: 'BevTek',
    url: 'https://bevtek.co',
    industry: 'Beverage Retail',
    tagline: 'Hire Megan. Hire Gabby. Stop hiring.',
    description:
      'Two AI personas for independent wine, beer, and spirits shops: Megan trains staff, Gabby handles customer service and texting. Built to cut hiring overhead and lift average ticket size.',
  },
  {
    name: 'RecycleMatch',
    url: 'https://recycle-match.com',
    industry: 'Recycling',
    tagline: 'Southeast recycling marketplace.',
    description:
      'B2B marketplace matching recyclers with material suppliers and buyers across the Southeast. Georgia-first regional focus.',
  },
];

const ADVISORY = {
  name: 'Fusion Advisory',
  url: 'https://fusion-advisory.com',
  tagline: 'Stop guessing where AI fits in your business.',
  description:
    'When clients need strategy before software, we work alongside our consulting partner Fusion Advisory — AI opportunity audits and roadmaps for mid-sized businesses.',
};

// ===== HELPERS =====

const fmtCurrency = (n) => {
  if (!isFinite(n)) return '$0';
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
};

const fmtNumber = (n) => new Intl.NumberFormat('en-US').format(Math.round(n));
const fmtUsd = (n) => `$${new Intl.NumberFormat('en-US').format(Math.round(n))}`;

const fmtMonths = (n) => {
  if (!isFinite(n) || n <= 0) return '<1 mo';
  if (n < 1) return '<1 mo';
  return `${n.toFixed(1).replace(/\.0$/, '')} mo`;
};

// ===== HOOKS =====

function useInView(options = { rootMargin: '-10% 0px' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return [ref, inView];
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids.join('|'), offset]);
  return active;
}

// ===== SHARED SUB-COMPONENTS =====

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={[
        'transition-all duration-700 ease-out will-change-transform',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className,
      ].join(' ')}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

function CountUp({ end, duration = 1400, prefix = '', suffix = '', decimals = 0 }) {
  const [ref, inView] = useInView();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(end * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? val.toFixed(decimals) : Math.round(val)}
      {suffix}
    </span>
  );
}

function Slider({ label, value, min, max, step, display, onChange, formatBound }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <label className="text-sm text-gray-700">{label}</label>
        <span className="text-lg font-light text-gray-900 tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between mt-2 text-xs text-gray-400 tabular-nums">
        <span>{formatBound ? formatBound(min) : min}</span>
        <span>{formatBound ? formatBound(max) : max}</span>
      </div>
    </div>
  );
}

function Stat({ end, suffix = '', prefix = '', decimals = 0, label, raw }) {
  return (
    <div>
      <p className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-2 tabular-nums">
        {raw ? raw : <CountUp end={end} prefix={prefix} suffix={suffix} decimals={decimals} />}
      </p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

function TrustStrip() {
  return (
    <section id="trust" className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-20 md:py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6 text-center">
            Trust &amp; Compliance
          </p>
          <h2 className="font-display text-2xl md:text-4xl font-light leading-tight tracking-tight text-center max-w-3xl mx-auto mb-16">
            Built on infrastructure that scales. Verified by the standards that matter.
          </h2>
        </Reveal>

        {/* Tech partners row */}
        <Reveal>
          <div className="grid md:grid-cols-[160px_1fr] gap-x-12 gap-y-8 items-center pb-10 mb-10 border-b border-gray-200">
            <div className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Built with
            </div>
            <div className="flex flex-wrap items-baseline gap-x-14 gap-y-6">
              <span className="text-2xl md:text-3xl font-medium text-gray-900 tracking-tight">
                OpenAI
              </span>
              <span className="flex items-baseline gap-3">
                <span className="text-2xl md:text-3xl font-medium text-gray-900 tracking-tight">
                  Google
                </span>
                <span className="text-[11px] font-normal text-gray-500 tracking-[0.25em] uppercase">
                  Partner
                </span>
              </span>
              <span className="text-2xl md:text-3xl font-medium text-gray-900 tracking-tight">
                Anthropic
              </span>
            </div>
          </div>
        </Reveal>

        {/* Compliance row */}
        <Reveal delay={80}>
          <div className="grid md:grid-cols-[160px_1fr] gap-x-12 gap-y-8 items-center">
            <div className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Compliance
            </div>
            <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
              <div>
                <p className="text-lg md:text-xl font-medium text-gray-900 tracking-tight">
                  Microsoft Certified
                </p>
                <p className="text-[11px] text-gray-500 tracking-[0.2em] uppercase mt-1">
                  Security · Compliance · Identity
                </p>
              </div>
              <div>
                <p className="text-lg md:text-xl font-medium text-gray-900 tracking-tight">
                  GDPR Compliant
                </p>
                <p className="text-[11px] text-gray-500 tracking-[0.2em] uppercase mt-1">
                  EU Data Protection
                </p>
              </div>
              <div>
                <p className="text-lg md:text-xl font-medium text-gray-900 tracking-tight">
                  HIPAA-ready
                </p>
                <p className="text-[11px] text-gray-500 tracking-[0.2em] uppercase mt-1">
                  SOC 2 in progress
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500 leading-relaxed max-w-3xl mx-auto text-center">
            Your data is encrypted in transit and at rest. Regular backups. You own your data —
            full export, anytime. We don&rsquo;t sell, share, or train on your business information.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Transformation() {
  const wins = [
    'Quotes go out in 2 hours, not 2 days.',
    'Your pipeline updates itself — no more Friday-night reporting.',
    'Follow-ups happen automatically. Nothing slips.',
    'Your team sees one screen, not seven tabs.',
    'You stop paying for software your team doesn’t use.',
    'Your reps are selling. Not data-entering.',
  ];
  return (
    <section id="transformation" className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Ninety days from now</p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-8">
              Your team&rsquo;s day looks
              <span className="text-gray-500"> completely different.</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Software that fits doesn&rsquo;t just save money. It changes how your team spends their hours,
              what your pipeline looks like on Monday morning, and what you stop worrying about at night.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="space-y-6 lg:pl-6 lg:border-l lg:border-gray-200">
              {wins.map((w) => (
                <li key={w} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-50 border border-brand-200">
                    <Check className="w-3.5 h-3.5 text-brand-700" strokeWidth={2.5} />
                  </span>
                  <p className="text-lg text-gray-900 leading-relaxed font-light">{w}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhyNow() {
  return (
    <section id="whynow" className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">The shift</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight max-w-4xl mb-10">
            Custom software used to cost
            <span className="text-gray-500"> half a million dollars.</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          <Reveal delay={80}>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              For decades, building software around your business meant hiring an agency
              for <span className="tabular-nums whitespace-nowrap">$300k–$1M</span>, waiting
              6&ndash;12 months, and hoping the project didn&rsquo;t get shelved at month eight.
              That math kept custom builds locked away from small and medium businesses.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              AI tooling changed everything. Expert teams now ship in weeks what agencies used
              to ship in quarters. The cost collapsed by <span className="text-brand-700 font-medium">roughly 90%</span>.
              Custom-built software &mdash; yours, owned, tailored to exactly how your business works
              &mdash; is finally within reach.
            </p>
          </Reveal>
        </div>

        {/* Three stat callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 border-t border-gray-200 pt-14 mb-16">
          <Reveal>
            <p className="font-display text-6xl md:text-7xl font-light tracking-tight text-brand-600 tabular-nums leading-none">
              10×
            </p>
            <p className="mt-5 text-base text-gray-900 font-medium">Cheaper.</p>
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
              $15k&ndash;$150k flat fee instead of $300k&ndash;$1M agency builds.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-display text-6xl md:text-7xl font-light tracking-tight text-brand-600 tabular-nums leading-none">
              12×
            </p>
            <p className="mt-5 text-base text-gray-900 font-medium">Faster.</p>
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
              Live in 1&ndash;4 weeks instead of 6&ndash;12 months of waiting.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-display text-6xl md:text-7xl font-light tracking-tight text-brand-600 tabular-nums leading-none">
              100%
            </p>
            <p className="mt-5 text-base text-gray-900 font-medium">Yours.</p>
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
              You own the code, the data, and the roadmap. Full transparency.
            </p>
          </Reveal>
        </div>

        {/* The game-changer callout */}
        <Reveal>
          <div className="bg-gray-900 text-white p-10 md:p-16">
            <p className="text-xs uppercase tracking-[0.25em] text-brand-400 mb-6">The game-changer for SMBs</p>
            <h3 className="font-display text-2xl md:text-4xl font-light tracking-tight leading-tight mb-6 max-w-4xl">
              You no longer have to choose between off-the-shelf software that doesn&rsquo;t fit your
              business and custom software that bankrupts you.
            </h3>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl">
              Own your tools. Add AI where it earns its keep &mdash; skip it where it doesn&rsquo;t.
              Get the accountability and transparency that shared SaaS never could.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-gray-900 text-sm md:text-base hover:bg-brand-50 transition"
              >
                Schedule a Conversation <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white text-white text-sm md:text-base hover:bg-white hover:text-gray-900 transition"
              >
                See Your ROI
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HeroPreviewStack() {
  return (
    <div className="space-y-4">
      {/* ---- Quote card ---- */}
      <div className="bg-white border border-gray-200 shadow-sm">
        <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-gray-500">
          <span className="flex items-center gap-2">
            <FileText className="w-3 h-3" strokeWidth={2} />
            Quote
          </span>
          <span className="tabular-nums text-gray-400">FS-2026-0042</span>
        </div>
        <div className="p-5">
          <p className="text-xs text-gray-500 mb-3">Acme Commercial Movers</p>
          <div className="space-y-1.5 text-xs text-gray-700 tabular-nums">
            <div className="flex justify-between">
              <span>Office move — medium</span>
              <span>$5,800</span>
            </div>
            <div className="flex justify-between">
              <span>Crew (4 movers, 8 hrs)</span>
              <span>$2,400</span>
            </div>
            <div className="flex justify-between">
              <span>Truck — 50 mi</span>
              <span>$456</span>
            </div>
            <div className="flex justify-between">
              <span>Full packing service</span>
              <span>$1,856</span>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-baseline">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Total</span>
            <span className="text-xl font-light tabular-nums">$11,250</span>
          </div>
        </div>
        <div className="px-5 py-2 border-t border-gray-200 text-[10px] text-gray-500 flex items-center gap-2">
          <span className="inline-block w-1 h-1 rounded-full bg-brand-600 animate-pulse motion-reduce:animate-none" />
          Generated 0.34s
        </div>
      </div>

      {/* ---- Pipeline card ---- */}
      <div className="bg-white border border-gray-200 shadow-sm">
        <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-gray-500">
          <span className="flex items-center gap-2">
            <BarChart3 className="w-3 h-3" strokeWidth={2} />
            Pipeline
          </span>
          <span className="tabular-nums text-gray-400">Q2</span>
        </div>
        <div className="p-5">
          <p className="text-3xl font-light text-gray-900 tabular-nums">$847k</p>
          <p className="text-xs text-gray-500 mt-1">qualified pipeline</p>
          <p className="text-xs text-emerald-700 mt-2">↑ 23% vs last month</p>

          <div className="flex items-end gap-1 h-12 mt-4">
            {[35, 48, 42, 60, 55, 72, 68, 88, 100].map((h, i) => (
              <div
                key={i}
                className={['flex-1 transition-all', i >= 7 ? 'bg-gray-900' : i >= 5 ? 'bg-gray-500' : 'bg-gray-200'].join(' ')}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs text-gray-700">
            <div>
              <p className="tabular-nums">32</p>
              <p className="text-[10px] text-gray-500">active deals</p>
            </div>
            <div>
              <p className="tabular-nums">12</p>
              <p className="text-[10px] text-gray-500">closing this week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientStrip() {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-14 md:py-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 text-center mb-10">
            Trusted by
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 items-center">
            {CLIENTS.map((c) => (
              <div key={c.name} className="text-center">
                <p
                  className={[
                    'text-sm md:text-base tracking-tight transition',
                    c.confidential
                      ? 'text-gray-500 italic'
                      : 'text-gray-700 font-medium',
                  ].join(' ')}
                >
                  {c.confidential ? `${c.name} (confidential)` : c.name}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CalendlyLink({ children, className, ariaLabel }) {
  return (
    <a
      href={CALENDLY}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

// ===== RECENT WORK =====

function RecentWork() {
  return (
    <section id="work" className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Recent work</p>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
            Real production sites we shipped.
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-16 leading-relaxed">
            Different industries. Different problems. Same approach: build the tool that fits, ship it fast.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {WORK.map((w, idx) => (
            <Reveal key={w.name} delay={idx * 80}>
              <a
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white border border-gray-200 hover:border-gray-900 transition h-full overflow-hidden"
              >
                <div className="relative aspect-[16/10] bg-gray-100 border-b border-gray-200 overflow-hidden">
                  <img
                    src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(w.url)}?w=1200&h=750`}
                    alt={`${w.name} site preview`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      {w.industry}
                    </span>
                    <ArrowUpRight
                      className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-3">
                    {w.name}
                  </h3>
                  <p className="text-base text-gray-500 italic mb-4 font-light">
                    &ldquo;{w.tagline}&rdquo;
                  </p>
                  <p className="text-gray-700 leading-relaxed">{w.description}</p>
                  <p className="mt-6 text-sm text-gray-500 tabular-nums">
                    {w.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Fusion Advisory partner band */}
        <Reveal delay={120}>
          <a
            href={ADVISORY.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block mt-12 bg-gray-900 text-white p-12 md:p-16 transition hover:bg-gray-800"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
              Our consulting partner
            </p>
            <h3 className="font-display text-2xl md:text-4xl font-light tracking-tight mb-4">
              Need strategy before software?
            </h3>
            <p className="text-gray-300 leading-relaxed max-w-2xl mb-6">
              {ADVISORY.description}
            </p>
            <span className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 group-hover:border-white transition">
              Visit Fusion Advisory <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ===== MOBILE MENU =====

function MobileMenu({ open, onClose, activeId }) {
  return (
    <div
      className={[
        'fixed inset-0 z-50 md:hidden transition-opacity duration-200',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
      aria-hidden={!open}
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div
        className={[
          'absolute top-0 left-0 right-0 bg-white border-b border-gray-200 transition-transform duration-300 ease-out',
          open ? 'translate-y-0' : '-translate-y-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
          <span className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="w-6 h-6" width="24" height="24" />
            <span className="text-xl tracking-tight">
              <span className="font-medium">FusionSales</span>
              <span className="text-gray-400">.ai</span>
            </span>
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -mr-2 text-gray-700 hover:text-gray-900"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-col px-4 py-2">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={onClose}
              className={[
                'py-3 text-base transition border-b border-gray-100',
                activeId === l.id ? 'text-gray-900' : 'text-gray-600',
              ].join(' ')}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/insights"
            onClick={onClose}
            className="py-3 text-base text-gray-600 transition border-b border-gray-100"
          >
            Insights
          </a>
          <a
            href={CALENDLY} target="_blank" rel="noopener noreferrer"
            onClick={onClose}
            className="mt-5 mb-2 px-5 py-4 bg-gray-900 text-white text-sm text-center"
          >
            Schedule a Conversation
          </a>
        </nav>
      </div>
    </div>
  );
}

// ===== LIVE QUOTE DEMO =====

// Industry-specific configurations for the live demo
const DEMO_CONFIGS = {
  moving: {
    label: 'Moving',
    icon: Truck,
    company: 'Acme Commercial Movers',
    location: 'Atlanta, GA',
    docPrefix: 'QUOTE',
    docNumber: 'FS-2026-0042',
    typeLabel: 'Move type',
    types: [
      { value: 'office', label: 'Office Move' },
      { value: 'retail', label: 'Retail Relocation' },
      { value: 'warehouse', label: 'Warehouse / Logistics' },
      { value: 'industrial', label: 'Industrial / Equipment' },
    ],
    sizeLabel: 'Size',
    sizes: [
      { value: 'small', label: 'Small', desc: '< 2,000 sqft' },
      { value: 'medium', label: 'Medium', desc: '2,000–10,000 sqft' },
      { value: 'large', label: 'Large', desc: '10,000+ sqft' },
    ],
    sliderLabel: 'Distance',
    sliderMin: 5,
    sliderMax: 500,
    sliderStep: 5,
    sliderDefault: 50,
    sliderFormat: (v) => `${v} mi`,
    sliderBoundFormat: (n) => `${n} mi`,
    addons: [
      { id: 'storage', label: 'Climate-controlled storage', sub: '1 month included', defaultOn: false },
      { id: 'packing', label: 'Full packing service', sub: 'Materials & labor', defaultOn: true },
    ],
    computeLineItems: ({ type, size, sliderValue, addons, getTypeLabel, getSizeLabel }) => {
      const SIZE_BASE = { small: 2400, medium: 5800, large: 12000 };
      const SIZE_HOURS = { small: 4, medium: 8, large: 16 };
      const SIZE_CREW = { small: 2, medium: 4, large: 6 };
      const TYPE_MULT = { office: 1, retail: 1.05, warehouse: 1.18, industrial: 1.35 };
      const items = [];
      items.push({ id: 'base', label: `${getTypeLabel(type)} — ${getSizeLabel(size).toLowerCase()}`, amount: Math.round(SIZE_BASE[size] * TYPE_MULT[type]) });
      items.push({ id: 'crew', label: `Crew (${SIZE_CREW[size]} movers, ${SIZE_HOURS[size]} hrs)`, amount: SIZE_CREW[size] * SIZE_HOURS[size] * 75 });
      items.push({ id: 'truck', label: `Truck (26-ft) — ${sliderValue} mi`, amount: Math.round(350 + Math.max(0, sliderValue - 25) * 4.25) });
      if (addons.storage) items.push({ id: 'storage', label: 'Climate-controlled storage (1 mo)', amount: 650 });
      if (addons.packing) items.push({ id: 'packing', label: 'Full packing service', amount: Math.round(SIZE_BASE[size] * 0.32 * TYPE_MULT[type]) });
      return items;
    },
  },
  insurance: {
    label: 'Insurance',
    icon: Shield,
    company: 'Pinnacle Insurance Group',
    location: 'Underwriter — Atlanta, GA',
    docPrefix: 'POLICY QUOTE',
    docNumber: 'FS-INS-2026-0117',
    typeLabel: 'Coverage type',
    types: [
      { value: 'auto', label: 'Commercial Auto' },
      { value: 'gl', label: 'General Liability' },
      { value: 'wc', label: 'Workers Comp' },
      { value: 'property', label: 'Property & Casualty' },
    ],
    sizeLabel: 'Coverage tier',
    sizes: [
      { value: 'small', label: 'Standard', desc: 'up to $1M' },
      { value: 'medium', label: 'Enhanced', desc: '$1M–$5M' },
      { value: 'large', label: 'Premium', desc: '$5M+' },
    ],
    sliderLabel: 'Annual revenue insured',
    sliderMin: 250000,
    sliderMax: 10000000,
    sliderStep: 50000,
    sliderDefault: 1500000,
    sliderFormat: (v) => fmtCurrency(v),
    sliderBoundFormat: (n) => fmtCurrency(n),
    addons: [
      { id: 'cyber', label: 'Cyber liability rider', sub: 'Data breach coverage', defaultOn: true },
      { id: 'legal', label: 'Legal defense rider', sub: 'Up to $250k included', defaultOn: false },
    ],
    computeLineItems: ({ type, size, sliderValue, addons, getTypeLabel, getSizeLabel }) => {
      const TYPE_RATE = { auto: 0.012, gl: 0.008, wc: 0.015, property: 0.010 };
      const TIER_MULT = { small: 1, medium: 1.25, large: 1.6 };
      const annualPremium = Math.round(sliderValue * TYPE_RATE[type] * TIER_MULT[size]);
      const items = [];
      items.push({ id: 'base', label: `${getTypeLabel(type)} — ${getSizeLabel(size)} tier`, amount: annualPremium });
      items.push({ id: 'risk', label: 'Risk-adjusted modifier (8%)', amount: Math.round(annualPremium * 0.08) });
      if (addons.cyber) items.push({ id: 'cyber', label: 'Cyber liability rider', amount: 1850 });
      if (addons.legal) items.push({ id: 'legal', label: 'Legal defense rider', amount: 950 });
      items.push({ id: 'discount', label: 'Multi-policy discount (7%)', amount: -Math.round(annualPremium * 0.07) });
      return items;
    },
  },
  healthcare: {
    label: 'Healthcare',
    icon: Stethoscope,
    company: 'Caring Health Partners',
    location: 'Multi-site — Southeast US',
    docPrefix: 'PROPOSAL',
    docNumber: 'FS-HC-2026-0058',
    typeLabel: 'Service type',
    types: [
      { value: 'wellness', label: 'Wellness Visits' },
      { value: 'specialty', label: 'Specialty Consults' },
      { value: 'procedure', label: 'Outpatient Procedures' },
      { value: 'annual', label: 'Annual Care Plans' },
    ],
    sizeLabel: 'Tier',
    sizes: [
      { value: 'small', label: 'Standard', desc: 'Single location' },
      { value: 'medium', label: 'Multi-site', desc: '2–5 locations' },
      { value: 'large', label: 'Network', desc: '6+ locations' },
    ],
    sliderLabel: 'Patients per month',
    sliderMin: 50,
    sliderMax: 5000,
    sliderStep: 50,
    sliderDefault: 600,
    sliderFormat: (v) => `${fmtNumber(v)}/mo`,
    sliderBoundFormat: (n) => `${fmtNumber(n)}`,
    addons: [
      { id: 'reminders', label: 'Patient reminder automation', sub: 'SMS + email', defaultOn: true },
      { id: 'reporting', label: 'Outcomes reporting suite', sub: 'CMS-compliant', defaultOn: false },
    ],
    computeLineItems: ({ type, size, sliderValue, addons, getTypeLabel, getSizeLabel }) => {
      const TYPE_FEE = { wellness: 28, specialty: 65, procedure: 145, annual: 95 };
      const TIER_MULT = { small: 1, medium: 1.4, large: 1.85 };
      const items = [];
      items.push({ id: 'base', label: `${getTypeLabel(type)} fee × ${fmtNumber(sliderValue)}/mo`, amount: Math.round(TYPE_FEE[type] * sliderValue * 0.18) });
      items.push({ id: 'platform', label: `Software platform (${getSizeLabel(size)})`, amount: Math.round(2400 * TIER_MULT[size]) });
      items.push({ id: 'setup', label: 'Setup & integration', amount: 1850 });
      if (addons.reminders) items.push({ id: 'reminders', label: 'Patient reminder automation', amount: 480 });
      if (addons.reporting) items.push({ id: 'reporting', label: 'Outcomes reporting suite', amount: 850 });
      return items;
    },
  },
  outbound: {
    label: 'Outbound',
    icon: Phone,
    company: 'Outbound Velocity',
    location: 'Sales acceleration partner',
    docPrefix: 'PROGRAM PROPOSAL',
    docNumber: 'FS-SDR-2026-0204',
    typeLabel: 'Program type',
    types: [
      { value: 'sdr', label: 'SDR-as-a-Service' },
      { value: 'leadgen', label: 'Lead Generation' },
      { value: 'abm', label: 'Account-Based Outreach' },
      { value: 'email', label: 'Email Sequencing' },
    ],
    sizeLabel: 'Tier',
    sizes: [
      { value: 'small', label: 'Starter', desc: '~1 SDR equivalent' },
      { value: 'medium', label: 'Growth', desc: '2–3 SDRs' },
      { value: 'large', label: 'Scale', desc: '4+ SDRs' },
    ],
    sliderLabel: 'Monthly meetings target',
    sliderMin: 5,
    sliderMax: 200,
    sliderStep: 5,
    sliderDefault: 30,
    sliderFormat: (v) => `${v} mtgs/mo`,
    sliderBoundFormat: (n) => `${n}`,
    addons: [
      { id: 'crm', label: 'CRM integration', sub: 'Salesforce / HubSpot / custom', defaultOn: true },
      { id: 'dashboard', label: 'Reporting dashboard', sub: 'Live KPI tracking', defaultOn: false },
    ],
    computeLineItems: ({ type, size, sliderValue, addons, getTypeLabel, getSizeLabel }) => {
      const TYPE_RATE = { sdr: 185, leadgen: 95, abm: 250, email: 65 };
      const TIER_BASE = { small: 4500, medium: 8500, large: 14500 };
      const items = [];
      items.push({ id: 'base', label: `${getTypeLabel(type)} — ${getSizeLabel(size)}`, amount: TIER_BASE[size] });
      items.push({ id: 'meetings', label: `Booked meetings (${sliderValue}/mo target)`, amount: Math.round(TYPE_RATE[type] * sliderValue) });
      items.push({ id: 'setup', label: 'Setup & playbook design', amount: 2400 });
      if (addons.crm) items.push({ id: 'crm', label: 'CRM integration', amount: 950 });
      if (addons.dashboard) items.push({ id: 'dashboard', label: 'Reporting dashboard', amount: 650 });
      return items;
    },
  },
};

const DEMO_INDUSTRY_ORDER = ['moving', 'insurance', 'healthcare', 'outbound'];

function initialAddons(industry) {
  const out = {};
  DEMO_CONFIGS[industry].addons.forEach((a) => { out[a.id] = a.defaultOn; });
  return out;
}

function LiveQuoteDemo() {
  const [industry, setIndustry] = useState('moving');
  const config = DEMO_CONFIGS[industry];

  const [type, setType] = useState(config.types[0].value);
  const [size, setSize] = useState(config.sizes[1].value);
  const [sliderValue, setSliderValue] = useState(config.sliderDefault);
  const [addonState, setAddonState] = useState(() => initialAddons(industry));
  const [genMs, setGenMs] = useState(340);
  const [touched, setTouched] = useState(false);

  // Reset all sub-fields when industry changes
  useEffect(() => {
    const c = DEMO_CONFIGS[industry];
    setType(c.types[0].value);
    setSize(c.sizes[1].value);
    setSliderValue(c.sliderDefault);
    setAddonState(initialAddons(industry));
  }, [industry]);

  const getTypeLabel = (v) => config.types.find((t) => t.value === v)?.label ?? v;
  const getSizeLabel = (v) => config.sizes.find((s) => s.value === v)?.label ?? v;

  const lineItems = useMemo(
    () => config.computeLineItems({ type, size, sliderValue, addons: addonState, getTypeLabel, getSizeLabel }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config, type, size, sliderValue, addonState]
  );

  const subtotal = lineItems.reduce((a, b) => a + b.amount, 0);
  const tax = Math.round(Math.max(0, subtotal) * 0.07);
  const total = subtotal + tax;

  // Generation timer flourish
  useEffect(() => {
    if (!touched) return;
    setGenMs(280 + Math.floor(Math.random() * 160));
  }, [touched, type, size, sliderValue, addonState, industry]);

  const touch = () => !touched && setTouched(true);

  return (
    <section id="demo" className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Live demo</p>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
            Try one yourself.
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-10 leading-relaxed">
            A working quote tool. Pick an industry. Drag the controls. Watch the document re-compute.
            Yours would be tailored to your business — same speed.
          </p>
        </Reveal>

        {/* Industry tabs */}
        <Reveal>
          <div role="tablist" aria-label="Demo industry" className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10">
            {DEMO_INDUSTRY_ORDER.map((key) => {
              const c = DEMO_CONFIGS[key];
              const Icon = c.icon;
              const active = industry === key;
              return (
                <button
                  key={key}
                  onClick={() => { touch(); setIndustry(key); }}
                  role="tab"
                  aria-selected={active}
                  className={[
                    'px-4 py-3 border text-sm transition flex items-center gap-2 justify-center sm:justify-start',
                    active
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400',
                  ].join(' ')}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* ---- Form (2 cols) ---- */}
          <Reveal className="lg:col-span-2">
            <div className="bg-white border border-gray-200 p-8 space-y-8">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
                  {config.typeLabel}
                </label>
                <select
                  value={type}
                  onChange={(e) => { touch(); setType(e.target.value); }}
                  className="w-full border border-gray-200 px-4 py-3 text-gray-900 bg-white focus:outline-none focus:border-gray-900 transition"
                >
                  {config.types.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
                  {config.sizeLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {config.sizes.map((s) => {
                    const active = size === s.value;
                    return (
                      <button
                        key={s.value}
                        onClick={() => { touch(); setSize(s.value); }}
                        className={[
                          'px-3 py-3 border text-sm transition text-left',
                          active
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400',
                        ].join(' ')}
                      >
                        <div>{s.label}</div>
                        <div className={['text-xs mt-0.5', active ? 'text-gray-300' : 'text-gray-500'].join(' ')}>
                          {s.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Slider
                label={config.sliderLabel}
                value={sliderValue}
                min={config.sliderMin}
                max={config.sliderMax}
                step={config.sliderStep}
                display={config.sliderFormat(sliderValue)}
                onChange={(v) => { touch(); setSliderValue(v); }}
                formatBound={config.sliderBoundFormat}
              />

              <div className="space-y-3">
                {config.addons.map((a) => (
                  <Toggle
                    key={a.id}
                    label={a.label}
                    sub={a.sub}
                    checked={!!addonState[a.id]}
                    onChange={(v) => { touch(); setAddonState((s) => ({ ...s, [a.id]: v })); }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* ---- Quote document (3 cols) ---- */}
          <Reveal className="lg:col-span-3" delay={120}>
            <div className="bg-white border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="px-8 md:px-10 py-8 border-b border-gray-200 flex items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">{config.docPrefix}</p>
                  <p className="text-xs text-gray-500 tabular-nums">{config.docNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  <p className="text-xs text-gray-500 mt-1">Valid 30 days</p>
                </div>
              </div>

              <div className="px-8 md:px-10 py-6 grid grid-cols-2 gap-6 border-b border-gray-200">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">From</p>
                  <p className="text-sm text-gray-900">{config.company}</p>
                  <p className="text-xs text-gray-600">{config.location}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">For</p>
                  <p className="text-sm text-gray-900">Customer name</p>
                  <p className="text-xs text-gray-600">Project address</p>
                </div>
              </div>

              <div className="px-8 md:px-10 py-6">
                <div className="grid grid-cols-[1fr_auto] text-[10px] uppercase tracking-[0.25em] text-gray-500 pb-3 border-b border-gray-200">
                  <span>Service</span>
                  <span className="text-right">Amount</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {lineItems.map((item) => (
                    <LineItem key={item.id} label={item.label} amount={item.amount} />
                  ))}
                </div>
              </div>

              <div className="px-8 md:px-10 py-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-700 mb-2 tabular-nums">
                  <span>Subtotal</span>
                  <span>{fmtUsd(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700 mb-4 tabular-nums">
                  <span>Tax (7%)</span>
                  <span>{fmtUsd(tax)}</span>
                </div>
                <div className="flex justify-between items-baseline border-t border-gray-300 pt-4 tabular-nums">
                  <span className="text-xs uppercase tracking-[0.25em] text-gray-500">Total</span>
                  <span className="text-3xl md:text-4xl font-light text-gray-900">{fmtUsd(total)}</span>
                </div>
              </div>

              <div className="px-8 md:px-10 py-4 bg-white border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse motion-reduce:animate-none" />
                  Generated in <span className="tabular-nums">{(genMs / 1000).toFixed(2)}s</span>
                </span>
                <span>Drag the controls — try every industry.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LineItem({ label, amount }) {
  const negative = amount < 0;
  return (
    <div className="grid grid-cols-[1fr_auto] py-3 text-sm transition-all">
      <span className="text-gray-700">{label}</span>
      <span
        className={[
          'tabular-nums text-right',
          negative ? 'text-emerald-700' : 'text-gray-900',
        ].join(' ')}
      >
        {negative ? '−' : ''}{fmtUsd(Math.abs(amount))}
      </span>
    </div>
  );
}

function Toggle({ label, sub, checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={[
        'w-full text-left flex items-center justify-between gap-4 px-4 py-3 border transition',
        checked ? 'border-gray-900 bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-400',
      ].join(' ')}
      aria-pressed={checked}
    >
      <div>
        <div className="text-sm text-gray-900">{label}</div>
        <div className="text-xs text-gray-500">{sub}</div>
      </div>
      <span
        className={[
          'inline-flex items-center justify-center w-6 h-6 rounded-full border transition',
          checked ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-300 bg-white text-transparent',
        ].join(' ')}
      >
        <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
      </span>
    </button>
  );
}

// ===== ROI CALCULATOR (live, single-page) =====

function ROICalculator() {
  const [industry, setIndustry] = useState('moving');
  const [teamSize, setTeamSize] = useState(5);
  const [monthlyCost, setMonthlyCost] = useState(2000);
  const [manualHours, setManualHours] = useState(20);
  const [dealSize, setDealSize] = useState(50000);
  const [showMath, setShowMath] = useState(false);

  // Hydrate state from URL on mount so calculator inputs are shareable
  const hasHydratedRef = useRef(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    const num = (key, min, max, fallback) => {
      const v = Number(p.get(key));
      return Number.isFinite(v) && v >= min && v <= max ? v : fallback;
    };
    if (p.get('industry') && ['moving','insurance','healthcare','outbound'].includes(p.get('industry'))) {
      setIndustry(p.get('industry'));
    }
    setTeamSize(num('team', 1, 50, 5));
    setMonthlyCost(num('cost', 0, 5000, 2000));
    setManualHours(num('hours', 0, 40, 20));
    setDealSize(num('deal', 1000, 500000, 50000));
    hasHydratedRef.current = true;
  }, []);

  // Persist to URL after hydration (replaceState, no history spam)
  useEffect(() => {
    if (!hasHydratedRef.current || typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    p.set('industry', industry);
    p.set('team', String(teamSize));
    p.set('cost', String(monthlyCost));
    p.set('hours', String(manualHours));
    p.set('deal', String(dealSize));
    const newUrl = `${window.location.pathname}?${p.toString()}${window.location.hash}`;
    window.history.replaceState({}, '', newUrl);
  }, [industry, teamSize, monthlyCost, manualHours, dealSize]);

  const results = useMemo(() => {
    const annualSoftwareSavings = monthlyCost * 12 * 0.5;
    const timeRecovered = manualHours * 50 * teamSize;
    const additionalRevenue = teamSize * dealSize * 0.4 * (manualHours / 20);
    const annualValue = annualSoftwareSavings + additionalRevenue;
    const monthlyValue = annualValue / 12;
    const projectCost = teamSize * 700 * 3;
    const paybackMonths = monthlyValue > 0 ? projectCost / monthlyValue : 0;
    return { annualSoftwareSavings, additionalRevenue, timeRecovered, paybackMonths, annualValue };
  }, [monthlyCost, manualHours, teamSize, dealSize]);

  return (
    <section id="calculator" className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">ROI</p>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
            What’s this worth to you?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-16 leading-relaxed">
            Drag the sliders. Numbers update live.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* ---- Inputs ---- */}
          <Reveal>
            <div className="bg-white border border-gray-200 p-8 md:p-10 space-y-10">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
                  Industry
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'moving', label: 'Moving' },
                    { key: 'insurance', label: 'Insurance' },
                    { key: 'healthcare', label: 'Healthcare' },
                    { key: 'outbound', label: 'Outbound' },
                  ].map((i) => (
                    <button
                      key={i.key}
                      onClick={() => setIndustry(i.key)}
                      className={[
                        'px-4 py-3 border text-sm transition',
                        industry === i.key
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400',
                      ].join(' ')}
                    >
                      {i.label}
                    </button>
                  ))}
                </div>
              </div>

              <Slider
                label="Sales team size"
                value={teamSize}
                min={1}
                max={50}
                step={1}
                display={`${teamSize} ${teamSize === 1 ? 'person' : 'people'}`}
              onChange={setTeamSize}
              />
              <Slider
                label="Monthly software spend"
                value={monthlyCost}
                min={0}
                max={5000}
                step={100}
                display={`${fmtUsd(monthlyCost)}/mo`}
                onChange={setMonthlyCost}
                formatBound={(n) => fmtUsd(n)}
              />
              <Slider
                label="Hours per week on manual tasks"
                value={manualHours}
                min={0}
                max={40}
                step={1}
                display={`${manualHours} hrs/wk`}
                onChange={setManualHours}
                formatBound={(n) => `${n} hrs`}
              />
              <Slider
                label="Average deal size"
                value={dealSize}
                min={1000}
                max={500000}
                step={1000}
                display={fmtCurrency(dealSize)}
                onChange={setDealSize}
                formatBound={(n) => fmtCurrency(n)}
              />
            </div>
          </Reveal>

          {/* ---- Results ---- */}
          <Reveal delay={120}>
            <div className="lg:sticky lg:top-24 self-start space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <ResultCard label="Annual software savings" value={fmtCurrency(results.annualSoftwareSavings)} sub="50% reduction in Year 1" />
                <ResultCard label="Additional revenue" value={fmtCurrency(results.additionalRevenue)} sub="From faster quotes & follow-ups" />
                <ResultCard label="Time recovered" value={`${fmtNumber(results.timeRecovered)} hrs`} sub="Hours for actual selling" />
                <ResultCard label="Payback period" value={fmtMonths(results.paybackMonths)} sub="Months to break even" />
              </div>

              <div className="bg-gray-900 text-white p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Total value, year one</p>
                <p className="font-display text-5xl md:text-6xl font-light tracking-tight tabular-nums text-brand-400">
                  {fmtCurrency(results.annualValue)}
                </p>
                <p className="mt-4 text-gray-300 leading-relaxed">
                  Build once. Use forever. Scales with your business.
                </p>
                <a
                  href={CALENDLY} target="_blank" rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm hover:bg-brand-50 transition"
                >
                  Schedule a Conversation <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <button
                onClick={() => setShowMath((v) => !v)}
                className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1.5 mt-2"
                aria-expanded={showMath}
              >
                <ChevronDown
                  className={['w-4 h-4 transition-transform duration-200', showMath ? 'rotate-180' : ''].join(' ')}
                  strokeWidth={1.5}
                />
                {showMath ? 'Hide the math' : 'What changes the math?'}
              </button>
              <div
                className={[
                  'grid transition-all duration-300 ease-out',
                  showMath ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                ].join(' ')}
              >
                <div className="overflow-hidden">
                  <ul className="bg-gray-50 border border-gray-200 p-6 mt-4 space-y-3 text-sm text-gray-700 leading-relaxed">
                    <li>
                      <span className="text-gray-500 text-xs uppercase tracking-[0.15em] mr-2">Software savings</span>
                      <span className="tabular-nums">monthly spend × 12 × 50%</span>
                    </li>
                    <li>
                      <span className="text-gray-500 text-xs uppercase tracking-[0.15em] mr-2">Additional revenue</span>
                      <span className="tabular-nums">team × deal size × 40% × (hours&nbsp;/&nbsp;20)</span>
                    </li>
                    <li>
                      <span className="text-gray-500 text-xs uppercase tracking-[0.15em] mr-2">Time recovered</span>
                      <span className="tabular-nums">hours/week × 50 weeks × team size</span>
                    </li>
                    <li>
                      <span className="text-gray-500 text-xs uppercase tracking-[0.15em] mr-2">Payback</span>
                      <span className="tabular-nums">(team × $700 × 3 months) ÷ (annual value&nbsp;/&nbsp;12)</span>
                    </li>
                    <li className="pt-2 mt-2 border-t border-gray-200 text-xs text-gray-500 leading-relaxed">
                      Conservative defaults from our average commercial-services builds. Real numbers depend
                      on your workflow — we’ll model yours in the discovery call.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ResultCard({ label, value, sub }) {
  return (
    <div className="border border-gray-200 p-6 bg-white transition-all">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">{label}</p>
      <p className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-2 tabular-nums">{value}</p>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
  );
}

// ===== MAIN =====

export default function FusionSalesWebsite() {
  const [selectedIndustry, setSelectedIndustry] = useState('moving');
  const [openFAQ, setOpenFAQ] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollProgress = useScrollProgress();
  const navIds = useMemo(() => NAV_LINKS.map((l) => l.id), []);
  const activeId = useScrollSpy(navIds);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const industry = INDUSTRIES[selectedIndustry];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-light">
      {/* Skip-to-content for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-gray-900 focus:text-white focus:text-sm focus:rounded focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* ===== TOP NAV ===== */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        {/* scroll progress bar */}
        <div className="absolute left-0 right-0 top-0 h-px bg-transparent">
          <div
            className="h-full bg-gray-900 transition-[width] duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 text-gray-900" aria-label="FusionSales.ai home">
            <img src="/favicon.svg" alt="" className="w-7 h-7" width="28" height="28" />
            <span className="text-xl tracking-tight font-medium">FusionSales</span>
            <span className="text-xl tracking-tight text-gray-400 font-light">.ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={[
                  'transition relative',
                  activeId === l.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900',
                ].join(' ')}
              >
                {l.label}
                <span
                  className={[
                    'absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-600 transition-opacity',
                    activeId === l.id ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                />
              </a>
            ))}
            <a
              href="/insights"
              className="text-gray-500 hover:text-gray-900 transition"
            >
              Insights
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
            >
              Schedule a Conversation
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2 -mr-2 text-gray-700 hover:text-gray-900"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} activeId={activeId} />

      <main id="main">
      {/* ===== HERO ===== */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-32 lg:py-36">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-12 lg:gap-16 items-center">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-3 mb-10">
                  {['OpenAI Partner', 'Google Partner', '8+ Years'].map((b) => (
                    <span
                      key={b}
                      className="text-xs tracking-wide uppercase text-gray-600 border border-gray-200 px-3 py-1.5 rounded-full"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.05] tracking-tight text-gray-900">
                  Stop renting your software.
                  <br className="hidden md:block" />
                  <span className="text-gray-500"> Start owning it.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-8 text-lg md:text-xl text-gray-700 leading-relaxed">
                  Custom CRMs, quote tools, and scheduling — built for your business in weeks, not years.
                  Yours forever. At a fraction of what custom software used to cost.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <a
                    href={CALENDLY} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gray-900 text-white text-sm md:text-base hover:bg-gray-800 transition"
                  >
                    Schedule a Conversation
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#calculator"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-gray-900 text-gray-900 text-sm md:text-base hover:bg-gray-900 hover:text-white transition"
                  >
                    See Your ROI
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right-side product preview stack (lg+ only) */}
            <Reveal className="hidden lg:block" delay={200}>
              <HeroPreviewStack />
            </Reveal>
          </div>

          <Reveal delay={320}>
            <div className="mt-20 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-200 pt-12">
              <Stat end={50} suffix="%" label="Cost reduction" />
              <Stat raw="1 week" label="Full deployment" />
              <Stat end={100} suffix="+" label="Companies transformed" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CLIENT LOGO STRIP ===== */}
      <ClientStrip />

      {/* ===== THE PROBLEM ===== */}
      <section id="problem" className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">The real problem</p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-12">
              It&rsquo;s not your fault that your software doesn&rsquo;t fit.
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-16 max-w-6xl">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-brand-700 mb-3">What&rsquo;s happening</p>
                <p className="font-display text-xl md:text-2xl text-gray-900 leading-snug font-light tracking-tight">
                  It was built for someone else.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-3">
                  Enterprise CRMs were designed for 5,000-person sales orgs with twelve-stage pipelines
                  and dedicated admins. You don&rsquo;t have those.
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-brand-700 mb-3">How it feels</p>
                <p className="font-display text-xl md:text-2xl text-gray-900 leading-snug font-light tracking-tight">
                  Your team pays the price every week.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-3">
                  Hours lost to data entry. Deals slipping through cracks. A pipeline you can&rsquo;t
                  trust. Friday-night reporting that should have taken five minutes.
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-brand-700 mb-3">Why it&rsquo;s wrong</p>
                <p className="font-display text-xl md:text-2xl text-gray-900 leading-snug font-light tracking-tight">
                  You shouldn&rsquo;t bend around software.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-3">
                  Software should bend around you. The tools you spend the most on shouldn&rsquo;t
                  be the ones causing the most friction.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12">
            <Reveal>
              <div className="bg-white border border-gray-200 p-10 h-full">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">
                  What enterprise software does
                </p>
                <ul className="space-y-5">
                  {[
                    'Requires reps to manually fill out fields after every call',
                    'Costs $150–300 per user per month',
                    'Takes months to implement',
                    'Doesn’t talk to your other tools',
                    '40% of features go unused',
                  ].map((t) => (
                    <li key={t} className="flex gap-4 items-start">
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" strokeWidth={1.5} />
                      <span className="text-gray-700 leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-white border border-gray-200 p-10 h-full">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">
                  What we build instead
                </p>
                <ul className="space-y-5">
                  {[
                    'Quote generators. Scheduling tools. Tracking systems. Built for your workflow.',
                    '$3,500–8,000 per month. All-inclusive.',
                    '1 week to live',
                    'Works with everything you already use',
                    'Every feature is designed for you',
                  ].map((t) => (
                    <li key={t} className="flex gap-4 items-start">
                      <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1" strokeWidth={1.5} />
                      <span className="text-gray-700 leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== WHY NOW ===== */}
      <WhyNow />

      {/* ===== INDUSTRY SELECTOR ===== */}
      <section id="industries" className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">By Industry</p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-12">
              What we’ve built for your industry.
            </h2>
          </Reveal>

          <Reveal>
            <div role="tablist" aria-label="Industries" className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {INDUSTRY_ORDER.map((k) => {
                const i = INDUSTRIES[k];
                const Icon = i.icon;
                const active = selectedIndustry === k;
                return (
                  <button
                    key={k}
                    onClick={() => setSelectedIndustry(k)}
                    role="tab"
                    aria-selected={active}
                    className={[
                      'text-left px-5 py-5 border transition flex items-center gap-3',
                      active
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400',
                    ].join(' ')}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm">{i.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-12 border-t border-gray-200 pt-12">
            <div className="lg:col-span-2 space-y-10">
              <Reveal>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Challenge</p>
                  <p className="text-xl md:text-2xl text-gray-900 leading-relaxed font-light">
                    {industry.challenge}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Solution</p>
                  <p className="text-xl md:text-2xl text-gray-900 leading-relaxed font-light">
                    {industry.solution}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="pt-8 border-t border-gray-200">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Case Study</p>
                  <p className="text-sm text-gray-500 mb-2">{industry.caseStudy.company}</p>
                  <p className="text-gray-700 mb-6 leading-relaxed">{industry.caseStudy.pain}</p>
                  <ul className="space-y-3">
                    {industry.caseStudy.results.map((r) => (
                      <li key={r} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-gray-900 flex-shrink-0 mt-1.5" strokeWidth={1.5} />
                        <span className="text-gray-900">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-1" delay={120}>
              <aside className="space-y-10">
                <div className="bg-gray-50 border border-gray-200 p-8">
                  <p className="text-5xl md:text-6xl font-light tracking-tight text-gray-900">
                    {industry.stat}
                  </p>
                  <p className="mt-3 text-sm text-gray-600">{industry.statLabel}</p>
                </div>
                <blockquote className="border-l-2 border-gray-900 pl-6">
                  <p className="italic text-gray-700 leading-relaxed">
                    &ldquo;{industry.caseStudy.testimonial}&rdquo;
                  </p>
                </blockquote>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE BUILD ===== */}
      <section id="build" className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Capabilities</p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
              Custom tools built for you.
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mb-16 leading-relaxed">
              Not templates. Not modules. Built from scratch to match exactly how your business works.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f, idx) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={idx * 60}>
                  <div className="bg-white border border-gray-200 p-10 hover:border-gray-400 transition h-full">
                    <Icon className="w-6 h-6 text-gray-900 mb-6" strokeWidth={1.25} />
                    <h3 className="text-xl text-gray-900 mb-3">{f.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{f.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-16 bg-gray-900 text-white p-12 md:p-16">
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
                All built on enterprise-grade infrastructure. The same stack that powers Fortune 500
                companies — with the same reliability and security.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== LIVE DEMO ===== */}
      <LiveQuoteDemo />

      {/* ===== RECENT WORK ===== */}
      <RecentWork />

      {/* ===== TRANSFORMATION ===== */}
      <Transformation />

      {/* ===== HOW WE DO THIS ===== */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Process</p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-16">
              How we do this.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-10">
            {PHASES.map((p, idx) => (
              <Reveal key={p.n} delay={idx * 100}>
                <div className="border-t border-gray-900 pt-8">
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-sm text-gray-500">Phase {p.n}</span>
                    <span className="text-xs uppercase tracking-wider text-gray-500">{p.time}</span>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-3">{p.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-20 bg-gray-50 border border-gray-200 p-12 md:p-16 text-center">
              <h3 className="font-display text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-6">
                One week. From kickoff to live.
              </h3>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                While you’re waiting for Salesforce to finish a 6-month implementation, you’re
                already closing more deals with custom tools that actually fit your business.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== TRUST & COMPLIANCE ===== */}
      <TrustStrip />

      {/* ===== ROI CALCULATOR ===== */}
      <ROICalculator />

      {/* ===== PRICING ===== */}
      <section id="pricing" className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Pricing</p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
              Straightforward pricing.
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mb-16 leading-relaxed">
              No surprises. No hidden fees. Built for your team size.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {PRICING.map((tier, idx) => (
              <Reveal key={tier.name} delay={idx * 100}>
                <div
                  className={[
                    'p-10 flex flex-col transition h-full',
                    tier.featured
                      ? 'bg-gray-900 text-white md:scale-[1.03] md:-my-2 shadow-lg'
                      : 'bg-white border border-gray-200',
                  ].join(' ')}
                >
                  <div className="mb-8">
                    <p
                      className={[
                        'text-xs uppercase tracking-[0.2em] mb-4',
                        tier.featured ? 'text-gray-400' : 'text-gray-500',
                      ].join(' ')}
                    >
                      {tier.name}
                    </p>
                    <p className="text-4xl font-light tracking-tight mb-1">{tier.price}</p>
                    <p
                      className={[
                        'text-sm',
                        tier.featured ? 'text-gray-400' : 'text-gray-500',
                      ].join(' ')}
                    >
                      {tier.note}
                    </p>
                  </div>
                  <p
                    className={[
                      'mb-8 leading-relaxed',
                      tier.featured ? 'text-gray-300' : 'text-gray-700',
                    ].join(' ')}
                  >
                    {tier.description}
                  </p>
                  <ul className="space-y-4 mb-10 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check
                          className={[
                            'w-4 h-4 flex-shrink-0 mt-1',
                            tier.featured ? 'text-white' : 'text-gray-900',
                          ].join(' ')}
                          strokeWidth={1.5}
                        />
                        <span
                          className={[
                            'text-sm leading-relaxed',
                            tier.featured ? 'text-gray-100' : 'text-gray-700',
                          ].join(' ')}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={CALENDLY} target="_blank" rel="noopener noreferrer"
                    className={[
                      'inline-flex items-center justify-center gap-2 px-5 py-3 text-sm transition',
                      tier.featured
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
                    ].join(' ')}
                  >
                    Schedule a Conversation <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 text-sm text-gray-600 max-w-3xl space-y-1">
              <p>Plus optional ongoing optimization: $2k–8k/month.</p>
              <p>Pricing based on team size and complexity. Schedule a conversation for your exact quote.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">FAQ</p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight mb-12">
              Questions?
            </h2>
          </Reveal>

          <Reveal>
            <div className="border-t border-gray-200">
              {FAQS.map((f, idx) => {
                const open = openFAQ === idx;
                return (
                  <div key={f.q} className="border-b border-gray-200">
                    <button
                      onClick={() => setOpenFAQ(open ? -1 : idx)}
                      className="w-full text-left py-7 flex items-start justify-between gap-6 group"
                      aria-expanded={open}
                    >
                      <span className="text-lg md:text-xl font-light text-gray-900 group-hover:text-black">
                        {f.q}
                      </span>
                      <ChevronDown
                        className={[
                          'w-5 h-5 text-gray-500 flex-shrink-0 mt-1 transition-transform duration-200',
                          open ? 'rotate-180 text-gray-900' : '',
                        ].join(' ')}
                        strokeWidth={1.5}
                      />
                    </button>
                    <div
                      className={[
                        'grid transition-all duration-300 ease-out',
                        open ? 'grid-rows-[1fr] opacity-100 pb-7' : 'grid-rows-[0fr] opacity-0',
                      ].join(' ')}
                    >
                      <div className="overflow-hidden">
                        <p className="text-gray-700 leading-relaxed max-w-3xl pr-10">{f.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section id="contact" className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-8">
              Your sales team deserves better.
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
              They shouldn’t spend their day filling out spreadsheets and fighting with software.
              They should be selling. We build the tools that let them do that.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-gray-900 text-sm md:text-base hover:bg-gray-100 transition"
              >
                Schedule a Conversation <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white text-white text-sm md:text-base hover:bg-white hover:text-gray-900 transition"
              >
                Calculate Your ROI
              </a>
            </div>
            <p className="text-sm text-gray-400">
              No credit card required. No pressure. Just a conversation about what’s possible.
            </p>
          </Reveal>
        </div>
      </section>

      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Company</p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Built to help growing businesses stop fighting their tools and start winning with them.
              </p>
              <p className="text-sm text-gray-500">Arlogix Inc.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Industries</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="#industries" className="hover:text-gray-900">Commercial Moving</a></li>
                <li><a href="#industries" className="hover:text-gray-900">Lighting</a></li>
                <li><a href="#industries" className="hover:text-gray-900">Healthcare</a></li>
                <li><a href="#industries" className="hover:text-gray-900">Insurance</a></li>
                <li><a href="#industries" className="hover:text-gray-900">Outbound Sales</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">What we build</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="#build" className="hover:text-gray-900">Quote Tools</a></li>
                <li><a href="#build" className="hover:text-gray-900">CRM Systems</a></li>
                <li><a href="#build" className="hover:text-gray-900">Scheduling</a></li>
                <li><a href="#build" className="hover:text-gray-900">Automation</a></li>
                <li><a href="#build" className="hover:text-gray-900">Dashboards</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Contact</p>
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                Let’s talk about what’s possible.
              </p>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-300 hover:border-gray-900 pb-1 transition"
              >
                Schedule a Conversation <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-gray-500 mt-4">
                Or email <a href="mailto:hello@fusionsales.ai" className="underline hover:text-gray-900">hello@fusionsales.ai</a>
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-gray-500">
            <p>© 2026 Arlogix Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
              <a href="#" className="hover:text-gray-900">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
