import { AxiosResponse } from 'axios';

import apiInstance from '../api';
import PatientResponse from '../../interfaces/responses/patients/patient';
import PatientFiltersQueryPayload from '../../interfaces/payloads/patients/patientFiltersQuery';
import FilterSearchPatientResponse from '../../interfaces/responses/patients/filterSearchPatient';
import PatientPolicyResponse from '../../interfaces/responses/patients/patientPolicy';
import FindPolicyParams from '../../interfaces/payloads/patients/findPatientPolicy';
import NewPatientPayload from '../../interfaces/payloads/patients/newPatient';
import {FetchPatientsFilter} from "./types";

export default {
  fetchPatients(
    limit: number,
    offset: number,
    filters?: FetchPatientsFilter,
  ): Promise<AxiosResponse<PatientResponse[]>> {
    return apiInstance.get(
      `/client/save?deleted=0&limit=${limit}&offset=${offset}`,
    );
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

  detailedQueryPatients(
    query: Partial<PatientFiltersQueryPayload> | string,
  ): Promise<AxiosResponse<FilterSearchPatientResponse[]>> {
    if (typeof query === 'string') {
      return apiInstance.post(`/client/find`, query);
    } else {
      return apiInstance.post(`/client/extFind`, query);
    }
  },

  queryPatients(
    query: string,
    limit = 20,
    offset?: number,
  ): Promise<AxiosResponse<FilterSearchPatientResponse[]>> {
    return apiInstance.post(`/client/find?&deleted=0`, {
      value: query,
      offset: offset || 0,
      limit,
    });
  },

  findPatientPolicy(params: FindPolicyParams): Promise<AxiosResponse<PatientPolicyResponse>> {
    return apiInstance.post('/client/tfoms/getPolicy', params);
  },
};
