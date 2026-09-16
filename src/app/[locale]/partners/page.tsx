import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PartnersPageView from "@/components/partners";
import { mapPartners } from "@/components/partners/helpers";
import { fetchPartnersData } from "@/api/partnersService";
import { getResponseData } from "@/lib/content";
import type { ApiPartner } from "@/types/contentTypes";

export const revalidate = 60;

type PartnersPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PartnersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function PartnersPage({ params }: PartnersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const res = await fetchPartnersData(locale);
  const list = getResponseData<ApiPartner[]>(res);
  const partners = mapPartners(list);

  return <PartnersPageView partners={partners} />;
}
