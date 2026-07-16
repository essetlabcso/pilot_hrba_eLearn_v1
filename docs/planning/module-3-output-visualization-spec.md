# Module 3 Output Visualization Specification

## 1. Planning status

Status: approved planning baseline after checkpoint. This document performs no visualization implementation. It authorizes Wave 1A as the only slice that may receive a separate implementation brief and implementation branch.

- Baseline branch: `feature/module3-simple-uiux-polish`
- Baseline commit: `263c76d316f3b12529d868e871d3556c1438070d`
- Planning branch: `feature/module3-output-visualization-planning`
- Production source changes in this phase: none
- Visualization candidates: 12

This specification defines how Module 3 learner outputs could become clearer visual learning artifacts while preserving the validated functional baseline.

## 2. Planning objectives

Each proposed visualization must:

1. help the learner interpret a saved output, not merely decorate it;
2. derive from information already stored by the current screen;
3. update predictably when the learner changes and regenerates an output;
4. retain a complete text equivalent;
5. work at desktop and mobile widths without horizontal page scrolling;
6. remain usable with keyboard navigation, high contrast, enlarged text, and reduced motion;
7. avoid asking for additional sensitive information;
8. leave existing routes, IDs, state keys, payloads, completion rules, downloads, persistence, freshness checks, portfolio behavior, and Module 4 handoff unchanged.

## 3. Locked functional boundary

Visualization implementation must be projection-only. A visualization may read an existing saved output and manage local presentation state such as an expanded card, selected view, or visible legend. It must not become the source of truth for learner work.

The following are locked:

- screen IDs and routes;
- `practiceCheckState` records, state keys, and existing saved-output shapes;
- generated payload field names, saved payloads, and existing field values;
- scoring, quotas, validation, completion, menu locking, and progression;
- persistence and portfolio behavior;
- snapshot source signatures and freshness behavior;
- optional own-CSO practice separation and safety rules;
- DOCX and Markdown generation, file names, and download availability;
- shell navigation, Previous/Next behavior, browser Back/Forward behavior, and Module 4 handoff.

No visualization may silently sort, group, rename, infer, or suppress learner data in a way that changes the meaning of the saved output. Presentation-only ordering must be deterministic and documented.

## 4. Shared visualization contract

### 4.1 Rendering model

Every visualization should have four layers:

1. **Meaning statement:** one sentence explaining what the learner should notice.
2. **Visual view:** the diagram, matrix, board, pathway, or comparison.
3. **Accessible text view:** the same relationships expressed as headings, lists, or a semantic table.
4. **Carry-forward note:** where the output is used next in Module 3 or Module 4.

The visual and text views must be generated from the same normalized read-only view model so they cannot drift.

### 4.2 Empty, partial, current, and stale states

Each output must support:

- **Empty:** show the existing guidance and no fabricated example output.
- **Partial:** show only information the learner has entered; retain current validation guidance.
- **Generated/current:** render the saved output and its text equivalent.
- **Edited but not regenerated:** retain the current output-staleness behavior and label the visual as needing update.
- **Restored:** reconstruct the same visual from the saved record after returning or reloading.

In empty and partial states, show only:

- existing instructional guidance;
- current learner selections;
- current learner-entered text;
- existing validation or freshness messages.

Do not display fabricated learner-output data, illustrative actors, inferred relationships, assumed barriers, or automatically composed conclusions inside the learner’s visualization.

### 4.3 Interaction rules

- Use static visualizations by default.
- Add interaction only when it improves comprehension, such as filtering a dense actor map or opening one pathway step.
- Presentation interactions must never gate completion.
- Do not use drag-and-drop, hover-only disclosure, canvas-only content, pan/zoom as a requirement, or animation as the sole explanation.
- Presentation-only filters, expanded cards, selected visual views, and legends use local component state only.
- Presentation-only state does not enter `practiceCheckState`, learner progress, or the portfolio; it does not affect completion; and it resets when the learner leaves or reloads the screen.

### 4.4 Responsive behavior

- Desktop target: 1440 × 900, with the visualization inside the existing Module 3 content width.
- Mobile target: 390 × 844, using a single-column reading order.
- Matrices become labelled record cards on narrow screens rather than horizontally scrolling tables.
- Horizontal pathways become numbered vertical step lists.
- Quadrants become four stacked, explicitly labelled regions.
- Connectors and arrows are supplementary; numbered labels must preserve the sequence without them.
- Controls and legends remain at least 44px high where practical.

