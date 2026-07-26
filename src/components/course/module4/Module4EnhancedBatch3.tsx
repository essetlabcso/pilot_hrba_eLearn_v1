import type { ReactNode } from 'react';
import type { LearningState } from '../../../state/learningState';
import {
  MODULE4_SCREEN_ROUTES,
  createInitialModule4EnhancedState,
  migrateModule4EnhancedState,
  recordModule4EnhancedScreenCompletion,
  updateModule4Field,
  type Module4Batch3State,
  type Module4CanonicalScreenId,
  type Module4EnhancedState,
} from '../../../data/module4/module4EnhancedModel';
import {
  canCompleteBatch3Screen,
  isScreen10ConditionalSupportCorrect,
  isScreen10DiagnosisCorrect,
  isScreen11DecisionPracticeCorrect,
  isScreen11MatchCorrect,
  isScreen12MinimumInformationCorrect,
  isScreen12NoteCorrect,
  isScreen9FollowUpComplete,
  isScreen9RoleMappingCorrect,
} from '../../../data/module4/module4EnhancedBatch3Rules';
import { MODULE4_ENHANCED_ASSETS } from '../../../data/module4/module4EnhancedAssets';
import {
  Module4EnhancedActionBar,
  Module4EnhancedScreenFrame,
} from './Module4EnhancedFoundation';

type Batch3ScreenId = 'M4-S1-08' | 'M4-S1-09' | 'M4-S1-10' | 'M4-S1-11';

type Props = {
  screenId: Batch3ScreenId;
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
};

const NEXT_SCREEN: Record<Batch3ScreenId, Module4CanonicalScreenId> = {
  'M4-S1-08': 'M4-S1-09',
  'M4-S1-09': 'M4-S1-10',
  'M4-S1-10': 'M4-S1-11',
  'M4-S1-11': 'M4-S1-12',
};

