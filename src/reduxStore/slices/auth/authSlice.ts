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
        return response.data;
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setIsLogining(false));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isLogining: false,
    isAuth: false,
  },
  reducers: {
    setIsLogining: (state, action: PayloadAction<boolean>) => {
      state.isLogining = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload?.access_token || '';
      state.isAuth = true;
    });
  }
});

export const {
  setIsLogining
} = authSlice.actions;

export default authSlice