### 4.5 Accessibility and text alternatives

Every complex visual requires:

- a concise accessible name;
- a visible summary of the main insight;
- a long description or structured text equivalent adjacent to the visual;
- semantic headings, lists, definition lists, or tables;
- state labels in text, not color alone;
- visible focus for every interactive control;
- no focusable SVG shapes unless they perform a documented action;
- a logical reading order independent of visual position;
- high-contrast-safe borders, labels, and patterns;
- no required motion and no information lost when reduced motion is enabled.

### 4.6 Visual language

Use the existing Module 3 scoped tokens and design-system palette. Prefer semantic shapes and short labels over illustrative imagery. Do not embed long text in image files. If icons are used, pair each icon with a text label and treat the icon as supplementary.

### 4.7 Approved rendering approach

Semantic HTML and CSS are the default rendering approach.

SVG may be used only where:

- semantic HTML cannot express the relationship clearly;
- a complete structured text equivalent remains adjacent;
- no information depends on SVG position, line, color, or hover alone.

Wave 1A, Wave 1B, and Wave 1C should not require SVG unless implementation evidence proves otherwise.

### 4.8 Initial shared primitives

The initial shared primitives are Module 3-scoped presentation patterns only:

- visualization container;
- meaning statement;
- current/stale/partial status banner;
- labelled band or lane;
- status label;
- chip or compact list item;
- text-equivalent section;
- carry-forward note.

Do not create a new global design system, visualization framework, charting abstraction, or cross-course visualization infrastructure.

### 4.9 Visible text-equivalent decision

The existing complete text view must remain visible in normal document flow.

Do not hide the text equivalent behind:

- a View as text control;
- a visual/text tab;
- a collapsed disclosure by default;
- hover;
- an accessibility-only mode.

The visual supplements the text output; it does not replace it.

### 4.10 Presentation-state decision

Presentation-only filters, expanded cards, selected visual views, and legends use local component state only. They do not enter `practiceCheckState`, learner progress, or the portfolio; they do not affect completion; and they reset when the learner leaves or reloads the screen.

### 4.11 Download boundary

Visualization implementation does not change downloads.

Do not:

- add visualizations to exported files;
- change filenames;
- change file formats;
- change download availability;
- change download content.

### 4.12 Deterministic ordering

Use this shared ordering rule:

1. use the order already present in the saved generated output;
2. where no generated ordering exists, use the current learner-selection order if stable;
3. otherwise use the original screen-option order;
4. do not introduce alphabetical or importance-based sorting unless separately approved.

## 5. Existing state-to-output map

| # | Output | Existing source | Principal fields already available |
|---:|---|---|---|
| 1 | Context and Inequality Snapshot | `M3-R05` saved practice record | affected groups, barriers, safe evidence, design implications, context summary |
| 2 | Policy and Standards Map | `M3-R06` saved practice record | selected references, context-signal matches, generated map rows, design implications, warnings |
| 3 | Rights-Holder and Barrier Matrix | `Screen7Submission` / `M3-R07` | group-barrier links, barrier categories, generated rows, overlap insights, design responses |
| 4 | Responsibility and Support Map | `Screen8Submission` / `M3-R08` | generated responsibility rows, actor categories, CSO roles, capacity-gap hints, safe engagement questions |
| 5 | Power and Influence Map | `Screen9Submission` / `M3-R09` | actor ratings, four map zones, likely roles, engagement approaches, design implications |
| 6 | Root-Cause and Capacity-Gap Diagnostic | `Screen10Submission` / `M3-R10` | visible signs, direct causes, deeper causes, capacity gaps, generated canvas rows, design implications |
| 7 | Gender and Disability Design Check | `Screen11Submission` / `M3-R11` | classifications, dashboard rows, inclusion-check rows, selected repairs, status and warnings |
| 8 | Participation and Accountability Pathway | `Screen12Submission` / `M3-R12` | group, gap, decision, access support, influence method, response channel, actor, follow-up, watch-point |
| 9 | Risk and Do-No-Harm Board | `Screen13Submission` / `M3-R13` | situation, categories, affected group, cause, impact, mitigation, actor, watch sign, alternative channel, stop/referral condition |
| 10 | HRBA Project Design Repair Package | `Screen14Submission` / `M3-R14` | weak/repaired objective, activity repairs, intervention logic, indicator, evidence, risk, watch-point |
| 11 | Draft Plan Review and Repair Output | `Screen17Submission` / `M3-R17` | reviewed sections, strengths, gaps, reasons, sources, repairs, repaired wording, review note |
| 12 | Final HRBA Project Design Improvement Snapshot | existing Final Snapshot assembler / `M3-R21` | 14 assembled sections, source labels, completion status, assessment summary, watch-points, source signature |

