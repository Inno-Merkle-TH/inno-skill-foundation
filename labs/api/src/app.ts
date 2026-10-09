import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import type { ResourceStore } from './store.js';

class RequestError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}

export function createApi({ store, tokens }: { store: ResourceStore; tokens: Record<string, string> }) {
  return createServer(async (request, response) => {
    const send = (status: number, body?: unknown) => {
      response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      response.end(status === 204 ? undefined : JSON.stringify(body));
    };
    try {
      const url = new URL(request.url ?? '/', 'http://localhost');
      if (url.pathname === '/health' && request.method === 'GET') { send(200, { status: 'ok' }); return; }
      const authorization = request.headers.authorization ?? '';
      const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
      const ownerId = Object.hasOwn(tokens, token) ? tokens[token] : undefined;
      if (!ownerId) throw new RequestError(401, 'Authentication required');
      if (!/^\/resources(?:\/[^/]+)?$/.test(url.pathname)) throw new RequestError(404, 'Not found');
      const id = url.pathname.split('/')[2];
      let body: Record<string, unknown> = {};
      if (['POST', 'PATCH'].includes(request.method ?? '')) {
        const chunks: Buffer[] = []; let size = 0;
        for await (const chunk of request) {
          const buffer = Buffer.from(chunk); size += buffer.length;
          if (size > 65536) throw new RequestError(413, 'Payload too large');
          chunks.push(buffer);
        }
        let parsed: unknown;
        try { parsed = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new RequestError(400, 'Invalid JSON'); }
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new RequestError(400, 'Invalid body');
        body = parsed as Record<string, unknown>;
        const allowed = request.method === 'POST' ? ['title', 'clientRequestId'] : ['title', 'version'];
        if (Object.keys(body).some(key => !allowed.includes(key)) || typeof body.title !== 'string' || !body.title.trim() || body.title.trim().length > 120) throw new RequestError(400, 'Invalid fields');
        body.title = body.title.trim();
        if (request.method === 'POST' && (typeof body.clientRequestId !== 'string' || !/^[\w-]{1,100}$/.test(body.clientRequestId))) throw new RequestError(400, 'Invalid request id');
        if (request.method === 'PATCH' && (!Number.isSafeInteger(body.version) || Number(body.version) < 1)) throw new RequestError(400, 'Invalid version');
      }
      if (request.method === 'GET') {
        const records = (await store.read()).filter(record => record.ownerId === ownerId);
        if (id) {
          const record = records.find(record => record.id === id);
          if (!record) throw new RequestError(404, 'Not found');
          send(200, record); return;
        }
        for (const key of url.searchParams.keys()) if (!['offset', 'limit'].includes(key) || url.searchParams.getAll(key).length !== 1) throw new RequestError(400, 'Invalid pagination');
        const offsetText = url.searchParams.get('offset') ?? '0'; const limitText = url.searchParams.get('limit') ?? '10';
        const offset = Number(offsetText); const limit = Number(limitText);
        if (!/^\d+$/.test(offsetText) || !/^\d+$/.test(limitText) || !Number.isSafeInteger(offset) || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) throw new RequestError(400, 'Invalid pagination');
        send(200, { items: records.slice(offset, offset + limit), total: records.length }); return;
      }
      if (request.method === 'POST' && !id) {
        const result = await store.mutate(records => {
          const prior = records.find(record => record.ownerId === ownerId && record.clientRequestId === body.clientRequestId);
          if (prior) {
            if (prior.title !== body.title) throw new RequestError(409, 'Request key conflict');
            return { status: 200, record: prior };
          }
          const record = { id: randomUUID(), ownerId, title: body.title as string, clientRequestId: body.clientRequestId as string, version: 1 };
          records.push(record); return { status: 201, record };
        });
        send(result.status, result.record); return;
      }
      if (id && ['PATCH', 'DELETE'].includes(request.method ?? '')) {
        const record = await store.mutate(records => {
          const index = records.findIndex(record => record.id === id && record.ownerId === ownerId);
          if (index < 0) throw new RequestError(404, 'Not found');
          if (request.method === 'DELETE') return records.splice(index, 1)[0];
          if (records[index].version !== body.version) throw new RequestError(409, 'Version conflict');
          records[index] = { ...records[index], title: body.title as string, version: records[index].version + 1 };
          return records[index];
        });
        send(request.method === 'DELETE' ? 204 : 200, record); return;
      }
      throw new RequestError(405, 'Method not allowed');
    } catch (error) {
      send(error instanceof RequestError ? error.status : 503, { error: error instanceof RequestError ? error.message : 'Storage unavailable' });
    }
  });
}
