import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from './initialState';
import { RegistrationCardStateType } from './initialState';
import RbService from '../../../services/RbService';

export type KladrDocType = 'documented' | 'registration';

export const fetchKladr = createAsyncThunk(
  'registrationCard/fetchKladr',
  async (payload: { id?: number; type?: KladrDocType }, thunkAPI) => {
    thunkAPI.dispatch(setKladrLoading({ value: true, type: payload.type }));
    try {
      const response = await RbService.getRegionList();
      if (response.data) {
        const formattedData = response.data.map((item) => ({
          id: item.CODE,
          name: item.NAME,
          prefix: item.prefix,
          socr: item.SOCR,
          infis: item.infis,
        }));
        return { items: formattedData, type: payload.type };
      }
    } catch (e) {
    } finally {
      thunkAPI.dispatch(setKladrLoading({ value: false, type: payload.type }));
    }
  },
);

export const fetchKladrNested = createAsyncThunk(
  'registrationCard/fetchKladrNested',
  async (payload: { id: string; type?: KladrDocType }, thunkAPI) => {
    thunkAPI.dispatch(setKladrLoading({ value: true, type: payload.type }));
    try {
      const response = await RbService.getRegionList(payload.id);
      if (response.data) {
        const formattedData = response.data.map((item) => ({
          id: item.CODE,
          name: item.NAME,
          prefix: item.prefix,
          socr: item.SOCR,
          infis: item.infis,
        }));
        return { items: formattedData, type: payload.type };
      }
    } catch (e) {
    } finally {
      thunkAPI.dispatch(setKladrLoading({ value: false, type: payload.type }));
    }
  },
);

export const fetchKladrStreets = createAsyncThunk(
  'registrationCard/fetchKladrStreets',
  async (payload: { id: string; type?: KladrDocType }, thunkAPI) => {
    thunkAPI.dispatch(setKladrLoading({ value: true, type: payload.type }));
    try {
      const response = await RbService.getRegionStreets(payload.id);
      if (response.data) {
        const formattedData = response.data.map((item) => ({
          id: item.CODE,
          name: item.NAME,
          socr: item.SOCR,
          infis: item.infis,
        }));
        return { items: formattedData, type: payload.type };
      }
    } catch (e) {
    } finally {
      thunkAPI.dispatch(setKladrLoading({ value: false, type: payload.type }));
    }
  },
);

const registrationCardSlice = createSlice({
  name: 'registrationCard',
  initialState: initialState,
  reducers: {
    setFormSection: (
      state,
      action: PayloadAction<RegistrationCardStateType>,
    ) => {
      console.log(action.payload);
      state = { ...action.payload };
    },
    setKladrLoading: (
      state,
      action: PayloadAction<{ value: boolean; type?: KladrDocType }>,
    ) => {
      if (action.payload.type === 'documented') {
        state.data.passportGeneral.documentedAddress.isKladrLoading =
          action.payload.value;
      } else {
        state.data.passportGeneral.addressRegistration.isKladrLoading =
          action.payload.value;
      }
    },
    setKladrNestedLoading: (
      state,
      action: PayloadAction<{ value: boolean; type?: KladrDocType }>,
    ) => {
      if (action.type === 'documented') {
        state.data.passportGeneral.documentedAddress.isKladrNestedLoading =
          action.payload.value;
      } else {
        state.data.passportGeneral.addressRegistration.isKladrNestedLoading =
          action.payload.value;
      }
    },
    setKladrStreetsLodaing: (
      state,
      action: PayloadAction<{ value: boolean; type?: KladrDocType }>,
    ) => {
      if (action.type === 'documented') {
        state.data.passportGeneral.documentedAddress.isKladrStreetsLoading =
          action.payload.value;
      } else {
        state.data.passportGeneral.addressRegistration.isKladrStreetsLoading =
          action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchKladr.fulfilled, (state, action) => {
      console.log(action);
      if (action.payload?.type === 'documented' && action.payload.items) {
        state.data.passportGeneral.documentedAddress = {
          ...state.data.passportGeneral.documentedAddress,
          kladr: action.payload.items,
          kladrNested: [],
          kladrStreets: [],
        };
      } else if (
        action.payload?.type === 'registration' &&
        action.payload.items
      ) {
        state.data.passportGeneral.addressRegistration = {
          ...state.data.passportGeneral.addressRegistration,
          kladr: action.payload.items,
          kladrNested: [],
          kladrStreets: [],
        };
      } else if (action.payload?.items) {
        state.data.passportGeneral.documentedAddress = {
          ...state.data.passportGeneral.documentedAddress,
          kladr: action.payload.items,
        };
        state.data.passportGeneral.addressRegistration = {
          ...state.data.passportGeneral.addressRegistration,
          kladr: action.payload.items,
        };
      }
    });
    builder.addCase(fetchKladrStreets.fulfilled, (state, action) => {
      if (action.payload?.type === 'documented' && action.payload.items) {
        state.data.passportGeneral.documentedAddress.kladrStreets =
          action.payload.items;
      } else if (
        action.payload?.type === 'registration' &&
        action.payload.items
      ) {
        state.data.passportGeneral.addressRegistration.kladrStreets =
          action.payload.items;
      }
    });
    builder.addCase(fetchKladrNested.fulfilled, (state, action) => {
      if (action.payload?.type === 'documented' && action.payload.items) {
        state.data.passportGeneral.documentedAddress = {
          ...state.data.passportGeneral.documentedAddress,
          kladrNested: action.payload.items,
          kladrStreets: [],
        };
      } else if (
        action.payload?.type === 'registration' &&
        action.payload.items
      ) {
        state.data.passportGeneral.addressRegistration = {
          ...state.data.passportGeneral.addressRegistration,
          kladrNested: action.payload.items,
          kladrStreets: [],
        };
      }
    });
  },
});

export const {
  setFormSection,
  setKladrLoading,
  setKladrNestedLoading,
  setKladrStreetsLodaing,
} = registrationCardSlice.actions;

export default registrationCardSlice;
