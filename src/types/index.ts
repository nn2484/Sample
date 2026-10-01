export type StudyField = 'Engineering' | 'Computer Science' | 'Medical' | 'Business' | 'Sciences' | 'Humanities';
export type Sector = 'public' | 'private';
export type AcademicStream = 'fsc' | 'o_a_level';
export type BudgetTier = 'public' | 'private' | 'need_scholarship';

export interface AdmissionFormula {
  formulaId: string;
  formulaName: string;
  formulaType: 'standard_three' | 'academic_only' | 'higher_of_matric_inter' | 'test_heavy';
  matricWeight: number; // e.g. 10
  interWeight: number;  // e.g. 15
  testWeight: number;   // e.g. 75
  testName?: string;    // e.g. "NET (NUST Entry Test)"
  testMaxMarks?: number;// e.g. 200
  ruleDescription: string;
  citation: string;     // Official source document
  lastVerified: string; // e.g. "February 2026"
}

export interface Program {
  id: string;
  name: string;
  field: StudyField;
  degreeType: string; // "BS", "MBBS", "BDS", "BBA", etc.
  durationYears: number;
  formula: AdmissionFormula;
  approxClosingAggregate?: number; // Historical closing aggregate %
  stretchThreshold?: number; // Target cutoff boundary
  safeThreshold?: number;
  feePerYearPkr: string; // e.g. "PKR 180,000–220,000/year"
  seatsInfo?: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  city: string;
  otherCampuses?: string[];
  sector: Sector;
  description: string;
  knownFor: string;
  generalFeeRange: string;
  feeNote: string;
  officialWebsite: string;
  typicalTiming: {
    applicationOpens: string;
    applicationCloses: string;
    testDates: string;
    status: 'confirmed' | 'estimated';
    cycleYear: string;
    notes: string;
  };
  practicalInfo: {
    hostelAvailable: boolean;
    hostelNotes: string;
    oALevelEquivalence: string;
    quotaSystems: string;
    transport?: string;
  };
  programs: Program[];
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  providerType: 'government' | 'university' | 'foreign_government' | 'foundation';
  type: 'need_based' | 'merit_based' | 'need_and_merit';
  destination: 'pakistan' | 'abroad';
  targetCountries?: string[];
  coverage: string; // "Full Tuition", "Tuition + Monthly Stipend", etc.
  plainEligibility: string;
  detailedCriteria: {
    minPercentage?: number;
    provincesEligible?: string[];
    maxFamilyIncomePkrMonthly?: number;
    streamAccepted?: string;
    notes?: string;
  };
  deadline: string; // YYYY-MM-DD
  deadlineDisplay: string;
  deadlineStatus: 'confirmed' | 'estimated';
  officialUrl: string;
  summary: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Academic' | 'Identity' | 'Domicile & Quota' | 'Institutional & Board';
  description: string;
  requiredForFSc: boolean;
  requiredForOALevels: boolean;
  isMandatory: boolean;
  specialTip?: string;
}

export interface UniversityChecklist {
  universityId: string;
  universityName: string;
  streamSpecificNotes: {
    fsc: string;
    oALevel: string;
  };
  documents: DocumentItem[];
}

export interface RoadmapStep {
  id: string;
  stageNumber: number;
  title: string;
  timingWindow: string;
  description: string;
  actions: string[];
  watchOutTraps: string[];
  linkedTool?: {
    toolName: 'calculator' | 'checklist' | 'scholarships' | 'directory';
    param?: string;
    buttonLabel: string;
  };
}

export interface RoadmapTrack {
  id: string;
  title: string;
  subtitle: string;
  trackType: 'pakistan' | 'abroad';
  targetField: string;
  summary: string;
  honestRealityCheck: string;
  steps: RoadmapStep[];
}

export interface UserProfile {
  matricPercentage: number | null;
  intermediatePercentage: number | null;
  isPredictedInter: boolean;
  academicStream: AcademicStream;
  fieldsOfInterest: StudyField[];
  preferredCity: string;
  canRelocate: boolean;
  budgetTier: BudgetTier;
}

export interface Bookmark {
  id: string;
  itemType: 'university' | 'program' | 'scholarship';
  itemId: string;
  title: string;
  subtitle: string;
  deadlineDate?: string;
  deadlineStatus?: 'confirmed' | 'estimated';
  linkTarget?: string;
  savedAt: string;
  reminderScheduled?: boolean;
}
