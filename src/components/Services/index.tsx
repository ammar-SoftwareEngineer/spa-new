import { getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import ServiceCard from "@/components/Services/ServiceCard";
import type { ServiceCardData } from "@/components/Services/helpers";

type ServicesPageViewProps = {
  services: ServiceCardData[];
};

export default async function ServicesPageView({ services }: ServicesPageViewProps) {
  const t = await getTranslations("services");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("services")}
      />

      <Section className="overflow-x-clip py-20 md:py-28">
        <div className="grid grid-cols-12 gap-6 md:gap-7">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug || index}
              slug={service.slug}
              image={service.image}
              title={service.title}
              description={service.description}
              cta={t("list.readMore")}
              index={index}
              delay={index * 0.08}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
