import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/index";

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

export const getList = createAsyncThunk("getList", async (id) => {
  const response = await instance.get(`/list/${id}`);
  return response.data;
});

export const listHandler = createAsyncThunk("listHandler", async (data) => {
  const { id, movie } = data;
  const response = await instance.post(`/list/${id}`, movie);
  return response.data;
});

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: {
    [getList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getList.fulfilled]: (state, action) => {
      return { ...state, list: action.payload.list, isLoading: false };
    },
    [getList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [listHandler.pending]: (state, action) => {
      state.isLoading = true;
    },
    [listHandler.fulfilled]: (state, action) => {
      return { ...state, list: action.payload.list, isLoading: false };
    },
  },
});

export default listSlice.reducer;
