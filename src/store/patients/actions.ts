import {
  DETAILED_QUERY_PATIENTS,
  DETAILED_QUERY_PATIENTS_ERROR,
  DETAILED_QUERY_PATIENTS_SUCCESS,
  FETCH_PATIENTS,
  FETCH_PATIENTS_ERROR,
  PatientsActionsType,
  QUERY_PATIENTS,
  QUERY_PATIENTS_ERROR,
  QUERY_PATIENTS_SUCCESS,
  QueryPatientsFilters,
  SET_CURRENT_PATIENT,
  SET_LOADING,
  SET_PATIENTS,
} from './types';
import Patient from '../../types/data/Patient';

export function setCurrentPatient(patientPayload: number): PatientsActionsType {
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

export function setFoundPatients(patients: Patient[]) {
  return {
    type: SET_PATIENTS,
    payload: patients,
  };
}

export function detailedQueryPatients(queryFilters: QueryPatientsFilters) {
  return {
    type: DETAILED_QUERY_PATIENTS,
    payload: queryFilters,
  };
}

export function detailedQueryPatientsError() {
  return {
    type: DETAILED_QUERY_PATIENTS_ERROR,
  };
}

export function detailedQueryPatientsSuccess() {
  return {
    type: DETAILED_QUERY_PATIENTS_SUCCESS,
  };
}

export function queryPatients(query: string) {
  return {
    type: QUERY_PATIENTS,
    payload: query,
  };
}

export function queryPatientsError() {
  return {
    type: QUERY_PATIENTS_ERROR,
  };
}

export function queryPatientsSuccess() {
  return {
    type: QUERY_PATIENTS_SUCCESS,
  };
}
