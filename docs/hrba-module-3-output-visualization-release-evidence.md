# Module 3 Output-Visualization Release Evidence

Date: 2026-07-17

## Release purpose

This record archives the merge, deployment, and deployed-environment acceptance evidence for the Module 3 output-visualization release. The release adds and polishes learner-facing visual structures while preserving the established Module 3 state, payload, route, persistence, progression, portfolio, download-control, Final Snapshot, and Module 4 handoff contracts.

The accepted decision is:

**DEPLOYED WITH P3 BACKLOG — ready for HRBA pilot use**

## Source and release identity

- Source feature branch: `feature/module3-output-visual-polish`
- Source feature commit: `ddd47968f7d3c44e90c98e21f14041ec9c86823d`
- Release branch: `release/hrba-pilot-final`
- Deployed merge commit: `22f9448736f126a5eb7cbed111606daae4b25a71`
- Merge parent 1, previous safe release: `15df88c0b849ad2921a049508dad5b0db0f73fcf`
- Merge parent 2, source feature tip: `ddd47968f7d3c44e90c98e21f14041ec9c86823d`
- Merge result: conflict-free, with the required two-parent topology

## Deployment evidence

- Provider: Vercel
- Vercel project: `girumteenexus-8292s-projects/pilot-hrba-e-learn-v1-wajj`
- Target: production alias used for the approved HRBA pilot environment
- Deployment identifier: `dpl_4UTTSsAsyn2dAct8qJsTxQ71oTvG`
- Immutable deployment URL: https://pilot-hrba-e-learn-v1-wajj-7d7qsz4wj.vercel.app
- Pilot URL: https://pilot-hrba-e-learn-v1-wajj.vercel.app
- Deployment date: 2026-07-17
- Provider result: `READY`
- Pilot URL response after deployment: HTTP 200

The deployed JavaScript and CSS asset hashes matched a deterministic local build made from the clean isolated worktree at the deployed merge commit. This establishes deployed-commit fidelity independently of visual similarity.

This evidence record was prepared after deployment. It does not change the deployed application commit and must not cause a redeployment.

## Changed-file and commit scope

Relative to the previous safe release, the merge contains 12 changed files, 7,269 insertions, and 1,323 deletions:

- `public/assets/hrba/modules/module-3/case/m3-s03-case-overview-jiru-amba.webp`
- `public/assets/hrba/modules/module-3/snapshot/m3-s04-snapshot-overview-empty.webp`
- `public/assets/resources/module-3/module-3-orientation-guide.pdf`
- `src/App.tsx`
- `src/components/course/Module3Batch2Screens.tsx`
- `src/components/course/Module3RevisedRenderer.tsx`
- `src/components/course/module3-batch2.css`
- `src/components/course/module3-revised.css`
- `src/components/course/module3Batch2State.ts`
- `src/components/player/CoursePlayerShell.tsx`
- `src/data/module3/jiruAmbaCaseNarrative.ts`
- `src/data/module3/module3RevisedScreens.ts`

The accepted history covers Module 3 opening/orientation refinements, the manually tested functional baseline, simple UI/UX polish, Wave 1 visualizations, Batch A/B/C output polish, and the final scoped integrated visual-regression correction. The last source commit is `ddd4796 fix(module3): close integrated visual regression defects`.

## Build and repository validation

- `npm run build`: passed
- TypeScript compilation through the production build: passed
- `npm run lint`: passed with zero errors and the same five known React Hook warnings
- `git diff --check`: passed
- Isolated release worktree before deployment: clean
- Release branch and remote before deployment: synchronized at the deployed merge commit

## Deployed responsive results

- Desktop 1440 x 900: passed with no clipping, card overlap, or page-level horizontal overflow.
- Mobile 390 x 844: passed with long learner text wrapping and no page-level horizontal overflow.
- Internal Screen 17: the progress chip wrapped inside its card at 390 x 844; document width remained 390/390.
- Internal Screen 21: the progress chip wrapped inside its card at 390 x 844; document width remained 390/390 and the saved snapshot remained current.
- Extra-large text: passed at the mobile viewport without overflow.
- High-contrast mode: passed; status meaning remained available in text.
- Reduced-motion mode: passed; transitions were reduced effectively to zero.

## Deployed output smoke-test matrix

