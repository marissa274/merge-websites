import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import './local-env.mjs';

// Never overwrite credentials or reset the existing local database.
if (!existsSync('.dev.vars')) copyFileSync('.dev.vars.example', '.dev.vars');
const temporary = mkdtempSync(path.join(tmpdir(), 'mk-lab-db-'));
try {
  // These two initial migrations only create tables/indexes. Make their initial
  // schema safe to install repeatedly, including on the existing local database.
  // Future schema changes belong in new migrations, not in these initial files.
  const sql = ['0000_living_excalibur.sql', '0001_oval_chameleon.sql']
    .map(name => readFileSync(path.join('drizzle', name), 'utf8')
      .replace(/CREATE TABLE /g, 'CREATE TABLE IF NOT EXISTS ')
      .replace(/CREATE (UNIQUE )?INDEX /g, 'CREATE $1INDEX IF NOT EXISTS '))
    .join('\n');
  const schemaFile = path.join(temporary, 'initial-schema.sql');
  writeFileSync(schemaFile, sql);
  const wrangler = fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url));
  const result = spawnSync(process.execPath, [wrangler, 'd1', 'execute', 'DB',
    '--local', '--config', 'wrangler.jsonc', '--persist-to', '.wrangler/state', '--file', schemaFile, '--json'],
    { encoding: 'utf8' });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout || 'Local database setup failed.');
    process.exitCode = result.status ?? 1;
  } else {
    console.log('Local DB ready. Existing data and .dev.vars preserved.');
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
