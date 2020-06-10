export interface PersonOffence {
    article: string
    court: string
    number: number
    startDate: Date
    nextCourtDate: Date
    note: string
    resolution: string
}


export default interface OffencesForm {
    offences: PersonOffence[]
}
