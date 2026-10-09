# 05 — Exploratory Testing and Initial Defect Reports

## Outcomes

Investigate a workflow with a focused charter and reproducible evidence.

## Prerequisites

Lessons 02–04. Use the supplied checkout scenario; browser execution follows environment setup.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Exploration combines learning, design and execution. A charter states the mission, risks, time box and evidence. A defect report separates observation, expectation and hypothesis.

## Worked Example

Charter: investigate consent changes around checkout for 20 minutes. Observation: order completes; analytics request is absent. This is not a defect if consent was denied.

## Guided Lab

1. Write a charter and a session log using synthetic observations or an available approved sandbox.
2. Separate factual observations, hypotheses and questions.
3. Create one defect report containing build, environment, preconditions, minimal steps, expected/actual behavior and impact.

## Expected Results

A teammate can reproduce the report or identify exactly what evidence is still missing.

## Independent Challenge

Rewrite a vague report (“checkout broken”) into reproducible steps; do not invent results.

## Troubleshooting

A missing timestamp or build makes comparisons unreliable. Never attach raw HAR containing credentials.

## Completion Checklist

- [ ] Time-boxed the charter and recorded coverage limits.
- [ ] Separated a hypothesis from a verified root cause.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain exploration versus unstructured clicking.
- [ ] Explain why expected consent exclusion is not automatically a defect.

## Cleanup and Handoff

Redact evidence; keep reports for lifecycle practice.

## References

- [Official/source reading](https://www.satisfice.com/exploratory-testing)
- [Learning guide](learning-guide.md)

---

[Previous: Systematic Test Design](04-test-design.md) · [Curriculum](../../README.md) · [Next: Workstation, GitHub and Git Flow](06-workstation-git.md)
