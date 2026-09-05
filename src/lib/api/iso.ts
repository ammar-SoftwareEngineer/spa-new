/**
 * ISO certificates API.
 *
 * Remote: GET /iso  → IsoCertificate[]
 * Local:  lib/data/iso.json
 */
import isoData from "@/lib/data/iso.json";
import { apiGet, hasRemoteApi } from "@/lib/api/client";
import type { IsoCertificate } from "@/types";

export type { IsoCertificate };

export async function getIsoCertificates(): Promise<IsoCertificate[]> {
  if (hasRemoteApi()) {
    return apiGet<IsoCertificate[]>("/iso");
  }
  return isoData as IsoCertificate[];
}
