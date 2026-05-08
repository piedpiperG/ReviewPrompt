# ReviewPrompt 网站设计规格

**来源需求：** [`guide_basement.md`](../../../guide_basement.md)

**当前产品定位：** ReviewPrompt 是面向人工智能论文作者和审稿人的双语 Prompt 套餐与 Agent 技能库。第一版先围绕已有本地资源，把模拟审稿、逐项多轮检查、Rebuttal 简报和可安装 Skill 组织成更清晰的论文阶段入口。

## 当前目标

1. 默认中文，提供等价英文版本。
2. 当前优先服务作者侧使用场景。
3. 公开资源按三类任务排列：模拟审稿、逐项论文质检、Rebuttal 简报。
4. 领域暂时只保留人工智能。
5. 首页优先展示场景入口和 Prompt 套餐，而不是让用户先理解单个 Prompt。
6. 前置「把 ReviewPrompt 装进 Codex / Claude Code」卖点：先提供可复制安装指令和 GitHub Skill URL，后续再升级成更完整的一键安装能力。
6. UI 以 AstroWind 模板代码库为基础，而不是手写仿制。

## 信息架构

```text
/
/prompts/
/prompts/[slug]/
/contribute/
/about/
/en/
/en/prompts/
/en/prompts/[slug]/
/en/contribute/
/en/about/
```

导航只保留首页、提示词、贡献、关于、语言切换和 GitHub 链接。

贡献页采用站内交互表单：用户选择使用对象、任务和形式，填写适用场景、输入、输出、Prompt 正文、限制和授权信息；页面实时生成投稿 Markdown，并提供复制按钮和预填 GitHub Issue 链接。

首页采用场景入口：

- 投稿前体检：组合逐项论文质检和模拟审稿。
- 模拟审稿压力测试：提前生成审稿人可能的 objections、评分和风险。
- Rebuttal 冲刺：组织 review 摘要、回复理由、证据缺口和导师决策点。
- Agent 技能安装：给 Codex / Claude Code 一个 ReviewPrompt URL，让论文审稿能力进入工作区。

## 内容范围

Prompt 资源必须包含：

- 标题、摘要、推荐角色、任务类型和领域。
- 适用场景、输入要求、输出要求和限制说明。
- 中英文提示词原文。
- 可复制入口。
- 如是工作流，必须包含每个独立检查点的 prompt。
- 如适合 Agent 使用，必须提供 Codex / Claude Code 可复制工作流指令。

当前资源集合：

- `reviewer_imitation.txt`：模拟严格审稿人检查论文质量和接收风险。
- `author_check.txt`：作者逐项论文质检工作流，拆为 7 个独立检查 prompt，并提供 Skill 工作流。
- `rebuttal.txt`：Rebuttal 简报整理，面向老师和 coauthor 沟通。
- `skills/author-paper-check/SKILL.md` 和 `skills/full-paper-review/SKILL.md`：面向 Codex / Claude Code 的可安装技能入口。

## 技术架构

```text
Repository root
├── docs/                    # 产品规格、计划和开发文档
├── site/                    # AstroWind-based Astro site
│   ├── src/components/      # AstroWind 组件 + ReviewPrompt 业务组件
│   ├── src/layouts/         # AstroWind layouts
│   ├── src/pages/           # 中英文页面路由
│   ├── src/data/            # Prompt catalog
│   ├── src/lib/             # 推荐、过滤和 URL 工具
│   ├── src/utils/           # AstroWind utilities
│   └── tests/               # Vitest tests
├── skills/                  # Codex / Claude Code 可读取的审稿技能
├── data/                    # Schema 和 taxonomy 预留
└── .github/                 # Issue Forms、Actions
```

## AstroWind 采用范围

- 使用 `PageLayout.astro`、`Layout.astro`、`Header.astro`、`Footer.astro` 作为站点框架。
- 使用 `Hero.astro`、`Features.astro`、`CallToAction.astro` 等 widget 组织页面。
- 使用 `Button.astro`、`Headline.astro` 等 UI primitives。
- 使用 AstroWind 的 Tailwind 配置、主题变量、Astro integrations 和 utility alias。
- ReviewPrompt 保留自己的业务组件：`ScenarioEntryGrid`、`PromptPackageGrid`、`AgentInstallPanel`、`TaskRecommender`、`ResourceGrid`、`ResourceCard`、`PromptDetail`、`CopyButton`。

## 测试策略

- 使用 Vitest 测试 catalog 过滤、推荐和中英文 slug 行为。
- 使用 Vitest 测试 Prompt 套餐、场景入口和 Agent 安装文案。
- 使用 Vitest 测试 AstroWind 模板基座是否存在并被首页使用。
- 使用 `astro check` 验证 Astro 和 TypeScript 类型。
- 使用 `astro build` 验证 GitHub Pages 静态站点可生成。
- 使用贡献入口回归测试验证 Markdown 生成、Issue URL 预填、中英文贡献页挂载和 Astro 客户端导航后的重新初始化。

## 后续迭代

- 第二阶段再恢复 Workflow。
- 第三阶段再恢复 Skill Registry。
- 后续再扩展更多学科、更多论文任务和更完整的贡献审核流程。
