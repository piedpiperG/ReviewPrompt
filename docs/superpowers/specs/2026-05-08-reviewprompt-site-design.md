# ReviewPrompt 网站设计规格

**来源需求：** [`guide_basement.md`](../../../guide_basement.md)

**当前产品定位：** ReviewPrompt 是面向人工智能论文审稿的双语提示词工具。第一版只解决一个问题：用户能快速判断自己是作者还是审稿人，选择完整论文或 Rebuttal 任务，然后复制可用提示词。

## 当前目标

1. 默认中文，提供等价英文版本。
2. 只保留两种模式：作者使用、审稿人使用。
3. 只保留两类任务：完整论文、Rebuttal。
4. 领域暂时只保留人工智能。
5. 暂不展示 Workflow 和 Skill，先把提示词选择、阅读、复制体验做好。
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

## 内容范围

Prompt 资源必须包含：

- 标题、摘要、推荐角色、任务类型和领域。
- 适用场景、输入要求、输出要求和限制说明。
- 中英文提示词原文。
- 可复制入口。

当前 Prompt 集合只保留：

- 完整论文审稿。
- Rebuttal 回复起草。

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

## 后续迭代

- 第二阶段再恢复 Workflow。
- 第三阶段再恢复 Skill Registry。
- 后续再扩展更多学科、更多论文任务和更完整的贡献审核流程。
