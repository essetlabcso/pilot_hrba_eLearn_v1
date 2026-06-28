import type { Module2FinalPortfolioState } from './module2FinalTypes';

export const module2FinalPortfolioInitialState: Module2FinalPortfolioState = {
  reframedLanguageNote: '',
  actorRightsHolder: '',
  actorDutyBearer: '',
  inclusionAudit: '',
  inclusionGroupOftenMissing: '',
  inclusionPracticalStep: '',
  powerInsight: '',
  safeFeedbackMethod: '',
  updatedAt: '',
};

export const module2FinalPortfolioFields = [
  {
    id: 'reframedLanguageNote',
    sourceScreenId: '1.3',
    title: 'Evolving Our Approach',
    prompt: 'Saved reframed language note from Screen 1.3.',
  },
  {
    id: 'actorMap',
    sourceScreenId: '2.3',
    title: 'Identifying the Actors',
    prompt: 'Saved rights-holder and duty-bearer actor map from Screen 2.3.',
  },
  {
    id: 'inclusionAudit',
    sourceScreenId: '3.3',
    title: 'Designing for Inclusion',
    prompt: 'Saved inclusion audit note from Screen 3.3.',
  },
  {
    id: 'powerInsight',
    sourceScreenId: '4.3',
    title: 'Navigating Power',
    prompt: 'Saved power insight from Screen 4.3.',
  },
  {
    id: 'safeFeedbackMethod',
    sourceScreenId: '5.3',
    title: 'Constructive Accountability',
    prompt: 'Saved safe feedback method from Screen 5.3.',
  },
];

export const module2FinalPortfolioSafetyNote =
  'Keep portfolio notes safe and general. Do not include names, exact locations, active disputes, survivor stories, identifiable complaints, politically sensitive details, or sensitive service information.';
