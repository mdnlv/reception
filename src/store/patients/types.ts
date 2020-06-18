export const SET_CURRENT_PATIENT = 'SET_CURRENT_PATIENT'

export interface CurrentPatientPayload {
    patientId: number | string
}

export interface SetCurrentPatient{
    type: typeof SET_CURRENT_PATIENT
    payload: CurrentPatientPayload
}

export type PatientsStateType = SetCurrentPatient
