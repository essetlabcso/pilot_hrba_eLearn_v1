export type Module2FinalScreenKind =
  | 'cover'
  | 'intro'
  | 'objectives'
  | 'lesson-placeholder'
  | 'portfolio-snapshot'
  | 'knowledge-check'
  | 'close';

export type Module2FinalScreenId =
  | 'M2-00'
  | 'M2-Intro'
  | 'M2-Objectives'
  | '1.1'
  | '1.2'
  | '1.3'
  | '2.1'
  | '2.2'
  | '2.3'
  | '3.1'
  | '3.2'
  | '3.3'
  | '4.1'
  | '4.2'
  | '4.3'
  | '5.1'
  | '5.2'
  | '5.3'
  | '6.1'
  | '6.2'
  | 'M2-KC'
  | 'M2-Close';

export interface Module2FinalScreen {
  id: Module2FinalScreenId;
  title: string;
  purpose: string;
  kind: Module2FinalScreenKind;
  route: string;
  buttonLabel?: string;
}

export interface Module2FinalSequenceItem {
  Seq: number;
  Layer: 'Layer 2 Player';
  'Screen/State ID': Module2FinalScreenId;
  'Screen/State Title': string;
  'Learning/Purpose': string;
  'Asset/Component': string;
}

export interface Module2FinalPortfolioState {
  reframedLanguageNote: string;
  actorRightsHolder: string;
  actorDutyBearer: string;
  inclusionAudit: string;
  inclusionGroupOftenMissing: string;
  inclusionPracticalStep: string;
  powerInsight: string;
  safeFeedbackMethod: string;
  updatedAt: string;
}
