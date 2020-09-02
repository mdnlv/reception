import Patient from "../../types/data/Patient";
import {PatientsActionsType} from "./types";


export const initialPatientsState = {
    patients: [] as Patient[],
    currentPatient: ''
}

export function PatientsReducer(
    state = initialPatientsState,
    action: PatientsActionsType
) {
    switch (action.type) {
        case "SET_CURRENT_PATIENT":
            return {
                ...initialPatientsState,
                currentPatient: action.payload.patientId.toString()
            }
        default:
            return {...initialPatientsState}
    }
}
