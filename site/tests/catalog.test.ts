import { describe, expect, it } from 'vitest';
import {
  buildStaticIndex,
  catalog,
  getFeaturedResources,
  recommendResources,
} from '../src/lib/catalog';

describe('catalog resources', () => {
  it('exposes featured prompts, workflows, and skills for the home page', () => {
    const featured = getFeaturedResources(catalog);

    expect(featured.prompts).toHaveLength(3);
    expect(featured.workflows.map((item) => item.slug)).toContain('full-paper-review');
    expect(featured.skills.map((item) => item.slug)).toContain('full-paper-review');
  });

  it('recommends a reviewer workflow with prompt and skill matches', () => {
    const recommendation = recommendResources(catalog, {
      role: 'Reviewer',
      task: 'Full paper review',
      stage: 'Under review',
      domain: 'General',
    });

    expect(recommendation.workflow?.slug).toBe('full-paper-review');
    expect(recommendation.prompts.map((item) => item.slug)).toContain('full-structured-peer-review');
    expect(recommendation.skills.map((item) => item.slug)).toContain('full-paper-review');
  });

  it('recommends pre-submission resources for authors', () => {
    const recommendation = recommendResources(catalog, {
      role: 'Author',
      task: 'Pre-submission self review',
      stage: 'Submission-ready',
      domain: 'Machine Learning',
    });

    expect(recommendation.workflow?.slug).toBe('pre-submission-self-review');
    expect(recommendation.prompts.map((item) => item.slug)).toContain('reviewer-attack-simulation');
    expect(recommendation.skills.map((item) => item.slug)).toContain('pre-submission-review');
  });

  it('builds a static index with searchable resource metadata', () => {
    const index = buildStaticIndex(catalog);

    expect(index.length).toBeGreaterThanOrEqual(16);
    expect(index).toContainEqual(
      expect.objectContaining({
        slug: 'methodology-critique',
        type: 'prompt',
        title: 'Methodology Critique',
      }),
    );
    expect(index.every((item) => item.searchText.length > 40)).toBe(true);
  });
});
