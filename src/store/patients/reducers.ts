import Patient from '../../types/data/Patient';
import {
  PatientsActionsType,
  SET_CURRENT_PATIENT,
  SET_FOUND_PATIENTS,
  SET_LOADING,
  SET_PATIENTS,
} from './types';

export const initialPatientsState = {
  patients: [] as Patient[],
  currentPatient: 0,
  isLoading: false,
  foundPatients: [] as Patient[],
};

export function PatientsReducer(
  state = initialPatientsState,
  action: PatientsActionsType,
) {
  switch (action.type) {
    case SET_CURRENT_PATIENT:
      return {
        ...state,
        currentPatient: action.payload,
      };
    case SET_PATIENTS:
      return {
        ...state,
        patients: action.payload,
      };
    case SET_FOUND_PATIENTS:
      return {
        ...state,
        foundPatients: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
