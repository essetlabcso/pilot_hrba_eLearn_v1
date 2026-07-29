import type { LearningState } from '../../../state/learningState';
import {
  MODULE4_SCREEN_ROUTES,
  MODULE4_WORKSTREAMS,
  createInitialModule4EnhancedState,
  migrateModule4EnhancedState,
  recordModule4EnhancedScreenCompletion,
  updateModule4Field,
  type Module4Batch1State,
  type Module4CanonicalScreenId,
  type Module4EnhancedState,
  type Module4EvidenceClassification,
  type Module4Workstream,
} from '../../../data/module4/module4EnhancedModel';
import { MODULE4_ENHANCED_ASSETS } from '../../../data/module4/module4EnhancedAssets';
import {
  Module4EnhancedActionBar,
  Module4EnhancedScreenFrame,
  Module4EnhancedStageList,
} from './Module4EnhancedFoundation';

type Batch1ScreenId = 'M4-S1-01' | 'M4-S1-02' | 'M4-S1-03' | 'M4-S1-04';

type Props = {
  screenId: Batch1ScreenId;
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
};

type WorkstreamId = Exclude<Module4Workstream, ''>;

const BATCH1_NEXT_SCREEN: Record<Batch1ScreenId, Module4CanonicalScreenId> = {
  'M4-S1-01': 'M4-S1-02',
  'M4-S1-02': 'M4-S1-03',
  'M4-S1-03': 'M4-S1-04',
  'M4-S1-04': 'M4-S1-05',
};

const bridgeChoices = [
  {
    id: 'A' as const,
    text: 'The project is satisfactory because planned activities are happening on time.',
    feedback: 'Delivery timing alone does not show whether implementation is fair, participatory, or accountable.',
  },
  {
    id: 'B' as const,
    text: 'Awra should check both delivery and how different people experience and influence implementation.',
    feedback: 'HRBA during implementation looks at both progress and people’s real experience. Awra should respond to what it controls and work with responsible actors without replacing them.',
    correct: true,
  },
  {
    id: 'C' as const,
    text: 'Awra should take over the roles of public and service actors when commitments slip.',
    feedback: 'Awra can adjust its own work and engage responsible actors, but should not replace a duty-bearer.',
  },
];

const practiceStages = [
  'Notice an implementation concern.',
  'Distinguish confirmed information from assumptions.',
  'Examine who is affected and who may have limited influence.',
  'Choose an appropriate and proportionate response.',
  'Clarify Awra’s role and the responsibilities of other actors.',
  'Explain the decision and plan follow-up.',
];

const lensSteps = [
  {
    title: 'Notice and understand',
    shortLabel: 'Notice',
    question: 'What does not match the improved design?',
    situation: 'The agreed accessibility improvement at the health post is incomplete.',
    move: 'Record the implementation signal without assuming why it happened.',
  },
  {
    title: 'Analyse rights impacts',
    shortLabel: 'Analyse',
    question: 'Who may experience the current arrangement differently?',
    situation: 'Some people may be unable to enter or use the consultation venue independently.',
    move: 'Check access needs and preferences with affected participants.',
  },
  {
    title: 'Choose a proportionate response',
    shortLabel: 'Respond',
    question: 'What response addresses the immediate barrier without exceeding Awra’s role?',
    situation: 'The consultation venue can be changed now, while the public building action needs another actor.',
    move: 'Use an accessible venue and prepare constructive engagement on the unfinished action.',
  },
  {
    title: 'Clarify responsibilities and influence',
    shortLabel: 'Clarify',
    question: 'What can Awra change, and what belongs to another actor?',
    situation: 'Awra controls its consultation arrangements. The public facility remains the responsibility of the relevant service actor.',
    move: 'Change its own venue and engage the responsible actor about the building action.',
  },
  {
    title: 'Act and implement',
    shortLabel: 'Act',
    question: 'How should the agreed response be put into practice?',
    situation: 'Participants need clear information about the accessible venue and the action being followed up.',
    move: 'Make the venue change, communicate it accessibly, and document the responsible actor’s action.',
  },
  {
    title: 'Follow up and learn',
    shortLabel: 'Follow up',
    question: 'What should Awra check after acting?',
    situation: 'The immediate consultation barrier is addressed, but the facility action is still open.',
    move: 'Confirm the responsible role, review date, community update, and lesson for Module 5.',
  },
] as const;

