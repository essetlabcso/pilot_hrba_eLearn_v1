# HRBA Pilot Final Version Preservation Report

Date: 2026-07-06

## Purpose

Preserve the exact live Vercel HRBA course version and separately preserve the current local final pilot screen candidate without deploying.

## Live Version Preserved

- Live Vercel URL: https://pilot-hrba-e-learn-v1-wajj.vercel.app
- Known live Vercel commit: `bf71cc759c5127b42be32b4e07289e414e9b91d8`
- Archive branch: `archive/hrba-live-vercel-bf71cc7`
- Archive tag: `hrba-live-vercel-bf71cc7`
- Archive branch and tag both point to commit `bf71cc759c5127b42be32b4e07289e414e9b91d8`.

## Local Final Pilot Candidate Preserved

- Candidate branch: `candidate/hrba-pilot-final-screens`
- Candidate source base before local candidate commit: `9df3c164b54921e049a557029a09f3595234e733`
- Candidate commit: `19f24011bc22eb09382b30f4ee3bb750c95cf33f`
- Candidate commit message: `Commit final HRBA pilot screen candidate`

## Files Committed In Candidate

- `src/App.tsx`
- `src/components/player/CoursePlayerShell.tsx`
- `src/styles/global.css`
- `src/components/course/Module1Renderer.tsx`
- `src/components/course/module2-final/Module2FinalRenderer.tsx`
- `src/components/course/Module3RevisedRenderer.tsx`
- `src/components/course/Module5Renderer.tsx`
- `src/components/course/FinalAssessmentRenderer.tsx`
- `src/components/course/finalAssessment.css`

## Verification Results

- Build: passed with `npm run build`.
- Lint: passed with `npm run lint`.
- Lint warnings: 5 existing React hook warnings, no errors.
- Typecheck: no separate `typecheck` script is defined in `package.json`; TypeScript build ran through `npm run build`.
- Build warnings: Vite reported large chunk warnings and plugin timing notes; these are non-blocking build warnings.

## Safety Confirmations

- No deployment was performed.
- No files were discarded, reverted, or overwritten.
- No unrelated files were committed.
- No secrets, `.env` files, `node_modules`, `dist` build output, cache folders, screenshots, or temporary files were committed.
- The live Vercel version and the local final pilot candidate are preserved separately so deployment decisions can be made deliberately.

## Recommended Next Step

Deploy the candidate branch to a Vercel preview or production only after explicit owner approval. Until then, keep production on the archived live version and use `candidate/hrba-pilot-final-screens` for final review.
