import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServicesPageView from "@/components/services";
import { mapServiceCards } from "@/components/services/helpers";
import { fetchServicesData } from "@/api/servicesService";
import { getResponseData } from "@/lib/content";
import type { ApiService } from "@/types/contentTypes";

export const revalidate = 60;

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const res = await fetchServicesData(locale);
  const list = getResponseData<ApiService[]>(res) ?? [];
  const services = mapServiceCards(list, locale);

  return <ServicesPageView services={services} />;
}
