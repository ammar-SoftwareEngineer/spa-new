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
  sectorId: string;
  scopeIds: string[];
  date: string;
  featured?: boolean;
  categoryLabels: string[];
  sectorLabels: string[];
  scopeLabels: string[];
  gallery: string[];
  videoUrl?: string;
  client?: string;
  consultant?: string;
  status?: string;
  overviewTitle?: string;
  overviewBody?: string;
  scopeTitle?: string;
  scopeBody?: string;
  scopeImage?: string;
  scopePhases: ProjectScopePhase[];
};

export type ProjectScopePhase = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
};

export type SortOption = "recommended" | "newest" | "oldest" | "name-asc" | "name-desc";
