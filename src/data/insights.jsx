import React from 'react';
import { Lead, P, H2, Quote, Callout, UL, LI, Em, Strong, Link } from '../components/Prose';

// =====================
// AUTHORS
// =====================
export const AUTHORS = {
  mike: {
    name: 'Mike Sweigart',
    title: 'CEO',
    bio:
      'Mike has spent fifteen years building software for businesses that don’t fit the template. He founded FusionSales.ai to make custom-built tools accessible to growing companies.',
    voiceNote: 'Visionary, practical, direct.',
  },
  lauren: {
    name: 'Lauren Mitchell',
    title: 'CTO',
    bio:
      'Lauren leads engineering at FusionSales.ai. She’s shipped custom software for healthcare, finance, and operations teams across the Southeast.',
    voiceNote: 'Precise, systems-oriented, technical but accessible.',
  },
  david: {
    name: 'David Chen',
    title: 'CFO',
    bio:
      'David runs finance at FusionSales.ai. He’s built ROI models for software investments at three growth-stage SaaS companies before joining the team.',
    voiceNote: 'Measured, financial, ROI-driven, risk-aware.',
  },
  sarah: {
    name: 'Sarah Patel',
    title: 'Head of Product Strategy',
    bio:
      'Sarah shapes how FusionSales.ai approaches every build — starting with how real users do their work, not what the spec sheet says.',
    voiceNote: 'User-centered, operational, empathetic.',
  },
  evan: {
    name: 'Evan Brooks',
    title: 'VP of Revenue Operations',
    bio:
      'Evan leads RevOps at FusionSales.ai. He’s built quote-to-cash systems for commercial moving, insurance, and B2B services teams.',
    voiceNote: 'Sales/process focused, tactical, urgent.',
  },
};

export const CATEGORIES = [
  'Strategy',
  'Operations',
  'Sales & RevOps',
  'Finance',
  'Product & UX',
];

// =====================
// FULL ARTICLE BODIES (StoryBrand-voiced)
// =====================

// ----- #1 Mike -----
const Body_OffTheShelf = () => (
  <>
    <Lead>
      There&rsquo;s a moment, usually somewhere around year four or five, when the software that
      got you here starts feeling like a tax. You don&rsquo;t notice it all at once. It shows up as
      five extra clicks. A spreadsheet your operations lead built to bridge two systems. A weekly
      meeting that exists only because the CRM can&rsquo;t show you what you actually need.
    </Lead>

    <P>
      You assume it&rsquo;s normal. Every business runs on a few workarounds. But the workarounds
      aren&rsquo;t normal. They&rsquo;re a signal. They&rsquo;re your team telling you, quietly and
      every week, that the software isn&rsquo;t fitting anymore.
    </P>

    <P>
      The reason this is hard to see is that nothing breaks. The system still works. The reports
      still print. The dashboards still load. The friction is everywhere and nowhere, and because
      it&rsquo;s spread across a hundred small moments, it never reaches a single person&rsquo;s
      desk as a decision to make.
    </P>

    <H2>The signs you&rsquo;ve outgrown your software</H2>

    <P>
      Most leaders can spot the pattern once they look for it. Here&rsquo;s what to watch for:
    </P>

    <UL>
      <LI>Your team exports data to spreadsheets to do real work</LI>
      <LI>You&rsquo;re paying for features nobody on the team actually uses</LI>
      <LI>New hires take weeks, not days, to learn the system</LI>
      <LI>Important information lives in someone&rsquo;s head, not the system</LI>
      <LI>Weekly reporting takes longer than the meeting it&rsquo;s prepping for</LI>
      <LI>Your most senior people are the ones doing the most data entry</LI>
    </UL>

    <P>
      None of these are user-error problems. They&rsquo;re fit problems. The platform was designed
      for someone whose business looked different from yours. Maybe it served you well two years
      ago. It&rsquo;s not serving you now.
    </P>

    <H2>Why off-the-shelf software stops fitting</H2>

    <P>
      When a generic platform serves fifty thousand customers, it has to be a little bit useful to
      all of them. That means it can&rsquo;t be precisely useful to any of them. The product team
      had to pick: build the workflow your industry actually uses, or build the abstract version
      that <Em>kind of</Em> works for everyone.
    </P>

    <P>
      They built the abstract version. They had to. That&rsquo;s the business model.
    </P>

    <P>
      So when your team needs to quote a multi-state move with custom equipment, they fight the
      form. When your insurance agency needs to track cross-sells across product lines, they build
      a separate sheet. When your healthcare practice needs to schedule across providers and
      locations with insurance pre-auth in the mix &mdash; well, you know what happens.
    </P>

    <H2>The quiet cost of &ldquo;good enough&rdquo;</H2>

    <P>
      Most leaders accept the friction because the alternative &mdash; custom software &mdash; used
      to be unreachable. Six-figure agency fees. Year-long timelines. Half the projects ended with
      a system nobody used. So the math made sense to keep grinding through the off-the-shelf tax.
      Hire another ops person. Add another integration. Train new reps on the workarounds.
    </P>

    <P>
      But the math has changed. (See{' '}
      <Link slug="why-custom-software-is-no-longer-just-for-enterprise">
        Why Custom Software Is No Longer Just for Enterprise
      </Link>
      .) Expert teams paired with AI now build in weeks what agencies used to build in quarters.
      The build option isn&rsquo;t twelve months and half a million anymore. It&rsquo;s four weeks
      and roughly the price of two years of your current SaaS subscriptions.
    </P>

    <Callout label="The shift">
      The moment of friction you&rsquo;ve been ignoring is a real signal again. Not a complaint to
      push down. A decision to make.
    </Callout>

    <H2>What to do this week</H2>

    <P>
      If you&rsquo;re reading this, your team has probably already told you something doesn&rsquo;t
      fit. Listen. Take an honest count of the workarounds. Walk the floor &mdash; literally or on
      Zoom &mdash; and ask three people what they do at the end of the day that the system
      doesn&rsquo;t help with. You&rsquo;ll get a list within ten minutes.
    </P>

    <P>
      If you have more than five workarounds, the math is probably already on your side. The next
      step isn&rsquo;t to rip out your stack. It&rsquo;s to take one workflow that hurts the most
      and see what it looks like when the software actually fits. That&rsquo;s where most of our
      conversations start.
    </P>

    <P>
      You don&rsquo;t have to keep paying the off-the-shelf tax. You just have to be willing to
      look at it.
    </P>
  </>
);

// ----- #2 Lauren -----
const Body_BuildVsBuy = () => (
  <>
    <Lead>
      Most build-vs-buy decisions get made the wrong way. Someone in the leadership team is
      frustrated with a current vendor. Someone else thinks building &ldquo;should be cheap with AI
      now.&rdquo; The team takes sides based on instinct. Six weeks later they&rsquo;ve made a
      decision they can&rsquo;t quite explain, and the result tends to be the same: another tool
      added to the stack, another year of friction.
    </Lead>

    <P>
      There&rsquo;s a better way. The build-vs-buy question isn&rsquo;t a religion. It&rsquo;s a
      calculation. Three numbers decide it.
    </P>

    <H2>Number one: how unique is the workflow?</H2>

    <P>
      If your team&rsquo;s process matches what eighty percent of other businesses do, an
      off-the-shelf tool probably exists that does it well. Sales pipeline tracking. Calendar
      booking. Standard invoicing. These are solved problems. Buy.
    </P>

    <P>
      If your process has industry-specific rules, custom regulatory requirements, or a sequence of
      handoffs nobody else has, you&rsquo;re in custom territory. Quoting a commercial move with
      crew, truck, distance, and storage variables. Tracking credentialing across forty states with
      different payor requirements. Routing approvals through a compliance officer who only signs
      certain combinations. Generic tools don&rsquo;t serve these. They can&rsquo;t.
    </P>

    <H2>Number two: how much time is the team losing today?</H2>

    <P>
      Add up the workarounds. Spreadsheets that bridge two systems. Email threads that should be
      tasks. Approvals that take three days because a person is the integration. If the answer is
      more than four hours per person per week, you&rsquo;re paying real labor cost on top of the
      license fee.
    </P>

    <P>
      <Strong>The arithmetic is simple.</Strong> Ten people, four hours a week, fifty weeks, an
      average loaded cost of $60 an hour. That&rsquo;s $120,000 a year in time you&rsquo;re paying
      for and not getting back. (For a deeper dive, see{' '}
      <Link slug="how-to-measure-the-true-cost-of-manual-work">
        How to Measure the True Cost of Manual Work
      </Link>
      .)
    </P>

    <H2>Number three: what&rsquo;s the cost of one error?</H2>

    <P>
      In some businesses, a quote error means a $500 discount to keep the customer happy. In
      others, it&rsquo;s a compliance violation, a missed SLA, a deal lost outright, or a contract
      that can&rsquo;t be enforced. The higher the cost of error, the more value you get from a
      system that&rsquo;s actually designed for your error modes.
    </P>

    <H2>The decision matrix</H2>

    <P><Strong>Buy</Strong> when:</P>
    <UL>
      <LI>The workflow is generic (lots of similar businesses do exactly this)</LI>
      <LI>The market has a clear leader who&rsquo;s been at it ten-plus years</LI>
      <LI>You can live within their roadmap and pricing</LI>
      <LI>You&rsquo;d rather pay per user per month forever than once</LI>
    </UL>

    <P><Strong>Customize</Strong> when:</P>
    <UL>
      <LI>A tool gets seventy percent of the way there</LI>
      <LI>The gaps cost real time but aren&rsquo;t worth a from-scratch build</LI>
      <LI>You can use APIs, automation, or a thin layer on top to close the gap</LI>
    </UL>

    <P><Strong>Build</Strong> when:</P>
    <UL>
      <LI>The workflow is genuinely yours (industry-specific or strategic)</LI>
      <LI>Adoption matters and your team won&rsquo;t use a generic tool with workarounds</LI>
      <LI>The math on workaround labor + license fees + integration cost over three years is higher than a one-time build</LI>
      <LI>You want to own the roadmap so you can adapt as the business changes</LI>
    </UL>

    <Callout label="A note on AI">
      AI doesn&rsquo;t change which option is right — it changes the cost of the build option.
      What used to cost $300k and take a year now lands in the $35k–$150k range over four
      weeks. That tilts the math toward custom for many workflows that didn’t qualify two
      years ago.
    </Callout>

    <H2>The honest gut check</H2>

    <P>
      If your team has been complaining about the same software pain for more than a year, the
      buying decision was probably the wrong one. That&rsquo;s not a failure. Markets change.
      Businesses change. The right software two years ago might not be the right software now.
    </P>

    <P>
      Build-vs-buy isn&rsquo;t a one-time choice. It&rsquo;s a periodic re-evaluation. The teams
      that get it right look at the question every eighteen months, run the three numbers honestly,
      and adjust. If you want help running the calculation for your team, that&rsquo;s what a
      discovery call is for.
    </P>
  </>
);

