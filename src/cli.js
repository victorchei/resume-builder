#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { buildResume } from './build.js';
import { servePages } from './serve.js';
import { scoreVariant } from './score-cmd.js';
import { matchCmd } from './match-cmd.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf-8'));

const program = new Command();

program
  .name('resume')
  .description('Resume/CV generator — PDF, DOCX, GitHub Pages')
  .version(pkg.version);

program
  .command('build')
  .description('Build resume in specified format')
  .option('-v, --variant <name>', 'variant name from variants/', 'fullstack')
  .option('-f, --format <type>', 'output format: pdf, docx, html, all', 'all')
  .option('-o, --output <dir>', 'output directory', 'dist')
  .option('--all', 'build all variants')
  .action(async (opts) => {
    await buildResume({ ...opts, root: ROOT });
  });

program
  .command('serve')
  .description('Serve GitHub Pages site locally')
  .option('-p, --port <number>', 'port number', '3000')
  .option('--open', 'open in browser')
  .action(async (opts) => {
    await servePages({ ...opts, root: ROOT });
  });

program
  .command('score')
  .description('Score resume against ATS/HR best practices')
  .option('-v, --variant <name>', 'variant name from variants/', 'fullstack')
  .option('--all', 'score all variants')
  .action(async (opts) => {
    await scoreVariant({ ...opts, root: ROOT });
  });

program
  .command('match')
  .description('Match resume keywords against a job description')
  .argument('<jd-file>', 'path to job description text file')
  .option('-v, --variant <name>', 'variant name from variants/', 'fullstack')
  .action(async (jdFile, opts) => {
    await matchCmd({ ...opts, jdFile, root: ROOT });
  });

program.parse();
