import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const schema = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
  const seed = fs.readFileSync(path.join(__dirname, '../database/seed.sql'), 'utf8');

  console.log('→ Applying schema.sql ...');
  await pool.query(schema);

  console.log('→ Applying seed.sql ...');
  await pool.query(seed);

  console.log('✓ Database ready.');
  await pool.end();
}

run().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});