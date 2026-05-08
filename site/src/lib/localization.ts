import type { Catalog, PromptPackage, PromptResource, ScenarioEntry, SkillWorkflow, WorkflowStep } from './catalog';

export type Locale = 'zh' | 'en';

interface PromptTranslation {
  title?: string;
  summary?: string;
  useCase?: string;
  roles?: string[];
  tasks?: string[];
  domains?: string[];
  tags?: string[];
  inputFormat?: string[];
  outputFormat?: string[];
  limitations?: string[];
  promptText?: string;
  workflowSteps?: WorkflowStep[];
  skillWorkflow?: SkillWorkflow;
}

type PromptPackageTranslation = Partial<Omit<PromptPackage, 'slug' | 'promptSlugs' | 'href' | 'skillUrl'>>;
type ScenarioEntryTranslation = Partial<Omit<ScenarioEntry, 'id' | 'packageSlug' | 'href'>>;

const reviewerImitationPromptZh = `现在你是一个专业严格的 INTERSPEECH 会议审稿人。

请对这篇论文从多个专业审稿人角度进行审稿，审查它的工作质量如何，是否能被会议接收。每个审稿人都要给出具体评分，最终也要给出总体评分。

要求：
1. 只基于用户提供的论文内容，不要编造实验、引用或会议规则。
2. 每个模拟审稿人都要给出论文摘要、优点、主要缺点、给作者的问题、接收风险、评分和信心。
3. 最后给出总体判断：当前论文是否有竞争力，最需要优先修改什么。

请用中文回答。`;

const basicWritingPromptZh = `你正在检查一篇研究论文的基础写作问题。

请仔细阅读用户提供的论文，只报告有文本证据的问题。重点检查拼写错误、语法错误、别扭表达、重复表达、未定义缩写、格式不一致，以及难以理解的句子。

请用表格输出：位置、原文、问题类型、为什么影响论文质量、具体修改建议。如果某一类没有发现问题，请明确说明。`;

const keywordConsistencyPromptZh = `你正在检查论文的关键词与主题一致性。

请先总结论文总体在讲什么，并提炼 5-8 个核心关键词。然后检查这些关键词及其同义表达是否在标题、摘要、引言、方法、实验和结论中保持一致。

请标记缺失、漂移、过度泛化、含义冲突或前后叫法不一致的问题。每个问题都要说明出现位置、含义如何变化，以及作者应该如何统一标题、摘要和正文。`;

const citationAuditPromptZh = `你正在检查论文中的引用问题。

只使用用户提供的论文正文和参考文献列表。除非文本证据支持，否则不要断言某篇引用是假的。请检查没有引用支撑的事实性表述、引用与周围论断不匹配、重要背景缺少引用、参考文献信息不一致，以及看起来和论文贡献无关的引用。

请输出可疑项：被支撑的论断原文、对应引用、风险等级、为什么可疑，以及作者需要补充什么证据来确认或修复。`;

const experimentSetupPromptZh = `你正在检查论文的实验设置。

请检查数据集、划分方式、baseline、指标、超参数、训练细节、消融实验、统计检验和评估协议。重点寻找关键参数缺失、不公平比较、数据泄漏风险、实现细节不清，以及实验设计中的明显逻辑错误。

请把问题写成可操作的审稿意见：位置、问题、为什么影响有效性、需要补充什么细节或实验，以及问题严重程度（轻微、主要、阻塞）。`;

const figureTablePromptZh = `你正在检查图、表、caption 和正文是否一致。

请逐一比较图表中的数字、趋势、方法名、数据集名、指标和结论，检查它们是否与正文描述一致。重点标记数字不一致、缩写未解释、caption 信息不足、取整不一致，以及正文结论是否夸大了图表能支持的内容。

请输出具体不一致清单，包括位置、冲突内容和建议修改方式。`;

const narrativeLogicPromptZh = `你正在检查论文叙述逻辑的一致性。

请先提炼论文的 3-5 个核心观点。然后沿着摘要、引言、方法、实验、结果和结论追踪每个观点，检查论文是否改变了主张、前后矛盾、跳过必要推理，或在证据不足时提前做出过强结论。

请对每个核心观点输出：支撑段落、矛盾或逻辑缺口、严重程度，以及建议的改写或结构调整。`;

