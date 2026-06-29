# HRBA External Course Callback Audit Report

## 1. Summary verdict

The HRBA external course app is **not integrated yet** with the CSO Learning Hub progress/completion callback flow.

The Hub already has an external-course launch and callback architecture: it builds an iframe URL with learner/enrollment/course context, listens for a `cso-learning-hub:external-course-progress` `postMessage`, posts that to `/api/external-course-progress`, updates enrollment/lesson progress, and issues Hub certificates on completion. The HRBA app does not currently receive or persist that launch context, does not send `postMessage` progress events, does not call the Hub API, and does not implement a real final assessment score.

## 2. Does the HRBA app receive launch context from the Hub?

**No.**

The HRBA app reads `window.location.search` only in `src/App.tsx` for route/testing-style parameters:

- `screenId`
- `moduleId`
- localhost-only `completed`
- Module 2 QA state parameters such as `m2MatchingCompleted`, `m2SortingCompleted`, and `m2QuizCompleted`

No HRBA source handling was found for Hub launch parameters such as:

- `embed=portal`
- `portalOrigin`
- `courseSlug`
- `userId` or `learnerId`
- `enrollmentId`
- `courseVersionId`
- `callbackUrl`
- `token`
- `returnUrl`

Hub evidence from `D:\z CDP-Lg-Andy-main-main`: `src/lib/external-course-workflow.ts` sets `embed=portal`, `portalOrigin`, `courseSlug`, `userId`, `enrollmentId`, and `courseVersionId` on the iframe URL.

## 3. Does it track course completion?

**Partially, locally only.**

The HRBA app tracks progress and completed modules in local browser state:

- `src/state/learningState.ts` defines `completedModules` and `screenProgress`.
- The local storage key is `hrba-course-progress-v1`.
- `src/components/player/CoursePlayerShell.tsx` records screen progress while navigating.
- `src/App.tsx` marks modules complete when their module completion screen has been reached.
- `src/data/hrbaCourseModules.ts` defines completion screen IDs for Modules 1-5 and `final_assessment`.

This progress is not reported to the Hub.

## 4. Does it track final assessment score?

**No real final assessment score is implemented.**

The `final_assessment` course item exists in `src/data/hrbaCourseModules.ts`, but it has `contentAvailable: false` and the description says final assessment implementation remains separate. `src/components/course/ScreenRenderer.tsx` treats `FINAL-ASSESSMENT-*` screens as future/placeholder content and returns learners to the course page instead of running scored assessment logic.

There are formative/module scores elsewhere, for example Module 1, Module 3, and Module 4 knowledge checks, but these are not the final assessment score and are not sent to the Hub.

## 5. Does it apply or expose the 80% pass rule?

**Only in learner-facing copy; not as functional final-assessment logic.**

Evidence found:

- `src/components/course/Module1Renderer.tsx` includes copy reminding learners that the certificate is based on the final course test with a score of 80% or above.
- `src/data/hrbaCourseModules.ts` leaves final assessment content unavailable.
- No final assessment pass/fail calculation or 80% threshold enforcement was found in HRBA source.

Hub-side evidence: `D:\z CDP-Lg-Andy-main-main\src/lib/external-course-workflow.ts` registers the external HRBA course with `defaultPassThreshold: 80` and a final completion quiz with `passThreshold: 80`, but the current Hub implementation treats a validated completion message as a 100% passed completion quiz.

## 6. Does it send progress/completion back to the Hub?

**No.**

No HRBA source references were found for:

- `window.parent.postMessage`
- `postMessage`
- `fetch("/api/external-course-progress")`
- `external-course-progress`
- `navigator.sendBeacon`
- callback URL POST behavior

The only source match for `URLSearchParams` is `src/App.tsx`, and it is used for local route/QA state handling.

Hub-side expected message type exists in `D:\z CDP-Lg-Andy-main-main\src/lib/external-course-types.ts`:

- `EXTERNAL_COURSE_PROGRESS_MESSAGE = "cso-learning-hub:external-course-progress"`

Hub-side listener exists in `D:\z CDP-Lg-Andy-main-main\src/components/learner/ExternalCourseFrame.tsx`; it validates message origin, course slug, and user ID, then POSTs to `/api/external-course-progress`.

## 7. Does it include secure callback/token handling?

**No HRBA-side secure callback handling exists yet.**

The HRBA app does not currently parse or validate Hub context, origin, token, callback URL, or portal mode.

Important Hub-side security behavior already exists:

- `ExternalCourseFrame.tsx` accepts messages only from `launchData.allowedOrigin`.
- It requires matching `courseSlug` and `userId`.
- `/api/external-course-progress` requires the current Hub session.
- `recordExternalCourseProgress` rejects mismatched session/user, invalid iframe origin, missing enrollment, and missing course metadata.

The HRBA app should therefore prefer Hub `postMessage` integration over direct unauthenticated cross-origin POSTs.

## 8. Does it tell learners certificates are issued by the Hub?

**Not clearly enough.**

The HRBA app references final assessment and certificate rules in content, including the 80% certificate rule, but no clear evidence was found that completion/certificate issuance is delegated to the CSO Learning Hub portal.

The Hub learner frame does say progress and certificate update automatically when the course completion signal is received, and Hub certificate pages/verification exist in the main platform. The HRBA app should align learner-facing completion copy so it does not imply that the course app itself generates the final certificate.

