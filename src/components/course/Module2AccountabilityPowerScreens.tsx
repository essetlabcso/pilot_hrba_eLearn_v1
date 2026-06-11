import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { LearningState } from '../../state/learningState';

type Props = {
  state: LearningState;
  onChangeState: (updater: (prev: LearningState) => LearningState) => void;
};

type Choice = {
  id: string;
  text: string;
  feedback: string;
  status: string;
};

type SortItem = {
  id: string;
  text: string;
  correct: string;
  feedback: string;
};

type RevealCard = {
  id: string;
  title: string;
  text: string;
  detail?: string;
  tag?: string;
};

type JourneyStage = {
  id: string;
  label: string;
  scenario: string;
  correctClassification: string;
  feedback: string;
  correctAdjustment: string;
  adjustments: string[];
};

const MODULE_ID = 'module_02_everyday_cso_work';

function addUnique(values: string[], value: string) {
  return values.includes(value) ? values : [...values, value];
}

function useInitial<T>(factory: () => T) {
  const [value] = useState(factory);
  return value;
}

function markCompleteAndNavigate(
  stateKey: string,
  screenId: string,
  nextScreenId: string,
  nextRoute: string,
  onChangeState: Props['onChangeState'],
  data: Record<string, unknown>,
) {
  const completedAt = new Date().toISOString();
  onChangeState((prev) => {
    const moduleProgress = new Set(prev.screenProgress[MODULE_ID] || []);
    moduleProgress.add(screenId);
    return {
      ...prev,
      currentScreenId: nextScreenId,
      screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(moduleProgress) },
      practiceCheckState: {
        ...prev.practiceCheckState,
        [stateKey]: {
          ...data,
          screenId,
          completionStatus: 'completed',
          completedAt,
        },
      },
    };
  });
  if (typeof window !== 'undefined') window.history.pushState(null, '', nextRoute);
}

function Header({
  title,
  context,
  children,
  statement,
  id,
}: {
  title: string;
  context: string;
  children: ReactNode;
  statement: string;
  id: string;
}) {
  return (
    <header className="m2-s32-hero">
      <div>
        <p className="m2-s32-context">{context}</p>
        <h1 id={id}>{title}</h1>
        <div className="m2-s32-opening">{children}</div>
      </div>
      <article className="m2-s32-statement">{statement}</article>
    </header>
  );
}

function StoryCard({ title, children, footer }: { title: string; children: ReactNode; footer: string }) {
  return (
    <section className="m2-s32-story">
      <p className="m2-s32-kicker">Story continuity</p>
      <h2>{title}</h2>
      {children}
      <p className="m2-s32-card-footer">{footer}</p>
    </section>
  );
}

function SectionHead({ kicker, title, text, progress }: { kicker: string; title: string; text?: string; progress?: string }) {
  return (
    <div className="m2-s32-section-head">
      <div>
        <p className="m2-s32-kicker">{kicker}</p>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {progress && <p className="m2-s32-progress">{progress}</p>}
    </div>
  );
}

