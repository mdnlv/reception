import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionPost } from '../../../components/elements/ScheduleTable/types';
import ScheduleService from '../../../services/ScheduleService';
import {Schedule, ScheduleOne} from "./types";

export const fetchSchedules = createAsyncThunk(
  'schedule/fetchSchedules',
  async (payload: { id: number[]; beg_date: string, end_date: string}, thunkAPI) => {
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

export const fetchItem = createAsyncThunk(
  'schedule/fetchItem',
  async (payload: { id: number; date: string}, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await ScheduleService.fetchItem(payload);
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

export const actionTicket = createAsyncThunk(
  'schedule/actionTicket',
  async (payload: ActionPost, thunkAPI) => {
    thunkAPI.dispatch(setPostLoading(true));
    try {
      const response = await ScheduleService.actionTicket(payload);
      thunkAPI.dispatch(setPostLoading(false));
    } catch (e: any) {
      alert(JSON.stringify(e.response.data));
    } finally {
      thunkAPI.dispatch(setPostLoading(false));
    }
  },
);


const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    schedule: {} as ScheduleOne,
    schedules: {} as Schedule,
    isLoading: false,
    postLoading: false
  },
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPostLoading: (state, action: PayloadAction<boolean>) => {
      state.postLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSchedules.fulfilled, (state, action) => {
      for(let id of action.meta.arg.id) {
        if(action.payload && action.payload[id]) {
          if(state.schedules[id]) {
            state.schedules[id] = action.payload[id];
          } else {
            let obj = Object.assign(state.schedules, action.payload);
            state.schedules = obj;
          }
        } else {
          delete state.schedules[id];
        }
      }

    });

    builder.addCase(fetchItem.fulfilled, (state, action) => {
      state.schedule = action.payload;
    });
  },
});

export const { setLoading, setPostLoading } = scheduleSlice.actions;
export default scheduleSlice;
