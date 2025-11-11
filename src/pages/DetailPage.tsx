import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAnimeById, fetchAnimeSearch } from "../api/jikan";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { AnimeData } from "@/types/jikan";
import { AnimeStats } from "@/components/anime-stats";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/useDebounce";

export default function DetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<AnimeData | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "failed" | "succeeded"
  >("idle");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<AnimeData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    setStatus("loading");
    fetchAnimeById(Number(id), controller.signal)
      .then((json) => {
        setData(json.data);
        setStatus("succeeded");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setStatus("failed");
      });
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      return;
    }

    if (debouncedSearchTerm.length < 3) {
      setSearchResults([]);
      setIsSearching(false);
      setShowResults(false);
      return;
    }

    const controller = new AbortController();
    setIsSearching(true);

    fetchAnimeSearch(debouncedSearchTerm, 1, 5, controller.signal)
      .then((json) => {
        setSearchResults(json.data.slice(0, 5));
        setIsSearching(false);
        setShowResults(true);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Search failed:", err);
        setSearchResults([]);
        setIsSearching(false);
      });

    return () => controller.abort();
  }, [debouncedSearchTerm]);

  if (status === "loading") {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
      </div>
    );
  }

  if (status === "failed")
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-red-500">
        Failed to load anime details.
      </div>
    );

  if (!data) return null;

  const {
    title,
    type,
    aired,
    images,
    synopsis,
    genres = [],
    themes = [],
  } = data;

  const categories = [...genres, ...themes].filter((item) => item && item.name);

  const releaseYear = aired?.string
    ? aired.string.split(" to ")[0].split(",")[0]
    : "Year N/A";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Button
            variant="outline"
            className="shadow-md hover:shadow-lg transition-shadow w-full md:w-auto"
            asChild
          >
            <Link to="/" className="flex items-center gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              Back to Search
            </Link>
          </Button>

          <Popover open={showResults} onOpenChange={setShowResults}>
            <PopoverTrigger asChild>
              <div className="relative max-w-md w-full">
                <Input
                  type="text"
                  placeholder="Search other anime..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm.length >= 3 && setShowResults(true)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-inner"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </PopoverTrigger>

            <PopoverContent
              className="w-full p-0 max-w-md z-50"
              align="center"
              onMouseDown={(e) => e.preventDefault()}
            >
              {isSearching ? (
                <div className="p-4 flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching for results...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="flex flex-col">
                  {searchResults.map((item) => (
                    <Link
                      key={item.mal_id}
                      to={`/anime/${item.mal_id}`}
                      className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors border-b last:border-b-0"
                    >
                      <img
                        src={item.images?.jpg?.image_url}
                        alt={item.title}
                        className="w-8 h-10 object-cover rounded-sm shrink-0"
                      />
                      <span className="text-sm font-medium truncate">
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-3 text-sm text-gray-500 text-center">
                  No matches found for "{debouncedSearchTerm}".
                </div>
              )}
            </PopoverContent>
          </Popover>
        </header>

        <Card className="shadow-2xl pb-0!">
          <div className="p-6 md:p-10 flex flex-col md:flex-row gap-10">
            <div className="md:w-1/3 shrink-0">
              <img
                src={images?.jpg?.image_url}
                alt={title}
                className="rounded-2xl w-full max-h-[600px] object-cover shadow-2xl border-4 border-gray-100 transition-transform duration-500 hover:scale-[1.03] transform origin-top"
              />
            </div>

            <div className="md:w-2/3 space-y-8">
              <header className="border-b pb-4">
                <CardTitle className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                  {title}
                </CardTitle>
                <p className="text-lg font-medium text-gray-500 mt-2">
                  {type} &bull; {releaseYear}
                </p>
              </header>

              <AnimeStats data={data} />

              <section>
                <h4 className="text-xl font-extrabold pb-2 border-b-2 border-blue-100 text-slate-800 mb-4">
                  Synopsis
                </h4>
                <p className="text-gray-700 leading-relaxed text-justify indent-8 ">
                  {synopsis ||
                    "Synopsis unavailable. The details for this anime are incomplete."}
                </p>
              </section>
            </div>
          </div>

          <CardContent className="border-t pt-6 pb-8 bg-gray-50 rounded-b-2xl">
            <h4 className="text-lg font-bold mb-3 text-slate-700">
              Tags & Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {categories.length > 0 ? (
                categories.map((item, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50 transition-colors shadow-sm"
                  >
                    {item.name}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No official genres or themes listed.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
