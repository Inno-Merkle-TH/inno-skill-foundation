# Test-Data Plan

Use synthetic data. Fill this artifact for a specific version/environment; distinguish verified evidence from assumptions and unexecuted work. Keep it in your own sandbox, not as pre-completed course evidence.

## Record

- Datasets and purpose:
- Synthetic generation and seed:
- Ownership by run/worker:
- Unique IDs and dependencies:
- Safe setup/reset/retention:
- Read/write permissions:
- Reconciliation and cleanup checks:

## Worked Example

Each API test owns a temporary directory; browser tests create unique synthetic emails. Never assert global order counts while other tests are writing.

## Self-Check

- [ ] Every decision has evidence or an explicit uncertainty.
- [ ] Version, scope and owner are clear enough for another person to act.
- [ ] Links are accessible and artifacts contain no credentials or personal data.
- [ ] Next actions and cleanup are recorded; no scores or implied certification.
