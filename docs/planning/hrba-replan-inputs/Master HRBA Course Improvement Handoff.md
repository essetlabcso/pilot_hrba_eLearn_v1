

Master HRBA Course Improvement Handoff

Final version integrating G1, G2, G3, and G4 Technical Quality Reviews

Prepared for controlled implementation, QA verification, and learner-testing readiness decision
Final status
G4 Quick and Deep Technical Quality findings are now incorporated. This replaces the
earlier provisional G4 treatment.
Overall readiness decision
Ready for internal technical review and structured improvement implementation; not yet
ready for learner testing or pilot launch.
Why not learner-testing ready yet
No confirmed P0 course defect is proven from the evidence alone, but G4 finds that
build/deployment, production routing, progress, accessibility implementation, final
assessment/certificate, mobile/performance, privacy/security, and QA evidence are not yet
sufficient for sign-off.
Core implementation rule
Prioritize editable course-layer, instructional, visual, media, alt-text, and block-configuration
fixes. Do not change protected tokens, global CSS, course shell, routing, progress,
completion, assessment, certificate, accessibility toolbar, shared components, or
responsiveness behavior without explicit approval and regression testing.

Source documents integrated
● Master HRBA Course Improvement Handoff.docx
● G1 HRBA Content - Deep Review.docx and G1 HRBA Content - Quick Review.docx
● G2 Learning Design - Deep Review.docx and G2 Learning Design - Quick Review.docx
● G3 Visual Design - Deep Review.docx and G3 Visual Design - Quick Review.docx
● G4 Technical Quality - Deep Review.docx and G4 Technical Quality - Quick Review.docx
● Module 1-5 screenshot PDFs and module evidence/diagnosis packages
● Course design-system boundary note, evidence limitations note, and specialist checklists
- Executive synthesis
Overall readiness judgment: Ready for internal technical review only.
The HRBA course is strong, practical, coherent, and promising as a CSO Learning Hub product, but it should not yet be treated as learner-testing or pilot-ready. The integrated
G1-G4 position is consistent: the course has strong content, learning design, and visual identity, while the main barriers to release are targeted P1 content/learning/visual fixes plus
G4 technical verification gates.
G4 changes the master handoff in one important way: technical quality is no longer only a checklist-derived placeholder. The G4 Quick and Deep reviews confirm that the course
appears to have a consistent shell, traceable module architecture, reusable learning patterns, and strong governance boundaries, but that the current evidence does not prove build
Master HRBA Course Improvement Handoff - Final with G4 included


stability, deployment behavior, production route guards, progress persistence, assessment/certificate logic, accessibility implementation, mobile performance, package/reporting
mode, privacy/security posture, or AI/design-system compliance.
Most important strengths to preserve
● Keep the five-module progression: practical HRBA lens, foundations, project design, implementation, and MEAL/action planning.
● Preserve the scenario chain: water point dilemma, rights-holder segmentation, weak proposal repair, implementation drift, evidence ethics, safe reporting, and portfolio/action
planning.
● Keep the visual system. The issue is not broad redesign; the issue is density, hierarchy, placeholders, alt text, accessibility alternatives, and mobile/keyboard verification.
● Preserve reusable course-player and learning-block discipline. Any changes should strengthen the product system, not create one-off screen fixes.
Most important risks
● Implementation-readiness evidence is insufficient: branch/build/deployment/console, route behavior, progress, final assessment, certificate/reporting, accessibility
implementation, mobile/performance, and privacy/security are not yet proven.
● Learner safety wording is not consistently repeated in portfolio, reflection, MEAL, reporting, and action-plan tasks.
● Duty-bearer, standards/principles, respect/protect/fulfil, and bounded CSO-role language needs to be more explicit.
● Modules 2-5 still contain intro video placeholders, which weakens trust and blocks media accessibility sign-off.
● Complex practice tasks need worked examples and lighter screen-level cognitive load before learner testing.
Top priority improvements
## Rank

## Priority

## Improvement

Main layer

