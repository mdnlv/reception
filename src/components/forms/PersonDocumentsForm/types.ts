
export interface PassportDoc {
    type: string
    serial: string
    number: string
    fromDate: Date
    endDate: Date
    givenBy: string
}

export interface PolicyDoc {
    type: string
    timeType: string
    serial: string
    number: string
    fromDate: Date
    endDate: Date
    CMO: string
    name: string
    note: string
    acceptedOffers: string
}

export interface SocialStatus {
    type: string
    serial: string
    number: string
    fromDate: Date
    endDate: Date
    givenBy: string
}

export interface NamedDoc {
    fromDate: Date
    toDate: Date
    payType: string
    payTypeNumber: string
    startDate: Date
    endDate: Date
}

export default interface FormState {
    idDoc: PassportDoc[],
    policy: PolicyDoc[],
    socialStatus: SocialStatus[],
    namedDoc: NamedDoc[]
}
