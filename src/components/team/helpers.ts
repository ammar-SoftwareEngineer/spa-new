import type { ApiTeamMember } from "@/types/contentTypes";

export type TeamMemberCardData = {
  id: number;
  name: string;
  role: string;
  image: string;
};

// Map API member fields into one simple card shape.
export function mapTeamMember(item: ApiTeamMember, index: number): TeamMemberCardData {
  return {
    id: item.id ?? index,
    name: item.name || "",
    role: item.job_title || item.role || item.position || item.title || "",
    image: item.image || item.photo || "",
  };
}

export function mapTeamMembers(items: ApiTeamMember[] | null | undefined) {
  return (items ?? []).map(mapTeamMember);
}
