import { isApiError } from "@/types/layoutTypes";

// API sometimes sends one item instead of a list
export function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

// read `data` from an API response, null if the request failed
export function getResponseData<T>(response: unknown): T | null {
  if (isApiError(response)) return null;
  if (!response || typeof response !== "object") return null;
  if (!("data" in response)) return null;

  const data = (response as { data: T }).data;
  return data ?? null;
}
