import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import ContactMainSection from "@/components/contact/ContactMainSection";
import ContactMapSection from "@/components/contact/ContactMapSection";
import type { LayoutContact } from "@/types/layoutTypes";

type ContactPageViewProps = {
  contact?: LayoutContact | null;
};

export default async function ContactPageView({ contact }: ContactPageViewProps) {
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
