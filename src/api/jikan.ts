export const JIKAN_BASE = "https://api.jikan.moe/v4";

export async function fetchAnimeSearch(
  q: string,
  page = 1,
  limit = 24,
  signal?: AbortSignal
) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  params.set("page", String(page));
  params.set("limit", String(limit));
  const url = `${JIKAN_BASE}/anime?${params.toString()}`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Jikan API error: ${res.status} ${text}`);
  }
  return res.json();
}

export async function fetchAnimeById(id: number, signal?: AbortSignal) {
  const url = `${JIKAN_BASE}/anime/${id}/full`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Failed to fetch anime ${id}`);
  return res.json();
}
