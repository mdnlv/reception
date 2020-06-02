import {RegistrationCardState, RegistrationCardStateType, SET_FORM_SECTION} from "./types";


export function setFormSection(formState: RegistrationCardState): RegistrationCardStateType {
    return {
        type: SET_FORM_SECTION,
        payload: formState
    }
}
