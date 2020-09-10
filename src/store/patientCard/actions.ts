import {
  FETCH_ID_PATIENT,
  FETCH_ID_PATIENT_ERROR,
  FETCH_PATIENT_EVENTS,
  FETCH_PATIENT_EVENTS_ERROR,
  FETCH_PATIENT_EVENTS_SUCCESS,
  SET_ID_PATIENT,
  SET_PATIENT_CARD_LOADING,
} from './types';
import Patient from '../../types/data/Patient';
import PatientEvent from '../../types/data/PatientEvent';

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

export function fetchPatientEvents(id: number) {
  return {
    type: FETCH_PATIENT_EVENTS,
    payload: id,
  };
}

export function fetchPatientEventsError() {
  return {
    type: FETCH_PATIENT_EVENTS_ERROR,
  };
}

export function fetchPatientEventsSuccess(id: number) {
  return {
    type: FETCH_PATIENT_EVENTS_SUCCESS,
  };
}

export function setPatientEvents(events: PatientEvent[]) {
  return {
    type: FETCH_PATIENT_EVENTS,
    payload: events,
  };
}
