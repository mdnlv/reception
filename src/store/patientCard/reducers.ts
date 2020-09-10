import Patient from '../../types/data/Patient';
import {
  patientCardActionsTypes,
  SET_ID_PATIENT,
  SET_PATIENT_CARD_LOADING,
  SET_PATIENT_EVENTS,
} from './types';
import PatientEvent from '../../types/data/PatientEvent';

export const initialPatientCardState = {
  currentPatient: undefined,
  isLoading: false,
  events: [] as PatientEvent[],
};

export interface PatientCardState {
  currentPatient: Patient | undefined;
  isLoading: boolean;
  events: PatientEvent[];
}

export function PatientCardReducer(
  state: PatientCardState = initialPatientCardState,
  action: patientCardActionsTypes,
) {
  switch (action.type) {
    case SET_ID_PATIENT:
      return {
        ...state,
        currentPatient: action.payload,
      };
    case SET_PATIENT_CARD_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_PATIENT_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
}
