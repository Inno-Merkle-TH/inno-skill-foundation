import { createServer } from 'node:http';
import type { PurchaseEvent } from './event-contract.js';
import { validateEvent } from './collector.js';

export interface EventStore {
  insert(event: PurchaseEvent): Promise<boolean>;
}

export function createApp(store: EventStore) {
  return createServer(async (request, response) => {
    const send = (status: number, body: object) => {
      response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      response.end(JSON.stringify(body));
    };
    if (request.method === 'GET' && request.url === '/lab-api/health') {
      send(200, { status: 'ok' });
      return;
    }
    if (request.method !== 'POST' || request.url !== '/lab-events') {
      send(404, { error: 'Not found' });
      return;
    }
    let event: PurchaseEvent;
    try {
      const chunks: Buffer[] = [];
      let size = 0;
      for await (const chunk of request) {
        const buffer = Buffer.from(chunk);
        size += buffer.length;
        if (size > 65536) { send(413, { error: 'Payload too large' }); return; }
        chunks.push(buffer);
      }
      event = validateEvent(JSON.parse(Buffer.concat(chunks).toString('utf8')), new Date().toISOString());
    } catch (error) {
      send(error instanceof Error && error.message === 'Consent required' ? 403 : 400, { error: 'Event rejected' });
      return;
    }
    try {
      const inserted = await store.insert(event);
      send(inserted ? 202 : 200, { status: inserted ? 'accepted' : 'duplicate' });
    } catch {
      send(503, { error: 'Storage unavailable' });
    }
  });
}
