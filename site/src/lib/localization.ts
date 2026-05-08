import type { Catalog, PromptResource } from './catalog';

export type Locale = 'zh' | 'en';

interface PromptTranslation {
  title?: string;
  summary?: string;
  roles?: string[];
  tasks?: string[];
  domains?: string[];
  tags?: string[];
  inputFormat?: string[];
  outputFormat?: string[];
  limitations?: string[];
  promptText?: string;
}

const zhPromptTranslations: Record<string, PromptTranslation> = {
  'full-structured-peer-review': {
    title: '完整论文审稿',
    summary:
      '面向人工智能论文，生成结构清晰的完整审稿意见，覆盖主张、优点、缺点、问题、评分和修改优先级。',
    roles: ['作者', '审稿人'],
    tasks: ['完整论文'],
    domains: ['人工智能'],
    tags: ['完整论文', 'AI', '审稿'],
    inputFormat: ['论文标题', '摘要', '方法', '实验', '主要结果'],
    outputFormat: ['摘要', '优点', '缺点', '作者问题', '评分', '修改优先级'],
    limitations: ['需要用户提供论文证据。', '不能替代人类审稿判断。'],
    promptText: `你正在协助完成一篇研究论文的结构化审稿。

只使用用户提供的论文内容。不要编造引用、缺失实验或会议规则。

请返回包含以下部分的审稿意见：
1. 用中性语言总结论文主张。
2. 论文优点。
3. 主要缺点。
4. 方法和实验问题。
5. 可复现性和表达清晰度问题。
6. 给作者的问题。
7. 建议评分和信心。
8. 具体修改优先级。`,
  },
  'rebuttal-response-drafting': {
    title: 'Rebuttal 回复起草',
    summary: '将人工智能论文审稿意见转化为清晰的 rebuttal 计划、证据回复和论文修改项。',
    roles: ['作者', '审稿人'],
    tasks: ['Rebuttal'],
    domains: ['人工智能'],
    tags: ['rebuttal', 'AI', '回复'],
    inputFormat: ['审稿意见', '论文证据', '作者约束'],
    outputFormat: ['异议分类', '必须回应的问题', '回复草稿', '论文修改项'],
    limitations: ['不能编造新结果；未解决的证据缺口必须明确保留。'],
    promptText: `请将审稿意见转化为有证据支撑的 rebuttal 大纲。

分类每条异议，识别必须回应的问题，起草简洁回复，并标记需要新证据或论文修改的意见。语气应保持事实性，避免防御性表达。`,
  },
};

const zhStatusLabels = {
  curated: '精选',
  tested: '已测试',
} as const;

export type LocalizedPromptResource = PromptResource & {
  statusLabel?: string;
};

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname.split('/').includes('en') ? 'en' : 'zh';
}

export function localizedPath(path: string, locale: Locale): string {
  if (locale === 'zh') return path;
  if (path === '/') return '/en/';
  return `/en${path.startsWith('/') ? path : `/${path}`}`;
}

export function getLocalizedCatalog(source: Catalog, locale: Locale): Catalog {
  return {
    prompts: source.prompts.map((resource) => getLocalizedResource(resource, locale)),
  };
}

export function getLocalizedResource(resource: PromptResource, locale: Locale): LocalizedPromptResource {
  if (locale === 'en') {
    return localizeHref(resource, locale);
  }

  const translation = zhPromptTranslations[resource.slug] ?? {};
  return {
    ...resource,
    ...translation,
    href: localizedPath(resource.href, locale),
    status: resource.status,
    statusLabel: zhStatusLabels[resource.status],
  };
}

function localizeHref(resource: PromptResource, locale: Locale): PromptResource {
  return {
    ...resource,
    href: localizedPath(resource.href, locale),
  };
}
