# 26 — Accessibility and Compatibility

## Outcomes

Combine automated findings with manual user-oriented checks.

## Prerequisites

Lessons 16–17; Chromium and an approved local storefront.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Automated tools detect some issues, not total accessibility conformance. Keyboard order, visible focus, meaningful labels and understandable errors require human evaluation. Browser/device coverage is a risk decision.

## Worked Example

An unlabeled input is detectable by an automated rule. A confusing keyboard journey may require a manual walkthrough even when automated checks are green.

## Guided Lab

1. Run the controlled accessibility fixture tests in `labs/qe-code/e2e/accessibility.spec.ts`.
2. Run the separate storefront audit and review findings without suppressing them to make the result green.
3. Use keyboard only to navigate product/cart/checkout, inspect focus and error handling, and compare approved browser/device combinations.

## Expected Results

Known fixture violations are detected; real store findings are evidence, not hidden failures or a conformance certificate.

## Independent Challenge

Remove a label in a sandbox and verify the relevant rule catches it; explain a manual issue the rule cannot detect.

## Troubleshooting

Do not treat viewport emulation as a physical-device test or a single browser as compatibility coverage.

## Completion Checklist

- [ ] Recorded automated and manual results separately.
- [ ] Linked findings to user impact and remediation.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain limitations of automated accessibility.
- [ ] Explain the selected browser/device coverage.

## Cleanup and Handoff

Restore fixture changes; redact checkout/session artifacts.

## References

- [Official/source reading](https://www.w3.org/WAI/test-evaluate/)
- [Learning guide](learning-guide.md)

---

[Previous: Performance and Observability](25-performance-observability.md) · [Curriculum](../../README.md) · [Next: Security and Data, AI and Product Governance](27-security-governance.md)
