# 07 — HTTP, REST and Browser Investigation

## Outcomes

Inspect a request and distinguish transport success from business correctness.

## Prerequisites

Lesson 06; Node and browser DevTools.

Commands start at the repository root unless a different directory is named. Use a fresh root terminal for a new block; never guess your working directory.

## Concepts

Requests contain method, URL, headers and sometimes body. A 2xx response describes protocol-level handling, not necessarily correct business state. Cookies and bearer tokens are secrets.

## Worked Example

The demo server returns 200 for `/missing` because it never validates routes. A correct route assertion catches a defect that a status-only check misses.

## Guided Lab

1. From root run: `node --input-type=module -e 'import {createServer} from "node:http"; createServer((request,response)=>{response.setHeader("Content-Type","application/json");response.end(JSON.stringify({path:request.url}));}).listen(8099,"127.0.0.1")'`.
2. In a second terminal run `curl -i 'http://127.0.0.1:8099/?source=line'`; inspect the same URL in browser Network.
3. Call `/missing`, compare query, response body and headers, and propose the missing route assertion.

## Expected Results

The first response has JSON path `/?source=line`; `/missing` also returns 200. Record why that is not a production REST contract.

## Independent Challenge

Stop the server and compare connection failure with an HTTP error response.

## Troubleshooting

A running server keeps its terminal busy. For port conflicts identify the owner; do not kill unrelated processes.

## Completion Checklist

- [ ] Compared curl and browser evidence.
- [ ] Removed cookies/tokens from shared notes.
- [ ] Saved expected/actual results and execution limits in [learning evidence](../../templates/learning-evidence.md).

## Understanding Checklist

- [ ] Explain network failure versus 4xx versus 5xx.
- [ ] Explain JSON versus an in-memory object.

## Cleanup and Handoff

Ctrl+C the server; confirm the port no longer responds.

## References

- [Official/source reading](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [Learning guide](learning-guide.md)

---

[Previous: Workstation, GitHub and Git Flow](06-workstation-git.md) · [Curriculum](../../README.md) · [Next: Architecture and System Boundaries](08-architecture.md)