function RevealGrid({
  kicker,
  title,
  text,
  cards,
  openedIds,
  onOpen,
  progressLabel = 'opened',
  className = 'm2-s32-airlock',
}: {
  kicker: string;
  title: string;
  text?: string;
  cards: RevealCard[];
  openedIds: string[];
  onOpen: (id: string) => void;
  progressLabel?: string;
  className?: string;
}) {
  return (
    <section className={className}>
      <SectionHead kicker={kicker} title={title} text={text} progress={`${openedIds.length} of ${cards.length} ${progressLabel}`} />
      <div className="m2-s32-airlock-grid">
        {cards.map((card, index) => {
          const opened = openedIds.includes(card.id);
          return (
            <button
              key={card.id}
              type="button"
              className={`m2-s32-gate ${opened ? 'is-opened' : ''}`}
              onClick={() => onOpen(card.id)}
              aria-expanded={opened}
            >
              <span>{opened ? '✓' : index + 1}</span>
              <strong>{card.title}</strong>
              {opened ? (
                <>
                  <em>{card.text}</em>
                  {card.detail && <small>{card.detail}</small>}
                  {card.tag && <small>{card.tag}</small>}
                </>
              ) : (
                <em>Open this point.</em>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function MatchingActivity({
  title,
  instruction,
  items,
  categories,
  selections,
  onSelect,
  feedback,
}: {
  title: string;
  instruction: string;
  items: SortItem[];
  categories: string[];
  selections: Record<string, string>;
  onSelect: (id: string, category: string) => void;
  feedback: string;
}) {
  const complete = items.every((item) => selections[item.id]);
  return (
    <section className="m2-s34-activity">
      <SectionHead kicker="Practice activity" title={title} text={instruction} progress={`${Object.keys(selections).length} of ${items.length} matched`} />
      <div className="m2-s34-classify-grid">
        {items.map((item) => {
          const selected = selections[item.id];
          return (
            <article key={item.id} className={`m2-s34-classify-card ${selected ? 'is-completed' : ''}`}>
              <p>{item.text}</p>
              <div>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    disabled={Boolean(selected)}
                    onClick={() => onSelect(item.id, category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {selected && <span>{selected}</span>}
            </article>
          );
        })}
      </div>
      <div className="m2-s34-feedback" aria-live="polite">
        {complete ? feedback : 'Match each item to the strongest category. Incorrect choices are corrected with feedback for learning.'}
      </div>
    </section>
  );
}

function ReflectionPrompt({
  title,
  text,
  options,
  selected,
  onSelect,
}: {
  title: string;
  text: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <section className="m2-s35-reflection">
      <p className="m2-s35-kicker">Private reflection prompt</p>
      <h2>{title}</h2>
      <p>{text}</p>
      <fieldset className="m2-s35-reflection-grid">
        <legend className="sr-only">{title}</legend>
        {options.map((option) => (
          <label key={option} className={selected === option ? 'is-selected' : ''}>
            <input type="radio" name={title} checked={selected === option} onChange={() => onSelect(option)} />
            <span>{option}</span>
          </label>
        ))}
      </fieldset>
      {selected && (
        <div className="m2-s35-feedback" aria-live="polite">
          Any of these can be part of the issue. The important habit is to use the choice as a practical review prompt.
        </div>
      )}
    </section>
  );
}

function DecisionScenario({
  title,
  prompt,
  choices,
  correctId,
  selectedId,
  attempts,
  completed,
  name,
  onSelect,
  onRetry,
}: {
  title: string;
  prompt: string;
  choices: Choice[];
  correctId: string;
  selectedId: string;
  attempts: number;
  completed: boolean;
  name: string;
  onSelect: (id: string) => void;
  onRetry: () => void;
}) {
  const selected = choices.find((choice) => choice.id === selectedId);
  return (
    <section className="m2-s32-decision">
      <p className="m2-s32-kicker">Mini decision</p>
      <h2>{title}</h2>
      <p>{prompt}</p>
      <fieldset className="m2-s32-choice-grid">
        <legend className="sr-only">{title}</legend>
        {choices.map((choice) => {
          const isSelected = selectedId === choice.id;
          const locked = completed || Boolean(selectedId);
          return (
            <label key={choice.id} className={`m2-s32-choice-card ${isSelected ? 'is-selected' : ''}`}>
              <input
                type="radio"
                name={name}
                checked={isSelected}
                disabled={locked}
                onChange={() => onSelect(choice.id)}
              />
              <span>Choice {choice.id}</span>
              <strong>{choice.text}</strong>
            </label>
          );
        })}
      </fieldset>
      {selected && (
        <div className="m2-s32-feedback" aria-live="polite">
          <p className="m2-s32-kicker">{selected.status}</p>
          <p>{selected.feedback}</p>
          {selected.id !== correctId && attempts < 2 && (
            <button type="button" onClick={onRetry}>Try one more answer</button>
          )}
        </div>
      )}
    </section>
  );
}

function ContinueFooter({
  insight,
  nextText,
  buttonText,
  disabledText,
  ready,
  onClick,
  screenComplete,
}: {
  insight: string;
  nextText: string;
  buttonText: string;
  disabledText: string;
  ready: boolean;
  onClick: () => void;
  screenComplete: boolean;
}) {
  return (
    <footer className="m2-s32-footer">
      <div>
        <p>{insight}</p>
        <p>{nextText}</p>
      </div>
      <button type="button" className="m2-s32-cta" disabled={!ready} onClick={onClick}>
        {buttonText}
      </button>
      <p className="m2-s32-completion-note" aria-live="polite">
        {ready ? 'Ready to continue.' : disabledText}
      </p>
      {screenComplete && <span className="sr-only">Screen complete.</span>}
    </footer>
  );
}

const loopStages: RevealCard[] = [
  {
    id: 'inform',
    title: 'Inform',
    text: 'People need clear, understandable information about what can be raised, how to raise it, who will see it, confidentiality, realistic response, and timing.',
    detail: 'Weak point if missing: people may stay silent because they do not know the process or do not trust it.',
  },
  {
    id: 'listen',
    title: 'Listen',
    text: 'The process must create real ways for people to raise concerns, questions, or disagreements in ways different people can actually use.',
    detail: 'Weak point if missing: only confident or well-positioned people may feel able to use the channel.',
  },
  {
    id: 'analyze',
    title: 'Analyze',
    text: 'Feedback should be reviewed for patterns and understood as immediate issues, structural issues, or issues needing referral.',
    detail: 'Weak point if missing: the organization may collect feedback but fail to understand what it means.',
  },
  {
    id: 'respond',
    title: 'Respond',
    text: 'People need a respectful, clear, and proportionate response, even when the answer is not immediate or not what they hoped for.',
    detail: 'Weak point if missing: when people speak but hear nothing back, trust drops quickly.',
  },
  {
    id: 'follow-up',
    title: 'Follow up',
    text: 'Accountability includes checking whether the response helped, whether the issue remains, and whether people feel safer and clearer afterward.',
    detail: 'Weak point if missing: the issue may be marked resolved on paper while remaining unresolved in practice.',
  },
  {
    id: 'learn-adapt',
    title: 'Learn and adapt',
    text: 'Repeated concerns should change practice through clearer facilitation, better information, safer meetings, fairer roles, or better referral systems.',
    detail: 'Weak point if missing: the same issue repeats because nothing changes.',
  },
];

const loopDiagnosisItems: SortItem[] = [
  {
    id: 'valid-concerns',
    text: 'Members are not sure whether concerns about role allocation are valid enough to raise.',
    correct: 'Inform',
    feedback: 'People need clear information about what kinds of concerns can be raised and how.',
  },
  {
    id: 'fear-difficult',
    text: 'Quieter members fear that raising concerns will make them look difficult.',
    correct: 'Listen',
    feedback: 'A listening channel exists only if people can actually use it safely.',
  },
  {
    id: 'no-pattern-review',
    text: 'Several small concerns have been mentioned over time, but no one has reviewed whether they show a pattern.',
    correct: 'Analyze',
    feedback: 'Accountability weakens when repeated concerns are not examined as a pattern.',
  },
  {
    id: 'no-response',
    text: 'A member raised a concern privately, but never heard anything back.',
    correct: 'Respond',
    feedback: 'Without response, people lose trust in the process.',
  },
  {
    id: 'no-check',
    text: 'The facilitator gave an answer once, but never checked whether the issue improved afterward.',
    correct: 'Follow up',
    feedback: 'Accountability includes checking whether the response actually helped.',
  },
  {
    id: 'repeating-format',
    text: 'The same concern keeps appearing in different meetings, but the meeting format has not changed.',
    correct: 'Learn and adapt',
    feedback: 'Repeated concerns should lead to changes in process or practice.',
  },
];

const accountabilityHotspots: RevealCard[] = [
  {
    id: 'agenda-board',
    title: 'Agenda board',
    text: 'The agenda now includes a short section called “Questions, concerns, and decisions needing follow-up.”',
    detail: 'This strengthens visibility and makes accountability more normal and legitimate.',
  },
  {
    id: 'explanation-card',
    title: 'Explanation card',
    text: 'A simple note explains what kinds of concerns can be raised and who will respond.',
    detail: 'This strengthens the Inform stage.',
  },
  {
    id: 'small-groups',
    title: 'Small-group seating',
    text: 'The facilitator begins with small-group discussion before plenary sharing.',
    detail: 'This may strengthen Listen by making it easier for less confident members to speak.',
  },
  {
    id: 'response-board',
    title: 'Response board',
    text: 'The facilitator shares three issues raised previously, what was done, what could not yet be changed, and why.',
    detail: 'This strengthens Respond and Follow up.',
  },
  {
    id: 'role-rotation',
    title: 'Role rotation note',
    text: 'The cooperative agrees to test a transparent rotation system for representation and meeting roles.',
    detail: 'This shows Learn and adapt.',
  },
];

const accountabilityChecklist: RevealCard[] = [
  {
    id: 'know-what',
    title: 'Do people know what can be raised?',
    text: 'If people do not understand what the channel is for, accountability remains unclear and underused.',
  },
  {
    id: 'safe-use',
    title: 'Can different people use the process safely?',
    text: 'A process is weaker if only confident, powerful, or well-connected people can use it without fear.',
  },
  {
    id: 'pathway',
    title: 'Is there a clear response pathway?',
    text: 'People should know who receives, reviews, and answers concerns.',
  },
  {
    id: 'dignity',
    title: 'Does the process protect dignity and confidentiality?',
    text: 'Sensitive concerns should not be exposed casually. Safety matters as much as access.',
  },
  {
    id: 'hear-next',
    title: 'Do people hear what happened next?',
    text: 'Visible response builds trust. Silence weakens it.',
  },
  {
    id: 'adapt',
    title: 'Do repeated concerns lead to adaptation?',
    text: 'If the same issue keeps appearing and the process never changes, accountability is weak.',
  },
];

const accountabilityDecisionChoices: Choice[] = [
  {
    id: 'A',
    text: 'Place a complaint box in the meeting room and consider the accountability problem solved.',
    feedback: 'This is too narrow. A channel may help, but accountability requires explanation, trust, response, follow-up, and learning.',
    status: 'Weak',
  },
  {
    id: 'B',
    text: 'Tell members they can always approach the facilitator informally if they have concerns.',
    feedback: 'This may help some members, but it is still too informal and unclear to be enough for everyone.',
    status: 'Partial but not strongest',
  },
  {
    id: 'C',
    text: 'Explain what concerns can be raised, create safer ways to raise them, clarify who will respond, and report back on what was done.',
    feedback: 'Yes. This is the strongest first step because it activates several parts of the accountability loop, not only the entry point.',
    status: 'Strongest',
  },
  {
    id: 'D',
    text: 'Wait to see whether more complaints come in before changing anything.',
    feedback: 'This assumes silence means things are fine. It may actually signal low trust or low accessibility.',
    status: 'Weak',
  },
];

export function Module2AccountabilityLoop({ state, onChangeState }: Props) {
  const stages = [
    {
      id: 'understand',
      title: 'Understand',
      cue: 'People know what can be raised and how.',
      breakText: 'Members only hear “Any comments?” at the end of meetings.',
      repair: 'Explain what concerns can be raised, what is confidential, and what response people can expect.',
    },
    {
      id: 'safe-use',
      title: 'Use Safely',
      cue: 'Different people can raise concerns without avoidable risk.',
      breakText: 'Some members fear being seen as difficult if they question role selection.',
      repair: 'Offer more than one safe channel and clarify how concerns will be handled without exposing people.',
    },
    {
      id: 'respond',
      title: 'Respond',
      cue: 'Someone reviews concerns and gives an answer.',
      breakText: 'Concerns are heard informally, but people rarely hear what happened next.',
      repair: 'Share back what was raised in general terms, what was decided, and what will happen next.',
    },
    {
      id: 'adapt',
      title: 'Adapt',
      cue: 'Repeated concerns lead to process change.',
      breakText: 'The same public-facing members keep being selected even after concerns repeat.',
      repair: 'Review the pattern and adjust the selection or rotation process if exclusion is visible.',
    },
  ];
  const stored = state.practiceCheckState?.module2_screen216_accountability_loop || {};
  const activeStageId =
    typeof stored.activeStageId === 'string' && stages.some((stage) => stage.id === stored.activeStageId)
      ? stored.activeStageId
      : stages[0].id;
  const selectedRepairs =
    stored.selectedRepairs && typeof stored.selectedRepairs === 'object'
      ? (stored.selectedRepairs as Record<string, string>)
      : {};
  const activeStage = stages.find((stage) => stage.id === activeStageId) || stages[0];
  const repairedCount = stages.filter((stage) => selectedRepairs[stage.id] === stage.repair).length;
  const allRepaired = repairedCount === stages.length;

  const chooseStage = (stageId: string) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        module2_screen216_accountability_loop: {
          screenId: 'M2-S16',
          activeStageId: stageId,
          selectedRepairs,
          completionStatus: allRepaired ? 'completed' : 'in_progress',
        },
      },
    }));
  };

  const chooseRepair = (stageId: string, value: string) => {
    onChangeState((prev) => {
      const current = prev.practiceCheckState?.module2_screen216_accountability_loop;
      const currentRepairs =
        current?.selectedRepairs && typeof current.selectedRepairs === 'object'
          ? (current.selectedRepairs as Record<string, string>)
          : {};
      const nextRepairs = { ...currentRepairs, [stageId]: value };
      const complete = stages.every((stage) => nextRepairs[stage.id] === stage.repair);
      const progress = new Set(prev.screenProgress[MODULE_ID] || []);
      if (complete) progress.add('M2-S16');

      return {
        ...prev,
        screenProgress: {
          ...prev.screenProgress,
          [MODULE_ID]: Array.from(progress),
        },
        practiceCheckState: {
          ...prev.practiceCheckState,
          module2_screen216_accountability_loop: {
            screenId: 'M2-S16',
            activeStageId: stageId,
            selectedRepairs: nextRepairs,
            completionStatus: complete ? 'completed' : 'in_progress',
          },
        },
      };
    });
  };

  const completeAndContinue = () => {
    if (!allRepaired) return;
    markCompleteAndNavigate('module2_screen216_accountability_loop', 'M2-S16', 'M2-S17', '/module-2/screen-2-17', onChangeState, {
      activeStageId,
      selectedRepairs,
    });
  };

  return (
    <main className="m2-s16-screen" aria-labelledby="m2-s16-title">
      <section className="m2-s16-shell">
        <header className="m2-s16-header">
          <div className="m2-s16-title-card">
            <p className="m2-s16-kicker">Module 2 · Accountability loop</p>
            <h1 id="m2-s16-title">Accountability Is More Than a Complaint Box</h1>
            <p>
              A channel is only the entry point. Accountability becomes real when people
              understand the process, can use it safely, receive a response, and see
              repeated concerns lead to change.
            </p>
          </div>
          <aside className="m2-s16-progress-card" aria-label="Accountability repair progress">
            <p className="m2-s16-progress-count" aria-live="polite">
              {repairedCount} of 4 loop breaks repaired
            </p>
            <div className="m2-s16-progress-track" aria-hidden="true">
              <span style={{ width: `${(repairedCount / stages.length) * 100}%` }} />
            </div>
            <p>{allRepaired ? 'All loop breaks repaired.' : 'Repair each broken stage to continue.'}</p>
          </aside>
        </header>

        <section className="m2-s16-loop" aria-label="Accountability loop stages">
          {stages.map((stage, index) => {
            const active = stage.id === activeStage.id;
            const repaired = selectedRepairs[stage.id] === stage.repair;
            return (
              <button
                key={stage.id}
                type="button"
                className={`m2-s16-loop-step ${active ? 'is-active' : ''} ${repaired ? 'is-repaired' : ''}`}
                onClick={() => chooseStage(stage.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ' || event.key === 'Space') {
                    event.preventDefault();
                    chooseStage(stage.id);
                  }
                }}
              >
                <span aria-hidden="true">{repaired ? '✓' : index + 1}</span>
                <strong>{stage.title}</strong>
                <em>{stage.cue}</em>
              </button>
            );
          })}
        </section>

        <section className="m2-s16-board" aria-labelledby="m2-s16-stage-title">
          <article className="m2-s16-break-card">
            <p className="m2-s16-kicker">Broken stage</p>
            <h2 id="m2-s16-stage-title">{activeStage.title}</h2>
            <p>{activeStage.breakText}</p>
            <div>
              <strong>Why it matters</strong>
              <p>{activeStage.cue}</p>
            </div>
          </article>

          <article className="m2-s16-repair-card">
            <p className="m2-s16-kicker">Choose the repair</p>
            <h2>What would strengthen this part of the loop?</h2>
            <div className="m2-s16-repair-options" role="radiogroup" aria-label={`Repair ${activeStage.title}`}>
              {[
                'Add a box or channel and wait for people to use it.',
                activeStage.repair,
                'Assume silence means the process is working well.',
              ].map((option, index) => {
                const selected = selectedRepairs[activeStage.id] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={`m2-s16-repair-option ${selected ? 'is-selected' : ''}`}
                    onClick={() => chooseRepair(activeStage.id, option)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Space') {
                        event.preventDefault();
                        chooseRepair(activeStage.id, option);
                      }
                    }}
                  >
                    <span aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                    <strong>{option}</strong>
                  </button>
                );
              })}
            </div>
          </article>

          <aside className="m2-s16-feedback-card" aria-live="polite">
            <p className="m2-s16-kicker">Loop feedback</p>
            {selectedRepairs[activeStage.id] ? (
              <>
                <h2>
                  {selectedRepairs[activeStage.id] === activeStage.repair
                    ? 'Strong repair'
                    : 'Surface fix'}
                </h2>
                <p>
                  {selectedRepairs[activeStage.id] === activeStage.repair
                    ? activeStage.repair
                    : 'A channel alone does not complete the loop. Accountability needs clarity, safety, response, and adaptation.'}
                </p>
              </>
            ) : (
              <>
                <h2>Repair this break</h2>
                <p>Choose the option that strengthens this part of the accountability loop.</p>
              </>
            )}
            <div>
              <strong>Practical test</strong>
              <p>Can people understand, use, receive a response, and see follow-up?</p>
            </div>
          </aside>
        </section>

        <footer className="m2-s16-footer">
          <p>
            Accountability is a loop, not a box. A concern only becomes useful when it
            can move safely toward response, follow-up, and learning.
          </p>
          <button
            type="button"
            className="m2-s16-cta"
            disabled={!allRepaired}
            aria-disabled={!allRepaired}
            onClick={completeAndContinue}
          >
            Continue to accountability practice
          </button>
        </footer>
      </section>
    </main>
  );
}

const repairActions = [
  ['A', 'Explain clearly what kinds of concerns can be raised and what response people should expect.'],
  ['B', 'Review repeated concerns to see whether they show a pattern about role allocation and transparency.'],
  ['C', 'Tell members that the facilitator is always available if they want to talk informally.'],
  ['D', 'Share back what concern was raised in general terms, what was discussed, and what will happen next.'],
  ['E', 'Wait for more people to raise the same concern before taking it seriously.'],
  ['F', 'Change the meeting process or role selection approach if the same concern keeps appearing.'],
  ['G', 'Add a locked complaint box in the room and consider the problem solved.'],
  ['H', 'Ask cooperative leaders privately if they think members are overreacting.'],
] as const;

const repairMatchingItems: SortItem[] = [
  { id: 'heard-not-reviewed', text: 'Concerns are heard but not reviewed as a pattern.', correct: 'Review repeated concerns together and identify patterns.', feedback: 'Review repairs the analysis break.' },
  { id: 'hear-nothing', text: 'People hear nothing after raising an issue.', correct: 'Share back what was raised, what was decided, and what will happen next.', feedback: 'Share-back repairs the response break.' },
  { id: 'repeats', text: 'The same issue repeats without process change.', correct: 'Adapt the meeting or role-allocation process.', feedback: 'Adaptation repairs the learning break.' },
  { id: 'unclear', text: 'Members are unclear about what concerns can be raised.', correct: 'Clarify what the channel is for and what response to expect.', feedback: 'Clarity repairs the inform break.' },
];

const improvementCards: SortItem[] = [
  { id: 'box', text: 'Add a suggestion box.', correct: 'Small surface fix', feedback: 'A box may help, but by itself it does not guarantee explanation, trust, response, or adaptation.' },
  { id: 'explain', text: 'Explain what concerns can be raised, how confidentiality works, and who will respond.', correct: 'Deeper accountability fix', feedback: 'This strengthens the process before feedback is even raised.' },
  { id: 'notebook', text: 'Keep concerns in the facilitator’s notebook.', correct: 'Small surface fix', feedback: 'Recording matters, but it is not enough if the issue is never analyzed or answered.' },
  { id: 'standing-section', text: 'Include a standing feedback-and-response section in meetings and report back on previous issues.', correct: 'Deeper accountability fix', feedback: 'This strengthens visibility, response, and trust.' },
  { id: 'silence', text: 'Treat silence as proof that no concerns exist.', correct: 'Small surface fix', feedback: 'Silence may reflect fear, confusion, or low trust.' },
  { id: 'change-role', text: 'Change the role allocation process if repeated concerns show exclusion or confusion.', correct: 'Deeper accountability fix', feedback: 'Accountability becomes stronger when repeated concerns actually change practice.' },
];

const repairDecisionChoices: Choice[] = [
  { id: 'A', text: 'Create another channel for feedback and wait to see what comes in.', feedback: 'This adds another entry point, but it may not fix trust, response, or follow-through.', status: 'Weak' },
  { id: 'B', text: 'Clarify what concerns can be raised, who will review them, and how members will hear back.', feedback: 'Yes. This is the strongest first step because it strengthens expectations, trust, and response pathway clarity at the same time.', status: 'Strongest' },
  { id: 'C', text: 'Tell members that not every concern can be addressed and leave the process informal.', feedback: 'Managing expectations matters, but this is too weak and may normalize low accountability.', status: 'Weak' },
  { id: 'D', text: 'Let cooperative leaders decide which concerns are worth answering.', feedback: 'This risks bias and weakens trust, especially if the concern involves leadership decisions.', status: 'Weak' },
];

export function Module2FeedbackLoopRepair({ state, onChangeState }: Props) {
  const repairCases = [
    {
      id: 'silent-box',
      label: 'Case 1',
      title: 'The complaint box is always empty',
      cue: 'A box is available, but members say they are not sure who reads it or whether comments stay private.',
      breakId: 'understand',
      fixId: 'explain-channel',
      insight: 'The first repair is clarity. People need to understand what can be raised, who sees it, and what response to expect.',
    },
    {
      id: 'heard-once',
      label: 'Case 2',
      title: 'A concern is heard, then disappears',
      cue: 'A member raises concern about role selection. The facilitator listens, but no one reviews whether the issue is repeated.',
      breakId: 'review-patterns',
      fixId: 'review-patterns',
      insight: 'A concern that is only collected is not yet accountability. Review repeated concerns for patterns and exclusion risks.',
    },
    {
      id: 'no-follow-up',
      label: 'Case 3',
      title: 'People never hear what happened next',
      cue: 'The team discusses feedback internally, but members receive no general response and assume nothing changed.',
      breakId: 'share-back',
      fixId: 'share-back',
      insight: 'Trust grows when people can see the response loop. Share back what was heard, what was decided, and what will change.',
    },
    {
      id: 'same-problem',
      label: 'Case 4',
      title: 'The same issue returns every meeting',
      cue: 'Several members keep saying public opportunities go to the same group, but the selection process stays the same.',
      breakId: 'adapt',
      fixId: 'adapt',
      insight: 'When the same barrier repeats, the process itself needs repair. Adapt the decision process, not only the message.',
    },
  ] as const;
  const breakOptions = [
    { id: 'understand', label: 'People do not understand the channel', detail: 'Clarity and expectations are weak.' },
    { id: 'review-patterns', label: 'Concerns are not reviewed as patterns', detail: 'The team hears issues but does not analyze repeated barriers.' },
    { id: 'share-back', label: 'No response is shared back', detail: 'People cannot see whether anything happened.' },
    { id: 'adapt', label: 'The process does not change', detail: 'The same barrier keeps returning.' },
  ] as const;
  const fixOptions = [
    { id: 'explain-channel', label: 'Explain the channel and response promise', detail: 'Say what can be raised, who reviews it, and how people will hear back.' },
    { id: 'review-patterns', label: 'Review repeated concerns together', detail: 'Look for patterns that show exclusion, confusion, or unfair access.' },
    { id: 'share-back', label: 'Share back in safe general terms', detail: 'Report what was raised, what was decided, and what happens next.' },
    { id: 'adapt', label: 'Change the process if the barrier repeats', detail: 'Adjust selection, timing, information, or roles when feedback shows a real barrier.' },
  ] as const;

  const initial = useInitial(() => {
    const stored = state.practiceCheckState?.module2_screen217_feedback_loop_repair;
    return {
      activeCaseId: stored?.activeCaseId || repairCases[0].id,
      breakSelections: stored?.breakSelections || {},
      fixSelections: stored?.fixSelections || {},
      feedback: stored?.feedback || 'Start with the first case: diagnose the break, then choose the repair that best closes the loop.',
      screenComplete: (state.screenProgress[MODULE_ID] || []).includes('M2-S17'),
    };
  });
  const [activeCaseId, setActiveCaseId] = useState<string>(initial.activeCaseId);
  const [breakSelections, setBreakSelections] = useState<Record<string, string>>(initial.breakSelections);
  const [fixSelections, setFixSelections] = useState<Record<string, string>>(initial.fixSelections);
  const [feedback, setFeedback] = useState(initial.feedback);
  const [screenComplete, setScreenComplete] = useState(initial.screenComplete);
  const activeCase = repairCases.find((item) => item.id === activeCaseId) || repairCases[0];
  const repairedCount = repairCases.filter((item) => breakSelections[item.id] === item.breakId && fixSelections[item.id] === item.fixId).length;
  const completionReady = repairedCount === repairCases.length;
  const currentBreakCorrect = breakSelections[activeCase.id] === activeCase.breakId;
  const currentFixCorrect = fixSelections[activeCase.id] === activeCase.fixId;

  const persistState = (next: Record<string, unknown> = {}) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        module2_screen217_feedback_loop_repair: {
          screenId: 'M2-S17',
          activeCaseId,
          breakSelections,
          fixSelections,
          feedback,
          completionStatus: 'in_progress',
          ...next,
        },
      },
    }));
  };
  useEffect(() => {
    persistState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCase = (id: string) => {
    const target = repairCases.find((item) => item.id === id);
    if (!target) return;
    const nextFeedback = breakSelections[id] === target.breakId && fixSelections[id] === target.fixId ? target.insight : 'Diagnose the break first, then choose the repair that closes the loop.';
    setActiveCaseId(id);
    setFeedback(nextFeedback);
    persistState({ activeCaseId: id, feedback: nextFeedback });
  };
  const selectBreak = (id: string) => {
    const next = { ...breakSelections, [activeCase.id]: id };
    const selected = breakOptions.find((item) => item.id === id);
    const nextFeedback = id === activeCase.breakId ? `Correct break: ${selected?.label}. Now choose the repair.` : 'That may matter in some cases, but it is not the main break in this example.';
    setBreakSelections(next);
    setFeedback(nextFeedback);
    persistState({ breakSelections: next, feedback: nextFeedback });
  };
  const selectFix = (id: string) => {
    const next = { ...fixSelections, [activeCase.id]: id };
    const correct = breakSelections[activeCase.id] === activeCase.breakId && id === activeCase.fixId;
    const nextFeedback = correct ? activeCase.insight : currentBreakCorrect ? 'This is a possible action, but another repair fits this break more directly.' : 'Choose the main break first so the repair matches the problem.';
    setFixSelections(next);
    setFeedback(nextFeedback);
    persistState({ fixSelections: next, feedback: nextFeedback });
    if (correct) {
      const nextCase = repairCases.find((item) => breakSelections[item.id] !== item.breakId || { ...next }[item.id] !== item.fixId);
      if (nextCase) {
        setActiveCaseId(nextCase.id);
        persistState({ activeCaseId: nextCase.id, fixSelections: next, feedback: nextFeedback });
      }
    }
  };
  const completeAndContinue = () => {
    if (!completionReady) return;
    setScreenComplete(true);
    markCompleteAndNavigate('module2_screen217_feedback_loop_repair', 'M2-S17', 'M2-S18', '/module-2/screen-2-18', onChangeState, {
      activeCaseId,
      breakSelections,
      fixSelections,
      feedback,
    });
  };

  return (
    <main className="m2-s17-screen" aria-labelledby="m2-s217-title">
      <section className="m2-s17-shell">
        <header className="m2-s17-header">
          <div className="m2-s17-title-block">
            <p className="m2-s17-kicker">Module 2 · Accountability practice</p>
            <h1 id="m2-s217-title">Practice: Repair the Feedback Loop</h1>
            <p>
              Diagnose where a feedback loop breaks, then choose the repair that gives people a clearer, safer, more visible response.
            </p>
          </div>
          <aside className="m2-s17-progress" aria-live="polite">
            <span>{repairedCount} of {repairCases.length} repaired</span>
            <strong>{completionReady ? 'Loop repaired' : 'Repair each case'}</strong>
          </aside>
        </header>

        <section className="m2-s17-case-strip" aria-label="Repair cases">
          {repairCases.map((item) => {
            const complete = breakSelections[item.id] === item.breakId && fixSelections[item.id] === item.fixId;
            const active = item.id === activeCase.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`m2-s17-case-tab ${active ? 'is-active' : ''} ${complete ? 'is-complete' : ''}`}
                aria-pressed={active}
                onClick={() => selectCase(item.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectCase(item.id);
                  }
                }}
              >
                <span>{complete ? 'Fixed' : item.label}</span>
                <strong>{item.title}</strong>
              </button>
            );
          })}
        </section>

        <section className="m2-s17-board">
          <article className="m2-s17-scenario">
            <p className="m2-s17-kicker">Current case</p>
            <h2>{activeCase.title}</h2>
            <p>{activeCase.cue}</p>
            <div className="m2-s17-loop-map" role="img" aria-label="Accountability loop: understand, use safely, review, respond, adapt.">
              {['Understand', 'Use safely', 'Review', 'Respond', 'Adapt'].map((step, index) => (
                <span key={step} className={index >= 2 ? 'is-risk' : ''}>{step}</span>
              ))}
            </div>
          </article>

          <div className="m2-s17-decision-panel">
            <section>
              <div className="m2-s17-panel-head">
                <span>1</span>
                <h3>Diagnose the break</h3>
              </div>
              <div className="m2-s17-option-grid" role="radiogroup" aria-label={`Diagnose break for ${activeCase.title}`}>
                {breakOptions.map((option) => {
                  const selected = breakSelections[activeCase.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`m2-s17-option ${selected ? 'is-selected' : ''} ${selected && option.id === activeCase.breakId ? 'is-correct' : ''}`}
                      role="radio"
                      aria-checked={selected}
                      onClick={() => selectBreak(option.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          selectBreak(option.id);
                        }
                      }}
                    >
                      <strong>{option.label}</strong>
                      <span>{option.detail}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="m2-s17-panel-head">
                <span>2</span>
                <h3>Choose the repair</h3>
              </div>
              <div className="m2-s17-option-grid" role="radiogroup" aria-label={`Choose repair for ${activeCase.title}`}>
                {fixOptions.map((option) => {
                  const selected = fixSelections[activeCase.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`m2-s17-option ${selected ? 'is-selected' : ''} ${selected && option.id === activeCase.fixId && currentBreakCorrect ? 'is-correct' : ''}`}
                      role="radio"
                      aria-checked={selected}
                      onClick={() => selectFix(option.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          selectFix(option.id);
                        }
                      }}
                    >
                      <strong>{option.label}</strong>
                      <span>{option.detail}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </section>

        <footer className="m2-s17-footer">
          <div className={`m2-s17-feedback ${currentBreakCorrect && currentFixCorrect ? 'is-complete' : ''}`} aria-live="polite">
            {feedback}
          </div>
          <button
            type="button"
            className="m2-s17-cta"
            disabled={!completionReady}
            aria-disabled={!completionReady}
            onClick={completeAndContinue}
          >
            Continue to power and exclusion
          </button>
        </footer>
      </section>
    </main>
  );
}

const pathwayStages: RevealCard[] = [
  { id: 'information', title: 'Information', text: 'Some people hear first through stronger networks, direct contact, or insider relationships. Others hear later, less clearly, or indirectly.', detail: 'Who receives useful information early enough to prepare?', tag: 'Information and access' },
  { id: 'entry', title: 'Entry', text: 'Some people enter the meeting or decision space more easily because of timing, confidence, childcare support, mobility, social status, or belonging.', detail: 'Who can enter the process without paying a higher social or practical cost?', tag: 'Belonging and access' },
  { id: 'understanding', title: 'Understanding', text: 'Financial terms, organizational language, and fast decision-making can favor those already familiar with the system.', detail: 'Who understands the issue well enough to influence it?', tag: 'Knowledge and confidence' },
  { id: 'voice', title: 'Voice', text: 'A person may have something important to say but still hesitate because of age, status, gender expectations, fear of conflict, language, or past dismissal.', detail: 'Who feels safe to speak, disagree, or ask for clarification?', tag: 'Safety and participation' },
  { id: 'credibility', title: 'Credibility', text: 'Power affects who is believed quickly, who is interrupted less, and whose ideas sound serious to the group.', detail: 'Whose voice is treated as credible before the discussion even begins?', tag: 'Status and recognition' },
  { id: 'influence', title: 'Influence', text: 'Some people shape the decision because they propose options, summarize discussion, know decision-makers, or are assumed to represent the group.', detail: 'Who can actually move the decision?', tag: 'Decision power' },
  { id: 'after-decision', title: 'After the decision', text: 'Power also shapes who hears the explanation, understands the reason, can challenge the result, and lives with the consequences.', detail: 'Who can still question, appeal, or influence what happens after the decision?', tag: 'Response and accountability' },
];

const powerHotspots: RevealCard[] = [
  { id: 'opens', title: 'Who opens the meeting', text: 'The person who opens the meeting may shape the tone, priorities, pace, and what counts as relevant input.', detail: 'Control over process is one form of power.' },
  { id: 'speaks-first', title: 'Who speaks first', text: 'Early speakers often shape what later contributions must react to. If only confident or higher-status members speak first, the discussion may narrow quickly.', detail: 'Sequence influences influence.' },
  { id: 'terms', title: 'Who explains key terms', text: 'If only a few people understand the language of finance, governance, or markets, others may remain present but less able to influence.', detail: 'Understanding is part of power.' },
  { id: 'interrupted-less', title: 'Who gets interrupted less', text: 'Some members can speak in longer, more complete ways because they are interrupted less or treated as more legitimate.', detail: 'Credibility is unevenly distributed.' },
  { id: 'summarizes', title: 'Who summarizes the decision', text: 'The person who summarizes often decides which contributions mattered and which became invisible.', detail: 'Narrating the decision is itself a power role.' },
  { id: 'quiet', title: 'Who stays quiet', text: 'Silence may reflect confusion, pressure, low trust, fatigue, fear of disrespect, or past experience of being ignored.', detail: 'Silence is not neutral data.' },
  { id: 'represents', title: 'Who is assumed to represent others', text: 'Some members are treated as natural spokespersons even when they do not share everyone’s experience.', detail: 'Representation can reproduce exclusion if it is not questioned.' },
];

const powerSortItems: SortItem[] = [
  { id: 'early-info', text: 'A member receives meeting information early through strong local networks.', correct: 'Closer to influence', feedback: 'Early information increases preparation and confidence.' },
  { id: 'fast-discussion', text: 'A quieter member needs more time to understand the issue but the discussion moves quickly.', correct: 'Farther from influence', feedback: 'Pace can quietly exclude people.' },
  { id: 'small-groups', text: 'The facilitator invites small-group discussion before plenary speaking.', correct: 'Can go either way — depends on facilitation', feedback: 'Small groups can widen participation if used well, but can also reproduce power.' },
  { id: 'known-buyers', text: 'One member is already known by buyers and local officials.', correct: 'Closer to influence', feedback: 'External relationships often strengthen internal influence.' },
  { id: 'social-risk', text: 'A member is present but unsure whether disagreement is socially acceptable.', correct: 'Farther from influence', feedback: 'Fear of social risk reduces real participation.' },
  { id: 'chair-process', text: 'The chair explains how the final decision will be made before discussion begins.', correct: 'Can go either way — depends on facilitation', feedback: 'Clear process can reduce exclusion if the process itself is fair and open.' },
];

const powerLensCards: RevealCard[] = [
  { id: 'heard-first', title: 'Who heard first?', text: 'Look at information timing, channels, and preparation. Influence often begins before the meeting starts.' },
  { id: 'belonged', title: 'Who belonged already?', text: 'Look at who felt the space was meant for them, who knew the process, and who entered with less uncertainty.' },
  { id: 'risk-speaking', title: 'Who could risk speaking?', text: 'Look at who could disagree, ask questions, or challenge a direction without fear of shame, conflict, or dismissal.' },
  { id: 'believed', title: 'Who was believed quickly?', text: 'Look at status, confidence, fluency, networks, and whose voice sounded authoritative before evidence was discussed.' },
  { id: 'shaped-next', title: 'Who shaped what happened next?', text: 'Look beyond the meeting itself. Who influenced the final decision, follow-up, and interpretation of the outcome?' },
];

const powerDecisionChoices: Choice[] = [
  { id: 'A', text: 'Keep the meeting structure the same but ask quieter members at the very end whether they agree.', feedback: 'This is too weak. It does not change the timing, safety, pace, or influence dynamics.', status: 'Weak' },
  { id: 'B', text: 'Share the issue and options in advance, explain key terms clearly, vary who speaks first, use smaller discussion groups carefully, and show how different views shaped the final decision.', feedback: 'Yes. This is the strongest option because it addresses power across information, understanding, voice, and visible influence.', status: 'Strongest' },
  { id: 'C', text: 'Let only the most experienced members speak because they understand the issues better.', feedback: 'This increases efficiency for a few people but deepens exclusion for others.', status: 'Weak' },
  { id: 'D', text: 'Rotate who chairs the meeting and assume the power problem is solved.', feedback: 'Role rotation can help, but on its own it does not address information, confidence, credibility, or influence pathways.', status: 'Partial but not strongest' },
];

const module2PowerHotspotImage = '/assets/hrba/module-2/images/m2_s18_hotspot_image.png';

export function Module2PowerExclusion({ state, onChangeState }: Props) {
  const hotspots = [
    {
      id: 'information',
      label: 'Information',
      short: 'Who heard early?',
      position: 'm2-s18-hotspot--information',
      text: 'Some members hear early through stronger networks. Others hear later, indirectly, or without enough time to prepare.',
      question: 'Who gets useful information early enough to understand the choice?',
    },
    {
      id: 'entry',
      label: 'Entry',
      short: 'Who can enter easily?',
      position: 'm2-s18-hotspot--entry',
      text: 'Timing, childcare, mobility, confidence, language, and belonging can decide who enters the space with less cost.',
      question: 'Who pays a higher practical or social cost just to participate?',
    },
    {
      id: 'understanding',
      label: 'Understanding',
      short: 'Who follows the terms?',
      position: 'm2-s18-hotspot--understanding',
      text: 'Financial, project, or governance language can make some people present but less able to shape the discussion.',
      question: 'Which terms or assumptions should be explained before decisions move forward?',
    },
    {
      id: 'voice',
      label: 'Voice',
      short: 'Who can speak safely?',
      position: 'm2-s18-hotspot--voice',
      text: 'People may have ideas but hesitate because of status, age, gender expectations, fear of conflict, or past dismissal.',
      question: 'Who can ask, disagree, or slow the discussion without being punished socially?',
    },
    {
      id: 'credibility',
      label: 'Credibility',
      short: 'Who is believed?',
      position: 'm2-s18-hotspot--credibility',
      text: 'Power affects whose ideas sound serious, whose knowledge is trusted, and whose contribution is interrupted less.',
      question: 'Whose voice is treated as credible before evidence is discussed?',
    },
    {
      id: 'influence',
      label: 'Influence',
      short: 'Who shapes the result?',
      position: 'm2-s18-hotspot--influence',
      text: 'Some people influence the final choice because they summarize, propose options, know decision-makers, or represent the group publicly.',
      question: 'Who can actually change the decision, not only comment on it?',
    },
  ] as const;

  const initial = useInitial(() => {
    const stored = state.practiceCheckState?.module2_screen218_power_exclusion;
    return {
      openedHotspots: Array.isArray(stored?.openedHotspots) ? stored.openedHotspots : [],
      activeHotspotId: stored?.activeHotspotId || hotspots[0].id,
      feedback: stored?.feedback || 'Open each hotspot to notice where power can shape participation before influence is visible.',
      screenComplete: (state.screenProgress[MODULE_ID] || []).includes('M2-S18'),
    };
  });
  const [openedHotspots, setOpenedHotspots] = useState<string[]>(initial.openedHotspots);
  const [activeHotspotId, setActiveHotspotId] = useState<string>(initial.activeHotspotId);
  const [feedback, setFeedback] = useState(initial.feedback);
  const [screenComplete, setScreenComplete] = useState(initial.screenComplete);
  const activeHotspot = hotspots.find((item) => item.id === activeHotspotId) || hotspots[0];
  const completionReady = openedHotspots.length === hotspots.length;
  const persistState = (next: Record<string, unknown> = {}) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        module2_screen218_power_exclusion: {
          screenId: 'M2-S18',
          openedHotspots,
          activeHotspotId,
          feedback,
          completionStatus: 'in_progress',
          ...next,
        },
      },
    }));
  };
  useEffect(() => {
    persistState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const openHotspot = (id: string) => {
    const hotspot = hotspots.find((item) => item.id === id);
    if (!hotspot) return;
    const nextOpened = addUnique(openedHotspots, id);
    const nextFeedback = hotspot.question;
    setOpenedHotspots(nextOpened);
    setActiveHotspotId(id);
    setFeedback(nextFeedback);
    persistState({ openedHotspots: nextOpened, activeHotspotId: id, feedback: nextFeedback });
  };
  const completeAndContinue = () => {
    if (!completionReady) return;
    setScreenComplete(true);
    markCompleteAndNavigate('module2_screen218_power_exclusion', 'M2-S18', 'M2-S19', '/module-2/screen-2-19', onChangeState, {
      openedHotspots,
      activeHotspotId,
      feedback,
    });
  };
  return (
    <main className="m2-s18-screen" aria-labelledby="m2-s218-title">
      <section className="m2-s18-shell">
        <header className="m2-s18-header">
          <div className="m2-s18-title-card">
            <p className="m2-s18-kicker">Module 2 · Power and exclusion</p>
            <h1 id="m2-s218-title">Power and Exclusion: Who Can Participate, Speak, and Influence?</h1>
            <p>
              Follow one decision meeting and open each hotspot to see how power can shape participation before the final choice appears.
            </p>
          </div>
          <aside className="m2-s18-progress" aria-live="polite">
            <span>{openedHotspots.length} of {hotspots.length} hotspots opened</span>
            <strong>{completionReady ? 'Power pathway mapped' : 'Map the hidden barriers'}</strong>
          </aside>
        </header>

        <section className="m2-s18-board">
          <article className="m2-s18-story">
            <p className="m2-s18-kicker">Meeting snapshot</p>
            <h2>The same room, different power</h2>
            <p>
              A cooperative is choosing who will represent members in a market meeting. Everyone is invited, but people do not enter with the same information, confidence, safety, or credibility.
            </p>
            <div className="m2-s18-member-grid">
              <div>
                <strong>Closer to influence</strong>
                <span>Known by leaders, comfortable with finance terms, speaks early.</span>
              </div>
              <div>
                <strong>Farther from influence</strong>
                <span>Heard later, newer to the group, unsure whether disagreement is welcome.</span>
              </div>
            </div>
          </article>

          <div
            className="m2-s18-map"
            aria-label="Power and exclusion meeting scene hotspot map. Open the six labels to explore information, entry, understanding, voice, credibility, and influence."
            style={{ '--m2-s18-hotspot-image': `url(${module2PowerHotspotImage})` } as CSSProperties}
          >
            <span className="sr-only">
              The image shows a community meeting around a table. Some people sit near the decision discussion, others stand near the doorway or sit at the edge, showing how access, voice, credibility, and influence can differ in the same room.
            </span>
            <div className="m2-s18-path-line" aria-hidden="true" />
            {hotspots.map((hotspot, index) => {
              const opened = openedHotspots.includes(hotspot.id);
              const active = activeHotspot.id === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  type="button"
                  className={`m2-s18-hotspot ${hotspot.position} ${opened ? 'is-opened' : ''} ${active ? 'is-active' : ''}`}
                  aria-pressed={active}
                  aria-label={`Open hotspot ${index + 1}: ${hotspot.label}. ${hotspot.short}`}
                  onClick={() => openHotspot(hotspot.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openHotspot(hotspot.id);
                    }
                  }}
                >
                  <span>{opened ? 'OK' : index + 1}</span>
                  <strong>{hotspot.label}</strong>
                  <em>{hotspot.short}</em>
                </button>
              );
            })}
          </div>

          <article className="m2-s18-insight">
            <p className="m2-s18-kicker">Selected hotspot</p>
            <h2>{activeHotspot.label}</h2>
            <p>{activeHotspot.text}</p>
            <div>
              <strong>CSO practice question</strong>
              <span>{activeHotspot.question}</span>
            </div>
          </article>
        </section>

        <footer className="m2-s18-footer">
          <div className={`m2-s18-feedback ${completionReady ? 'is-complete' : ''}`} aria-live="polite">
            {feedback}
          </div>
          <button
            type="button"
            className="m2-s18-cta"
            disabled={!completionReady}
            aria-disabled={!completionReady}
            onClick={completeAndContinue}
          >
            Continue to tracing exclusion
          </button>
        </footer>
      </section>
    </main>
  );
}

