import type { ReactNode } from 'react';
import type { LearningState } from '../../../state/learningState';
import {
  MODULE4_SCREEN_ROUTES,
  createInitialModule4EnhancedState,
  migrateModule4EnhancedState,
  recordModule4EnhancedScreenCompletion,
  updateModule4Field,
  type Module4Batch2State,
  type Module4CanonicalScreenId,
  type Module4EnhancedState,
  type Module4Workstream,
} from '../../../data/module4/module4EnhancedModel';
import { MODULE4_ENHANCED_ASSETS } from '../../../data/module4/module4EnhancedAssets';
import {
  Module4EnhancedActionBar,
  Module4EnhancedScreenFrame,
} from './Module4EnhancedFoundation';

type Batch2ScreenId = 'M4-S1-05' | 'M4-S1-06' | 'M4-S1-07';
type WorkstreamId = Exclude<Module4Workstream, ''>;

type Props = {
  screenId: Batch2ScreenId;
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
};

const NEXT_SCREEN: Record<Batch2ScreenId, Module4CanonicalScreenId> = {
  'M4-S1-05': 'M4-S1-06',
  'M4-S1-06': 'M4-S1-07',
  'M4-S1-07': 'M4-S1-08',
};

const assetMap = Object.fromEntries(
  MODULE4_ENHANCED_ASSETS
    .filter((item) => [6, 7, 8].includes(item.screenNumber))
    .map((item) => [item.id, item]),
);

const workstreamProfiles: Record<WorkstreamId, {
  label: string;
  decisionNoun: string;
  optionA: string;
  optionB: string;
  concern: string;
}> = {
  market: {
    label: 'Market Improvement',
    decisionNoun: 'temporary market layout',
    optionA: 'Shorter loading route, with narrower pedestrian access near several stalls.',
    optionB: 'Wider accessible route, with some vendors farther from the busiest entrance.',
    concern: 'Meeting arrangements may have limited who could access the discussion, understand the layout options and influence the decision.',
  },
  water_service: {
    label: 'Water Service',
    decisionNoun: 'temporary water-service arrangement',
    optionA: 'A shorter service window at the existing collection point.',
    optionB: 'A longer accessible service window using an additional collection point.',
    concern: 'Service-review arrangements may have limited who could explain access barriers and influence the temporary response.',
  },
  youth_livelihoods: {
    label: 'Youth Livelihoods',
    decisionNoun: 'temporary livelihood-support schedule',
    optionA: 'One central session during standard working hours.',
    optionB: 'Two shorter accessible sessions with more than one way to contribute.',
    concern: 'The current schedule and information format may have limited which young people could participate and influence follow-up support.',
  },
  health_post: {
    label: 'Health Post',
    decisionNoun: 'temporary consultation arrangement',
    optionA: 'Use the usual entrance and meeting time while the building action is pending.',
    optionB: 'Use an accessible venue and time while the responsible service actor completes the building action.',
    concern: 'The venue, access information and speaking arrangements may have limited who could participate in the health-post consultation.',
  },
  consultation_feedback: {
    label: 'Consultation & Feedback',
    decisionNoun: 'temporary feedback arrangement',
    optionA: 'Use one public meeting and a written feedback form.',
    optionB: 'Use accessible small sessions and more than one safe feedback channel.',
    concern: 'The feedback arrangements may have limited who could raise concerns, understand the options and receive a response.',
  },
};

const evidenceOptions = [
  ['criteria', 'Agreed selection or decision criteria', true],
  ['differences', 'Differences between the agreed and revised decision', true],
  ['reasons', 'Reasons recorded by the responsible actor', true],
  ['attendance', 'General attendance at the original planning meeting', false],
  ['positive', 'Positive comments about the project', false],
] as const;

const perspectiveOptions = [
  ['women', 'Women vendors or participants'],
  ['informal', 'Informal traders or service users'],
  ['rural', 'People from rural kebeles'],
  ['access', 'People with accessibility requirements'],
  ['route', 'People using the access route or service'],
] as const;

const requiredPerspectives = ['women', 'rural', 'access', 'route'];

const measureOptions = [
  ['short_sessions', 'Hold two short sessions outside peak working periods.', true],
  ['visual', 'Display both options as simple visual walk-throughs.', true],
  ['formats', 'Offer verbal, visual and short written ways to express a preference.', true],
  ['remote', 'Provide a way for people who cannot attend to comment before the deadline.', true],
  ['technical', 'Send only a long technical report by email.', false],
  ['representative', 'Ask one representative to speak for everyone.', false],
] as const;

const concernHotspots = [
  {
    id: 'space',
    label: 'Access to the space',
    notice: 'Steps, timing or location make independent access difficult for some participants.',
    effect: 'Some relevant voices may never reach the discussion.',
  },
  {
    id: 'information',
    label: 'Access to information',
    notice: 'The options use dense technical information without a simple visual or verbal explanation.',
    effect: 'People cannot influence a choice they do not understand.',
  },
  {
    id: 'voice',
    label: 'Opportunity to speak',
    notice: 'A small number of speakers dominate and the meeting closes before several participants contribute.',
    effect: 'Attendance does not show whose experience influenced the decision.',
  },
] as const;

function currentEnhancedState(state: LearningState): Module4EnhancedState {
  const migration = migrateModule4EnhancedState({
    practiceCheckState: state.practiceCheckState,
    screenProgress: state.screenProgress,
    completedModules: state.completedModules,
  });
  return migration.practiceCheckState.module4Enhanced as Module4EnhancedState
    || createInitialModule4EnhancedState(new Date().toISOString());
}

function selectedProfile(enhanced: Module4EnhancedState) {
  const selected = enhanced.fields.selectedWorkstream.value || 'market';
  return {
    id: selected as WorkstreamId,
    ...workstreamProfiles[selected as WorkstreamId],
  };
}

