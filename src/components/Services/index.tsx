import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import ServiceCard from "@/components/Services/ServiceCard";
import { fetchServicesData } from "@/api/servicesService";
import { isApiError } from "@/types/layoutTypes";
import { pickSlug } from "@/lib/localized-slug";
import type { ApiService } from "@/types/contentTypes";

export default async function ServicesPageView() {
  const [t, tNav, locale] = await Promise.all([
    getTranslations("services"),
    getTranslations("nav"),
    getLocale(),
  ]);

  const response = await fetchServicesData(locale);
  const services = isApiError(response)
    ? []
    : ((response as { data: ApiService[] }).data ?? []);

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        currentLabel={tNav("services")}
      />

      <Section className="overflow-x-clip py-20 md:py-28">
        <div className="grid grid-cols-12 gap-6 md:gap-7">
          {services.map((service, index) => {
            const slug = pickSlug(service.slug, locale);
            return (
              <ServiceCard
                key={slug || index}
                slug={slug}
                image={service.image || ""}
                title={service.title || service.name || ""}
                description={
                  service.short_text || service.description || service.text || ""
                }
                cta={t("list.readMore")}
                index={index}
                delay={index * 0.08}
              />
            );
          })}
        </div>
      </Section>
    </>
  );
}
