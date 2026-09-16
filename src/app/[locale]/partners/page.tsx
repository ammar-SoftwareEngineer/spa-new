import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PartnersPageView from "@/components/partners";
import { mapPartners } from "@/components/partners/helpers";
import { fetchPartnersData } from "@/api/partnersService";
import { getResponseData } from "@/lib/content";
import type { ApiPartner } from "@/types/contentTypes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const partners = mapPartners(
    getResponseData<ApiPartner[]>(await fetchPartnersData(locale)),
  );

  return <PartnersPageView partners={partners} />;
}
