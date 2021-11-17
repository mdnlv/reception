import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";

import AuthService from "../../../services/AuthService";
import LoginPayload from "../../../interfaces/payloads/auth/LoginPayload";

export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, thunkAPI) => {
    thunkAPI.dispatch(setIsLogining(true));
    try {
      const response = await AuthService.login(payload);
      if (response.data) {
        thunkAPI.dispatch(setUsername(payload.username));
        return response.data;
      }
    } catch (e) {
      console.log(e);
      thunkAPI.dispatch(setIsLoginError(true));
    } finally {
      thunkAPI.dispatch(setIsLogining(false));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || '',
    isLogining: false,
    isAuth: false,
    isLoginError: false,
    username: '' as string,
  },
  reducers: {
    setIsLogining: (state, action: PayloadAction<boolean>) => {
      state.isLogining = action.payload;
    },
    setIsLoginError: (state, action: PayloadAction<boolean>) => {
      state.isLoginError = action.payload;
    },
    logout: (state) => {
      state.token = '';
      localStorage.removeItem('token');
      state.isAuth = false;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoginError = false;
      state.token = action.payload?.access_token || '';
      localStorage.setItem('token', state.token);
      state.isAuth = true;
    });
  }
});

export const {
  setIsLogining,
  setIsLoginError,
  logout,
  setUsername
} = authSlice.actions;

export default authSlice