1 P0 verification
Confirm branch, commit, clean working tree,
dependency install, build, TypeScript/lint where
available, deployment URL, and production
console state.
G4 technical verification
2 P0 verification
Verify production routing, clean-state locking,
direct URLs, refresh/back-forward behavior,
progress persistence, completion, final
assessment, and certificate/finish pathway.
G4 route/state/assessment QA
## 3 P1
Add recurring safe-practice wording to every
reflection, portfolio, action-plan, MEAL, reporting,
and learner-input task.
Editable course layer
## 4 P1
Strengthen HRBA standards grounding, primary
state duty-bearer role, respect/protect/fulfil
language, and bounded CSO role.
Editable course layer
## 5 P1
Add one common safe accountability sequence:
verify evidence, assess risk, protect rights-holders,
engage constructively, document follow-up.
Editable course layer
Master HRBA Course Improvement Handoff - Final with G4 included


## 6 P1
Strengthen Module 5 minimum-necessary data,
anonymization, consent, refusal-plus-alternative
storytelling, and responsible reporting.
Editable course layer
## 7 P1
Replace video placeholders in Modules 2-5 or
convert them into polished no-video interim
learning screens with transcript/caption fallback.
Media/course layer
## 8 P1
Add worked examples before complex matching,
builder, repair, portfolio, reporting, and capstone
tasks.
Instructional design
## 9 P1
Reduce high-friction practice, portfolio, and
knowledge-check screens by surfacing one
primary task at a time.
Block configuration
## 10 P1
Fix missing/weak alt text and provide text
alternatives for icons, diagrams, hotspots,
CSS-background scenes, and visual-only logic.
Accessibility text/course layer
## 11 P1
Run implementation-level accessibility QA:
keyboard, focus, ARIA/state, screen-reader smoke
tests, forms, live feedback, captions/transcripts,
toolbar controls.
G4 accessibility QA
## 12 P1/P2
Run mobile/tablet, large text, high contrast,
low-bandwidth/performance, package/reporting
mode, privacy/security, and AI/deviation
compliance checks.
G4 readiness QA

Fix before learner testing
Complete Batch 0 verification; implement P1 content/safeguarding wording; replace or reframe video placeholders; add worked examples to complex tasks; simplify the most
overloaded portfolio/knowledge-check screens; fix alt text and visual alternatives; verify final assessment, portfolio persistence, progress, completion, direct-route behavior,
accessibility toolbar, keyboard/screen-reader behavior, mobile/tablet behavior, package/reporting mode, and privacy/security controls.
Can wait until after initial learner testing
P2 refinements such as additional role-specific prompts for field staff, program, MEAL, and advocacy roles; more visual rhythm breaks; further localization examples;
completion-screen polish; localization/RTL hardening; and reusable design-system documentation can wait if P0/P1 readiness gates pass.
Do not change at this stage
Do not broadly restyle the course or casually change design tokens, theme files, global CSS, typography scale, color palette, core course shell, module navigation, routing, progress
logic, locking/unlocking, completion logic, assessment logic, certificate logic, accessibility toolbar, media control system, shared components, approved templates, approved block
types, or system responsiveness. Treat any such need as a protected-layer change requiring explicit approval and regression testing.
Master HRBA Course Improvement Handoff - Final with G4 included


- Integrated priority map
## Priority

Integrated issue

Evidence from specialists

Learner/system impact

Recommended action

