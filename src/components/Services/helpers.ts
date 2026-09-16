import type { ApiProject, ApiService } from "@/types/contentTypes";
import { pickSlug } from "@/lib/localized-slug";
import { toProjectListItems } from "@/components/Projects/helpers";
import type { ProjectListItem } from "@/components/Projects/types";

export type ServiceCardData = {
  slug: string;
  image: string;
  title: string;
  description: string;
};

export type ServiceDetailData = {
  title: string;
  description: string;
  detail: string;
  image: string;
  features: string[];
};

export function mapServiceCard(service: ApiService, locale: string, index = 0): ServiceCardData {
  return {
    slug: pickSlug(service.slug, locale) || `service-${index}`,
    image: service.image || "",
    title: service.title || service.name || "",
    description: service.short_text || service.description || service.text || "",
  };
}

export function mapServiceCards(services: ApiService[], locale: string) {
  return services.map((service, index) => mapServiceCard(service, locale, index));
}

export function mapServiceDetail(service: ApiService): ServiceDetailData {
  const title = service.title || service.name || "";
  const description = service.short_text || service.description || "";

  return {
    title,
    description,
    detail: service.text || description,
    image: service.image || "/img/pattern.png",
    features: (service.features ?? [])
      .map((feature) =>
        typeof feature === "string" ? feature : feature.title || feature.text || "",
      )
      .filter(Boolean),
  };
}

// Projects linked to a service slug.
export function getProjectsForService(
  projects: ApiProject[],
  locale: string,
  serviceSlug: string,
): ProjectListItem[] {
  return toProjectListItems(projects, locale).filter((project) =>
    project.serviceSlugs.includes(serviceSlug),
  );
}
