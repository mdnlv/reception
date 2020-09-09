import {
  FETCH_ID_PATIENT,
  FETCH_ID_PATIENT_ERROR,
  SET_ID_PATIENT,
  SET_PATIENT_CARD_LOADING,
} from './types';
import Patient from '../../types/data/Patient';

export function setPatient(patient: Patient) {
  return {
    type: SET_ID_PATIENT,
    payload: patient,
  };
}

export function fetchIdPatient(id: number) {
  return {
    type: FETCH_ID_PATIENT,
    payload: id,
  };
}

export function fetchIdPatientError() {
  return {
    type: FETCH_ID_PATIENT_ERROR,
  };
}

export function setPatientCardLoading(loading: boolean) {
  return {
    type: SET_PATIENT_CARD_LOADING,
    payload: loading,
  };
}
