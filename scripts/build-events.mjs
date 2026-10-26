import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

await build({
  absWorkingDir: root,
  entryPoints: ['src/merge-launch/events.js', 'src/merge-launch/atelier.js', 'src/merge-launch/navigation.js'],
  bundle: true,
  minify: true,
  format: 'esm',
  outdir: 'public/merge-launch',
});

await build({
  absWorkingDir: root,
  entryPoints: ['src/forma/app.js'],
  bundle: true,
  minify: true,
  format: 'esm',
  outfile: 'public/merge-launch/forma/app.js',
});

console.log('Merge Launch and Forma built for the main application.');
