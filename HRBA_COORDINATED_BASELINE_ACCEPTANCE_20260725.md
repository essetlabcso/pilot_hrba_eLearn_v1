# Coordinated HRBA–Hub Baseline Acceptance

Date: 2026-07-25

## Decision

The following exact commits are accepted as the coordinated technical
baseline for the full HRBA course update branch:

- HRBA:
  `7f6bad961b3d94c4ded5fa9ad1f066a73a6dfae3`;
- Hub contract:
  `39dfa68866a9fad81ff6f89c20b2420b8928fc07`.

This acceptance authorizes Module 4 or Module 5 update work on
`feature/hrba-full-course-update-20260725`. It does not authorize a production
promotion or merge either Draft PR.

## Matched Previews

- Public HRBA Preview:
  `https://hrba-public-baseline-7f6bad9.vercel.app`
  (`dpl_xtHWnQQfT6GCn2QX7CLYQzXseKgN`);
- Matched Hub Preview:
  `https://hrba-hub-baseline-qa-20260725.vercel.app`
  (`dpl_421rLhGWeDoGFRKv4EJT56aZ1TGL`).

The HRBA Preview was built from a detached checkout of exact commit `7f6bad9`.
The Hub Preview was built from a clean detached checkout of exact commit
`39dfa688` and configured to launch only the public HRBA acceptance Preview.
Neither deployment was promoted to production.

The replacement HRBA Preview returned the actual course to a signed-out
browser without a Vercel access interstitial, `X-Frame-Options`, or a
deployment-level CSP override. It loaded successfully inside the matched Hub
iframe. The HRBA application-level launch-token, exact-origin postMessage,
learner-state-key, storage namespace, progress evidence, assessment, and
certificate-authority protections were unchanged.

## Acceptance results

| Criterion | Result | Evidence |
| --- | --- | --- |
| Invitation activation and HRBA launch | Pass | Invited learner A activated one individual assignment and launched the exact HRBA Preview from My Courses. |
| Progress retained after sign-out/sign-in | Pass | Learner A retained the 100% passed result; learner B retained separate 18% partial progress. |
| Same-browser learner isolation | Pass | Learners used different opaque portal storage namespaces; learner B saw no learner A assessment or certificate state; learner A remained complete. |
| Five modules and Final Assessment accessible | Pass | The five named module entries and unlocked Final Assessment were present in the authenticated iframe. |
| Assessment scoring and completion | Pass | Learner A submitted all ten correct answers and received `100% — 10 of 10`. |
| Hub completion recording | Pass | Hub enrollment reached `COMPLETED`, `progressPercent=100`, with one passed assessment attempt. |
| Certificate generation | Pass | One Hub certificate was issued and displayed for learner A and the accepted course. |
| Administrator invitation and monitoring | Pass | Both invitations appeared as `Activated`; completion and certificate monitoring remained available. |
| No P1/P2 issue | Pass | No P1/P2 defect was observed in the matched acceptance scope. |

## Regression evidence

- Matched end-to-end browser acceptance: 10/10 checks passed.
- HRBA automated tests: 38 passed, 0 failed.
- HRBA build: passed in Vercel from exact commit `7f6bad9`.
- HRBA lint: 0 errors, 5 pre-existing hook warnings.
- HRBA production-dependency audit: 0 vulnerabilities.
- Hub external-course contract verifier: passed.
- Hub external-course learner-isolation verifier: passed.
- Hub course-invitation activation verifier: passed.
- Hub course-invitation management verifier: passed.

The matched run used disposable staging identities. Test credentials and
staging records were removed after evidence capture. Course metadata was
restored to its normal staging value after the run.

## Production boundary

No live-pilot deployment, alias, branch, or database was promoted or changed
by this acceptance pass. HRBA production remained on its previously verified
assets and release state. The accepted commits remain Draft-PR technical
baselines until separately reviewed and released.
