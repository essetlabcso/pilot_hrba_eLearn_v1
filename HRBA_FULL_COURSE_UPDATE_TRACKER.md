# HRBA Full Course Update Tracker

Date opened: 2026-07-25

Branch: `feature/hrba-full-course-update-20260725`

Accepted parent: `7f6bad961b3d94c4ded5fa9ad1f066a73a6dfae3`

Baseline gate: passed on 2026-07-25 against Hub contract `39dfa688`. Module 4
or Module 5 content updates may begin on this branch while preserving the
frozen integration and identifier contracts. Production promotion, Draft PR
merge, and release approval remain separate gates. Verified production
rollback remains `22f9448736f126a5eb7cbed111606daae4b25a71`.

Do not invent planned content. Populate “Planned change” and “Affected files”
only from later approved instructions.

| Module or workstream | Planned change | Affected files | Risk level | Progress compatibility impact | Hub contract impact | Testing required | Status | Commit reference |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Technical baseline acceptance | Confirm the exact accepted update parent and matched Hub contract | `HRBA_COORDINATED_BASELINE_ACCEPTANCE_20260725.md` | Critical | Frozen at the accepted parent | Critical | Matched Preview, two learners/one browser, assessment, completion, certificate, admin monitoring | Complete — coordinated baseline accepted | HRBA `7f6bad9`; Hub `39dfa688` |
| Module 1 update work | Awaiting approved instructions | TBD | TBD | Must preserve Module 1 IDs/state/completion | None unless contract behavior changes | Unit, retained-state, route, keyboard, responsive, Hub progress regression | Not started | — |
| Module 2 update work | Awaiting approved instructions | TBD | TBD | Must preserve Module 2 IDs/portfolio/completion | None unless contract behavior changes | Unit, retained-state, route, keyboard, responsive, Hub progress regression | Not started | — |
| Module 3 update work | Awaiting approved instructions | TBD | TBD | Must preserve `M3-R*` state and downloads | None unless contract behavior changes | Unit, retained outputs, downloads, route, responsive, Hub progress regression | Not started | — |
| Module 4 update work | Batch 0 architecture: typed enhanced state, additive migration, provenance/dependency review, gated progress helper, scoped accessibility foundation, normalized asset manifest, behavioral fixtures/tests, and Screens 14–15 proposal; no learner-facing replacement | `src/data/module4/*`; `src/components/course/module4/*`; `public/assets/hrba/modules/module-4-enhanced/*`; `src/state/learningState.ts`; `tests/module4-batch0.test.mjs`; Module 4 fixtures; Batch 0 architecture/proposal documents | High | Historical completion preserved; no legacy answer becomes enhanced completion; synthetic-only reset is explicit | None; frozen launch, progress, completion, assessment, and certificate contracts are behaviorally protected | Build, lint, full tests, migration fixtures, route/ID contract, dependency invalidation, asset and accessibility audits | Batch 0 complete — awaiting review; active Module 4 unchanged | Batch 0 handoff commit |
| Module 5 update work | Awaiting approved instructions | TBD | TBD | Must preserve canonical and legacy migration IDs | None unless contract behavior changes | Migration fixtures, retained completion, routes, outputs, responsive, Hub progress regression | Not started | — |
| Final assessment review | Awaiting approved instructions | TBD | High | Must preserve question/evidence/attempt semantics | High | Prerequisite, scoring, retake, refresh, idempotent callback, completion/certificate | Not started | — |
| Shared shell and UI/UX improvements | Awaiting approved instructions | TBD | Medium/High | Must not change route or completion timing | Medium if launch/return behavior changes | Cross-module navigation, modal/focus, progress, portal refresh | Not started | — |
| Accessibility review | Awaiting approved instructions | TBD | Medium | No identifier change expected | None expected | Keyboard, focus, screen reader semantics, 200% zoom, contrast, reduced motion | Not started | — |
| Mobile responsiveness | Awaiting approved instructions | TBD | Medium | No identifier change expected | None expected | 320 px, 390 px, landscape, long text/output reflow | Not started | — |
| End-to-end Hub integration testing | Validate matched isolated HRBA and Hub Previews | `HRBA_COORDINATED_BASELINE_ACCEPTANCE_20260725.md` | Critical | Proved isolated state and retained progress | Critical | Two learners/one browser, sign-out, relaunch, refresh, callback rejection/acceptance | Complete for accepted baseline | HRBA `7f6bad9`; Hub `39dfa688` |
| Certificate verification | Validate one passed attempt creates/returns one Hub certificate | `HRBA_COORDINATED_BASELINE_ACCEPTANCE_20260725.md` | Critical | Immutable passed evidence recorded | Critical | Pass/fail, retry, duplicate/concurrent callback, download, public verification | Complete for accepted baseline | HRBA `7f6bad9`; Hub `39dfa688` |
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