const workstreamData: Record<WorkstreamId, {
  label: string;
  signal: string;
  known: string;
  checking: string;
  matters: string;
  claims: readonly {
    id: string;
    text: string;
    answer: Exclude<Module4EvidenceClassification, ''>;
  }[];
}> = {
  market: {
    label: 'Market',
    signal: 'A revised market layout may change who can use the improved trading space.',
    known: 'The proposed layout has changed since the design review.',
    checking: 'Who influenced the change and whether vendors with different access needs can use it.',
    matters: 'A layout can appear complete while still limiting fair access or influence.',
    claims: [
      { id: 'layout_changed', text: 'The proposed market layout changed.', answer: 'confirmed' },
      { id: 'all_vendors_consulted', text: 'All affected vendors influenced the change.', answer: 'needs_checking' },
      { id: 'access_effect', text: 'The change may affect access for some vendors.', answer: 'confirmed' },
    ],
  },
  water_service: {
    label: 'Water Service',
    signal: 'A water-service action agreed with the responsible desk has not been confirmed as complete.',
    known: 'The service action and responsible public actor were recorded.',
    checking: 'Current status, reason for delay, and the date for an accountable update.',
    matters: 'Awra can support follow-up but should not take over the public actor’s responsibility.',
    claims: [
      { id: 'actor_recorded', text: 'A responsible public actor was identified.', answer: 'confirmed' },
      { id: 'repair_complete', text: 'The agreed service action is complete.', answer: 'needs_checking' },
      { id: 'awra_owns_service', text: 'Awra owns the public service responsibility.', answer: 'needs_checking' },
    ],
  },
  youth_livelihoods: {
    label: 'Youth Livelihoods',
    signal: 'Youth attend activities, but their influence over follow-up support is unclear.',
    known: 'Youth participation is recorded in attendance information.',
    checking: 'Which youth groups influenced decisions and how their views changed follow-up.',
    matters: 'Attendance is not the same as meaningful participation.',
    claims: [
      { id: 'attendance_recorded', text: 'Youth attendance was recorded.', answer: 'confirmed' },
      { id: 'influence_confirmed', text: 'Different youth groups influenced follow-up decisions.', answer: 'needs_checking' },
      { id: 'attendance_is_influence', text: 'Attendance proves meaningful influence.', answer: 'needs_checking' },
    ],
  },
  health_post: {
    label: 'Health Post',
    signal: 'The agreed accessibility improvement is still incomplete.',
    known: 'A site observation confirms that the entrance is not yet accessible.',
    checking: 'The reason for the delay and the completion date are still unclear.',
    matters: 'The barrier may affect who can attend and how safely people can participate.',
    claims: [
      { id: 'entrance_incomplete', text: 'The accessible entrance is still incomplete.', answer: 'confirmed' },
      { id: 'actor_ignored', text: 'The responsible actor chose to ignore the commitment.', answer: 'needs_checking' },
      { id: 'participation_effect', text: 'The delay may affect who can participate.', answer: 'confirmed' },
    ],
  },
  consultation_feedback: {
    label: 'Consultation & Feedback',
    signal: 'Feedback has been recorded, but no owner or response date is shown.',
    known: 'Concerns were logged.',
    checking: 'Who reviewed them, what response was agreed, and how people will hear back.',
    matters: 'Collecting feedback is not the same as accountability.',
    claims: [
      { id: 'concerns_logged', text: 'Concerns were entered in the log.', answer: 'confirmed' },
      { id: 'issues_resolved', text: 'The issues were already resolved.', answer: 'needs_checking' },
      { id: 'owner_missing', text: 'No response owner is shown.', answer: 'confirmed' },
    ],
  },
};

const mapAssets = Object.fromEntries(
  MODULE4_ENHANCED_ASSETS
    .filter((item) => item.screenNumber === 5)
    .map((item) => [item.id, item]),
);

