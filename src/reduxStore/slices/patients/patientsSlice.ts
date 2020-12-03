import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import Patient from '../../../types/data/Patient';
import PatientsService from '../../../services/PatientsService/PatientsService';
import transformPatientsFilters from '../../utils/transform/transformPatientsFilters';
import { transformPatientResponse } from '../../utils/transform/transformPatientResponse';
import { transformFilterPatientResponse } from '../../utils/transform/transformFilterPatientResponse';
import PatientsSearchFiltersType from './types';

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (payload: { limit?: number; offset?: number }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const { limit, offset } = payload;
      const response = await PatientsService.fetchPatients(
        limit || 0,
        offset || 0,
      );
      if (response.status === 200 && response.data) {
        return response.data;
      }
    } catch (e) {
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const fetchFiltersPatients = createAsyncThunk(
  'patients/fetchFiltersPatients',
  async (filters: Partial<PatientsSearchFiltersType>, thunkAPI) => {
    thunkAPI.dispatch(setLoadingFound(true));
    try {
      const response = await PatientsService.detailedQueryPatients(
        transformPatientsFilters(filters),
      );
      if (response.data) {
        return response.data;
      }
    } catch (e) {
    } finally {
      thunkAPI.dispatch(setLoadingFound(false));
    }
  },
);

export const fetchQueryPatients = createAsyncThunk(
  'patients/fetchQueryPatients',
  async (query: string, thunkAPI) => {
    thunkAPI.dispatch(setLoadingFound(true));
    try {
      const response = await PatientsService.queryPatients(query);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
    } finally {
      thunkAPI.dispatch(setLoadingFound(false));
    }
  },
);

const patientSlice = createSlice({
  name: 'patients',
  initialState: {
    patients: [] as Patient[] | any,
    currentPatient: 0,
    isSearching: false,
    isLoading: false,
    isLoadingFound: false,
    foundPatients: [] as Patient[] | any,
  },
  reducers: {
    setCurrentPatient: (state, action: PayloadAction<number>) => {
      state.currentPatient = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLoadingFound: (state, action: PayloadAction<boolean>) => {
      state.isLoadingFound = action.payload;
    },
    clearFoundPatients: (state, _) => {
      state.foundPatients = [];
    },
    setIsSearchingPatients: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
      state.currentPatient = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      state.patients =
        action.payload?.map((item, index) => ({
          ...transformPatientResponse(item),
        })) || [];
    });
    builder.addCase(fetchFiltersPatients.fulfilled, (state, action) => {
      state.foundPatients =
        action.payload?.map((item) => transformFilterPatientResponse(item)) ||
        [];
    });
    builder.addCase(fetchQueryPatients.fulfilled, (state, action) => {
      state.foundPatients =
        action.payload?.map((item) => transformFilterPatientResponse(item)) ||
        [];
    });
  },
});

export const {
  setLoading,
  setLoadingFound,
  setCurrentPatient,
  clearFoundPatients,
  setIsSearchingPatients,
} = patientSlice.actions;
export default patientSlice;
