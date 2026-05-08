export interface ContributionDraft {
  title: string;
  role: string;
  task: string;
  kind: string;
  useCase: string;
  input: string;
  output: string;
  promptText: string;
  limitations: string;
  source: string;
  contributor: string;
}

export type ContributionLocale = 'zh' | 'en';

const REPOSITORY_ISSUE_URL = 'https://github.com/piedpiperG/ReviewPrompt/issues/new';

const localeText = {
  zh: {
    untitled: '未命名提示词',
    notProvided: '未填写',
    domain: '人工智能',
    sections: {
      basic: '基本信息',
      useCase: '使用场景',
      input: '预期输入',
      output: '预期输出',
      prompt: 'Prompt 正文',
      limitations: '限制与风险',
      source: '来源与授权',
    },
    fields: {
      title: '标题',
      role: '使用对象',
      task: '任务',
      kind: '类型',
      domain: '领域',
      contributor: '贡献者',
    },
  },
  en: {
    untitled: 'Untitled prompt',
    notProvided: 'Not provided',
    domain: 'Artificial Intelligence',
    sections: {
      basic: 'Basic Information',
      useCase: 'Use Case',
      input: 'Expected Input',
      output: 'Expected Output',
      prompt: 'Prompt Text',
      limitations: 'Limitations and Risks',
      source: 'Source and License',
    },
    fields: {
      title: 'Title',
      role: 'Intended User',
      task: 'Task',
      kind: 'Type',
      domain: 'Domain',
      contributor: 'Contributor',
    },
  },
} as const;

export function buildSubmissionMarkdown(draft: ContributionDraft, locale: ContributionLocale): string {
  const text = localeText[locale];
  const title = valueOrFallback(draft.title, text.untitled);

  return [
    `# ${title}`,
    '',
    `## ${text.sections.basic}`,
    `- ${text.fields.title}: ${title}`,
    `- ${text.fields.role}: ${valueOrFallback(draft.role, text.notProvided)}`,
    `- ${text.fields.task}: ${valueOrFallback(draft.task, text.notProvided)}`,
    `- ${text.fields.kind}: ${valueOrFallback(draft.kind, text.notProvided)}`,
    `- ${text.fields.domain}: ${text.domain}`,
    `- ${text.fields.contributor}: ${valueOrFallback(draft.contributor, text.notProvided)}`,
    '',
    `## ${text.sections.useCase}`,
    valueOrFallback(draft.useCase, text.notProvided),
    '',
    `## ${text.sections.input}`,
    valueOrFallback(draft.input, text.notProvided),
    '',
    `## ${text.sections.output}`,
    valueOrFallback(draft.output, text.notProvided),
    '',
    `## ${text.sections.prompt}`,
    '~~~text',
    valueOrFallback(draft.promptText, text.notProvided),
    '~~~',
    '',
    `## ${text.sections.limitations}`,
    valueOrFallback(draft.limitations, text.notProvided),
    '',
    `## ${text.sections.source}`,
    valueOrFallback(draft.source, text.notProvided),
  ].join('\n');
}

export function buildSubmissionIssueUrl(draft: ContributionDraft, locale: ContributionLocale): string {
  const text = localeText[locale];
  const title = valueOrFallback(draft.title, text.untitled);
  const url = new URL(REPOSITORY_ISSUE_URL);

  url.searchParams.set('labels', 'submission,prompt');
  url.searchParams.set('title', `[Prompt] ${title}`);
  url.searchParams.set('body', buildSubmissionMarkdown(draft, locale));

  return url.toString();
}

function valueOrFallback(value: string, fallback: string): string {
  const normalized = value.trim();

  return normalized.length > 0 ? normalized : fallback;
}
