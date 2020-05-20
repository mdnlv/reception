export default interface OffencesForm {
    offences: [{
        article: string
        court: string
        number: number
        startDate: Date
        nextCourtDate: Date
        note: string
        resolution: string
    }]
}
