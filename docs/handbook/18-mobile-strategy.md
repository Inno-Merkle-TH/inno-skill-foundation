# 18 — Mobile Strategy and Exploratory Testing

## Outcomes

Plan native, hybrid and mobile-web coverage with explicit device limits.

## Prerequisites

Lessons 16–17. Device execution is not required for the planning exercise.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Viewport emulation is not native-app testing. OS lifecycle, permissions, keyboard, connectivity and device resources affect behavior. Emulator evidence differs from physical-device evidence.

## Worked Example

A checkout in LINE's in-app browser may have a different session from an external browser. A native sample app's form test says nothing about WooCommerce account linking.

## Guided Lab

1. Complete a device/OS/browser matrix with business risk and available execution route.
2. Write charters for denied permissions, background/foreground, offline recovery and keyboard obstruction.
3. Separate planned coverage from executed coverage; mark unavailable iOS or physical-device work honestly.

## Expected Results

The matrix explains what each test surface proves and does not prove.

## Independent Challenge

A stakeholder asks to claim iOS coverage from Android plus a narrow desktop viewport. Write the evidence-based response.

## Troubleshooting

Do not infer OS behavior from one simulator. Do not automate third-party account setup or real customer accounts.

## Completion Checklist

- [ ] Mapped platform risks to tests.
- [ ] Recorded device availability without marking missing work as passed.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain native versus hybrid versus mobile web.
- [ ] Explain simulator versus physical-device evidence.

## Cleanup and Handoff

Retain the matrix for Appium execution.

## References

- [Official/source reading](https://appium.io/docs/en/latest/intro/)
- [Learning guide](learning-guide.md)

---

[Previous: Automation Maintenance and Diagnostics](17-automation-maintenance.md) · [Curriculum](../../README.md) · [Next: Appium Automation for Android and iOS](19-appium.md)