const contributionEvidencePromptZh = `你正在检查论文贡献点与证据链是否一致。

请列出论文声称的每一个贡献。对每个贡献，找出它对应的实验、消融、分析、定理、用户研究或定性证据。检查是否存在贡献声称过强、证据不足、与已有工作重复、或缺少直接证据链的问题。

请用表格输出：贡献点、已有证据、缺失证据、对接收风险的影响，以及更稳妥的表述或需要补充的实验。`;

const authorCheckWorkflowPromptZh = `请对一篇研究论文做多轮作者自查。

不要把所有检查混成一次笼统审稿。请把每个检查点当作一次独立 review pass 单独执行，这样输出会更具体、更容易验证：
1. 基础写作类错误。
2. 关键词一致性。
3. 引用错误。
4. 实验设置错误。
5. 图/表正文一致性问题。
6. 叙述逻辑一致性问题。
7. 贡献点与证据链一致性。

每个 pass 都要引用论文中的具体文本或位置，区分已确认问题和不确定问题，并在最后给出优先修改列表。`;

const authorCheckAgentInstructionZh = `你是一个帮助作者在投稿前查找论文问题的 AI 论文审查代理。

请阅读当前工作区中的论文材料，包括 PDF、LaTeX、Markdown、图、表、参考文献、附录、补充材料、reviews 或作者笔记。

请把下面每个检查点作为独立的一轮 review pass 执行。不要合并成一次泛泛的总体审稿：
1. 基础写作类错误。
2. 关键词一致性。
3. 引用错误。
4. 实验设置错误。
5. 图/表正文一致性问题。
6. 叙述逻辑一致性问题。
7. 贡献点与证据链一致性。

每一轮都要：
- 只使用工作区文件中的证据。
- 引用或定位相关段落、图、表、公式或参考文献。
- 把每个发现标记为“已确认”“很可能”“需要人工确认”。
- 说明它为什么可能影响审稿结果。
- 给出具体修改建议。

全部检查结束后，写一个 author-check-report.md，包含：
1. 总体摘要。
2. 按接收风险排序的 Top 10 问题。
3. 按检查点分组的详细发现。
4. 今天就能改的 quick fixes。
5. 需要补实验或重写的 deeper fixes。
6. 需要作者决策的问题。`;

const rebuttalBriefingPromptZh = `请帮我整理一个给老师和 coauthor 看的 rebuttal 简报。

请先了解这篇论文、reviews 和当前 rebuttal。然后总结各个 reviews 的主要意见，附带简短英文原文来增加可信度；给出当前 rebuttal 正文；再说明这些 rebuttal 回复背后的理由和证据。

请输出一个精炼、可共享的文档，包含：
1. 当前 reviews 的整体情况。
2. 按 reviewer 总结主要意见，并附对应英文原文片段。
3. 当前 rebuttal 正文。
4. 每条回复背后的理由、证据或论文位置。
5. 目前还缺证据或风险较高的说法。
6. 需要老师或 coauthor 决策的问题。`;