const journeyStages: JourneyStage[] = [
  { id: 'information', label: 'Information', scenario: 'Alemitu heard about the cooperative later than some other women because she was newer to the area and less connected to the strongest informal networks.', correctClassification: 'Partly blocked', feedback: 'Alemitu received the information, but later and through a weaker channel. This meant less time to prepare, ask questions, and enter confidently.', correctAdjustment: 'Use multiple information channels, not only existing strong networks.', adjustments: ['Use multiple information channels, not only existing strong networks.', 'Assume people will hear eventually if the opportunity is good enough.', 'Share information only through community leaders to keep things simple.'] },
  { id: 'entry', label: 'Entry', scenario: 'Alemitu did join the cooperative, but as a newer member she was still unsure whether she fully belonged in the group’s more visible or higher-trust spaces.', correctClassification: 'Partly blocked', feedback: 'Alemitu entered the process, but not with the same confidence, belonging, or legitimacy as more established members.', correctAdjustment: 'Make expectations and selection criteria for roles more transparent from the beginning.', adjustments: ['Make expectations and selection criteria for roles more transparent from the beginning.', 'Wait until newer members prove themselves before explaining how roles are assigned.', 'Assume that once someone joins, belonging is no longer an issue.'] },
  { id: 'understanding', label: 'Understanding', scenario: 'Alemitu understands production quality well, but she is less comfortable with the language used in finance and buyer discussions.', correctClassification: 'Partly blocked', feedback: 'Alemitu is knowledgeable, but not equally positioned across all domains of the cooperative’s work.', correctAdjustment: 'Explain key terms in simple language and build shared understanding before decisions.', adjustments: ['Explain key terms in simple language and build shared understanding before decisions.', 'Leave financial language to the most experienced members.', 'Ask members to speak only when they fully understand everything.'] },
  { id: 'voice', label: 'Voice', scenario: 'Alemitu has ideas and observations, but she is less likely to enter the discussion quickly when older or more confident members speak first.', correctClassification: 'Strongly blocked', feedback: 'Her voice is not fully absent, but the conditions make it hard for her to use it.', correctAdjustment: 'Use facilitation methods that widen voice before the plenary discussion narrows the options.', adjustments: ['Use facilitation methods that widen voice before the plenary discussion narrows the options.', 'Ask quieter members at the end whether they agree.', 'Let the strongest speakers guide the conversation because they are more efficient.'] },
  { id: 'credibility', label: 'Credibility', scenario: 'Older and better-connected members are seen as more natural representatives when buyers or finance actors are involved.', correctClassification: 'Strongly blocked', feedback: 'This is a strong power barrier. Alemitu may know the product well, but credibility is being assigned socially.', correctAdjustment: 'Create transparent opportunities for different members to build public-facing experience.', adjustments: ['Create transparent opportunities for different members to build public-facing experience.', 'Continue using the same representatives because outsiders trust them already.', 'Assume credibility cannot be changed.'] },
  { id: 'influence', label: 'Influence', scenario: 'When decisions are made about who represents the cooperative, Alemitu’s role in shaping the outcome is limited.', correctClassification: 'Strongly blocked', feedback: 'Influence is where earlier barriers become visible. If information, voice, and credibility are uneven, influence is likely uneven too.', correctAdjustment: 'Clarify how decisions are made and create fairer role-selection processes.', adjustments: ['Clarify how decisions are made and create fairer role-selection processes.', 'Leave representation decisions informal because the group already knows who is strongest.', 'Treat previous representation patterns as neutral tradition.'] },
  { id: 'after-decision', label: 'After the decision', scenario: 'After the role decision is made, members are not always told clearly why some people were selected and others were not.', correctClassification: 'Partly blocked', feedback: 'There is some visibility because the decision is known, but accountability is weaker if the criteria and reasoning are not explained.', correctAdjustment: 'Explain the basis of the decision and invite questions afterward.', adjustments: ['Explain the basis of the decision and invite questions afterward.', 'Avoid explanation so there is less disagreement.', 'Assume members will understand the decision if they do not object.'] },
];

