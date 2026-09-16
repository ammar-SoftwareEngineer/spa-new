import { getTranslations } from "next-intl/server";

import Section from "@/components/ui/Section";

import MediaContentBlock from "@/components/about/MediaContentBlock";

import type { ApiSection } from "@/types/contentTypes";

type VisionSectionProps = {
  section?: ApiSection | null;
};

export default async function VisionSection({ section }: VisionSectionProps) {
  const t = await getTranslations("about");

  return (
    <Section variant="alt" className="overflow-x-clip py-24 md:py-32">
      <MediaContentBlock
        imageSrc={section?.image || "/img/proj-contracting.png"}
        imageAlt={section?.alt_image || t("vision.imageAlt")}
        eyebrow={section?.sub_title || t("vision.eyebrow")}
        title={section?.title || t("vision.title")}
        text={section?.text || t("vision.text")}
      />
    </Section>
  );
}
