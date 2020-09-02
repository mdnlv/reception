import moment from "moment";

export interface PassportContactType {
    isMain: boolean
    number: string
    type: string
    note: string
}

export default interface FormState {
    passportInfo: {
        passportType: string
        serial: string
        number: string
        fromDate: Date
        givenBy: string

        addressRegistration: {
            city: string
            area: string
            street: string
            houseNumber?: number
            houseCharacter?: number
            flatNumber?: number
            isDocumentedAddress: boolean
        },

        documentedAddress: {
            city: string
            area: string
            street: string
            houseNumber?: number
            houseCharacter?: number
            flatNumber?: number
            isDocumentedAddress: boolean
        }
    },
    contacts: PassportContactType[],
    policyOms: {
        timeType: string
        from: moment.Moment
        to: moment.Moment
        serial: string
        number: string
        cmo: string
        type: string
        name: string
        note: string
    },
    policyDms: {
        timeType: string
        from: Date
        to: moment.Moment
        serial: string
        number: string
        cmo: string
        type: string
        name: string
        note: string
    },

}
