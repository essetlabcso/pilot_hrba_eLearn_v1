# HRBA Latest Pilot Release Deployment Report

## Deployment Verdict

- Verdict: successful
- Branch deployed: `release/hrba-pilot-latest-launchtoken`
- Commit deployed: `bf71cc7`
- Deployment URL: `https://pilot-hrba-e-learn-v1-wajj-99l0lo4h6.vercel.app`
- Official production URL: `https://pilot-hrba-e-learn-v1-wajj.vercel.app`
- Vercel project: `girumteenexus-8292s-projects/pilot-hrba-e-learn-v1-wajj`
- Vercel deployment ID: `dpl_A9LLMkCZMbfXkg4wPUycrRC8stPQ`
- Vercel ready state: `READY`

## Release Content Confirmation

- Latest accepted Module 2 clean/best version is included in the deployed branch.
- Latest Module 3 Screen 20 refinements are included in the deployed branch.
- LaunchToken integration is included through commit `82ce48d Update HRBA app portal launch token handling`.
- The deployed branch also includes release content commit `eb55f31` and release candidate report commit `e008d32`.
- Documentation-only clarification commit `bf71cc7` was added before deployment.

## Checks Run Before Deployment

- `npm run lint`: passed with 5 known existing React hook warnings.
- `npm run build`: passed.
- Local built JS asset before deployment: `dist/assets/index-OJrecxNB.js`
- Local built asset contained:
  - `launchToken`: present
  - `portalOrigin`: present
  - `cso-learning-hub:external-course-progress`: present
- Local built asset raw Hub ID field check:
  - `userId`: absent
  - `learnerId`: absent
  - `enrollmentId`: absent
  - `courseVersionId`: absent

## Deployment Command

```powershell
npx vercel deploy --prod --yes --scope girumteenexus-8292s-projects --project pilot-hrba-e-learn-v1-wajj
```

The first deployment attempt without `--project` failed before deployment because the local folder was not linked to a Vercel project. The successful deployment targeted the existing official project explicitly and did not create a new project.

## Official Production Alias Verification

- Official production URL fetched: `https://pilot-hrba-e-learn-v1-wajj.vercel.app`
- Deployed JS asset filename: `/assets/index-OJrecxNB.js`
- Production alias changed away from stale asset `/assets/index-D1T-29i7.js`: yes
- Live asset string check:
  - `launchToken`: present
  - `portalOrigin`: present
  - `cso-learning-hub:external-course-progress`: present
  - `userId`: absent
  - `learnerId`: absent
  - `enrollmentId`: absent
  - `courseVersionId`: absent

## Final State

- Final git status before this report commit: clean.
- Remaining blocker: none.
- Certificate issuance remains the CSO Learning Hub responsibility; no HRBA-side certificate generation was added.