const assetMap = Object.fromEntries(
  MODULE4_ENHANCED_ASSETS
    .filter((item) => [9, 10, 11, 12].includes(item.screenNumber))
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

function updateBatch3(
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

function saveBatch3Slice<K extends keyof Module4Batch3State>(
  onChangeState: Props['onChangeState'],
  key: K,
  value: Module4Batch3State[K],
  fieldUpdater?: (enhanced: Module4EnhancedState) => Module4EnhancedState,
) {
  updateBatch3(onChangeState, (enhanced) => {
    const withBatch3 = {
      ...enhanced,
      batch3: {
        ...enhanced.batch3,
        [key]: value,
      },
    };
    return fieldUpdater ? fieldUpdater(withBatch3) : withBatch3;
  });
}

function completeScreen(
  screenId: Batch3ScreenId,
  onChangeState: Props['onChangeState'],
  finalGateSatisfied: boolean,
) {
  if (!finalGateSatisfied) return;
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
      finalGateSatisfied,
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

// Reusable Components
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
  options: readonly (readonly [string, string, string, string?, string?, string?])[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="m4-b2-choice-cards">
      <legend>{legend}</legend>
      {options.map(([id, title, description, consequence, tagText, tagType]) => (
        <label key={id} className={value === id ? 'is-selected' : ''}>
          <input
            type="radio"
            name={legend}
            value={id}
            checked={value === id}
            disabled={disabled}
            onChange={() => onChange(id)}
          />
          <span className="m4-choice-card-content">
            <strong className="m4-choice-card-title">Option {id} — {title}</strong>
            {tagText && (
              <span className={`m4-choice-card-tag m4-tag--${tagType || 'default'}`}>
                {tagText}
              </span>
            )}
            <small className="m4-choice-card-desc">{description}</small>
            {consequence && (
              <small className="m4-choice-card-consequence">
                <strong>Consequence:</strong> {consequence}
              </small>
            )}
          </span>
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

// SCREEN 9: Roles, Responsibilities and Constructive Engagement
const roleActions = [
  { id: 'info_share', label: 'Share verified information with affected communities and explain when the next update will be provided.', role: 'coordinate' },
  { id: 'interim_agree', label: 'Help the community and Water Desk agree on a practical interim access arrangement while repair is organised.', role: 'coordinate' },
  { id: 'tech_inspect', label: 'Inspect the pump, authorise the repair, assign the technical response and confirm the repair timeline.', role: 'duty_bearer' },
  { id: 'replace_desk', label: 'Hire and manage contractors as the permanent replacement for the Water Desk\'s maintenance function.', role: 'avoid' },
  { id: 'doc_request', label: 'Document the service interruption, request an agreed response and follow up against a clear date.', role: 'cso_directly' },
] as const;

const roleOptions = [
  ['cso_directly', 'Awra can act directly'],
  ['coordinate', 'Awra can support or coordinate'],
  ['duty_bearer', 'Water Desk must own the action'],
  ['avoid', 'Do not promise or take over'],
] as const;

function RolesScreen({ state, onChangeState }: Props) {
  const enhanced = currentEnhancedState(state);
  const saved = enhanced.batch3.roles;
  const reviewRequired = enhanced.fields.actorResponsibilities.reviewRequired
    || enhanced.fields.engagementDecisions.reviewRequired;
  const readyToContinue = canCompleteBatch3Screen(saved.planSaved, reviewRequired);
  const stage = saved.activeStage;
  const save = (next: Module4Batch3State['roles'], fieldUpdater?: (value: Module4EnhancedState) => Module4EnhancedState) =>
    saveBatch3Slice(onChangeState, 'roles', next, fieldUpdater);

  const assignmentsCorrect = isScreen9RoleMappingCorrect(saved.assignments);
  const responseCorrect = saved.selectedResponse === 'C';
  const positionCorrect = saved.selectedPosition === 'B';
  const followUpCorrect = isScreen9FollowUpComplete(saved);

  const confirmCorrect = sameSet(saved.confirmItems, ['inspection', 'role', 'measure', 'date'])
    && sameSet(saved.explainItems, ['confirmed', 'doing', 'responsible', 'update_date'])
    && saved.reviewTiming === 'after_update';

  const completedThrough = saved.confirmFeedback === 'correct'
    ? 5
    : saved.followUpFeedback === 'correct'
      ? 4
      : saved.formalFeedback === 'correct'
        ? 3
        : saved.responseFeedback === 'correct'
          ? 2
          : saved.assignmentsFeedback === 'correct'
            ? 1
            : 0;

  const recordPlan = () => {
    const responsibilities = {
      responsibleActor: 'Woreda Water Desk',
      awraRole: 'Coordinate communication, document issues and support interim community access',
    };
    const decisions = {
      position: 'Constructive rights-based engagement',
      formalTriggers: saved.formalTriggers.join('|'),
      followUpWho: saved.followUpWho,
      followUpWhen: saved.followUpWhen,
      followUpPurpose: saved.followUpPurpose,
      followUpDocumented: saved.followUpDocumented,
      followUpInformed: saved.followUpInformed,
      confirmItems: saved.confirmItems.join('|'),
      explainItems: saved.explainItems.join('|'),
      reviewTiming: saved.reviewTiming,
    };
    save(
      { ...saved, activeStage: 6, confirmFeedback: 'correct', planSaved: true },
      (current) => updateModule4Field(
        updateModule4Field(current, 'actorResponsibilities', responsibilities, {
          learnerEdited: true,
          sourceScreenId: 'M4-S1-08',
        }),
        'engagementDecisions',
        decisions,
        { learnerEdited: true, sourceScreenId: 'M4-S1-08' },
      ),
    );
  };

  const assetId = stage === 6
    ? 'm4-s09-water-point-gap'
    : stage >= 3
      ? 'm4-s09-community-dialogue'
      : 'm4-s09-water-service-actors';

  return (
    <Module4EnhancedScreenFrame
      className="m4-enhanced-screen--batch3"
      titleId="m4-b3-roles-title"
      eyebrow="Module 4 · Screen 9"
      title="Roles, Boundaries and Responsible Action"
      introduction={<p>Determine what Awra can do directly, what it should coordinate, what the duty-bearer must own, and what to avoid to protect public accountability.</p>}
      context={(
        <WorkstreamContext label="Water Service" assetId={assetId} heading="The broken water pump">
          <p><strong>Scenario:</strong> A community water point has been broken for two weeks. Community representatives ask Awra to finance and manage the full repair immediately because they have received no response from the Woreda Water Desk.</p>
          <dl>
            <div><dt>Woreda Water Desk</dt><dd>Holds public duty to maintain water infrastructure and manage technical repairs.</dd></div>
            <div><dt>Community expectation</dt><dd>Awra should act as a replacement duty-bearer to provide immediate relief.</dd></div>
          </dl>
        </WorkstreamContext>
      )}
      activity={(
        <>
          <ReviewBanner visible={reviewRequired} />
          <StagePath
            labels={['Map responsibility', 'Choose a response', 'Frame the engagement', 'Commit to follow-up', 'Confirm & explain']}
            activeStage={Math.min(stage, 5)}
            completedThrough={completedThrough}
            onSelect={(next) => save({ ...saved, activeStage: next as 1 | 2 | 3 | 4 | 5 })}
          />

          {stage === 1 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-map-heading">
              <p className="m4-enhanced-kicker">Stage 1</p>
              <h2 id="m4-b3-map-heading">Map responsibility</h2>
              <p className="m4-b2-intro-text">Assign each action to the role that should own or support it.</p>
              <div className="m4-b2-record-fields">
                {roleActions.map((action) => (
                  <label key={action.id} className="m4-b3-select-label">
                    <span>{action.label}</span>
                    <select
                      value={saved.assignments[action.id] || ''}
                      disabled={saved.assignmentsFeedback === 'correct'}
                      onChange={(e) => save({
                        ...saved,
                        assignments: { ...saved.assignments, [action.id]: e.target.value },
                        assignmentsFeedback: 'idle',
                        planSaved: false,
                      })}
                    >
                      <option value="">Choose a role</option>
                      {roleOptions.map(([val, text]) => (
                        <option key={val} value={val}>{text}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
              <Feedback
                state={saved.assignmentsFeedback}
                success="The roles are mapped correctly. Awra supports communication and follow-up, while the Water Desk owns the technical response."
                corrective="Ensure that the Water Desk owns technical maintenance, Awra acts directly on documentation, Awra supports coordination/information, and Awra avoids permanent replacement of public duties."
              />
              <Module4EnhancedActionBar
                primary={saved.assignmentsFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 2 })}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={roleActions.some((action) => !saved.assignments[action.id]) || saved.assignmentsFeedback === 'corrective'}
                    onClick={() => save({ ...saved, assignmentsFeedback: assignmentsCorrect ? 'correct' : 'corrective' })}
                  >
                    Check roles
                  </button>
                )}
              />
              {saved.assignmentsFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, assignmentsFeedback: 'idle' })}>Revise roles</button>
              )}
            </section>
          )}

          {stage === 2 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-response-heading">
              <p className="m4-enhanced-kicker">Stage 2</p>
              <h2 id="m4-b3-response-heading">Choose a response</h2>
              <p className="m4-b2-intro-text">Compare the likely consequences and choose the most proportionate response package.</p>
              <ChoiceCards
                legend="Select the response package"
                value={saved.selectedResponse}
                disabled={saved.responseFeedback === 'correct'}
                options={[
                  [
                    'A',
                    'Take over the repair',
                    'Awra hires a contractor immediately, manages the repair and begins handling future maintenance requests.',
                    'Water access may improve quickly, but Awra assumes a public-service function it may not be able to sustain.',
                    'Immediate relief, but unsustainable substitution',
                    'info',
                  ],
                  [
                    'B',
                    'Refer and wait',
                    'Awra tells the community that the Water Desk is responsible and sends the concern to the office without arranging further dialogue or follow-up.',
                    'The formal boundary is correct, but the approach does little to unblock action or keep the community informed.',
                    'Correct boundary, but too passive',
                    'warning',
                  ],
                  [
                    'C',
                    'Coordinate and follow up',
                    'Awra documents the service problem, supports an interim community arrangement, requests the Water Desk to inspect and confirm a repair action and date, and provides updates to the community.',
                    'Awra acts within its role, helps reduce the immediate access problem and keeps technical responsibility with the Water Desk.',
                    'Active and accountable response',
                    'success',
                  ],
                ]}
                onChange={(selectedResponse) => save({ ...saved, selectedResponse: selectedResponse as '' | 'A' | 'B' | 'C', responseFeedback: 'idle', planSaved: false })}
              />
              <Feedback
                state={saved.responseFeedback}
                success="Strong choice. Coordinate and follow up keeps the Woreda Water Desk responsible while actively supporting community access and communication."
                corrective="Awra should neither assume public-service responsibility nor act too passively. Choose the coordinate and follow up response."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, responseFeedback: 'idle' })}>← Back</button>}
                primary={saved.responseFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 3 })}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={!saved.selectedResponse || saved.responseFeedback === 'corrective'}
                    onClick={() => save({ ...saved, responseFeedback: responseCorrect ? 'correct' : 'corrective' })}
                  >
                    Check response
                  </button>
                )}
              />
              {saved.responseFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, responseFeedback: 'idle' })}>Revise response</button>
              )}
            </section>
          )}

          {stage === 3 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-engage-heading">
              <p className="m4-enhanced-kicker">Stage 3</p>
              <h2 id="m4-b3-engage-heading">Frame the engagement</h2>
              <div className="m4-b3-two-column">
                <div className="m4-b3-col-left">
                  <ChoiceCards
                    legend="Choose how Awra should first approach the Water Desk"
                    value={saved.selectedPosition}
                    disabled={saved.formalFeedback === 'correct'}
                    options={[
                      ['A', 'Urgent pleading', '"Please help us because the community is suffering and Awra cannot solve this alone." (Pleading without clear responsibility)'],
                      ['B', 'Constructive rights-based engagement', '"The community has reported that the public pump is not working. The Water Desk holds responsibility for the technical response. Can we agree today on an interim measure, the repair action, the responsible role and a realistic update date? Awra can support community communication and follow-up."'],
                      ['C', 'Immediate formal escalation', '"The service interruption and earlier requests will be documented through the relevant formal accountability mechanism unless an agreed response is provided."'],
                    ]}
                    onChange={(selectedPosition) => save({ ...saved, selectedPosition: selectedPosition as '' | 'A' | 'B' | 'C', formalFeedback: 'idle', planSaved: false })}
                  />
                </div>
                <div className="m4-b3-col-right" style={{ borderLeft: '1px solid var(--m4-enhanced-border)', paddingLeft: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBlockEnd: '0.5rem' }}>Constructive Engagement Scale</h3>
                  <div className="m4-constructive-scale">
                    <div className="m4-scale-item m4-scale-item--orange">
                      <div className="m4-scale-title">1. Pleading without clear responsibility</div>
                      <div className="m4-scale-quote">"Please help us because the community is suffering..."</div>
                      <div className="m4-scale-eval">This communicates urgency, but it does not clearly identify responsibility, evidence or the requested action.</div>
                    </div>
                    <div className="m4-scale-item m4-scale-item--green">
                      <div className="m4-scale-title">2. Constructive rights-based engagement</div>
                      <div className="m4-scale-quote">"The community has reported that the public pump is not working. The Water Desk holds responsibility..."</div>
                      <div className="m4-scale-eval">This combines evidence, responsibility, a practical request, collaboration and a timeframe.</div>
                    </div>
                    <div className="m4-scale-item m4-scale-item--orange">
                      <div className="m4-scale-title">3. Formal accountability step</div>
                      <div className="m4-scale-quote">"The service interruption and earlier requests will be documented..."</div>
                      <div className="m4-scale-eval">A formal step may be appropriate after repeated non-response, continuing serious impact or when an official remedy is required.</div>
                    </div>
                  </div>
                </div>
              </div>
              <Feedback
                state={saved.formalFeedback}
                success="Engagement approach clarified. Choosing constructive rights-based dialogue is the strongest starting position."
                corrective="Urgent pleading is too passive on role boundaries, and immediate escalation bypasses first constructive dialogue. Choose constructive rights-based engagement."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 2, formalFeedback: 'idle' })}>← Back</button>}
                primary={saved.formalFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 4 })}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={!saved.selectedPosition || saved.formalFeedback === 'corrective'}
                    onClick={() => save({ ...saved, formalFeedback: positionCorrect ? 'correct' : 'corrective' })}
                  >
                    Check engagement
                  </button>
                )}
              />
              {saved.formalFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, formalFeedback: 'idle' })}>Revise engagement</button>
              )}
            </section>
          )}

          {stage === 4 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-followup-heading">
              <p className="m4-enhanced-kicker">Stage 4</p>
              <h2 id="m4-b3-followup-heading">Commit to follow-up</h2>
              <p className="m4-b2-intro-text">Agree how Awra will follow up, and identify when a formal accountability step becomes appropriate.</p>

              <div className="m4-b3-two-column">
                <div className="m4-b3-col-left">
                  <CheckGrid
                    legend="When might a formal accountability step become appropriate? Select all that apply."
                    values={saved.formalTriggers}
                    disabled={saved.followUpFeedback === 'correct'}
                    options={[
                      ['repeated_fail', 'The Water Desk repeatedly fails to respond to constructive requests.'],
                      ['impacts_continue', 'Essential service impacts continue without any agreed action.'],
                      ['professional_letter', 'Awra wants its letter to sound more professional.'],
                      ['resolved_already', 'The community has already received a clear action and update.'],
                      ['remedy_required', 'A formal remedy or escalation is required.'],
                    ]}
                    onChange={(formalTriggers) => save({ ...saved, formalTriggers, followUpFeedback: 'idle', planSaved: false })}
                  />
                </div>
                <div className="m4-b3-col-right" style={{ borderLeft: '1px solid var(--m4-enhanced-border)', paddingLeft: '1rem' }}>
                  <div className="m4-b2-record-fields" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <label className="m4-b3-select-label">
                      <span>Who will Awra follow up with?</span>
                      <select value={saved.followUpWho} disabled={saved.followUpFeedback === 'correct'} onChange={(e) => save({ ...saved, followUpWho: e.target.value, followUpFeedback: 'idle', planSaved: false })}>
                        <option value="">Select actor</option>
                        <option value="water_desk">Woreda Water Desk</option>
                        <option value="community">Community members</option>
                        <option value="director">Awra director</option>
                        <option value="no_one">No one</option>
                      </select>
                    </label>
                    <label className="m4-b3-select-label">
                      <span>By when?</span>
                      <select value={saved.followUpWhen} disabled={saved.followUpFeedback === 'correct'} onChange={(e) => save({ ...saved, followUpWhen: e.target.value, followUpFeedback: 'idle', planSaved: false })}>
                        <option value="">Select timing</option>
                        <option value="3_days">3 days</option>
                        <option value="7_days">7 days</option>
                        <option value="14_days">14 days</option>
                        <option value="30_days">30 days</option>
                      </select>
                    </label>
                    <label className="m4-b3-select-label">
                      <span>Purpose of follow-up</span>
                      <select value={saved.followUpPurpose} disabled={saved.followUpFeedback === 'correct'} onChange={(e) => save({ ...saved, followUpPurpose: e.target.value, followUpFeedback: 'idle', planSaved: false })}>
                        <option value="">Select purpose</option>
                        <option value="confirm_time">Confirm action and timeframe</option>
                        <option value="take_over">Take over the maintenance</option>
                        <option value="cancel">Cancel the project</option>
                      </select>
                    </label>
                    <label className="m4-b3-select-label">
                      <span>How will this be documented?</span>
                      <select value={saved.followUpDocumented} disabled={saved.followUpFeedback === 'correct'} onChange={(e) => save({ ...saved, followUpDocumented: e.target.value, followUpFeedback: 'idle', planSaved: false })}>
                        <option value="">Select document method</option>
                        <option value="follow_up_note">Follow-up note and record</option>
                        <option value="none">No documentation</option>
                        <option value="social_media">Public social media post</option>
                      </select>
                    </label>
                    <label className="m4-b3-select-label">
                      <span>How will the community be informed?</span>
                      <select value={saved.followUpInformed} disabled={saved.followUpFeedback === 'correct'} onChange={(e) => save({ ...saved, followUpInformed: e.target.value, followUpFeedback: 'idle', planSaved: false })}>
                        <option value="">Select updates method</option>
                        <option value="meeting_update">Community meeting update</option>
                        <option value="no_updates">No updates shared</option>
                        <option value="notice_board">Notice board only</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              <Feedback
                state={saved.followUpFeedback}
                success="Follow-up timing, triggers and methods verified. Formal escalation is a proportionate step if repeated failure occurs or serious impacts persist."
                corrective="Triggers correct: repeated failure, continuing impacts, and remedy required. Dropdowns: Woreda Water Desk, 14 days, Confirm action and timeframe, Follow-up note and record, and Community meeting update."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 3, followUpFeedback: 'idle' })}>← Back</button>}
                primary={saved.followUpFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 5 })}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={!saved.followUpWho || !saved.followUpWhen || !saved.followUpPurpose || !saved.followUpDocumented || !saved.followUpInformed || saved.formalTriggers.length === 0 || saved.followUpFeedback === 'corrective'}
                    onClick={() => save({ ...saved, followUpFeedback: followUpCorrect ? 'correct' : 'corrective' })}
                  >
                    Check follow-up
                  </button>
                )}
              />
              {saved.followUpFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, followUpFeedback: 'idle' })}>Revise follow-up</button>
              )}
            </section>
          )}

          {stage === 5 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-confirm-heading">
              <p className="m4-enhanced-kicker">Stage 5</p>
              <h2 id="m4-b3-confirm-heading">Confirm and explain commitments</h2>
              <p className="m4-b2-intro-text">Specify what the Water Desk must confirm and what Awra will explain to the community to maintain local transparency.</p>

              <div className="m4-b3-questions-block">
                <CheckGrid
                  legend="What should the Water Desk confirm? Select four."
                  values={saved.confirmItems}
                  disabled={saved.confirmFeedback === 'correct'}
                  options={[
                    ['inspection', 'Technical inspection or repair action'],
                    ['role', 'Responsible role'],
                    ['measure', 'Interim measure'],
                    ['date', 'Realistic repair or update date'],
                    ['perm_sub', "Awra's permanent responsibility for maintenance"],
                  ]}
                  onChange={(confirmItems) => save({ ...saved, confirmItems, confirmFeedback: 'idle', planSaved: false })}
                />

                <CheckGrid
                  legend="What should Awra explain to the community? Select four."
                  values={saved.explainItems}
                  disabled={saved.confirmFeedback === 'correct'}
                  options={[
                    ['confirmed', 'What has been confirmed'],
                    ['doing', 'What Awra is doing'],
                    ['responsible', "What the Water Desk remains responsible for"],
                    ['update_date', 'When the next update will be provided'],
                    ['guarantee', 'That Awra guarantees the pump will be repaired immediately'],
                  ]}
                  onChange={(explainItems) => save({ ...saved, explainItems, confirmFeedback: 'idle', planSaved: false })}
                />

                <ChoiceCards
                  legend="When should the plan be reviewed?"
                  value={saved.reviewTiming}
                  disabled={saved.confirmFeedback === 'correct'}
                  options={[
                    ['after_update', 'After the agreed update date', 'Check progress immediately once the commitment timeframe expires.'],
                    ['end_project', 'Only at the end of the project', 'Wait for the final project closeout evaluation.'],
                    ['another_concern', 'Only if another concern is received', 'Only act if another emergency occurs.'],
                  ]}
                  onChange={(reviewTiming) => save({ ...saved, reviewTiming: reviewTiming as '' | 'after_update' | 'end_project' | 'another_concern', confirmFeedback: 'idle', planSaved: false })}
                />
              </div>

              <Feedback
                state={saved.confirmFeedback}
                success="Confirmation and communication lines established. Awra ensures the duty-bearer commits to action, explains these boundaries to the community, and plans timely review."
                corrective="Select exactly four items for Water Desk confirmation, four items for Awra explanations (avoiding permanent substitution and false guarantees), and select review 'After the agreed update date'."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 4, confirmFeedback: 'idle' })}>← Back</button>}
                primary={saved.confirmFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 6 })}>Review plan →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={saved.confirmItems.length === 0 || saved.explainItems.length === 0 || !saved.reviewTiming || saved.confirmFeedback === 'corrective'}
                    onClick={() => save({ ...saved, confirmFeedback: confirmCorrect ? 'correct' : 'corrective' })}
                  >
                    Check commitments
                  </button>
                )}
              />
              {saved.confirmFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, confirmFeedback: 'idle' })}>Revise commitments</button>
              )}
            </section>
          )}

          {stage === 6 && (
            <section className="m4-b2-summary" aria-labelledby="m4-b3-roles-summary">
              <span className="m4-b2-summary__icon" aria-hidden="true">✓</span>
              <div>
                <h2 id="m4-b3-roles-summary">Role and engagement plan</h2>

                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBlockEnd: '0.5rem' }}>Actor Map & Stage Flow</h3>
                <div className="m4-actor-map-flow">
                  <div className="m4-flow-stage">
                    <h4>Stage 1: Listen</h4>
                    <span className="m4-flow-actor">Community</span>
                    <span className="m4-flow-action">Reports pump failure & asks for immediate help.</span>
                  </div>
                  <div className="m4-flow-stage">
                    <h4>Stage 2: Clarify</h4>
                    <span className="m4-flow-actor">Awra (CSO)</span>
                    <span className="m4-flow-action">Documents issue & supports interim arrangements.</span>
                  </div>
                  <div className="m4-flow-stage">
                    <h4>Stage 3: Support</h4>
                    <span className="m4-flow-actor">Water Desk</span>
                    <span className="m4-flow-action">Conducts inspection & owns technical repair.</span>
                  </div>
                  <div className="m4-flow-stage">
                    <h4>Stage 4: Account</h4>
                    <span className="m4-flow-actor">Awra & Desk</span>
                    <span className="m4-flow-action">Review progress & update community on status.</span>
                  </div>
                </div>

                <div className="m4-b3-matrix-container">
                  <table className="m4-b3-matrix-table">
                    <tbody>
                      <tr>
                        <td><strong>Immediate concern</strong></td>
                        <td>The Jiru Amba public water pump is not functioning, affecting community access to water.</td>
                      </tr>
                      <tr>
                        <td><strong>Awra's role</strong></td>
                        <td>Document the problem, support interim communication and access arrangements, convene dialogue and follow up.</td>
                      </tr>
                      <tr>
                        <td><strong>Responsible public actor</strong></td>
                        <td>The Woreda Water Desk remains responsible for inspection, authorisation, repair and the technical timeline.</td>
                      </tr>
                      <tr>
                        <td><strong>Engagement approach</strong></td>
                        <td>Request an agreed interim measure, repair action, responsible role and update date through constructive rights-based dialogue.</td>
                      </tr>
                      <tr>
                        <td><strong>Account-back</strong></td>
                        <td>Explain what has been confirmed, what Awra is doing, what remains the Water Desk's responsibility and when the community will receive an update.</td>
                      </tr>
                      <tr>
                        <td><strong>Follow-up</strong></td>
                        <td>Review progress after the agreed update date and consider a formal accountability step if essential impacts continue without an adequate response.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style={{ marginTop: '1.5rem' }}><em>Prepared for your Implementation Decision and Follow-Up Note.</em></p>
              </div>
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, planSaved: false })}>Revise plan</button>}
                primary={readyToContinue ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => completeScreen('M4-S1-08', onChangeState, readyToContinue)}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    onClick={reviewRequired
                      ? () => save({ ...saved, activeStage: 1, planSaved: false })
                      : recordPlan}
                  >
                    {reviewRequired ? 'Review and reconfirm' : 'Save plan'}
                  </button>
                )}
              />
            </section>
          )}
        </>
      )}
      status={stage === 6 ? 'Role and engagement plan saved.' : `Stage ${stage} of 5. Complete the current gate to continue.`}
    />
  );
}

