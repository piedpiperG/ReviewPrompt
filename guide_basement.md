我建议把这个产品定位成：

# **AI Review Commons：开源的 AI 辅助审稿 Prompt / Method / Skill Registry**

它不是一个普通 prompt 收藏站，而是一个面向科研作者、审稿人、实验室和开源社区的 **AI 辅助审稿方法库**。核心价值是：把分散在个人经验、论文附录、GitHub gist、聊天记录里的审稿 prompt 和 workflow，整理成可查找、可比较、可复用、可安装的开放资源。

你这个产品最重要的设计原则应该是：

> **用户不是来“看 prompt”的，而是来“更快完成一次高质量审稿/自审稿”的。**

---

## 1. 产品定位

### 一句话定位

**一个开源平台，收集、整理和封装 AI 辅助论文审稿的 prompt、方法论和 agent skills，帮助用户审稿别人的论文，也帮助作者投稿前自检自己的论文。**

英文可以叫：

> **An open registry of AI-assisted peer-review prompts, workflows, and agent skills.**

### 它解决的问题

现在很多人已经在用 AI 辅助审稿，但问题是：

1. **方法分散**：每个人都有自己的 prompt，但很少公开、比较、迭代。
2. **质量不透明**：prompt 是随手写的，缺少适用场景、限制、示例输出和来源。
3. **复用成本高**：别人看到一个 prompt，还要手动复制、改格式、适配模型。
4. **缺少 workflow**：很多 prompt 只是一段指令，不是完整审稿流程。
5. **没有 agent 化**：无法直接嵌入 Codex / Claude Code 这种工具链，让 AI 在本地项目或论文 repo 里自动执行审稿流程。

所以你的产品应该强调：

```text
Prompt → Method → Workflow → Skill
```

也就是从“提示词”升级到“可执行审稿工作流”。

---

## 2. 目标用户

我建议先锁定三类用户。

| 用户                | 需求                    | 产品给他的价值                                   |
| ----------------- | --------------------- | ----------------------------------------- |
| 审稿人               | 快速理解论文、发现弱点、生成结构化审稿意见 | 提供审稿 workflow、prompt、rubric、检查清单          |
| 作者                | 投稿前自查论文质量             | 提供 pre-submission review、自我审稿、rebuttal 预演 |
| Prompt / AI 方法贡献者 | 分享自己的审稿方法             | 提供投稿入口、署名、版本记录、引用方式                       |

之后可以扩展到：

| 用户                    | 需求                                        |
| --------------------- | ----------------------------------------- |
| 实验室 PI / PhD group    | 给组内 paper reading / internal review 建标准流程 |
| 会议 AC / meta-reviewer | 汇总多个 review，找共识和冲突                        |
| 开源工具开发者               | 把审稿 prompt 封装为 Codex / Claude Code skill  |

---

## 3. 产品的核心模块

我建议网站分成 **8 个模块**。

## 模块 A：首页：让用户立刻知道能干什么

首页不要做成“博客首页”，而要做成“任务入口”。

首页结构：

```text
Hero 区
- 标题：Open AI-assisted peer-review prompts, workflows, and skills
- 副标题：For reviewing papers, improving manuscripts before submission, and building reusable agent skills.
- 三个按钮：
  1. Browse Prompts
  2. Review My Paper
  3. Submit a Prompt

核心入口
- I am reviewing a paper
- I am preparing my own submission
- I want to install a skill
- I want to contribute a prompt

精选资源
- Featured workflows
- Latest community submissions
- Curated skills
- Most copied / most starred prompts

信任区
- Open source
- Versioned
- Reviewed
- Skill-ready
```

首页的关键是让用户不用理解你的全部体系，也能马上进入一个任务。

---

## 模块 B：Prompt Library

这是主体模块，但不要叫“Prompt List”，建议叫：

```text
Prompt Library
```

每条 prompt 用 card 展示。

### Card 上应该展示的信息

