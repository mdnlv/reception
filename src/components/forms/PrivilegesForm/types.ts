export interface PrivilegeInvalidity {
    isSomat: boolean
    fromDate: Date
    unlimited: boolean
    group: string
    nextDate: Date
    workPlace: string
    lossCapacityDegree: string
    firstly: boolean
    isHospital: boolean
    note: string
}

export interface PrivilegeItem {
    type: string
    fromDate: Date
    toDate: Date
    endReason: string
}

export default interface FormState {
    invalidity: PrivilegeInvalidity[]
    privileges: PrivilegeItem[]
}
