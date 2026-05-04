import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  X,
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
    title: 'Strategy Session',
    body: 'We map out your workflow. What you need. What’s broken. What success looks like.',
    time: 'Week 1',
  },
  {
    n: '2',
    title: 'We Build It',
    body: 'Quote generators. CRM. Tracking. Everything custom. Everything tested.',
    time: 'Week 2',
  },
  {
    n: '3',
    title: 'Your Team Learns',
    body: 'We train them. Answer questions. Make sure everyone’s comfortable.',
    time: 'Week 3',
  },
  {
    n: '4',
    title: 'You Start Winning',
    body: 'Better quotes. Faster follow-ups. More deals. Less manual work.',
    time: 'Week 4+',
  },
];

const PRICING = [
  {
    name: 'Starter',
    price: '$15k',
    note: 'one-time',
    description: 'Small teams. Single workflow.',
    features: [
      'Quote generator OR scheduling tool',
      'Up to 5 people',
      '1-week implementation',
      'Email support',
    ],
    featured: false,
  },
  {
    name: 'Core',
    price: '$35k–$75k',
    note: 'one-time',
    description: 'Growing teams. Multiple workflows.',
    features: [
      'Quote generator + CRM + Scheduling',
      '5–15 people',
      '2–3 week implementation',
      'Priority support',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '$100k–$150k',
    note: 'one-time',
    description: 'Larger operations. Complex needs.',
    features: [
      'Everything custom-built',
      '15+ people',
      '3–4 week implementation',
      '24/7 dedicated support',
    ],
    featured: false,
  },
];

const FAQS = [
  {
    q: 'How is this different than Salesforce?',
    a: 'Salesforce is a tool you fit your business around. We build your business into software. That means no forcing workflows, no training people on complex features, no admin overhead. It’s built exactly for you from day one.',
  },
  {
    q: 'Do we have to throw out our existing tools?',
    a: 'No. We integrate with what you’re already using. Email, calendar, payment processors, accounting software — we build on top of it. Keep what works. Replace what doesn’t.',
  },
  {
    q: 'What if we need to change something?',
    a: 'It’s your system. We built it. Updates and adjustments are part of our relationship. Most clients make changes in the first month. We handle it.',
  },
  {
    q: 'Is it secure?',
    a: 'Enterprise-grade security. Built on Google Cloud and OpenAI infrastructure. HIPAA-compliant for healthcare. SOC 2 certified. Your data is encrypted. Regular backups. You own your data.',
  },
  {
    q: 'What about training?',
    a: 'We train your team during week 3. Live sessions. Q&A. Then we’re on call if anyone gets stuck. Most teams are productive on day one.',
  },
  {
    q: 'What if we outgrow this?',
    a: 'It scales with you. Started with a quote generator? Add a CRM. Add scheduling. Add whatever you need. No rip-and-replace. Just build on what’s working.',
  },
];

const CALC_INDUSTRIES = [
  { key: 'moving', label: 'Commercial Moving' },
  { key: 'insurance', label: 'Insurance' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'outbound', label: 'Outbound Sales' },
  { key: 'other', label: 'Other' },
];

// ===== HELPERS =====

const fmtCurrency = (n) => {
  if (!isFinite(n)) return '$0';
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
};

const fmtNumber = (n) => new Intl.NumberFormat('en-US').format(Math.round(n));

const fmtMonths = (n) => {
  if (!isFinite(n) || n <= 0) return '≤1 mo';
  if (n < 1) return '<1 mo';
  return `${n.toFixed(1).replace(/\.0$/, '')} mo`;
};

// ===== COMPONENT =====

export default function FusionSalesWebsite() {
  const [selectedIndustry, setSelectedIndustry] = useState('moving');
  const [openFAQ, setOpenFAQ] = useState(0);

  const [calc, setCalc] = useState({
    step: 1,
    industry: 'moving',
    teamSize: 5,
    monthlyCost: 2000,
    manualHours: 20,
    dealSize: 50000,
    showResults: false,
  });

  const updateCalc = (patch) => setCalc((c) => ({ ...c, ...patch }));

  const results = useMemo(() => {
    const annualSoftwareSavings = calc.monthlyCost * 12 * 0.5;
    const timeRecovered = calc.manualHours * 50 * calc.teamSize; // hours/year
    const additionalRevenue =
      calc.teamSize * calc.dealSize * 0.4 * (calc.manualHours / 20);
    const annualValue = annualSoftwareSavings + additionalRevenue;
    const monthlyValue = annualValue / 12;
    const projectCost = calc.teamSize * 700 * 3;
    const paybackMonths = monthlyValue > 0 ? projectCost / monthlyValue : 0;
    return {
      annualSoftwareSavings,
      additionalRevenue,
      timeRecovered,
      paybackMonths,
      annualValue,
    };
  }, [calc.monthlyCost, calc.manualHours, calc.teamSize, calc.dealSize]);

  const industry = INDUSTRIES[selectedIndustry];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-light">
      {/* ===== TOP NAV ===== */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-gray-900">
            <span className="text-xl tracking-tight font-medium">FusionSales</span>
            <span className="text-xl tracking-tight text-gray-400 font-light">.ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-sm text-gray-600">
            <a href="#problem" className="hover:text-gray-900 transition">The problem</a>
            <a href="#industries" className="hover:text-gray-900 transition">Industries</a>
            <a href="#build" className="hover:text-gray-900 transition">What we build</a>
            <a href="#calculator" className="hover:text-gray-900 transition">ROI</a>
            <a href="#pricing" className="hover:text-gray-900 transition">Pricing</a>
          </nav>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
          >
            Schedule a Conversation
          </a>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-36">
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

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-gray-900 max-w-5xl">
            Stop fighting with Salesforce.
            <br className="hidden md:block" />
            <span className="text-gray-500"> Start using tools built for you.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
            Custom quote generators. Scheduling tools. CRM systems. Built exactly for your business.
            No more forcing your workflow into software that doesn’t fit.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
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

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-200 pt-12">
            <Stat number="50%" label="Cost reduction" />
            <Stat number="1 week" label="Full deployment" />
            <Stat number="100+" label="Companies transformed" />
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section id="problem" className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">The Real Problem</p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-8">
            Software companies built tools for enterprises. You’re forcing a square peg into a round hole.
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-16 leading-relaxed">
            Your sales team is drowning in data entry instead of selling. There’s a better way.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white border border-gray-200 p-10">
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

            <div className="bg-white border border-gray-200 p-10">
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
          </div>
        </div>
      </section>

      {/* ===== INDUSTRY SELECTOR ===== */}
      <section id="industries" className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">By Industry</p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-12">
            What we’ve built for your industry.
          </h2>

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

          <div className="grid lg:grid-cols-3 gap-12 border-t border-gray-200 pt-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Challenge</p>
                <p className="text-xl md:text-2xl text-gray-900 leading-relaxed font-light">
                  {industry.challenge}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Solution</p>
                <p className="text-xl md:text-2xl text-gray-900 leading-relaxed font-light">
                  {industry.solution}
                </p>
              </div>
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
            </div>

            <aside className="lg:col-span-1 space-y-10">
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
          </div>
        </div>
      </section>

      {/* ===== WHAT WE BUILD ===== */}
      <section id="build" className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Capabilities</p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
            Custom tools built for you.
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-16 leading-relaxed">
            Not templates. Not modules. Built from scratch to match exactly how your business works.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white border border-gray-200 p-10 hover:border-gray-400 transition"
                >
                  <Icon className="w-6 h-6 text-gray-900 mb-6" strokeWidth={1.25} />
                  <h3 className="text-xl text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{f.body}</p>
                </div>
              );
            })}
          </div>

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
        </div>
      </section>

      {/* ===== HOW WE DO THIS ===== */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Process</p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-16">
            How we do this.
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {PHASES.map((p) => (
              <div key={p.n} className="border-t border-gray-900 pt-8">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-sm text-gray-500">Phase {p.n}</span>
                  <span className="text-xs uppercase tracking-wider text-gray-500">{p.time}</span>
                </div>
                <h3 className="text-xl text-gray-900 mb-3">{p.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-gray-50 border border-gray-200 p-12 md:p-16 text-center">
            <h3 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 mb-6">
              One week. From kickoff to live.
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              While you’re waiting for Salesforce to finish a 6-month implementation, you’re
              already closing more deals with custom tools that actually fit your business.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ROI CALCULATOR ===== */}
      <section id="calculator" className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">ROI</p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
            What’s this worth to you?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-16 leading-relaxed">
            Enter your numbers. See your potential.
          </p>

          <div className="bg-white border border-gray-200">
            {/* progress */}
            <div className="px-8 md:px-12 pt-10">
              <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
                <span>Step {calc.showResults ? 4 : calc.step} of 4</span>
                <span>
                  {calc.showResults
                    ? 'Results'
                    : calc.step === 1
                    ? 'Industry'
                    : calc.step === 2
                    ? 'Team & budget'
                    : 'Operations'}
                </span>
              </div>
              <div className="h-px bg-gray-200 relative">
                <div
                  className="absolute inset-y-0 left-0 h-px bg-gray-900 transition-all"
                  style={{
                    width: `${calc.showResults ? 100 : (calc.step / 4) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* STEP 1 */}
              {!calc.showResults && calc.step === 1 && (
                <div>
                  <h3 className="text-2xl font-light mb-2">What industry are you in?</h3>
                  <p className="text-gray-600 mb-10">We’ll tailor the numbers to your context.</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
                    {CALC_INDUSTRIES.map((i) => {
                      const active = calc.industry === i.key;
                      return (
                        <button
                          key={i.key}
                          onClick={() => updateCalc({ industry: i.key })}
                          className={[
                            'px-5 py-4 border text-sm text-left transition',
                            active
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400',
                          ].join(' ')}
                        >
                          {i.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => updateCalc({ step: 2 })}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {!calc.showResults && calc.step === 2 && (
                <div>
                  <h3 className="text-2xl font-light mb-10">Tell us about your team.</h3>
                  <div className="space-y-12">
                    <Slider
                      label="How many people on your sales team?"
                      value={calc.teamSize}
                      min={1}
                      max={50}
                      step={1}
                      display={`${calc.teamSize} ${calc.teamSize === 1 ? 'person' : 'people'}`}
                      onChange={(v) => updateCalc({ teamSize: v })}
                    />
                    <Slider
                      label="How much do you spend on CRM/software monthly?"
                      value={calc.monthlyCost}
                      min={0}
                      max={5000}
                      step={100}
                      display={`$${fmtNumber(calc.monthlyCost)}/mo`}
                      onChange={(v) => updateCalc({ monthlyCost: v })}
                    />
                  </div>
                  <div className="flex justify-between mt-12">
                    <button
                      onClick={() => updateCalc({ step: 1 })}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => updateCalc({ step: 3 })}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {!calc.showResults && calc.step === 3 && (
                <div>
                  <h3 className="text-2xl font-light mb-10">A bit about your operations.</h3>
                  <div className="space-y-12">
                    <Slider
                      label="Hours per week spent on manual tasks?"
                      value={calc.manualHours}
                      min={0}
                      max={40}
                      step={1}
                      display={`${calc.manualHours} hrs/week`}
                      onChange={(v) => updateCalc({ manualHours: v })}
                    />
                    <Slider
                      label="Average deal size"
                      value={calc.dealSize}
                      min={1000}
                      max={500000}
                      step={1000}
                      display={fmtCurrency(calc.dealSize)}
                      onChange={(v) => updateCalc({ dealSize: v })}
                    />
                  </div>
                  <div className="flex justify-between mt-12">
                    <button
                      onClick={() => updateCalc({ step: 2 })}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => updateCalc({ showResults: true })}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
                    >
                      See Results <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* RESULTS */}
              {calc.showResults && (
                <div>
                  <h3 className="text-2xl font-light mb-10">Your potential.</h3>
                  <div className="grid sm:grid-cols-2 gap-6 mb-10">
                    <ResultCard
                      label="Annual Software Costs"
                      value={fmtCurrency(results.annualSoftwareSavings)}
                      sub="Potential savings in Year 1"
                    />
                    <ResultCard
                      label="Additional Revenue"
                      value={fmtCurrency(results.additionalRevenue)}
                      sub="From better follow-ups & faster quotes"
                    />
                    <ResultCard
                      label="Time Recovered"
                      value={`${fmtNumber(results.timeRecovered)} hrs`}
                      sub="Hours for actual selling per year"
                    />
                    <ResultCard
                      label="Payback Period"
                      value={fmtMonths(results.paybackMonths)}
                      sub="Months to break even"
                    />
                  </div>
                  <div className="bg-gray-900 text-white p-8 md:p-10 mb-10">
                    <p className="text-xl md:text-2xl font-light leading-relaxed">
                      That’s{' '}
                      <span className="font-medium">{fmtCurrency(results.annualValue)}</span> of
                      value in year one. Build once. Use forever. Scales with your business.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <button
                      onClick={() => updateCalc({ showResults: false, step: 3 })}
                      className="text-sm text-gray-600 hover:text-gray-900 self-start"
                    >
                      Adjust numbers
                    </button>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
                    >
                      Schedule a Conversation <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight max-w-3xl mb-6">
            Straightforward pricing.
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mb-16 leading-relaxed">
            No surprises. No hidden fees. Built for your team size.
          </p>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {PRICING.map((tier) => (
              <div
                key={tier.name}
                className={[
                  'p-10 flex flex-col transition',
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
                  href="#contact"
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
            ))}
          </div>

          <div className="mt-12 text-sm text-gray-600 max-w-3xl space-y-1">
            <p>Plus optional ongoing optimization: $2k–8k/month.</p>
            <p>Pricing based on team size and complexity. Schedule a conversation for your exact quote.</p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight mb-12">
            Questions?
          </h2>

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
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section id="contact" className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-24 md:py-32 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-8">
            Your sales team deserves better.
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
            They shouldn’t spend their day filling out spreadsheets and fighting with software.
            They should be selling. We build the tools that let them do that.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="#"
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

// ===== SUB-COMPONENTS =====

function Stat({ number, label }) {
  return (
    <div>
      <p className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-2">{number}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

function Slider({ label, value, min, max, step, display, onChange }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-4">
        <label className="text-sm text-gray-700">{label}</label>
        <span className="text-lg font-light text-gray-900">{display}</span>
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
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>{typeof min === 'number' && min >= 1000 ? fmtCurrency(min) : min}</span>
        <span>{typeof max === 'number' && max >= 1000 ? fmtCurrency(max) : max}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, sub }) {
  return (
    <div className="border border-gray-200 p-8 bg-white">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">{label}</p>
      <p className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 mb-2">{value}</p>
      <p className="text-sm text-gray-600">{sub}</p>
    </div>
  );
}
