# Connected Journey Test Cases

| Case | Expected evidence |
|---|---|
| Add friend | Greeting matches configured behavior |
| Rich menu shop | Correct shop and intended UTM |
| In-app to external browser | Observe continuity; do not assume shared session |
| ngrok warning | Separate warning/friction from application errors |
| Denied analytics consent | Checkout remains possible; no nonessential collection |
| Close browser before response | Inspect order and event state independently |
| Login cancel (extension) | No unverified identity link or session |
| Block OA (extension) | Notification outcome does not redefine order success |
| Forged order ID (extension) | No disclosure of another customer's order |

- [ ] Record device/browser/build/configuration and expected/actual per case.
- [ ] Mark unimplemented extension cases as not executed.
- [ ] Redact order keys/session data and close the tunnel after testing.