## 6. Output specifications

### 6.1 Context and Inequality Snapshot

**Learner understanding**

The learner should see that a context issue becomes a design concern through a chain: who may be affected differently, which barrier matters, what evidence is safe to verify, and what the project may need to change.

**Existing information**

Use the existing `M3-R05` record: `selectedJiruAmbaAffectedGroups`, `selectedBarriers`, `safeEvidenceToVerify`, `generatedDesignImplications`, `contextScanSummary`, and the current carry-forward fields.

**Proposed visual structure**

A four-band snapshot:

1. affected groups;
2. inequality or access barriers;
3. safe evidence to verify;
4. design implications.

Use short labelled chips within each band and a left-to-right relationship on desktop. Do not draw unsupported one-to-one links where state only provides grouped lists.

**Change behavior**

Before generation, each band reflects the current draft selections. After generation, the saved summary becomes the visual insight. If inputs change, retain the current stale-output warning and visually label the generated snapshot as needing update.

**Mobile**

Stack the four bands in numbered order. Use an explicit “leads to” label between sections rather than arrows alone.

**Accessibility/text alternative**

Provide four semantic sections followed by the context summary. Announce counts in text. The visual bands must not imply that every group experiences every barrier unless the saved record says so.

**Mode**

Static, with optional expand/collapse for long lists. Expansion is non-persistent.

**Invariants**

Preserve the `M3-R05` saved record, current selection and generation rules, context summary, safety wording, completion, and carry-forward payload.

**Complexity, implementation tier, and recommended wave**

Complexity: low. Implementation tier: Implementation Tier 1. Recommended wave: Wave 1A. This is the first implementation proof because its data model is simple and its risk of altering meaning is low.

### 6.2 Policy and Standards Map

**Learner understanding**

The learner should understand how a context signal connects to a selected policy, standard, or design lens and how that reference changes a practical project-design question.

**Existing information**

Use the `M3-R06` selected reference cards, `signalReferenceMatches`, generated map rows, design implications, source/reference labels, warnings, scores, and carry-forward note.

**Proposed visual structure**

A row-based connection map with three columns:

1. context signal;
2. policy/standard/design reference;
3. design implication or responsibility question.

Each generated row is one complete relationship. References remain readable text; icons may identify source layers but cannot replace labels.

**Change behavior**

Rows appear only for current matches. Adding or removing a match updates the draft preview; generation fixes the current saved row set. Existing coverage/relevance/usefulness feedback remains separate and unchanged.

**Mobile**

Convert each row to a three-step relationship card. Avoid a compressed three-column table.

**Accessibility/text alternative**

Use a semantic list or table with headers “Context signal,” “Reference,” and “Design use.” Provide warnings as a separate labelled list, not tooltip-only content.

**Mode**

Static. Optional source-layer filter may hide rows visually, but the accessible “Show all” view is the default and filtering cannot alter saved matches.

**Invariants**

Preserve reference IDs, signal-match rows, coverage/relevance/usefulness calculations, warnings, generated payload, downloads, completion, and Screen 7 carry-forward.

**Complexity, implementation tier, and recommended wave**

Complexity: medium. Implementation tier: Implementation Tier 1. Recommended wave: Wave 2.

### 6.3 Rights-Holder and Barrier Matrix

**Learner understanding**

The learner should see that specific rights-holder groups experience different combinations of barriers and therefore need different design responses.

**Existing information**

Use `generatedMapRows`, `groupBarrierLinks`, barrier labels and categories, affected benefit, what the barrier may block, design response, overlap insights, and warnings from `M3-R07`.

**Proposed visual structure**

A semantic matrix:

- rows: specific rights-holder groups;
- columns: barrier categories;
- populated cells: the saved barrier labels;
- row detail: affected benefit, design response, and next actor question.

Do not infer empty cells as “no barrier”; label them “not selected in this exercise.”

**Change behavior**

The matrix updates from current group-barrier links. The generated state adds overlap insights and design-response detail. Custom group labels must be handled as plain text and never used as IDs or CSS class names.

