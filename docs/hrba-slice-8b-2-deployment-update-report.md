# HRBA Slice 8B-2 Deployment Update Report

Date: 2026-07-03

## Summary verdict

Verdict: still blocked.

The local HRBA app source and production build contain the launch-token portal contract required by the CSO Learning Hub pilot. The official configured HRBA pilot URL, `https://pilot-hrba-e-learn-v1-wajj.vercel.app`, is still serving an older JavaScript asset that does not contain `launchToken`, `portalOrigin`, or `cso-learning-hub:external-course-progress`.

Deployment was not performed from this environment because Vercel CLI authentication is not available: no `.vercel/project.json` is present, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` are missing, and `npx vercel whoami` reports an invalid token.

## HRBA repo state

- Repo: `D:\eLearn_CDP_Lg`
- Branch: `system/hrba-clean-foundation`
- HEAD: `edcc8f6faf5355f90f4bc71e11fcb5d105972412`
- Recent launch-token integration commit: `82ce48d Update HRBA app portal launch token handling`
- Starting working tree: dirty

Recent history:

```text
edcc8f6 Update latest active version registry
616dcb8 Protect Module 3 latest active version
9ee7254 Restore Module 5 16-state redesign sequence
82ce48d Update HRBA app portal launch token handling
4c2fce2 Implement HRBA app slice 3 final assessment hub callback
```

Dirty working-tree classification:

- LaunchToken / Hub portal integration changes: none observed in dirty diff. The launch-token integration is already committed in `82ce48d`.
- Accepted HRBA course/content changes: modified course/player/content files including `src/App.tsx`, `src/components/course/Module3RevisedRenderer.tsx`, `src/components/course/Module4Renderer.tsx`, `src/components/course/module2-final/Module2FinalRenderer.tsx`, `src/data/hrbaCourseModules.ts`, `src/data/module2-final/module2FinalAssets.ts`, `src/data/module3/module3RevisedScreens.ts`, and style files.
- Certificate/template changes: deleted `public/assets/certificates/templates/certificate_template.png`; untracked `public/assets/certificates/templates/hrba-certificate-template.png`.
- Unrelated or risky changes: uncommitted course renderer/content/style changes and local generated/log/temp files should not be deployed without owner review.
- Untracked files: many documentation, QA evidence, audio, resource, shared icon, and module asset files under `docs/` and `public/assets/`.

Because the tree is dirty, the safe deployment path is not to deploy this checkout as-is.

## Local launchToken integration confirmation

Files inspected:

- `src/integration/portalContext.ts`
- `src/integration/hubProgress.ts`
- `src/App.tsx`
- `docs/hrba-app-launch-token-portal-context-update-report.md`

Confirmed:

- HRBA parses `embed=portal`.
- HRBA parses `portalOrigin`.
- HRBA parses `courseSlug`.
- HRBA parses `launchToken`.
- Portal mode does not require `userId`, `learnerId`, `enrollmentId`, or `courseVersionId`.
- HRBA sends `launchToken` in progress messages.
- HRBA sends `launchToken` in final assessment messages through the same Hub progress message contract with `assessment` evidence.
- HRBA source does not send raw Hub internal IDs.
- HRBA app source inspected for the portal integration does not generate certificates. Certificate issuance remains a Hub responsibility.

## Direct-access behavior

Direct access is not hard-blocked with the preferred message:

```text
Please access this course through the CSO Learning Hub.
```

Minimum acceptable behavior is met locally: without a valid portal launch context, `getPortalLaunchContextFromWindow()` returns `null`, and `sendHubProgressMessage()` returns without sending Hub progress, assessment, identity, certificate, or portal context data.

Hard-blocking direct access was not implemented in this slice because it could disrupt standalone HRBA QA and was not necessary to verify the deployment blocker. This remains a deployment-owner decision.

## HRBA local checks

Dependencies:

- `node_modules` was already present, so `npm install` was not run.

Commands:

```text
npm run lint
npm run build
```

Results:

- `npm run lint`: passed with 0 errors and 5 existing warnings.
- `npm run build`: passed.
- No `npm test` script exists in `package.json`.

Local production asset:

- Built JS asset: `dist/assets/index-C27A2AuZ.js`

Local built-asset string check:

```text
launchToken=true
portalOrigin=true
cso-learning-hub:external-course-progress=true
userId=false
learnerId=false
enrollmentId=false
courseVersionId=false
```

## Official deployment check

Official configured HRBA pilot URL:

```text
https://pilot-hrba-e-learn-v1-wajj.vercel.app
```

Fetched deployed asset:

```text
https://pilot-hrba-e-learn-v1-wajj.vercel.app/assets/index-D1T-29i7.js
```

Deployed asset string check:

```text
launchToken=False
portalOrigin=False
cso-learning-hub:external-course-progress=False
userId=False
learnerId=False
enrollmentId=False
courseVersionId=False
```

Conclusion: the official deployment is still stale and does not include the local launch-token portal implementation.

## Deployment decision

Deployment was not attempted.

Reasons:

- HRBA working tree is dirty with substantial unrelated or not-yet-classified course/content/assets changes.
- No Vercel project binding exists in this checkout.
- Vercel CLI authentication is unavailable or invalid.

Recommended safe deployment path:

1. Use a clean deployment branch or worktree at accepted commit `edcc8f6faf5355f90f4bc71e11fcb5d105972412`, which already includes `82ce48d`.
2. Confirm whether any current dirty course/content/certificate/template changes are accepted for the pilot build before including them.
3. Link the checkout to the official Vercel project for `pilot-hrba-e-learn-v1-wajj.vercel.app`.
4. Run `npm run lint` and `npm run build`.
5. Deploy using the repo's existing Vercel project, not a new hosting target.
6. Re-fetch the deployed JS asset and confirm it contains `launchToken`, `portalOrigin`, and `cso-learning-hub:external-course-progress`.

If a different official protected HRBA deployment URL is used, update `HRBA_EXTERNAL_COURSE_URL` outside git in the Hub deployment environment and in any local verification environment. Do not commit `.env`.

## Hub-side verification

Hub repo:

- Repo: `D:\z CDP-Lg-Andy-main-main`
- Branch: `cso-learning-hub-mvp`
- HEAD: `f42aff296193739ccb6943cdff2abf0c0201cb96`
- Starting status: clean

Database:

```text
docker start cso-learning-hub-postgres
```

Result: passed, container running.

Commands and results:

```text
npx prisma validate
npx prisma migrate status
npm run lint
npm run build
npm run prisma:validate
npm run verify:hrba-external-course
npm run verify:r17
```

Results:

- `npx prisma validate`: passed.
- `npx prisma migrate status`: passed; database schema is up to date.
- `npm run lint`: passed.
- `npm run build`: passed.
- `npm run prisma:validate`: passed.
- `npm run verify:hrba-external-course`: passed.
- `npm run verify:r17`: passed.

Important `verify:hrba-external-course` evidence:

```json
{
  "iframeOrigin": "https://pilot-hrba-e-learn-v1-wajj.vercel.app",
  "iframeSrcExcludesRawIds": true,
  "iframeSrcIncludesPortalEmbed": true,
  "iframeSrcIncludesLaunchToken": true,
  "invalidLaunchContextRejected": true,
  "invalidTokenRejected": true,
  "tokenSessionMismatchRejected": true,
  "failedAttemptRecorded": true,
  "passedAttemptRecorded": true,
  "certificatePdfDataAvailable": true,
  "publicVerificationWorks": true,
  "status": "COMPLETED"
}
```

The Hub verifier still passes, but it does not close the deployment blocker because the official HRBA JavaScript asset is stale.

## Browser route check

Route opened in the in-app browser:

```text
http://localhost:3000/learn/courses/applying-human-rights-based-approach-in-cso-practice/external
```

Observed result:

- Redirected to `http://localhost:3000/sign-in?next=%2Flearn%2Fcourses%2Fapplying-human-rights-based-approach-in-cso-practice%2Fexternal`.
- Page heading: `Sign in to continue learning`.
- Iframe count: `0`.

