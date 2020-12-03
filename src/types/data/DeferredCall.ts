export default interface DeferredCall {
    id: number
    fullName: string
    patientId: number
    contact: string
    maxDate: string
    netrica: number | null
    orgId: number
    personId: number | null
    specialityId: number
}
