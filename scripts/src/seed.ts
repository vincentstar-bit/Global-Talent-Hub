import { db, jobRolesTable, leaveTypesTable } from "@workspace/db";

async function seed() {
  // Seed job roles
  const jobs = [
    {
      title: "Senior Infrastructure Engineer",
      department: "Engineering & Technology",
      description: "Lead the design and implementation of large-scale infrastructure projects across Asia and Africa. You will oversee engineering teams, manage subcontractors, and ensure projects are delivered on time and within budget.",
      responsibilities: "• Lead engineering design teams on infrastructure projects\n• Manage project timelines and budgets ($5M–$50M range)\n• Coordinate with international subcontractors and local partners\n• Ensure compliance with local regulations and SinoGlobal standards\n• Prepare progress reports for senior leadership",
      requirements: "• Bachelor's or Master's in Civil/Structural Engineering\n• 8+ years of large-scale infrastructure experience\n• PMP certification preferred\n• Experience working in developing markets (Africa, Southeast Asia)\n• Mandarin proficiency is an advantage",
      salary: "$95,000 – $140,000/year + housing allowance",
      photoUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=200&fit=crop",
      isActive: true,
    },
    {
      title: "International Finance Manager",
      department: "Finance & Investment",
      description: "Manage financial operations and reporting across multiple international subsidiaries. This role involves strategic budgeting, treasury management, and financial risk analysis for SinoGlobal's global portfolio.",
      responsibilities: "• Consolidate financial statements from 10+ subsidiaries\n• Manage FX exposure and treasury operations\n• Lead annual budgeting and quarterly forecasting\n• Prepare board-level financial presentations\n• Liaise with external auditors and regulatory bodies",
      requirements: "• CPA, CFA, or ACCA qualified\n• 7+ years in multinational finance\n• Experience with SAP or Oracle ERP\n• Strong knowledge of IFRS\n• Excellent Mandarin and English communication",
      salary: "$85,000 – $125,000/year + performance bonus",
      photoUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop",
      isActive: true,
    },
    {
      title: "Operations Director — West Africa",
      department: "Operations & Logistics",
      description: "Oversee all operational activities in SinoGlobal's West Africa region (Nigeria, Ghana, Senegal, Côte d'Ivoire). Manage a team of 200+ staff and drive the region's revenue growth and operational efficiency.",
      responsibilities: "• P&L responsibility for West Africa region ($120M annual revenue)\n• Manage relationships with government bodies and local partners\n• Drive operational efficiency and quality standards\n• Lead talent acquisition and development in the region\n• Represent SinoGlobal in stakeholder meetings and industry forums",
      requirements: "• 12+ years of senior operations experience\n• Proven P&L management at regional level\n• Experience in West Africa mandatory\n• MBA or equivalent postgraduate qualification\n• French language skills are a strong advantage",
      salary: "$150,000 – $200,000/year + expat package",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      isActive: true,
    },
    {
      title: "Legal & Compliance Counsel",
      department: "Legal & Compliance",
      description: "Provide comprehensive legal support for SinoGlobal's international contracts, joint ventures, and regulatory compliance. Advise senior management on legal risk and corporate governance matters.",
      responsibilities: "• Draft and review international commercial contracts\n• Advise on M&A transactions and joint ventures\n• Ensure compliance with multi-jurisdictional regulations\n• Manage litigation and dispute resolution\n• Develop internal compliance training programs",
      requirements: "• LLB/JD from accredited university\n• Bar admission in at least one common law jurisdiction\n• 6+ years in corporate or international commercial law\n• Cross-border transaction experience\n• Bilingual English/Mandarin strongly preferred",
      salary: "$90,000 – $130,000/year",
      photoUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=200&fit=crop",
      isActive: true,
    },
    {
      title: "Senior Software Engineer (Cloud Platform)",
      department: "Information Technology",
      description: "Join the Cloud Platform team to build scalable, resilient enterprise software products used by SinoGlobal's subsidiaries and clients across 43 countries. Work with cutting-edge cloud technologies and distributed systems.",
      responsibilities: "• Design and build microservices for enterprise cloud platform\n• Optimize system performance and reliability (99.99% SLA)\n• Mentor junior engineers and contribute to technical roadmap\n• Collaborate with product managers and international stakeholders\n• Participate in on-call rotation for critical systems",
      requirements: "• 6+ years of software engineering experience\n• Proficiency in TypeScript, Go, or Python\n• Experience with Kubernetes, AWS or GCP\n• Distributed systems and microservices architecture\n• Excellent problem-solving skills",
      salary: "$100,000 – $150,000/year + equity",
      photoUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&h=200&fit=crop",
      isActive: true,
    },
    {
      title: "Clinical Research Scientist",
      department: "Healthcare & Pharmaceuticals",
      description: "Lead clinical research initiatives within BioSino Medical, SinoGlobal's pharmaceutical division. Design and manage Phase II/III clinical trials for novel drug candidates in partnership with hospitals across China, Southeast Asia, and Africa.",
      responsibilities: "• Design and execute clinical trial protocols (Phase II/III)\n• Analyze trial data and prepare regulatory submissions\n• Collaborate with CROs and hospital partners across 3 continents\n• Ensure GCP compliance throughout all research activities\n• Present findings at international scientific conferences",
      requirements: "• PhD in Pharmacology, Medicine, or related life science\n• 4+ years post-doctoral clinical research experience\n• Proven GCP and ICH guideline knowledge\n• Experience with FDA/EMA/NMPA regulatory submissions\n• Published research in peer-reviewed journals",
      salary: "$80,000 – $115,000/year",
      photoUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=200&h=200&fit=crop",
      isActive: true,
    },
  ];

  for (const job of jobs) {
    await db.insert(jobRolesTable).values(job).onConflictDoNothing();
  }
  console.log(`Seeded ${jobs.length} job roles`);

  // Seed leave types
  const leaveTypes = [
    {
      name: "Annual Leave",
      description: "Standard paid annual leave for rest and recreation. Available to all permanent employees after completing 6 months of service.",
      maxDays: 21,
      amount: 0,
      requiresApproval: true,
      isActive: true,
    },
    {
      name: "Medical / Sick Leave",
      description: "Paid leave due to illness or injury requiring medical attention. A valid medical certificate is required for absences exceeding 3 consecutive days.",
      maxDays: 30,
      amount: 0,
      requiresApproval: false,
      isActive: true,
    },
    {
      name: "Family Emergency Leave",
      description: "Emergency leave for urgent family matters including hospitalization of immediate family members, death of a family member, or other family crises.",
      maxDays: 7,
      amount: 500,
      requiresApproval: true,
      isActive: true,
    },
    {
      name: "Maternity / Paternity Leave",
      description: "Paid parental leave for the birth or legal adoption of a child. Maternity: 16 weeks. Paternity: 2 weeks.",
      maxDays: 112,
      amount: 0,
      requiresApproval: true,
      isActive: true,
    },
    {
      name: "Study / Examination Leave",
      description: "Paid leave for approved professional development examinations directly related to the employee's current or development role at SinoGlobal.",
      maxDays: 10,
      amount: 200,
      requiresApproval: true,
      isActive: true,
    },
    {
      name: "Home Country Vacation",
      description: "Special paid leave for internationally-posted employees to travel to their home country. Includes a travel allowance to cover return airfare.",
      maxDays: 14,
      amount: 2500,
      requiresApproval: true,
      isActive: true,
    },
  ];

  for (const lt of leaveTypes) {
    await db.insert(leaveTypesTable).values(lt).onConflictDoNothing();
  }
  console.log(`Seeded ${leaveTypes.length} leave types`);

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
