import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../api/movieApi";

const initialState = {
  movies: [],
  isLoading: false,
  error: null,
  individualMovie: {},
  collection: {},
};

export const getMovies = createAsyncThunk("getMovies", async () => {
  const response = await movieApi.get(
    "/discover/movie?api_key=4622bea788550ade8391ab66ed1e6dcc"
  );
  return response.data;
});

export const getIndividualMovie = createAsyncThunk(
  "getIndividualMovie",
  async (id) => {
    const response = await movieApi.get(
      `/movie/${id}?api_key=4622bea788550ade8391ab66ed1e6dcc`
    );
    return response.data;
  }
);

export const getMovieCollection = createAsyncThunk(
  "getMovieCollection",
  async (collectionId) => {
    const response = await movieApi.get(
      `/collection/${collectionId}?api_key=4622bea788550ade8391ab66ed1e6dcc`
    );
    return response.data;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearSelectedMovie: (state) => {
      state.individualMovie = {};
    },
  },
  extraReducers: {
    [getMovies.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMovies.fulfilled]: (state, action) => {
      return { ...state, movies: action.payload.results, isLoading: false };
    },
    [getMovies.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getIndividualMovie.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getIndividualMovie.fulfilled]: (state, action) => {
      return { ...state, individualMovie: action.payload, isLoading: false };
    },
    [getIndividualMovie.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getMovieCollection.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMovieCollection.fulfilled]: (state, action) => {
      return { ...state, collection: action.payload, isLoading: false };
    },
    [getMovieCollection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const { clearSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;
