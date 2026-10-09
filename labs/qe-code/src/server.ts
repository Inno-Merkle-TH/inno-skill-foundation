import mysql from 'mysql2/promise';
import { createApp } from './http-app.js';

const pool = mysql.createPool({ host: process.env.DB_HOST ?? 'eventdb', user: 'collector', password: process.env.DB_PASSWORD, database: 'lab', connectionLimit: 4 });
await pool.execute('CREATE TABLE IF NOT EXISTS events (event_id VARCHAR(128) PRIMARY KEY, payload JSON NOT NULL)');
const server = createApp({
  async insert(event) {
    try {
      await pool.execute('INSERT INTO events (event_id,payload) VALUES (?,?)', [event.eventId, JSON.stringify(event)]);
      return true;
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'ER_DUP_ENTRY') return false;
      throw error;
    }
  },
});
server.listen(3000, '0.0.0.0', () => console.log('QE collector listening on internal port 3000'));
process.on('SIGTERM', () => server.close(() => { void pool.end(); }));
