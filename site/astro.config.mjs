import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://piedpiperG.github.io',
  base: '/ReviewPrompt',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: {
        'zh-CN': 'ReviewPrompt',
        en: 'ReviewPrompt',
      },
      description: '面向 AI 辅助论文审稿的开源 Prompt、Workflow 与 Agent Skill 方法库。',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
        en: {
          label: 'English',
          lang: 'en',
        },
      },
      defaultLocale: 'root',
      customCss: ['./src/styles/custom.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/piedpiperG/ReviewPrompt',
        },
      ],
      sidebar: [
        {
          label: '开始',
          translations: { en: 'Start' },
          items: [
            { label: '首页', translations: { en: 'Home' }, slug: 'index' },
            {
              label: '审一篇论文',
              translations: { en: 'Review My Paper' },
              slug: 'use-cases/review-my-paper',
            },
            {
              label: '改进我的论文',
              translations: { en: 'Improve My Manuscript' },
              slug: 'use-cases/improve-my-manuscript',
            },
            {
              label: '安装 Skills',
              translations: { en: 'Install Skills' },
              slug: 'use-cases/install-skills',
            },
          ],
        },
        {
          label: '提示词',
          translations: { en: 'Prompts' },
          items: [{ autogenerate: { directory: 'prompts' } }],
        },
        {
          label: '工作流',
          translations: { en: 'Workflows' },
          items: [{ autogenerate: { directory: 'workflows' } }],
        },
        {
          label: 'Skills',
          translations: { en: 'Skills' },
          items: [{ autogenerate: { directory: 'skills' } }],
        },
        {
          label: '贡献',
          translations: { en: 'Contribute' },
          items: [{ autogenerate: { directory: 'contribute' } }],
        },
        {
          label: '文档',
          translations: { en: 'Docs' },
          items: [{ autogenerate: { directory: 'docs' } }],
        },
        { label: '关于', translations: { en: 'About' }, slug: 'about' },
      ],
    }),
  ],
});
