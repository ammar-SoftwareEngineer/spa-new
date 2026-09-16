import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import HeaderSection from "@/components/ui/HeaderSection";
import { Button } from "@/components/ui/Button";
import ServiceCard from "@/components/services/ServiceCard";
import { pickSlug } from "@/lib/localized-slug";
import type { HomeSection, HomeService } from "@/types/homeTypes";

type ServicesProps = {
  section: HomeSection & { services?: HomeService[] };
};

export default async function Services({ section }: ServicesProps) {
  const t = await getTranslations("home.services");
  const locale = await getLocale();
  const isAr = locale === "ar";
  const services = section.services ?? [];

  return (
    <Section
      id="services"
      variant="alt"
      className="overflow-x-clip py-[80px] lg:py-[120px]"
      containerClassName="flex flex-col items-center"
    >
      <HeaderSection subtitle={section.sub_title} title={section.title} />

      <div className="grid w-full grid-cols-12 gap-6">
        {services.map((service, index) => {
          const slug = pickSlug(service.slug, locale);
          return (
            <ServiceCard
              key={service.id}
              slug={slug}
              image={service.image}
              title={service.title}
              description={service.short_text}
              cta={t("readMore")}
              index={index}
              delay={index * 0.08}
            />
          );
        })}
      </div>

      <Reveal delay={0.16} className="mt-12 md:mt-14">
        <Button href={section.button_link_url || "/services"} size="lg" rtl={isAr}>
          {section.button_text || t("viewAll")}
        </Button>
      </Reveal>
    </Section>
  );
}
