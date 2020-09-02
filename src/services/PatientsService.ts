import {AxiosResponse} from "axios";
import apiInstance from "./api";
import PatientResponse from "../interfaces/responses/patients/patient";

type FetchPatientsFilter = {
    id: string
    firstName: string
    lastName: string
}

export default {
    fetchPatients(limit: number, offset: number, filters?: FetchPatientsFilter): Promise<AxiosResponse<PatientResponse[]>>{
        return apiInstance.get('/client?deleted=0')
    },

    fetchIdPatient(id: string): Promise<AxiosResponse<PatientResponse>>{
        return apiInstance.get(`/client?id=${id}`)
    }
}
