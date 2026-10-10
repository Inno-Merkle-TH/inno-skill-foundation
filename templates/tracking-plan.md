# Tracking Plan

Use synthetic data. Fill this artifact for a specific version/environment; distinguish verified evidence from assumptions and unexecuted work. Keep it in your own sandbox, not as pre-completed course evidence.

## Record

- Event/version and business meaning:
- Exact trigger and source of truth:
- Fields/types/units/items mapping:
- Consent and revoke behavior:
- Event ID and retry policy:
- Transaction-level duplicate definition:
- UTC reconciliation window and late allowance:
- Eligible denominator/exclusion reasons:
- PII allowlist/access/retention:
- Quality thresholds and escalation owner:

## Worked Example

purchase: completed synthetic WooCommerce order, 19900 minor units THB, matching item quantity and granted consent. The reference collector implements purchase only; view_item/add_to_cart need additional schemas and instrumentation.

## Self-Check

- [ ] Every decision has evidence or an explicit uncertainty.
- [ ] Version, scope and owner are clear enough for another person to act.
- [ ] Links are accessible and artifacts contain no credentials or personal data.
- [ ] Next actions and cleanup are recorded; no scores or implied certification.
