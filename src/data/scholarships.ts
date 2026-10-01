import { Scholarship } from '../types';

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'turkiye-burslari-ug',
    name: 'Türkiye Bursları Government Scholarship',
    provider: 'Presidency for Turks Abroad and Related Communities (YTB), Turkey',
    providerType: 'foreign_government',
    type: 'merit_based',
    destination: 'abroad',
    targetCountries: ['Turkey'],
    coverage: 'Fully Funded (100% Tuition, Monthly Stipend, Free Accommodation, Health Insurance, Round-trip Flight, 1-Year Turkish Language Course)',
    plainEligibility: 'Pakistani citizens under 21 years old with minimum 70% in Matric and Intermediate (or expected A-Levels). Minimum 90% for Medical/Dental/Pharmacy.',
    detailedCriteria: {
      minPercentage: 70,
      streamAccepted: 'Matric/FSc and O/A-Levels eligible',
      notes: 'No application fee. Selection includes online review of academic transcript, personal statement, followed by in-person interview in Islamabad or Karachi.'
    },
    deadline: '2026-02-20',
    deadlineDisplay: 'February 20 (Annual Cycle)',
    deadlineStatus: 'confirmed',
    officialUrl: 'https://tbbs.turkiyeburslari.gov.tr',
    summary: 'One of the most generous and prestigious international scholarships for Pakistani students, offering full undergraduate study across 100+ Turkish public universities.'
  },
  {
    id: 'stipendium-hungaricum',
    name: 'Stipendium Hungaricum Scholarship (Hungary / HEC)',
    provider: 'Government of Hungary & HEC Pakistan',
    providerType: 'foreign_government',
    type: 'merit_based',
    destination: 'abroad',
    targetCountries: ['Hungary'],
    coverage: 'Full Tuition Fee, Monthly Stipend, Free Dormitory or Accommodation Allowance, Medical Insurance',
    plainEligibility: 'Pakistani/AJK nationals with minimum 65% in HSSC/Intermediate or equivalence. Requires valid HEC HAT test score or nominee shortlisting.',
    detailedCriteria: {
      minPercentage: 65,
      streamAccepted: 'Pre-Engineering, Pre-Medical, ICS, Humanities',
      notes: 'Applicants must apply on both the Tempus Public Foundation portal and the HEC e-portal before the deadline.'
    },
    deadline: '2026-01-16',
    deadlineDisplay: 'January 16 (Annual Cycle)',
    deadlineStatus: 'confirmed',
    officialUrl: 'https://stipendiumhungaricum.hu',
    summary: 'Fully accredited European undergraduate degree programs in English across top Hungarian universities, managed jointly with Higher Education Commission Pakistan.'
  },
  {
    id: 'lums-nop',
    name: 'LUMS National Outreach Programme (NOP)',
    provider: 'Lahore University of Management Sciences (LUMS)',
    providerType: 'university',
    type: 'need_and_merit',
    destination: 'pakistan',
    coverage: '100% Full Financial Aid (Full Tuition, Hostel, Books, Living Stipend, Travel & SAT Test Registration Reimbursed)',
    plainEligibility: 'First-year Intermediate or A-Level students across Pakistan with at least 80% marks in Matriculation and proven financial constraint.',
    detailedCriteria: {
      minPercentage: 80,
      maxFamilyIncomePkrMonthly: 60000,
      notes: 'High school students apply during their FSc Part-1 year. Shortlisted students attend a fully-funded summer coaching academy at LUMS to prepare for the LUMS admission test.'
    },
    deadline: '2026-03-31',
    deadlineDisplay: 'March 31',
    deadlineStatus: 'confirmed',
    officialUrl: 'https://nop.lums.edu.pk',
    summary: 'Prestigious social mobility scholarship that brings brilliant, low-income students from remote districts and small towns to LUMS on a full ride.'
  },
  {
    id: 'iba-nthp',
    name: 'IBA National Talent Hunt Program (NTHP)',
    provider: 'Institute of Business Administration (IBA) & Ihsan Trust',
    providerType: 'university',
    type: 'need_and_merit',
    destination: 'pakistan',
    coverage: '100% Tuition Waiver, Free Accommodation, Monthly Stipend, Preparatory Orientation & Mentorship',
    plainEligibility: 'Candidates from Balochistan, KPK, Gilgit-Baltistan, AJK, interior Sindh, and southern Punjab with 70% or above in HSSC-I or SSC.',
    detailedCriteria: {
      minPercentage: 70,
      maxFamilyIncomePkrMonthly: 65000,
      notes: 'Selected scholars attend a comprehensive two-month preparatory training session at IBA Karachi before taking the formal IBA Entrance Examination.'
    },
    deadline: '2026-04-15',
    deadlineDisplay: 'April 15',
    deadlineStatus: 'confirmed',
    officialUrl: 'https://nthp.iba.edu.pk',
    summary: 'Flagship inclusion initiative transforming lives of meritorious students from underprivileged districts by preparing and sponsoring them through IBA degree programs.'
  },
  {
    id: 'hec-need-based',
    name: 'HEC Need-Based Undergraduate Scholarship Program',
    provider: 'Higher Education Commission of Pakistan (HEC)',
    providerType: 'government',
    type: 'need_based',
    destination: 'pakistan',
    coverage: '100% Tuition Fee Coverage + PKR 6,000 monthly living allowance for the duration of the degree',
    plainEligibility: 'Enrolled or newly admitted students in designated public universities across Pakistan whose family income does not exceed PKR 45,000/month.',
    detailedCriteria: {
      maxFamilyIncomePkrMonthly: 45000,
      provincesEligible: ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'AJK', 'Gilgit-Baltistan', 'Islamabad'],
      notes: 'Application is processed through the Financial Aid Office (FAO) of the respective participating public university upon securing admission.'
    },
    deadline: '2026-09-30',
    deadlineDisplay: 'September 30 (Post-Admission Cycle)',
    deadlineStatus: 'estimated',
    officialUrl: 'https://hec.gov.pk/english/services/students/HEC-Need-Based-Scholarships',
    summary: 'The largest federal safety net supporting financially challenged students admitted into public sector universities nationwide.'
  },
  {
    id: 'peef-undergraduate',
    name: 'Punjab Educational Endowment Fund (PEEF) Scholarship',
    provider: 'Government of the Punjab',
    providerType: 'government',
    type: 'need_and_merit',
    destination: 'pakistan',
    coverage: '100% Tuition Fee Waiver + Monthly Boarding/Day Scholar Stipend',
    plainEligibility: 'Punjab domicile holders with at least 60% marks in Intermediate exams (BISE Punjab) with total family monthly income equal to or less than PKR 60,000.',
    detailedCriteria: {
      minPercentage: 60,
      maxFamilyIncomePkrMonthly: 60000,
      provincesEligible: ['Punjab'],
      notes: 'Special quota exists for orphans, children of grade 1-4 government employees, minority students, and special need students.'
    },
    deadline: '2026-10-15',
    deadlineDisplay: 'October 15 (Annual Post-Result Cycle)',
    deadlineStatus: 'estimated',
    officialUrl: 'https://peef.org.pk',
    summary: 'Premier provincial scholarship fund established by the Government of Punjab supporting thousands of undergraduate scholars annually.'
  },
  {
    id: 'csc-chinese-government',
    name: 'Chinese Government Scholarship (CSC - Type A via HEC)',
    provider: 'China Scholarship Council (CSC) & Ministry of Education, China',
    providerType: 'foreign_government',
    type: 'merit_based',
    destination: 'abroad',
    targetCountries: ['China'],
    coverage: 'Full Tuition Waiver, On-campus Free Dormitory, Comprehensive Medical Insurance, Monthly Living Stipend (~2,500 RMB/month)',
    plainEligibility: 'Pakistani / AJK citizens under 25 years old with completed High School / FSc / A-Levels with at least 70% marks.',
    detailedCriteria: {
      minPercentage: 70,
      streamAccepted: 'All academic streams',
      notes: 'HEC conducts nomination via HAT / test score or academic merit; applications also submitted on Chinese CSC online system.'
    },
    deadline: '2026-01-30',
    deadlineDisplay: 'January 30 (Annual Cycle)',
    deadlineStatus: 'confirmed',
    officialUrl: 'https://www.campuschina.org',
    summary: 'Extremely popular fully-funded scholarship for Pakistani students to study Engineering, Computer Science, and Sciences at top Chinese Double First Class universities.'
  },
  {
    id: 'scottish-women-ug',
    name: 'Scottish Government Pakistan Scholarship for Young Women',
    provider: 'Scottish Government & British Council Pakistan',
    providerType: 'foreign_government',
    type: 'need_and_merit',
    destination: 'pakistan',
    coverage: 'Full Tuition Fees for four-year undergraduate degree, University Hostel Charges, Travel Allowance to and from university',
    plainEligibility: 'Pakistani female students residing in Pakistan with confirmed admission in any HEC-recognized public university in Education, Health, STEM, or Food Security.',
    detailedCriteria: {
      provincesEligible: ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'AJK', 'Gilgit-Baltistan'],
      notes: 'Young women from disadvantaged backgrounds, rural areas, and minority communities are strongly encouraged and prioritized.'
    },
    deadline: '2026-09-15',
    deadlineDisplay: 'September 15',
    deadlineStatus: 'estimated',
    officialUrl: 'https://www.britishcouncil.pk/programmes/education/scholarships/scotland-pakistan-scholarships',
    summary: 'Dedicated financial support for aspiring female undergraduate leaders in Pakistan, managed by the British Council.'
  },
  {
    id: 'ogdcl-talent-hunt',
    name: 'OGDCL National Talent Hunt Program',
    provider: 'Oil & Gas Development Company Limited (OGDCL) CSR',
    providerType: 'foundation',
    type: 'need_and_merit',
    destination: 'pakistan',
    coverage: 'Full Tuition Fee, Boarding / Lodging, Living Allowance and Book Grant',
    plainEligibility: 'Students from oil and gas producing districts (Balochistan, Sindh, KPK, and Punjab) who secure admission in partner universities (NUST, IBA, QAU, Sukkur IBA).',
    detailedCriteria: {
      minPercentage: 65,
      maxFamilyIncomePkrMonthly: 50000,
      notes: 'Must hold domicile of designated operational districts of OGDCL.'
    },
    deadline: '2026-08-30',
    deadlineDisplay: 'August 30',
    deadlineStatus: 'estimated',
    officialUrl: 'https://ogdcl.com/corporate-social-responsibility',
    summary: 'Corporate social initiative providing end-to-end higher education funding for students belonging to resource-rich yet underdeveloped districts.'
  },
  {
    id: 'giki-financial-aid',
    name: 'GIKI Need-Based Financial Assistance & KPK Endowment',
    provider: 'Ghulam Ishaq Khan Institute & KPK Higher Education',
    providerType: 'university',
    type: 'need_based',
    destination: 'pakistan',
    coverage: '50% to 100% Tuition Fee Waiver and Interest-Free Educational Loan / Grants',
    plainEligibility: 'Admitted students with demonstrated economic need. Special 100% fully-funded provincial endowment seats for top KPK domiciled candidates.',
    detailedCriteria: {
      notes: 'Financial aid application must be submitted along with GIKI admission test form with family income proofs and bank statements.'
    },
    deadline: '2026-06-25',
    deadlineDisplay: 'June 25 (Concurrent with Admission)',
    deadlineStatus: 'confirmed',
    officialUrl: 'https://giki.edu.pk/admissions/financial-assistance',
    summary: 'Ensures that meritorious candidates who qualify GIKI’s demanding entrance test are not hindered by its private residential fee structure.'
  }
];
