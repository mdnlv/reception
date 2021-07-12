import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import ScheduleService from '../../../services/ScheduleService';
import {PersonTree, Person} from "./types";

export const fetchPersonTree = createAsyncThunk(
  'schedule/fetchPersonTree',
  async (payload: {group_by?: 'speciality_id' | 'orgStructure_id'}, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await ScheduleService.fetchPersonTree(payload);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(setIsFiltered(false)); 
    }
  },
);

export const fetchPersonTreeFull = createAsyncThunk(
  'schedule/fetchPersonTreeFull',
  async (payload: {group_by?: 'speciality_id' | 'orgStructure_id'}, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await ScheduleService.fetchPersonTree(payload);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(setIsFiltered(false)); 
    }
  },
);

export const fetchFiltersDoctors = createAsyncThunk(
  'schedule/fetchFiltersDoctors',
  async (payload: {limit: number,offset: number,orgStructure_id: number,post_id: number,speciality_id: number, value?: string}, thunkAPI) => {
    thunkAPI.dispatch(setLoadingFound(true));
    try {
      const response = await ScheduleService.fetchDoctors(payload);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoadingFound(false));
    }
  },
);

export const postFiltersDoctors = createAsyncThunk(
  'schedule/postFiltersDoctors',
  async (payload: {person_id_list?: [number],orgStructure_id?: number, post_id?: number,speciality_id?: number, value?: string, group_by?: 'speciality_id' | 'orgStructure_id'}, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await ScheduleService.postPersonTree(payload);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(setIsFiltered(true)); 
    }
  },
);

const personTreeSlice = createSlice({
  name: 'personTree',
  initialState: {
    person_tree: [] as PersonTree[] | [Person[]],
    person_tree_full: [] as PersonTree[],
    isLoading: false,
    foundDoctors: [] as  Person[],
    currentDoctor: 0,
    isSearching: false,
    loadingFound: false,
    isFiltered: false
  },
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsSearchingDoctors: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
      state.currentDoctor = 0;
    },
    setLoadingFound: (state, action: PayloadAction<boolean>) => {
      state.loadingFound = action.payload;
      state.currentDoctor = 0;
    },
    setIsFiltered: (state, action: PayloadAction<boolean>) => {
      state.isFiltered = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPersonTree.fulfilled, (state, action) => {
      state.person_tree = action.payload;
    });
    builder.addCase(fetchPersonTreeFull.fulfilled, (state, action) => {
      state.person_tree = action.payload;
      state.person_tree_full = action.payload;
    });
    builder.addCase(postFiltersDoctors.fulfilled, (state, action) => {
      state.person_tree = action.payload;
    });
    builder.addCase(fetchFiltersDoctors.fulfilled, (state, action) => {
      state.foundDoctors = action.payload;
    });
  }
});

export const { setLoading, setLoadingFound, setIsFiltered } = personTreeSlice.actions;
export default personTreeSlice;