const journeyMatchingItems: SortItem[] = [
  { id: 'information', text: 'Information', correct: 'Use multiple information channels.', feedback: 'This opens the pathway before the meeting.' },
  { id: 'voice', text: 'Voice', correct: 'Use facilitation methods that widen voice early.', feedback: 'This helps before plenary discussion narrows options.' },
  { id: 'credibility', text: 'Credibility', correct: 'Create transparent opportunities for different members to build public-facing experience.', feedback: 'This helps credibility become less fixed by existing status.' },
  { id: 'influence', text: 'Influence', correct: 'Clarify decision criteria and role-selection process.', feedback: 'This makes influence less dependent on informal power.' },
  { id: 'after-decision', text: 'After the decision', correct: 'Explain the reasoning behind decisions and invite questions.', feedback: 'This strengthens accountability after the decision.' },
];

const journeyDecisionChoices: Choice[] = [
  { id: 'A', text: 'Choose Alemitu as the next representative without changing anything else.', feedback: 'This may help once, but it does not address the wider pathway that kept her at the edge.', status: 'Partial but weak' },
  { id: 'B', text: 'Map where the pathway becomes harder, then improve information, facilitation, and role-selection criteria in the next cycle.', feedback: 'Yes. This is the strongest answer because it treats exclusion as a process and begins repairing the stages that shape influence.', status: 'Strongest' },
  { id: 'C', text: 'Tell members to speak up more if they want greater influence.', feedback: 'This places too much responsibility on those already farther from influence.', status: 'Weak' },
  { id: 'D', text: 'Keep the same decision process but explain afterward that fairness matters.', feedback: 'Explanation helps, but without changing earlier pathway stages, exclusion may continue.', status: 'Weak' },
];

export function Module2TraceExclusionPathway({ state, onChangeState }: Props) {
  const pathway = [
    {
      id: 'information',
      label: 'Information',
      problem: 'Alemitu hears about the role opportunity later than members with stronger networks.',
      adjustment: 'Use more than one advance information channel and check who has not yet heard.',
      why: 'Earlier information gives people time to prepare, ask questions, and enter with confidence.',
    },
    {
      id: 'understanding',
      label: 'Understanding',
      problem: 'The discussion uses finance and buyer terms that some members do not fully follow.',
      adjustment: 'Explain key terms before the discussion and pause for questions before options narrow.',
      why: 'Understanding is part of participation. People cannot influence what they cannot follow.',
    },
    {
      id: 'voice',
      label: 'Voice',
      problem: 'Experienced members speak first and the discussion moves quickly.',
      adjustment: 'Use small-group thinking time before plenary and vary who speaks first.',
      why: 'Wider voice early in the process prevents stronger speakers from setting the whole frame.',
    },
    {
      id: 'credibility',
      label: 'Credibility',
      problem: 'Older or better-connected members are treated as the natural representatives.',
      adjustment: 'Create transparent opportunities for different members to build public-facing experience.',
      why: 'Credibility can be built; it should not stay fixed around the same people forever.',
    },
    {
      id: 'accountability',
      label: 'After the decision',
      problem: 'Members are told who was selected, but not why or how concerns can be raised.',
      adjustment: 'Explain the decision basis and invite questions or concerns through a clear response process.',
      why: 'Accountability helps people see how decisions were made and whether challenge is possible.',
    },
  ] as const;

  const initial = useInitial(() => {
    const stored = state.practiceCheckState?.module2_screen219_trace_exclusion_pathway;
    return {
      activeStageId: stored?.activeStageId || pathway[0].id,
      selectedAdjustments: stored?.selectedAdjustments || {},
      feedback: stored?.feedback || 'Start at the first narrowed point. Choose the adjustment that would open the pathway most directly.',
      screenComplete: (state.screenProgress[MODULE_ID] || []).includes('M2-S19'),
    };
  });
  const [activeStageId, setActiveStageId] = useState<string>(initial.activeStageId);
  const [selectedAdjustments, setSelectedAdjustments] = useState<Record<string, string>>(initial.selectedAdjustments);
  const [feedback, setFeedback] = useState(initial.feedback);
  const [screenComplete, setScreenComplete] = useState(initial.screenComplete);
  const activeStage = pathway.find((stage) => stage.id === activeStageId) || pathway[0];
  const activeStageIndex = pathway.findIndex((stage) => stage.id === activeStage.id);
  const weakerAdjustments = ['Ask affected members to speak up more next time.', 'Keep the process informal because the group already knows each other.'];
  const activeStageOptions = activeStageIndex % 2 === 0 ? [weakerAdjustments[0], activeStage.adjustment, weakerAdjustments[1]] : [activeStage.adjustment, weakerAdjustments[1], weakerAdjustments[0]];
  const completedCount = pathway.filter((stage) => selectedAdjustments[stage.id] === stage.adjustment).length;
  const completionReady = completedCount === pathway.length;
  const persistState = (next: Record<string, unknown> = {}) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        module2_screen219_trace_exclusion_pathway: {
          screenId: 'M2-S19',
          activeStageId,
          selectedAdjustments,
          feedback,
          completionStatus: 'in_progress',
          ...next,
        },
      },
    }));
  };
  useEffect(() => {
    persistState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const selectStage = (id: string) => {
    const stage = pathway.find((item) => item.id === id);
    if (!stage) return;
    const nextFeedback = selectedAdjustments[id] === stage.adjustment ? stage.why : 'Choose the adjustment that opens this stage of the pathway most directly.';
    setActiveStageId(id);
    setFeedback(nextFeedback);
    persistState({ activeStageId: id, feedback: nextFeedback });
  };
  const chooseAdjustment = (value: string) => {
    const correct = value === activeStage.adjustment;
    const next = { ...selectedAdjustments, [activeStage.id]: activeStage.adjustment };
    const nextFeedback = correct ? activeStage.why : `Stronger adjustment: ${activeStage.adjustment}`;
    setSelectedAdjustments(next);
    setFeedback(nextFeedback);
    persistState({ selectedAdjustments: next, feedback: nextFeedback });
    const nextStage = pathway.find((stage) => !next[stage.id]);
    if (nextStage) {
      setActiveStageId(nextStage.id);
      persistState({ activeStageId: nextStage.id, selectedAdjustments: next, feedback: nextFeedback });
    }
  };
  const completeAndContinue = () => {
    if (!completionReady) return;
    setScreenComplete(true);
    markCompleteAndNavigate('module2_screen219_trace_exclusion_pathway', 'M2-S19', 'M2-S20', '/module-2/screen-2-20', onChangeState, {
      activeStageId,
      selectedAdjustments,
      feedback,
    });
  };
  return (
    <main className="m2-s19-screen" aria-labelledby="m2-s219-title">
      <section className="m2-s19-shell">
        <header className="m2-s19-header">
          <div className="m2-s19-title-card">
            <p className="m2-s19-kicker">Module 2 · Exclusion practice</p>
            <h1 id="m2-s219-title">Practice: Trace the Exclusion Pathway</h1>
            <p>Do not stop at “someone was excluded.” Trace where the pathway narrowed, then choose the practical adjustment that opens it.</p>
          </div>
          <aside className="m2-s19-progress" aria-live="polite">
            <span>{completedCount} of {pathway.length} adjustments matched</span>
            <strong>{completionReady ? 'Pathway repaired' : 'Trace and adjust'}</strong>
          </aside>
        </header>

        <section className="m2-s19-board">
          <div className="m2-s19-pathway" role="list" aria-label="Exclusion pathway stages">
            {pathway.map((stage, index) => {
              const complete = selectedAdjustments[stage.id] === stage.adjustment;
              const active = activeStage.id === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  className={`m2-s19-stage ${active ? 'is-active' : ''} ${complete ? 'is-complete' : ''}`}
                  onClick={() => selectStage(stage.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      selectStage(stage.id);
                    }
                  }}
                >
                  <span>{complete ? 'OK' : index + 1}</span>
                  <strong>{stage.label}</strong>
                </button>
              );
            })}
          </div>

          <article className="m2-s19-case">
            <p className="m2-s19-kicker">Where the pathway narrows</p>
            <h2>{activeStage.label}</h2>
            <p>{activeStage.problem}</p>
            <div>
              <strong>Why this matters</strong>
              <span>{selectedAdjustments[activeStage.id] ? activeStage.why : 'Choose an adjustment to reveal the practical rights-based reason.'}</span>
            </div>
          </article>

          <section className="m2-s19-options" aria-label={`Adjust ${activeStage.label}`}>
            <h2>Choose the strongest adjustment</h2>
            {activeStageOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={selectedAdjustments[activeStage.id] === activeStage.adjustment && option === activeStage.adjustment ? 'is-correct' : ''}
                onClick={() => chooseAdjustment(option)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    chooseAdjustment(option);
                  }
                }}
              >
                {option}
              </button>
            ))}
          </section>
        </section>

        <footer className="m2-s19-footer">
          <div className={`m2-s19-feedback ${completionReady ? 'is-complete' : ''}`} aria-live="polite">{feedback}</div>
          <button type="button" className="m2-s19-cta" disabled={!completionReady} aria-disabled={!completionReady} onClick={completeAndContinue}>
            Continue to Module 2 synthesis
          </button>
        </footer>
      </section>
    </main>
  );
}

type InboxMessage = {
  id: string;
  subject: string;
  from: string;
  preview: string;
  message: string;
  correctTags: string[];
  responses: Choice[];
  feedback: string;
};

