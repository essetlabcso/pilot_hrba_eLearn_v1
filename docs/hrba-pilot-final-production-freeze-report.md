# HRBA Pilot Final Production Freeze Report

Date: 2026-07-06

## Final Production Release

- Production URL: https://pilot-hrba-e-learn-v1-wajj.vercel.app
- Release branch: `release/hrba-pilot-final`
- Release tag: `hrba-pilot-final-v1`
- Deployed release commit: `40229738e0e9b5a2cba5ad787a7543e6e1b7145b`
- Production deployment ID: `dpl_H5YkcZYhCpJpAJXfimufkT7Pwuq2`
- Production deployment URL: https://pilot-hrba-e-learn-v1-wajj-r1ssm7a1e.vercel.app
- Production deployment status: `READY`
- Vercel project: `pilot-hrba-e-learn-v1-wajj`

This report was added after the production deployment and was not redeployed. The deployed course build is the release commit listed above.

## Preservation References

- Archived previous live commit: `bf71cc759c5127b42be32b4e07289e414e9b91d8`
- Archive branch: `archive/hrba-live-vercel-bf71cc7`
- Archive tag: `hrba-live-vercel-bf71cc7`
- Final candidate source branch: `candidate/hrba-pilot-final-screens`
- Final preview URL before production promotion: https://pilot-hrba-e-learn-v1-wajj-3di39k9eh.vercel.app

## Local Check Results Before Production Deploy

- `npm run build`: passed.
- `npm run lint`: passed with 5 existing React hook warnings and no errors.
- `npm run typecheck`: no separate package script is available; TypeScript compilation ran through `npm run build`.
- Non-blocking build warnings: Vite large chunk warnings and plugin timing notes.

Existing lint warnings observed:

- `src/components/course/Module1Renderer.tsx`: `visitedSteps` dependency warning.
- `src/components/player/CoursePlayerShell.tsx`: 4 ref cleanup warnings.
- Babel deoptimization notice for large `Module3RevisedRenderer.tsx`.

## Production Smoke Results

Checked against https://pilot-hrba-e-learn-v1-wajj.vercel.app after production deployment.

| Route | HTTP status | App shell served | Vercel NOT_FOUND | Server error marker | Asset |
| --- | ---: | --- | --- | --- | --- |
| `/` | 200 | Yes | No | No | `/assets/index-CyBp4KkS.js` |
| `/module-1` | 200 | Yes | No | No | `/assets/index-CyBp4KkS.js` |
| `/module-2` | 200 | Yes | No | No | `/assets/index-CyBp4KkS.js` |
| `/module-3` | 200 | Yes | No | No | `/assets/index-CyBp4KkS.js` |
| `/module-4` | 200 | Yes | No | No | `/assets/index-CyBp4KkS.js` |
| `/module-5` | 200 | Yes | No | No | `/assets/index-CyBp4KkS.js` |
| `/final-assessment/cover` | 200 | Yes | No | No | `/assets/index-CyBp4KkS.js` |

The production CSS asset observed was `/assets/index-B0JBroUG.css`.

## Hub Integration Marker Check

Production bundle checked: `/assets/index-CyBp4KkS.js`

- `portalOrigin`: present
- `courseSlug`: present
- `launchToken`: present
- `cso-learning-hub:external-course-progress`: present

Raw Hub ID field string check:

- `userId`: absent
- `learnerId`: absent
- `enrollmentId`: absent
- `courseVersionId`: absent

## Scope Confirmation

- No course content, screen wording, assessment logic, module code, styles, images, or interactions were changed during production promotion.
- No Hub launch token, postMessage, callback, certificate, Supabase, learner account, database, or Hub integration logic was changed.
- No secrets, `.env` files, `node_modules`, build output, cache folders, screenshots, or temporary files were committed.
- The production promotion used the existing Vercel project and did not create a new project.

## Freeze Statement

This is the final HRBA pilot course version linked to the CSO Learning Hub. No further screen/content changes are approved for pilot unless a critical P0/P1 defect is found.

## Recommendation

Use https://pilot-hrba-e-learn-v1-wajj.vercel.app as the final HRBA pilot course production URL for CSO Learning Hub pilot launch. Keep `archive/hrba-live-vercel-bf71cc7` and `hrba-live-vercel-bf71cc7` as the preserved pre-promotion live reference.
