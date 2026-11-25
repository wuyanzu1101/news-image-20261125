// news-image-20261125 entry (Node 22, standard library only).
// The front page is the entry.png beside this file; this program places
// a copy of it at /output/entry.png. It reads no other file, opens no
// network connection, and writes nothing else.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');
copyFileSync(source, target);
// Refuse to ship a broken image: a truncated copy must fail loudly here.
if (statSync(source).size !== statSync(target).size) {
  throw new Error('entry.png copy is incomplete');
}
