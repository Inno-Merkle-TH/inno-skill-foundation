# E01 — LINE Messaging API

## Outcomes

Build and test a signed webhook receiver without conflating notification and order success.

## Prerequisites

Lessons 22–24 and 27; owner-approved Provider binding before enabling API. Core has a signature helper, not a live bot.

## Concepts

Channel secret verifies webhooks; access token calls APIs; reply token is event-specific. Verify raw bytes before parsing. A verified empty events array should be handled without inventing an event.

## Worked Example

Whitespace changes to the raw body invalidate the existing signature even when parsed JSON means the same thing.

## Guided Lab

1. From `labs/qe-code` run `npm test -- line` and inspect signature tests using synthetic secrets.
2. In a sandbox implement POST /line/webhook, verify raw bytes before processing, accept signed empty events, persist dedup by webhookEventId and isolate reply processing.
3. Wire the route in core Nginx (and HA if used) to qe-api:3000; the current generic route goes to WordPress. Inject server-side secrets explicitly; labs/line/.env.example is not automatically loaded.
4. Open a fresh terminal at the repository root, run `cd labs/commerce`, then rebuild with `docker compose --profile tracking up -d --build qe-api proxy`. Verify local signed/unsigned requests before any tunnel.
5. After owner approval, enable Messaging API on the test OA under the reviewed Provider. Set the HTTPS webhook, use Verify, configure response modes and send one consenting test message.

## Expected Results

Offline helper tests prove signature behavior only. Live verification needs actual routing, credentials, event processing and reply evidence.

## Independent Challenge

Test duplicate redelivery, changed raw body, expired reply token and downstream outage. Invalid signature must have no processing side effect.

## Troubleshooting

Check raw bytes and correct channel secret; do not use IP allowlisting instead of signatures. A 200 stub is not a working bot.

## Completion Checklist

- [ ] Verified helper and receiver negative cases separately.
- [ ] Tested persistent dedup before live reply.
- [ ] Recorded account and endpoint owner approval.

## Understanding Checklist

- [ ] Explain secret versus access token versus reply token.
- [ ] Explain why notification failure must not change a completed order.

## Cleanup and Handoff

Disable the test webhook, stop the tunnel and restore the local URL; do not rotate shared credentials without owner coordination.

## References

- [Official documentation](https://developers.line.biz/en/docs/messaging-api/verify-webhook-signature/)
- [Learning guide](../learning-guide.md)
- [Evidence template](../../../templates/learning-evidence.md)

[Curriculum](../../../README.md)
