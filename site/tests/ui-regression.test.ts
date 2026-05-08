import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const siteRoot = resolve(import.meta.dirname, '..');
const readProjectFile = (path: string) => readFileSync(resolve(siteRoot, path), 'utf8');

describe('UI regressions', () => {
  it('reinitializes the task recommender after Astro client-side navigation', () => {
    const recommender = readProjectFile('src/components/TaskRecommender.astro');

    expect(recommender).toContain('astro:page-load');
    expect(recommender).toContain('querySelectorAll');
    expect(recommender).toContain('WeakSet');
  });

  it('uses a centered detail shell and overflow-safe detail panels for prompt pages', () => {
    const zhPromptPage = readProjectFile('src/pages/prompts/[slug].astro');
    const enPromptPage = readProjectFile('src/pages/en/prompts/[slug].astro');
    const styles = readProjectFile('src/assets/styles/tailwind.css');

    expect(zhPromptPage).toContain('rp-detail-shell');
    expect(enPromptPage).toContain('rp-detail-shell');
    expect(styles).toContain('.rp-detail-shell');
    expect(styles).toContain('min-width: 0');
  });
});
