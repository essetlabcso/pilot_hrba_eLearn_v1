# HRBA Pilot Final SPA Fallback Preview Report

Date: 2026-07-06

## Branch And Change

- Branch: `candidate/hrba-pilot-final-screens`
- Routing fix commit: `b2e1d45a82833b6c549ee4fbbc68d70df16981d1`
- Routing change made: added a minimal Vercel SPA fallback in `vercel.json`.
- Files changed:
  - `vercel.json`

## Routing Configuration

The new Vercel configuration rewrites app routes to the React SPA entry while leaving static assets and favicon requests untouched:

```json
{
  "rewrites": [
    {
      "source": "/((?!assets/|favicon.svg).*)",
      "destination": "/"
    }
  ]
}
```

No headers, redirects, functions, environment settings, course content, module code, Hub integration logic, or assessment logic were changed.

## Local Verification

- `npm run build`: passed.
- `npm run lint`: passed with 5 existing React hook warnings and no errors.
- `npm run typecheck`: not available as a separate package script; TypeScript compilation ran through `npm run build`.
- Build warnings: Vite reported large chunk warnings and plugin timing notes; these are non-blocking.

## Preview Deployment

- Preview URL: https://pilot-hrba-e-learn-v1-wajj-3di39k9eh.vercel.app
- Preview deployment ID: `dpl_D7K3fJA636NvurMRi4N4rn8MnEb4`
- Preview deployment status: `READY`
- Deployment command used: `npx vercel deploy --yes --scope girumteenexus-8292s-projects --project pilot-hrba-e-learn-v1-wajj`
- Production deploy command used: no.
- Alias promotion used: no.

## Direct Route Fallback Results

Checked with authenticated Vercel preview access because the preview deployment is protected by Vercel deployment protection.

| Route | Result |
| --- | --- |
| `/` | Served HRBA app shell; no server error marker observed |
| `/module-1` | Served HRBA app shell; no `NOT_FOUND`; no server error marker observed |
| `/module-2` | Served HRBA app shell; no `NOT_FOUND`; no server error marker observed |
| `/module-3` | Served HRBA app shell; no `NOT_FOUND`; no server error marker observed |
| `/module-4` | Served HRBA app shell; no `NOT_FOUND`; no server error marker observed |
| `/module-5` | Served HRBA app shell; no `NOT_FOUND`; no server error marker observed |
| `/final-assessment/cover` | Served HRBA app shell; no `NOT_FOUND`; no server error marker observed |

The served preview app shell referenced:

- `/assets/index-CyBp4KkS.js`
- `/assets/index-B0JBroUG.css`

## Hub Integration Marker Check

Preview bundle `/assets/index-CyBp4KkS.js`:

- `portalOrigin`: present
- `courseSlug`: present
- `launchToken`: present
- `cso-learning-hub:external-course-progress`: present

Raw Hub ID field string check:

- `userId`: absent
- `learnerId`: absent
- `enrollmentId`: absent
- `courseVersionId`: absent

## Production Protection

- Production URL: https://pilot-hrba-e-learn-v1-wajj.vercel.app
- Production HTTP status: `200`
- Production deployment ID: `dpl_A9LLMkCZMbfXkg4wPUycrRC8stPQ`
- Production deployment target: `production`
- Production asset remains: `/assets/index-OJrecxNB.js`
- Production was not replaced by preview: confirmed.
- Production URL changed: no.

## Recommendation

Approve production promotion only after owner review of this preview. The minimal Vercel SPA fallback repaired direct route `NOT_FOUND` behavior in preview without changing course content, app behavior, Hub integration logic, or production.