function currentEnhancedState(state: LearningState): Module4EnhancedState {
  const migration = migrateModule4EnhancedState({
    practiceCheckState: state.practiceCheckState,
    screenProgress: state.screenProgress,
    completedModules: state.completedModules,
  });
  return migration.practiceCheckState.module4Enhanced as Module4EnhancedState
    || createInitialModule4EnhancedState(new Date().toISOString());
}

function updateBatch1(
  onChangeState: Props['onChangeState'],
  updater: (enhanced: Module4EnhancedState) => Module4EnhancedState,
) {
  onChangeState((prev) => {
    const migrated = migrateModule4EnhancedState({
      practiceCheckState: prev.practiceCheckState,
      screenProgress: prev.screenProgress,
      completedModules: prev.completedModules,
    });
    const enhanced = updater(migrated.practiceCheckState.module4Enhanced as Module4EnhancedState);
    return {
      ...prev,
      practiceCheckState: {
        ...migrated.practiceCheckState,
        module4Enhanced: enhanced,
      },
    };
  });
}

function saveBatch1Slice<K extends keyof Module4Batch1State>(
  onChangeState: Props['onChangeState'],
  key: K,
  value: Module4Batch1State[K],
) {
  updateBatch1(onChangeState, (enhanced) => ({
    ...enhanced,
    batch1: {
      ...enhanced.batch1,
      [key]: value,
    },
  }));
}

function completeScreen(
  screenId: Batch1ScreenId,
  onChangeState: Props['onChangeState'],
) {
  const nextScreenId = BATCH1_NEXT_SCREEN[screenId];
  onChangeState((prev) => {
    const migrated = migrateModule4EnhancedState({
      practiceCheckState: prev.practiceCheckState,
      screenProgress: prev.screenProgress,
      completedModules: prev.completedModules,
    });
    const enhanced = migrated.practiceCheckState.module4Enhanced as Module4EnhancedState;
    const completed = recordModule4EnhancedScreenCompletion(
      { screenProgress: prev.screenProgress, module4Enhanced: enhanced },
      screenId,
      true,
    );
    return {
      ...prev,
      currentScreenId: nextScreenId,
      screenProgress: completed.screenProgress,
      practiceCheckState: {
        ...migrated.practiceCheckState,
        module4Enhanced: completed.module4Enhanced,
      },
    };
  });
  window.history.pushState(null, '', MODULE4_SCREEN_ROUTES[nextScreenId]);
}

function BriefRows() {
  return (
    <dl className="m4-enhanced-brief">
      <div><dt>Why this matters</dt><dd>A project can be on schedule and still overlook who is excluded, who influences decisions, and who must act.</dd></div>
      <div><dt>Your task</dt><dd>Choose the strongest interpretation of the Jiru Amba implementation update.</dd></div>
      <div><dt>How to complete it</dt><dd>Select one option, then choose Submit. You can revise your answer after feedback.</dd></div>
    </dl>
  );
}