// SCREEN 10: Support and Capacity-Response Diagnosis
const supportSignals = [
  { id: 'sig1', text: 'Several participants say the training time clashes with market activity.', gap: 'access_scheduling' },
  { id: 'sig2', text: 'Some invited youth say they did not understand what the training was for.', gap: 'communication_understanding' },
  { id: 'sig3', text: 'After missing one session, several participants assume they should not return.', gap: 'follow_up_inclusion' },
  { id: 'sig4', text: 'Facilitators notice that reminder messages were not reaching everyone consistently.', gap: 'follow_up_inclusion' },
  { id: 'sig5', text: 'Those who attended the first session mostly stayed engaged once they understood the purpose.', gap: 'communication_understanding' },
] as const;

const gapOptions = [
  ['access_scheduling', 'Practical access and scheduling'],
  ['communication_understanding', 'Communication and understanding'],
  ['follow_up_inclusion', 'Follow-up and inclusion'],
] as const;

function SupportScreen({ state, onChangeState }: Props) {
  const enhanced = currentEnhancedState(state);
  const saved = enhanced.batch3.support;
  const reviewRequired = enhanced.fields.supportDiagnosis.reviewRequired;
  const readyToContinue = canCompleteBatch3Screen(saved.planSaved, reviewRequired);
  const stage = saved.activeStage;
  const save = (next: Module4Batch3State['support'], fieldUpdater?: (value: Module4EnhancedState) => Module4EnhancedState) =>
    saveBatch3Slice(onChangeState, 'support', next, fieldUpdater);

  const classificationsCorrect = isScreen10DiagnosisCorrect(saved.classifications);
  const firstSupportCorrect = saved.firstSupport === 'B';
  const pathwayCorrect = isScreen10ConditionalSupportCorrect(saved);
  const reviewCorrect = sameSet(saved.reviewItems, ['attendance', 'understanding', 're_entry', 'reminder'])
    && saved.reviewTiming === 'next_session'
    && sameSet(saved.updateUse, ['adjust_support', 'confirm_improved']);

  const completedThrough = saved.reviewFeedback === 'correct'
    ? 4
    : saved.pathwayFeedback === 'correct'
      ? 3
      : saved.firstSupportFeedback === 'correct'
        ? 2
        : saved.classificationsFeedback === 'correct'
          ? 1
          : 0;

  const recordPlan = () => {
    const diagnosis = {
      diagnosedGap: 'Low attendance is driven by access, understanding and follow-up barriers, not technical capacity.',
      firstResponse: 'Adjust timing and clarify invitation',
      conditionalAdjustments: 'Provide clearer training examples, welcome back hesitant returners, and strengthen reminder reach.',
      reviewCommitment: 'Review attendance, understanding, re-entry and reminders after the next session.',
    };
    save(
      { ...saved, activeStage: 5, reviewFeedback: 'correct', planSaved: true },
      (current) => updateModule4Field(current, 'supportDiagnosis', diagnosis, {
        learnerEdited: true,
        sourceScreenId: 'M4-S1-09',
      }),
    );
  };

  const assetId = stage === 5
    ? 'm4-s10-orientation'
    : stage >= 3
      ? 'm4-s10-schedule-review'
      : stage === 2
        ? 'm4-s10-business-training'
        : 'm4-s10-training-session';

  return (
    <Module4EnhancedScreenFrame
      className="m4-enhanced-screen--batch3"
      titleId="m4-b3-support-title"
      eyebrow="Module 4 · Screen 10"
      title="Diagnose the Gap, Then Choose Support"
      introduction={<p>Diagnose why participation dropped, choose the first support response, adjust it if needed and commit to review.</p>}
      context={(
        <WorkstreamContext label="Youth Livelihoods" assetId={assetId} heading="The attendance problem">
          <p><strong>Scenario:</strong> Attendance drops after the first session of a youth skills training. Some participants report timing problems, some did not understand the purpose, and others assume they are not allowed to return after missing a session.</p>
          <ul className="m4-b2-risk-list">
            <li>Low continued attendance</li>
            <li>Clashing market priorities</li>
            <li>Misunderstood training purpose</li>
          </ul>
        </WorkstreamContext>
      )}
      activity={(
        <>
          <ReviewBanner visible={reviewRequired} />
          <StagePath
            labels={['Diagnose the gap', 'Select first support', 'Adjust if needed', 'Commit to review']}
            activeStage={Math.min(stage, 4)}
            completedThrough={completedThrough}
            onSelect={(next) => save({ ...saved, activeStage: next as 1 | 2 | 3 | 4 })}
          />

          {stage === 1 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-diagnose-heading">
              <p className="m4-enhanced-kicker">Stage 1</p>
              <h2 id="m4-b3-diagnose-heading">Diagnose the gap</h2>
              <p className="m4-b2-intro-text">Classify each signal under the gap type that best explains it.</p>
              <div className="m4-b2-record-fields">
                {supportSignals.map((sig) => (
                  <label key={sig.id} className="m4-b3-select-label">
                    <span>{sig.text}</span>
                    <select
                      value={saved.classifications[sig.id] || ''}
                      disabled={saved.classificationsFeedback === 'correct'}
                      onChange={(e) => save({
                        ...saved,
                        classifications: { ...saved.classifications, [sig.id]: e.target.value },
                        classificationsFeedback: 'idle',
                        planSaved: false,
                      })}
                    >
                      <option value="">Choose a gap type</option>
                      {gapOptions.map(([val, text]) => (
                        <option key={val} value={val}>{text}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
              <Feedback
                state={saved.classificationsFeedback}
                success="Different gaps need different support. Timing, understanding and follow-up all matter, so Awra should choose a first support that addresses immediate barriers."
                corrective="Check classifications. Time clashes are access issues; understanding the purpose belongs to communication; returning rules and reminder reach are follow-up gaps."
              />
              <Module4EnhancedActionBar
                primary={saved.classificationsFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 2 })}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={supportSignals.some((sig) => !saved.classifications[sig.id]) || saved.classificationsFeedback === 'corrective'}
                    onClick={() => save({ ...saved, classificationsFeedback: classificationsCorrect ? 'correct' : 'corrective' })}
                  >
                    Check diagnosis
                  </button>
                )}
              />
              {saved.classificationsFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, classificationsFeedback: 'idle' })}>Revise diagnosis</button>
              )}
            </section>
          )}

          {stage === 2 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-firstsupport-heading">
              <p className="m4-enhanced-kicker">Stage 2</p>
              <h2 id="m4-b3-firstsupport-heading">Select first support</h2>
              <p className="m4-b2-intro-text">Select the support response that best matches the most immediate participation barrier.</p>
              <ChoiceCards
                legend="Select first support response"
                value={saved.firstSupport}
                disabled={saved.firstSupportFeedback === 'correct'}
                options={[
                  [
                    'A',
                    'Run another technical training',
                    'Repeat the full training immediately with more technical detail.',
                    'This may add information, but it does not directly solve the most immediate participation barrier.',
                    'More content, unclear fit',
                    'info',
                  ],
                  [
                    'B',
                    'Adjust timing and clarify the invitation',
                    'Reschedule the next session outside the main market period, explain the purpose clearly, and confirm that participants can still join after one missed session.',
                    'This addresses practical attendance barriers and misunderstanding while reducing unnecessary exclusion.',
                    'Proportionate first support',
                    'success',
                  ],
                  [
                    'C',
                    'Remove those who missed the first session',
                    'Continue with the committed participants only and fill any empty places later.',
                    'This reduces follow-up demands, but it risks excluding people affected by avoidable implementation barriers.',
                    'Simple, but exclusionary',
                    'purple',
                  ],
                ]}
                onChange={(firstSupport) => save({ ...saved, firstSupport: firstSupport as '' | 'A' | 'B' | 'C', firstSupportFeedback: 'idle', planSaved: false })}
              />
              <Feedback
                state={saved.firstSupportFeedback}
                success="Strongest first response. This support addresses the immediate attendance and communication barriers without assuming that technical capability is the main issue."
                corrective="Repeat-training or excluding youth does not solve the access and invitation barriers. Select Option B to adjust timing and clarify details."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, firstSupportFeedback: 'idle' })}>← Back</button>}
                primary={saved.firstSupportFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 3 })}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={!saved.firstSupport || saved.firstSupportFeedback === 'corrective'}
                    onClick={() => save({ ...saved, firstSupportFeedback: firstSupportCorrect ? 'correct' : 'corrective' })}
                  >
                    Check support
                  </button>
                )}
              />
              {saved.firstSupportFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, firstSupportFeedback: 'idle' })}>Revise support</button>
              )}
            </section>
          )}

          {stage === 3 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-adjustneeded-heading">
              <p className="m4-enhanced-kicker">Stage 3</p>
              <h2 id="m4-b3-adjustneeded-heading">Adjust if needed</h2>
              <p className="m4-b2-intro-text">If attendance remains uneven after the first support, choose the next response for each condition.</p>
              <div className="m4-b3-conditions-group">
                <fieldset className="m4-b3-radio-group">
                  <legend>Condition 1: Timing improved, but some youth still say the training is not relevant.</legend>
                  <label><input type="radio" name="cond1" checked={saved.condition1 === 'clearer_example'} onChange={() => save({ ...saved, condition1: 'clearer_example', pathwayFeedback: 'idle', planSaved: false })} /><span>Provide a clearer example of the training purpose and who it is for.</span></label>
                  <label><input type="radio" name="cond1" checked={saved.condition1 === 'end_group'} onChange={() => save({ ...saved, condition1: 'end_group', pathwayFeedback: 'idle', planSaved: false })} /><span>End the training group.</span></label>
                  <label><input type="radio" name="cond1" checked={saved.condition1 === 'change_venue'} onChange={() => save({ ...saved, condition1: 'change_venue', pathwayFeedback: 'idle', planSaved: false })} /><span>Change the venue without further explanation.</span></label>
                </fieldset>

                <fieldset className="m4-b3-radio-group">
                  <legend>Condition 2: Attendance improves, but those who missed one session still hesitate to return.</legend>
                  <label><input type="radio" name="cond2" checked={saved.condition2 === 'send_message'} onChange={() => save({ ...saved, condition2: 'send_message', pathwayFeedback: 'idle', planSaved: false })} /><span>Send a message that missed sessions do not remove eligibility and explain how participants can rejoin.</span></label>
                  <label><input type="radio" name="cond2" checked={saved.condition2 === 'close_place'} onChange={() => save({ ...saved, condition2: 'close_place', pathwayFeedback: 'idle', planSaved: false })} /><span>Mark them as non-committed and close their place.</span></label>
                  <label><input type="radio" name="cond2" checked={saved.condition2 === 'wait_alone'} onChange={() => save({ ...saved, condition2: 'wait_alone', pathwayFeedback: 'idle', planSaved: false })} /><span>Wait to see whether they come back on their own.</span></label>
                </fieldset>

                <fieldset className="m4-b3-radio-group">
                  <legend>Condition 3: Attendance and understanding improve, but reminders still fail to reach some participants.</legend>
                  <label><input type="radio" name="cond3" checked={saved.condition3 === 'review_strengthen'} onChange={() => save({ ...saved, condition3: 'review_strengthen', pathwayFeedback: 'idle', planSaved: false })} /><span>Review and strengthen the reminder and follow-up method.</span></label>
                  <label><input type="radio" name="cond3" checked={saved.condition3 === 'technical_modules'} onChange={() => save({ ...saved, condition3: 'technical_modules', pathwayFeedback: 'idle', planSaved: false })} /><span>Add more technical modules.</span></label>
                  <label><input type="radio" name="cond3" checked={saved.condition3 === 'assume_resolved'} onChange={() => save({ ...saved, condition3: 'assume_resolved', pathwayFeedback: 'idle', planSaved: false })} /><span>Assume the issue is resolved because attendance improved slightly.</span></label>
                </fieldset>
              </div>
              <Feedback
                state={saved.pathwayFeedback}
                success="Support matched to the remaining gaps. These responses build on the first support by addressing remaining understanding and follow-up problems without exclusion."
                corrective="For relevance, provide clearer examples; for hesitant returners, welcome re-entry; for weak reminders, review the communication method."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 2, pathwayFeedback: 'idle' })}>← Back</button>}
                primary={saved.pathwayFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 4 })}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={!saved.condition1 || !saved.condition2 || !saved.condition3 || saved.pathwayFeedback === 'corrective'}
                    onClick={() => save({ ...saved, pathwayFeedback: pathwayCorrect ? 'correct' : 'corrective' })}
                  >
                    Check response pathways
                  </button>
                )}
              />
              {saved.pathwayFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, pathwayFeedback: 'idle' })}>Revise pathways</button>
              )}
            </section>
          )}

          {stage === 4 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-commit-heading">
              <p className="m4-enhanced-kicker">Stage 4</p>
              <h2 id="m4-b3-commit-heading">Commit to review</h2>
              <p className="m4-b2-intro-text">Define what the team will review, when, and how the results will be used.</p>
              <CheckGrid
                legend="What should the team review after the next session? Select four."
                values={saved.reviewItems}
                disabled={saved.reviewFeedback === 'correct'}
                options={[
                  ['attendance', 'Whether attendance improved.'],
                  ['understanding', 'Whether participants understood the purpose more clearly.'],
                  ['re_entry', 'Whether people who missed a session felt able to return.'],
                  ['reminder', 'Whether reminder messages reached people reliably.'],
                  ['decor', 'Whether the venue decoration looked more professional.'],
                ]}
                onChange={(reviewItems) => save({ ...saved, reviewItems, reviewFeedback: 'idle', planSaved: false })}
              />

              <ChoiceCards
                legend="When should this be reviewed?"
                value={saved.reviewTiming}
                disabled={saved.reviewFeedback === 'correct'}
                options={[
                  ['next_session', 'After the next session', 'Review immediate signals to make adjustments quickly.'],
                  ['end_project', 'At the end of the whole project', 'Wait for the final project evaluation.'],
                  ['drops_again', 'Only if attendance drops again', 'Only act if another emergency occurs.'],
                ]}
                onChange={(reviewTiming) => save({ ...saved, reviewTiming, reviewFeedback: 'idle', planSaved: false })}
              />

              <CheckGrid
                legend="How should the next update be used? Select two."
                values={saved.updateUse}
                disabled={saved.reviewFeedback === 'correct'}
                options={[
                  ['adjust_support', 'Adjust support again if needed.'],
                  ['confirm_improved', 'Confirm what improved and what still needs attention.'],
                  ['success_regardless', 'Describe the training as fully successful regardless of evidence.'],
                ]}
                onChange={(updateUse) => save({ ...saved, updateUse, reviewFeedback: 'idle', planSaved: false })}
              />

              <Feedback
                state={saved.reviewFeedback}
                success="Review commitments established. Review attendance, understanding, re-entry and reminders immediately after the next session to adjust support based on evidence."
                corrective="Select the four relevant review items, review after the next session, and select the two appropriate ways to use the review (adjust support, confirm what improved)."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 3, reviewFeedback: 'idle' })}>← Back</button>}
                primary={saved.reviewFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 5 })}>Review plan →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={saved.reviewItems.length === 0 || !saved.reviewTiming || saved.updateUse.length === 0 || saved.reviewFeedback === 'corrective'}
                    onClick={() => save({ ...saved, reviewFeedback: reviewCorrect ? 'correct' : 'corrective' })}
                  >
                    Check review plan
                  </button>
                )}
              />
              {saved.reviewFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, reviewFeedback: 'idle' })}>Revise review plan</button>
              )}
            </section>
          )}

          {stage === 5 && (
            <section className="m4-b2-summary" aria-labelledby="m4-b3-support-summary">
              <span className="m4-b2-summary__icon" aria-hidden="true">✓</span>
              <div>
                <h2 id="m4-b3-support-summary">Support and response plan</h2>
                <div className="m4-b3-matrix-container">
                  <table className="m4-b3-matrix-table">
                    <tbody>
                      <tr>
                        <td><strong>Immediate implementation gap</strong></td>
                        <td>Youth participation is affected by timing barriers, unclear purpose and weak follow-up after missed sessions.</td>
                      </tr>
                      <tr>
                        <td><strong>First support</strong></td>
                        <td>Reschedule outside the main market period, explain the purpose clearly, and confirm that missing one session does not remove eligibility.</td>
                      </tr>
                      <tr>
                        <td><strong>Conditional adjustments</strong></td>
                        <td>Clarify relevance further if purpose remains unclear, reopen re-entry through direct communication and strengthen the reminder method if follow-up is unreliable.</td>
                      </tr>
                      <tr>
                        <td><strong>Review commitment</strong></td>
                        <td>After the next session, review attendance, understanding, re-entry and reminder reach.</td>
                      </tr>
                      <tr>
                        <td><strong>Use of the review</strong></td>
                        <td>Confirm what improved, identify any remaining gap and adjust support if needed.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p><em>Prepared for your Implementation Decision and Follow-Up Note.</em></p>
              </div>
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, planSaved: false })}>Revise support</button>}
                primary={readyToContinue ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => completeScreen('M4-S1-09', onChangeState, readyToContinue)}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    onClick={reviewRequired
                      ? () => save({ ...saved, activeStage: 1, planSaved: false })
                      : recordPlan}
                  >
                    {reviewRequired ? 'Review and reconfirm' : 'Save plan'}
                  </button>
                )}
              />
            </section>
          )}
        </>
      )}
      status={stage === 5 ? 'Support and response plan saved.' : `Stage ${stage} of 4. Complete the current gate to continue.`}
    />
  );
}

