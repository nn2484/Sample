import { University } from '../types';

export const UNIVERSITIES: University[] = [
  {
    id: 'nust',
    name: 'National University of Sciences and Technology',
    shortName: 'NUST',
    city: 'Islamabad',
    otherCampuses: ['Rawalpindi', 'Risalpur', 'Karachi'],
    sector: 'public',
    description: 'Pakistan’s premier public research university, globally ranked for STEM, computing, and technology-driven programs with world-class faculty and campus infrastructure.',
    knownFor: 'Engineering, Computer Science, Artificial Intelligence, Business Administration',
    generalFeeRange: 'PKR 240,000–310,000 / year',
    feeNote: 'Approximate annual tuition for national seats; laboratory & hostel charges billed separately per semester.',
    officialWebsite: 'https://nust.edu.pk',
    typicalTiming: {
      applicationOpens: 'November (Series 1) to June (Series 4)',
      applicationCloses: 'Mid-June for final cycle',
      testDates: 'NET 1 (Dec), NET 2 (Feb), NET 3 (Apr), NET 4 (Jun/Jul)',
      status: 'confirmed',
      cycleYear: '2026/2027',
      notes: 'NUST conducts 4 computer-based NET series annually in Islamabad and paper-based tests in Karachi and Quetta. Highest score is automatically counted.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'On-campus hostels available for outstation students via merit-based hostel allocation.',
      oALevelEquivalence: 'Requires IBCC Equivalence Certificate with minimum 60% marks in relevant group.',
      quotaSystems: 'Balochistan & FATA designated reserved seats, Armed Forces personnel quota, and Foreign/Expatriate seats.',
      transport: 'Extensive university bus network covers Rawalpindi and Islamabad.'
    },
    programs: [
      {
        id: 'nust-cs-se',
        name: 'BS Computer Science & Software Engineering',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 290,000/year',
        approxClosingAggregate: 79.4,
        stretchThreshold: 76.0,
        safeThreshold: 82.5,
        seatsInfo: '~180 seats across SEECS campus',
        formula: {
          formulaId: 'nust-net-computing',
          formulaName: 'NUST Computing Aggregate (NET Series)',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 15,
          testWeight: 75,
          testName: 'NET (NUST Entry Test - Computing)',
          testMaxMarks: 200,
          ruleDescription: '75% NUST Entry Test (NET) score + 15% Intermediate (HSSC Part-I or complete) + 10% Matric (SSC).',
          citation: 'NUST Undergraduate Admission Policy & Prospectus Section 4.2',
          lastVerified: 'February 2026'
        }
      },
      {
        id: 'nust-eng-mech-ee',
        name: 'BS Electrical / Mechanical Engineering',
        field: 'Engineering',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 280,000/year',
        approxClosingAggregate: 71.8,
        stretchThreshold: 68.0,
        safeThreshold: 75.0,
        seatsInfo: '~240 seats across SMME and SEECS',
        formula: {
          formulaId: 'nust-net-engineering',
          formulaName: 'NUST Engineering Aggregate (NET Series)',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 15,
          testWeight: 75,
          testName: 'NET (NUST Entry Test - Engineering)',
          testMaxMarks: 200,
          ruleDescription: '75% NET score + 15% HSSC / A-Level Equivalence + 10% SSC / O-Level Equivalence.',
          citation: 'NUST UG Prospectus 2025/2026 Official Directive',
          lastVerified: 'February 2026'
        }
      },
      {
        id: 'nust-nbs-bba',
        name: 'BBA & BS Accounting and Finance (NBS)',
        field: 'Business',
        degreeType: 'BBA',
        durationYears: 4,
        feePerYearPkr: 'PKR 270,000/year',
        approxClosingAggregate: 74.2,
        stretchThreshold: 70.5,
        safeThreshold: 77.0,
        seatsInfo: '~160 seats at NUST Business School',
        formula: {
          formulaId: 'nust-net-business',
          formulaName: 'NUST Business & Social Sciences Aggregate',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 15,
          testWeight: 75,
          testName: 'NET (Business Studies & Social Sciences)',
          testMaxMarks: 200,
          ruleDescription: '75% NET Business test + 15% Intermediate + 10% Matriculation.',
          citation: 'NBS Undergraduate Admissions Notice',
          lastVerified: 'January 2026'
        }
      }
    ]
  },
  {
    id: 'fast-nuces',
    name: 'National University of Computer and Emerging Sciences',
    shortName: 'FAST-NUCES',
    city: 'Islamabad',
    otherCampuses: ['Lahore', 'Karachi', 'Peshawar', 'Faisalabad'],
    sector: 'private',
    description: 'The golden benchmark for computer science, software engineering, and data science in Pakistan, renowned for demanding curriculum rigor and elite employer recruitment.',
    knownFor: 'Computer Science, Software Engineering, Artificial Intelligence, Cyber Security',
    generalFeeRange: 'PKR 380,000–460,000 / year',
    feeNote: 'Tuition billed per registered credit hour (~PKR 11,500/credit hour). Approximate annual cost.',
    officialWebsite: 'https://nu.edu.pk',
    typicalTiming: {
      applicationOpens: 'Late May / Early June',
      applicationCloses: 'First week of July',
      testDates: 'Mid-July (conducted computer-based at all campuses)',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'FAST conducts its own NU test. Applicants can also apply on basis of NTS-NAT or SAT scores in separate merit streams.'
    },
    practicalInfo: {
      hostelAvailable: false,
      hostelNotes: 'Limited or no direct university hostels; designated private approved hostels operate adjacent to campuses.',
      oALevelEquivalence: 'IBCC equivalence certificate required with min 60% for Computing and 60% for Engineering.',
      quotaSystems: 'Merit-based admission across campuses. No provincial domicile quotas on standard open merit.',
      transport: 'Contracted student transport routes available across each campus city.'
    },
    programs: [
      {
        id: 'fast-bs-cs',
        name: 'BS Computer Science & Software Engineering',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 420,000/year',
        approxClosingAggregate: 73.5,
        stretchThreshold: 69.5,
        safeThreshold: 77.0,
        seatsInfo: '~350 seats per major campus',
        formula: {
          formulaId: 'fast-nu-computing',
          formulaName: 'FAST NU Admission Test Aggregate (Computing)',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 40,
          testWeight: 50,
          testName: 'NU Online Admission Test',
          testMaxMarks: 100,
          ruleDescription: '50% NU Online Admission Test + 40% Intermediate (Part 1 or Part 2) + 10% Matriculation.',
          citation: 'FAST-NUCES UG Admission Guidelines 2025/2026',
          lastVerified: 'February 2026'
        }
      },
      {
        id: 'fast-bs-ai-ds',
        name: 'BS Artificial Intelligence & Data Science',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 420,000/year',
        approxClosingAggregate: 71.0,
        stretchThreshold: 67.5,
        safeThreshold: 75.0,
        seatsInfo: '~120 seats per campus',
        formula: {
          formulaId: 'fast-nu-ai',
          formulaName: 'FAST NU Test Aggregate',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 40,
          testWeight: 50,
          testName: 'NU Online Admission Test',
          testMaxMarks: 100,
          ruleDescription: '50% NU Admission Test + 40% Intermediate + 10% Matric.',
          citation: 'FAST-NUCES Official Admission Prospectus',
          lastVerified: 'February 2026'
        }
      },
      {
        id: 'fast-bba',
        name: 'Bachelor of Business Administration (BBA)',
        field: 'Business',
        degreeType: 'BBA',
        durationYears: 4,
        feePerYearPkr: 'PKR 380,000/year',
        approxClosingAggregate: 62.0,
        stretchThreshold: 58.0,
        safeThreshold: 66.0,
        seatsInfo: '~100 seats per campus',
        formula: {
          formulaId: 'fast-nu-bba',
          formulaName: 'FAST BBA & FinTech Aggregate',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 40,
          testWeight: 50,
          testName: 'NU Business Aptitude Test',
          testMaxMarks: 100,
          ruleDescription: '50% NU Test + 40% Intermediate + 10% Matric.',
          citation: 'FAST Management Sciences Admissions Document',
          lastVerified: 'February 2026'
        }
      }
    ]
  },
  {
    id: 'uet-lahore',
    name: 'University of Engineering and Technology, Lahore',
    shortName: 'UET Lahore',
    city: 'Lahore',
    otherCampuses: ['Kala Shah Kaku', 'Faisalabad', 'Rachna', 'Narowal'],
    sector: 'public',
    description: 'Pakistan’s oldest and most prestigious engineering university, established in 1921. Gateway to provincial government engineering cadres and industrial leadership.',
    knownFor: 'Mechanical, Electrical, Civil, Chemical Engineering, Computer Science',
    generalFeeRange: 'PKR 95,000–160,000 / year (Subsidized A1 Category)',
    feeNote: 'Subsidized regular seats (Category A) ~PKR 100k/year; Partially subsidized self-finance (Category A2) ~PKR 350k/year.',
    officialWebsite: 'https://uet.edu.pk',
    typicalTiming: {
      applicationOpens: 'January/February (ECAT Registration)',
      applicationCloses: 'March',
      testDates: 'Combined Entry Test (ECAT) in March / April',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'ECAT is administered by UET on behalf of all public sector engineering colleges across Punjab.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'Extensive historical hostels on campus, prioritized by distance from Lahore.',
      oALevelEquivalence: 'IBCC equivalence required with minimum 60% aggregate in Physics, Math, and Chemistry/Computer.',
      quotaSystems: 'Detailed district-wise and provincial quota seats for Punjab, AJK, FATA, Balochistan, Sindh, and Overseas Pakistanis.',
      transport: 'Extensive green bus fleet covers all major Lahore arteries.'
    },
    programs: [
      {
        id: 'uet-eng-ee-mech',
        name: 'BSc Electrical / Mechanical Engineering',
        field: 'Engineering',
        degreeType: 'BSc',
        durationYears: 4,
        feePerYearPkr: 'PKR 115,000/year',
        approxClosingAggregate: 74.8,
        stretchThreshold: 71.0,
        safeThreshold: 78.5,
        seatsInfo: '~180 open merit Punjab seats',
        formula: {
          formulaId: 'uet-ecat-formula',
          formulaName: 'Punjab Engineering Combined ECAT Aggregate',
          formulaType: 'standard_three',
          matricWeight: 17,
          interWeight: 50,
          testWeight: 33,
          testName: 'Combined Entry Test (ECAT Punjab)',
          testMaxMarks: 400,
          ruleDescription: '33% ECAT score (out of 400) + 50% Intermediate FSc Pre-Engineering + 17% Matriculation.',
          citation: 'Government of Punjab Higher Education Department Engineering Admission Regulation',
          lastVerified: 'March 2026'
        }
      },
      {
        id: 'uet-cs',
        name: 'BSc Computer Science',
        field: 'Computer Science',
        degreeType: 'BSc',
        durationYears: 4,
        feePerYearPkr: 'PKR 125,000/year',
        approxClosingAggregate: 78.9,
        stretchThreshold: 75.5,
        safeThreshold: 82.0,
        seatsInfo: '~100 seats Main Campus',
        formula: {
          formulaId: 'uet-ecat-formula',
          formulaName: 'Punjab Engineering Combined ECAT Aggregate',
          formulaType: 'standard_three',
          matricWeight: 17,
          interWeight: 50,
          testWeight: 33,
          testName: 'Combined Entry Test (ECAT Punjab)',
          testMaxMarks: 400,
          ruleDescription: '33% ECAT score + 50% Intermediate + 17% Matriculation.',
          citation: 'UET Lahore Admission Policy Bulletin',
          lastVerified: 'March 2026'
        }
      },
      {
        id: 'uet-civil',
        name: 'BSc Civil Engineering',
        field: 'Engineering',
        degreeType: 'BSc',
        durationYears: 4,
        feePerYearPkr: 'PKR 115,000/year',
        approxClosingAggregate: 67.2,
        stretchThreshold: 63.5,
        safeThreshold: 71.0,
        seatsInfo: '~160 seats',
        formula: {
          formulaId: 'uet-ecat-formula',
          formulaName: 'Punjab Engineering Combined ECAT Aggregate',
          formulaType: 'standard_three',
          matricWeight: 17,
          interWeight: 50,
          testWeight: 33,
          testName: 'Combined Entry Test (ECAT Punjab)',
          testMaxMarks: 400,
          ruleDescription: '33% ECAT score + 50% Intermediate + 17% Matriculation.',
          citation: 'UET Lahore Admission Policy Bulletin',
          lastVerified: 'March 2026'
        }
      }
    ]
  },
  {
    id: 'kemu-uhs',
    name: 'King Edward Medical University (UHS / PMDC Centralized)',
    shortName: 'KEMU',
    city: 'Lahore',
    otherCampuses: [],
    sector: 'public',
    description: 'The pinnacle of medical education in Pakistan, founded in 1860. The Mayo Hospital teaching institution with the highest merit cutoff in the country.',
    knownFor: 'MBBS, BDS, Clinical Medicine and Surgery',
    generalFeeRange: 'PKR 45,000–60,000 / year (Government Subsidized)',
    feeNote: 'Heavily subsidized by the Government of Punjab; nominal tuition fees for open-merit admissions.',
    officialWebsite: 'https://kemu.edu.pk',
    typicalTiming: {
      applicationOpens: 'July (MDCAT registration) / October (UHS portal)',
      applicationCloses: 'August (MDCAT) / November (Centralized admission)',
      testDates: 'MDCAT conducted nationally in late August or September',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'PMDC sets national MDCAT guidelines; admission in Punjab public medical colleges is centralized via University of Health Sciences (UHS).'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'Hostel facilities available for outstation medical students in Mayo Hospital vicinity.',
      oALevelEquivalence: 'Mandatory IBCC Equivalence Certificate with Biology, Chemistry, and Physics.',
      quotaSystems: 'District quotas for underdeveloped districts of Punjab, disabled quota, and overseas Pakistani quota.',
      transport: 'Located at heart of Lahore (Anarkali/Neela Gumbad) with public transit metro access.'
    },
    programs: [
      {
        id: 'kemu-mbbs',
        name: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
        field: 'Medical',
        degreeType: 'MBBS',
        durationYears: 5,
        feePerYearPkr: 'PKR 55,000/year',
        approxClosingAggregate: 91.65,
        stretchThreshold: 90.8,
        safeThreshold: 92.5,
        seatsInfo: '~325 open merit seats for Punjab',
        formula: {
          formulaId: 'pmdc-mdcat-unified',
          formulaName: 'PMDC Centralized Medical Admission Formula',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 40,
          testWeight: 50,
          testName: 'National MDCAT',
          testMaxMarks: 200,
          ruleDescription: '50% MDCAT score (out of 200) + 40% FSc Pre-Medical (or HSSC equivalent) + 10% SSC / Matriculation.',
          citation: 'Pakistan Medical & Dental Council (PMDC) Medical and Dental Undergraduate Education Regulations',
          lastVerified: 'January 2026'
        }
      }
    ]
  },
  {
    id: 'giki',
    name: 'Ghulam Ishaq Khan Institute of Engineering Sciences and Technology',
    shortName: 'GIKI',
    city: 'Topi',
    otherCampuses: ['KPK'],
    sector: 'private',
    description: 'A dedicated residential campus nestled in Swabi/Topi KPK, legendary for engineering excellence, cutting-edge labs, active student societies, and high-impact alumni networks.',
    knownFor: 'Computer Engineering, Mechanical Engineering, Materials, Artificial Intelligence',
    generalFeeRange: 'PKR 850,000–980,000 / year',
    feeNote: 'Tuition plus mandatory residential boarding & mess fees. Generous need-based & provincial scholarship packages exist.',
    officialWebsite: 'https://giki.edu.pk',
    typicalTiming: {
      applicationOpens: 'April',
      applicationCloses: 'Late June',
      testDates: 'First week of July across major national centers',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'GIKI conducts its own high-standard computer-based test in Islamabad, Rawalpindi, Lahore, Karachi, Peshawar, and Quetta.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: '100% residential campus; on-campus student housing is mandatory and guaranteed for all undergraduate students.',
      oALevelEquivalence: 'IBCC equivalence certificate required with min 60% in Science subjects.',
      quotaSystems: 'Open merit nationwide; specific scholarships funded by KPK government for KPK domiciled students.',
      transport: 'Internal campus shuttle; scheduled university buses connect to Islamabad/Rawalpindi on weekends.'
    },
    programs: [
      {
        id: 'giki-cs-ai',
        name: 'BS Computer Science & Artificial Intelligence',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 920,000/year',
        approxClosingAggregate: 78.0,
        stretchThreshold: 72.0,
        safeThreshold: 82.0,
        seatsInfo: '~150 seats',
        formula: {
          formulaId: 'giki-admission-formula',
          formulaName: 'GIKI Admission Test Formula',
          formulaType: 'standard_three',
          matricWeight: 0,
          interWeight: 15,
          testWeight: 85,
          testName: 'GIKI Admission Test',
          testMaxMarks: 200,
          ruleDescription: '85% GIKI Admission Test score + 15% HSSC / Intermediate (Part-I or complete). Matriculation is not counted in aggregate.',
          citation: 'GIKI Admission Prospectus 2025/2026 Evaluation Matrix',
          lastVerified: 'February 2026'
        }
      },
      {
        id: 'giki-eng-mech',
        name: 'BS Mechanical Engineering',
        field: 'Engineering',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 890,000/year',
        approxClosingAggregate: 66.5,
        stretchThreshold: 62.0,
        safeThreshold: 71.0,
        seatsInfo: '~120 seats',
        formula: {
          formulaId: 'giki-admission-formula',
          formulaName: 'GIKI Admission Test Formula',
          formulaType: 'standard_three',
          matricWeight: 0,
          interWeight: 15,
          testWeight: 85,
          testName: 'GIKI Admission Test',
          testMaxMarks: 200,
          ruleDescription: '85% GIKI Admission Test + 15% HSSC marks.',
          citation: 'GIKI Office of Admissions Rules',
          lastVerified: 'February 2026'
        }
      }
    ]
  },
  {
    id: 'lums',
    name: 'Lahore University of Management Sciences',
    shortName: 'LUMS',
    city: 'Lahore',
    otherCampuses: [],
    sector: 'private',
    description: 'Premier private liberal arts and science research university in Pakistan, internationally accredited (AACSB) with world-class faculty, diverse student body, and transformative financial aid (NOP).',
    knownFor: 'Business (SDSB), Computer Science (SBASSE), Economics, Law (SAHSOL)',
    generalFeeRange: 'PKR 1,400,000–1,850,000 / year',
    feeNote: 'Tuition billed per semester based on credit units; 1 in 3 LUMS students receives need-based financial assistance or NOP full scholarship.',
    officialWebsite: 'https://lums.edu.pk',
    typicalTiming: {
      applicationOpens: 'November',
      applicationCloses: 'Late January / Early February (Round 1)',
      testDates: 'SAT deadline typically December or March; LCAT in February',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'LUMS evaluates holistically: SAT / LCAT scores, academic transcripts (Matric/O-Levels & Inter/A-Levels), personal statement, and extracurricular record.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'Modern on-campus dormitories with Wi-Fi, dining, and sports facilities for outstation students.',
      oALevelEquivalence: 'IBCC equivalence certificate required. For A-Levels, at least 3 principal subjects with acceptable grades.',
      quotaSystems: 'National Outreach Programme (NOP) provides 100% funded education for talented underprivileged students across Pakistan.',
      transport: 'Campus located in DHA Phase 5, Lahore; shuttle access provided.'
    },
    programs: [
      {
        id: 'lums-sbasse-cs',
        name: 'BS Computer Science (SBASSE)',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 1,650,000/year',
        approxClosingAggregate: 84.0,
        stretchThreshold: 79.0,
        safeThreshold: 88.0,
        seatsInfo: '~180 seats',
        formula: {
          formulaId: 'lums-sbasse-indicative',
          formulaName: 'LUMS SBASSE Admission Modeling Formula',
          formulaType: 'standard_three',
          matricWeight: 20,
          interWeight: 30,
          testWeight: 50,
          testName: 'SAT-I (or SBASSE Subject Test / LCAT)',
          testMaxMarks: 1600,
          ruleDescription: '50% Standardized Test (SAT converted / LCAT) + 30% Intermediate / A-Levels + 20% Matric / O-Levels (Holistic review committee baseline).',
          citation: 'LUMS Undergraduate Admissions Policy & Historical Admission Profiles',
          lastVerified: 'January 2026'
        }
      },
      {
        id: 'lums-sdsb-bba',
        name: 'BSc (Honours) Accounting & Finance / Management (SDSB)',
        field: 'Business',
        degreeType: 'BSc',
        durationYears: 4,
        feePerYearPkr: 'PKR 1,600,000/year',
        approxClosingAggregate: 82.5,
        stretchThreshold: 78.0,
        safeThreshold: 86.0,
        seatsInfo: '~250 seats',
        formula: {
          formulaId: 'lums-sdsb-indicative',
          formulaName: 'LUMS SDSB Admission Modeling Formula',
          formulaType: 'standard_three',
          matricWeight: 20,
          interWeight: 30,
          testWeight: 50,
          testName: 'SAT-I (out of 1600) or LCAT',
          testMaxMarks: 1600,
          ruleDescription: '50% SAT / LCAT + 30% HSSC / A-Levels + 20% SSC / O-Levels.',
          citation: 'Suleman Dawood School of Business Admissions Guide',
          lastVerified: 'January 2026'
        }
      }
    ]
  },
  {
    id: 'duhs-karachi',
    name: 'Dow University of Health Sciences',
    shortName: 'DUHS',
    city: 'Karachi',
    otherCampuses: ['Ojha Campus', 'DMC Campus'],
    sector: 'public',
    description: 'Sindh’s premier public medical and health sciences institution, comprising Dow Medical College (DMC) and Dow International Medical College (DIMC).',
    knownFor: 'MBBS, BDS, Pharmacy, Medical Technology, Public Health',
    generalFeeRange: 'PKR 50,000–85,000 / year (Merit District)',
    feeNote: 'Subsidized open-merit public fee for Sindh domicile holders; Overseas/Self-finance seats have higher regulated fees.',
    officialWebsite: 'https://duhs.edu.pk',
    typicalTiming: {
      applicationOpens: 'August (Sindh Centralized Medical Portal)',
      applicationCloses: 'October',
      testDates: 'National MDCAT in September',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'Centralized admission for all public medical colleges of Sindh conducted by DUHS or designated provincial authority.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'Hostel accommodation available at Ojha campus and DMC subject to seat quota.',
      oALevelEquivalence: 'IBCC Equivalence Certificate in Pre-Medical subjects with min 60% required.',
      quotaSystems: 'District-wise seat distribution across Karachi (Districts East, West, Central, South, Malir, Korangi) and interior Sindh.',
      transport: 'Dow point transport routes operate throughout Karachi metropolitan area.'
    },
    programs: [
      {
        id: 'duhs-mbbs',
        name: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
        field: 'Medical',
        degreeType: 'MBBS',
        durationYears: 5,
        feePerYearPkr: 'PKR 65,000/year',
        approxClosingAggregate: 88.4,
        stretchThreshold: 85.5,
        safeThreshold: 90.5,
        seatsInfo: '~250 open merit Karachi seats',
        formula: {
          formulaId: 'pmdc-mdcat-unified',
          formulaName: 'PMDC Centralized Medical Admission Formula',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 40,
          testWeight: 50,
          testName: 'National MDCAT',
          testMaxMarks: 200,
          ruleDescription: '50% MDCAT score (out of 200) + 40% FSc Pre-Medical + 10% Matriculation.',
          citation: 'PMDC Medical Education Regulations & Government of Sindh Health Dept Notification',
          lastVerified: 'January 2026'
        }
      }
    ]
  },
  {
    id: 'comsats',
    name: 'COMSATS University Islamabad',
    shortName: 'CUI',
    city: 'Islamabad',
    otherCampuses: ['Lahore', 'Abbottabad', 'Wah', 'Attock', 'Sahiwal', 'Vehari'],
    sector: 'public',
    description: 'A major federal public university recognized for high scientific research citations, extensive computer science cohorts, and accessible multi-campus footprint.',
    knownFor: 'Computer Science, Software Engineering, Electrical Engineering, Management',
    generalFeeRange: 'PKR 180,000–260,000 / year',
    feeNote: 'Tuition fees vary slightly by campus (Islamabad and Lahore campuses have higher demand tier).',
    officialWebsite: 'https://comsats.edu.pk',
    typicalTiming: {
      applicationOpens: 'June (Fall) / November (Spring)',
      applicationCloses: 'Mid-July (Fall) / Mid-December (Spring)',
      testDates: 'NTS-NAT tests held monthly or CUI institutional test in July',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'Admissions offered twice a year (Fall & Spring semesters) based on NTS NAT test scores.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'Hostel facilities available for female students and outstation male candidates on first-come/merit basis.',
      oALevelEquivalence: 'IBCC equivalence certificate required with min 50% for non-engineering, 60% for engineering.',
      quotaSystems: 'Open merit across Pakistan; special seats for Northern Areas, Balochistan, and AJK.',
      transport: 'Extensive bus shuttle system covers city and suburban regions.'
    },
    programs: [
      {
        id: 'cui-cs',
        name: 'BS Computer Science & Software Engineering',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 240,000/year',
        approxClosingAggregate: 82.2,
        stretchThreshold: 78.0,
        safeThreshold: 85.0,
        seatsInfo: '~300 seats Islamabad Campus',
        formula: {
          formulaId: 'comsats-nts-nat',
          formulaName: 'COMSATS NTS-NAT Merit Formula',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 40,
          testWeight: 50,
          testName: 'NTS National Aptitude Test (NAT-ICS / Pre-Eng)',
          testMaxMarks: 100,
          ruleDescription: '50% NTS-NAT score (out of 100) + 40% Intermediate (HSSC) + 10% Matric (SSC).',
          citation: 'COMSATS University Undergraduate Admissions Regulations Chapter 3',
          lastVerified: 'February 2026'
        }
      },
      {
        id: 'cui-ee',
        name: 'BS Electrical Engineering',
        field: 'Engineering',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 220,000/year',
        approxClosingAggregate: 68.5,
        stretchThreshold: 64.0,
        safeThreshold: 72.0,
        seatsInfo: '~180 seats',
        formula: {
          formulaId: 'comsats-nts-nat',
          formulaName: 'COMSATS NTS-NAT Merit Formula',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 40,
          testWeight: 50,
          testName: 'NTS NAT (Pre-Engineering)',
          testMaxMarks: 100,
          ruleDescription: '50% NTS-NAT test + 40% Intermediate + 10% Matric.',
          citation: 'CUI Prospectus 2025/2026',
          lastVerified: 'February 2026'
        }
      }
    ]
  },
  {
    id: 'iba-karachi',
    name: 'Institute of Business Administration, Karachi',
    shortName: 'IBA Karachi',
    city: 'Karachi',
    otherCampuses: ['Main Campus (KU)', 'City Campus (Garden)'],
    sector: 'public',
    description: 'Pakistan’s premier public business and computer science school, originally established in 1955 with Wharton School collaboration. Elite finance, consulting, and tech alumni base.',
    knownFor: 'BBA, BS Computer Science, BS Economics & Mathematics, Accounting',
    generalFeeRange: 'PKR 650,000–850,000 / year',
    feeNote: 'Tuition billed per course credit. Needs-blind financial aid ensures admitted students are not turned away due to lack of funds.',
    officialWebsite: 'https://iba.edu.pk',
    typicalTiming: {
      applicationOpens: 'January (Round 1) / April (Round 2)',
      applicationCloses: 'Late February (R1) / Late May (R2)',
      testDates: 'Aptitude Test in March (R1) and June (R2)',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'IBA conducts two admission rounds annually. Applicants achieving direct cutoffs in Aptitude Test bypass the interview stage.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'Modern on-campus dormitories at Main Campus for both male and female outstation students.',
      oALevelEquivalence: 'IBCC equivalence required with min 60% for BBA/BS programs.',
      quotaSystems: 'National Talent Hunt Program (NTHP) fully finances students from underprivileged areas of Pakistan.',
      transport: 'Air-conditioned points run across Karachi.'
    },
    programs: [
      {
        id: 'iba-bba',
        name: 'Bachelor of Business Administration (BBA)',
        field: 'Business',
        degreeType: 'BBA',
        durationYears: 4,
        feePerYearPkr: 'PKR 780,000/year',
        approxClosingAggregate: 74.0,
        stretchThreshold: 69.0,
        safeThreshold: 78.0,
        seatsInfo: '~220 seats',
        formula: {
          formulaId: 'iba-aptitude-merit',
          formulaName: 'IBA Aptitude Test Evaluation Score',
          formulaType: 'standard_three',
          matricWeight: 0,
          interWeight: 20,
          testWeight: 80,
          testName: 'IBA Aptitude Written Test',
          testMaxMarks: 360,
          ruleDescription: '80% IBA Aptitude Test (English + Math section qualifying thresholds) + 20% Academic Performance / Interview.',
          citation: 'IBA Undergraduate Admission Policy 2025/2026 Directive',
          lastVerified: 'January 2026'
        }
      },
      {
        id: 'iba-cs',
        name: 'BS Computer Science',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 740,000/year',
        approxClosingAggregate: 72.0,
        stretchThreshold: 67.0,
        safeThreshold: 76.5,
        seatsInfo: '~120 seats',
        formula: {
          formulaId: 'iba-aptitude-cs',
          formulaName: 'IBA CS Aptitude Evaluation Formula',
          formulaType: 'standard_three',
          matricWeight: 0,
          interWeight: 20,
          testWeight: 80,
          testName: 'IBA CS Aptitude Test',
          testMaxMarks: 360,
          ruleDescription: '80% IBA Aptitude Test score + 20% Academic record.',
          citation: 'IBA School of Mathematics and Computer Science Regulations',
          lastVerified: 'January 2026'
        }
      }
    ]
  },
  {
    id: 'pieas',
    name: 'Pakistan Institute of Engineering and Applied Sciences',
    shortName: 'PIEAS',
    city: 'Islamabad',
    otherCampuses: ['Nilore'],
    sector: 'public',
    description: 'Premier nuclear and specialized science research university affiliated with PAEC. Rigorous engineering training with guaranteed career paths in national strategic organizations.',
    knownFor: 'Nuclear Engineering, Electrical Engineering, Mechanical, Computer Science',
    generalFeeRange: 'PKR 140,000–190,000 / year',
    feeNote: 'Highly subsidized federal government institution.',
    officialWebsite: 'https://pieas.edu.pk',
    typicalTiming: {
      applicationOpens: 'April',
      applicationCloses: 'Early June',
      testDates: 'PIEAS Written Admission Test in late June or July',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'Conducted in all major provincial capitals simultaneously.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'Mandatory/guaranteed residential hostel facilities in serene Nilore campus valley.',
      oALevelEquivalence: 'IBCC equivalence certificate with minimum 60% marks in Pre-Engineering subjects.',
      quotaSystems: 'Country-wide open merit based strictly on aggregate score.',
      transport: 'Designated PAEC transport buses connect to Rawalpindi & Islamabad city centers.'
    },
    programs: [
      {
        id: 'pieas-eng-ee-mech',
        name: 'BS Electrical / Mechanical / Nuclear Engineering',
        field: 'Engineering',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 165,000/year',
        approxClosingAggregate: 70.5,
        stretchThreshold: 66.0,
        safeThreshold: 74.0,
        seatsInfo: '~180 seats total',
        formula: {
          formulaId: 'pieas-written-test',
          formulaName: 'PIEAS Selection Aggregate Formula',
          formulaType: 'standard_three',
          matricWeight: 15,
          interWeight: 25,
          testWeight: 60,
          testName: 'PIEAS Written Admission Test',
          testMaxMarks: 100,
          ruleDescription: '60% PIEAS Written Test + 25% Intermediate (FSc / A-Level) + 15% Matric (SSC / O-Level).',
          citation: 'PIEAS Undergraduate Admissions Brochure & Academic Regulations',
          lastVerified: 'February 2026'
        }
      },
      {
        id: 'pieas-cs',
        name: 'BS Computer and Information Sciences',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 165,000/year',
        approxClosingAggregate: 73.0,
        stretchThreshold: 68.5,
        safeThreshold: 76.5,
        seatsInfo: '~60 seats',
        formula: {
          formulaId: 'pieas-written-test',
          formulaName: 'PIEAS Selection Aggregate Formula',
          formulaType: 'standard_three',
          matricWeight: 15,
          interWeight: 25,
          testWeight: 60,
          testName: 'PIEAS Written Test',
          testMaxMarks: 100,
          ruleDescription: '60% PIEAS Test + 25% Intermediate + 15% Matric.',
          citation: 'PIEAS UG Admissions Bulletin',
          lastVerified: 'February 2026'
        }
      }
    ]
  },
  {
    id: 'qau-islamabad',
    name: 'Quaid-i-Azam University',
    shortName: 'QAU',
    city: 'Islamabad',
    otherCampuses: [],
    sector: 'public',
    description: 'Pakistan’s highest-ranked public research university according to QS World Rankings, celebrated for its sprawling Margalla foothill campus, diverse provincial quotas, and pure sciences.',
    knownFor: 'Physics, Chemistry, Biotechnology, Economics, International Relations',
    generalFeeRange: 'PKR 85,000–140,000 / year (Regular Merit)',
    feeNote: 'Regular morning seats are heavily subsidized; self-finance evening shifts are also available.',
    officialWebsite: 'https://qau.edu.pk',
    typicalTiming: {
      applicationOpens: 'Mid-June (Fall semester)',
      applicationCloses: 'Late July',
      testDates: 'No entry test for natural sciences; purely academic percentage basis!',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'Most undergraduate programs in Natural & Social Sciences admit directly on Matric & Intermediate marks.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'Extensive on-campus hostels, allocated under strict provincial regional quota distribution.',
      oALevelEquivalence: 'IBCC Equivalence Certificate with min 50% for sciences.',
      quotaSystems: 'Federal provincial quota strictly enforced: Punjab 50%, Sindh Urban 7.5%, Sindh Rural 11.5%, KPK 11.5%, Balochistan 6%, AJK/GB 4%, FATA 4%.',
      transport: 'University bus service runs all routes across Islamabad and Rawalpindi.'
    },
    programs: [
      {
        id: 'qau-natural-sciences',
        name: 'BS Biotechnology / Biochemistry / Physics',
        field: 'Sciences',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 95,000/year',
        approxClosingAggregate: 86.5,
        stretchThreshold: 82.0,
        safeThreshold: 90.0,
        seatsInfo: '~60 seats per discipline',
        formula: {
          formulaId: 'qau-academic-only',
          formulaName: 'QAU Academic Merit Formula (No Entry Test)',
          formulaType: 'academic_only',
          matricWeight: 30,
          interWeight: 70,
          testWeight: 0,
          ruleDescription: '70% Intermediate (HSSC Part 1 or 2) + 30% Matriculation (SSC). No entry test required.',
          citation: 'QAU Undergraduate Admissions Committee Rules Section 2.1',
          lastVerified: 'February 2026'
        }
      },
      {
        id: 'qau-computer-science',
        name: 'BS Computer Science',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 110,000/year',
        approxClosingAggregate: 88.0,
        stretchThreshold: 84.0,
        safeThreshold: 91.0,
        seatsInfo: '~70 seats',
        formula: {
          formulaId: 'qau-academic-only',
          formulaName: 'QAU Academic Merit Formula',
          formulaType: 'academic_only',
          matricWeight: 30,
          interWeight: 70,
          testWeight: 0,
          ruleDescription: '70% Intermediate marks + 30% Matriculation marks.',
          citation: 'QAU Department of Computer Science Admissions Notice',
          lastVerified: 'February 2026'
        }
      }
    ]
  },
  {
    id: 'itu-lahore',
    name: 'Information Technology University',
    shortName: 'ITU',
    city: 'Lahore',
    otherCampuses: ['Arfa Software Technology Park'],
    sector: 'public',
    description: 'Modeled after MIT with heavy emphasis on tech entrepreneurship, software systems, and data science, located inside Pakistan’s premier tech skyscraper in Lahore.',
    knownFor: 'Computer Science, Artificial Intelligence, Software Engineering, Management & Tech',
    generalFeeRange: 'PKR 210,000–280,000 / year',
    feeNote: 'Subsidized Punjab public rate with tech endowment support.',
    officialWebsite: 'https://itu.edu.pk',
    typicalTiming: {
      applicationOpens: 'May',
      applicationCloses: 'Late June',
      testDates: 'ITU Admissions Test or NTS NAT in July',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'Applicants can submit ITU Test, NTS-NAT, or SAT-I scores.'
    },
    practicalInfo: {
      hostelAvailable: false,
      hostelNotes: 'University assists outstation students via partner private residences near Ferozepur Road.',
      oALevelEquivalence: 'IBCC Equivalence Certificate with min 60% for computing degrees.',
      quotaSystems: 'Open merit Punjab and nationwide quotas.',
      transport: 'Directly linked via Lahore Metro Bus (Qaddafi Stadium & Model Town stations).'
    },
    programs: [
      {
        id: 'itu-bs-cs',
        name: 'BS Computer Science',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 250,000/year',
        approxClosingAggregate: 79.5,
        stretchThreshold: 75.0,
        safeThreshold: 83.0,
        seatsInfo: '~150 seats',
        formula: {
          formulaId: 'itu-half-half',
          formulaName: 'ITU Combined Academic & Test Formula',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 40,
          testWeight: 50,
          testName: 'ITU Admission Test / NTS NAT',
          testMaxMarks: 100,
          ruleDescription: '50% ITU Entry Test (or NTS NAT) + 40% Intermediate + 10% Matric.',
          citation: 'ITU Lahore Prospectus 2025/2026',
          lastVerified: 'March 2026'
        }
      }
    ]
  },
  {
    id: 'ned-karachi',
    name: 'NED University of Engineering and Technology',
    shortName: 'NED',
    city: 'Karachi',
    otherCampuses: ['Main Campus (University Road)', 'LEJ Campus'],
    sector: 'public',
    description: 'Sindh’s premier and oldest public engineering institution, producing generations of civil, mechanical, and electrical engineers powering Pakistan’s industrial hubs.',
    knownFor: 'Civil Engineering, Mechanical, Electrical, Computer Systems',
    generalFeeRange: 'PKR 80,000–130,000 / year (Regular Merit)',
    feeNote: 'Subsidized fee for regular merit; self-finance seats available at higher slab.',
    officialWebsite: 'https://neduet.edu.pk',
    typicalTiming: {
      applicationOpens: 'June',
      applicationCloses: 'July',
      testDates: 'NED Entry Test (Phase 1 in July, Phase 2 in August)',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'Phase 1 test offered right after HSC exams; Phase 2 gives a second attempt opportunity.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'Hostel facilities available on campus for candidates from interior Sindh and other provinces.',
      oALevelEquivalence: 'IBCC Equivalence Certificate with minimum 60% aggregate.',
      quotaSystems: 'Karachi urban merit quota, Sindh rural districts, sports and donor quotas.',
      transport: 'NED Point buses operate on all Karachi main transit corridors.'
    },
    programs: [
      {
        id: 'ned-eng-civil-mech',
        name: 'BE Civil / Mechanical / Electrical Engineering',
        field: 'Engineering',
        degreeType: 'BE',
        durationYears: 4,
        feePerYearPkr: 'PKR 95,000/year',
        approxClosingAggregate: 76.5,
        stretchThreshold: 72.0,
        safeThreshold: 80.0,
        seatsInfo: '~180 seats per discipline',
        formula: {
          formulaId: 'ned-half-half',
          formulaName: 'NED University Merit Formula',
          formulaType: 'standard_three',
          matricWeight: 0,
          interWeight: 50,
          testWeight: 50,
          testName: 'NED Entry Test',
          testMaxMarks: 100,
          ruleDescription: '50% NED Entry Test score + 50% HSC / Intermediate (Pre-Engineering) percentage. Matriculation is not counted.',
          citation: 'NED University Admission Regulations Article 6',
          lastVerified: 'March 2026'
        }
      },
      {
        id: 'ned-cis',
        name: 'BS Computer Science & Information Technology',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 110,000/year',
        approxClosingAggregate: 81.0,
        stretchThreshold: 77.0,
        safeThreshold: 84.5,
        seatsInfo: '~120 seats',
        formula: {
          formulaId: 'ned-half-half',
          formulaName: 'NED University Merit Formula',
          formulaType: 'standard_three',
          matricWeight: 0,
          interWeight: 50,
          testWeight: 50,
          testName: 'NED Entry Test',
          testMaxMarks: 100,
          ruleDescription: '50% NED Entry Test + 50% Intermediate percentage.',
          citation: 'NED Admissions Office Guide',
          lastVerified: 'March 2026'
        }
      }
    ]
  },
  {
    id: 'aku-karachi',
    name: 'Aga Khan University',
    shortName: 'AKU',
    city: 'Karachi',
    otherCampuses: ['Stadium Road'],
    sector: 'private',
    description: 'Internationally acclaimed private medical and nursing university renowned for hospital clinical training, JCI accreditation, and high-impact medical research.',
    knownFor: 'MBBS, Nursing, Midwifery, Biomedical Sciences',
    generalFeeRange: 'PKR 2,400,000–2,800,000 / year',
    feeNote: 'Substantial need-based financial assistance available; admissions are strictly needs-blind.',
    officialWebsite: 'https://aku.edu',
    typicalTiming: {
      applicationOpens: 'March',
      applicationCloses: 'Mid-May',
      testDates: 'AKU Test held in June (multiple national and overseas centers)',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'Requires AKU Special Entrance Test + Multiple Mini Interviews (MMI) for shortlisted candidates.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'Modern on-campus student housing guaranteed for outstation students.',
      oALevelEquivalence: 'IBCC Equivalence with min 65% in Pre-Medical subjects.',
      quotaSystems: 'Purely open merit across Pakistan and international applicants.',
      transport: 'Secure campus with direct hospital shuttle connectivity.'
    },
    programs: [
      {
        id: 'aku-mbbs',
        name: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
        field: 'Medical',
        degreeType: 'MBBS',
        durationYears: 5,
        feePerYearPkr: 'PKR 2,650,000/year',
        approxClosingAggregate: 86.0,
        stretchThreshold: 82.0,
        safeThreshold: 89.0,
        seatsInfo: '~100 seats',
        formula: {
          formulaId: 'aku-admission-test',
          formulaName: 'AKU Medical Entrance & Interview Index',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 40,
          testWeight: 50,
          testName: 'AKU Special Entrance Test (MCQs + Reasoning)',
          testMaxMarks: 100,
          ruleDescription: '50% AKU Admission Test + 40% Intermediate Pre-Medical + 10% Matriculation, followed by MMI interviews.',
          citation: 'AKU Medical College Undergraduate Prospectus 2025/2026',
          lastVerified: 'January 2026'
        }
      }
    ]
  },
  {
    id: 'air-university',
    name: 'Air University',
    shortName: 'AU',
    city: 'Islamabad',
    otherCampuses: ['Multan', 'Kamra', 'Kharian'],
    sector: 'public',
    description: 'Chartered by the federal government under Pakistan Air Force, recognized for cybersecurity, aerospace, computer sciences, and avionics excellence.',
    knownFor: 'Cyber Security, Aerospace Engineering, Computer Science, Business',
    generalFeeRange: 'PKR 210,000–290,000 / year',
    feeNote: 'Subsidized federally chartered fee structure.',
    officialWebsite: 'https://au.edu.pk',
    typicalTiming: {
      applicationOpens: 'May (Phase 1) / July (Phase 2)',
      applicationCloses: 'July for main cycle',
      testDates: 'Air University Admission Test (AU AT) or NAT in July',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'Conducted computer-based at Islamabad campus and regional centers.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'Hostels available for both male and female outstation students.',
      oALevelEquivalence: 'IBCC Equivalence with min 60% for engineering/computing.',
      quotaSystems: 'Open merit + Shaheen Foundation & Defense personnel quota.',
      transport: 'Transport coverage across Rawalpindi and Islamabad.'
    },
    programs: [
      {
        id: 'air-cyber-sec',
        name: 'BS Cyber Security & Computer Science',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 260,000/year',
        approxClosingAggregate: 76.5,
        stretchThreshold: 72.0,
        safeThreshold: 80.0,
        seatsInfo: '~180 seats',
        formula: {
          formulaId: 'air-uni-test',
          formulaName: 'Air University Admission Test Formula',
          formulaType: 'standard_three',
          matricWeight: 15,
          interWeight: 35,
          testWeight: 50,
          testName: 'Air University Admission Test (AU CBT)',
          testMaxMarks: 100,
          ruleDescription: '50% AU Admission Test + 35% Intermediate + 15% Matriculation.',
          citation: 'Air University UG Prospectus 2025/2026',
          lastVerified: 'February 2026'
        }
      }
    ]
  },
  {
    id: 'bahria-university',
    name: 'Bahria University',
    shortName: 'BU',
    city: 'Islamabad',
    otherCampuses: ['Karachi', 'Lahore'],
    sector: 'public',
    description: 'Federal university chartered under Pakistan Navy, offering multidisciplinary programs in computing, maritime studies, psychology, and management sciences.',
    knownFor: 'Software Engineering, Information Technology, Maritime Studies, Psychology',
    generalFeeRange: 'PKR 220,000–290,000 / year',
    feeNote: 'Semester-wise billing with naval ward concessions.',
    officialWebsite: 'https://bahria.edu.pk',
    typicalTiming: {
      applicationOpens: 'June (Fall) / November (Spring)',
      applicationCloses: 'July (Fall) / December (Spring)',
      testDates: 'Computer-based entrance test in July',
      status: 'confirmed',
      cycleYear: '2026',
      notes: 'Admissions offered in Fall and Spring cycles.'
    },
    practicalInfo: {
      hostelAvailable: true,
      hostelNotes: 'Designated hostel arrangements in Islamabad E-8 / H-11 and Karachi.',
      oALevelEquivalence: 'IBCC Equivalence Certificate required.',
      quotaSystems: 'Open merit, Naval wards, Shuhada quota.',
      transport: 'Vast transit bus coverage across all campus cities.'
    },
    programs: [
      {
        id: 'bu-se-cs',
        name: 'BS Software Engineering',
        field: 'Computer Science',
        degreeType: 'BS',
        durationYears: 4,
        feePerYearPkr: 'PKR 260,000/year',
        approxClosingAggregate: 71.5,
        stretchThreshold: 67.0,
        safeThreshold: 75.0,
        seatsInfo: '~180 seats',
        formula: {
          formulaId: 'bahria-cbt-formula',
          formulaName: 'Bahria University CBT Merit Formula',
          formulaType: 'standard_three',
          matricWeight: 10,
          interWeight: 40,
          testWeight: 50,
          testName: 'Bahria CBT Entrance Test',
          testMaxMarks: 100,
          ruleDescription: '50% Bahria CBT Test + 40% Intermediate + 10% Matric.',
          citation: 'Bahria University Admissions Notification 2025/2026',
          lastVerified: 'January 2026'
        }
      }
    ]
  }
];
