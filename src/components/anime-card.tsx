import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import type { AnimeData } from "@/types/jikan";

export default function AnimeCard({ anime }: { anime: AnimeData }) {
  const img = anime.images?.jpg?.image_url;

  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className="no-underline text-foreground"
    >
      <Card className="transition-all hover:shadow-lg hover:scale-[1.02] h-full rounded-2xl overflow-hidden">
        <CardHeader className="p-0">
          <AspectRatio ratio={3 / 4}>
            {img ? (
              <img
                src={img}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                No image
              </div>
            )}
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold mb-2 line-clamp-1">
            {anime.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {anime.synopsis || "No synopsis available."}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
