# E02 — LINE Login and Verified Account Linking

## Outcomes

Design an OAuth/OIDC flow and verify identities before linking accounts.

## Prerequisites

Lessons 22, 27; reviewed Provider ownership; use a sandbox server. Core has no Login routes.

## Concepts

Login, friend status and analytics consent are independent. State binds the authorization response to the initiating session; nonce protects the OIDC flow. Decoding an ID token is not signature/claim verification.

## Worked Example

A callback with wrong state must not create a session even when its token looks valid. A valid LINE identity alone does not prove ownership of a WooCommerce account.

## Guided Lab

1. Offline: draw start → authorize → callback → token verification → session, then create a matrix for cancel/state mismatch/expired token/wrong audience/nonce/replay.
2. In a sandbox implement server-side /auth/line/start and callback, random session-bound state/nonce, vetted token verification and safe server sessions. Use a fake verifier only in unit tests; test the real verifier boundary separately.
3. Configure Nginx /auth/line/ to qe-api, server-only credentials and a trusted public origin. Rebuild proxy/API; verify local route behavior before the HTTPS callback.
4. Create the approved Login channel, set an exact callback URL and test actual consent/cancel/login behavior. Do not relax Secure/HttpOnly/session checks to make a local fake pass.
5. Implement an explicit verified account/session bridge if linking to WooCommerce; a Node session does not log the user into WordPress automatically.

## Expected Results

Offline design and local tests do not prove a live identity integration. Record route, token validation, session behavior and account ownership separately.

## Independent Challenge

Attempt to link user A's LINE session to user B's web order. Require proof of ownership on both sides and reject mismatch.

## Troubleshooting

Compare scheme/domain/path with Console exactly. Never use wildcard callbacks or client UID as authorization.

## Completion Checklist

- [ ] Recorded state/nonce/replay negative matrix.
- [ ] Tested the real verification boundary if implemented.
- [ ] Separated standalone Login from commerce account integration.

## Understanding Checklist

- [ ] Explain why base64 decoding is insufficient.
- [ ] Explain why login does not imply friend status or analytics consent.

## Cleanup and Handoff

Log out the test session; close the tunnel and redact tokens/callback secrets from evidence.

## References

- [Official documentation](https://developers.line.biz/en/docs/line-login/integrate-line-login/)
- [Learning guide](../learning-guide.md)
- [Evidence template](../../../templates/learning-evidence.md)

[Curriculum](../../../README.md)