Acceptance coverage:

- Unauthenticated users redirect to sign-in: confirmed.
- Authenticated learner iframe inspection: not completed because no signed-in in-app browser session was available.
- DB-backed Hub verifier provides partial evidence for tokenized authenticated launch URL and callback behavior.

## Files changed

Created in HRBA repo:

- `docs/hrba-slice-8b-2-deployment-update-report.md`

No Hub repo files were intentionally changed. `next-env.d.ts` was temporarily modified by `npm run build` and restored to preserve the Hub repo as read-only.

## Source, schema, and environment confirmation

- HRBA source changes made in this slice: none.
- HRBA report changes made in this slice: this report only.
- Hub source changes made in this slice: none.
- Hub schema changes: none.
- Hub migration changes: none.
- `.env` changes: none.
- HRBA deployment environment variables required: none identified for the static Vite app.
- Hub deployment environment still needs `HRBA_EXTERNAL_COURSE_URL` to point to the official HRBA deployment URL that serves the launch-token build.

## Remaining deployment-owner actions

1. Authenticate Vercel CLI or use the official Vercel deployment workflow for the HRBA project.
2. Deploy a reviewed clean HRBA build that includes commit `82ce48d` or later accepted source.
3. Do not include the current dirty course/content/certificate/template changes unless they are explicitly accepted for pilot deployment.
4. Verify the official deployed JS asset contains `launchToken`, `portalOrigin`, and `cso-learning-hub:external-course-progress`.
5. Re-run the Hub verifier after deployment.
6. Complete an authenticated browser E2E check with a pilot learner session.
7. Decide whether direct HRBA access must be hard-blocked before final pilot launch.

## Closure decision

Blocker closed: no.

The official HRBA pilot URL must serve a JavaScript asset containing launch-token portal parsing and Hub progress-message support before this blocker can be closed.
