# ReviewPrompt 网站 MVP 实现计划

**目标：** 基于 `guide_basement.md` 搭建一个可运行、可构建、可部署的 ReviewPrompt 静态网站，并按当前反馈把复杂功能砍到最小：先只做好提示词。

**当前技术栈：** Astro、AstroWind、TypeScript、Tailwind、Vitest、GitHub Pages、GitHub Issue Forms。

## 当前范围

- [x] 默认中文，英文版本放在 `/en/`。
- [x] 只保留作者和审稿人两种模式。
- [x] 只保留完整论文和 Rebuttal 两类任务。
- [x] 领域只保留人工智能。
- [x] 暂不展示 Workflow 和 Skill。
- [x] 使用 AstroWind 模板代码库作为 UI 基座。
- [x] 保留 GitHub Pages 自动部署。

## 已完成迁移

- [x] 引入 AstroWind 的 `layouts`、`widgets`、`ui`、`utils`、`vendor/integration`、Tailwind 配置和 Astro 配置。
- [x] 将旧的 `SiteLayout`、`SiteHeader`、`SiteFooter` 和自写样式下线。
- [x] 页面改为通过 `PageLayout`、`Hero`、`Features`、`CallToAction` 渲染。
- [x] Header、Footer、Logo 和站点配置改成 ReviewPrompt 双语版本。
- [x] 保留 ReviewPrompt 业务组件：`TaskRecommender`、`ResourceGrid`、`ResourceCard`、`PromptDetail`、`CopyButton`。
- [x] 添加 `template-adoption.test.ts`，防止后续又退回手写壳。

## 关键文件

- `site/src/config.yaml`：站点名称、基础路径、主题和 SEO 基础配置。
- `site/src/navigation.ts`：中英文导航和页脚链接。
- `site/src/layouts/PageLayout.astro`：AstroWind 页面框架，增加 locale 支持。
- `site/src/pages/index.astro`：中文首页，使用 AstroWind widget。
- `site/src/pages/en/index.astro`：英文首页，使用 AstroWind widget。
- `site/src/pages/prompts/**`：中文提示词列表和详情。
- `site/src/pages/en/prompts/**`：英文提示词列表和详情。
- `site/src/data/catalog.ts`：当前提示词数据。
- `site/tests/template-adoption.test.ts`：模板采用验证。

## 验证命令

```bash
npm --prefix site test -- --run
npm --prefix site run check
npm --prefix site run build
```

## 后续计划

- [ ] 第二阶段：在提示词体验稳定后恢复 Workflow 展示。
- [ ] 第三阶段：加入 Skill Registry 和可安装 Skill 说明。
- [ ] 后续阶段：扩展更多领域、任务和贡献审核机制。
