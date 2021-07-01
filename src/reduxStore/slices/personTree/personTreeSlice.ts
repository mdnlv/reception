import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import ScheduleService from '../../../services/ScheduleService';
import {PersonTree, Person} from "./types";

export const fetchPersonTree = createAsyncThunk(
  'schedule/fetchPersonTree',
  async (payload: {}, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await ScheduleService.fetchPersonTree();
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


const personTreeSlice = createSlice({
  name: 'personTree',
  initialState: {
    person_tree: [] as PersonTree[],
    isLoading: false,
    foundDoctors: [] as  Person[],
    currentDoctor: 0,
    isSearching: false,
  },
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPersonTree.fulfilled, (state, action) => {
      state.person_tree = action.payload;
    });
  }
});

export const { setLoading } = personTreeSlice.actions;
export default personTreeSlice;
