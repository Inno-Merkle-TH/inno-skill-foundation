# Safety Checklist

- [ ] Use synthetic data and offline checkout only.
- [ ] Keep credentials, cookies, real UID and raw HAR out of shared artifacts.
- [ ] Test only owned or explicitly authorized systems.
- [ ] Never bypass consent to improve tracking completeness.
- [ ] Keep public tunnels off until owner-reviewed endpoint checks pass.
- [ ] Do not expose local admin, database or debug ports.
- [ ] Do not reset shared volumes or overwrite primary data.
- [ ] Distinguish mock/local/device/live evidence and unavailable checks.
- [ ] Stop load/failure drills on unexpected traffic or resource pressure.
- [ ] Escalate actual leaks and revoke/rotate through the owner; deleting one commit is not remediation.

[Learning guide](../handbook/learning-guide.md) · [Governance](../handbook/27-security-governance.md)