P0 verification Technical sign-off evidence missing
G4 Quick and Deep both find build,
deployment, route, progress, assessment,
accessibility, mobile, and QA evidence
insufficient for learner testing.
Cannot approve pilot or learner testing
from screenshots/Markdown alone.
Run Batch 0 and Batch 4 evidence gates;
record pass/fail/retest evidence.
## P1
Production route/progress behavior
unproven
G4 notes local query params/localStorage
seeds were used for review capture;
production route guards and QA overrides
need testing.
Learners may bypass locks, be blocked
incorrectly, or lose progress.
Test direct URLs, locked routes, refresh,
resume, progress, completion, final
unlocks, and localhost-only override
behavior.
## P1
Final assessment, certificate, and
completion not evidenced
G2 notes final assessment path is not fully
shown; G4 requires pass/fail, retake,
score, completion, certificate/reporting
verification.
Completion may not prove applied HRBA
competence or may fail technically.
End-to-end assessment and certificate
test from clean state and returning state.
## P1
Duty-bearer and standards grounding too
implicit
G1 asks for clearer standards/principles,
state duty-bearer role,
respect/protect/fulfil, and bounded CSO
role.
Learners may reduce HRBA to good
participation practice without
accountability structure.
Add plain-language microcopy in
M1/M2/M3 and relevant feedback.
P1 Safeguarding reminders inconsistent
G1 flags portfolio/action tasks needing
repeated fictionalize/generalize guidance.
Learners may enter sensitive names,
incidents, organizations, officials, or
survivor/child details.
Add standard safe-practice note to all
learner-input tasks.
P1 Placeholder intro media
G2/G3/G4 all flag Modules 2-5
video/transcript placeholders.
Trust, motivation, and media accessibility
are weakened.
Final videos with captions/transcripts, or a
completed no-video fallback screen.
P1 Complex tasks lack worked examples
G2 identifies
worked-example-before-practice as the
key learning repair.
Learners may guess rather than practice
HRBA judgment.
Add model example plus rationale before
each complex task.
P1 Dense practice and portfolio screens
G2/G3 flag high cognitive and visual
friction, especially Modules 3-5 and
## M4-S1-10/S1-11.
Lower completion, mobile risk,
accessibility friction.
One primary task per screen/state; reduce
side content; add progress cues.
## P1
Alt text, visual alternatives,
keyboard/screen-reader risks
G1/G3/G4 flag missing/weak alt text,
CSS-background alternatives, hotspots,
modals, tabs, builders, forms, and
feedback states.
Some learners may miss essential
meaning or be unable to complete
required interactions.
Alt-text inventory, text alternatives,
keyboard walkthrough,
focus/ARIA/live-region checks.
## P1
Privacy, security, reporting mode, and AI
compliance not yet evidenced
G4 Deep adds package/reporting mode,
telemetry/storage, cookies, headers,
privacy notice, and AI deviation controls
as readiness gates.
Learner input, completion data, and
analytics could be mishandled or
undocumented.
Document runtime mode; audit
storage/telemetry; verify HTTPS/security
posture; maintain protected-file and AI
deviation logs.

- Cross-specialist synthesis
## Theme

G1 view

G2 view

G3 view

G4 view / requirement

Orchestrator decision

Master HRBA Course Improvement Handoff - Final with G4 included


HRBA framing and standards
Strong practical framing; needs
explicit standards/duty-bearer
wording.
Macro-sequence works. Visual tone supports credibility.
Verify content consistency and
screen metadata.
P1: add standards/principles and
duty-bearer lines in core screens.
Safeguarding and do-no-harm
Strong intent; learner-input tasks
need repeated safety wording.
Portfolio tasks support transfer but
need safer scaffolding.
Safety notes must not be hidden in
dense layouts.
Verify form labels, persistence,
privacy, and storage notice.
P1: safety wording plus
privacy/storage verification.
Safe accountability
Present but needs a common
risk-aware formula.
Applied judgment tasks need clearer
examples.
Accountability visuals are useful but
dense.
Test feedback states and completion
rules.
P1: standardize
verify-risk-protect-engage-follow-up.
Practice and competence
Content is practical and
scenario-based.
Need worked examples before
complex tasks.
Need stronger hierarchy on practice
screens.
Verify activity completion logic and
feedback states.
P1: worked example +
one-task-at-a-time repair.
Visual identity and usability Representation mostly respectful.
Repeated blocks create rhythm
fatigue.
Strong identity; density and mobile
risk remain.
## Run
mobile/tablet/high-contrast/large-text
checks.
Keep visual system; fix hierarchy and
responsive friction.
Media and accessibility
Video content not reviewable where
placeholders remain.
Placeholders weaken module
openings.
Placeholders block
media/accessibility sign-off.
Captions/transcripts/fallback and
media failure behavior required.
P1: no raw placeholder before
learner testing.
## Progress/completion/readiness
Safe journey depends on reliable
path.
Completion must show competence,
not clicks.
Completion screens look strong but
saved states need proof.
Core G4 gate: route, progress,
resume, final assessment/certificate.
P0/P1: technical verification before
learner testing.
Design-system boundary Stay in editable layer. Use approved learning patterns.
Do not restyle; controlled
hierarchy/asset fixes only.
## Tokens/components/templates/routin
g/state are protected.
Only approved course-layer fixes
now; system changes need separate
approval.