```text
标题
用途：Full Review / Methodology Critique / Related Work Check / Rebuttal Simulation
适合用户：Reviewer / Author / Meta-reviewer
领域：ML / NLP / CV / HCI / Bio / General
模型：GPT / Claude / Gemini / model-agnostic
来源：Original / Paper-derived / Community-contributed
状态：Curated / Experimental / Deprecated
是否有 Skill：Yes / No
License
贡献者
```

### Library 的筛选器

左侧或顶部加 filters：

```text
Task
- Full paper review
- Novelty check
- Methodology critique
- Experiment critique
- Related work check
- Writing clarity
- Reproducibility check
- Ethics / safety review
- Rebuttal simulation
- Meta-review synthesis

User role
- Reviewer
- Author
- Area Chair / Meta-reviewer
- Lab internal reviewer

Paper stage
- Early draft
- Submission-ready
- Under review
- Rebuttal
- Camera-ready

Domain
- General
- Machine Learning
- NLP
- Computer Vision
- Systems
- HCI
- Biology
- Medicine
- Social Science

Format
- Prompt only
- Workflow
- Rubric
- Checklist
- Skill
- Script-enabled skill

Status
- Curated
- Community submitted
- Tested
- Experimental
- Deprecated
```

重点是让别人按“我要完成什么任务”来找，而不是按“prompt 名字”来找。

---

## 模块 C：Prompt Detail Page

每个 prompt 的详情页要像一个“小型论文方法卡”，不是简单贴文本。

建议页面结构：

```text
1. 标题与摘要
2. 适用场景
3. 不适用场景
4. Prompt 原文
5. 输入格式
6. 输出格式
7. 推荐使用方式
8. 示例输入 / 示例输出
9. 方法来源
10. 已知限制
11. 版本历史
12. 贡献者与引用方式
13. Skill 封装
```

### 页面上的关键按钮

```text
Copy Prompt
Copy Input Template
Copy Output Schema
Download as Markdown
Download as JSON
Install as Codex Skill
Install as Claude Code Skill
Fork / Improve this Prompt
Submit Feedback
```

### 一个 Prompt Detail Page 的样例结构

```yaml
---
title: "Full Structured Peer Review"
slug: "full-structured-peer-review"
task: "full-paper-review"
role: ["reviewer", "author"]
stage: ["submission-ready", "under-review"]
domain: ["general"]
format: ["prompt", "workflow", "skill"]
status: "curated"
has_skill: true
license: "CC-BY-4.0"
contributor: "your-name"
version: "0.1.0"
updated: "2026-05-08"
---
```

正文：

```md
## What this prompt does

This prompt helps an AI assistant produce a structured peer review of a research paper, focusing on contribution, correctness, evidence, clarity, limitations, and actionable feedback.

## Use when

- You are reviewing a submitted paper.
- You are preparing your own manuscript for submission.
- You want a second-pass critique after human reading.

## Do not use when

- You need a final accept/reject decision without human judgment.
- You have not read the paper yourself.
- The paper contains confidential material you are not allowed to share with a third-party AI system.

## Required input

- Paper title
- Abstract
- Main claims
- Method section
- Experimental results
- Optional: related work, appendix, reviewer criteria

## Output format

1. One-paragraph summary
2. Main contributions
3. Strengths
4. Weaknesses
5. Questions for authors
6. Missing experiments
7. Reproducibility concerns
8. Suggested revision plan
9. Preliminary score
10. Confidence
```

这个页面的核心价值是：**用户可以判断这个 prompt 是否适合自己，并且可以立刻使用。**

---

## 模块 D：Workflow Library

很多审稿任务不是一个 prompt 能解决的，而是一个流程。所以建议单独做：

```text
Workflows
```

比如：

### Workflow 1：Full Paper Review

```text
Step 1: 论文摘要理解
Step 2: claim extraction
Step 3: novelty check
Step 4: methodology critique
Step 5: experiment critique
Step 6: limitation analysis
Step 7: review drafting
Step 8: score calibration
```

### Workflow 2：Pre-submission Self Review