**Mobile**

Render one group card at a time with barrier-category headings. Provide “Show all groups” as the default; any group filter is presentation-only.

**Accessibility/text alternative**

Desktop may use a real table only if headers remain understandable. Mobile uses headings and lists. Include a visible note explaining empty cells and a complete list of overlap insights.

**Mode**

Static matrix with optional group filtering.

**Invariants**

Preserve group and barrier IDs, specificity and quota rules, overlap/warning logic, generated rows, saved summary, completion, and Screen 8 carry-forward.

**Complexity, implementation tier, and recommended wave**

Complexity: medium. Implementation tier: Implementation Tier 1. Recommended wave: Wave 2.

### 6.4 Responsibility and Support Map

**Learner understanding**

The learner should distinguish public responsibility, service/sector roles, community influence, realistic CSO support, allies, and capacity gaps without shifting duty-bearer responsibility onto the CSO.

**Existing information**

Use each `Screen8GeneratedRow`: barrier, affected group, primary public responsibility, service/sector actors, community/influence actors, CSO roles, allies, capacity-gap hints, safe engagement question, and next question.

**Proposed visual structure**

A responsibility lane map organized around each barrier:

1. rights-holder/barrier;
2. primary responsibility;
3. implementation or service roles;
4. participation/influence roles;
5. realistic CSO support;
6. capacity gap and safe engagement question.

Use lane labels and bordered role cards. Avoid a network graph that suggests formal relationships not present in state.

**Change behavior**

Only selected categories and actors appear. Existing overload and missing-responsibility warnings remain prominent and are not recalculated by the visualization.

**Mobile**

Each barrier becomes a vertical responsibility record in the same lane order. Repeated lane headings are preferable to a wide diagram.

**Accessibility/text alternative**

Use one article per barrier with a definition list for role categories. Ensure “CSO role” and “primary public responsibility” are never represented by color alone.

**Mode**

Static with optional barrier tabs when there are multiple rows. Tabs require a visible “Show all” mode.

**Invariants**

Preserve actor-category meanings, responsibility validation, overload warnings, exported actors for Screen 9, generated rows, saved payload, and completion.

**Complexity, implementation tier, and recommended wave**

Complexity: medium-high. Implementation tier: Implementation Tier 2. Recommended wave: Wave 2, after the shared matrix/card pattern is proven.

### 6.5 Power and Influence Map

**Learner understanding**

The learner should understand that formal authority, practical influence, support/interest, likely role in change, and engagement approach are related but distinct judgments.

**Existing information**

Use `actorRatings`, `generatedPowerMapZones`, `generatedActorRows`, detected insights, warnings, engagement approach, design implication, and question for Screen 10 from `M3-R09`.

**Proposed visual structure**

A labelled four-zone map using the existing saved zones:

- Work closely;
- Engage carefully;
- Strengthen voice;
- Monitor lightly.

Each actor card shows the actor label, authority, influence, support/interest, likely role, and engagement approach. The zones must follow the generated zone assignment rather than re-deriving placement.

**Change behavior**

Actor cards move only when the existing generation logic changes their saved zone. Rating edits show a draft/needs-update state. Detected insights remain textual callouts and are not inferred from visual geometry.

**Mobile**

Stack four labelled zone sections. Never shrink a quadrant to an unreadable mini-chart. Provide counts and actor lists for every zone, including empty zones.

**Accessibility/text alternative**

The text equivalent lists each zone and its actors, then each actor’s full rating record and design implication. Use text labels for low/medium/high and support states.

**Mode**

Interactive only for presentation filters such as “Show all,” “Public/service actors,” and “Rights-holder/support actors.” Static by default.

**Invariants**

Preserve actor selection quotas, rating values, saved zone assignment, detected-insight logic, engagement guidance, generation/completion rules, and Screen 10 carry-forward.

**Complexity, implementation tier, and recommended wave**

Complexity: high. Implementation tier: Implementation Tier 2. Recommended wave: Wave 3. This is a high-learning-value visualization but should follow shared accessibility and responsive primitives.

### 6.6 Root-Cause and Capacity-Gap Diagnostic

**Learner understanding**

The learner should distinguish visible signs, direct causes, deeper root causes, and rights-holder or duty-bearer capacity gaps, then connect them to design implications.

**Existing information**

