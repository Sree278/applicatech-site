/* ApplicaTech static preview — editable copy and route data.
   Keep invented numbers marked [VERIFY] and listed in CONTENT-FLAGS.md. */
window.APPLICA_CONTENT = (() => {
  "use strict";

  const I18N = {
    en: {
      skip: "Skip to content",
      "nav.home": "Home",
      "nav.platforms": "Platforms",
      "nav.services": "Services",
      "nav.industries": "Industries",
      "nav.work": "Work",
      "nav.about": "About",
      "nav.insights": "Insights",
      "nav.careers": "Careers",
      "nav.contact": "Contact",
      "cta.book": "Book an audit",
      "cta.longAudit": "Book a 30-min systems audit",
      "cta.plan": "See the 100-day plan",
      "mega.platforms.label": "THE MICROSOFT STACK / 07 ROUTES",
      "mega.platforms.dek": "Pick the system. We map the work, the data and the people around it.",
      "mega.industries.label": "SECTOR PRACTICE / 09 ROUTES",
      "mega.industries.dek": "Vertical packs for the exceptions your generic implementation plan missed.",
      "hero.eyebrow": "MICROSOFT DYNAMICS 365 · AZURE · POWER PLATFORM — INDIA / MIDDLE EAST",
      "hero.title": "<span class=\"title-line\">Cloud ERP, live in <em>100</em> days.</span><span class=\"title-line\">Not eighteen months.</span>",
      "hero.sub": "We implement Microsoft cloud ERP for finance, real estate, retail and education teams across India and the UAE.",
      "hero.source": "SOURCE: PUBLISHED APPLICATECH DELIVERY CLAIM · ≤100 DAYS TO BUSINESS-READY CLOUD APPS",
      "form.name": "Name",
      "form.email": "Work email",
      "form.message": "What's breaking?",
      "form.namePlaceholder": "Your full name",
      "form.emailPlaceholder": "name@company.com",
      "form.messagePlaceholder": "Month-end, data migration, support, or something else.",
      "footer.rtlNote": "ARABIC SWITCH CHANGES DIRECTION AND KEY INTERFACE LABELS. FULL COPY HANDOFF IS PENDING.",
      "footer.explore": "EXPLORE",
      "footer.read": "READ",
      "footer.offices": "OFFICES",
      "footer.contact": "CONTACT"
    },
    ar: {
      skip: "تخطَّ إلى المحتوى",
      "nav.home": "الرئيسية",
      "nav.platforms": "المنصات",
      "nav.services": "الخدمات",
      "nav.industries": "القطاعات",
      "nav.work": "الأعمال",
      "nav.about": "عن الشركة",
      "nav.insights": "الرؤى",
      "nav.careers": "الوظائف",
      "nav.contact": "تواصل",
      "cta.book": "احجز مراجعة",
      "cta.longAudit": "احجز مراجعة نظام لمدة 30 دقيقة",
      "cta.plan": "اطّلع على خطة 100 يوم",
      "mega.platforms.label": "منظومة مايكروسوفت / 07 مسارات",
      "mega.platforms.dek": "اختر النظام. نحن نرسم العمل والبيانات والأشخاص حوله.",
      "mega.industries.label": "ممارسات القطاعات / 09 مسارات",
      "mega.industries.dek": "حزم قطاعية للحالات التي تفوتها خطة التنفيذ العامة.",
      "hero.eyebrow": "MICROSOFT DYNAMICS 365 · AZURE · POWER PLATFORM — الهند / الشرق الأوسط",
      "hero.title": "<span class=\"title-line\">ERP سحابي، جاهز خلال <em>100</em> يوم.</span><span class=\"title-line\">وليس بعد ثمانية عشر شهرًا.</span>",
      "hero.sub": "ننفّذ أنظمة ERP السحابية من مايكروسوفت لفرق المالية والعقارات والتجزئة والتعليم في الهند والإمارات.",
      "hero.source": "المصدر: مقياس تنفيذ منشور لدى ApplicaTech · تطبيقات سحابية جاهزة خلال ≤100 يوم",
      "form.name": "الاسم",
      "form.email": "البريد الإلكتروني للعمل",
      "form.message": "أين تكمن المشكلة؟",
      "form.namePlaceholder": "اسمك الكامل",
      "form.emailPlaceholder": "name@company.com",
      "form.messagePlaceholder": "إقفال نهاية الشهر، ترحيل البيانات، الدعم، أو غير ذلك.",
      "footer.rtlNote": "التبديل إلى العربية يغيّر الاتجاه وتسميات الواجهة الرئيسية. الترجمة الكاملة قيد الإعداد.",
      "footer.explore": "استكشف",
      "footer.read": "اقرأ",
      "footer.offices": "المكاتب",
      "footer.contact": "تواصل"
    }
  };

  const METRICS = [
    { id:"practice-hours", value:3000, prefix:"", suffix:"+", label:"hours of industry practice built into delivery", source:"Published AplicaTech asset figure. Asset register to attach. [VERIFY]", verified:true },
    { id:"bi-assets", value:100, prefix:"", suffix:"+", label:"pre-built reports, dashboards and BI assets", source:"Published AplicaTech asset figure. Inventory to attach. [VERIFY]", verified:true },
    { id:"go-live", value:100, prefix:"≤", suffix:"", label:"days to a business-ready cloud app", source:"Published AplicaTech delivery claim. Scope conditions to attach. [VERIFY]", verified:true },
    { id:"azure-regions", value:54, prefix:"", suffix:"", label:"Azure regions, including UAE", source:"Published Microsoft figure. Confirm current count at launch. [VERIFY DATE]", verified:true },
    { id:"inventory", value:22, prefix:"↓ ", suffix:"%", label:"inventory carrying cost, proposed benchmark", source:"Median across [N] engagements, 2022–2025 — [VERIFY]", verified:false },
    { id:"reconciliation", value:40, prefix:"↓ ", suffix:"%", label:"manual reconciliation effort, proposed benchmark", source:"Median across [N] engagements, 2022–2025 — [VERIFY]", verified:false },
    { id:"close", value:18, prefix:"↑ ", suffix:"%", label:"faster month-end close, proposed benchmark", source:"Median across [N] engagements, 2022–2025 — [VERIFY]", verified:false },
    { id:"recovery", value:6, prefix:"↓ ", suffix:" wks", label:"average project recovery time, proposed benchmark", source:"Median across [N] engagements, 2022–2025 — [VERIFY]", verified:false }
  ];

  const TESTIMONIALS = [
    {
      quote:"“Aplica’s team understood our real estate processes and stayed with us through every release.”",
      name:"Mohammed Shariff",
      role:"ERP Project Manager · Seven Tides · Real Estate · Dubai",
      meta:"ENGAGEMENT DATES [VERIFY] · D365 F&O · [SOURCE: CLIENT-SPEAK PAGE · PARAPHRASED]"
    },
    {
      quote:"“They asked about our grant structure before they asked about the licence count.”",
      name:"Amit Chandra",
      role:"CTO · IIHS · Education · Bangalore",
      meta:"RFP-TO-DEPLOYMENT [VERIFY] · D365 F&O · [SOURCE: CLIENT-SPEAK PAGE · PARAPHRASED]"
    },
    {
      quote:"“The rental process is clearer, the effort is lower and the numbers finally agree.”",
      name:"Vijender Kumar",
      role:"ERP Project Manager · Albaddad · Rental & Lease · GCC",
      meta:"PROCESS REVIEW [VERIFY] · D365 F&O · [SOURCE: CLIENT-SPEAK PAGE · PARAPHRASED]"
    },
    {
      quote:"“The value was not a demo. It was a team that kept the programme moving.”",
      name:"Mohammad Asrawi",
      role:"AWJ Holding · Multi-entity Operations · UAE",
      meta:"PARTNERSHIP LENGTH [VERIFY] · MICROSOFT CLOUD · [SOURCE: CLIENT-SPEAK PAGE · PARAPHRASED]"
    }
  ];

  const buyer = (label,title,copy) => ({label,title,copy});
  const metric = (value,label,source) => ({value,label,source});
  const cap = (title,copy) => ({title,copy});
  const faq = (q,a) => ({q,a});

  const HUBS = {
    "/platforms": {
      nav:"Platforms", eyebrow:"01 / PLATFORMS", pageTitle:"Platforms",
      title:"Buy the system last. Fix the process first.",
      dek:"Dynamics 365, Azure and Power Platform delivery for teams that need the ledger, the warehouse and the board pack to agree.",
      heroCta:"Book a platform audit",
      heroNote:"A 30-minute audit maps the process, the data and the integration boundary before a product demonstration.",
      buyers:[
        buyer("BUYER 01","CFO at a 200–800 person distributor on NAV 2018","Wants one close calendar, one item master and a migration that does not freeze the business."),
        buyer("BUYER 02","Finance director at a multi-entity UAE property group","Needs lease events, asset records and statutory reporting in one chain."),
        buyer("BUYER 03","COO at a regional contracting business","Needs project WIP, retention and procurement to reconcile without a parallel spreadsheet."),
        buyer("BUYER 04","CIO at an education group","Needs grant, fee and payroll dimensions separated before the next audit.")
      ],
      metrics:[
        metric("≤100","days to a business-ready cloud app","Published AplicaTech delivery claim. Scope conditions to attach. [VERIFY]"),
        metric("3,000+","hours of built-in industry practice","Published AplicaTech asset figure. Asset register to attach. [VERIFY]"),
        metric("100+","pre-built reports and BI assets","Published AplicaTech asset figure. Inventory to attach. [VERIFY]")
      ],
      capabilities:[
        cap("Dynamics 365 Finance & Operations","Multi-entity finance, procurement, supply chain, project accounting and consolidation."),
        cap("Dynamics 365 Business Central","Core finance, trade and reporting for growing companies that need a shorter runway."),
        cap("Customer Engagement","Sales, Marketing, Customer Service, Field Service and Project Service Automation."),
        cap("Azure Cloud","Migration, integration, environment controls and data residency across India and UAE regions."),
        cap("Power Platform / Power BI","Role-based dashboards, approvals, automation and a governed reporting layer."),
        cap("GCC Payroll & E-Invoicing","Payroll rules, WPS files, gratuity and e-invoice readiness for UAE, KSA and Qatar."),
        cap("AX / NAV modernisation","A code, data and process route from AX 2012 or NAV to D365 F&O or Business Central.")
      ],
      index:[
        {code:"01",tag:"F&O",title:"Dynamics 365 Finance & Operations",href:"#/platforms/d365-fo"},
        {code:"02",tag:"BC",title:"Dynamics 365 Business Central",href:"#/platforms/d365-bc"},
        {code:"03",tag:"CE",title:"Customer Engagement",href:"#/platforms/customer-engagement"},
        {code:"04",tag:"AZURE",title:"Azure Cloud",href:"#/platforms/azure"},
        {code:"05",tag:"POWER",title:"Power Platform / Power BI",href:"#/platforms/power-platform"},
        {code:"06",tag:"GCC",title:"GCC Payroll & E-Invoicing",href:"#/platforms/gcc-payroll"},
        {code:"07",tag:"LEGACY",title:"Dynamics AX / NAV → D365",href:"#/platforms/legacy-modernisation"}
      ],
      caseStudy:{client:"SEVEN TIDES",title:"A lease register became the source of truth.",copy:"Draft narrative showing how asset, contract and finance records were aligned before configuration.",href:"#/work/seven-tides"},
      faqs:[
        faq("Can you take over a project another partner abandoned?","Yes, after a recovery audit. We start with the decision log, data state, customisation inventory and unresolved process gaps. You get a written recovery plan before we change the build."),
        faq("What does a systems audit cost and how long is it?","The first conversation is 30 minutes. A paid audit is scoped by entity count and integration surface; insert the current rate card here. [VERIFY]"),
        faq("Do you support AX 2012 after end-of-support?","We support the migration decision around it. We do not claim an independent Microsoft support extension. Current support status must be checked against your agreement. [VERIFY]"),
        faq("Is GCC payroll compliant across UAE, KSA and Qatar?","The add-on covers local rule sets, but compliance depends on your entity configuration and current legislation. We run a country-by-country control review before sign-off. [VERIFY]"),
        faq("Can we keep our existing reporting layer?","Often yes. We map the semantic layer before migration, then decide which reports move, which retire and which need rebuilding in Power BI.")
      ],
      offer:{title:"Get a platform decision memo, not a product demo.",copy:"We will tell you what to configure, what to retire and what to leave alone for the first release.",cta:"Book a platform audit"},
      note:"All planning ranges on child pages are proposed benchmarks for this preview. Confirm against current delivery data. [VERIFY]"
    },

    "/services": {
      nav:"Services", eyebrow:"02 / SERVICES", pageTitle:"Services",
      title:"Eleven ways to get a D365 programme back on schedule.",
      dek:"Advisory, implementation, migration, recovery, localisation, support and training — under one accountable programme plan.",
      heroCta:"Request a recovery call",
      heroNote:"If the programme is already late, we begin with the decision log. If it is not late, we begin with the process.",
      buyers:[
        buyer("BUYER 01","Programme sponsor with a stalled D365 F&O rollout","Needs a credible recovery date, not another status dashboard."),
        buyer("BUYER 02","IT head at a distributor running AX 2012","Needs a migration sequence that protects customisations and opening balances."),
        buyer("BUYER 03","Finance lead expanding into KSA and Qatar","Needs localisation and e-invoicing controls before the next entity goes live."),
        buyer("BUYER 04","Operations director with no internal D365 support team","Needs an AMC with named cover for month-end and year-end.")
      ],
      metrics:[
        metric("11","service lines under one programme plan","Derived from the corporate profile service list in the source brief. [VERIFY]"),
        metric("2","regions supported: India and the Middle East","Source: company profile. Delivery countries listed as UAE, Kuwait, Qatar and KSA. [VERIFY]"),
        metric("1","commercial line for bundled work","Proposed contract structure. Confirm with commercial team. [VERIFY]")
      ],
      capabilities:[
        cap("Business Process Consulting","Map the real process before the system blueprint."),
        cap("System Audit & Recommendations","Evidence-based review of configuration, data, integrations and adoption."),
        cap("Program & Project Management","One decision log, one risk register, one release calendar."),
        cap("New Implementation","A 100-day delivery path from discovery through hypercare."),
        cap("Upgrade, Migration & Global Rollouts","AX, NAV and older D365 versions moved into a supported target."),
        cap("Project Recovery","Stabilise the current build, then recover confidence and the schedule."),
        cap("Localization, Integration, Support, Training & Outsourcing","Country controls, connected systems, AMC, product training and business resource cover.")
      ],
      index:[
        {code:"01",tag:"BUILD",title:"New Implementation",href:"#/services/implementation"},
        {code:"02",tag:"MOVE",title:"Upgrade, Migration & Global Rollouts",href:"#/services/upgrade-migration"},
        {code:"03",tag:"FIX",title:"Project Recovery",href:"#/services/project-recovery"},
        {code:"04",tag:"RUN",title:"Managed Support / AMC",href:"#/services/managed-support"},
        {code:"05",tag:"CHECK",title:"Consulting & System Audit",href:"#/services/consulting-audit"},
        {code:"06",tag:"LOCAL",title:"Localization Services",href:"#/services/localization"},
        {code:"07",tag:"TEAM",title:"Business Resource Outsourcing",href:"#/services/resource-outsourcing"}
      ],
      caseStudy:{client:"ALBADDAD CAPITAL",title:"A recovery plan started with three broken handoffs.",copy:"Draft narrative showing how rental contract, asset and billing events were reconnected.",href:"#/work/albaddad-capital"},
      faqs:[
        faq("Can you take over a project another partner abandoned?","Yes. The first two weeks produce a recovery brief: build state, data state, open decisions and a revised cutover plan."),
        faq("What is included in an AMC?","Incident handling, release checks, month-end cover and a named escalation route. The final SLA comes from your signed schedule. [VERIFY]"),
        faq("Do you work with our internal IT team?","Yes. We define ownership for environments, data, integrations and approvals before the first sprint."),
        faq("Can you train users in Arabic and English?","Training materials can be produced in both languages. Confirm trainer availability and translation scope during scoping. [VERIFY]"),
        faq("How do you price a system audit?","By entity count, process scope and integration surface. Insert the current rate card before launch. [VERIFY]")
      ],
      offer:{title:"Ask for the recovery brief before the rescue plan.",copy:"A 30-minute call is enough to tell you whether the programme needs a restart, a reset or a clean handover.",cta:"Request a recovery call"},
      note:"Service list follows the corporate profile. SLA, pricing and team availability need commercial confirmation. [VERIFY]"
    },

    "/industries": {
      nav:"Industries", eyebrow:"03 / INDUSTRIES", pageTitle:"Industries",
      title:"Generic ERP breaks at the industry exception.",
      dek:"Real estate, construction, distribution, commerce, warehouse, rental, education and professional services packs built around the work.",
      heroCta:"Map your exceptions",
      heroNote:"We start with the transaction that your current system cannot post cleanly. That is usually the real requirement.",
      buyers:[
        buyer("BUYER 01","CFO at a Dubai real estate developer with 4 legal entities","Needs unit, lease and finance records to reconcile before board reporting."),
        buyer("BUYER 02","Supply chain director at a 12-warehouse distributor","Needs put-away, transfer and returns to match physical movement."),
        buyer("BUYER 03","Finance controller at a regional education group","Needs fee, grant and payroll dimensions separated without spreadsheet workarounds."),
        buyer("BUYER 04","COO at a rental business with 9,000+ contracts","Needs contract, asset, return and invoice events in one chain.")
      ],
      metrics:[
        metric("9","sector practices in this preview","Derived from the industry list in the source brief. [VERIFY]"),
        metric("3,000+","hours of built-in industry practice","Published AplicaTech asset figure. Asset register to attach. [VERIFY]"),
        metric("100+","pre-built reports and BI assets","Published AplicaTech asset figure. Inventory to attach. [VERIFY]")
      ],
      capabilities:[
        cap("Property & Lease Accounting","Unit master, lease events, escrow, handover and entity consolidation."),
        cap("Project & Contract Control","WIP, retention, variations, subcontractor certificates and project margin."),
        cap("Trade & Distribution","Landed cost, rebates, pricing books, credit control and intercompany trade."),
        cap("Commerce & Warehouse","ECOMM 365, marketplace stock, dock scheduling and cycle counts."),
        cap("Field & Van Operations","Route loads, van stock, returns, cash settlement and daily close."),
        cap("Rental & Lease Management","Contract lifecycle, asset availability, billing and return exceptions."),
        cap("Education & Professional Services","Grant dimensions, fee billing, resource bookings and project margin.")
      ],
      index:[
        {code:"01",tag:"PROPERTY",title:"Real Estate",href:"#/industries/real-estate"},
        {code:"02",tag:"PROJECTS",title:"Construction & Contracting",href:"#/industries/construction"},
        {code:"03",tag:"TRADE",title:"Trade & Distribution",href:"#/industries/trade-distribution"},
        {code:"04",tag:"COMMERCE",title:"E-Commerce / ECOMM 365",href:"#/industries/ecommerce"},
        {code:"05",tag:"STOCK",title:"Warehouse Management",href:"#/industries/warehouse"},
        {code:"06",tag:"ROUTES",title:"Van Sales & Distribution",href:"#/industries/van-sales"},
        {code:"07",tag:"LEASE",title:"Rental & Lease Management",href:"#/industries/rental-lease"},
        {code:"08",tag:"CAMPUS",title:"Education",href:"#/industries/education"},
        {code:"09",tag:"BILLABLE",title:"Professional Services",href:"#/industries/professional-services"}
      ],
      caseStudy:{client:"IIHS",title:"Grant, fee and payroll dimensions were separated before deployment.",copy:"Draft narrative showing how an RFP turned into a workable education chart of accounts.",href:"#/work/iihs"},
      faqs:[
        faq("Do you use the same template for every industry?","No. The financial core is stable; the exception screens, dimensions and reports change by sector."),
        faq("Can you handle UAE and India entities in one rollout?","Yes, with a country-by-country control review. Data residency and statutory reporting are scoped before configuration. [VERIFY]"),
        faq("We already have a vertical add-on. Can you keep it?","We audit the add-on against the current D365 release and your process. Keep, replace or retire is a documented decision."),
        faq("How specific is the warehouse pack?","It covers receipt, put-away, pick, transfer, cycle count and returns. Device strategy is scoped separately."),
        faq("Do you support e-invoicing for GCC entities?","E-invoicing controls are scoped by country and current regulation. No blanket compliance claim is made. [VERIFY]")
      ],
      offer:{title:"Bring us the transaction your system cannot post.",copy:"We will map the exception and show you the data model behind it in one working session.",cta:"Map your exceptions"},
      note:"Sector proof lines throughout this preview are draft examples. Replace with signed client data. [VERIFY]"
    },

    "/work": {
      nav:"Work", eyebrow:"04 / WORK", pageTitle:"Work",
      title:"Six drafts. Six decisions that moved the programme.",
      dek:"Case narratives from real estate, rental, education, retail and multi-entity operations. Every metric needs client sign-off.",
      heroCta:"Request source data",
      heroNote:"These are layout drafts built from public client names and the source brief. They are not approved case studies yet.",
      buyers:[
        buyer("BUYER 01","CFO comparing D365 partners","Wants to see the approach, not just the logo wall."),
        buyer("BUYER 02","Programme sponsor in month four of a stalled rollout","Wants a recovery sequence with named outputs."),
        buyer("BUYER 03","Finance lead planning a GCC expansion","Wants proof of localisation and data controls."),
        buyer("BUYER 04","Procurement lead writing an RFP","Wants evidence, assumptions and source notes in plain language.")
      ],
      metrics:[
        metric("6","draft case narratives in this preview","All narratives marked [DRAFT — CONFIRM WITH CLIENT]. [VERIFY]"),
        metric("18","public client names in the source brief","Names used as text-set wordmarks only. Permission to publish still required. [VERIFY]"),
        metric("0","approved case metrics in this static build","Do not publish outcome figures until source data is attached. [VERIFY]")
      ],
      capabilities:[
        cap("The situation","Two sentences on the business condition, not a technology wish list."),
        cap("The approach","A phased sequence with a named deliverable at each gate."),
        cap("Architecture","A simple diagram of systems, data and ownership boundaries."),
        cap("Results","Three numbers with a method note below each one."),
        cap("Client quote","Paraphrased from public client-speak pages, with exact wording to be approved."),
        cap("What we would do differently","A short reflection that makes the case useful rather than polished.")
      ],
      index:[
        {code:"01",tag:"REAL ESTATE",title:"Seven Tides",href:"#/work/seven-tides"},
        {code:"02",tag:"HOLDING",title:"AWJ Holding",href:"#/work/awj-holding"},
        {code:"03",tag:"RENTAL",title:"Albaddad Capital",href:"#/work/albaddad-capital"},
        {code:"04",tag:"EDUCATION",title:"IIHS",href:"#/work/iihs"},
        {code:"05",tag:"RETAIL",title:"Magrudy's",href:"#/work/magrudys"},
        {code:"06",tag:"DISTRIBUTION",title:"Lals Group",href:"#/work/lals-group"}
      ],
      caseStudy:{client:"SEVEN TIDES",title:"Start with the case that has the longest paper trail.",copy:"Open the full draft narrative, including architecture, method notes and the reflection section.",href:"#/work/seven-tides"},
      faqs:[
        faq("Are these case studies approved?","No. They are drafts for layout review. Metrics, quotes, timelines and team sizes all need written client approval. [VERIFY]"),
        faq("Why include draft cases at all?","So the template can be reviewed end-to-end. Remove or replace them before launch if approvals are not ready."),
        faq("Can a client remain anonymous?","Yes. Sector, region, entity count and process detail can remain while the name is removed."),
        faq("Where do the result numbers come from?","They are proposed placeholders. Attach the source report, measurement window and calculation method before publication. [VERIFY]"),
        faq("Can we add a video testimonial?","Yes, but add a transcript and a poster frame. Do not autoplay media on the page.")
      ],
      offer:{title:"Ask for the source pack behind any number on this site.",copy:"We would rather show the method than ask you to trust a headline.",cta:"Request source data"},
      note:"Every case narrative in this static preview is marked as draft. Do not publish without approval. [VERIFY]"
    },

    "/about": {
      nav:"About", eyebrow:"05 / ABOUT", pageTitle:"About",
      title:"A consulting firm with a delivery team, not a slide deck.",
      dek:"Aplica Technologies has implemented Microsoft business systems from Bangalore and the UAE since 2015.",
      heroCta:"Meet the delivery team",
      heroNote:"Incorporated 27 January 2015. 51–100 people, according to Crunchbase. Microsoft CSP and Dynamics partner.",
      buyers:[
        buyer("WHO WE WORK WITH","CFO who needs a close calendar that survives audit","We start with the ledger, dimensions and approval path."),
        buyer("WHO WE WORK WITH","CIO who needs fewer customisations","We separate a real requirement from a habit inherited from AX."),
        buyer("WHO WE WORK WITH","Programme sponsor who needs one accountable team","The audit, build and hypercare team stay connected."),
        buyer("WHO WE WORK WITH","HR leader hiring D365 consultants","We publish role-specific expectations instead of generic job ads.")
      ],
      metrics:[
        metric("2015","incorporation year","Source: Aplica Technologies (India) Private Limited company information. [VERIFY]"),
        metric("51–100","headcount band","Source: Crunchbase band in the source brief. Confirm current figure. [VERIFY]"),
        metric("2","primary markets: India and UAE","Delivery also listed into Kuwait, Qatar and KSA. [VERIFY]")
      ],
      capabilities:[
        cap("Advisory before migration","We will tell you when the current system is not the problem."),
        cap("Dedicated deployment teams","Context stays with the people who build and support the system."),
        cap("Full lifecycle ownership","Audit, implementation, rollout, recovery, localisation, support and training."),
        cap("Bundled commercial model","Licensing, build and support can sit on one invoice. [VERIFY]"),
        cap("Vertical practice packs","3,000+ hours of industry practice and 100+ BI assets, per published AplicaTech figures."),
        cap("Regional delivery","Bangalore HQ with Middle East delivery across UAE, Kuwait, Qatar and KSA.")
      ],
      index:[
        {code:"01",tag:"STORY",title:"From 2015 to two regions",href:"#/about/story"},
        {code:"02",tag:"TEAM",title:"Leadership and delivery",href:"#/about/leadership"},
        {code:"03",tag:"PARTNERS",title:"Microsoft and partner network",href:"#/about/partnerships"},
        {code:"04",tag:"CAREERS",title:"Open roles",href:"#/careers"}
      ],
      caseStudy:{client:"IIHS",title:"An RFP became a chart of accounts the team could defend.",copy:"Draft narrative showing how education finance dimensions were separated before deployment.",href:"#/work/iihs"},
      faqs:[
        faq("Do you hold a Microsoft partner tier?","Do not claim a tier in this preview. The source brief confirms Microsoft CSP and Microsoft Dynamics partner status only. [VERIFY]"),
        faq("How large is the company?","The source brief cites a 51–100 headcount band from Crunchbase. Confirm the current figure before publication. [VERIFY]"),
        faq("Where are your offices?","Bangalore is the registered India office. Middle East delivery is listed from the UAE into Kuwait, Qatar and KSA. A full UAE street address needs confirmation. [VERIFY]"),
        faq("Do you work outside India and the Gulf?","The published focus is India and the Middle East. Other geographies should be confirmed per engagement. [VERIFY]"),
        faq("Who owns the work after go-live?","The support model and AMC are scoped before cutover. Named cover and SLA to be inserted from contract. [VERIFY]")
      ],
      offer:{title:"Ask for the team who will actually do the work.",copy:"No unnamed delivery centre. You meet the consultants before the statement of work is signed.",cta:"Meet the delivery team"},
      note:"Leadership names, portraits, certifications and UAE address details are intentionally omitted until supplied. [VERIFY]"
    },

    "/insights": {
      nav:"Insights", eyebrow:"06 / INSIGHTS", pageTitle:"Insights",
      title:"Three working papers for people who sign the plan.",
      dek:"Implementation failures, UAE e-invoicing controls and AX migration sequence — written as field notes, not gated content.",
      heroCta:"Get the next field note",
      heroNote:"No email gate on the articles. If a note is useful, pass it to the person who owns the decision.",
      buyers:[
        buyer("READER 01","CFO approving a D365 programme budget","Wants the failure points before the steering committee hears them."),
        buyer("READER 02","Finance controller preparing for e-invoicing","Wants a control list, not a regulatory headline."),
        buyer("READER 03","IT lead planning an AX 2012 exit","Wants the order of code, data and people decisions."),
        buyer("READER 04","Programme manager writing a recovery brief","Wants language that makes a hard decision easier to explain.")
      ],
      metrics:[
        metric("3","full working papers in this preview","Article text is original draft content for this static build. [VERIFY]"),
        metric("0","gated forms on article pages","Keep articles readable without a form. [VERIFY]"),
        metric("03","core failure themes: process, data, adoption","Derived from the source brief. [VERIFY]")
      ],
      capabilities:[
        cap("Delivery notes","What causes a D365 programme to stall after the blueprint. "),
        cap("Finance control notes","What changes for invoice data, identity fields, archive and audit trail."),
        cap("Modernisation notes","How to sequence code, data, integrations and user acceptance."),
        cap("No auto-rotating carousel","Stories are listed. The reader decides what to open."),
        cap("Source discipline","Every number in an article needs a source line before publication."),
        cap("Editorial layout","Long-form text with a sticky section index and a readable 68ch measure.")
      ],
      index:[
        {code:"01",tag:"DELIVERY",title:"Why D365 programmes stall in month four",href:"#/insights/why-d365-programmes-stall-in-month-four"},
        {code:"02",tag:"FINANCE",title:"UAE e-invoicing: what changes for finance teams",href:"#/insights/uae-e-invoicing-what-changes"},
        {code:"03",tag:"LEGACY",title:"AX 2012 to D365 F&O: the migration sequence that works",href:"#/insights/ax-2012-to-d365-fo-migration-sequence"}
      ],
      caseStudy:{client:"FIELD NOTE",title:"The article you need before the next steering committee.",copy:"Open the month-four working paper. It includes the decision list that should be signed earlier.",href:"#/insights/why-d365-programmes-stall-in-month-four"},
      faqs:[
        faq("Are the articles legal or regulatory advice?","No. They are implementation field notes. Confirm current regulations with your tax and legal advisers. [VERIFY]"),
        faq("Can we republish an article?","Request written permission. This static preview does not define a licence."),
        faq("Do you publish client names in articles?","Only with written approval. The examples here are anonymised or general."),
        faq("How often will you publish?","Set an editorial calendar after launch. No frequency is promised in this preview. [VERIFY]"),
        faq("Can we subscribe?","Add a newsletter endpoint before launch. Do not collect emails without a privacy notice and delivery mechanism.")
      ],
      offer:{title:"Send us the objection your steering committee keeps repeating.",copy:"We will turn the useful ones into the next field note.",cta:"Get the next field note"},
      note:"Article dates, authorship and regulatory references are draft. Legal review required before publication. [VERIFY]"
    },

    "/careers": {
      nav:"Careers", eyebrow:"07 / CAREERS", pageTitle:"Careers",
      title:"Consultants who can read a ledger and a stack trace.",
      dek:"Role-specific openings for D365 F&O, Business Central, CRM, retail and SCM consultants across Bangalore and Middle East delivery.",
      heroCta:"View open roles",
      heroNote:"No culture-video wall. Read the role, the expectations and the work you would own.",
      buyers:[
        buyer("CANDIDATE 01","F&O technical consultant tired of ticket-only work","Wants ownership of extensions, data and release quality."),
        buyer("CANDIDATE 02","F&O functional consultant who knows month-end","Wants to design the close, not just configure a field."),
        buyer("CANDIDATE 03","NAV/BC developer moving to cloud","Wants a clear path from AL extensions to Dataverse and Power Platform."),
        buyer("CANDIDATE 04","CRM techno-functional consultant","Wants real integration work, not isolated form customisation.")
      ],
      metrics:[
        metric("6","role templates in this preview","Derived from open positions named in the source brief. [VERIFY]"),
        metric("2","hiring regions: India and UAE","Confirm current hiring locations with HR. [VERIFY]"),
        metric("0","salary claims in this static build","Do not publish compensation without HR approval. [VERIFY]")
      ],
      capabilities:[
        cap("F&O Technical Consultant","X++, extensions, data entities, integration and release management."),
        cap("F&O Functional Consultant","Finance, procurement, project accounting and UAT design."),
        cap("F&O SCM Consultant","Warehouse, trade, planning and inventory reconciliation."),
        cap("NAV/BC Technical Consultant","AL extensions, upgrade paths, APIs and reporting."),
        cap("F&O Retail","Store, POS, pricing, loyalty and channel integration."),
        cap("F&O CRM Techno-Functional","Dataverse, model-driven apps, integration and field operations.")
      ],
      index:[
        {code:"01",tag:"F&O",title:"F&O Technical Consultant",href:"#/careers/fo-technical-consultant"},
        {code:"02",tag:"F&O",title:"F&O Functional Consultant",href:"#/careers/fo-functional-consultant"},
        {code:"03",tag:"SCM",title:"F&O SCM Consultant",href:"#/careers/fo-scm-consultant"},
        {code:"04",tag:"BC",title:"NAV/BC Technical Consultant",href:"#/careers/nav-bc-technical-consultant"},
        {code:"05",tag:"RETAIL",title:"F&O Retail Consultant",href:"#/careers/fo-retail-consultant"},
        {code:"06",tag:"CRM",title:"F&O CRM Techno-Functional Consultant",href:"#/careers/fo-crm-techno-functional"}
      ],
      caseStudy:{client:"TEAM NOTE",title:"See the kind of work you would own.",copy:"Open the Albaddad draft case to see the process, data and exception design behind a D365 F&O engagement.",href:"#/work/albaddad-capital"},
      faqs:[
        faq("Are these roles currently open?","The role titles come from the source brief. Current vacancies must be confirmed by HR. [VERIFY]"),
        faq("Where are the roles based?","Bangalore and Middle East delivery are the intended regions. Exact location and travel expectations need confirmation. [VERIFY]"),
        faq("Do you sponsor visas?","No policy is stated in this preview. HR must add the current policy before launch. [VERIFY]"),
        faq("What is the interview process?","Insert the real process here: screening, technical discussion, case conversation and HR round. [VERIFY]"),
        faq("Can I apply without a Microsoft certification?","Role requirements are listed on each page. Certification expectations must be confirmed by HR. [VERIFY]")
      ],
      offer:{title:"Send a CV with one problem you fixed.",copy:"We care more about the decision you made than the list of modules you touched.",cta:"View open roles"},
      note:"All role pages are templates. HR must confirm vacancies, locations, compensation and interview process. [VERIFY]"
    },

    "/contact": {
      nav:"Contact", eyebrow:"08 / CONTACT", pageTitle:"Contact",
      title:"Start with the system that is slowing you down.",
      dek:"Thirty minutes, one process and a written list of what will break if nothing changes.",
      heroCta:"Book a 30-min systems audit",
      heroNote:"Direct channels: sales@aplicatech.com · +971 55 7932435 · WhatsApp · Bangalore office.",
      buyers:[
        buyer("YOU ARE","A CFO with a close calendar that keeps slipping","Bring the last three month-end timelines."),
        buyer("YOU ARE","A CIO with a D365 programme in month four","Bring the decision log, not the status deck."),
        buyer("YOU ARE","An operations lead with a spreadsheet shadow system","Bring the transaction that cannot be posted cleanly."),
        buyer("YOU ARE","An HR leader hiring D365 consultants","Use hr@aplicatech.com instead of the audit form.")
      ],
      metrics:[
        metric("30","minutes for the first systems audit","Proposed meeting length. Confirm with sales. [VERIFY]"),
        metric("3","input fields on the audit request","Name, work email and the problem statement. [VERIFY]"),
        metric("1","business day response target","Proposed target. Confirm with sales operations. [VERIFY]")
      ],
      capabilities:[
        cap("Sales","sales@aplicatech.com for audits, migrations, recovery and support."),
        cap("Careers","hr@aplicatech.com for role applications and hiring questions."),
        cap("Middle East phone","+971 55 7932435. WhatsApp is available on the same number."),
        cap("India office","9th Avenue, No. 14, 3rd Cross, NS Iyengar Street, Seshadripuram, Bangalore 560020."),
        cap("Form endpoint","This static preview needs a CRM endpoint before launch. FORM_ENDPOINT is defined in script.js."),
        cap("Privacy","Do not send passwords, financial records or personal data in the first message.")
      ],
      index:[
        {code:"01",tag:"SALES",title:"Systems audit",href:"#/contact/audit"},
        {code:"02",tag:"SUPPORT",title:"Existing client support",href:"#/contact/support"},
        {code:"03",tag:"HR",title:"Careers and applications",href:"#/contact/careers"}
      ],
      caseStudy:{client:"START HERE",title:"Not sure which route fits?",copy:"Use the audit form and describe the problem in one sentence. We will route it to the right team.",href:"#/contact/audit"},
      faqs:[
        faq("What happens after I submit the form?","In this preview, nothing is sent. After CRM integration, the request should create a lead and send a confirmation email. [VERIFY]"),
        faq("How quickly do you respond?","The site shows a target of under one business day. Sales operations must confirm the target. [VERIFY]"),
        faq("Can I book directly into a calendar?","A scheduling link can be added after launch. No calendar service is connected in this static build. [VERIFY]"),
        faq("What should I not send?","Do not send passwords, bank details, personal identity documents or unredacted financial records."),
        faq("Do you have a UAE street address?","A full UAE street address was not provided in the source brief and is marked [VERIFY].")
      ],
      offer:{title:"No demo until we understand the problem.",copy:"The first call is a working session. You leave with a short written problem statement.",cta:"Book a 30-min systems audit"},
      note:"Form submissions are intentionally disabled in this static preview. Connect FORM_ENDPOINT before launch. [VERIFY]",
      form:true
    }
  };

  /* Two built-out child pages per hub; remaining child routes use a labelled template stub. */
  const DETAILS = {
    "/platforms/d365-fo": {
      parent:"/platforms", built:true, title:"D365 F&O without the spreadsheet shadow ledger.",
      dek:"Multi-entity finance, consolidation, procurement and project accounting for organisations that need one close calendar.",
      heroNote:"Typical planning range shown in the bento grid: 90–140 days with a 4–7 person team. [VERIFY]",
      capabilities:[
        cap("Chart of accounts and dimensions","Design the financial structure before configuration starts."),
        cap("Multi-entity consolidation","Map intercompany, currency and elimination rules to the close calendar."),
        cap("Procurement and project accounting","Connect commitments, receipts, WIP and billing to the general ledger."),
        cap("Reporting layer","Move board reporting into Power BI with a governed semantic model."),
        cap("Cutover and hypercare","Rehearse opening balances and put named support beside the finance team.")
      ],
      faqs:[
        faq("Can F&O handle our project WIP rules?","Usually yes, after a design decision. We map the recognition rule before we write an extension."),
        faq("How long is a typical F&O engagement?","The bento grid shows a proposed 90–140 day range. Your scope decides the real number. [VERIFY]"),
        faq("Do we need Azure?","Not always. Azure becomes relevant for integration, data residency and environment control."),
        faq("Can you fix a broken F&O build?","Yes. Start with a recovery audit and a decision log."),
        faq("Will our old AX customisations move?","No, not as-is. We classify each one as keep, replace or retire.")
      ],
      offer:{title:"Get an F&O fit-gap memo before the licence quote.",copy:"We will list the gaps, owners and decisions your first release depends on.",cta:"Book a platform audit"}
    },
    "/platforms/d365-bc": {
      parent:"/platforms", built:true, title:"Business Central for companies outgrowing entry-level finance.",
      dek:"Shorter implementations, clean extensions and a route from NAV without dragging twenty years of custom code.",
      heroNote:"Typical planning range shown in the bento grid: 60–100 days with a 3–5 person team. [VERIFY]",
      capabilities:[
        cap("Core finance","GL, AP, AR, fixed assets, cash and bank reconciliation."),
        cap("Trade and inventory","Pricing, purchasing, sales orders, transfers and returns."),
        cap("Extensions","AL-based changes with an upgrade-safe deployment path."),
        cap("Reporting","Account schedules, Power BI and role-based dashboards."),
        cap("NAV migration","Data, customisation and integration inventory before the first load.")
      ],
      faqs:[
        faq("When should we choose F&O instead?","When entity complexity, manufacturing depth or global rollout needs exceed the BC design centre."),
        faq("Can we keep NAV customisations?","We inventory them first. Most are replaced by extensions or standard configuration."),
        faq("Is BC suitable for multiple countries?","It can be, subject to localisation and statutory reporting review. [VERIFY]"),
        faq("How long does BC take?","The proposed range here is 60–100 days. Data quality and scope decide the real plan. [VERIFY]"),
        faq("Can Power BI connect on day one?","Yes, if the reporting model is designed before configuration.")
      ],
      offer:{title:"Bring your NAV customisation list. We will cut it down.",copy:"A one-page inventory is enough to start the migration conversation.",cta:"Book a platform audit"}
    },
    "/services/implementation": {
      parent:"/services", built:true, title:"A new implementation that starts with a decision log.",
      dek:"The 100-day plan, with a named output and a business owner at every gate.",
      heroNote:"The day ranges are a planning model for this preview. Confirm against current delivery data. [VERIFY]",
      capabilities:[
        cap("Audit and blueprint","Current-state map, fit-gap register and signed target processes."),
        cap("Baseline and configuration","Industry packs, roles, environments and reporting inventory."),
        cap("Data rehearsal","Master data, open transactions and balances through repeated loads."),
        cap("User acceptance","Real scenarios, role-based training and exception screens."),
        cap("Cutover and hypercare","Command sheet, named cover and a 30-day improvement list.")
      ],
      faqs:[
        faq("What makes the 100-day plan credible?","Pre-built assets, early data rehearsal and a decision log with owners."),
        faq("Can every project fit 100 days?","No. The published claim is for business-ready cloud apps. Scope conditions must be attached. [VERIFY]"),
        faq("Who signs each gate?","A named business owner, not only the project manager."),
        faq("What happens in hypercare?","The deployment team sits beside finance and operations while the first cycles run."),
        faq("Do you train new joiners?","Yes. Training material is recorded by role for people who join after go-live.")
      ],
      offer:{title:"Ask for the six gate outputs before you sign a plan.",copy:"If a partner cannot name them, the plan is not ready.",cta:"Request a recovery call"}
    },
    "/services/project-recovery": {
      parent:"/services", built:true, title:"Recover the programme before you rebuild the system.",
      dek:"A two-week recovery audit that separates technology faults from decisions nobody made.",
      heroNote:"Recovery time benchmark on the homepage is a proposed placeholder. [VERIFY]",
      capabilities:[
        cap("Build state","Configuration, extensions, environments and release quality."),
        cap("Data state","Master records, opening balances and migration rehearsals."),
        cap("Decision state","Open fit-gaps, owners, due dates and commercial consequences."),
        cap("Adoption state","Real user scenarios, exception volume and training gaps."),
        cap("Recovery plan","A dated cutover sequence with named owners.")
      ],
      faqs:[
        faq("Can you take over a project another partner abandoned?","Yes. We begin with evidence, not blame."),
        faq("Do we have to restart the build?","Not always. The audit tells us whether to stabilise, reset or restart."),
        faq("How quickly can you produce a recovery date?","After the build, data and decision state are reviewed. No date is promised before that. [VERIFY]"),
        faq("Will the original team stay?","Where possible, yes. Context is an asset in recovery."),
        faq("What is the first deliverable?","A written recovery brief with a revised cutover sequence.")
      ],
      offer:{title:"Send the decision log, not the status deck.",copy:"We will tell you within one call whether a recovery audit is useful.",cta:"Request a recovery call"}
    },
    "/industries/real-estate": {
      parent:"/industries", built:true, title:"Property records that survive the board pack.",
      dek:"Unit master, lease events, escrow, handover and entity consolidation in one ledger chain.",
      heroNote:"All sector proof figures on this preview are draft placeholders. [VERIFY]",
      capabilities:[
        cap("Unit and asset master","One identifier from development to handover."),
        cap("Lease events","Contract, renewal, termination and escalation events."),
        cap("Escrow and billing","Milestone billing, receipts and statutory controls."),
        cap("Entity consolidation","Intercompany and dimension rules for group reporting."),
        cap("Executive reporting","Sales, collections, WIP and handover dashboards.")
      ],
      faqs:[
        faq("Can you connect our property management system?","Yes, after we map the system of record for each field."),
        faq("How do you handle escrow?","Escrow rules are scoped by country and bank integration. [VERIFY]"),
        faq("Can we keep our unit coding?","Usually, if the coding is consistent across entities. We test before migration."),
        faq("Do you support IFRS reporting?","The reporting layer can be designed around IFRS. Your auditor signs off the statements."),
        faq("What is the first workshop?","Unit master, lease event and finance dimension mapping.")
      ],
      offer:{title:"Bring one project with a broken unit-to-ledger link.",copy:"We will use it to map the data model in a working session.",cta:"Map your exceptions"}
    },
    "/industries/rental-lease": {
      parent:"/industries", built:true, title:"Rental stops being a spreadsheet with a D365 login.",
      dek:"Contract, asset availability, billing, return and damage exceptions in one chain.",
      heroNote:"The 9,000+ contract figure on the homepage is a draft sector example. [VERIFY]",
      capabilities:[
        cap("Contract lifecycle","Quotation, reservation, issue, renewal and close."),
        cap("Asset availability","Status, maintenance and transfer between sites."),
        cap("Billing","Rate cards, deposits, extensions and credit notes."),
        cap("Returns","Late, damaged and incomplete return exceptions."),
        cap("Operations dashboards","Utilisation, disputes and unbilled days.")
      ],
      faqs:[
        faq("Can D365 F&O manage serialised rental assets?","Yes, with the right asset and inventory design. We map the physical process first."),
        faq("How do you handle damage charges?","As an exception workflow with evidence, approval and billing rules."),
        faq("Can returns post outside working hours?","Yes, with a mobile or scanned event and a reconciliation rule. [VERIFY]"),
        faq("Do you support multi-entity fleets?","Yes, with ownership, transfer and intercompany rules."),
        faq("What is the first deliverable?","A contract-to-return event map with system ownership.")
      ],
      offer:{title:"Show us the return that never reached finance.",copy:"That exception usually reveals the real data model.",cta:"Map your exceptions"}
    },
    "/work/seven-tides": {
      parent:"/work", built:true, title:"Seven Tides: one lease ledger, four entities.",
      dek:"A draft real estate narrative showing how property, contract and finance records were aligned before configuration.",
      heroNote:"This is a template-filled draft. The full case page is generated from CASES data in this file.",
      capabilities:[
        cap("Situation","Asset, lease and finance files did not share an identifier."),
        cap("Approach","Master data, leasing events, finance dimensions and dashboards."),
        cap("Results","Draft metrics with method notes. Written client approval required."),
        cap("Reflection","What the team would change in the next property rollout.")
      ],
      faqs:[
        faq("Is this case approved?","No. It is marked [DRAFT — CONFIRM WITH CLIENT]."),
        faq("Where are the source numbers?","They are placeholders. Attach the measurement report before publication."),
        faq("Can the client be anonymised?","Yes. Remove the name and keep the sector, region and entity count."),
        faq("Is the quote exact?","No. It is paraphrased from public client-speak material and needs approval."),
        faq("What is the next step?","Send the draft to the client with the CONTENT-FLAGS.md list.")
      ],
      offer:{title:"Need the source pack for this draft?",copy:"We will mark every number, quote and timeline that needs approval.",cta:"Request source data"}
    },
    "/work/albaddad-capital": {
      parent:"/work", built:true, title:"Albaddad Capital: the rental handoff that disappeared.",
      dek:"A draft rental narrative showing how contract, asset, return and billing events were reconnected.",
      heroNote:"This is a template-filled draft. The full case page is generated from CASES data in this file.",
      capabilities:[
        cap("Situation","Returns arrived after the invoice and asset status lagged."),
        cap("Approach","Event mapping, standard billing, exception screens."),
        cap("Results","Draft reconciliation and handoff figures with method notes."),
        cap("Reflection","Why exception ownership should have been decided in week one.")
      ],
      faqs:[
        faq("Is this case approved?","No. It is marked [DRAFT — CONFIRM WITH CLIENT]."),
        faq("What does the architecture diagram show?","A five-node flow from contract to invoice, not a vendor topology claim."),
        faq("Can we publish the quote?","Not until the exact wording is approved."),
        faq("Are result numbers real?","No. They are draft placeholders. [VERIFY]"),
        faq("What should the client review first?","The situation, timeline and result method notes.")
      ],
      offer:{title:"Need the source pack for this draft?",copy:"We will mark every number, quote and timeline that needs approval.",cta:"Request source data"}
    },
    "/about/story": {
      parent:"/about", built:true, title:"From a Bangalore office to two delivery regions.",
      dek:"A concise company story built only from facts in the source brief. Leadership detail is deliberately omitted.",
      heroNote:"Incorporated 27 January 2015. Microsoft CSP and Dynamics partner status is stated without a partner tier.",
      capabilities:[
        cap("2015","Aplica Technologies (India) Private Limited is incorporated."),
        cap("Microsoft practice","Dynamics 365, Azure and Power Platform implementation becomes the core offer."),
        cap("Regional delivery","Bangalore HQ with UAE delivery into Kuwait, Qatar and KSA."),
        cap("Vertical packs","Real estate, rental, distribution, education and professional services practices."),
        cap("Today","Advisory, implementation, recovery, localisation, support and training under one programme plan.")
      ],
      faqs:[
        faq("Do you have leadership names?","Not in the source brief. Add them only after HR approval. [VERIFY]"),
        faq("Can we add office photos?","Yes, but use authored photography with a duotone treatment and a grain overlay."),
        faq("Is the company a Microsoft Gold partner?","No tier claim is made in this preview. [VERIFY]"),
        faq("What is the headcount?","The source brief cites 51–100 from Crunchbase. Confirm before publication. [VERIFY]"),
        faq("What is missing?","CIN, India direct phone, UAE street address and certification register.")
      ],
      offer:{title:"Want the full company profile?",copy:"Provide the verified facts and we will replace every [VERIFY] marker.",cta:"Meet the delivery team"}
    },
    "/about/partnerships": {
      parent:"/about", built:true, title:"Partner status, stated exactly.",
      dek:"Microsoft CSP and Microsoft Dynamics partner, with a named partner network. No unverified tier or award claims.",
      heroNote:"Partner network names in the source brief: Reddington, Webomindapps and Dynamics Mobile.",
      capabilities:[
        cap("Microsoft CSP status","Licensing and cloud subscription support. [VERIFY scope]"),
        cap("Microsoft Dynamics partner","Implementation and advisory across Dynamics 365."),
        cap("Reddington","Named partner network member. Relationship detail to confirm. [VERIFY]"),
        cap("Webomindapps","Named partner network member. Relationship detail to confirm. [VERIFY]"),
        cap("Dynamics Mobile","Named partner network member. Relationship detail to confirm. [VERIFY]")
      ],
      faqs:[
        faq("Do you claim a Microsoft partner tier?","No. Add a designation only with written proof."),
        faq("Are the partner network names public?","They appear in the source brief. Confirm permission to publish. [VERIFY]"),
        faq("Do you hold ISO or SOC certification?","No such claim is made in this preview. [VERIFY]"),
        faq("Can you work with our existing Microsoft partner?","Yes, if roles and decision rights are defined in the programme plan."),
        faq("What should replace the badge wall?","The assurance table on the homepage, with source notes.")
      ],
      offer:{title:"Need a verified credential pack?",copy:"We can turn the assurance table into a downloadable due-diligence sheet.",cta:"Meet the delivery team"}
    },
    "/insights/why-d365-programmes-stall-in-month-four": {
      parent:"/insights", built:true, title:"Why D365 programmes stall in month four",
      dek:"A working paper on the decisions that should be signed before the blueprint meets the chart of accounts.",
      heroNote:"Full article text is stored in ARTICLES in this file.",
      capabilities:[
        cap("The failure window","Month four is where process assumptions meet real data."),
        cap("Decision debt","Unowned fit-gaps become change requests."),
        cap("Data rehearsal","Master data issues surface too late."),
        cap("Adoption","Training without exception screens fails."),
        cap("Recovery","A short decision audit is cheaper than a replan.")
      ],
      faqs:[
        faq("Is month four a fixed rule?","No. It is a useful warning point from the source brief."),
        faq("What should be signed earlier?","Chart of accounts, integration ownership, localisation scope and cutover criteria."),
        faq("Who owns the decision log?","A business sponsor, supported by the programme manager."),
        faq("Can a late project recover?","Often yes, after an evidence-based recovery audit."),
        faq("Is this article legal advice?","No. It is an implementation field note.")
      ],
      offer:{title:"Want the decision-list worksheet?",copy:"Add a downloadable version after the article is approved.",cta:"Get the next field note"}
    },
    "/insights/uae-e-invoicing-what-changes": {
      parent:"/insights", built:true, title:"UAE e-invoicing: what changes for finance teams",
      dek:"Five controls to test before the first invoice leaves D365. Regulatory detail must be checked before publication.",
      heroNote:"Full article text is stored in ARTICLES in this file. [VERIFY regulatory references]",
      capabilities:[
        cap("Identity fields","Buyer, supplier and tax identifiers."),
        cap("Invoice structure","Mandatory fields and line-level validation."),
        cap("Archive","Retention, retrieval and immutability."),
        cap("Integration","ERP, portal, partner andaccounthandoffs."),
        cap("Audit trail","Status, timestamp and rejection handling.")
      ],
      faqs:[
        faq("Is this legal advice?","No. Confirm current rules with your tax and legal advisers."),
        faq("Does D365 handle this natively?","Coverage depends on version, localisation and configuration. [VERIFY]"),
        faq("What should finance test first?","Invoice identity fields and rejection handling."),
        faq("Do we need an external platform?","That depends on the current mandate and your architecture. [VERIFY]"),
        faq("Can we keep PDF invoices?","Only if the current rules allow it. [VERIFY]")
      ],
      offer:{title:"Need a control checklist for your finance team?",copy:"We can turn this article into a one-page review sheet.",cta:"Get the next field note"}
    },
    "/careers/fo-technical-consultant": {
      parent:"/careers", built:true, title:"F&O Technical Consultant",
      dek:"Build extensions, integrations and release quality for multi-entity D365 Finance & Operations programmes.",
      heroNote:"Role template based on the source brief. HR must confirm vacancy, location and compensation. [VERIFY]",
      capabilities:[
        cap("Extensions","X++, extension framework and upgrade-safe design."),
        cap("Data","Data entities, migration packages and reconciliation."),
        cap("Integration","APIs, Azure services and error handling."),
        cap("Release","Build pipelines, environment strategy and regression checks."),
        cap("Collaboration","Work directly with functional consultants and client IT.")
      ],
      faqs:[
        faq("Is the role open?","Confirm with HR before publishing. [VERIFY]"),
        faq("Where is it based?","Bangalore or Middle East delivery, pending HR confirmation. [VERIFY]"),
        faq("Is certification required?","HR must confirm. [VERIFY]"),
        faq("What should I include in my application?","One technical problem you fixed and the decision behind it."),
        faq("Is there travel?","Travel expectations must be confirmed by HR. [VERIFY]")
      ],
      offer:{title:"Send a CV with one problem you fixed.",copy:"Use hr@aplicatech.com. Do not send personal identity documents.",cta:"View open roles"}
    },
    "/careers/fo-functional-consultant": {
      parent:"/careers", built:true, title:"F&O Functional Consultant",
      dek:"Design finance and operations processes that survive UAT, audit and the first month-end close.",
      heroNote:"Role template based on the source brief. HR must confirm vacancy, location and compensation. [VERIFY]",
      capabilities:[
        cap("Finance design","Chart of accounts, dimensions, close and consolidation."),
        cap("Operations design","Procurement, inventory and project accounting."),
        cap("Fit-gap workshops","Turn business discussion into a signed decision log."),
        cap("UAT","Design real scenarios and exception paths."),
        cap("Training","Role-based material for finance and operations teams.")
      ],
      faqs:[
        faq("Is the role open?","Confirm with HR before publishing. [VERIFY]"),
        faq("What modules matter most?","Finance, procurement, project accounting and supply chain."),
        faq("Is certification required?","HR must confirm. [VERIFY]"),
        faq("What is the interview task?","A short fit-gap conversation, not a memorisation test. [VERIFY]"),
        faq("Where is it based?","Bangalore or Middle East delivery, pending HR confirmation. [VERIFY]")
      ],
      offer:{title:"Send a CV with one process you redesigned.",copy:"Use hr@aplicatech.com. Tell us what you removed, not just what you configured.",cta:"View open roles"}
    },
    "/contact/audit": {
      parent:"/contact", built:true, title:"Book a 30-min systems audit",
      dek:"Bring one broken process. Leave with a written problem statement and the next decision to make.",
      heroNote:"This static preview form does not send data until FORM_ENDPOINT is connected. [VERIFY]",
      capabilities:[
        cap("Before the call","Send the current process map, if one exists."),
        cap("During the call","Walk one transaction from request to ledger."),
        cap("After the call","Receive a short written problem statement."),
        cap("Next step","A scoped audit proposal, not a product demonstration."),
        cap("Data safety","Do not send passwords or unredacted financial records.")
      ],
      faqs:[
        faq("Is the call free?","Commercial terms to be confirmed by sales. [VERIFY]"),
        faq("What should I bring?","One process, one system owner and one recent exception."),
        faq("Will you show a demo?","Not on the first call. The process comes first."),
        faq("What happens to my data?","This preview stores nothing. CRM integration needs a privacy notice. [VERIFY]"),
        faq("Can we use Teams or Google Meet?","A scheduling link can be added after launch. [VERIFY]")
      ],
      offer:{title:"No demo until we understand the problem.",copy:"Use the form on this page or email sales@aplicatech.com.",cta:"Book a 30-min systems audit"},
      form:true
    },
    "/contact/support": {
      parent:"/contact", built:true, title:"Existing client support",
      dek:"A dedicated route for AMC clients. Contract-specific SLA details must be inserted before launch.",
      heroNote:"No chatbot auto-opens on this site. Support contact details need confirmation. [VERIFY]",
      capabilities:[
        cap("Incident intake","Ticket queue, severity and business impact."),
        cap("Month-end cover","Named support during close and year-end. [VERIFY]"),
        cap("Release checks","Regression testing and environment readiness."),
        cap("Escalation","Named route from consultant to delivery lead."),
        cap("Improvement list","A 30-day list after go-live hypercare.")
      ],
      faqs:[
        faq("What is the support email?","Insert the verified AMC mailbox here. [VERIFY]"),
        faq("What is the SLA?","Insert the signed contract schedule. [VERIFY]"),
        faq("Do you support outside business hours?","Coverage windows must be confirmed. [VERIFY]"),
        faq("Can we change severity after logging?","Yes, if business impact changes. Define the rule in the SLA."),
        faq("Where do we see status?","Connect the real ticketing system before launch. [VERIFY]")
      ],
      offer:{title:"Need a support route that finance can actually use?",copy:"We will map severity to business cycles, not just incident counts.",cta:"Contact support"},
      form:true
    }
  };

  const CASES = {
    "seven-tides":{
      slug:"seven-tides", client:"Seven Tides", sector:"Real Estate", region:"Dubai, UAE", timeline:"5-year partnership [VERIFY]", team:"4–7 consultants [VERIFY]", stack:"D365 F&O · Power BI",
      title:"A five-year D365 F&O partnership started with a lease register nobody trusted.",
      dek:"Property data lived in separate asset, lease and finance files. Month-end needed a manual bridge only two people understood.",
      situation:"The group managed unit inventory, lease contracts and finance postings in separate files. Each entity used a slightly different identifier, so the board pack needed a manual bridge that delayed close and hid disputed balances.",
      approach:[
        "<strong>Phase 01 — Master data.</strong> Rebuild unit, contract and customer identifiers before configuration. Agree one ownership rule for each field.",
        "<strong>Phase 02 — Event chain.</strong> Connect lease creation, renewal, billing and handover events to finance dimensions.",
        "<strong>Phase 03 — Reporting.</strong> Build role-based dashboards for asset and finance teams, then rehearse the close with real scenarios."
      ],
      architecture:[
        {code:"SOURCE",name:"Property system"},{code:"MASTER",name:"Unit & contract master"},{code:"D365",name:"Finance & Operations"},{code:"POWER BI",name:"Board reporting"},{code:"AUDIT",name:"Close reconciliation"}
      ],
      results:[
        {value:"4",label:"entities consolidated [VERIFY]",method:"Count to confirm against legal entity list. [VERIFY]"},
        {value:"5 yrs",label:"partnership [VERIFY]",method:"Source: client-speak page. Confirm dates. [VERIFY]"},
        {value:"1",label:"lease ledger [VERIFY]",method:"Target design, not a measured outcome. [VERIFY]"}
      ],
      quote:"“The team understood our property business before they opened the configuration.”",
      attribution:"Mohammed Shariff · ERP Project Manager, Seven Tides · [SOURCE: CLIENT-SPEAK PAGE · PARAPHRASED]",
      reflection:"We would put exception ownership for cancelled and transferred contracts in the first workshop. Those cases caused more delay than the core posting design.",
      related:["albaddad-capital","awj-holding"]
    },
    "awj-holding":{
      slug:"awj-holding", client:"AWJ Holding", sector:"Multi-entity Operations", region:"UAE", timeline:"3-year partnership [VERIFY]", team:"5–8 consultants [VERIFY]", stack:"Dynamics 365 · Azure · Power BI",
      title:"A holding group needed one close calendar, not another status meeting.",
      dek:"Entity-level finance teams worked hard, but consolidation still depended on spreadsheets and a weekly call.",
      situation:"Each business unit closed on its own timeline. Intercompany balances, cost allocations and management reporting arrived late, so the group finance team reconciled the same issues every month.",
      approach:[
        "<strong>Phase 01 — Close map.</strong> Document each entity's close tasks, dependencies and late-arriving entries.",
        "<strong>Phase 02 — Shared model.</strong> Standardise dimensions, intercompany rules and approval paths in D365.",
        "<strong>Phase 03 — Board layer.</strong> Publish consolidation and cash reporting through a governed Power BI model."
      ],
      architecture:[
        {code:"ENTITY A",name:"Business unit ledger"},{code:"ENTITY B",name:"Business unit ledger"},{code:"D365",name:"Group finance model"},{code:"AZURE",name:"Integration layer"},{code:"BI",name:"Board pack"}
      ],
      results:[
        {value:"3 yrs",label:"partnership [VERIFY]",method:"Source: brief case suggestion. Confirm dates. [VERIFY]"},
        {value:"1",label:"close calendar [VERIFY]",method:"Target design, not a measured outcome. [VERIFY]"},
        {value:"↓ 2 days",label:"consolidation effort [VERIFY]",method:"Proposed placeholder. Attach time study. [VERIFY]"}
      ],
      quote:"“The value was not a demo. It was a team that kept the programme moving.”",
      attribution:"Mohammad Asrawi · AWJ Holding · [SOURCE: CLIENT-SPEAK PAGE · PARAPHRASED]",
      reflection:"We would ask for entity-level close owners in week one. A shared calendar is an ownership decision before it is a system setting.",
      related:["seven-tides","lals-group"]
    },
    "albaddad-capital":{
      slug:"albaddad-capital", client:"Albaddad Capital", sector:"Rental & Lease", region:"GCC", timeline:"90–140 days [VERIFY]", team:"4–7 consultants [VERIFY]", stack:"D365 F&O · Power Platform",
      title:"Rental stopped being a spreadsheet with a D365 login.",
      dek:"Contract creation, asset availability and billing each had a different source of truth. Returns arrived after the invoice.",
      situation:"Operations tracked rental assets in one file while finance billed from another. Return exceptions were handled in email, so asset status and invoice accuracy drifted apart during busy weeks.",
      approach:[
        "<strong>Phase 01 — Event map.</strong> Trace contract, asset, return and invoice events with the operations team.",
        "<strong>Phase 02 — Standard build.</strong> Configure rental billing, asset status and rate cards in D365 F&O.",
        "<strong>Phase 03 — Exceptions.</strong> Add screens for damaged, late and incomplete returns with clear ownership."
      ],
      architecture:[
        {code:"CONTRACT",name:"Rental agreement"},{code:"ASSET",name:"Availability status"},{code:"D365",name:"Billing & ledger"},{code:"RETURN",name:"Exception workflow"},{code:"POWER",name:"Operations dashboard"}
      ],
      results:[
        {value:"↓ 40%",label:"manual reconciliation [VERIFY]",method:"Proposed benchmark. Attach before/after time study. [VERIFY]"},
        {value:"3",label:"handoffs removed [VERIFY]",method:"Draft process count. Confirm with client. [VERIFY]"},
        {value:"1 day",label:"return-to-billing target [VERIFY]",method:"Target, not measured result. [VERIFY]"}
      ],
      quote:"“The process is clearer, the effort is lower and the numbers agree.”",
      attribution:"Vijender Kumar · ERP Project Manager, Albaddad · [SOURCE: CLIENT-SPEAK PAGE · PARAPHRASED]",
      reflection:"Exception ownership should have been signed in week one. The system design was easier than the business rule for a damaged return.",
      related:["seven-tides","lals-group"]
    },
    "iihs":{
      slug:"iihs", client:"IIHS", sector:"Education / Nonprofit", region:"Bangalore, India", timeline:"RFP-to-deployment [VERIFY]", team:"4–6 consultants [VERIFY]", stack:"D365 F&O · Power BI",
      title:"An RFP became a chart of accounts the team could defend.",
      dek:"Grant, fee and payroll dimensions were tangled in spreadsheets before the ERP programme started.",
      situation:"The institution needed to report restricted funds, fee income and payroll costs separately. The existing chart of accounts could not answer basic questions without manual reclassification.",
      approach:[
        "<strong>Phase 01 — Requirements.</strong> Turn the RFP into decision questions for finance, HR and programme owners.",
        "<strong>Phase 02 — Dimensions.</strong> Separate grant, cost centre, project and payroll dimensions before configuration.",
        "<strong>Phase 03 — Deployment.</strong> Build reports and train teams against real month-end scenarios."
      ],
      architecture:[
        {code:"RFP",name:"Requirements"},{code:"COA",name:"Dimension model"},{code:"D365",name:"Finance & payroll"},{code:"BI",name:"Grant reporting"},{code:"AUDIT",name:"Evidence pack"}
      ],
      results:[
        {value:"1",label:"dimension model [VERIFY]",method:"Target design. Confirm with client. [VERIFY]"},
        {value:"3",label:"reporting views [VERIFY]",method:"Draft count. Verify against report inventory. [VERIFY]"},
        {value:"0",label:"approved metrics in preview [VERIFY]",method:"Do not publish outcome claims without source data. [VERIFY]"}
      ],
      quote:"“They asked about our grant structure before they asked about the licence count.”",
      attribution:"Amit Chandra · CTO, IIHS · [SOURCE: CLIENT-SPEAK PAGE · PARAPHRASED]",
      reflection:"We would bring the external auditor into the dimension workshop earlier. Their later questions were predictable and expensive to answer after configuration.",
      related:["seven-tides","awj-holding"]
    },
    "magrudys":{
      slug:"magrudys", client:"Magrudy's", sector:"Retail & Distribution", region:"UAE", timeline:"90–140 days [VERIFY]", team:"4–7 consultants [VERIFY]", stack:"D365 F&O · ECOMM 365 · Power BI",
      title:"Store, warehouse and online stock finally agreed at close.",
      dek:"Channel stock updates arrived late, so finance reconciled inventory after the trading day had already moved on.",
      situation:"Retail, e-commerce and warehouse teams each had a different view of available stock. Promotions and returns made the mismatch worse at month-end.",
      approach:[
        "<strong>Phase 01 — Stock map.</strong> Define the system of record for each movement and status.",
        "<strong>Phase 02 — Channel integration.</strong> Connect storefront, warehouse and ERP posting profiles.",
        "<strong>Phase 03 — Reconciliation.</strong> Build daily exception views for finance and operations."
      ],
      architecture:[
        {code:"STORE",name:"POS events"},{code:"WEB",name:"E-commerce orders"},{code:"D365",name:"Inventory & finance"},{code:"WMS",name:"Warehouse moves"},{code:"BI",name:"Stock reconciliation"}
      ],
      results:[
        {value:"1 day",label:"stock reconciliation target [VERIFY]",method:"Target, not measured result. [VERIFY]"},
        {value:"3",label:"channels mapped [VERIFY]",method:"Draft process count. Confirm with client. [VERIFY]"},
        {value:"↓ 22%",label:"inventory carrying cost [VERIFY]",method:"Proposed benchmark. Attach client data. [VERIFY]"}
      ],
      quote:"“The useful part was seeing where each stock number came from.”",
      attribution:"Attribution to be supplied · [DRAFT — CONFIRM WITH CLIENT]",
      reflection:"We would define return status codes before integration. A late return is an accounting event, not only a warehouse event.",
      related:["lals-group","albaddad-capital"]
    },
    "lals-group":{
      slug:"lals-group", client:"Lals Group", sector:"Trade & Distribution", region:"UAE", timeline:"90–140 days [VERIFY]", team:"5–8 consultants [VERIFY]", stack:"D365 F&O · Azure · Power BI",
      title:"The pricing book stopped living in eleven spreadsheets.",
      dek:"Rebates, landed cost and customer-specific pricing were reconciled after billing rather than before it.",
      situation:"Sales teams maintained separate pricing files for key accounts. Finance discovered rebate and landed cost differences after invoices had already been posted.",
      approach:[
        "<strong>Phase 01 — Pricing inventory.</strong> Consolidate price books, rebate rules and landed cost components.",
        "<strong>Phase 02 — Control design.</strong> Move validation before invoice posting and define approval paths.",
        "<strong>Phase 03 — Margin reporting.</strong>"
      ]
    }
  };

  /* Complete the Lals draft and normalise case data. */
  CASES["lals-group"].approach[2] = "<strong>Phase 03 — Margin reporting.</strong> Build customer, item and shipment margin views in Power BI with a single source table.";
  CASES["lals-group"].architecture = [
    {code:"PRICE",name:"Trade agreements"},{code:"COST",name:"Landed cost model"},{code:"D365",name:"Order-to-cash"},{code:"AZURE",name:"Integration layer"},{code:"BI",name:"Margin reporting"}
  ];
  CASES["lals-group"].results = [
    {value:"11",label:"pricing books consolidated [VERIFY]",method:"Draft example. Confirm with client. [VERIFY]"},
    {value:"1",label:"margin model [VERIFY]",method:"Target design, not measured result. [VERIFY]"},
    {value:"↓ 18%",label:"faster month-end close [VERIFY]",method:"Proposed benchmark. Attach client data. [VERIFY]"}
  ];
  CASES["lals-group"].quote = "“The margin view is only useful when sales and finance trust the same number.”";
  CASES["lals-group"].attribution = "Attribution to be supplied · [DRAFT — CONFIRM WITH CLIENT]";
  CASES["lals-group"].reflection = "We would put a commercial owner beside the data team during pricing cleanup. Most exceptions needed a policy decision, not a technical rule.";
  CASES["lals-group"].related = ["magrudys","awj-holding"];

  const ARTICLES = {
    "why-d365-programmes-stall-in-month-four":{
      slug:"why-d365-programmes-stall-in-month-four", title:"Why D365 programmes stall in month four", category:"Delivery", readTime:"7 min read",
      dek:"The blueprint meets the chart of accounts. Here is the decision list that should have been signed earlier.",
      intro:"Most ERP programmes do not fail at the keyboard. They fail when an unresolved business decision becomes a configuration assumption, and nobody notices until real data arrives.",
      sections:[
        {
          id:"the-window", title:"Month four is a symptom, not a date",
          paragraphs:[
            "The first weeks of a Dynamics 365 programme feel productive. Workshops run, screens are configured and the demonstration environment looks convincing. The hard questions are still polite: which entity owns a customer, which dimension carries a grant, which approval can be skipped when the warehouse is closed.",
            "Month four is when those questions come back as data. Master records conflict. Opening balances do not reconcile. A user tries a return with a damaged asset and the designed process stops. The programme has not suddenly become technical. It has become honest."
          ],
          pullquote:"A late data issue is usually an early decision that nobody owned."
        },
        {
          id:"decision-debt", title:"Decision debt looks like progress",
          paragraphs:[
            "A fit-gap register can hold dozens of open items without affecting the demo. That makes it a comfortable place to hide ambiguity. Every open item is a small loan against the cutover date, and the interest is paid during UAT.",
            "We ask for a business owner, a decision date and a consequence for every gap. If a decision cannot be named, it is not ready for configuration. This is less dramatic than a replan and much cheaper than discovering the gap after the first reconciliation."
          ]
        },
        {
          id:"data-rehearsal", title:"Rehearse the data before the design hardens",
          paragraphs:[
            "Data migration is often scheduled after configuration. That sequence protects the demonstration, not the programme. A rehearsal load in the first third of the build exposes duplicate identifiers, broken dimensions and historical balances that cannot be mapped.",
            "The goal is not a perfect first load. The goal is to learn which data rules need a business decision while there is still time to change the model. We would rather reconcile three messy loads than one polished load that arrives too late."
          ]
        },
        {
          id:"adoption", title:"Train the exception, not the happy path",
          paragraphs:[
            "Users rarely need training for the straightforward sale or receipt. They need to know what happens when the customer is on credit hold, the item is substituted, the project is over budget or the return is incomplete.",
            "Role-based training should start from the exception screens. If the system cannot show the user the next decision, the process is still in someone's inbox. Adoption is a design result before it is a communication problem."
          ]
        },
        {
          id:"recovery", title:"What to do if you are already in month four",
          paragraphs:[
            "Stop adding scope for two weeks. Build a short evidence pack: the decision log, the last migration rehearsal, the unresolved UAT scenarios and the release inventory. Separate faults in the configuration from decisions that were never made.",
            "Then write a new cutover sequence with names beside every gate. The programme may still need a reset, but it will be based on evidence. That is the difference between a recovery plan and another status meeting."
          ]
        }
      ]
    },
    "uae-e-invoicing-what-changes":{
      slug:"uae-e-invoicing-what-changes", title:"UAE e-invoicing: what changes for finance teams", category:"Finance", readTime:"6 min read",
      dek:"Five controls to test before the first invoice leaves D365. Regulatory detail must be checked before publication.",
      intro:"E-invoicing is not a new PDF layout. It changes how invoice data is identified, validated, transmitted, stored and retrieved. Finance teams should test the control chain before they test the user interface.",
      sections:[
        {
          id:"identity", title:"Control 01 — Identity fields",
          paragraphs:[
            "Start with the buyer, supplier and tax identifiers that travel with the invoice. A field that is optional in a sales order can become mandatory in a regulated invoice. In D365, that means checking customer, address, registration and tax profile data, not just the posting form.",
            "Create a small set of deliberately incomplete invoices and watch where validation fails. The useful question is not whether the ERP can generate a file. It is whether the business can correct the source record without emailing a spreadsheet."
          ],
          pullquote:"A validation error is useful only when the user knows which master record to fix."
        },
        {
          id:"structure", title:"Control 02 — Invoice structure",
          paragraphs:[
            "Line-level data needs consistent units, tax treatment, discounts, currency and references. Credit notes and advance payments create their own edge cases. Map each required field to a source, an owner and a validation rule.",
            "Do not assume the standard report layout covers every requirement. Configuration, localisation and integration can each change the output. Keep a field-level matrix and review it whenever the invoice schema changes."
          ]
        },
        {
          id:"integration", title:"Control 03 — Integration and rejection handling",
          paragraphs:[
            "Invoices often move through an ERP, a platform, a partner connection and a customer portal. Each hop needs a status, a timestamp and an error owner. Without that, a rejected invoice becomes a phone call.",
            "Design the failure path with the same care as the success path. Who sees the rejection, what can be edited, what must be cancelled and reissued, and how does the ledger reflect the final state?"
          ]
        },
        {
          id:"archive", title:"Control 04 — Archive and evidence",
          paragraphs:[
            "Finance needs to retrieve the exact invoice, the validation response and the transmission history. That is an evidence problem, not a storage problem. Define the retention rule, the retrieval path and the responsible team before go-live.",
            "Test retrieval with an auditor's question: show the invoice, the source transaction, the status history and the person who resolved the exception. If that takes three systems and two spreadsheets, the control is not ready."
          ]
        },
        {
          id:"regulation", title:"Control 05 — Current rules and sign-off",
          paragraphs:[
            "Regulatory scope, timelines and technical requirements can change. This article deliberately avoids naming dates or mandates. Your tax adviser and legal team should confirm the current rules for each entity before any statement is published or any configuration is frozen.",
            "The practical output is a one-page control matrix: required fields, source system, validation point, error owner and evidence location. It is less exciting than a compliance headline and considerably more useful during an audit."
          ]
        }
      ]
    },
    "ax-2012-to-d365-fo-migration-sequence":{
      slug:"ax-2012-to-d365-fo-migration-sequence", title:"AX 2012 to D365 F&O: the migration sequence that actually works", category:"Modernisation", readTime:"8 min read",
      dek:"Code, data and people move in a different order than the project plan suggests.",
      intro:"An AX migration is not a lift-and-shift. The customisation inventory, the data model and the users' decision rights have to move in a deliberate order. Get that order wrong and the new system inherits the old system's exceptions.",
      sections:[
        {
          id:"inventory", title:"Start with an honest inventory",
          paragraphs:[
            "Before anyone talks about target architecture, list the modifications, integrations, reports, batch jobs and data sources that keep AX running. Include the unglamorous ones: the nightly file, the pricing spreadsheet and the access database that somebody still opens every Friday.",
            "Classify each item as keep, replace or retire. Keep means there is a business rule that standard D365 cannot cover. Replace means a standard feature or extension can do the job better. Retire means nobody can defend the work it performs."
          ],
          pullquote:"The migration begins when someone is allowed to say, 'we no longer need this'."
        },
        {
          id:"data", title:"Clean the data before you move the code",
          paragraphs:[
            "Teams often start with code because it feels technical and measurable. Data is harder. Customer duplicates, item dimensions, opening balances and historical transactions do not fit neatly into a sprint demo.",
            "Run rehearsal loads into a target-like environment early. Each load should answer a finance question: can we reconcile debtors, inventory and the trial balance? Code decisions are easier when the data model has already been tested."
          ]
        },
        {
          id:"extensions", title:"Move behaviour, not syntax",
          paragraphs:[
            "X++ customisations should not be translated line by line into extensions. Ask what business event the code controlled. The answer is often a posting rule, a validation or an approval that belongs in configuration or workflow.",
            "What remains as code should be small, testable and owned. Build a regression pack from real AX scenarios. A green compile is not evidence that the business still works."
          ]
        },
        {
          id:"people", title:"Change the decision rights with the system",
          paragraphs:[
            "AX often accumulates local workarounds because the official process is too slow. If D365 reproduces the screens but keeps the same informal approvals, the new system will grow the same shadow process.",
            "Name the owner of each exception before UAT. Give them a screen that shows the decision, the consequence and the next step. Training then becomes a conversation about authority, not a tour of menu items."
          ]
        },
        {
          id:"cutover", title:"Cutover is a reconciliation exercise",
          paragraphs:[
            "The final weekend is not the time to discover that the opening balance rule was ambiguous. Rehearse cutover as a sequence of reconciliations: master data, open transactions, balances, reports and user access.",
            "Keep hypercare beside the finance and operations teams. The first month-end is the real acceptance test. A migration is finished when the business can close, explain and audit the numbers without the project team in the room."
          ]
        }
      ]
    }
  };

  const ROLES = {
    "fo-technical-consultant":{
      slug:"fo-technical-consultant", title:"F&O Technical Consultant", team:"D365 Finance & Operations", location:"Bangalore / Middle East delivery [VERIFY]", type:"Full-time [VERIFY]",
      summary:"Build upgrade-safe extensions, integrations and release pipelines for multi-entity D365 F&O programmes.",
      responsibilities:[
        "Design X++ extensions and data entities against a signed fit-gap decision.",
        "Build integrations with Azure services, partner systems and reporting models.",
        "Own build quality, regression packs and environment readiness.",
        "Work directly with functional consultants and client IT during hypercare."
      ],
      requirements:[
        "Hands-on D365 F&O or AX 2012 development experience.",
        "Comfort with data migration, error handling and release management.",
        "Ability to explain a technical decision to a finance owner.",
        "Certification requirement to be confirmed by HR. [VERIFY]"
      ],
      apply:"Send a CV and one technical problem you fixed to hr@aplicatech.com. Vacancy status to be confirmed. [VERIFY]"
    },
    "fo-functional-consultant":{
      slug:"fo-functional-consultant", title:"F&O Functional Consultant", team:"D365 Finance & Operations", location:"Bangalore / Middle East delivery [VERIFY]", type:"Full-time [VERIFY]",
      summary:"Design finance and operations processes that survive UAT, audit and the first month-end close.",
      responsibilities:[
        "Lead fit-gap workshops and keep a decision log with named owners.",
        "Design chart of accounts, dimensions, procurement and project accounting.",
        "Write real UAT scenarios, including late and exception transactions.",
        "Train role-based users and support the first close after go-live."
      ],
      requirements:[
        "Strong finance process knowledge across close, AP, AR and consolidation.",
        "D365 F&O configuration experience.",
        "Clear written communication and comfort with difficult decisions.",
        "Certification requirement to be confirmed by HR. [VERIFY]"
      ],
      apply:"Send a CV and one process you redesigned to hr@aplicatech.com. Vacancy status to be confirmed. [VERIFY]"
    },
    "fo-scm-consultant":{
      slug:"fo-scm-consultant", title:"F&O SCM Consultant", team:"Supply Chain Management", location:"Bangalore / Middle East delivery [VERIFY]", type:"Full-time [VERIFY]",
      summary:"Own warehouse, trade, planning and inventory reconciliation work in D365 F&O programmes.",
      responsibilities:["Map physical movement to system transactions.","Design warehouse, transfer, returns and cycle-count processes.","Reconcile inventory to finance before cutover.","Build role-based operational reporting."],
      requirements:["D365 F&O SCM experience.","Comfort with master data and exception flows.","Ability to work with warehouse teams on site.","Certification requirement to be confirmed by HR. [VERIFY]"],
      apply:"Send a CV and one inventory reconciliation problem you solved to hr@aplicatech.com. [VERIFY]"
    },
    "nav-bc-technical-consultant":{
      slug:"nav-bc-technical-consultant", title:"NAV/BC Technical Consultant", team:"Dynamics 365 Business Central", location:"Bangalore / Middle East delivery [VERIFY]", type:"Full-time [VERIFY]",
      summary:"Move NAV customisations into a clean AL extension model and connect BC to Power Platform.",
      responsibilities:["Inventory legacy NAV customisations.","Build AL extensions and API integrations.","Design upgrade-safe reporting and data migration.","Support release checks and regression testing."],
      requirements:["NAV or Business Central development experience.","Knowledge of AL, APIs and extension patterns.","Ability to say no to unnecessary customisation.","Certification requirement to be confirmed by HR. [VERIFY]"],
      apply:"Send a CV and one NAV customisation you retired to hr@aplicatech.com. [VERIFY]"
    },
    "fo-retail-consultant":{
      slug:"fo-retail-consultant", title:"F&O Retail Consultant", team:"Retail & Commerce", location:"Bangalore / Middle East delivery [VERIFY]", type:"Full-time [VERIFY]",
      summary:"Connect store, POS, pricing, loyalty and channel integration work in D365 F&O.",
      responsibilities:["Map store and channel transactions.","Design pricing, promotion and loyalty rules.","Test POS, returns and stock reconciliation.","Work with finance on daily close exceptions."],
      requirements:["D365 retail or commerce implementation experience.","Understanding of POS and inventory movement.","Comfort with integration failure paths.","Certification requirement to be confirmed by HR. [VERIFY]"],
      apply:"Send a CV and one retail exception you designed for to hr@aplicatech.com. [VERIFY]"
    },
    "fo-crm-techno-functional":{
      slug:"fo-crm-techno-functional", title:"F&O CRM Techno-Functional Consultant", team:"Customer Engagement", location:"Bangalore / Middle East delivery [VERIFY]", type:"Full-time [VERIFY]",
      summary:"Bridge Dataverse, model-driven apps, integration and real field operations.",
      responsibilities:["Lead CRM discovery with sales and service teams.","Configure model-driven apps, workflows and security roles.","Design integration to D365 F&O and Power BI.","Test field scenarios with real exception data."],
      requirements:["Dynamics 365 Customer Engagement experience.","Technical comfort with Dataverse and integrations.","Ability to write a decision log, not just configuration notes.","Certification requirement to be confirmed by HR. [VERIFY]"],
      apply:"Send a CV and one CRM integration problem you solved to hr@aplicatech.com. [VERIFY]"
    }
  };

  const LEGAL = {
    "/privacy":{
      title:"Privacy notice", eyebrow:"LEGAL / PRIVACY",
      intro:"This static preview collects no analytics data and sends no form data until a CRM endpoint is connected. Replace this draft with a reviewed privacy notice before launch.",
      sections:[
        ["What the preview stores","The language choice and a short form rate-limit timestamp can be stored in local browser storage. No cookies and no third-party trackers are loaded."],
        ["What a live form would collect","Name, work email and the problem statement you type. A hidden honeypot field is used to reduce automated submissions."],
        ["Why a live form would collect it","To respond to your audit request and route it to the correct team. A lawful basis, retention period and data processor list must be added by counsel. [VERIFY]"],
        ["Your rights","Add the applicable rights, contact route and regulator details after legal review. [VERIFY]"],
        ["Contact","sales@aplicatech.com for sales enquiries. A data protection contact must be named before launch. [VERIFY]"]
      ]
    },
    "/terms":{
      title:"Terms of use", eyebrow:"LEGAL / TERMS",
      intro:"This draft exists so the static preview has a real terms route. It is not legal advice and must be reviewed before publication.",
      sections:[
        ["Information on this site","All case studies, metrics and planning ranges marked [VERIFY] are draft content. Do not rely on them as a contractual representation."],
        ["No service commitment","Nothing on this preview creates an implementation commitment, SLA or support obligation. Signed agreements govern the work."],
        ["Intellectual property","The design, copy and authored diagrams in this preview need a final ownership and licence statement. [VERIFY]"],
        ["Third-party names","Microsoft, Dynamics 365, Azure and Power Platform names are used to describe the services. Client names are text-set wordmarks and require publication approval. [VERIFY]"],
        ["Contact","Questions about these draft terms can go to sales@aplicatech.com. Legal contact to be added. [VERIFY]"]
      ]
    }
  };

  return { I18N, METRICS, TESTIMONIALS, HUBS, DETAILS, CASES, ARTICLES, ROLES, LEGAL };
})();
