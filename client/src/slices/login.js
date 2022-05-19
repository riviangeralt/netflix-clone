import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  message: null,
  user: null,
  token: null,
  status: null,
};

export const login = createAsyncThunk("login", async (data) => {
  const response = await instance.post("/login", data);
  return response.data;
});

export const signup = createAsyncThunk("signup", async (data) => {
  const response = await instance.post("/register", data);
  return response.data;
});

export const logout = createAsyncThunk("logout", async () => {
  const response = await instance.post("/logout");
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        isLoading: false,
        token: action.payload.token,
        message: action.payload.message,
        status: action.payload.status,
      };
    },
    [login.rejected]: (state, action) => {
      console.log(action);
      return {
        ...state,
        isLoading: false,
        message: action.error.message,
        status: action.error.name,
      };
    },
    [signup.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [signup.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [logout.pending]: (state, action) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
  },
});

export default authSlice.reducer;
