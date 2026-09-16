import type { LocalizedSlug } from "@/lib/localized-slug";

export type HomeStat = {
  id: number;
  title: string;
  sub_title: string;
  text?: string;
  image?: string;
  alt_image?: string | null;
  order?: number;
  is_active?: number | boolean;
  button_text?: string;
  button_link_url?: string | null;
};

export type HomeSection = {
  id: number;
  title: string;
  sub_title: string;
  text?: string;
  image?: string;
  alt_image?: string | null;
  order?: number;
  is_active?: number | boolean;
  button_text?: string;
  button_link_url?: string | null;
};

export type HomeService = {
  id: number;
  title: string;
  short_text: string;
  text?: string;
  image: string;
  order?: number;
  is_active?: boolean;
  slug: LocalizedSlug;
};

export type HomeCategory = {
  id: number;
  name: string;
  short_text?: string;
  text?: string;
  image: string;
  alt_image?: string | null;
  order?: number;
  is_active?: boolean;
  slug: LocalizedSlug;
};

export type HomePartner = {
  id: number;
  name?: string;
  url?: string | null;
  image: string;
  alt_image?: string;
  order?: number;
};

export type HomeBlog = {
  id: number;
  title?: string;
  excerpt?: string;
  short_text?: string;
  image?: string;
  slug?: LocalizedSlug;
  href?: string;
  published_at?: string;
  date?: string;
  category?: string;
  read_time?: string;
};

export type HomeData = {
  hero: HomeSection[];
  about_us: HomeSection & { statistics?: HomeStat[] };
  services_section: HomeSection & { services?: HomeService[] };
  our_philosophy_section: HomeSection & { values?: HomeStat[] };
  our_team_section: HomeSection;
  categories_section: HomeSection & { categories?: HomeCategory[] };
  partners_section: HomeSection & { partners?: HomePartner[] };
  blogs_section: HomeSection & { blogs?: HomeBlog[] };
};

export type HomeApiResponse = {
  data: HomeData;
};
