# Execution Environment Matrix

| Surface | Required environment | Initial verification |
|---|---|---|
| Core TypeScript/API | Node >=22.22.3 <23, npm lockfile | 46 tests and typecheck passed |
| Snapshot integrity | Node 22 | Passed |
| Commerce | Docker Engine + Compose; local ports 8080/8081 | Local smoke and app failover passed; see dated verification report |
| Android | Android SDK, emulator/device, Appium UiAutomator2 | adb not initially available |
| iOS | macOS, Xcode, simulator, Appium XCUITest | Xcode 27.0 available; no usable simulator; native run not verified |
| Performance | k6 against owned loopback services | Pinned k6 2.3.0 temporary binary; bounded local run passed |
| LINE/GA4 | Approved test accounts and explicit owner decisions | Not executed by the author |

Updated: 2026-10-10. Installation availability, static review, simulation and live execution are different evidence categories. See [verification evidence](../mentor/verification-report.md). No paid device farm, cloud account or AI subscription is required for local core work.
