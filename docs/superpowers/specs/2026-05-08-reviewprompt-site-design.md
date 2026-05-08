# ReviewPrompt 网站设计规格

**来源需求：** [`guide_basement.md`](../../../guide_basement.md)

**当前产品定位：** ReviewPrompt 是面向人工智能论文作者的双语提示词工具。第一版先围绕已有本地资源，帮助作者在投稿前后完成三件事：模拟审稿人判断论文质量、逐项多轮检查论文问题、整理 Rebuttal 简报给老师或 coauthor。

## 当前目标

1. 默认中文，提供等价英文版本。
2. 当前优先服务作者侧使用场景。
3. 公开资源按三类任务排列：模拟审稿、逐项论文质检、Rebuttal 简报。
4. 领域暂时只保留人工智能。
5. 只展示 `author_check.txt` 对应的 Prompt 工作流和 Codex / Claude Code 指令，不恢复完整 Workflow / Skill Registry。
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
├── skills/                  # 后续 Agent Skill 预留
├── data/                    # Schema 和 taxonomy 预留
└── .github/                 # Issue Forms、Actions
```

## AstroWind 采用范围

- 使用 `PageLayout.astro`、`Layout.astro`、`Header.astro`、`Footer.astro` 作为站点框架。
- 使用 `Hero.astro`、`Features.astro`、`CallToAction.astro` 等 widget 组织页面。
- 使用 `Button.astro`、`Headline.astro` 等 UI primitives。
- 使用 AstroWind 的 Tailwind 配置、主题变量、Astro integrations 和 utility alias。
- ReviewPrompt 保留自己的业务组件：`TaskRecommender`、`ResourceGrid`、`ResourceCard`、`PromptDetail`、`CopyButton`。

## 测试策略

- 使用 Vitest 测试 catalog 过滤、推荐和中英文 slug 行为。
- 使用 Vitest 测试 AstroWind 模板基座是否存在并被首页使用。
- 使用 `astro check` 验证 Astro 和 TypeScript 类型。
- 使用 `astro build` 验证 GitHub Pages 静态站点可生成。
- 使用贡献入口回归测试验证 Markdown 生成、Issue URL 预填、中英文贡献页挂载和 Astro 客户端导航后的重新初始化。

## 后续迭代

- 第二阶段再恢复 Workflow。
- 第三阶段再恢复 Skill Registry。
- 后续再扩展更多学科、更多论文任务和更完整的贡献审核流程。
