export type ResourceStatus = 'curated' | 'tested' | 'experimental' | 'deprecated';
export type ResourceType = 'prompt' | 'workflow' | 'skill';

export interface RecommendationCriteria {
  role: string;
  task: string;
  stage: string;
  domain: string;
}

interface BaseResource {
  slug: string;
  title: string;
  summary: string;
  roles: string[];
  tasks: string[];
  stages: string[];
  domains: string[];
  status: ResourceStatus;
  featured?: boolean;
  href: string;
  tags: string[];
}

export interface PromptResource extends BaseResource {
  type: 'prompt';
  modelCompatibility: string[];
  source: string;
  license: string;
  contributor: string;
  hasSkill: boolean;
  inputFormat: string[];
  outputFormat: string[];
  limitations: string[];
  promptText: string;
  relatedWorkflows: string[];
  relatedSkills: string[];
}

export interface WorkflowResource extends BaseResource {
  type: 'workflow';
  steps: string[];
  outputArtifacts: string[];
  recommendedPrompts: string[];
  skillSlug?: string;
}

export interface SkillResource extends BaseResource {
  type: 'skill';
  tools: string[];
  safetyLevel: 'L0' | 'L1' | 'L2' | 'L3';
  hasScripts: boolean;
  version: string;
  license: string;
  installCodex: string;
  installClaude: string;
  skillPreview: string;
}

export interface Catalog {
  prompts: PromptResource[];
  workflows: WorkflowResource[];
  skills: SkillResource[];
}

const fullReviewPrompt = `You are assisting with a structured peer review of a research paper.

Use the provided manuscript text only. Do not fabricate citations, missing experiments, or venue rules.

Return a review with:
1. Neutral summary of the paper's main claim.
2. Strengths.
3. Major weaknesses.
4. Methodology and experiment concerns.
5. Reproducibility and clarity issues.
6. Questions for authors.
7. Suggested score and confidence.
8. Concrete revision priorities.`;

const methodologyPrompt = `Act as a methodology critic for a research manuscript.

Identify the central claim, the assumptions behind the method, and whether the experimental design can support the claim. Separate evidence-backed concerns from speculation. Do not request experiments unless they directly test the claim.`;

const reviewerAttackPrompt = `Simulate three likely reviewers for a submission-ready manuscript.

Reviewer 1 should focus on novelty, Reviewer 2 on methodology and experiments, and Reviewer 3 on clarity and positioning. For each reviewer, list the strongest objection, the evidence they would cite, and the revision that would reduce the risk.`;

const rebuttalPrompt = `Turn reviewer comments into an evidence-backed rebuttal outline.

Classify each objection, identify what must be answered, draft a concise response, and flag comments that need new evidence or manuscript changes. Keep the tone factual and non-defensive.`;

const reproducibilityPrompt = `Review the manuscript for reproducibility risks.

Check datasets, preprocessing, baselines, hyperparameters, metrics, ablations, compute budget, random seeds, and implementation details. Return missing information as a checklist.`;

const metaReviewPrompt = `Synthesize multiple peer reviews into an area-chair style meta-review.

Extract points of consensus, points of disagreement, decision-critical evidence, unresolved questions, and a balanced summary. Do not average scores mechanically.`;

