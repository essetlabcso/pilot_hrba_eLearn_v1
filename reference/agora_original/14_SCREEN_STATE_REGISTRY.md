# 14_SCREEN_STATE_REGISTRY.md
# Screen / State Registry

## Purpose

Every screen and interaction state must be implemented as a registered state. This prevents AI Studio from merging states, skipping modals, inventing missing slides, or turning interactions into static content.

## State type vocabulary

`base`, `modal`, `help-overlay`, `hover`, `selected`, `reveal`, `quiz-unanswered`, `quiz-selected`, `quiz-solution`, `correct-feedback`, `incorrect-feedback`, `result`, `summary-tab`, `completion`, `resource-view`, `pending`.

## Outer platform states

| State ID | Type | Description | Trigger | Next |
|---|---|---|---|---|
| `OP-DASH-01-base` | base | Dashboard/home page. | Initial entry | `OP-COURSE-01-overview` |
| `OP-COURSE-01-overview` | base | Course overview page. | Open course | `OP-COURSE-02-homepage` |
| `OP-COURSE-02-homepage` | base | Course homepage/module grid. | Continue learning | `OP-LAUNCH-INTRO-01-failure` |
| `OP-LAUNCH-INTRO-01-failure` | base | Introduction launch wrapper. | Click Introduction | `INT-START-base` |
| `OP-INTRO-01-completed` | base | Introduction completed platform state. | Exit Introduction | `OP-MOD1-01-overview` |
| `OP-MOD1-01-overview` | base | Module 1 overview page. | Next from Introduction | `OP-LAUNCH-MOD1-01-failure` |
| `OP-LAUNCH-MOD1-01-failure` | base | Module 1 launch wrapper. | Click Module 1 component | `M1-START-base` |
| `OP-MOD1-02-completed-pending` | pending | Post-Module-1 platform state unavailable. | Exit Module 1 | pending |

## Introduction module states

| State ID | Type | Slide | Description | Next |
|---|---|---:|---|---|
| `INT-START-base` | base | N/A | Introduction start screen | `INT-S01-base` |
| `INT-S01-base` | base | 1/6 | Welcome video | `INT-S02-base` |
| `INT-S01-help` | help-overlay | 1/6 | Help overlay | `INT-S01-base` |
| `INT-S02-base` | base | 2/6 | Course purpose | `INT-S03-base` |
| `INT-S03-base` | base | 3/6 | Learning outcomes | `INT-S04-base` |
| `INT-S04-base` | base | 4/6 | Audience cards | `INT-S05-reveal-initial` |
| `INT-S04-modal-audience-1` | modal | 4/6 | Audience modal 1 | `INT-S04-base` |
| `INT-S04-modal-audience-2` | modal | 4/6 | Audience modal 2 | `INT-S04-base` |
| `INT-S05-reveal-initial` | reveal | 5/6 | Course structure initial reveal | `INT-S05-reveal-partial` |
| `INT-S05-reveal-partial` | reveal | 5/6 | Course structure partial reveal | `INT-S05-reveal-full` |
| `INT-S05-reveal-full` | reveal | 5/6 | Course structure full reveal | `INT-S06-complete` |
| `INT-S05-modal-visit-modules-pending` | pending | 5/6 | Pending visit modules modal | `INT-S05-reveal-full` |
| `INT-S05-modal-finish-course-pending` | pending | 5/6 | Pending finish course modal | `INT-S05-reveal-full` |
| `INT-S06-complete` | completion | 6/6 | Introduction completion | `OP-INTRO-01-completed` |

## Module 1 states

