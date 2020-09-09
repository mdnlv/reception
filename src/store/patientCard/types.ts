import Patient from '../../types/data/Patient';

export const FETCH_ID_PATIENT = 'FETCH_ID_PATIENT';
export const FETCH_ID_PATIENT_ERROR = 'FETCH_ID_PATIENT_ERROR';
export const FETCH_ID_PATIENT_SUCCESS = 'FETCH_ID_PATIENT_SUCCESS';
export const SET_ID_PATIENT = 'SET_ID_PATIENT';
export const SET_PATIENT_CARD_LOADING = 'SET_PATIENT_CARD_LOADING';

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

export type patientCardActionsTypes =
  | FETCH_ID_PATIENT
  | FETCH_ID_PATIENT_ERROR
  | FETCH_ID_PATIENT_SUCCESS
  | SET_ID_PATIENT
  | SET_PATIENT_CARD_LOADING;
