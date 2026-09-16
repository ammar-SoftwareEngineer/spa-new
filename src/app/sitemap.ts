import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import { fetchProductsData } from "@/api/productsService";
import { fetchProjectsData } from "@/api/projectsService";
import { fetchServicesData } from "@/api/servicesService";
import { fetchCategoriesData } from "@/api/categoriesService";
import { getResponseData } from "@/lib/content";
import { pickSlug } from "@/lib/localized-slug";
import type { ApiCategory, ApiProduct, ApiProject, ApiService } from "@/types/contentTypes";

const staticPaths = [
  "",
  "/about",
  "/contact",
  "/partners",
  "/profile",
  "/products",
  "/projects",
  "/services",
  "/team",
];

async function collectSlugs(locale: string) {
  const [productsRes, projectsRes, servicesRes, categoriesRes] = await Promise.all([
    fetchProductsData(locale),
    fetchProjectsData(locale),
    fetchServicesData(locale),
    fetchCategoriesData(locale),
  ]);

  const products = getResponseData<ApiProduct[]>(productsRes) ?? [];
  const projects = getResponseData<ApiProject[]>(projectsRes) ?? [];
  const services = getResponseData<ApiService[]>(servicesRes) ?? [];
  const categories = getResponseData<ApiCategory[]>(categoriesRes) ?? [];

  return {
    productSlugs: products.map((item) => pickSlug(item.slug, locale)).filter(Boolean),
    projectSlugs: projects.map((item) => pickSlug(item.slug, locale)).filter(Boolean),
    serviceSlugs: services.map((item) => pickSlug(item.slug, locale)).filter(Boolean),
    categorySlugs: categories.map((item) => pickSlug(item.slug, locale)).filter(Boolean),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const { productSlugs, projectSlugs, serviceSlugs, categorySlugs } = await collectSlugs(locale);

    const dynamicPaths = [
      ...productSlugs.map((slug) => `/products/${slug}`),
      ...projectSlugs.map((slug) => `/projects/${slug}`),
      ...serviceSlugs.map((slug) => `/services/${slug}`),
      ...categorySlugs.map((slug) => `/projects/${slug}`),
    ];

    const allPaths = [...staticPaths, ...dynamicPaths];

    for (const path of allPaths) {
      const url = `${base}/${locale}${path}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, `${base}/${loc}${path}`]),
          ),
        },
      });
    }
  }

  return entries;
}
