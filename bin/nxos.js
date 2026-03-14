#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { init } from '../src/init.js';
import { update } from '../src/update.js';
import { skillsCli } from '../src/skills-cli.js';
import { agentsCli } from '../src/agents-cli.js';

const { positionals } = parseArgs({
  allowPositionals: true,
  strict: false,
});

const command = positionals[0];

if (command === 'init') {
  await init(process.cwd());
} else if (command === 'install') {
  // npx nxos install <name>
  const result = await skillsCli('install', positionals.slice(1), process.cwd());
  if (!result.success) process.exitCode = 1;
} else if (command === 'uninstall') {
  // npx nxos uninstall <name>
  const result = await skillsCli('remove', positionals.slice(1), process.cwd());
  if (!result.success) process.exitCode = 1;
} else if (command === 'update') {
  const target = positionals[1];
  if (target) {
    // npx nxos update <name> → update specific skill
    const result = await skillsCli('update-one', [target], process.cwd());
    if (!result.success) process.exitCode = 1;
  } else {
    // npx nxos update → update core
    const result = await update(process.cwd());
    if (!result.success) process.exitCode = 1;
  }
} else if (command === 'skills') {
  // Backward compat: npx nxos skills list|install|remove|update
  const subcommand = positionals[1];
  const args = positionals.slice(2);
  const result = await skillsCli(subcommand, args, process.cwd());
  if (!result.success) process.exitCode = 1;
} else if (command === 'agents') {
  const subcommand = positionals[1];
  const args = positionals.slice(2);
  const result = await agentsCli(subcommand, args, process.cwd());
  if (!result.success) process.exitCode = 1;
} else {
  console.log(`
  nxos — Universal multi-agent orchestration framework

  Usage:
    npx nxos init                    Initialize nxos
    npx nxos update                  Update nxos core
    npx nxos install <name>          Install a skill
    npx nxos uninstall <name>        Remove a skill
    npx nxos update <name>           Update a specific skill
    npx nxos skills                  List installed skills
    npx nxos agents                  List installed agents
    npx nxos agents install <name>   Install a predefined agent
    npx nxos agents remove <name>    Remove an agent
    npx nxos agents update           Update all agents

  Learn more: https://github.com/renatoasse/nxos
  `);
  if (command) process.exitCode = 1;
}
