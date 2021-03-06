import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import PatientEvent from '../../../types/data/PatientEvent';
import PatientsService from '../../../services/PatientsService/PatientsService';
import EventService from '../../../services/EventService';
import {transformPatientResponse} from '../../utils/transform/transformPatientResponse';
import StateType from "./types";
import {RootState} from "../../store";

export const fetchCurrentPatient = createAsyncThunk(
  'patientCard/fetchCurrentPatient',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(
      setLoading({
        value: true,
        type: 'patient',
      }),
    );
    try {
      const response = await PatientsService.fetchIdPatient(state.auth.token, id);
      if (response.data && response.data[0]) {
        return transformPatientResponse(response.data[0]);
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(
        setLoading({
          value: false,
          type: 'patient',
        }),
      );
    }
  },
);

export const fetchPatientEvents = createAsyncThunk(
  'patientCard/fetchPatientEvents',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(
      setLoading({
        value: true,
        type: 'events',
      }),
    );
    try {
      const response = await EventService.fetchPersonEvents(state.auth.token, id);
      if (response.data) {
        const formattedData = response.data.map((item) => ({
          id: item.id,
          createDatetime: item.createDatetime,
          createPersonId: item.createPerson_id,
          eventTypeId: item.eventType_id,
          setDate: item.setDate,
          setPersonId: item.setPerson_id,
          note: item.note,
        }));
        return formattedData;
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(
        setLoading({
          value: false,
          type: 'events',
        }),
      );
    }
  },
);

const initialState: StateType = {
  currentPatient: undefined,
  loading: {
    patient: false,
    events: false,
  },
  events: [] as PatientEvent[],
};

const patientCardSlice = createSlice({
  name: 'patientCard',
  initialState: initialState,
  reducers: {
    setLoading: (
      state,
      action: PayloadAction<{
        type: keyof StateType['loading'];
        value: boolean;
      }>,
    ) => {
      state.loading[action.payload.type] = action.payload.value;
    },
    resetCurrentPatient: (state) => {
      state.currentPatient = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentPatient.fulfilled, (state, action) => {
      if (action.payload) {
        state.currentPatient = action.payload;
      }
    });
    builder.addCase(fetchPatientEvents.fulfilled, (state, action) => {
      if (action.payload) {
        state.events = action.payload;
      }
    });
  },
});

export const {
  setLoading,
  resetCurrentPatient
} = patientCardSlice.actions;

export default patientCardSlice;
