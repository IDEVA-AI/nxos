# nxos — Project Instructions

This project uses **nxos**, a multi-agent orchestration framework.

## Quick Start

Type `/nxos` to open the main menu, or use any of these commands:
- `/nxos create` — Create a new squad
- `/nxos run <name>` — Run a squad
- `/nxos help` — See all commands

## Directory Structure

- `_nxos/` — nxos core files (do not modify manually)
- `_nxos/_memory/` — Persistent memory (project context, preferences)
- `squads/` — User-created squads
- `squads/{name}/_investigations/` — Investigator research analyses (profile analyses)
- `squads/{name}/output/` — Generated output files
- `_nxos/_browser_profile/` — Persistent browser sessions (login cookies, localStorage)

## How It Works

1. The `/nxos` skill is the entry point for all interactions
2. The **Architect** agent creates and modifies squads
3. During squad creation, the **Investigator** can analyze reference profiles (Instagram, YouTube, Twitter/X, LinkedIn) to extract real patterns
4. The **Pipeline Runner** executes squads automatically
5. Agents communicate via persona switching (inline) or subagents (background)
6. Checkpoints pause execution for user input/approval

## Rules

- Always use `/nxos` commands to interact with the system
- Do not manually edit files in `_nxos/core/` unless you know what you're doing
- Squad YAML files can be edited manually if needed, but prefer using `/nxos edit`
- Project context in `_nxos/_memory/company.md` is loaded for every squad run

## Browser Sessions

nxos uses a persistent Playwright browser profile to keep you logged into platforms.
- Sessions are stored in `_nxos/_browser_profile/` (gitignored, private to you)
- First time accessing a platform, you'll log in manually once
- Subsequent runs will reuse your saved session
- **Important:** The native Claude Code Playwright plugin must be disabled. nxos uses its own `@playwright/mcp` server configured in `.mcp.json`.