export const catalog: Catalog = {
  prompts: [
    {
      type: 'prompt',
      slug: 'full-structured-peer-review',
      title: 'Full Structured Peer Review',
      summary:
        'Produces a balanced peer review covering contribution, correctness, methodology, experiments, limitations, reproducibility, score, and confidence.',
      roles: ['Reviewer', 'Author', 'Lab internal reviewer'],
      tasks: ['Full paper review', 'Pre-submission self review'],
      stages: ['Under review', 'Submission-ready'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'Systems', 'HCI'],
      status: 'curated',
      featured: true,
      href: '/prompts/full-structured-peer-review/',
      tags: ['full-review', 'rubric', 'skill-ready'],
      modelCompatibility: ['GPT', 'Claude', 'Gemini', 'Model-agnostic'],
      source: 'Original',
      license: 'CC BY 4.0',
      contributor: 'ReviewPrompt',
      hasSkill: true,
      inputFormat: ['paper title', 'abstract', 'method section', 'experiments', 'optional venue rubric'],
      outputFormat: ['summary', 'strengths', 'weaknesses', 'questions', 'score', 'confidence'],
      limitations: ['Requires the user to provide paper evidence.', 'Does not replace human review judgment.'],
      promptText: fullReviewPrompt,
      relatedWorkflows: ['full-paper-review', 'pre-submission-self-review'],
      relatedSkills: ['full-paper-review', 'pre-submission-review'],
    },
    {
      type: 'prompt',
      slug: 'methodology-critique',
      title: 'Methodology Critique',
      summary:
        'Checks whether a paper method and experiment design actually support the central claim.',
      roles: ['Reviewer', 'Author'],
      tasks: ['Methodology critique', 'Experiment critique'],
      stages: ['Early draft', 'Submission-ready', 'Under review'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'Systems'],
      status: 'curated',
      featured: true,
      href: '/prompts/methodology-critique/',
      tags: ['methodology', 'experiments', 'claim-check'],
      modelCompatibility: ['GPT', 'Claude', 'Gemini', 'Model-agnostic'],
      source: 'Original',
      license: 'CC BY 4.0',
      contributor: 'ReviewPrompt',
      hasSkill: true,
      inputFormat: ['main claim', 'method description', 'experiment setup', 'reported results'],
      outputFormat: ['claim-method alignment', 'assumptions', 'threats to validity', 'missing evidence'],
      limitations: ['Needs enough method detail to separate real weaknesses from missing context.'],
      promptText: methodologyPrompt,
      relatedWorkflows: ['full-paper-review', 'pre-submission-self-review'],
      relatedSkills: ['methodology-critic'],
    },
    {
      type: 'prompt',
      slug: 'reviewer-attack-simulation',
      title: 'Reviewer Attack Simulation',
      summary:
        'Simulates likely reviewer objections before submission and turns them into a prioritized revision checklist.',
      roles: ['Author', 'Lab internal reviewer'],
      tasks: ['Pre-submission self review', 'Reviewer simulation'],
      stages: ['Early draft', 'Submission-ready'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision'],
      status: 'curated',
      featured: true,
      href: '/prompts/reviewer-attack-simulation/',
      tags: ['self-review', 'risk-analysis', 'revision-checklist'],
      modelCompatibility: ['GPT', 'Claude', 'Gemini', 'Model-agnostic'],
      source: 'Original',
      license: 'CC BY 4.0',
      contributor: 'ReviewPrompt',
      hasSkill: true,
      inputFormat: ['draft manuscript', 'target venue', 'current limitations', 'planned experiments'],
      outputFormat: ['reviewer personas', 'attack points', 'evidence gaps', 'revision priorities'],
      limitations: ['Can overestimate adversarial objections if target venue context is missing.'],
      promptText: reviewerAttackPrompt,
      relatedWorkflows: ['pre-submission-self-review'],
      relatedSkills: ['pre-submission-review'],
    },
    {
      type: 'prompt',
      slug: 'rebuttal-response-drafting',
      title: 'Rebuttal Response Drafting',
      summary:
        'Converts reviewer comments into a factual rebuttal outline with required evidence and tone checks.',
      roles: ['Author'],
      tasks: ['Rebuttal simulation', 'Rebuttal drafting'],
      stages: ['Rebuttal'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'HCI'],
      status: 'tested',
      href: '/prompts/rebuttal-response-drafting/',
      tags: ['rebuttal', 'tone', 'evidence'],
      modelCompatibility: ['GPT', 'Claude', 'Gemini', 'Model-agnostic'],
      source: 'Original',
      license: 'CC BY 4.0',
      contributor: 'ReviewPrompt',
      hasSkill: true,
      inputFormat: ['reviewer comments', 'paper evidence', 'author constraints'],
      outputFormat: ['objection categories', 'must-answer list', 'draft response', 'manuscript changes'],
      limitations: ['Cannot invent new results; unresolved evidence gaps must remain explicit.'],
      promptText: rebuttalPrompt,
      relatedWorkflows: ['rebuttal-simulation'],
      relatedSkills: ['rebuttal-coach'],
    },
    {
      type: 'prompt',
      slug: 'reproducibility-checklist',
      title: 'Reproducibility Checklist',
      summary:
        'Audits a manuscript for missing implementation, data, metric, and experiment details.',
      roles: ['Reviewer', 'Author'],
      tasks: ['Reproducibility check', 'Experiment critique'],
      stages: ['Early draft', 'Submission-ready', 'Under review', 'Camera-ready'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'Systems'],
      status: 'tested',
      href: '/prompts/reproducibility-checklist/',
      tags: ['reproducibility', 'experiments', 'checklist'],
      modelCompatibility: ['GPT', 'Claude', 'Gemini', 'Model-agnostic'],
      source: 'Original',
      license: 'CC BY 4.0',
      contributor: 'ReviewPrompt',
      hasSkill: true,
      inputFormat: ['method', 'experiments', 'appendix', 'repository link if public'],
      outputFormat: ['missing details', 'risk level', 'actionable checklist'],
      limitations: ['Private code or hidden data cannot be inspected unless provided.'],
      promptText: reproducibilityPrompt,
      relatedWorkflows: ['full-paper-review', 'lab-internal-review'],
      relatedSkills: ['reproducibility-checker'],
    },
    {
      type: 'prompt',
      slug: 'meta-review-synthesis',
      title: 'Meta-review Synthesis',
      summary:
        'Synthesizes multiple reviews into consensus, conflict points, decision-critical questions, and an AC-style summary.',
      roles: ['Area Chair', 'Meta-reviewer'],
      tasks: ['Meta-review synthesis'],
      stages: ['Under review'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'HCI'],
      status: 'experimental',
      href: '/prompts/meta-review-synthesis/',
      tags: ['meta-review', 'synthesis', 'area-chair'],
      modelCompatibility: ['GPT', 'Claude', 'Gemini', 'Model-agnostic'],
      source: 'Original',
      license: 'CC BY 4.0',
      contributor: 'ReviewPrompt',
      hasSkill: true,
      inputFormat: ['review texts', 'scores', 'confidence values', 'discussion notes if available'],
      outputFormat: ['consensus', 'conflicts', 'decision-critical evidence', 'AC summary'],
      limitations: ['Requires complete reviewer comments to avoid hiding minority concerns.'],
      promptText: metaReviewPrompt,
      relatedWorkflows: ['meta-review-synthesis'],
      relatedSkills: ['meta-review-synthesizer'],
    },
  ],
  workflows: [
    {
      type: 'workflow',
      slug: 'full-paper-review',
      title: 'Full Paper Review Workflow',
      summary:
        'An end-to-end workflow for understanding a paper, checking claims, critiquing methods and experiments, drafting a review, and calibrating score.',
      roles: ['Reviewer', 'Author', 'Lab internal reviewer'],
      tasks: ['Full paper review'],
      stages: ['Under review', 'Submission-ready'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'Systems', 'HCI'],
      status: 'curated',
      featured: true,
      href: '/workflows/full-paper-review/',
      tags: ['reviewer', 'full-review', 'score-calibration'],
      steps: [
        'Understand the paper abstract and main claim.',
        'Extract contributions and claimed novelty.',
        'Check novelty against the provided related work.',
        'Critique methodology and assumptions.',
        'Critique experiments, baselines, metrics, and ablations.',
        'Analyze limitations, reproducibility, ethics, and clarity.',
        'Draft a structured review.',
        'Calibrate score and confidence.',
      ],
      outputArtifacts: ['structured review', 'questions for authors', 'score calibration notes'],
      recommendedPrompts: ['full-structured-peer-review', 'methodology-critique', 'reproducibility-checklist'],
      skillSlug: 'full-paper-review',
    },
    {
      type: 'workflow',
      slug: 'pre-submission-self-review',
      title: 'Pre-submission Self Review Workflow',
      summary:
        'Helps authors find reviewer attack points, missing evidence, and revision priorities before submission.',
      roles: ['Author', 'Lab internal reviewer'],
      tasks: ['Pre-submission self review'],
      stages: ['Early draft', 'Submission-ready'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'HCI'],
      status: 'curated',
      featured: true,
      href: '/workflows/pre-submission-self-review/',
      tags: ['author', 'self-review', 'revision'],
      steps: [
        'Identify the paper main claim.',
        'Check contribution clarity.',
        'Simulate likely reviewer objections.',
        'Check whether experiments support the claim.',
        'Generate a revision checklist.',
        'Simulate reviewer profiles.',
        'Prioritize changes by risk and effort.',
      ],
      outputArtifacts: ['attack points', 'revision checklist', 'priority plan'],
      recommendedPrompts: ['reviewer-attack-simulation', 'methodology-critique', 'reproducibility-checklist'],
      skillSlug: 'pre-submission-review',
    },
    {
      type: 'workflow',
      slug: 'rebuttal-simulation',
      title: 'Rebuttal Simulation Workflow',
      summary:
        'Classifies reviewer objections, identifies required evidence, drafts responses, and checks tone.',
      roles: ['Author'],
      tasks: ['Rebuttal simulation', 'Rebuttal drafting'],
      stages: ['Rebuttal'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'HCI'],
      status: 'tested',
      featured: true,
      href: '/workflows/rebuttal-simulation/',
      tags: ['rebuttal', 'evidence', 'tone'],
      steps: [
        'Input reviewer comments.',
        'Classify objections by topic and severity.',
        'Identify questions that must be answered.',
        'Draft evidence-backed rebuttal responses.',
        'Check tone and remove defensive wording.',
        'Generate a final rebuttal outline.',
      ],
      outputArtifacts: ['objection map', 'response outline', 'tone checklist'],
      recommendedPrompts: ['rebuttal-response-drafting'],
      skillSlug: 'rebuttal-coach',
    },
    {
      type: 'workflow',
      slug: 'meta-review-synthesis',
      title: 'Meta-review Synthesis Workflow',
      summary:
        'Turns multiple reviews into consensus, disagreements, decision-critical evidence, and an AC-style summary.',
      roles: ['Area Chair', 'Meta-reviewer'],
      tasks: ['Meta-review synthesis'],
      stages: ['Under review'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'HCI'],
      status: 'experimental',
      href: '/workflows/meta-review-synthesis/',
      tags: ['meta-review', 'area-chair', 'synthesis'],
      steps: [
        'Input multiple reviews and scores.',
        'Extract consensus points.',
        'Extract conflicts and uncertainty.',
        'Check whether disagreements affect the decision.',
        'Draft an AC-style summary.',
      ],
      outputArtifacts: ['review consensus', 'conflict map', 'meta-review draft'],
      recommendedPrompts: ['meta-review-synthesis'],
      skillSlug: 'meta-review-synthesizer',
    },
    {
      type: 'workflow',
      slug: 'lab-internal-review',
      title: 'Lab Internal Review Workflow',
      summary:
        'A practical workflow for group reading, pre-submission feedback, and author revision planning.',
      roles: ['Author', 'Lab internal reviewer'],
      tasks: ['Pre-submission self review', 'Writing clarity', 'Reproducibility check'],
      stages: ['Early draft', 'Submission-ready', 'Camera-ready'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'Systems', 'HCI'],
      status: 'curated',
      href: '/workflows/lab-internal-review/',
      tags: ['lab', 'internal-review', 'revision'],
      steps: [
        'Assign reviewers to contribution, method, experiments, and writing.',
        'Collect structured comments.',
        'Merge duplicate issues.',
        'Separate must-fix items from nice-to-have edits.',
        'Produce a revision checklist for authors.',
      ],
      outputArtifacts: ['internal review notes', 'merged issue list', 'author checklist'],
      recommendedPrompts: ['reviewer-attack-simulation', 'reproducibility-checklist'],
      skillSlug: 'pre-submission-review',
    },
  ],
  skills: [
    {
      type: 'skill',
      slug: 'full-paper-review',
      title: 'full-paper-review',
      summary:
        'A reusable Agent Skill for structured peer review and pre-submission self-review.',
      roles: ['Reviewer', 'Author', 'Lab internal reviewer'],
      tasks: ['Full paper review'],
      stages: ['Under review', 'Submission-ready'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'Systems', 'HCI'],
      status: 'curated',
      featured: true,
      href: '/skills/full-paper-review/',
      tags: ['codex', 'claude-code', 'review'],
      tools: ['Codex', 'Claude Code', 'Generic Agent Skill'],
      safetyLevel: 'L1',
      hasScripts: false,
      version: '0.1.0',
      license: 'MIT',
      installCodex: 'mkdir -p .agents/skills && cp -r skills/full-paper-review .agents/skills/',
      installClaude: 'mkdir -p ~/.claude/skills && cp -r skills/full-paper-review ~/.claude/skills/',
      skillPreview:
        'Use when reviewing a research paper or performing a pre-submission self-review. Produces a structured peer review with claims, strengths, weaknesses, questions, score, and confidence.',
    },
    {
      type: 'skill',
      slug: 'pre-submission-review',
      title: 'pre-submission-review',
      summary:
        'Helps authors attack their own manuscript before submission and produce a revision checklist.',
      roles: ['Author', 'Lab internal reviewer'],
      tasks: ['Pre-submission self review', 'Reviewer simulation'],
      stages: ['Early draft', 'Submission-ready'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'HCI'],
      status: 'curated',
      featured: true,
      href: '/skills/pre-submission-review/',
      tags: ['author', 'self-review', 'codex'],
      tools: ['Codex', 'Claude Code', 'Generic Agent Skill'],
      safetyLevel: 'L1',
      hasScripts: false,
      version: '0.1.0',
      license: 'MIT',
      installCodex: 'mkdir -p .agents/skills && cp -r skills/pre-submission-review .agents/skills/',
      installClaude: 'mkdir -p ~/.claude/skills && cp -r skills/pre-submission-review ~/.claude/skills/',
      skillPreview:
        'Use when preparing a manuscript for submission. Finds reviewer attack points, missing evidence, and revision priorities.',
    },
    {
      type: 'skill',
      slug: 'methodology-critic',
      title: 'methodology-critic',
      summary:
        'Focuses on claim-method alignment, experimental design, assumptions, and validity threats.',
      roles: ['Reviewer', 'Author'],
      tasks: ['Methodology critique', 'Experiment critique'],
      stages: ['Early draft', 'Submission-ready', 'Under review'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'Systems'],
      status: 'curated',
      href: '/skills/methodology-critic/',
      tags: ['methodology', 'experiments', 'skill'],
      tools: ['Codex', 'Claude Code', 'Generic Agent Skill'],
      safetyLevel: 'L1',
      hasScripts: false,
      version: '0.1.0',
      license: 'MIT',
      installCodex: 'mkdir -p .agents/skills && cp -r skills/methodology-critic .agents/skills/',
      installClaude: 'mkdir -p ~/.claude/skills && cp -r skills/methodology-critic ~/.claude/skills/',
      skillPreview:
        'Use to critique whether a paper method, assumptions, and experiments support the main claim.',
    },
    {
      type: 'skill',
      slug: 'rebuttal-coach',
      title: 'rebuttal-coach',
      summary:
        'Turns reviewer comments into response strategy, evidence-backed rebuttal drafts, and tone checks.',
      roles: ['Author'],
      tasks: ['Rebuttal simulation', 'Rebuttal drafting'],
      stages: ['Rebuttal'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'HCI'],
      status: 'tested',
      href: '/skills/rebuttal-coach/',
      tags: ['rebuttal', 'tone', 'skill'],
      tools: ['Codex', 'Claude Code', 'Generic Agent Skill'],
      safetyLevel: 'L1',
      hasScripts: false,
      version: '0.1.0',
      license: 'MIT',
      installCodex: 'mkdir -p .agents/skills && cp -r skills/rebuttal-coach .agents/skills/',
      installClaude: 'mkdir -p ~/.claude/skills && cp -r skills/rebuttal-coach ~/.claude/skills/',
      skillPreview:
        'Use during rebuttal. Classifies objections, identifies required evidence, drafts responses, and checks tone.',
    },
    {
      type: 'skill',
      slug: 'meta-review-synthesizer',
      title: 'meta-review-synthesizer',
      summary:
        'Synthesizes multiple reviews into consensus, conflicts, decision-critical evidence, and AC summary.',
      roles: ['Area Chair', 'Meta-reviewer'],
      tasks: ['Meta-review synthesis'],
      stages: ['Under review'],
      domains: ['General', 'Machine Learning', 'NLP', 'Computer Vision', 'HCI'],
      status: 'experimental',
      href: '/skills/meta-review-synthesizer/',
      tags: ['meta-review', 'area-chair', 'skill'],
      tools: ['Codex', 'Claude Code', 'Generic Agent Skill'],
      safetyLevel: 'L1',
      hasScripts: false,
      version: '0.1.0',
      license: 'MIT',
      installCodex: 'mkdir -p .agents/skills && cp -r skills/meta-review-synthesizer .agents/skills/',
      installClaude: 'mkdir -p ~/.claude/skills && cp -r skills/meta-review-synthesizer ~/.claude/skills/',
      skillPreview:
        'Use when synthesizing multiple reviews. Extracts consensus, conflicts, unresolved questions, and meta-review summary.',
    },
  ],
};