// ----- #4 Evan -----
const Body_HiddenCostCRM = () => (
  <>
    <Lead>
      Here&rsquo;s the dirty secret of generic CRM systems: the cost on the invoice is the smallest
      number you&rsquo;re paying. The real cost shows up everywhere else — in your reps&rsquo;
      calendars, in your forecasting accuracy, in the deals you don&rsquo;t close because
      follow-ups slipped, in the meetings you hold every Friday because nobody trusts the pipeline
      view.
    </Lead>

    <P>
      You&rsquo;re paying for the license. You&rsquo;re also paying for everything the license
      doesn&rsquo;t do.
    </P>

    <H2>The visible cost: license fees</H2>

    <P>
      A typical mid-market CRM lands somewhere between $150 and $300 per user per month, depending
      on the tier you need to unlock the features you actually use. For a fifteen-person sales
      team, that&rsquo;s $36,000 to $72,000 a year. That&rsquo;s the number on the contract.
    </P>

    <P>
      Most leaders look at this number and decide whether it&rsquo;s worth it. That&rsquo;s the
      wrong question. The right question is what the system <Em>doesn&rsquo;t</Em> do, and what
      that costs you.
    </P>

    <H2>The invisible cost: reps not selling</H2>

    <P>
      Generic CRMs were designed for the platform to be the center of the universe. Every action
      starts there. Every update ends there. The result is that your reps spend hours every week
      typing things into the system instead of selling. Studies put it at anywhere from twenty to
      forty percent of their time on data entry and admin.
    </P>

    <P>
      Take the middle of that range. Thirty percent of a $90,000-a-year rep&rsquo;s time is
      $27,000. Multiply across the team. You&rsquo;re burning a quarter to half a million dollars a
      year on the act of telling the CRM what already happened. That&rsquo;s on top of the license
      fee. The CRM caused it.
    </P>

    <H2>The invisible cost: bad data, bad forecasts</H2>

    <P>
      Because data entry is a chore, reps cut corners. Stages get advanced because reps want a
      number in their forecast. Notes get skipped because nobody is going to read them anyway.
      Activity logs get filled in on Fridays at 4 p.m. in batches that bear only a passing
      resemblance to what actually happened that week.
    </P>

    <P>
      Leadership then runs forecasts on this data. The forecasts are wrong. Hiring decisions,
      compensation plans, capacity planning — all keyed off numbers that don&rsquo;t reflect
      reality. (For more on this, see{' '}
      <Link slug="why-most-crms-fail-at-the-last-mile">
        Why Most CRMs Fail at the Last Mile
      </Link>
      .)
    </P>

    <H2>The invisible cost: the workarounds</H2>

    <P>
      Every team I&rsquo;ve worked with has built shadow systems around their CRM. The
      account-management spreadsheet that lives in someone&rsquo;s Google Drive. The Slack channel
      that&rsquo;s really a deal-stage tracker. The shared Notion page where the team writes the
      actual notes because the CRM&rsquo;s notes field is awful. These exist because the CRM
      didn&rsquo;t serve the work.
    </P>

    <P>
      Every shadow system is a tax. Time to maintain. Knowledge that doesn&rsquo;t scale to new
      hires. Risk that key context lives in one person&rsquo;s head and walks out the door if they
      leave. The CRM was supposed to prevent exactly this. It caused it instead.
    </P>

    <Callout label="The math">
      License fee: $50,000/yr. Rep admin tax: $300,000/yr. Bad-data forecasting overhead: hard to
      price but real. Shadow systems and rework: another $50,000–$100,000/yr. A &ldquo;cheap
      $50k CRM&rdquo; is often a $400,000 problem.
    </Callout>

    <H2>What custom actually fixes</H2>

    <P>
      The pitch isn&rsquo;t to throw out the CRM. The pitch is to be honest about what it does and
      doesn&rsquo;t do for the way <Em>your</Em> team sells, and then build the missing pieces
      around it. Quote generation that matches your products. Follow-up automation that triggers on
      your sales motion. A pipeline view that shows what you actually need to see on Monday
      morning.
    </P>

    <P>
      In most cases, that&rsquo;s a four-week build that pays for itself in the first quarter from
      recovered rep time alone. The CRM stays. The tax goes away.
    </P>

    <P>
      If your team is burning a Friday meeting on pipeline cleanup, you&rsquo;re paying the hidden
      cost. That&rsquo;s a conversation worth having.
    </P>
  </>
);

// ----- #19 Sarah -----
const Body_SoftwareAroundPeople = () => (
  <>
    <Lead>
      The most common mistake in software design is to start with the process and work outward to
      the people. The team draws the workflow on a whiteboard, hands it to engineering, and waits
      for a tool that captures every step. What they get is a system that&rsquo;s technically
      correct and emotionally exhausting. Nobody uses it. The investment goes nowhere.
    </Lead>

    <P>
      The right way is the opposite. Start with the people who&rsquo;ll use the software every
      day, watch them work, and design around what they actually do — not what the org chart
      says they should do.
    </P>

    <H2>Process diagrams lie</H2>

    <P>
      Every business has a documented process. Almost no business runs on it. The actual work flows
      through Slack messages, hallway conversations, and a hundred small judgment calls people make
      every day. The diagram on the wall is the simplified version someone drew during a strategy
      offsite. It&rsquo;s aspirational, not descriptive.
    </P>

    <P>
      When you build software around the diagram, you end up forcing real people into a workflow
      that ignores the judgment calls. The judgment calls are where the value is. So the team
      routes around the new system, and within six months you have another tool collecting dust
      while real work happens in spreadsheets.
    </P>

    <H2>What watching people teaches you</H2>

    <P>
      Spend an hour shadowing the person who&rsquo;ll use the tool most. Don&rsquo;t ask them what
      they need. Watch what they do. You&rsquo;ll see things they would never have told you in a
      requirements meeting:
    </P>

    <UL>
      <LI>The step they do twice because the system doesn&rsquo;t save the first attempt</LI>
      <LI>The shortcut they take that violates the &ldquo;official&rdquo; process and saves twenty minutes</LI>
      <LI>The information they pull from three places to make one decision</LI>
      <LI>The reflex check they do before they trust a number on the screen</LI>
      <LI>The thing they do every Friday that nobody else knows is a thing</LI>
    </UL>

    <P>
      These are the moments where the software needs to help. Not the abstract process diagram. The
      actual work.
    </P>

    <H2>Design for the moment of trust</H2>

    <P>
      Every workflow has a moment where the user needs to trust the system. The salesperson sending
      a quote. The nurse confirming a medication. The ops manager approving a shipment. If the
      system makes that moment feel uncertain — the screen looks different from last time, the
      number doesn&rsquo;t match what they remember, the confirmation is buried under three
      clicks — the user invents a workaround.
    </P>

    <P>
      That&rsquo;s why good internal software <Em>looks</Em> like it was designed for the user.
      Numbers are formatted the way the user reads them. Buttons are where the user&rsquo;s hand is
      already going. The screen tells them what they&rsquo;re about to do, then does it. No
      surprises. (For more on this principle, see{' '}
      <Link slug="why-automation-should-feel-invisible">Why Automation Should Feel Invisible</Link>
      .)
    </P>

    <Callout label="The principle">
      Software adoption isn&rsquo;t a training problem. It&rsquo;s a design problem. If the tool
      fits the way people already work, they&rsquo;ll use it. If it doesn&rsquo;t, no amount of
      training will save it.
    </Callout>

    <H2>What this looks like in practice</H2>

    <P>
      A few signs that a build started from the people, not the process:
    </P>

    <UL>
      <LI>The default view shows what the user came to see, not a menu of everything</LI>
      <LI>The form pre-fills what the user already typed in once</LI>
      <LI>The error message tells the user how to fix it, not just that something went wrong</LI>
      <LI>Common tasks take one click; rare tasks are findable but not in the way</LI>
      <LI>The interface looks calm — nobody is yelling at the user with alerts and badges</LI>
    </UL>

    <P>
      None of this is rocket science. It&rsquo;s just deciding that the user&rsquo;s time and
      attention is worth more than the developer&rsquo;s preferences. That decision is rarer than
      you&rsquo;d think.
    </P>

    <H2>The payoff</H2>

    <P>
      When software is built around people, three things happen. Adoption is fast — most teams
      are productive on day one instead of after a six-week onboarding. Workarounds disappear
      because the system actually serves the work. And the team starts asking for <Em>more</Em>
      features instead of less, because they trust that what gets built will help them.
    </P>

    <P>
      The process matters. But the people are the ones who&rsquo;ll either use the tool or quietly
      ignore it. Design for the people first. Everything else falls in line.
    </P>
  </>
);

// ----- #20 Mike -----
const Body_NoLongerEnterprise = () => (
  <>
    <Lead>
      For decades, custom software meant one thing: an agency engagement that cost between $300,000
      and a million dollars, took six to twelve months, and ended either with a system you owned or
      a hole in your budget and nothing to show for it. The companies that could afford that
      gamble were the same companies that could absorb the loss. That meant Fortune 500. That
      meant enterprise. Small and medium businesses lived with the off-the-shelf tools they could
      afford, even when those tools didn&rsquo;t fit.
    </Lead>

    <P>
      That world is over. Custom-built software is now genuinely accessible to growing businesses,
      and the math has shifted so far that it&rsquo;s changing how serious operators think about
      their stack.
    </P>

    <H2>What changed</H2>

    <P>
      Three things happened in close succession, and together they collapsed the cost of building
      custom software by roughly an order of magnitude.
    </P>

    <P>
      <Strong>First, the tooling matured.</Strong> Modern frameworks, cloud infrastructure, and
      managed databases mean that what used to take a team of six can be built by a team of two.
      The bottleneck shifted from raw engineering capacity to clarity of design.
    </P>

    <P>
      <Strong>Second, AI accelerated the work.</Strong> Expert engineers paired with AI tools ship
      five to ten times faster than they did three years ago. Not because AI writes the whole
      thing, but because the routine 80% of any build — boilerplate, scaffolding, test
      coverage, documentation — happens in a fraction of the time. Engineers spend their hours
      on the 20% that actually requires judgment.
    </P>

    <P>
      <Strong>Third, the playbook got refined.</Strong> Teams that have shipped twenty or thirty
      custom builds know which decisions matter and which don&rsquo;t. They don&rsquo;t need
      six-month discovery phases. They can scope, design, and ship a working tool in four weeks
      because they&rsquo;ve done it twenty times.
    </P>

    <H2>The new math</H2>

    <P>
      Put those three together and you get a different conversation. A custom quote generator that
      used to run $400,000 and twelve months now runs $35,000 and four weeks. A custom CRM that
      used to require a dedicated engineering team for a year now runs $75,000 and six weeks. The
      delta is dramatic enough that it changes which option makes sense for a thirty-person
      business.
    </P>

    <P>
      The off-the-shelf platforms still have their place. (See{' '}
      <Link slug="build-vs-buy-how-to-know-which-path">Build vs. Buy</Link> for when each path is
      right.) But the assumption that custom is automatically out of reach for SMBs is wrong now.
      Worth questioning.
    </P>

    <H2>What this means for growing companies</H2>

    <P>
      A few things become possible that weren&rsquo;t before:
    </P>

    <UL>
      <LI>
        A workflow that&rsquo;s specific to your industry can have its own tool, instead of being
        crammed into a generic CRM
      </LI>
      <LI>
        You can stop paying $200 per user per month forever in exchange for one-time builds that
        you own
      </LI>
      <LI>
        Your software can adapt as your business changes, instead of you adapting to your
        software&rsquo;s roadmap
      </LI>
      <LI>
        AI features can be added where they earn their keep, not because a vendor decided to bolt
        them on
      </LI>
      <LI>
        The accountability and transparency get better — your code, your data, your decisions
      </LI>
    </UL>

    <Callout label="The game-changer">
      For the first time in twenty years, small and medium businesses don&rsquo;t have to choose
      between software that doesn&rsquo;t fit and software they can&rsquo;t afford. There&rsquo;s a
      third option now. And the math is on your side.
    </Callout>

    <H2>Where to start</H2>

    <P>
      If you&rsquo;ve been living with workarounds for a year because custom felt out of reach, the
      question is worth re-asking. The right starting point is one workflow — the one that
      costs your team the most time or the one where the off-the-shelf gaps are the most painful.
      Build that one well. See what it does for the business. Then decide if there&rsquo;s a second
      one.
    </P>

    <P>
      The era of waiting for enterprise software vendors to figure out your business is ending. The
      teams that move first get a real operating advantage. The teams that wait will be working
      around their CRM in 2030.
    </P>
  </>
);

