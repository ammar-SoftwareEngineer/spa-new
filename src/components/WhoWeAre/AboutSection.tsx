import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import MediaContentBlock from "@/components/WhoWeAre/MediaContentBlock";
import type { ApiSection } from "@/types/contentTypes";

type AboutSectionProps = {
  section?: ApiSection | null;
};

export default async function AboutSection({ section }: AboutSectionProps) {
  const t = await getTranslations("about");

  return (
    <Section className="overflow-x-clip py-24 md:py-32">
      <MediaContentBlock
        imageSrc={section?.image || "/img/who-we-are.png"}
        imageAlt={section?.alt_image || t("about.imageAlt")}
        eyebrow={section?.sub_title || t("about.eyebrow")}
        title={section?.title || t("about.title")}
        text={section?.text || t("about.text")}
      />
    </Section>
  );
}
