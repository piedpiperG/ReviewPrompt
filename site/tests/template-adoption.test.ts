import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const siteRoot = resolve(import.meta.dirname, '..');
const readProjectFile = (path: string) => readFileSync(resolve(siteRoot, path), 'utf8');

describe('AstroWind template adoption', () => {
  it('uses AstroWind layout, widget, and UI components as the site base', () => {
    expect(existsSync(resolve(siteRoot, 'src/layouts/PageLayout.astro'))).toBe(true);
    expect(existsSync(resolve(siteRoot, 'src/components/widgets/Hero.astro'))).toBe(true);
    expect(existsSync(resolve(siteRoot, 'src/components/widgets/Header.astro'))).toBe(true);
    expect(existsSync(resolve(siteRoot, 'src/components/ui/Button.astro'))).toBe(true);
  });

  it('renders the home page through AstroWind components instead of the custom shell', () => {
    const homePage = readProjectFile('src/pages/index.astro');

    expect(homePage).toContain("~/layouts/PageLayout.astro");
    expect(homePage).toContain("~/components/widgets/Hero.astro");
    expect(homePage).toContain("~/components/widgets/Features.astro");
  });

  it('keeps AstroWind dependencies and path alias configured', () => {
    const packageJson = JSON.parse(readProjectFile('package.json')) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const tsconfig = readProjectFile('tsconfig.json');

    expect(packageJson.dependencies).toHaveProperty('astro-icon');
    expect(packageJson.devDependencies).toHaveProperty('@astrojs/tailwind');
    expect(packageJson.devDependencies).toHaveProperty('tailwindcss');
    expect(tsconfig).toContain('"~/*"');
  });
});
