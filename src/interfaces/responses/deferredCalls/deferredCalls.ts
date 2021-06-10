export default interface DeferredCallsResponse {
    action_id: number
    birthDate: string
    client_id: number
    contact: string
    maxDate: string
    createDatetime: string,
    netrica_code: number
    orgStructure_id: number
    patient_fullname: string
    person_id: number
    speciality_id: number
    comment: string
    status_id: number
    client: {
        firstName: string, 
        lastName: string, 
        patrName: string, 
        birthDate: string, 
        SNILS: string
        },
        person?:{
        SNILS: string,
        firstName: string,
        lastName: string
        orgStructure_id: number
        patrName: string
        post_id: number
        speciality_id: number
    }
   
}
