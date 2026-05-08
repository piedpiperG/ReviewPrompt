import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://piedpiperG.github.io',
  base: '/ReviewPrompt',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'ReviewPrompt',
      description: 'Open prompts, workflows, and agent skills for AI-assisted peer review.',
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
          label: 'Start',
          items: [
            { label: 'Home', slug: 'index' },
            { label: 'Review My Paper', slug: 'use-cases/review-my-paper' },
            { label: 'Improve My Manuscript', slug: 'use-cases/improve-my-manuscript' },
            { label: 'Install Skills', slug: 'use-cases/install-skills' },
          ],
        },
        {
          label: 'Prompts',
          items: [{ autogenerate: { directory: 'prompts' } }],
        },
        {
          label: 'Workflows',
          items: [{ autogenerate: { directory: 'workflows' } }],
        },
        {
          label: 'Skills',
          items: [{ autogenerate: { directory: 'skills' } }],
        },
        {
          label: 'Contribute',
          items: [{ autogenerate: { directory: 'contribute' } }],
        },
        {
          label: 'Docs',
          items: [{ autogenerate: { directory: 'docs' } }],
        },
        { label: 'About', slug: 'about' },
      ],
    }),
  ],
});