const rightsLensTags = [
  'Information',
  'Participation',
  'Equality / non-discrimination',
  'Accountability',
  'Power and exclusion',
  'Intersectionality',
  'Duty-bearers / actors',
  'CSO role clarity',
  'Safe standards use',
];

const inboxMessages: InboxMessage[] = [
  {
    id: 'late-information',
    subject: 'Could someone tell us earlier next time?',
    from: 'Cooperative member',
    preview: 'Some of us heard about the buyer visit only the night before.',
    message:
      'Hello. I wanted to say something small. Some of us heard about yesterday’s buyer visit only the night before. The members who already knew the chair or the earlier plan seemed more prepared. Others came late or did not come at all. I am not saying anyone did it on purpose. But it feels like some people always hear first.',
    correctTags: ['Information', 'Power and exclusion', 'Equality / non-discrimination'],
    responses: [
      {
        id: 'strong',
        text: 'Review how information is shared, identify which channels favored already-connected members, and use more than one advance communication route next time.',
        feedback: 'Strongest response selected.',
        status: 'Strongest',
      },
      { id: 'chair', text: 'Tell members to check more often with the chair.', feedback: 'This puts the burden on less-connected members.', status: 'Weak' },
      { id: 'minor', text: 'Assume this is a minor communication issue with no rights dimension.', feedback: 'This misses how information can reproduce unequal access.', status: 'Weak' },
      { id: 'attendance', text: 'Focus only on who attended, not on who heard in time.', feedback: 'Attendance does not show whether people had fair access to information.', status: 'Weak' },
    ],
    feedback: 'This is not just a scheduling issue. It shows that information itself can reproduce unequal access and unequal readiness.',
  },
  {
    id: 'not-influential',
    subject: 'We work, but we are not the ones chosen',
    from: 'Cooperative member',
    preview: 'The same people always meet buyers and finance staff.',
    message:
      'I want to raise something carefully. Many of us work hard in production. We know the product well. But when buyers come, or when there is a meeting with finance people, it is always the same two or three people who are chosen. Maybe they have more experience. But if it stays like this, the rest of us will never gain that experience.',
    correctTags: ['Participation', 'Power and exclusion', 'Equality / non-discrimination', 'Accountability'],
    responses: [
      {
        id: 'strong',
        text: 'Facilitate a safe reflection on role allocation, clarify how public-facing roles are chosen, and explore a fairer pathway for different members to build visible experience.',
        feedback: 'Strongest response selected.',
        status: 'Strongest',
      },
      { id: 'confidence', text: 'Tell members to become more confident individually.', feedback: 'This ignores power, process, and opportunity barriers.', status: 'Weak' },
      { id: 'same', text: 'Keep the same representatives because they are already effective.', feedback: 'This may preserve concentrated influence.', status: 'Weak' },
      { id: 'jealousy', text: 'Treat the issue as personal jealousy.', feedback: 'This dismisses a practical participation and power issue.', status: 'Weak' },
    ],
    feedback: 'This is a participation and power issue, not only a personality issue. Inclusion without influence is still a rights-based concern.',
  },
  {
    id: 'silence-feedback',
    subject: 'I am not sure what happened after we raised it',
    from: 'Member representative',
    preview: 'People raised concerns before, but no one knows what happened next.',
    message:
      'Last month, some members raised concerns about how decisions were being explained. The facilitator listened, and that was appreciated. But since then, nobody knows whether the concern was discussed, whether anything changed, or whether it was considered important. Now some members are saying there is no point in raising issues.',
    correctTags: ['Accountability', 'Participation'],
    responses: [
      {
        id: 'strong',
        text: 'Close the accountability loop by sharing what concern was raised in general terms, what was reviewed, what can change, and what cannot change yet.',
        feedback: 'Strongest response selected.',
        status: 'Strongest',
      },
      { id: 'channel', text: 'Add another complaint channel immediately.', feedback: 'The main break is response, not collection.', status: 'Weak' },
      { id: 'wait', text: 'Wait for more complaints before responding.', feedback: 'Waiting can deepen low trust.', status: 'Weak' },
      { id: 'resolved', text: 'Assume silence means the concern is resolved.', feedback: 'Silence may mean people stopped trusting the process.', status: 'Weak' },
    ],
    feedback: 'The main break here is not collection. It is response and visible follow-up.',
  },
  {
    id: 'workload-benefit',
    subject: 'Some of us are carrying too much',
    from: 'Field facilitator note',
    preview: 'A few members say the cooperative work increased income but also increased unpaid workload.',
    message:
      'From today’s follow-up conversation: Several members said they value the cooperative and want it to continue. But at least three women said their day has become much heavier. Production work has increased, yet cooking, childcare, water collection, and home responsibilities have not reduced. One member said, “The opportunity is helping me, but it is also stretching me.”',
    correctTags: ['Intersectionality', 'Equality / non-discrimination', 'Participation'],
    responses: [
      {
        id: 'strong',
        text: 'Treat this as a rights-based participation and equality issue, look deeper into how the opportunity is experienced differently, and avoid assuming income means equal benefit.',
        feedback: 'Strongest response selected.',
        status: 'Strongest',
      },
      { id: 'income', text: 'Celebrate the income result and ignore the workload issue.', feedback: 'Income can improve while unequal costs remain hidden.', status: 'Weak' },
      { id: 'normal', text: 'Tell members this is normal when starting a business.', feedback: 'This normalizes a barrier instead of examining it.', status: 'Weak' },
      { id: 'indicator', text: 'Move immediately into indicator design.', feedback: 'This jumps ahead before understanding the rights-based pattern.', status: 'Weak' },
    ],
    feedback: 'This message shows that the same opportunity can carry unequal costs. That is an intersectionality and equality issue, not just a productivity issue.',
  },
  {
    id: 'actor-confusion',
    subject: 'Who is actually responsible for this part?',
    from: 'Project officer',
    preview: 'We are trying to fix everything ourselves.',
    message:
      'I am worried the team is trying to handle every issue directly. We are helping with training, meetings, buyer contact, feedback concerns, cooperative rules, and even explaining finance requirements. Some of this is appropriate, but some of it feels like we are slowly becoming the cooperative office, complaint handler, and market mediator all at once. I think we need clearer role boundaries.',
    correctTags: ['CSO role clarity', 'Duty-bearers / actors', 'Accountability'],
    responses: [
      {
        id: 'strong',
        text: 'Pause and map which issues the CSO should adjust directly, which require rights-holder voice, and which should be engaged with other actors rather than absorbed by the CSO.',
        feedback: 'Strongest response selected.',
        status: 'Strongest',
      },
      { id: 'takeover', text: 'Let the CSO take over until the system improves.', feedback: 'This deepens overreach risk.', status: 'Weak' },
      { id: 'withdraw', text: 'Withdraw from all support immediately.', feedback: 'This abandons useful support rather than clarifying roles.', status: 'Weak' },
      { id: 'internal', text: 'Treat role confusion as only an internal management issue.', feedback: 'This misses duty-bearers, supporting actors, and accountability.', status: 'Weak' },
    ],
    feedback: 'This is a classic HRBA role-clarity issue. A rights-based CSO supports, connects, and strengthens accountability, but should not quietly replace everyone else.',
  },
];