// ----- #29 David -----
const Body_MeasureManual = () => (
  <>
    <Lead>
      Manual work is easy to underestimate because the cost is spread across a thousand small
      moments. Twelve minutes here. Three minutes there. A Friday afternoon spent stitching reports
      together. None of it feels expensive in isolation. Added up across a year, it&rsquo;s often
      the largest line item on your operating budget that nobody put on a P&amp;L.
    </Lead>

    <P>
      If you&rsquo;re a CFO or operating leader trying to make a real decision about software,
      automation, or process redesign, you need to put a number on the manual work. Here&rsquo;s
      how I do it.
    </P>

    <H2>Step one: pick the workflow</H2>

    <P>
      Don&rsquo;t try to measure everything. Pick one workflow that you suspect is expensive but
      can&rsquo;t prove. Examples I see often:
    </P>

    <UL>
      <LI>Quote generation in a B2B services business</LI>
      <LI>Monthly revenue close that requires merging data from three systems</LI>
      <LI>Customer onboarding that involves multiple handoffs and documents</LI>
      <LI>Renewals and cross-sell tracking in insurance or SaaS</LI>
      <LI>Patient scheduling and pre-authorization in healthcare</LI>
    </UL>

    <P>
      Pick the one that comes up most often in complaints or that visibly slows the team down. That
      one.
    </P>

    <H2>Step two: count the hands</H2>

    <P>
      Walk the workflow end to end and list every person who touches it. Don&rsquo;t miss the
      hidden hands — the manager who approves, the admin who confirms, the analyst who
      reformats the output before it goes anywhere. Each of them spends time on this. Each of them
      has a loaded cost.
    </P>

    <P>
      For each person, estimate how much time they spend on this workflow in a typical week. Be
      honest. If you&rsquo;re not sure, ask them directly — just don&rsquo;t ask &ldquo;how
      much time does this take.&rdquo; Ask &ldquo;walk me through what you did this Monday.&rdquo;
      You&rsquo;ll get a real number.
    </P>

    <H2>Step three: multiply</H2>

    <P>
      The formula is straightforward:
    </P>

    <Callout label="The calculation">
      Annual cost of manual work = sum over each person of: (minutes per week &times; weeks per
      year &times; loaded hourly cost &divide; 60)
    </Callout>

    <P>
      A loaded hourly cost is salary divided by 2,000, plus roughly 30% to account for benefits,
      taxes, and overhead. For someone at $80,000 a year, that&rsquo;s around $52 per hour. Be
      consistent across people so the comparison is honest.
    </P>

    <P>
      Run the formula. You&rsquo;ll usually get a number between $40,000 and $400,000 a year for a
      single workflow that the business has been tolerating. (Try the{' '}
      <a
        href="/#calculator"
        className="text-brand-700 underline decoration-brand-200 decoration-2 underline-offset-4 hover:decoration-brand-600 transition-all"
      >
        ROI calculator
      </a>{' '}
      for a quick directional estimate before you do the deeper math.)
    </P>

    <H2>Step four: add the error cost</H2>

    <P>
      Manual work doesn&rsquo;t just cost time. It introduces errors. The quote that went out with
      the wrong line item. The renewal that didn&rsquo;t get sent. The compliance form that was
      filed late.
    </P>

    <P>
      Pick a representative error rate — even one percent of transactions is a useful starting
      point — and a representative cost per error. Multiply. Add to the labor cost.
    </P>

    <P>
      This is where the number usually doubles. Manual work has a labor cost <Em>and</Em> an error
      cost, and the error cost is what makes the conversation urgent.
    </P>

    <H2>Step five: compare to alternatives</H2>

    <P>
      Now you have a real number. Compare it to:
    </P>

    <UL>
      <LI>The annual cost of an off-the-shelf tool that solves it (if one exists)</LI>
      <LI>The one-time cost of a custom build (typically $15,000–$150,000)</LI>
      <LI>The status quo: continuing to pay the manual cost indefinitely</LI>
    </UL>

    <P>
      The third option is the most expensive one on the list, and it&rsquo;s the one most companies
      pick by default — not because they evaluated and chose it, but because they never put
      the number on paper.
    </P>

    <Callout label="The CFO question">
      &ldquo;What does this workflow cost us per year if we change nothing?&rdquo; is the most
      valuable question a finance leader can ask. The answer almost always argues for change.
    </Callout>

    <H2>What to do with the number</H2>

    <P>
      Once you have a real annual cost, the build-vs-buy conversation becomes a calculation, not an
      opinion. A $250,000-a-year manual cost justifies a $75,000 one-time build with a four-month
      payback. A $40,000-a-year manual cost doesn&rsquo;t — keep the workaround, fight other
      battles.
    </P>

    <P>
      The point isn&rsquo;t to build everything. It&rsquo;s to stop guessing. When the cost of
      manual work is on the table next to the cost of alternatives, the right decision tends to
      become obvious. The wrong decision usually came from never doing the math at all.
    </P>
  </>
);

// ----- #50 Mike (flagship) -----
const Body_FutureBelongs = () => (
  <>
    <Lead>
      Every era of business has a defining advantage. In the 1990s it was scale. In the 2000s it
      was a website. In the 2010s it was the cloud and the SaaS stack. The companies that figured
      each of those out first compounded ahead of the ones that waited. In the 2020s, the advantage
      is something different. The companies pulling ahead are the ones that design their own tools.
    </Lead>

    <P>
      This is the philosophy behind everything we do at FusionSales.ai. It&rsquo;s also the bet
      we&rsquo;re asking growing businesses to make. So let me make the case plainly.
    </P>

    <H2>The era of buying software is ending</H2>

    <P>
      For twenty years, the right move for a small or medium business was to rent software. The
      SaaS revolution made enterprise-grade tools available on a credit card. You didn&rsquo;t need
      a development team. You didn&rsquo;t need infrastructure. You just paid the subscription and
      got to work.
    </P>

    <P>
      That trade-off made sense at the time. The cost of building anything custom was prohibitive,
      so renting from a vendor that had already spread the cost across thousands of customers was
      the only rational option. But the trade-off had a tax. You were running your business on
      software designed for someone else, and you were paying for it every month, forever.
    </P>

    <P>
      The tax was tolerable when there was no alternative. There&rsquo;s an alternative now. (See{' '}
      <Link slug="why-custom-software-is-no-longer-just-for-enterprise">
        Why Custom Software Is No Longer Just for Enterprise
      </Link>
      .)
    </P>

    <H2>What designing your own tools actually means</H2>

    <P>
      Designing your own tools doesn&rsquo;t mean replacing everything. It doesn&rsquo;t mean
      hiring a development team. It doesn&rsquo;t mean disrupting your stack. It means three
      things:
    </P>

    <UL>
      <LI>
        Your most important workflows live in software that fits them — quoting, scheduling,
        CRM, whatever matters most for your business
      </LI>
      <LI>You own the code, the data, and the roadmap of those workflows</LI>
      <LI>
        Off-the-shelf tools handle the generic stuff (email, calendar, accounting) where they
        actually fit, and the custom tools handle everything else
      </LI>
    </UL>

    <P>
      The result is a stack that&rsquo;s shaped like your business, not shaped like a vendor&rsquo;s
      idea of what a generic business looks like.
    </P>

    <H2>Why this matters now</H2>

    <P>
      Three things have converged to make this advantage real and durable:
    </P>

    <P>
      <Strong>The cost collapsed.</Strong> Expert teams paired with AI build five to ten times
      faster than agencies did five years ago. What was a $400,000 project is now a $40,000
      project. That changes which businesses can play.
    </P>

    <P>
      <Strong>The technology stabilized.</Strong> Modern frameworks and managed infrastructure mean
      custom software doesn&rsquo;t require a full-time maintenance team. The thing you build
      stays running.
    </P>

    <P>
      <Strong>The pace of business accelerated.</Strong> Markets shift faster than they used to.
      The companies that can change their workflow in a week instead of waiting six months for a
      vendor roadmap are operating in a different gear than the ones that can&rsquo;t.
    </P>

    <H2>The transparency dividend</H2>

    <P>
      There&rsquo;s one more reason this matters, and it&rsquo;s the one nobody talks about. When
      you own the software, you can see what it&rsquo;s doing. You know how it makes decisions. You
      know what data it has and what data it doesn&rsquo;t. You can audit it. You can change it.
      You can explain it to your customers, your auditors, your board.
    </P>

    <P>
      Shared SaaS can&rsquo;t offer that. The vendor controls the algorithm. The vendor controls
      the data. The vendor controls the roadmap. You&rsquo;re a tenant, not an owner. For some
      workflows that&rsquo;s fine. For the ones that define your business, it&rsquo;s a real
      problem and getting worse as AI makes vendor algorithms more opaque, not less.
    </P>

    <Callout label="The bet">
      The companies that will win the next ten years are the ones that own the tools their business
      runs on. Not because they&rsquo;re tech companies. Because they&rsquo;re honest about how
      much of their advantage comes from the way they actually work.
    </Callout>

    <H2>What to do this quarter</H2>

    <P>
      You don&rsquo;t have to commit to a full transformation. Pick one workflow that hurts the
      most. Build that one well. See what owning it does for your team, your speed, and your data.
      If it works, do another. (For the framework on which workflow to pick first, see{' '}
      <Link slug="build-vs-buy-how-to-know-which-path">Build vs. Buy: How to Know Which Path Is Right</Link>
      .)
    </P>

    <P>
      The companies designing their own tools aren&rsquo;t reckless. They&rsquo;re just clear-eyed
      about the new math. Twenty years from now, this will be obvious in retrospect. The teams that
      saw it first will have an enormous head start.
    </P>

    <P>
      That&rsquo;s the bet we&rsquo;re making. We&rsquo;d rather make it with you than watch you
      keep paying the rental tax for another five years.
    </P>
  </>
);

// ----- #3 Sarah -----
const Body_WhatTeamUses = () => (
  <>
    <Lead>
      There&rsquo;s a particular kind of failure that happens in software, and it doesn&rsquo;t look
      like a failure. The system is built. The training is held. The launch happens. The reports
      load. And six months later, half the team has quietly returned to their old way of working
      &mdash; a spreadsheet, an email thread, a Slack channel where the real coordination happens.
    </Lead>

    <P>
      The software is technically running. Nobody is using it. This is more common than software
      vendors want to admit. A platform can ship every feature on the spec sheet and still produce
      zero operational change. The features aren&rsquo;t the value. The adoption is.
    </P>

    <H2>Why teams avoid the software they&rsquo;re given</H2>

    <P>
      Watch a team for a day and you&rsquo;ll see why. The login takes too long. The form has fields
      they don&rsquo;t have answers to. The dashboard shows numbers they don&rsquo;t trust. The
      notification fires three times for things they already know about. Each of these is a small
      annoyance. Together, they make the system feel like a tax on the day.
    </P>

    <P>
      A spreadsheet doesn&rsquo;t have any of these problems. It opens fast. It has only the
      columns the user put there. The number is the number they typed in. There are no
      notifications. The spreadsheet wins not because it&rsquo;s better software &mdash; it
      isn&rsquo;t &mdash; but because it doesn&rsquo;t fight the user.
    </P>

    <H2>What actually gets adopted</H2>

    <P>Three patterns show up consistently in tools people use without being told to:</P>

    <UL>
      <LI>The tool removes more steps than it adds. If the new system replaces three other systems, people use it.</LI>
      <LI>The tool surfaces information the user is already trying to find &mdash; before they have to look for it.</LI>
      <LI>The tool respects what the user already knows. Labels match the language they use in conversation. Defaults match what&rsquo;s true most of the time.</LI>
    </UL>

    <P>
      None of these are technology problems. They&rsquo;re design choices made by someone who
      watched the team work before shipping the tool. (See{' '}
      <Link slug="how-to-build-software-around-people-not-just-processes">
        How to Build Software Around People, Not Just Processes
      </Link>
      .)
    </P>

    <H2>Adoption isn&rsquo;t a training problem</H2>

    <P>
      When a tool isn&rsquo;t being used, the instinct is to schedule more training. More webinars.
      More documentation. Another lunch-and-learn. This rarely works, because the problem
      isn&rsquo;t that the team doesn&rsquo;t understand the tool. The problem is that the tool
      doesn&rsquo;t fit the work. Training tries to teach the team to bend around the tool. The
      team correctly refuses.
    </P>

    <Callout label="The principle">
      Adoption is a design problem, not a training problem. If your team needs a thirty-minute
      webinar to use a tool, you have a design problem. Fix the design.
    </Callout>

    <H2>What to ask before you buy or build</H2>

    <P>
      When you&rsquo;re evaluating a new tool or scoping a custom build, adoption should be the
      first question, not the last:
    </P>

    <UL>
      <LI>Have you watched the people who will use this tool actually do the work today?</LI>
      <LI>Is the new tool making their day easier &mdash; or just making it visible to management?</LI>
      <LI>Will they reach for it without being asked?</LI>
    </UL>

    <P>
      If you can&rsquo;t answer yes to all three, the project will technically ship and
      operationally fail. The real cost is the second one. License fees for tools nobody uses are
      still on the invoice. The workarounds that grow back are still slowing the team down. (For
      the financial frame, see{' '}
      <Link slug="how-to-measure-the-true-cost-of-manual-work">
        How to Measure the True Cost of Manual Work
      </Link>
      .)
    </P>

    <H2>The takeaway</H2>

    <P>
      The best software isn&rsquo;t the one with the most features or the most modern stack.
      It&rsquo;s the one your team picks up on Monday morning without thinking about it.
      That&rsquo;s what adoption means. That&rsquo;s where value lives. Everything else is a demo.
    </P>
  </>
);

