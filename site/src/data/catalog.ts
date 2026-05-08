export type ResourceStatus = 'curated' | 'tested';
export type ResourceType = 'prompt';
export type PromptKind = 'single' | 'workflow';

export interface RecommendationCriteria {
  role: string;
  task: string;
  domain: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  summary: string;
  promptText: string;
}

export interface SkillWorkflow {
  title: string;
  summary: string;
  tools: string[];
  setupSteps: string[];
  agentInstruction: string;
}

export interface PromptResource {
  type: 'prompt';
  kind: PromptKind;
  slug: string;
  title: string;
  summary: string;
  useCase: string;
  roles: string[];
  tasks: string[];
  domains: string[];
  status: ResourceStatus;
  featured?: boolean;
  href: string;
  tags: string[];
  modelCompatibility: string[];
  source: string;
  sourceFile: string;
  license: string;
  contributor: string;
  inputFormat: string[];
  outputFormat: string[];
  limitations: string[];
  promptText: string;
  workflowSteps?: WorkflowStep[];
  skillWorkflow?: SkillWorkflow;
}

export interface Catalog {
  prompts: PromptResource[];
}

const reviewerImitationPrompt = `You are a strict and professional INTERSPEECH reviewer.

Review the submitted paper from the perspective of multiple realistic reviewers. Use only the paper content provided by the user. Do not invent experiments, citations, reviewer policies, or hidden venue rules.

For each simulated reviewer, provide:
1. A concise paper summary.
2. Main strengths.
3. Major weaknesses.
4. Specific questions for the authors.
5. An acceptance-risk assessment.
6. A numeric score and confidence.

Then provide an overall judgment on the paper quality and whether it currently looks competitive for acceptance.`;

const basicWritingPrompt = `You are checking a research paper for basic writing issues.

Read the provided manuscript carefully and only report issues that are supported by the text. Focus on spelling, grammar, awkward wording, duplicated expressions, undefined abbreviations, formatting inconsistencies, and sentences that are hard to parse.

Return a table with: location, original text, issue type, why it matters, and a concrete rewrite suggestion. If no issue is found in a category, say so explicitly.`;

const keywordConsistencyPrompt = `You are auditing keyword and topic consistency in a research paper.

First summarize the paper's central topic and extract 5-8 core keywords. Then check whether these keywords and their synonyms are used consistently in the title, abstract, introduction, method, experiments, and conclusion.

Flag missing, drifting, overloaded, or contradictory terms. For each issue, explain where it appears, what meaning changes, and how the author should align the title, abstract, and body text.`;

const citationAuditPrompt = `You are auditing citations in a research paper.

Use only the manuscript and reference list provided by the user. Do not claim that a citation is fake unless the provided information supports that suspicion. Check for unsupported factual claims, citations that do not match the surrounding claim, missing citations for important background statements, inconsistent citation metadata, and references that appear unrelated to the paper's contribution.

Return suspicious items with the quoted claim, cited reference, risk level, and the evidence needed to resolve the issue.`;

const experimentSetupPrompt = `You are auditing the experiment setup of a research paper.

Inspect datasets, splits, baselines, metrics, hyperparameters, training details, ablations, statistical tests, and evaluation protocol. Look for missing key parameters, unfair comparisons, leakage risks, unclear implementation details, and logical errors in the experimental design.

Return issues as actionable review notes: location, problem, why it threatens validity, what additional detail or experiment would fix it, and whether the issue is minor, major, or blocking.`;

const figureTablePrompt = `You are checking consistency between figures, tables, captions, and body text.

Compare every reported number, trend, method name, dataset name, metric, and conclusion that appears in a figure or table with the surrounding text. Flag mismatches, unexplained abbreviations, missing captions, inconsistent rounding, and conclusions that overstate what the visual evidence shows.

Return a checklist of concrete inconsistencies with exact locations and suggested corrections.`;

const narrativeLogicPrompt = `You are auditing narrative logic consistency in a research paper.

First extract the paper's 3-5 central claims. Then trace each claim through the abstract, introduction, method, experiments, results, and conclusion. Check whether the paper changes its claim, contradicts itself, skips necessary reasoning, or introduces evidence after making a stronger claim than the results support.

Return each claim with supporting passages, contradiction or gap, severity, and a recommended rewrite or structural fix.`;

