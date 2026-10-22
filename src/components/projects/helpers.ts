import { pickSlug } from "@/lib/localized-slug";
import { toPlainText } from "@/lib/utils";
import type { ApiCategory, ApiProject, ApiScope, ApiSector } from "@/types/contentTypes";
import type { ProjectListItem, ProjectScopePhase } from "@/components/projects/types";

function filled(value?: string | null) {
  return value?.trim() || "";
}

function projectGallery(project: ApiProject) {
  const fromImages = (project.images ?? []).map((image) => filled(image.url));
  const fromGallery = (project.gallery ?? []).map((entry) =>
    filled(typeof entry === "string" ? entry : entry.url || entry.image),
  );

  return [...fromImages, ...fromGallery].filter(Boolean);
}

function projectPhases(project: ApiProject): ProjectScopePhase[] {
  return [...(project.scope_section?.phases ?? [])]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((phase, index) => ({
      id: phase.id != null ? String(phase.id) : `phase-${index}`,
      title: filled(phase.title),
      subtitle: filled(phase.subtitle),
      content: filled(phase.content),
    }))
    .filter((phase) => phase.title || phase.subtitle || phase.content);
}

// Turn one API project into a ready-to-render list/detail item.
export function toProjectListItem(project: ApiProject, locale: string, index = 0): ProjectListItem {
  const slug = pickSlug(project.slug, locale) || `project-${index}`;

  const categorySources = project.categories?.length
    ? project.categories
    : project.category
      ? [project.category]
      : [];

  const categorySlugs =
    project.category_slugs ??
    categorySources.map((cat) => pickSlug(cat.slug, locale)).filter(Boolean);

  const categoryLabels = categorySources
    .map((cat) => cat.title || cat.name || "")
    .filter(Boolean);

  const scopeLabels = (project.scopes ?? [])
    .map((scope) => scope.name?.trim() || "")
    .filter(Boolean);

  const gallery = projectGallery(project);
  const videoUrl =
    filled(project.youtube_url) || filled(project.video) || filled(project.video_url) || filled(project.videoUrl);

  return {
    slug,
    title: project.title || project.name || "",
    description: toPlainText(project.short_text || project.description || project.text),
    location: project.location || "",
    image: project.image || project.main_image || "",
    categorySlugs,
    serviceSlugs: (project.services ?? []).map((svc) => pickSlug(svc.slug, locale)).filter(Boolean),
    sectorSlugs: project.sector_slugs ?? [],
    sectorId: project.sector?.id != null ? String(project.sector.id) : "",
    scopeIds: (project.scopes ?? [])
      .map((scope) => (scope.id != null ? String(scope.id) : ""))
      .filter(Boolean),
    date: project.date || (project.year != null ? String(project.year) : ""),
    featured: Boolean(project.featured),
    categoryLabels,
    sectorLabels: project.sector?.name ? [project.sector.name] : [],
    scopeLabels,
    client: project.client,
    consultant: project.consultant,
    status: project.status,
    overviewTitle: filled(project.overview_title) || toPlainText(project.short_text),
    overviewBody: filled(project.overview_body) || filled(project.text),
    scopeTitle: filled(project.scope_section?.title) || filled(project.scope_title),
    scopeBody: filled(project.scope_section?.text) || filled(project.scope_body),
    scopeImage: filled(project.scope_section?.image),
    scopePhases: projectPhases(project),
    gallery,
    videoUrl: videoUrl || undefined,
  };
}

export function toProjectListItems(projects: ApiProject[], locale: string): ProjectListItem[] {
  return projects.map((project, index) => toProjectListItem(project, locale, index));
}

export type ProjectFilterOption = {
  id: string;
  name: string;
};

export function mapFilterOptions(items: Array<ApiSector | ApiScope>): ProjectFilterOption[] {
  return [...items]
    .filter((item) => item.id != null && item.name?.trim())
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => ({
      id: String(item.id),
      name: item.name!.trim(),
    }));
}

export type ProjectFilterCategory = {
  slug: string;
  title: string;
  image?: string;
  link?: string;
};

export type ProjectCategoryCard = {
  title: string;
  description: string;
  badge: string;
  image: string;
  link: string;
  cta: string;
  index: number;
};

// Categories used by the filter bar.
export function mapFilterCategories(
  categories: ApiCategory[],
  locale: string,
): ProjectFilterCategory[] {
  return categories.map((category, index) => {
    const slug = pickSlug(category.slug, locale) || `category-${index}`;

    return {
      slug,
      title: category.title || category.name || "",
      image: category.image || "",
      link: category.link || `/projects/${slug}`,
    };
  });
}

// Categories shown as big cards on the projects page.
export function mapCategoryCards(
  categories: ApiCategory[],
  locale: string,
  cta: string,
): ProjectCategoryCard[] {
  return categories.map((category, index) => {
    const slug = pickSlug(category.slug, locale);

    return {
      title: category.title || category.name || "",
      description: category.short_text || category.description || category.text || "",
      badge: category.badge || "",
      image: category.image || "",
      link: category.link || (slug ? `/projects/${slug}` : "/projects"),
      cta,
      index,
    };
  });
}