// ----- #5 Mike -----
const Body_HowCustomAutomation = () => (
  <>
    <Lead>
      There&rsquo;s a tax every business pays that never shows up on the P&amp;L. It&rsquo;s the
      cost of doing by hand what software could do automatically. Ten minutes here. Five minutes
      there. A whole Thursday spent merging two reports. None of it feels expensive in any single
      moment. Add it up across a year and it&rsquo;s often the single largest operating cost the
      business never named.
    </Lead>

    <P>
      Custom automation isn&rsquo;t about replacing people. It&rsquo;s about freeing them to do the
      work they were actually hired for. The accountant spending eight hours a month reconciling
      spreadsheets was hired to do finance, not data entry. The salesperson reformatting a quote
      was hired to close deals. The ops manager chasing approvals by email was hired to run the
      business, not to be email.
    </P>

    <P>
      When automation works, it doesn&rsquo;t make headlines. The team just notices, three months
      later, that they have time to think again.
    </P>

    <H2>Three categories worth automating first</H2>

    <P>
      Not every manual task deserves automation. The right candidates share three traits:
      they&rsquo;re repetitive, they follow predictable rules, and they happen often enough that
      the savings compound. Look for these patterns:
    </P>

    <P>
      <Strong>Cross-system reconciliation.</Strong> Pulling data from two systems and matching it
      up. Common in finance close, billing, inventory, lead routing. If someone&rsquo;s job
      description includes &ldquo;make sure system A and system B agree,&rdquo; automation pays for
      itself in weeks.
    </P>

    <P>
      <Strong>Routing decisions with clear rules.</Strong> Approvals, escalations, handoffs. If you
      can describe the rule (&ldquo;if deal size is over $50k, route to VP; otherwise route to
      manager&rdquo;), software can apply it ten thousand times faster than a person can.
    </P>

    <P>
      <Strong>Deterministic data entry.</Strong> Filling out a form based on information that
      already exists in another system. The customer&rsquo;s name, the product code, last
      month&rsquo;s number. If a person is typing it in, the system should be typing it in.
    </P>

    <H2>What custom gets that no-code doesn&rsquo;t</H2>

    <P>
      There&rsquo;s a temptation to solve all of this with Zapier or generic automation platforms.
      For simple triggers, that&rsquo;s fine. For real operational workflows, no-code stops scaling
      around the third or fourth conditional branch. The team ends up with a dozen Zaps held
      together by hope and one person who knows how the whole web works.
    </P>

    <P>
      Custom automation gives you something different: code that handles your specific edge cases,
      runs on infrastructure you control, and stays maintainable when the business changes. The
      first version costs more than a Zap. The fifth version still works, while the Zap pile
      became a maintenance nightmare two years ago.
    </P>

    <Callout label="The shift">
      Custom automation is the difference between renting your operating leverage and owning it.
    </Callout>

    <H2>The compounding payoff</H2>

    <P>
      Manual work has a quiet compound effect. Every hour spent on data entry is an hour not spent
      on something higher-value. Multiply across a team, across a year, across the people
      you&rsquo;d have to hire next. The cost isn&rsquo;t just the time &mdash; it&rsquo;s the work
      that didn&rsquo;t get done because the time was burned elsewhere.
    </P>

    <P>
      When you remove that tax, two things happen. The first is obvious: the team gets time back.
      The second is subtler but matters more: the team&rsquo;s best people start working on the
      things that matter. They stop being a router for systems. They start being a multiplier.
    </P>

    <H2>Where to start</H2>

    <P>
      Pick one workflow. Make it the most painful one &mdash; the thing the team complains about,
      the thing that gets redone every quarter, the thing where you wonder why a human is even
      involved. Automate that one well. See what it does for the business. Then decide if
      there&rsquo;s a second one.
    </P>

    <P>
      You don&rsquo;t have to automate everything. You just have to stop tolerating manual work in
      places where the math doesn&rsquo;t justify it. The math is almost always against tolerating
      it. (For the formula, see{' '}
      <Link slug="how-to-measure-the-true-cost-of-manual-work">
        How to Measure the True Cost of Manual Work
      </Link>
      .)
    </P>
  </>
);

// ----- #6 David -----
const Body_CFOSoftwareROI = () => (
  <>
    <Lead>
      Most software ROI calculations focus on the wrong number. The license fee is the visible
      cost, so it&rsquo;s the one that gets scrutinized. But the license fee is almost never the
      largest cost of running a business application. The hidden numbers &mdash; productivity loss,
      error rates, workaround maintenance &mdash; usually dwarf the line item on the contract.
    </Lead>

    <P>
      If you&rsquo;re a CFO trying to evaluate a software investment, here&rsquo;s the math worth
      running.
    </P>

    <H2>The four-input formula</H2>

    <P>ROI on business software comes down to four inputs:</P>

    <UL>
      <LI>License or build cost (the easy number)</LI>
      <LI>Productivity gain: time recovered per user per week &times; loaded labor cost</LI>
      <LI>Error reduction: errors per month &times; cost per error</LI>
      <LI>Workaround maintenance cost: time spent on spreadsheets and shadow systems the software was supposed to replace</LI>
    </UL>

    <P>
      The first one is on the invoice. The other three live in your operating expense and never
      show up under &ldquo;software.&rdquo; That&rsquo;s the problem. The conversation about
      software cost happens against the smallest of the four numbers.
    </P>

    <H2>Why the productivity number gets underestimated</H2>

    <P>
      Software vendors love productivity claims, so CFOs reflexively discount them. That&rsquo;s
      healthy. But it leads to systematically underestimating the real productivity gain when the
      software fits.
    </P>

    <P>
      The mistake is modeling productivity as &ldquo;current admin cost minus future admin
      cost.&rdquo; This is incomplete. The bigger productivity number is what your team starts
      doing with the time the new tool gives back. A salesperson with two extra hours a week
      doesn&rsquo;t fill them with admin. They sell more. A finance team with their month-end close
      cut from five days to two doesn&rsquo;t take three days off. They start producing analysis
      instead of reports.
    </P>

    <P>
      The honest way to model it: estimate the time recovered, then multiply by the marginal value
      of the role, not the average labor cost. Sales reps get the deal-margin multiplier. Finance
      gets the analysis-output multiplier. The numbers usually surprise the CFO who runs them for
      the first time.
    </P>

    <H2>Error cost is where the big numbers hide</H2>

    <P>
      A 0.5% error rate sounds small. Multiply across a hundred quotes a month at $500 cost per
      error and that&rsquo;s $30,000 a year for one team in one workflow. Multiply across the
      business and the number is usually in the six figures.
    </P>

    <P>
      Custom software isn&rsquo;t always cheaper on license. It&rsquo;s often cheaper on error
      cost. The system is designed for your specific error modes. The exceptions you keep hitting
      in the generic tool &mdash; the ones that require manual override every time &mdash; are
      first-class citizens in custom software.
    </P>

    <H2>The workaround maintenance line item</H2>

    <P>
      Every off-the-shelf tool that doesn&rsquo;t quite fit gets a spreadsheet built around it.
      That spreadsheet is software. It has a maintenance cost. The person who built it spends time
      keeping it current. New hires need to be taught it. It breaks when one of the underlying
      systems changes. When that person leaves, their successor inherits a system nobody
      documented.
    </P>

    <P>
      This is hidden software cost. It&rsquo;s not on the SaaS budget. It&rsquo;s in salary lines
      for people doing systems work that wasn&rsquo;t their job description.
    </P>

    <Callout label="The CFO insight">
      A CFO who runs the four-input formula on their top three operational workflows usually finds
      two of them where the math has been wrong for years. Custom software was already cheaper.
      Nobody had done the calculation.
    </Callout>

    <H2>The three-year frame</H2>

    <P>
      ROI calculations get distorted by one-year thinking. License fees are annual. Build cost is
      one-time. The right comparison is over a three-year horizon, because that&rsquo;s the
      realistic life of the software.
    </P>

    <P>
      A $35,000 one-time custom build vs. $30,000 a year in SaaS fees. Year one, the custom build
      looks more expensive. Year two and three, the SaaS bill keeps coming. By month 14 the custom
      build is cheaper. By month 36 it&rsquo;s saved you $55,000 and you still own it. (See{' '}
      <Link slug="why-custom-software-is-no-longer-just-for-enterprise">
        Why Custom Software Is No Longer Just for Enterprise
      </Link>{' '}
      for what changed about the build option.)
    </P>

    <H2>What this means for your next software decision</H2>

    <P>When the next software approval lands on your desk, ask three things:</P>

    <UL>
      <LI>What&rsquo;s the total annual cost &mdash; license, plus productivity loss from gaps, plus error cost, plus the workaround maintenance line nobody tracks?</LI>
      <LI>Over three years, what does that compare to in a custom build that fits exactly?</LI>
      <LI>If we don&rsquo;t change anything, what does year three look like?</LI>
    </UL>

    <P>
      The third question is the one most CFOs don&rsquo;t ask. It&rsquo;s also the most important.
      Inaction has a cost. The numbers usually argue for changing something.
    </P>
  </>
);

