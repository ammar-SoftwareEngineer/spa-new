import type {
  AboutData,
  ApiCertificate,
  ApiSection,
} from "@/types/contentTypes";
import { asArray } from "@/lib/content";

/** Resolve mission / vision from dedicated fields or values_section fallback. */
export function getMissionVision(about: AboutData | null) {
  const values = asArray(about?.values_section);
  return {
    mission: about?.mission_section || values[0] || null,
    vision: about?.vision_section || values[1] || null,
  };
}

export function getWhatWeDoItems(about: AboutData | null): ApiSection[] {
  if (about?.what_we_do_values?.length) return about.what_we_do_values;
  return asArray(about?.what_we_do);
}

export function getCertificationItems(
  about: AboutData | null,
): Array<ApiCertificate | ApiSection> {
  if (about?.certifications_values?.length) {
    return about.certifications_values;
  }
  return asArray(about?.certifications as ApiCertificate | ApiCertificate[] | null);
}

export function getStatisticsItems(about: AboutData | null): ApiSection[] {
  return asArray(about?.statistics_section || about?.statistics);
}
