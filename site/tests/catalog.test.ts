import { describe, expect, it } from 'vitest';
import {
  buildStaticIndex,
  catalog,
  getFeaturedResources,
  getPromptPackages,
  getScenarioEntries,
  recommendResources,
} from '../src/lib/catalog';

describe('catalog resources', () => {
  it('exposes the three source-backed author review resources on the home page', () => {
    const featured = getFeaturedResources(catalog);

    expect(featured.prompts.map((item) => item.slug)).toEqual([
      'reviewer-imitation-quality-check',
      'author-check-workflow',
      'rebuttal-briefing',
    ]);
    expect(Object.keys(featured)).toEqual(['prompts']);
  });

  it('keeps the public prompt catalog centered on author-side AI paper review tasks', () => {
    const roles = new Set(catalog.prompts.flatMap((item) => item.roles));
    const tasks = new Set(catalog.prompts.flatMap((item) => item.tasks));
    const domains = new Set(catalog.prompts.flatMap((item) => item.domains));

    expect(catalog.prompts.map((item) => item.slug)).toEqual([
      'reviewer-imitation-quality-check',
      'author-check-workflow',
      'rebuttal-briefing',
    ]);
    expect([...roles]).toEqual(['Author']);
    expect([...tasks].sort()).toEqual(['Multi-pass paper check', 'Rebuttal briefing', 'Reviewer imitation']);
    expect([...domains]).toEqual(['Artificial Intelligence']);
  });

  it('recommends the reviewer-imitation prompt for acceptance-risk checks', () => {
    const recommendation = recommendResources(catalog, {
      role: 'Author',
      task: 'Reviewer imitation',
      domain: 'Artificial Intelligence',
    });

    expect(recommendation.prompts.map((item) => item.slug)).toEqual(['reviewer-imitation-quality-check']);
    expect(Object.keys(recommendation)).toEqual(['prompts']);
  });

  it('recommends the rebuttal briefing prompt for rebuttal work', () => {
    const recommendation = recommendResources(catalog, {
      role: 'Author',
      task: 'Rebuttal briefing',
      domain: 'Artificial Intelligence',
    });

    expect(recommendation.prompts.map((item) => item.slug)).toEqual(['rebuttal-briefing']);
  });

  it('splits the author paper check workflow into independent checkpoint prompts', () => {
    const workflow = catalog.prompts.find((item) => item.slug === 'author-check-workflow');

    expect(workflow?.kind).toBe('workflow');
    expect(workflow?.workflowSteps?.map((step) => step.title)).toEqual([
      'Basic writing errors',
      'Keyword consistency',
      'Citation audit',
      'Experiment setup audit',
      'Figure/table consistency',
      'Narrative logic consistency',
      'Contribution-evidence alignment',
    ]);
    expect(workflow?.workflowSteps?.every((step) => step.promptText.length > 120)).toBe(true);
    expect(workflow?.skillWorkflow?.tools).toEqual(['Codex', 'Claude Code']);
    expect(workflow?.skillWorkflow?.agentInstruction).toContain('Run each checkpoint as a separate review pass');
  });

  it('builds a prompt-only static index with searchable metadata', () => {
    const index = buildStaticIndex(catalog);

    expect(index.map((item) => item.slug)).toEqual([
      'reviewer-imitation-quality-check',
      'author-check-workflow',
      'rebuttal-briefing',
    ]);
    expect(index.every((item) => item.type === 'prompt')).toBe(true);
    expect(index.every((item) => item.searchText.length > 40)).toBe(true);
    expect(index.find((item) => item.slug === 'author-check-workflow')?.searchText).toContain(
      'Contribution-evidence alignment',
    );
  });

  it('groups prompts into scenario-ready packages', () => {
    const packages = getPromptPackages(catalog);
    const packageSlugs = packages.map((item) => item.slug);
    const promptSlugs = new Set(catalog.prompts.map((item) => item.slug));

    expect(packageSlugs).toEqual([
      'submission-readiness-pack',
      'reviewer-simulation-pack',
      'rebuttal-sprint-pack',
      'agent-skill-install-pack',
    ]);
    expect(packages.every((item) => item.promptSlugs.every((slug) => promptSlugs.has(slug)))).toBe(true);
    expect(packages.find((item) => item.slug === 'agent-skill-install-pack')?.agentInstruction).toContain(
      'skills/author-paper-check/SKILL.md',
    );
  });

  it('maps home page scenarios to prompt packages', () => {
    const scenarios = getScenarioEntries(catalog);
    const packageSlugs = new Set(catalog.promptPackages.map((item) => item.slug));

    expect(scenarios.map((item) => item.id)).toEqual([
      'before-submission',
      'simulate-review',
      'after-reviews',
      'install-agent-skill',
    ]);
    expect(scenarios.every((item) => packageSlugs.has(item.packageSlug))).toBe(true);
    expect(scenarios.find((item) => item.id === 'install-agent-skill')?.title).toContain('Codex');
  });
});
