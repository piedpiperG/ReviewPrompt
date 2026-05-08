import {
  catalog,
  type Catalog,
  type PromptKind,
  type PromptPackage,
  type PromptResource,
  type RecommendationCriteria,
  type ResourceType,
  type ScenarioEntry,
  type SkillWorkflow,
  type WorkflowStep,
} from '../data/catalog';

export { catalog };
export type {
  Catalog,
  PromptKind,
  PromptPackage,
  PromptResource,
  RecommendationCriteria,
  ResourceType,
  ScenarioEntry,
  SkillWorkflow,
  WorkflowStep,
};

export interface FeaturedResources {
  prompts: PromptResource[];
}

export interface ResourceRecommendation {
  prompts: PromptResource[];
}

export interface StaticIndexItem {
  type: ResourceType;
  slug: string;
  title: string;
  summary: string;
  href: string;
  tags: string[];
  searchText: string;
}

export function getFeaturedResources(source: Catalog = catalog): FeaturedResources {
  return {
    prompts: source.prompts.filter((item) => item.featured),
  };
}

export function getPromptPackages(source: Catalog = catalog): PromptPackage[] {
  return source.promptPackages;
}

export function getScenarioEntries(source: Catalog = catalog): ScenarioEntry[] {
  return source.scenarios;
}

export function recommendResources(
  source: Catalog = catalog,
  criteria: RecommendationCriteria,
): ResourceRecommendation {
  return {
    prompts: rankResources(source.prompts, criteria).slice(0, 1),
  };
}

export function buildStaticIndex(source: Catalog = catalog): StaticIndexItem[] {
  return source.prompts.map((item) => ({
    type: item.type,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    href: item.href,
    tags: item.tags,
    searchText: [
      item.title,
      item.summary,
      item.useCase,
      item.roles.join(' '),
      item.tasks.join(' '),
      item.domains.join(' '),
      item.inputFormat.join(' '),
      item.outputFormat.join(' '),
      item.limitations.join(' '),
      ...(item.workflowSteps ?? []).flatMap((step) => [step.title, step.summary, step.promptText]),
      item.skillWorkflow?.title ?? '',
      item.skillWorkflow?.summary ?? '',
      item.skillWorkflow?.agentInstruction ?? '',
    ].join(' '),
  }));
}

function rankResources(resources: PromptResource[], criteria: RecommendationCriteria): PromptResource[] {
  return resources
    .map((resource) => ({ resource, score: scoreResource(resource, criteria) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.resource.title.localeCompare(b.resource.title))
    .map((item) => item.resource);
}

function scoreResource(resource: PromptResource, criteria: RecommendationCriteria): number {
  let score = 0;

  score += matchValue(resource.roles, criteria.role) ? 5 : 0;
  score += matchValue(resource.tasks, criteria.task) ? 6 : 0;
  score += matchValue(resource.domains, criteria.domain) ? 2 : 0;
  score += resource.status === 'curated' ? 1 : 0;
  score += resource.featured ? 0.5 : 0;

  return score;
}

function matchValue(values: string[], target: string): boolean {
  const normalizedTarget = normalize(target);
  return values.some((value) => normalize(value) === normalizedTarget);
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}
