import { pickSlug } from "@/lib/localized-slug";
import type { HomeCategory, HomePartner, HomeSection } from "@/types/homeTypes";
import type { PartnerCardData } from "@/components/partners/helpers";

export type HomeCategoryCard = {
  title: string;
  description: string;
  badge: string;
  image: string;
  link: string;
  cta: string;
  index: number;
};

export function mapHomeCategoryCards(
  section: HomeSection & { categories?: HomeCategory[] },
  locale: string,
  cta: string,
): HomeCategoryCard[] {
  return (section.categories ?? []).map((category, index) => {
    const slug = pickSlug(category.slug, locale);

    return {
      title: category.name,
      description: category.short_text || "",
      badge: section.sub_title,
      image: category.image,
      link: slug ? `/projects/${slug}` : "/projects",
      cta,
      index,
    };
  });
}

export function mapHomePartners(partners: HomePartner[] | null | undefined): PartnerCardData[] {
  return (partners ?? [])
    .filter((partner) => Boolean(partner.image))
    .map((partner) => ({
      name: partner.name || partner.alt_image || "Partner",
      logo: partner.image,
    }));
}
