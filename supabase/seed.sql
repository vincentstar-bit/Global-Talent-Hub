-- SinoGlobal Enterprise — Seed Data
-- Run this AFTER running 0001_init.sql
-- Safe to re-run (uses ON CONFLICT DO NOTHING)

-- ─── Job Roles ───────────────────────────────────────────────────────────────
INSERT INTO job_roles (title, department, description, responsibilities, requirements, salary, photo_url, is_active)
VALUES
(
  'Senior Infrastructure Engineer',
  'Engineering & Technology',
  'Lead the design and implementation of large-scale infrastructure projects across Asia and Africa. You will oversee engineering teams, manage subcontractors, and ensure projects are delivered on time and within budget.',
  E'• Lead engineering design teams on infrastructure projects\n• Manage project timelines and budgets ($5M–$50M range)\n• Coordinate with international subcontractors and local partners\n• Ensure compliance with local regulations and SinoGlobal standards\n• Prepare progress reports for senior leadership',
  E'• Bachelor''s or Master''s in Civil/Structural Engineering\n• 8+ years of large-scale infrastructure experience\n• PMP certification preferred\n• Experience working in developing markets (Africa, Southeast Asia)\n• Mandarin proficiency is an advantage',
  '$95,000 – $140,000/year + housing allowance',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=200&fit=crop',
  TRUE
),
(
  'International Finance Manager',
  'Finance & Investment',
  'Manage financial operations and reporting across multiple international subsidiaries. This role involves strategic budgeting, treasury management, and financial risk analysis for SinoGlobal''s global portfolio.',
  E'• Consolidate financial statements from 10+ subsidiaries\n• Manage FX exposure and treasury operations\n• Lead annual budgeting and quarterly forecasting\n• Prepare board-level financial presentations\n• Liaise with external auditors and regulatory bodies',
  E'• CPA, CFA, or ACCA qualified\n• 7+ years in multinational finance\n• Experience with SAP or Oracle ERP\n• Strong knowledge of IFRS\n• Excellent Mandarin and English communication',
  '$85,000 – $125,000/year + performance bonus',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop',
  TRUE
),
(
  'Operations Director — West Africa',
  'Operations & Logistics',
  'Oversee all operational activities in SinoGlobal''s West Africa region (Nigeria, Ghana, Senegal, Côte d''Ivoire). Manage a team of 200+ staff and drive the region''s revenue growth and operational efficiency.',
  E'• P&L responsibility for West Africa region ($120M annual revenue)\n• Manage relationships with government bodies and local partners\n• Drive operational efficiency and quality standards\n• Lead talent acquisition and development in the region\n• Represent SinoGlobal in stakeholder meetings and industry forums',
  E'• 12+ years of senior operations experience\n• Proven P&L management at regional level\n• Experience in West Africa mandatory\n• MBA or equivalent postgraduate qualification\n• French language skills are a strong advantage',
  '$150,000 – $200,000/year + expat package',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  TRUE
),
(
  'Legal & Compliance Counsel',
  'Legal & Compliance',
  'Provide comprehensive legal support for SinoGlobal''s international contracts, joint ventures, and regulatory compliance. Advise senior management on legal risk and corporate governance matters.',
  E'• Draft and review international commercial contracts\n• Advise on M&A transactions and joint ventures\n• Ensure compliance with multi-jurisdictional regulations\n• Manage litigation and dispute resolution\n• Develop internal compliance training programs',
  E'• LLB/JD from accredited university\n• Bar admission in at least one common law jurisdiction\n• 6+ years in corporate or international commercial law\n• Cross-border transaction experience\n• Bilingual English/Mandarin strongly preferred',
  '$90,000 – $130,000/year',
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=200&fit=crop',
  TRUE
),
(
  'Senior Software Engineer (Cloud Platform)',
  'Information Technology',
  'Join the Cloud Platform team to build scalable, resilient enterprise software products used by SinoGlobal''s subsidiaries and clients across 43 countries.',
  E'• Design and build microservices for enterprise cloud platform\n• Optimize system performance and reliability (99.99% SLA)\n• Mentor junior engineers and contribute to technical roadmap\n• Collaborate with product managers and international stakeholders\n• Participate in on-call rotation for critical systems',
  E'• 6+ years of software engineering experience\n• Proficiency in TypeScript, Go, or Python\n• Experience with Kubernetes, AWS or GCP\n• Distributed systems and microservices architecture\n• Excellent problem-solving skills',
  '$100,000 – $150,000/year + equity',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&h=200&fit=crop',
  TRUE
),
(
  'Clinical Research Scientist',
  'Healthcare & Pharmaceuticals',
  'Lead clinical research initiatives within BioSino Medical, SinoGlobal''s pharmaceutical division. Design and manage Phase II/III clinical trials for novel drug candidates.',
  E'• Design and execute clinical trial protocols (Phase II/III)\n• Analyze trial data and prepare regulatory submissions\n• Collaborate with CROs and hospital partners across 3 continents\n• Ensure GCP compliance throughout all research activities\n• Present findings at international scientific conferences',
  E'• PhD in Pharmacology, Medicine, or related life science\n• 4+ years post-doctoral clinical research experience\n• Proven GCP and ICH guideline knowledge\n• Experience with FDA/EMA/NMPA regulatory submissions\n• Published research in peer-reviewed journals',
  '$80,000 – $115,000/year',
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=200&h=200&fit=crop',
  TRUE
);

