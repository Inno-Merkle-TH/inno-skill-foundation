# 27 — Security and Data, AI and Product Governance

## Outcomes

Identify trust boundaries, decision owners and release-blocking risks.

## Prerequisites

Lessons 15, 21, 23. Apply safety constraints from the first lesson, not only here.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Governance defines who decides, what evidence is needed and who owns residual risk. Authentication does not imply authorization. Analytics consent and operational processing have different purposes.

## Worked Example

Owner A must not read B's order by changing an ID. A green functional suite cannot override a known credential leak or deliberate consent bypass.

## Guided Lab

1. Run the API ownership tests and review the public endpoint boundary before any tunnel.
2. Complete data inventory, access matrix and risk register for orders, sessions, events and LINE identity.
3. Review an AI-generated proposal using synthetic data; record permissions, provenance, accepted/rejected advice and human verification.
4. Conduct a tabletop secret leak: stop sharing, notify owner, revoke/rotate and investigate exposure, including history.

## Expected Results

Each risk has evidence, mitigation and an owner; unresolved legal decisions are explicitly routed to DPO/legal.

## Independent Challenge

Write an ADR rejecting “collect everything to improve completeness” while explaining legitimate operational data needs.

## Troubleshooting

Do not use audit fix --force blindly or claim an audit result proves security. Do not infer PDPA/GDPR applicability or legal deadlines from AI.

## Completion Checklist

- [ ] Tested unauthorized access and schema rejection.
- [ ] Identified retention/access and legal-review questions.
- [ ] Recorded a no-go despite functional success.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain why deleting the latest secret commit is insufficient.
- [ ] Explain why vendor assurances do not transfer all responsibility.

## Cleanup and Handoff

Keep only synthetic/redacted evidence; follow owner incident procedures for any real exposure.

## References

- [Official/source reading](https://owasp.org/www-project-web-security-testing-guide/)
- [Learning guide](learning-guide.md)

---

[Previous: Accessibility and Compatibility](26-accessibility-compatibility.md) · [Curriculum](../../README.md) · [Next: Reliability, Recovery and Cloud Concepts](28-reliability-cloud.md)
