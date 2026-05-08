import type {
  Catalog,
  PromptResource,
  SkillResource,
  WorkflowResource,
} from './catalog';

export type Locale = 'zh' | 'en';
type Resource = PromptResource | WorkflowResource | SkillResource;

interface ResourceTranslation {
  title?: string;
  summary?: string;
  roles?: string[];
  tasks?: string[];
  stages?: string[];
  domains?: string[];
  tags?: string[];
  inputFormat?: string[];
  outputFormat?: string[];
  limitations?: string[];
  promptText?: string;
  steps?: string[];
  outputArtifacts?: string[];
  skillPreview?: string;
}

const zhResourceTranslations: Record<string, ResourceTranslation> = {
  'full-structured-peer-review': {
    title: '完整结构化论文审稿',
    summary:
      '生成一份平衡的论文审稿意见，覆盖贡献、正确性、方法、实验、局限、可复现性、评分和信心。',
    roles: ['审稿人', '作者', '实验室内部审稿人'],
    tasks: ['完整论文审稿', '投稿前自审稿'],
    stages: ['审稿中', '投稿就绪'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', '系统', 'HCI'],
    tags: ['完整审稿', '评审 rubric', '可封装为 Skill'],
    inputFormat: ['论文标题', '摘要', '方法部分', '实验部分', '可选会议 rubric'],
    outputFormat: ['摘要', '优点', '缺点', '作者问题', '评分', '信心'],
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
  'methodology-critique': {
    title: '方法论批评',
    summary: '检查论文方法和实验设计是否真正支撑核心主张。',
    roles: ['审稿人', '作者'],
    tasks: ['方法论批评', '实验批评'],
    stages: ['早期草稿', '投稿就绪', '审稿中'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', '系统'],
    tags: ['方法论', '实验', '主张检查'],
    inputFormat: ['核心主张', '方法描述', '实验设置', '报告结果'],
    outputFormat: ['主张与方法匹配度', '假设', '有效性威胁', '缺失证据'],
    limitations: ['需要足够的方法细节，才能区分真实缺陷和上下文缺失。'],
    promptText: `请作为研究论文的方法论批评者。

识别论文的核心主张、方法背后的假设，以及实验设计是否足以支撑该主张。请区分有证据支持的问题和推测。除非实验能直接检验主张，否则不要随意要求新增实验。`,
  },
  'reviewer-attack-simulation': {
    title: '审稿人攻击点模拟',
    summary: '在投稿前模拟潜在审稿意见，并将风险转化为有优先级的修改清单。',
    roles: ['作者', '实验室内部审稿人'],
    tasks: ['投稿前自审稿', '审稿人模拟'],
    stages: ['早期草稿', '投稿就绪'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉'],
    tags: ['自审稿', '风险分析', '修改清单'],
    inputFormat: ['论文草稿', '目标会议', '当前局限', '计划实验'],
    outputFormat: ['审稿人画像', '攻击点', '证据缺口', '修改优先级'],
    limitations: ['如果缺少目标会议上下文，可能会高估攻击性意见。'],
    promptText: `请模拟 3 位可能的审稿人来评估一篇即将投稿的论文。

Reviewer 1 关注新颖性，Reviewer 2 关注方法和实验，Reviewer 3 关注表达清晰度和相关工作定位。对每位审稿人，列出最强反对意见、他们会引用的证据，以及能降低该风险的修改。`,
  },
  'rebuttal-response-drafting': {
    title: 'Rebuttal 回复起草',
    summary: '将审稿意见转化为有证据支撑的 rebuttal 大纲，并检查语气。',
    roles: ['作者'],
    tasks: ['Rebuttal 模拟', 'Rebuttal 起草'],
    stages: ['Rebuttal'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', 'HCI'],
    tags: ['rebuttal', '语气', '证据'],
    inputFormat: ['审稿意见', '论文证据', '作者约束'],
    outputFormat: ['异议分类', '必须回应的问题', '回复草稿', '论文修改项'],
    limitations: ['不能编造新结果；未解决的证据缺口必须明确保留。'],
    promptText: `请将审稿意见转化为有证据支撑的 rebuttal 大纲。

分类每条异议，识别必须回应的问题，起草简洁回复，并标记需要新证据或论文修改的意见。语气应保持事实性，避免防御性表达。`,
  },
  'reproducibility-checklist': {
    title: '可复现性检查清单',
    summary: '审查论文中缺失的实现、数据、指标和实验细节。',
    roles: ['审稿人', '作者'],
    tasks: ['可复现性检查', '实验批评'],
    stages: ['早期草稿', '投稿就绪', '审稿中', '最终版'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', '系统'],
    tags: ['可复现性', '实验', '检查清单'],
    inputFormat: ['方法', '实验', '附录', '公开仓库链接（如有）'],
    outputFormat: ['缺失细节', '风险等级', '可执行检查清单'],
    limitations: ['除非用户提供，否则无法检查私有代码或隐藏数据。'],
    promptText: `请审查论文的可复现性风险。

检查数据集、预处理、baseline、超参数、指标、消融实验、计算预算、随机种子和实现细节。请把缺失信息输出为检查清单。`,
  },
  'meta-review-synthesis': {
    title: 'Meta-review 综合',
    summary: '将多份审稿意见综合为共识、冲突点、关键问题和 AC 风格总结。',
    roles: ['领域主席', 'Meta-reviewer'],
    tasks: ['Meta-review 综合'],
    stages: ['审稿中'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', 'HCI'],
    tags: ['meta-review', '综合', '领域主席'],
    inputFormat: ['审稿文本', '评分', '信心值', '讨论记录（如有）'],
    outputFormat: ['共识', '冲突', '决策关键证据', 'AC 总结'],
    limitations: ['需要完整审稿意见，避免掩盖少数但关键的担忧。'],
    promptText: `请将多份 peer review 综合为领域主席风格的 meta-review。

提取共识、分歧、决策关键证据、未解决问题和平衡总结。不要机械平均评分。`,
  },
  'workflow:meta-review-synthesis': {
    title: 'Meta-review 综合流程',
    summary: '将多份审稿意见转化为共识、分歧、决策关键证据和 AC 风格总结。',
    roles: ['领域主席', 'Meta-reviewer'],
    tasks: ['Meta-review 综合'],
    stages: ['审稿中'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', 'HCI'],
    tags: ['meta-review', '领域主席', '综合'],
    steps: [
      '输入多份审稿意见和评分。',
      '提取共识点。',
      '提取冲突和不确定性。',
      '判断分歧是否影响最终决策。',
      '起草 AC 风格总结。',
    ],
    outputArtifacts: ['审稿共识', '冲突地图', 'Meta-review 草稿'],
  },
  'full-paper-review': {
    title: '完整论文审稿流程',
    summary: '端到端流程：理解论文、检查主张、批评方法和实验、起草审稿意见并校准评分。',
    roles: ['审稿人', '作者', '实验室内部审稿人'],
    tasks: ['完整论文审稿'],
    stages: ['审稿中', '投稿就绪'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', '系统', 'HCI'],
    tags: ['审稿人', '完整审稿', '评分校准'],
    steps: [
      '理解论文摘要和核心主张。',
      '提取贡献和声称的新颖性。',
      '基于提供的相关工作检查新颖性。',
      '批评方法和假设。',
      '批评实验、baseline、指标和消融。',
      '分析局限、可复现性、伦理和清晰度。',
      '起草结构化审稿意见。',
      '校准评分和信心。',
    ],
    outputArtifacts: ['结构化审稿意见', '给作者的问题', '评分校准记录'],
    skillPreview:
      '适用于论文审稿或投稿前自审稿。输出包含主张、优点、缺点、问题、评分和信心的结构化审稿意见。',
  },
  'skill:full-paper-review': {
    title: 'full-paper-review',
    summary: '用于结构化论文审稿和投稿前自审稿的可复用 Agent Skill。',
    roles: ['审稿人', '作者', '实验室内部审稿人'],
    tasks: ['完整论文审稿'],
    stages: ['审稿中', '投稿就绪'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', '系统', 'HCI'],
    tags: ['Codex', 'Claude Code', '审稿'],
    skillPreview:
      '适用于论文审稿或投稿前自审稿。输出包含主张、优点、缺点、问题、评分和信心的结构化审稿意见。',
  },
  'pre-submission-self-review': {
    title: '投稿前自审稿流程',
    summary: '帮助作者在投稿前发现审稿人攻击点、缺失证据和修改优先级。',
    roles: ['作者', '实验室内部审稿人'],
    tasks: ['投稿前自审稿'],
    stages: ['早期草稿', '投稿就绪'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', 'HCI'],
    tags: ['作者', '自审稿', '修改'],
    steps: [
      '识别论文核心主张。',
      '检查贡献是否清晰。',
      '模拟潜在审稿人反对意见。',
      '检查实验是否支撑主张。',
      '生成修改检查清单。',
      '模拟不同审稿人画像。',
      '按风险和成本确定修改优先级。',
    ],
    outputArtifacts: ['攻击点', '修改清单', '优先级计划'],
    skillPreview: '适用于投稿前准备。发现审稿攻击点、证据缺口和修改优先级。',
  },
  'rebuttal-simulation': {
    title: 'Rebuttal 模拟流程',
    summary: '分类审稿人异议，识别所需证据，起草回复并检查语气。',
    roles: ['作者'],
    tasks: ['Rebuttal 模拟', 'Rebuttal 起草'],
    stages: ['Rebuttal'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', 'HCI'],
    tags: ['rebuttal', '证据', '语气'],
    steps: [
      '输入审稿意见。',
      '按主题和严重程度分类异议。',
      '识别必须回应的问题。',
      '起草有证据支撑的 rebuttal 回复。',
      '检查语气并移除防御性措辞。',
      '生成最终 rebuttal 大纲。',
    ],
    outputArtifacts: ['异议地图', '回复大纲', '语气检查清单'],
    skillPreview: '适用于 rebuttal 阶段。分类异议、识别证据、起草回复并检查语气。',
  },
  'lab-internal-review': {
    title: '实验室内部审稿流程',
    summary: '用于组内读论文、投稿前反馈和作者修改计划的实用流程。',
    roles: ['作者', '实验室内部审稿人'],
    tasks: ['投稿前自审稿', '写作清晰度', '可复现性检查'],
    stages: ['早期草稿', '投稿就绪', '最终版'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', '系统', 'HCI'],
    tags: ['实验室', '内部审稿', '修改'],
    steps: [
      '按贡献、方法、实验和写作分配审稿人。',
      '收集结构化意见。',
      '合并重复问题。',
      '区分必须修改和可选优化。',
      '为作者生成修改清单。',
    ],
    outputArtifacts: ['内部审稿记录', '合并问题列表', '作者检查清单'],
  },
  'pre-submission-review': {
    title: 'pre-submission-review',
    summary: '帮助作者在投稿前攻击自己的论文，并生成修改检查清单。',
    roles: ['作者', '实验室内部审稿人'],
    tasks: ['投稿前自审稿', '审稿人模拟'],
    stages: ['早期草稿', '投稿就绪'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', 'HCI'],
    tags: ['作者', '自审稿', 'Codex'],
    skillPreview: '适用于论文投稿前准备。发现审稿攻击点、证据缺口和修改优先级。',
  },
  'methodology-critic': {
    title: 'methodology-critic',
    summary: '聚焦主张与方法匹配、实验设计、假设和有效性威胁。',
    roles: ['审稿人', '作者'],
    tasks: ['方法论批评', '实验批评'],
    stages: ['早期草稿', '投稿就绪', '审稿中'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', '系统'],
    tags: ['方法论', '实验', 'Skill'],
    skillPreview: '用于批评论文方法、假设和实验是否支撑核心主张。',
  },
  'rebuttal-coach': {
    title: 'rebuttal-coach',
    summary: '将审稿意见转化为回复策略、有证据支撑的 rebuttal 草稿和语气检查。',
    roles: ['作者'],
    tasks: ['Rebuttal 模拟', 'Rebuttal 起草'],
    stages: ['Rebuttal'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', 'HCI'],
    tags: ['rebuttal', '语气', 'Skill'],
    skillPreview: '适用于 rebuttal 阶段。分类异议、识别证据、起草回复并检查语气。',
  },
  'meta-review-synthesizer': {
    title: 'meta-review-synthesizer',
    summary: '将多份审稿意见综合为共识、冲突、决策关键证据和 AC 总结。',
    roles: ['领域主席', 'Meta-reviewer'],
    tasks: ['Meta-review 综合'],
    stages: ['审稿中'],
    domains: ['通用', '机器学习', 'NLP', '计算机视觉', 'HCI'],
    tags: ['meta-review', '领域主席', 'Skill'],
    skillPreview: '适用于多份审稿意见综合。提取共识、冲突、未解决问题和 meta-review 总结。',
  },
};

const zhStatusLabels = {
  curated: '精选',
  tested: '已测试',
  experimental: '实验性',
  deprecated: '已废弃',
} as const;

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname.split('/').includes('en') ? 'en' : 'zh';
}

export function localizedPath(path: string, locale: Locale): string {
  if (locale === 'zh') return path;
  if (path === '/') return '/en/';
  return `/en${path.startsWith('/') ? path : `/${path}`}`;
}

export function getLocalizedCatalog(source: Catalog, locale: Locale): Catalog {
  if (locale === 'en') {
    return {
      prompts: source.prompts.map((resource) => localizeHref(resource, locale)),
      workflows: source.workflows.map((resource) => localizeHref(resource, locale)),
      skills: source.skills.map((resource) => localizeHref(resource, locale)),
    };
  }

  return {
    prompts: source.prompts.map((resource) => getLocalizedResource(resource, locale) as PromptResource),
    workflows: source.workflows.map(
      (resource) => getLocalizedResource(resource, locale) as WorkflowResource,
    ),
    skills: source.skills.map((resource) => getLocalizedResource(resource, locale) as SkillResource),
  };
}

export function getLocalizedResource(resource: Resource, locale: Locale): Resource {
  if (locale === 'en') return localizeHref(resource, locale);

  const translation =
    zhResourceTranslations[resourceKey(resource)] ?? zhResourceTranslations[resource.slug] ?? {};
  const localized = {
    ...resource,
    ...translation,
    href: localizedPath(resource.href, locale),
    status: resource.status,
  } as Resource;

  return {
    ...localized,
    statusLabel: zhStatusLabels[resource.status],
  } as Resource & { statusLabel: string };
}

function localizeHref<T extends Resource>(resource: T, locale: Locale): T {
  return {
    ...resource,
    href: localizedPath(resource.href, locale),
  };
}

function resourceKey(resource: Resource): string {
  return `${resource.type}:${resource.slug}`;
}
