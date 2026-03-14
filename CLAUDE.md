# nxos — Development Guide

This is the **nxos framework repository**. nxos is a universal, domain-agnostic multi-agent orchestration framework distributed via npm.

## Quick Reference

```bash
node --test tests/*.test.js    # Run all tests (76/78 pass, 2 pre-existing)
npx nxos init                  # Test init locally
/nxos-dev                      # Run distribution consistency checker
```

## Architecture

### Distribution Model

nxos is distributed via npm. Users run `npx nxos init` which copies files to their project:

| Source (this repo) | Destination (user project) | Mechanism |
|---|---|---|
| `templates/` (excl. `ide-templates/`) | Project root | `copyCommonTemplates()` in `src/init.js` |
| `templates/ide-templates/{ide}/` | Project root | Copied per selected IDE |
| `agents/` | `agents/` | `installAgent()` — copied as `.agent.md` files |
| `skills/` | `skills/` | `installSkill()` — copied as directories |

### Critical Sync Rule

`_nxos/core/*` MUST mirror `templates/_nxos/core/*` at all times.

- `_nxos/core/` — Live working copy (used when running nxos locally in this repo)
- `templates/_nxos/core/` — Distribution copy (shipped to users via `npx nxos init`)

If you edit one, copy to the other. Run `/nxos-dev` to verify sync.

### Multi-IDE Support

nxos supports 5 IDEs. Each has a template folder in `templates/ide-templates/`:

| IDE | Folder |
|---|---|
| Claude Code | `templates/ide-templates/claude-code/` |
| Cursor | `templates/ide-templates/cursor/` |
| VS Code + Copilot | `templates/ide-templates/vscode-copilot/` |
| Codex | `templates/ide-templates/codex/` |
| Antigravity | `templates/ide-templates/antigravity/` |

**Golden Rule:** IDE-specific changes go ONLY in `templates/ide-templates/{ide}/`. Never add conditional IDE logic to shared files in `_nxos/core/` or `templates/`.

### Multi-file Skills

Skills with subdirectories (scripts/, agents/, assets/) need BOTH:
- `skills/{name}/` — Bundled catalog (npm distribution)
- `templates/skills/{name}/` — Template mirror (copied during init)

Single-file skills (only SKILL.md) do NOT need a template mirror.

## Directory Structure

```
nxos/
├── bin/nxos.js              # CLI entry point
├── src/
│   ├── init.js              # npx nxos init
│   ├── update.js            # npx nxos update
│   ├── skills.js            # Skills engine
│   ├── skills-cli.js        # Skills CLI
│   ├── agents.js            # Agents engine
│   ├── agents-cli.js        # Agents CLI
│   ├── i18n.js              # Localization (en, pt-BR, es)
│   ├── prompt.js            # User prompts
│   └── locales/             # Translation strings
├── templates/               # Copied to user projects during init
│   ├── _nxos/core/          # Framework core (MUST sync with _nxos/core/)
│   ├── ide-templates/       # IDE-specific files
│   ├── dashboard/           # Dashboard UI template
│   └── skills/              # Multi-file skill templates
├── _nxos/core/              # Live working copy of framework core
│   ├── architect.agent.yaml # Squad creation agent
│   ├── runner.pipeline.md   # Pipeline execution
│   ├── runner.cycle.md      # Loop mode execution
│   ├── skills.engine.md     # Skills management
│   ├── best-practices/      # researching, review, data-analysis
│   ├── archetypes/          # Domain packages (future)
│   └── prompts/
│       └── investigator.prompt.md
├── agents/                  # Bundled agent catalog
├── skills/                  # Bundled skills catalog
├── dashboard/               # Dashboard source (React + Pixi.js)
├── tests/                   # Test suite
└── package.json             # npm package config
```

## Protected Paths

These directories are NEVER overwritten during `npx nxos update`:

- `_nxos/_memory` — User preferences and project context
- `_nxos/_investigations` — Investigator research data
- `agents` — User-installed/customized agents
- `squads` — User-created squads

## package.json files[]

Controls what enters the npm package: `bin/`, `src/`, `agents/`, `skills/`, `templates/`.

If you add a new distributable directory, add it to `files[]`.

## Verification

Run `/nxos-dev` after any changes. It checks:

- **A:** `_nxos/core/` ↔ `templates/_nxos/core/` sync
- **B:** Multi-file skills ↔ `templates/skills/` sync
- **C:** `agents/` in `package.json files[]`
- **D:** Init logic integrity
- **E:** `PROTECTED_PATHS` completeness
- **F:** Package manifest completeness
- **G:** New top-level directories configured
- **H:** Init auto-installs agents/skills
- **I:** Update installs new agents/skills
- **J:** No IDE-specific logic in shared files