// ----- #7 Lauren -----
const Body_OutgrowStack = () => (
  <>
    <Lead>
      Tech stacks don&rsquo;t fail. They fragment. The system that ran your business at twenty
      people is rarely the system that runs it at eighty. Somewhere between those two sizes, the
      stack stopped being coherent and started being a collection of tools that don&rsquo;t quite
      talk to each other. Most teams don&rsquo;t notice the transition. They just notice that
      everything takes longer than it used to.
    </Lead>

    <P>
      Stack fragmentation is a predictable consequence of growth. The good news is that the pattern
      is well understood. The bad news is most companies don&rsquo;t see it until it&rsquo;s well
      underway.
    </P>

    <H2>The fragmentation pattern</H2>

    <P>It usually unfolds in three stages.</P>

    <P>
      <Strong>Stage one: the additions.</Strong> A new team gets stood up &mdash; sales, customer
      success, finance &mdash; and they each pick the best-of-breed tool for their function. Each
      choice is locally rational. Globally, the company now has five systems where it used to have
      one.
    </P>

    <P>
      <Strong>Stage two: the integrations.</Strong> Someone realizes the systems need to talk.
      Integrations get built. Zapier, custom scripts, a paid integration platform. Each integration
      is fine in isolation. Collectively, they&rsquo;re a dependency graph that nobody owns and
      nobody fully understands.
    </P>

    <P>
      <Strong>Stage three: the shadow infrastructure.</Strong> Spreadsheets emerge to bridge the
      gaps the integrations don&rsquo;t cover. Slack channels become coordination tools. The
      customer record is now spread across five systems with three different definitions of
      &ldquo;active.&rdquo; The team adapts, but every adaptation adds friction.
    </P>

    <H2>The signs you&rsquo;re past stage one</H2>

    <UL>
      <LI>Customer data has to be updated in three places</LI>
      <LI>New hires take six weeks to learn the stack, not the job</LI>
      <LI>A &ldquo;simple&rdquo; report requires pulling from four systems</LI>
      <LI>When one system goes down, the team can&rsquo;t tell which workflows are affected</LI>
      <LI>The list of integrations exceeds the list of internal tools</LI>
    </UL>

    <P>
      None of these are crises. That&rsquo;s the problem. The team adapts to each one individually.
      Nobody adds them up.
    </P>

    <H2>Why integration isn&rsquo;t the answer</H2>

    <P>
      When fragmentation becomes obvious, the instinct is to integrate more &mdash; better APIs, a
      tighter data pipeline, an iPaaS platform. This helps at the margins, but it&rsquo;s treating
      the symptom. The underlying problem is that you have five systems where you should have two
      or three.
    </P>

    <P>
      Integration platforms make a fragmented stack cheaper to maintain. They don&rsquo;t make it
      less fragmented. You still have five systems&rsquo; worth of data models, security models,
      user provisioning, and roadmap risk. The integration just papers over the seams.
    </P>

    <Callout label="The principle">
      Fragmentation isn&rsquo;t solved with more integration. It&rsquo;s solved by collapsing the
      parts of the stack where the same workflow lives in three different tools.
    </Callout>

    <H2>What to do instead</H2>

    <P>The teams that fix stack fragmentation usually take one of two paths.</P>

    <P>
      <Strong>Consolidate to a single platform.</Strong> When most of the stack&rsquo;s pain comes
      from disconnected tools doing similar things, picking one and standardizing pays off. This is
      the Salesforce or HubSpot path. It works when the platform&rsquo;s logic actually matches
      your business.
    </P>

    <P>
      <Strong>Build the connecting layer custom.</Strong> When the off-the-shelf tools are fine but
      the workflow between them is unique, building the connective tissue yourself usually beats
      stacking another vendor on top. (See{' '}
      <Link slug="build-vs-buy-how-to-know-which-path">Build vs. Buy</Link> for the decision
      framework.)
    </P>

    <P>Either way, the goal is fewer tools that do more, not more tools that do less.</P>

    <H2>The cost of waiting</H2>

    <P>
      Stack fragmentation has a compounding cost. Every quarter that goes by, another integration
      gets added, another spreadsheet gets created, another new hire learns the workarounds as if
      they were normal. The longer you wait, the more institutional knowledge is encoded in the
      gap-filling &mdash; and the harder the eventual fix becomes.
    </P>

    <P>
      The right time to address fragmentation is when you can see it. Not when it becomes a crisis.
      The teams that move at stage one or two stay nimble. The teams that wait until stage three
      are usually replacing three systems at once, which is its own kind of mess.
    </P>
  </>
);

// ----- #9 Evan -----
const Body_CustomQuoteTool = () => (
  <>
    <Lead>
      Walk into most B2B sales orgs and ask &ldquo;how long does a typical quote take from request
      to send?&rdquo; The answer is rarely &ldquo;an hour.&rdquo; It&rsquo;s more often &ldquo;two
      days.&rdquo; Sometimes a week. And in industries with real complexity &mdash; multi-state
      commercial moves, multi-line insurance, custom equipment &mdash; the answer can stretch to
      three weeks. Most leadership teams have just accepted this. The customers haven&rsquo;t.
    </Lead>

    <P>
      Quote speed has become a competitive moat in markets that didn&rsquo;t used to compete on it.
      The team that quotes in two hours wins deals that the team quoting in two days never even
      sees. If your quoting process is more than half a day in any direction, this is worth a hard
      look.
    </P>

    <H2>Six signs your quoting process needs custom</H2>

    <UL>
      <LI>Reps build quotes by copying a previous quote and editing</LI>
      <LI>Pricing rules live in a person&rsquo;s head, not a system</LI>
      <LI>Approvals for non-standard pricing take more than 24 hours</LI>
      <LI>The same quote goes back and forth for revisions before it&rsquo;s &ldquo;right&rdquo;</LI>
      <LI>Quotes occasionally go out with the wrong number &mdash; and nobody can quickly explain why</LI>
      <LI>Your reps spend more time on quotes than on the customer conversation</LI>
    </UL>

    <P>
      One or two of these is normal friction. Four or more means you&rsquo;ve outgrown whatever your
      team is doing today.
    </P>

    <H2>What custom quoting actually solves</H2>

    <P>
      A custom quote tool isn&rsquo;t a fancier version of the form. It&rsquo;s three things
      working together:
    </P>

    <P>
      <Strong>Rules in the system, not in a brain.</Strong> Pricing logic, discount thresholds,
      approval requirements, exception handling &mdash; all encoded so the quote is right the first
      time. Reps stop guessing. Managers stop fielding &ldquo;is this OK?&rdquo; questions.
    </P>

    <P>
      <Strong>Speed of generation.</Strong> Picking a service type, a size, and a few variables
      produces a complete quote in seconds. No template copying. No formatting. No second pass.
    </P>

    <P>
      <Strong>Approvals as a workflow, not an email thread.</Strong> When a quote needs sign-off,
      the system routes it automatically with full context. The approver sees what they need to
      decide, decides, and the quote moves. Median approval time goes from 18 hours to 18 minutes.
    </P>

    <H2>The math</H2>

    <P>For a 10-person sales team quoting 100 deals a month, here&rsquo;s the picture:</P>

    <P>
      <Strong>Time cost:</Strong> 2 hours per quote &times; 100 quotes = 200 hours per month. At a
      loaded sales rep cost of $60/hour, that&rsquo;s $144,000 a year in rep time spent on
      paperwork.
    </P>

    <P>
      <Strong>Deal velocity:</Strong> 48-hour quote turnaround vs. 2-hour quote turnaround typically
      improves win rate by 15&ndash;25% on deals where speed matters. On a $5M pipeline,
      that&rsquo;s $750k&ndash;$1.25M in revenue swing.
    </P>

    <P>
      <Strong>Error cost:</Strong> a 1% quote-error rate at 100 quotes a month, average error cost
      of $1,000, is $12,000 a year &mdash; before goodwill costs.
    </P>

    <P>
      The custom quote tool costs $35,000&ndash;$75,000 once. The payback is usually inside one
      quarter.
    </P>

    <Callout label="The competitive angle">
      In industries where speed matters, the quote tool isn&rsquo;t a back-office system. It&rsquo;s
      the front line. The team that ships quotes in hours wins the deals the slower team never sees.
    </Callout>

    <H2>When custom isn&rsquo;t the answer</H2>

    <P>
      If your team quotes mostly identical SKUs at standard prices, you don&rsquo;t need a custom
      quote tool. Off-the-shelf CPQ products work fine for that case. Custom becomes the right
      answer when your quoting has variables, exceptions, multi-step approvals, or industry-specific
      rules that don&rsquo;t fit a standard CPQ flow.
    </P>

    <P>
      A quick test: if your reps have a &ldquo;cheat sheet&rdquo; they use to remember pricing
      rules, that&rsquo;s a signal that the rules belong in software. If they have multiple cheat
      sheets, the case for custom is already made.
    </P>

    <H2>What to do this week</H2>

    <P>
      Pull last month&rsquo;s quotes. For each, note how many hours from request to send and how
      many people touched it. Average them. If the number is over eight hours, your quoting process
      is the bottleneck. Custom quoting is in scope. (For the live demo of an industry-specific
      version, see the{' '}
      <a
        href="/#demo"
        className="text-brand-700 underline decoration-brand-200 decoration-2 underline-offset-4 hover:decoration-brand-600 transition-all"
      >
        interactive quote generator
      </a>{' '}
      on the homepage.)
    </P>
  </>
);

// ----- #12 David -----
const Body_SpreadsheetProblem = () => (
  <>
    <Lead>
      Most growing businesses run on a few critical spreadsheets that have escaped containment.
      They started as quick fixes. Now they&rsquo;re load-bearing. Whole workflows route through
      them. New hires inherit them. The person who built them moved to another team last year and
      nobody else fully understands the formulas.
    </Lead>

    <P>
      Spreadsheets are not the enemy. They&rsquo;re brilliant for one-off analysis and small-team
      tools. The problem is when a spreadsheet quietly becomes the system of record for a
      business-critical process. At that point, you have a software application built in a tool
      that was never designed for that job &mdash; and you&rsquo;re absorbing all the risk.
    </P>

    <H2>Why spreadsheets work, until they don&rsquo;t</H2>

    <P>
      A spreadsheet is the fastest software prototyping tool ever invented. Someone has a problem
      on Tuesday afternoon, they open Excel, and they have a working solution by Wednesday morning.
      That&rsquo;s an extraordinary capability, and it explains why every team uses them.
    </P>

    <P>
      The problem starts at the point where the spreadsheet stops being a one-time tool and starts
      being a recurring workflow. Once a spreadsheet is used week after week by multiple people, it
      has crossed an invisible line from prototype to infrastructure. Most companies never
      explicitly acknowledge that line.
    </P>

    <H2>The four risks</H2>

    <P>When a business-critical workflow lives in a spreadsheet, you&rsquo;re exposed to:</P>

    <UL>
      <LI><Strong>Version drift.</Strong> Different people work off different copies. Decisions get made on stale numbers.</LI>
      <LI><Strong>Formula opacity.</Strong> The logic lives in cells that aren&rsquo;t documented and aren&rsquo;t tested. When the person who built it leaves, nobody can confidently update it.</LI>
      <LI><Strong>Manual error rate.</Strong> A typo in row 47 doesn&rsquo;t get caught. The wrong cell reference cascades.</LI>
      <LI><Strong>Audit and compliance gaps.</Strong> For finance, HR, or regulated workflows, a spreadsheet doesn&rsquo;t satisfy auditors or regulators looking for traceable, versioned, role-based data handling.</LI>
    </UL>

    <P>Any one of these on a critical process is a real exposure. Most spreadsheets exhibit all four.</P>

    <H2>When to migrate, and when not to</H2>

    <P>
      Not every spreadsheet needs to move. The test is volume + criticality + lifetime. Ask:
    </P>

    <UL>
      <LI>How many people touch it in a typical month?</LI>
      <LI>How material is a 1% error rate to the business?</LI>
      <LI>How long has this spreadsheet been &ldquo;temporary&rdquo;?</LI>
    </UL>

    <P>
      If the answers are &ldquo;many,&rdquo; &ldquo;material,&rdquo; and &ldquo;over a year&rdquo;
      &mdash; the spreadsheet has become infrastructure and deserves to live in something
      purpose-built.
    </P>

    <H2>The transition path</H2>

    <P>
      The best moves from spreadsheet to structured workflow aren&rsquo;t rip-and-replace.
      They&rsquo;re additive. Build a structured tool around the workflow, let the spreadsheet keep
      working in parallel for a few weeks, then deprecate the spreadsheet when the team trusts the
      new system.
    </P>

    <P>
      Custom-built workflow tools have come a long way. (See{' '}
      <Link slug="why-custom-software-is-no-longer-just-for-enterprise">
        Why Custom Software Is No Longer Just for Enterprise
      </Link>
      .) What used to require a six-month engagement now lands in three to four weeks. The math
      has shifted enough that the spreadsheet-to-tool migration is worth doing on more workflows
      than it used to be.
    </P>

    <Callout label="The CFO question">
      The spreadsheet that runs your business is a software application. Treat it like one
      &mdash; including the risk profile.
    </Callout>

    <H2>What to do this week</H2>

    <P>
      Take an inventory. List every spreadsheet that&rsquo;s touched by more than one person on a
      recurring basis. For each, note: how long it&rsquo;s been in use, who owns it, what would
      happen if it disappeared.
    </P>

    <P>
      The list usually surprises the CFO who runs it. Sometimes there are 30 spreadsheets running
      30 micro-systems. Sometimes there are three that quietly run half the business. Either way,
      you can&rsquo;t decide which ones to upgrade until you can see all of them.
    </P>
  </>
);

