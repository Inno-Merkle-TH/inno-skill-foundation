# Execution Environment Matrix

| Surface | Required environment | Initial verification |
|---|---|---|
| Core TypeScript/API | Node >=22.22.3 <23, npm lockfile | 46 tests and typecheck passed |
| Snapshot integrity | Node 22 | Passed |
| Commerce | Docker Engine + Compose; local ports 8080/8081 | Existing lab; migration runtime pending |
| Android | Android SDK, emulator/device, Appium UiAutomator2 | adb not initially available |
| iOS | macOS, Xcode, simulator, Appium XCUITest | Xcode 27.0 available; run pending |
| Performance | k6 against owned loopback services | k6 not initially on PATH |
| LINE/GA4 | Approved test accounts and explicit owner decisions | Not executed by the author |

Date: 2026-10-09. Installation availability, static review, simulation and live execution are different evidence categories. No paid device farm, cloud account or AI subscription is required for local core work.
