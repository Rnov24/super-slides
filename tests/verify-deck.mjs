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

  // 11. Embedded base64 @font-face present (zero external requests, distinctive typography)
  const hasEmbeddedFont = /@font-face\b[\s\S]{0,500}?src:\s*url\(\s*["']?data:(font|application)\/(woff2|woff|x-font-woff|font-woff);base64,/i.test(content);
  check('Embedded base64 @font-face present', hasEmbeddedFont);

  // 12. No translate3d or translateX in crossfade transition code path.
  // The crossfade engine uses opacity + scale only; no horizontal push.
  // Comments referencing these values are allowed; actual CSS/JS usage is not.
  const hasSlideTranslate = /translate3d\s*\(/.test(content) || /translateX\s*\(/.test(content);
  check('No translate3d or translateX in crossfade transition code', !hasSlideTranslate);

  // 13. Stage integrity (R-17): .deck-canvas must not shrink inside the flex
  // #deck-viewport. Without flex-shrink: 0 the 1920px stage shrinks to the
  // viewport width at any window narrower than 1920px and the deck renders
  // squished with black bars on the sides.
  const canvasBlock = content.match(/\.deck-canvas\s*\{[^}]*\}/);
  check('.deck-canvas has flex-shrink: 0 (stage never shrinks)',
    canvasBlock ? /flex-shrink\s*:\s*0/.test(canvasBlock[0]) : false);
}

// ── Library Scan ─────────────────────────────────────────────────────────────

const libraryDir = join(root, 'library');
let libFileCount = 0;
if (existsSync(libraryDir)) {
  function walkFiles(dir) {
    let results = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...walkFiles(full));
      } else if (entry.name.endsWith('.html') || entry.name.endsWith('.css')) {
        results.push({ name: full.slice(root.length + 1), content: readFileSync(full, 'utf8') });
      }
    }
    return results;
  }

  const libFiles = walkFiles(libraryDir);
  libFileCount = libFiles.length;
  for (const { name, content } of libFiles) {
    console.log(`\nChecking: ${name}`);

    // L-1: Zero external http(s) URLs
    const hasExternalUrl = /https?:\/\//i.test(content);
    check('Zero external http(s) URLs', !hasExternalUrl);

    // L-2: Zero em-dashes
    const hasEmDash = /[\u2014—]/.test(content);
    check('Zero em-dashes', !hasEmDash);

    // L-3: Zero translate3d or translateX
    const hasTranslate = /translate(?:3d|X)\s*\(/i.test(content);
    check('Zero translate3d or translateX', !hasTranslate);

    // L-4: Zero data-notes or speaker-hud
    const hasNotesOrHud = /data-notes/i.test(content) || /speaker-hud/i.test(content);
    check('Zero data-notes or speaker-hud', !hasNotesOrHud);

    // L-5: Zero Bodoni Moda references
    const hasBodoni = /Bodoni/i.test(content);
    check('Zero Bodoni Moda references', !hasBodoni);
  }
}

// ── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n──────────────────────────────`);
console.log(`Results: ${passed} passed, ${failed} failed across ${allFiles.length + libFileCount} file(s).`);

if (failed > 0) {
  console.error(`\nFAIL — ${failed} check(s) did not pass.`);
  process.exit(1);
} else {
  console.log(`\nPASS — all checks passed.`);
}
