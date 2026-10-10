import { test, expect } from 'vitest';
import { ApiClient } from '../src/client.js';
import { startLab } from '../src/lab.js';

test('API client exposes contract results instead of assuming success', async () => {
  const lab = await startLab();
  try {
    const owner = new ApiClient(lab.baseUrl, 'synthetic-a');
    const denied = new ApiClient(lab.baseUrl, 'wrong');
    const created = await owner.request('POST','/resources',{title:'Client test',clientRequestId:'client'});
    expect(created.status).toBe(201);
    expect(created.body).toMatchObject({title:'Client test',version:1});
    expect((await denied.request('GET','/resources')).status).toBe(401);
    await expect(owner.request('GET','https://example.com')).rejects.toThrow();
  } finally { await lab.close(); }
});
