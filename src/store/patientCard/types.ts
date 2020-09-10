import Patient from '../../types/data/Patient';
import PatientEvent from '../../types/data/PatientEvent';

export const FETCH_ID_PATIENT = 'FETCH_ID_PATIENT';
export const FETCH_ID_PATIENT_ERROR = 'FETCH_ID_PATIENT_ERROR';
export const FETCH_ID_PATIENT_SUCCESS = 'FETCH_ID_PATIENT_SUCCESS';
export const SET_ID_PATIENT = 'SET_ID_PATIENT';
export const SET_PATIENT_CARD_LOADING = 'SET_PATIENT_CARD_LOADING';

export const FETCH_PATIENT_EVENTS = 'FETCH_PATIENT_EVENTS';
export const FETCH_PATIENT_EVENTS_ERROR = 'FETCH_PATIENT_EVENTS_ERROR';
export const FETCH_PATIENT_EVENTS_SUCCESS = 'FETCH_PATIENT_EVENTS_SUCCESS';
export const SET_PATIENT_EVENTS = 'SET_PATIENT_EVENTS';

export interface FETCH_ID_PATIENT {
  type: typeof FETCH_ID_PATIENT;
  payload: number;
}

export interface FETCH_ID_PATIENT_ERROR {
  type: typeof FETCH_ID_PATIENT_ERROR;
}

export interface FETCH_ID_PATIENT_SUCCESS {
  type: typeof FETCH_ID_PATIENT_SUCCESS;
}

export interface SET_ID_PATIENT {
  type: typeof SET_ID_PATIENT;
  payload: Patient;
}

export interface SET_PATIENT_CARD_LOADING {
  type: typeof SET_PATIENT_CARD_LOADING;
  payload: boolean;
}

export interface FETCH_PATIENT_EVENTS {
  type: typeof FETCH_PATIENT_EVENTS;
  payload: number;
}

export interface FETCH_PATIENT_EVENTS_ERROR {
  type: typeof FETCH_PATIENT_EVENTS_ERROR;
}

export interface FETCH_PATIENT_EVENTS_SUCCESS {
  type: typeof FETCH_PATIENT_EVENTS_SUCCESS;
}

export interface SET_PATIENT_EVENTS {
  type: typeof SET_PATIENT_EVENTS;
  payload: PatientEvent[];
}

export type patientCardActionsTypes =
  | FETCH_ID_PATIENT
  | FETCH_ID_PATIENT_ERROR
  | FETCH_ID_PATIENT_SUCCESS
  | SET_ID_PATIENT
  | SET_PATIENT_CARD_LOADING
  | FETCH_PATIENT_EVENTS
  | FETCH_PATIENT_EVENTS_ERROR
  | FETCH_PATIENT_EVENTS_SUCCESS
  | SET_PATIENT_EVENTS;
