import { isApiError } from "@/types/layoutTypes";

/** If the API sends one item or a list, always return a list. */
export function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

/** Read `data` from an API response. Returns null when the request failed. */
export function getResponseData<T>(response: unknown): T | null {
  if (isApiError(response)) return null;
  if (!response || typeof response !== "object") return null;
  if (!("data" in response)) return null;

  const data = (response as { data: T }).data;
  return data ?? null;
}