function updateBatch2(
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

function saveBatch2Slice<K extends keyof Module4Batch2State>(
  onChangeState: Props['onChangeState'],
  key: K,
  value: Module4Batch2State[K],
  fieldUpdater?: (enhanced: Module4EnhancedState) => Module4EnhancedState,
) {
  updateBatch2(onChangeState, (enhanced) => {
    const withBatch2 = {
      ...enhanced,
      batch2: {
        ...enhanced.batch2,
        [key]: value,
      },
    };
    return fieldUpdater ? fieldUpdater(withBatch2) : withBatch2;
  });
}

function completeScreen(screenId: Batch2ScreenId, onChangeState: Props['onChangeState']) {
  const nextScreenId = NEXT_SCREEN[screenId];
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

function toggle(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function sameSet(values: string[], expected: readonly string[]) {
  return values.length === expected.length && expected.every((item) => values.includes(item));
}

function StagePath({
  labels,
  activeStage,
  completedThrough,
  onSelect,
}: {
  labels: readonly string[];
  activeStage: number;
  completedThrough: number;
  onSelect: (stage: number) => void;
}) {
  return (
    <ol className="m4-b2-stage-path" aria-label="Activity stages">
      {labels.map((label, index) => {
        const stage = index + 1;
        const complete = stage <= completedThrough;
        const available = stage <= completedThrough + 1;
        return (
          <li key={label}>
            <button
              type="button"
              className={[
                activeStage === stage ? 'is-active' : '',
                complete ? 'is-complete' : '',
                !available ? 'is-locked' : '',
              ].filter(Boolean).join(' ')}
              disabled={!available}
              aria-current={activeStage === stage ? 'step' : undefined}
              onClick={() => onSelect(stage)}
            >
              <span aria-hidden="true">{complete ? '✓' : stage}</span>
              <small>Stage {stage}</small>
              <strong>{label}</strong>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function WorkstreamContext({
  label,
  assetId,
  heading,
  children,
}: {
  label: string;
  assetId: string;
  heading: string;
  children: ReactNode;
}) {
  const image = assetMap[assetId];
  return (
    <div className="m4-b2-context">
      <p className="m4-b2-workstream">▣ Jiru Amba workstream: <strong>{label}</strong></p>
      <h2>{heading}</h2>
      {image && <img src={image.src} alt={image.alt} />}
      <div className="m4-b2-context__detail">{children}</div>
    </div>
  );
}

function ReviewBanner({ visible }: { visible: boolean }) {
  return visible ? (
    <div className="m4-b2-review" role="alert">
      <strong>Review required.</strong>
      <span>Your selected workstream or an upstream decision changed. Reconfirm this workflow before continuing.</span>
    </div>
  ) : null;
}

function Feedback({
  state,
  success,
  corrective,
}: {
  state: 'idle' | 'correct' | 'corrective';
  success: string;
  corrective: string;
}) {
  if (state === 'idle') return null;
  return (
    <div className={`m4-enhanced-feedback ${state === 'correct' ? 'is-success' : 'is-coaching'}`} role="status" aria-live="polite">
      <strong>{state === 'correct' ? 'Strong choice.' : 'Review the evidence.'}</strong>
      <p>{state === 'correct' ? success : corrective}</p>
    </div>
  );
}

function ChoiceCards({
  legend,
  value,
  disabled,
  options,
  onChange,
}: {
  legend: string;
  value: string;
  disabled: boolean;
  options: readonly (readonly [string, string, string])[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="m4-b2-choice-cards">
      <legend>{legend}</legend>
      {options.map(([id, title, description]) => (
        <label key={id} className={value === id ? 'is-selected' : ''}>
          <input
            type="radio"
            name={legend}
            value={id}
            checked={value === id}
            disabled={disabled}
            onChange={() => onChange(id)}
          />
          <span><strong>Option {id} - {title}</strong><small>{description}</small></span>
        </label>
      ))}
    </fieldset>
  );
}

function CheckGrid({
  legend,
  values,
  disabled,
  options,
  onChange,
}: {
  legend: string;
  values: string[];
  disabled?: boolean;
  options: readonly (readonly [string, string])[];
  onChange: (values: string[]) => void;
}) {
  return (
    <fieldset className="m4-b2-check-grid">
      <legend>{legend}</legend>
      {options.map(([id, label]) => (
        <label key={id} className={values.includes(id) ? 'is-selected' : ''}>
          <input
            type="checkbox"
            checked={values.includes(id)}
            disabled={disabled}
            onChange={() => onChange(toggle(values, id))}
          />
          <span>{label}</span>
        </label>
      ))}
    </fieldset>
  );
}

function FairAccessScreen({ state, onChangeState }: Props) {
  const enhanced = currentEnhancedState(state);
  const saved = enhanced.batch2.fairAccess;
  const profile = selectedProfile(enhanced);
  const evidenceCorrect = sameSet(saved.selectedEvidence, ['criteria', 'differences', 'reasons']);
  const followUpCorrect = saved.followUpOwner === 'responsible_actor'
    && saved.followUpRole === 'facilitate'
    && sameSet(saved.followUpActions, ['explain', 'record']);
  const completedThrough = saved.followUpFeedback === 'correct'
    ? 3
    : saved.actionFeedback === 'correct'
      ? 2
      : saved.evidenceFeedback === 'correct'
        ? 1
        : 0;
  const reviewRequired = enhanced.fields.evidenceClassifications.reviewRequired
    || enhanced.fields.unresolvedQuestions.reviewRequired;
  const save = (next: Module4Batch2State['fairAccess'], fieldUpdater?: (value: Module4EnhancedState) => Module4EnhancedState) =>
    saveBatch2Slice(onChangeState, 'fairAccess', next, fieldUpdater);

  const stage = saved.activeStage;
  const assetId = stage === 1
    ? 'm4-s06-evidence'
    : stage === 2
      ? 'm4-s06-signal'
      : stage === 3
        ? 'm4-s06-follow-up'
        : 'm4-s06-community-review';

  const recordDecision = () => {
    const classifications = Object.fromEntries(
      evidenceOptions.map(([id, , correct]) => [`screen6:${profile.id}:${id}`, correct ? 'selected' : 'not_selected']),
    );
    const unresolved = [
      `Confirm why the ${profile.decisionNoun} changed.`,
      'Confirm the responsible actor and review date.',
    ];
    save(
      { ...saved, activeStage: 4, followUpFeedback: 'correct', decisionSaved: true },
      (current) => updateModule4Field(
        updateModule4Field(current, 'evidenceClassifications', classifications, {
          learnerEdited: true,
          sourceScreenId: 'M4-S1-05',
        }),
        'unresolvedQuestions',
        unresolved,
        { learnerEdited: true, sourceScreenId: 'M4-S1-05' },
      ),
    );
  };

  return (
    <Module4EnhancedScreenFrame
      className="m4-enhanced-screen--batch2"
      titleId="m4-b2-fair-access-title"
      eyebrow="Module 4 · Screen 6"
      title="Fair Access — Evidence, Action and Follow-Up"
      introduction={<p>Review the implementation signal, decide what evidence is enough, choose Awra's immediate response, and agree who will do what next.</p>}
      context={(
        <WorkstreamContext label={profile.label} assetId={assetId} heading={`The changing ${profile.decisionNoun}`}>
          <p><strong>Implementation signal:</strong> The current approach differs from what was agreed, and affected people are asking how the change was made.</p>
          <dl>
            <div><dt>Agreed approach</dt><dd>Fair access, transparent criteria and documented reasons for changes.</dd></div>
            <div><dt>Current concern</dt><dd>The revised approach has not yet been verified or clearly explained.</dd></div>
          </dl>
        </WorkstreamContext>
      )}
      activity={(
        <>
          <ReviewBanner visible={reviewRequired} />
          <StagePath
            labels={['Check evidence', 'Choose action', 'Agree follow-up']}
            activeStage={Math.min(stage, 3)}
            completedThrough={completedThrough}
            onSelect={(next) => save({ ...saved, activeStage: next as 1 | 2 | 3 })}
          />

          {stage === 1 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b2-evidence-heading">
              <p className="m4-enhanced-kicker">Stage 1</p>
              <h2 id="m4-b2-evidence-heading">Check evidence</h2>
              <CheckGrid
                legend="Select the three evidence items that are enough to review this decision."
                values={saved.selectedEvidence}
                disabled={saved.evidenceFeedback !== 'idle'}
                options={evidenceOptions.map(([id, label]) => [id, label] as const)}
                onChange={(selectedEvidence) => save({ ...saved, selectedEvidence, evidenceFeedback: 'idle', decisionSaved: false })}
              />
              <p className="m4-b2-count">{saved.selectedEvidence.length} of 3 evidence items selected</p>
              <Feedback
                state={saved.evidenceFeedback}
                success="The agreed criteria, the differences and the recorded reasons provide a sufficient starting point without collecting unnecessary personal information."
                corrective="Use evidence that tests the decision and its reasons. General attendance and positive comments do not explain whether the change followed the agreed process."
              />
              <Module4EnhancedActionBar
                secondary={saved.evidenceFeedback !== 'idle' ? (
                  <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, evidenceFeedback: 'idle' })}>Revise evidence</button>
                ) : undefined}
                primary={saved.evidenceFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 2 })}>Choose action →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={saved.selectedEvidence.length !== 3 || saved.evidenceFeedback === 'corrective'}
                    onClick={() => save({ ...saved, evidenceFeedback: evidenceCorrect ? 'correct' : 'corrective' })}
                  >
                    Check evidence
                  </button>
                )}
              />
            </section>
          )}

          {stage === 2 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b2-action-heading">
              <p className="m4-enhanced-kicker">Stage 2</p>
              <h2 id="m4-b2-action-heading">Choose action</h2>
              <ChoiceCards
                legend="Choose Awra's most proportionate immediate response."
                value={saved.selectedAction}
                disabled={saved.actionFeedback !== 'idle'}
                options={[
                  ['A', 'Continue, then review', 'Keep the timeline and announce that the decision will be reviewed later.'],
                  ['B', 'Pause final approval briefly', 'Compare the change with the agreed criteria, verify patterns of exclusion and discuss correction with the responsible actor.'],
                  ['C', 'Prepare a replacement decision', 'Ask Awra’s team to replace the responsible actor’s decision using its own judgement.'],
                ]}
                onChange={(selectedAction) => save({ ...saved, selectedAction: selectedAction as 'A' | 'B' | 'C', actionFeedback: 'idle', decisionSaved: false })}
              />
              <Feedback
                state={saved.actionFeedback}
                success="A brief pause protects fairness, uses the agreed criteria and keeps the responsible actor in its proper decision-making role."
                corrective="Awra should neither accept an unverified decision nor replace the responsible actor. Choose the proportionate review-and-correct response."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, actionFeedback: 'idle' })}>← Check evidence</button>}
                primary={saved.actionFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 3 })}>Agree follow-up →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={!saved.selectedAction || saved.actionFeedback === 'corrective'}
                    onClick={() => save({ ...saved, actionFeedback: saved.selectedAction === 'B' ? 'correct' : 'corrective' })}
                  >
                    Check action
                  </button>
                )}
              />
              {saved.actionFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, actionFeedback: 'idle' })}>Revise action</button>
              )}
            </section>
          )}

          {stage === 3 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b2-follow-heading">
              <p className="m4-enhanced-kicker">Stage 3</p>
              <h2 id="m4-b2-follow-heading">Agree follow-up</h2>
              <ChoiceCards
                legend="Who owns the final decision?"
                value={saved.followUpOwner}
                disabled={saved.followUpFeedback !== 'idle'}
                options={[
                  ['awra', 'Awra alone', 'Awra replaces the responsible actor.'],
                  ['responsible_actor', 'The responsible actor', 'The responsible committee or service actor retains its decision responsibility.'],
                  ['donor', 'The donor', 'The donor takes the operational decision.'],
                ]}
                onChange={(followUpOwner) => save({ ...saved, followUpOwner, followUpFeedback: 'idle', decisionSaved: false })}
              />
              <ChoiceCards
                legend="What is Awra's role?"
                value={saved.followUpRole}
                disabled={saved.followUpFeedback !== 'idle'}
                options={[
                  ['replace', 'Replace the decision', 'Awra produces the final decision itself.'],
                  ['facilitate', 'Facilitate review and document correction', 'Awra supports evidence review, accessible communication and follow-up.'],
                  ['delay', 'Delay all project activity', 'No action is taken until the final report.'],
                ]}
                onChange={(followUpRole) => save({ ...saved, followUpRole, followUpFeedback: 'idle', decisionSaved: false })}
              />
              <CheckGrid
                legend="What should happen next? Select two."
                values={saved.followUpActions}
                disabled={saved.followUpFeedback !== 'idle'}
                options={[
                  ['explain', 'Explain the criteria and correction process to affected groups.'],
                  ['record', 'Record the agreed action, responsible role and review date.'],
                  ['publish', 'Publish identifiable information about every applicant.'],
                  ['wait', 'Wait until the final project report.'],
                ]}
                onChange={(followUpActions) => save({ ...saved, followUpActions, followUpFeedback: 'idle', decisionSaved: false })}
              />
              <Feedback
                state={saved.followUpFeedback}
                success="Responsibility remains with the appropriate actor while Awra facilitates a fair review, documents the decision and explains the process."
                corrective="Keep the decision with the responsible actor, define Awra's facilitation role and include both documentation and account-back."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 2, followUpFeedback: 'idle' })}>← Revise action</button>}
                primary={(
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={!saved.followUpOwner || !saved.followUpRole || saved.followUpActions.length !== 2 || saved.followUpFeedback === 'corrective'}
                    onClick={() => followUpCorrect
                      ? recordDecision()
                      : save({ ...saved, followUpFeedback: 'corrective' })}
                  >
                    Save follow-up
                  </button>
                )}
              />
              {saved.followUpFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, followUpFeedback: 'idle' })}>Revise follow-up</button>
              )}
            </section>
          )}

          {stage === 4 && (
            <section className="m4-b2-summary" aria-labelledby="m4-b2-fair-summary">
              <span className="m4-b2-summary__icon" aria-hidden="true">✓</span>
              <div>
                <h2 id="m4-b2-fair-summary">Awra's implementation decision</h2>
                <p>The {profile.decisionNoun} will be reviewed against the agreed criteria before final approval. The responsible actor will confirm and correct the decision. Awra will facilitate the review, document the agreed action and explain the process to affected groups.</p>
                <p><em>Prepared for your Implementation Decision and Follow-Up Note.</em></p>
              </div>
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, decisionSaved: false })}>Revise decision</button>}
                primary={<button type="button" className="m4-enhanced-button is-primary" onClick={() => completeScreen('M4-S1-05', onChangeState)}>Continue →</button>}
              />
            </section>
          )}
        </>
      )}
      status={stage === 4 ? 'Fair-access decision saved.' : `Stage ${stage} of 3. Complete the current gate to continue.`}
    />
  );
}

