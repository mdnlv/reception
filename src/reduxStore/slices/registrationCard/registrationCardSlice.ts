import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState, { RegistrationCardStateType } from './initialState';
import RbService from '../../../services/RbService';
import FindPolicyParams from '../../../interfaces/payloads/patients/findPatientPolicy';
import PatientsService from '../../../services/PatientsService';
import transformPolicyResponse from '../../utils/transform/transformPolicyResponse';

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

export const findPatientPolicy = createAsyncThunk(
  'registrationCard/findPatientPolicy',
  async (
    payload: { params: FindPolicyParams; type: 'oms' | 'dms' },
    thunkAPI,
  ) => {
    thunkAPI.dispatch(
      setFindPolicyLoading({ value: true, type: payload.type }),
    );
    try {
      const response = await PatientsService.findPatientPolicy(payload.params);
      thunkAPI.dispatch(
        setFindPolicyLoading({ value: false, type: payload.type }),
      );
      return {
        data: response,
        type: payload.type,
      };
    } catch (e) {}
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
      state = { ...action.payload };
    },
    setFindPolicyLoading: (
      state,
      action: PayloadAction<{ value: boolean; type: 'oms' | 'dms' }>,
    ) => {
      state.foundPolicies[action.payload.type].isLoading = action.payload.value;
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
    builder.addCase(findPatientPolicy.fulfilled, (state, action) => {
      if (action.payload && action.payload.type === 'oms') {
        state.foundPolicies.oms.items = [
          transformPolicyResponse(action.payload.data),
        ];
      } else if (action.payload?.type === 'dms') {
        state.foundPolicies.dms.items = [
          transformPolicyResponse(action.payload.data),
        ];
      }
    });
  },
});

export const {
  setFormSection,
  setKladrLoading,
  setKladrNestedLoading,
  setKladrStreetsLodaing,
  setFindPolicyLoading,
} = registrationCardSlice.actions;

export default registrationCardSlice;
