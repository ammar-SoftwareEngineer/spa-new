import { pickSlug } from "@/lib/localized-slug";
import type { ApiProject } from "@/types/contentTypes";
import type { ProjectListItem } from "@/components/Projects/types";

/** Map an API project into a list/detail-ready ProjectListItem. */
export function toProjectListItem(
  project: ApiProject,
  locale: string,
  index = 0,
): ProjectListItem {
  const slug = pickSlug(project.slug, locale) || `project-${index}`;
  const categorySlugs =
    project.category_slugs ??
    (project.categories ?? [])
      .map((cat) => pickSlug(cat.slug, locale))
      .filter(Boolean);

  const categoryLabels = (project.categories ?? [])
    .map((cat) => cat.title || cat.name || "")
    .filter(Boolean);

  const gallery = (project.gallery ?? [])
    .map((entry) =>
      typeof entry === "string" ? entry : entry.url || entry.image || "",
    )
    .filter(Boolean);

  return {
    slug,
    title: project.title || project.name || "",
    description:
      project.short_text || project.description || project.text || "",
    location: project.location || "",
    image: project.image || project.main_image || "",
    categorySlugs,
    serviceSlugs: (project.services ?? [])
      .map((svc) => pickSlug(svc.slug, locale))
      .filter(Boolean),
    sectorSlugs: project.sector_slugs ?? [],
    date: project.date || "",
    featured: Boolean(project.featured),
    categoryLabels,
    sectorLabels: [],
    gallery,
    videoUrl: project.video_url || project.videoUrl,
    client: project.client,
    consultant: project.consultant,
    status: project.status,
    overviewTitle: project.overview_title,
    overviewBody: project.overview_body,
    scopeTitle: project.scope_title,
    scopeBody: project.scope_body,
  };
}

export function toProjectListItems(
  projects: ApiProject[],
  locale: string,
): ProjectListItem[] {
  return projects.map((project, index) =>
    toProjectListItem(project, locale, index),
  );
}