function ParticipationScreen({ state, onChangeState }: Props) {
  const enhanced = currentEnhancedState(state);
  const saved = enhanced.batch2.participation;
  const profile = selectedProfile(enhanced);
  const completedThrough = saved.outcomeFeedback === 'correct'
    ? 4
    : saved.measuresFeedback === 'correct'
      ? 3
      : saved.perspectivesFeedback === 'correct'
        ? 2
        : saved.decisionFeedback === 'correct'
          ? 1
          : 0;
  const reviewRequired = enhanced.fields.participationDecisions.reviewRequired;
  const save = (next: Module4Batch2State['participation'], fieldUpdater?: (value: Module4EnhancedState) => Module4EnhancedState) =>
    saveBatch2Slice(onChangeState, 'participation', next, fieldUpdater);
  const stage = saved.activeStage;
  const goodMeasures = measureOptions.filter(([, , good]) => good).map(([id]) => id);
  const measuresCorrect = saved.measures.length >= 3
    && saved.measures.every((item) => goodMeasures.includes(item as typeof goodMeasures[number]));
  const outcomeCorrect = sameSet(saved.explanationItems, ['chosen', 'changed', 'limits', 'review'])
    && saved.explanationOwner === 'responsible_supported'
    && saved.explanationChannels.length >= 2
    && !saved.explanationChannels.includes('technical');

  const recordPathway = () => {
    const decisions = {
      workstream: profile.id,
      openDecision: profile.decisionNoun,
      perspectives: saved.perspectives.join('|'),
      measures: saved.measures.join('|'),
      explanationItems: saved.explanationItems.join('|'),
      explanationOwner: saved.explanationOwner,
      explanationChannels: saved.explanationChannels.join('|'),
    };
    save(
      { ...saved, activeStage: 5, outcomeFeedback: 'correct', pathwaySaved: true },
      (current) => updateModule4Field(current, 'participationDecisions', decisions, {
        learnerEdited: true,
        sourceScreenId: 'M4-S1-06',
      }),
    );
  };

  return (
    <Module4EnhancedScreenFrame
      className="m4-enhanced-screen--batch2"
      titleId="m4-b2-participation-title"
      eyebrow="Module 4 · Screen 7"
      title="Participation with Real Influence"
      introduction={<p>People influence implementation when a real decision remains open, relevant voices can participate, barriers are reduced, and the final decision is explained back.</p>}
      context={(
        <WorkstreamContext
          label={profile.label}
          assetId={stage === 5 ? 'm4-s07-agreement' : stage >= 3 ? 'm4-s07-actor-review' : 'm4-s07-market-overview'}
          heading={`A fair pathway for the ${profile.decisionNoun}`}
        >
          <div className="m4-b2-option-compare" aria-label="Two feasible options">
            <article><strong>Option A</strong><p>{profile.optionA}</p></article>
            <article><strong>Option B</strong><p>{profile.optionB}</p></article>
          </div>
          <p className="m4-b2-signal"><strong>What happened:</strong> People attended a general briefing after one option had already been presented as final.</p>
          <ul className="m4-b2-risk-list">
            <li>No clear open decision</li>
            <li>Limited access to influence</li>
            <li>No account-back commitment</li>
          </ul>
        </WorkstreamContext>
      )}
      activity={(
        <>
          <ReviewBanner visible={reviewRequired} />
          <StagePath
            labels={['Open the decision', 'Include relevant voices', 'Make participation workable', 'Explain the outcome']}
            activeStage={Math.min(stage, 4)}
            completedThrough={completedThrough}
            onSelect={(next) => save({ ...saved, activeStage: next as 1 | 2 | 3 | 4 })}
          />

          {stage === 1 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b2-open-heading">
              <p className="m4-enhanced-kicker">Stage 1</p>
              <h2 id="m4-b2-open-heading">Open the decision</h2>
              <ChoiceCards
                legend={`Which part of the ${profile.decisionNoun} can participants genuinely influence?`}
                value={saved.openDecision}
                disabled={saved.decisionFeedback !== 'idle'}
                options={[
                  ['A', 'Whether the project should happen at all', 'Reopen the entire approved project.'],
                  ['B', 'Compare two feasible options and propose adjustments', 'Keep the agreed limits while leaving a real implementation choice open.'],
                  ['C', 'Choose the contractor or responsible official', 'Move into a procurement or institutional decision outside this consultation.'],
                ]}
                onChange={(openDecision) => save({ ...saved, openDecision: openDecision as 'A' | 'B' | 'C', decisionFeedback: 'idle', pathwaySaved: false })}
              />
              <Feedback
                state={saved.decisionFeedback}
                success="Participants can compare feasible options and suggest practical adjustments before the responsible actor decides."
                corrective="Real influence needs a genuine but bounded decision point. Do not offer a choice the group cannot make or reopen the whole project."
              />
              <Module4EnhancedActionBar
                secondary={saved.decisionFeedback === 'corrective' ? <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, decisionFeedback: 'idle' })}>Revise decision point</button> : undefined}
                primary={saved.decisionFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 2 })}>Include relevant voices →</button>
                ) : (
                  <button type="button" className="m4-enhanced-button is-primary" disabled={!saved.openDecision || saved.decisionFeedback === 'corrective'} onClick={() => save({ ...saved, decisionFeedback: saved.openDecision === 'B' ? 'correct' : 'corrective' })}>Check decision point</button>
                )}
              />
            </section>
          )}

          {stage === 2 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b2-voices-heading">
              <p className="m4-enhanced-kicker">Stage 2</p>
              <h2 id="m4-b2-voices-heading">Include relevant voices</h2>
              <CheckGrid
                legend="Select the perspectives needed to understand how the options may affect people differently."
                values={saved.perspectives}
                disabled={saved.perspectivesFeedback !== 'idle'}
                options={perspectiveOptions}
                onChange={(perspectives) => save({ ...saved, perspectives, perspectivesFeedback: 'idle', pathwaySaved: false })}
              />
              <p className="m4-b2-count">{saved.perspectives.length} selected · Select the four perspectives tied to access and use.</p>
              <Feedback
                state={saved.perspectivesFeedback}
                success="This mix brings in people with different access, location and use experiences rather than treating one formal voice as representative of everyone."
                corrective="Include the four perspectives directly connected to access and use. Formal status alone does not establish a distinct affected perspective."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, perspectivesFeedback: 'idle' })}>← Open decision</button>}
                primary={saved.perspectivesFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 3 })}>Make participation workable →</button>
                ) : (
                  <button type="button" className="m4-enhanced-button is-primary" disabled={saved.perspectives.length !== 4 || saved.perspectivesFeedback === 'corrective'} onClick={() => save({ ...saved, perspectivesFeedback: sameSet(saved.perspectives, requiredPerspectives) ? 'correct' : 'corrective' })}>Check perspectives</button>
                )}
              />
              {saved.perspectivesFeedback === 'corrective' && <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, perspectivesFeedback: 'idle' })}>Revise perspectives</button>}
            </section>
          )}

          {stage === 3 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b2-workable-heading">
              <p className="m4-enhanced-kicker">Stage 3</p>
              <h2 id="m4-b2-workable-heading">Make participation workable</h2>
              <CheckGrid
                legend="Select at least three measures that make it realistic to understand the options and contribute before the deadline."
                values={saved.measures}
                disabled={saved.measuresFeedback !== 'idle'}
                options={measureOptions.map(([id, label]) => [id, label] as const)}
                onChange={(measures) => save({ ...saved, measures, measuresFeedback: 'idle', pathwaySaved: false })}
              />
              <Feedback
                state={saved.measuresFeedback}
                success="The measures reduce timing, information and attendance barriers while preserving a workable decision deadline."
                corrective="Choose practical access measures. A technical report alone or one person speaking for everyone does not make influence workable."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 2, measuresFeedback: 'idle' })}>← Relevant voices</button>}
                primary={saved.measuresFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 4 })}>Explain the outcome →</button>
                ) : (
                  <button type="button" className="m4-enhanced-button is-primary" disabled={saved.measures.length < 3 || saved.measuresFeedback === 'corrective'} onClick={() => save({ ...saved, measuresFeedback: measuresCorrect ? 'correct' : 'corrective' })}>Check measures</button>
                )}
              />
              {saved.measuresFeedback === 'corrective' && <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, measuresFeedback: 'idle' })}>Revise measures</button>}
            </section>
          )}

          {stage === 4 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b2-outcome-heading">
              <p className="m4-enhanced-kicker">Stage 4</p>
              <h2 id="m4-b2-outcome-heading">Explain the outcome</h2>
              <div className="m4-b2-three-task">
                <CheckGrid
                  legend="What should be explained?"
                  values={saved.explanationItems}
                  disabled={saved.outcomeFeedback !== 'idle'}
                  options={[
                    ['chosen', 'Which option was chosen'],
                    ['changed', 'What participant input changed'],
                    ['limits', 'What could not change and why'],
                    ['review', 'When the arrangement will be reviewed'],
                  ]}
                  onChange={(explanationItems) => save({ ...saved, explanationItems, outcomeFeedback: 'idle', pathwaySaved: false })}
                />
                <ChoiceCards
                  legend="Who should explain it?"
                  value={saved.explanationOwner}
                  disabled={saved.outcomeFeedback !== 'idle'}
                  options={[
                    ['awra', 'Awra alone', 'Awra presents the final institutional decision.'],
                    ['responsible_supported', 'The responsible actor, supported by Awra', 'The decision owner explains it with accessible support.'],
                    ['representative', 'One participant', 'One participant speaks for all affected groups.'],
                  ]}
                  onChange={(explanationOwner) => save({ ...saved, explanationOwner, outcomeFeedback: 'idle', pathwaySaved: false })}
                />
                <CheckGrid
                  legend="How should it be shared? Select at least two."
                  values={saved.explanationChannels}
                  disabled={saved.outcomeFeedback !== 'idle'}
                  options={[
                    ['briefing', 'Short briefing outside peak hours'],
                    ['visual', 'Visual notice at accessible locations'],
                    ['audio', 'Audio message through an established local channel'],
                    ['technical', 'Technical report available only at an office'],
                  ]}
                  onChange={(explanationChannels) => save({ ...saved, explanationChannels, outcomeFeedback: 'idle', pathwaySaved: false })}
                />
              </div>
              <Feedback
                state={saved.outcomeFeedback}
                success="The pathway explains the decision, the influence participants had, its limits and the next review through accessible channels."
                corrective="Account-back needs complete content, the correct decision owner and accessible channels. An office-only technical report is not enough."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 3, outcomeFeedback: 'idle' })}>← Workable measures</button>}
                primary={(
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={saved.explanationItems.length !== 4 || !saved.explanationOwner || saved.explanationChannels.length < 2 || saved.outcomeFeedback === 'corrective'}
                    onClick={() => outcomeCorrect ? recordPathway() : save({ ...saved, outcomeFeedback: 'corrective' })}
                  >
                    Build participation pathway
                  </button>
                )}
              />
              {saved.outcomeFeedback === 'corrective' && <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, outcomeFeedback: 'idle' })}>Revise outcome plan</button>}
            </section>
          )}

          {stage === 5 && (
            <section className="m4-b2-summary" aria-labelledby="m4-b2-participation-summary">
              <span className="m4-b2-summary__icon" aria-hidden="true">✓</span>
              <div>
                <h2 id="m4-b2-participation-summary">Participation pathway</h2>
                <p>Before approving the {profile.decisionNoun}, the responsible actor will invite relevant participants to compare feasible options and propose adjustments. Awra will support accessible sessions, clear formats and more than one way to comment. The responsible actor will explain what changed, what could not change and when the arrangement will be reviewed.</p>
                <p><em>Prepared for your Implementation Decision and Follow-Up Note.</em></p>
              </div>
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, pathwaySaved: false })}>Revise pathway</button>}
                primary={<button type="button" className="m4-enhanced-button is-primary" onClick={() => completeScreen('M4-S1-06', onChangeState)}>Continue →</button>}
              />
            </section>
          )}
        </>
      )}
      status={stage === 5 ? 'Meaningful participation pathway established.' : `Stage ${stage} of 4. Complete the current gate to continue.`}
    />
  );
}

