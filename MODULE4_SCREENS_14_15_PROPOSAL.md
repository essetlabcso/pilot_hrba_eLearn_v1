# Proposed Enhanced Module 4 Screens 14–15

Status: implementation-ready proposal for review; not implemented

Date: 2026-07-25

Canonical IDs remain `M4-S1-13` and `M4-S1-14`. Current Screens 14–15 must
not be silently reused.

## Screen 14 — Implementation Decisions Knowledge Check

### Purpose

Confirm that the learner can apply the connected Screens 5–13 workflow, not
merely recall principle definitions.

### Structure

- eight scenario-based questions;
- one question per view;
- visible `Question n of 8` progress;
- one selected answer followed by answer-specific feedback;
- Next remains locked until feedback has been viewed;
- final review shows score, correct themes, and themes requiring review;
- no personal or real case details are requested or stored.

### Question and answer authority

1. **Workstream and implementation signal**
   - Authority: Screen 5 selection and Screen 6 evidence check.
   - Scenario: an agreed support criterion appears not to have been followed.
   - Best response: verify the agreed criterion and available evidence, record
     what remains unknown, and avoid an unsupported conclusion.
2. **Fair access action**
   - Authority: Screen 6 evidence/action/follow-up sequence.
   - Scenario: a revised list may exclude eligible people.
   - Best response: pause the affected decision where feasible, review it
     against the agreed criteria, correct it proportionately, explain the
     process, and set follow-up.
3. **Participation with influence**
   - Authority: Screen 7 four-stage pathway.
   - Scenario: people attend but cannot influence the decision.
   - Best response: include relevant voices safely, make participation
     workable, explain how views affected the decision, and follow up.
4. **Accountable concern response**
   - Authority: Screen 8 concern-response-follow-up loop.
   - Scenario: a concern is recorded but receives no owner or response.
   - Best response: assign a responsible actor, agree a response, account back
     in an accessible way, and verify follow-up.
5. **Roles and boundaries**
   - Authority: Screen 9 actor map and engagement plan.
   - Scenario: a public actor has not met an agreed service responsibility.
   - Best response: document and engage the responsible actor, support
     rights-holders safely, adjust the CSO's own action where appropriate, and
     do not replace the duty-bearer.
6. **Diagnose before choosing support**
   - Authority: Screen 10 gap/support diagnosis.
   - Scenario: an actor has unclear guidance and insufficient capacity.
   - Best response: distinguish the type of gap, select proportionate support,
     monitor whether it resolves the gap, and review.
7. **Adjust, Engage, or Protect**
   - Authority: Screen 11 response pathways.
   - Scenario: a participant may face retaliation if a concern is discussed
     in the ordinary process.
   - Best response: protect the participant and use a safer process before
     ordinary engagement continues.
8. **Minimum necessary information**
   - Authority: Screen 12 information-necessity test and Screen 13 note.
   - Scenario: a report request asks for names and detailed personal accounts
     when a generalized decision record is sufficient.
   - Best response: collect and share only the minimum necessary,
     non-identifying information and record the decision and follow-up safely.

Each question must have three plausible options. Distractors should represent:

- acting without checking;
- recording without responding;
- replacing a responsible actor;
- collecting more information than necessary;
- treating attendance as influence;
- choosing a pathway without diagnosing safety or responsibility.

### Scoring and retry proposal

- one point per question;
- eight points available;
- readiness threshold: seven of eight (`87.5%`), which meets the course's
  existing 80% standard without fractional scoring ambiguity;
- unlimited retries;
- retry presents only missed questions, while retaining the attempt number and
  highest score;
- feedback remains formative and is stored only in Module 4 state;
- Screen 14 does not emit `assessment_completed` or `course_completed`;
- failing does not erase the learner's note or prior Module 4 work;
- Screen 15 remains locked until the readiness threshold is met.

The threshold, retry scope, and final question copy require content-owner
approval before Batch 5.

### Proposed state

`module4Enhanced.knowledgeCheck` should contain:

- `attemptNumber`;
- `answers`;
- `checkedQuestions`;
- `score`;
- `maxScore: 8`;
- `percentage`;
- `passed`;
- `highestScore`;
- `completedAt`;
- `themesForReview`.

Question IDs should be stable and content-based:

- `m4_kc_workstream_signal`;
- `m4_kc_fair_access`;
- `m4_kc_participation_influence`;
- `m4_kc_accountable_response`;
- `m4_kc_roles_boundaries`;
- `m4_kc_support_diagnosis`;
- `m4_kc_response_pathway`;
- `m4_kc_minimum_information`.

## Screen 15 — Implementation Decision and Module Closure

### Purpose

Confirm the learner's final generalized Implementation Decision and Follow-Up
Note, summarize the enhanced implementation practice, record Module 4
completion exactly once, and bridge to Module 5.

### Default state

Display:

- six-part summary of the enhanced practice journey;
- selected Jiru Amba workstream;
- final note preview containing concern, evidence, response, roles and
  inclusion, account-back, follow-up question, and review point;
- knowledge-check score and passed status;
- privacy reminder;
- `Revise note` and `Confirm final note` actions.

The page must not say that Module 4 is complete before the explicit completion
action succeeds.

### Final note confirmation

The learner must:

1. confirm the note is generalized and contains no names or sensitive details;
2. confirm that all review-required fields have been reviewed;
3. confirm that the note reflects their intended decision and follow-up;
4. choose `Complete Module 4`.

`Revise note` returns to Screen 13 without losing the knowledge-check result.
Copy/download uses the same confirmed note payload and existing safe-output
rules.

### Exact completion timing

Only the explicit `Complete Module 4` action, after all gates pass, may:

1. mark `M4-S1-14` complete in
   `screenProgress.module_04_implementation`;
2. set `module4Enhanced.completion.enhancedJourneyCompleted`;
3. write the immutable completion timestamp and content revision;
4. add `module_04_implementation` to `completedModules` idempotently.

The existing App progress effect may then report the updated completed-module
list to the Hub. Screen 15 must not emit Final Assessment evidence,
`assessment_completed`, or `course_completed`. Certificate eligibility remains
dependent on the governed Final Assessment and Hub.

After the state mutation succeeds, show:

- `Module 4 completed`;
- saved-note confirmation;
- `Continue to Module 5`;
- `Review Module 4`;
- `Return to course overview`.

### Module 5 bridge

Proposed bridge copy:

> You have built a safe implementation decision and follow-up note. In Module
> 5, you will use implementation evidence, participation, feedback, and review
> points to strengthen monitoring, evaluation, accountability, and learning.

`Continue to Module 5` uses the existing `M5-PLAYER-00` route and does not
change Module 5 state.

### Accessibility and responsive behavior

- final note uses semantic headings and definition-list structure;
- confirmation controls use a fieldset and individually labelled checkboxes;
- validation summary receives focus when completion is blocked;
- successful completion is announced politely, then focus moves to the
  completion heading;
- copy/download status is announced without stealing focus;
- two-column desktop layout becomes one logical column at tablet/mobile widths;
- no completion information relies on colour;
- 200% zoom and 320 px layouts contain no horizontal scrolling.

## Approval required before Batch 5

Content owners must approve:

- final wording and distractors for all eight questions;
- seven-of-eight readiness threshold;
- missed-question-only retry;
- stable question IDs;
- exact final confirmation statements;
- completion button label;
- Module 5 bridge copy;
- completion-event timing described above.
