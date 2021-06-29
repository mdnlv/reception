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
      console.log(e)
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
      console.log(e)
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },  
);

export const actionTicket = createAsyncThunk(
  'schedule/actionTicket',
  async (payload: {data: ActionPost, id: number[]; beg_date: string, end_date: string}, thunkAPI) => {
    thunkAPI.dispatch(setPostLoading(true));
    thunkAPI.dispatch(setLoading(true));
    thunkAPI.dispatch(setErrorStatus(false));
    try {
      const res = await ScheduleService.actionTicket(payload.data);
      if (res && res.status !== 200) {
        thunkAPI.dispatch(setErrorStatus(true));
        res && thunkAPI.dispatch(setErrorMessage(res.status + ': ' + res.statusText));
      }
    } catch (e: any) {
      thunkAPI.dispatch(setErrorMessage(e.message));
      thunkAPI.dispatch(setErrorStatus(true));
    } finally {
      const response = await ScheduleService.fetchSchedule({id: payload.id, beg_date: payload.beg_date, end_date:payload.end_date});
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(setPostLoading(false))
      if (response.data) {
        return response.data;
      }
    }
  },
);

export const setDates = createAsyncThunk(
  'schedule/setDates',
  async (payload: {cd: Date, ed: Date}, thunkAPI) => {
    thunkAPI.dispatch(setCurrentDate(payload.cd));
    thunkAPI.dispatch(setRangeWeekDate(payload.ed));
  },
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    schedule: {} as ScheduleOne,
    schedules: {} as Schedule,
    isLoading: false,
    postLoading: false,
    errorMessage: '',
    errorStatus: false,
    currentDate: new Date,
    rangeWeekDate: new Date,
  },

  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPostLoading: (state, action: PayloadAction<boolean>) => {
      state.postLoading = action.payload;
    },
    setErrorStatus: (state, action: PayloadAction<boolean>) => {
      state.errorStatus = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setCurrentDate: (state, action: PayloadAction<Date>) => {
      state.currentDate = action.payload;
    },
    setRangeWeekDate: (state, action: PayloadAction<Date>) => {
      state.rangeWeekDate = action.payload;
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

    builder.addCase(actionTicket.fulfilled, (state, action) => {
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

export const { setLoading, setPostLoading, setErrorStatus, setErrorMessage, setCurrentDate, setRangeWeekDate } = scheduleSlice.actions;
export default scheduleSlice;
