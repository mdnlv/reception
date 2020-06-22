import PartialFormState from "../../components/forms/PatientSearchFilterForm/types";

export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER'

export interface SetSearchFilterAction {
    type: typeof SET_SEARCH_FILTER
    payload: SearchPatientFiltersState
}

export interface SearchPatientFiltersState extends PartialFormState{

}

export type SearchPatientsStateType = SetSearchFilterAction
