import { describe, expect, it } from 'vitest';
import {
  buildStaticIndex,
  catalog,
  getFeaturedResources,
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
});
