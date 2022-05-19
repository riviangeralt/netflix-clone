import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api";

const initialState = {
  profiles: [],
  isLoading: false,
  error: null,
  individualProfile: {},
};

export const addProfile = createAsyncThunk("addProfile", async (data) => {
  const response = await instance.post("/create/profile", data);
  return response.data;
});

export const getProfiles = createAsyncThunk("getProfiles", async () => {
  const response = await instance.get("/profiles");
  return response.data;
});

export const updateProfile = createAsyncThunk("updateProfile", async (data) => {
  const { id, update } = data;
  const response = await instance.put(`/profile/${id}`, update);
  return response.data;
});

export const selectedProfile = createAsyncThunk("singleProfile", async (id) => {
  const response = await instance.get(`/profile/${id}`);
  return response.data;
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearInputs: (state) => {
      state.individualProfile = {};
    },
  },
  extraReducers: {
    [addProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.profiles.push(action.payload);
    },
    [addProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getProfiles.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getProfiles.fulfilled]: (state, action) => {
      return { ...state, profiles: action.payload.profiles, isLoading: false };
    },
    [getProfiles.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [updateProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.profiles = state.profiles.map((profile) => {
        if (profile._id === action.payload._id) {
          return action.payload;
        }
        return profile;
      });
    },
    [selectedProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [selectedProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.individualProfile = action.payload.profile;
    },
  },
});

export const { clearInputs } = profileSlice.actions;
export default profileSlice.reducer;
