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
  affectedImplementationNoteSections,
  assembleImplementationDecisionNote,
  canContinueFromImplementationNote,
  isImplementationDecisionNoteComplete,
  missingImplementationNoteFields,
  normalizeImplementationNote,
  saveImplementationDecisionNote,
  type CompleteModule4ImplementationNote,
  type Module4NoteField,
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
}: {
  note: CompleteModule4ImplementationNote;
  affected: readonly Module4NoteField[];
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
                  <dt>{MODULE4_NOTE_LABELS[field]}</dt>
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

export default function Module4EnhancedBatch4({ state, onChangeState }: Props) {
  const enhanced = currentEnhancedState(state);
  const field = enhanced.fields.implementationDecisionNote;
  const assembled = assembleImplementationDecisionNote(enhanced);
  const savedExists = hasSavedNote(enhanced);
  const initialNote = savedExists ? normalizeImplementationNote(field.value) : assembled;
  const [draft, setDraft] = useState<CompleteModule4ImplementationNote>(initialNote);
  const [stage, setStage] = useState<1 | 2 | 3>(
    savedExists && !field.reviewRequired ? 3 : 1,
  );
  const [confirmed, setConfirmed] = useState(savedExists && !field.reviewRequired);
  const [savedSignature, setSavedSignature] = useState(
    savedExists && !field.reviewRequired ? noteSignature(field.value) : '',
  );
  const missing = missingImplementationNoteFields(draft);
  const affected = affectedImplementationNoteSections(enhanced, field.value);
  const editableFields = [...new Set<Module4NoteField>([
    ...EDITABLE_ESSENTIALS,
    ...missing,
  ])];
  const complete = isImplementationDecisionNoteComplete(draft);
  const savedCurrent = savedSignature === noteSignature(draft)
    && canContinueFromImplementationNote(enhanced, draft);

  const updateDraft = (key: Module4NoteField, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setConfirmed(false);
    setSavedSignature('');
  };

  const restoreCarriedForward = () => {
    setDraft((current) => ({
      ...assembled,
      followUpQuestion: current.followUpQuestion || assembled.followUpQuestion,
      responsibleActor: current.responsibleActor || assembled.responsibleActor,
      reviewPoint: current.reviewPoint || assembled.reviewPoint,
    }));
    setConfirmed(false);
    setSavedSignature('');
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
      const updated = saveImplementationDecisionNote(current, draft);
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

  const status = field.reviewRequired
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
          {field.reviewRequired && (
            <div className="m4-b4-review-alert" role="alert">
              <strong>Needs review</strong>
              <p>
                An upstream decision changed. Your saved wording is preserved; review the marked sections and reconfirm the note.
              </p>
              {affected.length > 0 && (
                <p>Affected sections: {affected.map((key) => MODULE4_NOTE_LABELS[key]).join('; ')}.</p>
              )}
            </div>
          )}

          {stage === 1 && (
            <section aria-labelledby="m4-b4-stage1-title">
              <p className="m4-enhanced-kicker">Stage 1 of 3</p>
              <h2 id="m4-b4-stage1-title">Review the assembled note</h2>
              <p>These sections carry forward the decisions recorded across Screens 5–12.</p>
              <SummaryCards note={draft} affected={affected} />
              <Module4EnhancedActionBar
                secondary={savedExists && <button type="button" className="m4-enhanced-button" onClick={restoreCarriedForward}>Refresh carried-forward sections</button>}
                primary={<button type="button" className="m4-enhanced-button is-primary" onClick={() => setStage(2)}>Complete essentials</button>}
              />
            </section>
          )}

          {stage === 2 && (
            <section aria-labelledby="m4-b4-stage2-title">
              <p className="m4-enhanced-kicker">Stage 2 of 3</p>
              <h2 id="m4-b4-stage2-title">Complete only missing essentials</h2>
              <p>Most decisions are already assembled. Keep these final details brief and practical.</p>
              <div className="m4-b4-edit-list">
                {editableFields.map((key) => (
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
                secondary={<button type="button" className="m4-enhanced-button" onClick={() => setStage(1)}>Back to assembled note</button>}
                primary={<button type="button" className="m4-enhanced-button is-primary" disabled={!complete} onClick={() => setStage(3)}>Review final note</button>}
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
                <SummaryCards note={draft} affected={[]} />
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
                secondary={<button type="button" className="m4-enhanced-button" onClick={() => { setStage(2); setConfirmed(false); setSavedSignature(''); }}>Make limited edits</button>}
                primary={(
                  <button
                    type="button"
                    className="m4-enhanced-button is-primary"
                    disabled={!confirmed || !complete}
                    onClick={saveNote}
                  >
                    {field.reviewRequired ? 'Reconfirm and save note' : 'Save note'}
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