const contributionEvidencePrompt = `You are auditing contribution-evidence alignment in a research paper.

List every contribution claimed by the paper. For each contribution, identify the exact experiment, ablation, analysis, theorem, user study, or qualitative evidence that supports it. Check whether the contribution is overstated, unsupported, redundant with prior work, or missing a direct evidence chain.

Return a contribution-by-contribution table with: claimed contribution, evidence provided, missing evidence, risk to acceptance, and a safer wording or additional experiment.`;

const authorCheckWorkflowPrompt = `Run a multi-pass author-side quality check for a research paper.

Do not combine all checks into one broad review. Run each checkpoint as an independent pass so that the output is specific and easier to verify:
1. Basic writing errors.
2. Keyword consistency.
3. Citation audit.
4. Experiment setup audit.
5. Figure/table consistency.
6. Narrative logic consistency.
7. Contribution-evidence alignment.

For every pass, cite concrete text or locations from the manuscript, separate confirmed problems from uncertainties, and end with a prioritized fix list.`;

const authorCheckAgentInstruction = `You are an AI paper review agent helping an author find problems before submission.

Read the manuscript source provided in this workspace, including PDF, LaTeX, Markdown, figures, tables, bibliography, appendix, reviews, or notes when available.

Run each checkpoint as a separate review pass. Do not merge them into one generic review:
1. Basic writing errors.
2. Keyword consistency.
3. Citation audit.
4. Experiment setup audit.
5. Figure/table consistency.
6. Narrative logic consistency.
7. Contribution-evidence alignment.

For each pass:
- Use only evidence from the provided files.
- Quote or point to the relevant location.
- Mark each finding as confirmed, likely, or needs human verification.
- Explain why the issue may hurt review outcome.
- Give a concrete revision suggestion.

After all passes, write a single consolidated report named author-check-report.md with:
1. Executive summary.
2. Top 10 issues ranked by acceptance risk.
3. Findings grouped by checkpoint.
4. Quick fixes that can be done today.
5. Deeper fixes that may require experiments or rewriting.
6. Open questions for the author.`;

const rebuttalBriefingPrompt = `You are preparing a rebuttal briefing document for the author, advisor, and coauthors.

Read the paper, reviews, and current rebuttal draft provided by the user. Summarize each reviewer's main concerns, include short English excerpts from the original reviews to preserve credibility, present the current rebuttal text, and explain the evidence or reasoning behind the rebuttal.

Return a concise shareable document with:
1. Overall review situation.
2. Reviewer-by-reviewer main objections with quoted original comments.
3. Current rebuttal draft.
4. Evidence and rationale behind each response.
5. Missing evidence or risky claims.
6. Questions that need advisor or coauthor input.`;

