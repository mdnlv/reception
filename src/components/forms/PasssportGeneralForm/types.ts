export interface FormState {
    passportInfo: {
        addressRegistration: {
            city: string
            area: string
            street: string
            houseNumber: number
            houseCharacter: number
            flatNumber: number
            isDocumentedAddress: boolean
        },
    },
    contacts: [{
        isMain: boolean
        number: string
        type: string
        note: string
    }],
    policyOms: {
        timeType: string
        from: Date
        to: Date
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
        to: Date
        serial: string
        number: string
        cmo: string
        type: string
        name: string
        note: string
    }
}
