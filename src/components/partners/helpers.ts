import type { ApiPartner } from "@/types/contentTypes";

export type PartnerCardData = {
  name: string;
  logo: string;
};

/** Keep only partners that have a logo we can show. */
export function mapPartners(
  items: ApiPartner[] | null | undefined,
): PartnerCardData[] {
  return (items ?? [])
    .map((partner) => ({
      name: partner.name || partner.title || "Partner",
      logo: partner.image || partner.logo || "",
    }))
    .filter((partner) => Boolean(partner.logo));
}