function BridgeScreen({ state, onChangeState }: Props) {
  const saved = currentEnhancedState(state).batch1.bridge;
  const selected = saved.selectedAnswer;
  const submitted = saved.feedbackViewed;
  const selectedChoice = bridgeChoices.find((choice) => choice.id === selected);

  const save = (next: Module4Batch1State['bridge']) =>
    saveBatch1Slice(onChangeState, 'bridge', next);

  return (
    <Module4EnhancedScreenFrame
      titleId="m4-enhanced-bridge-title"
      eyebrow="Module 4 · Screen 2"
      title="From Design to Rights-Responsive Implementation"
      introduction={<BriefRows />}
      context={(
        <div className="m4-enhanced-bridge-context">
          <article>
            <span className="m4-enhanced-symbol" aria-hidden="true">↝</span>
            <div>
              <h2>The Bridge <small>Module 3 → Module 4</small></h2>
              <p>In Module 3, Awra and Selam helped review and improve the Jiru Amba Futures Plan. The improved design included clearer responsibilities, more accessible participation, better feedback arrangements, risk controls and questions for monitoring.</p>
            </div>
          </article>
          <article>
            <span className="m4-enhanced-symbol" aria-hidden="true">⌁</span>
            <div>
              <h2>Scenario Update</h2>
              <p>Implementation has now begun. Two months later, the team is seeing signs that some agreed improvements are not happening as planned.</p>
            </div>
          </article>
        </div>
      )}
      activity={(
        <>
          <fieldset className="m4-enhanced-choice-group">
            <legend>Which interpretation is strongest?</legend>
            {bridgeChoices.map((choice) => (
              <label
                key={choice.id}
                className={[
                  'm4-enhanced-choice',
                  selected === choice.id ? 'is-selected' : '',
                  submitted && choice.correct ? 'is-correct' : '',
                ].filter(Boolean).join(' ')}
              >
                <input
                  type="radio"
                  name="m4-bridge-answer"
                  value={choice.id}
                  checked={selected === choice.id}
                  disabled={submitted}
                  onChange={() => save({ selectedAnswer: choice.id, feedbackViewed: false })}
                />
                <strong>{choice.id}.</strong>
                <span>{choice.text}</span>
              </label>
            ))}
          </fieldset>
          {submitted && selectedChoice && (
            <div className={selectedChoice.correct ? 'm4-enhanced-feedback is-success' : 'm4-enhanced-feedback is-coaching'} role="status" aria-live="polite">
              <strong>{selectedChoice.correct ? 'Recommended.' : 'Consider this.'}</strong>
              <p>{selectedChoice.feedback}</p>
            </div>
          )}
          <Module4EnhancedActionBar
            secondary={submitted ? (
              <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ selectedAnswer: selected, feedbackViewed: false })}>
                Revise answer
              </button>
            ) : undefined}
            primary={submitted && selectedChoice?.correct ? (
              <button type="button" className="m4-enhanced-button is-primary" onClick={() => completeScreen('M4-S1-01', onChangeState)}>
                Continue <span aria-hidden="true">→</span>
              </button>
            ) : submitted ? (
              <button type="button" className="m4-enhanced-button is-primary" disabled>
                Continue
              </button>
            ) : (
              <button
                type="button"
                className="m4-enhanced-button is-primary"
                disabled={!selected}
                onClick={() => save({ selectedAnswer: selected, feedbackViewed: true })}
              >
                Submit
              </button>
            )}
          />
        </>
      )}
      status={submitted ? 'You may revise your answer before continuing.' : 'Choose one interpretation to unlock Submit.'}
    />
  );
}

function PracticeJourneyScreen({ state, onChangeState }: Props) {
  const saved = currentEnhancedState(state).batch1.practiceJourney;
  const ready = saved.exampleExpanded && saved.acknowledged;
  const save = (next: Module4Batch1State['practiceJourney']) =>
    saveBatch1Slice(onChangeState, 'practiceJourney', next);

  return (
    <Module4EnhancedScreenFrame
      titleId="m4-enhanced-practice-title"
      eyebrow="Module 4 · Screen 3"
      title="What You Will Practise and Produce"
      introduction={<p><strong>Purpose of this screen:</strong> See how each practice activity will help you make and document a rights-responsive implementation decision.</p>}
      context={(
        <Module4EnhancedStageList
          label="Module 4 practice journey"
          activeStage="stage-1"
          stages={practiceStages.map((label, index) => ({
            id: `stage-${index + 1}`,
            label,
            complete: false,
          }))}
        />
      )}
      activity={(
        <>
          <article className="m4-enhanced-output-card">
            <div className="m4-enhanced-document-icon" aria-hidden="true">≡</div>
            <div>
              <p className="m4-enhanced-kicker">Your practical output</p>
              <h2>Implementation Decision and Follow-Up Note</h2>
              <p>The activities in this module will help you build a concise note recording the implementation concern, evidence, response, responsibilities, account-back commitment and follow-up question for Module 5.</p>
              <button
                type="button"
                className="m4-enhanced-text-button"
                aria-expanded={saved.exampleExpanded}
                aria-controls="m4-fictional-example"
                onClick={() => save({ ...saved, exampleExpanded: !saved.exampleExpanded })}
              >
                {saved.exampleExpanded ? 'Hide' : 'View'} a fictional example
              </button>
            </div>
          </article>
          {saved.exampleExpanded && (
            <article id="m4-fictional-example" className="m4-enhanced-example">
              <h3>Example: Health-post accessibility</h3>
              <p><strong>Concern:</strong> An agreed accessibility improvement is incomplete.</p>
              <p><strong>Response:</strong> Awra changes the consultation venue it controls and engages the responsible service actor about the building action.</p>
              <p><strong>Follow-up:</strong> Confirm the agreed action, responsible role and review date.</p>
            </article>
          )}
          <label className="m4-enhanced-acknowledgement">
            <input
              type="checkbox"
              checked={saved.acknowledged}
              onChange={(event) => save({ ...saved, acknowledged: event.target.checked })}
            />
            <span>I understand what I will practise and produce.</span>
          </label>
          <Module4EnhancedActionBar
            primary={(
              <button
                type="button"
                className="m4-enhanced-button is-primary"
                disabled={!ready}
                onClick={() => completeScreen('M4-S1-02', onChangeState)}
              >
                Continue <span aria-hidden="true">→</span>
              </button>
            )}
          />
        </>
      )}
      status={ready
        ? 'Ready to continue. The next screens will guide you through each step.'
        : 'View the fictional example and confirm your understanding to continue.'}
    />
  );
}

