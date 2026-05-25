#!/usr/bin/env node
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const files = [
  'index.html',
  'app.js',
  'content.js',
  'styles.css',
  'privacy.html',
];

mkdirSync(dist, { recursive: true });

for (const file of files) {
  copyFileSync(join(root, file), join(dist, file));
}

// GitHub Pages SPA: deep links like /flagfield-privacy/ru serve 404.html
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));

writeFileSync(join(dist, '.nojekyll'), '\n');

console.log('Prepared dist/ for GitHub Pages');
