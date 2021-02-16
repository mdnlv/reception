import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import ScheduleService from '../../../services/ScheduleService';
import Schedule from '../../../types/data/Schedule';
import {ScheduleItem} from "./types";

export const fetchSchedules = createAsyncThunk(
  'schedule/fetchSchedules',
  async (payload: { id: number; year?: number; month?: number }, thunkAPI) => {
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

export const fetchPersonsSchedule = createAsyncThunk(
  'schedule/fetchPersonsSchedule',
  async (payload: number[], thunkAPI) => {
    try {
      const response: {
        [k: string]: Schedule[];
      } = {};
      for (let id of payload) {
        setTimeout(async () => {
          const netResponse = await ScheduleService.fetchSchedule({
            id,
            month: 9,
            year: 2020,
          });
          if (netResponse.data) {
            response[id] = netResponse.data;
          }
        }, 0.1);
      }
      return response;
    } catch (e) {
      alert(e);
    }
  },
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    schedules: [] as ScheduleItem[],
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSchedules.fulfilled, (state, action) => {
      state.schedules = action.payload;
    });
  },
});

export const { setLoading } = scheduleSlice.actions;
export default scheduleSlice;