function EverydayRightsLensScreen({ state, onChangeState }: Props) {
  const saved = currentEnhancedState(state).batch1.everydayRightsLens;
  const activeStep = Math.min(6, Math.max(1, saved.activeStep));
  const detail = lensSteps[activeStep - 1];
  const explored = new Set(saved.exploredSteps);
  const allExplored = explored.size === lensSteps.length;
  const selectedCorrectly = saved.finalAnswer === 'B';

  const save = (next: Module4Batch1State['everydayRightsLens']) =>
    saveBatch1Slice(onChangeState, 'everydayRightsLens', next);
  const visit = (step: number) => {
    const nextExplored = new Set(saved.exploredSteps);
    nextExplored.add(step);
    save({ ...saved, activeStep: step, exploredSteps: [...nextExplored].sort() });
  };

  return (
    <Module4EnhancedScreenFrame
      className="m4-enhanced-screen--lens"
      titleId="m4-enhanced-lens-title"
      eyebrow="Module 4 · Screen 4"
      title="The Everyday Rights Lens in Action"
      introduction={(
        <>
          <p>When implementation does not match the improved design, use this cycle to understand the issue, choose a proportionate response and follow it up.</p>
          <p>Explore the cycle to see how Awra responds when implementation does not match the improved design.</p>
        </>
      )}
      context={(
        <div className="m4-enhanced-lens">
          <div className="m4-enhanced-lens__centre" aria-hidden="true">Rights<br />lens</div>
          {lensSteps.map((step, index) => {
            const stepNumber = index + 1;
            const canVisit = stepNumber === 1 || explored.has(stepNumber) || explored.has(stepNumber - 1);
            const isActive = activeStep === stepNumber;
            const isComplete = explored.has(stepNumber);
            const visualState = isActive
              ? 'Current step'
              : isComplete
                ? 'Explored'
                : canVisit
                  ? 'Available next'
                  : 'Locked';
            return (
              <button
                key={step.title}
                type="button"
                className={[
                  'm4-enhanced-lens__step',
                  `is-step-${stepNumber}`,
                  isActive ? 'is-active' : '',
                  isComplete ? 'is-complete' : '',
                  canVisit && !isActive && !isComplete ? 'is-available' : '',
                  !canVisit ? 'is-locked' : '',
                ].filter(Boolean).join(' ')}
                disabled={!canVisit}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`${stepNumber}. ${step.title}. ${visualState}.`}
                onClick={() => visit(stepNumber)}
              >
                <span className="m4-enhanced-lens__number" aria-hidden="true">{stepNumber}</span>
                <span className="m4-enhanced-lens__label" aria-hidden="true">{step.shortLabel}</span>
                <small className="m4-enhanced-lens__state" aria-hidden="true">{visualState}</small>
              </button>
            );
          })}
        </div>
      )}
      activity={(
        <>
          <article className="m4-enhanced-scenario-banner">
            <h2>Jiru Amba example</h2>
            <p>An agreed accessibility improvement at the health post is incomplete. Awra is preparing a consultation but does not control the public building.</p>
          </article>
          <div className="m4-enhanced-progress" aria-label={`${explored.size} of 6 steps explored`}>
            <strong>{explored.size} of 6 explored</strong>
            <progress max="6" value={explored.size}>{explored.size} of 6</progress>
          </div>
          <article className="m4-enhanced-step-detail">
            <p className="m4-enhanced-kicker">Step {activeStep}</p>
            <h2>{detail.title}</h2>
            <dl>
              <div><dt>Question</dt><dd>{detail.question}</dd></div>
              <div><dt>In Jiru Amba</dt><dd>{detail.situation}</dd></div>
              <div><dt>Awra’s next move</dt><dd>{detail.move}</dd></div>
            </dl>
          </article>
          <Module4EnhancedActionBar
            secondary={(
              <button
                type="button"
                className="m4-enhanced-button is-secondary"
                disabled={activeStep === 1}
                onClick={() => visit(activeStep - 1)}
              >
                ← Previous step
              </button>
            )}
            primary={!allExplored ? (
              <button
                type="button"
                className="m4-enhanced-button is-primary"
                onClick={() => visit(explored.size === 0 ? 1 : Math.min(6, activeStep + 1))}
              >
                {explored.size === 0 ? 'Start with Step 1' : 'Next step'} →
              </button>
            ) : undefined}
          />
          {allExplored && (
            <fieldset className="m4-enhanced-choice-group m4-enhanced-final-question">
              <legend>Which step prevents Awra from taking over the responsibility of the public service actor?</legend>
              {[
                ['A', 'Choose a proportionate response'],
                ['B', 'Clarify responsibilities and influence'],
                ['C', 'Follow up and learn'],
              ].map(([id, text]) => (
                <label key={id} className={`m4-enhanced-choice ${saved.finalAnswer === id ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="m4-lens-final"
                    value={id}
                    checked={saved.finalAnswer === id}
                    disabled={saved.feedbackViewed}
                    onChange={() => save({ ...saved, finalAnswer: id as 'A' | 'B' | 'C', feedbackViewed: false })}
                  />
                  <strong>{id}.</strong><span>{text}</span>
                </label>
              ))}
            </fieldset>
          )}
          {allExplored && saved.feedbackViewed && (
            <div className={selectedCorrectly ? 'm4-enhanced-feedback is-success' : 'm4-enhanced-feedback is-coaching'} role="status" aria-live="polite">
              <strong>{selectedCorrectly ? 'Exactly.' : 'Try that distinction again.'}</strong>
              <p>Awra can change its own consultation arrangements and support follow-up, while the responsible public actor remains accountable for the facility.</p>
            </div>
          )}
          {allExplored && (
            <Module4EnhancedActionBar
              secondary={saved.feedbackViewed ? (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, feedbackViewed: false })}>
                  Revise answer
                </button>
              ) : undefined}
              primary={saved.feedbackViewed && selectedCorrectly ? (
                <button type="button" className="m4-enhanced-button is-primary" onClick={() => completeScreen('M4-S1-03', onChangeState)}>
                  Continue →
                </button>
              ) : saved.feedbackViewed ? (
                <button type="button" className="m4-enhanced-button is-primary" disabled>
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  className="m4-enhanced-button is-primary"
                  disabled={!saved.finalAnswer}
                  onClick={() => save({ ...saved, feedbackViewed: true })}
                >
                  Check answer
                </button>
              )}
            />
          )}
        </>
      )}
      status={allExplored
        ? 'All six steps explored. Complete the final question to continue.'
        : 'Explore each step in order. Completed steps remain available for review.'}
    />
  );
}

function workstreamAsset(exploredCount: number, selectionMode: boolean) {
  if (selectionMode) return mapAssets['m4-s05-workstream-selected'];
  if (exploredCount >= 3) return mapAssets['m4-s05-exploration-progress'];
  if (exploredCount >= 1) return mapAssets['m4-s05-workstream-open'];
  return mapAssets['m4-s05-map-default'];
}

function WorkstreamScreen({ state, onChangeState }: Props) {
  const enhanced = currentEnhancedState(state);
  const saved = enhanced.batch1.workstreamExploration;
  const active = saved.activeWorkstream;
  const activeData = workstreamData[active];
  const allExplored = MODULE4_WORKSTREAMS.every((workstream) =>
    saved.exploredWorkstreams.includes(workstream));
  const selectedWorkstream = enhanced.fields.selectedWorkstream.value;
  const selectionMode = allExplored;
  const image = workstreamAsset(saved.exploredWorkstreams.length, selectionMode);

  const saveExploration = (
    next: Module4Batch1State['workstreamExploration'],
    fieldUpdater?: (nextEnhanced: Module4EnhancedState) => Module4EnhancedState,
  ) => updateBatch1(onChangeState, (current) => {
    const withBatch1 = {
      ...current,
      batch1: {
        ...current.batch1,
        workstreamExploration: next,
      },
    };
    return fieldUpdater ? fieldUpdater(withBatch1) : withBatch1;
  });

  const finishArea = () => {
    const preparedClassifications = Object.fromEntries(
      activeData.claims.map((claim) => [claim.id, claim.answer]),
    );
    const explored = Array.from(new Set([...saved.exploredWorkstreams, active]));
    const nextUnexplored = MODULE4_WORKSTREAMS.find((workstream) => !explored.includes(workstream));
    const next = {
      ...saved,
      exploredWorkstreams: explored,
      activeWorkstream: nextUnexplored || active,
      classifications: {
        ...saved.classifications,
        [active]: preparedClassifications,
      },
    };
    saveExploration(next, (current) => {
      const flattened = Object.fromEntries(
        Object.entries(next.classifications).flatMap(([workstream, classifications]) =>
          Object.entries(classifications || {}).map(([claimId, value]) => [
            `${workstream}.${claimId}`,
            value,
          ])),
      );
      return updateModule4Field(current, 'evidenceClassifications', flattened, {
        sourceScreenId: 'M4-S1-04',
        learnerEdited: true,
      });
    });
  };

  const chooseWorkstream = (workstream: WorkstreamId) => {
    saveExploration(
      { ...saved, activeWorkstream: workstream },
      (current) => updateModule4Field(current, 'selectedWorkstream', workstream, {
        sourceScreenId: 'M4-S1-04',
        learnerEdited: true,
      }),
    );
  };

  return (
    <Module4EnhancedScreenFrame
      titleId="m4-enhanced-workstreams-title"
      eyebrow="Module 4 · Screen 5"
      title="Jiru Amba: Two Months into Implementation"
      introduction={<p>Implementation has begun. Explore the five work areas to see what the team knows, what still needs checking, and which issue you want to follow.</p>}
      context={(
        <div className="m4-enhanced-map">
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
          <div className="m4-enhanced-map__hotspots" aria-label="Jiru Amba work areas">
            {MODULE4_WORKSTREAMS.map((workstream) => (
              <button
                key={workstream}
                type="button"
                className={[
                  active === workstream ? 'is-active' : '',
                  saved.exploredWorkstreams.includes(workstream) ? 'is-complete' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => selectionMode ? chooseWorkstream(workstream) : saveExploration({ ...saved, activeWorkstream: workstream })}
              >
                {saved.exploredWorkstreams.includes(workstream) && <span aria-hidden="true">✓ </span>}
                {workstreamData[workstream].label}
              </button>
            ))}
          </div>
        </div>
      )}
      activity={selectionMode ? (
        <>
          <div className="m4-enhanced-selection-panel">
            <h2>Choose one work area to follow</h2>
            <p>Select the issue you want to examine through the next activities and include in your Implementation Decision and Follow-Up Note.</p>
            <div className="m4-enhanced-workstream-list" role="radiogroup" aria-label="Work area to follow">
              {MODULE4_WORKSTREAMS.map((workstream) => (
                <button
                  key={workstream}
                  type="button"
                  role="radio"
                  aria-checked={selectedWorkstream === workstream}
                  className={selectedWorkstream === workstream ? 'is-selected' : ''}
                  onClick={() => chooseWorkstream(workstream)}
                >
                  <span>{workstreamData[workstream].label}</span>
                  <span aria-hidden="true">✓</span>
                </button>
              ))}
            </div>
          </div>
          {selectedWorkstream && (
            <div className="m4-enhanced-feedback is-success" role="status" aria-live="polite">
              <strong>You will continue with: {workstreamData[selectedWorkstream].label}.</strong>
              <p>You can still revisit the other work areas before continuing.</p>
            </div>
          )}
          <p className="m4-enhanced-explored-count">✓ 5 of 5 areas explored.</p>
          <Module4EnhancedActionBar
            primary={(
              <button
                type="button"
                className="m4-enhanced-button is-primary"
                disabled={!selectedWorkstream}
                onClick={() => completeScreen('M4-S1-04', onChangeState)}
              >
                Continue →
              </button>
            )}
          />
        </>
      ) : (
        <>
          <header className="m4-enhanced-workstream-header">
            <h2>{activeData.label}</h2>
            <strong>{saved.exploredWorkstreams.length} of 5 areas explored</strong>
          </header>
          <dl className="m4-enhanced-signal-list">
            <div><dt>Signal</dt><dd>{activeData.signal}</dd></div>
            <div><dt>What we know</dt><dd>{activeData.known}</dd></div>
            <div><dt>What still needs checking</dt><dd>{activeData.checking}</dd></div>
            <div><dt>Why this matters</dt><dd>{activeData.matters}</dd></div>
          </dl>
          <section className="m4-enhanced-evidence-review" aria-labelledby={`${active}-evidence-review-title`}>
            <h3 id={`${active}-evidence-review-title`}>Review the evidence distinction</h3>
            <p>Use confirmed information now and keep open questions visible for follow-up.</p>
            <div className="m4-enhanced-evidence-review__columns">
              <div>
                <strong>Confirmed evidence</strong>
                <ul>
                  {activeData.claims
                    .filter((claim) => claim.answer === 'confirmed')
                    .map((claim) => <li key={claim.id}>{claim.text}</li>)}
                </ul>
              </div>
              <div>
                <strong>Still needs checking</strong>
                <ul>
                  {activeData.claims
                    .filter((claim) => claim.answer === 'needs_checking')
                    .map((claim) => <li key={claim.id}>{claim.text}</li>)}
                </ul>
              </div>
            </div>
          </section>
          <p className="m4-enhanced-inline-note">
            Confirm this distinction to retain the full governed evidence summary for later activities.
          </p>
          <Module4EnhancedActionBar
            secondary={(
              <button
                type="button"
                className="m4-enhanced-button is-secondary"
                disabled={saved.exploredWorkstreams.length === 0}
                onClick={() => {
                  const currentIndex = MODULE4_WORKSTREAMS.indexOf(active);
                  const previous = MODULE4_WORKSTREAMS[Math.max(0, currentIndex - 1)];
                  saveExploration({ ...saved, activeWorkstream: previous });
                }}
              >
                ← Previous area
              </button>
            )}
            primary={(
              <button
                type="button"
                className="m4-enhanced-button is-primary"
                onClick={finishArea}
              >
                {saved.exploredWorkstreams.length === 4
                  ? 'Use distinction and choose a work area'
                  : 'Use distinction and review next area'} →
              </button>
            )}
          />
        </>
      )}
      status={selectionMode
        ? 'All five areas are explored. Choose one workstream to carry forward.'
        : `${saved.exploredWorkstreams.length} of 5 areas explored. Review and confirm the prepared evidence distinction for ${activeData.label}.`}
    />
  );
}

export default function Module4EnhancedBatch1(props: Props) {
  if (props.screenId === 'M4-S1-01') return <BridgeScreen {...props} />;
  if (props.screenId === 'M4-S1-02') return <PracticeJourneyScreen {...props} />;
  if (props.screenId === 'M4-S1-03') return <EverydayRightsLensScreen {...props} />;
  return <WorkstreamScreen {...props} />;
}