```text
Step 1: 找出论文主张
Step 2: 检查 contribution 是否清晰
Step 3: 找 reviewer 可能攻击的点
Step 4: 检查实验是否支撑 claim
Step 5: 生成 revision checklist
Step 6: 模拟 reviewer #1 / #2 / #3
Step 7: 生成修改优先级
```

### Workflow 3：Rebuttal Simulation

```text
Step 1: 输入 reviewer comments
Step 2: 分类 objections
Step 3: 找出必须回应的问题
Step 4: 生成 evidence-backed rebuttal
Step 5: 检查 tone
Step 6: 生成 final rebuttal outline
```

### Workflow 4：Meta-review Synthesis

```text
Step 1: 输入多个 reviews
Step 2: 提取共识
Step 3: 提取冲突点
Step 4: 判断关键争议是否影响结论
Step 5: 生成 AC summary
```

这个模块会让产品从“prompt 网站”升级成“AI 审稿方法库”。

---

## 模块 E：Skill Registry

这是你产品最有差异化的模块。

Codex 官方文档把 skill 描述为可复用工作流的 authoring format，包含 `SKILL.md`、resources 和 optional scripts，并且 Codex 可在 CLI、IDE extension 和 Codex app 中使用 skills；Codex 还会先读取 skill 的 name、description、path，需要时再加载完整 `SKILL.md`，这很适合把长审稿 rubric 封装起来而不一开始占满上下文。([OpenAI开发者][1])

Claude Code 也支持通过 `SKILL.md` 扩展能力；Claude 可以在相关时自动使用 skill，也可以通过 `/skill-name` 直接调用，skill 目录里还能放 template、examples、scripts、reference docs 等辅助文件。([Claude API Docs][2])

所以你的网站应该有一个单独入口：

```text
Skills
```

每个 skill 页面应该展示：

```text
Skill name
适用任务
支持工具：Codex / Claude Code / Generic Agent Skill
安装方式
文件结构
SKILL.md 预览
包含的 references
是否包含 scripts
安全等级
版本号
License
```

### 推荐的 Skill 类型

我建议第一批做 8 个 skill：

| Skill                     | 用途                |
| ------------------------- | ----------------- |
| `full-paper-review`       | 完整论文审稿            |
| `pre-submission-review`   | 投稿前自审稿            |
| `methodology-critic`      | 方法与实验设计批评         |
| `related-work-auditor`    | related work 缺口检查 |
| `reproducibility-checker` | 可复现性检查            |
| `rebuttal-coach`          | rebuttal 生成与润色    |
| `meta-review-synthesizer` | 多个 review 综合      |
| `review-red-team`         | 从苛刻审稿人角度攻击论文      |

### Skill 文件结构

```text
skills/full-paper-review/
├── SKILL.md
├── references/
│   ├── review-rubric.md
│   ├── common-weaknesses.md
│   ├── score-calibration.md
│   └── confidentiality-guidelines.md
├── assets/
│   ├── review-output-template.md
│   └── author-revision-checklist.md
└── examples/
    ├── example-input.md
    └── example-output.md
```

### `SKILL.md` 示例

```md
---
name: full-paper-review
description: Use when reviewing a research paper or performing a pre-submission self-review. Produces a structured peer review covering contribution, correctness, methodology, experiments, clarity, limitations, reproducibility, questions for authors, suggested score, and confidence.
---

# Full Paper Review Skill

Use this skill to perform a structured AI-assisted review of a research paper.

## Required input

Ask the user for the paper text, abstract, method, experiments, or a manuscript file if not already available.

## Review workflow

1. Identify the paper's main claim.
2. Summarize the contribution in neutral language.
3. Evaluate novelty against the provided related work.
4. Check whether the method supports the main claim.
5. Evaluate experiments, baselines, datasets, metrics, ablations, and statistical support.
6. Identify missing evidence or overclaims.
7. Check clarity and reproducibility.
8. Produce a structured review.

## Output format

Return:

- Summary
- Strengths
- Weaknesses
- Questions for authors
- Missing experiments
- Reproducibility concerns
- Ethical or safety concerns, if relevant
- Suggested revision plan
- Preliminary score
- Confidence

## Guardrails

Do not fabricate citations, experimental results, or reviewer requirements. If evidence is missing, say so explicitly. Treat the output as decision support, not as a replacement for human review.
```