- Course-level improvement plan
4.1 Content and HRBA improvements
● Add a short HRBA grounding line in Module 1 and reinforce it in Module 2 and Module 3: “HRBA uses human rights standards and principles as a practical reference for fair
decisions, meaningful participation, non-discrimination, accountability, and safe action.”
● Add duty-bearer language where rights-holders, actors, accountability, project design, and MEAL are discussed: “State institutions are the primary duty-bearers. They have
obligations to respect, protect, and fulfil rights. CSOs do not replace duty-bearers; they can support rights-holders, strengthen evidence, facilitate safe dialogue, and encourage
accountable follow-up.”
● Add safe accountability language across Modules 2, 4, and 5: “Before using rights standards or raising accountability concerns, verify the evidence, assess risk, protect
rights-holders from exposure, choose a constructive engagement route, and document what changed, what did not, why, and what will happen next.”
● Add recurring safe-practice wording to all learner-input tasks: “Use a fictional, generalized, or non-sensitive example. Do not include names, phone numbers, exact locations,
identifiable stories, survivor details, children’s details, officials’ names, organizational disputes, or sensitive incidents.”
● Add safe local governance examples: woreda water office, kebele structure, school management committee, health facility management, woreda women and social affairs office,
local council, service provider, and community representatives.
● Give Module 5 the strongest ethical MEAL pass: minimum-necessary data, anonymization, small-cell risk, consent, refusal of extractive donor storytelling, safe alternatives, and
responsible reporting.
Master HRBA Course Improvement Handoff - Final with G4 included


4.2 Learning design improvements
● Apply the worked-example sequence: show one worked example; explain why it is stronger or weaker; ask the learner to try one similar case; give feedback; then ask for safe
fictional/generalized portfolio application.
● Reduce cognitive load in Modules 3-5 by breaking heavy screens into smaller steps or using existing block configuration to show one task at a time.
● Add micro-recaps after long concept clusters, for example: “You have now checked who is affected, what barriers exist, who has responsibility, and what can be safely changed
next.”
● Verify that the final assessment is an applied HRBA judgment pathway, not only recall. It should test scenario diagnosis, safe action choice, inclusion/accountability judgment,
MEAL evidence ethics, and transfer to a 90-day action.
4.3 Visual/UI improvements
● Keep the existing visual identity. The core work is hierarchy and usability, not redesign.
● Each dense screen should have one primary task heading, one short instruction, one active decision area, clear progress status, and a visible next action.
● Intro video placeholders should be replaced or turned into a polished interim pattern with title, purpose, short text introduction, transcript/fallback, and CTA.
● Alt text should be fixed for icons, diagrams, hotspot images, actor maps, pathway visuals, MEAL/evidence visuals, and CSS-background scenes. Hotspots need list-based
fallback or equivalent text alternative.
● Mobile/tablet risk must be tested, especially in Modules 3-5 and for hotspots, tabs, matching, forms, quizzes, and portfolio screens.
4.4 Technical/QA improvements now confirmed by G4
● Produce branch, commit, build, deployment URL, and console evidence for the exact reviewed version.
● Run production route-guard tests from clean browser state, including direct URLs to locked modules and final assessment.
● Verify progress, locking, completion, resume, refresh, and back/forward behavior across the full learner path.
● Verify final assessment scoring, feedback, retake, final completion, certificate/reporting, and portfolio handoff.
● Run implementation-level accessibility QA: keyboard, focus order/visibility, ARIA/state, semantic form labels, live feedback, captions/transcripts, modal focus management, and
toolbar functionality.
● Confirm package/reporting mode: plain web, SCORM, xAPI, or hybrid. Validate LMS/LRS behavior and privacy implications if SCORM/xAPI is used.
● Create a privacy/security baseline for cookies, storage, telemetry, learner-entered data, HTTPS/HSTS/CSP posture, and learner notice.
● Maintain AI production controls: protected-file list, allowed-file list, deviation log, build/test output, and final git diff audit for every Codex task.
- Module-by-module master action plan
## Module

Main strengths

Main risks

Priority fixes

## Layer

Acceptance criteria

Module 1: Starting the HRBA
## Learning Journey
Strong opening journey, water point
dilemma, practical HRBA lens,
rights-holder shift.
Essential meaning can be hidden
behind reveals;
standards/duty-bearer language too
light; alt text gaps; possible
intended-order vs
active-screen-order issue.
Add standards/duty-bearer
microcopy; fix alt text; add safe
reflection/portfolio note; verify
relevance/objectives order and
next/back/progress.
Course layer + alt text + G4
sequence QA
Learners can explain HRBA as
standards/principles +
rights/duties/accountability; all
meaningful visuals have alternatives;
screen order is verified or
documented.
## Module 2: Foundations
Strong concept-practice rhythm:
rights, actors, intersectionality,
participation, accountability, power.
Intro placeholder; safe standards
may feel one-off; local duty-bearer
examples light;
Replace/reframe video; add local
actors and safe standards
recurrence; worked examples for
Course + ID + accessibility QA
Concepts connect to safe practice;
hotspots/tabs/cards are
Master HRBA Course Improvement Handoff - Final with G4 included


