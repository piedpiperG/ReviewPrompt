import { describe, expect, it } from 'vitest';
import { catalog } from '../src/lib/catalog';
import {
  getLocaleFromPathname,
  getLocalizedCatalog,
  getLocalizedResource,
  localizedPath,
} from '../src/lib/localization';

describe('localization', () => {
  it('uses Chinese as the default root locale', () => {
    expect(getLocaleFromPathname('/ReviewPrompt/')).toBe('zh');
    expect(getLocaleFromPathname('/ReviewPrompt/prompts/')).toBe('zh');
  });

  it('uses English for /en routes', () => {
    expect(getLocaleFromPathname('/ReviewPrompt/en/')).toBe('en');
    expect(getLocaleFromPathname('/ReviewPrompt/en/prompts/')).toBe('en');
  });

  it('returns localized resource titles and metadata', () => {
    const zhPrompt = getLocalizedResource(catalog.prompts[0], 'zh');
    const enPrompt = getLocalizedResource(catalog.prompts[0], 'en');

    expect(zhPrompt.title).toBe('完整论文审稿');
    expect(zhPrompt.roles).toContain('审稿人');
    expect(zhPrompt.domains).toEqual(['人工智能']);
    expect(enPrompt.title).toBe('Full Structured Peer Review');
    expect(enPrompt.roles).toContain('Reviewer');
    expect(enPrompt.domains).toEqual(['Artificial Intelligence']);
  });

  it('keeps localized catalog prompt-only', () => {
    const zhCatalog = getLocalizedCatalog(catalog, 'zh');

    expect(zhCatalog.prompts.map((item) => item.title)).toEqual([
      '完整论文审稿',
      'Rebuttal 回复起草',
    ]);
    expect(Object.keys(zhCatalog)).toEqual(['prompts']);
  });

  it('localizes catalog links for English pages', () => {
    const enCatalog = getLocalizedCatalog(catalog, 'en');

    expect(enCatalog.prompts[0].href).toBe('/en/prompts/full-structured-peer-review/');
    expect(localizedPath('/prompts/', 'zh')).toBe('/prompts/');
    expect(localizedPath('/prompts/', 'en')).toBe('/en/prompts/');
  });
});
