# nxos

Framework universal de orquestração multi-agente — direto da sua IDE.

nxos é um framework domain-agnostic de orquestração multi-agente. Descreva o que você precisa em linguagem natural, e o nxos cria uma equipe de agentes especializados que trabalham juntos automaticamente.

## O que é um Squad?

Um squad é uma equipe de agentes de IA que colaboram em uma tarefa. Cada agente tem um papel específico. Eles executam em pipeline ou loop — você só intervém nos checkpoints de decisão.

Exemplo:

- **Pesquisador** coleta informações e dados relevantes
- **Analista** processa dados e gera insights
- **Executor** produz o resultado final
- **Revisor** garante qualidade antes da entrega

## Instalação

**Pré-requisito:** Node.js 20+

```bash
npx nxos init
```

Para atualizar uma instalação existente:

```bash
npx nxos update
```

## IDEs Suportadas

| IDE | Status |
|-----|--------|
| Antigravity | Disponível |
| Claude Code | Disponível |
| Codex (OpenAI) | Disponível |
| Cursor | Disponível |
| VS Code + Copilot | Disponível |

## Escritório Virtual

O Escritório Virtual é uma interface visual 2D que mostra seus agentes trabalhando em tempo real.

**Passo 1 — Gere o dashboard** (na sua IDE):

```
/nxos dashboard
```

**Passo 2 — Sirva localmente** (no terminal):

```bash
npx serve squads/<nome-do-squad>/dashboard
```

**Passo 3 —** Abra `http://localhost:3000` no seu navegador.

## Criando seu Squad

Abra o menu:

```
/nxos
```

O **nxos** vai te mostrar todas as opções disponíveis.

Para criar um novo squad, basta selecionar a opção, e o **Architect** faz algumas perguntas, projeta o squad e configura tudo automaticamente. Você aprova o design antes de qualquer execução.

## Executando um Squad

```
/nxos run <nome-do-squad>
```

O squad executa automaticamente, pausando apenas nos checkpoints onde sua decisão é necessária.

## Comandos

| Comando | O que faz |
|---------|-----------|
| `/nxos` | Abre o menu principal |
| `/nxos help` | Mostra todos os comandos |
| `/nxos create` | Cria um novo squad |
| `/nxos run <nome>` | Executa um squad |
| `/nxos list` | Lista seus squads |
| `/nxos edit <nome>` | Modifica um squad |
| `/nxos skills` | Navega pelas skills instaladas |
| `/nxos install <nome>` | Instala uma skill do catálogo |
| `/nxos uninstall <nome>` | Remove uma skill instalada |

## Licença

MIT — use como quiser.

---

# nxos (English)

Universal multi-agent orchestration framework — right from your IDE.

nxos is a domain-agnostic multi-agent orchestration framework. Describe what you need in plain language, and nxos creates a team of specialized agents that work together automatically.

## What is a Squad?

A squad is a team of AI agents that collaborate on a task. Each agent has a specific role. They run in pipeline or loop mode — you only step in at decision checkpoints.

Example:

- **Researcher** gathers information and relevant data
- **Analyst** processes data and generates insights
- **Executor** produces the final output
- **Reviewer** ensures quality before delivery

## Installation

**Prerequisite:** Node.js 20+

```bash
npx nxos init
```

To update an existing installation:

```bash
npx nxos update
```

## Supported IDEs

| IDE | Status |
|-----|--------|
| Antigravity | Available |
| Claude Code | Available |
| Codex (OpenAI) | Available |
| Cursor | Available |
| VS Code + Copilot | Available |

## Virtual Office

The Virtual Office is a 2D visual interface that shows your agents working in real time.

**Step 1 — Generate the dashboard** (in your IDE):

```
/nxos dashboard
```

**Step 2 — Serve it locally** (in terminal):

```bash
npx serve squads/<squad-name>/dashboard
```

**Step 3 —** Open `http://localhost:3000` in your browser.

## Creating your Squad

Open the menu:

```
/nxos
```

The **Architect** asks a few questions, designs the squad, and sets everything up automatically. You approve the design before any execution begins.

## Running a Squad

```
/nxos run <squad-name>
```

The squad runs automatically, pausing only at checkpoints where your decision is needed.

## Commands

| Command | What it does |
|---------|-------------|
| `/nxos` | Open the main menu |
| `/nxos help` | Show all commands |
| `/nxos create` | Create a new squad |
| `/nxos run <name>` | Run a squad |
| `/nxos list` | See all your squads |
| `/nxos edit <name>` | Modify a squad |
| `/nxos skills` | Browse installed skills |
| `/nxos install <name>` | Install a skill from catalog |
| `/nxos uninstall <name>` | Remove an installed skill |

## License

MIT — use it however you want.
