import FeaturesFormState from "../../components/forms/FeaturesForm/types";
import PassportGeneralFormState from "../../components/forms/PasssportGeneralForm/types"

export const SET_FORM_SECTION = 'SET_FORM_SECTION'

export interface SetFormAction {
    type: typeof SET_FORM_SECTION
    payload: RegistrationCardState
}

export interface RegistrationCardState {
    additionalHospitalization: {}
    attachments: {}
    employment: {}
    etc: {}
    features: FeaturesFormState
    offences: {}
    outsideHospitalization: {}
    outsideIdentification: {}
    passportGeneral: PassportGeneralFormState
    personDocs: {}
    links: {}
    privileges: {}
    quotas: {}
    socialStatus: {}
    viewTypes: {}
}

export type RegistrationCardStateType = SetFormAction