hotspots/CSS-background
alternatives and keyboard behavior
unverified.
matching/participation/feedback loop;
verify hotspots/tabs/cards.
keyboard/screen-reader operable;
portfolio includes safety note.
## Module 3: Project Design
Strong applied design and repair-lab
structure.
Dense consecutive builders;
livelihood case can slide into
activity/training framing;
screen-ID/sequence anomaly risk;
portfolio/knowledge-check density.
Strengthen structural
barriers/accountability in case; add
worked examples; simplify builder
sequence; add recaps; verify
M3-S1-03A-D sequence.
Scenario rewrite + ID + block config
+ G4 sequence QA
Learner sees root causes, capacity
gaps, actor responsibilities, inclusion
and risk before activities; route order
and progress are clear.
## Module 4: Implementation
Very strong practical arc: notice,
diagnose, adjust, document.
Dense M4-S1-04 to M4-S1-11; intro
placeholder; no separate
M4-PLAYER-COMPLETE route in
current evidence; completion
depends on saved state.
Reframe video; add “look for signals”
cue; simplify dense screens; add
portfolio safety note; full
clean-browser completion and
Module 5 unlock test.
Course + ID + G4 state QA
Learner can diagnose drift, repair
participation/feedback, document
safe adjustment; saved portfolio
renders; M5 unlocks correctly.
Module 5: MEAL
Strongest ethical MEAL and
transfer-to-practice pathway:
indicators, evidence, storytelling,
reporting, 90-day plan.
Long and fragmented;
data/story/reporting safety must be
unmistakable;
capstone/portfolio/action-plan
density; final completion/certificate
unverified.
Add ethical MEAL safety recaps;
simplify M5-S1-05-S1-18 cluster;
clarify final portfolio and 90-day
action plan; verify final bridge/course
completion/certificate.
Content + ID + G4 final-path QA
Learner can choose safer data, reject
risky story requests, report
responsibly, and complete final
pathway reliably.
Final assessment / completion
Portfolio synthesis and action plan
create strong transfer promise.
Applied competence, scoring,
feedback, retake, certificate,
reporting mode, and persistence are
not fully evidenced.
## Run
pass/fail/retry/reporting/certificate
tests; revise if assessment is
recall-heavy.
Technical verification + assessment
revision
Final pathway proves applied HRBA
judgment and works from clean
browser through
completion/certificate or documented
finish state.

- Screen-pattern and block-pattern improvement plan
## Pattern/block

Current issue

Modules/screens affected

Recommended standard

## Layer

Module covers Strong; keep. M1-M5
Verify title, duration, CTA, route state, alt
text, and resume behavior.
Course + G4 QA
Intro video screens Raw placeholders in M2-M5.
## M2-S01A, M3-S1-01, M4-S1-01,
## M5-S1-01
Final video/captions/transcript or
completed no-video intro pattern.
Media/course layer
Learning objectives Generally good; some dense card states. M1-M5
Add “You will use this later to...” where
useful; verify keyboard/focus names.
Course + accessibility QA
Story/case screens Strong but some text-heavy screens. M1, M3, M4, M5
Add short “look for” cue before learner
decisions.
ID revision
Practice exercises Strong but sometimes abrupt. M2-M5
Use worked example + rationale before
learner practice.
ID revision
## Cards/reveals/modals
Can hide essential meaning; focus
trap/return unproven.
## M1-M5
Visible summary line, remaining count,
keyboard open/close/Esc/focus return
tests.
Block config + G4 accessibility QA
Hotspots/labeled graphics
High-value visual learning; accessibility
risk.
M2-S04, M2-S18, diagrams
Text alternative/list fallback; target size
and keyboard activation; no visual-only
pathway.
Accessibility / possible component QA
Master HRBA Course Improvement Handoff - Final with G4 included


