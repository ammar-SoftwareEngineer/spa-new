import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import { Button } from "@/components/ui/Button";
import PartnersSwiper from "@/components/partners/PartnersSwiper";
import { stripHtml } from "@/lib/utils";
import type { HomePartner, HomeSection } from "@/types/homeTypes";

type PartnersProps = {
  section: HomeSection & { partners?: HomePartner[] };
};

export default async function Partners({ section }: PartnersProps) {
  const [t, locale] = await Promise.all([
    getTranslations("home.partners"),
    getLocale(),
  ]);
  const isRtl = locale === "ar";

  const partners = (section.partners ?? [])
    .filter((p) => Boolean(p.image))
    .map((p) => ({
      name: p.name || p.alt_image || "Partner",
      logo: p.image,
    }));

  return (
    <Section id="partners" variant="alt" className="overflow-x-clip py-[70px] md:py-[100px]">
      <HeaderSection
        subtitle={section.sub_title}
        title={section.title}
        description={stripHtml(section.text) || undefined}
        align="start"
        className="mb-12 md:mb-14"
        action={
          <Button href={section.button_link_url || "/partners"} className="shrink-0" rtl={isRtl}>
            {section.button_text || t("viewAll")}
          </Button>
        }
      />

      <Reveal>
        <PartnersSwiper partners={partners} />
      </Reveal>
    </Section>
  );
}
