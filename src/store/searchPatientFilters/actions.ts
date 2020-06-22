import {SearchPatientFiltersState, SearchPatientsStateType, SET_SEARCH_FILTER} from "./types";


export function setFormFilter(formState: SearchPatientFiltersState): SearchPatientsStateType {
    return {
        type: SET_SEARCH_FILTER,
        payload: formState
    }
}
