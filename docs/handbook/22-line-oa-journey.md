# 22 — LINE OA and Connected Customer Journeys

## Outcomes

Configure OA features before extending them with APIs.

## Prerequisites

Lessons 12, 16, 18; approved test LINE account and consenting test audience. Read public-tunnel safety in the learning guide.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

OA Manager controls business communication; Developers Console manages channels. OA Basic ID, Provider ID, Channel ID and a person's provider-scoped UID are different identifiers. Friend status, web login and analytics consent are independent.

## Worked Example

A rich-menu link uses the same shop with `utm_source=line&utm_medium=oa&utm_campaign=qe_lab`. Those parameters describe attribution, not the shopper's identity.

## Guided Lab

1. Create a clearly labelled test OA yourself in OA Manager. Configure profile, greeting, a help keyword response, manual chat and a rich menu with shop/help/order-information actions.
2. Test adding a friend, response modes and rich-menu visibility on a phone. Check current quota before one agreed test broadcast; do not use real audiences.
3. After local endpoint checks and owner review, follow the learning guide to use ngrok on port 8080 only. Set PUBLIC_URL, recreate wordpress, and test the shop link in LINE and an external browser.
4. Fill channel inventory; do not enable Messaging API until the intended Provider owner confirms the binding.

## Expected Results

Actual mobile observations distinguish OA features, redirect/session behavior and consent. Offline diagrams are not recorded as a real OA setup.

## Independent Challenge

Close the in-app browser before checkout finishes. Inspect order and event outcomes separately; do not assume both failed.

## Troubleshooting

localhost on a phone is the phone, not your Docker host. Check tunnel, PUBLIC_URL, publication settings and ngrok warning before changing app code.

## Completion Checklist

- [ ] Configured features yourself or marked each unexecuted.
- [ ] Tested in-app and external browsers separately.
- [ ] Reviewed Provider ownership before enabling API.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain OA versus Provider versus Channel versus UID.
- [ ] Explain why UTM is not authorization.

## Cleanup and Handoff

Stop ngrok, restore PUBLIC_URL=http://localhost:8080, recreate wordpress and check local shop/admin.

## References

- [Official/source reading](https://developers.line.biz/en/docs/messaging-api/getting-started/)
- [Learning guide](learning-guide.md)

---

[Previous: Defect Lifecycle and Collaborative Debugging](21-defect-lifecycle.md) · [Curriculum](../../README.md) · [Next: Tracking Contracts and Reconciliation](23-tracking-reconciliation.md)
