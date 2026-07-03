# HRBA Latest Pilot Release Candidate Report

## Release Candidate

- Branch: `release/hrba-pilot-latest-launchtoken`
- Release content commit: `eb55f31`
- LaunchToken integration commit present: yes, `82ce48d Update HRBA app portal launch token handling`
- Deployment status: not deployed

## LaunchToken Integration Verification

- `src/integration/portalContext.ts` parses `embed=portal`, `portalOrigin`, `courseSlug`, and `launchToken`.
- Portal mode does not require `userId`, `learnerId`, `enrollmentId`, or `courseVersionId`.
- `src/integration/hubProgress.ts` sends `launchToken` in progress messages.
- `src/App.tsx` sends final assessment payloads through `sendHubProgressMessage`, so the final assessment message also carries `launchToken`.
- Raw Hub internal IDs are not part of the URL or postMessage contract.
- HRBA-side certificate generation is not implemented; certificate issuance remains a CSO Learning Hub responsibility.

## Accepted Content and App Changes Included

- Latest accepted Module 2 version included, with the polished Module 2 final renderer, cover/orientation flow, visual styling, shared takeaway/listen icons, and reference deck resource.
- Latest Module 3 refinements included, including updated screen sequencing, integrated design repair flow, integrated draft plan review flow, Module 3 resource templates, Screen 5 audio support, layout containment styling, and Screen 20 knowledge check polish.
- Module 3 Screen 20 refinements included:
  - Removed the "This is not a memory test..." sentence.
  - Kept the shorter intro as one paragraph.
  - Correct response labels use "Correct!".
  - Incorrect response labels use "Not quite!".
  - Removed "Strong choice" and "Area to strengthen" prefixes from per-question feedback.
  - Kept "Area to strengthen" only in final summary feedback.
- Corrected "Not quit!" to "Not quite!" in Module 3 Screen 20.
- Accepted Module 4 app/content updates included, including the added `/module-4/screen-4-14` route and revised Module 4 screen metadata/content.
- Accepted player/global style updates included where required by the current course screens.

## Files Excluded

- Excluded generated QA/evidence folders under `docs/course-pilot-readiness`, `docs/evidence`, and `docs/qa` because they are not deployed app assets.
- Excluded unreviewed documentation folders/files under `docs/module-review`, `docs/prompts`, and `docs/hrba-pilot-launch-package-index.md`.
- Excluded untracked certificate template `public/assets/certificates/templates/hrba-certificate-template.png`.
- Restored the accidental deletion of `public/assets/certificates/templates/certificate_template.png`; certificate templates are not part of this HRBA release candidate.
- No local environment files, Vercel metadata, generated logs, or temporary screenshots were committed.

## Checks

- `npm run lint`: passed with 5 existing React hook warnings.
- `npm run build`: passed.
- Test script: none defined in `package.json`.

## Built Asset String Check

- Built JS asset: `dist/assets/index-OJrecxNB.js`
- Contains:
  - `launchToken`: yes
  - `portalOrigin`: yes
  - `cso-learning-hub:external-course-progress`: yes
- Does not contain:
  - `userId`: yes
  - `learnerId`: yes
  - `enrollmentId`: yes
  - `courseVersionId`: yes

## Final Readiness

- Repo clean after release content commit and before report creation: yes.
- Ready for Vercel deployment: yes, after this report commit, provided deployment is run from this branch and the working tree remains clean.
