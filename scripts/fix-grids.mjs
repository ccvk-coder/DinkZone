import fs from 'node:fs';
import path from 'node:path';

const root = 'src';
const bp = /(?:^|\s)(sm|md|lg|xl|2xl):grid-cols-/;
const baseCols = /(?:^|\s)grid-cols-/;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.jsx') ? [p] : [];
  });
}

let touched = 0;
const report = [];
for (const file of walk(root)) {
  const src = fs.readFileSync(file, 'utf8');
  let changed = false;
  // Match whole class-string literals (double or single quoted, no newlines).
  const out = src.replace(/"[^"\n]*"|'[^'\n]*'/g, (literal) => {
    const body = literal.slice(1, -1);
    if (!/(^|\s)grid(\s|$)/.test(body)) return literal;
    if (!bp.test(body) || baseCols.test(body)) return literal;
    // Insert grid-cols-1 immediately after the standalone `grid` token.
    const next = body.replace(/(^|\s)grid(?=\s|$)/, '$1grid grid-cols-1');
    if (next === body) return literal;
    changed = true;
    return literal[0] + next + literal[0];
  });
  if (changed) {
    fs.writeFileSync(file, out);
    touched++;
    report.push(file);
  }
}
console.log(`updated ${touched} files`);
report.forEach((f) => console.log('  ' + f));
