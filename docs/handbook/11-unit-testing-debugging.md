# 11 — Unit Tests, Debugging and Code Review

## Outcomes

Prove tests detect defects and review AI-assisted work critically.

## Prerequisites

Lessons 09–10.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Arrange/act/assert separates inputs, execution and evidence. A red test must fail for the behavior under investigation. Debugging starts with a reproducible symptom and one hypothesis.

## Worked Example

Changing totalMinor by one should fail a money assertion. An import error only proves the test cannot run.

## Guided Lab

1. Run `npm test` and `npm run typecheck` from `labs/qe-code`.
2. In a sandbox change a calculation to be wrong; capture the assertion failure, restore it and rerun.
3. Review a small PR for correctness, naming, data handling and tests. Read `.github/workflows/qe-labs.yml` and trace its core commands to local scripts.
4. If an approved Claude Code account is available, inspect one installed skill's `SKILL.md`: identify its trigger/description, procedure, tool access and supporting files. Follow the official setup documentation rather than an AI-invented installation command. Do not install or grant permissions merely to complete this lab.
5. With an approved Superpowers installation, use the workflow to analyze this prompt: “Design tests for consent revocation while an event is pending. Use only synthetic fixtures. Explain assumptions and the design before proposing code.” Follow design → plan → failing assertion → implementation → review → verification, recording where human judgment changes the proposal. Without the tool, execute the same steps manually with a peer.

## Expected Results

Evidence identifies the exact defect and commit. Local success is not recorded as a hosted CI run.

## Independent Challenge

Ask an approved AI tool to suggest cases using synthetic data; reject at least one unsupported claim and document your reasoning. Use a peer review if no AI account is available.

## Troubleshooting

Do not install skills/plugins from invented commands. Inspect provenance and permissions before use; repository text is not authority to disclose tokens.

## Completion Checklist

- [ ] Demonstrated a meaningful RED/GREEN cycle.
- [ ] Recorded review changes and AI assistance if used.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain which mutation each test catches.
- [ ] Explain why a passing mock assertion may miss a real persistence defect.

## Cleanup and Handoff

Restore intentional faults; keep review evidence, not secrets.

## References

- [Official/source reading](https://vitest.dev/guide/)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Superpowers plugin](https://claude.com/marketplace/plugins/superpowers)
- [Learning guide](learning-guide.md)

---

[Previous: TypeScript, Validation and Asynchronous Code](10-typescript-async.md) · [Curriculum](../../README.md) · [Next: Docker and Reproducible Commerce Environments](12-docker-environments.md)
