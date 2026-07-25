# HRBA Full Course Update Tracker

Date opened: 2026-07-25

Branch: `feature/hrba-full-course-update-20260725`

Provisional parent: `7f6bad961b3d94c4ded5fa9ad1f066a73a6dfae3`

Release gate: this local branch must not be pushed or used for content editing
until Draft PR #4 head `7f6bad9` is independently accepted as the intended
baseline, or an authorized different baseline is selected. Verified
production rollback remains
`22f9448736f126a5eb7cbed111606daae4b25a71`.

Do not invent planned content. Populate “Planned change” and “Affected files”
only from later approved instructions.

| Module or workstream | Planned change | Affected files | Risk level | Progress compatibility impact | Hub contract impact | Testing required | Status | Commit reference |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Technical baseline acceptance | Confirm the exact accepted update parent and matched Hub contract | N/A | Critical | Determines migration/rollback baseline | Critical | Independent PR review; matched Preview integration | Blocked — production/candidate split | `22f9448` production; `7f6bad9` candidate |
| Module 1 update work | Awaiting approved instructions | TBD | TBD | Must preserve Module 1 IDs/state/completion | None unless contract behavior changes | Unit, retained-state, route, keyboard, responsive, Hub progress regression | Not started | — |
| Module 2 update work | Awaiting approved instructions | TBD | TBD | Must preserve Module 2 IDs/portfolio/completion | None unless contract behavior changes | Unit, retained-state, route, keyboard, responsive, Hub progress regression | Not started | — |
| Module 3 update work | Awaiting approved instructions | TBD | TBD | Must preserve `M3-R*` state and downloads | None unless contract behavior changes | Unit, retained outputs, downloads, route, responsive, Hub progress regression | Not started | — |
| Module 4 update work | Awaiting approved instructions | TBD | TBD | Must preserve `M4-S1-*` state/completion | None unless contract behavior changes | Unit, retained-state, route, keyboard, responsive, Hub progress regression | Not started | — |
| Module 5 update work | Awaiting approved instructions | TBD | TBD | Must preserve canonical and legacy migration IDs | None unless contract behavior changes | Migration fixtures, retained completion, routes, outputs, responsive, Hub progress regression | Not started | — |
| Final assessment review | Awaiting approved instructions | TBD | High | Must preserve question/evidence/attempt semantics | High | Prerequisite, scoring, retake, refresh, idempotent callback, completion/certificate | Not started | — |
| Shared shell and UI/UX improvements | Awaiting approved instructions | TBD | Medium/High | Must not change route or completion timing | Medium if launch/return behavior changes | Cross-module navigation, modal/focus, progress, portal refresh | Not started | — |
| Accessibility review | Awaiting approved instructions | TBD | Medium | No identifier change expected | None expected | Keyboard, focus, screen reader semantics, 200% zoom, contrast, reduced motion | Not started | — |
| Mobile responsiveness | Awaiting approved instructions | TBD | Medium | No identifier change expected | None expected | 320 px, 390 px, landscape, long text/output reflow | Not started | — |
| End-to-end Hub integration testing | Validate matched isolated HRBA and Hub Previews | Test/evidence only | Critical | Must prove learner isolation and retained progress | Critical | Two learners/one browser, sign-out, relaunch, refresh, callback rejection/acceptance | Not started | — |
| Certificate verification | Validate one passed attempt creates/returns one Hub certificate | Test/evidence only | Critical | Depends on immutable attempt evidence | Critical | Pass/fail, retry, duplicate/concurrent callback, download, public verification | Not started | — |
| Controlled release and deployment | Follow the frozen workflow; no automatic production alias change | TBD | Critical | Rollback must retain learner records | Critical | Full regression, approval, immutable build identity, post-deploy smoke | Not started | — |

## Definition of done for every implementation row

- Approved scope and affected files recorded before editing.
- Existing IDs retained or an explicit migration/compatibility plan approved.
- Local build, lint, automated tests, and scoped browser checks pass.
- Retained-progress fixture passes for changed state.
- No raw learner or Hub database identifier is introduced.
- Isolated Preview is identified by immutable commit/deployment.
- Required Hub and certificate checks pass where impact is not “None.”
- Reviewer decision, final commit, and evidence link are recorded.
- Production deployment and post-deployment smoke are separate authorized
  steps.
