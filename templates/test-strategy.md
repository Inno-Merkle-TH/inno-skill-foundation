# Test Strategy

Use synthetic data. Fill this artifact for a specific version/environment; distinguish verified evidence from assumptions and unexecuted work. Keep it in your own sandbox, not as pre-completed course evidence.

## Record

- Product scope and candidate version:
- Quality risks and priority rationale:
- Test levels and coverage approach:
- Functional/non-functional scope:
- Environment and data constraints:
- Entry/exit evidence and release decision owners:
- Out-of-scope risks and review triggers:

## Worked Example

Risk: duplicate synthetic resource after retry. Evidence: isolated API idempotency tests. Separately, browser tests verify a single checkout; WooCommerce checkout retries and production payment-provider behavior remain unverified.

## Self-Check

- [ ] Every decision has evidence or an explicit uncertainty.
- [ ] Version, scope and owner are clear enough for another person to act.
- [ ] Links are accessible and artifacts contain no credentials or personal data.
- [ ] Next actions and cleanup are recorded; no scores or implied certification.
