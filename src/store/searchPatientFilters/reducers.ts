import {SearchPatientFiltersState, SearchPatientsStateType, SET_SEARCH_FILTER} from "./types";


export const initialState = {}

export function SearchPatientFiltersReducer(
    state=initialState,
    action: SearchPatientsStateType
): SearchPatientFiltersState {
    switch (action.type) {
        case SET_SEARCH_FILTER:
            return {...action.payload}
        default:
            return state
    }
}