### Codex / Claude Code 安装展示

你可以给每个 skill 页面放两个安装 tab。

Codex 的 repo-scoped skills 可以放在 `.agents/skills`，用户级 skills 可以放在 `$HOME/.agents/skills`；官方文档也说明直接 skill folders 更适合本地 authoring 和 repo-scoped workflows，广泛分发时可以进一步 package 成 plugin。([OpenAI开发者][1])

```bash
# Codex: project-level install
mkdir -p .agents/skills
cp -r full-paper-review .agents/skills/
```

Claude Code 的 personal skills 可以放在 `~/.claude/skills/<skill-name>/SKILL.md`，project skills 可以放在 `.claude/skills/<skill-name>/SKILL.md`。([Claude][3])

```bash
# Claude Code: personal install
mkdir -p ~/.claude/skills
cp -r full-paper-review ~/.claude/skills/
```

Skill 页面还应该提供：

```text
Download ZIP
Copy install command
View SKILL.md
View references
View examples
Report issue
Fork skill
```

---

## 模块 F：Submit / Contribute

投稿不能只让用户贴一段 prompt。你要让他们提交结构化信息。

建议投稿入口：

```text
Submit a Prompt
Submit a Workflow
Submit a Skill
Suggest an Improvement
Report a Problem
```

第一版可以用 GitHub Issue Forms。GitHub Issue Forms 支持 YAML 表单，可以定义 input、textarea、dropdown、validations、default labels、default assignees 等；提交后表单内容会转换成 issue body。([GitHub Docs][4])

### 投稿表单字段

```text
Prompt title
Contributor name / GitHub handle
Source
- Original
- Derived from a paper
- Derived from personal workflow
- Derived from public material

Paper / method source
Task type
Target user
Target domain
Prompt text
Input requirements
Expected output
Example use case
Known limitations
License
Should this be turned into a skill?
Does it contain any confidential review content?
Does it include code/scripts?
```

### 投稿状态

```text
submitted
needs-metadata
needs-review
accepted
curated
skill-ready
deprecated
rejected
```

### 审核标准

```text
1. 是否有明确用途？
2. 是否有清晰输入输出？
3. 是否避免要求模型伪造事实？
4. 是否不包含私密审稿内容？
5. 是否有 license？
6. 是否能转换成 skill？
7. 是否有示例？
```

这样你的网站会显得专业，而不是变成低质量 prompt dumping。

---

## 模块 G：Examples / Case Studies

这个模块非常重要，因为 prompt 本身很抽象。用户更想知道：

> “这个 prompt 用起来会输出什么？”

每个例子可以展示：

```text
任务：投稿前自审稿
输入：论文摘要 + 方法 + 实验结果
使用 prompt：pre-submission-review
输出：weaknesses + revision checklist
用户收益：发现 3 个 claim 过强、2 个缺失实验、1 个 related work gap
```

注意：不要放真实 confidential review。可以用公开论文、toy paper、合成例子，或者作者自己允许公开的 manuscript。

---

## 模块 H：Governance / Safety / License

这个产品涉及审稿，所以必须有治理页面。

建议明确写：

```text
This project supports AI-assisted reviewing, not AI-replaced reviewing.
```

中文可以是：

> 本项目旨在帮助研究者更系统地阅读、审稿和修改论文，不鼓励把 AI 输出直接作为最终审稿意见，也不鼓励上传任何违反会议、期刊、机构或作者保密要求的内容。

### 安全分级

每个 prompt / skill 都标一个 safety level：

| Level | 含义                              |
| ----- | ------------------------------- |
| L0    | Prompt only                     |
| L1    | Prompt + template               |
| L2    | Prompt + references             |
| L3    | Includes local scripts          |
| L4    | Requires external tools or APIs |

