import { pickSlug } from "@/lib/localized-slug";
import type { ApiCategory } from "@/types/contentTypes";
import {
  toProjectListItem,
  toProjectListItems,
} from "@/components/Projects/toListItem";

export { toProjectListItem, toProjectListItems };

export type ProjectFilterCategory = {
  slug: string;
  title: string;
  image?: string;
  link?: string;
};

export type ProjectCategoryCard = {
  title: string;
  description: string;
  badge: string;
  image: string;
  link: string;
  cta: string;
  index: number;
};

export function mapFilterCategories(
  categories: ApiCategory[],
  locale: string,
): ProjectFilterCategory[] {
  return categories.map((category, index) => {
    const slug = pickSlug(category.slug, locale) || `category-${index}`;
    return {
      slug,
      title: category.title || category.name || "",
      image: category.image || "",
      link: category.link || `/projects/${slug}`,
    };
  });
}

export function mapCategoryCards(
  categories: ApiCategory[],
  locale: string,
  cta: string,
): ProjectCategoryCard[] {
  return categories.map((category, index) => {
    const slug = pickSlug(category.slug, locale);
    return {
      title: category.title || category.name || "",
      description:
        category.short_text || category.description || category.text || "",
      badge: category.badge || "",
      image: category.image || "",
      link: category.link || (slug ? `/projects/${slug}` : "/projects"),
      cta,
      index,
    };
  });
}
