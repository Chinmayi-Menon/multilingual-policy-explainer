export type Language = 
  | 'en' 
  | 'hi' 
  | 'ta' 
  | 'te' 
  | 'bn' 
  | 'mr' 
  | 'gu' 
  | 'kn' 
  | 'ml' 
  | 'pa' 
  | 'or' 
  | 'ur';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  voiceCode: string;
  script: string;
  sampleGreeting: string;
}

export type OccupationType = 
  | 'farmer' 
  | 'daily_wage' 
  | 'artisan' 
  | 'gig_worker' 
  | 'student' 
  | 'small_business' 
  | 'homemaker' 
  | 'senior_retired' 
  | 'unemployed' 
  | 'salaried';

export type IncomeRange = 
  | 'below_1L' 
  | '1L_2.5L' 
  | '2.5L_5L' 
  | '5L_8L' 
  | 'above_8L';

export type LandHolding = 
  | 'none' 
  | 'marginal' // < 1 hectare (2.5 acres)
  | 'small'    // 1-2 hectares
  | 'large';   // > 2 hectares

export type SocialCategory = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';

export interface CitizenProfile {
  age: number;
  gender: 'female' | 'male' | 'transgender' | 'any';
  state: string;
  areaType: 'rural' | 'urban';
  occupation: OccupationType;
  incomeRange: IncomeRange;
  landHolding: LandHolding;
  category: SocialCategory;
  isPwD: boolean; // Person with Disability
  isSeniorCitizen: boolean; // 60+ or 70+
  isWidowOrSingleMother: boolean;
  hasPuccaHouse: boolean;
  isStudent: boolean;
  hasBPLCard: boolean;
}

export interface Scheme {
  id: string;
  title: string;
  ministry: string;
  category: 'Agriculture' | 'Healthcare' | 'Housing' | 'Women & Child' | 'Pensions & Elderly' | 'Labor & Employment' | 'Education & Youth' | 'Energy & Utilities';
  shortDesc: string;
  benefitsSummary: string;
  benefitAmount: string;
  officialPortal: string;
  helpline: string;
  lastDate?: string;
  scamWarning: string;
  requiredDocuments: string[];
  applicationSteps: string[];
  // Match criteria for eligibility engine
  criteria: {
    minAge?: number;
    maxAge?: number;
    genders?: ('female' | 'male' | 'transgender')[];
    allowedOccupations?: OccupationType[];
    maxIncomeRange?: IncomeRange;
    maxLand?: LandHolding[];
    allowedCategories?: SocialCategory[];
    requiresBPL?: boolean;
    requiresNoPuccaHouse?: boolean;
    requiresPwD?: boolean;
    requiresWidow?: boolean;
    specificStates?: string[]; // empty means all India
  };
  translations: Partial<Record<Language, {
    title: string;
    shortDesc: string;
    benefitsSummary: string;
    benefitAmount?: string;
    howToApply: string;
    scamWarning: string;
  }>>;
}

export interface JargonTerm {
  term: string;
  explanation: string;
  simpleAnalogy: string;
}

export interface NoticeAnalysis {
  id: string;
  title: string;
  authority: string;
  date: string;
  rawText: string;
  summary: string;
  whoIsAffected: string;
  keyBenefits: string[];
  criticalConditions: string[];
  documentsNeeded: string[];
  actionSteps: string[];
  deadlines: string[];
  jargonList: JargonTerm[];
  scamAlert: string;
  officialLinks: { name: string; url: string; phone?: string }[];
  simplifiedTranslations?: Partial<Record<Language, {
    title: string;
    summary: string;
    keyBenefits: string[];
    actionSteps: string[];
    scamAlert: string;
  }>>;
}

export interface CitizenRight {
  id: string;
  title: string;
  category: 'Police & Arrest' | 'Tenancy & Housing' | 'Consumer & Digital' | 'Transparency & RTI' | 'Women & Family' | 'Labor & Wages' | 'Healthcare';
  legalBasis: string; // e.g. "Article 21 & Section 41 CrPC / BNSS"
  summary: string;
  keyProtections: string[];
  whatToDoIfViolated: string[];
  emergencyHelplines: { name: string; number: string }[];
  draftTemplate?: {
    type: string;
    title: string;
    templateBody: string;
    instructions: string;
  };
  translations: Partial<Record<Language, {
    title: string;
    summary: string;
    keyProtections: string[];
    whatToDoIfViolated: string[];
  }>>;
}

export interface VoiceMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  lang: Language;
  timestamp: string;
  audioDuration?: number;
}
