# ReviewPrompt 网站设计规格

**来源需求：** [`guide_basement.md`](../../../guide_basement.md)

**产品定位：** ReviewPrompt 是面向 AI 辅助论文审稿的开源 Prompt、Workflow 与 Agent Skill 方法库。用户进入网站不是为了浏览零散提示词，而是为了更快完成一次高质量审稿、投稿前自审稿、rebuttal 准备或审稿流程封装。

## 目标

第一版网站要完成 4 件事：

1. 让用户立刻选择任务：审稿、投稿前自查、安装 Skill、贡献 Prompt。
2. 把 Prompt、Workflow、Skill 结构化展示，而不是只贴文本。
3. 提供可复制、可安装、可扩展的基础内容库。
4. 建立后续内容贡献、验证和部署的工程骨架。

## 第一版范围

### 包含

- Astro Starlight 静态网站，适配 GitHub Pages。
- 首页任务入口和精选资源。
- Prompt Library：资源卡片、分类信息、可复制 Prompt。
- Workflow Library：审稿、自审稿、rebuttal、meta-review 等流程。
- Skill Registry：Codex / Claude Code 安装说明和 `SKILL.md` 预览。
- Task Recommender：基于用户角色、任务和阶段推荐资源。
- Contribute 页面和 GitHub Issue Form。
- 安全、保密、贡献指南等文档页面。
- 数据模型、静态索引和基础测试。

### 暂不包含

- 用户登录、收藏、评分、后台审核系统。
- 在线上传论文或调用大模型。
- 服务端搜索或数据库。
- 自动生成 Skill ZIP release。

## 信息架构

```text
Home
Prompts
Workflows
Skills
Use Cases
Contribute
Docs
About
```

首页以任务入口为主，不做博客式列表。Prompt、Workflow 和 Skill 页面共享同一套资源元数据，避免内容分散。

## 内容模型

### Prompt

Prompt 资源必须包含：

- 标题、摘要、用途、适合角色、领域、模型兼容性。
- 状态：curated、tested、experimental、deprecated。
- 来源、License、贡献者。
- 输入格式、输出格式、限制说明。
- Prompt 原文和复制入口。
- 关联 Workflow 和 Skill。

### Workflow

Workflow 资源必须包含：

- 适用任务和用户角色。
- 分步骤流程。
- 推荐 Prompt。
- 可安装 Skill（如存在）。
- 输出产物，例如 review draft、revision checklist、rebuttal outline。

### Skill

Skill 资源必须包含：

- Skill 名称、适用任务、支持工具。
- 安全等级、是否包含脚本、版本号、License。
- Codex / Claude Code 安装命令。
- `SKILL.md` 预览。
- references、assets、examples 的规划。

## 关键用户流程

### 审稿人

1. 进入首页选择「Review a paper」。
2. 通过 Task Recommender 选择角色、任务和论文阶段。
3. 进入 Full Paper Review Workflow。
4. 复制 Prompt 或安装 `full-paper-review` Skill。
5. 使用 score calibration Prompt 二次校准。

### 作者

1. 进入首页选择「Improve my manuscript」。
2. 选择 Early draft 或 Submission-ready。
3. 进入 Pre-submission Workflow。
4. 输出 reviewer attack points、revision checklist 和修改优先级。

### 贡献者

1. 进入 Contribute。
2. 通过 Issue Form 提交 Prompt、Workflow 或 Skill。
3. Maintainer 审核后转为内容文件。

## 技术架构

```text
Repository root
├── docs/                    # 产品规格、计划和开发文档
├── site/                    # Astro Starlight 站点
│   ├── src/content/docs/    # Starlight 页面
│   ├── src/components/      # Astro 组件
│   ├── src/data/            # 资源目录数据
│   ├── src/lib/             # 推荐、索引、过滤逻辑
│   └── tests/               # Vitest 测试
├── skills/                  # 可安装 Agent Skills
├── data/                    # JSON Schema、taxonomy 和导出索引
└── .github/                 # Issue Forms、Actions
```

## 组件边界

- `site/src/data/catalog.ts`：维护第一版资源数据。
- `site/src/lib/catalog.ts`：提供筛选、推荐、静态索引构建等纯函数。
- `site/src/components/ResourceCard.astro`：展示 Prompt、Workflow、Skill 卡片。
- `site/src/components/TaskRecommender.astro`：客户端任务推荐交互。
- `site/src/components/CopyButton.astro`：复制 Prompt 和安装命令。
- `site/src/content/docs/**`：面向用户的页面内容。

## 测试策略

- 使用 Vitest 测试纯函数：资源过滤、推荐排序、索引生成。
- 使用 `astro check` 验证内容、类型和页面引用。
- 使用 `astro build` 验证静态站点可生成。

## 设计原则

- 首屏优先呈现任务入口，降低用户选择成本。
- Prompt 页面强调适用场景、输入输出、限制和可复制性。
- Workflow 页面强调步骤和产物。
- Skill 页面强调安装和复用。
- 文档保持中英文术语混排规范，中文语境使用全角标点，中英文之间留空格。