## 9. Files and code evidence found

HRBA app:

- `src/App.tsx`
  - Reads `window.location.search`.
  - Handles `screenId`, `moduleId`, and localhost-only `completed`.
  - Defines `/final-assessment` and `/final-assessment/cover` routes.
  - Saves state to local storage through `saveLearningState`.
- `src/state/learningState.ts`
  - Defines `completedModules`, `screenProgress`, quiz/module state, and storage key `hrba-course-progress-v1`.
  - Validates completion dependency order locally.
- `src/data/hrbaCourseModules.ts`
  - Defines Modules 1-5 plus `final_assessment`.
  - `final_assessment` has `contentAvailable: false`.
  - Completion ID is `FINAL-ASSESSMENT-COMPLETE`, but no real final assessment implementation was found.
- `src/components/player/CoursePlayerShell.tsx`
  - Records local screen progress.
  - Marks Module 5 complete when navigating to `M5-PLAYER-COMPLETE`.
  - No `postMessage` or callback behavior.
- `src/components/course/ScreenRenderer.tsx`
  - Renders final assessment screens as future placeholder content.
- `package.json` and `vite.config.ts`
  - No callback/integration scripts or env handling.
- HRBA repo env/config
  - No `.env.example` or Vercel config file found in the HRBA repo scan.

Hub platform:

- `src/lib/external-course-config.ts`
  - Defines HRBA external course URL and allowed origins from `HRBA_EXTERNAL_COURSE_URL` and `HRBA_EXTERNAL_COURSE_ALLOWED_ORIGINS`.
- `src/lib/external-course-types.ts`
  - Defines `cso-learning-hub:external-course-progress` message shape.
- `src/lib/external-course-workflow.ts`
  - Builds iframe launch URL with portal context.
  - Records external-course progress.
  - Issues Hub certificate after completion.
- `src/components/learner/ExternalCourseFrame.tsx`
  - Listens for validated `postMessage` progress/completion messages from the HRBA iframe.
  - Posts valid messages to `/api/external-course-progress`.
- `src/app/api/external-course-progress/route.ts`
  - Receives Hub-authenticated progress POSTs.

Prior HRBA docs already noted the same risk:

- `docs/qa/batch-0-technical-verification.md` says final assessment scoring/pass/fail/retake/certificate behavior is not implemented and no reporting/LMS behavior was found.
- `docs/planning/hrba-replan/06-revised-batch-roadmap.md` keeps final assessment/certificate/reporting as a future Batch 7.
- `docs/planning/hrba-replan/04-input-readiness-register.md` says final assessment/certificate rules still need pass threshold, scoring, retake, completion, certificate, and reporting requirements.

## 10. Missing pieces

- HRBA-side launch context parser for Hub iframe mode.
- HRBA-side storage of `portalOrigin`, `courseSlug`, `userId`, `enrollmentId`, and `courseVersionId`.
- HRBA-side progress message sender using `window.parent.postMessage`.
- Progress percentage mapping from HRBA module/screen completion to the Hub message shape.
- Completion signal when final assessment is passed.
- Actual final assessment implementation.
- Final assessment score calculation.
- 80% pass threshold enforcement in HRBA assessment logic, unless the architecture intentionally changes so the Hub alone evaluates the score.
- Retake/attempt rules.
- Learner-facing completion copy that says the Hub issues certificates.
- HRBA env/config documentation for portal integration expectations, if any runtime config is needed.

## 11. Recommended implementation approach

Do not have the HRBA app generate final certificates.

Recommended integration path:

1. Add a small HRBA launch-context module that reads Hub iframe params:
   - `embed`
   - `portalOrigin`
   - `courseSlug`
   - `userId`
   - `enrollmentId`
   - `courseVersionId`
2. Treat callback mode as active only when `embed=portal` and the required context is present.
3. Compute course progress from local HRBA completion state:
   - completed modules / five modules for partial progress;
   - 100% only after final assessment is passed, if final assessment is implemented in HRBA.
4. Send progress to the parent Hub frame with:
   - `type: "cso-learning-hub:external-course-progress"`
   - `version: 1`
   - `courseSlug`
   - `userId`
   - `enrollmentId`
   - `courseVersionId`
   - `progressPercent`
   - `completed`
   - `completedModuleIds`
   - `currentModuleId`
   - `currentScreenId`
   - `sentAt`
5. Use `window.parent.postMessage(message, portalOrigin)`.
6. Send partial progress on meaningful module/screen completion milestones, not on every render.
7. Send final completion only once after the final assessment result meets the 80% threshold.
8. Update HRBA final/completion copy to say the CSO Learning Hub records completion and issues/verifies certificates.

One architecture decision is still needed: the current Hub callback schema does not accept a raw final assessment score from the HRBA app. If the expected architecture requires the HRBA app to send the actual final score, the Hub `ExternalCourseProgressMessage`, API route, and `recordExternalCourseProgress` workflow need to be extended to accept and store `score`, `maxScore`, `percentage`, `passed`, and attempt metadata instead of always creating a 100% completion quiz attempt.

## 12. Final verdict

**Not integrated yet.**

The Hub is ready to receive validated external-course completion messages and issue certificates, but the HRBA app currently does not send completion or final assessment score back to the Hub. It only tracks local browser progress and exposes placeholder final assessment/certificate behavior.