export function Module2ProjectManagerInbox({ state, onChangeState }: Props) {
  const initial = useInitial(() => {
    const stored = state.practiceCheckState?.module2_screen220_project_manager_inbox;
    return {
      selectedMessageId: stored?.selectedMessageId || inboxMessages[0].id,
      messageTags: stored?.messageTags || {},
      messageResponses: stored?.messageResponses || {},
      feedbackViewed: stored?.feedbackViewed || {},
      priorityChoice: stored?.priorityChoice || '',
      synthesisViewed: stored?.synthesisViewed === true,
      reflectionChoiceSelected: stored?.reflectionChoiceSelected || '',
      screenComplete: (state.screenProgress[MODULE_ID] || []).includes('M2-S7-03'),
    };
  });
  const [selectedMessageId, setSelectedMessageId] = useState(initial.selectedMessageId);
  const [messageTags, setMessageTags] = useState<Record<string, string[]>>(initial.messageTags);
  const [messageResponses, setMessageResponses] = useState<Record<string, string>>(initial.messageResponses);
  const [feedbackViewed, setFeedbackViewed] = useState<Record<string, boolean>>(initial.feedbackViewed);
  const [priorityChoice, setPriorityChoice] = useState(initial.priorityChoice);
  const [synthesisViewed, setSynthesisViewed] = useState(initial.synthesisViewed);
  const [reflectionChoiceSelected, setReflectionChoiceSelected] = useState(initial.reflectionChoiceSelected);
  const [screenComplete, setScreenComplete] = useState(initial.screenComplete);
  const selectedMessage = inboxMessages.find((message) => message.id === selectedMessageId) || inboxMessages[0];
  const completedMessages = inboxMessages.filter((message) => (messageTags[message.id] || []).length > 0 && messageResponses[message.id] && feedbackViewed[message.id]);
  const completionReady = completedMessages.length === inboxMessages.length && Boolean(priorityChoice) && synthesisViewed && Boolean(reflectionChoiceSelected);

  const persistState = (next: Record<string, unknown> = {}) => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        module2_screen220_project_manager_inbox: {
          screenId: 'M2-S7-03',
          selectedMessageId,
          messageTags,
          messageResponses,
          feedbackViewed,
          priorityChoice,
          synthesisViewed,
          reflectionChoiceSelected,
          completionStatus: 'in_progress',
          ...next,
        },
      },
    }));
  };
  useEffect(() => {
    persistState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const toggleTag = (tag: string) => {
    const current = messageTags[selectedMessage.id] || [];
    const nextTags = current.includes(tag) ? current.filter((item) => item !== tag) : current.length < 3 ? [...current, tag] : current;
    const next = { ...messageTags, [selectedMessage.id]: nextTags };
    setMessageTags(next);
    persistState({ messageTags: next });
  };
  const chooseResponse = (responseId: string) => {
    const nextResponses = { ...messageResponses, [selectedMessage.id]: responseId };
    const nextFeedback = { ...feedbackViewed, [selectedMessage.id]: true };
    setMessageResponses(nextResponses);
    setFeedbackViewed(nextFeedback);
    persistState({ messageResponses: nextResponses, feedbackViewed: nextFeedback });
  };
  const completeAndContinue = () => {
    if (!completionReady) return;
    setScreenComplete(true);
    markCompleteAndNavigate('module2_screen220_project_manager_inbox', 'M2-S7-03', 'M2-S7-04', '/module-2/screen-2-21', onChangeState, {
      selectedMessageId,
      messageTags,
      messageResponses,
      feedbackViewed,
      priorityChoice,
      synthesisViewed,
      reflectionChoiceSelected,
    });
  };
  const selectedResponse = selectedMessage.responses.find((response) => response.id === messageResponses[selectedMessage.id]);

  return (
    <main className="m2-s32-screen" aria-labelledby="m2-s220-title">
      <section className="m2-s32-shell">
        <Header id="m2-s220-title" context="Module 2 · Applied challenge" title="Module Challenge: The Project Manager’s Inbox" statement="A strong HRBA response begins with accurate noticing.">
          <p>You are reviewing messages received after the latest round of cooperative meetings, market visits, and follow-up conversations.</p>
          <p>Your job is to notice the rights-based issue, identify the strongest first move, and avoid weak or misleading responses.</p>
        </Header>
        <StoryCard title="Your role in this challenge" footer="The rights lens is for everyday project judgment, not only workshop theory.">
          <p>Imagine you are the CSO project manager reviewing today’s inbox. For each message, read carefully, identify the main rights-based issue, choose the strongest first response, and decide which issue needs urgent follow-up.</p>
        </StoryCard>
        <section className="m2-s35-practice" aria-label="Interactive project manager inbox">
          <div className="m2-s35-tabs" role="tablist" aria-label="Inbox messages">
            {inboxMessages.map((message, index) => {
              const complete = completedMessages.some((item) => item.id === message.id);
              return (
                <button key={message.id} type="button" role="tab" aria-selected={message.id === selectedMessageId} className={`${message.id === selectedMessageId ? 'is-active' : ''} ${complete ? 'is-completed' : ''}`} onClick={() => { setSelectedMessageId(message.id); persistState({ selectedMessageId: message.id }); }}>
                  <span>{complete ? '✓' : index + 1}</span>
                  {message.subject}
                </button>
              );
            })}
          </div>
          <article className="m2-s35-scenario-card">
            <p className="m2-s35-kicker">From: {selectedMessage.from}</p>
            <h2>{selectedMessage.subject}</h2>
            <p>{selectedMessage.preview}</p>
            <p>{selectedMessage.message}</p>
          </article>
          <aside className="m2-s35-followup">
            <p className="m2-s35-kicker">Rights-lens tags</p>
            <h2>Tag the issue</h2>
            <p>Select up to three tags.</p>
            <div className="m2-s35-hotspot-grid">
              {rightsLensTags.map((tag) => {
                const active = (messageTags[selectedMessage.id] || []).includes(tag);
                return (
                  <button key={tag} type="button" className={active ? 'is-opened' : ''} onClick={() => toggleTag(tag)}>
                    <span>{active ? '✓' : '+'}</span>
                    {tag}
                  </button>
                );
              })}
            </div>
            <h2>Choose the strongest first response</h2>
            <fieldset className="m2-s35-choice-grid">
              <legend className="sr-only">Choose a response for {selectedMessage.subject}</legend>
              {selectedMessage.responses.map((response) => (
                <label key={response.id} className={`m2-s35-choice-card ${messageResponses[selectedMessage.id] === response.id ? 'is-selected' : ''}`}>
                  <input type="radio" name={`response-${selectedMessage.id}`} checked={messageResponses[selectedMessage.id] === response.id} onChange={() => chooseResponse(response.id)} />
                  <strong>{response.text}</strong>
                </label>
              ))}
            </fieldset>
            {selectedResponse && (
              <div className="m2-s35-feedback" aria-live="polite">
                <p className="m2-s35-kicker">{selectedResponse.status}</p>
                <p>{selectedResponse.feedback}</p>
                <p>{selectedMessage.feedback}</p>
              </div>
            )}
          </aside>
        </section>
        <section className="m2-s32-cards">
          <SectionHead kicker="Priority sorting activity" title="Which issue needs the most urgent follow-up?" text="Now that you have reviewed all five messages, choose the one that needs the most urgent follow-up first." />
          <fieldset className="m2-s32-choice-grid">
            <legend className="sr-only">Choose the most urgent message</legend>
            {inboxMessages.map((message) => (
              <label key={message.id} className={`m2-s32-choice-card ${priorityChoice === message.id ? 'is-selected' : ''}`}>
                <input type="radio" name="m2-s220-priority" checked={priorityChoice === message.id} onChange={() => { setPriorityChoice(message.id); persistState({ priorityChoice: message.id }); }} />
                <span>{message.from}</span>
                <strong>{message.subject}</strong>
              </label>
            ))}
          </fieldset>
          {priorityChoice && (
            <div className="m2-s32-feedback" aria-live="polite">
              All five issues matter. The recommended strongest immediate priority is Message 3 — Silence after feedback — because when people start believing that speaking up changes nothing, trust in the process weakens quickly.
            </div>
          )}
        </section>
        <section className="m2-s35-synthesis">
          <div>
            <p className="m2-s35-kicker">Synthesis panel</p>
            <h2>What the inbox revealed</h2>
            <p>The inbox did not show five separate random problems. It showed uneven information, unequal participation, concentrated influence, incomplete accountability, different costs of opportunity, and blurred CSO roles.</p>
          </div>
          <button type="button" onClick={() => { setSynthesisViewed(true); persistState({ synthesisViewed: true }); }}>{synthesisViewed ? 'Synthesis viewed' : 'Mark synthesis viewed'}</button>
        </section>
        <ReflectionPrompt title="What did you notice yourself paying attention to most?" text="Choose the lens that felt most useful to you during the inbox challenge." options={['Who was affected differently', 'Where power was shaping the process', 'Whether participation was truly meaningful', 'Whether accountability was completed', 'What the CSO should and should not take over']} selected={reflectionChoiceSelected} onSelect={(value) => { setReflectionChoiceSelected(value); persistState({ reflectionChoiceSelected: value }); }} />
        <ContinueFooter insight="HRBA becomes practical when you can notice the pattern behind everyday messages: who is being missed, what barrier is appearing, who has power, who has responsibility, and what the strongest first response should be." nextText="Next, we will bring the module together into a simple everyday rights lens you can carry into your own CSO work." buttonText="Continue to Module 2 synthesis" disabledText="Complete all five inbox messages, choose a priority, view the synthesis, and select a reflection." ready={completionReady} onClick={completeAndContinue} screenComplete={screenComplete} />
      </section>
    </main>
  );
}

const lensQuestions: RevealCard[] = [
  { id: 'affected', title: 'Who is affected?', text: 'Start by identifying the rights-holders. Do not stop at broad phrases such as “the community,” “beneficiaries,” or “women.”', detail: 'Example: Aster and Alemitu are both members, but they do not experience the opportunity in the same way.', tag: 'Watch out: broad labels hide differences that matter.' },
  { id: 'missed', title: 'Who is being missed?', text: 'Look for who is absent, quieter, less visible, informed later, less trusted, or benefiting less.', detail: 'Example: some women heard later through weaker networks and some members stayed outside public-facing roles.', tag: 'Watch out: being present is not proof of full inclusion.' },
  { id: 'barrier', title: 'What barrier is shaping this?', text: 'Trace the actual barrier: late information, unclear terms, weak facilitation, care burden, role allocation, low trust, unsafe feedback, market bias, or institutional rules.', detail: 'Example: Alemitu’s challenge involved weaker networks, lower assumed credibility, and fewer visible-role opportunities.', tag: 'Watch out: if the barrier is vague, the response will also be vague.' },
  { id: 'power', title: 'Who has power or responsibility?', text: 'Separate rights-holders, public actors with responsibility, actors with strong influence, supporting actors, and the CSO’s own role.', detail: 'Example: cooperative voice may involve leaders, buyers, public offices, support actors, and the CSO in different ways.', tag: 'Watch out: do not turn every barrier into a CSO-only task.' },
  { id: 'participation', title: 'Is participation meaningful?', text: 'Ask whether people had clear information, could speak safely, were taken seriously, influenced the outcome, and understood what happened next.', detail: 'Example: a full meeting room is not meaningful if only a few understood, spoke, and influenced the decision.', tag: 'Watch out: attendance is not influence.' },
  { id: 'accountability', title: 'Is accountability real?', text: 'Look beyond whether a channel exists. Ask whether people know how to raise concerns, can use the process safely, receive a response, and see repeated issues lead to change.', detail: 'Example: listening privately is not enough if members never hear what happened afterward.', tag: 'Watch out: a complaint box is not accountability.' },
  { id: 'role', title: 'What is the right CSO role?', text: 'Choose the role that fits: facilitator, capacity-strengthener, connector, evidence holder, safe advocate, accountability supporter, or adaptive learner.', detail: 'Example: the CSO may improve facilitation, connect members to actors, or document a repeated exclusion pattern.', tag: 'Watch out: do not overpromise, speak over rights-holders, or replace other actors.' },
];

const snapbackItems: RevealCard[] = [
  { id: 'affected', title: 'Who is affected?', text: 'Which members were affected by the decision?' },
  { id: 'missed', title: 'Who is being missed?', text: 'Who was present but less visible, less informed, or less influential?' },
  { id: 'barrier', title: 'What barrier is shaping this?', text: 'Was the main issue information, pace, confidence, credibility, role allocation, or weak follow-up?' },
  { id: 'power', title: 'Who has power or responsibility?', text: 'Which actors shaped the decision, and who should respond?' },
  { id: 'participation', title: 'Is participation meaningful?', text: 'Did members understand, speak, and influence the result?' },
  { id: 'accountability', title: 'Is accountability real?', text: 'If someone disagreed, did they know how to raise it and hear back?' },
  { id: 'role', title: 'What is the right CSO role?', text: 'What should the CSO improve, support, connect, or raise?' },
];

const quickPractice = [
  { id: 'attendance', statement: '“Attendance was very high.”', options: ['Was the room large enough?', 'Who attended, and who may still have been left at the edge?', 'Did the event finish on time?'], correct: 'Who attended, and who may still have been left at the edge?', feedback: 'High attendance is not enough without asking who was missed or less able to participate meaningfully.' },
  { id: 'silence', statement: '“No one raised concerns.”', options: ['Good, then the process worked.', 'Were there enough chairs?', 'Did people understand the process, trust it, and feel safe using it?'], correct: 'Did people understand the process, trust it, and feel safe using it?', feedback: 'Silence can mean trust, but it can also mean confusion, low confidence, or fear.' },
  { id: 'representative', statement: '“The same representative will attend again.”', options: ['Is that the fastest option?', 'Who gets visible opportunities, and how are those choices made?', 'Did the representative agree?'], correct: 'Who gets visible opportunities, and how are those choices made?', feedback: 'This opens questions about influence, role allocation, and fair opportunity.' },
];

export function Module2EverydayRightsLensSynthesis({ state, onChangeState }: Props) {
  const synthesisLens = [
    { id: 'affected', title: 'Who is affected?', cue: 'Start with people, not only activities.', text: 'Look at who experiences the decision, service, meeting, or opportunity.' },
    { id: 'missed', title: 'Who might be missed?', cue: 'Presence is not the same as inclusion.', text: 'Check who is absent, quiet, late-informed, less confident, or less influential.' },
    { id: 'barrier', title: 'What barrier is shaping this?', cue: 'Name the practical blockage.', text: 'Look for barriers in information, timing, language, safety, power, trust, or process.' },
    { id: 'power', title: 'Who has power or responsibility?', cue: 'Separate influence from duty.', text: 'Notice who sets the agenda, controls information, decides, responds, or should be engaged.' },
    { id: 'participation', title: 'Is participation meaningful?', cue: 'Go beyond attendance.', text: 'Ask whether people understand, speak safely, are considered, and influence what happens.' },
    { id: 'accountability', title: 'Is accountability real?', cue: 'Close the response loop.', text: 'Check whether people know how to raise concerns, receive responses, and see repeated issues lead to change.' },
    { id: 'role', title: 'What is the right CSO role?', cue: 'Support without taking over.', text: 'Choose a realistic role: facilitate, connect, strengthen capacity, document patterns, or support safe accountability.' },
  ] as const;

  const initial = useInitial(() => {
    const stored = state.practiceCheckState?.module2_screen221_everyday_rights_lens;
    return {
      openedLensQuestions: Array.isArray(stored?.openedLensQuestions) ? stored.openedLensQuestions : [],
      activeQuestionId: stored?.activeQuestionId || synthesisLens[0].id,
      screenComplete: (state.screenProgress[MODULE_ID] || []).includes('M2-S20'),
    };
  });
  const [openedLensQuestions, setOpenedLensQuestions] = useState<string[]>(initial.openedLensQuestions);
  const [activeQuestionId, setActiveQuestionId] = useState<string>(initial.activeQuestionId);
  const [screenComplete, setScreenComplete] = useState(initial.screenComplete);
  const activeQuestion = synthesisLens.find((item) => item.id === activeQuestionId) || synthesisLens[0];
  const completionReady = openedLensQuestions.length === synthesisLens.length;
  const persistState = (next: Record<string, unknown> = {}) => {
    onChangeState((prev) => ({ ...prev, practiceCheckState: { ...prev.practiceCheckState, module2_screen221_everyday_rights_lens: { screenId: 'M2-S20', openedLensQuestions, activeQuestionId, completionStatus: 'in_progress', ...next } } }));
  };
  useEffect(() => { persistState(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const openQuestion = (id: string) => {
    const next = addUnique(openedLensQuestions, id);
    setOpenedLensQuestions(next);
    setActiveQuestionId(id);
    persistState({ openedLensQuestions: next, activeQuestionId: id });
  };
  const completeAndContinue = () => {
    if (!completionReady) return;
    setScreenComplete(true);
    markCompleteAndNavigate('module2_screen221_everyday_rights_lens', 'M2-S20', 'M2-S21', '/module-2/screen-2-21', onChangeState, { openedLensQuestions, activeQuestionId });
  };
  return (
    <main className="m2-s20-screen" aria-labelledby="m2-s220-title">
      <section className="m2-s20-shell">
        <header className="m2-s20-header">
          <div className="m2-s20-title-card">
            <p className="m2-s20-kicker">Module 2 · Synthesis</p>
            <h1 id="m2-s220-title">Module 2 Synthesis: The Everyday Rights Lens</h1>
            <p>You do not need to memorize every term. Carry seven practical questions into ordinary CSO decisions, meetings, designs, and follow-up.</p>
          </div>
          <aside className="m2-s20-progress" aria-live="polite">
            <span>{openedLensQuestions.length} of {synthesisLens.length} lens questions reviewed</span>
            <strong>{completionReady ? 'Lens ready' : 'Review the full lens'}</strong>
          </aside>
        </header>

        <section className="m2-s20-board">
          <div className="m2-s20-orbit" aria-label="Seven-question everyday rights lens">
            <div className="m2-s20-center">
              <strong>Pause and look again</strong>
              <span>Move from quick assumptions to sharper CSO questions.</span>
            </div>
            {synthesisLens.map((item, index) => {
              const opened = openedLensQuestions.includes(item.id);
              const active = activeQuestion.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`m2-s20-lens m2-s20-lens--${index + 1} ${active ? 'is-active' : ''} ${opened ? 'is-opened' : ''}`}
                  onClick={() => openQuestion(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openQuestion(item.id);
                    }
                  }}
                >
                  <span>{opened ? 'OK' : index + 1}</span>
                  <strong>{item.title}</strong>
                </button>
              );
            })}
          </div>

          <article className="m2-s20-detail">
            <p className="m2-s20-kicker">Selected lens question</p>
            <h2>{activeQuestion.title}</h2>
            <strong>{activeQuestion.cue}</strong>
            <p>{activeQuestion.text}</p>
            <div>
              Use this before you design an activity, facilitate a meeting, explain a decision, write a report, or respond to a concern.
            </div>
          </article>
        </section>

        <footer className="m2-s20-footer">
          <div className={`m2-s20-feedback ${completionReady ? 'is-complete' : ''}`} aria-live="polite">
            {completionReady ? 'The full everyday rights lens is reviewed. You can carry it into the portfolio checkpoint.' : 'Open each lens question to complete the Module 2 synthesis.'}
          </div>
          <button type="button" className="m2-s20-cta" disabled={!completionReady} aria-disabled={!completionReady} onClick={completeAndContinue}>
            Continue to portfolio checkpoint
          </button>
        </footer>
      </section>
    </main>
  );
}

const checkpointSteps = [
  { id: 'affected', prompt: 'Who is most clearly affected in this scenario?', correct: 'The whole group is affected, but some members are affected differently, especially newer or less influential members.', options: ['Only the chair is affected because they are leading the meeting.', 'The whole group is affected, but some members are affected differently, especially newer or less influential members.', 'Only the facilitator is affected because they heard the follow-up comment.'], feedback: 'A rights-based reading starts broad enough to see the whole group, but specific enough to notice unequal experience inside it.' },
  { id: 'missed', prompt: 'Who may be getting less from this process?', correct: 'Members who are newer, quieter, less confident with the topic, or less used to speaking early.', options: ['Members who are newer, quieter, less confident with the topic, or less used to speaking early.', 'No one, because most people attended.', 'Only people who were absent.'], feedback: 'Being missed is not only about absence. It can also mean being present but less informed, less heard, or less influential.' },
  { id: 'barrier', prompt: 'What is the strongest barrier in this scenario?', correct: 'A few early speakers and weak explanation of options narrowed meaningful participation.', options: ['The meeting was too short.', 'A few early speakers and weak explanation of options narrowed meaningful participation.', 'There was no community mobilization campaign.'], feedback: 'The main issue is how pace, explanation, and early voice shaped who could influence the process.' },
  { id: 'power', prompt: 'Who most clearly holds power or responsibility in this situation?', correct: 'The chair, the meeting process, and the CSO facilitator all matter, but in different ways.', options: ['Only the donor.', 'The chair, the meeting process, and the CSO facilitator all matter, but in different ways.', 'Only the members who stayed silent.'], feedback: 'A rights lens separates roles instead of blaming one actor too quickly.' },
  { id: 'participation', prompt: 'How would you judge participation here?', correct: 'Weak to partial, because attendance was stronger than understanding, voice, and influence.', options: ['Meaningful, because most members attended.', 'Weak to partial, because attendance was stronger than understanding, voice, and influence.', 'Fully meaningful, because a decision was made.'], feedback: 'Participation was visible, but not clearly meaningful for all members.' },
  { id: 'accountability', prompt: 'What does the follow-up comment suggest about accountability?', correct: 'Accountability may be weak, because a member was present but still unsure whether her voice counted.', options: ['Accountability may be weak, because a member was present but still unsure whether her voice counted.', 'Accountability is strong because a meeting was held.', 'Accountability is not relevant here.'], feedback: 'Accountability includes whether people understand how their input mattered and whether they can raise concerns safely.' },
  { id: 'role', prompt: 'What is the strongest CSO role in the immediate next step?', correct: 'Facilitate a better process: clarify options, widen voice, and make the decision link more visible.', options: ['Take over all future group decisions directly.', 'Facilitate a better process: clarify options, widen voice, and make the decision link more visible.', 'Step back completely because the group already met.'], feedback: 'This fits the CSO’s role without overreaching.' },
];

export function Module2PortfolioCheckpointLens({ state, onChangeState }: Props) {
  const portfolioFields = [
    {
      id: 'broad_issue_or_situation',
      label: 'Broad issue or situation',
      placeholder: 'A community process looked participatory, but some people may not have had equal voice or influence.',
    },
    {
      id: 'affected_differently',
      label: 'Who is affected differently?',
      placeholder: 'Newer, quieter, or less-connected members may be left at the edge.',
    },
    {
      id: 'main_barrier',
      label: 'Main barrier',
      placeholder: 'Explanation, early voice, and meeting process can shape who understands and influences decisions.',
    },
    {
      id: 'power_or_responsibility_issue',
      label: 'Power or responsibility issue',
      placeholder: 'Power may sit partly with the chair, meeting sequence, and those who summarize decisions.',
    },
    {
      id: 'participation_judgment',
      label: 'Participation judgment',
      placeholder: 'Participation is visible, but not clearly meaningful for all members.',
    },
    {
      id: 'accountability_concern',
      label: 'Accountability concern',
      placeholder: 'People may not understand whether their input mattered or how to raise concerns safely.',
    },
    {
      id: 'strongest_cso_role',
      label: 'Strongest CSO role',
      placeholder: 'Facilitate a better process, widen voice, clarify options, and make the decision link more visible without taking over.',
    },
  ] as const;
  const habitOptions = [
    'I will check who may be present but not heard.',
    'I will ask who is affected differently.',
    'I will check whether accountability is completed.',
    'I will clarify the CSO role before acting.',
    'I will look for where power shapes participation.',
  ];
  const initial = useInitial(() => {
    const stored = state.practiceCheckState?.module2_screen222_portfolio_checkpoint_lens;
    const savedEntry = stored?.portfolioObject || state.practiceCheckState?.my_portfolio?.module2;
    return {
      summaryFields: stored?.summaryFields || portfolioFields.reduce<Record<string, string>>((acc, field) => ({ ...acc, [field.id]: savedEntry?.[field.id] || field.placeholder }), {}),
      carryForwardHabit: stored?.carryForwardHabit || savedEntry?.carry_forward_habit || '',
      customHabit: stored?.customHabit || savedEntry?.custom_habit || '',
      portfolioSaved: stored?.portfolioSaved === true || savedEntry?.status === 'completed',
      screenComplete: (state.screenProgress[MODULE_ID] || []).includes('M2-S21'),
    };
  });
  const [summaryFields, setSummaryFields] = useState<Record<string, string>>(initial.summaryFields);
  const [carryForwardHabit, setCarryForwardHabit] = useState(initial.carryForwardHabit);
  const [customHabit, setCustomHabit] = useState(initial.customHabit);
  const [portfolioSaved, setPortfolioSaved] = useState(initial.portfolioSaved);
  const [screenComplete, setScreenComplete] = useState(initial.screenComplete);
  const habitReady = Boolean(carryForwardHabit || customHabit.trim());
  const portfolioObject = {
    module: 'Module 2',
    portfolio_title: 'My Everyday Rights Lens',
    status: portfolioSaved ? 'completed' : 'in_progress',
    broad_issue_or_situation: summaryFields.broad_issue_or_situation || '',
    affected_differently: summaryFields.affected_differently || '',
    main_barrier: summaryFields.main_barrier || '',
    power_or_responsibility_issue: summaryFields.power_or_responsibility_issue || '',
    participation_judgment: summaryFields.participation_judgment || '',
    accountability_concern: summaryFields.accountability_concern || '',
    strongest_cso_role: summaryFields.strongest_cso_role || '',
    carry_forward_habit: carryForwardHabit,
    custom_habit: customHabit,
    privacy: 'private_by_default',
    preview_text: 'I identified who may be affected differently, what barrier shaped participation, where power or responsibility sits, and what CSO role is safest.',
  };
  const persistState = (next: Record<string, unknown> = {}) => onChangeState((prev) => ({ ...prev, practiceCheckState: { ...prev.practiceCheckState, module2_screen222_portfolio_checkpoint_lens: { screenId: 'M2-S21', summaryFields, carryForwardHabit, customHabit, portfolioSaved, portfolioObject, completionStatus: portfolioSaved ? 'completed' : 'in_progress', ...next } } }));
  useEffect(() => { persistState(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateField = (id: string, value: string) => {
    const next = { ...summaryFields, [id]: value };
    setSummaryFields(next);
    setPortfolioSaved(false);
    persistState({ summaryFields: next, portfolioSaved: false, portfolioObject: { ...portfolioObject, [id]: value, status: 'in_progress' } });
  };
  const savePortfolio = () => {
    if (!habitReady) return;
    const savedObject = { ...portfolioObject, status: 'completed' };
    setPortfolioSaved(true);
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        my_portfolio: {
          ...(prev.practiceCheckState?.my_portfolio || {}),
          module2: savedObject,
        },
        module2_screen222_portfolio_checkpoint_lens: {
          screenId: 'M2-S21',
          summaryFields,
          carryForwardHabit,
          customHabit,
          portfolioSaved: true,
          portfolioObject: savedObject,
          completionStatus: 'completed',
        },
      },
    }));
  };
  const completeAndContinue = () => {
    if (!portfolioSaved) {
      savePortfolio();
      return;
    }
    setScreenComplete(true);
    markCompleteAndNavigate('module2_screen222_portfolio_checkpoint_lens', 'M2-S21', 'M2-S22', '/module-2/screen-2-22', onChangeState, {
      summaryFields,
      carryForwardHabit,
      customHabit,
      portfolioSaved: true,
      portfolioObject: { ...portfolioObject, status: 'completed' },
    });
  };
  return (
    <main className="m2-s21-portfolio-screen" aria-labelledby="m2-s221-title">
      <section className="m2-s21-portfolio-shell">
        <header className="m2-s21-portfolio-header">
          <div className="m2-s21-portfolio-title">
            <p className="m2-s21-portfolio-kicker">MODULE 2 · PORTFOLIO CHECKPOINT</p>
            <h1 id="m2-s221-title">Portfolio Checkpoint: My Everyday Rights Lens</h1>
            <p>Review the rights-lens summary you built in this module. Edit only if needed, choose one habit to carry forward, then save it to My Portfolio.</p>
          </div>
          <aside className="m2-s21-portfolio-privacy">
            <strong>Saved privately by default.</strong>
            <span>Keep this broad and safe. Do not enter names, real complaints, safeguarding details, legal disputes, confidential documents, beneficiary lists, or raw organizational data.</span>
          </aside>
        </header>

        <section className="m2-s21-portfolio-grid">
          <article className="m2-s21-summary-card">
            <div className="m2-s21-card-head">
              <p className="m2-s21-portfolio-kicker">Portfolio summary card</p>
              <h2>My Everyday Rights Lens Summary</h2>
              <span>This summary will appear in your My Portfolio page under Module 2.</span>
            </div>
            <div className="m2-s21-field-grid">
              {portfolioFields.map((field) => (
                <label key={field.id} className="m2-s21-field-card">
                  <span>{field.label}</span>
                  <textarea
                    value={summaryFields[field.id]}
                    onChange={(event) => updateField(field.id, event.target.value)}
                    rows={2}
                  />
                </label>
              ))}
            </div>
          </article>

          <aside className="m2-s21-habit-card">
            <div className="m2-s21-card-head">
              <p className="m2-s21-portfolio-kicker">Carry-forward habit</p>
              <h2>One habit to carry forward</h2>
              <span>Choose one practical HRBA habit to use in your everyday CSO work.</span>
            </div>
            <div className="m2-s21-habit-options" role="radiogroup" aria-label="Choose one carry-forward habit">
              {habitOptions.map((habit) => (
                <button
                  key={habit}
                  type="button"
                  className={carryForwardHabit === habit ? 'is-selected' : ''}
                  role="radio"
                  aria-checked={carryForwardHabit === habit}
                  onClick={() => {
                    setCarryForwardHabit(habit);
                    setPortfolioSaved(false);
                    persistState({ carryForwardHabit: habit, portfolioSaved: false });
                  }}
                >
                  {habit}
                </button>
              ))}
            </div>
            <label className="m2-s21-custom-habit">
              <span>Or write one safe sentence in your own words</span>
              <textarea
                value={customHabit}
                onChange={(event) => {
                  setCustomHabit(event.target.value);
                  setPortfolioSaved(false);
                  persistState({ customHabit: event.target.value, portfolioSaved: false });
                }}
                placeholder="Write a broad, non-identifying habit..."
                rows={3}
              />
            </label>
          </aside>
        </section>

        <footer className="m2-s21-save-strip">
          <div>
            <strong>This will be saved to My Portfolio as:</strong>
            <span>Module 2 — My Everyday Rights Lens</span>
            {portfolioSaved && <em>Module 2 portfolio entry saved. You can review or edit it later from My Portfolio.</em>}
          </div>
          <button type="button" disabled={!habitReady} aria-disabled={!habitReady} onClick={completeAndContinue}>
            Save to My Portfolio and Continue
          </button>
          {screenComplete && <span className="sr-only">Screen complete.</span>}
        </footer>
      </section>
    </main>
  );
}