Builders and forms
Powerful but dense; labels/persistence
unproven.
## M3-M5
One decision at a time, labels/instructions,
errors, save state, refresh/resume tests.
Block config + G4 state QA
Knowledge checks
Useful but can be dense; live feedback
unproven.
## M1-M5
Progress indicator, short options, feedback
close to answer, aria-live or focus to
feedback.
Block config + G4 accessibility QA
Portfolio checkpoints
Strong transfer mechanism; safety and
privacy risk.
## M2-M5
Safety note, one prompt, save
confirmation, storage/privacy notice,
refresh/resume verification.
Course + block config + G4 privacy/state
## QA
Completion/transition Generally strong; saved-state dependent. M1-M5
End-to-end saved values, unlocks,
completion flags, next CTA, final
assessment/certificate path.
## G4 QA

- Consolidated implementation backlog
## ID

## Priority

Fix title

## Action

## Owner

Acceptance criteria

B0-01 P0 verification Confirm reviewed version
Record branch, commit, working-tree
status, dependency install, build,
TypeScript/lint where available,
deployment URL, and console
smoke-test result.
Developer + QA lead
Build/deploy evidence recorded; no
P0 console/runtime errors.
B0-02 P0 verification Route/progress/lock regression
Test clean browser, direct URLs,
invalid routes, refresh/back-forward,
local QA overrides, module unlocks,
progress persistence, and resume.
Developer + QA lead
Locked content stays locked;
completed content remains available;
progress persists.
B0-03 P1 Course shell and toolbar QA
## Test Menu, Glossary, Resources,
## Help Guide, Accessibility, Captions,
Playing/Pause, Audio, Reload State,
Return to LMS, Prev/Next/Course.
Accessibility reviewer + developer
All controls are keyboard-operable,
named, stateful, and non-breaking.
B0-04 P1 Final path QA
Test final assessment, scoring,
pass/fail, retake, final portfolio,
90-day plan, completion,
certificate/reporting if applicable.
QA lead + product owner
Final completion triggers only when
intended and proves applied HRBA
judgment.
B1-01 P1 Safe-practice note
Add standardized
fictionalize/generalize/no-identifiers
guidance to all learner-input tasks.
HRBA + safeguarding + content
designer
No task invites sensitive disclosure.
B1-02 P1 Standards and duty-bearer wording
Add standards/principles, primary
duty-bearers, respect/protect/fulfil,
bounded CSO role in M1/M2/M3.
## HRBA SME
Learner-facing text clearly explains
rights/duties/accountability.
B1-03 P1 Safe accountability sequence
## Add
verify-risk-protect-engage-follow-up
language in safe standards, actor
engagement, feedback, reporting.
HRBA + safeguarding reviewer
Common sequence appears in
## M2/M4/M5.
B1-04 P1 Module 5 ethical MEAL pass
Add minimum necessary data,
anonymization/small-cell risk,
Safeguarding + MEAL reviewer
Module 5 safety rules are visible and
actionable.
Master HRBA Course Improvement Handoff - Final with G4 included


consent, refusal-plus-alternative
story, safe reporting.
B1-05 P2 Local governance cues
Add safe examples: woreda/kebele
offices, sector offices,
school/health/water committees,
local councils, service providers.
Local CSO/context reviewer
Relevant actor examples support
local transfer without sensitive
specificity.
B2-01 P1 Worked examples
Add model example + rationale
before complex matching, builder,
repair, reporting, portfolio, capstone
tasks.
Instructional designer
Every complex task has example-first
scaffolding.
B2-02 P1 Chunk dense screens
Simplify M3/M4/M5 high-friction
screens using existing blocks: one
task, one instruction, one active
response area.
Instructional designer + UX designer
No high-friction screen demands
multiple unrelated decisions at once.
B2-03 P2 Micro-recaps and transitions
Add brief recaps after long
concept/practice clusters.
Instructional designer
Long clusters include transition/recap
cues.
B3-01 P1 Media placeholder cleanup
Replace or reframe Modules 2-5 intro
media; add
captions/transcripts/fallback.
Media lead + developer
No “will be added” placeholder
remains.
B3-02 P1 Alt text and alternatives
Audit meaningful visuals, icons,
diagrams, hotspots, background
scenes; add alt or decorative
marking; provide text fallbacks.
Accessibility reviewer + content
designer
Screen-reader users receive
equivalent meaning and completion
path.
B3-03 P2 CTA and state clarity
Clarify disabled/continue states with
“open X more / complete Y to
continue”.
UX/content designer
Learners know what remains before
continuing.
B4-01 P1 Implementation accessibility audit
Keyboard-only path, focus
order/visibility, ARIA/state, form
labels, live feedback,
captions/transcripts, toolbar.
Accessibility reviewer + developer
Core path can be completed without
mouse and with screen-reader
support.
## B4-02 P1/P2
Mobile, performance, and low
bandwidth
Test common mobile/tablet, large
text, high contrast, asset-size,
throttling, lazy-load/fallback.
QA lead + developer
No clipping/hidden CTA/unusable
controls; assets optimized.
B4-03 P1 Privacy/security/reporting mode
Declare plain
web/SCORM/xAPI/hybrid; audit
cookies/storage/telemetry,
HTTPS/HSTS/CSP, privacy notice
and learner-input storage.
Product owner + developer/security
reviewer
Runtime mode and privacy/security
controls are documented and
validated.
B5-01 P2 Design-system learning
Document reusable pattern decisions
and AI deviation/protected-file log for
future CSO Learning Hub courses.
Course manager + design-system
reviewer
Reusable standards drafted; no
protected-layer edits without
approval.

