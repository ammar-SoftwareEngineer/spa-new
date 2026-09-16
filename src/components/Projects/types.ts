// Project with ready-to-show text (already translated on the server).
export type ProjectListItem = {
  slug: string;
  title: string;
  description: string;
  location: string;
  image: string;
  categorySlugs: string[];
  serviceSlugs: string[];
  sectorSlugs: string[];
  date: string;
  featured?: boolean;
  categoryLabels: string[];
  sectorLabels: string[];
  gallery: string[];
  videoUrl?: string;
  client?: string;
  consultant?: string;
  status?: string;
  overviewTitle?: string;
  overviewBody?: string;
  scopeTitle?: string;
  scopeBody?: string;
};

export type SortOption = "recommended" | "newest" | "oldest" | "name-asc" | "name-desc";
