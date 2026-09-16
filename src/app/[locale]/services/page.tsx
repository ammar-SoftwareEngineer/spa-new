import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServicesPageView from "@/components/Services";
import { mapServiceCards } from "@/components/Services/helpers";
import { fetchServicesData } from "@/api/servicesService";
import { getResponseData } from "@/lib/content";
import type { ApiService } from "@/types/contentTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const services = mapServiceCards(
    getResponseData<ApiService[]>(await fetchServicesData(locale)) ?? [],
    locale,
  );

  return <ServicesPageView services={services} />;
}
