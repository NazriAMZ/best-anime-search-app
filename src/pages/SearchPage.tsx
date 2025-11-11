import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../store";
import { setQuery, setPage } from "../features/search/searchSlice";
import AnimeCard from "../components/anime-card";
import PaginationControls from "../components/pagination-control";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchAnimeQuery } from "@/api/animeApi";

export default function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { query, page, perPage } = useSelector((s: RootState) => s.search);
  const [localQuery, setLocalQuery] = useState(query);
  const debouncedQuery = useDebounce(localQuery, 250);
  const debouncedPage = useDebounce(page, 300);

  if (debouncedQuery !== query) dispatch(setQuery(debouncedQuery));

  const { data, isFetching, isError, isSuccess } = useSearchAnimeQuery({
    query,
    page: debouncedPage,
    perPage,
  });

  const results = data?.data ?? [];
  const totalPages = data?.pagination?.last_visible_page ?? 1;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">Anime Search</h1>

      <div className="flex justify-center">
        <Input
          placeholder="Search anime..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {isFetching && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="p-4 space-y-3">
              <Skeleton className="h-48 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </Card>
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center text-red-500">Failed to fetch results.</div>
      )}

      {isSuccess && results.length === 0 && (
        <div className="text-center text-gray-500">
          No results found. Try another query.
        </div>
      )}

      {isSuccess && results.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((a) => (
              <AnimeCard key={a.mal_id} anime={a} />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <PaginationControls
              current={page}
              total={totalPages || 1}
              onPage={(p) => dispatch(setPage(p))}
            />
          </div>
        </>
      )}
    </div>
  );
}
