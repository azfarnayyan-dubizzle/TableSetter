/**
 * Backends commonly wrap payloads in { data: ... } (Laravel resources) or
 * return the bare object. This normalises both shapes.
 */
export function unwrap<T>(payload: unknown): T {
  if (payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)) {
    const inner = (payload as { data: unknown }).data;
    if (inner !== undefined && inner !== null) return inner as T;
  }
  return payload as T;
}

export function unwrapList<T>(payload: unknown): T[] {
  const value = unwrap<unknown>(payload);
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === "object") {
    const nested = (value as { data?: unknown }).data;
    if (Array.isArray(nested)) return nested as T[];
  }
  return [];
}

export function toNumber(value: unknown, fallback = 0): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}