- Recommended implementation sequencing
## Batch

## Objective

## Scope

Human owner/review

QA before next batch

Master HRBA Course Improvement Handoff - Final with G4 included


Batch 0: Evidence and technical truth
Establish the reviewed build, route/state
behavior, shell/tool behavior, final
assessment/completion status, and
evidence gaps before broad edits.
B0-01 to B0-04 Developer + QA lead + product owner
Build/deploy/routes/state/final path
evidence recorded.
Batch 1: Safe content and safeguarding
Remove highest HRBA/safeguarding risks
through course-layer text and prompt
edits.
B1-01 to B1-05
HRBA SME + safeguarding + local CSO
reviewer
Content diff approved; no protected files
changed.
Batch 2: Learning design repairs
Improve practice clarity and reduce
cognitive load while staying within
approved blocks.
B2-01 to B2-03 Instructional designer + HRBA SME
Complex tasks have examples; dense
screens are chunked.
Batch 3: Visual/media/accessibility text
cleanup
Clean placeholders, visual alternatives,
and task-state clarity.
B3-01 to B3-03
Visual designer + accessibility reviewer +
developer
No raw placeholders; meaningful
alternatives and clearer states.
Batch 4: Technical QA and accessibility
verification
Run implementation-level QA after
content/design fixes.
B4-01 to B4-03
QA lead + developer +
accessibility/security reviewer
All P0/P1 gates pass or have accepted
documented exceptions.
Batch 5: Learner testing preparation and
system learning
Prepare limited learner testing and capture
reusable pattern lessons after readiness
gates pass.
B5-01 and learner testing protocol
Course manager + facilitator + MEAL
reviewer
Testing protocol, observation guide,
feedback form, and backlog update ready.

- G4 technical readiness gates
These gates are now formal parts of the master handoff. Passing them is required before learner testing or pilot launch. The current state is not a failed technical build; it is an
unproven technical build. G4 sign-off requires evidence, not assumptions.
## Gate

What must be tested/documented

Release priority

Acceptance criteria

Version and release evidence
Branch, commit hash, working tree, install/build,
TypeScript/lint if available, deployment URL, console
smoke test.
P0 before learner testing QA report contains exact evidence and retest status.
Routing and learner state
Home/course page, module launch, direct routes, invalid
routes, refresh, back/forward, clean state, partial
progress, resume, lock/unlock, localhost-only QA override
behavior.
## P0/P1
Production route guards work; progress persists; locked
routes do not leak.
Course shell and tools
Menu, glossary, resources, help guide, accessibility,
captions/transcripts, audio/play/pause, reload state, return
to LMS/course, previous/next.
## P1
Every control works with keyboard and has clear
accessible name/state.
## Assessment/completion/certificate
Module checks, final assessment, pass/fail, retake,
scoring, feedback, completion, certificate/reporting,
LMS/LRS if used.
## P0/P1
Final state is deterministic and represents applied
competence.
Portfolio and learner-input persistence
Save, edit, skip if allowed, refresh, close/reopen, resume,
final synthesis, 90-day plan, storage notice.
## P1
Learner inputs persist safely and do not expose
unnecessary sensitive data.
Accessibility implementation
Keyboard-only, focus order, visible focus, ARIA
labels/states, modal focus trap/return, form labels, live
feedback, captions/transcripts, screen-reader support,
high contrast/large text.
## P1
Core path and representative interactions pass
WCAG-oriented checks.
Master HRBA Course Improvement Handoff - Final with G4 included


