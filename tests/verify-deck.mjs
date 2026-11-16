#!/usr/bin/env node
// tests/verify-deck.mjs - zero external dependencies, Node only
// Validates super-slides modular architecture, engine invariants, and anti-slop rules.
// Exits non-zero if any FAIL is detected.

import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, resolve } from 'path';

const root = resolve(new URL('.', import.meta.url).pathname, '..');

let passed = 0;
let failed = 0;

function check(label, ok) {
  const mark = ok ? 'PASS' : 'FAIL';
  console.log(`  [${mark}] ${label}`);
  if (ok) passed++; else failed++;
}

console.log('\n--- Checking Root & Architecture Invariants ---');

// 1. SKILL.md line count < 180
const skillPath = join(root, 'SKILL.md');
if (existsSync(skillPath)) {
  const skillLines = readFileSync(skillPath, 'utf8').split('\n').length;
  check(`SKILL.md line count < 180 (currently ${skillLines})`, skillLines < 180);
} else {
  check('SKILL.md exists', false);
}

// 2. Directory library/components/ DOES NOT EXIST
const oldComponentsDir = join(root, 'library/components');
check('Directory library/components/ does not exist (migrated to layouts/diagrams)', !existsSync(oldComponentsDir));

// 3. Engine Skeleton Verification (templates/deck-skeleton.html)
console.log('\n--- Checking Engine Skeleton (templates/deck-skeleton.html) ---');
const skeletonPath = join(root, 'templates/deck-skeleton.html');
if (existsSync(skeletonPath)) {
  const skeleton = readFileSync(skeletonPath, 'utf8');

  // No dummy slide content
  const hasSlideSections = /<section\b[^>]*class=["'][^"']*\bslide\b[^"']*["']/i.test(skeleton);
  check('deck-skeleton.html contains zero dummy slides (<section class="slide")', !hasSlideSections);

  // DeckEngine class
  check('DeckEngine class present', skeleton.includes('class DeckEngine'));

  // _readMotion method
  check('_readMotion timing reader present', skeleton.includes('_readMotion()'));

  // Overview click listener calling goTo
  const hasOverviewClick = /addEventListener\s*\(\s*['"]click['"][\s\S]*?isOverview[\s\S]*?goTo\b/.test(skeleton);
  check('Click listener calling goTo during overview present', hasOverviewClick);

  // Print CSS
  const hasPrintCSS = /@media\s+print\b/.test(skeleton) &&
    /\.slide\s*\{[^}]*page-break-after[^}]*transform:\s*none\s*!important[^}]*visibility:\s*visible\s*!important/i.test(skeleton);
  check('@media print rule resets off-canvas slide hiding', hasPrintCSS);

  // .deck-canvas flex-shrink: 0 (R-17)
  const canvasBlock = skeleton.match(/\.deck-canvas\s*\{[^}]*\}/);
  check('.deck-canvas has flex-shrink: 0 (stage never shrinks)',
    canvasBlock ? /flex-shrink\s*:\s*0/.test(canvasBlock[0]) : false);

  // HUD and Announcer elements
  check('#shortcut-hud element present', skeleton.includes('id="shortcut-hud"'));
  check('#deck-announcer element present', skeleton.includes('id="deck-announcer"'));

  // Font slot comment present
  check('Font slot comment present in skeleton', skeleton.includes('<!-- FONTS: inline library/fonts/*.css'));
} else {
  check('templates/deck-skeleton.html exists', false);
}

