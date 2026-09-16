import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactPageView from "@/components/contact";
import { fetchLayoutData } from "@/api/layoutService";
import { getResponseData } from "@/lib/content";
import type { LayoutData } from "@/types/layoutTypes";

export const revalidate = 60;

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const res = await fetchLayoutData(locale);
  const layout = getResponseData<LayoutData>(res);

  return <ContactPageView contact={layout?.contact ?? null} />;
}
