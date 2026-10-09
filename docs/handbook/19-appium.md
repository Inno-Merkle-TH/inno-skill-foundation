# 19 — Appium Automation for Android and iOS

## Outcomes

Run a controlled native sample and verify its provenance.

## Prerequisites

Lesson 18; platform-specific setup in `labs/mobile/README.md`. iOS execution requires macOS/Xcode; Android requires an approved SDK/emulator or device.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Appium uses platform drivers; WebdriverIO is the TypeScript client. App binaries and drivers need compatible versions. A passing preflight is not a passing application test.

## Worked Example

The pinned WebdriverIO demo app supplies a Forms screen. Verify the published archive checksum before installing; use synthetic text and assert the app's response.

## Guided Lab

1. From `labs/mobile` run `npm ci`, `npm test`, `npm run typecheck`.
2. Follow README instructions to verify the pinned Android APK or iOS simulator archive, install the selected driver and choose an explicit device.
3. Run the appropriate Android/iOS script and inspect the form assertions. Record each platform separately.

## Expected Results

Preflight rejects missing/wrong inputs; actual device runs produce explicit form evidence. Unavailable platforms remain not executed.

## Independent Challenge

Change the expected echoed text in a sandbox and verify failure on a device; restore it.

## Troubleshooting

Check Appium server, driver, app path, device ID and supported runtime. Do not weaken machine security or signing policy to bypass setup.

## Completion Checklist

- [ ] Verified artifact source/hash and chosen device.
- [ ] Recorded actual smoke outcome per platform.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain why preflight success is not native coverage.
- [ ] Explain which sample behavior is unrelated to commerce.

## Cleanup and Handoff

Stop Appium; remove only test artifacts you created. Do not reset personal devices.

## References

- [Official/source reading](https://webdriver.io/docs/appium/)
- [Learning guide](learning-guide.md)

---

[Previous: Mobile Strategy and Exploratory Testing](18-mobile-strategy.md) · [Curriculum](../../README.md) · [Next: Continuous Testing and Delivery Verification](20-continuous-testing.md)
