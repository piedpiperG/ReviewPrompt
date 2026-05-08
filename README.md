# ReviewPrompt

Open prompts for AI-assisted peer review.

ReviewPrompt is not a prompt dump. The current website focuses on two clear prompt flows for AI papers: full paper review and rebuttal.

## Product Direction

The source requirement document is [`guide_basement.md`](guide_basement.md). The current implementation follows the first-version recommendation:

- GitHub Pages + AstroWind-based Astro website.
- AstroWind layouts, widgets, UI components, Tailwind config, and integrations as the site base.
- ReviewPrompt-specific pages backed by TypeScript prompt data.
- Simplified prompt catalog for authors and reviewers.
- Bilingual Chinese / English website, with Chinese as the default locale and English under `/en/`.
- GitHub Issue Forms for community submissions.
- GitHub Actions deployment.

## Repository Layout

```text
.
├── docs/                    # Product specs and development plans
├── site/                    # Astro website
├── data/                    # Schemas, taxonomy, and future static exports
├── .github/                 # Issue Forms and deployment automation
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
- Author and reviewer modes.
- Full paper and rebuttal tasks.
- Contribution entry.
- Workflow and Skill pages are intentionally hidden for now.

## UI Reference

The current site is based directly on AstroWind (`arthelokyo/astrowind`,
MIT license): layout, header/footer widgets, hero/features/CTA widgets,
UI primitives, Tailwind theme, Astro integrations, and utility structure
are imported from the template. ReviewPrompt keeps its own prompt data,
bilingual routing, simplified product scope, and GitHub Pages deployment.

## License

The code and prompt content are intended for open-source distribution. Final license text should be added before public release.
