import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import ScheduleService from '../../../services/ScheduleService';
import {Schedule} from "./types";

export const fetchSchedules = createAsyncThunk(
  'schedule/fetchSchedules',
  async (payload: { id: number; beg_date: string, end_date: string}, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await ScheduleService.fetchSchedule(payload);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },  
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    schedules: {} as Schedule,
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSchedules.fulfilled, (state, action) => {
      let org = {} as Schedule;
      org[action.meta.arg.id] = action.payload;
      let obj = Object.assign(state.schedules, org);
      state.schedules = obj;
    });
  },
});

export const { setLoading } = scheduleSlice.actions;
export default scheduleSlice;
