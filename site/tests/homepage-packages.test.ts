import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const siteRoot = resolve(import.meta.dirname, '..');
const readProjectFile = (path: string) => readFileSync(resolve(siteRoot, path), 'utf8');

describe('home page package positioning', () => {
  it('uses scenario and prompt package components on both home pages', () => {
    const zhHome = readProjectFile('src/pages/index.astro');
    const enHome = readProjectFile('src/pages/en/index.astro');

    expect(zhHome).toContain('ScenarioEntryGrid');
    expect(zhHome).toContain('PromptPackageGrid');
    expect(zhHome).toContain('AgentInstallPanel');
    expect(enHome).toContain('ScenarioEntryGrid');
    expect(enHome).toContain('PromptPackageGrid');
    expect(enHome).toContain('AgentInstallPanel');
  });

  it('positions ReviewPrompt as installable Codex and Claude Code review skills', () => {
    const zhHome = readProjectFile('src/pages/index.astro');
    const enHome = readProjectFile('src/pages/en/index.astro');

    expect(zhHome).toContain('把 ReviewPrompt 装进 Codex / Claude Code');
    expect(zhHome).toContain('不用手动复制 Prompt');
    expect(enHome).toContain('Install ReviewPrompt into Codex / Claude Code');
    expect(enHome).toContain('No manual prompt copying');
  });
});
