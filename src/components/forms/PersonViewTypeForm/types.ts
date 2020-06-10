export interface PersonViewType {
    type: string
    lpu: string
    fromDate: Date
    toDate: Date
    note: string
}


export default interface FormState {
    viewTypes: PersonViewType[]
}
