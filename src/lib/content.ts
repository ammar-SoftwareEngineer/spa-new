/**
 * Shared content helpers (Fatin-style).
 * Keep section components dumb — normalize API shapes here / in feature helpers.
 */
import { isApiError } from "@/types/layoutTypes";

/** Normalize API field that may be a single object or an array. */
export function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

/** Unwrap `{ data }` from a successful API response, or null on error. */
export function getResponseData<T>(response: unknown): T | null {
  if (isApiError(response)) return null;
  if (!response || typeof response !== "object") return null;
  if (!("data" in response)) return null;
  return ((response as { data: T }).data ?? null) as T | null;
}
