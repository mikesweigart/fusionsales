import React, { useEffect } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, Search, Sparkles,
  LayoutDashboard, KanbanSquare, Users, ListChecks, BarChart3,
  Workflow, Activity, PlugZap, ScrollText, Inbox, MessageSquare, Phone,
  LineChart, Truck, Boxes, FileText, Landmark, CalendarDays, UserCheck,
  Megaphone, Layers, BookOpen, History, Camera, FileCheck2, AlertTriangle,
  Bell, Settings, DollarSign,
} from 'lucide-react';

const CALENDLY = 'https://calendly.com/mike-fusion-advisory/30min';

/* /ideas — "Ten ways to out-hustle the big guys."
   Each idea: the problem (villain) → what we build → the win + concrete
   capabilities, PLUS a real, professional product mockup (left-sidebar app,
   white UI, live data) so a prospect sees exactly what THEIR build looks like.
   This is the standard we build to — Salesforce / QuickBooks / NetSuite, not
   a toy widget. StoryBrand + Hormozi: the customer is the scrappy hero. */

const num = (n) => Math.round(n).toLocaleString('en-US');

/* ============================================================
   Light "real SaaS" mockup primitives
   ============================================================ */
const CHIP = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70',
  amber: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/70',
  rose: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200/70',
  blue: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200/70',
  violet: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200/70',
  gray: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
};
const Chip = ({ tone = 'gray', children }) => (
  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ${CHIP[tone]}`}>{children}</span>
);

const Live = ({ tone = 'emerald' }) => (
  <span className="relative flex h-1.5 w-1.5">
    <span className={`absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping ${tone === 'rose' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${tone === 'rose' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
  </span>
);

const Card = ({ className = '', children }) => (
  <div className={`bg-white rounded-lg ring-1 ring-gray-200/80 ${className}`}>{children}</div>
);

const Kpi = ({ label, value, delta, down }) => (
  <Card className="p-2.5">
    <p className="text-[9px] uppercase tracking-wide text-gray-400 mb-1 truncate">{label}</p>
    <div className="flex items-end gap-1.5">
      <span className="text-base font-semibold text-gray-900 tabular-nums leading-none">{value}</span>
      {delta && <span className={`text-[10px] font-medium mb-px ${down ? 'text-rose-500' : 'text-emerald-600'}`}>{delta}</span>}
    </div>
  </Card>
);
const KpiRow = ({ children }) => <div className="grid grid-cols-3 gap-2">{children}</div>;

const Block = ({ title, action, children, className = '' }) => (
  <Card className={`overflow-hidden ${className}`}>
    {title && (
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-gray-100">
        <p className="text-[11px] font-semibold text-gray-700 truncate">{title}</p>
        {action && <span className="text-[10px] text-gray-400 shrink-0">{action}</span>}
      </div>
    )}
    {children}
  </Card>
);

const Table = ({ cols, rows }) => (
  <table className="w-full">
    <thead>
      <tr>
        {cols.map((c, i) => (
          <th key={i} className={`px-3 py-1.5 text-[9px] uppercase tracking-wide text-gray-400 font-medium ${c.align === 'right' ? 'text-right' : 'text-left'}`}>{c.label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((r, ri) => (
        <tr key={ri} className="border-t border-gray-100/80">
          {r.map((cell, ci) => (
            <td key={ci} className={`px-3 py-2 text-[11px] align-middle ${cols[ci].align === 'right' ? 'text-right' : 'text-left'} ${ci === 0 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const Bars = ({ bars, height = 'h-24' }) => {
  const max = Math.max(...bars.map((b) => b.v), 1);
  return (
    <div className={`flex items-end justify-between gap-1.5 ${height}`}>
      {bars.map((b, i) => (
        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
          <div className={`w-full rounded-t ${b.hot ? 'bg-brand-500' : 'bg-gray-200'}`} style={{ height: `${(b.v / max) * 100}%` }} />
          <span className="text-[8px] text-gray-400 mt-1">{b.l}</span>
        </div>
      ))}
    </div>
  );
};

const Funnel = ({ stages }) => {
  const max = stages[0].v;
  return (
    <div className="space-y-2">
      {stages.map((s, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span className="w-16 shrink-0 text-[10px] text-gray-500">{s.l}</span>
          <div className="flex-1 h-5 rounded bg-gray-100 overflow-hidden">
            <div className={`h-full rounded ${i === stages.length - 1 ? 'bg-emerald-500' : 'bg-brand-500'}`} style={{ width: `${(s.v / max) * 100}%` }} />
          </div>
          <span className="w-10 text-right text-[10px] tabular-nums text-gray-600">{num(s.v)}</span>
        </div>
      ))}
    </div>
  );
};

const AiBanner = ({ children, cta }) => (
  <div className="flex items-center gap-2.5 rounded-lg bg-brand-50 ring-1 ring-brand-100 px-3 py-2">
    <Sparkles className="w-3.5 h-3.5 text-brand-600 shrink-0" strokeWidth={1.75} />
    <p className="text-[11px] text-brand-900/80 leading-snug flex-1">{children}</p>
    {cta && <span className="shrink-0 rounded-md bg-brand-600 px-2 py-1 text-[10px] font-medium text-white">{cta}</span>}
  </div>
);

const Chat = ({ turns }) => (
  <div className="space-y-2.5">
    {turns.map((t, i) => (
      <div key={i} className={t.me ? 'flex justify-end' : 'flex justify-start'}>
        <div className={`max-w-[84%] rounded-2xl px-3 py-2 text-[11px] leading-snug ${t.me ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-white text-gray-700 ring-1 ring-gray-200 rounded-bl-sm'}`}>
          {t.text}
          {t.chips && <div className="mt-1.5 flex flex-wrap gap-1">{t.chips.map((c) => <Chip key={c} tone={t.me ? 'gray' : 'gray'}>{c}</Chip>)}</div>}
        </div>
      </div>
    ))}
  </div>
);

const Nav = ({ items, active }) => (
  <nav className="space-y-0.5">
    {items.map(({ icon: Icon, label }) => {
      const on = label === active;
      return (
        <div key={label} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11.5px] ${on ? 'bg-brand-50 text-brand-700 font-medium ring-1 ring-brand-100' : 'text-gray-500'}`}>
          <Icon className={`w-3.5 h-3.5 shrink-0 ${on ? 'text-brand-600' : 'text-gray-400'}`} strokeWidth={1.75} />
          <span className="truncate">{label}</span>
        </div>
      );
    })}
  </nav>
);

/* The app frame: left sidebar + top bar + white content. */
function AppMock({ name, mark, accent = 'bg-gray-900', nav, active, title, sub, subLive, action, children }) {
  return (
    <div className="rounded-xl ring-1 ring-gray-200 bg-white overflow-hidden select-none shadow-[0_30px_60px_-22px_rgba(15,23,42,0.28)]">
      <div className="flex min-h-[20rem]">
        {/* sidebar */}
        <aside className="w-28 sm:w-[9.5rem] shrink-0 flex flex-col bg-gray-50/70 border-r border-gray-200 p-2.5">
          <div className="flex items-center gap-2 px-1.5 py-1 mb-3">
            <span className={`w-6 h-6 rounded-md ${accent} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>{mark}</span>
            <span className="text-[12px] font-semibold text-gray-900 truncate">{name}</span>
          </div>
          <Nav items={nav} active={active} />
          <div className="mt-auto hidden sm:flex items-center gap-2 px-1.5 pt-3 border-t border-gray-200/70">
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-300 to-brand-500 shrink-0" />
            <span className="text-[10px] text-gray-400 truncate">Your team</span>
          </div>
        </aside>

        {/* main column */}
        <div className="flex-1 min-w-0 flex flex-col bg-gray-50/40">
          {/* top bar */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white border-b border-gray-200">
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 leading-tight truncate">{title}</p>
              {sub && (
                <p className="text-[10px] text-gray-400 truncate flex items-center gap-1.5">
                  {subLive && <Live tone={subLive} />}{sub}
                </p>
              )}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-1 text-[10px] text-gray-400"><Search className="w-3 h-3" strokeWidth={2} />Search</span>
              {action && <span className="inline-flex items-center rounded-md bg-brand-600 px-2.5 py-1 text-[10px] font-medium text-white">{action}</span>}
            </div>
          </div>
          {/* content */}
          <div className="p-3 sm:p-3.5 space-y-3 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   The 10 product mockups
   ============================================================ */

// 01 — AI Sales Copilot (custom CRM)
function SalesScreen() {
  return (
    <AppMock
      name="Pipeline" mark="P" accent="bg-indigo-600"
      nav={[{ icon: LayoutDashboard, label: 'Dashboard' }, { icon: KanbanSquare, label: 'Pipeline' }, { icon: Users, label: 'Contacts' }, { icon: ListChecks, label: 'Tasks' }, { icon: BarChart3, label: 'Reports' }]}
      active="Pipeline" title="Pipeline" sub="Q2 · all reps" action="New deal"
    >
      <KpiRow>
        <Kpi label="Open pipeline" value="$284k" delta="+18%" />
        <Kpi label="Win rate" value="62%" delta="+14" />
        <Kpi label="Avg deal" value="$46k" delta="+9%" />
      </KpiRow>
      <AiBanner cta="Draft">Copilot — Riverside opened your quote 3× this week. Send the nudge?</AiBanner>
      <Block title="Open deals" action="4 of 28">
        <Table
          cols={[{ label: 'Company' }, { label: 'Stage' }, { label: 'Value', align: 'right' }, { label: 'Next step', align: 'right' }]}
          rows={[
            ['Riverside Mfg', <Chip tone="blue">Proposal</Chip>, '$58k', 'Send nudge'],
            ['Delta Logistics', <Chip tone="amber">Negotiation</Chip>, '$42k', 'Call Thu'],
            ['Acme Retail', <Chip tone="violet">Discovery</Chip>, '$31k', 'Demo booked'],
            ['Northwind', <Chip tone="emerald">Verbal yes</Chip>, '$76k', 'Send contract'],
          ]}
        />
      </Block>
    </AppMock>
  );
}

// 02 — Workflow Automation Hub
function FlowsScreen() {
  const steps = [
    { icon: FileCheck2, label: 'Contract signed' },
    { icon: KanbanSquare, label: 'Create project' },
    { icon: FileText, label: 'Draft invoice' },
    { icon: ListChecks, label: 'Assign tasks' },
    { icon: Bell, label: 'Notify team' },
  ];
  return (
    <AppMock
      name="Flows" mark="F" accent="bg-violet-600"
      nav={[{ icon: LayoutDashboard, label: 'Dashboard' }, { icon: Workflow, label: 'Workflows' }, { icon: Activity, label: 'Runs' }, { icon: PlugZap, label: 'Connections' }, { icon: ScrollText, label: 'Logs' }]}
      active="Workflows" title="Workflows" sub="12 active" action="New workflow"
    >
      <KpiRow>
        <Kpi label="Runs today" value="1,204" delta="+6%" />
        <Kpi label="Success" value="99.2%" />
        <Kpi label="Hours saved" value="38h" delta="this wk" />
      </KpiRow>
      <Block title="Client onboarding" action="runs on contract signed">
        <div className="p-3 flex items-center gap-1.5 overflow-x-auto">
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-1.5 rounded-md bg-white ring-1 ring-gray-200 px-2 py-1.5 shrink-0">
                <s.icon className="w-3 h-3 text-brand-600" strokeWidth={1.75} />
                <span className="text-[10px] text-gray-700 whitespace-nowrap">{s.label}</span>
              </div>
              {i < steps.length - 1 && <ArrowRight className="w-3 h-3 text-gray-300 shrink-0" strokeWidth={2} />}
            </React.Fragment>
          ))}
        </div>
      </Block>
      <Block title="Active workflows">
        <Table
          cols={[{ label: 'Workflow' }, { label: 'Trigger' }, { label: 'Last run', align: 'right' }, { label: 'Status', align: 'right' }]}
          rows={[
            ['Client onboarding', 'Contract signed', '2m ago', <Chip tone="emerald">Active</Chip>],
            ['Invoice follow-up', 'Invoice overdue', '1h ago', <Chip tone="emerald">Active</Chip>],
            ['Lead routing', 'Form submitted', '5m ago', <Chip tone="emerald">Active</Chip>],
            ['Weekly report', 'Every Monday', 'Mon 9:00', <Chip tone="gray">Scheduled</Chip>],
          ]}
        />
      </Block>
    </AppMock>
  );
}

// 03 — 24/7 AI Support & Voice Agents
function SupportScreen() {
  return (
    <AppMock
      name="Helpdesk" mark="H" accent="bg-sky-600"
      nav={[{ icon: Inbox, label: 'Inbox' }, { icon: MessageSquare, label: 'Conversations' }, { icon: Phone, label: 'Voice' }, { icon: BarChart3, label: 'Analytics' }]}
      active="Inbox" title="Inbox" sub="AI-assisted" subLive="emerald" action="Compose"
    >
      <KpiRow>
        <Kpi label="Handled" value="1,240" delta="+22%" />
        <Kpi label="Resolved by AI" value="78%" delta="+11" />
        <Kpi label="Avg reply" value="12s" />
      </KpiRow>
      <Block title="Conversations" action="live">
        <div className="divide-y divide-gray-100">
          {[
            { who: 'Sarah M.', msg: 'Do you ship to Canada?', ch: ['Chat', 'blue'], st: ['AI resolved', 'emerald'] },
            { who: 'Inbound call', msg: 'Booking for Friday 2pm', ch: ['Voice', 'violet'], st: ['Booked', 'emerald'] },
            { who: 'Mike R.', msg: "Where's my order #3391?", ch: ['Email', 'amber'], st: ['AI replied', 'amber'] },
            { who: 'New lead', msg: 'Pricing for 50 units', ch: ['Chat', 'blue'], st: ['Qualified →', 'blue'] },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-2.5 px-3 py-2">
              <span className="w-6 h-6 rounded-full bg-gray-100 ring-1 ring-gray-200 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-gray-900 leading-tight truncate">{c.who}</p>
                <p className="text-[10.5px] text-gray-500 truncate">{c.msg}</p>
              </div>
              <Chip tone={c.ch[1]}>{c.ch[0]}</Chip>
              <Chip tone={c.st[1]}>{c.st[0]}</Chip>
            </div>
          ))}
        </div>
      </Block>
    </AppMock>
  );
}

// 04 — Predictive Inventory
function InventoryScreen() {
  return (
    <AppMock
      name="Inventory" mark="I" accent="bg-teal-600"
      nav={[{ icon: LayoutDashboard, label: 'Overview' }, { icon: LineChart, label: 'Forecast' }, { icon: Truck, label: 'Orders' }, { icon: Boxes, label: 'Suppliers' }]}
      active="Forecast" title="Demand forecast" sub="Next 6 weeks" action="Create PO"
    >
      <KpiRow>
        <Kpi label="Forecast acc." value="94%" delta="+3" />
        <Kpi label="Stockouts" value="0" delta="−12" />
        <Kpi label="Cash freed" value="$48k" delta="+" />
      </KpiRow>
      <Block title="Projected demand" action="94% accuracy">
        <div className="p-3">
          <Bars bars={[{ l: 'W1', v: 60 }, { l: 'W2', v: 72 }, { l: 'W3', v: 65 }, { l: 'W4', v: 92, hot: true }, { l: 'W5', v: 70 }, { l: 'W6', v: 81 }]} />
        </div>
      </Block>
      <Block title="Reorder plan">
        <Table
          cols={[{ label: 'SKU' }, { label: 'On hand', align: 'right' }, { label: '6-wk demand', align: 'right' }, { label: 'Action', align: 'right' }]}
          rows={[
            ['Pinot Noir 750ml', '64', '210', <Chip tone="amber">Reorder 150</Chip>],
            ['Cabernet 750ml', '320', '180', <Chip tone="emerald">OK</Chip>],
            ['IPA 6-pack', '28', '240', <Chip tone="rose">Order now</Chip>],
            ['Seltzer 12-pack', '140', '96', <Chip tone="emerald">OK</Chip>],
          ]}
        />
      </Block>
    </AppMock>
  );
}

// 05 — Cash-Flow Co-Pilot
function FinanceScreen() {
  return (
    <AppMock
      name="Finance" mark="$" accent="bg-emerald-600"
      nav={[{ icon: LayoutDashboard, label: 'Dashboard' }, { icon: LineChart, label: 'Cash flow' }, { icon: FileText, label: 'Invoices' }, { icon: Landmark, label: 'Accounts' }]}
      active="Cash flow" title="Cash flow" sub="90-day projection" action="Export"
    >
      <KpiRow>
        <Kpi label="90-day position" value="$312k" delta="+4%" />
        <Kpi label="AR outstanding" value="$86k" down delta="3 late" />
        <Kpi label="Runway" value="7.4mo" />
      </KpiRow>
      <Block title="Projected balance" action="on track">
        <div className="p-3">
          <Bars height="h-20" bars={[{ l: 'Jun', v: 78 }, { l: 'Jul', v: 70 }, { l: 'Aug', v: 62 }, { l: 'Sep', v: 55, hot: true }, { l: 'Oct', v: 64 }, { l: 'Nov', v: 73 }, { l: 'Dec', v: 80 }]} />
        </div>
      </Block>
      <AiBanner cta="Review">Anomaly — vendor &ldquo;Acme&rdquo; charged $4,200, about 2× the usual. Worth a look.</AiBanner>
      <Block title="Accounts receivable">
        <Table
          cols={[{ label: 'Customer' }, { label: 'Amount', align: 'right' }, { label: 'Age', align: 'right' }, { label: 'Status', align: 'right' }]}
          rows={[
            ['Riverside Mfg', '$24k', '38d', <Chip tone="amber">Chasing</Chip>],
            ['Delta Logistics', '$12k', '9d', <Chip tone="emerald">Current</Chip>],
            ['Northwind', '$31k', '61d', <Chip tone="rose">Overdue</Chip>],
          ]}
        />
      </Block>
    </AppMock>
  );
}

// 06 — Smart Scheduling
function ScheduleScreen() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const rows = [
    { name: 'Ava', cells: [['9–5', 'brand'], ['9–5', 'brand'], ['off', 'off'], ['Peak', 'emerald'], ['9–5', 'brand']] },
    { name: 'Ben', cells: [['off', 'off'], ['12–8', 'brand'], ['12–8', 'brand'], ['Peak', 'emerald'], ['12–8', 'brand']] },
    { name: 'Cara', cells: [['9–5', 'brand'], ['off', 'off'], ['9–5', 'brand'], ['9–5', 'brand'], ['off', 'off']] },
    { name: 'Dan', cells: [['Peak', 'emerald'], ['9–5', 'brand'], ['9–5', 'brand'], ['off', 'off'], ['Peak', 'emerald']] },
  ];
  const tone = (t) => t === 'emerald' ? 'bg-emerald-100 text-emerald-700' : t === 'off' ? 'bg-gray-50 text-gray-300' : 'bg-brand-100 text-brand-700';
  return (
    <AppMock
      name="Schedule" mark="S" accent="bg-rose-600"
      nav={[{ icon: CalendarDays, label: 'Schedule' }, { icon: Users, label: 'Team' }, { icon: UserCheck, label: 'Requests' }, { icon: BarChart3, label: 'Reports' }]}
      active="Schedule" title="This week" sub="Auto-staffed to demand" action="Publish"
    >
      <KpiRow>
        <Kpi label="Coverage" value="100%" delta="✓" />
        <Kpi label="Open shifts" value="0" delta="−5" />
        <Kpi label="Labor %" value="31%" />
      </KpiRow>
      <Block title="Week of Jun 16">
        <div className="p-3">
          <div className="grid grid-cols-[2.6rem,repeat(5,1fr)] gap-1 mb-1">
            <span />
            {days.map((d) => <span key={d} className="text-[9px] text-gray-400 text-center font-medium">{d}</span>)}
          </div>
          {rows.map((r) => (
            <div key={r.name} className="grid grid-cols-[2.6rem,repeat(5,1fr)] gap-1 mb-1">
              <span className="text-[10px] text-gray-600 flex items-center font-medium">{r.name}</span>
              {r.cells.map((c, i) => (
                <span key={i} className={`h-6 rounded flex items-center justify-center text-[9px] font-medium ${tone(c[1])}`}>{c[0]}</span>
              ))}
            </div>
          ))}
        </div>
      </Block>
      <AiBanner cta="Approve">Friday is forecast +40% busier — Ava &amp; Dan auto-added to the peak block.</AiBanner>
    </AppMock>
  );
}

// 07 — Marketing & Loyalty Engine
function LoyaltyScreen() {
  return (
    <AppMock
      name="Campaigns" mark="C" accent="bg-pink-600"
      nav={[{ icon: Megaphone, label: 'Campaigns' }, { icon: Layers, label: 'Segments' }, { icon: Users, label: 'Audiences' }, { icon: BarChart3, label: 'Reports' }]}
      active="Campaigns" title="Loyalty campaign" sub="Live" subLive="emerald" action="New campaign"
    >
      <KpiRow>
        <Kpi label="Reach" value="4,200" />
        <Kpi label="Redeemed" value="612" delta="+38%" />
        <Kpi label="Revenue" value="$28k" delta="+19%" />
      </KpiRow>
      <Block title="Campaign funnel">
        <div className="p-3">
          <Funnel stages={[{ l: 'Sent', v: 4200 }, { l: 'Opened', v: 2730 }, { l: 'Clicked', v: 940 }, { l: 'Redeemed', v: 612 }]} />
        </div>
      </Block>
      <Block title="By segment">
        <Table
          cols={[{ label: 'Segment' }, { label: 'Size', align: 'right' }, { label: 'Offer' }, { label: 'Redeemed', align: 'right' }]}
          rows={[
            ['VIP · lapsing', '380', '20% + free ship', <Chip tone="emerald">31%</Chip>],
            ['Regulars', '1,240', 'Double points', <Chip tone="emerald">18%</Chip>],
            ['New · 30d', '920', 'Welcome bundle', <Chip tone="blue">12%</Chip>],
            ['Win-back', '1,660', 'We miss you', <Chip tone="amber">7%</Chip>],
          ]}
        />
      </Block>
    </AppMock>
  );
}

// 08 — The Company Brain (knowledge base)
function KnowledgeScreen() {
  return (
    <AppMock
      name="Knowledge" mark="B" accent="bg-amber-600"
      nav={[{ icon: Sparkles, label: 'Ask' }, { icon: BookOpen, label: 'Sources' }, { icon: Layers, label: 'Spaces' }, { icon: History, label: 'History' }]}
      active="Ask" title="Ask the Company Brain" sub="Trained on your docs, Slack & SOPs" action="New space"
    >
      <div className="flex items-center gap-2 rounded-lg bg-white ring-1 ring-gray-200 px-3 py-2">
        <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" strokeWidth={1.75} />
        <span className="text-[11px] text-gray-700">How do we handle a rush wholesale order?</span>
      </div>
      <Block title="Answer">
        <div className="p-3">
          <p className="text-[11.5px] text-gray-700 leading-relaxed">
            Flag the order as <span className="font-medium text-gray-900">Rush</span>, get ops-lead approval, add the 15% expedite fee, then notify the account rep. Cutoff for same-day is 2pm ET.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Chip tone="gray"><BookOpen className="w-2.5 h-2.5" /> Ops SOP §4.2</Chip>
            <Chip tone="gray"><FileText className="w-2.5 h-2.5" /> Pricing.xlsx</Chip>
            <Chip tone="gray"><MessageSquare className="w-2.5 h-2.5" /> #wholesale</Chip>
          </div>
        </div>
      </Block>
      <Block title="Recent questions">
        <div className="divide-y divide-gray-100">
          {['What is our return window?', 'PTO accrual for new hires?', 'Which carrier for LTL freight?'].map((q) => (
            <div key={q} className="flex items-center gap-2 px-3 py-2">
              <p className="text-[11px] text-gray-600 flex-1 truncate">{q}</p>
              <Chip tone="emerald">answered</Chip>
            </div>
          ))}
        </div>
      </Block>
    </AppMock>
  );
}

// 09 — Computer-Vision QA & Safety
function QualityScreen() {
  return (
    <AppMock
      name="Quality" mark="Q" accent="bg-slate-700"
      nav={[{ icon: Camera, label: 'Live' }, { icon: FileCheck2, label: 'Inspections' }, { icon: AlertTriangle, label: 'Defects' }, { icon: Bell, label: 'Alerts' }]}
      active="Live" title="Line 3 · live" sub="Vision QA" subLive="rose" action="Export"
    >
      <div className="relative rounded-lg overflow-hidden ring-1 ring-gray-200 bg-gradient-to-br from-slate-100 to-slate-200 h-28">
        <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px,transparent 1px),linear-gradient(90deg,#94a3b8 1px,transparent 1px)', backgroundSize: '16px 16px' }} />
        <div className="absolute left-[24%] top-[26%] w-16 h-14 rounded border-2 border-emerald-500">
          <span className="absolute -top-4 left-0 text-[8px] bg-emerald-500 text-white px-1 rounded-sm whitespace-nowrap">Pass 99%</span>
        </div>
        <span className="absolute top-2 right-2 inline-flex items-center gap-1 text-[8px] font-medium text-rose-600 bg-white/85 rounded px-1.5 py-0.5"><Live tone="rose" />REC</span>
        <span className="absolute bottom-2 left-2 text-[8px] text-slate-500 bg-white/70 rounded px-1.5 py-0.5">Cam 3 · 1,120 units/hr</span>
      </div>
      <KpiRow>
        <Kpi label="Pass rate" value="98.4%" delta="+0.6" />
        <Kpi label="Defects caught" value="37" delta="today" />
        <Kpi label="False alarms" value="0.2%" />
      </KpiRow>
      <Block title="Recent inspections" action="live">
        <Table
          cols={[{ label: 'Unit' }, { label: 'Check' }, { label: 'Result', align: 'right' }, { label: 'Time', align: 'right' }]}
          rows={[
            ['#4412', 'Surface', <Chip tone="emerald">Pass</Chip>, '0:02'],
            ['#4413', 'Surface', <Chip tone="rose">Defect</Chip>, '0:05'],
            ['Floor', 'PPE / safety', <Chip tone="emerald">Clear</Chip>, '0:07'],
            ['#4414', 'Surface', <Chip tone="emerald">Pass</Chip>, '0:09'],
          ]}
        />
      </Block>
    </AppMock>
  );
}

// 10 — Vertical AI Copilot
function CopilotScreen() {
  return (
    <AppMock
      name="Assistant" mark="A" accent="bg-gray-900"
      nav={[{ icon: Sparkles, label: 'Assistant' }, { icon: FileText, label: 'Documents' }, { icon: ListChecks, label: 'Tasks' }, { icon: Settings, label: 'Settings' }]}
      active="Assistant" title="Assistant" sub="Construction · trained on your specs" action="New chat"
    >
      <Chat
        turns={[
          { me: true, text: 'Draft the change-order language for the added curtain-wall scope.' },
          { text: 'Drafted per your contract template + AIA G701. Schedule impact: 5 days — needs PM sign-off before it sends.', chips: ['AIA G701', 'Spec §08 44 00', 'Contract v3'] },
        ]}
      />
      <div className="flex flex-wrap gap-1.5">
        <Chip tone="blue">Insert into document</Chip>
        <Chip tone="blue">Send to PM</Chip>
        <Chip tone="blue">Log as task</Chip>
      </div>
      <Block title="Context used">
        <div className="divide-y divide-gray-100">
          {[['Prime contract — Art. 7 Changes', FileText], ['Curtain-wall submittal log', FileCheck2], ['Project schedule (P6 export)', CalendarDays]].map(([t, Icon], i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2">
              <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" strokeWidth={1.75} />
              <p className="text-[11px] text-gray-600 flex-1 truncate">{t}</p>
              <Chip tone="gray">cited</Chip>
            </div>
          ))}
        </div>
      </Block>
    </AppMock>
  );
}

/* ============================================================
   The 10 ideas — copy + the screen that renders each
   ============================================================ */
const IDEAS = [
  {
    n: '01', name: 'AI Sales Copilot', tag: 'Custom CRM', Screen: SalesScreen,
    villain: 'Your reps spend their day on data entry, and deals slip through the cracks of a CRM nobody likes.',
    build: 'A CRM that logs every email, call, and meeting on its own — scores each lead and tells your reps the next best move.',
    win: 'Reps sell instead of typing. A pipeline you can finally trust.',
    features: ['Auto-logs every touch', 'Lead scoring + next best action', 'AI-drafted follow-ups', 'A forecast you can trust'],
  },
  {
    n: '02', name: 'Workflow Automation Hub', tag: 'Operations', Screen: FlowsScreen,
    villain: 'Eight disconnected tools and a person copy-pasting between them — the “human bridge” that breaks when they’re out.',
    build: 'One hub where a signed contract auto-creates the project, the invoice, the tasks, and the team notifications.',
    win: 'Handoffs happen by themselves. Nothing falls through.',
    features: ['Drag-and-drop builder', '200+ app connections', 'Branching + approvals', 'Full audit log'],
  },
  {
    n: '03', name: '24/7 AI Support & Voice Agents', tag: 'Customer service', Screen: SupportScreen,
    villain: 'After-hours leads go cold and FAQs eat your team alive — you can’t answer the phone at 11pm.',
    build: 'Custom AI agents that answer questions, qualify leads, and book appointments around the clock — in your voice.',
    win: 'You never miss a lead again. Your team handles the exceptions, not the basics.',
    features: ['Chat, email & voice in one inbox', 'Books appointments live', 'Qualifies & routes leads', 'Escalates the edge cases'],
  },
  {
    n: '04', name: 'Predictive Inventory', tag: 'Supply & demand', Screen: InventoryScreen,
    villain: 'Cash trapped in overstock on one shelf while you stock out — and lose the sale — on the next.',
    build: 'Forecasting tuned to your real sales history and seasonality, telling you exactly what to order and when.',
    win: 'Order what you’ll actually sell. Free the cash you’ve got sitting on shelves.',
    features: ['Demand forecast by SKU', 'Automatic reorder points', 'Seasonality + promotions', 'Supplier lead times'],
  },
  {
    n: '05', name: 'Cash-Flow Co-Pilot', tag: 'FinOps', Screen: FinanceScreen,
    villain: 'Most owners don’t see the cash problem until the account hits zero. By then it’s a crisis, not a decision.',
    build: 'Bank and accounting feeds that forecast your 90-day cash position, flag anomalies, and chase late invoices for you.',
    win: 'See the wall before you hit it. Make the call while you still have options.',
    features: ['90-day cash projection', 'Anomaly & fraud flags', 'Automated AR chasing', 'What-if scenario planning'],
  },
  {
    n: '06', name: 'Smart Scheduling', tag: 'Workforce', Screen: ScheduleScreen,
    villain: 'Scheduling chaos, no-shows, and a manager fielding swap-request texts all weekend.',
    build: 'Predictive scheduling that staffs for your real busy periods, automates swaps, and onboards new hires hands-free.',
    win: 'The right people on the right shifts — without the Sunday-night Tetris.',
    features: ['Demand-based staffing', 'Self-serve shift swaps', 'Labor-cost guardrails', 'Compliance built in'],
  },
  {
    n: '07', name: 'Marketing & Loyalty Engine', tag: 'Growth', Screen: LoyaltyScreen,
    villain: 'Generic blasts and one-size coupons that train your best customers to ignore you.',
    build: 'Behavior-based segmentation that sends each customer the right message at the right moment — not another spray-and-pray.',
    win: 'The right offer to the right person. Repeat customers who actually feel known.',
    features: ['Behavioral segments', 'Per-segment offers', 'Lifecycle automations', 'Revenue you can attribute'],
  },
  {
    n: '08', name: 'The Company Brain', tag: 'Knowledge base', Screen: KnowledgeScreen,
    villain: 'Tribal knowledge — the silent killer of scaling. When your best people leave, the “how” walks out with them.',
    build: 'A knowledge base that ingests your SOPs, Slack history, and docs so anyone can ask “how do we…?” in plain English.',
    win: 'Every new hire is instantly up to speed. The company’s memory stops depending on one person.',
    features: ['Ingests docs, Slack & SOPs', 'Cited, sourced answers', 'Permission-aware', 'Always current'],
  },
  {
    n: '09', name: 'Computer-Vision QA & Safety', tag: 'Manufacturing', Screen: QualityScreen,
    villain: 'A defect slips past the line and reaches the customer — or a safety miss becomes an incident.',
    build: 'Standard cameras plus custom AI that spots defects and safety violations in real time, right on the floor.',
    win: 'Catch it on the line, not at the customer. Fewer recalls, fewer incidents.',
    features: ['Real-time defect detection', 'PPE & safety checks', 'Works with standard cameras', 'Full traceability log'],
  },
  {
    n: '10', name: 'Vertical AI Copilot', tag: 'Your industry', Screen: CopilotScreen,
    villain: 'Generic AI doesn’t know your jargon, your rules, or how your industry actually works.',
    build: 'A copilot trained on your vertical — the terminology, the regulations, the workflows — built around your business.',
    win: 'An expert assistant that speaks your language, not a chatbot you have to babysit.',
    features: ['Trained on your domain', 'Knows your rules & jargon', 'Drafts and checks the work', 'Human-in-the-loop sign-off'],
  },
];

function setMeta(name, content, isProperty = false) {
  if (typeof document === 'undefined') return;
  const attr = isProperty ? 'property' : 'name';
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attr, name); document.head.appendChild(tag); }
  tag.setAttribute('content', content);
}

export default function IdeasIndex() {
  useEffect(() => {
    document.title = 'Custom Software Ideas — 10 ways to out-hustle the big guys | FusionSales.ai';
    setMeta('description', 'Ten custom-software builds that let a small team out-hustle the giants — AI sales copilot, automation hub, 24/7 AI support, predictive inventory, cash-flow co-pilot, and more. Each shown as a real product interface, so you see exactly what your build would look like.');
    setMeta('og:title', 'Custom Software Ideas — out-hustle the big guys', true);
    setMeta('og:description', 'Ten custom builds that make a 10-person team feel like 100 — each shown as a real product screen.', true);
    setMeta('og:url', 'https://fusionsales.ai/ideas', true);
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', 'https://fusionsales.ai/ideas');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 text-gray-900" aria-label="FusionSales.ai home">
            <img src="/favicon.svg" alt="" className="w-7 h-7" width="28" height="28" />
            <span className="text-xl tracking-tight font-medium">FusionSales</span>
            <span className="text-xl tracking-tight text-gray-400 font-light">.ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition">Home</a>
            <a href="/ideas" className="text-gray-900 relative">Ideas<span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-600" /></a>
            <a href="/tools" className="text-gray-600 hover:text-gray-900 transition">Tools</a>
            <a href="/insights" className="text-gray-600 hover:text-gray-900 transition">Insights</a>
          </nav>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm hover:bg-gray-800 transition">Schedule a Conversation</a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <a href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition mb-10"><ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back to home</a>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6">Custom software ideas</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight text-gray-900 max-w-4xl">
              Ten ways to <span className="text-gray-500">out-hustle the big guys.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-gray-800 leading-relaxed max-w-3xl">
              Your real competition isn&rsquo;t the shop down the street &mdash; it&rsquo;s a billion-dollar company with a thousand engineers. You can&rsquo;t out-spend them. But you can <span className="text-gray-900 font-medium">out-hustle</span> them. Custom software is how a ten-person team starts to feel like a hundred.
            </p>
            <p className="mt-5 text-base text-gray-600 leading-relaxed max-w-3xl">
              Below are ten builds we do &mdash; each shown as a <span className="text-gray-900 font-medium">real product interface</span>, not a screenshot of a slide. This is the bar we build to: clean, fast, yours.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gray-900 text-white text-sm md:text-base hover:bg-gray-800 transition">Build one of these <ArrowRight className="w-4 h-4" /></a>
              <a href="/tools" className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-gray-900 text-gray-900 text-sm md:text-base hover:bg-gray-900 hover:text-white transition">Or play with the live demos</a>
            </div>
          </div>
        </section>

        {/* The 10 ideas — alternating, app mockup always the wider column */}
        <section className="bg-white">
          <div className="max-w-[80rem] mx-auto px-4">
            {IDEAS.map((idea, i) => {
              const flip = i % 2 === 1;
              const Screen = idea.Screen;
              return (
                <div key={idea.n} className="py-14 md:py-20 border-b border-gray-100 last:border-0">
                  <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* text */}
                    <div className={`lg:col-span-5 ${flip ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="font-display text-3xl font-light text-brand-500 tabular-nums">{idea.n}</span>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 border border-gray-200 rounded-full px-3 py-1">{idea.tag}</span>
                      </div>
                      <h2 className="font-display text-2xl md:text-4xl font-light tracking-tight text-gray-900 mb-5 leading-tight">{idea.name}</h2>
                      <div className="space-y-4 max-w-xl">
                        <p className="text-gray-600 leading-relaxed"><span className="text-[11px] uppercase tracking-[0.18em] text-gray-400 block mb-1">The problem</span>{idea.villain}</p>
                        <p className="text-gray-900 leading-relaxed"><span className="text-[11px] uppercase tracking-[0.18em] text-brand-700 block mb-1">What we build</span>{idea.build}</p>
                        <p className="text-gray-700 leading-relaxed flex items-start gap-2"><Check className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" strokeWidth={1.75} /><span>{idea.win}</span></p>
                      </div>
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 max-w-xl">
                        {idea.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* product mockup */}
                    <div className={`lg:col-span-7 ${flip ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative">
                        <div aria-hidden className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-[40px] bg-gradient-to-tr from-brand-500/10 via-brand-300/5 to-transparent blur-2xl" />
                        <div className="relative motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-apple hover:-translate-y-1">
                          <Screen />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 py-20 md:py-24 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight tracking-tight mb-6">The giants are slow. You&rsquo;re fast. Let&rsquo;s keep it that way.</h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed mb-10">Pick the one that would change your week. We&rsquo;ll model it for your business, free &mdash; and most builds are live in about six weeks.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-gray-900 text-sm md:text-base hover:bg-brand-50 transition">Schedule a Conversation <ArrowRight className="w-4 h-4" /></a>
              <a href="/insights/10-custom-software-ideas-to-out-hustle-the-big-guys" className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white text-white text-sm md:text-base hover:bg-white hover:text-gray-900 transition">Read the full breakdown</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-gray-600">
          <span>© 2026 Arlogix Inc.</span>
          <div className="flex gap-6">
            <a href="/insights" className="hover:text-gray-900 inline-flex items-center gap-1.5">Insights <ArrowUpRight className="w-3 h-3" /></a>
            <a href="/tools" className="hover:text-gray-900 inline-flex items-center gap-1.5">Tools <ArrowUpRight className="w-3 h-3" /></a>
            <a href="/" className="hover:text-gray-900">fusionsales.ai</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