Use `problemLayers`, learner classifications, `generatedProblemLayersCanvas`, rights-holder capacity gaps, duty-bearer/system capacity gaps, responsibility gaps, design implications, and later repair questions from `M3-R10`.

**Proposed visual structure**

A four-level diagnostic stack:

1. visible sign;
2. direct cause;
3. deeper root cause;
4. capacity gap.

Each generated canvas row becomes one traceable diagnostic pathway, ending with a design implication and later repair question. Do not connect items across different saved rows unless the data explicitly does so.

**Change behavior**

Classification changes update the draft layer lists. The generated pathways appear only from the existing generated canvas. Alignment feedback remains unchanged.

**Mobile**

Each pathway becomes a numbered vertical trace. Provide a compact layer filter only as an optional view; the full pathway view remains available.

**Accessibility/text alternative**

Use ordered lists with explicit layer names and one article per pathway. Connectors must not be the only indication of sequence.

**Mode**

Static pathways with optional expand/collapse per generated row.

**Invariants**

Preserve classification values, alignment feedback, generated canvas rows, root-cause summary, capacity-gap distinctions, completion, and downstream repair questions.

**Complexity, implementation tier, and recommended wave**

Complexity: high. Implementation tier: Implementation Tier 2. Recommended wave: Wave 3.

### 6.7 Gender and Disability Design Check

**Learner understanding**

The learner should see which design areas are strong, partial, or missing and what concrete gender, disability, accessibility, accommodation, responsibility, and monitoring repairs are required.

**Existing information**

Use classifications, dashboard rows, inclusion-check rows, selected repair rows, gender and disability status, feedback state, warning IDs, and the carry-forward question from `M3-R11`.

**Proposed visual structure**

A design-check dashboard with:

- a status summary for gender and disability/accessibility;
- one row/card per design area;
- explicit status label;
- weakness/strength explanation;
- selected repair;
- responsibility and watch-point.

**Change behavior**

Status changes reflect the existing learner classifications. The visualization must not calculate a new score. Generated repair rows appear only after the existing completion logic produces them.

**Mobile**

Stack design-area cards. Status, explanation, repair, and follow-up remain in that order.

**Accessibility/text alternative**

Use status words and icons together. Provide a summary sentence, then a semantic list of every design area. High contrast must preserve status borders and labels without relying on background colors.

**Mode**

Static dashboard. Optional status filter may be added later but is not required for the first slice.

**Invariants**

Preserve classification options, repair selections, status and warning logic, dashboard rows, learner fields, completion, and the Screen 12 carry-forward question.

**Complexity, implementation tier, and recommended wave**

Complexity: low-medium. Implementation tier: Implementation Tier 1. Recommended wave: Wave 1B.

### 6.8 Participation and Accountability Pathway

**Learner understanding**

The learner should understand that meaningful participation is a complete pathway from information and access, through influence, to response, explanation, follow-up, and design adjustment.

**Existing information**

Use the saved rights-holder group, participation/accountability gap, decision to influence, access support, influence method, response channel, responsible actor, response/follow-up, accessibility/risk check, alternative channel, design adjustment, watch-point, evidence question, and badges from `M3-R12`.

**Proposed visual structure**

An eleven-step numbered pathway matching the established example order. Group the steps into four conceptual phases without changing their sequence:

1. prepare access and information;
2. enable influence before the decision;
3. receive and respond to feedback;
4. explain, follow up, adapt, and monitor.

**Change behavior**

Draft steps fill as existing fields are completed. The generated pathway shows the current saved values. Updating any required field invokes the existing freshness behavior; the visualization does not independently decide completion.

**Mobile**

Use a vertical timeline with numbered headings. Avoid a horizontal scroller. Keep alternative channels and risk checks visible, not hidden in tooltips.

**Accessibility/text alternative**

Use an ordered list of all eleven steps. Each step has a short heading and the selected value. Phase grouping must not interrupt numerical order.

**Mode**

Static. Optional “focus on one phase” control is presentation-only and must preserve a Show all option.

**Invariants**

Preserve the eleven existing fields and their order, generation validation, safety note, evidence question, saved payload, freshness behavior, completion, and Screen 13 carry-forward.

**Complexity, implementation tier, and recommended wave**

Complexity: medium. Implementation tier: Implementation Tier 1. Recommended wave: Wave 2.

### 6.9 Risk and Do-No-Harm Board

**Learner understanding**

