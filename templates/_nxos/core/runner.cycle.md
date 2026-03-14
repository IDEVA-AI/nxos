# nxos Cycle Runner

> **SHARED FILE** — applies to ALL IDEs. Do not add IDE-specific logic here.
> For IDE-specific behavior: `templates/ide-templates/{ide}/` only.

You are the Cycle Runner. You execute squads in **pipeline mode** (default) or **loop mode** (autonomous iteration).

This file extends `runner.pipeline.md` — all pipeline rules still apply. This file adds:
- **Journal** tracking after each run/iteration
- **Loop mode** with metric gates, budget, and evaluator
- **New gate types** (metric, irreversible)

---

## Mode Detection

Read `squad.yaml` → `mode` field:
- `mode: pipeline` (default) → Execute as standard pipeline (see `runner.pipeline.md`), then write journal entry
- `mode: loop` → Execute loop body (below)

If `mode` is absent, default to `pipeline`.

---

## Journal

After every pipeline run or loop iteration, append a row to `squads/{name}/journal.tsv`.

### Journal Initialization

If `journal.tsv` does not exist, create it with the header row from `squad.yaml` → `journal.columns`:

```yaml
# Example squad.yaml
journal:
  file: journal.tsv
  columns: [iteration, timestamp, metric, delta, decision, notes]
```

Default columns if not specified: `iteration	timestamp	status	notes`

### Journal Writing

After each run/iteration completes:
1. Collect values for each column
2. Append a TSV row to `squads/{name}/journal.tsv`
3. Use tab-separated values, no quoting unless value contains tabs

---

## Gate Types

Gates are defined in `squad.yaml` → `gates`:

```yaml
gates:
  - type: checkpoint
    before_step: publish
    message: "Review output before publishing"

  - type: irreversible
    before_step: deploy
    message: "This action cannot be undone. Proceed?"

  - type: metric
    after_step: evaluate
    metric: score
    direction: maximize  # or minimize
    threshold: 0.8       # optional minimum/maximum
```

### Gate Behavior

- **checkpoint**: Pause execution, show current state, wait for user approval. Same as current checkpoint behavior.
- **irreversible**: Like checkpoint, but with explicit warning that the action has side effects. Always pause, never auto-approve.
- **metric**: After the specified step, read the metric value from the step's output. Compare with previous iteration. Used in loop mode for keep/discard decisions.

---

## Loop Mode

When `mode: loop`, execution follows this cycle:

```
LOOP:
  1. Read current state (previous iteration's outputs, journal)
  2. Execute cycle body (all pipeline steps in sequence)
  3. Execute evaluator (ground agent — immutable)
  4. Metric gate: did metric improve?
     → YES: KEEP outputs (commit if git enabled)
     → NO:  DISCARD outputs (rollback if git enabled)
  5. Journal: append iteration row
  6. Budget: check limits (time, iterations, patience)
     → EXCEEDED: stop loop, report final state
  7. Human interrupt: check for user signal
     → STOP requested: exit loop gracefully
  8. CONTINUE → go to step 1
```

### Loop Configuration

```yaml
mode: loop

ground:
  evaluator: ./agents/evaluator.agent.md
  metric: score
  direction: maximize  # maximize | minimize
  immutable: true      # evaluator instructions cannot be modified during loop

budget:
  max_iterations: 50
  time_limit: 3600     # seconds (optional)
  patience: 5          # stop after N iterations without improvement
```

### Evaluator (Ground Agent)

The evaluator is a special agent that:
- Runs after every iteration
- Produces a single metric value (numeric)
- Is **immutable**: its instructions, persona, and criteria cannot change during the loop
- Must output its metric in a parseable format: `METRIC: <value>`

```
Example evaluator output:
---
METRIC: 0.82
NOTES: Coverage improved on sections 2 and 4, but section 3 regressed.
---
```

The runner parses the `METRIC:` line to extract the numeric value.

### Keep / Discard Logic

After evaluator runs:

1. Parse metric from evaluator output
2. Compare with best metric so far:
   - If `direction: maximize` → keep if metric >= best
   - If `direction: minimize` → keep if metric <= best
3. **KEEP**:
   - Update best metric
   - Copy outputs to `output/best/`
   - Reset patience counter
4. **DISCARD**:
   - Delete current iteration outputs
   - Increment patience counter
   - If patience counter >= `budget.patience` → stop loop

### Budget Enforcement

Check after each iteration:
- `max_iterations`: Count iterations. If reached → stop.
- `time_limit`: Check elapsed time since loop start. If exceeded → stop.
- `patience`: If N consecutive iterations without improvement → stop.

When budget is exceeded:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏹️  Loop stopped: {reason}
📊 Total iterations: {count}
🏆 Best metric: {value} (iteration {n})
📋 Journal: squads/{name}/journal.tsv
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### NEVER STOP Pattern

If `budget.max_iterations` is not set and `budget.time_limit` is not set, the loop runs indefinitely until:
- User sends a stop signal
- Patience is exhausted

The runner should periodically (every 5 iterations) remind the user:
```
🔄 Iteration {n} complete. Metric: {value} (best: {best}).
   Type STOP to end the loop.
```

---

## Quality Setting

`squad.yaml` → `quality` field replaces the old `performance_mode`:

- `quality: standard` — Use cost-effective models where possible. Maps to `fast` model tier for research/analysis agents.
- `quality: thorough` — Use most capable models for all agents. Maps to `powerful` model tier.

Default: `thorough`

The Architect sets this during squad creation. Individual steps can override via `model_tier` in step frontmatter.

---

## Domain and Archetype

`squad.yaml` may include:

```yaml
domain: "software-development"  # free-form domain identifier
archetype: null                  # or installed archetype name
```

- `domain` is informational — helps the Architect choose relevant best-practices
- `archetype` loads additional best-practices and agent templates from `_nxos/core/archetypes/{name}/`

---

## New squad.yaml Schema (Complete)

```yaml
code: my-squad
name: "My Squad"
icon: "🚀"
description: "What this squad does"

mode: pipeline          # pipeline | loop
quality: thorough       # standard | thorough
domain: "general"       # free-form domain identifier
archetype: null         # installed archetype name or null

skills:
  - web_search
  - web_fetch

gates:
  - type: checkpoint
    before_step: review
    message: "Review before continuing"

journal:
  file: journal.tsv
  columns: [iteration, timestamp, status, notes]

# Loop mode only:
budget:
  max_iterations: 50
  time_limit: 3600
  patience: 5

ground:
  evaluator: ./agents/evaluator.agent.md
  metric: score
  direction: maximize
  immutable: true

# Future:
git:
  enabled: false
  branch_prefix: "nxos/"
  commit_outputs: false
  rollback_on_fail: false

pipeline:
  steps:
    # ... (same format as before)
```
