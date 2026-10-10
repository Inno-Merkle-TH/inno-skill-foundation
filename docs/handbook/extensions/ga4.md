# E03 — GA4 Ecommerce Verification

## Outcomes

Map business events to GA4 and investigate collection versus reporting differences.

## Prerequisites

Lesson 23 and consent/security fundamentals. A live lab requires an approved test property; offline mapping needs no account.

## Concepts

GA4 consumes event data; commerce remains the order source of truth. DebugView, collection and processed reporting are different stages. Currency mapping needs explicit units.

## Worked Example

For this THB lab, valueMinor 19900 maps to value 199. Map transactionId to transaction_id and items to GA4 item fields; do not send the lab payload unchanged.

## Guided Lab

1. Offline: map view_item/add_to_cart/begin_checkout/purchase using the tracking-plan template. Only purchase exists in the reference collector; other instrumentation must be developed.
2. Create valid, denied-consent, wrong-money, duplicate and PII-leak payload examples; assert the mapper and consent gate in a sandbox without calling Google.
3. Optional live: create a test property/web stream with reviewed ownership and retention. Instrument through approved gtag/GTM, without purchasing a plugin or placing API secrets in the browser.
4. Inspect network and DebugView, then compare processed reports using aligned timezone/window and eligibility. Test blocker, revoke, redirect and refresh cases.

## Expected Results

A valid debug event is not proof of full reporting completeness. Record collection, processing delay, deliberate exclusion and genuine defects separately.

## Independent Challenge

Explain why order totals exceed reported purchases without treating all denied-consent orders as defects.

## Troubleshooting

Check consent, stream, debug mode, mapping and network before repeatedly creating purchases. Never use server-side collection to bypass consent.

## Completion Checklist

- [ ] Created mapping and negative fixtures.
- [ ] Recorded live results or explicitly marked them unexecuted.
- [ ] Excluded email/UID/tokens from payloads.

## Understanding Checklist

- [ ] Explain order truth versus analytics reporting.
- [ ] Explain why decimal conversion cannot blindly assume every currency has two decimals.

## Cleanup and Handoff

Disable debug instrumentation and test access as appropriate; retain only synthetic evidence. BigQuery is not required.

## References

- [Official documentation](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Learning guide](../learning-guide.md)
- [Evidence template](../../../templates/learning-evidence.md)

[Curriculum](../../../README.md)