function FeedbackLoopScreen({ state, onChangeState }: Props) {
  const enhanced = currentEnhancedState(state);
  const saved = enhanced.batch2.feedbackLoop;
  const profile = selectedProfile(enhanced);
  const reviewRequired = enhanced.fields.feedbackAccountBackActions.reviewRequired
    || enhanced.fields.actorResponsibilities.reviewRequired;
  const save = (next: Module4Batch2State['feedbackLoop'], fieldUpdater?: (value: Module4EnhancedState) => Module4EnhancedState) =>
    saveBatch2Slice(onChangeState, 'feedbackLoop', next, fieldUpdater);
  const stage = saved.activeStage;
  const completedThrough = saved.followUpFeedback === 'correct'
    ? 5
    : saved.accountBackFeedback === 'correct'
      ? 4
      : saved.responseFeedback === 'correct'
        ? 3
        : saved.recordFeedback === 'correct'
          ? 2
          : saved.concernFeedback === 'correct'
            ? 1
            : 0;
  const concernCorrect = sameSet(saved.concernParts, ['space', 'information', 'voice']);
  const recordCorrect = sameSet(saved.recordNeeds, ['owner', 'action', 'date', 'account_back']);
  const responseCorrect = saved.responseOwner === 'responsible_supported' && saved.responseAction === 'B';
  const accountBackCorrect = sameSet(saved.accountBackItems, ['heard', 'change', 'responsible', 'limits', 'update']);
  const followUpCorrect = sameSet(saved.followUpPriorities, ['participation', 'deadline'])
    && saved.followUpTiming === 'next_review';

  const recordPathway = () => {
    const feedbackActions = {
      workstream: profile.id,
      concern: profile.concern,
      response: 'Immediate accessible adjustment and review',
      accountBack: saved.accountBackItems.join('|'),
      followUp: saved.followUpPriorities.join('|'),
      timing: saved.followUpTiming,
    };
    const responsibilities = {
      responsibleActor: 'Responsible committee or service actor',
      awraRole: 'Facilitate accessible review, communication and follow-up',
    };
    save(
      { ...saved, activeStage: 6, followUpFeedback: 'correct', pathwaySaved: true },
      (current) => updateModule4Field(
        updateModule4Field(current, 'feedbackAccountBackActions', feedbackActions, {
          learnerEdited: true,
          sourceScreenId: 'M4-S1-07',
        }),
        'actorResponsibilities',
        responsibilities,
        { learnerEdited: true, sourceScreenId: 'M4-S1-07' },
      ),
    );
  };

  const assetId = stage <= 2
    ? 'm4-s08-concern-hotspots'
    : stage === 3
      ? 'm4-s08-responsibility'
      : stage <= 5
        ? 'm4-s08-response'
        : 'm4-s08-account-back-loop';

  return (
    <Module4EnhancedScreenFrame
      className="m4-enhanced-screen--batch2"
      titleId="m4-b2-feedback-title"
      eyebrow="Module 4 · Screen 8"
      title="Accountable Concern, Response and Follow-Up"
      introduction={<p>A feedback channel becomes accountable only when a concern is reviewed, assigned, responded to, explained back and followed up.</p>}
      context={(
        <WorkstreamContext label={profile.label} assetId={assetId} heading="Follow one concern to a completed response">
          <p><strong>Concern:</strong> {profile.concern}</p>
          {stage === 1 && (
            <div className="m4-b2-hotspot-alternative" aria-label="Meeting concern hotspots">
              {concernHotspots.map((hotspot, index) => (
                <button
                  key={hotspot.id}
                  type="button"
                  className={saved.exploredHotspots.includes(hotspot.id) ? 'is-explored' : ''}
                  aria-pressed={saved.exploredHotspots.includes(hotspot.id)}
                  onClick={() => save({
                    ...saved,
                    exploredHotspots: Array.from(new Set([...saved.exploredHotspots, hotspot.id])),
                    concernFeedback: 'idle',
                    pathwaySaved: false,
                  })}
                >
                  <span>{index + 1}</span>
                  <strong>{hotspot.label}</strong>
                </button>
              ))}
            </div>
          )}
        </WorkstreamContext>
      )}
      activity={(
        <>
          <ReviewBanner visible={reviewRequired} />
          <StagePath
            labels={['Hear the concern', 'Complete the record', 'Assign and respond', 'Explain back', 'Follow up']}
            activeStage={Math.min(stage, 5)}
            completedThrough={completedThrough}
            onSelect={(next) => save({ ...saved, activeStage: next as 1 | 2 | 3 | 4 | 5 })}
          />

          {stage === 1 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b2-hear-heading">
              <p className="m4-enhanced-kicker">Stage 1</p>
              <h2 id="m4-b2-hear-heading">Hear the concern</h2>
              <p>Explore the three meeting signals. The numbered HTML controls provide the same information as the image hotspots.</p>
              <div className="m4-b2-hotspot-details">
                {concernHotspots
                  .filter((item) => saved.exploredHotspots.includes(item.id))
                  .map((item) => (
                    <article key={item.id}>
                      <h3>{item.label}</h3>
                      <p><strong>What the learner notices:</strong> {item.notice}</p>
                      <p><strong>What it may affect:</strong> {item.effect}</p>
                    </article>
                  ))}
              </div>
              <p className="m4-b2-count">{saved.exploredHotspots.length} of 3 meeting signals explored</p>
              {saved.exploredHotspots.length === 3 && (
                <CheckGrid
                  legend="What parts of this concern require a response?"
                  values={saved.concernParts}
                  disabled={saved.concernFeedback !== 'idle'}
                  options={[
                    ['space', 'Meeting time and physical access'],
                    ['information', 'How the options were explained'],
                    ['voice', 'Opportunity for different people to contribute'],
                    ['colour', 'The colour used on the attendance sheet'],
                    ['chairs', 'The number of chairs owned by Awra'],
                  ]}
                  onChange={(concernParts) => save({ ...saved, concernParts, concernFeedback: 'idle', pathwaySaved: false })}
                />
              )}
              <Feedback
                state={saved.concernFeedback}
                success="The selected issues identify specific participation barriers without assuming that every participant had the same experience."
                corrective="Focus on access, understandable information and opportunity to contribute. Incidental administrative details do not define this concern."
              />
              <Module4EnhancedActionBar
                secondary={saved.concernFeedback === 'corrective' ? <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, concernFeedback: 'idle' })}>Revise concern</button> : undefined}
                primary={saved.concernFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 2 })}>Continue to the feedback record →</button>
                ) : (
                  <button type="button" className="m4-enhanced-button is-primary" disabled={saved.exploredHotspots.length !== 3 || saved.concernParts.length !== 3 || saved.concernFeedback === 'corrective'} onClick={() => save({ ...saved, concernFeedback: concernCorrect ? 'correct' : 'corrective' })}>Build concern summary</button>
                )}
              />
            </section>
          )}

          {stage === 2 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b2-record-heading">
              <p className="m4-enhanced-kicker">Stage 2</p>
              <h2 id="m4-b2-record-heading">Complete the record</h2>
              <div className="m4-b2-record">
                <dl>
                  <div><dt>Date received</dt><dd>12 October</dd></div>
                  <div><dt>Concern</dt><dd>Access, understanding and influence may have been limited.</dd></div>
                  <div><dt>Source</dt><dd>Participants in the selected workstream review</dd></div>
                </dl>
                <CheckGrid
                  legend="What is missing before this becomes an accountable response process?"
                  values={saved.recordNeeds}
                  disabled={saved.recordFeedback !== 'idle'}
                  options={[
                    ['owner', 'A responsible owner'],
                    ['action', 'A decision or next action'],
                    ['date', 'A date for an update'],
                    ['account_back', 'A way to explain back'],
                    ['box', 'A larger feedback box'],
                    ['attendance', 'Another attendance total'],
                  ]}
                  onChange={(recordNeeds) => save({ ...saved, recordNeeds, recordFeedback: 'idle', pathwaySaved: false })}
                />
              </div>
              <Feedback
                state={saved.recordFeedback}
                success="The record now identifies the ownership, response, update and account-back commitments needed for follow-through."
                corrective="A record needs an owner, an action, an update date and a way to explain back. More collection does not replace those commitments."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, recordFeedback: 'idle' })}>← Hear concern</button>}
                primary={saved.recordFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 3 })}>Assign and respond →</button>
                ) : (
                  <button type="button" className="m4-enhanced-button is-primary" disabled={saved.recordNeeds.length !== 4 || saved.recordFeedback === 'corrective'} onClick={() => save({ ...saved, recordFeedback: recordCorrect ? 'correct' : 'corrective' })}>Check record</button>
                )}
              />
              {saved.recordFeedback === 'corrective' && <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, recordFeedback: 'idle' })}>Revise record</button>}
            </section>
          )}

          {stage === 3 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b2-respond-heading">
              <p className="m4-enhanced-kicker">Stage 3</p>
              <h2 id="m4-b2-respond-heading">Assign and respond</h2>
              <ChoiceCards
                legend="Who should own the response?"
                value={saved.responseOwner}
                disabled={saved.responseFeedback !== 'idle'}
                options={[
                  ['awra', 'Awra alone', 'Awra takes over the final operational decision.'],
                  ['responsible_supported', 'The responsible actor, supported by Awra', 'The actor retains responsibility while Awra supports accessible review and follow-up.'],
                  ['donor', 'The donor', 'The donor manages the local implementation response.'],
                ]}
                onChange={(responseOwner) => save({ ...saved, responseOwner, responseFeedback: 'idle', pathwaySaved: false })}
              />
              <ChoiceCards
                legend="Choose the most proportionate response."
                value={saved.responseAction}
                disabled={saved.responseFeedback !== 'idle'}
                options={[
                  ['A', 'Record and wait', 'Keep the concern in the log until a later reporting meeting.'],
                  ['B', 'Make an immediate adjustment and review', 'Address immediate barriers, provide a simple walk-through and reopen comments before the decision is confirmed.'],
                  ['C', 'Repeat the meeting in the same format', 'Invite more people while keeping the same participation barriers.'],
                ]}
                onChange={(responseAction) => save({ ...saved, responseAction: responseAction as 'A' | 'B' | 'C', responseFeedback: 'idle', pathwaySaved: false })}
              />
              <Feedback
                state={saved.responseFeedback}
                success="The immediate barriers are addressed while the responsible actor remains accountable for the final implementation decision."
                corrective="Assign the response to the responsible actor with Awra support, and choose an immediate proportionate correction rather than waiting or repeating the same barriers."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 2, responseFeedback: 'idle' })}>← Complete record</button>}
                primary={saved.responseFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 4 })}>Prepare account-back →</button>
                ) : (
                  <button type="button" className="m4-enhanced-button is-primary" disabled={!saved.responseOwner || !saved.responseAction || saved.responseFeedback === 'corrective'} onClick={() => save({ ...saved, responseFeedback: responseCorrect ? 'correct' : 'corrective' })}>Check response</button>
                )}
              />
              {saved.responseFeedback === 'corrective' && <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, responseFeedback: 'idle' })}>Revise response</button>}
            </section>
          )}

          {stage === 4 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b2-account-heading">
              <p className="m4-enhanced-kicker">Stage 4</p>
              <h2 id="m4-b2-account-heading">Explain back</h2>
              <CheckGrid
                legend="What should the account-back message include?"
                values={saved.accountBackItems}
                disabled={saved.accountBackFeedback !== 'idle'}
                options={[
                  ['heard', 'What the team heard'],
                  ['change', 'What will change'],
                  ['responsible', 'Who is responsible'],
                  ['limits', 'What could not change and why'],
                  ['update', 'When the next update will be provided'],
                  ['success', 'A general statement that the project is successful'],
                ]}
                onChange={(accountBackItems) => save({ ...saved, accountBackItems, accountBackFeedback: 'idle', pathwaySaved: false })}
              />
              {accountBackCorrect && (
                <article className="m4-b2-message">
                  <h3>Account-back message</h3>
                  <p>We heard that access arrangements and explanation of the options limited some people's participation. The next review will use accessible timing, a simple visual walk-through and reopened comments. The responsible actor will review the decision with Awra's support and provide an update through the agreed channels.</p>
                </article>
              )}
              <Feedback
                state={saved.accountBackFeedback}
                success="The message explains what was heard, the response, ownership, limits and the next update."
                corrective="Account-back is more than a success statement. Include the concern, response, responsible actor, limits and update commitment."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 3, accountBackFeedback: 'idle' })}>← Assign response</button>}
                primary={saved.accountBackFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 5 })}>Plan follow-up →</button>
                ) : (
                  <button type="button" className="m4-enhanced-button is-primary" disabled={saved.accountBackItems.length !== 5 || saved.accountBackFeedback === 'corrective'} onClick={() => save({ ...saved, accountBackFeedback: accountBackCorrect ? 'correct' : 'corrective' })}>Check account-back</button>
                )}
              />
              {saved.accountBackFeedback === 'corrective' && <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, accountBackFeedback: 'idle' })}>Revise account-back</button>}
            </section>
          )}

          {stage === 5 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b2-followup-heading">
              <p className="m4-enhanced-kicker">Stage 5</p>
              <h2 id="m4-b2-followup-heading">Follow up</h2>
              <CheckGrid
                legend="What should the team check after the next review? Select two priorities."
                values={saved.followUpPriorities}
                disabled={saved.followUpFeedback !== 'idle'}
                options={[
                  ['participation', 'Whether the revised arrangements enabled more people to contribute'],
                  ['deadline', 'Whether the responsible actor responded by the agreed date'],
                  ['understood', 'Whether participants understood how their input affected the decision'],
                  ['attendance', 'Whether attendance was higher than every previous meeting'],
                  ['language', 'Whether the report used stronger positive language'],
                ]}
                onChange={(followUpPriorities) => save({ ...saved, followUpPriorities, followUpFeedback: 'idle', pathwaySaved: false })}
              />
              <ChoiceCards
                legend="When should the team review this?"
                value={saved.followUpTiming}
                disabled={saved.followUpFeedback !== 'idle'}
                options={[
                  ['next_review', 'After the next workstream-review meeting', 'Check the response at the agreed near-term review point.'],
                  ['project_end', 'At the end of the entire project', 'Delay review until completion.'],
                  ['another_concern', 'Only if another concern is received', 'Wait for a repeated concern.'],
                ]}
                onChange={(followUpTiming) => save({ ...saved, followUpTiming, followUpFeedback: 'idle', pathwaySaved: false })}
              />
              <Feedback
                state={saved.followUpFeedback}
                success="The team will check both participation effects and the accountable response at the agreed next review."
                corrective="Follow-up should test participation and the responsible actor's timely response at the next review, not wait until project end."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 4, followUpFeedback: 'idle' })}>← Explain back</button>}
                primary={(
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={saved.followUpPriorities.length !== 2 || !saved.followUpTiming || saved.followUpFeedback === 'corrective'}
                    onClick={() => followUpCorrect ? recordPathway() : save({ ...saved, followUpFeedback: 'corrective' })}
                  >
                    Complete the response pathway
                  </button>
                )}
              />
              {saved.followUpFeedback === 'corrective' && <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, followUpFeedback: 'idle' })}>Revise follow-up</button>}
            </section>
          )}

          {stage === 6 && (
            <section className="m4-b2-summary" aria-labelledby="m4-b2-feedback-summary">
              <span className="m4-b2-summary__icon" aria-hidden="true">✓</span>
              <div>
                <h2 id="m4-b2-feedback-summary">Feedback and response pathway</h2>
                <dl className="m4-b2-pathway-summary">
                  <div><dt>Concern</dt><dd>{profile.concern}</dd></div>
                  <div><dt>Responsible actor</dt><dd>The responsible committee or service actor, supported by Awra.</dd></div>
                  <div><dt>Response</dt><dd>Address immediate access barriers, use a simple explanation and reopen comments before confirmation.</dd></div>
                  <div><dt>Account-back</dt><dd>Explain what was heard, what changed, who owns the response and when the next update will be provided.</dd></div>
                  <div><dt>Follow-up</dt><dd>Review participation and the responsible actor's response after the next review meeting.</dd></div>
                </dl>
                <p><em>Prepared for your Implementation Decision and Follow-Up Note.</em></p>
              </div>
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, pathwaySaved: false })}>Revise pathway</button>}
                primary={<button type="button" className="m4-enhanced-button is-primary" onClick={() => completeScreen('M4-S1-07', onChangeState)}>Continue →</button>}
              />
            </section>
          )}
        </>
      )}
      status={stage === 6 ? 'Feedback and response pathway completed.' : `Stage ${stage} of 5. Complete the current gate to continue.`}
    />
  );
}

export default function Module4EnhancedBatch2(props: Props) {
  if (props.screenId === 'M4-S1-05') return <FairAccessScreen {...props} />;
  if (props.screenId === 'M4-S1-06') return <ParticipationScreen {...props} />;
  return <FeedbackLoopScreen {...props} />;
}
