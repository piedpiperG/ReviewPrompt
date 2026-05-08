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

    expect(zhPrompt.title).toBe('完整结构化论文审稿');
    expect(zhPrompt.roles).toContain('审稿人');
    expect(enPrompt.title).toBe('Full Structured Peer Review');
    expect(enPrompt.roles).toContain('Reviewer');
  });

  it('keeps duplicate slugs localized by resource type', () => {
    const zhCatalog = getLocalizedCatalog(catalog, 'zh');

    expect(zhCatalog.workflows.find((item) => item.slug === 'full-paper-review')?.title).toBe(
      '完整论文审稿流程',
    );
    expect(zhCatalog.skills.find((item) => item.slug === 'full-paper-review')?.title).toBe(
      'full-paper-review',
    );
    expect(zhCatalog.workflows.find((item) => item.slug === 'meta-review-synthesis')?.steps).toEqual(
      [
        '输入多份审稿意见和评分。',
        '提取共识点。',
        '提取冲突和不确定性。',
        '判断分歧是否影响最终决策。',
        '起草 AC 风格总结。',
      ],
    );
  });

  it('localizes catalog links for English pages', () => {
    const enCatalog = getLocalizedCatalog(catalog, 'en');

    expect(enCatalog.prompts[0].href).toBe('/en/prompts/full-structured-peer-review/');
    expect(localizedPath('/prompts/', 'zh')).toBe('/prompts/');
    expect(localizedPath('/prompts/', 'en')).toBe('/en/prompts/');
  });
});