审稿类 skill 第一阶段尽量保持 **L0-L2**，不要急着加脚本。Codex 官方最佳实践也建议每个 skill 聚焦一个任务，优先用 instructions，只有当 scripts 或 assets 能提高可靠性时再加入。([OpenAI开发者][1])

---

## 4. 网站信息架构

我建议导航栏这样设计：

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

更细一点：

```text
Home
├── Browse Prompts
├── Review My Paper
├── Install Skills
└── Submit

Prompts
├── Full Review
├── Methodology
├── Experiments
├── Related Work
├── Reproducibility
├── Writing
├── Rebuttal
└── Meta-review

Workflows
├── Reviewer Workflow
├── Author Pre-submission Workflow
├── Rebuttal Workflow
├── Lab Internal Review Workflow
└── Area Chair Workflow

Skills
├── Codex Skills
├── Claude Code Skills
├── Generic Agent Skills
└── Skill Authoring Guide

Contribute
├── Submit Prompt
├── Submit Workflow
├── Submit Skill
├── Review Queue
└── Contribution Guidelines

Docs
├── How to Use
├── How to Install Skills
├── How to Cite
├── Safety
├── License
└── FAQ
```

---

## 5. 核心用户流程

### 流程 1：审稿人审别人的论文

```text
进入首页
→ 点击 "I am reviewing a paper"
→ 选择领域和任务
→ 推荐 Full Review Workflow
→ 用户复制 prompt 或安装 skill
→ 输入论文内容
→ 得到结构化 review
→ 使用 score calibration prompt 二次检查
```

页面体验重点：

```text
不要先让用户看 100 个 prompt。
先问用户：你要审什么？你需要哪种审稿？
```

### 流程 2：作者投稿前自审稿

```text
进入首页
→ 点击 "I am preparing my own submission"
→ 选择 paper stage: Early draft / Submission-ready
→ 选择目标会议类型或 review style
→ 使用 pre-submission-review workflow
→ 输出 revision checklist
→ 输出 reviewer attack points
→ 输出修改优先级
```

这个功能会很受欢迎，因为作者通常比审稿人更愿意花时间用工具。

### 流程 3：别人贡献 prompt

```text
点击 Submit
→ 填 GitHub Issue Form
→ 自动生成 issue
→ maintainer review
→ 通过后转成 MDX
→ 出现在 Prompt Library
→ 如果质量高，转成 skill
```

### 流程 4：用户安装 skill

```text
进入 Skills
→ 选择 full-paper-review
→ 选择 Codex 或 Claude Code
→ 复制安装命令
→ 在本地 repo 中调用
→ 得到结构化审稿输出
```

---

## 6. Prompt 展示不要只展示文本，要展示“可用性”

建议每个 prompt 页面有 5 个 tab：

```text
Overview
Prompt
Examples
Skill
Metadata
```

### Overview

展示这个 prompt 是干什么的。

### Prompt

展示 prompt 原文，带 Copy 按钮。

### Examples

展示输入输出样例。

### Skill

展示对应的 `SKILL.md` 和安装方式。

### Metadata

展示版本、作者、license、来源、适用领域、限制。

这样用户可以快速判断：

```text
这个 prompt 适不适合我？
我应该怎么输入？
输出长什么样？
能不能装到 Codex / Claude Code？
谁贡献的？
有没有被 review 过？
```

---

## 7. 技术平台建议

我仍然建议第一版用：

```text
GitHub Pages + Astro Starlight + Markdown/MDX + GitHub Issue Forms + GitHub Actions
```

原因很明确：GitHub Pages 本身就是从 GitHub repo 托管 HTML/CSS/JS 的静态站点服务，也可以配合 build process 发布网站。([GitHub Docs][5]) GitHub Pages 还支持从指定 branch 发布，或者用 GitHub Actions workflow 构建发布。([GitHub Docs][6])

