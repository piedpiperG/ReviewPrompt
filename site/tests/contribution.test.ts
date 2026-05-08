import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildSubmissionIssueUrl, buildSubmissionMarkdown, type ContributionDraft } from '../src/lib/contribution';

const siteRoot = resolve(import.meta.dirname, '..');
const readProjectFile = (path: string) => readFileSync(resolve(siteRoot, path), 'utf8');

const draft: ContributionDraft = {
  title: 'Reviewer evidence audit',
  role: '供作者使用',
  task: '完整论文',
  kind: '单条 Prompt',
  useCase: '投稿前检查论文贡献和证据是否一致。',
  input: '完整论文、图表、参考文献。',
  output: '按风险排序的问题清单。',
  promptText: '请逐条检查论文贡献是否有对应证据支撑。',
  limitations: '不要编造引用、实验结果或审稿规则。',
  source: '原创，允许项目收录。',
  contributor: 'Alice',
};

describe('interactive contribution flow', () => {
  it('builds a structured markdown submission from the contribution form fields', () => {
    const markdown = buildSubmissionMarkdown(draft, 'zh');

    expect(markdown).toContain('Reviewer evidence audit');
    expect(markdown).toContain('供作者使用');
    expect(markdown).toContain('完整论文');
    expect(markdown).toContain('人工智能');
    expect(markdown).toContain('请逐条检查论文贡献是否有对应证据支撑。');
    expect(markdown).toContain('原创，允许项目收录。');
  });

  it('prefills a GitHub issue URL for prompt contributions', () => {
    const url = new URL(buildSubmissionIssueUrl(draft, 'zh'));

    expect(url.origin + url.pathname).toBe('https://github.com/piedpiperG/ReviewPrompt/issues/new');
    expect(url.searchParams.get('labels')).toBe('submission,prompt');
    expect(url.searchParams.get('title')).toBe('[Prompt] Reviewer evidence audit');
    expect(url.searchParams.get('body')).toContain('投稿前检查论文贡献和证据是否一致。');
  });

  it('mounts the interactive contribution wizard on both locale pages', () => {
    const zhPage = readProjectFile('src/pages/contribute/index.astro');
    const enPage = readProjectFile('src/pages/en/contribute/index.astro');

    expect(zhPage).toContain('ContributionWizard');
    expect(enPage).toContain('ContributionWizard');
  });

  it('reinitializes the contribution wizard after Astro client-side navigation', () => {
    const component = readProjectFile('src/components/ContributionWizard.astro');

    expect(component).toContain('data-contribution-wizard');
    expect(component).toContain('astro:page-load');
    expect(component).toContain('WeakSet');
  });
});
