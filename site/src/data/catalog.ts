export type ResourceStatus = 'curated' | 'tested';
export type ResourceType = 'prompt';

export interface RecommendationCriteria {
  role: string;
  task: string;
  domain: string;
}

export interface PromptResource {
  type: 'prompt';
  slug: string;
  title: string;
  summary: string;
  roles: string[];
  tasks: string[];
  domains: string[];
  status: ResourceStatus;
  featured?: boolean;
  href: string;
  tags: string[];
  modelCompatibility: string[];
  source: string;
  license: string;
  contributor: string;
  inputFormat: string[];
  outputFormat: string[];
  limitations: string[];
  promptText: string;
}

export interface Catalog {
  prompts: PromptResource[];
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

const rebuttalPrompt = `Turn reviewer comments into an evidence-backed rebuttal outline.

Classify each objection, identify what must be answered, draft a concise response, and flag comments that need new evidence or manuscript changes. Keep the tone factual and non-defensive.`;

export const catalog: Catalog = {
  prompts: [
    {
      type: 'prompt',
      slug: 'full-structured-peer-review',
      title: 'Full Structured Peer Review',
      summary:
        'Review a complete AI paper with a clear structure for claims, strengths, weaknesses, questions, score, and revision priorities.',
      roles: ['Author', 'Reviewer'],
      tasks: ['Full paper review'],
      domains: ['Artificial Intelligence'],
      status: 'curated',
      featured: true,
      href: '/prompts/full-structured-peer-review/',
      tags: ['full-paper', 'AI', 'review'],
      modelCompatibility: ['GPT', 'Claude', 'Gemini', 'Model-agnostic'],
      source: 'Original',
      license: 'CC BY 4.0',
      contributor: 'ReviewPrompt',
      inputFormat: ['paper title', 'abstract', 'method', 'experiments', 'main results'],
      outputFormat: ['summary', 'strengths', 'weaknesses', 'questions', 'score', 'revision priorities'],
      limitations: ['Requires the user to provide paper evidence.', 'Does not replace human review judgment.'],
      promptText: fullReviewPrompt,
    },
    {
      type: 'prompt',
      slug: 'rebuttal-response-drafting',
      title: 'Rebuttal Response Drafting',
      summary:
        'Turn AI paper reviews into a clear rebuttal plan with evidence, tone checks, and manuscript changes.',
      roles: ['Author', 'Reviewer'],
      tasks: ['Rebuttal'],
      domains: ['Artificial Intelligence'],
      status: 'tested',
      featured: true,
      href: '/prompts/rebuttal-response-drafting/',
      tags: ['rebuttal', 'AI', 'response'],
      modelCompatibility: ['GPT', 'Claude', 'Gemini', 'Model-agnostic'],
      source: 'Original',
      license: 'CC BY 4.0',
      contributor: 'ReviewPrompt',
      inputFormat: ['reviewer comments', 'paper evidence', 'author constraints'],
      outputFormat: ['objection categories', 'must-answer list', 'response draft', 'manuscript changes'],
      limitations: ['Cannot invent new results; unresolved evidence gaps must remain explicit.'],
      promptText: rebuttalPrompt,
    },
  ],
};
