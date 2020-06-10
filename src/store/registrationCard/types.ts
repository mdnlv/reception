import FeaturesFormState from "../../components/forms/FeaturesForm/types";
import PassportGeneralFormState from "../../components/forms/PasssportGeneralForm/types"
import {FormState as SocialStatusFormState} from "../../components/forms/SocialStatusForm/types";
import AttachmentsFormState from "../../components/forms/AttachmentsForm/types";
import PersonViewTypeFormState from "../../components/forms/PersonViewTypeForm/types";
import LinksFormState from "../../components/forms/PersonLinksForm/types";
import OffencesFormState from "../../components/forms/OffencesForm/types"
import PersonDocsState from "../../components/forms/PersonDocumentsForm/types"
import OutsideIdsFormState from "../../components/forms/OutsideIdentificationForm/types"
import OutsideHospitalizationFormState from "../../components/forms/OutsideHospitalizationForm/types"
import AdditionalHospitalizationFormState from "../../components/forms/AdditionalHospitalizationForm/types"
import EtcFormState from "../../components/forms/EtcForm/types"
import EmploymentFormState from "../../components/forms/EmploymentForm/types"
import PersonPrivilegesFormState from "../../components/forms/PrivilegesForm/types"



export const SET_FORM_SECTION = 'SET_FORM_SECTION'

export interface SetFormAction {
    type: typeof SET_FORM_SECTION
    payload: RegistrationCardState
}

export interface RegistrationCardState {
    additionalHospitalization: AdditionalHospitalizationFormState
    attachments: AttachmentsFormState
    employment: EmploymentFormState
    etc: EtcFormState
    features: FeaturesFormState
    offences: OffencesFormState
    outsideHospitalization: OutsideHospitalizationFormState
    outsideIdentification: OutsideIdsFormState
    passportGeneral: PassportGeneralFormState
    personDocs: PersonDocsState
    links: LinksFormState,
    privileges: PersonPrivilegesFormState,
    quotas: {}
    socialStatus: SocialStatusFormState
    viewTypes: PersonViewTypeFormState
}

export type RegistrationCardStateType = SetFormAction
