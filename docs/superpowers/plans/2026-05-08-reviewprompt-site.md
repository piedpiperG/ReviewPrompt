# ReviewPrompt 网站 MVP 实现计划

**目标：** 基于 `guide_basement.md` 搭建一个可运行、可构建、可部署的 ReviewPrompt 静态网站，并按当前反馈围绕已有本地资源重排：先服务作者侧论文质检、模拟审稿和 Rebuttal 简报。

**当前技术栈：** Astro、AstroWind、TypeScript、Tailwind、Vitest、GitHub Pages、GitHub Issue Forms。

## 当前范围

- [x] 默认中文，英文版本放在 `/en/`。
- [x] 当前优先服务作者侧使用场景。
- [x] 首页按场景入口组织：投稿前体检、模拟审稿压力测试、Rebuttal 冲刺、Agent 技能安装。
- [x] 将底层 Prompt 组织成 Prompt 套餐，降低只看到 3 个资源的单薄感。
- [x] 领域只保留人工智能。
- [x] 工作流只展示 `author_check.txt` 对应的 Prompt 工作流和 Codex / Claude Code 指令。
- [x] 使用 AstroWind 模板代码库作为 UI 基座。
- [x] 保留 GitHub Pages 自动部署。
- [x] 贡献页提供站内交互表单，可实时生成投稿 Markdown 并预填 GitHub Issue。
- [x] 首页前置「把 ReviewPrompt 装进 Codex / Claude Code」卖点，并提供可复制安装指令。

## 已完成迁移

- [x] 引入 AstroWind 的 `layouts`、`widgets`、`ui`、`utils`、`vendor/integration`、Tailwind 配置和 Astro 配置。
- [x] 将旧的 `SiteLayout`、`SiteHeader`、`SiteFooter` 和自写样式下线。
- [x] 页面改为通过 `PageLayout`、`Hero`、`Features`、`CallToAction` 渲染。
- [x] Header、Footer、Logo 和站点配置改成 ReviewPrompt 双语版本。
- [x] 保留 ReviewPrompt 业务组件：`TaskRecommender`、`ResourceGrid`、`ResourceCard`、`PromptDetail`、`CopyButton`。
- [x] 添加 `template-adoption.test.ts`，防止后续又退回手写壳。
- [x] 将 `data/my_prompts/reviewer_imitation.txt`、`author_check.txt`、`rebuttal.txt` 映射成当前公开资源。
- [x] 为 `author_check.txt` 拆出 7 个独立检查 Prompt，并提供 `skills/author-paper-check/SKILL.md`。
- [x] 将 `skills/author-paper-check/SKILL.md` 和 `skills/full-paper-review/SKILL.md` 包装为 Agent 技能安装包。

## 关键文件

- `site/src/config.yaml`：站点名称、基础路径、主题和 SEO 基础配置。
- `site/src/navigation.ts`：中英文导航和页脚链接。
- `site/src/layouts/PageLayout.astro`：AstroWind 页面框架，增加 locale 支持。
- `site/src/pages/index.astro`：中文首页，使用 AstroWind widget。
- `site/src/pages/en/index.astro`：英文首页，使用 AstroWind widget。
- `site/src/pages/prompts/**`：中文提示词列表和详情。
- `site/src/pages/en/prompts/**`：英文提示词列表和详情。
- `site/src/components/ScenarioEntryGrid.astro`：首页按论文阶段进入的场景卡片。
- `site/src/components/PromptPackageGrid.astro`：首页 Prompt 套餐卡片。
- `site/src/components/AgentInstallPanel.astro`：Codex / Claude Code 安装指令展示和复制入口。
- `site/src/components/ContributionWizard.astro`：中英文贡献表单、投稿预览、复制和 GitHub Issue 预填入口。
- `site/src/lib/contribution.ts`：贡献内容 Markdown 和 Issue URL 生成逻辑。
- `site/src/data/catalog.ts`：当前提示词数据。
- `data/my_prompts/*.txt`：当前资源的原始 prompt 来源。
- `skills/author-paper-check/SKILL.md`：可插入 Codex / Claude Code 的作者论文质检工作流。
- `site/tests/template-adoption.test.ts`：模板采用验证。

## 验证命令

```bash
npm --prefix site test -- --run
npm --prefix site run check
npm --prefix site run build
```

## 后续计划

- [ ] 第二阶段：把社区贡献的 Prompt 收录为「待测试」资源，并归入对应套餐。
- [ ] 第三阶段：加入完整 Skill Registry、manifest 和更明确的一键安装说明。
- [ ] 后续阶段：扩展更多领域、任务和贡献审核机制。
