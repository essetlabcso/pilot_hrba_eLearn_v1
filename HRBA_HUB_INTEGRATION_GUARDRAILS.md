# HRBA–Hub Integration Guardrails

Date: 2026-07-25

## Baseline status and rollback

This branch was prepared locally from HRBA candidate
`7f6bad961b3d94c4ded5fa9ad1f066a73a6dfae3`. It must not be represented as
the deployed or accepted production baseline until Draft PR #4 receives
independent acceptance.

The verified production deployment remains:

- Pilot URL: `https://pilot-hrba-e-learn-v1-wajj.vercel.app`
- Vercel deployment: `dpl_4UTTSsAsyn2dAct8qJsTxQ71oTvG`
- Deployed release commit: `22f9448736f126a5eb7cbed111606daae4b25a71`
- Production assets: `index-Y6mcjyQx.js` and `index-BPTLMz6V.css`
- Production rollback point: `22f9448736f126a5eb7cbed111606daae4b25a71`
- Previous safe release if an authorized rollback beyond the current
  production build is required:
  `15df88c0b849ad2921a049508dad5b0db0f73fcf`

The current remote release branch is
`release/hrba-pilot-final` at
`859c1a339eab65788271bd39b4b61bb0b0026b25`. Draft PR #4 adds
`9190ecd`, `9d4ea72`, and `7f6bad9` on top of that release commit. The PR is
open, Draft, mergeable, and not approved.

## Frozen integration contract

The authoritative Hub-side contract reviewed for this inventory is Hub commit
`39dfa68866a9fad81ff6f89c20b2420b8928fc07` in
`essetlab/pilot_dec_cso`. That commit is in open Draft Hub PR #2
(`feature/pilot-registration-integration-checkpoint` → `main`), not in Hub
`main`; the PR head is one unrelated invitation-management commit ahead.

| Contract item | Frozen value or interface | HRBA authority |
| --- | --- | --- |
| Public course slug | `applying-human-rights-based-approach-in-cso-practice` | `src/integration/portalLearnerState.ts`, `src/integration/portalContext.ts` |
| Hub course ID | `COURSE-HRBA-EXTERNAL-VITE-V1` | Hub `src/lib/external-course-config.ts` |
| Hub course version ID | `PCV-HRBA-EXTERNAL-VITE-V1` | Hub `src/lib/external-course-config.ts` |
| Hub module / lesson | `MOD-HRBA-EXTERNAL-VITE`, `LES-HRBA-EXTERNAL-VITE` | Hub `src/lib/external-course-config.ts` |
| Hub completion quiz / question | `QUIZ-HRBA-EXTERNAL-COMPLETION`, `QQ-HRBA-EXTERNAL-COMPLETION` | Hub `src/lib/external-course-config.ts` |
| Hub learner launch route | `/learn/courses/applying-human-rights-based-approach-in-cso-practice/external` | Hub external-course workflow |
| HRBA launch URL | `https://pilot-hrba-e-learn-v1-wajj.vercel.app` | Hub external-course config |
| Launch query keys | `embed=portal`, exact `portalOrigin`, `courseSlug`, opaque `launchToken` | `src/integration/portalContext.ts` |
| Ready/error envelope | `cso-learning-hub:external-course-event`, version `1`; events `course_ready`, `integration_error` | `src/integration/hubProgress.ts` |
| Launch-context handshake | `cso-learning-hub:external-course-launch-context`, version `1`, course slug, 43-character `learnerStateKey` | `src/integration/portalLearnerState.ts`, `src/App.tsx` |
| Progress envelope | `cso-learning-hub:external-course-event`, version `1` | `src/integration/hubProgress.ts` |
| Governed events | `progress_updated`, `module_completed`, `assessment_completed`, `course_completed` | `src/integration/hubProgress.ts` |
| Hub callback route | `/api/external-course-progress` | Hub API and external-course frame |
| Allowed target origin | Exact validated `portalOrigin`; never `"*"` | `src/integration/portalContext.ts`, `src/integration/hubProgress.ts` |
| Learner state key | Exactly 32 random bytes encoded as 43-character unpadded base64url | `src/integration/portalLearnerState.ts` |
| Portal storage namespace | `hrba-course-progress-v1:portal:sha256:<sha256(learnerStateKey)>` | `src/integration/portalLearnerState.ts` |
| Standalone storage namespace | `hrba-course-progress-v1` | `src/state/learningState.ts` |
| Assessment evidence | Stable UUID v4 or 43-character unpadded base64url `evidenceId`, original ISO `submittedAt`, positive attempt number | `src/data/finalAssessment.ts`, `src/integration/hubProgress.ts` |
| Pass threshold | `80` percent | `src/data/finalAssessment.ts`; matching Hub quiz threshold |
| Certificate authority | Hub only; HRBA sends validated passed assessment and course-completion evidence | Hub certificate workflow |
| Certificate retrieval | Hub Certificates page and `/learn/certificates/[certificateCode]/download` | Hub application |