// ----- #15 Evan -----
const Body_RevenueMoreThanCRM = () => (
  <>
    <Lead>
      Here&rsquo;s a question worth answering honestly. If you removed the CRM tomorrow, what would
      actually break? For most revenue teams, the answer reveals something uncomfortable: the CRM
      tracks what already happened, but the operational work &mdash; the quoting, the routing, the
      follow-ups, the handoffs to delivery &mdash; would mostly survive. Because that work
      isn&rsquo;t really in the CRM. It&rsquo;s around the CRM.
    </Lead>

    <P>
      This is why CRMs alone don&rsquo;t run revenue. They capture data. Revenue requires
      execution. The two functions are different, and the tools that do one are rarely the tools
      that do the other well.
    </P>

    <H2>What CRMs are good at</H2>

    <P>
      Modern CRMs do a few things genuinely well: contact and account records, pipeline visibility,
      basic reporting, integration with email and calendar. If you need to know who your customers
      are, what stage their deals are in, and how the pipeline looks for forecasting, the CRM earns
      its keep.
    </P>

    <P>That&rsquo;s not nothing. But it&rsquo;s also not the full revenue operating system.</P>

    <H2>What CRMs aren&rsquo;t designed to do</H2>

    <P>Notice what you don&rsquo;t actually do in your CRM:</P>

    <UL>
      <LI>Build quotes with industry-specific pricing rules</LI>
      <LI>Route deals through approval chains</LI>
      <LI>Coordinate the handoff from sales to onboarding</LI>
      <LI>Trigger follow-up sequences that depend on deal context</LI>
      <LI>Track post-close cross-sell and upsell opportunities through specific customer events</LI>
      <LI>Generate the proposal document a buyer actually signs</LI>
    </UL>

    <P>
      All of these are revenue work. None of them happen in the CRM, even though they&rsquo;re
      &ldquo;near&rdquo; the CRM. So the team does them somewhere else &mdash; DocuSign, an SDR
      sequencing tool, an SE handoff doc in Notion, a renewal-tracking spreadsheet. Each of these
      is a separate tool. Each has its own data model. None of them know the full deal context that
      lives in the CRM.
    </P>

    <P>
      This is the revenue stack fragmentation problem. (See{' '}
      <Link slug="why-companies-outgrow-current-tech-stack">
        Why Companies Outgrow Their Current Tech Stack
      </Link>
      .)
    </P>

    <H2>What a real revenue operating system looks like</H2>

    <P>A coherent revenue stack covers four layers:</P>

    <P><Strong>Record layer.</Strong> The CRM. Who the customer is, what stage they&rsquo;re in.</P>

    <P>
      <Strong>Execution layer.</Strong> Quoting, approvals, contracts, handoffs. This is where
      deals actually move forward.
    </P>

    <P>
      <Strong>Sequencing layer.</Strong> Outreach, follow-up, nurture, expansion. The repeated
      touches that keep deals progressing.
    </P>

    <P><Strong>Intelligence layer.</Strong> Forecasting, pipeline analytics, conversion analysis.</P>

    <P>
      Most teams have decent tools at the record layer and the intelligence layer. The execution
      and sequencing layers are where the gaps live. And those gaps are where deals actually slip.
      (For more on this specific failure mode, see{' '}
      <Link slug="why-most-crms-fail-at-the-last-mile">Why Most CRMs Fail at the Last Mile</Link>
      .)
    </P>

    <H2>Custom or composed?</H2>

    <P>Two paths to closing the gap:</P>

    <P>
      <Strong>Compose.</Strong> Buy specialized tools for each layer and integrate them. This works
      at large scale, but the integration tax is real, and the data ends up fragmented anyway.
    </P>

    <P>
      <Strong>Custom.</Strong> Build the execution layer for your specific motion. This is the move
      for teams where the sales process has unique characteristics (multi-state moves, multi-line
      insurance, custom equipment quoting). Off-the-shelf execution layers don&rsquo;t fit your
      sales motion, so building it pays off in adoption and speed.
    </P>

    <H2>What to do this quarter</H2>

    <P>
      Map your revenue process from first touch to closed-won. For each step, ask: which system is
      the source of truth here? You&rsquo;ll find that the CRM is the truth for maybe half the
      steps. The other half live in spreadsheets, email threads, or person-in-head workflows.
    </P>

    <P>
      That gap is where the next investment should go. Not another CRM tier. The layer above the
      CRM that actually executes.
    </P>
  </>
);

// ----- #16 Lauren -----
const Body_WhyProjectsFail = () => (
  <>
    <Lead>
      When software projects fail, post-mortems usually blame the engineering team or the
      technology choice. Both are usually wrong. Most failed software projects fail before any code
      is written. They fail because the team built the wrong thing, and they built the wrong thing
      because they never agreed on what the right thing was.
    </Lead>

    <P>This isn&rsquo;t a technical problem. It&rsquo;s a clarity problem. And it&rsquo;s preventable.</P>

    <H2>The three failure modes</H2>

    <P>Watch enough projects and the failures cluster into three patterns.</P>

    <P>
      <Strong>The phantom requirement.</Strong> Someone in the kickoff meeting said something the
      team interpreted as a requirement. It became part of the build. It wasn&rsquo;t actually a
      requirement &mdash; the speaker was thinking out loud. But by the time anyone realized, two
      weeks of engineering had been spent on it.
    </P>

    <P>
      <Strong>The aspirational workflow.</Strong> The team documented the process the way they
      wished it worked, not the way it actually works. The software was built for the wished-for
      workflow. The actual users still had judgment calls and edge cases the wished-for process
      didn&rsquo;t capture. The software didn&rsquo;t fit reality. The team didn&rsquo;t use it.
    </P>

    <P>
      <Strong>The over-specification.</Strong> The project tried to capture every possible edge case
      before any code was written. Six months of requirements gathering. Engineering finally starts,
      but the business has changed, so half the specs are stale. The project ships nine months late
      and doesn&rsquo;t quite match what the business now needs.
    </P>

    <H2>The diagnostic</H2>

    <P>
      If you&rsquo;ve shipped software that didn&rsquo;t get used, run a simple post-mortem. Ask
      each of these:
    </P>

    <UL>
      <LI>Did the team watch real users do the real work, or did they work from a documented process?</LI>
      <LI>Was the scope decided before or after the first working prototype?</LI>
      <LI>When edge cases came up during the build, were they decided by people who use the workflow, or by the project manager?</LI>
    </UL>

    <P>
      You&rsquo;ll usually find one or two failures that explain the rest. The technology was fine.
      The decisions about what to build were the failure.
    </P>

    <H2>The fix</H2>

    <P>
      There&rsquo;s no methodology that prevents all software failure. But the teams that ship well
      tend to share three habits:
    </P>

    <P>
      <Strong>Start with the work, not the spec.</Strong> Watch the people who&rsquo;ll use the
      tool actually do their job. The first scope document comes after observation, not before.
      (See{' '}
      <Link slug="how-to-build-software-around-people-not-just-processes">
        How to Build Software Around People, Not Just Processes
      </Link>
      .)
    </P>

    <P>
      <Strong>Ship a prototype in week one.</Strong> A clickable, working version &mdash; not a
      Figma file &mdash; gets in front of users fast. Decisions about what to keep and what to cut
      happen against something real, not something imagined.
    </P>

    <P>
      <Strong>Decide as you go.</Strong> Don&rsquo;t lock down the full spec up front. Lock down
      the next two weeks. Re-decide after each working version goes in front of users. This sounds
      chaotic; in practice it produces tighter, more useful software than the alternative.
    </P>

    <Callout label="The principle">
      Software fails from unclear thinking, not unclear code. The fix is upstream.
    </Callout>

    <H2>What this means for your next build</H2>

    <P>
      Whether you&rsquo;re scoping an internal tool, evaluating a vendor, or hiring an engineering
      team &mdash; the highest-leverage question is not &ldquo;what technology should we
      use?&rdquo; It&rsquo;s &ldquo;have we watched the people who will use this actually do the
      work?&rdquo;
    </P>

    <P>
      If the answer is no, you&rsquo;re not ready to start. If the answer is yes, you&rsquo;re
      ahead of most projects. The technology decisions are downstream of that one. (For the
      build-vs-buy framework that follows from this thinking, see{' '}
      <Link slug="build-vs-buy-how-to-know-which-path">
        Build vs. Buy: How to Know Which Path Is Right
      </Link>
      .)
    </P>
  </>
);

// ----- #31 Evan -----
const Body_LastMile = () => (
  <>
    <Lead>
      A CRM can know everything about a customer &mdash; every email, every meeting, every deal,
      every renewal date &mdash; and still produce zero revenue impact. The reason is the last
      mile. Knowing what you know is not the same as acting on it. Most CRMs were designed to
      capture, not to do. The gap between capture and action is where deals slip.
    </Lead>

    <P>
      This is the last-mile problem in revenue operations, and it&rsquo;s why teams that &ldquo;have
      a CRM&rdquo; still feel like they&rsquo;re losing deals they should have closed.
    </P>

    <H2>What &ldquo;last mile&rdquo; actually means</H2>

    <P>
      In logistics, the last mile is the final delivery &mdash; taking the package from the
      warehouse to the customer&rsquo;s door. It&rsquo;s the most expensive part of the journey and
      the part most likely to fail. The same pattern shows up in CRMs.
    </P>

    <P>
      The first 99% of a CRM&rsquo;s job is data capture. That&rsquo;s solved. The last 1% is
      acting on the data: sending the follow-up at the right time, surfacing the cross-sell that
      just became relevant, routing the renewal to the right person, generating the document the
      customer is waiting for.
    </P>

    <P>That 1% is where revenue happens. And it&rsquo;s where most CRMs stop.</P>

    <H2>Why off-the-shelf stops here</H2>

    <P>
      The reason is structural. To act on data, the system has to know your specific business
      logic. What follows what. Who handles what. What &ldquo;the right time&rdquo; means for your
      industry. Off-the-shelf CRMs can&rsquo;t build this in because they serve 50,000 companies
      with 50,000 different right-times.
    </P>

    <P>
      They give you building blocks &mdash; workflows, triggers, sequences &mdash; and ask you to
      build the last mile yourself. Some teams do. Most don&rsquo;t, because building it inside the
      CRM is harder than building it outside the CRM. So they build it outside, in spreadsheets and
      Slack channels and personal calendars. (See{' '}
      <Link slug="why-revenue-teams-need-more-than-crm">
        Why Revenue Teams Need More Than a CRM
      </Link>
      .)
    </P>

    <P>
      The result is a CRM that knows the customer perfectly and does nothing with that knowledge.
    </P>

    <H2>What execution-grade looks like</H2>

    <P>A system that solves the last mile shares three traits:</P>

    <P>
      <Strong>It runs without being asked.</Strong> Follow-ups go out automatically based on deal
      state. Cross-sell prompts surface when the customer crosses a threshold. Renewals get
      scheduled without a human creating the calendar event.
    </P>

    <P>
      <Strong>It&rsquo;s specific to your motion.</Strong> Generic &ldquo;send email after 7
      days&rdquo; isn&rsquo;t enough. The trigger respects your sales process. The content respects
      your industry. The next action is the one your team would actually take.
    </P>

    <P>
      <Strong>It closes the loop.</Strong> The action gets logged back into the CRM, the result
      gets measured, and the system gets smarter (or the team gets better feedback) over time.
    </P>

    <Callout label="The gap">
      Most CRM evaluations focus on the first 99%. The last 1% is where the money is.
    </Callout>

    <H2>Building the last mile</H2>

    <P>
      Two ways to add an execution layer to a CRM. One is to stack more SaaS tools &mdash; outreach
      platforms, sequencing tools, document generation, scheduling &mdash; each handling part of
      the last mile. This works but creates the fragmentation problem.
    </P>

    <P>
      The other is to build the execution layer custom. For teams with a unique sales motion or a
      high-value pipeline, this is increasingly the right move. The build cost has dropped enough
      that it&rsquo;s competitive with stacking three SaaS tools, and the result is a system that
      actually fits your motion. (See{' '}
      <Link slug="build-vs-buy-how-to-know-which-path">Build vs. Buy</Link>.)
    </P>

    <H2>What to do about it</H2>

    <P>
      For your next pipeline review, take any deal that closed late or didn&rsquo;t close. Trace
      why. In most cases, the CRM had every piece of information needed to prevent the loss. What
      was missing was the action.
    </P>

    <P>
      That gap &mdash; between knowing and doing &mdash; is your last mile. Closing it is where the
      next material revenue gain comes from.
    </P>
  </>
);

