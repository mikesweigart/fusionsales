import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
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
  { n: '1', title: 'Strategy Session', body: 'We map out your workflow. What you need. What’s broken. What success looks like.', time: 'Week 1' },
  { n: '2', title: 'We Build It', body: 'Quote generators. CRM. Tracking. Everything custom. Everything tested.', time: 'Week 2' },
  { n: '3', title: 'Your Team Learns', body: 'We train them. Answer questions. Make sure everyone’s comfortable.', time: 'Week 3' },
  { n: '4', title: 'You Start Winning', body: 'Better quotes. Faster follow-ups. More deals. Less manual work.', time: 'Week 4+' },
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
  { href: '#demo', label: 'Live demo', id: 'demo' },
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
          <span className="text-xl tracking-tight">
            <span className="font-medium">FusionSales</span>
            <span className="text-gray-400">.ai</span>
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

const MOVE_TYPES = [
  { value: 'office', label: 'Office Move' },
  { value: 'retail', label: 'Retail Relocation' },
  { value: 'warehouse', label: 'Warehouse / Logistics' },
  { value: 'industrial', label: 'Industrial / Equipment' },
];

const SIZES = [
  { value: 'small', label: 'Small', desc: '< 2,000 sqft' },
  { value: 'medium', label: 'Medium', desc: '2,000–10,000 sqft' },
  { value: 'large', label: 'Large', desc: '10,000+ sqft' },
];

const SIZE_BASE = { small: 2400, medium: 5800, large: 12000 };
const SIZE_HOURS = { small: 4, medium: 8, large: 16 };
const SIZE_CREW = { small: 2, medium: 4, large: 6 };
const TYPE_MULTIPLIER = { office: 1, retail: 1.05, warehouse: 1.18, industrial: 1.35 };

