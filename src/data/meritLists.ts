import { MeritListRecord, NewsAnnouncement } from '../types/notifications';

export const INITIAL_MERIT_LISTS: MeritListRecord[] = [
  {
    id: 'ml-nust-cs-round2',
    universityId: 'nust',
    universityShortName: 'NUST',
    programId: 'nust-cs-se',
    programName: 'BS Computer Science & Software Engineering',
    listRound: 2,
    cycleYear: '2026',
    closingAggregate: 79.42,
    publishDate: '2026-08-12',
    feePaymentDeadline: '2026-08-18',
    officialPortalUrl: 'https://nust.edu.pk/admissions/undergraduate/selection-list',
    notes: '2nd selection list for SEECS Islamabad. Selected candidates must deposit fee challan at any HBL branch before August 18 to retain seat and qualify for upward upgrading in 3rd list.'
  },
  {
    id: 'ml-fast-isb-cs-round1',
    universityId: 'fast-nuces',
    universityShortName: 'FAST-NUCES',
    programId: 'fast-bs-cs',
    programName: 'BS Computer Science (Islamabad Campus)',
    listRound: 1,
    cycleYear: '2026',
    closingAggregate: 73.80,
    publishDate: '2026-07-28',
    feePaymentDeadline: '2026-08-04',
    officialPortalUrl: 'https://nu.edu.pk/admissions/merit-lists',
    notes: '1st Merit List announced based on NU Computer Test. Fee challan available on admission portal.'
  },
  {
    id: 'ml-uet-lhr-ee-round1',
    universityId: 'uet-lahore',
    universityShortName: 'UET Lahore',
    programId: 'uet-eng-ee-mech',
    programName: 'BSc Electrical / Mechanical Engineering',
    listRound: 1,
    cycleYear: '2026',
    closingAggregate: 74.85,
    publishDate: '2026-08-08',
    feePaymentDeadline: '2026-08-14',
    officialPortalUrl: 'https://admission.uet.edu.pk',
    notes: 'Category A1 (Subsidized Punjab Domicile) 1st Merit List published. Original document verification mandatory at campus.'
  },
  {
    id: 'ml-kemu-mbbs-round1',
    universityId: 'kemu-uhs',
    universityShortName: 'KEMU',
    programId: 'kemu-mbbs',
    programName: 'Bachelor of Medicine & Surgery (MBBS)',
    listRound: 1,
    cycleYear: '2026',
    closingAggregate: 91.68,
    publishDate: '2026-11-20',
    feePaymentDeadline: '2026-11-27',
    officialPortalUrl: 'https://uhs.edu.pk/public-medical-colleges-merit',
    notes: 'UHS Centralized Admission Punjab Public Medical Colleges 1st Selection List. Highest provincial merit cutoff.'
  }
];

export const INITIAL_NEWS_ANNOUNCEMENTS: NewsAnnouncement[] = [
  {
    id: 'news-pmdc-mdcat-official',
    title: 'PMDC Confirms National MDCAT Format & Schedule',
    summary: 'The Pakistan Medical & Dental Council (PMDC) has formally confirmed the official test structure with 200 questions (50% MDCAT weight in MBBS admission) and standardized provincial exam centers.',
    sourceAuthority: 'Pakistan Medical & Dental Council (PMDC)',
    datePublished: '2026-07-15',
    isMajorNotification: true,
    externalUrl: 'https://pmdc.pk',
    relatedField: 'Medical'
  },
  {
    id: 'news-turkiye-burslari-call',
    title: 'Türkiye Bursları Government Scholarship 2026/2027 Opens for Pakistan',
    summary: 'Presidency for Turks Abroad (YTB) has opened the official TBBS portal for undergraduate Pakistani applicants. 100% full tuition, free dormitory, monthly allowance, and travel flight covered.',
    sourceAuthority: 'YTB / Embassy of the Republic of Türkiye, Islamabad',
    datePublished: '2026-01-10',
    isMajorNotification: true,
    externalUrl: 'https://tbbs.turkiyeburslari.gov.tr',
    relatedField: 'Study Abroad'
  },
  {
    id: 'news-ibcc-equivalence-portal',
    title: 'IBCC Enhances Online Equivalence Verification for O/A-Level Students',
    summary: 'Inter Board Coordination Commission (IBCC) now allows direct digital verification links to university admission portals, speeding up O/A-Level provisional admission clearance.',
    sourceAuthority: 'Inter Board Coordination Commission (IBCC)',
    datePublished: '2026-05-18',
    isMajorNotification: false,
    externalUrl: 'https://ibcc.edu.pk',
    relatedField: 'All'
  },
  {
    id: 'news-hec-ug-policy-revision',
    title: 'HEC Uniform Admission Schedule & Test Equivalencies Advisory',
    summary: 'Higher Education Commission (HEC) issues directives to public and chartered universities to standardize test dates and recognize provincial and national testing scores.',
    sourceAuthority: 'Higher Education Commission (HEC Pakistan)',
    datePublished: '2026-06-02',
    isMajorNotification: true,
    externalUrl: 'https://hec.gov.pk',
    relatedField: 'General'
  },
  {
    id: 'news-fast-computing-intake',
    title: 'FAST-NUCES Expands Artificial Intelligence & Cyber Security Intake for 2026',
    summary: 'National University of Computer & Emerging Sciences announces additional computing seats across Islamabad, Lahore, and Karachi campuses due to surging applicant volume.',
    sourceAuthority: 'FAST-NUCES Academic Directorate',
    datePublished: '2026-06-25',
    isMajorNotification: false,
    externalUrl: 'https://nu.edu.pk',
    relatedField: 'Computing'
  },
  {
    id: 'news-nust-net4-registration',
    title: 'NUST Series-4 Entry Test (NET-4) Final Application Deadline',
    summary: 'National University of Sciences & Technology (NUST) announces final registration round for Computer-Based NET series in Islamabad, Quetta, and Gilgit.',
    sourceAuthority: 'NUST Admissions Directorate',
    datePublished: '2026-06-15',
    isMajorNotification: true,
    externalUrl: 'https://nust.edu.pk',
    relatedField: 'Engineering & Computing'
  }
];