| State ID | Type | Slide | Description | Next |
|---|---|---:|---|---|
| `M1-START-base` | base | N/A | Module 1 start screen | `M1-S01-base` |
| `M1-S01-base` | base | 1/26 | Welcome video | `M1-S02-base` |
| `M1-S01-help` | help-overlay | 1/26 | Help overlay | `M1-S01-base` |
| `M1-S02-base` | base | 2/26 | Learning outcomes | `M1-S03-base` |
| `M1-S03-base` | base | 3/26 | Vulnerability concept links | `M1-S04-base` |
| `M1-S03-modal-under18-pending` | pending | 3/26 | Pending link modal | `M1-S03-base` |
| `M1-S03-modal-special-care-pending` | pending | 3/26 | Pending link modal | `M1-S03-base` |
| `M1-S04-base` | base | 4/26 | Example cards | `M1-S05-base` |
| `M1-S04-card1-hover` | hover | 4/26 | Card 1 hover state | `M1-S04-card1-modal` |
| `M1-S04-card1-modal` | modal | 4/26 | Child poverty modal | `M1-S04-base` |
| `M1-S04-card2-modal-pending` | pending | 4/26 | Pending card modal | `M1-S04-base` |
| `M1-S04-card3-modal-pending` | pending | 4/26 | Pending card modal | `M1-S04-base` |
| `M1-S04-card4-modal-pending` | pending | 4/26 | Pending card modal | `M1-S04-base` |
| `M1-S04-card5-modal-pending` | pending | 4/26 | Pending card modal | `M1-S04-base` |
| `M1-S05-base` | base | 5/26 | What are Child Rights? | `M1-S06-base` |
| `M1-S05-modal-child-rights` | modal | 5/26 | Child rights modal | `M1-S05-base` |
| `M1-S05-modal-rights-for-pending` | pending | 5/26 | Pending rights-purpose modal | `M1-S05-base` |
| `M1-S06-base` | base | 6/26 | CRC overview | `M1-S07-reveal-initial` |
| `M1-S06-resource-basic-keys-pending` | pending | 6/26 | Pending CRC resource | `M1-S06-base` |
| `M1-S06-resource-ohchr-pending` | pending | 6/26 | Pending external resource | `M1-S06-base` |
| `M1-S07-reveal-initial` | reveal | 7/26 | Treaty timeline initial | `M1-S07-reveal-full` |
| `M1-S07-reveal-full` | reveal | 7/26 | Treaty timeline full | `M1-S08-unanswered` |
| `M1-S07-node3-selected` | selected | 7/26 | Node 3 selected | parent |
| `M1-S07-node1-pending` through `M1-S07-node8-pending` | pending | 7/26 | Pending node details except node 3 known sentence | parent |
| `M1-S07-modal-sdg` | modal | 7/26 | SDG modal | parent |
| `M1-S08-unanswered` | quiz-unanswered | 8/26 | EU obligations question | selected state |
| `M1-S08-selected-yes` | quiz-selected | 8/26 | Correct option selected | `M1-S08-correct-feedback` |
| `M1-S08-selected-no` | quiz-selected | 8/26 | Incorrect option selected | `M1-S08-incorrect-feedback` |
| `M1-S08-correct-feedback` | correct-feedback | 8/26 | Correct feedback | `M1-S09-base` |
| `M1-S08-incorrect-feedback` | incorrect-feedback | 8/26 | Incorrect feedback | `M1-S09-base` |
| `M1-S09-base` | base | 9/26 | EU Strategy | `M1-S10-base` |
| `M1-S09-modal-thematic-areas-pending` | pending | 9/26 | Pending thematic areas | `M1-S09-base` |
| `M1-S09-resource-europa-pending` | pending | 9/26 | Pending external resource | `M1-S09-base` |
| `M1-S10-base` | base | 10/26 | CRC GMIs | `M1-S11-pending` |
| `M1-S10-resource-crc-gmis` | resource-view | N/A | CRC_GMIs resource view | `M1-S10-base` |
| `M1-S11-pending` | pending | 11/26 | Missing slide | `M1-S12-base` |
| `M1-S12-base` | base | 12/26 | Purposes of analysis | `M1-S13-base` |
| `M1-S12-note1-pending` through `M1-S12-note6-pending` | pending | 12/26 | Pending note details | `M1-S12-base` |
| `M1-S13-base` | base | 13/26 | Steps of the CCA | `M1-S14-base` |
| `M1-S13-download-steps-pending`, `M1-S13-data-visualizations-pending`, `M1-S13-substep1-pending`, `M1-S13-substep2-pending`, `M1-S13-substep3-pending` | pending | 13/26 | Pending resource/substep states | `M1-S13-base` |
| `M1-S14-base` | base | 14/26 | Egyptian cotton case intro | `M1-S15-unanswered` |
| `M1-S14-case-modal` | modal | 14/26 | Case description modal | `M1-S14-base` |
| `M1-S15-unanswered` | quiz-unanswered | 15/26 | Case question | selected states |
| `M1-S15-selected-option1` through `M1-S15-selected-option5` | quiz-selected | 15/26 | Selected case options | solution/feedback |
| `M1-S15-solution` | quiz-solution | 15/26 | Case solution state | `M1-S15-correct-feedback` |
| `M1-S15-correct-feedback` | correct-feedback | 15/26 | Correct case feedback | `M1-S16-pending` |
| `M1-S15-case-modal` | modal | 15/26 | Case description modal | parent |
| `M1-S16-pending` | pending | 16/26 | Missing slide | `M1-S17-pending` |
| `M1-S17-pending` | pending | 17/26 | Missing slide | `M1-S18-base` |
| `M1-S18-base` | base | 18/26 | Case summary | `M1-S19-base` |
| `M1-S18-case-modal` | modal | 18/26 | Case description modal | `M1-S18-base` |
| `M1-S18-national-action-plan-pending` | pending | 18/26 | Pending resource | `M1-S18-base` |
| `M1-S19-base` | base | 19/26 | Module quiz intro | `M1-S20-unanswered` |
| `M1-S20-unanswered` | quiz-unanswered | 20/26 | Quiz Question 1 | selected states |
| `M1-S20-selected-option1` through `M1-S20-selected-option5` | quiz-selected | 20/26 | Selected quiz option | `M1-S21-pending` |
| `M1-S21-pending` | pending | 21/26 | Quiz Question 2 missing | `M1-S22-pending` |
| `M1-S22-pending` | pending | 22/26 | Quiz Question 3 missing | `M1-S23-pending` |
| `M1-S23-pending` | pending | 23/26 | Quiz Question 4 missing | `M1-S24-result-75` |
| `M1-S24-result-75` | result | 24/26 | Quiz score 75% | `M1-S25-summary-child-rights` |
| `M1-S24-back-to-start` | selected | 24/26 | Quiz restart action | `M1-S20-unanswered` |
| `M1-S24-review-pending` | pending | 24/26 | Pending review state | `M1-S24-result-75` |
| `M1-S25-summary-child-rights` | summary-tab | 25/26 | Summary active tab | `M1-S26-complete` |
| `M1-S25-summary-child-discrimination-pending` | pending | 25/26 | Pending tab | parent |
| `M1-S25-summary-cca-pending` | pending | 25/26 | Pending tab | parent |
| `M1-S26-complete` | completion | 26/26 | Module 1 completion | `OP-MOD1-02-completed-pending` |

## Global states

- `GLOBAL-captions-off`, `GLOBAL-captions-on`
- `GLOBAL-audio-muted`, `GLOBAL-audio-on`
- `GLOBAL-reload-current`
- `GLOBAL-glossary-pending`
- `GLOBAL-resources-pending`
