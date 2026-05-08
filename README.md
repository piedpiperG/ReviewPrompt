# ReviewPrompt

Open prompts, workflows, and agent skills for AI-assisted peer review.

ReviewPrompt is not a prompt dump. It is a structured registry for reusable review methods: prompts with metadata, workflows with steps, and installable skills for local agent tools.

## Product Direction

The source requirement document is [`guide_basement.md`](guide_basement.md). The current implementation follows the first-version recommendation:

- GitHub Pages + Astro Starlight.
- Markdown / MDX content pages.
- Structured Prompt, Workflow, and Skill catalog.
- GitHub Issue Forms for community submissions.
- GitHub Actions deployment.

## Repository Layout

```text
.
├── docs/                    # Product specs and development plans
├── site/                    # Astro Starlight website
├── skills/                  # Installable Agent Skills
├── data/                    # Schemas, taxonomy, and future static exports
├── .github/                 # Issue Forms and deployment workflow
└── guide_basement.md        # Original requirement and product strategy
```

## Development

```bash
cd site
npm install
npm run dev
```

Useful commands:

```bash
npm --prefix site test -- --run
npm --prefix site run check
npm --prefix site run build
```

## MVP Scope

- Task-oriented home page.
- Prompt Library.
- Workflow Library.
- Skill Registry.
- Review use cases.
- Contribution entry.
- Safety and confidentiality guidance.

## License

The code and skills are intended for open-source distribution. Final license text should be added before public release.
