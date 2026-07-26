import { useState } from 'react';
import type { LearningState } from '../../../state/learningState';
import {
  migrateModule4EnhancedState,
  recordModule4EnhancedScreenCompletion,
  type Module4EnhancedState,
  type Module4ImplementationNote,
} from '../../../data/module4/module4EnhancedModel';
import {
  MODULE4_NOTE_LABELS,
  MODULE4_PRACTICE_INSIGHTS,
  affectedImplementationNoteSections,
  assembleImplementationDecisionNote,
  canContinueFromImplementationNote,
  isImplementationDecisionNoteComplete,
  missingImplementationNoteFields,
  normalizeImplementationNote,
  saveImplementationDecisionNote,
  type CompleteModule4ImplementationNote,
  type Module4NoteField,
  type Module4NoteSection,
} from '../../../data/module4/module4EnhancedBatch4Rules';
import {
  Module4EnhancedActionBar,
  Module4EnhancedScreenFrame,
  Module4EnhancedStageList,
} from './Module4EnhancedFoundation';

type Props = {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
};

const EDITABLE_ESSENTIALS = [
  'followUpQuestion',
  'responsibleActor',
  'reviewPoint',
] as const satisfies readonly Module4NoteField[];

const FIELD_HINTS: Readonly<Record<Module4NoteField, string>> = {
  concern: 'State the implementation concern in one short sentence.',
  evidence: 'Summarize what is confirmed and what still needs checking.',
  affectedPeople: 'Name the group affected or at risk of exclusion; do not use personal names.',
  response: 'State the chosen rights-based response.',
  rolesAndInclusion: 'Separate Awra’s role from the responsible actor’s role.',
  participationAction: 'State the practical inclusion or participation action.',
  accountBack: 'State how the decision will be explained back.',
  followUpQuestion: 'What must the follow-up confirm?',
  responsibleActor: 'Who owns the next action?',
  reviewPoint: 'When or at what point will progress be reviewed?',
};

function currentEnhancedState(state: LearningState): Module4EnhancedState {
  const migration = migrateModule4EnhancedState({
    practiceCheckState: state.practiceCheckState,
    screenProgress: state.screenProgress,
    completedModules: state.completedModules,
  });
  return migration.practiceCheckState.module4Enhanced as Module4EnhancedState;
}

function hasSavedNote(enhanced: Module4EnhancedState) {
  return isImplementationDecisionNoteComplete(enhanced.fields.implementationDecisionNote.value)
    && Boolean(enhanced.fields.implementationDecisionNote.updatedAt);
}

function noteSignature(note: Module4ImplementationNote) {
  return JSON.stringify(normalizeImplementationNote(note));
}

