import { getTranslations } from "next-intl/server";

import Section from "@/components/ui/Section";

import MediaContentBlock from "@/components/WhoWeAre/MediaContentBlock";

import type { ApiSection } from "@/types/contentTypes";

type MissionSectionProps = {
  section?: ApiSection | null;
};

export default async function MissionSection({ section }: MissionSectionProps) {
  const t = await getTranslations("about");

  return (
    <Section className="overflow-x-clip py-24 md:py-32">
      <MediaContentBlock
        imageSrc={section?.image || "/img/about/mission.jpg"}
        imageAlt={section?.alt_image || t("mission.imageAlt")}
        eyebrow={section?.sub_title || t("mission.eyebrow")}
        title={section?.title || t("mission.title")}
        text={section?.text || t("mission.text")}
        reverse
      />
    </Section>
  );
}
