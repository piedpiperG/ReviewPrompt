---
name: full-paper-review
description: Use when reviewing a research paper or performing a pre-submission self-review. Produces a structured peer review covering contribution, correctness, methodology, experiments, clarity, limitations, reproducibility, questions for authors, suggested score, and confidence.
---

# Full Paper Review Skill

Use this skill to perform a structured AI-assisted review of a research paper.

## Required Input

Ask the user for the manuscript text or the relevant paper sections:

- Title and abstract.
- Main claims and contributions.
- Method section.
- Experiment setup and results.
- Related work.
- Limitations.
- Venue rubric, if available.

## Review Workflow

1. Identify the paper's main claim.
2. Summarize the contribution in neutral language.
3. Evaluate novelty against the provided related work.
4. Check whether the method supports the main claim.
5. Evaluate experiments, baselines, datasets, metrics, ablations, and statistical support.
6. Identify missing evidence or overclaims.
7. Check clarity and reproducibility.
8. Produce a structured review.
9. Calibrate the score and confidence against the stated evidence.

## Output Format

Return:

- Summary.
- Strengths.
- Weaknesses.
- Questions for authors.
- Missing experiments.
- Reproducibility concerns.
- Ethical or safety concerns, if relevant.
- Suggested revision plan.
- Preliminary score.
- Confidence.

## Guardrails

- Do not fabricate citations, experimental results, or reviewer requirements.
- If evidence is missing, say so explicitly.
- Separate evidence-backed concerns from speculation.
- Treat the output as decision support, not as a replacement for human review.
- Respect confidentiality requirements for unpublished manuscripts.
