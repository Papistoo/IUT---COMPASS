
// Assistant / FAQ Types
export enum Category {
  ADMISSION = "Admission",
  DOCUMENTS = "Documents",
  INSCRIPTIONS = "Inscriptions",
  EXAMENS = "Examens",
  STAGES = "Stages",
  CONTACTS = "Contacts"
}

export interface FaqItem {
  id: string;
  question: string;
  category: Category;
  procedure: string; // The "What to do"
  service: string;   // "Who handles it"
  location: string;  // "Where to go"
  timing: string;    // "How long it takes"
  steps: string[];   // Detailed steps
  keywords: string[];
  contact?: string;  // Contact details (phone/email)
  linkedFlowId?: string; // Optional link to a visual flowchart
}

// Notice Board Types
export type NoticeCategory = 'URGENT' | 'PEDAGOGIE' | 'ADMINISTRATION' | 'BOURSES' | 'STAGES';

export interface TimetableEntry {
  day: string;
  time: string;
  ecue: string;
  filiere: string;
  room: string;
  teacher: string;
}

export interface TimetableData {
  level: 'L1' | 'L2' | 'L3';
  entries: TimetableEntry[];
  note?: string; // NB
  headOfDept?: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: NoticeCategory;
  content: string; // Used for standard notices or summary
  fileSize?: string;
  isNew?: boolean;
  createdAt?: any; // Firestore Timestamp used for sorting
  timetable?: TimetableData; // Optional complex structure for Timetables
}

// Flowchart Types
export interface FlowStep {
  id: string;
  label: string;
  description?: string;
  service: string;
  icon?: string;
}

export interface ProcessFlow {
  id: string;
  title: string;
  steps: FlowStep[];
}

// Dashboard Types
export interface DepartmentStat {
  name: string;
  students: number;
  successRate: number;
  dropoutRate: number;
}

export interface EnrollmentData {
  year: string;
  count: number;
}

// Success Rates Data Models
export interface StatGlobal {
  id: string;
  label: string;
  value: string;
  iconName: string; // 'TrendingUp', 'Users', 'Award', etc.
  colorClass: string; // Tailwind class
  bgClass: string; // Tailwind class
  order?: number;
}

export interface StatEvolution {
  id: string;
  year: string;
  rate: number;
}

export interface StatCycle {
  id: string;
  year: string; // Remplacé 'filiere' par 'year'
  inscrits: number;
  // admis: number; // Supprimé
  taux: number; // Taux saisi manuellement désormais
  type: 'DUT' | 'LP';
}

// Presentation Types
export interface DepartmentDetail {
  id: string;
  title: string;
  shortName?: string;
  description: string;
  filieres: string[];
  role: string;
  iconName: string;
}

// --- NEW TYPES FOR ADMIN MANAGEMENT ---

export interface Teacher {
  id: string;
  name: string;
  role: string;
  courses: string;
  departmentId: string; // 'INFO', 'GEA', 'TC', 'GHT'
  isDirector?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  type: 'ONG' | 'INSTITUTION' | 'ENTREPRISE' | 'UNIVERSITE';
  description: string;
  website?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  promo: string; // ex: "Promotion 2021"
  role: string; // ex: "Développeur Web"
  text: string;
  departmentId?: string; // Optional context
}

// App State
export type ViewState = 'WALKTHROUGH' | 'LANDING' | 'HOME' | 'ASSISTANT' | 'FLOW' | 'DASHBOARD' | 'PRESENTATION' | 'STUDENT_LIFE' | 'NOTICE_BOARD' | 'MASTERY' | 'ABOUT' | 'TESTIMONIALS' | 'ADMINISTRATION' | 'SUCCESS_RATES' | 'QUALITY' | 'TEACHERS' | 'PARTNERS';