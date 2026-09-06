import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ServiceDetailView from "@/components/Services/ServiceDetailView";
import { toProjectListItems } from "@/components/Projects/toListItem";
import {
  fetchServiceDetailsData,
  fetchServicesData,
} from "@/api/servicesService";
import { fetchProjectsData } from "@/api/projectsService";
import { isApiError } from "@/types/layoutTypes";
import { pickSlug } from "@/lib/localized-slug";
import type { ApiProject, ApiService } from "@/types/contentTypes";

export async function generateStaticParams() {
  const response = await fetchServicesData("en");
  const services = isApiError(response)
    ? []
    : ((response as { data: ApiService[] }).data ?? []);

  return services
    .map((service) => pickSlug(service.slug, "en"))
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const response = await fetchServiceDetailsData(slug, locale);
  const service = isApiError(response)
    ? null
    : (response as { data: ApiService }).data ?? null;

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title || service.name || "Service"} | S&PA`,
    description: service.short_text || service.description || "",
  };
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [serviceResponse, projectsResponse] = await Promise.all([
    fetchServiceDetailsData(slug, locale),
    fetchProjectsData(locale),
  ]);

  const service = isApiError(serviceResponse)
    ? null
    : (serviceResponse as { data: ApiService }).data ?? null;

  if (!service) {
    notFound();
  }

  const projects = isApiError(projectsResponse)
    ? []
    : toProjectListItems(
        (projectsResponse as { data: ApiProject[] }).data ?? [],
        locale,
      ).filter((project) => project.serviceSlugs.includes(slug));

  return (
    <ServiceDetailView service={service} projects={projects} locale={locale} />
  );
}
