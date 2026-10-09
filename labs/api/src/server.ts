import { createApi } from './app.js';
import { createStore } from './store.js';

const { LAB_TOKEN_A, LAB_TOKEN_B } = process.env;
if (!LAB_TOKEN_A || !LAB_TOKEN_B || LAB_TOKEN_A === LAB_TOKEN_B) throw new Error('Set two distinct synthetic LAB_TOKEN_A and LAB_TOKEN_B values');
const server = createApi({ store: createStore(process.env.LAB_STATE_PATH ?? '.state/resources.json'), tokens: { [LAB_TOKEN_A]: 'owner-a', [LAB_TOKEN_B]: 'owner-b' } });
server.listen(Number(process.env.PORT ?? 8090), '127.0.0.1', () => console.log('Fixture API listening on loopback'));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
