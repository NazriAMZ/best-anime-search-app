import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchAnimeSearch } from "../../api/jikan";
import type { AnimeData } from "@/types/jikan";

type Status = "idle" | "loading" | "succeeded" | "failed";

interface SearchState {
  query: string;
  page: number;
  perPage: number;
  results: AnimeData[];
  totalPages: number;
  totalItems: number;
  status: Status;
  error?: string | null;
  lastRequestId?: string | null;
}

const initialState: SearchState = {
  query: "",
  page: 1,
  perPage: 24,
  results: [],
  totalPages: 0,
  totalItems: 0,
  status: "idle",
  error: null,
};

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async (
    { query, page, perPage }: { query: string; page: number; perPage: number },
    thunkAPI
  ) => {
    const signal = thunkAPI.signal as AbortSignal;
    const json = await fetchAnimeSearch(query, page, perPage, signal);
    return json;
  },
  {
    condition: ({ query }, { getState }) => {
      return true;
    },
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        const { data, pagination } = action.payload;
        state.results = data;
        state.totalPages = pagination.last_visible_page ?? 1;
        state.totalItems = pagination.items?.total ?? 0;
        state.status = "succeeded";
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load";
      });
  },
});

export const { setQuery, setPage } = searchSlice.actions;
export default searchSlice.reducer;
