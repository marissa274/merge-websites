import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './local-env.mjs';

if (!existsSync('dist/server/wrangler.json')) {
  throw new Error('Run npm run build before npm start.');
}
const cli = fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url));
const child = spawn(process.execPath, [cli, 'dev',
  '--config', 'dist/server/wrangler.json', '--local',
  '--persist-to', '.wrangler/state', '--ip', '127.0.0.1', '--inspector-port', '0',
  '--env-file', path.resolve('.dev.vars'), ...process.argv.slice(2)], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 0; });
