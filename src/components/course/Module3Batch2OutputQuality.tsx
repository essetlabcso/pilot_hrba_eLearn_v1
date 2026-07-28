/* eslint-disable react-refresh/only-export-components -- builders are exported with the screens for contract tests */
import { useMemo, useState } from 'react';
import type { LearningState } from '../../state/learningState';
import type { Module3RevisedScreen } from '../../data/module3/module3RevisedScreens';
import {
  GeneratedOutputSurface,
  GeneratedStatus,
  InteractionSurface,
  OutputQualityCanvas,
} from './Module3OutputQuality';

type ChangeState = (updater: (previous: LearningState) => LearningState) => void;
type Props = {
  screen: Module3RevisedScreen;
  state: LearningState;
  onChangeState: ChangeState;
  onComplete: (value?: Record<string, unknown>) => void;
};
type Choice = { id: string; label: string; description: string };

const MODEL_VERSION = 3;

function practiceKey(screenId: string) {
  return `module3_revised_${screenId.toLowerCase().replaceAll('-', '_')}`;
}

function readRecord(state: LearningState, screenId: string) {
  const value = state.practiceCheckState[practiceKey(screenId)];
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function record(value: unknown) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function text(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function strings(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function signature(parts: unknown[]) {
  return JSON.stringify(parts);
}

function persist(onChangeState: ChangeState, screenId: string, patch: Record<string, unknown>) {
  onChangeState((previous) => ({
    ...previous,
    practiceCheckState: {
      ...previous.practiceCheckState,
      [practiceKey(screenId)]: {
        ...readRecord(previous, screenId),
        module3PortfolioModelVersion: MODEL_VERSION,
        ...patch,
      },
    },
  }));
}

function Heading({ screen, description }: { screen: Module3RevisedScreen; description: string }) {
  return (
    <header className="m3-oq-heading">
      <p>{screen.eyebrow}</p>
      <h1 id={`${screen.id}-title`}>{screen.title}</h1>
      <span>{screen.phase}</span>
      <p>{description}</p>
    </header>
  );
}

function RadioCards({
  legend,
  name,
  choices,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  choices: Choice[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="m3-oq-choice-group">
      <legend>{legend}</legend>
      <div className="m3-oq-choice-grid">
        {choices.map((choice) => {
          const selected = value === choice.id;
          return (
            <label key={choice.id} className={`m3-oq-choice${selected ? ' is-selected' : ''}`}>
              <input
                type="radio"
                name={name}
                value={choice.id}
                checked={selected}
                onChange={() => onChange(choice.id)}
              />
              <span className="m3-oq-choice__status" aria-hidden="true">{selected ? '✓' : '○'}</span>
              <span>
                <strong>{choice.label}</strong>
                <small>{choice.description}</small>
                <em>{selected ? 'Selected' : 'Select'}</em>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Actions({
  ready,
  current,
  guidance,
  onGenerate,
  onContinue,
  continueLabel,
}: {
  ready: boolean;
  current: boolean;
  guidance: string;
  onGenerate: () => void;
  onContinue: () => void;
  continueLabel: string;
}) {
  return (
    <div className="m3-oq-actions">
      <GeneratedStatus testId="m3-b2-guidance">{guidance}</GeneratedStatus>
      <div>
        <button type="button" className="m3-oq-secondary-action" disabled={!ready} onClick={onGenerate}>
          {current ? 'Update generated output' : 'Generate output'}
        </button>
        <button type="button" className="m3-oq-primary-action" disabled={!current} onClick={onContinue}>
          {continueLabel}
        </button>
      </div>
    </div>
  );
}

const directCauseChoices: Choice[] = [
  { id: 'late-information', label: 'Information arrives late or through too few channels', description: 'People cannot prepare or influence priorities before decisions are shaped.' },
  { id: 'access-cost', label: 'Distance, time, transport, or accessibility limits practical access', description: 'A formal invitation does not remove the real cost of participating.' },
  { id: 'unclear-response', label: 'Responsibility and response arrangements are unclear', description: 'Concerns may be collected without a named responder or follow-up point.' },
];

const deeperFactorChoices: Choice[] = [
  { id: 'unequal-influence', label: 'Unequal influence over planning decisions', description: 'Actors with formal or informal power may shape priorities before lower-influence groups can contribute.' },
  { id: 'routine-exclusion', label: 'Routine planning methods assume one channel works for everyone', description: 'Timing, format, location, and representation can reproduce exclusion.' },
  { id: 'weak-accountability', label: 'Weak accountability between consultation and action', description: 'There may be no agreed duty to explain decisions or adapt the design.' },
];

const capacityGapChoices: Choice[] = [
  { id: 'coordination', label: 'Coordination and role clarity gap', description: 'Mandated and supporting actors have not agreed who receives, decides, responds, and follows up.' },
  { id: 'accessibility', label: 'Accessible participation and accommodation gap', description: 'Formats, transport, timing, communication, or reasonable accommodation are not planned.' },
  { id: 'response', label: 'Feedback-response and monitoring gap', description: 'There is no reliable process to answer feedback, record adaptation, and review unresolved barriers.' },
];

const designResponseChoices: Choice[] = [
  { id: 'early-access', label: 'Provide early accessible information and supported preparation', description: 'Use more than one channel before options are fixed.' },
  { id: 'roles-review', label: 'Agree responsibility, response timing, and a joint review point', description: 'Keep public responsibility visible while Awra facilitates evidence and follow-up.' },
  { id: 'adapt-monitor', label: 'Build accommodation, response, and adaptation into implementation', description: 'Monitor whether barriers reduce and adjust when evidence shows they remain.' },
];

const causeLabels = Object.fromEntries(directCauseChoices.map((item) => [item.id, item.label]));
const deeperLabels = Object.fromEntries(deeperFactorChoices.map((item) => [item.id, item.label]));
const gapLabels = Object.fromEntries(capacityGapChoices.map((item) => [item.id, item.label]));
const responseLabels = Object.fromEntries(designResponseChoices.map((item) => [item.id, item.label]));

export type CanonicalCausalCapacityPathway = {
  observedIssue: string;
  caseEvidence: string;
  likelyDirectCause: string;
  possibleDeeperFactor: string;
  capacityResponseGap: string;
  responsibleRelevantActor: string;
  practicalDesignResponse: string;
  issueRequiringVerification: string;
  evidenceStatuses: Array<{ id: string; label: 'Observed' | 'Likely' | 'Possible' | 'Requires verification'; value: string }>;
  optionalLearnerNote: string;
  sourceSignature: string;
  generatedAt: string;
};

export function buildCanonicalCausalCapacityPathway(
  directCause: string,
  deeperFactor: string,
  capacityGap: string,
  designResponse: string,
  note: string,
  dependencies: {
    context: Record<string, unknown>;
    rightsHolder: Record<string, unknown>;
    actors: Record<string, unknown>;
    power: Record<string, unknown>;
  },
): CanonicalCausalCapacityPathway {
  const group = text(dependencies.context.priorityAffectedGroup) || 'priority rights-holder groups';
  const contextFactors = strings(dependencies.context.selectedContextualConditions);
  const actorMap = record(dependencies.actors.actorRelationshipMap);
  const dutyBearer = text(actorMap.primaryDutyBearer)
    || strings(dependencies.actors.selectedDutyBearers)[0]
    || 'the responsible woreda planning or service office';
  const powerInsight = record(dependencies.power.actorPowerInsight);
  const blocker = text(powerInsight.selectedBlocker) || 'actors with stronger formal or informal influence';
  const evidence = contextFactors.length
    ? `Jiru Amba evidence identifies ${contextFactors.join(' and ').toLowerCase()}, with possible effects on ${group.toLowerCase()}.`
    : 'Jiru Amba evidence shows late information, distance, accessibility, response, and influence concerns across the proposed service improvements.';
  const observedIssue = `The draft plan does not yet show how ${group.toLowerCase()} can access information, influence decisions, and receive a responsible response before implementation.`;
  const directCauseLabel = causeLabels[directCause] || 'the selected direct-cause pattern';
  const deeperFactorLabel = deeperLabels[deeperFactor] || 'the selected deeper factor';
  const capacityGapLabel = gapLabels[capacityGap] || 'the selected capacity or response gap';
  const designResponseLabel = responseLabels[designResponse] || 'the selected practical design response';
  const verification = `Verify with generalized, non-identifying evidence whether ${directCauseLabel.toLowerCase()} is the main immediate cause and how ${blocker.toLowerCase()} affects the response.`;
  const sourceSignature = signature([
    directCause,
    deeperFactor,
    capacityGap,
    designResponse,
    text(dependencies.context.sourceSignature),
    text(record(dependencies.rightsHolder.rightsHolderBarrierMap).sourceSignature),
    text(actorMap.sourceSignature),
    text(powerInsight.sourceSignature),
  ]);
  return {
    observedIssue,
    caseEvidence: evidence,
    likelyDirectCause: directCauseLabel,
    possibleDeeperFactor: deeperFactorLabel,
    capacityResponseGap: capacityGapLabel,
    responsibleRelevantActor: `${dutyBearer} retains the response responsibility; Awra supports safe evidence, participation, and follow-up without replacing that mandate.`,
    practicalDesignResponse: designResponseLabel,
    issueRequiringVerification: verification,
    evidenceStatuses: [
      { id: 'issue', label: 'Observed', value: observedIssue },
      { id: 'direct', label: 'Likely', value: directCauseLabel },
      { id: 'deeper', label: 'Possible', value: deeperFactorLabel },
      { id: 'verify', label: 'Requires verification', value: verification },
    ],
    optionalLearnerNote: note.trim(),
    sourceSignature,
    generatedAt: new Date().toISOString(),
  };
}

function legacyChoiceId(value: unknown, choices: Choice[]) {
  const candidate = text(value);
  if (!candidate) return '';
  return choices.find((item) => item.id === candidate || item.label === candidate)?.id || '';
}

export function RootCauseCapacityOutputScreen({ screen, state, onChangeState, onComplete }: Props) {
  const saved = readRecord(state, screen.id);
  const context = record(readRecord(state, 'M3-R05').contextInsight);
  const rightsHolder = readRecord(state, 'M3-R07');
  const actors = readRecord(state, 'M3-R08');
  const power = readRecord(state, 'M3-R09');
  const savedCanonical = record(saved.canonicalCausalCapacityPathway);
  const legacyMap = record(saved.rootCauseCapacityGapMap);
  const [directCause, setDirectCause] = useState(
    text(saved.prototypeDirectCause)
      || legacyChoiceId(savedCanonical.likelyDirectCause, directCauseChoices)
      || legacyChoiceId(legacyMap.directCause, directCauseChoices),
  );
  const [deeperFactor, setDeeperFactor] = useState(
    text(saved.prototypeDeeperFactor)
      || legacyChoiceId(savedCanonical.possibleDeeperFactor, deeperFactorChoices)
      || legacyChoiceId(legacyMap.rootCause, deeperFactorChoices),
  );
  const [capacityGap, setCapacityGap] = useState(
    text(saved.prototypeCapacityGap)
      || legacyChoiceId(savedCanonical.capacityResponseGap, capacityGapChoices)
      || legacyChoiceId(legacyMap.capacityGap, capacityGapChoices),
  );
  const [designResponse, setDesignResponse] = useState(
    text(saved.prototypeDesignResponse)
      || legacyChoiceId(savedCanonical.practicalDesignResponse, designResponseChoices)
      || legacyChoiceId(legacyMap.designImplications, designResponseChoices),
  );
  const [note, setNote] = useState(
    text(saved.prototypeOptionalNote)
      || text(savedCanonical.optionalLearnerNote)
      || text(saved.learnerAuthoredNote),
  );
  const expected = useMemo(() => buildCanonicalCausalCapacityPathway(
    directCause,
    deeperFactor,
    capacityGap,
    designResponse,
    note,
    { context, rightsHolder, actors, power },
  ).sourceSignature, [actors, capacityGap, context, deeperFactor, designResponse, directCause, note, power, rightsHolder]);
  const [generated, setGenerated] = useState<CanonicalCausalCapacityPathway | null>(
    savedCanonical.sourceSignature === expected ? savedCanonical as CanonicalCausalCapacityPathway : null,
  );

  const update = (field: 'direct' | 'deeper' | 'gap' | 'response', value: string) => {
    const next = {
      direct: field === 'direct' ? value : directCause,
      deeper: field === 'deeper' ? value : deeperFactor,
      gap: field === 'gap' ? value : capacityGap,
      response: field === 'response' ? value : designResponse,
    };
    if (field === 'direct') setDirectCause(value);
    if (field === 'deeper') setDeeperFactor(value);
    if (field === 'gap') setCapacityGap(value);
    if (field === 'response') setDesignResponse(value);
    setGenerated(null);
    persist(onChangeState, screen.id, {
      prototypeDirectCause: next.direct,
      prototypeDeeperFactor: next.deeper,
      prototypeCapacityGap: next.gap,
      prototypeDesignResponse: next.response,
      prototypeOptionalNote: note,
    });
  };
  const decisions = [directCause, deeperFactor, capacityGap, designResponse].filter(Boolean).length;
  const ready = decisions === 4;
  const guidance = !ready
    ? `Complete ${4 - decisions} remaining analytical decision${4 - decisions === 3 ? 's' : 4 - decisions === 1 ? '' : 's'}.`
    : generated
      ? 'The current causal and capacity pathway is ready to continue.'
      : 'Four focused decisions are complete. Generate the analytical pathway.';

  const generate = () => {
    if (!ready) return;
    const next = buildCanonicalCausalCapacityPathway(
      directCause,
      deeperFactor,
      capacityGap,
      designResponse,
      note,
      { context, rightsHolder, actors, power },
    );
    setGenerated(next);
    persist(onChangeState, screen.id, {
      prototypeDirectCause: directCause,
      prototypeDeeperFactor: deeperFactor,
      prototypeCapacityGap: capacityGap,
      prototypeDesignResponse: designResponse,
      prototypeOptionalNote: note,
      canonicalCausalCapacityPathway: next,
      canonicalCausalCapacitySourceSignature: next.sourceSignature,
    });
  };

  const complete = () => {
    if (!generated) return;
    onComplete({
      module3PortfolioModelVersion: MODEL_VERSION,
      submitted: true,
      prototypeDirectCause: directCause,
      prototypeDeeperFactor: deeperFactor,
      prototypeCapacityGap: capacityGap,
      prototypeDesignResponse: designResponse,
      prototypeOptionalNote: note,
      canonicalCausalCapacityPathway: generated,
      canonicalCausalCapacitySourceSignature: generated.sourceSignature,
      rootCauseCapacityGapMap: {
        observedIssue: generated.observedIssue,
        directCause: generated.likelyDirectCause,
        rootCause: generated.possibleDeeperFactor,
        capacityGap: generated.capacityResponseGap,
        responsibleActor: generated.responsibleRelevantActor,
        designImplications: generated.practicalDesignResponse,
        evidenceQuestion: generated.issueRequiringVerification,
      },
      rootCauseSummary: `${generated.likelyDirectCause}. ${generated.capacityResponseGap}. ${generated.practicalDesignResponse}.`,
      learnerAuthoredNote: note,
      screen10: {
        screenId: 'M3-R10',
        submitted: true,
        canonicalCausalCapacityPathway: generated,
      },
    });
  };

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`} data-testid="m3-r10-output-quality">
      <OutputQualityCanvas labelledBy={`${screen.id}-title`}>
        <Heading screen={screen} description="Make four focused judgments. The course will combine them with your saved context, barriers, actor responsibilities, and power analysis." />
        <InteractionSurface labelledBy={`${screen.id}-interaction`}>
          <h2 id={`${screen.id}-interaction`}>Choose the causal and capacity anchors</h2>
          <p className="m3-b2-carry"><strong>Carried forward:</strong> priority groups and barriers, responsible actors, and the saved power-and-influence insight.</p>
          <RadioCards legend="1. Most plausible direct-cause pattern" name="m3-r10-direct" choices={directCauseChoices} value={directCause} onChange={(value) => update('direct', value)} />
          <RadioCards legend="2. Possible deeper factor" name="m3-r10-deeper" choices={deeperFactorChoices} value={deeperFactor} onChange={(value) => update('deeper', value)} />
          <RadioCards legend="3. Most relevant capacity or response gap" name="m3-r10-gap" choices={capacityGapChoices} value={capacityGap} onChange={(value) => update('gap', value)} />
          <RadioCards legend="4. Practical design response" name="m3-r10-response" choices={designResponseChoices} value={designResponse} onChange={(value) => update('response', value)} />
          <label className="m3-oq-optional-note">
            Optional analysis note
            <textarea
              maxLength={240}
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
                persist(onChangeState, screen.id, { prototypeOptionalNote: event.target.value });
              }}
            />
            <span>{note.length}/240 · Optional and never required to continue.</span>
          </label>
        </InteractionSurface>
        {generated && (
          <GeneratedOutputSurface labelledBy={`${screen.id}-output`}>
            <p className="m3-oq-eyebrow">GENERATED ANALYTICAL PRODUCT</p>
            <h2 id={`${screen.id}-output`}>Root-Cause and Capacity-Gap Map</h2>
            <ol className="m3-b2-causal-chain" aria-label="Causal and capacity pathway">
              {generated.evidenceStatuses.map((item) => (
                <li key={item.id}>
                  <span className={`m3-b2-status is-${item.label.toLowerCase().replace(' ', '-')}`}>{item.label}</span>
                  <p>{item.value}</p>
                </li>
              ))}
            </ol>
            <dl className="m3-b2-output-details">
              <div><dt>Observed issue</dt><dd>{generated.observedIssue}</dd></div>
              <div><dt>Case evidence</dt><dd>{generated.caseEvidence}</dd></div>
              <div><dt>Likely direct cause</dt><dd>{generated.likelyDirectCause}</dd></div>
              <div><dt>Possible deeper/root factor</dt><dd>{generated.possibleDeeperFactor}</dd></div>
              <div><dt>Capacity or response gap</dt><dd>{generated.capacityResponseGap}</dd></div>
              <div><dt>Responsible or relevant actor</dt><dd>{generated.responsibleRelevantActor}</dd></div>
              <div><dt>Practical design response</dt><dd>{generated.practicalDesignResponse}</dd></div>
              <div><dt>Issue requiring further verification</dt><dd>{generated.issueRequiringVerification}</dd></div>
            </dl>
          </GeneratedOutputSurface>
        )}
        <Actions ready={ready} current={Boolean(generated && generated.sourceSignature === expected)} guidance={guidance} onGenerate={generate} onContinue={complete} continueLabel={screen.continueLabel} />
      </OutputQualityCanvas>
    </main>
  );
}

const inclusionStatusChoices: Choice[] = [
  { id: 'adequate', label: 'Adequately addressed', description: 'The current design includes a credible arrangement and responsible follow-up.' },
  { id: 'partial', label: 'Partially addressed', description: 'The intent is visible, but an important arrangement or responsibility is incomplete.' },
  { id: 'improve', label: 'Requires improvement', description: 'The design does not yet provide a credible way to address this domain.' },
];

type InclusionDomain = 'participation' | 'accessibility' | 'influence';
type InclusionScorecardRow = {
  id: InclusionDomain;
  title: string;
  status: string;
  relevantCaseEvidence: string;
  currentGap: string;
  recommendedAdaptation: string;
  responsibleActorRole: string;
  monitoringSignal: string;
};

export type InclusionDesignScorecard = {
  domains: InclusionScorecardRow[];
  priorityGroups: string[];
  selectedStatuses: Record<InclusionDomain, string>;
  optionalLearnerNote: string;
  sourceSignature: string;
  generatedAt: string;
};

const domainContent: Record<InclusionDomain, Omit<InclusionScorecardRow, 'status' | 'responsibleActorRole'>> = {
  participation: {
    id: 'participation',
    title: 'Meaningful participation',
    relevantCaseEvidence: 'The draft mentions consultation, but information timing, preparation, direct influence, response, and follow-up are not fully agreed.',
    currentGap: 'Attendance alone does not show that lower-influence groups shape priorities before decisions.',
    recommendedAdaptation: 'Provide early accessible information, supported preparation, more than one participation route, and a record of how priorities influenced decisions.',
    monitoringSignal: 'A non-identifying decision record shows which priorities received a response or changed the design.',
  },
  accessibility: {
    id: 'accessibility',
    title: 'Accessibility',
    relevantCaseEvidence: 'Distance, transport, timing, physical access, communication formats, and reasonable accommodation may affect access.',
    currentGap: 'The draft does not yet assign resources or responsibility for accessible information and accommodation.',
    recommendedAdaptation: 'Plan accessible formats, timing, venue, transport or remote participation support, and reasonable accommodation before engagement begins.',
    monitoringSignal: 'Accessibility checks are completed and required adjustments are provided and used.',
  },
  influence: {
    id: 'influence',
    title: 'Roles, power, and decision influence',
    relevantCaseEvidence: 'Formal responsibility and practical influence do not necessarily sit with the same actors in Jiru Amba.',
    currentGap: 'Stronger actors may shape decisions while affected groups are heard late or only through representatives.',
    recommendedAdaptation: 'Keep public responsibility explicit, enable direct rights-holder influence, and use a safe engagement strategy for blocking or gatekeeping actors.',
    monitoringSignal: 'Responsible actors explain decisions and lower-influence groups can identify how their input was considered.',
  },
};

export function buildInclusionDesignScorecard(
  statuses: Record<InclusionDomain, string>,
  note: string,
  dependencies: {
    context: Record<string, unknown>;
    rightsHolder: Record<string, unknown>;
    actors: Record<string, unknown>;
    causal: Record<string, unknown>;
  },
): InclusionDesignScorecard {
  const groups = strings(dependencies.rightsHolder.selectedGroups);
  const actorMap = record(dependencies.actors.actorRelationshipMap);
  const responsible = text(actorMap.primaryDutyBearer)
    || strings(dependencies.actors.selectedDutyBearers)[0]
    || 'the responsible planning or service actor';
  const gap = text(dependencies.causal.capacityResponseGap);
  const rows = (Object.keys(domainContent) as InclusionDomain[]).map((id) => {
    const source = domainContent[id];
    const statusChoice = inclusionStatusChoices.find((choice) => choice.id === statuses[id]);
    return {
      ...source,
      status: statusChoice?.label || 'Requires improvement',
      currentGap: id === 'accessibility' && gap
        ? `${source.currentGap} The saved causal analysis also identifies: ${gap.toLowerCase()}.`
        : source.currentGap,
      responsibleActorRole: `${responsible} addresses the design requirement; Awra facilitates accessible evidence and follow-up without taking over the mandate.`,
    };
  });
  return {
    domains: rows,
    priorityGroups: groups.length ? groups : [text(dependencies.context.priorityAffectedGroup) || 'Priority Jiru Amba rights-holder groups'],
    selectedStatuses: statuses,
    optionalLearnerNote: note.trim(),
    sourceSignature: signature([
      statuses,
      text(dependencies.context.sourceSignature),
      text(record(dependencies.rightsHolder.rightsHolderBarrierMap).sourceSignature),
      text(actorMap.sourceSignature),
      text(dependencies.causal.sourceSignature),
    ]),
    generatedAt: new Date().toISOString(),
  };
}

function normalizeLegacyStatus(value: unknown) {
  const candidate = text(value).toLowerCase();
  if (candidate.includes('adequate') || candidate === 'built-in') return 'adequate';
  if (candidate.includes('partial') || candidate.includes('mentioned')) return 'partial';
  if (candidate.includes('improve') || candidate.includes('missing')) return 'improve';
  return '';
}

function readLegacyDomainStatus(saved: Record<string, unknown>, domain: InclusionDomain) {
  const simplified = record(saved.prototypeDomainStatuses);
  if (text(simplified[domain])) return text(simplified[domain]);
  const scorecard = record(saved.inclusionDesignScorecard);
  const selected = record(scorecard.selectedStatuses);
  if (text(selected[domain])) return text(selected[domain]);
  const legacySubmission = record(saved.screen11);
  const marker = record(saved.markerLiteDashboard);
  const source = record(legacySubmission.selectedDomainStatuses || marker.selectedDomainStatuses || saved.selectedDomainStatuses);
  return normalizeLegacyStatus(source[domain]);
}

export function InclusionDesignScorecardScreen({ screen, state, onChangeState, onComplete }: Props) {
  const saved = readRecord(state, screen.id);
  const context = record(readRecord(state, 'M3-R05').contextInsight);
  const rightsHolder = readRecord(state, 'M3-R07');
  const actors = readRecord(state, 'M3-R08');
  const causal = record(readRecord(state, 'M3-R10').canonicalCausalCapacityPathway);
  const savedScorecard = record(saved.inclusionDesignScorecard);
  const [statuses, setStatuses] = useState<Record<InclusionDomain, string>>({
    participation: readLegacyDomainStatus(saved, 'participation'),
    accessibility: readLegacyDomainStatus(saved, 'accessibility'),
    influence: readLegacyDomainStatus(saved, 'influence'),
  });
  const [note, setNote] = useState(
    text(saved.prototypeOptionalNote)
      || text(savedScorecard.optionalLearnerNote)
      || text(saved.learnerAuthoredNote),
  );
  const expected = useMemo(() => buildInclusionDesignScorecard(
    statuses,
    note,
    { context, rightsHolder, actors, causal },
  ).sourceSignature, [actors, causal, context, note, rightsHolder, statuses]);
  const [generated, setGenerated] = useState<InclusionDesignScorecard | null>(
    savedScorecard.sourceSignature === expected ? savedScorecard as InclusionDesignScorecard : null,
  );
  const update = (domain: InclusionDomain, value: string) => {
    const next = { ...statuses, [domain]: value };
    setStatuses(next);
    setGenerated(null);
    persist(onChangeState, screen.id, { prototypeDomainStatuses: next, selectedDomainStatuses: next });
  };
  const completed = Object.values(statuses).filter(Boolean).length;
  const ready = completed === 3;
  const guidance = !ready
    ? `Complete ${3 - completed} remaining inclusion judgment${3 - completed === 1 ? '' : 's'}.`
    : generated
      ? 'The current Inclusion Design Scorecard is ready to continue.'
      : 'Three domain judgments are complete. Generate the scorecard.';
  const generate = () => {
    if (!ready) return;
    const next = buildInclusionDesignScorecard(statuses, note, { context, rightsHolder, actors, causal });
    setGenerated(next);
    persist(onChangeState, screen.id, {
      prototypeDomainStatuses: statuses,
      selectedDomainStatuses: statuses,
      prototypeOptionalNote: note,
      inclusionDesignScorecard: next,
      inclusionDesignScorecardSourceSignature: next.sourceSignature,
      selectedRepairs: next.domains.map((domain) => domain.recommendedAdaptation),
    });
  };
  const complete = () => {
    if (!generated) return;
    const selectedRepairs = generated.domains.map((domain) => domain.recommendedAdaptation);
    onComplete({
      module3PortfolioModelVersion: MODEL_VERSION,
      submitted: true,
      prototypeDomainStatuses: statuses,
      selectedDomainStatuses: statuses,
      prototypeOptionalNote: note,
      learnerAuthoredNote: note,
      inclusionDesignScorecard: generated,
      inclusionDesignScorecardSourceSignature: generated.sourceSignature,
      selectedRepairs,
      markerLiteDashboard: {
        selectedDomainStatuses: statuses,
        selectedRepairRows: generated.domains.map((domain) => ({
          domain: domain.title,
          status: domain.status,
          repairSelected: domain.recommendedAdaptation,
        })),
      },
      portfolioSummary: `The inclusion scorecard keeps ${generated.domains.map((domain) => domain.title.toLowerCase()).join(', ')} visible as separate design requirements.`,
      carryForwardQuestion: 'Which participation, accountability, and risk arrangements will implement these adaptations?',
      screen11: {
        screenId: 'M3-R11',
        submitted: true,
        inclusionDesignScorecard: generated,
      },
    });
  };

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`} data-testid="m3-r11-output-quality">
      <OutputQualityCanvas labelledBy={`${screen.id}-title`}>
        <Heading screen={screen} description="Judge three distinct design domains. The course will generate evidence-based adaptations, responsibilities, and monitoring signals." />
        <InteractionSurface labelledBy={`${screen.id}-interaction`}>
          <h2 id={`${screen.id}-interaction`}>Review the three inclusion domains</h2>
          <p className="m3-b2-carry"><strong>Carried forward:</strong> priority groups and barriers, actor responsibilities, and causal or capacity findings.</p>
          <RadioCards legend="1. Meaningful participation" name="m3-r11-participation" choices={inclusionStatusChoices} value={statuses.participation} onChange={(value) => update('participation', value)} />
          <RadioCards legend="2. Accessibility" name="m3-r11-accessibility" choices={inclusionStatusChoices} value={statuses.accessibility} onChange={(value) => update('accessibility', value)} />
          <RadioCards legend="3. Roles, power, and decision influence" name="m3-r11-influence" choices={inclusionStatusChoices} value={statuses.influence} onChange={(value) => update('influence', value)} />
          <label className="m3-oq-optional-note">
            Optional inclusion note
            <textarea
              maxLength={240}
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
                persist(onChangeState, screen.id, { prototypeOptionalNote: event.target.value });
              }}
            />
            <span>{note.length}/240 · Optional and never required to continue.</span>
          </label>
        </InteractionSurface>
        {generated && (
          <GeneratedOutputSurface labelledBy={`${screen.id}-output`}>
            <p className="m3-oq-eyebrow">GENERATED DESIGN PRODUCT</p>
            <h2 id={`${screen.id}-output`}>Inclusion Design Scorecard</h2>
            <p><strong>Priority groups:</strong> {generated.priorityGroups.join(', ')}</p>
            <div className="m3-b2-scorecard">
              {generated.domains.map((domain) => (
                <article key={domain.id}>
                  <header>
                    <h3>{domain.title}</h3>
                    <span className={`m3-b2-domain-status is-${generated.selectedStatuses[domain.id]}`}>✓ {domain.status}</span>
                  </header>
                  <dl>
                    <div><dt>Relevant case evidence</dt><dd>{domain.relevantCaseEvidence}</dd></div>
                    <div><dt>Current gap</dt><dd>{domain.currentGap}</dd></div>
                    <div><dt>Recommended adaptation</dt><dd>{domain.recommendedAdaptation}</dd></div>
                    <div><dt>Responsible actor or role</dt><dd>{domain.responsibleActorRole}</dd></div>
                    <div><dt>Monitoring signal</dt><dd>{domain.monitoringSignal}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </GeneratedOutputSurface>
        )}
        <Actions ready={ready} current={Boolean(generated && generated.sourceSignature === expected)} guidance={guidance} onGenerate={generate} onContinue={complete} continueLabel={screen.continueLabel} />
      </OutputQualityCanvas>
    </main>
  );
}

const riskChoices: Choice[] = [
  { id: 'exclusion', label: 'Priority groups remain excluded from information or decisions', description: 'Timing, format, distance, accessibility, or gatekeeping may prevent meaningful influence.' },
  { id: 'exposure', label: 'Feedback exposes people or creates retaliation risk', description: 'Names, complaint details, or public attribution may make a channel unsafe.' },
  { id: 'expectations', label: 'Participation creates expectations that cannot be met', description: 'Unclear roles or promises may shift responsibility to Awra or undermine trust.' },
  { id: 'capture', label: 'Stronger actors capture priorities or resources', description: 'Formal or informal influence may redirect decisions away from lower-influence groups.' },
];

const mitigationChoices: Choice[] = [
  { id: 'multi-channel', label: 'Use early accessible information and more than one safe participation route', description: 'Reduce exclusion without assuming one method suits every group.' },
  { id: 'non-identifying', label: 'Use non-identifying feedback, restricted access, and a clear escalation boundary', description: 'Minimize information and avoid promising guaranteed confidentiality or protection.' },
  { id: 'role-clarity', label: 'State role limits, response responsibility, and what the project can realistically change', description: 'Prevent unrealistic expectations and keep public responsibility visible.' },
  { id: 'transparent-review', label: 'Use transparent criteria and a rights-holder review point before decisions', description: 'Reduce capture and document how competing priorities were handled.' },
];

type RiskMatrixRow = {
  id: string;
  risk: string;
  whoMayBeAffected: string;
  triggerWarningCondition: string;
  mitigation: string;
  monitoringSignal: string;
  responsibleResponder: string;
  safeFollowUpAction: string;
  remainingUncertainty: string;
};

export type CanonicalRiskDoNoHarmMatrix = {
  rows: RiskMatrixRow[];
  selectedRiskIds: string[];
  mitigationByRisk: Record<string, string>;
  sourceSignature: string;
  generatedAt: string;
};

export function buildCanonicalRiskMatrix(
  selectedRiskIds: string[],
  mitigationByRisk: Record<string, string>,
  dependencies: {
    rightsHolder: Record<string, unknown>;
    actors: Record<string, unknown>;
    power: Record<string, unknown>;
    inclusion: Record<string, unknown>;
    pathway: Record<string, unknown>;
  },
): CanonicalRiskDoNoHarmMatrix {
  const groups = strings(dependencies.rightsHolder.selectedGroups);
  const actorMap = record(dependencies.actors.actorRelationshipMap);
  const primaryActor = text(actorMap.primaryDutyBearer)
    || strings(dependencies.actors.selectedDutyBearers)[0]
    || 'the responsible public or service actor';
  const powerInsight = record(dependencies.power.actorPowerInsight);
  const blocker = text(powerInsight.selectedBlocker) || 'stronger formal or informal actors';
  const scorecard = record(dependencies.inclusion.inclusionDesignScorecard);
  const adaptations = Array.isArray(scorecard.domains)
    ? (scorecard.domains as Array<Record<string, unknown>>).map((item) => text(item.recommendedAdaptation)).filter(Boolean)
    : strings(dependencies.inclusion.selectedRepairs);
  const pathwayMethod = text(dependencies.pathway.responseMethod) || 'the agreed feedback-response route';
  const content: Record<string, Omit<RiskMatrixRow, 'id' | 'risk' | 'mitigation'>> = {
    exclusion: {
      whoMayBeAffected: groups.length ? groups.join(', ') : 'Women traders, remote kebele residents, young informal workers, and persons with disabilities',
      triggerWarningCondition: 'One or more priority groups receive information late, cannot use the participation route, or are absent from decision evidence.',
      monitoringSignal: 'Participation and decision records show whether priority groups received accessible information and influenced at least one decision.',
      responsibleResponder: `${primaryActor} addresses access and response barriers; Awra supports accessible participation and non-identifying follow-up.`,
      safeFollowUpAction: adaptations[0] || 'Adapt timing, formats, venue, preparation support, or direct participation routes before proceeding.',
      remainingUncertainty: 'Verify which practical barrier is most important for each group; do not infer needs from identity alone.',
    },
    exposure: {
      whoMayBeAffected: 'People raising service, access, discrimination, or accountability concerns, especially those with less practical influence',
      triggerWarningCondition: 'Feedback requests names, complaint details, disability details, accusations, or public attribution that are not necessary.',
      monitoringSignal: `Review whether ${pathwayMethod.toLowerCase()} can operate with minimal, non-identifying information and a safe response boundary.`,
      responsibleResponder: `${primaryActor} owns the formal response; Awra pauses unsafe collection and uses an appropriate referral or escalation route where one exists.`,
      safeFollowUpAction: 'Remove unnecessary identifiers, explain limits, restrict access, and stop or redirect the process if safe handling cannot be maintained.',
      remainingUncertainty: 'No process can guarantee safety, confidentiality, protection, or non-retaliation; verify feasible safeguards before use.',
    },
    expectations: {
      whoMayBeAffected: 'Rights-holders expecting services or remedies beyond the project mandate, and Awra staff facing role pressure',
      triggerWarningCondition: 'Facilitators promise outcomes, response dates, confidentiality, or public action that responsible actors have not agreed.',
      monitoringSignal: 'Check whether information materials and responses state role boundaries, realistic timelines, and unresolved decisions.',
      responsibleResponder: `${primaryActor} explains public decisions and constraints; Awra communicates its facilitation role and records unanswered issues.`,
      safeFollowUpAction: 'Correct expectations early, document what can and cannot change, and schedule a responsible-actor explanation.',
      remainingUncertainty: 'Verify whether responsible actors have the mandate, resources, and willingness to make the proposed change.',
    },
    capture: {
      whoMayBeAffected: groups.length ? groups.join(', ') : 'Lower-influence rights-holder groups',
      triggerWarningCondition: `${blocker} dominates option-setting, representation, resource allocation, or the public account of priorities.`,
      monitoringSignal: 'Compare who shaped options, who participated directly, whose priorities received reasons, and what changed before approval.',
      responsibleResponder: `${primaryActor} applies transparent criteria; Awra supports independent rights-holder preparation and documented account-back.`,
      safeFollowUpAction: 'Create a direct rights-holder review point and use the saved safe engagement strategy before final decisions.',
      remainingUncertainty: 'Verify the actor’s actual influence and likely position rather than treating the analytical map as confirmed fact.',
    },
  };
  const rows = selectedRiskIds.map((id) => ({
    id,
    risk: riskChoices.find((choice) => choice.id === id)?.label || id,
    mitigation: mitigationChoices.find((choice) => choice.id === mitigationByRisk[id])?.label || mitigationByRisk[id],
    ...content[id],
  }));
  return {
    rows,
    selectedRiskIds,
    mitigationByRisk,
    sourceSignature: signature([
      selectedRiskIds,
      mitigationByRisk,
      text(record(dependencies.rightsHolder.rightsHolderBarrierMap).sourceSignature),
      text(actorMap.sourceSignature),
      text(powerInsight.sourceSignature),
      text(scorecard.sourceSignature),
      text(dependencies.pathway.sourceSignature),
    ]),
    generatedAt: new Date().toISOString(),
  };
}

function recoverLegacyRisks(saved: Record<string, unknown>) {
  const direct = strings(saved.prototypeSelectedRiskIds);
  if (direct.length) return direct.slice(0, 2);
  const board = record(saved.canonicalRiskDoNoHarmMatrix);
  const boardIds = strings(board.selectedRiskIds);
  if (boardIds.length) return boardIds.slice(0, 2);
  const legacyBoard = record(saved.riskDoNoHarmBoard);
  const rows = Array.isArray(legacyBoard.rows) ? legacyBoard.rows as Array<Record<string, unknown>> : [];
  return rows.map((row) => {
    const value = `${text(row.risk)} ${text(row.riskTitle)}`.toLowerCase();
    if (value.includes('expos') || value.includes('retali')) return 'exposure';
    if (value.includes('expect')) return 'expectations';
    if (value.includes('capture') || value.includes('power')) return 'capture';
    return 'exclusion';
  }).filter((id, index, all) => all.indexOf(id) === index).slice(0, 2);
}

export function RiskDoNoHarmMatrixScreen({ screen, state, onChangeState, onComplete }: Props) {
  const saved = readRecord(state, screen.id);
  const rightsHolder = readRecord(state, 'M3-R07');
  const actors = readRecord(state, 'M3-R08');
  const power = readRecord(state, 'M3-R09');
  const inclusion = readRecord(state, 'M3-R11');
  const pathway = record(readRecord(state, 'M3-R12').canonicalPathwaySummary || readRecord(state, 'M3-R12').participationAccountabilityPathway);
  const savedMatrix = record(saved.canonicalRiskDoNoHarmMatrix);
  const [selectedRiskIds, setSelectedRiskIds] = useState(recoverLegacyRisks(saved));
  const [mitigationByRisk, setMitigationByRisk] = useState<Record<string, string>>(
    record(saved.prototypeMitigationByRisk) as Record<string, string>,
  );
  const expected = useMemo(() => buildCanonicalRiskMatrix(
    selectedRiskIds,
    mitigationByRisk,
    { rightsHolder, actors, power, inclusion, pathway },
  ).sourceSignature, [actors, inclusion, mitigationByRisk, pathway, power, rightsHolder, selectedRiskIds]);
  const [generated, setGenerated] = useState<CanonicalRiskDoNoHarmMatrix | null>(
    savedMatrix.sourceSignature === expected ? savedMatrix as CanonicalRiskDoNoHarmMatrix : null,
  );
  const toggleRisk = (id: string) => {
    const next = selectedRiskIds.includes(id)
      ? selectedRiskIds.filter((item) => item !== id)
      : selectedRiskIds.length < 2 ? [...selectedRiskIds, id] : selectedRiskIds;
    const nextMitigations = Object.fromEntries(Object.entries(mitigationByRisk).filter(([riskId]) => next.includes(riskId)));
    setSelectedRiskIds(next);
    setMitigationByRisk(nextMitigations);
    setGenerated(null);
    persist(onChangeState, screen.id, {
      prototypeSelectedRiskIds: next,
      prototypeMitigationByRisk: nextMitigations,
    });
  };
  const setMitigation = (riskId: string, value: string) => {
    const next = { ...mitigationByRisk, [riskId]: value };
    setMitigationByRisk(next);
    setGenerated(null);
    persist(onChangeState, screen.id, {
      prototypeSelectedRiskIds: selectedRiskIds,
      prototypeMitigationByRisk: next,
    });
  };
  const completedMitigations = selectedRiskIds.filter((id) => mitigationByRisk[id]).length;
  const ready = selectedRiskIds.length === 2 && completedMitigations === 2;
  const guidance = selectedRiskIds.length < 2
    ? `Select ${2 - selectedRiskIds.length} more priority risk${2 - selectedRiskIds.length === 1 ? '' : 's'}.`
    : completedMitigations < 2
      ? `Select a mitigation for ${2 - completedMitigations} remaining risk${2 - completedMitigations === 1 ? '' : 's'}.`
      : generated
        ? 'The current Risk and Do-No-Harm Matrix is ready to continue.'
        : 'Two risks and their mitigations are complete. Generate the operational matrix.';
  const generate = () => {
    if (!ready) return;
    const next = buildCanonicalRiskMatrix(
      selectedRiskIds,
      mitigationByRisk,
      { rightsHolder, actors, power, inclusion, pathway },
    );
    setGenerated(next);
    persist(onChangeState, screen.id, {
      prototypeSelectedRiskIds: selectedRiskIds,
      prototypeMitigationByRisk: mitigationByRisk,
      canonicalRiskDoNoHarmMatrix: next,
      canonicalRiskDoNoHarmSourceSignature: next.sourceSignature,
      riskDoNoHarmBoard: {
        rows: next.rows,
        monitoringSignal: next.rows.map((row) => row.monitoringSignal).join(' '),
        sourceSignature: next.sourceSignature,
      },
    });
  };
  const complete = () => {
    if (!generated) return;
    onComplete({
      module3PortfolioModelVersion: MODEL_VERSION,
      submitted: true,
      prototypeSelectedRiskIds: selectedRiskIds,
      prototypeMitigationByRisk: mitigationByRisk,
      canonicalRiskDoNoHarmMatrix: generated,
      canonicalRiskDoNoHarmSourceSignature: generated.sourceSignature,
      riskDoNoHarmBoard: {
        rows: generated.rows,
        monitoringSignal: generated.rows.map((row) => row.monitoringSignal).join(' '),
        sourceSignature: generated.sourceSignature,
      },
      selectedRiskIds,
      selectedMitigations: Object.values(mitigationByRisk),
      portfolioSummary: generated.rows.map((row) => `${row.risk}: ${row.mitigation}`).join(' '),
      screen13: {
        screenId: 'M3-R13',
        submitted: true,
        canonicalRiskDoNoHarmMatrix: generated,
      },
    });
  };

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`} data-testid="m3-r13-output-quality">
      <OutputQualityCanvas labelledBy={`${screen.id}-title`}>
        <Heading screen={screen} description="Choose two priority risks and one mitigation for each. The course will generate monitoring, response, follow-up, and uncertainty details." />
        <InteractionSurface labelledBy={`${screen.id}-interaction`}>
          <h2 id={`${screen.id}-interaction`}>Choose the two operational risk pathways</h2>
          <p className="m3-b2-carry"><strong>Carried forward:</strong> barriers, actor and power findings, inclusion adaptations, and the participation pathway.</p>
          <fieldset className="m3-oq-choice-group">
            <legend>1. Select exactly two priority risks</legend>
            <div className="m3-oq-choice-grid">
              {riskChoices.map((choice) => {
                const selected = selectedRiskIds.includes(choice.id);
                const unavailable = !selected && selectedRiskIds.length >= 2;
                return (
                  <label key={choice.id} className={`m3-oq-choice${selected ? ' is-selected' : ''}`}>
                    <input type="checkbox" checked={selected} disabled={unavailable} onChange={() => toggleRisk(choice.id)} />
                    <span className="m3-oq-choice__status" aria-hidden="true">{selected ? '✓' : '□'}</span>
                    <span>
                      <strong>{choice.label}</strong>
                      <small>{choice.description}</small>
                      <em>{selected ? 'Selected' : unavailable ? 'Two selected' : 'Select'}</em>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          {selectedRiskIds.map((riskId, index) => (
            <RadioCards
              key={riskId}
              legend={`${index + 2}. Mitigation for ${riskChoices.find((choice) => choice.id === riskId)?.label}`}
              name={`m3-r13-${riskId}`}
              choices={mitigationChoices}
              value={mitigationByRisk[riskId] || ''}
              onChange={(value) => setMitigation(riskId, value)}
            />
          ))}
        </InteractionSurface>
        {generated && (
          <GeneratedOutputSurface labelledBy={`${screen.id}-output`}>
            <p className="m3-oq-eyebrow">GENERATED OPERATIONAL PRODUCT</p>
            <h2 id={`${screen.id}-output`}>Risk and Do-No-Harm Matrix</h2>
            <p className="m3-b2-safety-note">This matrix supports safer design; it does not guarantee safety, protection, confidentiality, or non-retaliation.</p>
            <ol className="m3-b2-risk-list" aria-label="Risk and do-no-harm pathways">
              {generated.rows.map((row) => (
                <li key={row.id}>
                  <h3>{row.risk}</h3>
                  <div className="m3-b2-risk-flow" aria-hidden="true">
                    <span>Risk</span><b>→</b><span>Mitigate</span><b>→</b><span>Monitor</span><b>→</b><span>Respond</span><b>→</b><span>Follow up</span>
                  </div>
                  <dl>
                    <div><dt>Who may be affected</dt><dd>{row.whoMayBeAffected}</dd></div>
                    <div><dt>Trigger or warning condition</dt><dd>{row.triggerWarningCondition}</dd></div>
                    <div><dt>Mitigation</dt><dd>{row.mitigation}</dd></div>
                    <div><dt>Monitoring signal</dt><dd>{row.monitoringSignal}</dd></div>
                    <div><dt>Responsible responder</dt><dd>{row.responsibleResponder}</dd></div>
                    <div><dt>Safe follow-up action</dt><dd>{row.safeFollowUpAction}</dd></div>
                    <div><dt>Remaining uncertainty</dt><dd>{row.remainingUncertainty}</dd></div>
                  </dl>
                </li>
              ))}
            </ol>
          </GeneratedOutputSurface>
        )}
        <Actions ready={ready} current={Boolean(generated && generated.sourceSignature === expected)} guidance={guidance} onGenerate={generate} onContinue={complete} continueLabel={screen.continueLabel} />
      </OutputQualityCanvas>
    </main>
  );
}

export const module3Batch2RubricTargets = {
  powerAndInfluence: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  causalCapacity: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  inclusionScorecard: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  participationPathway: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  riskMatrix: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  repairedDesign: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
} as const;
