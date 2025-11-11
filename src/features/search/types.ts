import type { AnimeData } from "@/types/jikan";

export interface SearchResult {
  data: AnimeData[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    items: { count: number; total: number; per_page: number };
  };
}
