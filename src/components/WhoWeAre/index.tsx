import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import AboutSection from "@/components/WhoWeAre/AboutSection";
import CountersSection from "@/components/WhoWeAre/CountersSection";
import IsoSection from "@/components/WhoWeAre/IsoSection";
import MissionSection from "@/components/WhoWeAre/MissionSection";
import VisionSection from "@/components/WhoWeAre/VisionSection";
import WhatWeDoSection from "@/components/WhoWeAre/WhatWeDoSection";
import { fetchAboutData } from "@/api/aboutService";
import { isApiError } from "@/types/layoutTypes";
import type { AboutData, ApiSection } from "@/types/contentTypes";

function asValues(values: AboutData["values_section"]): ApiSection[] {
  if (!values) return [];
  return Array.isArray(values) ? values : [values];
}

export default async function WhoWeArePage() {
  const [t, tNav, locale] = await Promise.all([
    getTranslations("about"),
    getTranslations("nav"),
    getLocale(),
  ]);

  const aboutResponse = await fetchAboutData(locale);
  const about = isApiError(aboutResponse)
    ? null
    : (aboutResponse as { data: AboutData }).data ?? null;

  const values = asValues(about?.values_section);
  const mission = about?.mission_section || values[0] || null;
  const vision = about?.vision_section || values[1] || null;

  return (
    <>
      <PageHero
        eyebrow={about?.breadcrumb_section?.sub_title || t("hero.eyebrow")}
        title={about?.breadcrumb_section?.title || t("hero.title")}
        description={about?.breadcrumb_section?.text || t("hero.description")}
        currentLabel={tNav("whoWeAre")}
        imageSrc={about?.breadcrumb_section?.image}
      />
      <AboutSection section={about?.about_us_section} />
      <CountersSection
        statistics={about?.statistics_section || about?.statistics}
      />
      <MissionSection section={mission} />
      <VisionSection section={vision} />
      <WhatWeDoSection
        section={about?.what_we_do_section || about?.what_we_do}
      />
      <IsoSection
        certifications={about?.certifications_section || about?.certifications}
      />
    </>
  );
}
