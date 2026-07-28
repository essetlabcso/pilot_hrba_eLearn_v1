/* eslint-disable react-refresh/only-export-components -- prototype builders are exported for contract tests beside their rendering components */
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { LearningState } from '../../state/learningState';
import type { Module3RevisedScreen } from '../../data/module3/module3RevisedScreens';
import {
  AccessibleSpatialAlternative,
  BeforeAfterComparison,
  EvidenceChain,
  GeneratedOutputSurface,
  GeneratedStatus,
  InteractionSurface,
  OutputQualityCanvas,
  VisualizationLegend,
} from './Module3OutputQuality';

type ChangeState = (updater: (prev: LearningState) => LearningState) => void;

type PrototypeProps = {
  screen: Module3RevisedScreen;
  state: LearningState;
  onChangeState: ChangeState;
  onComplete: (value?: Record<string, unknown>) => void;
};

const PORTFOLIO_MODEL_VERSION = 2;

function practiceKey(screenId: string) {
  return `module3_revised_${screenId.toLowerCase().replaceAll('-', '_')}`;
}

function readScreenState(state: LearningState, screenId: string) {
  const value = state.practiceCheckState[practiceKey(screenId)];
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function persistDraft(
  onChangeState: ChangeState,
  screenId: string,
  patch: Record<string, unknown>,
) {
  onChangeState((previous) => ({
    ...previous,
    practiceCheckState: {
      ...previous.practiceCheckState,
      [practiceKey(screenId)]: {
        ...readScreenState(previous, screenId),
        module3PortfolioModelVersion: PORTFOLIO_MODEL_VERSION,
        ...patch,
      },
    },
  }));
}

function signature(parts: unknown[]) {
  return JSON.stringify(parts);
}

function getString(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function getStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function ScreenHeading({ screen, description }: { screen: Module3RevisedScreen; description: string }) {
  return (
    <header className="m3-oq-heading">
      <p>{screen.eyebrow}</p>
      <h1 id={`${screen.id}-title`}>{screen.title}</h1>
      <span>{screen.phase}</span>
      <p>{description}</p>
    </header>
  );
}

type Choice = { id: string; label: string; description: string };

function SingleChoice({
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
          const selected = value === choice.label;
          return (
            <label key={choice.id} className={`m3-oq-choice${selected ? ' is-selected' : ''}`}>
              <input
                type="radio"
                name={name}
                value={choice.label}
                checked={selected}
                onChange={() => onChange(choice.label)}
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

function PrototypeActions({
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
      <GeneratedStatus testId="m3-oq-guidance">{guidance}</GeneratedStatus>
      <div>
        <button
          type="button"
          className="m3-oq-secondary-action"
          disabled={!ready}
          onClick={onGenerate}
          data-testid="m3-oq-generate"
        >
          {current ? 'Update generated output' : 'Generate output'}
        </button>
        <button
          type="button"
          className="m3-oq-primary-action"
          disabled={!current}
          onClick={onContinue}
          data-testid="m3-oq-continue"
        >
          {continueLabel}
        </button>
      </div>
    </div>
  );
}

const contextFactors: Choice[] = [
  {
    id: 'market',
    label: 'Market infrastructure and trading space',
    description: 'Overcrowding, stall allocation and sanitation conditions affect vendors differently.',
  },
  {
    id: 'distance',
    label: 'Kebele distance and transport costs',
    description: 'Remote residents face travel costs and receive planning information later.',
  },
  {
    id: 'water',
    label: 'Public water-service access and timing',
    description: 'Water collection affects daily trading and the time available to participate.',
  },
  {
    id: 'youth',
    label: 'Youth livelihood training entry barriers',
    description: 'Formal notices and selection criteria may miss informal workers.',
  },
  {
    id: 'health',
    label: 'Health-post renovation and accessibility',
    description: 'Physical and information accessibility affect persons with disabilities.',
  },
];

const affectedGroups: Choice[] = [
  {
    id: 'women',
    label: 'Women market vendors and traders',
    description: 'May face combined water, care, timing and market-safety constraints.',
  },
  {
    id: 'remote',
    label: 'Residents of remote rural kebeles',
    description: 'May face late information, distance and transport barriers.',
  },
  {
    id: 'youth',
    label: 'Young informal workers seeking fair access',
    description: 'May be missed by formal notices and training criteria.',
  },
  {
    id: 'disability',
    label: 'Persons with disabilities',
    description: 'May require accessible facilities, information and reasonable accommodation.',
  },
];

type ContextInsight = {
  priorityAffectedGroup: string;
  selectedContextualConditions: string[];
  caseEvidence: string[];
  inequalityPattern: string;
  accessParticipationEffect: string;
  evidenceGap: string;
  projectDesignImplication: string;
  sourceSignature: string;
  generatedAt: string;
};

export function buildContextInsight(factors: string[], group: string): ContextInsight {
  const evidenceByFactor: Record<string, string> = {
    'Market infrastructure and trading space': 'The Jiru Amba market is overcrowded and sanitation facilities are inadequate.',
    'Kebele distance and transport costs': 'Remote kebeles receive planning notices late and residents face additional travel time and cost.',
    'Public water-service access and timing': 'Water collection responsibilities affect the time some women traders have for trading and meetings.',
    'Youth livelihood training entry barriers': 'Formal notices and selection criteria may not reach young informal workers.',
    'Health-post renovation and accessibility': 'The health-post design must still confirm physical, communication and reasonable-accommodation requirements.',
  };
  const groupEffects: Record<string, string> = {
    'Women market vendors and traders': 'Information and meeting arrangements may reduce the time and practical opportunity women traders have to influence priorities.',
    'Residents of remote rural kebeles': 'Distance, transport cost and late notice may reduce access to information and influence before decisions are made.',
    'Young informal workers seeking fair access': 'Reliance on formal notices or registration may exclude young informal workers from training and priority-setting.',
    'Persons with disabilities': 'Inaccessible facilities, formats or communication channels may prevent equal access and meaningful influence.',
  };
  const sourceSignature = signature([factors, group]);
  return {
    priorityAffectedGroup: group,
    selectedContextualConditions: factors,
    caseEvidence: factors.map((factor) => evidenceByFactor[factor] || factor),
    inequalityPattern: `The selected conditions may combine to place ${group.toLowerCase()} at a relative disadvantage in receiving information, accessing services or influencing decisions.`,
    accessParticipationEffect: groupEffects[group] || 'The selected conditions may reduce equal access and meaningful participation.',
    evidenceGap: `Verify the pattern with generalized, non-identifying participation, accessibility and service-access evidence; do not treat the analytical interpretation as a confirmed fact.`,
    projectDesignImplication: `Provide earlier accessible information, remove the selected access barriers and confirm how ${group.toLowerCase()} can influence priorities before activities are finalized.`,
    sourceSignature,
    generatedAt: new Date().toISOString(),
  };
}

export function ContextInsightPrototype({ screen, state, onChangeState, onComplete }: PrototypeProps) {
  const saved = readScreenState(state, screen.id);
  const savedInsight = saved.contextInsight as Partial<ContextInsight> | undefined;
  const initialFactors = getStringArray(saved.prototypeSelectedFactors).length
    ? getStringArray(saved.prototypeSelectedFactors)
    : getStringArray(savedInsight?.selectedContextualConditions || saved.selectedContextSignals).slice(0, 2);
  const legacyInsight = savedInsight as Record<string, unknown> | undefined;
  const initialGroup = getString(saved.prototypeSelectedGroup)
    || getString(savedInsight?.priorityAffectedGroup || legacyInsight?.primaryAffectedGroup)
    || getStringArray(saved.affectedGroupsToExamine)[0]
    || '';
  const [factors, setFactors] = useState(initialFactors);
  const [group, setGroup] = useState(initialGroup);
  const [note, setNote] = useState(getString(saved.optionalNote));
  const currentSignature = signature([factors, group]);
  const restoredInsight = savedInsight?.sourceSignature === currentSignature
    ? savedInsight as ContextInsight
    : null;
  const [generated, setGenerated] = useState<ContextInsight | null>(restoredInsight);

  const updateFactors = (factor: string) => {
    const next = factors.includes(factor)
      ? factors.filter((item) => item !== factor)
      : factors.length < 2 ? [...factors, factor] : factors;
    setFactors(next);
    setGenerated(null);
    persistDraft(onChangeState, screen.id, {
      prototypeSelectedFactors: next,
      prototypeSelectedGroup: group,
      optionalNote: note,
    });
  };

  const updateGroup = (value: string) => {
    setGroup(value);
    setGenerated(null);
    persistDraft(onChangeState, screen.id, {
      prototypeSelectedFactors: factors,
      prototypeSelectedGroup: value,
      optionalNote: note,
    });
  };

  const ready = factors.length === 2 && Boolean(group);
  const guidance = factors.length < 2
    ? `Select ${2 - factors.length} more context factor${2 - factors.length === 1 ? '' : 's'}.`
    : !group
      ? 'Select one priority affected group.'
      : generated
        ? 'The current Context and Inequality Insight is ready to continue.'
        : 'Selections are complete. Generate the structured insight.';

  const generate = () => {
    if (!ready) return;
    const next = buildContextInsight(factors, group);
    setGenerated(next);
    persistDraft(onChangeState, screen.id, {
      prototypeSelectedFactors: factors,
      prototypeSelectedGroup: group,
      optionalNote: note,
      contextInsight: next,
      contextInsightSourceSignature: next.sourceSignature,
    });
  };

  const complete = () => {
    if (!generated) return;
    const legacySummary = `${generated.inequalityPattern} ${generated.projectDesignImplication}`;
    onComplete({
      module3PortfolioModelVersion: PORTFOLIO_MODEL_VERSION,
      submitted: true,
      selectedContextSignals: factors,
      affectedGroupsToExamine: [group],
      optionalNote: note,
      contextInsight: generated,
      contextInsightSourceSignature: generated.sourceSignature,
      contextInequalityScan: {
        selectedJiruAmbaAffectedGroups: [group],
        selectedBarriers: factors,
        safeEvidenceToVerify: [generated.evidenceGap],
        generatedDesignImplications: generated.projectDesignImplication,
        optionalOwnCsoScan: note.trim() ? { projectIdea: note.trim() } : null,
        portfolioSummaryText: legacySummary,
      },
      contextScanSummary: legacySummary,
      carryForward: {
        issue: generated.inequalityPattern,
        nextUse: generated.projectDesignImplication,
      },
    });
  };

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`} data-testid="m3-r05-output-quality">
      <OutputQualityCanvas labelledBy={`${screen.id}-title`}>
        <ScreenHeading screen={screen} description="Make three focused decisions. The course will combine them with the Jiru Amba evidence to produce a structured analysis." />
        <InteractionSurface labelledBy={`${screen.id}-interaction`}>
          <h2 id={`${screen.id}-interaction`}>Select the evidence focus</h2>
          <fieldset className="m3-oq-choice-group">
            <legend>Choose exactly two context factors</legend>
            <div className="m3-oq-choice-grid">
              {contextFactors.map((choice) => {
                const selected = factors.includes(choice.label);
                const unavailable = !selected && factors.length >= 2;
                return (
                  <label key={choice.id} className={`m3-oq-choice${selected ? ' is-selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selected}
                      disabled={unavailable}
                      onChange={() => updateFactors(choice.label)}
                    />
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
          <SingleChoice
            legend="Choose one priority affected group"
            name="m3-r05-group"
            choices={affectedGroups}
            value={group}
            onChange={updateGroup}
          />
          <label className="m3-oq-optional-note">
            Optional non-identifying note
            <textarea
              value={note}
              maxLength={240}
              onChange={(event) => {
                const value = event.target.value;
                setNote(value);
                persistDraft(onChangeState, screen.id, {
                  prototypeSelectedFactors: factors,
                  prototypeSelectedGroup: group,
                  optionalNote: value,
                });
              }}
            />
            <span>{note.length}/240 · Optional and never required to continue.</span>
          </label>
        </InteractionSurface>
        {generated && (
          <GeneratedOutputSurface labelledBy={`${screen.id}-output`} className="m3-oq-context-output">
            <p className="m3-oq-eyebrow">PORTFOLIO OUTPUT 1 OF 4</p>
            <h2 id={`${screen.id}-output`}>Context and Inequality Insight</h2>
            <p><strong>Priority affected group:</strong> {generated.priorityAffectedGroup}</p>
            <EvidenceChain
              label="Context evidence to project-design implication"
              items={[
                { id: 'evidence', label: 'Case evidence', value: generated.caseEvidence.join(' '), kind: 'evidence' },
                { id: 'pattern', label: 'Inequality pattern', value: generated.inequalityPattern, kind: 'interpretation' },
                { id: 'effect', label: 'Access or participation effect', value: generated.accessParticipationEffect, kind: 'interpretation' },
                { id: 'verify', label: 'Issue to verify', value: generated.evidenceGap, kind: 'verify' },
                { id: 'implication', label: 'Project-design implication', value: generated.projectDesignImplication, kind: 'implication' },
              ]}
            />
          </GeneratedOutputSurface>
        )}
        <PrototypeActions
          ready={ready}
          current={Boolean(generated && generated.sourceSignature === currentSignature)}
          guidance={guidance}
          onGenerate={generate}
          onContinue={complete}
          continueLabel={screen.continueLabel}
        />
      </OutputQualityCanvas>
    </main>
  );
}

const enablerChoices: Choice[] = [
  {
    id: 'water-office',
    label: 'Woreda Water & Energy Office focal point',
    description: 'Formal mandate and technical authority for water-service planning.',
  },
  {
    id: 'women-committee',
    label: 'Market Vendor Women Committee representatives',
    description: 'Trusted knowledge of daily water-access and participation barriers.',
  },
  {
    id: 'development-agent',
    label: 'Kebele administrative development agent',
    description: 'Local communication links with remote kebele households.',
  },
];

const blockerChoices: Choice[] = [
  {
    id: 'traders-guild',
    label: 'Town Commercial Traders Guild',
    description: 'Strong informal influence and a preference for central market investment.',
  },
  {
    id: 'finance-committee',
    label: 'District Finance & Allocation Committee',
    description: 'Controls budget timing and may delay non-central investments.',
  },
  {
    id: 'water-trucks',
    label: 'Informal Water Truck Operators',
    description: 'Economic interests may conflict with more reliable public supply.',
  },
];

const strategyChoices: Choice[] = [
  {
    id: 'briefing',
    label: 'Pre-consultation alignment and non-identifying evidence briefings',
    description: 'Build shared understanding before public decisions.',
  },
  {
    id: 'parallel',
    label: 'Parallel feedback channels and quiet diplomacy',
    description: 'Protect participation while engaging influential actors constructively.',
  },
  {
    id: 'monitoring',
    label: 'Joint multi-stakeholder monitoring reviews',
    description: 'Review progress, responsibility and response at agreed intervals.',
  },
];

type ActorPosition = {
  id: string;
  name: string;
  role: string;
  authority: 'Formal authority' | 'No formal authority';
  influence: 'Higher' | 'Medium' | 'Lower';
  position: 'Supportive' | 'Constructive/conditional' | 'Delaying or risk';
  risk: string;
  engagement: string;
  x: number;
  y: number;
};

type ActorPowerInsight = {
  selectedEnabler: string;
  selectedBlocker: string;
  safeInfluenceStrategy: string;
  actors: ActorPosition[];
  recommendation: string;
  sourceSignature: string;
  generatedAt: string;
};

export function buildActorPowerInsight(
  enabler: string,
  blocker: string,
  strategy: string,
  screen8: Record<string, unknown>,
): ActorPowerInsight {
  const dutyBearers = getStringArray(screen8.selectedDutyBearers);
  const supportingActor = getString(screen8.selectedSupportingActor);
  const csoRole = getString(screen8.selectedCsoRole);
  const actors: ActorPosition[] = [
    {
      id: 'rights-holders',
      name: 'Women traders and remote kebele residents',
      role: 'Priority rights-holders',
      authority: 'No formal authority',
      influence: 'Lower',
      position: 'Supportive',
      risk: 'Their priorities may be heard late or represented by others.',
      engagement: 'Use accessible early information and more than one safe participation route.',
      x: 22,
      y: 24,
    },
    {
      id: 'duty-bearer',
      name: dutyBearers[0] || 'Woreda Water & Energy Office',
      role: 'Primary duty-bearer',
      authority: 'Formal authority',
      influence: 'Higher',
      position: enabler.includes('Water & Energy') ? 'Supportive' : 'Constructive/conditional',
      risk: 'Formal responsibility may not translate into timely response without follow-up.',
      engagement: 'Confirm responsibility, response timing and evidence of action.',
      x: enabler.includes('Water & Energy') ? 78 : 57,
      y: 82,
    },
    {
      id: 'supporting-actor',
      name: supportingActor || 'Market Vendor Women Committee',
      role: 'Supporting/community actor',
      authority: 'No formal authority',
      influence: 'Medium',
      position: enabler.includes('Women Committee') ? 'Supportive' : 'Constructive/conditional',
      risk: 'One actor must not be assumed to speak for every affected group.',
      engagement: 'Use the actor to widen access while retaining direct rights-holder participation.',
      x: enabler.includes('Women Committee') ? 80 : 62,
      y: 55,
    },
    {
      id: 'enabler',
      name: enabler,
      role: 'Learner-selected enabler',
      authority: enabler.includes('Office') || enabler.includes('agent') ? 'Formal authority' : 'No formal authority',
      influence: 'Higher',
      position: 'Supportive',
      risk: 'Support may remain informal unless a clear role and follow-up point are agreed.',
      engagement: strategy,
      x: 84,
      y: 78,
    },
    {
      id: 'blocker',
      name: blocker,
      role: 'Learner-selected blocker or risk actor',
      authority: blocker.includes('Committee') ? 'Formal authority' : 'No formal authority',
      influence: 'Higher',
      position: 'Delaying or risk',
      risk: blocker.includes('Finance')
        ? 'Budget-control decisions may delay equitable investment.'
        : 'Informal influence or economic interest may resist the intended change.',
      engagement: strategy,
      x: 18,
      y: 76,
    },
    {
      id: 'awra',
      name: 'Awra',
      role: csoRole || 'CSO facilitator and follow-up actor',
      authority: 'No formal authority',
      influence: 'Medium',
      position: 'Supportive',
      risk: 'The CSO must not replace public responsibility.',
      engagement: 'Facilitate evidence, accessible participation, constructive dialogue and follow-up.',
      x: 72,
      y: 48,
    },
  ];
  return {
    selectedEnabler: enabler,
    selectedBlocker: blocker,
    safeInfluenceStrategy: strategy,
    actors,
    recommendation: `Use ${strategy.toLowerCase()} to strengthen rights-holder influence, secure a clear response from the responsible office and engage ${blocker} without transferring public responsibility to Awra.`,
    sourceSignature: signature([enabler, blocker, strategy, dutyBearers, supportingActor, csoRole]),
    generatedAt: new Date().toISOString(),
  };
}

export function PowerInfluencePrototype({ screen, state, onChangeState, onComplete }: PrototypeProps) {
  const saved = readScreenState(state, screen.id);
  const screen8 = readScreenState(state, 'M3-R08');
  const savedInsight = saved.actorPowerInsight as Partial<ActorPowerInsight> | undefined;
  const [enabler, setEnabler] = useState(getString(saved.prototypeEnabler) || getString(savedInsight?.selectedEnabler));
  const [blocker, setBlocker] = useState(getString(saved.prototypeBlocker) || getString(savedInsight?.selectedBlocker));
  const [strategy, setStrategy] = useState(getString(saved.prototypeStrategy) || getString(savedInsight?.safeInfluenceStrategy));
  const expected = useMemo(
    () => signature([
      enabler,
      blocker,
      strategy,
      getStringArray(screen8.selectedDutyBearers),
      getString(screen8.selectedSupportingActor),
      getString(screen8.selectedCsoRole),
    ]),
    [blocker, enabler, screen8, strategy],
  );
  const restored = savedInsight?.sourceSignature === expected ? savedInsight as ActorPowerInsight : null;
  const [generated, setGenerated] = useState<ActorPowerInsight | null>(restored);

  const update = (field: 'enabler' | 'blocker' | 'strategy', value: string) => {
    const next = {
      enabler: field === 'enabler' ? value : enabler,
      blocker: field === 'blocker' ? value : blocker,
      strategy: field === 'strategy' ? value : strategy,
    };
    setEnabler(next.enabler);
    setBlocker(next.blocker);
    setStrategy(next.strategy);
    setGenerated(null);
    persistDraft(onChangeState, screen.id, {
      prototypeEnabler: next.enabler,
      prototypeBlocker: next.blocker,
      prototypeStrategy: next.strategy,
    });
  };

  const ready = Boolean(enabler && blocker && strategy);
  const guidance = !enabler
    ? 'Select one enabler.'
    : !blocker
      ? 'Select one blocker or risk actor.'
      : !strategy
        ? 'Select one safe influence strategy.'
        : generated
          ? 'The current Actor and Power Insight is ready to continue.'
          : 'Selections are complete. Generate the actor and power analysis.';

  const generate = () => {
    if (!ready) return;
    const next = buildActorPowerInsight(enabler, blocker, strategy, screen8);
    setGenerated(next);
    persistDraft(onChangeState, screen.id, {
      prototypeEnabler: enabler,
      prototypeBlocker: blocker,
      prototypeStrategy: strategy,
      actorPowerInsight: next,
      actorPowerInsightSourceSignature: next.sourceSignature,
    });
  };

  const complete = () => {
    if (!generated) return;
    onComplete({
      module3PortfolioModelVersion: PORTFOLIO_MODEL_VERSION,
      submitted: true,
      selectedActorIds: [enabler, blocker],
      actorPowerInsight: generated,
      actorPowerInsightSourceSignature: generated.sourceSignature,
      powerInfluenceMap: {
        selectedActors: generated.actors,
        powerStrategy: strategy,
        summaryMessages: [generated.recommendation],
        safetyConfirmation: 'No individual is named and spatial position is also communicated in text.',
      },
      powerMapSummary: generated.recommendation,
      carryForward: {
        issue: `${blocker} may delay or redirect the intended change.`,
        nextUse: generated.recommendation,
      },
    });
  };

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`} data-testid="m3-r09-output-quality">
      <OutputQualityCanvas labelledBy={`${screen.id}-title`}>
        <ScreenHeading screen={screen} description="Choose an enabler, a blocker and a safe strategy. Existing actor responsibilities are carried forward from Screen 8." />
        <InteractionSurface labelledBy={`${screen.id}-interaction`}>
          <h2 id={`${screen.id}-interaction`}>Make three power and engagement decisions</h2>
          <SingleChoice legend="1. Primary enabler" name="m3-r09-enabler" choices={enablerChoices} value={enabler} onChange={(value) => update('enabler', value)} />
          <SingleChoice legend="2. Blocker or risk actor" name="m3-r09-blocker" choices={blockerChoices} value={blocker} onChange={(value) => update('blocker', value)} />
          <SingleChoice legend="3. Safe influence strategy" name="m3-r09-strategy" choices={strategyChoices} value={strategy} onChange={(value) => update('strategy', value)} />
        </InteractionSurface>
        {generated && (
          <GeneratedOutputSurface labelledBy={`${screen.id}-output`}>
            <p className="m3-oq-eyebrow">PORTFOLIO OUTPUT 2 OF 4</p>
            <h2 id={`${screen.id}-output`}>Actor and Power Insight</h2>
            <VisualizationLegend
              items={[
                { id: 'formal', label: 'Formal authority', symbol: '◆' },
                { id: 'supportive', label: 'Supportive/constructive position', symbol: '●' },
                { id: 'risk', label: 'Delaying or risk position', symbol: '▲' },
              ]}
            />
            <div className="m3-oq-power-map" aria-hidden="true">
              <span className="m3-oq-power-map__y">Higher practical influence ↑</span>
              <span className="m3-oq-power-map__x">Supportive/constructive position →</span>
              {generated.actors.map((actor) => (
                <div
                  key={actor.id}
                  className={`m3-oq-actor-node is-${actor.position === 'Delaying or risk' ? 'risk' : 'supportive'}`}
                  style={{ left: `${actor.x}%`, bottom: `${actor.y}%` }}
                >
                  {actor.authority === 'Formal authority' && <span>◆</span>}
                  <strong>{actor.name}</strong>
                  <small>{actor.influence} influence</small>
                </div>
              ))}
            </div>
            <AccessibleSpatialAlternative label="Actor map textual equivalent">
              <div className="m3-oq-actor-list">
                {generated.actors.map((actor) => (
                  <article key={actor.id}>
                    <h3>{actor.name}</h3>
                    <dl>
                      <div><dt>Role</dt><dd>{actor.role}</dd></div>
                      <div><dt>Formal responsibility</dt><dd>{actor.authority}</dd></div>
                      <div><dt>Practical influence</dt><dd>{actor.influence}</dd></div>
                      <div><dt>Likely position</dt><dd>{actor.position}</dd></div>
                      <div><dt>Engagement risk</dt><dd>{actor.risk}</dd></div>
                      <div><dt>Safe engagement implication</dt><dd>{actor.engagement}</dd></div>
                    </dl>
                  </article>
                ))}
              </div>
            </AccessibleSpatialAlternative>
            <p className="m3-oq-recommendation"><strong>Project-design recommendation:</strong> {generated.recommendation}</p>
          </GeneratedOutputSurface>
        )}
        <PrototypeActions
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

const informationChoices: Choice[] = [
  {
    id: 'early-briefing',
    label: 'Early accessible briefings in kebeles and the market',
    description: 'Share concise information before priorities are fixed, using accessible formats.',
  },
  {
    id: 'multi-channel',
    label: 'Radio, notice, audio and facilitated small-group information',
    description: 'Use more than one format and allow questions before participation.',
  },
  {
    id: 'targeted',
    label: 'Targeted outreach with transport and communication support',
    description: 'Reach groups affected by distance, disability, time or cost barriers.',
  },
];

const participationChoices: Choice[] = [
  {
    id: 'priority-setting',
    label: 'Small-group priority setting before the public meeting',
    description: 'Allow affected groups to shape options before the wider decision.',
  },
  {
    id: 'accessible-forum',
    label: 'Accessible facilitated forum with recorded decision influence',
    description: 'Record which priorities changed or received a reasoned response.',
  },
  {
    id: 'representative-review',
    label: 'Rights-holder review panel with direct participation routes',
    description: 'Use representatives without replacing direct affected-group input.',
  },
];

const responseChoices: Choice[] = [
  {
    id: 'response-log',
    label: 'Public response log with accessible explanation and follow-up date',
    description: 'Show what was accepted, adjusted or not adopted and why.',
  },
  {
    id: 'parallel-feedback',
    label: 'Confidential and public feedback routes with responsible focal points',
    description: 'Protect sensitive feedback while retaining accountable response.',
  },
  {
    id: 'review-cycle',
    label: 'Quarterly feedback-response and adaptation review',
    description: 'Monitor whether agreed changes are implemented and adapt where needed.',
  },
];

type PathwayPhase = {
  id: string;
  title: string;
  steps: string[];
  responsibleActors: string[];
};

type ParticipationPathway = {
  informationMethod: string;
  participationMethod: string;
  responseMethod: string;
  priorityGroups: string[];
  barriersAddressed: string[];
  inclusionAdaptations: string[];
  phases: PathwayPhase[];
  sourceSignature: string;
  generatedAt: string;
};

export function buildParticipationPathway(
  information: string,
  participation: string,
  response: string,
  dependencies: {
    groups: string[];
    barriers: string[];
    dutyBearers: string[];
    inclusion: string[];
  },
): ParticipationPathway {
  const groups = dependencies.groups.length ? dependencies.groups : ['Women traders', 'remote kebele residents', 'persons with disabilities'];
  const barriers = dependencies.barriers.length ? dependencies.barriers : ['Late information', 'distance and transport cost', 'physical or communication access'];
  const dutyBearers = dependencies.dutyBearers.length ? dependencies.dutyBearers : ['Woreda planning and service offices'];
  const inclusion = dependencies.inclusion.length ? dependencies.inclusion : ['Accessible formats', 'reasonable accommodation', 'safe alternative channels'];
  return {
    informationMethod: information,
    participationMethod: participation,
    responseMethod: response,
    priorityGroups: groups,
    barriersAddressed: barriers,
    inclusionAdaptations: inclusion,
    phases: [
      {
        id: 'prepare',
        title: 'Prepare access and information',
        steps: [
          information,
          `Check formats, timing, transport and accommodation with ${groups.join(', ')}.`,
        ],
        responsibleActors: ['Awra facilitates access', ...dutyBearers],
      },
      {
        id: 'participate',
        title: 'Enable participation and influence',
        steps: [
          participation,
          'Record which priorities influenced the decision before activities are finalized.',
        ],
        responsibleActors: ['Rights-holders participate directly', ...dutyBearers],
      },
      {
        id: 'respond',
        title: 'Receive, respond and explain',
        steps: [
          response,
          'Assign receipt, review, decision and explanation responsibilities; Awra supports but does not replace them.',
        ],
        responsibleActors: dutyBearers,
      },
      {
        id: 'adapt',
        title: 'Adapt, follow up and monitor',
        steps: [
          `Apply ${inclusion.join(', ').toLowerCase()} where the selected barriers require them.`,
          'Check whether responses were delivered, agreed changes occurred and new exclusion or risk emerged.',
        ],
        responsibleActors: ['Responsible public actors', 'Awra follow-up', 'rights-holder review'],
      },
    ],
    sourceSignature: signature([information, participation, response, groups, barriers, dutyBearers, inclusion]),
    generatedAt: new Date().toISOString(),
  };
}

export function ParticipationPathwayPrototype({ screen, state, onChangeState, onComplete }: PrototypeProps) {
  const saved = readScreenState(state, screen.id);
  const screen7 = readScreenState(state, 'M3-R07');
  const screen8 = readScreenState(state, 'M3-R08');
  const screen11 = readScreenState(state, 'M3-R11');
  const savedPathway = (saved.participationAccountabilityPathway || saved.canonicalPathwaySummary) as Partial<ParticipationPathway> | undefined;
  const [information, setInformation] = useState(getString(saved.prototypeInformationMethod) || getString(savedPathway?.informationMethod));
  const [participation, setParticipation] = useState(getString(saved.prototypeParticipationMethod) || getString(savedPathway?.participationMethod));
  const [response, setResponse] = useState(getString(saved.prototypeResponseMethod) || getString(savedPathway?.responseMethod));
  const dependencies = useMemo(() => ({
    groups: getStringArray(screen7.selectedGroups).length
      ? getStringArray(screen7.selectedGroups)
      : getStringArray(screen7.generatedMapRows).slice(0, 3),
    barriers: getStringArray(screen7.barriersToTest).length
      ? getStringArray(screen7.barriersToTest)
      : Object.values((screen7.assignedBarriers as Record<string, string>) || {}),
    dutyBearers: getStringArray(screen8.selectedDutyBearers),
    inclusion: getStringArray(screen11.selectedRepairs).length
      ? getStringArray(screen11.selectedRepairs)
      : ['Accessible information', 'reasonable accommodation', 'safe alternative channels'],
  }), [screen11, screen7, screen8]);
  const expected = signature([information, participation, response, dependencies.groups, dependencies.barriers, dependencies.dutyBearers, dependencies.inclusion]);
  const restored = savedPathway?.sourceSignature === expected ? savedPathway as ParticipationPathway : null;
  const [generated, setGenerated] = useState<ParticipationPathway | null>(restored);

  const update = (field: 'information' | 'participation' | 'response', value: string) => {
    const next = {
      information: field === 'information' ? value : information,
      participation: field === 'participation' ? value : participation,
      response: field === 'response' ? value : response,
    };
    setInformation(next.information);
    setParticipation(next.participation);
    setResponse(next.response);
    setGenerated(null);
    persistDraft(onChangeState, screen.id, {
      prototypeInformationMethod: next.information,
      prototypeParticipationMethod: next.participation,
      prototypeResponseMethod: next.response,
    });
  };

  const ready = Boolean(information && participation && response);
  const guidance = !information
    ? 'Select one accessible information method.'
    : !participation
      ? 'Select one participation or influence method.'
      : !response
        ? 'Select one feedback and response method.'
        : generated
          ? 'The current Participation and Accountability Pathway is ready to continue.'
          : 'Three decisions are complete. Generate the full pathway.';

  const generate = () => {
    if (!ready) return;
    const next = buildParticipationPathway(information, participation, response, dependencies);
    setGenerated(next);
    persistDraft(onChangeState, screen.id, {
      prototypeInformationMethod: information,
      prototypeParticipationMethod: participation,
      prototypeResponseMethod: response,
      canonicalPathwaySummary: next,
      participationAccountabilityPathway: next,
      participationPathwaySourceSignature: next.sourceSignature,
    });
  };

  const complete = () => {
    if (!generated) return;
    onComplete({
      module3PortfolioModelVersion: PORTFOLIO_MODEL_VERSION,
      submitted: true,
      canonicalPathwaySummary: generated,
      participationAccountabilityPathway: generated,
      participationPathwaySourceSignature: generated.sourceSignature,
      selectedInformationMethod: information,
      selectedParticipationMethod: participation,
      selectedFeedbackResponseMethod: response,
      screen12: {
        screenId: 'M3-R12',
        submitted: true,
        canonicalPathwaySummary: generated,
        participationAccountabilityPathway: generated,
        generatedAt: generated.generatedAt,
      },
    });
  };

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`} data-testid="m3-r12-output-quality">
      <OutputQualityCanvas labelledBy={`${screen.id}-title`}>
        <ScreenHeading screen={screen} description="Choose three core methods. The course will combine them with saved groups, barriers, actor roles and inclusion measures." />
        <InteractionSurface labelledBy={`${screen.id}-interaction`}>
          <h2 id={`${screen.id}-interaction`}>Choose the three pathway anchors</h2>
          <SingleChoice legend="1. Accessible information method" name="m3-r12-information" choices={informationChoices} value={information} onChange={(value) => update('information', value)} />
          <SingleChoice legend="2. Participation or influence method" name="m3-r12-participation" choices={participationChoices} value={participation} onChange={(value) => update('participation', value)} />
          <SingleChoice legend="3. Feedback and response method" name="m3-r12-response" choices={responseChoices} value={response} onChange={(value) => update('response', value)} />
        </InteractionSurface>
        {generated && (
          <GeneratedOutputSurface labelledBy={`${screen.id}-output`}>
            <p className="m3-oq-eyebrow">CONTRIBUTES TO PORTFOLIO OUTPUT 3</p>
            <h2 id={`${screen.id}-output`}>Participation and Accountability Pathway</h2>
            <p><strong>Priority groups:</strong> {generated.priorityGroups.join(', ')}</p>
            <p><strong>Barriers addressed:</strong> {generated.barriersAddressed.join(', ')}</p>
            <ol className="m3-oq-pathway" aria-label="Generated participation and accountability pathway">
              {generated.phases.map((phase, index) => (
                <li key={phase.id}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{phase.title}</h3>
                    <ul>{phase.steps.map((step) => <li key={step}>{step}</li>)}</ul>
                    <p><strong>Roles:</strong> {phase.responsibleActors.join(' · ')}</p>
                  </div>
                  {index < generated.phases.length - 1 && <b aria-hidden="true">→</b>}
                </li>
              ))}
            </ol>
          </GeneratedOutputSurface>
        )}
        <PrototypeActions
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

const objectiveChoices: Choice[] = [
  {
    id: 'influence',
    label: 'Enable priority rights-holder groups to influence Jiru Amba service decisions and receive a responsible-actor response before implementation.',
    description: 'Connects participation, influence and accountability.',
  },
  {
    id: 'barriers',
    label: 'Remove priority information and access barriers so selected groups can shape and benefit from service improvements.',
    description: 'Connects context, inequality and practical accessibility.',
  },
  {
    id: 'responsibility',
    label: 'Strengthen responsible public-actor action while Awra supports accessible participation, evidence and follow-up.',
    description: 'Clarifies responsibility boundaries and the CSO role.',
  },
];

const activityChoices: Choice[] = [
  {
    id: 'briefings',
    label: 'Provide early accessible briefings, flexible participation routes and documented responses before final priorities are approved.',
    description: 'Combines information, influence and account-back.',
  },
  {
    id: 'accommodation',
    label: 'Provide transport or scheduling support, accessible formats and reasonable accommodation with responsible-actor follow-up.',
    description: 'Responds to participation and accessibility barriers.',
  },
  {
    id: 'monitoring',
    label: 'Use non-identifying feedback routes and quarterly joint reviews to track response, adaptation and unresolved barriers.',
    description: 'Connects safe evidence, accountability and implementation learning.',
  },
];

const watchPointChoices: Choice[] = [
  {
    id: 'response',
    label: 'Check whether priorities receive a documented response and lead to a design adjustment where appropriate.',
    description: 'Tests influence and accountable response.',
  },
  {
    id: 'accessibility',
    label: 'Check whether accessible information and reasonable-accommodation measures are actually used.',
    description: 'Tests implementation rather than stated intent.',
  },
  {
    id: 'responsibility',
    label: 'Check that public responsibility remains with the mandated actor rather than shifting to Awra.',
    description: 'Protects the responsibility boundary.',
  },
];

type RepairedDesignElement = {
  originalDesignWeakness: string;
  repairedHrbaObjective: string;
  rightsResponsiveActivityPackage: string[];
  participationMechanism: string;
  accountabilityFeedbackMechanism: string;
  inclusionAccessibilityFeature: string;
  riskSafeguard: string;
  indicatorWatchPoint: string;
  implementationImplication: string;
  hrbaReasoning: string;
  optionalLearnerEdit: string;
  sourceSignature: string;
  generatedAt: string;
};

export function buildRepairedDesignElement(
  objective: string,
  activity: string,
  watchPoint: string,
  edit: string,
  dependencies: {
    context: Record<string, unknown>;
    power: Record<string, unknown>;
    participation: Record<string, unknown>;
    risk: Record<string, unknown>;
  },
): RepairedDesignElement {
  const group = getString(dependencies.context.priorityAffectedGroup)
    || getString(dependencies.context.primaryAffectedGroup)
    || 'priority rights-holder groups';
  const enabler = getString(dependencies.power.selectedEnabler) || 'the responsible woreda office';
  const blocker = getString(dependencies.power.selectedBlocker) || 'actors who may delay or redirect change';
  const participationMethod = getString(dependencies.participation.participationMethod)
    || 'early accessible participation before decisions';
  const responseMethod = getString(dependencies.participation.responseMethod)
    || 'a documented feedback and response route';
  const riskSignal = getString(dependencies.risk.monitoringSignal)
    || 'exclusion, missing accommodation or unresolved feedback';
  return {
    originalDesignWeakness: 'The original draft lists consultation, training and infrastructure activities but does not show which barriers will change, how affected groups influence decisions, who must respond or what will be monitored.',
    repairedHrbaObjective: objective,
    rightsResponsiveActivityPackage: [
      activity,
      `Use ${participationMethod.toLowerCase()} for ${group.toLowerCase()}.`,
      `Agree roles and follow-up with ${enabler}; engage ${blocker} through the saved safe influence strategy.`,
    ],
    participationMechanism: participationMethod,
    accountabilityFeedbackMechanism: responseMethod,
    inclusionAccessibilityFeature: `Check accessible formats, timing, transport and reasonable accommodation with ${group.toLowerCase()} rather than assuming one method works for everyone.`,
    riskSafeguard: `Use non-identifying evidence and pause or adapt the method if monitoring identifies ${riskSignal}.`,
    indicatorWatchPoint: watchPoint,
    implementationImplication: 'Assign resources, responsibility and a review date before implementation; record responses and adaptations without collecting unnecessary personal information.',
    hrbaReasoning: 'The repaired element links differentiated barriers and rights-holder influence to public responsibility, accessible participation, accountable response, risk monitoring and evidence of practical change.',
    optionalLearnerEdit: edit.trim(),
    sourceSignature: signature([objective, activity, watchPoint, dependencies.context, dependencies.power, dependencies.participation, dependencies.risk]),
    generatedAt: new Date().toISOString(),
  };
}

export function RepairedDesignPrototype({ screen, state, onChangeState, onComplete }: PrototypeProps) {
  const saved = readScreenState(state, screen.id);
  const context = (readScreenState(state, 'M3-R05').contextInsight || {}) as Record<string, unknown>;
  const power = (readScreenState(state, 'M3-R09').actorPowerInsight || {}) as Record<string, unknown>;
  const participation = (readScreenState(state, 'M3-R12').canonicalPathwaySummary
    || readScreenState(state, 'M3-R12').participationAccountabilityPathway
    || {}) as Record<string, unknown>;
  const risk = (readScreenState(state, 'M3-R13').riskDoNoHarmBoard || {}) as Record<string, unknown>;
  const savedElement = saved.repairedDesignElement as Partial<RepairedDesignElement> | undefined;
  const legacyObjective = saved.repairedObjective as Record<string, unknown> | undefined;
  const legacyActivities = saved.repairedActivityPackage as Record<string, unknown> | undefined;
  const legacyPackage = saved.designRepairPackage as Record<string, unknown> | undefined;
  const [objective, setObjective] = useState(
    getString(saved.prototypeObjective)
    || getString(savedElement?.repairedHrbaObjective)
    || getString(legacyObjective?.repairedHrbaObjective),
  );
  const [activity, setActivity] = useState(
    getString(saved.prototypeActivity)
    || getString(savedElement?.rightsResponsiveActivityPackage?.[0])
    || getString(legacyActivities?.generatedSummary),
  );
  const [watchPoint, setWatchPoint] = useState(
    getString(saved.prototypeWatchPoint)
    || getString(savedElement?.indicatorWatchPoint)
    || getString(legacyPackage?.implementationWatchPoint),
  );
  const [edit, setEdit] = useState(getString(saved.prototypeOptionalEdit) || getString(savedElement?.optionalLearnerEdit));
  const expected = signature([objective, activity, watchPoint, context, power, participation, risk]);
  const restored = savedElement?.sourceSignature === expected ? savedElement as RepairedDesignElement : null;
  const [generated, setGenerated] = useState<RepairedDesignElement | null>(restored);

  const update = (field: 'objective' | 'activity' | 'watchPoint', value: string) => {
    const next = {
      objective: field === 'objective' ? value : objective,
      activity: field === 'activity' ? value : activity,
      watchPoint: field === 'watchPoint' ? value : watchPoint,
    };
    setObjective(next.objective);
    setActivity(next.activity);
    setWatchPoint(next.watchPoint);
    setGenerated(null);
    persistDraft(onChangeState, screen.id, {
      prototypeObjective: next.objective,
      prototypeActivity: next.activity,
      prototypeWatchPoint: next.watchPoint,
      prototypeOptionalEdit: edit,
    });
  };

  const ready = Boolean(objective && activity && watchPoint);
  const guidance = !objective
    ? 'Select one repaired HRBA objective.'
    : !activity
      ? 'Select one rights-responsive activity.'
      : !watchPoint
        ? 'Select one indicator or implementation watch-point.'
        : generated
          ? 'The current Repaired Project-Design Element is ready to continue.'
          : 'Three decisions are complete. Generate the repaired design.';

  const generate = () => {
    if (!ready) return;
    const next = buildRepairedDesignElement(
      objective,
      activity,
      watchPoint,
      edit,
      { context, power, participation, risk },
    );
    setGenerated(next);
    persistDraft(onChangeState, screen.id, {
      prototypeObjective: objective,
      prototypeActivity: activity,
      prototypeWatchPoint: watchPoint,
      prototypeOptionalEdit: edit,
      repairedDesignElement: next,
      repairedDesignElementSourceSignature: next.sourceSignature,
    });
  };

  const complete = () => {
    if (!generated) return;
    const repairedActivities = generated.rightsResponsiveActivityPackage.map((item, index) => ({
      id: `action-${index + 1}`,
      title: index === 0 ? 'Learner-selected activity' : 'Generated supporting action',
      repairedActivity: item,
    }));
    onComplete({
      module3PortfolioModelVersion: PORTFOLIO_MODEL_VERSION,
      submitted: true,
      repairedDesignElement: generated,
      repairedDesignElementSourceSignature: generated.sourceSignature,
      repairedObjective: {
        originalWeakObjective: generated.originalDesignWeakness,
        repairedHrbaObjective: generated.repairedHrbaObjective,
        whatWasMissing: 'Rights-holder barriers, influence and response responsibility were not connected.',
        hrbaDesignLogic: generated.hrbaReasoning,
        carryIntoActivityRepair: generated.implementationImplication,
      },
      repairedActivityPackage: {
        selectedActionIds: repairedActivities.map((item) => item.id),
        repairedActivities,
        generatedSummary: generated.rightsResponsiveActivityPackage.join(' '),
        feedbackMessages: [generated.hrbaReasoning],
        repairedObjectiveUsed: generated.repairedHrbaObjective,
      },
      interventionLogicIndicators: {
        barrierRootCause: generated.originalDesignWeakness,
        repairedObjective: generated.repairedHrbaObjective,
        repairedActivity: generated.rightsResponsiveActivityPackage[0],
        output: 'Accessible participation, response and follow-up arrangements documented.',
        outcome: 'Priority groups influence decisions and responsible actors respond.',
        indicator: generated.indicatorWatchPoint,
        safeEvidenceSource: 'Non-identifying decision, response, accessibility and adaptation records.',
        assumptionRisk: generated.riskSafeguard,
        implementationWatchPoint: generated.indicatorWatchPoint,
        logicQualitySummary: generated.hrbaReasoning,
        feedbackMessages: ['The repaired element connects analysis to implementation.'],
      },
      designRepairPackage: {
        selectedIssueId: 'analysisNotUsed',
        repairedObjective: generated.repairedHrbaObjective,
        selectedActivityPackage: generated.rightsResponsiveActivityPackage,
        implementationWatchPoint: generated.indicatorWatchPoint,
        interventionLogicChain: generated.rightsResponsiveActivityPackage,
        indicatorSignOfChange: generated.indicatorWatchPoint,
        safeEvidenceSource: 'Non-identifying response, accessibility and adaptation records.',
        riskAssumption: generated.riskSafeguard,
        implementationWatchPointValue: generated.indicatorWatchPoint,
        carryForwardNote: generated.implementationImplication,
        generatedAt: generated.generatedAt,
      },
      portfolioSummary: generated.hrbaReasoning,
      savedAt: generated.generatedAt,
    });
  };

  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`} data-testid="m3-r14-output-quality">
      <OutputQualityCanvas labelledBy={`${screen.id}-title`}>
        <ScreenHeading screen={screen} description="Make three design decisions. The course will combine them with your saved analysis into a complete project-design element." />
        <InteractionSurface labelledBy={`${screen.id}-interaction`}>
          <h2 id={`${screen.id}-interaction`}>Choose the repair anchors</h2>
          <SingleChoice legend="1. Repaired HRBA objective" name="m3-r14-objective" choices={objectiveChoices} value={objective} onChange={(value) => update('objective', value)} />
          <SingleChoice legend="2. Rights-responsive activity" name="m3-r14-activity" choices={activityChoices} value={activity} onChange={(value) => update('activity', value)} />
          <SingleChoice legend="3. Indicator or implementation watch-point" name="m3-r14-watch" choices={watchPointChoices} value={watchPoint} onChange={(value) => update('watchPoint', value)} />
          <label className="m3-oq-optional-note">
            Optional short implementation edit
            <textarea
              value={edit}
              maxLength={300}
              onChange={(event) => {
                const value = event.target.value;
                setEdit(value);
                setGenerated(null);
                persistDraft(onChangeState, screen.id, {
                  prototypeObjective: objective,
                  prototypeActivity: activity,
                  prototypeWatchPoint: watchPoint,
                  prototypeOptionalEdit: value,
                });
              }}
            />
            <span>{edit.length}/300 · Optional and never required to continue.</span>
          </label>
        </InteractionSurface>
        {generated && (
          <GeneratedOutputSurface labelledBy={`${screen.id}-output`}>
            <p className="m3-oq-eyebrow">PORTFOLIO OUTPUT 3 OF 4</p>
            <h2 id={`${screen.id}-output`}>Repaired Project-Design Element</h2>
            <BeforeAfterComparison
              before={<p>{generated.originalDesignWeakness}</p>}
              after={(
                <dl className="m3-oq-repair-details">
                  <div><dt>HRBA objective</dt><dd>{generated.repairedHrbaObjective}</dd></div>
                  <div><dt>Activity package</dt><dd><ul>{generated.rightsResponsiveActivityPackage.map((item) => <li key={item}>{item}</li>)}</ul></dd></div>
                  <div><dt>Participation mechanism</dt><dd>{generated.participationMechanism}</dd></div>
                  <div><dt>Accountability and feedback</dt><dd>{generated.accountabilityFeedbackMechanism}</dd></div>
                  <div><dt>Inclusion and accessibility</dt><dd>{generated.inclusionAccessibilityFeature}</dd></div>
                  <div><dt>Risk safeguard</dt><dd>{generated.riskSafeguard}</dd></div>
                  <div><dt>Indicator/watch-point</dt><dd>{generated.indicatorWatchPoint}</dd></div>
                </dl>
              )}
              reasoning={(
                <>
                  <p>{generated.hrbaReasoning}</p>
                  <p><strong>Implementation implication:</strong> {generated.implementationImplication}</p>
                  {generated.optionalLearnerEdit && <p><strong>Learner edit:</strong> {generated.optionalLearnerEdit}</p>}
                </>
              )}
            />
          </GeneratedOutputSurface>
        )}
        <PrototypeActions
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

export function CompatibilityIntegratedScreen({ screen }: { screen: Module3RevisedScreen }) {
  const target = screen.id === 'M3-R15' || screen.id === 'M3-R16'
    ? '/module-3/screen-3-14'
    : '/module-3/screen-3-17';
  const targetTitle = screen.id === 'M3-R15' || screen.id === 'M3-R16'
    ? 'HRBA Project Design Repair'
    : 'Draft Plan Review and Repair';
  return (
    <main className="m3-screen m3-oq-screen" aria-labelledby={`${screen.id}-title`} data-testid="m3-hidden-compatibility">
      <OutputQualityCanvas labelledBy={`${screen.id}-title`}>
        <ScreenHeading screen={screen} description="This former step is now completed inside a canonical visible Module 3 screen." />
        <InteractionSurface labelledBy={`${screen.id}-compatibility`}>
          <h2 id={`${screen.id}-compatibility`}>Your saved work is preserved</h2>
          <p>
            This compatibility route does not start the former workflow and does not record
            progress. Continue in the current integrated screen.
          </p>
          <a className="m3-oq-primary-action" href={target}>Go to {targetTitle}</a>
        </InteractionSurface>
      </OutputQualityCanvas>
    </main>
  );
}

export const module3PrototypeRubricTargets = {
  contextInsight: [4, 4, 4, 4, 3, 3, 4, 4, 4, 4, 4, 4],
  actorPowerInsight: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  participationPathway: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  repairedDesignElement: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
} as const;

export function outputHasRequiredSections(output: Record<string, unknown>, required: string[]) {
  return required.every((key) => {
    const value = output[key];
    return Array.isArray(value) ? value.length > 0 : typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
  });
}

export function renderForTest(value: ReactNode) {
  return value;
}
