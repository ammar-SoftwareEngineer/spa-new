import type { CategoryCardData } from "@/components/categories/CategoryCards";
import type { ProjectListItem, ProjectScopePhase } from "@/components/projects/types";
import { matchesLocalizedSlug, pickSlug } from "@/lib/localized-slug";
import { toPlainText } from "@/lib/utils";
import type { ApiCategory, ApiProject, ApiScope, ApiSector } from "@/types/contentTypes";

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

function projectPhases(project: ApiProject, gallery: string[] = []): ProjectScopePhase[] {
  const images = gallery ?? [];
  const fallbackImage = filled(project.scope_section?.image) || filled(project.image) || filled(project.main_image);

  return [...(project.scope_section?.phases ?? [])]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((phase, index) => ({
      id: phase.id != null ? String(phase.id) : `phase-${index}`,
      title: filled(phase.title),
      subtitle: filled(phase.subtitle),
      content: filled(phase.content),
      image: filled(phase.image) || images[index] || fallbackImage,
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
    scopePhases: projectPhases(project, gallery),
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

// Categories shown as big cards on the projects page.
export function mapCategoryCards(
  categories: ApiCategory[],
  locale: string,
  cta: string,
): CategoryCardData[] {
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

function projectKey(project: ApiProject, locale: string) {
  if (project.id != null) return `id:${project.id}`;
  const slug = pickSlug(project.slug, locale);
  return slug ? `slug:${slug}` : "";
}

function projectBelongsToCategory(
  project: ApiProject,
  category: ApiCategory,
  slug: string,
): boolean {
  if (category.id != null) {
    if (project.category?.id === category.id) return true;
    if (project.categories?.some((item) => item.id === category.id)) return true;
  }

  if (matchesLocalizedSlug(project.category?.slug, slug)) return true;
  if (project.categories?.some((item) => matchesLocalizedSlug(item.slug, slug))) return true;

  const categorySlug = pickSlug(category.slug, "en") || slug;
  return Boolean(
    project.category_slugs?.includes(slug) || project.category_slugs?.includes(categorySlug),
  );
}

/** Projects for a category: nested API list + full list matches, preferring richer records. */
export function getProjectsForCategory(
  category: ApiCategory,
  allProjects: ApiProject[],
  slug: string,
  locale: string,
): ApiProject[] {
  const byKey = new Map<string, ApiProject>();
  const categoryRef = {
    id: category.id,
    slug: category.slug,
    name: category.name || category.title,
    title: category.title || category.name,
  };

  for (const project of category.projects ?? []) {
    const key = projectKey(project, locale);
    if (key) byKey.set(key, project);
  }

  for (const project of allProjects) {
    const key = projectKey(project, locale);
    if (!key) continue;

    const nestedMatch = byKey.has(key);
    if (!nestedMatch && !projectBelongsToCategory(project, category, slug)) continue;

    const existing = byKey.get(key);
    byKey.set(key, existing ? { ...existing, ...project } : project);
  }

  return Array.from(byKey.values()).map((project) => ({
    ...project,
    category: project.category ?? categoryRef,
  }));
}
