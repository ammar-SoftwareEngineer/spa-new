import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ServiceDetailView from "@/components/Services/ServiceDetailView";
import { toProjectListItems } from "@/components/Projects/helpers";
import {
  fetchServiceDetailsData,
  fetchServicesData,
} from "@/api/servicesService";
import { fetchProjectsData } from "@/api/projectsService";
import { getResponseData } from "@/lib/content";
import { pickSlug } from "@/lib/localized-slug";
import type { ApiProject, ApiService } from "@/types/contentTypes";

export async function generateStaticParams() {
  const services =
    getResponseData<ApiService[]>(await fetchServicesData("en")) ?? [];

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
  const service = getResponseData<ApiService>(
    await fetchServiceDetailsData(slug, locale),
  );

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

  const service = getResponseData<ApiService>(serviceResponse);
  if (!service) {
    notFound();
  }

  const projects = toProjectListItems(
    getResponseData<ApiProject[]>(projectsResponse) ?? [],
    locale,
  ).filter((project) => project.serviceSlugs.includes(slug));

  return (
    <ServiceDetailView service={service} projects={projects} locale={locale} />
  );
}
