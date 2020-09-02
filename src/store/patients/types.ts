import Patient from "../../types/data/Patient";

export const SET_CURRENT_PATIENT = 'SET_CURRENT_PATIENT'
export const SET_PATIENTS = 'SET_PATIENTS'
export const FETCH_PATIENTS = 'FETCH_PATIENTS
export const FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS'
export const FETCH_PATIENTS_ERROR = 'FETCH_PATIENTS_ERROR'



export interface CurrentPatientPayload {
    patientId: number | string
}

export interface SetCurrentPatient{
    type: typeof SET_CURRENT_PATIENT
    payload: CurrentPatientPayload
}

export interface SET_PATIENTS{
    type: typeof SET_PATIENTS
    payload: Patient[]
}

export interface FETCH_PATIENTS {
    type: typeof FETCH_PATIENTS
}

export interface FETCH_PATIENTS_ERROR {
    type: typeof FETCH_PATIENTS_ERROR
}

export interface FETCH_PATIENTS_SUCCESS {
    type: typeof FETCH_PATIENTS_SUCCESS
}

export type PatientsActionsType = SetCurrentPatient | FETCH_PATIENTS | FETCH_PATIENTS_ERROR | FETCH_PATIENTS_SUCCESS
