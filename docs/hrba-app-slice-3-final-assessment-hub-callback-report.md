# HRBA App Slice 3 Final Assessment Hub Callback Report

Date: 2026-06-29

## 1. Summary of changes

Implemented HRBA App Slice 3: final assessment results are now sent to the CSO Learning Hub parent frame through the existing `postMessage` integration when the HRBA app is running in Hub portal mode.

The HRBA app still does not call the Hub API directly, create certificates, generate PDFs, or create any backend. The Hub parent frame remains responsible for receiving the browser message and persisting it through the Hub API.

## 2. Files changed

- `src/integration/hubProgress.ts`
- `src/App.tsx`
- `src/components/course/FinalAssessmentRenderer.tsx`
- `src/components/platform/PlatformShell.tsx`
- `src/components/player/CoursePlayerShell.tsx`
- `docs/hrba-app-slice-3-final-assessment-hub-callback-report.md`

## 3. Final assessment callback behavior

The progress message sender now supports an optional `assessment` object with the Hub contract field names:

- `score`
- `maxScore`
- `percentage`
- `passed`
- `attemptNumber`
- `submittedAt`

`App.tsx` watches for `state.finalAssessmentResult` and sends a final assessment message only when:

- portal mode is active;
- a final assessment result exists;
- that attempt has not already been reported during the current runtime session.

Standalone mode does not send this message because `portalContext` is `null`.

## 4. Passing result message shape

Passing final assessment attempts send:

```ts
{
  type: "cso-learning-hub:external-course-progress",
  version: 1,
  progressPercent: 100,
  completed: true,
  completedModuleIds: [
    "module_01_hrba_foundations",
    "module_02_everyday_cso_work",
    "module_03_project_design",
    "module_04_implementation",
    "module_05_hrba_meal",
    "final_assessment"
  ],
  currentModuleId: "final_assessment",
  currentScreenId: "FINAL-ASSESSMENT-COMPLETE",
  assessment: {
    score,
    maxScore,
    percentage,
    passed: true,
    attemptNumber,
    submittedAt
  }
}
```

The Hub contract verifier confirms that a `completed: true` message with a passing assessment records a passed attempt and issues a certificate.

## 5. Failing result message shape

Failing final assessment attempts send the same assessment object with `passed: false`, but use:

```ts
{
  completed: false,
  progressPercent: currentPartialProgressPercent,
  currentModuleId: "final_assessment",
  currentScreenId: "FINAL-ASSESSMENT-COMPLETE",
  assessment: {
    score,
    maxScore,
    percentage,
    passed: false,
    attemptNumber,
    submittedAt
  }
}
```

This avoids certificate issuance and also avoids the Hub parent-frame duplicate-completion guard blocking a later passing retake in the same embedded session.

Known Hub contract nuance: the current Hub workflow records failed external assessment attempts as `QuizAttempt` records only when `completed: true`. The current Hub parent frame also suppresses later `completed: true` messages after the first successful completed message. For this HRBA slice, failed attempts are therefore sent as non-completing assessment evidence to preserve retake-to-pass behavior. A later Hub slice should explicitly support recording failed attempts without marking the external course complete.

## 6. Duplicate-send prevention

`App.tsx` uses a runtime `Set` keyed by:

```ts
`${attemptNumber}:${submittedAt}`
```

Once a final assessment result message is successfully posted for that signature, repeated renders do not resend it. Retakes are still allowed because each submitted retake receives a new `attemptNumber` and `submittedAt`.

## 7. Learner-facing copy

Passing result copy:

> You passed the final assessment. Your result is being shared with the CSO Learning Hub so your certificate can be issued and verified from the Hub.

Failing result copy:

> You have not reached the 80% pass mark yet. Review the suggested areas and try again. A certificate is not issued until you pass.

The app does not say that the HRBA app itself issues certificates.

## 8. Standalone behavior

Standalone HRBA mode has no valid portal launch context, so `sendHubProgressMessage()` returns without posting any final assessment result to a Hub parent frame.

Partial progress behavior remains unchanged before final assessment:

- progress is calculated from Modules 1-5 only;
- progress remains capped at 90%;
- `completed` remains `false`;
- no assessment object is included.

## 9. E2E Hub verification results

Local services observed:

- Docker PostgreSQL container `cso-learning-hub-postgres`: running.
- Hub dev server: listening on `localhost:3000`.
- HRBA Vite dev server: listening on `localhost:5173`.

Browser smoke:

- Opened `http://localhost:3000/learn/courses/applying-human-rights-based-approach-in-cso-practice/external`.
- Confirmed the Hub external-course page loads with an embedded HRBA iframe.
- Confirmed the browser session is authenticated in the Hub.

Full manual pass/fail iframe E2E was not completed because the embedded HRBA app requires progression through the five long modules before final assessment unlocks, and no environment or storage mutation was made. The Hub scripted verifier was used for contract-level E2E evidence instead.

Hub verifier evidence:

- `npm run verify:hrba-external-course` passed.
- Output confirmed `failedAttemptRecorded: true`, `passedAttemptRecorded: true`, Hub enrollment `status: "COMPLETED"`, and a generated certificate code for the passing scenario.

## 10. Commands run and results

HRBA repo:

```powershell
npm run lint
npm run build
```

Results:

- `npm run lint`: passed with 0 errors and 5 existing warnings in unrelated files.
- `npm run build`: passed.

Hub repo:

```powershell
docker ps --filter "name=cso-learning-hub-postgres"
npm run lint
npm run build
npm run prisma:validate
npm run verify:hrba-external-course
```

Results:

- PostgreSQL container was running.
- `npm run lint`: passed.
- `npm run build`: passed.
- `npm run prisma:validate`: passed.
- `npm run verify:hrba-external-course`: passed.

## 11. Remaining limitations

- Failed attempts sent by HRBA are non-completing assessment evidence so the parent frame will not block a later passing retake.
- The Hub workflow currently records failed external `QuizAttempt` rows only for `completed: true`; supporting failed-attempt persistence without completion would require a Hub-side change.
- Full browser E2E through all five HRBA modules was not completed in this slice because it would be time-heavy and would require normal learner progression or a dedicated test harness.
- The HRBA app still relies on the Hub parent frame to post the message to `/api/external-course-progress`.

## 12. Recommended next slice

Add a Hub-side failed-attempt recording path that accepts final assessment evidence with `completed: false`, records a failed `QuizAttempt`, does not complete enrollment, does not issue a certificate, and still allows a later passing `completed: true` message in the same embedded session.
