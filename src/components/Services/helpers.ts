import type { ApiService } from "@/types/contentTypes";
import { pickSlug } from "@/lib/localized-slug";

export type ServiceCardData = {
  slug: string;
  image: string;
  title: string;
  description: string;
};

export function mapServiceCard(
  service: ApiService,
  locale: string,
  index = 0,
): ServiceCardData {
  return {
    slug: pickSlug(service.slug, locale) || `service-${index}`,
    image: service.image || "",
    title: service.title || service.name || "",
    description:
      service.short_text || service.description || service.text || "",
  };
}

export function mapServiceCards(services: ApiService[], locale: string) {
  return services.map((service, index) =>
    mapServiceCard(service, locale, index),
  );
}
