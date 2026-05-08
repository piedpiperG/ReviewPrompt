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

    expect(zhPrompt.title).toBe('模拟审稿人论文质量检查');
    expect(zhPrompt.roles).toContain('作者');
    expect(zhPrompt.domains).toEqual(['人工智能']);
    expect(enPrompt.title).toBe('Reviewer Imitation Quality Check');
    expect(enPrompt.roles).toContain('Author');
    expect(enPrompt.domains).toEqual(['Artificial Intelligence']);
  });

  it('keeps localized catalog focused on the three source-backed resources', () => {
    const zhCatalog = getLocalizedCatalog(catalog, 'zh');

    expect(zhCatalog.prompts.map((item) => item.title)).toEqual([
      '模拟审稿人论文质量检查',
      '作者逐项论文质检工作流',
      'Rebuttal 简报整理',
    ]);
    expect(Object.keys(zhCatalog)).toEqual(['prompts', 'promptPackages', 'scenarios']);
  });

  it('localizes prompt packages and scenario entries for the home page', () => {
    const zhCatalog = getLocalizedCatalog(catalog, 'zh');
    const enCatalog = getLocalizedCatalog(catalog, 'en');

    expect(zhCatalog.promptPackages.map((item) => item.title)).toContain('投稿前体检包');
    expect(zhCatalog.scenarios.map((item) => item.title)).toContain('我准备投稿，想知道哪里会被拒');
    expect(enCatalog.promptPackages.map((item) => item.title)).toContain('Submission Readiness Pack');
    expect(enCatalog.scenarios.map((item) => item.title)).toContain('I want Codex / Claude Code to install the skill');
  });

  it('localizes catalog links for English pages', () => {
    const enCatalog = getLocalizedCatalog(catalog, 'en');

    expect(enCatalog.prompts[0].href).toBe('/en/prompts/reviewer-imitation-quality-check/');
    expect(localizedPath('/prompts/', 'zh')).toBe('/prompts/');
    expect(localizedPath('/prompts/', 'en')).toBe('/en/prompts/');
  });
});
