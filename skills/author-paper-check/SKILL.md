---
name: author-paper-check
description: 对论文进行作者侧多轮质检，逐项检查写作、关键词、引用、实验、图表、叙述逻辑和贡献证据链。
---

# Author Paper Check

Use this skill when an author wants Codex or Claude Code to review a paper project before submission.

## Workflow

Read the manuscript source in the current workspace, including PDF, LaTeX, Markdown, figures, tables, bibliography, appendix, reviews, or notes when available.

Run each checkpoint as a separate review pass. Do not merge them into one generic review:

1. Basic writing errors.
2. Keyword consistency.
3. Citation audit.
4. Experiment setup audit.
5. Figure/table consistency.
6. Narrative logic consistency.
7. Contribution-evidence alignment.

For each pass:

- Use only evidence from the provided files.
- Quote or point to the relevant location.
- Mark each finding as confirmed, likely, or needs human verification.
- Explain why the issue may hurt review outcome.
- Give a concrete revision suggestion.

After all passes, write `author-check-report.md` with:

1. Executive summary.
2. Top 10 issues ranked by acceptance risk.
3. Findings grouped by checkpoint.
4. Quick fixes that can be done today.
5. Deeper fixes that may require experiments or rewriting.
6. Open questions for the author.

## Guardrails

- Do not invent citations, experiments, reviewer comments, or venue rules.
- Keep uncertain findings explicitly marked as uncertain.
- Do not edit the manuscript unless the user asks for edits after reading the report.
