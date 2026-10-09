import { test, expect } from 'vitest';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { createApi } from '../src/app.js';
import { createStore } from '../src/store.js';

async function fixture() {
  const directory = await mkdtemp(join(tmpdir(), 'qe-api-'));
  const file = join(directory, 'state.json');
  const server = createApi({ store: createStore(file), tokens: { 'synthetic-a': 'owner-a', 'synthetic-b': 'owner-b' } });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const address = server.address() as { port: number };
  const request = (method: string, path: string, body?: unknown, token = 'synthetic-a') =>
    fetch(`http://127.0.0.1:${address.port}${path}`, { method, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) });
  return { file, request, close: async () => { await new Promise<void>(resolve => server.close(() => resolve())); await rm(directory, { recursive: true, force: true }); } };
}

test('CRUD is persisted, versioned and isolated by owner', async () => {
  const lab = await fixture();
  try {
    expect((await lab.request('GET', '/resources', undefined, '')).status).toBe(401);
    const created = await lab.request('POST', '/resources', {title:'Notebook',clientRequestId:'one'});
    expect(created.status).toBe(201);
    const record = await created.json();
    expect(record).toMatchObject({title:'Notebook',ownerId:'owner-a',version:1});
    expect((await lab.request('GET', '/resources', undefined, 'synthetic-b')).status).toBe(200);
    expect(await (await lab.request('GET', '/resources', undefined, 'synthetic-b')).json()).toEqual({items:[],total:0});
    for (const method of ['GET','PATCH','DELETE']) expect((await lab.request(method, `/resources/${record.id}`, method === 'PATCH' ? {title:'Stolen',version:1} : undefined, 'synthetic-b')).status).toBe(404);
    const changed = await lab.request('PATCH', `/resources/${record.id}`, {title:'Updated',version:1});
    expect(changed.status).toBe(200); expect((await changed.json()).version).toBe(2);
    expect((await lab.request('PATCH', `/resources/${record.id}`, {title:'Stale',version:1})).status).toBe(409);
    const restarted = createStore(lab.file);
    expect((await restarted.read()).length).toBe(1);
    expect((await lab.request('DELETE', `/resources/${record.id}`)).status).toBe(204);
    expect((await lab.request('GET', `/resources/${record.id}`)).status).toBe(404);
  } finally { await lab.close(); }
});

test('concurrent retries create exactly one resource and reject changed payload', async () => {
  const lab = await fixture();
  try {
    const results = await Promise.all(Array.from({length:8},()=>lab.request('POST','/resources',{title:'Same',clientRequestId:'retry'})));
    expect(results.map(response=>response.status).sort()).toEqual([200,200,200,200,200,200,200,201]);
    expect((await (await lab.request('GET','/resources')).json()).total).toBe(1);
    expect((await lab.request('POST','/resources',{title:'Different',clientRequestId:'retry'})).status).toBe(409);
  } finally { await lab.close(); }
});

test('rejects invalid bodies and pagination without storing them', async () => {
  const lab = await fixture();
  try {
    for (const body of [{title:'',clientRequestId:'x'},{title:'x'.repeat(121),clientRequestId:'x'},{title:'OK',clientRequestId:'x',ownerId:'owner-b'},null,[]]) expect((await lab.request('POST','/resources',body)).status).toBe(400);
    for (const query of ['limit=0','limit=101','offset=-1','offset=1.5','limit=abc','limit=2&limit=3']) expect((await lab.request('GET',`/resources?${query}`)).status).toBe(400);
    expect((await lab.request('POST','/resources',{title:'x'.repeat(70000),clientRequestId:'large'})).status).toBe(413);
    expect((await (await lab.request('GET','/resources')).json()).total).toBe(0);
  } finally { await lab.close(); }
});

test('corrupt storage fails closed instead of returning empty success', async () => {
  const lab = await fixture();
  try {
    await writeFile(lab.file, 'broken');
    expect((await lab.request('GET','/resources')).status).toBe(503);
    expect((await lab.request('POST','/resources',{title:'Lost?',clientRequestId:'x'})).status).toBe(503);
  } finally { await lab.close(); }
});