function SummaryCards({
  note,
  affected,
  learnerEdited,
}: {
  note: CompleteModule4ImplementationNote;
  affected: readonly Module4NoteField[];
  learnerEdited: readonly Module4NoteField[];
}) {
  const groups: Array<{ title: string; fields: Module4NoteField[] }> = [
    { title: 'Confirmed information', fields: ['concern', 'evidence', 'affectedPeople'] },
    { title: 'Decision', fields: ['response'] },
    { title: 'Responsibility', fields: ['rolesAndInclusion', 'responsibleActor'] },
    { title: 'Inclusion and participation', fields: ['participationAction'] },
    { title: 'Account-back', fields: ['accountBack'] },
    { title: 'Follow-up and review', fields: ['followUpQuestion', 'reviewPoint'] },
  ];

  return (
    <div className="m4-b4-note-sections">
      {groups.map((group) => {
        const needsReview = group.fields.some((field) => affected.includes(field));
        return (
          <section
            key={group.title}
            className={['m4-b4-note-section', needsReview ? 'needs-review' : ''].filter(Boolean).join(' ')}
          >
            <header>
              <h3>{group.title}</h3>
              {needsReview && <span className="m4-b4-review-chip">Needs review</span>}
            </header>
            <dl>
              {group.fields.map((field) => (
                <div key={field}>
                  <dt>
                    <span>{MODULE4_NOTE_LABELS[field]}</span>
                    <span className={[
                      'm4-b4-provenance',
                      affected.includes(field) ? 'needs-review' : '',
                    ].filter(Boolean).join(' ')}>
                      {affected.includes(field)
                        ? 'Needs review'
                        : learnerEdited.includes(field)
                          ? 'Learner edited'
                          : 'Carried forward'}
                    </span>
                  </dt>
                  <dd>{note[field] || <span className="m4-b4-missing">Missing essential</span>}</dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}
    </div>
  );
}

function PracticeInsights({ affected }: { affected: readonly Module4NoteSection[] }) {
  return (
    <section className="m4-b4-practice-insights" aria-labelledby="m4-b4-practice-title">
      <header>
        <p className="m4-enhanced-kicker">Practice insights</p>
        <h3 id="m4-b4-practice-title">Lessons kept separate from your main note</h3>
      </header>
      <p>These examples inform practice but are not facts about your selected workstream.</p>
      <div>
        {MODULE4_PRACTICE_INSIGHTS.map((insight) => {
          const needsReview = affected.includes(insight.section);
          return (
            <article key={insight.section} className={needsReview ? 'needs-review' : ''}>
              <h4>{insight.label}</h4>
              <span className={['m4-b4-provenance', needsReview ? 'needs-review' : ''].filter(Boolean).join(' ')}>
                {needsReview ? 'Needs review' : 'Practice insight'}
              </span>
              <p>{insight.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function Module4EnhancedBatch4({ state, onChangeState }: Props) {
  const enhanced = currentEnhancedState(state);
  const field = enhanced.fields.implementationDecisionNote;
  const assembled = assembleImplementationDecisionNote(enhanced);
  const savedExists = hasSavedNote(enhanced);
  const initialNote = savedExists ? normalizeImplementationNote(field.value) : assembled;
  const [draft, setDraft] = useState<CompleteModule4ImplementationNote>(initialNote);
  const [stage, setStage] = useState<1 | 2 | 3>(
    savedExists && !field.reviewRequired && Boolean(field.sectionDependencyRevisions) ? 3 : 1,
  );
  const [confirmed, setConfirmed] = useState(
    savedExists && !field.reviewRequired && Boolean(field.sectionDependencyRevisions),
  );
  const [savedSignature, setSavedSignature] = useState(
    savedExists && !field.reviewRequired && field.sectionDependencyRevisions
      ? noteSignature(field.value)
      : '',
  );
  const [learnerEdited, setLearnerEdited] = useState<Module4NoteField[]>(
    field.learnerEditedSections?.filter(
      (key): key is Module4NoteField => (MODULE4_NOTE_LABELS as Record<string, string>)[key] !== undefined,
    ) || (savedExists ? [...EDITABLE_ESSENTIALS] : []),
  );
  const [resolvedSections, setResolvedSections] = useState<Module4NoteSection[]>([]);
  const [stage2EditableFields, setStage2EditableFields] = useState<Module4NoteField[] | null>(null);
  const missing = missingImplementationNoteFields(draft);
  const affected = affectedImplementationNoteSections(enhanced);
  const affectedNoteFields = affected.filter(
    (section): section is Module4NoteField =>
      (MODULE4_NOTE_LABELS as Record<string, string>)[section] !== undefined,
  );
  const unresolvedAffected = affected.filter((section) => !resolvedSections.includes(section));
  const needsReview = field.reviewRequired || affected.length > 0;
  const currentEditableFields = [...new Set<Module4NoteField>([
    ...EDITABLE_ESSENTIALS,
    ...missing,
  ])];
  const complete = isImplementationDecisionNoteComplete(draft);
  const savedCurrent = savedSignature === noteSignature(draft)
    && canContinueFromImplementationNote(enhanced, draft);

  const updateDraft = (key: Module4NoteField, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setLearnerEdited((current) => current.includes(key) ? current : [...current, key]);
    setConfirmed(false);
    setSavedSignature('');
  };

  const refreshAffectedSections = () => {
    setDraft((current) => {
      const refreshed = { ...current };
      affectedNoteFields.forEach((key) => {
        refreshed[key] = assembled[key];
      });
      return refreshed;
    });
    setLearnerEdited((current) => current.filter((key) => !affectedNoteFields.includes(key)));
    setResolvedSections(affected);
    setStage2EditableFields(null);
    setConfirmed(false);
    setSavedSignature('');
  };

  const enterStage2 = () => {
    setStage2EditableFields(currentEditableFields);
    setStage(2);
  };

  const leaveStage2 = (nextStage: 1 | 3) => {
    setStage2EditableFields(null);
    setStage(nextStage);
  };

  const saveNote = () => {
    if (!complete || !confirmed) return;
    const signature = noteSignature(draft);
    onChangeState((prev) => {
      const migrated = migrateModule4EnhancedState({
        practiceCheckState: prev.practiceCheckState,
        screenProgress: prev.screenProgress,
        completedModules: prev.completedModules,
      });
      const current = migrated.practiceCheckState.module4Enhanced as Module4EnhancedState;
      const updated = saveImplementationDecisionNote(current, draft, {
        learnerEditedSections: learnerEdited,
        resolvedSections,
      });
      return {
        ...prev,
        practiceCheckState: {
          ...migrated.practiceCheckState,
          module4Enhanced: updated,
        },
      };
    });
    setSavedSignature(signature);
  };

  const continueToKnowledgeCheck = () => {
    if (!savedCurrent) return;
    onChangeState((prev) => {
      const migrated = migrateModule4EnhancedState({
        practiceCheckState: prev.practiceCheckState,
        screenProgress: prev.screenProgress,
        completedModules: prev.completedModules,
      });
      const current = migrated.practiceCheckState.module4Enhanced as Module4EnhancedState;
      const completed = recordModule4EnhancedScreenCompletion(
        { screenProgress: prev.screenProgress, module4Enhanced: current },
        'M4-S1-12',
        canContinueFromImplementationNote(current, draft),
      );
      return {
        ...prev,
        currentScreenId: 'M4-S1-13',
        screenProgress: completed.screenProgress,
        practiceCheckState: {
          ...migrated.practiceCheckState,
          module4Enhanced: completed.module4Enhanced,
        },
      };
    });
  };

  const status = needsReview
    ? 'The saved note needs review. Continue remains blocked until you reconfirm and save it.'
    : savedCurrent
      ? 'Implementation Decision and Follow-Up Note saved. Continue is ready.'
      : stage === 3
        ? 'Confirm and save the final note before continuing.'
        : 'Review the carried-forward decisions and complete only missing essentials.';

  return (
    <Module4EnhancedScreenFrame
      className="m4-enhanced-screen--batch4"
      titleId="m4-b4-note-title"
      eyebrow="Module 4 · Screen 13"
      title="Implementation Decision and Follow-Up Note"
      introduction={(
        <p>Bring your decisions together into one concise note that can guide action, accountability and follow-up.</p>
      )}
      context={(
        <>
          <p className="m4-enhanced-kicker">Your synthesis</p>
          <h2>One usable implementation note</h2>
          <p>Review what you already decided. Add only missing essentials, then explicitly confirm the final note.</p>
          <Module4EnhancedStageList
            label="Implementation note stages"
            activeStage={String(stage)}
            stages={[
              { id: '1', label: 'Review assembled note', complete: stage > 1 },
              { id: '2', label: 'Complete essentials', complete: stage > 2 },
              { id: '3', label: 'Confirm and save', complete: savedCurrent },
            ]}
          />
          <div className="m4-b4-safety-note">
            <strong>Keep it safe and concise.</strong>
            <span>Do not include personal names, contact details, complaint details or unsupported accusations.</span>
          </div>
        </>
      )}
      activity={(
        <>
          {needsReview && (
            <div className="m4-b4-review-alert" role="alert">
              <strong>Needs review</strong>
              <p>
                An upstream decision changed. Your saved wording is preserved. Refresh every marked carried-forward section before reconfirming.
              </p>
              {affected.length > 0 && (
                <p>
                  {unresolvedAffected.length > 0
                    ? `${unresolvedAffected.length} affected ${unresolvedAffected.length === 1 ? 'section remains' : 'sections remain'} unresolved.`
                    : 'All affected sections have been refreshed and are ready for reconfirmation.'}
                </p>
              )}
            </div>
          )}

          {stage === 1 && (
            <section aria-labelledby="m4-b4-stage1-title">
              <p className="m4-enhanced-kicker">Stage 1 of 3</p>
              <h2 id="m4-b4-stage1-title">Review the assembled note</h2>
              <p>These sections carry forward the decisions recorded across Screens 5–12.</p>
              <SummaryCards note={draft} affected={affectedNoteFields} learnerEdited={learnerEdited} />
              <PracticeInsights affected={affected} />
              <Module4EnhancedActionBar
                secondary={affected.length > 0 && (
                  <button type="button" className="m4-enhanced-button" onClick={refreshAffectedSections}>
                    Refresh carried-forward sections
                  </button>
                )}
                primary={(
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={unresolvedAffected.length > 0}
                    onClick={enterStage2}
                  >
                    Complete essentials
                  </button>
                )}
              />
            </section>
          )}

          {stage === 2 && (
            <section aria-labelledby="m4-b4-stage2-title">
              <p className="m4-enhanced-kicker">Stage 2 of 3</p>
              <h2 id="m4-b4-stage2-title">Complete only missing essentials</h2>
              <p>Most decisions are already assembled. Keep these final details brief and practical.</p>
              <div className="m4-b4-edit-list">
                {(stage2EditableFields || currentEditableFields).map((key) => (
                  <label key={key} className={missing.includes(key) ? 'is-missing' : ''}>
                    <span>{MODULE4_NOTE_LABELS[key]}</span>
                    <span className="m4-b4-field-hint">{FIELD_HINTS[key]}</span>
                    <textarea
                      value={draft[key]}
                      maxLength={240}
                      rows={2}
                      required
                      aria-invalid={missing.includes(key)}
                      onChange={(event) => updateDraft(key, event.target.value)}
                    />
                    <span className="m4-b4-character-count">{draft[key].length}/240</span>
                  </label>
                ))}
              </div>
              {missing.length > 0 && (
                <p className="m4-b4-corrective" role="status">
                  Complete {missing.length} missing {missing.length === 1 ? 'essential' : 'essentials'} before reviewing the final note.
                </p>
              )}
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button" onClick={() => leaveStage2(1)}>Back to assembled note</button>}
                primary={<button type="button" className="m4-enhanced-button is-primary" disabled={!complete} onClick={() => leaveStage2(3)}>Review final note</button>}
              />
            </section>
          )}

          {stage === 3 && (
            <section aria-labelledby="m4-b4-stage3-title">
              <p className="m4-enhanced-kicker">Stage 3 of 3</p>
              <h2 id="m4-b4-stage3-title">Confirm and save</h2>
              <div className="m4-b4-final-note">
                <header>
                  <p className="m4-enhanced-kicker">Final output</p>
                  <h3>Implementation Decision and Follow-Up Note</h3>
                </header>
                <SummaryCards note={draft} affected={[]} learnerEdited={learnerEdited} />
                <PracticeInsights affected={[]} />
              </div>
              <label className="m4-b4-confirmation">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(event) => {
                    setConfirmed(event.target.checked);
                    setSavedSignature('');
                  }}
                />
                <span>I confirm that this note reflects the decisions reviewed and is safe to use for implementation follow-up.</span>
              </label>
              <Module4EnhancedActionBar
                secondary={<button type="button" className="m4-enhanced-button" onClick={() => { enterStage2(); setConfirmed(false); setSavedSignature(''); }}>Make limited edits</button>}
                primary={(
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={!confirmed || !complete || unresolvedAffected.length > 0}
                    onClick={saveNote}
                  >
                    {needsReview ? 'Reconfirm and save note' : 'Save note'}
                  </button>
                )}
              />
              <div className="m4-b4-final-gate">
                <p aria-live="polite">{savedCurrent ? 'Saved and ready to continue.' : 'Saving the note does not record screen progress. Use Continue after the final validation.'}</p>
                {savedCurrent && (
                  <button type="button" className="m4-enhanced-button is-primary" onClick={continueToKnowledgeCheck}>
                    Continue
                  </button>
                )}
              </div>
            </section>
          )}
        </>
      )}
      status={status}
    />
  );
}