// SCREEN 11: Adjust, Engage or Protect
const pathwaySituations = [
  { id: 'sit1', label: 'Meeting time excludes some vendors', detail: 'Vendors in other regions cannot attend the scheduled meeting.', path: 'adjust' },
  { id: 'sit2', label: 'Accessibility action is delayed', detail: 'A venue accessibility issue requires a facilities team decision.', path: 'engage' },
  { id: 'sit3', label: 'A participant reports retaliation risk', detail: 'A vendor shares a concern about possible retaliation if they speak up.', path: 'protect' },
] as const;

const pathwayOptions = [
  ['adjust', 'Adjust now'],
  ['engage', 'Engage and agree'],
  ['protect', 'Protect and use another process'],
] as const;

function PathwaysScreen({ state, onChangeState }: Props) {
  const enhanced = currentEnhancedState(state);
  const saved = enhanced.batch3.pathways;
  const reviewRequired = enhanced.fields.selectedResponsePathway.reviewRequired;
  const readyToContinue = canCompleteBatch3Screen(saved.planSaved, reviewRequired);
  const stage = saved.activeStage;
  const save = (next: Module4Batch3State['pathways'], fieldUpdater?: (value: Module4EnhancedState) => Module4EnhancedState) =>
    saveBatch3Slice(onChangeState, 'pathways', next, fieldUpdater);

  const matchesCorrect = isScreen11MatchCorrect(saved.matches);
  const decisionsCorrect = isScreen11DecisionPracticeCorrect(saved.decisions);

  const completedThrough = saved.decisionsFeedback === 'correct'
    ? 2
    : saved.matchesFeedback === 'correct'
      ? 1
      : 0;

  const recordPathways = () => {
    if (!decisionsCorrect) return;
    save(
      {
        ...saved,
        activeStage: 3,
        decisionsFeedback: 'correct',
        whyConfirmed: true,
        planSaved: true,
      },
      (current) => updateModule4Field(current, 'selectedResponsePathway', 'protect', {
        learnerEdited: true,
        sourceScreenId: 'M4-S1-10',
      }),
    );
  };

  const assetId = stage === 1
    ? 'm4-s11-adjust-meeting-time'
    : stage === 2
      ? 'm4-s11-engage-accessibility'
      : 'm4-s11-protect-retaliation';

  return (
    <Module4EnhancedScreenFrame
      className="m4-enhanced-screen--batch3"
      titleId="m4-b3-pathways-title"
      eyebrow="Module 4 · Screen 11"
      title="Adjust, Engage or Protect"
      introduction={<p>Choose and apply the proportionate response pathway for three Jiru Amba implementation situations.</p>}
      context={(
        <WorkstreamContext label="Mixed implementation situations" assetId={assetId} heading="Adjust, Engage or Protect">
          <p><strong>Context:</strong> Some implementation barriers are within Awra's own control (Adjust). Others require agreement with a duty-bearer (Engage). A small number involve harm or retaliation risk, requiring a protective pathway outside the ordinary project dialogue (Protect).</p>
        </WorkstreamContext>
      )}
      activity={(
        <>
          <ReviewBanner visible={reviewRequired} />
          <StagePath
            labels={['Match situations', 'Apply the pathways']}
            activeStage={Math.min(stage, 2)}
            completedThrough={completedThrough}
            onSelect={(next) => save({ ...saved, activeStage: next as 1 | 2 })}
          />

          {stage === 1 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-match-heading">
              <p className="m4-enhanced-kicker">Stage 1</p>
              <h2 id="m4-b3-match-heading">Match situations to response pathways</h2>
              <p className="m4-b2-intro-text">Match each situation to the most proportionate response pathway.</p>
              <div className="m4-b2-record-fields">
                {pathwaySituations.map((sit) => (
                  <label key={sit.id} className="m4-b3-select-label">
                    <span><strong>{sit.label}:</strong> {sit.detail}</span>
                    <select
                      value={saved.matches[sit.id] || ''}
                      disabled={saved.matchesFeedback === 'correct'}
                      onChange={(e) => save({
                        ...saved,
                        matches: { ...saved.matches, [sit.id]: e.target.value },
                        matchesFeedback: 'idle',
                        planSaved: false,
                      })}
                    >
                      <option value="">Choose a pathway</option>
                      {pathwayOptions.map(([val, text]) => (
                        <option key={val} value={val}>{text}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
              <Feedback
                state={saved.matchesFeedback}
                success="Pathways matched proportionately. Some barriers can be adjusted directly, some need agreement, and some require a protective step outside the ordinary implementation process."
                corrective="Check selections. Meeting timing is under Awra's control (Adjust); facilities repair requires the duty-bearer's action (Engage); retaliation risk is a safety concern that requires a protective process (Protect)."
              />
              <Module4EnhancedActionBar
                primary={saved.matchesFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 2 })}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={pathwaySituations.some((sit) => !saved.matches[sit.id]) || saved.matchesFeedback === 'corrective'}
                    onClick={() => save({ ...saved, matchesFeedback: matchesCorrect ? 'correct' : 'corrective' })}
                  >
                    Check response pathways
                  </button>
                )}
              />
              {saved.matchesFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, matchesFeedback: 'idle' })}>Revise matches</button>
              )}
            </section>
          )}

          {stage === 2 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-why-heading">
              <p className="m4-enhanced-kicker">Stage 2</p>
              <h2 id="m4-b3-why-heading">Apply each pathway</h2>
              <p className="m4-b2-intro-text">Choose the action that puts each matched pathway into practice.</p>
              <div className="m4-b3-conditions-group">
                <fieldset className="m4-b3-radio-group">
                  <legend>Adjust now: a meeting time excludes some vendors. What should Awra do?</legend>
                  <label><input type="radio" name="path-adjust" checked={saved.decisions.adjust === 'change_timing_format'} disabled={saved.decisionsFeedback === 'correct'} onChange={() => save({ ...saved, decisions: { ...saved.decisions, adjust: 'change_timing_format' }, decisionsFeedback: 'idle', whyConfirmed: false, planSaved: false })} /><span>Change the timing or participation format now so affected vendors can take part.</span></label>
                  <label><input type="radio" name="path-adjust" checked={saved.decisions.adjust === 'wait_next_cycle'} disabled={saved.decisionsFeedback === 'correct'} onChange={() => save({ ...saved, decisions: { ...saved.decisions, adjust: 'wait_next_cycle' }, decisionsFeedback: 'idle', whyConfirmed: false, planSaved: false })} /><span>Keep the meeting unchanged and wait for the next planning cycle.</span></label>
                </fieldset>

                <fieldset className="m4-b3-radio-group">
                  <legend>Engage and agree: an accessibility action is delayed. What should Awra do?</legend>
                  <label><input type="radio" name="path-engage" checked={saved.decisions.engage === 'agree_action_role_date'} disabled={saved.decisionsFeedback === 'correct'} onChange={() => save({ ...saved, decisions: { ...saved.decisions, engage: 'agree_action_role_date' }, decisionsFeedback: 'idle', whyConfirmed: false, planSaved: false })} /><span>Adapt what Awra controls and agree the action, responsible role and realistic date with the facilities team.</span></label>
                  <label><input type="radio" name="path-engage" checked={saved.decisions.engage === 'take_over_repair'} disabled={saved.decisionsFeedback === 'correct'} onChange={() => save({ ...saved, decisions: { ...saved.decisions, engage: 'take_over_repair' }, decisionsFeedback: 'idle', whyConfirmed: false, planSaved: false })} /><span>Take over the facilities team’s repair role and promise completion.</span></label>
                </fieldset>

                <fieldset className="m4-b3-radio-group">
                  <legend>Protect: a participant reports retaliation risk. What should Awra do?</legend>
                  <label><input type="radio" name="path-protect" checked={saved.decisions.protect === 'pause_protect_process'} disabled={saved.decisionsFeedback === 'correct'} onChange={() => save({ ...saved, decisions: { ...saved.decisions, protect: 'pause_protect_process' }, decisionsFeedback: 'idle', whyConfirmed: false, planSaved: false })} /><span>Pause ordinary discussion, protect the participant and use the appropriate safeguarding process with minimum necessary information.</span></label>
                  <label><input type="radio" name="path-protect" checked={saved.decisions.protect === 'raise_publicly'} disabled={saved.decisionsFeedback === 'correct'} onChange={() => save({ ...saved, decisions: { ...saved.decisions, protect: 'raise_publicly' }, decisionsFeedback: 'idle', whyConfirmed: false, planSaved: false })} /><span>Raise the concern at the next public project meeting so everyone can respond.</span></label>
                </fieldset>
              </div>
              <Feedback
                state={saved.decisionsFeedback}
                success="The actions match all three pathways: adjust what Awra controls, agree duty-bearer action and timing, and move retaliation risk into a protective process."
                corrective="Revise the actions. Do not delay an adjustment Awra controls, take over a duty-bearer role, or expose a person who reports retaliation risk."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, decisionsFeedback: 'idle' })}>← Back</button>}
                primary={saved.decisionsFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={recordPathways}>Review pathways →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={!saved.decisions.adjust || !saved.decisions.engage || !saved.decisions.protect || saved.decisionsFeedback === 'corrective'}
                    onClick={() => save({ ...saved, decisionsFeedback: decisionsCorrect ? 'correct' : 'corrective' })}
                  >
                    Check scenario decisions
                  </button>
                )}
              />
              {saved.decisionsFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, decisionsFeedback: 'idle' })}>Revise decisions</button>
              )}
            </section>
          )}

          {stage === 3 && (
            <section className="m4-b2-summary" aria-labelledby="m4-b3-pathways-summary">
              <span className="m4-b2-summary__icon" aria-hidden="true">✓</span>
              <div>
                <h2 id="m4-b3-pathways-summary">Implementation response pathways</h2>
                <div className="m4-b3-summary-list">
                  <div className="m4-b3-summary-item">
                    <strong>1. Adjust now:</strong> Change meeting timing or format immediately so affected vendors can participate more fully.
                  </div>
                  <div className="m4-b3-summary-item">
                    <strong>2. Engage and agree:</strong> Adapt Awra’s own arrangements and agree the action, responsible role and realistic date with the actor responsible for the delayed accessibility improvement.
                  </div>
                  <div className="m4-b3-summary-item">
                    <strong>3. Protect and use another process:</strong> Pause ordinary discussion of the retaliation concern, protect the participant and use the appropriate organisational process while keeping the person updated.
                  </div>
                </div>
                <p><em>Prepared for your Implementation Decision and Follow-Up Note.</em></p>
              </div>
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, planSaved: false })}>Revise pathways</button>}
                primary={readyToContinue ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => completeScreen('M4-S1-10', onChangeState, readyToContinue)}>Continue →</button>
                ) : (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 1, planSaved: false })}>Review and reconfirm</button>
                )}
              />
            </section>
          )}
        </>
      )}
      status={stage === 3 ? 'Response pathways established.' : `Stage ${stage} of 2. Complete the current decision to continue.`}
    />
  );
}