The learner should see the full safety decision: what risk exists, who may be affected, how serious it is, what mitigation and alternative channel are required, who responds, what warning sign to watch, and when to pause, stop, or refer.

**Existing information**

Use `riskDoNoHarmBoard.selection`, `generatedBoard`, interpretation messages, safety confirmation, feedback, and portfolio summary from `M3-R13`.

**Proposed visual structure**

A three-lane board:

1. **Risk:** situation, category, affected group, likely cause, impact;
2. **Response:** mitigation, responsible actor, alternative channel, design adjustment;
3. **Monitor/escalate:** warning sign, pause/stop/referral condition, carry-forward use.

Impact uses a text badge plus shape or border treatment. It must not be communicated by red/amber/green alone.

**Change behavior**

Draft choices fill the lanes. The generated board displays only the current saved selection. Existing validation and impact rules remain authoritative.

**Mobile**

Stack the three lanes. Keep pause/stop/referral content fully visible and visually distinct from general monitoring.

**Accessibility/text alternative**

Use three semantic sections with definition lists. Announce impact as text. Safety and referral guidance cannot be collapsed by default.

**Mode**

Static.

**Invariants**

Preserve risk selection rules, impact values, mitigation and alternative-channel logic, pause/stop/referral wording, saved board, completion, downloads, and Screen 14 carry-forward.

**Complexity, implementation tier, and recommended wave**

Complexity: low-medium. Implementation tier: Implementation Tier 1. Recommended wave: Wave 1C.

### 6.10 HRBA Project Design Repair Package

**Learner understanding**

The learner should see how earlier analysis changes the weak objective, activity package, intervention logic, indicators, evidence, assumptions, and implementation watch-points as one coherent repair.

**Existing information**

Use `repairedObjective`, optional `repairedActivityPackage`, optional `interventionLogicIndicators`, `designRepairPackage`, feedback messages, and carry-forward fields from `M3-R14`.

**Proposed visual structure**

A before/after repair canvas followed by a design chain:

- Before: weak objective and identified gaps;
- After: repaired objective;
- Activity package: selected repaired activities and responsible roles;
- Logic chain: barrier/root cause → activity → output → outcome;
- Assurance: indicator → safe evidence → risk/assumption → watch-point.

Use explicit section headings. Do not visually imply causation beyond the saved intervention logic chain.

**Change behavior**

Sections appear as the existing stages are completed. Missing optional nested outputs are labelled “not yet generated,” not auto-filled. Any upstream edit continues to use existing invalidation/freshness behavior.

**Mobile**

Stack Before and After, then render the logic chain vertically. Activities become cards. Assurance fields remain a final grouped section.

**Accessibility/text alternative**

Provide the full before/after text and an ordered logic-chain list. Each activity card includes responsibility, risk/accountability adjustment, and evidence question.

**Mode**

Static with optional section accordions. All sections must remain available in one text view.

**Invariants**

Preserve objective/activity/logic generation, existing nested payloads, invalidation and freshness behavior, indicators, evidence, risk/watch-points, completion, and downstream review use.

**Complexity, implementation tier, and recommended wave**

Complexity: high. Implementation tier: Implementation Tier 3. Recommended wave: Wave 4, after the contributing output patterns are stable.

### 6.11 Draft Plan Review and Repair Output

**Learner understanding**

The learner should see which draft-plan strengths were retained, where priority HRBA gaps were found, which earlier evidence supports each finding, and how one section was repaired.

**Existing information**

Use reviewed section statuses, selected strengths, selected gaps, `gapReviews` reasons/sources/repairs/repaired wording, `reviewNote`, repaired section, implementation watch-point, and carry-forward note from `M3-R17`.

**Proposed visual structure**

A review ledger:

- section status overview: ready for now or needs HRBA check;
- strengths retained;
- priority findings, each linked to its evidence source and repair;
- before/after repaired section;
- remaining verification questions and watch-point.

Connections are shown as numbered references, not decorative lines across the page.

**Change behavior**

Section statuses and findings update from the current screen stages. The final ledger appears only when the existing review note is generated. Editing findings retains current stale/review behavior.

**Mobile**

Use one review card per section. Before/after text stacks vertically and retains labels.

**Accessibility/text alternative**

Use a status list, followed by one article per finding. Each article must state section, issue, reason, evidence source, repair, and revised wording.

**Mode**

Static ledger with optional filters by section status. Show all remains the default.

**Invariants**