// 4. Font Library Verification (library/fonts/*.css)
console.log('\n--- Checking Font Library (library/fonts/*.css) ---');
const fontsDir = join(root, 'library/fonts');
if (existsSync(fontsDir)) {
  const fontFiles = readdirSync(fontsDir).filter(f => f.endsWith('.css'));
  check('library/fonts/ contains 4 font families', fontFiles.length === 4);
  for (const f of fontFiles) {
    const content = readFileSync(join(fontsDir, f), 'utf8');
    const hasFontFace = /@font-face\s*\{/.test(content);
    const hasBase64 = /url\(["']?data:(font|application)\/(woff2|woff|x-font-woff);base64,/i.test(content);
    check(`library/fonts/${f} contains @font-face and base64 data`, hasFontFace && hasBase64);
  }
} else {
  check('library/fonts/ exists', false);
}

// 5. Themes Verification (library/themes/*.css)
console.log('\n--- Checking Themes (library/themes/*.css) ---');
const themesDir = join(root, 'library/themes');
if (existsSync(themesDir)) {
  const themeFiles = readdirSync(themesDir).filter(f => f.endsWith('.css'));
  check('library/themes/ contains 4 theme presets', themeFiles.length === 4);
  for (const t of themeFiles) {
    const content = readFileSync(join(themesDir, t), 'utf8');

    // Split contrast tokens
    const hasAccentInk = /--accent-ink\s*:/i.test(content);
    const hasAccentOn  = /--accent-on\s*:/i.test(content);
    check(`Theme ${t} defines --accent-ink and --accent-on`, hasAccentInk && hasAccentOn);

    // State tokens
    const hasStateTokens = /--state-idle\s*:/i.test(content) &&
                           /--state-candidate\s*:/i.test(content) &&
                           /--state-active\s*:/i.test(content) &&
                           /--state-committed\s*:/i.test(content) &&
                           /--state-rejected\s*:/i.test(content);
    check(`Theme ${t} defines state tokens (idle, candidate, active, committed, rejected)`, hasStateTokens);

    // Font requirement header check
    const headerFontMatch = content.match(/Required Fonts:\s*([^\n\r*]+)/i);
    if (headerFontMatch) {
      const fontList = headerFontMatch[1].trim();
      if (!fontList.toLowerCase().includes('none')) {
        const requiredFonts = fontList.split(',').map(s => s.trim()).filter(Boolean);
        for (const rf of requiredFonts) {
          const fontExists = existsSync(join(root, 'library/fonts', rf));
          check(`Theme ${t} required font ${rf} exists in library/fonts/`, fontExists);
        }
      } else {
        check(`Theme ${t} correctly documents system font stack (no font files needed)`, true);
      }
    } else {
      check(`Theme ${t} documents Required Fonts header`, false);
    }
  }
} else {
  check('library/themes/ exists', false);
}

// 6. State Motion Verification (library/animations/state-motion.css)
console.log('\n--- Checking State Motion (library/animations/state-motion.css) ---');
const motionPath = join(root, 'library/animations/state-motion.css');
if (existsSync(motionPath)) {
  const content = readFileSync(motionPath, 'utf8');

  // 5 micro-primitives
  const hasPathDraw   = /\.path-draw\b/.test(content);
  const hasBarGrow    = /\.bar-grow\b/.test(content);
  const hasNodeBeacon = /\.node-beacon\b/.test(content);
  const hasFocusDim   = /\.focus-dim\b/.test(content);
  const hasStagger    = /\.stagger-item\b/.test(content);
  check('state-motion.css contains 5 micro-primitives (path-draw, bar-grow, node-beacon, focus-dim, stagger)',
    hasPathDraw && hasBarGrow && hasNodeBeacon && hasFocusDim && hasStagger);

  // 5 state classes
  const hasIdle      = /\.state-idle\b/.test(content);
  const hasCandidate = /\.state-candidate\b/.test(content);
  const hasActive    = /\.state-active\b/.test(content);
  const hasCommitted = /\.state-committed\b/.test(content);
  const hasRejected  = /\.state-rejected\b/.test(content);
  check('state-motion.css contains 5 state classes (idle, candidate, active, committed, rejected)',
    hasIdle && hasCandidate && hasActive && hasCommitted && hasRejected);
} else {
  check('library/animations/state-motion.css exists', false);
}

// 7. Library Layouts & Diagrams Verification
console.log('\n--- Checking Layouts & Diagrams ---');
const layoutsDir = join(root, 'library/layouts');
const diagramsDir = join(root, 'library/diagrams');

const expectedLayouts = [
  'pole-hero.html', 'pole-stat.html', 'open-columns.html', 'numbered-rows.html',
  'split-canvas.html', 'horizontal-track.html', 'full-diagram.html'
];
for (const l of expectedLayouts) {
  check(`Layout ${l} exists`, existsSync(join(layoutsDir, l)));
}

const expectedDiagrams = [
  'node-link-graph.html', 'data-charts.html', 'mechanism-anatomy.html',
  'counter-example.html', 'pipeline-flow.html', 'architecture-stack.html',
  'matrix-2x2.html'
];
for (const d of expectedDiagrams) {
  check(`Diagram ${d} exists`, existsSync(join(diagramsDir, d)));
}

// 8. Quality Checks across library/
console.log('\n--- Checking Quality Invariants in library/ ---');
function walkDir(dir) {
  let files = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(full));
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.css') || entry.name.endsWith('.md')) {
      files.push({ rel: full.slice(root.length + 1), content: readFileSync(full, 'utf8') });
    }
  }
  return files;
}

const libFiles = walkDir(join(root, 'library'));
let boxShadowViolations = [];
let illustrativeViolations = [];
let translateViolations = [];
let externalUrlViolations = [];

