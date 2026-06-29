# HRBA App Slice 1 Portal Progress Callback Report

## 1. Summary of changes

Implemented HRBA App Slice 1: portal launch context parsing and partial progress callback messaging for Hub iframe launches.

The HRBA app now:

- detects Hub portal launch mode from query parameters;
- keeps portal context in runtime React state only;
- sends partial progress messages to the parent Hub frame with `window.parent.postMessage`;
- maps completed Modules 1-5 to a capped 0-90% progress value;
- keeps `completed` set to `false` because final assessment scoring is not implemented in this slice;
- shows a small portal-only learner guidance note.

No final assessment scoring, 80% pass-rule enforcement, certificate generation, backend, direct Hub API calls, or Hub repo changes were implemented.

## 2. Files changed

- `src/integration/portalContext.ts`
  - New portal launch context parser and validator.
- `src/integration/hubProgress.ts`
  - New Hub progress message sender.
- `src/App.tsx`
  - Reads portal context once at app startup.
  - Computes partial portal progress from existing local completion state.
  - Sends progress messages when completed modules, current module/screen, or screen progress changes meaningfully.
- `src/components/platform/PlatformShell.tsx`
  - Adds portal-only learner guidance note.
- `src/components/player/CoursePlayerShell.tsx`
  - Adds portal-only learner guidance note in the player shell.
- `docs/hrba-app-slice-1-portal-progress-callback-report.md`
  - This implementation report.

Existing previous audit artifact still present:

- `docs/hrba-external-course-callback-audit-report.md`

## 3. Portal launch context behavior

Portal mode is active only when all required query parameters are present and valid:

- `embed=portal`
- `portalOrigin`
- `courseSlug`
- `userId`
- `enrollmentId`
- `courseVersionId`

Validation behavior:

- `portalOrigin` must parse as a valid URL origin.
- `courseSlug`, `userId`, `enrollmentId`, and `courseVersionId` must be non-empty strings.
- Invalid or incomplete portal params return `null`, so standalone behavior continues.
- Portal context is not written to `localStorage`.
- No sensitive values are logged.

## 4. Progress callback behavior

When portal mode is active, the app sends:

```ts
{
  type: "cso-learning-hub:external-course-progress",
  version: 1,
  courseSlug,
  userId,
  enrollmentId,
  courseVersionId,
  progressPercent,
  completed: false,
  completedModuleIds,
  currentModuleId,
  currentScreenId,
  sentAt
}
```

The HRBA app uses:

```ts
window.parent.postMessage(message, portalOrigin)
```

The HRBA app does not call `/api/external-course-progress` directly.

## 5. Progress mapping

Progress uses existing HRBA local completion state:

- Trackable units: Modules 1-5 only.
- `completedModuleIds`: completed IDs among Modules 1-5.
- `progressPercent`: `completedModules / 5 * 90`, rounded and capped at `90`.
- `completed`: always `false` in this slice.
- `currentModuleId` and `currentScreenId`: current runtime state values.

This intentionally prevents the Hub from issuing a certificate until a later final-assessment slice sends a valid passed assessment result.

## 6. Learner-facing guidance

When portal mode is active, the course overview and player shell show:

> Your course progress is being shared with the CSO Learning Hub. Certificates will be issued from the Hub after the final assessment is available and completed.

This avoids promising certificate issuance before final assessment scoring exists.

## 7. Standalone HRBA behavior

Standalone mode remains unchanged:

- No portal params means no active portal context.
- No progress message is sent.
- Existing local `localStorage` course progress behavior remains in place.
- Existing routing and player logic remain unchanged.

## 8. Commands run and results

- `npm run lint`
  - Passed with existing warnings only.
  - Existing warnings:
    - `src/components/course/Module1Renderer.tsx` hook dependency warning.
    - `src/components/player/CoursePlayerShell.tsx` ref cleanup dependency warnings.
- `npm run build`
  - Passed.
  - Existing large asset/chunk warnings remain.
- `npm test -- --runInBand`
  - Not available. `package.json` has no `test` script.

Source verification:

- `rg` found no direct `/api/external-course-progress` calls in the new integration code.
- `rg` found no assessment fields in the new progress sender.
- `rg` found only `window.parent.postMessage` for callback transport.
- `rg` found no `completed: true` in the Slice 1 integration code.

## 9. Manual verification steps

Planned browser checks:

1. Open HRBA app normally without portal params.
2. Open HRBA app with sample portal params:

```text
?embed=portal&portalOrigin=http%3A%2F%2Flocalhost%3A3000&courseSlug=applying-human-rights-based-approach-in-cso-practice&userId=demo-user&enrollmentId=demo-enrollment&courseVersionId=demo-version
```

3. Progress through a meaningful module/screen completion point.
4. Confirm message shape with a parent listener.
5. Confirm no `completed=true` message is sent.

Manual browser verification was limited because the in-app browser rejected localhost interaction under its URL policy during this run. Automated build/lint and source-level verification were completed instead.

## 10. Remaining limitations

- Final assessment scoring is still not implemented.
- The 80% pass rule is still not enforced in HRBA app logic.
- No assessment payload is sent yet.
- `completed` is intentionally never sent as `true`.
- Certificate generation remains entirely outside the HRBA app.
- Portal context is runtime-only; if a learner refreshes after app navigation removes the original query string, the portal context is not restored.
- End-to-end iframe verification against the Hub should be run once both apps are available in a browser session that permits localhost iframe testing.

## 11. Recommended next slice

Recommended Slice 2:

- Preserve portal query context across internal HRBA route changes, if Hub iframe refresh resilience is required.
- Add an end-to-end Hub iframe smoke test harness.
- Define the final assessment data model and attempt rules.
- Implement final assessment scoring separately.
- Only after final scoring exists, send assessment payload fields and allow `completed: true` when `passed` is true and percentage meets the Hub threshold.