Preserve draft-section statuses, gap and strength selections, source/repair values, review-note generation, repaired wording, downloads, completion, and Final Snapshot contribution.

**Complexity, implementation tier, and recommended wave**

Complexity: medium-high. Implementation tier: Implementation Tier 3. Recommended wave: Wave 4.

### 6.12 Final HRBA Project Design Improvement Snapshot

**Learner understanding**

The learner should understand the Module 3 design as an integrated, traceable package and see whether every required source output is complete, reviewed, saved, and current.

**Existing information**

Use the existing 14 `FinalSnapshotSection` records assembled by `getFinalSnapshotSections`, their source labels and completion states, the assessment summary, implementation watch-points, optional note, `sourceSignature`, and current save/freshness status.

**Proposed visual structure**

A synthesis dashboard with:

1. readiness summary;
2. a project-design journey showing the 12 major outputs in learning order;
3. the existing 14 snapshot sections as the authoritative detailed view;
4. assessment summary and targeted review;
5. implementation watch-points;
6. save/current/download status and existing actions.

The journey is a navigation and comprehension aid only. The existing section review remains authoritative for save readiness.

**Change behavior**

Completion indicators derive from the existing `complete` values. Saved/current/update-required states derive only from existing source-signature logic. The visual must never mark a section complete or current independently.

**Mobile**

Render the journey as a vertical ordered list. Keep readiness, current status, review controls, Save, downloads, and Continue in normal document flow; no fixed action bar may cover content.

**Accessibility/text alternative**

The existing accordion/list content remains the complete text equivalent. The journey uses numbered steps with source and status text. Readiness and freshness messages remain live and visible.

**Mode**

Interactive for existing section review/accordion behavior. Any new journey filtering or focus is presentation-only and cannot replace review actions.

**Invariants**

Preserve the 14 authoritative assembled sections, source labels, completion checks, review requirements, source signature, update/save/current states, downloads, optional-note behavior, closure progression, and Module 4 handoff.

**Complexity, implementation tier, and recommended wave**

Complexity: high. Implementation tier: Implementation Tier 4. Recommended wave: Wave 4, implemented only after all contributing output contracts are stable.

## 7. Proposed implementation sequence

### Wave 0 — contracts and primitives

Planning deliverables before any screen implementation:

- approve a read-only visualization view-model convention;
- use only the small Module 3-scoped presentation patterns listed in Section 4.8;
- define empty/partial/current/stale presentation states;
- define desktop, 390px mobile, high-contrast, extra-large-text, and reduced-motion acceptance fixtures;
- use semantic HTML and CSS by default under the approved rendering decision in Section 4.7.

### Wave 1A — Context and Inequality Snapshot

Implement the Context and Inequality Snapshot only.

### Wave 1B — Gender and Disability Design Check

Implement the Gender and Disability Design Check only after Wave 1A is reviewed and checkpointed.

### Wave 1C — Risk and Do-No-Harm Board

Implement the Risk and Do-No-Harm Board only after the preceding authorized visualization slice is reviewed and checkpointed.

Each Wave 1 output requires:

- a separate implementation branch;
- a separate review;
- a separate QA report;
- a separate provisional checkpoint.

Do not implement Wave 1A, Wave 1B, and Wave 1C in one branch.

The first authorized implementation slice is Wave 1A — Context and Inequality Snapshot only.

No other output visualization may be implemented until Wave 1A is reviewed and checkpointed.

### Wave 2 — relationship maps

4. Policy and Standards Map;
5. Rights-Holder and Barrier Matrix;
6. Responsibility and Support Map;
7. Participation and Accountability Pathway.

### Wave 3 — analytical diagrams

8. Power and Influence Map;
9. Root-Cause and Capacity-Gap Diagnostic.

These require the strongest safeguards against inferred relationships and the most demanding responsive alternatives.

### Wave 4 — synthesis outputs

10. HRBA Project Design Repair Package;
11. Draft Plan Review and Repair Output;
12. Final HRBA Project Design Improvement Snapshot.

## 8. Implementation complexity and tier summary

Implementation Tier terminology is intentionally separate from defect-severity terminology. Do not use P0–P3 labels for visualization implementation priority.