for (const { rel, content } of libFiles) {
  // Check box-shadow / drop-shadow
  if (/box-shadow|drop-shadow/i.test(content)) {
    boxShadowViolations.push(rel);
  }
  // Check literal "Illustrative concept"
  if (/Illustrative concept/i.test(content)) {
    illustrativeViolations.push(rel);
  }
  // Check translate3d / translateX (excluding comments explaining invariants)
  const linesWithoutComments = content.split('\n').filter(line => !/^\s*(\*|\/\/|\/\*)/.test(line)).join('\n');
  if (/translate(?:3d|X)\s*\(/i.test(linesWithoutComments)) {
    translateViolations.push(rel);
  }
  // Check external URLs
  if (rel.endsWith('.html') || rel.endsWith('.css')) {
    const match = content.match(/https?:\/\/[^\s"'>]+/i);
    if (match) externalUrlViolations.push(`${rel} (${match[0]})`);
  }
}

check('Zero box-shadow or drop-shadow in library/', boxShadowViolations.length === 0);
if (boxShadowViolations.length > 0) console.error('    Violations:', boxShadowViolations);

check('Zero literal "Illustrative concept" in library/', illustrativeViolations.length === 0);
if (illustrativeViolations.length > 0) console.error('    Violations:', illustrativeViolations);

check('Zero translate3d or translateX code in library/', translateViolations.length === 0);
if (translateViolations.length > 0) console.error('    Violations:', translateViolations);

check('Zero external URLs in library/ HTML and CSS files', externalUrlViolations.length === 0);
if (externalUrlViolations.length > 0) console.error('    Violations:', externalUrlViolations);

// Check references/03 for zero box-shadow
const ref03Path = join(root, 'references/03-svg-diagram-rules.md');
if (existsSync(ref03Path)) {
  const ref03 = readFileSync(ref03Path, 'utf8');
  check('references/03-svg-diagram-rules.md has zero box-shadow or drop-shadow',
    !/box-shadow|drop-shadow/i.test(ref03.split('\n').filter(l => !l.includes('BANNED')).join('\n')));
}

// 9. Em-Dash Check across SKILL.md and references/
console.log('\n--- Checking Zero Em-Dashes (SKILL.md & references/) ---');
const docsToCheck = ['SKILL.md'];
const refsDir = join(root, 'references');
if (existsSync(refsDir)) {
  for (const f of readdirSync(refsDir).filter(f => f.endsWith('.md'))) {
    docsToCheck.push(join('references', f));
  }
}

let emDashViolations = [];
for (const rel of docsToCheck) {
  const full = join(root, rel);
  if (existsSync(full)) {
    const content = readFileSync(full, 'utf8');
    if (/[\u2014]/.test(content)) {
      emDashViolations.push(rel);
    }
  }
}
check('Zero em-dashes in SKILL.md and references/', emDashViolations.length === 0);
if (emDashViolations.length > 0) console.error('    Em-dash violations:', emDashViolations);

// 10. Check Examples (examples/*.html)
console.log('\n--- Checking Examples (examples/*.html) ---');
const examplesDir = join(root, 'examples');
if (existsSync(examplesDir)) {
  const exampleFiles = readdirSync(examplesDir).filter(f => f.endsWith('.html'));
  for (const ef of exampleFiles) {
    const content = readFileSync(join(examplesDir, ef), 'utf8');
    const hasExternalLinks = /<link\b[^>]*href\s*=\s*["'](https?:)?\/\//i.test(content);
    const hasExternalScripts = /<script\b[^>]*src\s*=\s*["'](https?:)?\/\//i.test(content);
    check(`Example ${ef} has zero external links/scripts`, !hasExternalLinks && !hasExternalScripts);

    const has1920 = /1920px/i.test(content);
    const has1080 = /1080px/i.test(content);
    check(`Example ${ef} references 1920x1080 canvas`, has1920 && has1080);

    const hasEmbeddedFont = /@font-face\b[\s\S]{0,500}?src:\s*url\(\s*["']?data:(font|application)\/(woff2|woff|x-font-woff);base64,/i.test(content);
    check(`Example ${ef} has embedded base64 @font-face`, hasEmbeddedFont);

    const hasPrint = /@media\s+print\b/.test(content);
    check(`Example ${ef} has @media print block`, hasPrint);
  }
}

// ── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n──────────────────────────────`);
console.log(`Results: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  console.error(`\nFAIL - ${failed} check(s) did not pass.`);
  process.exit(1);
} else {
  console.log(`\nPASS - all checks passed.`);
}
