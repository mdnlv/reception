import axios, {AxiosResponse} from 'axios';

import apiInstance from '../api';
import PatientResponse from '../../interfaces/responses/patients/patient';
import FilterSearchPatientResponse from '../../interfaces/responses/patients/filterSearchPatient';
import FindPolicyParams from '../../interfaces/payloads/patients/findPatientPolicy';
import FindSnilsParams from "../../interfaces/payloads/patients/findPatientSnils";
import NewPatientPayload from '../../interfaces/payloads/patients/newPatient';
import PatientSnilsSearchResponse from "../../interfaces/responses/patients/patientSnilsSearch";
import PatientPolicySearchResponse from "../../interfaces/responses/patients/patientPolicySearch";

export default {
  fetchPatients: function (limit: number,  offset: number): Promise<AxiosResponse<PatientResponse[]>> {
    return apiInstance.get(`/client/save?deleted=0&limit=${limit}&offset=${offset}`);
  },

  savePatient(patient: NewPatientPayload) {
    return apiInstance.post(`/client/save`, patient);
  },

  editPatient(patient: NewPatientPayload) {
    return apiInstance.put(`/client/save`, patient);
  },

  fetchIdPatient(id: number): Promise<AxiosResponse<PatientResponse[]>> {
    return apiInstance.get(`/client/save?id=${id}`);
  },

  queryPatients(
    query: string,
    limit = 20,
    offset?: number,
  ): Promise<AxiosResponse<FilterSearchPatientResponse[]>> {
    return apiInstance.post(
      `/client/find?&deleted=0`,
      {
        value: query,
        offset: offset || 0,
        limit,
      },
    );
  },

  findPatientPolicy(params: FindPolicyParams): Promise<AxiosResponse<PatientPolicySearchResponse>> {
    return apiInstance.post('/client/tfoms/getPolicyHmao', params);
  },

  findPatientSnils(params: FindSnilsParams): Promise<AxiosResponse<PatientSnilsSearchResponse>> {
    return apiInstance.post('/client/tfoms/getSnils', params);
  },
};