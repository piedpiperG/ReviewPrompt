import { describe, expect, it } from 'vitest';
import {
  buildStaticIndex,
  catalog,
  getFeaturedResources,
  recommendResources,
} from '../src/lib/catalog';

describe('catalog resources', () => {
  it('exposes only the two prompt-first choices for the simplified home page', () => {
    const featured = getFeaturedResources(catalog);

    expect(featured.prompts.map((item) => item.slug)).toEqual([
      'full-structured-peer-review',
      'rebuttal-response-drafting',
    ]);
    expect(Object.keys(featured)).toEqual(['prompts']);
  });

  it('keeps the public prompt catalog limited to author/reviewer, full paper/rebuttal, and AI', () => {
    const roles = new Set(catalog.prompts.flatMap((item) => item.roles));
    const tasks = new Set(catalog.prompts.flatMap((item) => item.tasks));
    const domains = new Set(catalog.prompts.flatMap((item) => item.domains));

    expect(catalog.prompts.map((item) => item.slug)).toEqual([
      'full-structured-peer-review',
      'rebuttal-response-drafting',
    ]);
    expect([...roles].sort()).toEqual(['Author', 'Reviewer']);
    expect([...tasks].sort()).toEqual(['Full paper review', 'Rebuttal']);
    expect([...domains]).toEqual(['Artificial Intelligence']);
  });

  it('recommends a reviewer full-paper prompt', () => {
    const recommendation = recommendResources(catalog, {
      role: 'Reviewer',
      task: 'Full paper review',
      domain: 'Artificial Intelligence',
    });

    expect(recommendation.prompts.map((item) => item.slug)).toEqual(['full-structured-peer-review']);
    expect(Object.keys(recommendation)).toEqual(['prompts']);
  });

  it('recommends an author rebuttal prompt without extra criteria', () => {
    const recommendation = recommendResources(catalog, {
      role: 'Author',
      task: 'Rebuttal',
      domain: 'Artificial Intelligence',
    });

    expect(recommendation.prompts.map((item) => item.slug)).toEqual(['rebuttal-response-drafting']);
  });

  it('builds a prompt-only static index with searchable metadata', () => {
    const index = buildStaticIndex(catalog);

    expect(index.map((item) => item.slug)).toEqual([
      'full-structured-peer-review',
      'rebuttal-response-drafting',
    ]);
    expect(index.every((item) => item.type === 'prompt')).toBe(true);
    expect(index.every((item) => item.searchText.length > 40)).toBe(true);
  });
});
