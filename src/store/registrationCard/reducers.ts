import {RegistrationCardState, RegistrationCardStateType} from "./types";
import moment from "moment";

export const initialState = {
    additionalHospitalization: {},
    attachments: {},
    employment: {},
    etc: {},
    features: {
        features: {
            bloodGroup: '',
            note: '',
            diagnose: '',
            birthHeight: 0,
            birthWeight: 0,
            weekEmbryonic: 0
        },
        allergy: {
            name: '',
            degree: '',
            fromDate: new Date(),
            note: ''
        },
    },
    offences: {},
    outsideHospitalization: {},
    outsideIdentification: {},
    passportGeneral: {
        passportInfo: {
            addressRegistration: {
                city: '',
                area: '',
                street: '',
                isDocumentedAddress: false
            },
        },
        policyOms: {
            timeType: '',
            from: moment(),
            to: moment(),
            serial: '',
            number: '',
            cmo: '',
            type: '',
            name: '',
            note: ''
        },
        policyDms: {
            timeType: '',
            from: moment(),
            to: moment(),
            serial: '234234',
            number: '',
            cmo: '',
            type: '',
            name: '',
            note: ''
        }
    },
    personDocs: {},
    links: {},
    privileges: {},
    quotas: {},
    socialStatus: {},
    viewTypes: {},
}

export function RegistrationCardReducer(
    state = initialState,
    action: RegistrationCardStateType
): RegistrationCardState {
    switch (action.type) {
        case "SET_FORM_SECTION":
            return {
                ...action.payload
            }
        default:
            return {...initialState}
    }
}
