import Patient from '../../types/data/Patient';
import { PatientsActionsType } from './types';

export const initialPatientsState = {
  patients: [] as Patient[],
  currentPatient: '',
  isLoading: false,
};

export function PatientsReducer(
  state = initialPatientsState,
  action: PatientsActionsType,
) {
  switch (action.type) {
    case 'SET_CURRENT_PATIENT':
      console.log(action.type);
      return {
        ...initialPatientsState,
        currentPatient: action.payload.patientId.toString(),
      };
    case 'SET_PATIENTS':
      return {
        ...state,
        patients: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return { ...initialPatientsState };
  }
}
