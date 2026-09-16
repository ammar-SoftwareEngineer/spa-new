import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import ContactMainSection from "@/components/ContactUs/ContactMainSection";
import ContactMapSection from "@/components/ContactUs/ContactMapSection";
import type { LayoutContact } from "@/types/layoutTypes";

type ContactUsPageProps = {
  contact?: LayoutContact | null;
};

export default async function ContactUsPage({ contact }: ContactUsPageProps) {
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("contact")}
      />
      <ContactMainSection contact={contact} />
      <ContactMapSection mapEmbed={contact?.map_embed} />
    </>
  );
}