-- ─── Leave Types ─────────────────────────────────────────────────────────────
INSERT INTO leave_types (name, description, max_days, amount, requires_approval, is_active)
VALUES
(
  'Annual Leave',
  'Standard paid annual leave for rest and recreation. Available to all permanent employees after completing 6 months of service.',
  21, 0, TRUE, TRUE
),
(
  'Medical / Sick Leave',
  'Paid leave due to illness or injury requiring medical attention. A valid medical certificate is required for absences exceeding 3 consecutive days.',
  30, 0, FALSE, TRUE
),
(
  'Family Emergency Leave',
  'Emergency leave for urgent family matters including hospitalization of immediate family members, death of a family member, or other family crises.',
  7, 500, TRUE, TRUE
),
(
  'Maternity / Paternity Leave',
  'Paid parental leave for the birth or legal adoption of a child. Maternity: 16 weeks. Paternity: 2 weeks.',
  112, 0, TRUE, TRUE
),
(
  'Study / Examination Leave',
  'Paid leave for approved professional development examinations directly related to the employee''s current or development role at SinoGlobal.',
  10, 200, TRUE, TRUE
),
(
  'Home Country Vacation',
  'Special paid leave for internationally-posted employees to travel to their home country. Includes a travel allowance to cover return airfare.',
  14, 2500, TRUE, TRUE
);

-- ─── Workers ─────────────────────────────────────────────────────────────────
INSERT INTO workers (
  first_name, last_name, email, phone, access_token,
  job_title, department, contract_start, contract_end, contract_deal,
  payment_status, payment_amount, payment_paid,
  assigned_country, country_entry_date, country_stay_years,
  photo_url, nationality, passport_number, status, hired_by, notes
)
VALUES
(
  'James', 'Okafor', 'j.okafor@sinoglobal.com', '+234 801 234 5678', 'SGE-JAMES-OKAFR',
  'Operations Director — West Africa', 'Operations & Logistics',
  '2022-03-01', '2025-02-28', '3-year contract with annual performance review and expat package',
  'paid', 175000.00, 175000.00,
  'Nigeria', '2022-03-05', 3,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  'Nigerian', 'A12345678', 'active', 'thompsonbaro@gmail.com',
  'Senior regional lead, exceptional performance in Q1 2024.'
),
(
  'Li', 'Wei', 'l.wei@sinoglobal.com', '+86 138 0000 1111', 'SGE-LIWEI-00001',
  'Senior Infrastructure Engineer', 'Engineering & Technology',
  '2021-07-15', '2024-07-14', '3-year contract with housing allowance and repatriation benefit',
  'paid', 120000.00, 120000.00,
  'Kenya', '2021-08-01', 3,
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=200&fit=crop',
  'Chinese', 'G87654321', 'active', 'thompsonbaro@gmail.com',
  'Led the Mombasa port expansion phase 2 project.'
),
(
  'Amara', 'Diallo', 'a.diallo@sinoglobal.com', '+221 77 456 7890', 'SGE-AMARA-DIALL',
  'International Finance Manager', 'Finance & Investment',
  '2023-01-10', '2026-01-09', '3-year contract with performance bonus structure',
  'pending', 105000.00, 52500.00,
  'Senegal', '2023-01-15', 3,
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop',
  'Senegalese', 'SN9876543', 'active', 'thompsonbaro@gmail.com',
  'Managing treasury for West Africa francophone subsidiaries.'
),
(
  'Sofia', 'Martínez', 's.martinez@sinoglobal.com', '+34 612 345 678', 'SGE-SOFIA-MARTZ',
  'Legal & Compliance Counsel', 'Legal & Compliance',
  '2020-09-01', '2024-08-31', '4-year contract with annual review; remote-eligible',
  'paid', 115000.00, 115000.00,
  'Spain', '2020-09-01', 4,
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=200&fit=crop',
  'Spanish', 'XDA123456', 'active', 'thompsonbaro@gmail.com',
  'Specializes in EU regulatory compliance and cross-border M&A.'
),
(
  'David', 'Mensah', 'd.mensah@sinoglobal.com', '+233 244 789 012', 'SGE-DAVID-MENSH',
  'Senior Software Engineer (Cloud Platform)', 'Information Technology',
  '2023-06-01', '2026-05-31', '3-year contract with equity participation and remote-work allowance',
  'paid', 130000.00, 130000.00,
  'Ghana', '2023-06-05', 3,
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&h=200&fit=crop',
  'Ghanaian', 'GH5432109', 'active', 'thompsonbaro@gmail.com',
  'Core contributor to the SGE cloud infrastructure migration project.'
),
(
  'Mei', 'Chen', 'm.chen@sinoglobal.com', '+86 139 8765 4321', 'SGE-MEICH-00002',
  'Clinical Research Scientist', 'Healthcare & Pharmaceuticals',
  '2022-11-01', '2025-10-31', '3-year contract with laboratory equipment allowance',
  'overdue', 95000.00, 47500.00,
  'China', '2022-11-01', 3,
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=200&h=200&fit=crop',
  'Chinese', 'E11223344', 'active', 'thompsonbaro@gmail.com',
  'Lead researcher on Phase III malaria vaccine trial in partnership with WHO.'
)
ON CONFLICT (access_token) DO NOTHING;
