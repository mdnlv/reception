export default interface PatientResponse {

    id: string
    createDatetime: Date | null
    createPerson_id: number | null
    modifyDatetime: Date | null
    modifyPerson_id: number | null
    attendingPerson_id: null | number
    deleted: 0 | 1
    lastName: string
    firstName: string
    patrName: string
    birthDate: Date
    birthTime: Date | null
    sex: 1 | 2
    SNILS: string
    bloodType_id: number | null
    bloodDate: Date | null
    bloodNotes: string
    growth: string
    weight: string
    embryonalPeriodWeek: string
    birthPlace: string
    chronicalMKB: string
    diagNames: string
    chartBeginDate: Date
    rbInfoSource_id: null | number
    notes: string
    IIN: string
    isConfirmSendingData: 0 | 1
    isUnconscious: 0 | 1
    filial: number
    dataTransferConfirmationDate: Date | null
    uuid_id: number
    version: number

}
