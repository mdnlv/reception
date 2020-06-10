
export interface SocialStatus {
    type?: string
    serialNumber: string
    number: string
    note?: string
    fromDate: Date
    endDate: Date
}

export interface TrustedDoc {
    date: Date
    givenBy: string
    serial: string
    number: string
}


export interface FormState {
    socialStatus: SocialStatus[]
    trustedDoc: TrustedDoc[]
}
