import {
  catalog,
  type Catalog,
  type PromptResource,
  type RecommendationCriteria,
  type ResourceType,
  type SkillResource,
  type WorkflowResource,
} from '../data/catalog';

export { catalog };
export type {
  Catalog,
  PromptResource,
  RecommendationCriteria,
  ResourceType,
  SkillResource,
  WorkflowResource,
};

export interface FeaturedResources {
  prompts: PromptResource[];
  workflows: WorkflowResource[];
  skills: SkillResource[];
}

export interface ResourceRecommendation {
  workflow?: WorkflowResource;
  prompts: PromptResource[];
  skills: SkillResource[];
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
    prompts: source.prompts.filter((item) => item.featured).slice(0, 3),
    workflows: source.workflows.filter((item) => item.featured).slice(0, 3),
    skills: source.skills.filter((item) => item.featured).slice(0, 3),
  };
}

export function recommendResources(
  source: Catalog = catalog,
  criteria: RecommendationCriteria,
): ResourceRecommendation {
  const workflow = rankResources(source.workflows, criteria)[0];
  const workflowPromptSlugs = new Set(workflow?.recommendedPrompts ?? []);
  const workflowSkillSlug = workflow?.skillSlug;

  const prompts = rankResources(source.prompts, criteria)
    .sort((a, b) => {
      const aBoost = workflowPromptSlugs.has(a.slug) ? 1 : 0;
      const bBoost = workflowPromptSlugs.has(b.slug) ? 1 : 0;
      return bBoost - aBoost || scoreResource(b, criteria) - scoreResource(a, criteria);
    })
    .slice(0, 3);

  const skills = rankResources(source.skills, criteria)
    .sort((a, b) => {
      const aBoost = workflowSkillSlug === a.slug ? 1 : 0;
      const bBoost = workflowSkillSlug === b.slug ? 1 : 0;
      return bBoost - aBoost || scoreResource(b, criteria) - scoreResource(a, criteria);
    })
    .slice(0, 2);

  return { workflow, prompts, skills };
}

export function buildStaticIndex(source: Catalog = catalog): StaticIndexItem[] {
  const prompts = source.prompts.map((item) => ({
    type: item.type,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    href: item.href,
    tags: item.tags,
    searchText: [
      item.title,
      item.summary,
      item.roles.join(' '),
      item.tasks.join(' '),
      item.domains.join(' '),
      item.inputFormat.join(' '),
      item.outputFormat.join(' '),
      item.limitations.join(' '),
    ].join(' '),
  }));

  const workflows = source.workflows.map((item) => ({
    type: item.type,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    href: item.href,
    tags: item.tags,
    searchText: [
      item.title,
      item.summary,
      item.roles.join(' '),
      item.tasks.join(' '),
      item.domains.join(' '),
      item.steps.join(' '),
      item.outputArtifacts.join(' '),
    ].join(' '),
  }));

  const skills = source.skills.map((item) => ({
    type: item.type,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    href: item.href,
    tags: item.tags,
    searchText: [
      item.title,
      item.summary,
      item.roles.join(' '),
      item.tasks.join(' '),
      item.domains.join(' '),
      item.tools.join(' '),
      item.skillPreview,
    ].join(' '),
  }));

  return [...prompts, ...workflows, ...skills];
}

function rankResources<T extends PromptResource | WorkflowResource | SkillResource>(
  resources: T[],
  criteria: RecommendationCriteria,
): T[] {
  return resources
    .map((resource) => ({ resource, score: scoreResource(resource, criteria) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.resource.title.localeCompare(b.resource.title))
    .map((item) => item.resource);
}

function scoreResource(
  resource: PromptResource | WorkflowResource | SkillResource,
  criteria: RecommendationCriteria,
): number {
  let score = 0;

  score += matchValue(resource.roles, criteria.role) ? 5 : 0;
  score += matchValue(resource.tasks, criteria.task) ? 6 : 0;
  score += matchValue(resource.stages, criteria.stage) ? 3 : 0;
  score += matchValue(resource.domains, criteria.domain) ? 2 : 0;
  score += resource.domains.includes('General') || resource.domains.includes('通用') ? 1 : 0;
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
