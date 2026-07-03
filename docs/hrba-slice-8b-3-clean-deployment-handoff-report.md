# HRBA Slice 8B-3 Clean Deployment Handoff Report

Date: 2026-07-03

## Summary verdict

Verdict: still blocked.

Prepared a separate clean deployment worktree from accepted commit `edcc8f6faf5355f90f4bc71e11fcb5d105972412`, which includes `82ce48d Update HRBA app portal launch token handling`.

The dirty primary HRBA checkout at `D:\eLearn_CDP_Lg` was not deployed. The official Vercel URL is still serving the stale JavaScript asset that lacks the launchToken portal implementation.

## Primary HRBA repo status

- Repo: `D:\eLearn_CDP_Lg`
- Branch: `system/hrba-clean-foundation`
- Starting status: dirty
- Dirty working tree was not modified, reverted, staged, or deployed.

Recent history:

```text
dfef5a1 Document HRBA deployment update verification
edcc8f6 Update latest active version registry
616dcb8 Protect Module 3 latest active version
9ee7254 Restore Module 5 16-state redesign sequence
82ce48d Update HRBA app portal launch token handling
```

Pre-existing dirty changes remained in course/content/assets/certificate-template areas, including modified source/style files, deleted `public/assets/certificates/templates/certificate_template.png`, and many untracked docs/assets.

## Clean deployment worktree

- Clean worktree path: `D:\eLearn_CDP_Lg_deploy_clean`
- Prepared commit: `edcc8f6faf5355f90f4bc71e11fcb5d105972412`
- Worktree HEAD: `edcc8f6faf5355f90f4bc71e11fcb5d105972412`
- Recent history includes: `82ce48d Update HRBA app portal launch token handling`

Initial clean worktree status was clean before dependency install, build, Vercel link, and handoff-note creation.

## Source verification

Files inspected in the clean worktree:

- `src/integration/portalContext.ts`
- `src/integration/hubProgress.ts`
- `src/App.tsx`

Confirmed:

- parses `embed=portal`;
- parses `portalOrigin`;
- parses `courseSlug`;
- parses `launchToken`;
- does not require `userId`, `learnerId`, `enrollmentId`, or `courseVersionId` for portal mode;
- sends `launchToken` in progress messages;
- sends `launchToken` in final assessment messages through the Hub progress message with `assessment` evidence;
- does not send raw Hub internal IDs;
- does not generate certificates.

Certificate references in source are learner-facing text or downloadable course resources. Certificate issuance remains handled by the CSO Learning Hub.

## Clean worktree checks

Dependencies:

```text
npm install
```

Result: passed, 0 vulnerabilities.

Validation:

```text
npm run lint
npm run build
```

Results:

- `npm run lint`: passed with 0 errors and 5 known existing React hook warnings.
- `npm run build`: passed.
- No `npm test` script exists in `package.json`.

Built JS asset:

```text
dist/assets/index-BESSZ9dG.js
```

Built asset string check:

```text
launchToken: true
portalOrigin: true
cso-learning-hub:external-course-progress: true
userId: false
learnerId: false
enrollmentId: false
courseVersionId: false
```

## Deployment status

Official target URL:

```text
https://pilot-hrba-e-learn-v1-wajj.vercel.app
```

Read-only Vercel inspect confirmed the official alias currently points to:

```text
https://pilot-hrba-e-learn-v1-wajj-oxniqo84q.vercel.app
```

That deployment was created on Friday, June 12, 2026.

Current official deployed asset:

```text
/assets/index-D1T-29i7.js
```

Current official deployed asset string check:

```text
launchToken: false
portalOrigin: false
cso-learning-hub:external-course-progress: false
userId: false
learnerId: false
enrollmentId: false
courseVersionId: false
```

Vercel CLI authentication became available during this run as `girumteenexus-8292`, and the clean worktree was linked to the existing official project:

```text
girumteenexus-8292s-projects/pilot-hrba-e-learn-v1-wajj
```

`npx vercel deploy --prod --yes` was attempted from the clean worktree, but the command timed out without returning a deployment URL or build log. A subsequent inspect confirmed the official alias still points to the old June 12 deployment.

Deployment performed and verified: no.

## Handoff files

Created in the clean worktree:

- `D:\eLearn_CDP_Lg_deploy_clean\docs\hrba-clean-launch-token-deployment-handoff.md`

Created in the primary HRBA repo:

- `docs/hrba-slice-8b-3-clean-deployment-handoff-report.md`

No CSO Learning Hub repo files were modified.

## Clean worktree local side effects

The Vercel link step created local uncommitted deployment metadata in the clean worktree:

- `.gitignore` modified to ignore `.vercel` and `.env*`;
- `.env.local` created locally and not printed;
- `.vercel/repo.json` created locally.

These local files were not committed.

## Remaining owner action

Deploy commit `edcc8f6faf5355f90f4bc71e11fcb5d105972412`, or a later reviewed clean commit containing `82ce48d`, to the official Vercel project serving:

```text
https://pilot-hrba-e-learn-v1-wajj.vercel.app
```

After deployment:

1. Fetch the official page.
2. Identify the deployed JS asset.
3. Confirm the asset contains `launchToken`, `portalOrigin`, and `cso-learning-hub:external-course-progress`.
4. Confirm raw Hub IDs are not required or sent by the HRBA deployment contract.
5. Run the Hub verifier.
6. Complete authenticated browser E2E from the Hub learner route.

## Closure decision

Blocker closed: no.

The clean source/build is ready for deployment handoff, but the official deployed HRBA asset is still stale.
