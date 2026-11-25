export type AppTab = 'home' | 'recognize' | 'prevent' | 'biosecurity' | 'faq';

export type AppRoute =
  | AppTab
  | 'welcome'
  | 'suspect'
  | 'about'
  | 'favorites';

export type FontScaleMode = 'normal' | 'large' | 'xlarge';

export type SymptomStage = 'iniciais' | 'intermediarios' | 'avancados';

export type FavoriteCategory = 'sintomas' | 'biosseguranca' | 'faq';

export interface SymptomItem {
  id: string;
  stage: SymptomStage;
  stageLabel: string;
  title: string;
  shortDesc: string;
  image: string;
  detailedObservation: string;
  fieldChecklist: string[];
  criticalWarning?: string;
}

export interface DiseaseComparison {
  id: 'moniliase' | 'podridao-parda' | 'vassoura-bruxa';
  name: string;
  scientificName: string;
  image: string;
  badgeColor: 'orange' | 'brown' | 'purple';
  quarantineStatus: string;
  affectedOrgans: string;
  lesionAspect: string;
  sporulation: string;
  fruitInterior: string;
  progressionSpeed: string;
  quickSignals: string[];
}

export interface PreventionDoItem {
  id: string;
  text: string;
  howTo: string;
  quarantineNote?: string;
  hasCalculatorShortcut?: boolean;
}

export interface PreventionAvoidItem {
  id: string;
  text: string;
  whyAvoid: string;
}

export interface BiosecurityCategory {
  id: string;
  title: string;
  shortSummary: string;
  accentTheme: 'green' | 'brown';
  riskLevel: 'Crítico' | 'Alto' | 'Essencial';
  whyCritical: string;
  entrySteps: string[];
  exitSteps: string[];
  recommendedDisinfectants: string[];
}

export interface SuspectStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  iconKey: 'eye' | 'search' | 'shield-alert' | 'ban' | 'droplets' | 'phone';
  attentionPoints: string[];
  alertVariant: 'red' | 'yellow' | 'green';
  alertText: string;
  hasQuickCompare?: boolean;
  hasOfflineGps?: boolean;
  isFinalNotification?: boolean;
}

export interface DiseaseCyclePhase {
  phase: number;
  timeframe: string;
  title: string;
  description: string;
  isHiddenStage?: boolean;
}

export interface FaqItem {
  id: string;
  category: 'Transporte e Lei' | 'Sintomas' | 'Manejo e Visitas' | 'Notificação';
  question: string;
  answer: string;
  featuredOnHome?: boolean;
  keyTakeaway: string;
}

export interface OfficialContact {
  id: string;
  uf: string;
  stateName: string;
  agency: string;
  phone: string;
  phoneHref: string;
  notes: string;
}

export interface SearchResultItem {
  id: string;
  type: 'sintoma' | 'prevencao' | 'biosseguranca' | 'faq' | 'protocolo' | 'sobre';
  typeLabel: string;
  title: string;
  snippet: string;
  score: number;
  targetRoute: AppRoute;
  targetId?: string;
}
