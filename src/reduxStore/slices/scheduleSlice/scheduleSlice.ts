import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionPost } from '../../../components/elements/ScheduleTable/types';
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


export const saveTicket = createAsyncThunk(
  'shedule/saveTicket',
  async (payload: ActionPost, thunkAPI) => {
    thunkAPI.dispatch(setPostLoading(true));
    try {
      const response = await ScheduleService.saveTicket(payload);
      console.log(response.data)
      thunkAPI.dispatch(setPostLoading(false));
    } catch (e) {
      alert(JSON.stringify(e.response.data));
    } finally {
      thunkAPI.dispatch(setPostLoading(false));
    }
  },
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
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
      let org = {} as Schedule;
      org[action.meta.arg.id] = action.payload;
      let obj = Object.assign(state.schedules, org);
      state.schedules = obj;
    });
  },
});

export const { setLoading, setPostLoading } = scheduleSlice.actions;
export default scheduleSlice;
