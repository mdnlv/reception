import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import Patient from '../../../types/data/Patient';
import PatientsService from '../../../services/PatientsService/PatientsService';
import transformPatientsFilters from '../../utils/transform/transformPatientsFilters';
import { transformPatientResponse } from '../../utils/transform/transformPatientResponse';
import { transformFilterPatientResponse } from '../../utils/transform/transformFilterPatientResponse';
import PatientsSearchFiltersType from './types';
import {fetchIdPatientError} from "../registrationCard/registrationCardSlice";
import {RootState} from "../../store";

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (payload: { limit?: number; offset?: number }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      thunkAPI.dispatch(setLoading(true));
      const { limit, offset } = payload;
      const response = await PatientsService.fetchPatients(
        state.auth.token,
        limit || 0,
        offset || 0,
      );
      if (response.status === 200 && response.data) {
        return response.data;
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const fetchRegPatient = createAsyncThunk(
  `patients/fetchRegPatient`,
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await PatientsService.fetchIdPatient(state.auth.token, id);
      if (response.status === 200) {
        return response.data;
      } else {
        thunkAPI.dispatch(fetchIdPatientError());
      }
    } catch (e) {
      alert(e);
      thunkAPI.dispatch(fetchIdPatientError());
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const fetchFiltersPatients = createAsyncThunk(
  'patients/fetchFiltersPatients',
  async (filters: Partial<PatientsSearchFiltersType>, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setLoadingFound(true));
    try {
      const response = await PatientsService.detailedQueryPatients(
        state.auth.token,
        transformPatientsFilters(filters),
      );
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

export const fetchQueryPatients = createAsyncThunk(
  'patients/fetchQueryPatients',
  async (payload: {query: string, limit: number, offset?: number}, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setLoadingFound(true));
    try {
      const {query, limit, offset} = payload
      const response = await PatientsService.queryPatients(state.auth.token, query, limit, offset);
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

export const fetchPatientById = createAsyncThunk(
  'patients/fetchPatientById',
  async (payload: {id: number}, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setLoadingFound(true));
    try {
      const response = await PatientsService.fetchPatientById(state.auth.token, payload.id);
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

const patientSlice = createSlice({
  name: 'patients',
  initialState: {
    query: '' as string,
    patients: [] as Patient[],
    currentPatient: 0,
    isSearching: false,
    isLoading: false,
    isLoadingFound: false,
    foundPatients: [] as Patient[],
  },
  reducers: {
    setCurrentPatient: (state, action: PayloadAction<number>) => {
      state.currentPatient = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
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
    setIsSearchingWithCurrent: (state, action: PayloadAction<number>) => {
      state.isSearching = true;
      state.currentPatient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      // @ts-ignore
      state.patients =
        action.payload?.map((item) => ({
          ...transformPatientResponse(item),
        })) || [];
    });
    builder.addCase(fetchRegPatient.fulfilled, (state, action) => {
      // @ts-ignore
      state.patients = action.payload?.map((item) => ({
        ...transformPatientResponse(item)
      })) || [];
    });
    builder.addCase(fetchFiltersPatients.fulfilled, (state, action) => {
      // @ts-ignore
      state.foundPatients =
        action.payload?.map((item) => transformFilterPatientResponse(item)) ||
        [];
    });
    builder.addCase(fetchQueryPatients.fulfilled, (state, action) => {
      // @ts-ignore
      state.foundPatients =
        action.payload?.map((item) => transformFilterPatientResponse(item)) ||
        [];
    });
    builder.addCase(fetchPatientById.fulfilled, (state, action) => {
      // @ts-ignore
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
  setIsSearchingWithCurrent,
  setQuery
} = patientSlice.actions;
export default patientSlice;
