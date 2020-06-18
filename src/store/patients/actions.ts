import {CurrentPatientPayload, PatientsStateType, SET_CURRENT_PATIENT} from "./types";


export function setCurrentPatient(patientPayload: CurrentPatientPayload): PatientsStateType {
    return {
        type: SET_CURRENT_PATIENT,
        payload: patientPayload
    }
}
