import { createApi } from '../src/app.js';
import { createStore } from '../src/store.js';

if (!process.env.REHEARSAL_STATE) throw new Error('Missing isolated rehearsal state');
const server = createApi({ store: createStore(process.env.REHEARSAL_STATE), tokens: { 'synthetic-release': 'owner-a' } });
server.listen(0, '127.0.0.1', () => {
  const address = server.address() as { port: number };
  process.send?.({ baseUrl: `http://127.0.0.1:${address.port}` });
});
process.on('SIGTERM', () => server.close(() => process.exit(0)));
