export interface PersonAddHospitalization {
    code: string
    fromDate: Date
    endDate: Date
    codeMo: string
}

export default interface FormState {
    hospitalizations: PersonAddHospitalization[]
}