const zhPromptTranslations: Record<string, PromptTranslation> = {
  'reviewer-imitation-quality-check': {
    title: '模拟审稿人论文质量检查',
    summary: '让 AI 模仿严格的 INTERSPEECH 审稿人，从多个审稿人角度判断论文质量、接收风险、评分和修改优先级。',
    useCase: '我想知道审稿人可能怎样评价这篇论文。',
    roles: ['作者'],
    tasks: ['模拟审稿'],
    domains: ['人工智能'],
    tags: ['模拟审稿人', '接收风险', 'INTERSPEECH'],
    inputFormat: ['论文标题', '摘要', '完整论文', '目标会议或会议风格'],
    outputFormat: ['多个模拟审稿意见', '每个审稿人评分', '总体评分', '接收风险判断'],
    limitations: ['模型不能预测真实审稿结果。', '如果目标会议不是 INTERSPEECH，应调整会议风格。'],
    promptText: reviewerImitationPromptZh,
  },
  'author-check-workflow': {
    title: '作者逐项论文质检工作流',
    summary: '把论文质量检查拆成 7 个独立 LLM pass，分别查写作、关键词、引用、实验、图表、逻辑和贡献证据链。',
    useCase: '我想让 Codex 或 Claude Code 多轮检查论文并汇总问题。',
    roles: ['作者'],
    tasks: ['逐项论文质检'],
    domains: ['人工智能'],
    tags: ['工作流', '多轮审查', '作者自查'],
    inputFormat: ['完整论文', '图和表', '参考文献', '附录或补充材料'],
    outputFormat: ['7 个检查点报告', '按风险排序的问题列表', 'author-check-report.md'],
    limitations: ['每个检查点应单独运行，避免泛泛而谈。', '引用和实验设置问题仍需要作者人工确认。'],
    promptText: authorCheckWorkflowPromptZh,
    workflowSteps: [
      {
        id: 'basic-writing-errors',
        title: '基础写作类错误',
        summary: '检查拼写、语法、表达、缩写和格式问题。',
        promptText: basicWritingPromptZh,
      },
      {
        id: 'keyword-consistency',
        title: '关键词一致性',
        summary: '提炼核心关键词，检查标题、摘要和正文是否统一。',
        promptText: keywordConsistencyPromptZh,
      },
      {
        id: 'citation-audit',
        title: '引用错误',
        summary: '检查虚假、错配、不合适或缺失的引用。',
        promptText: citationAuditPromptZh,
      },
      {
        id: 'experiment-setup-audit',
        title: '实验设置错误',
        summary: '检查 baseline、指标、数据划分、超参数、消融和评估协议。',
        promptText: experimentSetupPromptZh,
      },
      {
        id: 'figure-table-consistency',
        title: '图/表正文一致性问题',
        summary: '比对图表、caption、数字、趋势和正文结论。',
        promptText: figureTablePromptZh,
      },
      {
        id: 'narrative-logic-consistency',
        title: '叙述逻辑一致性问题',
        summary: '追踪核心观点，检查前后矛盾、推理跳跃和过强结论。',
        promptText: narrativeLogicPromptZh,
      },
      {
        id: 'contribution-evidence-alignment',
        title: '贡献点与证据链一致性',
        summary: '检查每个贡献是否有对应实验、分析或证据支撑。',
        promptText: contributionEvidencePromptZh,
      },
    ],
    skillWorkflow: {
      title: 'Codex / Claude Code 论文质检工作流',
      summary: '在论文项目目录中复制这段指令，让 Codex 或 Claude Code 按 7 个检查点分别审查并生成汇总报告。',
      tools: ['Codex', 'Claude Code'],
      setupSteps: [
        '打开包含论文、图表、参考文献和附录的项目目录。',
        '把下面的代理工作流指令粘贴给 Codex 或 Claude Code。',
        '要求代理每个检查点单独运行一轮，再写最终报告。',
        '阅读 author-check-report.md，决定哪些问题需要修改论文。',
      ],
      agentInstruction: authorCheckAgentInstructionZh,
    },
  },
  'rebuttal-briefing': {
    title: 'Rebuttal 简报整理',
    summary: '整理 reviews、当前 rebuttal 正文和回复理由，生成可给老师或 coauthor 快速检查的简要文档。',
    useCase: '我需要给老师或合作者看的 rebuttal 简报。',
    roles: ['作者'],
    tasks: ['Rebuttal 简报'],
    domains: ['人工智能'],
    tags: ['rebuttal', '简报', '合作者检查'],
    inputFormat: ['论文正文', '审稿意见', '当前 rebuttal 草稿', '作者补充说明'],
    outputFormat: ['review 总结', '英文原文摘录', '当前 rebuttal 正文', '回复理由'],
    limitations: ['引用 review 原文时应简短且相关。', '不能编造审稿意见、实验结果或作者承诺。'],
    promptText: rebuttalBriefingPromptZh,
  },
};

