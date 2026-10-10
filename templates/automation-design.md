# Automation Design

Use synthetic data. Fill this artifact for a specific version/environment; distinguish verified evidence from assumptions and unexecuted work. Keep it in your own sandbox, not as pre-completed course evidence.

## Record

- System boundary and test levels:
- Package/configuration layout:
- Fixture lifetime and data ownership:
- Domain helpers versus assertions:
- Authentication and secret injection:
- Failure/timeout/retry policy:
- Reporting/redaction:
- Maintenance owner and change review:

## Worked Example

Keep Storefront actions thin. Tests explicitly assert completed order and event fields; the helper does not hide success assertions.

## Self-Check

- [ ] Every decision has evidence or an explicit uncertainty.
- [ ] Version, scope and owner are clear enough for another person to act.
- [ ] Links are accessible and artifacts contain no credentials or personal data.
- [ ] Next actions and cleanup are recorded; no scores or implied certification.
