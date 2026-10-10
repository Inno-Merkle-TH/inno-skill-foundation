# Recovery Report

Use synthetic data. Fill this artifact for a specific version/environment; distinguish verified evidence from assumptions and unexecuted work. Keep it in your own sandbox, not as pre-completed course evidence.

## Record

- Scenario/preconditions/baseline:
- Target RTO/RPO agreed before drill:
- UTC outage/detection/recovery times:
- Requests/errors/business outcomes:
- Observed recovery duration and data loss/duplicates:
- Orders count/value and event state before/after:
- Snapshot identity/integrity:
- Isolation from primary and asset checks:
- Stores not covered and remaining SPOFs:
- Remediation owner and release decision:

## Worked Example

Core backup covers commerce DB and wp-content, not eventdb/LINE/GA4. An isolated restore pass does not prove every downstream store recovered.

## Self-Check

- [ ] Every decision has evidence or an explicit uncertainty.
- [ ] Version, scope and owner are clear enough for another person to act.
- [ ] Links are accessible and artifacts contain no credentials or personal data.
- [ ] Next actions and cleanup are recorded; no scores or implied certification.
