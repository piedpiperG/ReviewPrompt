# ReviewPrompt 网站 MVP 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 基于需求文档搭建一个可运行、可构建、可扩展的 ReviewPrompt 静态网站 MVP。

**架构：** 仓库根目录保存产品和开发文档，`site/` 保存 Astro Starlight 站点，资源数据集中在 TypeScript catalog 中，再由页面和组件消费。纯函数先用 Vitest 验证，再实现页面。

**技术栈：** Astro 6、Astro Starlight、TypeScript、Vitest、GitHub Pages、GitHub Issue Forms。

---

## 文件职责

- `README.md`：项目入口说明、开发命令和产品定位。
- `docs/superpowers/specs/2026-05-08-reviewprompt-site-design.md`：产品和技术规格。
- `docs/superpowers/plans/2026-05-08-reviewprompt-site.md`：本实现计划。
- `site/package.json`：站点依赖和脚本。
- `site/astro.config.mjs`：Starlight 配置、导航和 GitHub Pages 基础路径。
- `site/src/data/catalog.ts`：Prompt、Workflow、Skill 的第一批结构化数据。
- `site/src/lib/catalog.ts`：过滤、推荐和索引生成逻辑。
- `site/tests/catalog.test.ts`：资源目录行为测试。
- `site/src/components/*.astro`：资源卡、复制按钮、任务推荐器。
- `site/src/content/docs/**/*.mdx`：Starlight 页面内容。
- `.github/ISSUE_TEMPLATE/*.yml`：Prompt、Workflow、Skill 投稿入口。
- `.github/workflows/deploy.yml`：GitHub Pages 构建部署。
- `data/*.schema.json`、`data/taxonomy.yml`：后续内容校验基础。

## 任务 1：建立测试和站点骨架

**文件：**

- 创建：`site/package.json`
- 创建：`site/tsconfig.json`
- 创建：`site/vitest.config.ts`
- 创建：`site/tests/catalog.test.ts`

- [ ] **步骤 1：编写失败的测试**

测试 `getFeaturedResources()`、`recommendResources()` 和 `buildStaticIndex()` 的预期行为。

- [ ] **步骤 2：运行测试验证失败**

运行：`npm --prefix site test -- --run`

预期：失败，原因是 `src/lib/catalog` 尚不存在。

- [ ] **步骤 3：安装依赖并补齐基础配置**

安装 Astro、Starlight、Vitest 和 TypeScript。

- [ ] **步骤 4：进入任务 2**

保留红灯测试，继续实现数据和纯函数。

## 任务 2：实现资源数据和推荐逻辑

**文件：**

- 创建：`site/src/data/catalog.ts`
- 创建：`site/src/lib/catalog.ts`
- 修改：`site/tests/catalog.test.ts`

- [ ] **步骤 1：编写最少资源数据**

至少包含 6 个 Prompts、5 个 Workflows、5 个 Skills，覆盖需求文档中的 MVP 类型。

- [ ] **步骤 2：实现纯函数**

实现 featured 资源筛选、任务推荐、静态索引生成。

- [ ] **步骤 3：运行测试验证通过**

运行：`npm --prefix site test -- --run`

预期：全部测试通过。

## 任务 3：搭建 Starlight 页面

**文件：**

- 创建：`site/astro.config.mjs`
- 创建：`site/src/content.config.ts`
- 创建：`site/src/content/docs/index.mdx`
- 创建：`site/src/content/docs/prompts/*.mdx`
- 创建：`site/src/content/docs/workflows/*.mdx`
- 创建：`site/src/content/docs/skills/*.mdx`
- 创建：`site/src/content/docs/use-cases/*.mdx`
- 创建：`site/src/content/docs/contribute/*.mdx`
- 创建：`site/src/content/docs/docs/*.mdx`

- [ ] **步骤 1：配置导航和页面集合**

配置 Home、Prompts、Workflows、Skills、Use Cases、Contribute、Docs、About。

- [ ] **步骤 2：编写首页**

首页包含任务入口、精选 Workflow、精选 Prompt、精选 Skill 和信任区。

- [ ] **步骤 3：编写内容页**

页面内容与 `guide_basement.md` 一致，强调适用场景、限制、输入输出和安装。

## 任务 4：实现 Astro 组件

**文件：**

- 创建：`site/src/components/ResourceCard.astro`
- 创建：`site/src/components/ResourceGrid.astro`
- 创建：`site/src/components/CopyButton.astro`
- 创建：`site/src/components/TaskRecommender.astro`
- 创建：`site/src/styles/custom.css`

- [ ] **步骤 1：实现资源卡片**

资源卡片展示标题、摘要、角色、任务、领域、状态和操作。

- [ ] **步骤 2：实现任务推荐器**

根据用户选择推荐 Workflow、Prompt 和 Skill。

- [ ] **步骤 3：实现复制按钮**

支持复制 Prompt、安装命令和模板文本。

## 任务 5：补齐贡献、部署和文档

**文件：**

- 修改：`README.md`
- 创建：`.github/ISSUE_TEMPLATE/submit-prompt.yml`
- 创建：`.github/ISSUE_TEMPLATE/submit-workflow.yml`
- 创建：`.github/ISSUE_TEMPLATE/submit-skill.yml`
- 创建：`.github/workflows/deploy.yml`
- 创建：`data/prompt.schema.json`
- 创建：`data/skill.schema.json`
- 创建：`data/taxonomy.yml`
- 创建：`skills/full-paper-review/SKILL.md`

- [ ] **步骤 1：补齐 README**

说明产品定位、开发命令、目录结构和部署方式。

- [ ] **步骤 2：补齐 Issue Forms**

结构化收集 Prompt、Workflow 和 Skill 投稿。

- [ ] **步骤 3：补齐 GitHub Actions**

构建 `site/` 并发布到 GitHub Pages。

- [ ] **步骤 4：创建首个可安装 Skill**

实现 `full-paper-review` 的 `SKILL.md`。

## 任务 6：验证

**文件：**

- 修改：所有实现文件。

- [ ] **步骤 1：运行测试**

运行：`npm --prefix site test -- --run`

- [ ] **步骤 2：运行类型和内容检查**

运行：`npm --prefix site run check`

- [ ] **步骤 3：运行生产构建**

运行：`npm --prefix site run build`

- [ ] **步骤 4：检查 Git 状态**

运行：`git status --short --branch`