Astro Starlight 很适合文档型产品，它自带导航、搜索、国际化、SEO、代码高亮、深色模式，并支持 Markdown、Markdoc、MDX 和 frontmatter validation。([Starlight][7]) 如果后续 prompt 数量很多，可以加 Pagefind；Pagefind 会在静态站点构建后生成静态搜索包，不需要你自己维护搜索服务器。([Pagefind][8])

### 技术架构

```text
Frontend: Astro Starlight
Hosting: GitHub Pages
Content: MDX + YAML frontmatter
Search: Starlight built-in search / Pagefind
Submission: GitHub Issue Forms
Validation: GitHub Actions + JSON Schema
Skill distribution: GitHub repo + release assets
Data export: static JSON index
```

### Repo 结构

```text
ai-review-commons/
├── README.md
├── LICENSE
├── site/
│   ├── src/
│   │   ├── content/
│   │   │   ├── prompts/
│   │   │   ├── workflows/
│   │   │   ├── skills/
│   │   │   └── examples/
│   │   ├── pages/
│   │   └── components/
│   ├── astro.config.mjs
│   └── package.json
├── skills/
│   ├── full-paper-review/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   ├── assets/
│   │   └── examples/
│   ├── pre-submission-review/
│   ├── methodology-critic/
│   └── rebuttal-coach/
├── data/
│   ├── prompt.schema.json
│   ├── skill.schema.json
│   ├── taxonomy.yml
│   └── index.json
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── submit-prompt.yml
│   │   ├── submit-workflow.yml
│   │   └── submit-skill.yml
│   └── workflows/
│       ├── validate-content.yml
│       ├── build-site.yml
│       └── package-skills.yml
└── docs/
    ├── contribution-guide.md
    ├── safety.md
    └── license.md
```

---

## 8. 推荐的第一版 MVP

第一版不要追求复杂交互，先把“内容质量”和“可复用性”做出来。

### MVP 目标

```text
30 个 curated prompts
5 个 workflows
5 个 installable skills
1 个投稿入口
1 个完整贡献指南
1 个安全与保密说明
1 个静态搜索
```

### 第一批内容建议

```text
Prompts
- Full paper review
- Abstract critique
- Contribution clarity check
- Methodology critique
- Experiment design critique
- Baseline adequacy check
- Ablation study checklist
- Related work gap analysis
- Reproducibility checklist
- Limitation analysis
- Reviewer #2 simulation
- Rebuttal response drafting
- Meta-review synthesis
- Score calibration
- Camera-ready checklist

Workflows
- Reviewer workflow
- Author pre-submission workflow
- Rebuttal workflow
- Lab internal review workflow
- Meta-review workflow

Skills
- full-paper-review
- pre-submission-review
- methodology-critic
- rebuttal-coach
- meta-review-synthesizer
```

---

## 9. 页面设计重点

### 首页 CTA

```text
Review a paper
Improve my manuscript
Install a skill
Submit a prompt
```

### Prompt card

```text
[Full Structured Peer Review]
Reviewer / Author
General · Full Review · Curated · Skill-ready

A structured workflow for producing a balanced peer review covering contribution, correctness, experiments, limitations, and reproducibility.

[View] [Copy Prompt] [Install Skill]
```

### Skill card

```text
[full-paper-review]
Codex · Claude Code · No scripts · L1 safety

Use this skill when reviewing a research paper or performing a pre-submission self-review.

[Install for Codex] [Install for Claude Code] [View SKILL.md]
```

### Workflow page

```text
Full Paper Review Workflow

1. Understand the claim
2. Extract contributions
3. Check novelty
4. Critique method
5. Critique experiments
6. Check limitations
7. Draft review
8. Calibrate score

Recommended prompts:
- claim-extractor
- methodology-critic
- experiment-review
- score-calibrator

Available as skill:
- full-paper-review
```

---

## 10. 这个产品最应该突出的差异化

你的网站不要强调“这里有很多 prompt”。

应该强调：

