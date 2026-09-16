import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import AboutSection from "@/components/WhoWeAre/AboutSection";
import CountersSection from "@/components/WhoWeAre/CountersSection";
import IsoSection from "@/components/WhoWeAre/IsoSection";
import MissionSection from "@/components/WhoWeAre/MissionSection";
import VisionSection from "@/components/WhoWeAre/VisionSection";
import WhatWeDoSection from "@/components/WhoWeAre/WhatWeDoSection";
import {
  getCertificationItems,
  getMissionVision,
  getStatisticsItems,
  getWhatWeDoItems,
} from "@/components/WhoWeAre/helpers";
import { stripHtml } from "@/lib/utils";
import type { AboutData } from "@/types/contentTypes";

type WhoWeArePageProps = {
  about: AboutData | null;
};

export default async function WhoWeArePage({ about }: WhoWeArePageProps) {
  const t = await getTranslations("about");
  const tNav = await getTranslations("nav");

  const { mission, vision } = getMissionVision(about);
  const breadcrumb = about?.breadcrumb_section;

  return (
    <>
      <PageHero
        title={breadcrumb?.title || t("hero.title")}
        description={stripHtml(breadcrumb?.text) || breadcrumb?.sub_title || t("hero.description")}
        currentLabel={tNav("whoWeAre")}
        imageSrc={breadcrumb?.image}
      />
      <AboutSection section={about?.about_us_section} />
      <CountersSection items={getStatisticsItems(about)} />
      <MissionSection section={mission} />
      <VisionSection section={vision} />
      <WhatWeDoSection section={about?.what_we_do_section} items={getWhatWeDoItems(about)} />
      <IsoSection section={about?.certifications_section} items={getCertificationItems(about)} />
    </>
  );
}
