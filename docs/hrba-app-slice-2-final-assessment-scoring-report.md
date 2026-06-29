# HRBA App Slice 2 Final Assessment Scoring Report

Date: 2026-06-29

## Summary verdict

Slice 2 is implemented in the HRBA external course app only. The app now has a real local final assessment with 10 objective HRBA judgment questions, local scoring, an 80% pass rule, pass/fail feedback, retake behavior, and local completion only after a passing result.

The CSO Learning Hub callback remains intentionally unchanged. The HRBA app does not send final completion, assessment score, pass status, attempt metadata, or certificate payloads to the Hub in this slice.

## Scope boundary observed

- Modified only the HRBA app repository: `D:\eLearn_CDP_Lg`.
- Did not modify the Hub repository: `D:\z CDP-Lg-Andy-main-main`.
- Did not change environment files.
- Did not add certificate generation or PDF behavior.
- Did not send `completed: true` to the Hub.
- Did not add assessment result fields to the Hub progress payload.

## Final assessment design

The final assessment is now a 10-question objective assessment covering practical HRBA judgment:

- HRBA purpose and the shift from activity delivery to rights-holder voice and accountability.
- Rights-holder, duty-bearer, and CSO support role clarity.
- Meaningful participation.
- Inclusion and non-discrimination.
- Accountability and feedback response.
- Power and exclusion barriers.
- Safe evidence and do-no-harm.
- Project design repair.
- Responsible implementation adaptation.
- HRBA MEAL and honest reporting.

The assessment is defined in `src/data/finalAssessment.ts`.

## Scoring model

The app calculates:

- `score`
- `maxScore`
- `percentage`
- `passed`
- `submittedAt`
- `attemptNumber`

The pass threshold is exported as `FINAL_ASSESSMENT_PASS_THRESHOLD = 80`. With 10 questions, 8 correct answers equals a passing score.

## Pass and fail behavior

Passing result:

- Marks `final_assessment` complete locally in `completedModules`.
- Adds `FINAL-ASSESSMENT-COMPLETE` to local final assessment screen progress.
- Shows the required pass message that the Hub will issue the certificate after the later integration step.

Failing result:

- Does not mark `final_assessment` complete.
- Removes any stale local final assessment completion state.
- Shows the required fail message: "You have not reached the 80% pass mark yet. Review the suggested areas and try again."
- Shows suggested review areas based on missed question topics.
- Allows retake, clearing answers and result while preserving attempt numbering for the next submission.

## Local state storage

Final assessment state was added to `LearningState`:

- `finalAssessmentAnswers`
- `finalAssessmentResult`
- `finalAssessmentAttemptNumber`

This state is persisted through the existing browser localStorage mechanism.

## Routing and player integration

The final assessment now has a real three-screen player flow:

- `/final-assessment/cover`
- `/final-assessment/questions`
- `/final-assessment/result`

The player header and route sync now understand final assessment screens. The Next button is disabled on the question screen until an assessment result exists, preventing learners from bypassing submission through normal player navigation.

## Hub callback boundary

The Hub progress integration remains partial-progress only:

- `src/integration/hubProgress.ts` still defines `HubProgressPayload.completed` as `false`.
- `sendHubProgressMessage()` still hardcodes `completed: false`.
- `progressPercent` is still clamped to a maximum of 90.
- No score, max score, percentage, pass/fail, attempt number, or submitted timestamp is included in the Hub message.
- `App.tsx` still calls `sendHubProgressMessage()` with only partial progress fields.

This preserves the intended Slice 2 boundary: the assessment exists locally, but final Hub completion and certificate-triggering callback are not implemented yet.

## Certificate behavior

The HRBA app does not generate certificates.

Learner-facing copy states that certificates are issued by the CSO Learning Hub after the result callback integration is connected. The final assessment pass screen also states that the result will be shared with the Hub in a later platform integration step so the certificate can be issued from the Hub.

## Files changed

- `src/data/finalAssessment.ts`
- `src/components/course/FinalAssessmentRenderer.tsx`
- `src/components/course/finalAssessment.css`
- `src/state/learningState.ts`
- `src/App.tsx`
- `src/components/player/CoursePlayerShell.tsx`
- `src/components/course/ScreenRenderer.tsx`
- `src/data/hrbaCourseModules.ts`
- `src/components/platform/PlatformShell.tsx`

## Verification

Commands run:

- `npm run lint`
- `npm run build`
- `rg -n "postMessage|external-course-progress|completed:\s*false|completed:\s*true|score|maxScore|percentage|passed|attemptNumber|submittedAt" src\integration src\App.tsx`
- `rg -n '"test"|vitest|jest|playwright|cypress' package.json src docs`

Results:

- Lint passed with 0 errors and 5 existing warnings in unrelated files.
- Build passed.
- Hub integration evidence showed `completed: false` remains in the Hub payload path and no assessment score payload was added to `src/integration`.
- No test script or test runner reference was found in the repository.

## Known remaining work for later slices

- Add the secure Hub final completion callback.
- Send score, max score, percentage, pass/fail, submitted timestamp, attempt number, learner/enrollment/course identifiers, and token-backed authentication to the Hub.
- Let the Hub generate and verify the certificate after accepting a passing final assessment callback.
- Add any server-side or Hub-side replay protection, token validation, and idempotency handling required by the main platform.

## Final verdict

Partially integrated.

The HRBA app now has the local final assessment and scoring needed before Hub completion integration. It is not yet fully integrated with the CSO Learning Hub for final completion, final score callback, or certificate issuance.
