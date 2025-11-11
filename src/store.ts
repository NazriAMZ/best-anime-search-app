import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/search/searchSlice";
import { animeApi } from "./api/animeApi";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
