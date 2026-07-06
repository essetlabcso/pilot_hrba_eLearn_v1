# HRBA Pilot Final Candidate Preview Report

Date: 2026-07-06

## Candidate

- Candidate branch: `candidate/hrba-pilot-final-screens`
- Candidate screen commit: `19f24011bc22eb09382b30f4ee3bb750c95cf33f`
- Current preview-deployed HEAD: `4f4a502bbf4178ce067b54b18d59e4e0ea16816b`
- Post-candidate source check: passed. `git diff --name-only 19f24011bc22eb09382b30f4ee3bb750c95cf33f..HEAD` returned only:
  - `docs/hrba-pilot-final-version-preservation-report.md`
- App/course source files changed after `19f2401`: no.

## Vercel Project

- Existing Vercel project: `girumteenexus-8292s-projects/pilot-hrba-e-learn-v1-wajj`
- Production URL protected: https://pilot-hrba-e-learn-v1-wajj.vercel.app
- Preview deployment URL: https://pilot-hrba-e-learn-v1-wajj-dr3e02jed.vercel.app
- Preview deployment ID: `dpl_B4XZk4VoExJNFZePtatgHFZw4STj`
- Preview deployment status: `READY`
- Preview deployment target: `preview`
- Deployment command used: `npx vercel deploy --yes --scope girumteenexus-8292s-projects --project pilot-hrba-e-learn-v1-wajj`
- Production deploy command used: no.
- Alias promotion used: no.
- New Vercel project created: no.

## Local Verification

- `npm run build`: passed.
- `npm run lint`: passed with 5 existing React hook warnings and no errors.
- `npm run typecheck`: not available as a separate package script; TypeScript compilation ran through `npm run build`.
- Build warnings: Vite reported large chunk warnings and plugin timing notes; these are non-blocking.

## Preview Verification

- Preview root `/`: loaded HRBA app shell through authenticated Vercel preview access.
- Preview app title: `CSO Learning Hub — HRBA Foundations Course`.
- Preview candidate assets:
  - `/assets/index-CyBp4KkS.js`
  - `/assets/index-B0JBroUG.css`
- Server error markers on preview root: none observed.
- Obvious missing root assets: none observed from fetched app shell.

### Module Route Checks

Direct path checks against the protected preview deployment:

- `/module-1`: Vercel `NOT_FOUND`
- `/module-2`: Vercel `NOT_FOUND`
- `/module-3`: Vercel `NOT_FOUND`
- `/module-4`: Vercel `NOT_FOUND`
- `/module-5`: Vercel `NOT_FOUND`
- `/final-assessment/cover`: Vercel `NOT_FOUND`

This same direct-path behavior was confirmed on the current production URL, which also returns `404/NOT_FOUND` for those direct paths. The preview deployment did not replace production and did not newly introduce this hosting behavior. It appears to be the current static Vite hosting behavior without a SPA rewrite rule.

Browser console smoke against rendered module screens was not completed because the preview deployment is protected by Vercel login/deployment protection. Authenticated `vercel curl` access was sufficient to verify the protected preview app shell and bundle markers, but not to run an ordinary unauthenticated browser console smoke.

## Hub Integration Marker Check

Authenticated preview bundle check for `/assets/index-CyBp4KkS.js`:

- `portalOrigin`: present
- `courseSlug`: present
- `launchToken`: present
- `cso-learning-hub:external-course-progress`: present

Raw Hub ID field string check:

- `userId`: absent
- `learnerId`: absent
- `enrollmentId`: absent
- `courseVersionId`: absent

## Production Protection Check

- Production URL: https://pilot-hrba-e-learn-v1-wajj.vercel.app
- Production HTTP status: `200`
- Production deployment ID from inspect: `dpl_A9LLMkCZMbfXkg4wPUycrRC8stPQ`
- Production deployment target: `production`
- Production asset remains: `/assets/index-OJrecxNB.js`
- Production candidate asset `/assets/index-CyBp4KkS.js` is not active on production.
- Production URL changed: no.

## Blockers And Warnings

- Preview deployment is protected by Vercel login/deployment protection, so unauthenticated browser smoke could not be completed.
- Direct module paths return `NOT_FOUND` on both preview and production. If direct route refresh/share URLs are required for pilot, add a Vercel SPA rewrite before production promotion. This was not changed in this preview-only slice.

## Recommendation

Do not promote this candidate to production until the owner explicitly accepts the preview-protection limitation and the existing direct-route `NOT_FOUND` behavior, or approves a small hosting rewrite repair followed by a new preview verification. If the owner accepts those constraints, the candidate preview can be considered ready for production promotion approval.