// ----- #38 Lauren -----
const Body_GoodEnough = () => (
  <>
    <Lead>
      &ldquo;Good enough&rdquo; is the most expensive phrase in business software. It&rsquo;s how
      teams justify keeping tools that don&rsquo;t quite fit. It&rsquo;s how procurement closes a
      deal on a product that&rsquo;s almost right. It&rsquo;s how the same friction year after year
      becomes invisible &mdash; not because it stopped costing, but because it stopped being
      measured.
    </Lead>

    <P>
      Good-enough software has a compounding cost. Every quarter you keep it, the cost grows, and
      the cost of replacing it grows too. The math is rarely on the side of staying.
    </P>

    <H2>Three compounding costs</H2>

    <P>
      <Strong>Compounding labor.</Strong> Each workaround built around a not-quite-fitting tool
      requires maintenance. The spreadsheet that bridges two systems needs updating when either
      system changes. The Slack channel where deal context lives needs to be searched, summarized,
      re-summarized for new team members. New hires inherit the workarounds as if they were normal.
      The labor cost grows with team size.
    </P>

    <P>
      <Strong>Compounding institutional knowledge.</Strong> As people leave, the knowledge of
      &ldquo;why we do it this way&rdquo; leaves with them. The replacement doesn&rsquo;t know
      which workaround exists for what reason. They re-invent the wheel, introduce subtle errors,
      or propose tearing it all out without understanding what&rsquo;s there. Either way, the cost
      of the not-quite-fitting tool grows every time someone new joins.
    </P>

    <P>
      <Strong>Compounding switching cost.</Strong> Each year you keep the tool, you encode more
      processes around it. The replacement project gets bigger, not smaller. By year three,
      &ldquo;we should replace this&rdquo; has become a multi-quarter project nobody wants to
      start.
    </P>

    <H2>The hidden balance sheet</H2>

    <P>
      A simple way to see good-enough cost: imagine you had to write a check today for everything
      you&rsquo;ve spent on the tool over its lifetime. Not just license fees. Include:
    </P>

    <UL>
      <LI>Every hour your team has spent on workarounds</LI>
      <LI>Every error caused by gaps the tool doesn&rsquo;t handle</LI>
      <LI>Every training session new hires have needed to learn the workarounds</LI>
      <LI>Every integration paid for to make the tool talk to the rest of the stack</LI>
      <LI>Every consultant or implementation partner involved</LI>
    </UL>

    <P>
      The number is rarely small. It&rsquo;s also rarely tracked. That&rsquo;s the problem &mdash;
      good-enough cost lives in lots of small places, so it never gets totalled.
    </P>

    <H2>When good enough becomes too expensive</H2>

    <P>
      There&rsquo;s a specific threshold where good-enough crosses into wasteful. It&rsquo;s when
      the three-year total cost of keeping the tool exceeds the three-year total cost of replacing
      it with something that fits.
    </P>

    <P>
      That threshold used to be high, because custom software was expensive. (See{' '}
      <Link slug="why-custom-software-is-no-longer-just-for-enterprise">
        Why Custom Software Is No Longer Just for Enterprise
      </Link>
      .) Now it&rsquo;s lower than most teams realize. The math has shifted enough that workflows
      that didn&rsquo;t qualify for replacement two years ago do now.
    </P>

    <Callout label="The accounting">
      Good-enough is comfortable because the cost is spread thin. The replacement is uncomfortable
      because the cost is concentrated. The math doesn&rsquo;t lie, though &mdash; concentrated
      cost is usually smaller.
    </Callout>

    <H2>The honest question</H2>

    <P>
      Look at your stack. Pick the tool you&rsquo;re most likely to defend as &ldquo;good
      enough.&rdquo; Now ask:
    </P>

    <UL>
      <LI>If we were starting today, would we pick this tool?</LI>
      <LI>How many workarounds exist around it?</LI>
      <LI>What does it cost us over three years if we change nothing?</LI>
    </UL>

    <P>
      If the answer to the first question is no, you&rsquo;ve already made the build-vs-stay
      decision. The team just hasn&rsquo;t acknowledged it yet. (For how to act on that
      acknowledgment, see{' '}
      <Link slug="when-off-the-shelf-software-stops-fitting">
        When Off-the-Shelf Software Stops Fitting Your Business
      </Link>
      .)
    </P>
  </>
);

