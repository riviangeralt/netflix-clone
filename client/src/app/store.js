import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../slices/login";
import profileSlice from "../slices/profile";
import movieSlice from "../slices/movie";
import listSlice from "../slices/list";
import tvShowSlice from "../slices/tvshows";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  movie: movieSlice,
  list: listSlice,
  tvShow: tvShowSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
