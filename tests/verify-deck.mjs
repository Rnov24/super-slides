#!/usr/bin/env node
// tests/verify-deck.mjs — zero external dependencies, Node only
// Parses HTML files under templates/ (always) and examples/ (if non-empty).
// Exits non-zero if any FAIL is detected.

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';

// ── Helpers ─────────────────────────────────────────────────────────────────

const root = resolve(new URL('.', import.meta.url).pathname, '..');

function readDir(dir) {
  const full = join(root, dir);
  if (!existsSync(full)) return [];
  return readdirSync(full)
    .filter(f => f.endsWith('.html'))
    .map(f => ({ name: join(dir, f), content: readFileSync(join(full, f), 'utf8') }));
}

let passed = 0;
let failed = 0;

function check(label, ok) {
  const mark = ok ? 'PASS' : 'FAIL';
  console.log(`  [${mark}] ${label}`);
  if (ok) passed++; else failed++;
}

// ── Collect files ────────────────────────────────────────────────────────────

const templateFiles = readDir('templates');
const examplesDir   = join(root, 'examples');
let   exampleFiles  = [];

if (!existsSync(examplesDir)) {
  console.warn('\n  [SKIP] examples/ directory not found — skipping example assertions (Packet 2).\n');
} else {
  exampleFiles = readDir('examples');
  if (exampleFiles.length === 0) {
    console.warn('\n  [SKIP] examples/ exists but contains no .html files — skipping (Packet 2).\n');
  }
}

const allFiles = [...templateFiles, ...exampleFiles];

if (allFiles.length === 0) {
  // templates/ must always have files; this is a hard failure
  console.error('FAIL: No HTML files found in templates/. At least deck-skeleton.html is required.');
  process.exit(1);
}

// ── Run assertions per file ──────────────────────────────────────────────────

for (const { name, content } of allFiles) {
  console.log(`\nChecking: ${name}`);

  // 1. Zero external <link> tags (no href starting with http/https//)
  const linkTags = [...content.matchAll(/<link\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi)];
  const externalLinks = linkTags.filter(m => /^(https?:)?\/\//i.test(m[1].trim()));
  check('Zero external <link> tags', externalLinks.length === 0);

  // 2. Zero external <script> tags (src starting with http/https//)
  const scriptTags = [...content.matchAll(/<script\b[^>]*src\s*=\s*["']([^"']+)["'][^>]*>/gi)];
  const externalScripts = scriptTags.filter(m => /^(https?:)?\/\//i.test(m[1].trim()));
  check('Zero external <script> tags', externalScripts.length === 0);

  // 3. 1920×1080 canvas: deck-canvas must be 1920px wide / 1080px tall in CSS or inline style
  const has1920 = /1920px/i.test(content);
  const has1080 = /1080px/i.test(content);
  check('1920×1080 canvas dimensions referenced', has1920 && has1080);

  // 4. .is-transitioning CSS includes pointer-events: none
  const isTransitioningBlock = content.match(/is-transitioning\b[\s\S]{0,300}?pointer-events\s*:\s*none/);
  check('.is-transitioning CSS has pointer-events: none', Boolean(isTransitioningBlock));

  // 5. Safety-timer code marker (setTimeout with duration + 40)
  const hasSafetyTimer = /setTimeout\s*\(/.test(content) && /duration\s*\+\s*40/.test(content);
  check('Safety-timer (setTimeout + duration + 40) present', hasSafetyTimer);

  // 6. Target-coalescing code marker
  const hasCoalescing =
    /targetIndex/.test(content) && /isTransitioning/.test(content) &&
    (/coalesce/i.test(content) || /this\.targetIndex\s*=\s*(index|nextHop|next)/.test(content));
  check('Target-index coalescing logic present', hasCoalescing);

  // 7. #shortcut-hud element present
  const hasShortcutHud = /id\s*=\s*["']shortcut-hud["']/.test(content);
  check('#shortcut-hud element present', hasShortcutHud);

  // 8. prefers-reduced-motion block present
  const hasReducedMotion = /prefers-reduced-motion\s*:\s*reduce/.test(content);
  check('@media prefers-reduced-motion block present', hasReducedMotion);

  // 9. @media print block present, and its .slide rule resets the
  // off-canvas hiding (translate3d + visibility + content-visibility),
  // otherwise only the current slide prints and the rest come out blank.
  const printIdx = content.search(/@media\s+print\b/);
  check('@media print block present', printIdx !== -1);
  const printBlock = printIdx === -1 ? '' : content.slice(printIdx);
  check('print .slide rule resets off-canvas hiding',
    /\.slide\s*\{[^}]*page-break-after[^}]*transform:\s*none\s*!important[^}]*visibility:\s*visible\s*!important[^}]*content-visibility:\s*visible\s*!important[^}]*\}/.test(printBlock));
}

// ── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n──────────────────────────────`);
console.log(`Results: ${passed} passed, ${failed} failed across ${allFiles.length} file(s).`);

if (failed > 0) {
  console.error(`\nFAIL — ${failed} check(s) did not pass.`);
  process.exit(1);
} else {
  console.log(`\nPASS — all checks passed.`);
}
