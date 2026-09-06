/**
 * Loose API content shapes used across spa-new pages.
 * Fields are optional where backends vary between environments.
 */
import type { LocalizedSlug } from "@/lib/localized-slug";

export type ApiSection = {
  id?: number;
  title?: string;
  sub_title?: string;
  text?: string;
  image?: string;
  alt_image?: string | null;
  button_text?: string;
  button_link_url?: string;
  statistics?: { id?: number; title?: string; sub_title?: string; value?: number | string }[];
  benefits?: {
    id?: number;
    title?: string;
    sub_title?: string;
    image?: string;
    icon?: string;
  }[];
};

export type ApiService = {
  id?: number;
  title?: string;
  name?: string;
  short_text?: string;
  text?: string;
  description?: string;
  image?: string;
  icon?: string;
  slug: LocalizedSlug | string;
  features?: Array<string | { title?: string; text?: string }>;
};

export type ApiProject = {
  id?: number;
  title?: string;
  name?: string;
  short_text?: string;
  text?: string;
  description?: string;
  image?: string;
  main_image?: string;
  slug: LocalizedSlug | string;
  location?: string;
  date?: string;
  client?: string;
  consultant?: string;
  status?: string;
  featured?: boolean;
  video_url?: string;
  videoUrl?: string;
  gallery?: Array<string | { url?: string; image?: string }>;
  overview_title?: string;
  overview_body?: string;
  scope_title?: string;
  scope_body?: string;
  categories?: Array<{
    slug?: LocalizedSlug | string;
    name?: string;
    title?: string;
  }>;
  category_slugs?: string[];
  sector_slugs?: string[];
  services?: Array<{ slug?: LocalizedSlug | string }>;
};

export type ApiProduct = {
  id?: number;
  title?: string;
  name?: string;
  short_text?: string;
  short_description?: string;
  description?: string;
  text?: string;
  image?: string;
  main_image?: string;
  icon?: string;
  website?: string;
  slug: LocalizedSlug | string;
  features?: Array<string | { title?: string; text?: string }>;
  featureKeys?: string[];
  lines?: Array<{
    title?: string;
    titleKey?: string;
    descKey?: string;
    description?: string;
    text?: string;
    image?: string;
  }>;
  images?: Array<{ id?: number; url?: string }>;
};

export type ApiCategory = {
  id?: number;
  title?: string;
  name?: string;
  short_text?: string;
  text?: string;
  description?: string;
  image?: string;
  slug: LocalizedSlug | string;
  link?: string;
  badge?: string;
};

export type ApiPartner = {
  id?: number;
  name?: string;
  title?: string;
  image?: string;
  logo?: string;
};

export type ApiBlog = {
  id?: number;
  title?: string;
  excerpt?: string;
  short_text?: string;
  image?: string;
  slug?: LocalizedSlug | string;
  href?: string;
  published_at?: string;
  date?: string;
  category?: string;
  read_time?: string;
};

export type ApiTeamMember = {
  id?: number;
  name?: string;
  role?: string;
  position?: string;
  title?: string;
  image?: string;
  photo?: string;
  is_board?: boolean;
  type?: string;
};

export type ApiCertificate = {
  id?: number;
  title?: string;
  code?: string;
  name?: string;
  image?: string;
  sub_title?: string;
};

export type HomeData = {
  hero?: ApiSection[] | ApiSection;
  about_us?: ApiSection;
  services_section?: ApiSection & { services?: ApiService[] };
  our_philosophy_section?: ApiSection;
  our_team_section?: ApiSection;
  categories_section?: ApiSection & { categories?: ApiCategory[] };
  partners_section?: ApiSection & { partners?: ApiPartner[] };
  blogs_section?: ApiSection & { blogs?: ApiBlog[] };
};

export type AboutData = {
  about_us_section?: ApiSection | null;
  about_images?: { id?: number; url?: string }[];
  breadcrumb_section?: ApiSection;
  statistics?: ApiSection[] | ApiSection;
  statistics_section?: ApiSection[] | ApiSection;
  values_section?: ApiSection[] | ApiSection;
  what_we_do?: ApiSection[] | ApiSection;
  what_we_do_section?: ApiSection[] | ApiSection;
  certifications?: ApiCertificate[] | ApiSection;
  certifications_section?: ApiCertificate[] | ApiSection;
  mission_section?: ApiSection;
  vision_section?: ApiSection;
};
