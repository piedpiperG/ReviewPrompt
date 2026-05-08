# ReviewPrompt

Open prompts for AI-assisted peer review.

ReviewPrompt is not a prompt dump. The current website focuses on two clear prompt flows for AI papers: full paper review and rebuttal.

## Product Direction

The source requirement document is [`guide_basement.md`](guide_basement.md). The current implementation follows the first-version recommendation:

- GitHub Pages + custom Astro pages.
- Custom Astro pages backed by TypeScript prompt data.
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

## UI Reference

The current custom Astro shell is visually adapted from AstroWind
(`arthelokyo/astrowind`, MIT license) while keeping this repository's
own prompt data, bilingual routing, and GitHub Pages deployment.

## License

The code and prompt content are intended for open-source distribution. Final license text should be added before public release.
