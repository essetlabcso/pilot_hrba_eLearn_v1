# Authoritative HRBA and Hub Release Manifest

Last verified: 2026-07-23

This file identifies release lines by repository, ref, commit and deployment evidence. Directory names are never release authority.

## Standalone HRBA course

| Item | Authoritative identity |
| --- | --- |
| Repository | `essetlabcso/pilot_hrba_eLearn_v1` |
| Default branch | `main` (repository default only; not the pilot release branch) |
| Pilot release branch | `release/hrba-pilot-final` |
| Current release-branch tip | `4644156d0313014cb24a7cbde4f8451f1c0c4f83` |
| Current deployed application commit | `22f9448736f126a5eb7cbed111606daae4b25a71` |
| Post-deployment evidence commit | `4644156d0313014cb24a7cbde4f8451f1c0c4f83` |
| Vercel project | `girumteenexus-8292s-projects/pilot-hrba-e-learn-v1-wajj` |
| Production deployment | `dpl_4UTTSsAsyn2dAct8qJsTxQ71oTvG` |
| Immutable deployment URL | `https://pilot-hrba-e-learn-v1-wajj-7d7qsz4wj.vercel.app` |
| Pilot production alias | `https://pilot-hrba-e-learn-v1-wajj.vercel.app` |
| Current production assets | `index-Y6mcjyQx.js`, `index-BPTLMz6V.css` |
| Hub bridge contract | `launchToken`, `portalOrigin`, `courseSlug`, and `cso-learning-hub:external-course-progress`; no raw Hub learner, enrollment or version IDs |

The release-branch tip is newer than the deployed application commit because the tip includes post-deployment evidence only. A future deployment must be made from the exact reviewed merge commit, not inferred from the newest directory or local branch.

### Current Module 5 candidate

| Item | Identity/status |
| --- | --- |
| Draft PR | `essetlabcso/pilot_hrba_eLearn_v1#2` |
| Base | `release/hrba-pilot-final` at `4644156d0313014cb24a7cbde4f8451f1c0c4f83` |
| Feature branch | `feature/module5-hrba-meal-enhancement-20260722` |
| Candidate tip | `2a0f09ed1b102ad7b09d6aac78d86b15162789c0` |
| Merge/deployment state | Unmerged; not deployed |
| Standalone acceptance | Automated, desktop keyboard and native 200% zoom evidence passed |
| Remaining standalone check | Keyboard-only traversal at approximately 390 px |
| Remaining pre-merge checks | Keyboard-only traversal at approximately 390 px, reviewer approval, and Vercel-owner confirmation of whether release-branch merge auto-deploys production |
| Remaining pre-production check | Authenticated Hub 14-step acceptance against the approved staging backend |

## CSO Learning Hub

| Item | Authoritative identity |
| --- | --- |
| Repository | `essetlab/pilot_dec_cso` |
| Production branch | `main` |
| Current production commit | `4ba0233b5c8e391e37629e982240d44e21961c8d` |
| Current production deployment | `dpl_9T8arwDwiYQFozjFq6SMCxnhHqCF` |
| Current production deployment URL | `https://pilot-dec-d36atsf7e-esset-lab.vercel.app` |
| Vercel project | `esset-lab/pilot-dec-cso` |
| Final pilot candidate branch | `feature/pilot-registration-integration-checkpoint` |
| Final pilot candidate commit | `875c26e90c4a7d50aee0d6cac57c6787d6ef622e` |
| Candidate deployment | `dpl_4tu5mYkGqvtwT9fXmJ7RFm7ADpZc` |
| Candidate deployment URL | `https://pilot-dec-3t6heoepr-esset-lab.vercel.app` |
| Promotion state | Candidate is not production |

The Hub and HRBA course are separate release tracks. An HRBA module change must not modify Hub source, Hub production configuration or Supabase unless a verified integration defect requires a separately reviewed Hub change.

## Approved Hub staging backend

| Item | Status |
| --- | --- |
| Supabase project reference | `fgyxbzwdvngqlksyxuwa` |
| Project URL | `https://fgyxbzwdvngqlksyxuwa.supabase.co` |
| Operational role | Approved Hub staging project; the current fixtures have not been independently reverified because access is unavailable |
| Current access | Unavailable to the authenticated CLI (HTTP 403); available browser sessions were signed out at last verification |
| Module 5 dependency | None for standalone implementation or review; not required for merge if deployment is separately controlled, but required before merge if release-branch merge automatically deploys production; always required before production deployment |

Do not create a replacement project merely for a standalone module enhancement. Restore authorized access to this staging project when authenticated Hub acceptance is required.

## Local working-copy classification

| Path | Classification |
| --- | --- |
| `D:\eLearn_CDP_Lg_module5_clean_20260722` | Authoritative Module 5 feature worktree; use only for PR #2 and preserve unrelated local changes |
| `D:\eLearn_CDP_Lg_release_governance_20260723` | Isolated documentation-governance worktree based on the HRBA release branch; never use it as a deployment source |
| `D:\eLearn_CDP_Lg` | Non-authoritative dirty/stale root checkout; never merge or deploy from it |
| `D:\eLearn_CDP_Lg_deploy_clean` | Separate `pilot_hrba_eLearn_v2` launch-token deployment history; not the v1 Module 5 release source |
| `D:\z CDP-Lg-Andy-pilot-integration` | Authoritative clean Hub final-candidate worktree |
| `D:\z CDP-Lg-Andy-release-governance-20260723` | Isolated Hub documentation-governance worktree; never use it as a deployment source |
| `D:\z CDP-Lg-Andy-main-main` | Legacy feature worktree tracking the legacy origin; not the current Hub candidate |

Historical worktrees may be retained for provenance. They should be removed only through a separate, reviewed cleanup task after confirming they contain no unique uncommitted work.

## Change control

Update this manifest whenever one of these changes: reviewed release branch, deployed commit, immutable deployment ID, production alias target, Hub production/candidate identity, or approved staging backend. Every update must cite read-only Git/Vercel evidence and must not include secrets.
