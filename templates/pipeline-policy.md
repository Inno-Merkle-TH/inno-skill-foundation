# Continuous Testing Policy

Use synthetic data. Fill this artifact for a specific version/environment; distinguish verified evidence from assumptions and unexecuted work. Keep it in your own sandbox, not as pre-completed course evidence.

## Record

- Trigger and candidate SHA:
- Required suite and scope rationale:
- Runner/services/readiness:
- Permissions and secrets:
- Timeout/concurrency limits:
- Failure handling and quarantine owner/expiry:
- Artifact allowlist and retention:
- Deployment checks/rollback:
- Unavailable execution routes:

## Worked Example

PR gates run bounded synthetic checks. Recovery and mobile need explicit environments; a skipped device suite is not green device evidence.

## Self-Check

- [ ] Every decision has evidence or an explicit uncertainty.
- [ ] Version, scope and owner are clear enough for another person to act.
- [ ] Links are accessible and artifacts contain no credentials or personal data.
- [ ] Next actions and cleanup are recorded; no scores or implied certification.
