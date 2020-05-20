export interface FormState {
    socialStatus: [{
        type: string
        serialNumber: string
        number: string
        note: string
    }]
    trustedDoc: [{
        date: Date
        givenBy: string
    }]
}