const zhPromptPackageTranslations: Record<string, PromptPackageTranslation> = {
  'submission-readiness-pack': {
    title: '投稿前体检包',
    summary: '面向投稿前作者，把写作、引用、实验、图表、逻辑、贡献证据链和接收风险放在一起检查。',
    scenario: '投稿前',
    includedPrompts: [
      '基础写作类错误',
      '关键词一致性',
      '引用错误',
      '实验设置错误',
      '图/表正文一致性问题',
      '叙述逻辑一致性问题',
      '贡献点与证据链一致性',
      '模拟审稿人接收风险评估',
    ],
    outcomes: ['按接收风险排序的问题', '有证据的修改清单', '作者自查报告'],
  },
  'reviewer-simulation-pack': {
    title: '模拟审稿压力测试包',
    summary: '从审稿人、挑剔审稿人和 meta-review 视角提前压测论文，找出可能被质疑的点。',
    scenario: '审稿压力测试',
    includedPrompts: ['严格审稿人模拟', '接收风险评分', '审稿人可能追问的问题', '贡献点与证据链一致性'],
    outcomes: ['潜在审稿意见', '评分与信心估计', '优先修改路线'],
  },
  'rebuttal-sprint-pack': {
    title: 'Rebuttal 冲刺包',
    summary: '把 reviews 转成给老师或 coauthor 快速判断的简报、风险清单和回复计划。',
    scenario: '收到 reviews 后',
    includedPrompts: ['review 总结', '保留审稿意见英文原文', '当前 rebuttal 简报', '缺失证据和高风险说法'],
    outcomes: ['可分享 rebuttal 简报', '需要导师决策的问题', '证据缺口清单'],
  },
  'agent-skill-install-pack': {
    title: 'Agent 技能安装包',
    summary: '把一个 ReviewPrompt 地址喂给 Codex 或 Claude Code，让论文审稿 prompt 变成可复用技能。',
    scenario: 'Agent 原生工作流',
    includedPrompts: ['author-paper-check skill', 'full-paper-review skill', '多轮 Prompt 工作流', 'Rebuttal 简报 Prompt'],
    outcomes: ['不用手动复制 Prompt', '可复用论文审稿命令', '基于工作区文件的审查报告'],
    agentInstruction: `请从下面两个地址安装或读取 ReviewPrompt 的论文审稿技能：
- https://github.com/piedpiperG/ReviewPrompt/blob/main/skills/author-paper-check/SKILL.md
- https://github.com/piedpiperG/ReviewPrompt/blob/main/skills/full-paper-review/SKILL.md

安装后，在当前论文项目中使用 author-paper-check 做多轮作者自查，使用 full-paper-review 做结构化审稿式评估。`,
  },
};

const zhScenarioTranslations: Record<string, ScenarioEntryTranslation> = {
  'before-submission': {
    title: '我准备投稿，想知道哪里会被拒',
    summary: '用投稿前体检包检查写作、引用、实验、逻辑、图表和证据链风险。',
    stage: '投稿前',
    cta: '打开体检包',
  },
  'simulate-review': {
    title: '我想提前看到真实审稿人会怎么怼',
    summary: '用模拟审稿压力测试包估计接收风险、评分和审稿人可能追问的问题。',
    stage: '压力测试',
    cta: '模拟审稿',
  },
  'after-reviews': {
    title: '我收到了 reviews，要快速组织 rebuttal',
    summary: '生成带原文摘录、证据缺口和导师决策点的 Rebuttal 简报。',
    stage: 'Rebuttal',
    cta: '准备回复',
  },
  'install-agent-skill': {
    title: '我想让 Codex / Claude Code 直接安装技能',
    summary: '把 ReviewPrompt 地址给 agent，让论文审稿 Prompt 变成工作区里的可复用技能。',
    stage: 'Agent 安装',
    cta: '复制安装指令',
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
    promptPackages: source.promptPackages.map((promptPackage) => getLocalizedPromptPackage(promptPackage, locale)),
    scenarios: source.scenarios.map((scenario) => getLocalizedScenarioEntry(scenario, locale)),
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

export function getLocalizedPromptPackage(promptPackage: PromptPackage, locale: Locale): PromptPackage {
  const localized = locale === 'zh' ? { ...promptPackage, ...zhPromptPackageTranslations[promptPackage.slug] } : promptPackage;

  return {
    ...localized,
    href: localizePathIfNeeded(localized.href, locale),
  };
}

export function getLocalizedScenarioEntry(scenario: ScenarioEntry, locale: Locale): ScenarioEntry {
  const localized = locale === 'zh' ? { ...scenario, ...zhScenarioTranslations[scenario.id] } : scenario;

  return {
    ...localized,
    href: localizePathIfNeeded(localized.href, locale),
  };
}

function localizePathIfNeeded(path: string, locale: Locale): string {
  if (!path.startsWith('/')) return path;

  return localizedPath(path, locale);
}
