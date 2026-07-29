/* eslint-disable react-refresh/only-export-components -- builders are exported with the screens for focused contract tests */
import { useMemo, useRef, useState } from 'react';
import type { LearningState } from '../../state/learningState';
import type { Module3RevisedScreen } from '../../data/module3/module3RevisedScreens';
import {
  GeneratedOutputSurface,
  GeneratedStatus,
  InteractionSurface,
  OutputQualityCanvas,
} from './Module3OutputQuality';
import './module3-output-quality.css';

const MODULE_ID = 'module_03_project_design';
const MODEL_VERSION = 3;

type ChangeState = (updater: (prev: LearningState) => LearningState) => void;
type Complete = (value?: Record<string, unknown>) => void;
type ScreenProps = {
  screen: Module3RevisedScreen;
  state: LearningState;
  onChangeState: ChangeState;
  onComplete: Complete;
};

type GapId =
  | 'late-participation'
  | 'priority-groups'
  | 'unclear-responsibility'
  | 'feedback-no-response'
  | 'capacity-gap'
  | 'activity-only-indicators';
type RepairId =
  | 'early-influence'
  | 'barrier-responsive-access'
  | 'role-accountability'
  | 'response-loop'
  | 'capacity-response'
  | 'change-indicator';

export type ProposalReviewInsight = {
  modelVersion: 3;
  priorityProposalGap: string;
  relevantHrbaPrinciple: string;
  caseAndLearnerEvidence: string;
  whyGapMatters: string;
  proposedRepair: string;
  expectedImprovement: string;
  implementationWatchPoint: string;
  repairedDesignLink: string;
  learnerEditedRepair: string;
  selectedGapId: GapId;
  selectedRepairId: RepairId;
  sourceSignature: string;
  generatedAt: string;
};

type QuestionId =
  | 'm3-akc-q01' | 'm3-akc-q02' | 'm3-akc-q03' | 'm3-akc-q04' | 'm3-akc-q05'
  | 'm3-akc-q06' | 'm3-akc-q07' | 'm3-akc-q08' | 'm3-akc-q09' | 'm3-akc-q10';
type OptionId = 'a' | 'b' | 'c' | 'd';
type Question = {
  id: QuestionId;
  domain: string;
  stem: string;
  prompt: string;
  options: Array<{ id: OptionId; text: string; feedback: string }>;
  correct: OptionId;
  reviewScreen: string;
};
export type AppliedCheckResult = {
  answers: Partial<Record<QuestionId, OptionId>>;
  score: number;
  totalQuestions: 10;
  percentage: number;
  missedQuestions: QuestionId[];
  targetedReviewTopics: Array<{ domain: string; screen: string; feedback: string }>;
  completed: true;
  submittedAt: string;
  attemptCount: number;
};

export type PortfolioProductKey =
  | 'contextInsight'
  | 'actorPowerInsight'
  | 'repairedDesignElement'
  | 'proposalReviewInsight';
export type ProductStatus = 'Current' | 'Updated source available' | 'Based on earlier course version' | 'Missing source';
export type PortfolioProduct = {
  key: PortfolioProductKey;
  title: string;
  sourceScreenId: string;
  status: ProductStatus;
  fields: Array<{ label: string; value: string }>;
  sourceSignature: string;
};
export type FourProductSnapshot = {
  modelVersion: 3;
  canonicalProductKeys: PortfolioProductKey[];
  products: PortfolioProduct[];
  sourceSignatures: Record<PortfolioProductKey, string>;
  sourceSignature: string;
  ownCsoNote: string;
  snapshotStatus: 'saved';
  savedAt: string;
};

function practiceKey(screenId: string) {
  return `module3_revised_${screenId.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function screenRecord(state: LearningState, screenId: string) {
  return record(state.practiceCheckState[practiceKey(screenId)]);
}

function text(value: unknown, fallback = '') {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (Array.isArray(value)) {
    const joined = value.map((item) => typeof item === 'string' ? item.trim() : '').filter(Boolean).join('; ');
    if (joined) return joined;
  }
  return fallback;
}

function pick(source: Record<string, unknown>, keys: string[], fallback: string) {
  for (const key of keys) {
    const value = text(source[key]);
    if (value) return value;
  }
  return fallback;
}

function stable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, nested]) => `${JSON.stringify(key)}:${stable(nested)}`).join(',')}}`;
  }
  return JSON.stringify(value) || 'null';
}