const module2KnowledgeCheck = [
  {
    id: 'm2-kc-q1',
    title: 'Everyday rights concern',
    scenario: 'A local CSO supports a mobile outreach day in a rural kebele. Attendance is high, and the team reports that the activity reached more people than expected. Later, some community members say they arrived after the service closed because transport was limited. Others say the explanation was too technical and rushed. A few people are unsure whether the referral points mentioned during the session will actually accept them.',
    prompt: 'What is the strongest HRBA interpretation of this situation?',
    strongestAnswer: 'B',
    takeaway: 'Human rights often appear as practical questions about access, information, responsibility, and response.',
    choices: [
      { id: 'A', text: 'The activity was successful because attendance exceeded the target.', feedback: 'Not quite. High attendance is useful information, but it does not show whether people had equal access, understood the information, or knew what response to expect.' },
      { id: 'B', text: 'The activity raises practical rights questions about access, understandable information, referral responsibility, and follow-up.', feedback: 'Strongest answer. This recognizes several rights dimensions without overclaiming: access, information, responsibility, and response all need attention.' },
      { id: 'C', text: 'The CSO should declare that human rights were violated.', feedback: 'Not quite. The situation raises rights-related concerns, but the CSO should avoid making a legal conclusion without careful analysis.' },
      { id: 'D', text: 'The CSO should repeat the same outreach day in the same place so more people can attend.', feedback: 'Partly useful, but incomplete. Repeating the activity may help, but only if the CSO first understands and addresses the barriers.' },
    ],
  },
  {
    id: 'm2-kc-q2',
    title: 'Actor roles and CSO boundaries',
    scenario: 'After flooding, families report blocked drainage, inaccessible temporary shelters, and unclear relocation information. A local CSO has limited funds and cannot repair all infrastructure or make official relocation decisions. Staff are discussing what role the organization should play.',
    prompt: 'Which response best reflects a rights-based ecosystem?',
    strongestAnswer: 'B',
    takeaway: 'A rights-based CSO supports accountability without taking over every responsibility.',
    choices: [
      { id: 'A', text: 'Repair the drainage directly because the community needs fast action.', feedback: 'Partly useful, but incomplete. Direct repair may be needed in some urgent cases, but it can also hide the responsibilities of duty-bearers and other actors.' },
      { id: 'B', text: 'Document barriers, support affected people to raise concerns safely, engage responsible public offices, and coordinate with other actors.', feedback: 'Strongest answer. This balances rights-holder support, evidence, coordination, duty-bearer engagement, and realistic CSO role boundaries.' },
      { id: 'C', text: 'Focus only on distributing emergency items because drainage and relocation are outside the CSO mandate.', feedback: 'Not quite. The CSO may not control drainage or relocation decisions, but it can still support accountability, information, and coordination.' },
      { id: 'D', text: 'Ask community leaders to select the most affected families so the CSO can avoid delay.', feedback: 'Not quite. Leader input may be useful, but relying only on leaders can reinforce gatekeeping and miss less visible households.' },
    ],
  },
  {
    id: 'm2-kc-q3',
    title: 'Participation and influence',
    scenario: 'A youth livelihoods project holds a consultation after the proposal is already mostly written. Youth representatives attend and give comments. The team adds one paragraph to the proposal saying young people were consulted, but the budget, participant criteria, and activities remain unchanged.',
    prompt: 'What is the strongest HRBA concern?',
    strongestAnswer: 'B',
    takeaway: 'Participation is not only being invited. It is having a real chance to shape decisions.',
    choices: [
      { id: 'A', text: 'Consultation should happen only after donor approval so expectations are not raised too early.', feedback: 'Not quite. Waiting until after approval may reduce people’s ability to influence the design even more.' },
      { id: 'B', text: 'Participation may have been visible but not meaningful because young people had little chance to influence real decisions.', feedback: 'Strongest answer. Meaningful participation requires more than attendance or comments. It should be able to shape decisions that matter.' },
      { id: 'C', text: 'Participation was strong because youth representatives attended and gave comments.', feedback: 'Not quite. Presence and comments are positive, but they do not prove influence.' },
      { id: 'D', text: 'The CSO should remove the participation paragraph from the proposal.', feedback: 'Partly useful, but incomplete. The issue is not only wording. The CSO should improve the participation process and describe it honestly.' },
    ],
  },
  {
    id: 'm2-kc-q4',
    title: 'Equality and access to opportunity',
    scenario: 'A CSO launches a digital skills opportunity for young people. The announcement is shared through social media and an online form. Staff later worry that young women with care responsibilities, youth with disabilities, and youth outside formal networks may not hear about the opportunity or may struggle to apply.',
    prompt: 'Which option best applies equality and non-discrimination in a practical way?',
    strongestAnswer: 'C',
    takeaway: 'Equal opportunity requires checking whether different people can actually access it.',
    choices: [
      { id: 'A', text: 'Keep the online system but add the phrase “all groups are encouraged to apply.”', feedback: 'Not quite. Encouraging all groups is positive, but a statement alone does not remove practical barriers.' },
      { id: 'B', text: 'Replace the online form with nominations by local leaders.', feedback: 'Partly useful, but risky. Leader nominations may reach some people, but they can also reinforce gatekeeping and favoritism.' },
      { id: 'C', text: 'Keep digital tracking but add accessible application routes, targeted outreach, clear criteria, and support without stigma.', feedback: 'Strongest answer. This combines feasibility with inclusion, transparency, accessibility, and respect.' },
      { id: 'D', text: 'Delay the whole program until the CSO designs a perfect inclusion strategy.', feedback: 'Not quite. HRBA does not require perfection before action. It requires practical steps to reduce exclusion and improve access.' },
    ],
  },
  {
    id: 'm2-kc-q5',
    title: 'Accountability beyond channels',
    scenario: 'A CSO creates three feedback channels: a phone number, a suggestion box, and direct contact with field staff. People raise concerns about selection fairness, payment dates, and lack of response. Staff record the comments, but there is no clear process for reviewing patterns, deciding what can change, or explaining follow-up.',
    prompt: 'What is the strongest accountability response?',
    strongestAnswer: 'C',
    takeaway: 'Accountability is a loop, not only a channel.',
    choices: [
      { id: 'A', text: 'Keep collecting feedback until the endline evaluation, then analyze all comments together.', feedback: 'Not quite. Endline analysis is too late for many accountability issues. People need response during the project.' },
      { id: 'B', text: 'Publish all feedback publicly so the CSO is transparent.', feedback: 'Not quite. Transparency matters, but publishing raw feedback can expose people or create risk.' },
      { id: 'C', text: 'Review patterns, clarify what can change, respond safely, and explain follow-up or adaptation.', feedback: 'Strongest answer. Accountability requires a loop: listen, analyze, respond, follow up, and learn.' },
      { id: 'D', text: 'Tell people the process followed donor rules and therefore the project is accountable.', feedback: 'Not quite. Donor compliance does not replace accountability to affected people.' },
    ],
  },
  {
    id: 'm2-kc-q6',
    title: 'Power and safe HRBA wording',
    scenario: 'A savings group meets regularly. The same two people explain the rules, speak first, summarize decisions, and communicate with the CSO. Newer members attend but privately say they do not fully understand how loan priorities are decided or whether their views matter.',
    prompt: 'Which wording is strongest and safest for a CSO learning note?',
    strongestAnswer: 'C',
    takeaway: 'Safe HRBA language names barriers clearly without exposing, blaming, or overclaiming.',
    choices: [
      { id: 'A', text: '“The group violates members’ rights because leaders silence others.”', feedback: 'Not quite. This overclaims, blames specific actors, and may expose people to conflict.' },
      { id: 'B', text: '“Participation is strong because meetings are regular and people attend.”', feedback: 'Not quite. Regular meetings and attendance do not prove meaningful participation or influence.' },
      { id: 'C', text: '“The review suggests a rights-related concern: participation is visible, but influence and access to decision information may be uneven.”', feedback: 'Strongest answer. This is safe, specific, practical, and rights-based without making an unsupported legal conclusion.' },
      { id: 'D', text: '“The group should elect new leaders immediately.”', feedback: 'Not quite. This jumps to a solution before analyzing the process, barriers, and safe next steps.' },
    ],
  },
] as const;

