import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import AboutSection from "@/components/about/AboutSection";
import CountersSection from "@/components/about/CountersSection";
import IsoSection from "@/components/about/IsoSection";
import MissionSection from "@/components/about/MissionSection";
import VisionSection from "@/components/about/VisionSection";
import WhatWeDoSection from "@/components/about/WhatWeDoSection";
import {
  getCertificationItems,
  getMissionVision,
  getStatisticsItems,
  getWhatWeDoItems,
} from "@/components/about/helpers";
import { stripHtml } from "@/lib/utils";
import type { AboutData } from "@/types/contentTypes";

type AboutPageViewProps = {
  about: AboutData | null;
};

export default async function AboutPageView({ about }: AboutPageViewProps) {
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