// =====================
// ARTICLE METADATA (all 50)
// =====================
export const ARTICLES = [
  {
    slug: 'when-off-the-shelf-software-stops-fitting',
    title: 'When Off-the-Shelf Software Stops Fitting Your Business',
    author: 'mike',
    date: '2026-05-08',
    category: 'Operations',
    excerpt:
      'Every growing business reaches a moment when the tool that once felt "good enough" starts creating friction. Here’s how to recognize it before it costs you another quarter.',
    readTime: 6,
    related: ['build-vs-buy-how-to-know-which-path', 'why-custom-software-is-no-longer-just-for-enterprise', 'the-cost-of-good-enough-software'],
    status: 'published',
    body: Body_OffTheShelf,
  },
  {
    slug: 'build-vs-buy-how-to-know-which-path',
    title: 'Build vs. Buy: How to Know Which Path Is Right',
    author: 'lauren',
    date: '2026-05-08',
    category: 'Strategy',
    excerpt:
      'Three numbers decide the build-vs-buy question. Run them honestly and the right answer becomes obvious.',
    readTime: 7,
    related: ['how-to-measure-the-true-cost-of-manual-work', 'why-custom-software-is-no-longer-just-for-enterprise', 'most-common-mistake-companies-make-buying-software'],
    status: 'published',
    body: Body_BuildVsBuy,
  },
  {
    slug: 'why-best-software-is-what-team-actually-uses',
    title: 'Why the Best Software Is the Software Your Team Actually Uses',
    author: 'sarah',
    date: '2026-05-12',
    category: 'Product & UX',
    excerpt:
      'A tool can have great features and still fail if people avoid using it. The real value isn’t in the demo — it’s in adoption.',
    readTime: 6,
    related: ['how-to-build-software-around-people-not-just-processes', 'real-reason-software-projects-fail', 'how-to-measure-the-true-cost-of-manual-work'],
    status: 'published',
    body: Body_WhatTeamUses,
  },
  {
    slug: 'hidden-cost-of-generic-crm-systems',
    title: 'The Hidden Cost of Generic CRM Systems',
    author: 'evan',
    date: '2026-05-08',
    category: 'Sales & RevOps',
    excerpt:
      'The license fee is the smallest number you’re paying. The real cost shows up in rep time, bad forecasts, and shadow systems.',
    readTime: 6,
    related: ['why-most-crms-fail-at-the-last-mile', 'why-revenue-teams-need-more-than-crm', 'how-to-measure-the-true-cost-of-manual-work'],
    status: 'published',
    body: Body_HiddenCostCRM,
  },
  {
    slug: 'how-custom-automation-reduces-manual-work',
    title: 'How Custom Automation Reduces Manual Work Across the Business',
    author: 'mike',
    date: '2026-05-12',
    category: 'Operations',
    excerpt:
      'Manual work doesn’t just waste time — it slows decision-making and distracts people from higher-value work.',
    readTime: 6,
    related: ['how-to-measure-the-true-cost-of-manual-work', 'how-to-eliminate-the-spreadsheet-problem', 'when-off-the-shelf-software-stops-fitting'],
    status: 'published',
    body: Body_HowCustomAutomation,
  },
  {
    slug: 'what-cfos-should-look-for-in-software-roi',
    title: 'What CFOs Should Look for in Software ROI',
    author: 'david',
    date: '2026-05-12',
    category: 'Finance',
    excerpt:
      'License cost is one input. Productivity gain, error reduction, and workaround maintenance are the others.',
    readTime: 7,
    related: ['how-to-measure-the-true-cost-of-manual-work', 'the-cost-of-good-enough-software', 'why-custom-software-is-no-longer-just-for-enterprise'],
    status: 'published',
    body: Body_CFOSoftwareROI,
  },
  {
    slug: 'why-companies-outgrow-current-tech-stack',
    title: 'Why Companies Outgrow Their Current Tech Stack',
    author: 'lauren',
    date: '2026-05-12',
    category: 'Strategy',
    excerpt:
      'Tech stacks rarely fail all at once. They fragment as the business grows. Here’s how to spot it.',
    readTime: 6,
    related: ['the-cost-of-good-enough-software', 'when-off-the-shelf-software-stops-fitting', 'why-revenue-teams-need-more-than-crm'],
    status: 'published',
    body: Body_OutgrowStack,
  },
  {
    slug: 'case-for-building-internal-tools',
    title: 'The Case for Building Internal Tools Instead of Forcing New Workflows',
    author: 'sarah',
    category: 'Product & UX',
    excerpt:
      'When a workflow is important enough, it deserves software designed around it. Not the other way around.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-to-know-sales-team-needs-custom-quote-tool',
    title: 'How to Know If Your Sales Team Needs a Custom Quote Tool',
    author: 'evan',
    date: '2026-05-12',
    category: 'Sales & RevOps',
    excerpt:
      'If quoting involves approvals, exceptions, and pricing logic, a standard quoting workflow may not be enough.',
    readTime: 6,
    related: ['hidden-cost-of-generic-crm-systems', 'why-revenue-teams-need-more-than-crm', 'why-most-crms-fail-at-the-last-mile'],
    status: 'published',
    body: Body_CustomQuoteTool,
  },
  {
    slug: 'difference-between-automation-and-efficiency-theater',
    title: 'The Difference Between Automation and Efficiency Theater',
    author: 'mike',
    category: 'Operations',
    excerpt:
      'Some systems look automated but still require too much human intervention. Real automation removes steps.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'why-hr-teams-need-better-workflow-software',
    title: 'Why HR Teams Need Better Workflow Software',
    author: 'sarah',
    category: 'Operations',
    excerpt:
      'HR runs on repeatable processes. When those workflows live in email and spreadsheets, the risk of inconsistency goes up fast.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-to-eliminate-the-spreadsheet-problem',
    title: 'How to Eliminate the Spreadsheet Problem',
    author: 'david',
    date: '2026-05-12',
    category: 'Finance',
    excerpt:
      'Spreadsheets are flexible but not scalable. Here’s how to move from spreadsheet dependence to structured workflows.',
    readTime: 6,
    related: ['how-to-measure-the-true-cost-of-manual-work', 'what-cfos-should-look-for-in-software-roi', 'how-custom-automation-reduces-manual-work'],
    status: 'published',
    body: Body_SpreadsheetProblem,
  },
  {
    slug: 'most-common-mistake-companies-make-buying-software',
    title: 'The Most Common Mistake Companies Make When Buying Software',
    author: 'lauren',
    category: 'Strategy',
    excerpt:
      'The biggest mistake is buying software to solve a symptom instead of the real workflow problem.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-to-turn-manual-process-into-competitive-advantage',
    title: 'How to Turn a Manual Process Into a Competitive Advantage',
    author: 'mike',
    category: 'Strategy',
    excerpt:
      'If a process matters enough to your business, doing it faster and better can become a market advantage.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'why-revenue-teams-need-more-than-crm',
    title: 'Why Revenue Teams Need More Than a CRM',
    author: 'evan',
    date: '2026-05-12',
    category: 'Sales & RevOps',
    excerpt:
      'A CRM captures data. Revenue teams need execution — quoting, approvals, handoffs, routing.',
    readTime: 6,
    related: ['hidden-cost-of-generic-crm-systems', 'why-most-crms-fail-at-the-last-mile', 'how-to-know-sales-team-needs-custom-quote-tool'],
    status: 'published',
    body: Body_RevenueMoreThanCRM,
  },
  {
    slug: 'real-reason-software-projects-fail',
    title: 'The Real Reason Software Projects Fail',
    author: 'lauren',
    date: '2026-05-12',
    category: 'Strategy',
    excerpt:
      'Most software projects fail because they are built around assumptions instead of real workflow needs.',
    readTime: 6,
    related: ['how-to-build-software-around-people-not-just-processes', 'why-best-software-is-what-team-actually-uses', 'build-vs-buy-how-to-know-which-path'],
    status: 'published',
    body: Body_WhyProjectsFail,
  },
  {
    slug: 'what-makes-a-quote-tool-actually-useful',
    title: 'What Makes a Quote Tool Actually Useful',
    author: 'evan',
    category: 'Sales & RevOps',
    excerpt:
      'A useful quote tool does more than generate a price. It helps reps quote quickly, apply rules, route approvals.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'hr-finance-sales-should-not-run-on-separate-logic',
    title: 'HR, Finance, and Sales Should Not Run on Separate Logic',
    author: 'david',
    category: 'Finance',
    excerpt:
      'When departments use disconnected systems and different logic, the business pays for it in rework and delays.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-to-build-software-around-people-not-just-processes',
    title: 'How to Build Software Around People, Not Just Processes',
    author: 'sarah',
    date: '2026-05-08',
    category: 'Product & UX',
    excerpt:
      'Processes matter. People are the ones using the software. If a tool is too rigid to trust, adoption falls off quickly.',
    readTime: 7,
    related: ['why-best-software-is-what-team-actually-uses', 'why-automation-should-feel-invisible', 'how-to-make-internal-systems-feel-effortless'],
    status: 'published',
    body: Body_SoftwareAroundPeople,
  },
  {
    slug: 'why-custom-software-is-no-longer-just-for-enterprise',
    title: 'Why Custom Software Is No Longer Just for Enterprise',
    author: 'mike',
    date: '2026-05-08',
    category: 'Strategy',
    excerpt:
      'Custom software used to be expensive, slow, and reserved for large organizations. The math has changed.',
    readTime: 7,
    related: ['the-future-belongs-to-companies-that-design-their-own-tools', 'build-vs-buy-how-to-know-which-path', 'when-off-the-shelf-software-stops-fitting'],
    status: 'published',
    body: Body_NoLongerEnterprise,
  },
  {
    slug: 'new-standard-for-operational-agility',
    title: 'The New Standard for Operational Agility',
    author: 'lauren',
    category: 'Strategy',
    excerpt:
      'Operational agility means being able to adjust workflows without waiting months for a vendor to ship a feature.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-to-reduce-bottlenecks-in-approvals-and-handoffs',
    title: 'How to Reduce Bottlenecks in Approvals and Handoffs',
    author: 'evan',
    category: 'Sales & RevOps',
    excerpt:
      'Every business has approval points where work slows down. Over time those bottlenecks compound.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'when-does-a-workflow-deserve-its-own-product',
    title: 'When Does a Workflow Deserve Its Own Product?',
    author: 'sarah',
    category: 'Product & UX',
    excerpt:
      'Some processes are too important to keep buried in email and spreadsheets.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'the-finance-case-for-custom-automation',
    title: 'The Finance Case for Custom Automation',
    author: 'david',
    category: 'Finance',
    excerpt:
      'Custom automation reduces labor waste, lowers error risk, and improves consistency — measurable on a P&L.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'why-simplicity-wins-in-business-software',
    title: 'Why Simplicity Wins in Business Software',
    author: 'mike',
    category: 'Strategy',
    excerpt:
      'Complicated software creates training, support, and resistance. Simplicity helps teams move faster.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-to-replace-clunky-processes-without-disrupting-the-business',
    title: 'How to Replace Clunky Processes Without Disrupting the Business',
    author: 'lauren',
    category: 'Strategy',
    excerpt:
      'Replacing a bad workflow doesn’t mean starting over. Build a better layer on top and transition gradually.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'the-future-of-revenue-operations-is-custom',
    title: 'The Future of Revenue Operations Is Custom',
    author: 'evan',
    category: 'Sales & RevOps',
    excerpt:
      'Revenue operations is becoming too complex for one-size-fits-all tools.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'why-businesses-should-own-their-workflow-logic',
    title: 'Why Businesses Should Own Their Workflow Logic',
    author: 'sarah',
    category: 'Product & UX',
    excerpt:
      'When a business depends on a vendor’s logic, it also depends on their roadmap and limitations.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-to-measure-the-true-cost-of-manual-work',
    title: 'How to Measure the True Cost of Manual Work',
    author: 'david',
    date: '2026-05-08',
    category: 'Finance',
    excerpt:
      'Manual work is easy to underestimate because the cost is spread across many small moments. Here’s the calculation.',
    readTime: 7,
    related: ['the-finance-case-for-custom-automation', 'build-vs-buy-how-to-know-which-path', 'hidden-cost-of-generic-crm-systems'],
    status: 'published',
    body: Body_MeasureManual,
  },
  {
    slug: 'the-role-of-ai-in-better-business-automation',
    title: 'The Role of AI in Better Business Automation',
    author: 'lauren',
    category: 'Operations',
    excerpt:
      'AI is most useful when it helps people make better decisions or removes repetitive judgment from simple workflows.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'why-most-crms-fail-at-the-last-mile',
    title: 'Why Most CRMs Fail at the Last Mile',
    author: 'evan',
    date: '2026-05-12',
    category: 'Sales & RevOps',
    excerpt:
      'The challenge isn’t entering data into the CRM — it’s turning that data into action.',
    readTime: 6,
    related: ['hidden-cost-of-generic-crm-systems', 'why-revenue-teams-need-more-than-crm', 'how-to-know-sales-team-needs-custom-quote-tool'],
    status: 'published',
    body: Body_LastMile,
  },
  {
    slug: 'the-difference-between-a-tool-and-a-solution',
    title: 'The Difference Between a Tool and a Solution',
    author: 'mike',
    category: 'Strategy',
    excerpt:
      'A tool exists. A solution changes outcomes. Most software product purchases get the difference wrong.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-to-modernize-operations-without-replacing-everything',
    title: 'How to Modernize Operations Without Replacing Everything',
    author: 'lauren',
    category: 'Strategy',
    excerpt:
      'Modernization doesn’t require a full system replacement. Improve the most painful workflows first.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'the-best-time-to-build-is-before-the-pain-becomes-visible',
    title: 'The Best Time to Build Is Before the Pain Becomes Visible',
    author: 'sarah',
    category: 'Product & UX',
    excerpt:
      'Businesses wait until a workflow is broken before they act. By then the team has absorbed months of cost.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'what-revenue-leaders-need-from-their-software-stack',
    title: 'What Revenue Leaders Need From Their Software Stack',
    author: 'evan',
    category: 'Sales & RevOps',
    excerpt:
      'Revenue leaders need visibility, speed, and control over the steps that move deals forward.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-software-can-improve-accountability-across-teams',
    title: 'How Software Can Improve Accountability Across Teams',
    author: 'david',
    category: 'Finance',
    excerpt:
      'When work is tracked clearly, ownership becomes easier to see. Software makes responsibilities visible.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'why-workflow-design-is-a-leadership-decision',
    title: 'Why Workflow Design Is a Leadership Decision',
    author: 'mike',
    category: 'Strategy',
    excerpt:
      'Workflow design isn’t an operational detail. It affects speed, culture, and profitability.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'the-cost-of-good-enough-software',
    title: 'The Cost of "Good Enough" Software',
    author: 'lauren',
    date: '2026-05-12',
    category: 'Strategy',
    excerpt:
      '"Good enough" often becomes expensive over time. Hidden friction slows the team and limits growth.',
    readTime: 6,
    related: ['when-off-the-shelf-software-stops-fitting', 'why-companies-outgrow-current-tech-stack', 'why-custom-software-is-no-longer-just-for-enterprise'],
    status: 'published',
    body: Body_GoodEnough,
  },
  {
    slug: 'why-custom-quote-tools-improve-sales-confidence',
    title: 'Why Custom Quote Tools Improve Sales Confidence',
    author: 'evan',
    category: 'Sales & RevOps',
    excerpt:
      'When reps know the quote is accurate and approved, they sell with more confidence.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-to-build-internal-systems-that-scale-with-you',
    title: 'How to Build Internal Systems That Scale With You',
    author: 'sarah',
    category: 'Product & UX',
    excerpt:
      'The best internal systems are designed to grow with the business instead of needing replacement.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'what-modern-buyers-expect-from-internal-software',
    title: 'What Modern Buyers Expect From Internal Software',
    author: 'mike',
    category: 'Strategy',
    excerpt:
      'People expect work software to feel as intuitive as the consumer apps they use every day.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'the-business-case-for-fewer-systems-and-better-systems',
    title: 'The Business Case for Fewer Systems and Better Systems',
    author: 'david',
    category: 'Finance',
    excerpt:
      'More software isn’t always better. Too many tools create integration challenges and training cost.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-to-tell-if-your-team-is-working-around-software',
    title: 'How to Tell If Your Team Is Working Around Software Instead of With It',
    author: 'lauren',
    category: 'Operations',
    excerpt:
      'If people export to spreadsheets, chase approvals by email, or duplicate work, the software isn’t doing its job.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'why-automation-should-feel-invisible',
    title: 'Why Automation Should Feel Invisible',
    author: 'sarah',
    category: 'Product & UX',
    excerpt:
      'The best automation doesn’t feel like a robot taking over. It feels like the work just happens.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'the-revenue-stack-is-evolving-beyond-the-crm',
    title: 'The Revenue Stack Is Evolving Beyond the CRM',
    author: 'evan',
    category: 'Sales & RevOps',
    excerpt:
      'As sales motion becomes more complex, teams layer in tools that handle the real operational work.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-to-build-a-software-strategy-that-supports-growth',
    title: 'How to Build a Software Strategy That Supports Growth',
    author: 'mike',
    category: 'Strategy',
    excerpt:
      'A software strategy should support the business model, not just patch immediate problems.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'why-your-best-software-investment-may-be-a-custom-build',
    title: 'Why Your Best Software Investment May Be a Custom Build',
    author: 'david',
    category: 'Finance',
    excerpt:
      'The most valuable software investment isn’t always the cheapest. Custom can remove recurring costs entirely.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'the-most-important-question-before-buying-new-software',
    title: 'The Most Important Question Before Buying New Software',
    author: 'lauren',
    category: 'Strategy',
    excerpt:
      'Before buying a new tool, ask whether it truly matches how the business works. If not, the team will adapt to it.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'how-to-make-internal-systems-feel-effortless',
    title: 'How to Make Internal Systems Feel Effortless',
    author: 'sarah',
    category: 'Product & UX',
    excerpt:
      'The goal of good system design is to make the right action easy. Reduce friction at every step.',
    related: [],
    status: 'coming-soon',
  },
  {
    slug: 'the-future-belongs-to-companies-that-design-their-own-tools',
    title: 'The Future Belongs to Companies That Design Their Own Tools',
    author: 'mike',
    date: '2026-05-08',
    category: 'Strategy',
    excerpt:
      'The defining advantage of the next decade isn’t scale or the cloud. It’s the ability to design the tools your business actually runs on.',
    readTime: 8,
    related: ['why-custom-software-is-no-longer-just-for-enterprise', 'when-off-the-shelf-software-stops-fitting', 'build-vs-buy-how-to-know-which-path'],
    status: 'published',
    body: Body_FutureBelongs,
    featured: true,
  },
];

// =====================
// HELPERS
// =====================
export function getArticle(slug) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAuthor(key) {
  return AUTHORS[key];
}

export function getRelated(slugs = []) {
  return slugs.map(getArticle).filter(Boolean);
}

export function publishedArticles() {
  return ARTICLES.filter((a) => a.status === 'published');
}

export function articlesByAuthor(key) {
  return ARTICLES.filter((a) => a.author === key);
}

export function articlesByCategory(category) {
  return ARTICLES.filter((a) => a.category === category);
}
