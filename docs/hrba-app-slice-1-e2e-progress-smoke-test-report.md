# HRBA App Slice 1 E2E Progress Smoke Test Report

## 1. Test setup

- Date: 2026-06-29
- HRBA app repository: `D:\eLearn_CDP_Lg`
- Hub repository: `D:\z CDP-Lg-Andy-main-main`
- Docker PostgreSQL container confirmed running: `cso-learning-hub-postgres`
- Hub dev server confirmed reachable at `http://localhost:3000`
- HRBA Vite dev server confirmed reachable at `http://localhost:5173`

## 2. URLs used

- Hub: `http://localhost:3000`
- HRBA local dev app: `http://localhost:5173`
- Hub external course launch route: `/learn/courses/applying-human-rights-based-approach-in-cso-practice/external`

The Hub `.env` configuration still points the HRBA external course URL at the configured hosted HRBA deployment. For this local smoke test, the Hub database registration was temporarily refreshed using `HRBA_EXTERNAL_COURSE_URL=http://localhost:5173` as a process-only environment override. No `.env` file was edited or committed.

## 3. Authentication state

- Browser sign-in used Hub quick learner access.
- Browser session loaded as an authenticated learner.
- The browser-authenticated seeded learner already had completed external-course state, so it was not suitable for proving that partial progress avoids certificate issuance.
- A throwaway local learner was created through the existing Hub user workflow for isolated callback verification.

## 4. Whether iframe loaded

Yes. The Hub external course page loaded an iframe with the local HRBA Vite URL:

`http://localhost:5173/?embed=portal&portalOrigin=http%3A%2F%2Flocalhost%3A3000&courseSlug=applying-human-rights-based-approach-in-cso-practice&userId=...&enrollmentId=...&courseVersionId=...`

Identifiers are intentionally omitted from this report.

## 5. Whether portal context was detected

Yes. Code inspection confirmed that the HRBA app parses portal launch context in `src/integration/portalContext.ts`, including `embed`, `portalOrigin`, `courseSlug`, `userId`, `enrollmentId`, and `courseVersionId`.

The browser-rendered iframe also showed the portal guidance note indicating that course progress is shared with the CSO Learning Hub and certificates will be issued from the Hub only after the final assessment is available and completed.

## 6. Whether progress message was sent

Code inspection confirmed that the HRBA app sends `cso-learning-hub:external-course-progress` messages from `src/integration/hubProgress.ts` and `src/App.tsx`.

The current Slice 1 message contract sends partial progress with `completed: false`. No final-assessment completion behavior was implemented or exercised.

## 7. Whether Hub received/recorded progress

The browser iframe interaction was limited by the pre-completed seeded learner state. To verify the same contract safely, a clean diagnostic callback was sent to the real Hub endpoint using an authenticated local learner session and real enrollment context.

The Hub API accepted the partial progress payload and returned success with:

- `completed: false`
- `progressPercent: 36`
- `certificateStatus: not-completed`
- no certificate code

## 8. Certificate not-issued confirmation

Confirmed through Hub database state after the partial callback:

- enrollment progress increased to `36`
- enrollment status remained `IN_PROGRESS`
- lesson status remained `IN_PROGRESS`
- external progress source was `external-course-postmessage`
- completed module count was recorded
- certificate count remained `0`

No certificate was issued from partial progress.

## 9. Commands run and results

- `npm run lint` in HRBA repo: passed with 0 errors and 5 existing React hook warnings.
- `npm run build` in HRBA repo: passed. Vite reported existing large asset/chunk warnings.

## 10. Blockers or limitations

- The browser-authenticated quick-access learner already had completed Hub state and an existing certificate, so a clean partial-progress proof required an isolated local learner and direct authenticated callback to the Hub API.
- The Hub verification script later confirmed the hosted HRBA origin from configured environment values, while this smoke test used local HRBA registration through a temporary process environment override.
- No production behavior or feature code was changed.

## 11. Recommendation for next slice

Proceed with the next HRBA app slice only after keeping `completed: false` behavior until final assessment work is explicitly implemented.
