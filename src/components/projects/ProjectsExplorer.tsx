"use client";

import type { ReactNode } from "react";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { useProjectFilters } from "@/components/projects/useProjectFilters";
import type { ProjectFilterOption } from "@/components/projects/helpers";
import type { ProjectListItem } from "@/components/projects/types";

export type { ProjectListItem };

type ProjectsExplorerProps = {
  projects: ProjectListItem[];
  scopes: ProjectFilterOption[];
  sectors: ProjectFilterOption[];
  alwaysShowProjects?: boolean;
  initialScope?: string;
  idleContent?: ReactNode;
};

export default function ProjectsExplorer({
  projects,
  scopes,
  sectors,
  alwaysShowProjects = false,
  initialScope = "",
  idleContent,
}: ProjectsExplorerProps) {
  const filters = useProjectFilters(projects, initialScope);
  const showProjects = alwaysShowProjects || filters.isDirty;

  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
      <ProjectFilters
        scopes={scopes}
        sectors={sectors}
        filters={{
          ...filters,
          resultCount: filters.filtered.length,
          showResults: showProjects,
        }}
      />

      {!showProjects && idleContent}
      {showProjects && <ProjectGrid projects={filters.filtered} />}
    </div>
  );
}
