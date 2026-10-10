# Native Mobile Lab

This track uses the MIT-licensed WebdriverIO native demo app v2.2.0, not a native commerce app. Android/iOS execution requires an approved device or emulator. Do not use a personal device containing real data. Missing hardware means not executed, not passed.

## Local tooling

From this directory, use Node >=22.22.3 <23:

```bash
npm ci
npm test
npm run typecheck
```

Preflight tests inject device/tool availability. They are not native runtime tests. The client uses WebdriverIO 10.0.2 in standalone mode; assertions run in TypeScript without an additional runner abstraction.

Install an approved Android SDK/emulator (adb on PATH), or macOS Xcode and an available iOS simulator. List devices using `adb devices` or `xcrun simctl list devices available`. Do not bypass IT policy or trigger SDK installation to claim completion.

Use a project-local Appium home in each Appium terminal. These commands download executable tools; review the named official packages before running:

```bash
export APPIUM_HOME="$PWD/.appium"
npx --yes appium@3.8.0 driver install --source=npm appium-uiautomator2-driver@8.7.0
```

On macOS for iOS instead install `appium-xcuitest-driver@12.16.0` with the same command shape. Start the server in a separate terminal with the same APPIUM_HOME:

```bash
npx --yes appium@3.8.0 --address 127.0.0.1 --port 4723
```

Driver installation and platform execution are not performed automatically by npm ci or CI.

## Verify the sample

Download only the named assets from the [tagged release](https://github.com/webdriverio/native-demo-app/releases/tag/v2.2.0) into the ignored `apps/` directory. Verify against `apps-manifest.json`:

```bash
npm run verify:app -- android apps/android.wdio.native.app.v2.2.0.apk
npm run verify:app -- ios apps/ios.simulator.wdio.native.app.v2.2.0.zip
```

For iOS, extract the verified zip into a new empty directory and point MOBILE_APP_PATH to its .app bundle. Keep MOBILE_ARCHIVE_PATH pointed to the original zip. The checksum verifies the archive, not a modified extracted bundle; do not substitute another app after extraction. No paid app-store distribution/signing is required for this simulator sample.

## Execute

Set actual paths/UDIDs on your machine; placeholders are not literal device IDs:

```bash
ANDROID_UDID='<adb-device-id>' MOBILE_APP_PATH="$PWD/apps/android.wdio.native.app.v2.2.0.apk" npm run test:android
IOS_UDID='<simulator-udid>' MOBILE_ARCHIVE_PATH="$PWD/apps/ios.simulator.wdio.native.app.v2.2.0.zip" MOBILE_APP_PATH='<absolute-path-to-extracted.app>' npm run test:ios
```

Expected: the app opens Forms, echoes synthetic input and changes the switch text. The app session is deleted in finally. A failure remains nonzero; inspect device/driver/app compatibility before changing assertions. The sample selectors are source-reviewed against v2.2.0; runtime verification must be recorded separately per platform.

## Challenges and cleanup

- [ ] Change the expected echoed text and observe a meaningful failure, then restore it.
- [ ] Explore background/foreground, keyboard and permission behavior manually, recording the actual device/OS.
- [ ] Explain native versus hybrid/mobile web and why the sample does not verify LINE or commerce.
- [ ] Stop Appium and the test emulator when done; never factory-reset a personal device.

[Appium setup](https://appium.io/docs/en/latest/quickstart/) · [WebdriverIO](https://webdriver.io/docs/appium/)
