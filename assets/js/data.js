// Dynamics 365 Sales Hub — Mock Data Layer
// Contains conversation transcripts, KPI benchmarks, and sidebar module configs.

    // --- 1. 12-TURN FULL CONVERSATION TRANSCRIPT (00:00:14 to 00:02:56) ---
    const transcriptData = [
      {
        id: 1,
        speaker: 'Halle Griffiths',
        role: 'Sales rep',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
        avatarBg: '#F5B895',
        time: '00:00:24',
        seconds: 24,
        percent: 14.5,
        sentiment: 'positive',
        text: 'Hello this is Lydia from Northwind. How are ya?'
      },
      {
        id: 2,
        speaker: 'Halle Griffiths',
        role: 'Customer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        avatarBg: '#7BE382',
        time: '00:00:36',
        seconds: 36,
        percent: 20.5,
        sentiment: 'positive',
        text: 'Good, how are you?'
      },
      {
        id: 3,
        speaker: 'Halle Griffiths',
        role: 'Sales rep',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
        avatarBg: '#F5B895',
        time: '00:00:48',
        seconds: 48,
        percent: 27.2,
        sentiment: 'positive',
        text: 'Doing great! I wanted to review the Microsoft and Contoso architecture specs for your Q3 Enterprise License.'
      },
      {
        id: 4,
        speaker: 'Josiah Love',
        role: 'Customer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        avatarBg: '#7BE382',
        time: '00:01:04',
        seconds: 64,
        percent: 36.3,
        sentiment: 'neutral',
        text: 'Yes, our operations board compared those specs against XYZ Printers and Fabricator XD for our 500 Seat Expansion.'
      },
      {
        id: 5,
        speaker: 'Josiah Love',
        role: 'Customer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        avatarBg: '#7BE382',
        time: '00:01:22',
        seconds: 82,
        percent: 46.5,
        sentiment: 'negative',
        text: 'While XYZ Printers offered a competitor pricing match, our biggest worry is the migration timeline and disrupting our warehouse workflow.'
      },
      {
        id: 6,
        speaker: 'Halle Griffiths',
        role: 'Sales rep',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
        avatarBg: '#F5B895',
        time: '00:01:44',
        seconds: 104,
        percent: 59.0,
        sentiment: 'positive',
        text: 'Completely understand. Unlike XYZ Printers, our Q3 Enterprise License includes a zero-downtime parallel cutover and full Security Compliance.'
      },
      {
        id: 7,
        speaker: 'Josiah Love',
        role: 'Customer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        avatarBg: '#7BE382',
        time: '00:01:56',
        seconds: 116,
        percent: 65.9,
        sentiment: 'neutral',
        text: 'How does that Security Compliance compare to what Fabricator XD provides out of the box?'
      },
      {
        id: 8,
        speaker: 'Halle Griffiths',
        role: 'Sales rep',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
        avatarBg: '#F5B895',
        time: '00:02:06',
        seconds: 126,
        percent: 71.5,
        sentiment: 'positive',
        text: 'We integrate natively with Azure AD. I will Send offering details right after this call comparing us directly against XYZ Printers and Fabricator XD.'
      },
      {
        id: 9,
        speaker: 'Josiah Love',
        role: 'Customer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        avatarBg: '#7BE382',
        time: '00:02:22',
        seconds: 142,
        percent: 80.6,
        sentiment: 'positive',
        text: 'That benchmark will really help convince our CFO on the 500 Seat Expansion.'
      },
      {
        id: 10,
        speaker: 'Halle Griffiths',
        role: 'Sales rep',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
        avatarBg: '#F5B895',
        time: '00:02:34',
        seconds: 154,
        percent: 87.5,
        sentiment: 'neutral',
        text: 'Would your technical architects be open to seeing the live sandbox migration next week?'
      },
      {
        id: 11,
        speaker: 'Halle Griffiths',
        role: 'Sales rep',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
        avatarBg: '#F5B895',
        time: '00:02:44',
        seconds: 164,
        percent: 93.1,
        sentiment: 'positive',
        text: 'I will Invite to live demonstration for Tuesday at 10 AM with Kenny Smith and our Contoso lead.'
      },
      {
        id: 12,
        speaker: 'Josiah Love',
        role: 'Customer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        avatarBg: '#7BE382',
        time: '00:02:56',
        seconds: 176,
        percent: 99.0,
        sentiment: 'positive',
        text: 'Sounds great, send over the invite and we will have the Northwind team ready.'
      }
    ];


    // --- 5. KPI BENCHMARK INSPECTION DRAWER ---
    const kpiBenchmarks = [
      { title: 'Talk to Listen Ratio (37/63%)', desc: 'Optimal Enterprise Zone (35–45% Rep Talk). Halle gave Josiah ample floor time to surface migration concerns.', bar: 86, jumpTurn: 1 },
      { title: 'Average Talking Speed (44 wpn)', desc: 'Calm executive cadence. Avoided rushing through the Microsoft & Contoso security compliance pitch.', bar: 78, jumpTurn: 3 },
      { title: 'Switches per Conversation (40 switches)', desc: 'High interactive back-and-forth engagement across 02m 56s without talking over the customer.', bar: 84, jumpTurn: 4 },
      { title: 'Average Pause (78 ms)', desc: 'Responsive active listening pause (< 95ms target) before addressing competitor questions.', bar: 91, jumpTurn: 6 },
      { title: 'Longest Customer Monologue (48 sec)', desc: 'Occurred around 01:22 when Josiah explained XYZ Printers pricing and legacy ERP migration risk.', bar: 72, jumpTurn: 5 }
    ];

    // --- 10. ALL 10 LEFT SIDEBAR MODULES WITH ANIMATED V-NOTCH SUB-TABS & INTERNAL SCROLL ---
    const sidebarModules = {
      home: {
        breadcrumb: 'Executive Dashboard',
        title: 'Executive Sales Dashboard',
        tabs: ['Revenue Overview', 'Rep Leaderboard', 'Q2 Forecast'],
        renderTab: (tabIdx) => {
          if (tabIdx === 1) {
            return generateListMenuHtml([
              { title: '1. Halle Griffiths — Senior Enterprise AE', sub: 'Quota Attainment: 118% ($640,000 Closed) • Avg Talk/Listen: 37/63%', badge: 'Top Performer', action: () => switchSidebarMenu('activities', 5) },
              { title: '2. Kenny Smith — Enterprise Account Director', sub: 'Quota Attainment: 109% ($890,000 Closed) • 14 Active Enterprise Deals', badge: 'Deal Owner', action: () => switchSidebarMenu('activities', 5) },
              { title: '3. Lydia Bauer — Solutions Architect', sub: 'Technical Win Rate: 91% across Microsoft & Contoso co-sell opportunities', badge: '91% Tech Win', action: () => switchSidebarMenu('activities', 5) },
              { title: '4. Marcus Vance — Regional Sales Manager', sub: 'Quota Attainment: 96% ($510,000 Closed) • Avg Call Speed: 46 wpn', badge: 'On Track', action: () => switchSidebarMenu('activities', 5) }
            ]);
          }
          if (tabIdx === 2) {
            return `
              <div class="teal-insights-panel rounded-[22px] p-6 text-white space-y-4">
                <h3 class="text-lg font-normal">AI Predictive Pipeline Forecast — Q2/Q3 Rollout</h3>
                <p class="text-xs text-white/90">Weighted pipeline confidence is at <strong>84% ($3.85M)</strong> driven by Northwind Traders and Contoso Global expansions.</p>
                <div class="grid grid-cols-3 gap-3 pt-2 text-xs">
                  <div class="bg-white/15 p-4 rounded-2xl"><div class="text-white/75">Best Case</div><div class="text-2xl font-semibold mt-1">$4.40M</div></div>
                  <div class="bg-white/25 p-4 rounded-2xl border border-white/30"><div class="text-white/90">AI Committed</div><div class="text-2xl font-semibold mt-1">$3.85M</div></div>
                  <div class="bg-white/15 p-4 rounded-2xl"><div class="text-white/75">Closed to Date</div><div class="text-2xl font-semibold mt-1">$1.42M</div></div>
                </div>
              </div>
            `;
          }
          return `
            <div class="grid grid-cols-4 gap-3.5">
              <div class="kpi-card rounded-[18px] p-5"><div class="text-xs text-[#6E6F77]">Closed Revenue</div><div class="text-3xl font-medium mt-2">$1.42M <span class="text-xs text-emerald-700">+18%</span></div></div>
              <div class="kpi-card rounded-[18px] p-5"><div class="text-xs text-[#6E6F77]">Open Pipeline</div><div class="text-3xl font-medium mt-2">$3.85M <span class="text-xs text-[#6E6F77]">24 deals</span></div></div>
              <div class="kpi-card rounded-[18px] p-5"><div class="text-xs text-[#6E6F77]">Positive Call Sentiment</div><div class="text-3xl font-medium mt-2">78% <span class="text-xs text-teal-700">Optimal</span></div></div>
              <div class="kpi-card rounded-[18px] p-5"><div class="text-xs text-[#6E6F77]">Team Quota Attainment</div><div class="text-3xl font-medium mt-2">94.2%</div></div>
            </div>
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-7 bg-[#e8e7e5] border border-white/65 rounded-[20px] p-5 space-y-3">
                <h3 class="text-base font-medium">Priority Active Deals Requiring Follow-Up</h3>
                <div class="space-y-2.5 text-xs">
                  <div onclick="switchSidebarMenu('activities', 5)" class="bg-white/85 hover:bg-white p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all border border-black/5">
                    <div><div class="font-semibold text-sm">Discuss New Opportunity — Northwind Traders ($145k)</div><div class="text-[#6E6F77]">Josiah Love • 2 Action Items Pending • Owner: Kenny Smith</div></div>
                    <span class="bg-[#0b0d0e] text-white px-3 py-1.5 rounded-full">Open Call Hub →</span>
                  </div>
                  <div onclick="switchSidebarMenu('opportunities', 7)" class="bg-white/70 hover:bg-white p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all">
                    <div><div class="font-semibold text-sm">Contoso Cloud Print Fleet Expansion ($240k)</div><div class="text-[#6E6F77]">Stage: 3. Propose (85%) • Owner: Halle Griffiths</div></div>
                    <span class="text-teal-800 font-medium">View Board →</span>
                  </div>
                  <div onclick="switchSidebarMenu('quotes', 8)" class="bg-white/70 hover:bg-white p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all">
                    <div><div class="font-semibold text-sm">Fabrikam 500-Seat Security Compliance Upgrade ($115k)</div><div class="text-[#6E6F77]">Stage: 2. Develop (60%) • CPQ Draft Ready</div></div>
                    <span class="text-teal-800 font-medium">Configure Quote →</span>
                  </div>
                </div>
              </div>
              <div class="col-span-5 teal-insights-panel rounded-[20px] p-6 text-white flex flex-col justify-between">
                <div>
                  <div class="text-xs uppercase tracking-wider text-white/75 font-semibold">AI Copilot Daily Briefing</div>
                  <h3 class="text-xl font-normal mt-1">Northwind Traders is ready for live demonstration</h3>
                  <p class="text-xs text-white/85 mt-2 leading-relaxed">Halle Griffiths maintained an optimal 37/63% talk-to-listen ratio. Sending the XYZ Printers comparison sheet today boosts win probability by +14%.</p>
                </div>
                <button onclick="switchSidebarMenu('activities', 5)" class="mt-4 bg-white text-[#141518] rounded-full py-2.5 px-4 text-xs font-semibold w-fit hover:bg-neutral-100 transition-colors">
                  Inspect Call Insights
                </button>
              </div>
            </div>
          `;
        }
      },
      recent: {
        breadcrumb: 'Activity Stream',
        title: 'Recent Activity Stream',
        tabs: ['All Activity (6)', 'Phone Calls', 'Emails & Meetings'],
        renderTab: (tabIdx) => {
          const all = [
            { title: 'Phone Call: Discuss New Opportunity (02m 56s)', sub: '24.02.2023 • Halle Griffiths & Josiah Love • Sentiment: Positive', badge: 'Open Insights', type: 'call', action: () => switchSidebarMenu('activities', 5) },
            { title: 'Email Draft: Microsoft & Contoso Offering Details', sub: 'Prepared for Josiah Love (Northwind) • Includes XYZ Printers benchmark', badge: 'Send Email', type: 'email', action: () => { switchSidebarMenu('activities', 5); switchSubTab('phoneCall', 0); } },
            { title: 'Meeting Invite: Live Sandbox Demonstration', sub: 'Scheduled for Tuesday 10:00 AM • Kenny Smith, Halle Griffiths, Lydia Bauer', badge: 'Calendar', type: 'email', action: () => { switchSidebarMenu('activities', 5); switchSubTab('related', 1); } },
            { title: 'Phone Call: Contoso IT Security Review (14m 10s)', sub: '22.02.2023 • Talk/Listen: 40/60% • 0 Objections', badge: 'Completed', type: 'call', action: () => switchSidebarMenu('activities', 5) },
            { title: 'CPQ Quote Generated: 500 Seat Expansion ($145,000)', sub: 'Approved by Kenny Smith • Attached to Northwind Opportunity', badge: 'Open CPQ', type: 'email', action: () => switchSidebarMenu('quotes', 8) }
          ];
          const filtered = tabIdx === 1 ? all.filter(i => i.type === 'call') : tabIdx === 2 ? all.filter(i => i.type === 'email') : all;
          return generateListMenuHtml(filtered);
        }
      },
      pinned: {
        breadcrumb: 'Bookmarks',
        title: 'Pinned Records & Saved Quotes',
        tabs: ['Pinned Calls & Deals', 'Bookmarked Transcript Quotes'],
        renderTab: (tabIdx) => {
          if (tabIdx === 1) {
            return generateListMenuHtml([
              { title: '"While XYZ Printers offered a competitor pricing match, our biggest worry is the migration timeline..."', sub: 'Josiah Love @ 00:01:22 • Objection Handling Anchor', badge: 'Jump to 01:22', action: () => { switchSidebarMenu('activities', 5); selectTranscriptLine(5, 46.5, '1:22', 82); } },
              { title: '"I will Send offering details right after this call comparing us directly against XYZ Printers..."', sub: 'Halle Griffiths @ 00:02:06 • Action Item Commitment', badge: 'Jump to 02:06', action: () => { switchSidebarMenu('activities', 5); selectTranscriptLine(8, 71.5, '2:06', 126); } },
              { title: '"I will Invite to live demonstration for Tuesday at 10 AM with Kenny Smith..."', sub: 'Halle Griffiths @ 00:02:44 • Next Step Scheduled', badge: 'Jump to 02:44', action: () => { switchSidebarMenu('activities', 5); selectTranscriptLine(11, 93.1, '2:44', 164); } }
            ]);
          }
          return generateListMenuHtml([
            { title: '★ Discuss New Opportunity — Call Insights', sub: 'Pinned by Kenny Smith • Talk/Listen: 37/63% • 44 wpn • 40 switches', badge: 'Active Record', action: () => switchSidebarMenu('activities', 5) },
            { title: '★ Northwind Enterprise Cloud & Printer Fleet ($145k)', sub: 'Stage: 2. Develop (65%) • 500 Seat Expansion', badge: 'Pipeline', action: () => switchSidebarMenu('opportunities', 7) },
            { title: '★ XYZ Printers vs. Microsoft/Contoso Battlecard', sub: '3 mentions in current call • Zero-downtime migration pitch', badge: 'Battlecard', action: () => { switchSidebarMenu('activities', 5); switchSubTab('related', 1); } }
          ]);
        }
      },
      playbook: {
        breadcrumb: 'AI Playbooks',
        title: 'Live AI Agent Playbook & Call Scripts',
        tabs: ['Objection Rebuttals', 'Discovery Questions', 'Closing Checklist'],
        renderTab: () => `
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-[#e8e7e5] border border-white/65 rounded-[20px] p-5 space-y-3">
              <span class="text-[10.5px] bg-rose-500/15 text-rose-800 px-2.5 py-0.5 rounded-full font-semibold">Triggered @ 01:22 (XYZ Printers)</span>
              <h3 class="text-base font-medium">Rebuttal: "XYZ Printers quoted lower hardware pricing"</h3>
              <p class="text-xs text-[#45464C] leading-relaxed">"While XYZ Printers discounts upfront hardware, their legacy connectors require 18 hours of planned ERP downtime. Our Microsoft & Contoso Q3 Enterprise License runs a zero-downtime parallel cutover with a 99.99% SLA."</p>
              <button onclick="copyCounterPitch('XYZ Printers')" class="bg-[#0b0d0e] text-white text-xs px-4 py-2 rounded-xl font-medium">Copy Script to Clipboard</button>
            </div>
            <div class="bg-[#e8e7e5] border border-white/65 rounded-[20px] p-5 space-y-3">
              <span class="text-[10.5px] bg-teal-500/15 text-teal-800 px-2.5 py-0.5 rounded-full font-semibold">Triggered @ 01:56 (Fabricator XD)</span>
              <h3 class="text-base font-medium">Rebuttal: "How does Security Compliance compare?"</h3>
              <p class="text-xs text-[#45464C] leading-relaxed">"Our solution authenticates natively through Azure Active Directory with automated print-job encryption across all 500 seats—eliminating third-party print servers."</p>
              <button onclick="copyCounterPitch('Fabricator XD')" class="bg-[#0b0d0e] text-white text-xs px-4 py-2 rounded-xl font-medium">Copy Script to Clipboard</button>
            </div>
          </div>
        `
      },
      integrations: {
        breadcrumb: 'Connected Ecosystem',
        title: 'Connected Apps & CRM Integrations',
        tabs: ['Active Connectors (4)', 'Webhook Logs'],
        renderTab: () => `
          <div class="grid grid-cols-2 gap-4 text-xs">
            <div class="bg-[#e8e7e5] border border-white/65 rounded-[20px] p-5 flex items-center justify-between">
              <div><div class="font-semibold text-sm">Microsoft Teams Call Recording & Transcription</div><div class="text-[#6E6F77] mt-0.5">Real-time speaker diarization & sentiment stream</div></div>
              <span class="bg-emerald-500/15 text-emerald-800 px-3 py-1 rounded-full font-semibold">Connected</span>
            </div>
            <div class="bg-[#e8e7e5] border border-white/65 rounded-[20px] p-5 flex items-center justify-between">
              <div><div class="font-semibold text-sm">Outlook & Exchange Action Item Sync</div><div class="text-[#6E6F77] mt-0.5">Auto-detects "Send offering details" & calendar invites</div></div>
              <span class="bg-emerald-500/15 text-emerald-800 px-3 py-1 rounded-full font-semibold">Connected</span>
            </div>
            <div class="bg-[#e8e7e5] border border-white/65 rounded-[20px] p-5 flex items-center justify-between">
              <div><div class="font-semibold text-sm">Azure Cognitive Speech Analytics</div><div class="text-[#6E6F77] mt-0.5">Calculates talk-to-listen ratio (37/63%) & pause ms</div></div>
              <span class="bg-emerald-500/15 text-emerald-800 px-3 py-1 rounded-full font-semibold">98.4% SLA</span>
            </div>
            <div class="bg-[#e8e7e5] border border-white/65 rounded-[20px] p-5 flex items-center justify-between">
              <div><div class="font-semibold text-sm">Contoso CPQ Pricing Engine</div><div class="text-[#6E6F77] mt-0.5">Syncs 500 Seat Expansion quotes directly to deal stage</div></div>
              <span class="bg-emerald-500/15 text-emerald-800 px-3 py-1 rounded-full font-semibold">Synced</span>
            </div>
          </div>
        `
      },
      contacts: {
        breadcrumb: 'Accounts & Contacts',
        title: 'Northwind Traders — Account Directory',
        tabs: ['Buying Committee (4)', 'Account Profile'],
        renderTab: () => generateListMenuHtml([
          { title: 'Josiah Love — VP of Operations (Customer)', sub: 'Primary Decision Maker • Featured in "Discuss New Opportunity" • Sentiment: Positive', badge: 'Filter Call by Josiah', action: () => { switchSidebarMenu('activities', 5); filterBySpeaker('Josiah Love'); } },
          { title: 'Lydia Bauer — Technical Lead (Northwind)', sub: 'Joined call intro at 00:00:24 • Evaluates Microsoft & Contoso specs', badge: 'Jump to 0:24', action: () => { switchSidebarMenu('activities', 5); selectTranscriptLine(1, 14.5, '0:24', 24); } },
          { title: 'Halle Griffiths — Senior Sales Representative', sub: 'Host of "Discuss New Opportunity" • 37% Talk Ratio • 44 wpn', badge: 'Filter Call by Halle', action: () => { switchSidebarMenu('activities', 5); filterBySpeaker('Halle Griffiths'); } },
          { title: 'Kenny Smith — Enterprise Account Director', sub: 'Record Owner • Co-hosting Tuesday 10 AM Live Demonstration', badge: 'Record Owner', action: () => switchSidebarMenu('activities', 5) }
        ])
      },
      opportunities: {
        breadcrumb: 'Pipeline Kanban',
        title: 'Opportunity Pipeline Board',
        tabs: ['Kanban Stage Board', 'Deal Velocity'],
        renderTab: () => `
          <div class="grid grid-cols-4 gap-3.5 text-xs">
            <div class="bg-[#e8e7e5] border border-white/65 rounded-[20px] p-4 space-y-3">
              <div class="font-semibold text-[#6E6F77] uppercase flex justify-between"><span>1. Qualify (25%)</span><span>$180k</span></div>
              <div class="bg-white/85 p-3.5 rounded-xl space-y-1.5 border border-black/5">
                <div class="font-semibold text-sm">AdventureWorks Fleet</div>
                <div class="text-[#6E6F77]">$180,000 • Owner: Kenny Smith</div>
              </div>
            </div>
            <div class="bg-[#e8e7e5] border-2 border-[#0b0d0e] rounded-[20px] p-4 space-y-3">
              <div class="font-semibold text-[#141518] uppercase flex justify-between"><span>2. Develop (65%)</span><span>$260k</span></div>
              <div onclick="switchSidebarMenu('activities', 5)" class="bg-white p-3.5 rounded-xl space-y-2 shadow-sm cursor-pointer">
                <span class="text-[10px] bg-teal-500/15 text-teal-800 px-2 py-0.5 rounded-full font-semibold">Active Call Record</span>
                <div class="font-semibold text-sm">Northwind Cloud & Printer Fleet</div>
                <div class="text-[#6E6F77]">$145,000 • Josiah Love</div>
                <div class="text-[11px] font-medium text-teal-800">Open Call Insights →</div>
              </div>
              <div class="bg-white/80 p-3.5 rounded-xl space-y-1">
                <div class="font-semibold text-sm">Fabrikam ERP Sync</div>
                <div class="text-[#6E6F77]">$115,000 • Halle Griffiths</div>
              </div>
            </div>
            <div class="bg-[#e8e7e5] border border-white/65 rounded-[20px] p-4 space-y-3">
              <div class="font-semibold text-[#6E6F77] uppercase flex justify-between"><span>3. Propose (85%)</span><span>$240k</span></div>
              <div class="bg-white/85 p-3.5 rounded-xl space-y-1.5 border border-black/5">
                <div class="font-semibold text-sm">Contoso Global Expansion</div>
                <div class="text-[#6E6F77]">$240,000 • Proposal Sent</div>
              </div>
            </div>
            <div class="bg-[#e8e7e5] border border-white/65 rounded-[20px] p-4 space-y-3">
              <div class="font-semibold text-emerald-700 uppercase flex justify-between"><span>4. Close Won</span><span>$310k</span></div>
              <div class="bg-white/85 p-3.5 rounded-xl space-y-1.5 border border-black/5">
                <div class="font-semibold text-sm">BlueYonder Enterprise SLA</div>
                <div class="text-[#6E6F77]">$310,000 • Signed Q1</div>
              </div>
            </div>
          </div>
        `
      },
      quotes: {
        breadcrumb: 'CPQ Configurator',
        title: 'Quotes, Pricing & SKU Configurator',
        tabs: ['Northwind Quote #Q-894', 'Volume Discount Tiers'],
        renderTab: () => {
          const total = (quoteSeats * 190) + (quotePrinters * 1111);
          return `
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-7 bg-[#e8e7e5] border border-white/65 rounded-[20px] p-5 space-y-4">
                <h3 class="text-base font-medium">Interactive Northwind Q3 Enterprise License Calculator</h3>
                <div class="space-y-3 text-xs">
                  <div class="bg-white/85 p-4 rounded-xl space-y-2">
                    <div class="flex justify-between font-semibold"><span>Q3 Enterprise License Seats ($190/seat)</span><span id="quoteSeatsLabel">${quoteSeats} seats</span></div>
                    <input type="range" min="100" max="1000" step="50" value="${quoteSeats}" oninput="updateQuoteCalc(this.value, null)" class="w-full accent-black cursor-pointer"/>
                  </div>
                  <div class="bg-white/85 p-4 rounded-xl space-y-2">
                    <div class="flex justify-between font-semibold"><span>Contoso Managed Printer Fleet Nodes ($1,111/node)</span><span id="quotePrintersLabel">${quotePrinters} nodes</span></div>
                    <input type="range" min="10" max="100" step="5" value="${quotePrinters}" oninput="updateQuoteCalc(null, this.value)" class="w-full accent-black cursor-pointer"/>
                  </div>
                </div>
              </div>
              <div class="col-span-5 teal-insights-panel rounded-[20px] p-6 text-white flex flex-col justify-between">
                <div>
                  <div class="text-xs uppercase tracking-wider text-white/80 font-semibold">Live Configured Quote Total</div>
                  <div id="quoteTotalDisplay" class="text-4xl font-semibold mt-2">$${total.toLocaleString()}</div>
                  <p class="text-xs text-white/85 mt-2">Includes zero-downtime ERP migration & XYZ Printers competitive price-match protection.</p>
                </div>
                <button onclick="showToast('Updated quote synced to Northwind Opportunity & offering details email!')" class="mt-4 bg-white text-[#141518] rounded-full py-2.5 px-4 text-xs font-semibold w-fit hover:bg-neutral-100">
                  Attach to "Send Offering Details"
                </button>
              </div>
            </div>
          `;
        }
      },
      analytics: {
        breadcrumb: 'Conversation Intelligence',
        title: 'Conversation Intelligence Analytics',
        tabs: ['Team KPI Benchmarks', 'Keyword Frequency Matrix'],
        renderTab: () => `
          <div class="grid grid-cols-5 gap-3.5">
            <div class="kpi-card rounded-[18px] p-4"><div class="text-xs text-[#6E6F77]">Org Talk/Listen</div><div class="text-3xl font-normal mt-2">41/59 %</div></div>
            <div class="kpi-card rounded-[18px] p-4"><div class="text-xs text-[#6E6F77]">Avg Talking Speed</div><div class="text-3xl font-normal mt-2">47 wpn</div></div>
            <div class="kpi-card rounded-[18px] p-4"><div class="text-xs text-[#6E6F77]">Avg Switches</div><div class="text-3xl font-normal mt-2">38 switches</div></div>
            <div class="kpi-card rounded-[18px] p-4"><div class="text-xs text-[#6E6F77]">Avg Rep Pause</div><div class="text-3xl font-normal mt-2">82 ms</div></div>
            <div class="kpi-card rounded-[18px] p-4"><div class="text-xs text-[#6E6F77]">Customer Monologue</div><div class="text-3xl font-normal mt-2">49 sec</div></div>
          </div>
          <div class="teal-insights-panel rounded-[22px] p-6 text-white space-y-4">
            <h3 class="text-lg font-normal">Competitor & Brand Share of Voice Across Q1 Calls</h3>
            <div class="space-y-3 text-xs">
              <div><div class="flex justify-between mb-1"><span>XYZ Printers (3 mentions in Northwind Call)</span><span>48% of competitive calls</span></div><div class="h-2.5 bg-white/15 rounded-full overflow-hidden"><div class="h-full bg-white w-[48%] rounded-full"></div></div></div>
              <div><div class="flex justify-between mb-1"><span>Microsoft & Contoso Co-Sell Specs</span><span>86% positive reception</span></div><div class="h-2.5 bg-white/15 rounded-full overflow-hidden"><div class="h-full bg-emerald-300 w-[86%] rounded-full"></div></div></div>
              <div><div class="flex justify-between mb-1"><span>Fabricator XD</span><span>29% of competitive calls</span></div><div class="h-2.5 bg-white/15 rounded-full overflow-hidden"><div class="h-full bg-cyan-200 w-[29%] rounded-full"></div></div></div>
            </div>
          </div>
        `
      }
    };