export const catalog: Catalog = {
  prompts: [
    {
      type: 'prompt',
      kind: 'single',
      slug: 'reviewer-imitation-quality-check',
      title: 'Reviewer Imitation Quality Check',
      summary:
        'Simulate strict INTERSPEECH-style reviewers so authors can judge paper quality, acceptance risk, scores, and revision priorities.',
      useCase: 'I want to know how reviewers may judge this paper.',
      roles: ['Author'],
      tasks: ['Reviewer imitation'],
      domains: ['Artificial Intelligence'],
      status: 'curated',
      featured: true,
      href: '/prompts/reviewer-imitation-quality-check/',
      tags: ['reviewer-imitation', 'acceptance-risk', 'INTERSPEECH'],
      modelCompatibility: ['GPT', 'Claude', 'Gemini', 'Model-agnostic'],
      source: 'Local prompt file',
      sourceFile: 'data/my_prompts/reviewer_imitation.txt',
      license: 'Project internal draft',
      contributor: 'ReviewPrompt',
      inputFormat: ['paper title', 'abstract', 'full manuscript', 'target venue if available'],
      outputFormat: ['simulated reviewer reports', 'per-reviewer scores', 'overall score', 'acceptance-risk judgment'],
      limitations: [
        'The model cannot predict real reviewer decisions.',
        'The prompt is venue-flavored and should be adapted if the target venue is not INTERSPEECH.',
      ],
      promptText: reviewerImitationPrompt,
    },
    {
      type: 'prompt',
      kind: 'workflow',
      slug: 'author-check-workflow',
      title: 'Author Multi-pass Paper Check Workflow',
      summary:
        'Run seven independent LLM review passes over a manuscript to find writing, citation, experiment, figure, logic, and evidence-chain problems.',
      useCase: 'I want Codex or Claude Code to repeatedly review my paper and collect problems.',
      roles: ['Author'],
      tasks: ['Multi-pass paper check'],
      domains: ['Artificial Intelligence'],
      status: 'curated',
      featured: true,
      href: '/prompts/author-check-workflow/',
      tags: ['workflow', 'multi-pass-review', 'author-check'],
      modelCompatibility: ['GPT', 'Claude', 'Gemini', 'Model-agnostic'],
      source: 'Local prompt file',
      sourceFile: 'data/my_prompts/author_check.txt',
      license: 'Project internal draft',
      contributor: 'ReviewPrompt',
      inputFormat: ['full manuscript', 'figures and tables', 'bibliography', 'appendix or supplementary material'],
      outputFormat: ['seven checkpoint reports', 'ranked issue list', 'author-check-report.md'],
      limitations: [
        'Each checkpoint should be run separately to reduce vague all-in-one feedback.',
        'Citation and experiment findings still require author verification.',
      ],
      promptText: authorCheckWorkflowPrompt,
      workflowSteps: [
        {
          id: 'basic-writing-errors',
          title: 'Basic writing errors',
          summary: 'Find spelling, grammar, wording, abbreviation, and formatting issues.',
          promptText: basicWritingPrompt,
        },
        {
          id: 'keyword-consistency',
          title: 'Keyword consistency',
          summary: 'Extract core keywords and check consistency across title, abstract, and body.',
          promptText: keywordConsistencyPrompt,
        },
        {
          id: 'citation-audit',
          title: 'Citation audit',
          summary: 'Flag suspicious, mismatched, unsupported, or missing citations.',
          promptText: citationAuditPrompt,
        },
        {
          id: 'experiment-setup-audit',
          title: 'Experiment setup audit',
          summary: 'Check baselines, metrics, splits, hyperparameters, ablations, and protocol validity.',
          promptText: experimentSetupPrompt,
        },
        {
          id: 'figure-table-consistency',
          title: 'Figure/table consistency',
          summary: 'Compare figures, tables, captions, numbers, and body-text claims.',
          promptText: figureTablePrompt,
        },
        {
          id: 'narrative-logic-consistency',
          title: 'Narrative logic consistency',
          summary: 'Trace central claims through the paper and find contradictions or reasoning gaps.',
          promptText: narrativeLogicPrompt,
        },
        {
          id: 'contribution-evidence-alignment',
          title: 'Contribution-evidence alignment',
          summary: 'Match each claimed contribution to experiments, analysis, or evidence.',
          promptText: contributionEvidencePrompt,
        },
      ],
      skillWorkflow: {
        title: 'Codex / Claude Code paper-check workflow',
        summary:
          'Paste this instruction into Codex or Claude Code inside a paper project so the agent runs each checkpoint as a separate pass and writes a consolidated report.',
        tools: ['Codex', 'Claude Code'],
        setupSteps: [
          'Open the folder that contains the manuscript, figures, tables, bibliography, and appendix.',
          'Paste the agent workflow instruction into Codex or Claude Code.',
          'Ask the agent to run each checkpoint independently before writing the final report.',
          'Review author-check-report.md and decide which findings need manuscript changes.',
        ],
        agentInstruction: authorCheckAgentInstruction,
      },
    },
    {
      type: 'prompt',
      kind: 'single',
      slug: 'rebuttal-briefing',
      title: 'Rebuttal Briefing Generator',
      summary:
        'Summarize reviews, preserve original reviewer excerpts, present the current rebuttal, and explain the rationale for advisor or coauthor review.',
      useCase: 'I need a concise rebuttal briefing for my advisor or coauthors.',
      roles: ['Author'],
      tasks: ['Rebuttal briefing'],
      domains: ['Artificial Intelligence'],
      status: 'tested',
      featured: true,
      href: '/prompts/rebuttal-briefing/',
      tags: ['rebuttal', 'briefing', 'coauthor-review'],
      modelCompatibility: ['GPT', 'Claude', 'Gemini', 'Model-agnostic'],
      source: 'Local prompt file',
      sourceFile: 'data/my_prompts/rebuttal.txt',
      license: 'Project internal draft',
      contributor: 'ReviewPrompt',
      inputFormat: ['paper text', 'reviewer comments', 'current rebuttal draft', 'author notes'],
      outputFormat: ['review summary', 'quoted original objections', 'current rebuttal text', 'response rationale'],
      limitations: [
        'Original review excerpts should be short and relevant.',
        'The model must not invent reviewer comments, experiments, or author commitments.',
      ],
      promptText: rebuttalBriefingPrompt,
    },
  ],
};
