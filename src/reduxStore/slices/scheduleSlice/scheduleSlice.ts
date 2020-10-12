import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ScheduleService from '../../../services/ScheduleService';

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
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    schedules: [],
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