function signature(value: unknown, prefix: string) {
  const serialized = stable(value);
  let hash = 2166136261;
  for (let index = 0; index < serialized.length; index += 1) {
    hash ^= serialized.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${prefix}-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}

function canonical(state: LearningState, screenId: string, key: string) {
  return record(screenRecord(state, screenId)[key]);
}

function historicalModule3Completion(state: LearningState) {
  return state.completedModules.includes(MODULE_ID)
    || (state.screenProgress[MODULE_ID] || []).includes('M3-R22');
}

const gapOptions: Array<{
  id: GapId;
  label: string;
  principle: string;
  why: string;
  watch: string;
  preferredRepair: RepairId;
}> = [
  {
    id: 'late-participation',
    label: 'Participation occurs after key decisions',
    principle: 'Meaningful participation and influence',
    why: 'Attendance after priorities are fixed cannot reliably influence the objective, activities, resources or follow-up.',
    watch: 'Check whether rights-holder priorities are recorded before decisions and whether the final plan explains what changed.',
    preferredRepair: 'early-influence',
  },
  {
    id: 'priority-groups',
    label: 'Priority groups are not adequately reached',
    principle: 'Equality, non-discrimination and accessibility',
    why: 'A general invitation can reproduce distance, timing, cost, language, disability and information barriers.',
    watch: 'Monitor who receives information, who participates, which barriers remain and whether reasonable adjustments work.',
    preferredRepair: 'barrier-responsive-access',
  },
  {
    id: 'unclear-responsibility',
    label: 'Responsibility and accountability are unclear',
    principle: 'Accountability and duty-bearer responsibility',
    why: 'Feedback and agreed actions may remain unanswered when responsible public or service actors are not visible.',
    watch: 'Track whether the named responsible actor responds and whether Awra remains a facilitator rather than a substitute duty-bearer.',
    preferredRepair: 'role-accountability',
  },
  {
    id: 'feedback-no-response',
    label: 'Feedback is collected without a response process',
    principle: 'Accountability, transparency and access to information',
    why: 'Collecting feedback without review, explanation, correction and follow-up does not close the accountability loop.',
    watch: 'Check response time, accessible account-back, unresolved issues and safe alternatives for people who cannot use the main channel.',
    preferredRepair: 'response-loop',
  },
  {
    id: 'capacity-gap',
    label: 'Activities do not address the identified capacity gap',
    principle: 'Capacity development linked to responsibility',
    why: 'Generic training will not resolve gaps in mandate, resources, coordination, incentives, response systems or accountability.',
    watch: 'Verify the underlying gap and monitor whether the chosen response changes responsible-actor practice.',
    preferredRepair: 'capacity-response',
  },
  {
    id: 'activity-only-indicators',
    label: 'Indicators measure attendance but not influence or equitable access',
    principle: 'Evidence-based accountability and progressive improvement',
    why: 'Activity counts cannot show whether barriers reduced, decisions changed or responsible actors responded.',
    watch: 'Track change in access, influence, response and barrier reduction using proportionate, non-identifying evidence.',
    preferredRepair: 'change-indicator',
  },
];

const repairOptions: Array<{ id: RepairId; label: string; detail: string }> = [
  { id: 'early-influence', label: 'Create an early influence point', detail: 'Share accessible information before decisions, support preparation, record priorities and show how they changed the plan.' },
  { id: 'barrier-responsive-access', label: 'Build access around priority barriers', detail: 'Use suitable timing, location, formats, channels and reasonable accommodation, with a named actor monitoring whether they work.' },
  { id: 'role-accountability', label: 'Clarify roles and response responsibility', detail: 'Name the responsible public or service actor, Awra’s facilitation role, the response action and the joint review point.' },
  { id: 'response-loop', label: 'Complete the feedback-response loop', detail: 'Define safe receipt, review, response, explanation, correction, follow-up and accessible account-back.' },
  { id: 'capacity-response', label: 'Match the response to the capacity gap', detail: 'Connect the verified mandate, resource, coordination, skill or accountability gap to a proportionate support and review action.' },
  { id: 'change-indicator', label: 'Add a change-focused indicator', detail: 'Measure equitable access, influence, response or barrier reduction alongside activity delivery.' },
];

function relevantGaps(state: LearningState) {
  const choices = new Set<GapId>();
  if (Object.keys(canonical(state, 'M3-R05', 'contextInsight')).length) choices.add('priority-groups');
  if (Object.keys(canonical(state, 'M3-R09', 'actorPowerInsight')).length) choices.add('unclear-responsibility');
  if (Object.keys(canonical(state, 'M3-R10', 'canonicalCausalCapacityPathway')).length) choices.add('capacity-gap');
  if (Object.keys(canonical(state, 'M3-R12', 'canonicalPathwaySummary')).length) choices.add('late-participation');
  if (Object.keys(canonical(state, 'M3-R13', 'canonicalRiskMatrix')).length) choices.add('feedback-no-response');
  if (Object.keys(canonical(state, 'M3-R14', 'repairedDesignElement')).length) choices.add('activity-only-indicators');
  const ordered = gapOptions.filter((option) => choices.has(option.id));
  return (ordered.length >= 3 ? ordered : gapOptions).slice(0, 4);
}

function proposalDependencies(state: LearningState) {
  return {
    context: canonical(state, 'M3-R05', 'contextInsight'),
    actorPower: canonical(state, 'M3-R09', 'actorPowerInsight'),
    causal: canonical(state, 'M3-R10', 'canonicalCausalCapacityPathway'),
    inclusion: canonical(state, 'M3-R11', 'inclusionDesignScorecard'),
    pathway: canonical(state, 'M3-R12', 'canonicalPathwaySummary'),
    risks: canonical(state, 'M3-R13', 'canonicalRiskMatrix'),
    repaired: canonical(state, 'M3-R14', 'repairedDesignElement'),
  };
}

export function buildProposalReviewInsight(
  state: LearningState,
  gapId: GapId,
  repairId: RepairId,
  learnerEditedRepair = '',
  generatedAt = new Date().toISOString(),
): ProposalReviewInsight {
  const dependencies = proposalDependencies(state);
  const gap = gapOptions.find((option) => option.id === gapId) || gapOptions[0];
  const repair = repairOptions.find((option) => option.id === repairId) || repairOptions[0];
  const context = dependencies.context;
  const actor = dependencies.actorPower;
  const causal = dependencies.causal;
  const repaired = dependencies.repaired;
  const affectedGroup = pick(context, ['priorityAffectedGroup', 'affectedGroup'], 'priority rights-holder groups identified in the context analysis');
  const evidence = [
    `The context analysis prioritizes ${affectedGroup}.`,
    pick(actor, ['recommendation', 'safeEngagementRecommendation'], 'Actor and power analysis requires responsibility and influence to remain distinct.'),
    pick(causal, ['capacityResponseGap', 'issueRequiringVerification'], 'The cause and capacity analysis identifies an issue that still requires proportionate verification.'),
  ].join(' ');
  const finalRepair = learnerEditedRepair.trim() || repair.detail;
  return {
    modelVersion: MODEL_VERSION,
    priorityProposalGap: gap.label,
    relevantHrbaPrinciple: gap.principle,
    caseAndLearnerEvidence: evidence,
    whyGapMatters: gap.why,
    proposedRepair: finalRepair,
    expectedImprovement: `The proposal will connect ${gap.principle.toLowerCase()} to a visible design decision, responsible action and reviewable result.`,
    implementationWatchPoint: gap.watch,
    repairedDesignLink: pick(repaired, ['implementationImplication', 'hrbaReasoning'], 'Use the saved repaired project-design element as the design authority for this proposal repair.'),
    learnerEditedRepair: learnerEditedRepair.trim(),
    selectedGapId: gapId,
    selectedRepairId: repairId,
    sourceSignature: signature({ dependencies, gapId, repairId }, 'm3-r17'),
    generatedAt,
  };
}

export function ProposalReviewOutputScreen({ screen, state, onChangeState, onComplete }: ScreenProps) {
  const savedRecord = screenRecord(state, screen.id);
  const saved = record(savedRecord.proposalReviewInsight) as Partial<ProposalReviewInsight>;
  const options = relevantGaps(state);
  const initialGap = options.some((option) => option.id === saved.selectedGapId) ? saved.selectedGapId as GapId : '';
  const [gapId, setGapId] = useState<GapId | ''>(initialGap);
  const [repairId, setRepairId] = useState<RepairId | ''>(saved.selectedRepairId as RepairId || '');
  const [learnerEdit, setLearnerEdit] = useState(text(saved.learnerEditedRepair));
  const [generated, setGenerated] = useState<ProposalReviewInsight | null>(saved.priorityProposalGap ? saved as ProposalReviewInsight : null);
  const outputRef = useRef<HTMLHeadingElement>(null);
  const ready = Boolean(gapId && repairId);
  const expected = ready ? buildProposalReviewInsight(state, gapId as GapId, repairId as RepairId, learnerEdit) : null;
  const current = Boolean(generated && expected && generated.sourceSignature === expected.sourceSignature && generated.learnerEditedRepair === learnerEdit.trim());

  const chooseGap = (id: GapId) => {
    const gap = gapOptions.find((option) => option.id === id);
    setGapId(id);
    setRepairId(gap?.preferredRepair || '');
  };

  const generate = () => {
    if (!gapId || !repairId) return;
    const next = buildProposalReviewInsight(state, gapId, repairId, learnerEdit);
    setGenerated(next);
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        [practiceKey(screen.id)]: {
          ...screenRecord(prev, screen.id),
          module3PortfolioModelVersion: MODEL_VERSION,
          proposalReviewInsight: next,
          learnerAuthoredRepairText: learnerEdit.trim(),
          sourceSignature: next.sourceSignature,
          draftPlanReviewNote: {
            priorityGap: next.priorityProposalGap,
            repair: next.proposedRepair,
            watchPoint: next.implementationWatchPoint,
          },
          screen18: { hiddenIntegratedInto: 'M3-R17' },
          screen19: { hiddenIntegratedInto: 'M3-R17' },
        },
      },
    }));
    window.setTimeout(() => outputRef.current?.focus(), 0);
  };

  const remaining = !gapId ? 'Select one priority proposal gap.' : !repairId ? 'Select one proposed repair.' : current ? 'The Proposal-Review Insight is current.' : 'Generate the updated Proposal-Review Insight.';

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`}>
      <OutputQualityCanvas labelledBy={`${screen.id}-title`} className="m3-b3-canvas">
        <header className="m3-b3-heading">
          <p>MODULE 3 · PROPOSAL REVIEW</p>
          <h1 id={`${screen.id}-title`}>Draft Plan Review and Repair</h1>
          <span>Choose one priority gap and one proportionate repair. The course will assemble the fuller proposal-review insight from your saved Module 3 analysis.</span>
        </header>
        <p className="m3-b2-carry"><strong>Carried forward:</strong> context, actor and power, capacity, inclusion, participation, safeguards and the repaired project-design element.</p>
        <InteractionSurface labelledBy={`${screen.id}-decisions`} className="m3-b3-decisions">
          <h2 id={`${screen.id}-decisions`}>Make two focused review decisions</h2>
          <fieldset>
            <legend>1. Priority proposal gap</legend>
            <div className="m3-b3-option-grid">
              {options.map((option) => (
                <label key={option.id} className={gapId === option.id ? 'm3-b3-option is-selected' : 'm3-b3-option'}>
                  <input type="radio" name="m3-r17-gap" value={option.id} checked={gapId === option.id} onChange={() => chooseGap(option.id)} />
                  <span><strong>{option.label}</strong><small>{option.principle}</small></span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>2. Proposed repair</legend>
            <div className="m3-b3-option-grid">
              {repairOptions.filter((option) => !gapId || option.id === gapOptions.find((gap) => gap.id === gapId)?.preferredRepair || ['role-accountability', 'response-loop'].includes(option.id)).slice(0, 3).map((option) => (
                <label key={option.id} className={repairId === option.id ? 'm3-b3-option is-selected' : 'm3-b3-option'}>
                  <input type="radio" name="m3-r17-repair" value={option.id} checked={repairId === option.id} onChange={() => setRepairId(option.id)} />
                  <span><strong>{option.label}</strong><small>{option.detail}</small></span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="m3-b3-edit">
            <span><strong>Optional short repair edit</strong> — never required to continue</span>
            <textarea maxLength={300} value={learnerEdit} onChange={(event) => setLearnerEdit(event.target.value)} />
            <small>{learnerEdit.length}/300 characters</small>
          </label>
        </InteractionSurface>
        {generated && (
          <GeneratedOutputSurface labelledBy={`${screen.id}-output`} className="m3-b3-proposal-output">
            <p className="m3-oq-eyebrow">GENERATED PORTFOLIO PRODUCT</p>
            <h2 id={`${screen.id}-output`} ref={outputRef} tabIndex={-1}>Proposal-Review Insight</h2>
            <div className="m3-b3-review-sequence" aria-label="Proposal review sequence">
              <article><span>Gap</span><h3>Current proposal gap</h3><p>{generated.priorityProposalGap}</p></article>
              <article><span>Evidence</span><h3>Evidence and HRBA implication</h3><p><strong>{generated.relevantHrbaPrinciple}.</strong> {generated.caseAndLearnerEvidence}</p><p>{generated.whyGapMatters}</p></article>
              <article><span>Repair</span><h3>Proposed repair</h3><p>{generated.proposedRepair}</p></article>
              <article><span>Improve</span><h3>Expected improvement</h3><p>{generated.expectedImprovement}</p></article>
              <article><span>Watch</span><h3>Implementation watch-point</h3><p>{generated.implementationWatchPoint}</p><p><strong>Design link:</strong> {generated.repairedDesignLink}</p></article>
            </div>
          </GeneratedOutputSurface>
        )}
        <section className="m3-b3-action-panel" aria-label="Proposal review actions">
          <GeneratedStatus>{remaining}</GeneratedStatus>
          <div>
            <button type="button" className="m3-oq-primary-action" disabled={!ready} onClick={generate}>{generated ? 'Update insight' : 'Generate insight'}</button>
            <button type="button" className="m3-oq-primary-action" disabled={!current} onClick={() => generated && onComplete({
              module3PortfolioModelVersion: MODEL_VERSION,
              proposalReviewInsight: generated,
              draftPlanReviewNote: savedRecord.draftPlanReviewNote || {
                priorityGap: generated.priorityProposalGap,
                repair: generated.proposedRepair,
                watchPoint: generated.implementationWatchPoint,
              },
              screen17: { screenId: 'M3-R17', proposalReviewInsight: generated },
              screen18: savedRecord.screen18 || { hiddenIntegratedInto: 'M3-R17' },
              screen19: savedRecord.screen19 || { hiddenIntegratedInto: 'M3-R17' },
            })}>Continue</button>
          </div>
        </section>
      </OutputQualityCanvas>
    </main>
  );
}

export const batch3Questions: Question[] = [
  {
    id: 'm3-akc-q01', domain: 'Context and inequality',
    stem: 'Remote residents and some persons with disabilities attend fewer planning meetings. The team assumes they are less interested.',
    prompt: 'What should the design team do first?', correct: 'b', reviewScreen: 'Screen 5',
    options: [
      { id: 'a', text: 'Hold more meetings using the same venue and notice method.', feedback: 'More of the same activity may leave the same barriers in place.' },
      { id: 'b', text: 'Compare access conditions across groups and verify possible barriers using non-identifying evidence.', feedback: 'Correct: distinguish the observed pattern from possible explanations and verify them safely.' },
      { id: 'c', text: 'Treat total attendance as proof that access is equal.', feedback: 'Totals can hide unequal access by group or location.' },
      { id: 'd', text: 'Collect the names of people believed to be uninterested.', feedback: 'Names are unnecessary and may create privacy or participation risks.' },
    ],
  },
  {
    id: 'm3-akc-q02', domain: 'Standards and responsibilities',
    stem: 'A water plan names the right to water but makes Awra responsible for resolving every service complaint.',
    prompt: 'What is the strongest repair?', correct: 'c', reviewScreen: 'Screens 6 and 8',
    options: [
      { id: 'a', text: 'Keep the wording because naming the right is enough.', feedback: 'A rights reference should inform responsibility and practical design.' },
      { id: 'b', text: 'Make Awra the permanent service authority.', feedback: 'The CSO should not replace public or service responsibility.' },
      { id: 'c', text: 'Link the standard to the responsible service actor and define Awra’s supporting role.', feedback: 'Correct: connect the standard, responsibility and a realistic CSO role.' },
      { id: 'd', text: 'Decide responsibility during implementation.', feedback: 'Unclear responsibility weakens response and accountability.' },
    ],
  },
  {
    id: 'm3-akc-q03', domain: 'Rights-holders and barriers',
    stem: 'A project invites “the community” to one town-centre consultation despite known distance, timing and accessibility barriers.',
    prompt: 'Which revision best applies the earlier analysis?', correct: 'a', reviewScreen: 'Screen 7',
    options: [
      { id: 'a', text: 'Connect specific groups to priority barriers and adjust information, access and participation.', feedback: 'Correct: group-specific barriers should change the design.' },
      { id: 'b', text: 'Send more invitations without changing the method.', feedback: 'More invitations may not address the identified barriers.' },
      { id: 'c', text: 'Use one representative for every group.', feedback: 'One voice may reproduce existing exclusions.' },
      { id: 'd', text: 'Replace the analysis with a stakeholder count.', feedback: 'A count does not explain barriers or design implications.' },
    ],
  },
  {
    id: 'm3-akc-q04', domain: 'Duty-bearers and CSO roles',
    stem: 'Awra receives feedback, decides the response and reports completion although a service office has the decision authority.',
    prompt: 'How should roles be allocated?', correct: 'd', reviewScreen: 'Screen 8',
    options: [
      { id: 'a', text: 'Make Awra the permanent response authority.', feedback: 'This transfers public or service responsibility to the CSO.' },
      { id: 'b', text: 'Let one community leader decide every response.', feedback: 'Support and influence do not automatically create formal responsibility.' },
      { id: 'c', text: 'Leave the responsible actor unnamed.', feedback: 'Unnamed responsibility can leave feedback unanswered.' },
      { id: 'd', text: 'Name the responsible actor while Awra supports access, evidence and follow-up.', feedback: 'Correct: keep primary responsibility and the CSO support role distinct.' },
    ],
  },
  {
    id: 'm3-akc-q05', domain: 'Power and influence',
    stem: 'A planning office has formal authority, while an unofficial local actor controls who receives information.',
    prompt: 'How should the project analyze this?', correct: 'b', reviewScreen: 'Screen 9',
    options: [
      { id: 'a', text: 'Treat the unofficial actor as the formal duty-bearer.', feedback: 'Practical influence does not create formal responsibility.' },
      { id: 'b', text: 'Map authority and influence separately and plan safe engagement and alternative access.', feedback: 'Correct: authority, influence, engagement and risk need separate treatment.' },
      { id: 'c', text: 'Ignore anyone without an official title.', feedback: 'Unofficial actors may still affect access and decisions.' },
      { id: 'd', text: 'Label the actor hostile without further analysis.', feedback: 'Avoid unsupported labels; use constructive, risk-aware analysis.' },
    ],
  },
  {
    id: 'm3-akc-q06', domain: 'Causes and capacity',
    stem: 'Feedback responses are late, so the team immediately proposes general training for all officials.',
    prompt: 'What should happen first?', correct: 'c', reviewScreen: 'Screen 10',
    options: [
      { id: 'a', text: 'Deliver training because delay always means limited knowledge.', feedback: 'Training fits only a verified knowledge or skill gap.' },
      { id: 'b', text: 'Assume delay proves unwillingness.', feedback: 'Several factors may contribute; do not treat an inference as fact.' },
      { id: 'c', text: 'Examine mandate, skills, resources, coordination, incentives and accountability.', feedback: 'Correct: identify the cause and capacity gap before choosing a response.' },
      { id: 'd', text: 'Transfer every response duty to Awra.', feedback: 'Transferring responsibility does not repair the underlying gap.' },
    ],
  },
  {
    id: 'm3-akc-q07', domain: 'Gender, disability and inclusion',
    stem: 'A draft promises invitations and accessibility “where possible” but assigns no resources, responsibility or monitoring.',
    prompt: 'Which repair integrates inclusion?', correct: 'a', reviewScreen: 'Screen 11',
    options: [
      { id: 'a', text: 'Specify barriers, accessible arrangements, accommodation, responsibility, resources and monitoring.', feedback: 'Correct: inclusion should change arrangements, resources and accountability.' },
      { id: 'b', text: 'Add the word inclusive to the objective.', feedback: 'A label does not show how the design changes.' },
      { id: 'c', text: 'Use attendance totals as the only indicator.', feedback: 'Attendance does not show accessibility or influence.' },
      { id: 'd', text: 'Collect everyone’s medical details.', feedback: 'Personal medical details are unnecessary and may create risk.' },
    ],
  },
  {
    id: 'm3-akc-q08', domain: 'Participation and accountability',
    stem: 'A draft includes consultations and suggestion boxes but no influence point, responsible recipient, response or account-back.',
    prompt: 'What is the strongest repair?', correct: 'd', reviewScreen: 'Screen 12',
    options: [
      { id: 'a', text: 'Add more suggestion boxes.', feedback: 'More channels do not complete the accountability loop.' },
      { id: 'b', text: 'Count consultation attendance.', feedback: 'Attendance does not demonstrate influence or response.' },
      { id: 'c', text: 'Invite only senior representatives.', feedback: 'Representation alone does not define influence or account-back.' },
      { id: 'd', text: 'Define accessible information, influence, receipt, response, explanation and follow-up.', feedback: 'Correct: participation and accountability need a complete pathway.' },
    ],
  },
  {
    id: 'm3-akc-q09', domain: 'Risk and do-no-harm',
    stem: 'Speaking about service exclusion in a public meeting may expose some participants to unwanted attention.',
    prompt: 'What is the appropriate response?', correct: 'b', reviewScreen: 'Screen 13',
    options: [
      { id: 'a', text: 'Continue and guarantee that the meeting is safe.', feedback: 'No method should be described as automatically safe.' },
      { id: 'b', text: 'Assess affected groups, alternatives, mitigation, monitoring and pause or referral conditions.', feedback: 'Correct: connect risk to mitigation, responsibility and safe alternatives.' },
      { id: 'c', text: 'Cancel every participation activity permanently.', feedback: 'Risk analysis should improve the design, not automatically remove participation.' },
      { id: 'd', text: 'Collect all participant names for monitoring.', feedback: 'Names may increase exposure and are unnecessary here.' },
    ],
  },
  {
    id: 'm3-akc-q10', domain: 'Intervention logic and repair',
    stem: 'An objective lists four consultations and training for 30 officials; indicators count only those activities.',
    prompt: 'Which revision strengthens the logic?', correct: 'c', reviewScreen: 'Screen 14',
    options: [
      { id: 'a', text: 'Keep activities as the objective.', feedback: 'Activities are not the intended change.' },
      { id: 'b', text: 'Add “rights-based” without changing the logic.', feedback: 'Terminology does not replace connected design logic.' },
      { id: 'c', text: 'Connect barrier, actor, activity and expected change, then add a change-focused indicator and safe evidence.', feedback: 'Correct: show how action contributes to a meaningful, reviewable change.' },
      { id: 'd', text: 'Add more activity-count indicators.', feedback: 'Activity counts do not show access, influence, response or practice change.' },
    ],
  },
];

export function buildAppliedCheckResult(
  answers: Partial<Record<QuestionId, OptionId>>,
  attemptCount: number,
  submittedAt = new Date().toISOString(),
): AppliedCheckResult {
  const missed = batch3Questions.filter((question) => answers[question.id] !== question.correct).map((question) => question.id);
  const score = batch3Questions.length - missed.length;
  return {
    answers,
    score,
    totalQuestions: 10,
    percentage: score * 10,
    missedQuestions: missed,
    targetedReviewTopics: batch3Questions.filter((question) => missed.includes(question.id)).map((question) => ({
      domain: question.domain,
      screen: question.reviewScreen,
      feedback: question.options.find((option) => option.id === answers[question.id])?.feedback || 'Review this domain before finalizing the portfolio.',
    })),
    completed: true,
    submittedAt,
    attemptCount,
  };
}

export function AppliedKnowledgeCheckOutputScreen({ screen, state, onChangeState, onComplete }: ScreenProps) {
  const savedRecord = screenRecord(state, screen.id);
  const savedResult = record(savedRecord.appliedKnowledgeCheck) as Partial<AppliedCheckResult>;
  const initialAnswers = record(savedRecord.inProgressAnswers || savedResult.answers) as Partial<Record<QuestionId, OptionId>>;
  const [answers, setAnswers] = useState<Partial<Record<QuestionId, OptionId>>>(initialAnswers);
  const [activeIndex, setActiveIndex] = useState(Math.min(Number(savedRecord.activeQuestionIndex) || 0, 9));
  const [mode, setMode] = useState<'question' | 'review' | 'result'>(savedResult.completed ? 'result' : 'question');
  const [result, setResult] = useState<AppliedCheckResult | null>(savedResult.completed ? savedResult as AppliedCheckResult : null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const question = batch3Questions[activeIndex];
  const unanswered = batch3Questions.filter((item) => !answers[item.id]);

  const persistProgress = (nextAnswers: Partial<Record<QuestionId, OptionId>>, index = activeIndex) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        [practiceKey(screen.id)]: {
          ...screenRecord(prev, screen.id),
          inProgressAnswers: nextAnswers,
          activeQuestionIndex: index,
        },
      },
    }));
  };

  const answer = (optionId: OptionId) => {
    const next = { ...answers, [question.id]: optionId };
    setAnswers(next);
    persistProgress(next);
  };

  const submit = () => {
    if (unanswered.length) return;
    const next = buildAppliedCheckResult(answers, Number(savedResult.attemptCount || 0) + 1);
    setResult(next);
    setMode('result');
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        [practiceKey(screen.id)]: {
          ...screenRecord(prev, screen.id),
          inProgressAnswers: answers,
          appliedKnowledgeCheck: next,
          screen20: next,
          status: 'result-ready',
        },
      },
    }));
    window.setTimeout(() => resultRef.current?.focus(), 0);
  };

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`}>
      <OutputQualityCanvas labelledBy={`${screen.id}-title`} className="m3-b3-canvas">
        <header className="m3-b3-heading">
          <p>MODULE 3 · APPLIED CHECK</p>
          <h1 id={`${screen.id}-title`}>Applied Knowledge Check</h1>
          <span>Apply the ten main Module 3 design domains. The result is formative and identifies targeted review topics.</span>
        </header>
        {mode === 'question' && (
          <InteractionSurface labelledBy={`${question.id}-legend`} className="m3-b3-question-card">
            <div className="m3-b3-question-progress"><strong>Question {activeIndex + 1} of 10</strong><span>{unanswered.length} unanswered</span></div>
            <fieldset>
              <legend id={`${question.id}-legend`}><span>{question.domain}</span>{question.stem}<strong>{question.prompt}</strong></legend>
              <div className="m3-b3-question-options">
                {question.options.map((option) => (
                  <label key={option.id} className={answers[question.id] === option.id ? 'm3-b3-option is-selected' : 'm3-b3-option'}>
                    <input type="radio" name={question.id} value={option.id} checked={answers[question.id] === option.id} onChange={() => answer(option.id)} />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="m3-b3-question-nav">
              <button type="button" disabled={activeIndex === 0} onClick={() => { const index = activeIndex - 1; setActiveIndex(index); persistProgress(answers, index); }}>Previous</button>
              <button type="button" onClick={() => {
                if (activeIndex < 9) {
                  const index = activeIndex + 1;
                  setActiveIndex(index);
                  persistProgress(answers, index);
                } else setMode('review');
              }}>{activeIndex === 9 ? 'Review answers' : 'Next'}</button>
            </div>
            <GeneratedStatus>{unanswered.length ? `${unanswered.length} question${unanswered.length === 1 ? '' : 's'} unanswered.` : 'All ten questions are answered. Review before submission.'}</GeneratedStatus>
            {unanswered.length > 0 && <button type="button" className="m3-b3-text-action" onClick={() => { const index = batch3Questions.findIndex((item) => item.id === unanswered[0].id); setActiveIndex(index); persistProgress(answers, index); }}>Go to first unanswered question</button>}
          </InteractionSurface>
        )}
        {mode === 'review' && (
          <InteractionSurface labelledBy={`${screen.id}-review`} className="m3-b3-answer-review">
            <h2 id={`${screen.id}-review`}>Review answers before submission</h2>
            <ol>{batch3Questions.map((item, index) => <li key={item.id}><button type="button" onClick={() => { setActiveIndex(index); setMode('question'); }}><span>{index + 1}. {item.domain}</span><strong>{answers[item.id] ? 'Answered' : 'Unanswered'}</strong></button></li>)}</ol>
            <GeneratedStatus>{unanswered.length ? `${unanswered.length} unanswered. Submission remains disabled.` : 'All ten answers are ready to submit.'}</GeneratedStatus>
            <div className="m3-b3-action-panel"><button type="button" className="m3-oq-primary-action" onClick={() => setMode('question')}>Return to questions</button><button type="button" className="m3-oq-primary-action" disabled={unanswered.length > 0} onClick={submit}>Submit all answers</button></div>
          </InteractionSurface>
        )}
        {mode === 'result' && result && (
          <GeneratedOutputSurface labelledBy={`${screen.id}-result`} className="m3-b3-result">
            <p className="m3-oq-eyebrow">FORMATIVE RESULT</p>
            <h2 id={`${screen.id}-result`} ref={resultRef} tabIndex={-1}>{result.score}/10 · {result.score >= 8 ? 'Strong application' : result.score >= 6 ? 'Applied foundation with targeted review' : 'Further review recommended'}</h2>
            <p>Your answers remain saved. The score does not introduce a new pass/fail gate.</p>
            {result.targetedReviewTopics.length ? <section aria-labelledby={`${screen.id}-targets`}><h3 id={`${screen.id}-targets`}>Targeted review</h3><ul>{result.targetedReviewTopics.map((topic) => <li key={topic.domain}><strong>{topic.domain} · {topic.screen}</strong><span>{topic.feedback}</span></li>)}</ul></section> : <p className="m3-b3-success">All ten domains were applied correctly.</p>}
            <details><summary>Question feedback</summary><ol>{batch3Questions.map((item) => {
              const selected = item.options.find((option) => option.id === result.answers[item.id]);
              return <li key={item.id}><strong>{item.domain}: {result.answers[item.id] === item.correct ? 'Correct' : 'Review'}</strong><p>{selected?.feedback}</p></li>;
            })}</ol></details>
            <div className="m3-b3-action-panel"><button type="button" className="m3-oq-primary-action" onClick={() => { setMode('question'); setActiveIndex(0); }}>Review answers</button><button type="button" className="m3-oq-primary-action" onClick={() => onComplete({ appliedKnowledgeCheck: result, screen20: result, answers: result.answers, score: result.score, completed: true })}>Continue to portfolio</button></div>
          </GeneratedOutputSurface>
        )}
      </OutputQualityCanvas>
    </main>
  );
}

function legacyValue(source: Record<string, unknown>, candidates: string[], fallback: string) {
  for (const candidate of candidates) {
    const direct = text(source[candidate]);
    if (direct) return direct;
  }
  return fallback;
}

function productSignature(source: Record<string, unknown>, fallback: unknown, key: PortfolioProductKey) {
  return text(source.sourceSignature) || signature(fallback, `m3-${key}`);
}

export function buildFourPortfolioProducts(state: LearningState): PortfolioProduct[] {
  const savedSnapshot = record(screenRecord(state, 'M3-R21').finalSnapshot);
  const savedSignatures = record(savedSnapshot.sourceSignatures);
  const context = canonical(state, 'M3-R05', 'contextInsight');
  const contextLegacy = record(screenRecord(state, 'M3-R05').contextInequalityScan);
  const actor = canonical(state, 'M3-R09', 'actorPowerInsight');
  const actorLegacy = screenRecord(state, 'M3-R09');
  const repaired = canonical(state, 'M3-R14', 'repairedDesignElement');
  const repairedLegacy = screenRecord(state, 'M3-R14');
  const proposal = canonical(state, 'M3-R17', 'proposalReviewInsight') as Partial<ProposalReviewInsight>;
  const proposalLegacy = screenRecord(state, 'M3-R17');
  const proposalExpected = proposal.selectedGapId && proposal.selectedRepairId
    ? buildProposalReviewInsight(state, proposal.selectedGapId, proposal.selectedRepairId, text(proposal.learnerEditedRepair))
    : null;

  const make = (
    key: PortfolioProductKey,
    title: string,
    sourceScreenId: string,
    source: Record<string, unknown>,
    legacy: Record<string, unknown>,
    fields: Array<{ label: string; value: string }>,
    sourceIsStale = false,
  ): PortfolioProduct => {
    const hasCanonical = Object.keys(source).length > 0;
    const hasLegacy = Object.keys(legacy).length > 0;
    const currentSignature = productSignature(source, fields, key);
    const savedSignature = text(savedSignatures[key]);
    const status: ProductStatus = hasCanonical
      ? sourceIsStale || Boolean(savedSignature && savedSignature !== currentSignature) ? 'Updated source available' : 'Current'
      : hasLegacy ? 'Based on earlier course version' : 'Missing source';
    return { key, title, sourceScreenId, status, fields, sourceSignature: currentSignature };
  };

  return [
    make('contextInsight', 'Context and Inequality Insight', 'M3-R05', context, contextLegacy, [
      { label: 'Affected group', value: pick(context, ['priorityAffectedGroup', 'affectedGroup'], legacyValue(contextLegacy, ['portfolioSummaryText'], 'Earlier context analysis retained.')) },
      { label: 'Context factors', value: pick(context, ['contextFactors', 'selectedContextualConditions'], legacyValue(contextLegacy, ['generatedDesignImplications'], 'Review the earlier context record.')) },
      { label: 'Inequality pattern', value: pick(context, ['inequalityPattern'], 'Different groups may experience information, access and influence barriers differently.') },
      { label: 'Access or participation effect', value: pick(context, ['accessParticipationEffect'], 'The design should test whether the identified barriers affect access or influence.') },
      { label: 'Evidence gap', value: pick(context, ['evidenceGap', 'remainingVerification'], 'Verify the pattern with proportionate, non-identifying evidence.') },
      { label: 'Design implication', value: pick(context, ['designImplication'], legacyValue(contextLegacy, ['generatedDesignImplications'], 'Adapt access and participation arrangements to the verified barriers.')) },
    ]),
    make('actorPowerInsight', 'Actor and Power Insight', 'M3-R09', actor, actorLegacy, [
      { label: 'Actor relationships', value: pick(actor, ['actorRelationships', 'actorSummary'], legacyValue(actorLegacy, ['powerMapSummary'], 'Earlier actor analysis retained.')) },
      { label: 'Formal responsibility', value: pick(actor, ['formalResponsibility'], 'Keep the relevant public or service responsibility visible.') },
      { label: 'Practical influence', value: pick(actor, ['practicalInfluence'], 'Recognize actors who shape information, access or decisions without confusing influence with mandate.') },
      { label: 'Likely position', value: pick(actor, ['likelyPosition'], 'Confirm likely support or resistance through constructive engagement.') },
      { label: 'Capacity gap', value: pick(canonical(state, 'M3-R10', 'canonicalCausalCapacityPathway'), ['capacityResponseGap'], 'Review the saved cause and capacity finding.') },
      { label: 'Safe engagement recommendation', value: pick(actor, ['recommendation', 'safeEngagementRecommendation'], 'Use non-identifying evidence, alternative participation routes and a clear response responsibility.') },
    ]),
    make('repairedDesignElement', 'Repaired Project-Design Element', 'M3-R14', repaired, repairedLegacy, [
      { label: 'Original weakness', value: pick(repaired, ['originalWeakness'], 'Earlier design weakness retained.') },
      { label: 'Repaired objective', value: pick(repaired, ['repairedObjective'], legacyValue(repairedLegacy, ['portfolioSummary'], 'Review the earlier repaired design record.')) },
      { label: 'Activity package', value: pick(repaired, ['activityPackage'], 'Barrier-responsive activities linked to responsible actors and evidence.') },
      { label: 'Participation', value: pick(repaired, ['participationMechanism'], 'Accessible participation before decisions.') },
      { label: 'Accountability', value: pick(repaired, ['accountabilityMechanism'], 'Receipt, response, explanation and follow-up.') },
      { label: 'Inclusion', value: pick(repaired, ['inclusionAccessibilityFeature'], 'Accessibility and reasonable accommodation built into implementation.') },
      { label: 'Safeguard', value: pick(repaired, ['riskSafeguard'], 'Risk-aware alternatives, mitigation and monitoring.') },
      { label: 'Indicator or watch-point', value: pick(repaired, ['indicatorWatchPoint'], 'Monitor equitable access, influence and response.') },
      { label: 'Implementation implication', value: pick(repaired, ['implementationImplication'], 'Review evidence and adapt the design when barriers remain.') },
    ]),
    make('proposalReviewInsight', 'Proposal-Review Insight', 'M3-R17', proposal as Record<string, unknown>, proposalLegacy, [
      { label: 'Proposal gap', value: pick(proposal as Record<string, unknown>, ['priorityProposalGap'], legacyValue(proposalLegacy, ['draftPlanReviewNote'], 'Earlier proposal review retained.')) },
      { label: 'HRBA principle', value: pick(proposal as Record<string, unknown>, ['relevantHrbaPrinciple'], 'Review the earlier course-version proposal finding.') },
      { label: 'Evidence', value: pick(proposal as Record<string, unknown>, ['caseAndLearnerEvidence'], 'Earlier evidence remains available in the saved review.') },
      { label: 'Repair', value: pick(proposal as Record<string, unknown>, ['proposedRepair'], 'Review the earlier repaired proposal wording.') },
      { label: 'Expected improvement', value: pick(proposal as Record<string, unknown>, ['expectedImprovement'], 'The repair should improve rights-responsiveness and accountability.') },
      { label: 'Watch-point', value: pick(proposal as Record<string, unknown>, ['implementationWatchPoint'], 'Monitor whether the repair functions during implementation.') },
    ], Boolean(proposalExpected && proposal.sourceSignature !== proposalExpected.sourceSignature)),
  ];
}

function portfolioSourceSignature(products: PortfolioProduct[], assessment: Record<string, unknown>) {
  return signature({ products: products.map((product) => [product.key, product.sourceSignature]), assessment: assessment.submittedAt || assessment.score }, 'm3-portfolio');
}

export function buildFourProductSnapshot(
  products: PortfolioProduct[],
  assessment: Record<string, unknown>,
  ownCsoNote: string,
  existing?: Partial<FourProductSnapshot> | null,
  savedAt = new Date().toISOString(),
): FourProductSnapshot {
  const sourceSignature = portfolioSourceSignature(products, assessment);
  const note = ownCsoNote.trim();
  const canReuse = existing?.snapshotStatus === 'saved'
    && existing.sourceSignature === sourceSignature
    && existing.ownCsoNote === note
    && existing.products?.length === 4;
  if (canReuse) return existing as FourProductSnapshot;
  return {
    ...(existing || {}),
    modelVersion: MODEL_VERSION,
    canonicalProductKeys: ['contextInsight', 'actorPowerInsight', 'repairedDesignElement', 'proposalReviewInsight'],
    products,
    sourceSignatures: Object.fromEntries(products.map((product) => [product.key, product.sourceSignature])) as Record<PortfolioProductKey, string>,
    sourceSignature,
    ownCsoNote: note,
    snapshotStatus: 'saved',
    savedAt,
  };
}

function downloadSnapshot(snapshot: FourProductSnapshot) {
  const markdown = `# Module 3 Portfolio Snapshot\n\n${snapshot.products.map((product) => `## ${product.title}\nStatus: ${product.status}\n\n${product.fields.map((field) => `- **${field.label}:** ${field.value}`).join('\n')}`).join('\n\n')}\n\n## Optional own-CSO reflection\n${snapshot.ownCsoNote || 'No optional reflection recorded.'}`;
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'module-3-four-product-portfolio.md';
  anchor.click();
  URL.revokeObjectURL(url);
}

export function FourProductPortfolioScreen({
  screen,
  state,
  onChangeState,
  onComplete,
  onEditSource,
}: ScreenProps & { onEditSource: (screenId: string) => void }) {
  const products = useMemo(() => buildFourPortfolioProducts(state), [state]);
  const record21 = screenRecord(state, screen.id);
  const saved = record(record21.finalSnapshot) as Partial<FourProductSnapshot>;
  const assessment = record(screenRecord(state, 'M3-R20').appliedKnowledgeCheck);
  const historical = historicalModule3Completion(state);
  const [note, setNote] = useState(text(saved.ownCsoNote));
  const [message, setMessage] = useState('');
  const [localSnapshot, setLocalSnapshot] = useState<FourProductSnapshot | null>(saved.products?.length === 4 ? saved as FourProductSnapshot : null);
  const sourceSignature = portfolioSourceSignature(products, assessment);
  const current = Boolean(localSnapshot?.snapshotStatus === 'saved' && localSnapshot.sourceSignature === sourceSignature && localSnapshot.ownCsoNote === note.trim());
  const blocking = products.filter((product) => product.status === 'Missing source' || product.status === 'Updated source available');
  const canSave = blocking.length === 0 && Object.keys(assessment).length > 0;
  const canContinue = historical || current;

  const save = () => {
    if (!canSave) return;
    const next = buildFourProductSnapshot(products, assessment, note, localSnapshot);
    setLocalSnapshot(next);
    setMessage('Four-product portfolio snapshot saved.');
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        [practiceKey(screen.id)]: {
          ...screenRecord(prev, screen.id),
          module3PortfolioModelVersion: MODEL_VERSION,
          finalSnapshot: next,
          module3PortfolioSnapshot: next,
          m3ProjectDesignImprovementSnapshot: next,
          sourceSignature: next.sourceSignature,
          savedAt: next.savedAt,
          snapshotStatus: 'saved',
          ownCsoNote: next.ownCsoNote,
        },
      },
    }));
  };

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`}>
      <OutputQualityCanvas labelledBy={`${screen.id}-title`} className="m3-b3-canvas">
        <header className="m3-b3-heading">
          <p>MODULE 3 · PORTFOLIO</p>
          <h1 id={`${screen.id}-title`}>Final Module 3 Portfolio Snapshot</h1>
          <span>Review the four authoritative products. Legacy micro-artifacts remain preserved as source data and are not repeated as competing outputs.</span>
        </header>
        <section className="m3-b3-portfolio-status" aria-label="Portfolio readiness">
          <strong>{products.filter((product) => product.status === 'Current').length}/4 current products</strong>
          <span>{historical ? 'Historical Module 3 completion remains valid.' : blocking.length ? `${blocking.length} product${blocking.length === 1 ? '' : 's'} need attention.` : 'Ready to save.'}</span>
        </section>
        <section className="m3-b3-portfolio-grid" aria-label="Four authoritative Module 3 portfolio products">
          {products.map((product, index) => (
            <article key={product.key} aria-labelledby={`${screen.id}-${product.key}`} className={`m3-b3-product is-${product.status.toLowerCase().replaceAll(' ', '-')}`}>
              <header><span>Product {index + 1}</span><strong>{product.status}</strong><h2 id={`${screen.id}-${product.key}`}>{product.title}</h2></header>
              <dl>{product.fields.map((field) => <div key={field.label}><dt>{field.label}</dt><dd>{field.value}</dd></div>)}</dl>
              {product.status !== 'Current' && !historical && <button type="button" className="m3-b3-text-action" onClick={() => onEditSource(product.sourceScreenId)}>{product.status === 'Missing source' ? 'Complete source' : 'Edit or update source'} · {product.sourceScreenId}</button>}
            </article>
          ))}
        </section>
        <section className="m3-b3-portfolio-note" aria-labelledby={`${screen.id}-note`}>
          <h2 id={`${screen.id}-note`}>Optional own-CSO reflection</h2>
          <p>Record one generalized point only. Do not include names, confidential proposal text, complaints or identifiable details.</p>
          <textarea aria-label="Optional own-CSO reflection" maxLength={400} value={note} onChange={(event) => { setNote(event.target.value); setMessage('Optional reflection changed; save again to include it.'); }} />
          <small>{note.length}/400 characters</small>
        </section>
        <section className="m3-b3-save-panel" aria-labelledby={`${screen.id}-save`}>
          <h2 id={`${screen.id}-save`}>Save Snapshot</h2>
          {!canSave && !historical && <p><strong>Before saving:</strong> {blocking.length ? `update ${blocking.map((product) => product.title).join(', ')}.` : 'complete the Applied Knowledge Check.'}</p>}
          <div><button type="button" className="m3-oq-primary-action" disabled={!canSave} onClick={save}>Save Snapshot</button><button type="button" disabled={!current} onClick={() => localSnapshot && downloadSnapshot(localSnapshot)} aria-label="Download Module 3 four-product portfolio">Download</button></div>
          <p role="status" aria-live="polite">{message || (current ? 'Snapshot saved and current.' : historical ? 'Earlier completed snapshot remains accepted.' : 'Review the four products and save when ready.')}</p>
        </section>
        <div className="m3-b3-action-panel">
          <button type="button" className="m3-oq-primary-action" disabled={!canContinue} onClick={() => onComplete({
            module3PortfolioModelVersion: MODEL_VERSION,
            finalSnapshot: localSnapshot || saved,
            module3PortfolioSnapshot: localSnapshot || saved,
            sourceSignature: localSnapshot?.sourceSignature || text(saved.sourceSignature),
            historicalCompletionPreserved: historical,
          })}>Continue to Module 3 Closure</button>
        </div>
      </OutputQualityCanvas>
    </main>
  );
}

export function Module3CompletionScreen({
  screen,
  state,
  onChangeState,
  onCompleteModule,
  onReturnSnapshot,
}: {
  screen: Module3RevisedScreen;
  state: LearningState;
  onChangeState: ChangeState;
  onCompleteModule: () => void;
  onReturnSnapshot: () => void;
}) {
  const products = buildFourPortfolioProducts(state);
  const saved = record(screenRecord(state, 'M3-R21').finalSnapshot) as Partial<FourProductSnapshot>;
  const assessment = record(screenRecord(state, 'M3-R20').appliedKnowledgeCheck);
  const historical = historicalModule3Completion(state);
  const snapshotCurrent = Boolean(saved.snapshotStatus === 'saved' && saved.sourceSignature === portfolioSourceSignature(products, assessment));
  const closure = screenRecord(state, screen.id);
  const [acknowledged, setAcknowledged] = useState(closure.acknowledged === true);
  const ready = historical || (snapshotCurrent && acknowledged);

  const updateAcknowledgement = (checked: boolean) => {
    setAcknowledged(checked);
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        [practiceKey(screen.id)]: {
          ...screenRecord(prev, screen.id),
          acknowledged: checked,
          acknowledgedAt: checked ? new Date().toISOString() : null,
        },
      },
    }));
  };

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`}>
      <OutputQualityCanvas labelledBy={`${screen.id}-title`} className="m3-b3-canvas">
        <header className="m3-b3-heading">
          <p>MODULE 3 · COMPLETE</p>
          <h1 id={`${screen.id}-title`}>{historical || snapshotCurrent ? 'Module 3 complete' : 'Portfolio snapshot required'}</h1>
          <span>{historical ? 'Your valid earlier Module 3 completion remains preserved.' : 'Confirm the current four-product snapshot, then continue to Module 4.'}</span>
        </header>
        <section className="m3-b3-completion-products" aria-labelledby={`${screen.id}-products`}>
          <h2 id={`${screen.id}-products`}>Four saved learning products</h2>
          <ol>{products.map((product) => <li key={product.key}><strong>{product.title}</strong><span>{product.status}</span></li>)}</ol>
        </section>
        {!snapshotCurrent && !historical && <section className="m3-b3-blocker" role="status"><h2>Snapshot needs attention</h2><p>Return to Screen 21 to save the current four-product portfolio before completing Module 3.</p><button type="button" onClick={onReturnSnapshot}>Return to Portfolio Snapshot</button></section>}
        <section className="m3-b3-bridge" aria-labelledby={`${screen.id}-bridge`}>
          <h2 id={`${screen.id}-bridge`}>Bridge to Module 4</h2>
          <p>Use the saved design decisions during implementation: monitor access, influence, responsible-actor response, inclusion, safeguards and the proposal watch-point.</p>
          {!historical && <label><input type="checkbox" disabled={!snapshotCurrent} checked={acknowledged} onChange={(event) => updateAcknowledgement(event.target.checked)} /><span>I reviewed the current four-product snapshot and will carry its watch-points into implementation.</span></label>}
        </section>
        <GeneratedStatus>{ready ? 'Module 4 is ready to open.' : !snapshotCurrent ? 'Save the current Screen 21 snapshot first.' : 'Confirm the acknowledgement to continue.'}</GeneratedStatus>
        <div className="m3-b3-action-panel"><button type="button" className="m3-oq-primary-action" disabled={!ready} onClick={onCompleteModule}>Continue to Module 4</button></div>
      </OutputQualityCanvas>
    </main>
  );
}

export const module3Batch3RubricEvidence = {
  proposalReviewInsight: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  contextInsightPresentation: [4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 4],
  actorPowerPresentation: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  repairedDesignPresentation: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  proposalReviewPresentation: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
} as const;
