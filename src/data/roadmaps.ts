import { RoadmapTrack } from '../types';

export const ROADMAP_TRACKS: RoadmapTrack[] = [
  // SUBSECTION A: STUDY IN PAKISTAN
  {
    id: 'track-engineering-ecat',
    title: 'Engineering via ECAT (UET & Punjab / Provincial Engineering)',
    subtitle: 'Step-by-step pathway for BSc Engineering in public sector colleges',
    trackType: 'pakistan',
    targetField: 'Engineering',
    summary: 'The classical provincial engineering route. ECAT accounts for 33% of aggregate, Intermediate for 50%, and Matric for 17%. Merit is competitive across mechanical, electrical, and civil.',
    honestRealityCheck: 'ECAT is notoriously time-pressured (100 questions in 100 minutes with negative marking). Because Intermediate counts for a massive 50%, a low FSc score cannot be completely redeemed even with a 90th percentile ECAT.',
    steps: [
      {
        id: 'ecat-step-1',
        stageNumber: 1,
        title: 'FSc Part-1 Consolidation & Syllabus Mapping',
        timingWindow: 'September – December (FSc 2nd Year)',
        description: 'Master core concepts in Mathematics, Physics, Chemistry / Computer Science from Punjab / Provincial textbook board.',
        actions: [
          'Audit your FSc Part-1 marks; calculate your initial academic foundation',
          'Identify key recurring ECAT topics: Calculus, Vectors, Electromagnetism, Organic Chemistry mechanisms',
          'Practice previous 5 years of past ECAT papers under strict time limits'
        ],
        watchOutTraps: [
          'Do not rely solely on textbook rote learning; ECAT tests analytical application and speed math without a calculator'
        ],
        linkedTool: {
          toolName: 'calculator',
          param: 'uet-lahore',
          buttonLabel: 'Simulate ECAT Aggregate'
        }
      },
      {
        id: 'ecat-step-2',
        stageNumber: 2,
        title: 'ECAT Registration & Token Purchase',
        timingWindow: 'January – February',
        description: 'Purchase ECAT token from designated Habib Bank Limited (HBL) branches and register online via the UET admission portal.',
        actions: [
          'Acquire entrance test token voucher and generate candidate profile',
          'Select your preferred test center and test time slot',
          'Verify your CNIC / B-Form matches your matriculation certificate exactly'
        ],
        watchOutTraps: [
          'Registration deadlines are strict; no extensions are granted once the online portal locks'
        ],
        linkedTool: {
          toolName: 'checklist',
          param: 'uet-lahore',
          buttonLabel: 'View ECAT Document Checklist'
        }
      },
      {
        id: 'ecat-step-3',
        stageNumber: 3,
        title: 'ECAT Test Day Execution',
        timingWindow: 'March – April',
        description: 'Appear for the computer-based Combined Entry Test (ECAT) at assigned UET test center.',
        actions: [
          'Bring printed Admit Card, Original CNIC/Smart B-Form, and payment receipt',
          'Time management strategy: do first pass of easy questions in 45 minutes; avoid wild guessing due to negative marking (-1 per wrong answer)'
        ],
        watchOutTraps: [
          'Do not linger on a single math puzzle; each question has equal marks'
        ]
      },
      {
        id: 'ecat-step-4',
        stageNumber: 4,
        title: 'Centralized Admission Application & Preference List',
        timingWindow: 'June – July (Post Intermediate Exams)',
        description: 'Submit your formal engineering admission preference form for UET Lahore, Taxila, and regional campuses.',
        actions: [
          'Calculate your final aggregate (33% ECAT + 50% Inter + 17% Matric)',
          'Order your engineering program preferences strategically (putting dream programs first, safe programs as backup)',
          'Choose between Subsidized (Category A) and Partially Subsidized (Category A2) based on family budget'
        ],
        watchOutTraps: [
          'Once enrolled in a lower preference, upgrading requires following the successive merit list cycles carefully'
        ],
        linkedTool: {
          toolName: 'calculator',
          param: 'uet-lahore',
          buttonLabel: 'Calculate Final Aggregate'
        }
      },
      {
        id: 'ecat-step-5',
        stageNumber: 5,
        title: 'Merit Lists, Document Verification & Fee Deposit',
        timingWindow: 'August – September',
        description: 'Track the 1st, 2nd, 3rd merit lists published on the UET portal; verify original documents in person and submit semester dues.',
        actions: [
          'Check merit list rankings immediately upon publication',
          'Deposit original documents and bank challan before the 3-day deadline window closes to lock your seat',
          'Apply for campus hostel accommodation if outstation candidate'
        ],
        watchOutTraps: [
          'Failing to pay the admission challan within 72 hours forfeits your admission permanently'
        ]
      }
    ]
  },
  {
    id: 'track-nust-net',
    title: 'NUST / NET-Based Programs (Engineering, CS & Business)',
    subtitle: 'Multi-series strategy for Pakistan’s highest-ranked STEM university',
    trackType: 'pakistan',
    targetField: 'Computer Science & Engineering',
    summary: 'NUST offers 4 separate computer-based NET test series between December and July. The highest single score is considered. NET carries a towering 75% weighting.',
    honestRealityCheck: 'Because NET is 75% of your aggregate, a top NET score (155+ out of 200 for CS, 140+ for Mechanical) can overcome average intermediate marks. However, the computer science cutoff at SEECS has risen above 79% aggregate.',
    steps: [
      {
        id: 'net-step-1',
        stageNumber: 1,
        title: 'Register for NET Series 1 or 2 as a Diagnostic Benchmark',
        timingWindow: 'November – January',
        description: 'Take NET-1 or NET-2 early to understand the computer interface, difficulty curve, and time allocation without high stakes.',
        actions: [
          'Create profile on nust.edu.pk admission portal and pay fee challan',
          'Pick test date matching your mid-term preparation',
          'Review the 200 MCQs distribution (Math 80, Physics 60, Chemistry/CS 30, English 20, Intelligence 10)'
        ],
        watchOutTraps: [
          'Do not wait until NET-4 in July for your first attempt; last-minute pressure often depresses scores'
        ],
        linkedTool: {
          toolName: 'calculator',
          param: 'nust',
          buttonLabel: 'NUST Calculator'
        }
      },
      {
        id: 'net-step-2',
        stageNumber: 2,
        title: 'Targeted Gap Analysis & Intensive Topic Mastery',
        timingWindow: 'February – April',
        description: 'Analyze weak areas from your diagnostic series (commonly Conics, Integration, Electromagnetism, or Logical reasoning).',
        actions: [
          'Solve past paper recall books (e.g. KIPS Fung or OET series)',
          'Practice speed mental arithmetic and trigonometric identities',
          'Prepare for NET Series 3'
        ],
        watchOutTraps: [
          'NET does NOT have negative marking — never leave a question blank on the computer screen'
        ]
      },
      {
        id: 'net-step-3',
        stageNumber: 3,
        title: 'Peak Series Attempt (NET-3 or NET-4)',
        timingWindow: 'May – July',
        description: 'Attempt your final, high-score series right as your FSc or A-Level concepts are at their peak.',
        actions: [
          'Select your preferred test date at H-12 Islamabad campus or Karachi/Quetta paper centers',
          'Aim for raw target scores: CS/SE (155+), EE/ME (142+), Civil/Chemical (125+)',
          'Submit your program preference hierarchy'
        ],
        watchOutTraps: [
          'Ensure your CNIC name matches your registration token down to the last letter'
        ],
        linkedTool: {
          toolName: 'checklist',
          param: 'nust',
          buttonLabel: 'NUST Document Requirements'
        }
      },
      {
        id: 'net-step-4',
        stageNumber: 4,
        title: 'Merit Position Announcement & Selection Letters',
        timingWindow: 'Early August',
        description: 'NUST publishes national merit positions (e.g. Merit Position #340). Selection letters issue in waves.',
        actions: [
          'Compare your merit position against historical closing ranks',
          'Accept selection letter and pay admission dues to confirm seat',
          'Apply for NUST Need-Based Financial Aid or Interest-Free Loan if required'
        ],
        watchOutTraps: [
          'If selected in your 2nd preference, you MUST pay the fee to remain eligible for subsequent upgrades to your 1st preference'
        ]
      }
    ]
  },
  {
    id: 'track-fast-cs',
    title: 'FAST-NUCES & Competitive Computing Admissions',
    subtitle: 'The premier CS and software engineering standard in Pakistan',
    trackType: 'pakistan',
    targetField: 'Computer Science',
    summary: 'Admissions open in June with tests in July. Weighting is 50% NU Test + 40% Intermediate + 10% Matric. Alternatively, SAT-I or NTS-NAT routes can be chosen.',
    honestRealityCheck: 'The NU test features strict negative marking (-0.25 per wrong answer) and separate sub-sections (Advanced Math, Basic Math, English, Analytical). Accuracy is far more important than attempting everything.',
    steps: [
      {
        id: 'fast-step-1',
        stageNumber: 1,
        title: 'Master Advanced Mathematics & Analytical Reasoning',
        timingWindow: 'March – May',
        description: 'Prepare specifically for the NU Test’s Advanced Math component (50 MCQs), which tests FSc/A-Level Math thoroughly.',
        actions: [
          'Focus on Matrices, Calculus, Sequences, Permutations & Combinations',
          'Practice analytical logic puzzles and pattern identification',
          'Decide whether to apply via NU Test, NTS-NAT, or SAT (minimum 1200+ for SAT consideration)'
        ],
        watchOutTraps: [
          'Do not assume general knowledge or physics are tested; FAST focuses heavily on Math and analytical logic'
        ],
        linkedTool: {
          toolName: 'calculator',
          param: 'fast-nuces',
          buttonLabel: 'FAST Merit Calculator'
        }
      },
      {
        id: 'fast-step-2',
        stageNumber: 2,
        title: 'Online Application & Campus Selection',
        timingWindow: 'June – Early July',
        description: 'Submit the online application on nu.edu.pk, prioritizing campus choices (Islamabad, Lahore, Karachi, Peshawar, Faisalabad).',
        actions: [
          'Choose your campus preferences carefully — campus transfer later is virtually impossible',
          'Select your NU test date and time slot at the nearest campus test lab',
          'Upload verified marks sheets for SSC and HSSC Part 1'
        ],
        watchOutTraps: [
          'Campus cutoffs vary significantly (Islamabad and Lahore campus cutoffs are 4–6% higher than Peshawar or Faisalabad)'
        ],
        linkedTool: {
          toolName: 'checklist',
          param: 'fast-nuces',
          buttonLabel: 'FAST Document List'
        }
      },
      {
        id: 'fast-step-3',
        stageNumber: 3,
        title: 'NU Computer-Based Test & Score Analysis',
        timingWindow: 'Mid-July',
        description: 'Take the computerized test. Your raw score is displayed on screen immediately upon test submission.',
        actions: [
          'Note down your raw scores in each section',
          'Calculate aggregate immediately to estimate campus eligibility',
          'Prepare financial and document files for rapid enrollment'
        ],
        watchOutTraps: [
          'Random guessing will destroy your score due to the -0.25 penalty per wrong answer'
        ]
      },
      {
        id: 'fast-step-4',
        stageNumber: 4,
        title: 'Campus Merit Lists & Fee Payment',
        timingWindow: 'Late July – Early August',
        description: 'Merit lists are released online. Admitted candidates have approximately 4–5 business days to pay fee challan.',
        actions: [
          'Submit original documents and signed code-of-conduct undertaking on stamp paper',
          'Complete course registration during freshers orientation week'
        ],
        watchOutTraps: [
          'Strict attendance and rigorous academic probation rules apply from Day 1 of classes'
        ]
      }
    ]
  },
  {
    id: 'track-medical-mdcat',
    title: 'Medical Admissions via National MDCAT (MBBS & BDS)',
    subtitle: 'The most fiercely contested admission process in Pakistan',
    trackType: 'pakistan',
    targetField: 'Medical',
    summary: 'Governed nationwide by PMDC regulations. Formula: 50% MDCAT + 40% FSc Pre-Medical + 10% Matric. Public medical college cutoffs routinely exceed 90.5–91.5% aggregate.',
    honestRealityCheck: 'Over 180,000 students compete for fewer than 4,500 public sector MBBS seats nationwide. The margin of error is razor-thin: losing 3 marks in MDCAT can drop your provincial rank by 400 positions.',
    steps: [
      {
        id: 'mdcat-step-1',
        stageNumber: 1,
        title: 'FSc Pre-Medical High Score Optimization',
        timingWindow: 'Ongoing throughout FSc (Part 1 & 2)',
        description: 'Because FSc carries 40% of the aggregate, achieving 90%+ in board exams is practically mandatory for open merit.',
        actions: [
          'Memorize provincial textbook line-by-line in Biology and Chemistry',
          'Practice past BISE papers with diagrams and formal board presentation',
          'Target at least 470+/505 in Part 1 and 1000+/1100 overall'
        ],
        watchOutTraps: [
          'Do not abandon board exam preparation to study MDCAT shortcuts too early; low board marks can never be recovered'
        ],
        linkedTool: {
          toolName: 'calculator',
          param: 'kemu-uhs',
          buttonLabel: 'Medical Aggregate Calculator'
        }
      },
      {
        id: 'mdcat-step-2',
        stageNumber: 2,
        title: 'PMDC National MDCAT Registration',
        timingWindow: 'July – August',
        description: 'Register on the central PMDC portal and choose your provincial examining university.',
        actions: [
          'Ensure candidate name, father name, and B-form numbers match identity documents',
          'Review the official PMDC syllabus and weightings (Biology 68, Chemistry 54, Physics 54, English 18, Logical Reasoning 6)',
          'Solve full-length 200-question practice papers in 3.5 hours'
        ],
        watchOutTraps: [
          'Beware of fraudulent "leaked papers" on social media; PMDC utilizes high-security barcoded test booklets'
        ],
        linkedTool: {
          toolName: 'checklist',
          param: 'kemu-uhs',
          buttonLabel: 'Medical Admission Checklist'
        }
      },
      {
        id: 'mdcat-step-3',
        stageNumber: 3,
        title: 'MDCAT Examination & Provincial Portal Application',
        timingWindow: 'Late August – October',
        description: 'Take MDCAT, then apply on provincial portals (UHS in Punjab, DUHS in Sindh, KMU in KPK, BUMHS in Balochistan).',
        actions: [
          'Submit provincial portal form with attested Domicile, PRC, and FSc marks sheet',
          'List medical colleges in order of preference (KEMU, AIMC, RMU, FJMU, AMC, etc.)',
          'Check provisional and amended merit lists for typing errors or incorrect marks'
        ],
        watchOutTraps: [
          'Domicile verification is intensely scrutinized. False domicile claims lead to disqualification and legal penalties'
        ]
      },
      {
        id: 'mdcat-step-4',
        stageNumber: 4,
        title: 'Centralized College Allocation & Medical Examination',
        timingWindow: 'November – December',
        description: 'Centralized admission committee issues college allocation list. Complete medical fitness test and submit admission dues.',
        actions: [
          'Report to allocated medical college with original documents and affidavit',
          'Undergo on-site hepatitis and blood screening test',
          'Confirm admission or wait for upward migration in subsequent lists'
        ],
        watchOutTraps: [
          'Failure to join allocated college forfeits all subsequent upgrade rounds in public medical colleges'
        ]
      }
    ]
  },
  {
    id: 'track-academic-only',
    title: 'Public Universities via Academic Marks Only (No Entry Test)',
    subtitle: 'Straightforward merit path for pure sciences and social disciplines',
    trackType: 'pakistan',
    targetField: 'Sciences & Humanities',
    summary: 'Universities like Quaid-i-Azam University (QAU), University of the Punjab, and Karachi University admit to numerous BS programs based solely on academic percentages (e.g. 70% Inter + 30% Matric).',
    honestRealityCheck: 'While stress-free because there is no entrance test, closing merit for top disciplines (like BS Biotechnology, Physics, or Economics at QAU) can be over 88% due to high board marks inflation.',
    steps: [
      {
        id: 'acad-step-1',
        stageNumber: 1,
        title: 'Maximize Board Marks (FSc & Matric)',
        timingWindow: 'Throughout High School',
        description: 'Focus entirely on board examination performance; every single mark directly increases your aggregate.',
        actions: [
          'Secure high marks in both Part-1 and Part-2 examinations',
          'Obtain character certificate and board verification if applicable'
        ],
        watchOutTraps: [
          'Check whether the specific university requires a Hafiz-e-Quran oral test for 20 extra marks'
        ],
        linkedTool: {
          toolName: 'calculator',
          param: 'qau-islamabad',
          buttonLabel: 'QAU Aggregate Calculator'
        }
      },
      {
        id: 'acad-step-2',
        stageNumber: 2,
        title: 'Provincial Quota & Category Strategy',
        timingWindow: 'June – July',
        description: 'Federal universities like QAU have strict regional quotas (Balochistan, Sindh Rural, KPK, Punjab, AJK/GB).',
        actions: [
          'Obtain verified provincial domicile certificate',
          'Apply under both Open Merit and your designated Regional Quota to double admission chances',
          'Submit separate applications for Morning (subsidized) and Evening shifts if needed'
        ],
        watchOutTraps: [
          'Evening programs have identical degrees but significantly higher tuition fees'
        ]
      },
      {
        id: 'acad-step-3',
        stageNumber: 3,
        title: 'Merit List Publication & Seat Confirmation',
        timingWindow: 'August – September',
        description: 'Track the 1st through 4th merit lists released on the official university portal.',
        actions: [
          'Deposit fee challan within the 3-day window to lock admission',
          'Apply for campus hostel accommodation through regional quota allotment'
        ],
        watchOutTraps: [
          'Missing the fee deadline automatically passes the seat to the next waiting-list candidate'
        ]
      }
    ]
  },

  // SUBSECTION B: STUDY ABROAD
  {
    id: 'track-abroad-usa',
    title: 'Study in the United States (Common App & Financial Aid)',
    subtitle: 'Holistic admissions, standardized testing, and generous endowments',
    trackType: 'abroad',
    targetField: 'Study Abroad - USA',
    summary: 'The US application process is holistic: high school grades (9th to 12th), SAT/ACT, extracurricular leadership, personal statement essays, and recommendation letters. Generous financial aid exists at top private institutions.',
    honestRealityCheck: 'Full-need financial aid for international students is extremely competitive (acceptance rates < 5% at need-blind colleges like Harvard, MIT, Amherst, Princeton, Dartmouth, Bowdoin, Yale). For need-aware colleges, requesting full aid drastically reduces admission odds. Expect application and testing fees of $500–$1,000+ unless fee waivers are secured.',
    steps: [
      {
        id: 'usa-step-1',
        stageNumber: 1,
        title: 'High School Profile & Standardized Testing',
        timingWindow: '12–18 Months Before Enrollment (FSc-1 / O-Levels / AS)',
        description: 'Maintain top GPA/grades across all 4 high school years. Take SAT-I and English proficiency tests.',
        actions: [
          'Prepare for SAT-I; aim for 1450+ (1520+ for competitive STEM/financial aid)',
          'Take Duolingo English Test (DET) or IELTS (minimum 7.5 overall)',
          'Develop deep extracurriculars showing sustained initiative rather than random lists'
        ],
        watchOutTraps: [
          'Do not wait until final year to build activities; US universities look for 3–4 years of demonstrated commitment'
        ]
      },
      {
        id: 'usa-step-2',
        stageNumber: 2,
        title: 'Common Application & College List Building',
        timingWindow: 'August – October',
        description: 'Set up Common App; build a balanced list of 10–15 universities categorized into Reach, Target, and Safety.',
        actions: [
          'Craft your Common App 650-word personal essay (authentic voice, not a resume summary)',
          'Request 2 teacher recommendations and 1 school counselor reference',
          'Complete CSS Profile and ISFAA forms for financial aid calculation'
        ],
        watchOutTraps: [
          'Never copy generic essays; admissions committees read thousands of Pakistani student profiles'
        ]
      },
      {
        id: 'usa-step-3',
        stageNumber: 3,
        title: 'Submit Early Action / Early Decision (EA / ED)',
        timingWindow: 'November 1 (ED/EA) or January 1–15 (Regular Decision)',
        description: 'Submit Early Decision (binding) only if you have a clear dream school with proven financial aid history.',
        actions: [
          'Submit test score reports or elect test-optional where strategic',
          'Submit supplemental college essays (Why Us? Why your major?)',
          'Submit financial aid tax documents, bank statements, and salary certificates'
        ],
        watchOutTraps: [
          'ED is legally binding; only commit if the financial aid net price calculator shows it will be affordable'
        ]
      },
      {
        id: 'usa-step-4',
        stageNumber: 4,
        title: 'Decision Letters, I-20 Form & F-1 Visa Interview',
        timingWindow: 'March – June',
        description: 'Receive admissions offers and financial aid packages. Request Form I-20 and schedule US Embassy interview.',
        actions: [
          'Compare net out-of-pocket costs across offers',
          'Pay SEVIS I-901 fee ($350) and DS-160 visa fee ($185)',
          'Prepare for F-1 visa interview in Islamabad or Karachi: demonstrate strong non-immigrant intent and verified funding'
        ],
        watchOutTraps: [
          'Visa refusal is possible if you cannot convincingly explain why you will return to Pakistan after graduation'
        ]
      }
    ]
  },
  {
    id: 'track-abroad-uk',
    title: 'Study in the United Kingdom (UCAS & Russell Group)',
    subtitle: 'Structured, degree-focused British higher education',
    trackType: 'abroad',
    targetField: 'Study Abroad - UK',
    summary: 'Centralized application via UCAS (maximum 5 university course choices). Admissions are strictly academic and subject-focused, based on predicted/final grades and a 4,000-character Personal Statement.',
    honestRealityCheck: 'Undergraduate full scholarships in the UK for international students are virtually non-existent. Most scholarships offer partial tuition discounts (£2,000–£5,000). Living costs (£10,000–£15,000/year) and international tuition (£18,000–£35,000/year) must be largely self-funded.',
    steps: [
      {
        id: 'uk-step-1',
        stageNumber: 1,
        title: 'UCAS Course Research & Grade Alignment',
        timingWindow: '10–12 Months Before (June – September)',
        description: 'Research entry requirements across Russell Group and modern UK universities. UK degrees are 3 years (4 in Scotland).',
        actions: [
          'Verify whether FSc is accepted directly or requires a 1-year International Foundation Year (IFY)',
          'A-Level students should aim for AAA–A*AA for top tier (Oxford, Cambridge, Imperial, UCL, Manchester)',
          'Take IELTS Academic (minimum 6.5–7.0 overall with no band under 6.0)'
        ],
        watchOutTraps: [
          'Pakistani FSc qualifications generally require a Foundation Year for high-ranking UK universities'
        ]
      },
      {
        id: 'uk-step-2',
        stageNumber: 2,
        title: 'UCAS Submission & Academic Personal Statement',
        timingWindow: 'October 15 (Oxbridge & Medicine) or January 29 (General)',
        description: 'Submit your single UCAS application to up to 5 courses.',
        actions: [
          'Write a strictly academic personal statement (80% intellectual passion and books/projects, 20% relevant extracurriculars)',
          'Secure an authoritative predicted grade reference from your school principal or counselor',
          'Pay UCAS application processing fee (~£28.50)'
        ],
        watchOutTraps: [
          'The same personal statement is sent to all 5 universities; do NOT mention any specific university by name in the text'
        ]
      },
      {
        id: 'uk-step-3',
        stageNumber: 3,
        title: 'Firm and Insurance Choice Selection',
        timingWindow: 'March – May',
        description: 'Receive conditional offers. Select one Firm Choice (primary) and one Insurance Choice (lower grade backup).',
        actions: [
          'Accept your preferred offers on UCAS Hub before deadline',
          'Apply for university international merit scholarships'
        ],
        watchOutTraps: [
          'Ensure your insurance choice really has lower grade requirements; otherwise it cannot serve as a safety net'
        ]
      },
      {
        id: 'uk-step-4',
        stageNumber: 4,
        title: 'CAS Issuance, TB Test & Student Visa',
        timingWindow: 'July – August',
        description: 'Receive Confirmation of Acceptance for Studies (CAS) upon clearing academic conditions and paying tuition deposit.',
        actions: [
          'Book IOM Pakistan Tuberculosis (TB) screening clinic test',
          'Maintain 28 consecutive days of required bank statement balance for tuition + living costs',
          'Apply for UK Student Visa and pay Immigration Health Surcharge (IHS)'
        ],
        watchOutTraps: [
          'Bank statement must not dip even 1 Rupee below the mandated requirement during the 28-day window'
        ]
      }
    ]
  },
  {
    id: 'track-abroad-turkey-china',
    title: 'Study in Turkey or China (Fully Funded Government Schemes)',
    subtitle: 'High-value, realistic full scholarships for Pakistani students',
    trackType: 'abroad',
    targetField: 'Study Abroad - Fully Funded',
    summary: 'Türkiye Bursları and Chinese Government Scholarship (CSC) provide 100% full coverage (tuition, accommodation, monthly stipend, flight, and health insurance) specifically welcoming Pakistani scholars.',
    honestRealityCheck: 'Competition is intense due to thousands of applicants. Turkish scholarship applications open in January/February; selection hinges on high academic percentage (minimum 70% for general, 90% for medicine), a well-written study plan, and an in-person interview in Islamabad or Karachi.',
    steps: [
      {
        id: 'tc-step-1',
        stageNumber: 1,
        title: 'Academic Transcript & Language Documentation',
        timingWindow: 'October – December',
        description: 'Compile verified academic records, certificates, and English proficiency documents.',
        actions: [
          'Attest Matric and Intermediate certificates with IBCC and Ministry of Foreign Affairs (MOFA)',
          'Acquire 2 formal academic recommendation letters on official school letterheads',
          'Write a crisp Letter of Intent explaining why Turkey or China fits your career trajectory'
        ],
        watchOutTraps: [
          'Unattested or illegible document scans will lead to automatic rejection at initial technical screening'
        ],
        linkedTool: {
          toolName: 'scholarships',
          param: 'turkiye-burslari-ug',
          buttonLabel: 'View Türkiye Bursları Details'
        }
      },
      {
        id: 'tc-step-2',
        stageNumber: 2,
        title: 'Portal Application Submission',
        timingWindow: 'January – February',
        description: 'Submit free online application on Türkiye Bursları portal (TBBS) or Chinese CSC / HEC portal.',
        actions: [
          'Select up to 12 Turkish universities and degree departments',
          'Provide clear, concise answers to study plan essay questions',
          'Submit HEC nomination form if applying under bilateral government quota'
        ],
        watchOutTraps: [
          'Never pay any private visa agent or consultant; official government applications are 100% free of charge'
        ]
      },
      {
        id: 'tc-step-3',
        stageNumber: 3,
        title: 'Interview Stage & Final Award Confirmation',
        timingWindow: 'May – July',
        description: 'Shortlisted candidates attend an in-person interview conducted by visiting Turkish delegation in Islamabad, Lahore, or Karachi.',
        actions: [
          'Prepare for academic questions in your chosen subject field',
          'Demonstrate clear cultural adaptability and long-term career vision',
          'Sign scholarship agreement and receive formal visa invitation letter'
        ],
        watchOutTraps: [
          'Dress professionally for the interview; review your submitted study plan in detail'
        ]
      }
    ]
  },
  {
    id: 'track-abroad-canada',
    title: 'Study in Canada (Provincial Portals & Study Permit)',
    subtitle: 'High quality degrees and post-graduation work opportunities',
    trackType: 'abroad',
    targetField: 'Study Abroad - Canada',
    summary: 'Direct applications to designated learning institutions (DLIs) or centralized portals like Ontario’s OUAC. Rolling admissions open in September.',
    honestRealityCheck: 'Canada has significantly tightened international student caps and provincial attestation letters (PAL). Proof of financial funds requires at least CAD $20,635+ for living expenses in addition to first-year tuition. Undergraduate scholarships are limited to partial merit awards.',
    steps: [
      {
        id: 'ca-step-1',
        stageNumber: 1,
        title: 'DLI University Research & Program Matching',
        timingWindow: 'August – October',
        description: 'Identify top Canadian universities (Toronto, UBC, McGill, Waterloo, Alberta) or affordable regional institutions.',
        actions: [
          'Check specific high school prerequisite subject requirements (Math, Calculus, Chemistry, Physics)',
          'Take IELTS Academic (aim for 6.5 minimum with 6.0 in all bands)',
          'Apply directly or via OUAC (Ontario Universities Application Centre)'
        ],
        watchOutTraps: [
          'Ensure your chosen institution is on the official Designated Learning Institution (DLI) list'
        ]
      },
      {
        id: 'ca-step-2',
        stageNumber: 2,
        title: 'Offer of Admission & Provincial Attestation Letter (PAL)',
        timingWindow: 'January – April',
        description: 'Receive offer of admission, pay tuition deposit, and secure the mandatory Provincial Attestation Letter.',
        actions: [
          'Pay initial tuition deposit to confirm seat and trigger PAL allocation',
          'Gather comprehensive financial proofs (tax returns, bank statements, asset evaluations)'
        ],
        watchOutTraps: [
          'Study permit applications cannot be submitted without an official Provincial Attestation Letter (PAL)'
        ]
      },
      {
        id: 'ca-step-3',
        stageNumber: 3,
        title: 'Canadian Study Permit Application',
        timingWindow: 'May – July',
        description: 'Submit online study permit application via IRCC with upfront medical and biometric enrollment at VFS Pakistan.',
        actions: [
          'Provide unassailable proof of funds demonstrating tuition + CAD $20,635+ living funds',
          'Write a thorough Statement of Purpose (SOP) explaining why studying in Canada is logical for your home country career',
          'Complete biometrics at VFS Global in Islamabad, Lahore, or Karachi'
        ],
        watchOutTraps: [
          'A generic statement of purpose is the primary reason for Canadian study permit refusals from South Asia'
        ]
      }
    ]
  }
];