Media and assets
Video playback/fallback, captions/transcripts, network
failure, image paths, alt text, asset size, lazy loading.
## P1/P2
Media failure never blocks learning; alternatives are
available.
## Mobile/responsiveness/performance
Mobile/tablet portrait/landscape, large text, high contrast,
low bandwidth, bundle/chunk/asset audit.
## P1/P2
No clipped content, hidden CTA, unusable target, or
blocking load issue.
## Package/reporting/privacy/security
Plain web/SCORM/xAPI/hybrid mode, completion
records, analytics scope, cookies/storage/telemetry,
HTTPS/HSTS/CSP, data retention and learner notice.
P1 Runtime and data controls are documented and verified.
Design-system and AI compliance
Tokens/components/templates/shared blocks, no
uncontrolled hard-coded local styles, protected file list, AI
deviation log, diff audit.
## P1/P2
No protected-layer drift; changes remain within approved
course-layer scope unless separately approved.

- Ready-to-use improvement wording
## Input

Draft wording

## Use

## Status

Safe HRBA practice note
Use a fictional, generalized, or non-sensitive example.
Do not include names, phone numbers, exact
locations, identifiable stories, survivor details,
children’s details, officials’ names, organizational
disputes, or sensitive incidents.
All reflection/portfolio/action-plan forms Required
HRBA standards grounding
HRBA uses human rights standards and principles as
a practical reference for fair decisions, meaningful
participation, non-discrimination, accountability, and
safe action.
M1 definition, M2 recap, M3 design intro Required
Duty-bearer explanation
State institutions are the primary duty-bearers. They
have obligations to respect, protect, and fulfil rights.
CSOs support rights-holders and accountability, but
they do not replace duty-bearers.
M1/M2/M3 actor screens Required
Safe accountability sequence
Verify the evidence, assess risk, protect
rights-holders, choose a constructive engagement
route, and document follow-up.
M2 standards, M4 actor engagement, M5 reporting Required
Local governance example
Depending on the issue, relevant actors may include
a woreda sector office, kebele structure, school or
health committee, water office, local council, service
provider, community representatives, or CSO
partners.
Duty-bearer/actor mapping Recommended
Worked-example instruction
First, review this example. Notice what makes the
stronger answer safer, more inclusive, and more
accountable. Then apply the same logic to the next
case.
Complex practice screens Required
Feedback pattern
This is stronger because it identifies who is affected,
what barrier exists, who has responsibility, what risk
must be managed, and what follow-up is needed.
Practice and quiz feedback Recommended
Master HRBA Course Improvement Handoff - Final with G4 included


Portfolio safety wording
This portfolio is for learning. Keep it private and safe.
Use a generalized issue rather than a real sensitive
case.
Portfolio tasks Required
Alt text pattern
Describe the learning meaning, not decorative detail:
who or what is shown, what HRBA relationship or
barrier is visible, and what the learner should
understand.
All meaningful visuals Required

- Codex/developer handoff rules
● Use small, sequenced tasks. Do not ask Codex to “fix the course” broadly.
● Every task must list allowed files, protected files, intended changes, acceptance criteria, required tests, and expected git diff boundaries.
● Course-layer content/schema/alt-text/block-configuration changes are preferred first.
● Protected-layer changes require explicit approval, rationale, regression plan, and separate review.
● Every implementation batch must end with build/test output, screenshot or QA evidence where relevant, and a short status note: completed, partially completed, blocked, or
requires human review.
● For G4 tasks, always require evidence capture: branch, commit, build result, deployment URL if applicable, console state, test matrix, pass/fail status, open issues, and retest
notes.
- Final readiness decision
Current decision
Do not start external learner testing or pilot launch yet. Proceed with internal technical review
and controlled implementation batches.
Minimum before learner testing
Batch 0 passed; P1 content/safeguarding fixes completed; media placeholders resolved or
approved as no-video fallbacks; worked examples added; dense screens reduced; alt text
and alternatives fixed; Batch 4 G4 technical/accessibility QA passed.
Minimum before pilot launch
Learner testing completed; P0/P1 learner issues resolved; final
assessment/certificate/reporting mode verified; privacy/security notice and data behavior
confirmed; mobile/browser matrix documented; improvement backlog updated.
Recommended next immediate action
Begin Batch 0: establish the exact reviewed build and run
route/progress/final-path/accessibility-shell verification before editing protected or stateful
parts of the course.

Master HRBA Course Improvement Handoff - Final with G4 included