// SCREEN 12: Minimum Necessary Information
function InformationScreen({ state, onChangeState }: Props) {
  const enhanced = currentEnhancedState(state);
  const saved = enhanced.batch3.information;
  const reviewRequired = enhanced.fields.minimumNecessaryInformation.reviewRequired;
  const readyToContinue = canCompleteBatch3Screen(saved.noteSaved, reviewRequired);
  const stage = saved.activeStage;
  const save = (next: Module4Batch3State['information'], fieldUpdater?: (value: Module4EnhancedState) => Module4EnhancedState) =>
    saveBatch3Slice(onChangeState, 'information', next, fieldUpdater);

  const evidenceCorrect = saved.selectedEvidence === 'B';
  const minNeededCorrect = isScreen12MinimumInformationCorrect(saved.selectedMinNeeded);
  const responseCorrect = saved.selectedResponse === 'B';
  const noteCorrect = isScreen12NoteCorrect(saved);

  const completedThrough = saved.noteFeedback === 'correct'
    ? 4
    : saved.responseFeedback === 'correct'
      ? 3
      : saved.minNeededFeedback === 'correct'
        ? 2
        : saved.evidenceFeedback === 'correct'
          ? 1
          : 0;

  const recordNote = () => {
    const minInfo = [
      'Track whether each concern was reviewed, assigned a response owner, explained back and followed up.',
      'Data-minimization: do not collect personal histories or names.',
    ];
    save(
      { ...saved, activeStage: 5, noteFeedback: 'correct', noteSaved: true },
      (current) => updateModule4Field(current, 'minimumNecessaryInformation', minInfo, {
        learnerEdited: true,
        sourceScreenId: 'M4-S1-11',
      }),
    );
  };

  const assetId = stage === 5
    ? 'm4-s12-evidence-review'
    : stage === 4
      ? 'm4-s12-facilitated-review'
      : stage === 3
        ? 'm4-s12-community-check'
        : stage === 2
          ? 'm4-s12-consultation'
          : 'm4-s12-feedback-record';

  return (
    <Module4EnhancedScreenFrame
      className="m4-enhanced-screen--batch3"
      titleId="m4-b3-info-title"
      eyebrow="Module 4 · Screen 12"
      title="Use the Information Needed for the Decision"
      introduction={<p>Apply data-minimization tests, identify what the evidence can and cannot establish, and record a safe-use next action.</p>}
      context={(
        <WorkstreamContext label="Consultation & Feedback" assetId={assetId} heading="A pattern is emerging">
          <p><strong>Scenario:</strong> Awra's feedback log contains several concerns, but the response log is incomplete. We have sample case records, community feedback, and a process map, but lack consistency in response details.</p>
          <dl>
            <div><dt>Current evidence signal</dt><dd>Concerns were recorded, but the response log does not yet show whether the response loop was completed.</dd></div>
          </dl>
        </WorkstreamContext>
      )}
      activity={(
        <>
          <ReviewBanner visible={reviewRequired} />
          <StagePath
            labels={['Choose the evidence line', 'Check the minimum needed', 'Decide the response', 'Prepare the note']}
            activeStage={Math.min(stage, 4)}
            completedThrough={completedThrough}
            onSelect={(next) => save({ ...saved, activeStage: next as 1 | 2 | 3 | 4 })}
          />

          {stage === 1 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-evidence-heading">
              <p className="m4-enhanced-kicker">Stage 1</p>
              <h2 id="m4-b3-evidence-heading">Choose the evidence line</h2>
              <p className="m4-b2-intro-text">Select the strongest evidence line for the implementation decision.</p>
              <ChoiceCards
                legend="Select the evidence line"
                value={saved.selectedEvidence}
                disabled={saved.evidenceFeedback === 'correct'}
                options={[
                  ['A', 'Volume and themes of concerns raised', 'Focuses on how many concerns are raised and what they are about. (Useful context, but not enough)'],
                  ['B', 'Review, response, explanation back and follow-up', 'Focuses on whether the process steps are happening for each concern. (Strongest evidence line)'],
                  ['C', 'Detailed outcomes for each concern', 'Focuses on outcomes and impact for every individual case. (Too much information for this decision)'],
                ]}
                onChange={(selectedEvidence) => save({ ...saved, selectedEvidence: selectedEvidence as '' | 'A' | 'B' | 'C', evidenceFeedback: 'idle', noteSaved: false })}
              />
              <Feedback
                state={saved.evidenceFeedback}
                success="Strongest evidence line. This evidence shows whether the response process is working and does not depend on collecting more information than the decision requires."
                corrective="Themes or detailed personal files do not measure response loop completion. Choose the response-pathway evidence (Option B)."
              />
              <Module4EnhancedActionBar
                primary={saved.evidenceFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 2 })}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={!saved.selectedEvidence || saved.evidenceFeedback === 'corrective'}
                    onClick={() => save({ ...saved, evidenceFeedback: evidenceCorrect ? 'correct' : 'corrective' })}
                  >
                    Check evidence line
                  </button>
                )}
              />
              {saved.evidenceFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, evidenceFeedback: 'idle' })}>Revise choice</button>
              )}
            </section>
          )}

          {stage === 2 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-minneeded-heading">
              <p className="m4-enhanced-kicker">Stage 2</p>
              <h2 id="m4-b3-minneeded-heading">Check the minimum needed</h2>
              <CheckGrid
                legend="Select the information that is enough to use this evidence line well."
                values={saved.selectedMinNeeded}
                disabled={saved.minNeededFeedback === 'correct'}
                options={[
                  ['reviewed', 'Whether each concern was reviewed.'],
                  ['assigned', 'Whether a response owner was assigned.'],
                  ['explained', 'Whether an explanation back was provided.'],
                  ['followed_up', 'Whether a follow-up check occurred.'],
                  ['personal_history', 'Detailed personal histories of all participants.'],
                  ['names', 'Names of every person who raised a concern.'],
                ]}
                onChange={(selectedMinNeeded) => save({ ...saved, selectedMinNeeded, minNeededFeedback: 'idle', noteSaved: false })}
              />
              <Feedback
                state={saved.minNeededFeedback}
                success="Enough for the decision. These items show whether the response pathway was completed without requiring unnecessary personal detail."
                corrective="Select only the four process steps needed to check response loop completion. Personal histories and names violate data-minimization."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, minNeededFeedback: 'idle' })}>← Back</button>}
                primary={saved.minNeededFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 3 })}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={saved.selectedMinNeeded.length === 0 || saved.minNeededFeedback === 'corrective'}
                    onClick={() => save({ ...saved, minNeededFeedback: minNeededCorrect ? 'correct' : 'corrective' })}
                  >
                    Check minimum needed
                  </button>
                )}
              />
              {saved.minNeededFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, minNeededFeedback: 'idle' })}>Revise selections</button>
              )}
            </section>
          )}

          {stage === 3 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-decideresponse-heading">
              <p className="m4-enhanced-kicker">Stage 3</p>
              <h2 id="m4-b3-decideresponse-heading">Decide the response</h2>
              <ChoiceCards
                legend="Choose the strongest implementation response when this evidence line is incomplete."
                value={saved.selectedResponse}
                disabled={saved.responseFeedback === 'correct'}
                options={[
                  ['A', 'Keep the current system', 'Keep the system as it is for now, recording counts only. (Too little for follow-up)'],
                  ['B', 'Strengthen the response pathway and review the log', 'Add response-owner, explanation-back and follow-up fields, then review the updated log against the evidence line. (Strongest response)'],
                  ['C', 'Collect detailed personal files on every concern immediately', 'Expand data collection to gather full personal histories before deciding what to change. (Too much collection)'],
                ]}
                onChange={(selectedResponse) => save({ ...saved, selectedResponse: selectedResponse as '' | 'A' | 'B' | 'C', responseFeedback: 'idle', noteSaved: false })}
              />
              <Feedback
                state={saved.responseFeedback}
                success="Strongest response. This response improves the information that Awra actually needs for action and strengthens the response pathway without unnecessary data collection."
                corrective="Reporting counts does not unblock follow-up, and personal files collect too much. Choose the pathway strengthening option (Option B)."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 2, responseFeedback: 'idle' })}>← Back</button>}
                primary={saved.responseFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 4 })}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={!saved.selectedResponse || saved.responseFeedback === 'corrective'}
                    onClick={() => save({ ...saved, responseFeedback: responseCorrect ? 'correct' : 'corrective' })}
                  >
                    Check response
                  </button>
                )}
              />
              {saved.responseFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, responseFeedback: 'idle' })}>Revise response</button>
              )}
            </section>
          )}

          {stage === 4 && (
            <section className="m4-b2-stage" aria-labelledby="m4-b3-prepnote-heading">
              <p className="m4-enhanced-kicker">Stage 4</p>
              <h2 id="m4-b3-prepnote-heading">Prepare the note</h2>
              <div className="m4-b3-questions-block">
                <CheckGrid
                  legend="1. What should the note say Awra will improve?"
                  values={saved.improveFields}
                  disabled={saved.noteFeedback === 'correct'}
                  options={[
                    ['owner', 'response-owner field'],
                    ['explanation', 'explanation-back field'],
                    ['follow_up', 'follow-up check field'],
                    ['histories', 'collect full personal histories'],
                  ]}
                  onChange={(improveFields) => save({ ...saved, improveFields, noteFeedback: 'idle', noteSaved: false })}
                />

                <fieldset className="m4-b3-radio-group">
                  <legend>2. What limitation should be noted?</legend>
                  <label><input type="radio" name="lim" checked={saved.limitation === 'loop_completed'} disabled={saved.noteFeedback === 'correct'} onChange={() => save({ ...saved, limitation: 'loop_completed', noteFeedback: 'idle', noteSaved: false })} /><span>The current evidence does not yet show whether the loop was completed.</span></label>
                  <label><input type="radio" name="lim" checked={saved.limitation === 'no_concerns'} disabled={saved.noteFeedback === 'correct'} onChange={() => save({ ...saved, limitation: 'no_concerns', noteFeedback: 'idle', noteSaved: false })} /><span>The project had no feedback concerns.</span></label>
                  <label><input type="radio" name="lim" checked={saved.limitation === 'every_resolved'} disabled={saved.noteFeedback === 'correct'} onChange={() => save({ ...saved, limitation: 'every_resolved', noteFeedback: 'idle', noteSaved: false })} /><span>Every concern was resolved.</span></label>
                </fieldset>

                <CheckGrid
                  legend="3. What should happen next?"
                  values={saved.nextSteps}
                  disabled={saved.noteFeedback === 'correct'}
                  options={[
                    ['review_updated', 'review the updated log against the evidence line'],
                    ['explain_group', 'explain the improvement to relevant groups'],
                    ['publish_names', 'publish names of people who raised concerns'],
                    ['unnecessary_detail', 'collect unnecessary extra detail first'],
                  ]}
                  onChange={(nextSteps) => save({ ...saved, nextSteps, noteFeedback: 'idle', noteSaved: false })}
                />
              </div>
              <Feedback
                state={saved.noteFeedback}
                success="Information-use note compiled."
                corrective="Specify the three missing fields, identify the loop completion limitation, and commit to log review and community account-back."
              />
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 3, noteFeedback: 'idle' })}>← Back</button>}
                primary={saved.noteFeedback === 'correct' ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => save({ ...saved, activeStage: 5 })}>Review note →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={saved.improveFields.length === 0 || !saved.limitation || saved.nextSteps.length === 0 || saved.noteFeedback === 'corrective'}
                    onClick={() => save({ ...saved, noteFeedback: noteCorrect ? 'correct' : 'corrective' })}
                  >
                    Check note
                  </button>
                )}
              />
              {saved.noteFeedback === 'corrective' && (
                <button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, noteFeedback: 'idle' })}>Revise note options</button>
              )}
            </section>
          )}

          {stage === 5 && (
            <section className="m4-b2-summary" aria-labelledby="m4-b3-info-summary">
              <span className="m4-b2-summary__icon" aria-hidden="true">✓</span>
              <div>
                <h2 id="m4-b3-info-summary">Information-Use Note</h2>
                <div className="m4-b3-matrix-container">
                  <table className="m4-b3-matrix-table">
                    <tbody>
                      <tr>
                        <td><strong>Evidence line</strong></td>
                        <td>Track whether each concern was reviewed, assigned a response owner, explained back and followed up.</td>
                      </tr>
                      <tr>
                        <td><strong>Minimum needed information</strong></td>
                        <td>Use response-pathway information that supports action and follow-up without collecting unnecessary personal detail.</td>
                      </tr>
                      <tr>
                        <td><strong>Implementation response</strong></td>
                        <td>Strengthen the log by adding response-owner, explanation-back and follow-up fields, then review the updated log against the evidence line.</td>
                      </tr>
                      <tr>
                        <td><strong>Limitation</strong></td>
                        <td>The current evidence can show whether the response pathway was completed, but not whether every concern was fully resolved.</td>
                      </tr>
                      <tr>
                        <td><strong>Next step</strong></td>
                        <td>Review the improved response log and explain the strengthened process to relevant groups.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p><em>Prepared for your Implementation Decision and Follow-Up Note.</em></p>
              </div>
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button is-secondary" onClick={() => save({ ...saved, activeStage: 1, noteSaved: false })}>Revise note</button>}
                primary={readyToContinue ? (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={() => completeScreen('M4-S1-11', onChangeState, readyToContinue)}>Continue →</button>
                ) : (
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    onClick={reviewRequired
                      ? () => save({ ...saved, activeStage: 1, noteSaved: false })
                      : recordNote}
                  >
                    {reviewRequired ? 'Review and reconfirm' : 'Save note'}
                  </button>
                )}
              />
            </section>
          )}
        </>
      )}
      status={stage === 5 ? 'Information-use note saved.' : `Stage ${stage} of 4. Prepare the note to continue.`}
    />
  );
}

export default function Module4EnhancedBatch3(props: Props) {
  if (props.screenId === 'M4-S1-08') return <RolesScreen {...props} />;
  if (props.screenId === 'M4-S1-09') return <SupportScreen {...props} />;
  if (props.screenId === 'M4-S1-10') return <PathwaysScreen {...props} />;
  if (props.screenId === 'M4-S1-11') return <InformationScreen {...props} />;
  return null;
}
