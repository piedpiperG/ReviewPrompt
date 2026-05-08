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
      description: '面向人工智能论文审稿的双语提示词库。',
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
          items: [{ label: '首页', translations: { en: 'Home' }, slug: 'index' }],
        },
        {
          label: '提示词',
          translations: { en: 'Prompts' },
          items: [
            { label: '提示词库', translations: { en: 'Prompt Library' }, slug: 'prompts' },
            {
              label: '完整论文审稿',
              translations: { en: 'Full Paper Review' },
              slug: 'prompts/full-structured-peer-review',
            },
            {
              label: 'Rebuttal 回复',
              translations: { en: 'Rebuttal Response' },
              slug: 'prompts/rebuttal-response-drafting',
            },
          ],
        },
        {
          label: '贡献',
          translations: { en: 'Contribute' },
          items: [{ autogenerate: { directory: 'contribute' } }],
        },
        { label: '关于', translations: { en: 'About' }, slug: 'about' },
      ],
    }),
  ],
});
