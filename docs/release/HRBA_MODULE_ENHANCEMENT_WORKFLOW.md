# HRBA Module Enhancement and Hub Release Workflow

## Governing rule

Start from a verified remote commit in the release manifest. Never treat a folder name, the default branch, a dirty checkout, a prior deployment worktree or a historical package as release authority.

## Release stages

1. **Baseline verification**
   - Fetch both remotes and verify the manifest against GitHub and Vercel metadata.
   - Confirm the HRBA release branch, deployed commit and production asset identity.
   - Confirm the Hub production commit and the Hub candidate used for integration acceptance.
   - Stop if any identity is ambiguous.
2. **Clean implementation branch**
   - Create an isolated worktree from the current remote HRBA release branch.
   - Create one module-scoped feature branch.
   - Record the exact parent commit before editing.
   - Do not implement the module in Hub source.
3. **Implementation acceptance**
   - Preserve routes, shell, navigation, progress, state, migrations, portfolio carry-forward, accessibility controls and learner data unless the approved scope explicitly changes them.
   - Run unit, interaction, hydration, migration, download/offline, route, completion, accessibility, responsive and cross-module regressions proportionate to the change.
   - Keep implementation commits separate from evidence-only commits.
4. **Draft PR and human evidence**
   - Target `release/hrba-pilot-final`, not `main`.
   - Keep the PR Draft until automated and required human checks are recorded.
   - Record untested checks as untested; responsive emulation is not a substitute for native keyboard or zoom evidence.
5. **Preview and Hub integration**
   - Deploy a preview only from a clean, reviewed commit in the existing HRBA Vercel project.
   - Use the Hub final candidate and approved staging backend for authenticated launch, callback, assessment, completion, certificate, isolation and retained-completion testing.
   - Do not copy production credentials or use production learner accounts.
   - Do not send detailed HRBA Canvas or learner-answer data to the Hub.
6. **Merge decision**
   - Require no open P0/P1 defect, complete required human acceptance, complete authenticated integration acceptance, clean diff, current evidence, and explicit reviewer approval.
   - Merge only the reviewed PR into the manifest release branch.
   - Record the resulting merge commit before deployment.
7. **Owner-controlled production deployment**
   - The owner of `girumteenexus-8292s-projects/pilot-hrba-e-learn-v1-wajj` confirms project access, production-branch behavior and the exact deployment source.
   - Build from a clean worktree at the reviewed merge commit.
   - Deploy to a preview first and compare generated assets with the local deterministic build.
   - After explicit production approval, deploy/promote only that commit to the existing project; never create or substitute a project or alias.
8. **Post-deployment closure**
   - Verify `/`, every module entry, representative direct routes and Final Assessment on the pilot alias.
   - Confirm production JS/CSS asset hashes match the reviewed build.
   - Confirm the Hub bridge markers remain present and raw Hub IDs remain absent.
   - Run the authenticated Hub smoke path, record the immutable deployment ID and update the manifest.
   - Preserve the previous immutable deployment as rollback evidence.

## Required Module 5 release gates

- [x] Correct HRBA base and isolated feature branch
- [x] Implementation and evidence commits pushed to Draft PR #2
- [x] Automated, responsive, desktop keyboard and native 200% zoom evidence
- [ ] Native keyboard-only traversal at approximately 390 px
- [ ] Authorized access to approved staging project `fgyxbzwdvngqlksyxuwa`
- [ ] Candidate Preview configured with usable non-production Hub settings
- [ ] Complete authenticated 14-step Hub acceptance
- [ ] Reviewer changes PR #2 from Draft only after all required evidence passes
- [ ] Vercel project owner confirms preview and production deployment source
- [ ] Merge commit recorded, preview verified and explicit production approval granted

## Owner confirmation gates

The Vercel project owner must confirm before any HRBA production action:

- the current project is `girumteenexus-8292s-projects/pilot-hrba-e-learn-v1-wajj`;
- whether Git integration can auto-deploy the release branch;
- that the selected preview was built from the reviewed merge commit;
- that promotion/deployment will retain `https://pilot-hrba-e-learn-v1-wajj.vercel.app`;
- that rollback to the previous immutable deployment is available.

Supabase owner or project-member access is required only for authenticated Hub testing. It is not a prerequisite for standalone HRBA development, build, keyboard/zoom checks or browser-local completion.

## Prohibited shortcuts

- Do not deploy from a dirty working tree.
- Do not merge module work into `main` merely because it is the repository default.
- Do not reuse v2, legacy or historical worktrees as the v1 release source.
- Do not modify Hub or Supabase to compensate for an unverified HRBA problem.
- Do not mark an integration check passed from source inspection alone.
- Do not change production aliases, production variables or learner data during acceptance testing.