```text
1. Prompt 有来源
2. Prompt 有适用场景
3. Prompt 有输入输出格式
4. Prompt 有示例
5. Prompt 有限制说明
6. Prompt 可以被社区改进
7. Prompt 可以封装为 skill
8. Skill 可以直接放进 Codex / Claude Code 使用
```

真正的差异化是：

> **从 prompt sharing 变成 review workflow infrastructure。**

---

## 11. 产品路线图

### Phase 0：你的个人开源库

```text
目标：先把你的方法体系公开出来。

交付：
- GitHub repo
- GitHub Pages 网站
- 20-30 个你自己的 prompt
- 3 个 workflows
- 3 个 skills
- 投稿入口
```

### Phase 1：社区投稿

```text
目标：让别人愿意贡献。

交付：
- Submit Prompt 表单
- Review queue
- Contributor page
- Prompt status
- Version history
- License policy
```

### Phase 2：Skill-first

```text
目标：让用户不只是复制 prompt，而是安装 skill。

交付：
- Skill Registry
- Codex install guide
- Claude Code install guide
- Skill ZIP download
- Skill changelog
- Skill safety level
```

### Phase 3：Interactive Prompt Builder

```text
目标：让非技术用户也能用。

交付：
- 选择任务
- 选择角色
- 选择领域
- 选择输出格式
- 自动拼装 prompt
- 导出为 prompt / skill / markdown
```

### Phase 4：Benchmark / Evaluation

```text
目标：从“好用”走向“可信”。

交付：
- 示例论文集
- prompt output comparison
- human rating
- failure case database
- model comparison
```

---

## 12. 我建议的产品名称

可以考虑这些：

```text
AI Review Commons
ReviewPrompt Commons
OpenReview Prompts
Paper Review Skills
PeerReview AI Registry
ReviewKit
PaperCritic
Manuscript Review Commons
```

我最推荐：

```text
AI Review Commons
```

原因是它比 “Prompt” 更大，可以容纳：

```text
prompts
workflows
rubrics
skills
examples
community contributions
```

副标题：

```text
Open prompts, workflows, and agent skills for AI-assisted peer review.
```

中文副标题：

```text
面向 AI 辅助论文审稿的开源 prompt、workflow 与 agent skill 方法库。
```

---

## 13. 最终建议

你应该把这个网站设计成四层：

```text
第一层：内容展示
Prompts / Workflows / Examples

第二层：社区贡献
Submit / Review / Versioning / Attribution

第三层：工具化使用
Copy prompt / Export JSON / Install skill

第四层：生态化分发
Codex skill / Claude Code skill / Agent Skill registry / future plugin
```

第一版用 **GitHub Pages + Astro Starlight** 完全够，而且很适合开源项目。你真正要投入精力的不是复杂前端，而是这三件事：

```text
1. 把 prompt 结构化
2. 把 workflow 标准化
3. 把高价值 workflow 封装成 skill
```

这个产品最有价值的地方，不是“展示你收集了哪些 prompt”，而是让别人可以非常低成本地完成：

```text
我想审一篇论文
→ 找到合适 workflow
→ 复制 prompt 或安装 skill
→ 得到结构化 review
→ 反过来改进论文或审稿意见
```

这就是它应该成为的产品：**一个开源、可投稿、可安装、可复用的 AI 辅助审稿基础设施。**

[1]: https://developers.openai.com/codex/skills "Agent Skills – Codex | OpenAI Developers"
[2]: https://docs.anthropic.com/en/docs/claude-code/skills "Extend Claude with skills - Claude Code Docs"
[3]: https://code.claude.com/docs/en/skills "Extend Claude with skills - Claude Code Docs"
[4]: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms "Syntax for issue forms - GitHub Docs"
[5]: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages "What is GitHub Pages? - GitHub Docs"
[6]: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site "Configuring a publishing source for your GitHub Pages site - GitHub Docs"
[7]: https://starlight.astro.build/ "Starlight  Build documentation sites with Astro"
[8]: https://pagefind.app/docs/ "Getting Started with Pagefind | Pagefind"
