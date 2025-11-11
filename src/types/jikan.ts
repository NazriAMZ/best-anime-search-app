export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
    };
  };
  title: string;
  synopsis: string;
  episodes: number | null;
  score: number | null;
  rank: number | null;
  status: string;
  genres: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
}

export interface JikanSearchResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      per_page: number;
      total: number;
    };
  };
}

interface Genre {
  name: string;
}

interface ImageSet {
  image_url: string;
}

export interface AnimeData {
  mal_id: number;
  title: string;
  synopsis: string;
  episodes: number | null;
  score: number | null;
  rank: number | null;
  type: string | null;
  status: string | null;
  aired: { string: string } | null;
  genres: Genre[];
  themes: Genre[];
  images: {
    jpg: ImageSet;
  } | null;
}
