import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ServiceDetailView from "@/components/services/ServiceDetailView";
import { getProjectsForService, mapServiceDetail } from "@/components/services/helpers";
import { fetchServiceDetailsData, fetchServicesData } from "@/api/servicesService";
import { fetchProjectsData } from "@/api/projectsService";
import { getResponseData } from "@/lib/content";
import { pickSlug } from "@/lib/localized-slug";
import type { ApiProject, ApiService } from "@/types/contentTypes";

export const revalidate = 60;

type ServicePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const res = await fetchServicesData("en");
  const services = getResponseData<ApiService[]>(res) ?? [];

  return services
    .map((service) => pickSlug(service.slug, "en"))
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const res = await fetchServiceDetailsData(slug, locale);
  const service = getResponseData<ApiService>(res);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const data = mapServiceDetail(service);

  return {
    title: `${data.title || "Service"} | S&PA`,
    description: data.description,
  };
}

export default async function ServiceDetailsPage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [serviceRes, projectsRes] = await Promise.all([
    fetchServiceDetailsData(slug, locale),
    fetchProjectsData(locale),
  ]);

  const service = getResponseData<ApiService>(serviceRes);
  if (!service) {
    notFound();
  }

  const allProjects = getResponseData<ApiProject[]>(projectsRes) ?? [];
  const projects = getProjectsForService(allProjects, locale, slug);

  return <ServiceDetailView service={service} projects={projects} locale={locale} />;
}
