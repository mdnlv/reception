export interface EtcItem {
    infoAboutMedOrg?: string
    date?: Date
    note?: string
}

export default interface FormState {
    items: EtcItem[]
}