| Output | Deployed result | Evidence summary |
| --- | --- | --- |
| Screen 5 — Context and Inequality Scan | Pass | Learner-generated context output loaded, grouped correctly, restored, and retained its structured text. |
| Screen 7 — Rights-Holder and Barrier Map | Pass | Rights-holder and barrier output loaded with learner values and no example content presented as learner data. |
| Screen 9 — Power and Influence Map | Pass | Power/influence grouping and learner-generated actor information rendered correctly. |
| Screen 13 — Risk and Do-No-Harm Board | Pass | Risk output, status labels, and structured text loaded without deployment-specific styling failures. |
| Screen 14 — HRBA Project Design Repair | Pass | Repaired design output restored and its existing download controls remained available. |
| Screen 17 — Draft Plan Review and Repair | Pass | Draft review output loaded; desktop and corrected 390 x 844 presentation passed. |
| Screen 21 — Final HRBA Project Design Improvement Snapshot | Pass | Authoritative content, review states, saved/current state, downloads, and continuation rules passed. |

No tested output was silently removed or overwritten, and no fictional example content appeared as authoritative learner data.

## Final Snapshot, persistence, and continuation

- All 14 authoritative Final Snapshot sections loaded.
- The Applied Knowledge Check completed at 10/10 using safe fictional/generalized test state.
- After an upstream completion change, Screen 21 correctly showed `Update required`.
- Updating the snapshot produced 14 `Review required` sections.
- The required review gate remained enforced until all 14 sections were reviewed.
- Saving remained disabled until the authoritative review was complete.
- After review and save, the status became `Saved · Current`.
- Refresh restored `Saved · Current` and `14/14 sections reviewed`.
- The optional own-CSO note remained separate from the required Jiru Amba snapshot.
- Closure remained reachable only through the existing valid pathway.
- The closure acknowledgement checkbox continued to govern the Module 4 action.

## Module 4 handoff

- The existing handoff opened `/module-4/cover` successfully.
- The Module 4 heading and course shell loaded correctly.
- Implementation watch-points remained available on Module 3 closure.
- Returning to Screen 21 preserved the saved Final Snapshot.
- No Module 4 route, shell, or handoff regression was observed.

## Download evidence

- Analytical output: `context-and-inequality-scan-template-pack.pdf` downloaded as a real PDF, rendered cleanly, and contained the expected safe analytical prompts.
- Design-repair output: the expected Word-labelled download started and contained readable learner-facing content.
- Final Snapshot: both Word-labelled and Markdown downloads started with the expected filenames and authoritative section content.
- No visual-only status label contamination was observed in the representative downloaded content.

The Word-export format limitation is recorded below as a non-blocking P3 follow-up.

## Console, network, assets, and cross-module smoke

- Browser Console: zero application errors and zero new application warnings.
- Network and assets: tested routes returned HTTP 200; no missing bundle, broken chunk, stale-cache, authentication, or API failure appeared.
- Deployed assets matched the local release build: JavaScript `index-Y6mcjyQx.js`; CSS `index-BPTLMz6V.css`.
- Course overview and direct Module 3 entry passed.
- Browser Back/Forward and Module 3 Previous/Next behavior passed.
- Representative Module 1, Module 2, Module 3, Module 4, and Module 5 routes loaded.
- No Module 3-scoped CSS leakage or unrelated learner-facing content change was observed.

## Non-blocking follow-up items

### P3 — Word-export format

Some Module 3 `.docx` downloads contain valid readable learner content but are legacy HTML documents carrying a `.docx` extension rather than true OOXML Word files.

Recommended future correction: route all Word exports through the repository's valid OOXML/DOCX exporter while preserving filenames, learner content, schemas, and download controls.

### Manual verification note — native 200% browser zoom

Equivalent reflow testing passed through extra-large text and a 390px viewport, but native 200% browser zoom was not independently reproduced by the browser automation tool.

### Manual verification note — native keyboard traversal

Native control semantics, logical document order, and focus-visible styles were confirmed, but full native Tab traversal was not independently reproduced by the browser automation tool.

These follow-up items do not change the release decision.

## Manual pilot acceptance checklist

- [ ] Open https://pilot-hrba-e-learn-v1-wajj.vercel.app.
- [ ] Verify sign-in or the intended pilot-access pathway.
- [ ] Enter Module 3.
- [ ] Open and inspect one learner-generated output.
- [ ] Check internal Screen 17 on a mobile-sized browser.
- [ ] Check internal Screen 21 on a mobile-sized browser.
- [ ] Test native browser zoom at 200%.
- [ ] Complete one path using only the keyboard.
- [ ] Download one analytical output.
- [ ] Download the Final Snapshot.
- [ ] Continue through Module 3 closure to Module 4.
- [ ] Record any issue in the pilot issue log with route, device/browser, reproduction steps, and severity.

## Rollback reference

No rollback is recommended because no deployed P0 or P1 defect was found. If rollback is later authorized, the previous safe release reference is `15df88c0b849ad2921a049508dad5b0db0f73fcf`.

## Final release decision

**DEPLOYED WITH P3 BACKLOG — ready for HRBA pilot use**
