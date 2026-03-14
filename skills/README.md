# nxos Skill Catalog

Browse available skills for your squads. Install any skill with:

```bash
npx nxos install <skill-name>
```

## Available Skills

| Skill | Type | Description | Env Vars | Install |
|-------|------|-------------|----------|---------|
| [apify](./apify/) | mcp | Web scraping and automation platform. Extract data from any website using pre-built Actors. | `APIFY_TOKEN` | `npx nxos install apify` |

## Skill Types

- **mcp** -- Connects to an external MCP server (stdio or HTTP transport)
- **script** -- Runs a local script (Node.js, Python, etc.)
- **hybrid** -- Combines MCP server access with local script capabilities
- **prompt** -- Behavioral instructions only (no external dependencies)

## Directory Structure

Each skill lives in its own folder with a `SKILL.md` file:

```
skills/
  apify/
    SKILL.md
```

The `SKILL.md` file contains YAML frontmatter (name, type, version, MCP/script config, env vars, categories) and a Markdown body with usage instructions and available operations.

## Adding a New Skill

1. Create a new folder under `skills/` with the skill ID as the name
2. Add a `SKILL.md` file with valid YAML frontmatter and Markdown body
3. If the skill includes scripts, place them in a `scripts/` subfolder
4. Update this README to include the new skill in the catalog table
