# 06 — Workstation, GitHub and Git Flow

## Outcomes

Make a reviewable change and recover without rewriting shared history.

## Prerequisites

Lessons 01–05. Approved terminal/editor and sandbox GitHub repository; no Docker yet.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Working tree → staging → commit → remote. A PR is a review proposal, not a deployment. Git flow is one option; trunk-based development reduces long-lived branches but needs suitable release controls.

## Worked Example

A hotfix starts from the released state and must return to both main and develop. Revert adds history; reset/force push can erase shared context.

## Guided Lab

1. From repository root run `git --version`, `node --version`, `npm --version`; use Node >=22.22.3 <23.
2. Run `bash labs/git/rehearsal.sh` and inspect the retained sandbox graph.
3. In your own sandbox create `feature/acceptance-notes`, edit one file, inspect `git diff`, stage that file, inspect `git diff --cached`, commit and open a PR.

## Expected Results

Rehearsal completes release/hotfix/conflict/revert; the PR contains purpose, evidence, risks and rollback, without credentials.

## Independent Challenge

Modify a file after staging and explain the difference between staged and unstaged content before committing.

## Troubleshooting

Use Bash/WSL/Git Bash for shell scripts. Never use sudo npm or force push to work around authentication or ownership errors.

## Completion Checklist

- [ ] Recorded actual versions and working directory.
- [ ] Rehearsed conflict resolution and ordinary revert.
- [ ] Submitted or explicitly deferred a real PR.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain commit versus push versus deploy.
- [ ] Explain why reverting code cannot recover lost analytics events.

## Cleanup and Handoff

Retain your sandbox; return to repository root. Do not delete shared branches.

## References

- [Official/source reading](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- [Learning guide](learning-guide.md)

---

[Previous: Exploratory Testing and Initial Defect Reports](05-exploratory-testing.md) · [Curriculum](../../README.md) · [Next: HTTP, REST and Browser Investigation](07-http-rest.md)
