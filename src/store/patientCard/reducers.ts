import Patient from '../../types/data/Patient';
import { patientCardActionsTypes } from './types';

export const initialPatientCardState = {
  currentPatient: undefined,
  isLoading: false,
};

export interface PatientCardState {
  currentPatient: Patient | undefined;
  isLoading: boolean;
}

export function PatientCardReducer(
  state: PatientCardState = initialPatientCardState,
  action: patientCardActionsTypes,
) {
  switch (action.type) {
    case 'SET_ID_PATIENT':
      return {
        ...state,
        currentPatient: action.payload,
      };
    case 'SET_PATIENT_CARD_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return initialPatientCardState;
  }
}
