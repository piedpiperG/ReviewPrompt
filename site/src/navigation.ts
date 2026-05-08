import { getPermalink } from './utils/permalinks';
import type { Locale } from './lib/localization';

const githubUrl = 'https://github.com/piedpiperG/ReviewPrompt';

export function getHeaderData(locale: Locale = 'zh') {
  const isZh = locale === 'zh';

  return {
    links: isZh
      ? [
          { text: '首页', href: getPermalink('/') },
          { text: '提示词', href: getPermalink('/prompts') },
          { text: '贡献', href: getPermalink('/contribute') },
          { text: '关于', href: getPermalink('/about') },
          { text: 'English', href: getPermalink('/en') },
        ]
      : [
          { text: 'Home', href: getPermalink('/en') },
          { text: 'Prompts', href: getPermalink('/en/prompts') },
          { text: 'Contribute', href: getPermalink('/en/contribute') },
          { text: 'About', href: getPermalink('/en/about') },
          { text: '简体中文', href: getPermalink('/') },
        ],
    actions: [
      {
        text: isZh ? 'GitHub 仓库' : 'GitHub',
        href: githubUrl,
        target: '_blank',
        icon: 'tabler:brand-github',
      },
    ],
  };
}

export function getFooterData(locale: Locale = 'zh') {
  const isZh = locale === 'zh';

  return {
    links: [
      {
        title: isZh ? '站点' : 'Site',
        links: isZh
          ? [
              { text: '首页', href: getPermalink('/') },
              { text: '提示词库', href: getPermalink('/prompts') },
              { text: '贡献提示词', href: getPermalink('/contribute') },
            ]
          : [
              { text: 'Home', href: getPermalink('/en') },
              { text: 'Prompt Library', href: getPermalink('/en/prompts') },
              { text: 'Contribute', href: getPermalink('/en/contribute') },
            ],
      },
      {
        title: isZh ? '提示词' : 'Prompts',
        links: isZh
          ? [
              { text: '模拟审稿人检查', href: getPermalink('/prompts/reviewer-imitation-quality-check') },
              { text: '逐项论文质检', href: getPermalink('/prompts/author-check-workflow') },
              { text: 'Rebuttal 简报', href: getPermalink('/prompts/rebuttal-briefing') },
            ]
          : [
              { text: 'Reviewer Simulation', href: getPermalink('/en/prompts/reviewer-imitation-quality-check') },
              { text: 'Multi-pass Check', href: getPermalink('/en/prompts/author-check-workflow') },
              { text: 'Rebuttal Briefing', href: getPermalink('/en/prompts/rebuttal-briefing') },
            ],
      },
      {
        title: isZh ? '项目' : 'Project',
        links: [
          { text: isZh ? '关于' : 'About', href: getPermalink(isZh ? '/about' : '/en/about') },
          { text: 'GitHub', href: githubUrl },
        ],
      },
    ],
    secondaryLinks: [
      { text: isZh ? 'English' : '简体中文', href: getPermalink(isZh ? '/en' : '/') },
    ],
    socialLinks: [{ ariaLabel: 'Github', icon: 'tabler:brand-github', href: githubUrl }],
    footNote: isZh
      ? '基于 AstroWind 模板改造，面向人工智能论文审稿提示词。'
      : 'Built on the AstroWind template for AI paper review prompts.',
  };
}

export const headerData = getHeaderData('zh');
export const footerData = getFooterData('zh');
