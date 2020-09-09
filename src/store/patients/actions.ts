import {
  CurrentPatientPayload,
  FETCH_PATIENTS,
  FETCH_PATIENTS_ERROR,
  PatientsActionsType,
  SET_CURRENT_PATIENT,
  SET_LOADING,
  SET_PATIENTS,
} from './types';
import Patient from '../../types/data/Patient';

export function setCurrentPatient(
  patientPayload: CurrentPatientPayload,
): PatientsActionsType {
  return {
    type: SET_CURRENT_PATIENT,
    payload: patientPayload,
  };
}

export function setPatients(payload: Patient[]) {
  return {
    type: SET_PATIENTS,
    payload,
  };
}

export function fetchPatients(payload: { limit?: number; offset?: number }) {
  return {
    type: FETCH_PATIENTS,
    payload,
  };
}

export function fetchPatientsError() {
  return {
    type: FETCH_PATIENTS_ERROR,
  };
}

export function setLoading(loading: boolean) {
  return {
    type: SET_LOADING,
    payload: loading,
  };
}