Raw `userId`, `learnerId`, `participantId`, `enrollmentId`,
`organizationId`, `orgId`, or `courseVersionId` values must never be put in
the HRBA URL, browser namespace, or callback at any nesting level.
`launchToken` is authorization material and must remain URL/Hub-frame data; it
must not be copied into HRBA progress events or persisted course state.

Portal mode must wait for a valid exact-origin, parent-window launch-context
message before reading learner state or sending progress. Standalone state
must never seed portal state. The Hub remains authoritative for enrollment,
attempt, completion, and certificate records.

## Environment and deployment boundaries

The Hub integration depends on:

- `NEXT_PUBLIC_APP_URL` for the exact Hub `portalOrigin`;
- `HRBA_EXTERNAL_COURSE_URL` for a reviewed non-default HRBA launch URL;
- `HRBA_EXTERNAL_COURSE_ALLOWED_ORIGINS` for additional reviewed exact
  origins.

The HRBA app currently has no required `VITE_*` Hub contract variable; the
contract arrives through the validated launch URL and postMessage handshake.
Do not commit `.env.local` or any token/secret.

No feature-branch push, preview, or merge may promote or alias the production
`wajj` URL. QA must use an immutable isolated Preview URL. The live production
alias changes only through an explicitly authorized, reviewed Vercel
production deployment.

## Safe and coordinated changes

Safe without a Hub change, subject to regression testing:

- learner-facing wording, media, layout, and styling inside existing screens;
- accessibility and responsive improvements that retain routes, identifiers,
  completion gates, and event timing;
- additive optional content that does not change saved-state meaning;
- new internal code behind the same public contract.

Requires an explicit compatibility plan and usually coordinated Hub testing:

- changing a module, screen, interaction, assessment-question, state-field, or
  downloaded-output identifier;
- changing completion rules, pass threshold, assessment evidence, event
  timing, progress calculation, or current module/screen semantics;
- changing the storage schema/version, namespace, migration aliases, launch
  validation, or route preservation;
- adding fields to any Hub message.

Requires coordinated Hub-side code/data/deployment:

- changing the course slug, Hub course/version/module/lesson/quiz IDs;
- changing the stable URL, Hub learner route, callback API, message type,
  version, allowed origin, token rules, or learner-state-key format;
- changing certificate eligibility, creation, retrieval, or verification;
- changing Hub environment variables, database migrations, Supabase, account,
  enrollment, or administrator behavior.

The Hub learner-isolation contract is itself still a Draft PR contract.
Selecting HRBA `7f6bad9` therefore requires coordinated acceptance of both
repositories, not only an HRBA branch decision.

## Progress compatibility and rollback procedure

All edits must preserve existing identifiers and hydrate existing
`hrba-course-progress-v1` records additively. A schema change requires a
versioned migration that retains completed modules, screen progress,
assessment evidence, and Module 5 legacy aliases. Never clear storage as a
migration strategy.

Required workflow:

`Feature branch → local validation → isolated HRBA QA Preview → Hub-based learner testing → full completion and certificate test → review → merge to release branch → controlled deployment → post-deployment smoke test`

If QA fails, remove or abandon only the isolated Preview and return the
feature branch to the reviewed commit. If a production rollback is authorized,
restore the immutable deployment for
`22f9448736f126a5eb7cbed111606daae4b25a71` to the production alias, smoke
test `/`, Modules 1–5, Final Assessment, authenticated launch, resume,
completion, and certificate retrieval, and retain Hub additive database
columns. For the learner-isolation contract, roll back HRBA first, then the
Hub application; database cleanup is a separate later change.