function LiveQuoteDemo() {
  const [moveType, setMoveType] = useState('office');
  const [size, setSize] = useState('medium');
  const [distance, setDistance] = useState(50);
  const [storage, setStorage] = useState(false);
  const [packing, setPacking] = useState(true);
  const [dirty, setDirty] = useState(false);

  const lineItems = useMemo(() => {
    const items = [];
    const moveLabel = MOVE_TYPES.find((m) => m.value === moveType)?.label;
    const sizeLabel = SIZES.find((s) => s.value === size)?.label;
    const mult = TYPE_MULTIPLIER[moveType];
    items.push({
      id: 'base',
      label: `${moveLabel} — ${sizeLabel.toLowerCase()}`,
      amount: Math.round(SIZE_BASE[size] * mult),
    });
    items.push({
      id: 'crew',
      label: `Crew (${SIZE_CREW[size]} movers, ${SIZE_HOURS[size]} hrs)`,
      amount: SIZE_CREW[size] * SIZE_HOURS[size] * 75,
    });
    items.push({
      id: 'truck',
      label: `Truck (26-ft) — ${distance} mi`,
      amount: Math.round(350 + Math.max(0, distance - 25) * 4.25),
    });
    if (storage) items.push({ id: 'storage', label: 'Climate-controlled storage (1 mo)', amount: 650 });
    if (packing) items.push({ id: 'packing', label: 'Full packing service', amount: Math.round(SIZE_BASE[size] * 0.32 * mult) });
    return items;
  }, [moveType, size, distance, storage, packing]);

  const subtotal = lineItems.reduce((a, b) => a + b.amount, 0);
  const tax = Math.round(subtotal * 0.07);
  const total = subtotal + tax;

  // animate generation timer (just a flourish)
  const [genMs, setGenMs] = useState(340);
  useEffect(() => {
    if (!dirty) return;
    const ms = 280 + Math.floor(Math.random() * 160);
    setGenMs(ms);
  }, [moveType, size, distance, storage, packing]);

  const touch = () => !dirty && setDirty(true);

  return (
    <section id="demo" className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Live demo</p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
            Try one yourself.
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-16 leading-relaxed">
            A working quote generator. We built one like this for a 45-person commercial mover —
            quotes went from 48 hours to 2. Yours would be tailored to your business. Same speed.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* ---- Form (2 cols) ---- */}
          <Reveal className="lg:col-span-2">
            <div className="bg-white border border-gray-200 p-8 space-y-8">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
                  Move type
                </label>
                <select
                  value={moveType}
                  onChange={(e) => { touch(); setMoveType(e.target.value); }}
                  className="w-full border border-gray-200 px-4 py-3 text-gray-900 bg-white focus:outline-none focus:border-gray-900 transition"
                >
                  {MOVE_TYPES.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 block">
                  Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((s) => {
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
                label="Distance"
                value={distance}
                min={5}
                max={500}
                step={5}
                display={`${distance} mi`}
                onChange={(v) => { touch(); setDistance(v); }}
                formatBound={(n) => `${n} mi`}
              />

              <div className="space-y-3">
                <Toggle
                  label="Climate-controlled storage"
                  sub="1 month included"
                  checked={storage}
                  onChange={(v) => { touch(); setStorage(v); }}
                />
                <Toggle
                  label="Full packing service"
                  sub="Materials & labor"
                  checked={packing}
                  onChange={(v) => { touch(); setPacking(v); }}
                />
              </div>
            </div>
          </Reveal>

          {/* ---- Quote document (3 cols) ---- */}
          <Reveal className="lg:col-span-3" delay={120}>
            <div className="bg-white border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="px-8 md:px-10 py-8 border-b border-gray-200 flex items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">Quote</p>
                  <p className="text-xs text-gray-500 tabular-nums">FS-2026-0042</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  <p className="text-xs text-gray-500 mt-1">Valid 30 days</p>
                </div>
              </div>

              <div className="px-8 md:px-10 py-6 grid grid-cols-2 gap-6 border-b border-gray-200">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">From</p>
                  <p className="text-sm text-gray-900">Acme Commercial Movers</p>
                  <p className="text-xs text-gray-600">Atlanta, GA</p>
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
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Generated in <span className="tabular-nums">{(genMs / 1000).toFixed(2)}s</span>
                </span>
                <span>This is a live demo — drag the controls.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LineItem({ label, amount }) {
  return (
    <div className="grid grid-cols-[1fr_auto] py-3 text-sm transition-all">
      <span className="text-gray-700">{label}</span>
      <span className="text-gray-900 tabular-nums text-right">{fmtUsd(amount)}</span>
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
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
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
                <p className="text-5xl md:text-6xl font-light tracking-tight tabular-nums">
                  {fmtCurrency(results.annualValue)}
                </p>
                <p className="mt-4 text-gray-300 leading-relaxed">
                  Build once. Use forever. Scales with your business.
                </p>
                <a
                  href={CALENDLY} target="_blank" rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm hover:bg-gray-100 transition"
                >
                  Schedule a Conversation <ArrowRight className="w-4 h-4" />
                </a>
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
          <a href="#" className="flex items-center gap-2 text-gray-900">
            <span className="text-xl tracking-tight font-medium">FusionSales</span>
            <span className="text-xl tracking-tight text-gray-400 font-light">.ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-9 text-sm">
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
                    'absolute -bottom-1.5 left-0 right-0 h-px bg-gray-900 transition-opacity',
                    activeId === l.id ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                />
              </a>
            ))}
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

      {/* ===== HERO ===== */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-36">
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-gray-900 max-w-5xl">
              Stop fighting with Salesforce.
              <br className="hidden md:block" />
              <span className="text-gray-500"> Start using tools built for you.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
              Custom quote generators. Scheduling tools. CRM systems. Built exactly for your business.
              No more forcing your workflow into software that doesn’t fit.
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

          <Reveal delay={320}>
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-200 pt-12">
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
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">The Real Problem</p>
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-8">
              Software companies built tools for enterprises. You’re forcing a square peg into a round hole.
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mb-16 leading-relaxed">
              Your sales team is drowning in data entry instead of selling. There’s a better way.
            </p>
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

      {/* ===== INDUSTRY SELECTOR ===== */}
      <section id="industries" className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">By Industry</p>
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-12">
              What we’ve built for your industry.
            </h2>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {INDUSTRY_ORDER.map((k) => {
                const i = INDUSTRIES[k];
                const Icon = i.icon;
                const active = selectedIndustry === k;
                return (
                  <button
                    key={k}
                    onClick={() => setSelectedIndustry(k)}
                    className={[
                      'text-left px-5 py-5 border transition flex items-center gap-3',
                      active
                        ? 'bg-gray-900 text-white border-gray-900'
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
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
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
                All built with enterprise-grade technology. The infrastructure powers Fortune 500
                companies. You get that same reliability.
              </p>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-sm text-gray-400">
                <span>Built with OpenAI</span>
                <span>Built with Google Cloud</span>
                <span>Built with Anthropic</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== LIVE DEMO ===== */}
      <LiveQuoteDemo />

      {/* ===== HOW WE DO THIS ===== */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Process</p>
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-16">
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
              <h3 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-6">
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

      {/* ===== ROI CALCULATOR ===== */}
      <ROICalculator />

      {/* ===== PRICING ===== */}
      <section id="pricing" className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Pricing</p>
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
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
                    Learn More <ArrowRight className="w-4 h-4" />
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
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight mb-12">
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
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-8">
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
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex border border-gray-300 bg-white"
              >
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="flex-1 px-3 py-2 text-sm bg-transparent outline-none placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="px-3 bg-gray-900 text-white hover:bg-gray-800 transition"
                  aria-label="Submit email"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
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
