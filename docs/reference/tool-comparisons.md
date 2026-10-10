# Tool Choices and Transferable Skills

| Area | Primary route | Alternatives and transfer |
|---|---|---|
| Language | TypeScript | Python/Go transfer the same input-validation, error and test-design principles |
| Unit logic | Vitest | Node test runner is used for small tooling checks; avoid unnecessary runners |
| Web | Playwright | Selenium, Cypress and Robot Framework differ in architecture/ecosystem; do not learn all superficially |
| API | Postman + code tests | SoapUI/RestAssured suit other protocols/languages; contract and ownership thinking transfers |
| Collection execution | Restricted local declarative runner | Postman app runs its test scripts separately; arbitrary Newman compatibility is not claimed |
| Native mobile | Appium + WebdriverIO | Android/iOS drivers require real compatible toolchains; viewport emulation is not equivalent |
| Load | k6 | JMeter is a valid alternative; workload model and safe thresholds matter more than brand |
| Work tracking | Markdown/GitHub examples | Map to Jira issues and Confluence pages without requiring paid access |
| Cloud | Local architecture mapping | AWS/Azure/GCP concepts are discussed without mandatory provisioning |
| AI | Approved Claude Skills/Superpowers or manual review | Tool permission/provenance and human verification are mandatory either way |

Core lab dependencies are pinned and lockfile-installed. Appium server/driver commands are explicit learner-run installations, not automatic setup. Check current organization licensing and quotas before using hosted services.

[Playwright practices](https://playwright.dev/docs/best-practices) · [Appium](https://appium.io/docs/en/latest/quickstart/) · [k6](https://grafana.com/docs/k6/latest/)
