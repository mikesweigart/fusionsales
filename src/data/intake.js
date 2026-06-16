// Intake questionnaire for FusionSales.ai — the required first step before booking.
// Mirrors the Fusion Advisory diagnostic so leads arrive with full context.

export const INTAKE_INTRO = {
  eyebrow: 'Start here',
  headline: 'Before we talk, we get to know your business.',
  subhead:
    "Every conversation with us starts here. Spend about 8–10 minutes on this and your call won't be wasted on discovery — we'll already understand your operation, your stack, and where custom software or AI could pay off. No blind calls.",
  transparencyNote:
    'Seven quick steps, mostly tap-to-answer, with a progress bar the whole way. Nothing hidden — and the moment it’s in, you can grab time on the calendar.',
  gateNote:
    'Booking opens as soon as you submit — so the time you reserve is already informed by everything you shared.',
};

export const INTAKE_SECTIONS = [
  // STEP 1 — Who you are
  {
    title: 'About you',
    description: "Quick basics so we know who we're talking to.",
    fields: [
      { id: 'fullName', label: 'Your name', type: 'text', required: true },
      { id: 'role', label: 'Your role / title', type: 'text', required: true, placeholder: 'e.g., CEO, COO, VP of Operations' },
      { id: 'company', label: 'Company name', type: 'text', required: true },
      { id: 'email', label: 'Work email', type: 'email', required: true },
      { id: 'phone', label: 'Phone', type: 'tel', placeholder: 'Optional, but helpful' },
      { id: 'website', label: 'Company website', type: 'url', placeholder: 'https://' },
      {
        id: 'decisionRole',
        label: 'Your role in this decision',
        type: 'radio',
        required: true,
        options: [
          'I make the final call',
          "I'm a key decision-maker",
          'I influence the decision',
          "I'm researching for the team",
        ],
      },
    ],
  },
  // STEP 2 — Your company
  {
    title: 'Your company',
    description: 'The shape and scale of your business.',
    fields: [
      {
        id: 'industry',
        label: 'Industry',
        type: 'select',
        required: true,
        options: [
          'Professional Services',
          'B2B SaaS / Software',
          'Manufacturing',
          'Construction / Trades',
          'Wholesale / Distribution',
          'Staffing / Recruiting',
          'Insurance',
          'Financial Services',
          'Healthcare',
          'Real Estate',
          'Retail / E-commerce',
          'Logistics / Transportation',
          'Marketing / Agency',
          'Hospitality / Food & Beverage',
          'Other',
        ],
      },
      {
        id: 'revenue',
        label: 'Annual revenue',
        type: 'select',
        required: true,
        options: ['Under $1M', '$1M – $5M', '$5M – $25M', '$25M – $75M', '$75M – $250M', '$250M+', 'Prefer not to say'],
      },
      {
        id: 'employees',
        label: 'Number of employees',
        type: 'select',
        required: true,
        options: ['1–10', '11–50', '51–150', '151–500', '500+'],
      },
      {
        id: 'overview',
        label: 'In a sentence or two, what does your company do?',
        type: 'textarea',
        required: true,
        placeholder: 'Who you serve and how you make money.',
      },
      {
        id: 'velocity',
        label: "How's growth right now?",
        type: 'radio',
        required: true,
        options: ['Declining', 'Flat', 'Steady growth', 'Growing fast', 'Growing faster than we can handle'],
      },
    ],
  },
  // STEP 3 — Goals & the #1 problem
  {
    title: 'Goals & your #1 problem',
    description: "This is the heart of it — what you actually want to fix.",
    fields: [
      {
        id: 'topPriority',
        label: 'Your #1 priority over the next 12 months',
        type: 'radio',
        required: true,
        options: [
          'Grow revenue',
          'Cut costs',
          'Scale without adding headcount',
          'Improve margins',
          'Improve customer experience',
          "Free up my team's time",
          'Other',
        ],
      },
      {
        id: 'biggestProblem',
        label: 'If we could fix ONE thing in the next 90 days, what would move the needle most?',
        type: 'textarea',
        required: true,
        placeholder: 'Be specific — the bottleneck, the leak, the thing that keeps you up.',
      },
      {
        id: 'successVision',
        label: 'What would a clear win look like 90 days after we start?',
        type: 'textarea',
        required: true,
        placeholder: "How you'd know it worked — in numbers if you can.",
      },
    ],
  },
  // STEP 4 — Where software / AI fits (their hypothesis)
  {
    title: 'Where software or AI fits',
    description: "Your read first — then we'll bring ours to the call.",
    fields: [
      {
        id: 'aiAreas',
        label: 'Where could custom software or AI help most? Pick any that apply.',
        type: 'checkbox',
        required: true,
        options: [
          'Sales & lead follow-up',
          'Quoting & estimating',
          'Customer service & support',
          'Marketing & content',
          'Operations & workflows',
          'Data, reporting & forecasting',
          'Knowledge & documents',
          'Hiring & HR',
          'Finance & back-office',
          'Scheduling & dispatch',
          'Not sure yet',
        ],
      },
      {
        id: 'automateFirst',
        label: 'If you could automate or rebuild one thing first, what would it be?',
        type: 'textarea',
        placeholder: "The repetitive task or clunky tool you'd replace tomorrow if you could.",
      },
      {
        id: 'whereHeard',
        label: 'Where have you heard custom software or AI is helping businesses like yours? (optional)',
        type: 'textarea',
      },
    ],
  },
  // STEP 5 — Current automation maturity
  {
    title: 'How automated you are today',
    description: "An honest read on your starting point — there's no wrong answer.",
    fields: [
      {
        id: 'automationMaturity',
        label: 'How automated is your business today?',
        type: 'radio',
        required: true,
        options: [
          'Mostly manual / spreadsheets',
          'A few tools, but lots of manual work',
          'Automated in some areas',
          'Highly automated across the business',
        ],
      },
      {
        id: 'triedBefore',
        label: 'Have you tried custom software or automation before?',
        type: 'radio',
        required: true,
        options: [
          'No, not yet',
          "Yes — it stalled or didn't stick",
          'Yes — mixed results',
          'Yes — working well, and we want more',
        ],
      },
      {
        id: 'dataReadiness',
        label: 'How organized is your data?',
        type: 'radio',
        options: [
          'Scattered across tools & spreadsheets',
          'Partly organized',
          'Mostly organized & accessible',
          'Centralized & clean',
        ],
      },
      {
        id: 'champion',
        label: 'Who would own this internally?',
        type: 'text',
        placeholder: "Name / role of the likely champion (or 'not sure yet')",
      },
    ],
  },
  // STEP 6 — Tech stack
  {
    title: 'Your tech stack',
    description: 'Pick what you run the business on today — choose “Other” on any of these to type something not listed.',
    fields: [
      {
        id: 'crm',
        label: 'CRM',
        type: 'selectOther',
        options: ['Salesforce', 'HubSpot', 'Microsoft Dynamics 365', 'Zoho CRM', 'Pipedrive', 'Monday.com', 'NetSuite', 'Keap', 'None'],
      },
      {
        id: 'erp',
        label: 'ERP / operations / inventory',
        type: 'selectOther',
        options: ['NetSuite', 'SAP', 'Oracle', 'Microsoft Dynamics 365', 'QuickBooks', 'Sage', 'Acumatica', 'Odoo', 'None'],
      },
      {
        id: 'quoting',
        label: 'Quoting / estimating',
        type: 'selectOther',
        options: ['Excel / spreadsheets', 'PandaDoc', 'Salesforce CPQ', 'QuoteWerks', 'DealHub', 'Proposify', 'HubSpot Quotes', 'Custom / in-house', 'None'],
      },
      {
        id: 'marketing',
        label: 'Marketing',
        type: 'selectOther',
        options: ['HubSpot', 'Mailchimp', 'ActiveCampaign', 'Constant Contact', 'Klaviyo', 'Marketo', 'Outsourced to an agency', 'None'],
      },
      {
        id: 'internalComms',
        label: 'Internal team communication',
        type: 'selectOther',
        options: ['Microsoft Teams', 'Slack', 'Google Chat', 'Zoom', 'Email only', 'Discord'],
      },
      {
        id: 'reporting',
        label: 'Reporting / BI',
        type: 'selectOther',
        options: ['Excel / spreadsheets', 'Power BI', 'Tableau', 'Looker Studio', 'Native dashboards in our tools', 'Domo', 'None / gut feel'],
      },
      {
        id: 'customerChannels',
        label: 'How do customers reach you? Pick any.',
        type: 'checkbox',
        options: ['Email', 'Phone', 'Text / SMS', 'Live chat', 'WhatsApp', 'Social DMs', 'In person'],
      },
      {
        id: 'totalTechSpend',
        label: "Roughly what's your total monthly software / tech spend?",
        type: 'select',
        help: 'Ballpark is fine — a great starting point for ROI and tool-consolidation conversations.',
        options: ['Under $1K / mo', '$1K – $5K / mo', '$5K – $15K / mo', '$15K – $50K / mo', '$50K+ / mo', 'Not sure'],
      },
      {
        id: 'otherTools',
        label: 'Other key tools? (project mgmt, accounting, field service, etc.)',
        type: 'text',
        placeholder: "Anything important we didn't cover",
      },
    ],
  },
  // STEP 7 — Scope, timeline & fit
  {
    title: 'Scope & timeline',
    description: 'Last step — so we can shape the right first build and a real ROI.',
    fields: [
      {
        id: 'dealSize',
        label: 'Average deal / transaction value',
        type: 'select',
        help: 'Helps us model ROI realistically.',
        options: ['Under $1K', '$1K – $10K', '$10K – $50K', '$50K – $250K', '$250K+', 'Varies widely'],
      },
      {
        id: 'timeline',
        label: 'Timeline to act',
        type: 'radio',
        required: true,
        options: ["ASAP — it's a priority", 'This quarter', 'This year', 'Just exploring for now'],
      },
      {
        id: 'investment',
        label: 'Where are you on investing in the right solution?',
        type: 'radio',
        help: 'No wrong answer here — it just helps us scope realistically.',
        options: [
          'Ready to invest if the ROI is clear',
          'Need to see the business case first',
          'Exploring — no budget set yet',
          'Prefer to discuss live',
        ],
      },
      { id: 'anythingElse', label: 'Anything else we should know before we talk?', type: 'textarea' },
      { id: 'howHeard', label: 'How did you hear about us? (optional)', type: 'text' },
    ],
  },
];
