import { UniversityChecklist } from '../types';

export const UNIVERSITY_CHECKLISTS: Record<string, UniversityChecklist> = {
  nust: {
    universityId: 'nust',
    universityName: 'National University of Sciences and Technology (NUST)',
    streamSpecificNotes: {
      fsc: 'FSc students must submit SSC Certificate and HSSC Part-I marks sheet with a Hope Certificate from their college principal if awaiting final Part-II board results.',
      oALevel: 'O/A-Level candidates must possess an IBCC Equivalence Certificate with minimum 60% marks in Science/Pre-Engineering or relevant stream. Cambridge Statement of Results alone is not sufficient for final registration.'
    },
    documents: [
      {
        id: 'doc-ssc-matric',
        title: 'Matric / SSC Certificate & DMC',
        category: 'Academic',
        description: 'Original and 2 attested photocopies of Matric / SSC Sanad (Certificate) and Detailed Marks Certificate (DMC) issued by the relevant BISE.',
        requiredForFSc: true,
        requiredForOALevels: false,
        isMandatory: true,
        specialTip: 'Attestation should be from a Grade 17+ Government Gazette Officer or IBCC.'
      },
      {
        id: 'doc-ibcc-olevel',
        title: 'IBCC Equivalence Certificate (O-Level)',
        category: 'Academic',
        description: 'Official Equivalence Certificate issued by the Inter Board Coordination Commission (IBCC) for Cambridge O-Level / IGCSE.',
        requiredForFSc: false,
        requiredForOALevels: true,
        isMandatory: true,
        specialTip: 'IBCC equivalence can take 10–15 business days to process. Apply as early as possible.'
      },
      {
        id: 'doc-hssc-inter',
        title: 'Intermediate / HSSC Result Card or Hope Certificate',
        category: 'Academic',
        description: 'HSSC Part-I DMC (plus Hope Certificate on college letterhead stating expected marks >= 60%) or complete HSSC Certificate.',
        requiredForFSc: true,
        requiredForOALevels: false,
        isMandatory: true
      },
      {
        id: 'doc-ibcc-alevel',
        title: 'IBCC Equivalence Certificate (A-Level)',
        category: 'Academic',
        description: 'Official IBCC Equivalence Certificate for Cambridge / Edexcel A-Levels. Provisional equivalence allowed during initial admission if awaiting result.',
        requiredForFSc: false,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-cnic-bform',
        title: 'CNIC / Smart B-Form Copy',
        category: 'Identity',
        description: 'Computerized National Identity Card (CNIC) or NADRA Smart B-Form for applicants under 18 years of age.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true,
        specialTip: 'Bring the original CNIC/B-Form to the NET examination hall. Entry is strictly denied without original ID.'
      },
      {
        id: 'doc-father-cnic',
        title: 'Father / Guardian CNIC Copy',
        category: 'Identity',
        description: 'Attested photocopy of Father or legal guardian’s CNIC.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-photos',
        title: 'Passport-Sized Photographs (4 Copies)',
        category: 'Identity',
        description: '4 recent color passport-sized photographs with blue background, candidate name written on reverse.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-domicile',
        title: 'Domicile Certificate',
        category: 'Domicile & Quota',
        description: 'Candidate’s or father’s domicile certificate. Essential if applying for Balochistan, FATA, or reserved quota categories.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: false,
        specialTip: 'Required unconditionally for quota seats; recommended for all public records.'
      },
      {
        id: 'doc-character',
        title: 'Character Certificate',
        category: 'Institutional & Board',
        description: 'Conduct and character certificate issued by the Head of the last attended school or college.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      }
    ]
  },
  'fast-nuces': {
    universityId: 'fast-nuces',
    universityName: 'FAST-NUCES (All Campuses)',
    streamSpecificNotes: {
      fsc: 'FAST accepts HSSC Part 1 marks for admission merit calculations. Final confirmation requires minimum 50% in complete HSSC.',
      oALevel: 'O/A-Level students need IBCC Equivalence with minimum 50% for Computing programs and 60% for Engineering programs.'
    },
    documents: [
      {
        id: 'doc-ssc-matric',
        title: 'Matric / SSC Result Card & Certificate',
        category: 'Academic',
        description: 'Attested copy of SSC marks sheet and certificate from respective Board of Intermediate and Secondary Education.',
        requiredForFSc: true,
        requiredForOALevels: false,
        isMandatory: true
      },
      {
        id: 'doc-ibcc-olevel',
        title: 'IBCC Equivalence Certificate (O-Levels)',
        category: 'Academic',
        description: 'Original IBCC equivalence document certifying at least 8 subjects including English, Urdu, Islamiyat, Pak Studies, Math, and 3 sciences.',
        requiredForFSc: false,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-hssc-fast',
        title: 'HSSC Part-I / Part-II Marksheet',
        category: 'Academic',
        description: 'Attested copy of HSSC Part 1 or combined HSSC result sheet.',
        requiredForFSc: true,
        requiredForOALevels: false,
        isMandatory: true
      },
      {
        id: 'doc-ibcc-alevel-fast',
        title: 'IBCC Equivalence Certificate (A-Levels)',
        category: 'Academic',
        description: 'Provisional or final equivalence issued by IBCC for A-Levels.',
        requiredForFSc: false,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-cnic-bform',
        title: 'CNIC / B-Form of Candidate',
        category: 'Identity',
        description: 'Copy of Computerized CNIC or NADRA B-Form.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-fast-affidavit',
        title: 'Affidavit / Undertaking of Non-Political Affiliation',
        category: 'Institutional & Board',
        description: 'FAST standard undertaking printed on PKR 50–100 non-judicial stamp paper attested by Oath Commissioner affirming campus code of conduct.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true,
        specialTip: 'FAST strictly enforces zero political affiliation on all campuses.'
      },
      {
        id: 'doc-photos-fast',
        title: 'Passport-Sized Photographs (6 Copies)',
        category: 'Identity',
        description: 'Recent photographs with light blue or white background.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      }
    ]
  },
  'uet-lahore': {
    universityId: 'uet-lahore',
    universityName: 'University of Engineering and Technology (UET Lahore)',
    streamSpecificNotes: {
      fsc: 'Must have FSc Pre-Engineering or ICS (with Math, Physics, and CS) with minimum 60% marks excluding sports/Hafiz-e-Quran marks.',
      oALevel: 'Requires IBCC Equivalence Certificate with minimum 60% marks in relevant engineering combinations.'
    },
    documents: [
      {
        id: 'doc-ssc-matric',
        title: 'Matriculation Sanad & DMC',
        category: 'Academic',
        description: 'Attested copy of SSC certificate and DMC.',
        requiredForFSc: true,
        requiredForOALevels: false,
        isMandatory: true
      },
      {
        id: 'doc-ibcc-olevel',
        title: 'IBCC Equivalence Certificate (O-Levels)',
        category: 'Academic',
        description: 'Official IBCC certificate.',
        requiredForFSc: false,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-hssc-inter',
        title: 'HSSC Pre-Engineering Result Card',
        category: 'Academic',
        description: 'Attested copy of intermediate result card.',
        requiredForFSc: true,
        requiredForOALevels: false,
        isMandatory: true
      },
      {
        id: 'doc-ecat-admit-card',
        title: 'ECAT Admit Card & Score Printout',
        category: 'Academic',
        description: 'Printout of official ECAT result issued by UET Lahore.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-domicile-punjab',
        title: 'Punjab Domicile Certificate (Mandatory)',
        category: 'Domicile & Quota',
        description: 'Original domicile certificate of the candidate (or specific district for regional quota categories).',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true,
        specialTip: 'UET Category A (subsidized) seats strictly require Punjab domicile verification.'
      },
      {
        id: 'doc-medical-fitness',
        title: 'Medical Fitness Certificate',
        category: 'Institutional & Board',
        description: 'Physical fitness certificate on UET prescribed format signed by a registered medical practitioner (MBBS).',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-hafiz-quran',
        title: 'Hafiz-e-Quran Certificate (If Applicable)',
        category: 'Academic',
        description: 'Sanad from Wifaq-ul-Madaris or recognized Board if claiming Hafiz-e-Quran 20 additional test marks.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: false
      }
    ]
  },
  'kemu-uhs': {
    universityId: 'kemu-uhs',
    universityName: 'King Edward Medical University / Public Medical Colleges (UHS)',
    streamSpecificNotes: {
      fsc: 'Minimum 60% in HSSC Pre-Medical is statutory eligibility under PMDC regulations.',
      oALevel: 'Mandatory IBCC Equivalence in Pre-Medical subjects with min 60% marks.'
    },
    documents: [
      {
        id: 'doc-ssc-matric',
        title: 'Matric / SSC Certificate & DMC',
        category: 'Academic',
        description: 'Attested copy of Secondary School Certificate.',
        requiredForFSc: true,
        requiredForOALevels: false,
        isMandatory: true
      },
      {
        id: 'doc-ibcc-olevel',
        title: 'IBCC Equivalence Certificate (O-Levels)',
        category: 'Academic',
        description: 'Official IBCC certificate.',
        requiredForFSc: false,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-hssc-inter',
        title: 'HSSC Pre-Medical Result Card',
        category: 'Academic',
        description: 'Detailed marks certificate in Biology, Chemistry, and Physics.',
        requiredForFSc: true,
        requiredForOALevels: false,
        isMandatory: true
      },
      {
        id: 'doc-mdcat-result',
        title: 'Official PMDC MDCAT Result Card',
        category: 'Academic',
        description: 'Verified MDCAT result card with passing threshold (55% for MBBS, 50% for BDS).',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-domicile-punjab',
        title: 'Punjab Domicile Certificate & Identity Card',
        category: 'Domicile & Quota',
        description: 'Candidate domicile of Punjab district. Father’s domicile also scrutinized in case of dual claims.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-pmdc-affidavit',
        title: 'Affidavit on Stamp Paper (Rs. 100)',
        category: 'Institutional & Board',
        description: 'Undertaking regarding compliance with PMDC & UHS rules, verified by Notary Public.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-photos-white',
        title: 'Passport Photos (White Background, 6 Copies)',
        category: 'Identity',
        description: 'Recent photographs specifically with white background as required by UHS/PMDC.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      }
    ]
  },
  'giki': {
    universityId: 'giki',
    universityName: 'Ghulam Ishaq Khan Institute (GIKI)',
    streamSpecificNotes: {
      fsc: 'Minimum 60% in HSSC Pre-Engineering or ICS group.',
      oALevel: 'Requires IBCC Equivalence Certificate with minimum 60% marks in Science subjects.'
    },
    documents: [
      {
        id: 'doc-ssc-matric',
        title: 'Matric / SSC Marks Sheet',
        category: 'Academic',
        description: 'Copy of SSC DMC.',
        requiredForFSc: true,
        requiredForOALevels: false,
        isMandatory: true
      },
      {
        id: 'doc-ibcc-olevel',
        title: 'IBCC Equivalence Certificate (O-Levels)',
        category: 'Academic',
        description: 'Official IBCC certificate.',
        requiredForFSc: false,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-hssc-inter',
        title: 'HSSC Marks Sheet / Hope Certificate',
        category: 'Academic',
        description: 'HSSC Part 1 DMC with Hope Certificate from college principal.',
        requiredForFSc: true,
        requiredForOALevels: false,
        isMandatory: true
      },
      {
        id: 'doc-cnic-bform',
        title: 'CNIC / B-Form of Candidate',
        category: 'Identity',
        description: 'Copy of Computerized CNIC or Smart B-Form.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-giki-medical',
        title: 'GIKI Medical Fitness Form',
        category: 'Institutional & Board',
        description: 'Completed medical certificate signed by an authorized physician confirming fitness for residential life.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      }
    ]
  },
  'lums': {
    universityId: 'lums',
    universityName: 'Lahore University of Management Sciences (LUMS)',
    streamSpecificNotes: {
      fsc: 'Requires at least 70% in Matric and Intermediate for engineering/science; 65% for humanities/business.',
      oALevel: 'Requires at least 8 O-Level subjects with good grades and 3 full-credit A-Level subjects (excluding General Paper/Thinking Skills).'
    },
    documents: [
      {
        id: 'doc-academic-transcripts',
        title: 'Official Transcripts (SSC/O-Level & HSSC/A-Level)',
        category: 'Academic',
        description: 'Complete high school certified grade records including internal school report cards if applicable.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-sat-score-report',
        title: 'Official SAT / LCAT Score Report',
        category: 'Academic',
        description: 'Direct College Board score send to LUMS (DI Code: 0513) or LCAT registration record.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-personal-statement',
        title: 'Personal Statement & Essay Submissions',
        category: 'Institutional & Board',
        description: 'Reflective essays completed within the online admissions portal detailing academic intellectual interests and life experiences.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-teacher-recommendation',
        title: 'Teacher Evaluation & Recommendation Letters (2)',
        category: 'Institutional & Board',
        description: 'Confidential teacher references submitted directly by school educators via the LUMS portal.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-cnic-bform',
        title: 'Candidate & Guardian CNIC / B-Form',
        category: 'Identity',
        description: 'Copy of identification documents.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      }
    ]
  },
  'generic': {
    universityId: 'generic',
    universityName: 'Standard University Admission Checklist',
    streamSpecificNotes: {
      fsc: 'Standard documentation for Pakistani Board (BISE) stream applicants.',
      oALevel: 'Standard documentation for Cambridge / Edexcel / International stream applicants.'
    },
    documents: [
      {
        id: 'doc-ssc-matric',
        title: 'Matric / SSC Certificate & DMC',
        category: 'Academic',
        description: 'Attested copies of Secondary School Certificate and Detailed Marks Certificate.',
        requiredForFSc: true,
        requiredForOALevels: false,
        isMandatory: true
      },
      {
        id: 'doc-ibcc-olevel',
        title: 'IBCC Equivalence Certificate (O-Levels)',
        category: 'Academic',
        description: 'Official Equivalence Certificate issued by IBCC.',
        requiredForFSc: false,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-hssc-inter',
        title: 'Intermediate / HSSC DMC or Hope Certificate',
        category: 'Academic',
        description: 'HSSC result card or provisional Hope Certificate from college principal.',
        requiredForFSc: true,
        requiredForOALevels: false,
        isMandatory: true
      },
      {
        id: 'doc-ibcc-alevel',
        title: 'IBCC Equivalence Certificate (A-Levels)',
        category: 'Academic',
        description: 'Official IBCC Equivalence Certificate for A-Levels.',
        requiredForFSc: false,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-cnic-bform',
        title: 'CNIC or NADRA Smart B-Form',
        category: 'Identity',
        description: 'Photocopy of candidate’s CNIC or Smart B-Form.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-father-cnic',
        title: 'Father / Guardian CNIC Copy',
        category: 'Identity',
        description: 'Photocopy of Father or guardian’s CNIC.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-photos',
        title: 'Passport-Sized Photographs (4 Copies)',
        category: 'Identity',
        description: 'Recent photographs with blue or white background.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      },
      {
        id: 'doc-domicile',
        title: 'Domicile Certificate',
        category: 'Domicile & Quota',
        description: 'Candidate’s or father’s domicile certificate.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: false
      },
      {
        id: 'doc-character',
        title: 'Character Certificate',
        category: 'Institutional & Board',
        description: 'Character certificate from last attended institution.',
        requiredForFSc: true,
        requiredForOALevels: true,
        isMandatory: true
      }
    ]
  }
};
