# HRBA App Launch-Token Portal Context Update Report

Date: 2026-06-29

## 1. Summary of changes

Updated the HRBA external course app to match the CSO Learning Hub launch-token hotfix contract.

The HRBA app now:

- parses `launchToken` from the portal iframe URL;
- no longer requires `userId`, `enrollmentId`, or `courseVersionId` to activate portal mode;
- sends `launchToken` in Hub progress and final assessment `postMessage` payloads;
- no longer sends raw Hub internal IDs in HRBA messages.

No Hub repo files were modified for this hotfix.

## 2. Files changed

- `src/integration/portalContext.ts`
- `src/integration/hubProgress.ts`
- `docs/hrba-app-launch-token-portal-context-update-report.md`

## 3. Portal context before/after

Before:

```ts
embed=portal
portalOrigin
courseSlug
userId
enrollmentId
courseVersionId
```

The HRBA app treated portal mode as invalid unless all three raw Hub IDs were visible in the iframe URL.

After:

```ts
embed=portal
portalOrigin
courseSlug
launchToken
```

Validation now requires:

- `embed=portal`;
- `portalOrigin` parses as a valid origin;
- `courseSlug` is non-empty;
- `launchToken` is non-empty.

The token value is not logged.

## 4. Progress/final assessment message before/after

Before, HRBA progress messages included:

```ts
{
  courseSlug,
  userId,
  enrollmentId,
  courseVersionId,
  progressPercent,
  completed,
  completedModuleIds,
  currentModuleId,
  currentScreenId,
  sentAt,
  assessment?
}
```

After, HRBA progress messages include:

```ts
{
  type,
  version,
  courseSlug,
  launchToken,
  progressPercent,
  completed,
  completedModuleIds,
  currentModuleId,
  currentScreenId,
  sentAt,
  assessment?
}
```

Removed from HRBA messages:

- `userId`
- `enrollmentId`
- `courseVersionId`

Existing behavior is preserved:

- partial progress before final assessment remains capped at 90;
- partial progress uses `completed: false`;
- failed final assessment sends assessment evidence with `completed: false`;
- passing final assessment sends `completed: true` and `progressPercent: 100`;
- duplicate final assessment sends are guarded by `attemptNumber` plus `submittedAt`;
- standalone mode sends no Hub message.

## 5. Source verification for removed raw IDs

Commands:

```powershell
rg -n "userId|enrollmentId|courseVersionId" src
rg -n "launchToken" src
rg -n "/api/external-course-progress|fetch\(" src
rg -n "certificate|Certificate|pdf|PDF|Blob|URL\.createObjectURL|download" src\integration src\App.tsx src\components\course\FinalAssessmentRenderer.tsx
```

Results:

- No `userId`, `enrollmentId`, or `courseVersionId` references remain in `src`.
- `launchToken` appears only in `src/integration/portalContext.ts` and `src/integration/hubProgress.ts`.
- No direct `/api/external-course-progress` or `fetch()` call exists in the HRBA app source.
- Certificate references in the inspected HRBA integration/final-assessment files are learner-facing text only; no certificate generation or PDF logic was added.

## 6. Standalone behavior

Standalone mode remains unchanged.

If the URL does not include a valid portal launch context with `embed=portal`, `portalOrigin`, `courseSlug`, and `launchToken`, `getPortalLaunchContextFromWindow()` returns `null`. `sendHubProgressMessage()` then returns without posting a Hub message.

## 7. E2E or smoke verification

Local services:

- Docker PostgreSQL container `cso-learning-hub-postgres`: running.
- Hub dev server: listening on `localhost:3000`.
- HRBA Vite dev server: listening on `localhost:5173`.
- Hub repo was at hotfix commit `2c23ac3 Fix external course launch internal ID exposure`.

Hub verifier:

```powershell
npm run verify:hrba-external-course
```

Result: passed.

Verifier output confirmed:

- `iframeSrcIncludesLaunchToken: true`
- `iframeSrcExcludesRawIds: true`
- `invalidTokenRejected: true`
- `tokenSessionMismatchRejected: true`
- `failedAttemptRecorded: true`
- `passedAttemptRecorded: true`
- `publicVerificationWorks: true`
- `certificatePdfDataAvailable: true`
- final status `COMPLETED`

Browser smoke:

- Attempted to open `http://localhost:3000/learn/courses/applying-human-rights-based-approach-in-cso-practice/external`.
- The in-app browser was redirected to `/sign-in?next=...`, so live iframe URL inspection could not be completed without signing in.

Full manual final-assessment browser E2E was not repeated because the Hub verifier now covers the tokenized launch URL, partial progress, failed attempt, passing attempt, certificate issuance, public verification, invalid token, and session mismatch scenarios.

## 8. Commands run and results

HRBA repo:

```powershell
npm run lint
npm run build
```

Results:

- `npm run lint`: passed with 0 errors and 5 existing warnings in unrelated files.
- `npm run build`: passed.

Test script:

- No `npm test` script exists in `package.json`.

Hub smoke/reference:

```powershell
docker ps --filter "name=cso-learning-hub-postgres"
git log -1 --oneline
npm run verify:hrba-external-course
```

Results:

- PostgreSQL container was running.
- Hub repo was on commit `2c23ac3 Fix external course launch internal ID exposure`.
- Hub verifier passed.

## 9. Remaining limitations

- Live browser iframe URL inspection requires an authenticated Hub participant session. The in-app browser was not signed in during this run.
- HRBA still relies on the Hub parent frame to forward messages to the Hub API, by design.
- Full manual completion through all five HRBA modules plus final assessment was not repeated because it is time-heavy and covered at contract level by the Hub verifier.

## 10. Recommendation on final pilot acceptance QA

Accept the HRBA launch-token hotfix for final pilot QA after one authenticated browser confirmation by a tester:

1. Sign in as a Hub participant.
2. Open the HRBA external course route.
3. Confirm iframe URL contains `launchToken`.
4. Confirm iframe URL does not contain `userId`, `enrollmentId`, or `courseVersionId`.
5. Confirm partial progress saves.
6. Confirm a passing final assessment result issues and verifies a Hub certificate.

The source and verifier evidence support acceptance once that authenticated browser confirmation is recorded.
