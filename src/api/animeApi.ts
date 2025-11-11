import type { AnimeData } from "@/types/jikan";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const JIKAN_BASE = "https://api.jikan.moe/v4";

interface SearchResponse {
  data: AnimeData[];
  pagination: {
    last_visible_page: number;
    items: { total: number };
  };
}

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4/" }),
  endpoints: (builder) => ({
    searchAnime: builder.query<
      SearchResponse,
      { query: string; page: number; perPage: number }
    >({
      query: ({ query, page, perPage }) =>
        `anime?q=${encodeURIComponent(query)}&page=${page}&limit=${perPage}`,
    }),
  }),
});

export const { useSearchAnimeQuery } = animeApi;