| Output | Complexity | Implementation tier | Recommended wave |
|---|---|---|---|
| Context and Inequality Snapshot | Low | Implementation Tier 1 | Wave 1A |
| Policy and Standards Map | Medium | Implementation Tier 1 | Wave 2 |
| Rights-Holder and Barrier Matrix | Medium | Implementation Tier 1 | Wave 2 |
| Responsibility and Support Map | Medium-high | Implementation Tier 2 | Wave 2 |
| Power and Influence Map | High | Implementation Tier 2 | Wave 3 |
| Root-Cause and Capacity-Gap Diagnostic | High | Implementation Tier 2 | Wave 3 |
| Gender and Disability Design Check | Low-medium | Implementation Tier 1 | Wave 1B |
| Participation and Accountability Pathway | Medium | Implementation Tier 1 | Wave 2 |
| Risk and Do-No-Harm Board | Low-medium | Implementation Tier 1 | Wave 1C |
| HRBA Project Design Repair Package | High | Implementation Tier 3 | Wave 4 |
| Draft Plan Review and Repair Output | Medium-high | Implementation Tier 3 | Wave 4 |
| Final HRBA Project Design Improvement Snapshot | High | Implementation Tier 4 | Wave 4 |

## 9. Implementation acceptance gates

Every later visualization implementation slice must pass all of the following before checkpointing:

### Functional preservation

- Existing learner inputs generate byte-for-byte equivalent semantic payload values, excluding existing timestamp behavior.
- Existing completion, validation, scoring, quota, progression, and freshness rules pass targeted regression.
- Returning, reloading, Previous/Next, Back/Forward, menu locking, and saved-state restoration remain intact.
- Existing download filenames, formats, contents, and availability remain unchanged.
- Final Snapshot source signature and Module 4 handoff remain unchanged.

### Visual and responsive QA

- 1440 × 900 and 390 × 844 pass without page-level horizontal overflow.
- High contrast and extra-large text pass.
- No control, legend, label, or status is clipped.
- Visual order and text-equivalent order communicate the same relationships.
- Empty, partial, generated, stale, restored, and error states are tested.

### Accessibility QA

- Keyboard-only completion remains possible.
- Focus is visible and follows the learning order.
- Screen-reader labels, status text, and expanded/selected states are verified.
- No information relies on color, position, connector lines, hover, or animation alone.
- Complex visuals have a complete structured text equivalent.
- Reduced motion removes non-essential transitions.

### Safety and performance QA

- No new sensitive-input prompt is introduced.
- Learner text is escaped and rendered as text, never as markup or identifiers.
- No external visualization service receives learner data.
- Initial bundle and rendered DOM growth are measured for dense outputs.
- The visualization remains usable in low-bandwidth conditions without loading a required remote asset.

### Required evidence template

Every visualization slice must record:

- baseline branch and commit;
- changed files;
- source-to-view-model field map;
- empty-state screenshot;
- partial-state screenshot;
- generated/current screenshot;
- stale-state screenshot;
- restored-state screenshot;
- 1440 × 900 screenshot;
- 390 × 844 screenshot;
- high-contrast screenshot;
- extra-large-text screenshot;
- keyboard result;
- structured text-equivalent inspection;
- browser-console result;
- build;
- lint;
- diff check;
- functional-regression result;
- Git status.

## 10. Approved implementation decisions

The following decisions are approved for the first implementation brief:

1. Semantic HTML and CSS are the default rendering approach; SVG is restricted by Section 4.7.
2. Shared primitives remain the small Module 3-scoped set in Section 4.8.
3. Existing complete text equivalents remain visible in normal document flow.
4. Presentation-only state is local, non-persistent, non-gating, and resets on leave or reload.
5. Visualization implementation does not change downloads.
6. Empty and partial states never fabricate learner-output data or inferred conclusions.
7. Ordering follows the deterministic rule in Section 4.12.
8. Every visualization slice uses the evidence template in Section 9.
9. Wave 1A, Wave 1B, and Wave 1C use separate branches, reviews, QA reports, and provisional checkpoints.
10. Wave 1A is the only currently authorized implementation slice.

## 11. Recommended review decision

Approve this specification as the planning baseline, then prepare a separate implementation brief and implementation branch for Wave 1A — Context and Inequality Snapshot only. No other output visualization may be implemented until Wave 1A is reviewed and checkpointed. No visualization code is implemented in this planning task.

## 12. Boundary confirmation

This planning phase creates documentation only. It does not modify Module 3 source code, CSS, assets, routes, screen IDs, state keys, payloads, validation, persistence, progression, downloads, portfolio behavior, Final Snapshot freshness, shell navigation, or Module 4 handoff.
