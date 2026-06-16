# Design System v0.1 Pre-Micro-Slice Implementation Readiness Decision

## 1. Purpose

This document decides the safest next step after the pre-micro-slice target/content mapping note. It decides whether the project is ready to move toward a future bounded implementation slice or whether another documentation gate is needed first.

This decision does not approve implementation and does not perform implementation. It only selects the next documentation task in the Design System v0.1 acceleration path.

## 2. Current Mapped Concepts

The pre-micro-slice target/content mapping note mapped three static Module 2 concepts:

- rights-holders as people with rights, voice, and claims;
- duty-bearers and CSO role clarity;
- meaningful participation beyond attendance.

Selected template direction:

| Concept | Template direction | Current fit |
| --- | --- | --- |
| Rights-holders as people with rights, voice, and claims | `ConceptIntroductionTemplate` | Strongest first candidate because it can be static, text-first, and one-concept focused. |
| Duty-bearers and CSO role clarity | `FrameworkExplanationTemplate` | Promising, but needs condensation from actor roles and CSO role lists. |
| Meaningful participation beyond attendance | `KeyMessageSummaryTemplate` or `ConceptIntroductionTemplate` | Promising, but final template depends on whether the content becomes a summary takeaway or a fuller concept explanation. |

## 3. Current Blocking Findings

The mapping note keeps the following blockers active:

- exact current routes remain deferred;
- current source screens include reveal, tabs, hotspots, flip cards, choice state, feedback, progress/completion state, route movement, asset dependency, or nested landmark risk;
- no exact current route is safe for immediate implementation;
- future wrapper-only targets appear safer than converting current behavior-heavy routes;
- content needs adaptation or condensation before static use;
- heading and landmark rules must be preserved.

These findings block direct implementation and direct current-route conversion. They do not block a narrow documentation-only implementation specification for one wrapper-only static screen.

## 4. Options Considered

| Option | Classification | Decision notes |
| --- | --- | --- |
| Option A - Implement one static wrapper-only concept screen first | Ready with caution | Selected only as the next documentation specification path, not immediate code. A future bounded implementation could prove one wrapper-owned `h1`, template `h2`, heading-neutral block pattern on the rights-holder concept. It still needs a one-screen implementation specification first. |
| Option B - Implement all three static concept screens later as a tiny vertical preparation slice | Ready with caution, deferred | The three-screen path is plausible after a one-screen proof, but it is too broad for the first implementation step because it multiplies route, heading, content adaptation, and QA risk. |
| Option C - Create a content adaptation note first | Ready with caution, deferred | Content needs condensation, but the rights-holder concept has enough slot mapping to proceed to a one-screen implementation specification. The specification must still stop if final static copy cannot be bounded without a separate content adaptation note. |
| Option D - Create a heading/landmark audit or wrapper pattern specification first | Ready with caution, deferred | Heading and landmark risks are real, but existing readiness notes already establish the wrapper-owned `h1`, template `h2`, heading-neutral block strategy. The next one-screen specification can document the exact wrapper approach without a separate broad audit first. |
| Option E - Create behavior separation note first | Ready with caution, deferred | Behavior separation is already clear enough for the first static rights-holder concept: no tabs, hotspots, flip cards, choices, feedback, progress, completion, or route movement. A separate behavior note may be useful before converting any existing route, but exact-route conversion is not selected. |
| Option F - Proceed directly to exact current route conversion | Not ready | Current exact routes are behavior-heavy and coupled to progress, routing, completion, assets, or landmark risks. Direct conversion remains blocked. |
| Option G - STOP | Not selected | A safe next documentation gate exists, so STOP is not needed. |

## 5. Recommended Decision

Selected next task: **documentation-only one-screen wrapper-only implementation specification**.

Selected path: one-screen path.

Selected first candidate: **Rights-holders as people with rights, voice, and claims**.

Not selected:

- three-screen implementation specification;
- content adaptation note as the immediate next task;
- heading/landmark wrapper pattern specification as the immediate next task;
- behavior separation note as the immediate next task;
- exact current route conversion;
- STOP.

## 6. Rationale

The one-screen wrapper-only implementation specification is the safest next task because it reduces the first implementation risk to one static concept screen before any broader preparation slice.

This path:

- proves the wrapper-owned `h1` plus template `screenTitle` as `h2` pattern on one future target before scaling;
- avoids converting behavior-heavy current Module 2 routes;
- protects route, progress, completion, and `currentScreenId` behavior by keeping exact current routes out of scope;
- avoids rewriting learner-facing content inside code by requiring slot planning before implementation;
- keeps CSS and token edits blocked;
- preserves accessibility and landmark rules by making wrapper and `MainScreenCanvas` handling part of the next specification;
- keeps the vertical slice small enough to QA and independently evaluate.