export function Module2KnowledgeCheck({ state, onChangeState }: Props) {
  const initial = useInitial(() => {
    const stored = state.practiceCheckState?.module2_screen223_knowledge_check;
    return {
      answers: stored?.answers || {},
      checkedQuestions: stored?.checkedQuestions || {},
      activeQuestionIndex: typeof stored?.activeQuestionIndex === 'number' ? stored.activeQuestionIndex : 0,
      summaryViewed: stored?.summaryViewed === true,
      screenComplete: (state.screenProgress[MODULE_ID] || []).includes('M2-S22'),
    };
  });
  const [answers, setAnswers] = useState<Record<string, string>>(initial.answers);
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>(initial.checkedQuestions);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(initial.activeQuestionIndex);
  const [summaryViewed, setSummaryViewed] = useState(initial.summaryViewed);
  const [screenComplete, setScreenComplete] = useState(initial.screenComplete);
  const activeQuestion = module2KnowledgeCheck[activeQuestionIndex] || module2KnowledgeCheck[0];
  const selectedAnswer = answers[activeQuestion.id] || '';
  const isChecked = checkedQuestions[activeQuestion.id] === true;
  const selectedChoice = activeQuestion.choices.find((choice) => choice.id === selectedAnswer);
  const completedCount = module2KnowledgeCheck.filter((question) => checkedQuestions[question.id]).length;
  const score = module2KnowledgeCheck.filter((question) => checkedQuestions[question.id] && answers[question.id] === question.strongestAnswer).length;
  const allChecked = completedCount === module2KnowledgeCheck.length;
  const completionReady = allChecked && summaryViewed;
  const persistState = (next: Record<string, unknown> = {}) => onChangeState((prev) => ({ ...prev, practiceCheckState: { ...prev.practiceCheckState, module2_screen223_knowledge_check: { screenId: 'M2-S22', answers, checkedQuestions, activeQuestionIndex, summaryViewed, score, completionStatus: completionReady ? 'completed' : 'in_progress', ...next } } }));
  useEffect(() => { persistState(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const chooseAnswer = (questionId: string, answerId: string) => {
    const nextAnswers = { ...answers, [questionId]: answerId };
    const nextChecked = { ...checkedQuestions, [questionId]: false };
    setAnswers(nextAnswers);
    setCheckedQuestions(nextChecked);
    setSummaryViewed(false);
    persistState({ answers: nextAnswers, checkedQuestions: nextChecked, summaryViewed: false });
  };
  const checkAnswer = () => {
    if (!selectedAnswer) return;
    const next = { ...checkedQuestions, [activeQuestion.id]: true };
    setCheckedQuestions(next);
    persistState({ checkedQuestions: next });
  };
  const moveQuestion = (nextIndex: number) => {
    const bounded = Math.max(0, Math.min(module2KnowledgeCheck.length - 1, nextIndex));
    setActiveQuestionIndex(bounded);
    persistState({ activeQuestionIndex: bounded });
  };
  const completeAndContinue = () => {
    if (!completionReady) return;
    setScreenComplete(true);
    markCompleteAndNavigate('module2_screen223_knowledge_check', 'M2-S22', 'M2-S23', '/module-2/screen-2-23', onChangeState, { answers, checkedQuestions, activeQuestionIndex, summaryViewed: true, score });
  };
  return (
    <main className="m2-s22-kc-screen" aria-labelledby="m2-s223-title">
      <section className="m2-s22-kc-shell">
        <header className="m2-s22-kc-header">
          <div className="m2-s22-kc-title">
            <p className="m2-s22-kc-kicker">Module 2 · Knowledge check</p>
            <h1 id="m2-s223-title">Module 2 Knowledge Check</h1>
            <p>You have explored how HRBA helps local CSOs look beyond activities and ask better questions about rights, actors, principles, power, participation, and accountability.</p>
          </div>
          <aside className="m2-s22-kc-note">
            <strong>This is a learning check, not a pass/fail test.</strong>
            <span>Use the feedback after each question to strengthen your everyday rights lens.</span>
          </aside>
        </header>

        {summaryViewed ? (
          <section className="m2-s22-kc-complete" aria-live="polite">
            <p className="m2-s22-kc-kicker">Completion summary</p>
            <h2>Knowledge check complete.</h2>
            <p>You have practiced applying the Module 2 rights lens to realistic CSO situations. You reviewed how everyday issues can raise questions about access, information, participation, equality, responsibility, accountability, power, and safe HRBA wording.</p>
            <p>You are ready to continue to the next step.</p>
            <div>
              <strong>{score} of {module2KnowledgeCheck.length}</strong>
              <span>strongest answers selected</span>
            </div>
          </section>
        ) : (
          <section className="m2-s22-kc-board">
            <aside className="m2-s22-kc-progress">
              <span>Question {activeQuestionIndex + 1} of {module2KnowledgeCheck.length}</span>
              <strong>{completedCount} of {module2KnowledgeCheck.length} checked</strong>
              <div>
                {module2KnowledgeCheck.map((question, index) => (
                  <button
                    key={question.id}
                    type="button"
                    className={`${index === activeQuestionIndex ? 'is-active' : ''} ${checkedQuestions[question.id] ? 'is-checked' : ''}`}
                    aria-label={`Go to question ${index + 1}: ${question.title}`}
                    onClick={() => moveQuestion(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </aside>

            <article className="m2-s22-kc-question">
              <p className="m2-s22-kc-kicker">{activeQuestion.title}</p>
              <h2>{activeQuestion.prompt}</h2>
              <p>{activeQuestion.scenario}</p>
              <fieldset className="m2-s22-kc-options">
                <legend className="sr-only">{activeQuestion.prompt}</legend>
                {activeQuestion.choices.map((choice) => {
                  const selected = selectedAnswer === choice.id;
                  return (
                    <label key={choice.id} className={selected ? 'is-selected' : ''}>
                      <input
                        type="radio"
                        name={activeQuestion.id}
                        checked={selected}
                        onChange={() => chooseAnswer(activeQuestion.id, choice.id)}
                      />
                      <span>{choice.id}</span>
                      <strong>{choice.text}</strong>
                    </label>
                  );
                })}
              </fieldset>
            </article>

            <aside className={`m2-s22-kc-feedback ${isChecked ? 'is-visible' : ''}`} aria-live="polite">
              <p className="m2-s22-kc-kicker">Feedback</p>
              {isChecked && selectedChoice ? (
                <>
                  <h2>{selectedAnswer === activeQuestion.strongestAnswer ? 'Strongest answer' : selectedChoice.feedback.startsWith('Partly') ? 'Partly useful, but incomplete' : 'Not quite'}</h2>
                  <p>{selectedChoice.feedback}</p>
                  <div>
                    <strong>Strongest answer: {activeQuestion.strongestAnswer}</strong>
                    <span>{activeQuestion.choices.find((choice) => choice.id === activeQuestion.strongestAnswer)?.feedback}</span>
                  </div>
                  <div>
                    <strong>Practical takeaway</strong>
                    <span>{activeQuestion.takeaway}</span>
                  </div>
                </>
              ) : (
                <>
                  <h2>Choose the strongest response.</h2>
                  <p>Some options may sound reasonable, but only one is the best HRBA-informed choice.</p>
                </>
              )}
            </aside>
          </section>
        )}

        <footer className="m2-s22-kc-footer">
          {summaryViewed ? (
            <button type="button" onClick={completeAndContinue}>Continue</button>
          ) : allChecked ? (
            <button type="button" onClick={() => { setSummaryViewed(true); persistState({ summaryViewed: true }); }}>View completion summary</button>
          ) : (
            <>
              <button type="button" className="m2-s22-kc-secondary" disabled={activeQuestionIndex === 0} onClick={() => moveQuestion(activeQuestionIndex - 1)}>Previous</button>
              <button type="button" disabled={!selectedAnswer || isChecked} onClick={checkAnswer}>Check answer</button>
              <button type="button" className="m2-s22-kc-secondary" disabled={!isChecked || activeQuestionIndex === module2KnowledgeCheck.length - 1} onClick={() => moveQuestion(activeQuestionIndex + 1)}>Next question</button>
            </>
          )}
          {screenComplete && <span className="sr-only">Screen complete.</span>}
        </footer>
      </section>
    </main>
  );
}

export const module2IntroVideoUrl = '';

export function Module2IntroVideoScreen({ state, onChangeState }: Props) {
  const initial = useInitial(() => {
    const stored = state.practiceCheckState?.module2_intro_video;
    return { screenComplete: (state.screenProgress[MODULE_ID] || []).includes('M2-S01A') || stored?.completionStatus === 'completed' };
  });
  const [screenComplete, setScreenComplete] = useState(initial.screenComplete);
  const hasVideo = module2IntroVideoUrl.trim().length > 0;

  useEffect(() => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        module2_intro_video: {
          ...prev.practiceCheckState.module2_intro_video,
          screenId: 'M2-S01A',
          module2IntroVideoUrl,
          completionStatus: initial.screenComplete ? 'completed' : 'in_progress',
        },
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const continueToObjectives = () => {
    const completedAt = new Date().toISOString();
    setScreenComplete(true);
    onChangeState((prev) => {
      const moduleProgress = new Set(prev.screenProgress[MODULE_ID] || []);
      moduleProgress.add('M2-S01A');
      return {
        ...prev,
        currentScreenId: 'M2-S02',
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(moduleProgress) },
        practiceCheckState: {
          ...prev.practiceCheckState,
          module2_intro_video: {
            screenId: 'M2-S01A',
            module2IntroVideoUrl,
            completionStatus: 'completed',
            completedAt,
          },
        },
      };
    });
    if (typeof window !== 'undefined') window.history.pushState(null, '', '/module-2/learning-objectives');
  };

  return (
    <main className="m2-s01a-intro-screen" aria-labelledby="m2-s01a-title">
      <section className="m2-s01a-intro-shell">
        <header className="m2-s01a-intro-header">
          <p className="m2-s01a-intro-kicker">Module 2 · Intro video</p>
          <div>
            <h1 id="m2-s01a-title">Before you begin</h1>
            <p>
              Watch this short introduction to understand what Module 2 will help you practice seeing everyday CSO work through rights, actors, principles, power, participation, and accountability.
            </p>
          </div>
        </header>

        <section className="m2-s01a-video-card" aria-labelledby="m2-s01a-video-label">
          <div className="m2-s01a-video-label-row">
            <p id="m2-s01a-video-label">Intro video placeholder</p>
            <span>Ready for URL</span>
          </div>
          <div className="m2-s01a-video-box">
            {hasVideo ? (
              <iframe
                title="Module 2 intro video"
                src={module2IntroVideoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="m2-s01a-video-placeholder" role="img" aria-label="Video placeholder waiting for a configured URL">
                <span aria-hidden="true">▶</span>
                <strong>Video will appear here when a URL is added.</strong>
              </div>
            )}
          </div>
          <p className="m2-s01a-transcript-link">
            Transcript will be added here.
          </p>
        </section>

        <footer className="m2-s01a-intro-footer">
          <p>Rights, actors, principles, and power are the core lenses for the practice screens ahead.</p>
          <button type="button" onClick={continueToObjectives}>
            Continue to learning objectives
          </button>
          {screenComplete && <span className="sr-only">Screen complete.</span>}
        </footer>
      </section>
    </main>
  );
}

export function Module2CloseTransition({ state, onChangeState }: Props) {
  const initial = useInitial(() => {
    const stored = state.practiceCheckState?.module2_screen224_close_transition;
    return { screenComplete: (state.screenProgress[MODULE_ID] || []).includes('M2-S23') || stored?.completionStatus === 'completed' };
  });
  const [screenComplete, setScreenComplete] = useState(initial.screenComplete);
  const [reviewLinkClicked, setReviewLinkClicked] = useState(false);

  useEffect(() => {
    onChangeState((prev) => ({
      ...prev,
      practiceCheckState: {
        ...prev.practiceCheckState,
        module2_screen224_close_transition: {
          ...prev.practiceCheckState.module2_screen224_close_transition,
          screenId: 'M2-S23',
          completionStatus: initial.screenComplete ? 'completed' : 'in_progress',
        },
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startModule3 = () => {
    const completedAt = new Date().toISOString();
    setScreenComplete(true);
    onChangeState((prev) => {
      const moduleProgress = new Set(prev.screenProgress[MODULE_ID] || []);
      moduleProgress.add('M2-S23');
      return {
        ...prev,
        currentModuleId: 'module_03_project_design',
        currentScreenId: 'M3-PLAYER-00',
        currentSubState: null,
        activeModal: null,
        completedModules: addUnique(prev.completedModules, MODULE_ID),
        screenProgress: { ...prev.screenProgress, [MODULE_ID]: Array.from(moduleProgress) },
        practiceCheckState: {
          ...prev.practiceCheckState,
          module2_screen224_close_transition: {
            screenId: 'M2-S23',
            completionStatus: 'completed',
            completionMessageViewed: true,
            portfolioReminderViewed: true,
            progressSaved: true,
            transitionTarget: 'module_03_project_design',
            reviewLinkClicked,
            completedAt,
          },
        },
      };
    });
    if (typeof window !== 'undefined') window.history.pushState(null, '', '/module-3');
  };

  const reviewModule = () => {
    setReviewLinkClicked(true);
    onChangeState((prev) => ({
      ...prev,
      currentScreenId: 'M2-S02',
      practiceCheckState: {
        ...prev.practiceCheckState,
        module2_screen224_close_transition: {
          ...prev.practiceCheckState.module2_screen224_close_transition,
          screenId: 'M2-S23',
          reviewLinkClicked: true,
        },
      },
    }));
    if (typeof window !== 'undefined') window.history.pushState(null, '', '/module-2/learning-objectives');
  };

  return (
    <main className="m2-s23-screen m2-s23-completion-screen" aria-labelledby="m2-s23-completion-title">
      <section className="m2-s23-completion-shell">
        <header className="m2-s23-completion-hero">
          <div>
            <p className="m2-s23-completion-kicker">Module 2 · Completion</p>
            <h1 id="m2-s23-completion-title">Module 2 complete</h1>
            <p>
              You have practiced using HRBA to notice rights, actors, principles, participation, accountability, power, and exclusion in ordinary CSO work.
            </p>
          </div>
          <div className="m2-s23-completion-badge" aria-label="Module 2 completion badge">
            <span aria-hidden="true">✓</span>
            <strong>Progress saved</strong>
            <small>Portfolio checkpoint retained</small>
          </div>
        </header>

        <section className="m2-s23-completion-message" aria-labelledby="m2-s23-message-title">
          <p className="m2-s23-completion-kicker">Key message</p>
          <h2 id="m2-s23-message-title">Carry the lens into practice</h2>
          <blockquote>
            “The value of HRBA begins when it changes how you notice ordinary project situations — before it ever appears in a proposal, meeting note, or report.”
          </blockquote>
        </section>

        <section className="m2-s23-completion-grid" aria-label="Completion reminders">
          <article>
            <span aria-hidden="true">01</span>
            <h2>Completion confirmed</h2>
            <p>Module 2 is marked complete when you move forward from this screen.</p>
          </article>
          <article>
            <span aria-hidden="true">02</span>
            <h2>Portfolio reminder</h2>
            <p>Your Module 2 rights lens checkpoint remains saved for later portfolio work.</p>
          </article>
          <article>
            <span aria-hidden="true">03</span>
            <h2>Progress saved</h2>
            <p>Your knowledge check and practice screen progress stay attached to this module.</p>
          </article>
        </section>

        <section className="m2-s23-transition-panel" aria-labelledby="m2-s23-next-title">
          <div>
            <p className="m2-s23-completion-kicker">What comes next in Module 3</p>
            <h2 id="m2-s23-next-title">From analysis to design</h2>
            <p>
              Module 3 moves from analysis to design. You will use the rights lens in project design decisions.
            </p>
          </div>
          <div className="m2-s23-transition-steps" aria-label="Module 3 transition focus">
            <span>Rights lens</span>
            <span>Design choices</span>
            <span>Inclusive decisions</span>
          </div>
        </section>

        <footer className="m2-s23-completion-footer">
          <div>
            <strong>Ready for Module 3</strong>
            <p aria-live="polite">{screenComplete ? 'Module 2 completion has been saved.' : 'Select Start Module 3 to save completion and continue.'}</p>
          </div>
          <button type="button" className="m2-s23-review-button" onClick={reviewModule}>
            Review objectives
          </button>
          <button type="button" className="m2-s23-completion-cta" onClick={startModule3}>
            Start Module 3
          </button>
          {screenComplete && <span className="sr-only">Screen complete.</span>}
        </footer>
      </section>
    </main>
  );
}
