import type { ProjectListItem } from "@/components/projects/types";

export type ProjectCardProps = {
  project: ProjectListItem;
  title: string;
  description: string;
  location: string;
  tags?: string[];
  index?: number;
  delay?: number;
};

export type ProjectCardBodyProps = {
  href: string;
  image: string;
  title: string;
  description: string;
  location: string;
  tags: string[];
  year: string;
  number: string;
};