Option A is not a recommendation to code immediately. It is a recommendation to write the one-screen implementation specification next.

## 7. One-Screen Wrapper-Only Implementation Specification Candidate

Candidate first screen concept: **Rights-holders as people with rights, voice, and claims**.

This is the safest first candidate because:

- it maps to `ConceptIntroductionTemplate`;
- it can be static and read-only;
- it can use one `ConceptExplanationBlock` and optional `KeyMessageBlock`;
- it can exclude `Button` and all behavior-heavy patterns;
- it does not require the actor-map asset if handled as text-first content;
- it can test the wrapper-owned `h1` and template `h2` pattern before larger work.

The future specification must still be documentation-only and must identify:

- exact future files allowed to change if implementation is later approved;
- route/wrapper approach;
- wrapper `h1` draft label;
- template `screenTitle` `h2` draft label;
- content slots and source evidence;
- no-behavior boundaries;
- no route/progress/completion boundaries;
- no CSS/token boundaries;
- QA plan;
- stop conditions.

## 8. Content Adaptation Contingency

Content adaptation is not selected as the immediate next task, but the future one-screen specification must identify whether the rights-holder content can fit without a separate content adaptation note.

If adaptation becomes necessary, it must document:

- final static copy for wrapper `h1`;
- template `screenTitle` `h2`;
- concept title;
- summary/introduction;
- body content;
- optional key message;
- source evidence notes;
- content that must be shortened or deferred.

Content adaptation remains documentation-only and must not edit implementation files.

## 9. Future Implementation Boundaries

Any future implementation must:

- be limited to one tiny target first unless separately approved;
- use approved templates and blocks only;
- keep `Button` excluded;
- keep route/screen wrapper-owned `h1`;
- keep template `screenTitle` as `h2`;
- keep blocks heading-neutral;
- avoid nested `main`;
- preserve the `MainScreenCanvas` relationship or document it explicitly;
- not change routing, progress, completion, `currentScreenId`, assessment, certificate, storage, feedback, learner input, selected state, scoring, retry, validation, or persistence;
- not edit CSS or tokens;
- not migrate assets;
- not copy old screen code into templates;
- create a QA note;
- require independent evaluation afterward.

## 10. Readiness Result

Readiness result: **PASS WITH CAUTION**.

PASS element: one next documentation task is clearly selected and bounded.

Caution element: future implementation remains blocked until the one-screen wrapper-only implementation specification passes and confirms exact files, wrapper/landmark handling, content slots, no-behavior boundaries, QA, and stop conditions.

STOP is not selected because a safe documentation gate exists.

## 11. Recommended Next Task Wording

Create a documentation-only one-screen wrapper-only implementation specification for the Rights-Holders static concept screen, using `ConceptIntroductionTemplate`, wrapper-owned `h1`, template `h2`, heading-neutral blocks, existing source content evidence only, and no behavior, routing, progress, CSS, token, asset, or content migration.

## 12. What Remains Blocked

The following remain blocked:

- screen integration implementation;
- exact current route conversion;
- vertical slice implementation;
- Module 2 micro-slice implementation;
- three-screen implementation unless separately specified;
- additional templates;
- behavior-heavy blocks;
- reveal, tabs, hotspots, and flip cards;
- choice selection;
- correctness feedback;
- learner input;
- state persistence;
- storage;
- scoring;
- retry;
- validation;
- completion markers;
- Continue/Next behavior;
- routing movement;
- progress gating;
- screen locking or unlocking;
- assessment/certificate logic;
- global CSS;
- token edits;
- Phase D CSS;
- current-state CSS;
- modal/accessibility styling;
- dedicated close button work;
- hard-coded visual prevention script implementation;
- asset creation or migration;
- full scale-up.

## 13. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | Yes. |
| Does it decide the next safest pre-micro-slice step? | Yes. |
| Does it avoid implementation? | Yes. |
| Does it avoid exact current route conversion? | Yes. |
| Does it keep screen integration implementation blocked? | Yes. |
| Does it keep Module 2 micro-slice implementation blocked? | Yes. |
| Does it keep vertical slice implementation blocked? | Yes. |
| Does it preserve wrapper-owned `h1` and template `h2` rules? | Yes. |
| Are blocks heading-neutral? | Yes. |
| Are templates still read-only and behavior-free? | Yes. |
| Is Button excluded? | Yes. |
| Are behavior-heavy interactions excluded? | Yes. |
| Are routing/progress/completion/assessment/storage/feedback/scoring changes excluded? | Yes. |
| Are learner input, selected state, retry, validation, and persistence excluded? | Yes. |
| Are CSS and token edits excluded? | Yes. |
| Are asset changes excluded? | Yes. |
| Is Phase D CSS still blocked? | Yes. |
| Is full scale-up still blocked? | Yes. |
| Is the recommended next task clear and bounded? | Yes. |
