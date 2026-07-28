/* eslint-disable react-refresh/only-export-components -- builders are exported for focused contract tests */
import { useState } from 'react';
import type { LearningState } from '../../state/learningState';
import type { Module3RevisedScreen } from '../../data/module3/module3RevisedScreens';
import {
  GeneratedOutputSurface,
  GeneratedStatus,
  InteractionSurface,
  OutputQualityCanvas,
  VisualizationLegend,
} from './Module3OutputQuality';

type ChangeState = (updater: (previous: LearningState) => LearningState) => void;

type Batch1Props = {
  screen: Module3RevisedScreen;
  state: LearningState;
  onChangeState: ChangeState;
  onComplete: (value?: Record<string, unknown>) => void;
};

type Choice = {
  id: string;
  label: string;
  description: string;
};

const MODEL_VERSION = 3;

function practiceKey(screenId: string) {
  return `module3_revised_${screenId.toLowerCase().replaceAll('-', '_')}`;
}

function readRecord(state: LearningState, screenId: string) {
  const canonical = state.practiceCheckState?.[practiceKey(screenId)];
  const legacy = state.practiceCheckState?.[screenId];
  const value = canonical && typeof canonical === 'object' ? canonical : legacy;
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function persist(
  onChangeState: ChangeState,
  screenId: string,
  patch: Record<string, unknown>,
) {
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

function strings(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function text(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function record(value: unknown) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function signature(parts: unknown[]) {
  return JSON.stringify(parts);
}

function Heading({
  screen,
  description,
}: {
  screen: Module3RevisedScreen;
  description: string;
}) {
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
            <label
              key={choice.id}
              className={`m3-oq-choice${selected ? ' is-selected' : ''}`}
            >
              <input
                type="radio"
                name={name}
                value={choice.id}
                checked={selected}
                onChange={() => onChange(choice.id)}
              />
              <span className="m3-oq-choice__status" aria-hidden="true">
                {selected ? '✓' : '○'}
              </span>
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

function GenerateActions({
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
      <GeneratedStatus testId="m3-b1-guidance">{guidance}</GeneratedStatus>
      <div>
        <button
          type="button"
          className="m3-oq-secondary-action"
          disabled={!ready}
          onClick={onGenerate}
          data-testid="m3-b1-generate"
        >
          {current ? 'Update generated output' : 'Generate output'}
        </button>
        <button
          type="button"
          className="m3-oq-primary-action"
          disabled={!current}
          onClick={onContinue}
          data-testid="m3-b1-continue"
        >
          {continueLabel}
        </button>
      </div>
    </div>
  );
}

const standardChoices: Choice[] = [
  {
    id: 'unequal-access',
    label: 'Identify unequal access and differentiated barriers',
    description: 'Check who is affected differently and why.',
  },
  {
    id: 'influence-before-decision',
    label: 'Enable influence before decisions, not attendance only',
    description: 'Create a realistic opportunity to shape priorities.',
  },
  {
    id: 'response-explanation',
    label: 'Create feedback, response, and explanation arrangements',
    description: 'Clarify how responsible actors receive and answer concerns.',
  },
];

const standards = [
  {
    id: 'non-discrimination',
    label: 'Non-discrimination and equality',
    correct: 'unequal-access',
    evidence: 'Women vendors, remote kebele residents, informal youth workers, and persons with disabilities face different information, time, distance, and accessibility barriers.',
    requirement: 'Identify differentiated barriers and remove unequal access conditions.',
    implication: 'Use disaggregated, non-identifying evidence and budget for accessibility, timing, and outreach adjustments.',
  },
  {
    id: 'participation',
    label: 'Participation',
    correct: 'influence-before-decision',
    evidence: 'Jiru Amba consultations counted attendance, but priority groups did not influence the final market and water-service decisions.',
    requirement: 'Create influence before priorities and activities are finalized.',
    implication: 'Use early briefings, accessible participation routes, and a documented decision-response step.',
  },
  {
    id: 'accountability',
    label: 'Accountability',
    correct: 'response-explanation',
    evidence: 'Participants received no clear explanation of which concerns were accepted, deferred, or assigned to a responsible public actor.',
    requirement: 'Record concerns, responsible actors, responses, and follow-up.',
    implication: 'Add a response register and review point that preserves public responsibility rather than shifting it to Awra.',
  },
] as const;

export type StandardsPracticeRow = {
  id: string;
  standard: string;
  jiruAmbaEvidence: string;
  practicalRequirement: string;
  designImplication: string;
};

export type StandardsPracticeMap = {
  rows: StandardsPracticeRow[];
  contextPriority: string;
  sourceSignature: string;
  generatedAt: string;
};

export function buildStandardsPracticeMap(
  matches: Record<string, string>,
  contextInsight: Record<string, unknown>,
): StandardsPracticeMap {
  const group = text(contextInsight.priorityAffectedGroup) || 'priority rights-holder groups';
  const factors = strings(contextInsight.selectedContextualConditions);
  const contextPriority = factors.length
    ? `${group}: ${factors.join(' and ')}`
    : `${group}: confirm differentiated barriers using the Jiru Amba case evidence`;
  return {
    rows: standards.map((item) => ({
      id: item.id,
      standard: item.label,
      jiruAmbaEvidence: item.evidence,
      practicalRequirement: item.requirement,
      designImplication: `${item.implication} Apply this to the current context priority: ${contextPriority}.`,
    })),
    contextPriority,
    sourceSignature: signature([
      matches,
      text(contextInsight.sourceSignature),
      text(contextInsight.priorityAffectedGroup),
      strings(contextInsight.selectedContextualConditions),
    ]),
    generatedAt: new Date().toISOString(),
  };
}

export function StandardsPracticeMapScreen({
  screen,
  state,
  onChangeState,
  onComplete,
}: Batch1Props) {
  const saved = readRecord(state, screen.id);
  const contextInsight = record(readRecord(state, 'M3-R05').contextInsight);
  const initialMatches = record(saved.prototypeMatches || saved.matches);
  const legacyMatchValues: Record<string, string> = {
    'access-barriers': 'unequal-access',
    'influence-not-headcount': 'influence-before-decision',
    'feedback-response': 'response-explanation',
  };
  const [matches, setMatches] = useState<Record<string, string>>(
    Object.fromEntries(
      Object.entries(initialMatches)
        .filter(([, value]) => typeof value === 'string')
        .map(([key, value]) => [key, legacyMatchValues[value as string] || value]),
    ) as Record<string, string>,
  );
  const expected = signature([
    matches,
    text(contextInsight.sourceSignature),
    text(contextInsight.priorityAffectedGroup),
    strings(contextInsight.selectedContextualConditions),
  ]);
  const savedMap = record(saved.standardsToPracticeMap);
  const [generated, setGenerated] = useState<StandardsPracticeMap | null>(
    savedMap.sourceSignature === expected ? savedMap as StandardsPracticeMap : null,
  );

  const update = (standardId: string, choiceId: string) => {
    const next = { ...matches, [standardId]: choiceId };
    setMatches(next);
    setGenerated(null);
    persist(onChangeState, screen.id, {
      prototypeMatches: next,
      matches: next,
    });
  };

  const completed = standards.filter((item) => matches[item.id]).length;
  const incorrect = standards.filter(
    (item) => matches[item.id] && matches[item.id] !== item.correct,
  );
  const ready = standards.every((item) => matches[item.id] === item.correct);
  const guidance = completed < standards.length
    ? `Complete ${standards.length - completed} remaining standards match${standards.length - completed === 1 ? '' : 'es'}.`
    : incorrect.length
      ? `Review ${incorrect.length} match${incorrect.length === 1 ? '' : 'es'}: use the practical meaning of each HRBA principle.`
      : generated
        ? 'The current Standards-to-Practice Map is ready to continue.'
        : 'All three relationships are correct. Generate the Standards-to-Practice Map.';

  const generate = () => {
    if (!ready) return;
    const next = buildStandardsPracticeMap(matches, contextInsight);
    setGenerated(next);
    persist(onChangeState, screen.id, {
      prototypeMatches: matches,
      matches,
      standardsToPracticeMap: next,
      generatedMapRows: next.rows,
    });
  };

  const complete = () => {
    if (!generated) return;
    onComplete({
      module3PortfolioModelVersion: MODEL_VERSION,
      submitted: true,
      selectedAnchorIds: ['non-discrimination', 'participation', 'accountability'],
      matches,
      standardsToPracticeMap: generated,
      generatedMapRows: generated.rows,
      signalReferenceMatches: standards.map((item) => ({
        signalId: item.id,
        anchorId: item.id,
      })),
    });
  };

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`} data-testid="m3-r06-output-quality">
      <OutputQualityCanvas labelledBy={`${screen.id}-title`}>
        <Heading
          screen={screen}
          description="Make three practical matches. The course will combine them with your Context and Inequality Insight and Jiru Amba evidence."
        />
        <InteractionSurface labelledBy={`${screen.id}-interaction`}>
          <h2 id={`${screen.id}-interaction`}>Match standards to project practice</h2>
          {standards.map((item, index) => (
            <div className="m3-b1-match" key={item.id}>
              <RadioCards
                legend={`${index + 1}. ${item.label}`}
                name={`m3-r06-${item.id}`}
                choices={standardChoices}
                value={matches[item.id] || ''}
                onChange={(value) => update(item.id, value)}
              />
              {matches[item.id] && (
                <p className={`m3-b1-inline-feedback${matches[item.id] === item.correct ? ' is-correct' : ''}`} role="status">
                  {matches[item.id] === item.correct
                    ? 'Correct relationship. This principle now has a practical design meaning.'
                    : `Review this relationship: ${item.requirement}`}
                </p>
              )}
            </div>
          ))}
        </InteractionSurface>
        {generated && (
          <GeneratedOutputSurface labelledBy={`${screen.id}-output`} className="m3-b1-standards-output">
            <p className="m3-oq-eyebrow">FOUNDATIONAL ANALYTICAL OUTPUT</p>
            <h2 id={`${screen.id}-output`}>Standards-to-Practice Map</h2>
            <p><strong>Carried context priority:</strong> {generated.contextPriority}</p>
            <ol className="m3-b1-output-rows" aria-label="Standards to practice relationships">
              {generated.rows.map((row) => (
                <li key={row.id}>
                  <h3>{row.standard}</h3>
                  <dl>
                    <div><dt>Jiru Amba evidence</dt><dd>{row.jiruAmbaEvidence}</dd></div>
                    <div><dt>Practical requirement</dt><dd>{row.practicalRequirement}</dd></div>
                    <div><dt>Design implication</dt><dd>{row.designImplication}</dd></div>
                  </dl>
                </li>
              ))}
            </ol>
          </GeneratedOutputSurface>
        )}
        <GenerateActions
          ready={ready}
          current={Boolean(generated && generated.sourceSignature === expected)}
          guidance={guidance}
          onGenerate={generate}
          onContinue={complete}
          continueLabel={screen.continueLabel}
        />
      </OutputQualityCanvas>
    </main>
  );
}

const groupChoices: Choice[] = [
  { id: 'women-vendors', label: 'Women market vendors', description: 'Water, care, timing, sanitation, and market-allocation constraints may reinforce each other.' },
  { id: 'remote-residents', label: 'Remote kebele residents', description: 'Distance, transport cost, and late information may reduce access and influence.' },
  { id: 'informal-youth', label: 'Young informal workers', description: 'Formal notices and eligibility rules may exclude informal livelihoods.' },
  { id: 'persons-disabilities', label: 'Persons with disabilities', description: 'Facilities, formats, communication, and participation routes may be inaccessible.' },
];

const barrierChoices: Choice[] = [
  { id: 'information', label: 'Late or inaccessible information', description: 'Information does not arrive early enough or in usable formats.' },
  { id: 'distance-time', label: 'Distance, cost, or timing', description: 'Travel, meeting times, or daily responsibilities limit practical access.' },
  { id: 'accessibility', label: 'Physical or communication accessibility', description: 'Facilities, formats, and participation routes require adjustment.' },
  { id: 'influence', label: 'Presence without decision influence', description: 'People attend but cannot shape priorities or receive a response.' },
];

const groupEvidence: Record<string, {
  reinforcingBarrier: string;
  effect: string;
  response: string;
}> = {
  'women-vendors': {
    reinforcingBarrier: 'Daily water collection and care responsibilities reduce the time available for trading and morning consultation.',
    effect: 'Women vendors may attend late, leave early, or be counted without influencing market and water priorities.',
    response: 'Use flexible participation times, accessible advance information, and a documented response to women vendors’ priorities.',
  },
  'remote-residents': {
    reinforcingBarrier: 'Late notices combine with transport time and cost from remote kebeles.',
    effect: 'Remote residents may receive information after priorities are already shaped.',
    response: 'Provide earlier kebele-level information, realistic transport or remote participation support, and pre-decision feedback routes.',
  },
  'informal-youth': {
    reinforcingBarrier: 'Formal registration and notice channels do not reliably reach informal workers.',
    effect: 'Young informal workers may be excluded from livelihood training and selection decisions.',
    response: 'Use outreach beyond formal lists, transparent eligibility criteria, and a review route for excluded applicants.',
  },
  'persons-disabilities': {
    reinforcingBarrier: 'Physical access barriers combine with inaccessible information and absent reasonable accommodation.',
    effect: 'Persons with disabilities may be unable to access services or influence design decisions.',
    response: 'Budget for accessibility, offer accessible formats and participation routes, and document accommodation follow-up.',
  },
};

export type RightsHolderBarrierRow = {
  groupId: string;
  group: string;
  primaryBarrier: string;
  reinforcingBarrier: string;
  likelyEffect: string;
  designResponse: string;
};

export type RightsHolderBarrierMap = {
  rows: RightsHolderBarrierRow[];
  standardsUsed: string[];
  contextFactorsUsed: string[];
  sourceSignature: string;
  generatedAt: string;
};

export function buildRightsHolderBarrierMap(
  selectedGroups: string[],
  assignments: Record<string, string>,
  contextInsight: Record<string, unknown>,
  standardsMap: Record<string, unknown>,
): RightsHolderBarrierMap {
  const rows = selectedGroups.map((groupId) => {
    const group = groupChoices.find((item) => item.id === groupId);
    const barrier = barrierChoices.find((item) => item.id === assignments[groupId]);
    const evidence = groupEvidence[groupId];
    return {
      groupId,
      group: group?.label || groupId,
      primaryBarrier: barrier?.label || 'Barrier requires confirmation',
      reinforcingBarrier: evidence?.reinforcingBarrier || 'Confirm reinforcing barriers with safe, non-identifying evidence.',
      likelyEffect: evidence?.effect || 'Access or participation may be reduced.',
      designResponse: evidence?.response || 'Adjust information, accessibility, participation, and response arrangements.',
    };
  });
  const contextFactorsUsed = strings(contextInsight.selectedContextualConditions);
  const standardsUsed = Array.isArray(standardsMap.rows)
    ? (standardsMap.rows as Array<Record<string, unknown>>).map((row) => text(row.standard)).filter(Boolean)
    : [];
  return {
    rows,
    standardsUsed,
    contextFactorsUsed,
    sourceSignature: signature([
      selectedGroups,
      assignments,
      text(contextInsight.sourceSignature),
      text(standardsMap.sourceSignature),
    ]),
    generatedAt: new Date().toISOString(),
  };
}

function normalizeGroup(value: string) {
  const legacyGroups: Record<string, string> = {
    'women-traders': 'women-vendors',
    'persons-with-disabilities': 'persons-disabilities',
    'youth-jobseekers': 'informal-youth',
    'remote-rural-residents': 'remote-residents',
    'Women market vendors and traders': 'women-vendors',
    'Youth informal workers & jobseekers': 'informal-youth',
    'Residents of remote rural kebeles': 'remote-residents',
  };
  if (legacyGroups[value]) return legacyGroups[value];
  const found = groupChoices.find((item) => item.id === value || item.label === value);
  return found?.id || '';
}

function normalizeBarrier(value: string) {
  const legacyBarriers: Record<string, string> = {
    access: 'distance-time',
    social: 'accessibility',
    power: 'influence',
  };
  return legacyBarriers[value] || value;
}

export function RightsHolderBarrierOutputScreen({
  screen,
  state,
  onChangeState,
  onComplete,
}: Batch1Props) {
  const saved = readRecord(state, screen.id);
  const contextInsight = record(readRecord(state, 'M3-R05').contextInsight);
  const standardsMap = record(readRecord(state, 'M3-R06').standardsToPracticeMap);
  const savedGroups = strings(saved.prototypeSelectedGroups || saved.selectedGroups)
    .map(normalizeGroup)
    .filter(Boolean)
    .slice(0, 2);
  const [selectedGroups, setSelectedGroups] = useState(savedGroups);
  const [assignments, setAssignments] = useState<Record<string, string>>(
    Object.fromEntries(
      Object.entries(record(saved.prototypeBarrierAssignments || saved.assignedBarriers))
        .map(([key, value]) => [normalizeGroup(key), normalizeBarrier(text(value))])
        .filter(([key, value]) => Boolean(key && value)),
    ),
  );
  const expected = signature([
    selectedGroups,
    assignments,
    text(contextInsight.sourceSignature),
    text(standardsMap.sourceSignature),
  ]);
  const savedMap = record(saved.rightsHolderBarrierMap);
  const [generated, setGenerated] = useState<RightsHolderBarrierMap | null>(
    savedMap.sourceSignature === expected ? savedMap as RightsHolderBarrierMap : null,
  );

  const toggleGroup = (groupId: string) => {
    const next = selectedGroups.includes(groupId)
      ? selectedGroups.filter((item) => item !== groupId)
      : selectedGroups.length < 2 ? [...selectedGroups, groupId] : selectedGroups;
    const nextAssignments = Object.fromEntries(
      Object.entries(assignments).filter(([key]) => next.includes(key)),
    );
    setSelectedGroups(next);
    setAssignments(nextAssignments);
    setGenerated(null);
    persist(onChangeState, screen.id, {
      prototypeSelectedGroups: next,
      selectedGroups: next,
      prototypeBarrierAssignments: nextAssignments,
      assignedBarriers: nextAssignments,
    });
  };

  const assign = (groupId: string, barrierId: string) => {
    const next = { ...assignments, [groupId]: barrierId };
    setAssignments(next);
    setGenerated(null);
    persist(onChangeState, screen.id, {
      prototypeSelectedGroups: selectedGroups,
      selectedGroups,
      prototypeBarrierAssignments: next,
      assignedBarriers: next,
    });
  };

  const assignedCount = selectedGroups.filter((groupId) => assignments[groupId]).length;
  const ready = selectedGroups.length === 2 && assignedCount === 2;
  const guidance = selectedGroups.length < 2
    ? `Select ${2 - selectedGroups.length} more priority rights-holder group${2 - selectedGroups.length === 1 ? '' : 's'}.`
    : assignedCount < 2
      ? `Choose a primary barrier for ${2 - assignedCount} remaining group${2 - assignedCount === 1 ? '' : 's'}.`
      : generated
        ? 'The current Rights-Holder-to-Barrier Map is ready to continue.'
        : 'Two group-and-barrier relationships are complete. Generate the map.';

  const generate = () => {
    if (!ready) return;
    const next = buildRightsHolderBarrierMap(
      selectedGroups,
      assignments,
      contextInsight,
      standardsMap,
    );
    setGenerated(next);
    persist(onChangeState, screen.id, {
      prototypeSelectedGroups: selectedGroups,
      selectedGroups,
      prototypeBarrierAssignments: assignments,
      assignedBarriers: assignments,
      rightsHolderBarrierMap: next,
      generatedMapRows: next.rows,
    });
  };

  const complete = () => {
    if (!generated) return;
    onComplete({
      module3PortfolioModelVersion: MODEL_VERSION,
      submitted: true,
      selectedGroups,
      assignedBarriers: assignments,
      rightsHolderBarrierMap: generated,
      generatedRightsHolderBarrierRows: generated.rows,
      generatedMapRows: generated.rows.map((row) => ({
        groupLabel: row.group,
        barrierLabels: [row.primaryBarrier, row.reinforcingBarrier],
        likelyEffect: row.likelyEffect,
        designResponse: row.designResponse,
      })),
      rightsHolderBarrierMapLegacy: {
        selectedGroups: generated.rows.map((row) => row.group),
        assignedBarriers: assignments,
      },
    });
  };

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`} data-testid="m3-r07-output-quality">
      <OutputQualityCanvas labelledBy={`${screen.id}-title`}>
        <Heading
          screen={screen}
          description="Choose two priority groups and one primary barrier for each. The course will add case evidence, likely effects, and practical design responses."
        />
        <InteractionSurface labelledBy={`${screen.id}-interaction`}>
          <h2 id={`${screen.id}-interaction`}>Build two rights-holder relationships</h2>
          <fieldset className="m3-oq-choice-group">
            <legend>1. Choose exactly two priority rights-holder groups</legend>
            <div className="m3-oq-choice-grid">
              {groupChoices.map((choice) => {
                const selected = selectedGroups.includes(choice.id);
                const unavailable = !selected && selectedGroups.length >= 2;
                return (
                  <label key={choice.id} className={`m3-oq-choice${selected ? ' is-selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selected}
                      disabled={unavailable}
                      onChange={() => toggleGroup(choice.id)}
                    />
                    <span className="m3-oq-choice__status" aria-hidden="true">{selected ? '✓' : '□'}</span>
                    <span><strong>{choice.label}</strong><small>{choice.description}</small><em>{selected ? 'Selected' : unavailable ? 'Two selected' : 'Select'}</em></span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          {selectedGroups.map((groupId, index) => {
            const group = groupChoices.find((item) => item.id === groupId);
            return (
              <RadioCards
                key={groupId}
                legend={`${index + 2}. Primary barrier for ${group?.label || groupId}`}
                name={`m3-r07-${groupId}`}
                choices={barrierChoices}
                value={assignments[groupId] || ''}
                onChange={(value) => assign(groupId, value)}
              />
            );
          })}
        </InteractionSurface>
        {generated && (
          <GeneratedOutputSurface labelledBy={`${screen.id}-output`} className="m3-b1-relationship-output">
            <p className="m3-oq-eyebrow">FOUNDATIONAL ANALYTICAL OUTPUT</p>
            <h2 id={`${screen.id}-output`}>Rights-Holder-to-Barrier Map</h2>
            <ol className="m3-b1-relationship-list" aria-label="Rights-holder to barrier relationships">
              {generated.rows.map((row) => (
                <li key={row.groupId}>
                  <h3>{row.group}</h3>
                  <div className="m3-b1-relationship-flow" aria-hidden="true">
                    <span>Group</span><b>→</b><span>Barrier</span><b>→</b><span>Effect</span><b>→</b><span>Design response</span>
                  </div>
                  <dl>
                    <div><dt>Primary barrier</dt><dd>{row.primaryBarrier}</dd></div>
                    <div><dt>Reinforcing case barrier</dt><dd>{row.reinforcingBarrier}</dd></div>
                    <div><dt>Likely access or participation effect</dt><dd>{row.likelyEffect}</dd></div>
                    <div><dt>Practical design response</dt><dd>{row.designResponse}</dd></div>
                  </dl>
                </li>
              ))}
            </ol>
          </GeneratedOutputSurface>
        )}
        <GenerateActions
          ready={ready}
          current={Boolean(generated && generated.sourceSignature === expected)}
          guidance={guidance}
          onGenerate={generate}
          onContinue={complete}
          continueLabel={screen.continueLabel}
        />
      </OutputQualityCanvas>
    </main>
  );
}

const dutyBearerChoices: Choice[] = [
  { id: 'water-office', label: 'Woreda Water & Energy Office', description: 'Formal responsibility for public water-service planning and technical follow-up.' },
  { id: 'municipality', label: 'Municipal Market Administration', description: 'Formal responsibility for market space, sanitation, and allocation arrangements.' },
  { id: 'kebele-administration', label: 'Kebele Administration & Development Agents', description: 'Formal local responsibility for public notices, administrative coordination, and community mobilization.' },
  { id: 'youth-office', label: 'Woreda Youth and Skills Office', description: 'Formal responsibility for livelihood-training access and selection arrangements.' },
  { id: 'health-office', label: 'Woreda Health Office', description: 'Formal responsibility for health-post service and accessibility standards.' },
];

const supportingActorChoices: Choice[] = [
  { id: 'women-committee', label: 'Market Vendor Women Committee', description: 'Brings practical evidence and trusted links with women traders.' },
  { id: 'kebele-agent', label: 'Kebele development agents', description: 'Can improve early communication with remote kebele residents.' },
  { id: 'health-extension', label: 'Kebele Health Extension Workers', description: 'Can support accessible health information, hygiene outreach, and local service links.' },
  { id: 'disability-organization', label: 'Local organization of persons with disabilities', description: 'Can advise on accessibility and reasonable accommodation.' },
];

const csoRoleChoices: Choice[] = [
  { id: 'facilitate', label: 'Facilitate accessible evidence and early participation', description: 'Support rights-holders to contribute safely before decisions.' },
  { id: 'convene', label: 'Convene a responsibility and response meeting', description: 'Bring actors together without taking over the public mandate.' },
  { id: 'monitor', label: 'Monitor response and adaptation commitments', description: 'Track whether responsible actors explain and implement agreed changes.' },
];

const dutyResponsibilities: Record<string, string> = {
  'water-office': 'Plan and oversee equitable public water-service access, technical standards, and response to documented service barriers.',
  municipality: 'Manage market space, sanitation, accessibility, and allocation arrangements without discrimination.',
  'kebele-administration': 'Provide timely public information, coordinate local administration, and support inclusive community mobilization.',
  'youth-office': 'Provide fair, transparent, and accessible livelihood-training entry and review arrangements.',
  'health-office': 'Ensure health-post design and services meet accessibility, information, and reasonable-accommodation requirements.',
};

export type ActorRelationshipMap = {
  rightsHolderContext: string[];
  primaryDutyBearer: string;
  formalResponsibility: string;
  linkedDutyBearer: string;
  supportingActor: string;
  supportingInfluence: string;
  awraRole: string;
  relationship: string;
  accountabilityImplication: string;
  safeEngagementImplication: string;
  sourceSignature: string;
  generatedAt: string;
};

export function buildActorRelationshipMap(
  primaryId: string,
  linkedId: string,
  supportingId: string,
  csoRoleId: string,
  rightsHolderMap: Record<string, unknown>,
  standardsMap: Record<string, unknown>,
): ActorRelationshipMap {
  const primary = dutyBearerChoices.find((item) => item.id === primaryId);
  const linked = dutyBearerChoices.find((item) => item.id === linkedId);
  const supporting = supportingActorChoices.find((item) => item.id === supportingId);
  const csoRole = csoRoleChoices.find((item) => item.id === csoRoleId);
  const rows = Array.isArray(rightsHolderMap.rows)
    ? rightsHolderMap.rows as Array<Record<string, unknown>>
    : [];
  const rightsHolderContext = rows.map((row) => text(row.group)).filter(Boolean);
  const accountabilityStandard = Array.isArray(standardsMap.rows)
    ? (standardsMap.rows as Array<Record<string, unknown>>).find((row) => row.id === 'accountability')
    : undefined;
  return {
    rightsHolderContext: rightsHolderContext.length ? rightsHolderContext : ['Priority Jiru Amba rights-holder groups'],
    primaryDutyBearer: primary?.label || primaryId,
    formalResponsibility: dutyResponsibilities[primaryId] || 'Confirm the responsible public mandate and response duty.',
    linkedDutyBearer: linked?.label || '',
    supportingActor: supporting?.label || supportingId,
    supportingInfluence: supporting?.description || 'Provides practical evidence and community links without replacing formal responsibility.',
    awraRole: csoRole?.label || csoRoleId,
    relationship: `${supporting?.label || 'The supporting actor'} contributes safe evidence and participation links; Awra ${csoRole?.label.toLowerCase() || 'facilitates engagement'}; ${primary?.label || 'the primary duty-bearer'} retains the mandate and response responsibility${linked ? ` with linked action from ${linked.label}` : ''}.`,
    accountabilityImplication: text(accountabilityStandard?.practicalRequirement) || 'Record concerns, responsible actors, responses, and follow-up.',
    safeEngagementImplication: 'Use generalized, non-identifying evidence, accessible participation routes, and clear responsibility boundaries.',
    sourceSignature: signature([
      primaryId,
      linkedId,
      supportingId,
      csoRoleId,
      text(rightsHolderMap.sourceSignature),
      text(standardsMap.sourceSignature),
    ]),
    generatedAt: new Date().toISOString(),
  };
}

function choiceIdByValue(choices: Choice[], value: string) {
  const legacyValues: Record<string, string> = {
    'Facilitate early pre-consultation briefings and safe feedback channels': 'facilitate',
    'Support rights-holder evidence generation without replacing duty-bearer responsibility': 'monitor',
  };
  if (legacyValues[value]) return legacyValues[value];
  return choices.find((item) => item.id === value || item.label === value)?.id || '';
}

export function ActorResponsibilityOutputScreen({
  screen,
  state,
  onChangeState,
  onComplete,
}: Batch1Props) {
  const saved = readRecord(state, screen.id);
  const rightsHolderMap = record(readRecord(state, 'M3-R07').rightsHolderBarrierMap);
  const standardsMap = record(readRecord(state, 'M3-R06').standardsToPracticeMap);
  const savedDutyBearers = strings(saved.selectedDutyBearers);
  const [primary, setPrimary] = useState(
    text(saved.prototypePrimaryDutyBearer)
      || choiceIdByValue(dutyBearerChoices, savedDutyBearers[0] || ''),
  );
  const [linked, setLinked] = useState(
    text(saved.prototypeLinkedDutyBearer)
      || choiceIdByValue(dutyBearerChoices, savedDutyBearers[1] || ''),
  );
  const [supporting, setSupporting] = useState(
    text(saved.prototypeSupportingActor)
      || choiceIdByValue(supportingActorChoices, text(saved.selectedSupportingActor)),
  );
  const [csoRole, setCsoRole] = useState(
    text(saved.prototypeCsoRole)
      || choiceIdByValue(csoRoleChoices, text(saved.selectedCsoRole)),
  );
  const expected = signature([
    primary,
    linked,
    supporting,
    csoRole,
    text(rightsHolderMap.sourceSignature),
    text(standardsMap.sourceSignature),
  ]);
  const savedMap = record(saved.actorRelationshipMap);
  const [generated, setGenerated] = useState<ActorRelationshipMap | null>(
    savedMap.sourceSignature === expected ? savedMap as ActorRelationshipMap : null,
  );

  const update = (
    field: 'primary' | 'linked' | 'supporting' | 'csoRole',
    value: string,
  ) => {
    const next = {
      primary: field === 'primary' ? value : primary,
      linked: field === 'linked' ? value : linked,
      supporting: field === 'supporting' ? value : supporting,
      csoRole: field === 'csoRole' ? value : csoRole,
    };
    if (field === 'primary') setPrimary(value);
    if (field === 'linked') setLinked(value === linked ? '' : value);
    if (field === 'supporting') setSupporting(value);
    if (field === 'csoRole') setCsoRole(value);
    const persistedLinked = field === 'linked' && value === linked ? '' : next.linked;
    setGenerated(null);
    persist(onChangeState, screen.id, {
      prototypePrimaryDutyBearer: next.primary,
      prototypeLinkedDutyBearer: persistedLinked,
      prototypeSupportingActor: next.supporting,
      prototypeCsoRole: next.csoRole,
      selectedDutyBearers: [next.primary, persistedLinked].filter(Boolean).map((id) => dutyBearerChoices.find((item) => item.id === id)?.label || id),
      selectedSupportingActor: supportingActorChoices.find((item) => item.id === next.supporting)?.label || '',
      selectedCsoRole: csoRoleChoices.find((item) => item.id === next.csoRole)?.label || '',
    });
  };

  const requiredCount = [primary, supporting, csoRole].filter(Boolean).length;
  const ready = requiredCount === 3;
  const guidance = requiredCount < 3
    ? `Complete ${3 - requiredCount} remaining required actor decision${3 - requiredCount === 1 ? '' : 's'}.`
    : generated
      ? 'The current Actor Responsibility and Relationship Map is ready to continue.'
      : 'Required actor decisions are complete. Generate the relationship map.';

  const generate = () => {
    if (!ready) return;
    const next = buildActorRelationshipMap(
      primary,
      linked,
      supporting,
      csoRole,
      rightsHolderMap,
      standardsMap,
    );
    setGenerated(next);
    persist(onChangeState, screen.id, {
      prototypePrimaryDutyBearer: primary,
      prototypeLinkedDutyBearer: linked,
      prototypeSupportingActor: supporting,
      prototypeCsoRole: csoRole,
      selectedDutyBearers: [next.primaryDutyBearer, next.linkedDutyBearer].filter(Boolean),
      selectedSupportingActor: next.supportingActor,
      selectedCsoRole: next.awraRole,
      actorRelationshipMap: next,
      generatedResponsibilityRows: [{
        barrierId: 'carried-rights-holder-barriers',
        barrierLabel: next.rightsHolderContext.join(' and '),
        primaryPublicResponsibility: [next.primaryDutyBearer],
        serviceOrSectorActors: [next.primaryDutyBearer, next.linkedDutyBearer].filter(Boolean),
        communityOrInfluenceActors: [next.supportingActor],
        csoRoles: [next.awraRole],
        accountabilityImplication: next.accountabilityImplication,
        safeEngagementImplication: next.safeEngagementImplication,
      }],
    });
  };

  const complete = () => {
    if (!generated) return;
    const generatedResponsibilityRows = [{
      barrierId: 'carried-rights-holder-barriers',
      barrierLabel: generated.rightsHolderContext.join(' and '),
      primaryPublicResponsibility: [generated.primaryDutyBearer],
      serviceOrSectorActors: [generated.primaryDutyBearer, generated.linkedDutyBearer].filter(Boolean),
      communityOrInfluenceActors: [generated.supportingActor],
      csoRoles: [generated.awraRole],
      accountabilityImplication: generated.accountabilityImplication,
      safeEngagementImplication: generated.safeEngagementImplication,
    }];
    onComplete({
      module3PortfolioModelVersion: MODEL_VERSION,
      submitted: true,
      selectedDutyBearers: [generated.primaryDutyBearer, generated.linkedDutyBearer].filter(Boolean),
      selectedSupportingActor: generated.supportingActor,
      selectedCsoRole: generated.awraRole,
      actorRelationshipMap: generated,
      generatedResponsibilityRows,
      actorResponsibilityMap: {
        dutyBearers: [generated.primaryDutyBearer, generated.linkedDutyBearer].filter(Boolean),
        supportingActor: generated.supportingActor,
        csoRole: generated.awraRole,
      },
    });
  };

  const linkedChoices = dutyBearerChoices.filter((item) => item.id !== primary);

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`} data-testid="m3-r08-output-quality">
      <OutputQualityCanvas labelledBy={`${screen.id}-title`}>
        <Heading
          screen={screen}
          description="Choose the actors needed for one credible responsibility relationship. Formal public responsibility must remain distinct from influence and Awra’s facilitation role."
        />
        <InteractionSurface labelledBy={`${screen.id}-interaction`}>
          <h2 id={`${screen.id}-interaction`}>Build the actor relationship</h2>
          <RadioCards legend="1. Primary duty-bearer — required" name="m3-r08-primary" choices={dutyBearerChoices} value={primary} onChange={(value) => update('primary', value)} />
          {primary && (
            <fieldset className="m3-oq-choice-group">
              <legend>2. Linked duty-bearer — optional</legend>
              <p className="m3-b1-field-hint">Choose one only when another public mandate is genuinely connected. Select it again to remove it.</p>
              <div className="m3-oq-choice-grid">
                {linkedChoices.map((choice) => {
                  const selected = linked === choice.id;
                  return (
                    <label key={choice.id} className={`m3-oq-choice${selected ? ' is-selected' : ''}`}>
                      <input type="checkbox" checked={selected} onChange={() => update('linked', choice.id)} />
                      <span className="m3-oq-choice__status" aria-hidden="true">{selected ? '✓' : '□'}</span>
                      <span><strong>{choice.label}</strong><small>{choice.description}</small><em>{selected ? 'Selected · select again to remove' : 'Optional'}</em></span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}
          <RadioCards legend="3. Supporting actor — required" name="m3-r08-supporting" choices={supportingActorChoices} value={supporting} onChange={(value) => update('supporting', value)} />
          <RadioCards legend="4. Constructive Awra role — required" name="m3-r08-cso" choices={csoRoleChoices} value={csoRole} onChange={(value) => update('csoRole', value)} />
        </InteractionSurface>
        {generated && (
          <GeneratedOutputSurface labelledBy={`${screen.id}-output`} className="m3-b1-actor-output">
            <p className="m3-oq-eyebrow">FOUNDATIONAL ANALYTICAL OUTPUT</p>
            <h2 id={`${screen.id}-output`}>Actor Responsibility and Relationship Map</h2>
            <VisualizationLegend
              items={[
                { id: 'responsibility', label: 'Formal responsibility', symbol: '■' },
                { id: 'influence', label: 'Supporting influence', symbol: '◆' },
                { id: 'facilitation', label: 'CSO facilitation', symbol: '●' },
              ]}
              label="Actor relationship legend"
            />
            <ol className="m3-b1-actor-constellation" aria-label="Directional actor relationships">
              <li className="is-rights-holder"><strong>Rights-holder context</strong><span>{generated.rightsHolderContext.join('; ')}</span></li>
              <li className="is-duty-bearer"><strong>{generated.primaryDutyBearer}</strong><span>{generated.formalResponsibility}</span></li>
              {generated.linkedDutyBearer && <li className="is-duty-bearer"><strong>{generated.linkedDutyBearer}</strong><span>Linked public mandate; coordinate action without diluting primary responsibility.</span></li>}
              <li className="is-supporting"><strong>{generated.supportingActor}</strong><span>{generated.supportingInfluence}</span></li>
              <li className="is-cso"><strong>Awra Grassroots Initiative</strong><span>{generated.awraRole}</span></li>
            </ol>
            <dl className="m3-b1-actor-implications">
              <div><dt>Relationship</dt><dd>{generated.relationship}</dd></div>
              <div><dt>Accountability implication</dt><dd>{generated.accountabilityImplication}</dd></div>
              <div><dt>Safe engagement implication</dt><dd>{generated.safeEngagementImplication}</dd></div>
            </dl>
          </GeneratedOutputSurface>
        )}
        <GenerateActions
          ready={ready}
          current={Boolean(generated && generated.sourceSignature === expected)}
          guidance={guidance}
          onGenerate={generate}
          onContinue={complete}
          continueLabel={screen.continueLabel}
        />
      </OutputQualityCanvas>
    </main>
  );
}

export const revisedBatch1RubricTargets = {
  standardsToPracticeMap: [4, 4, 4, 3, 4, 3, 4, 4, 4, 4, 4, 4],
  rightsHolderBarrierMap: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  actorRelationshipMap: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
} as const;

export function outputIsSubstantive(output: Record<string, unknown>, fields: string[]) {
  return fields.every((field) => {
    const value = output[field];
    return Array.isArray(value)
      ? value.length > 0
      : typeof value === 'string'
        ? value.trim().split(/\s+/).length >= 4
        : Boolean(value);
  });
}
