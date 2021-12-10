import {AxiosResponse} from 'axios';

import apiInstance from '../api';
import PatientResponse from '../../interfaces/responses/patients/patient';
import FilterSearchPatientResponse from '../../interfaces/responses/patients/filterSearchPatient';
import FindPolicyParams from '../../interfaces/payloads/patients/findPatientPolicy';
import FindDocParams from "../../interfaces/payloads/patients/findPatientDoc";
import NewPatientPayload from '../../interfaces/payloads/patients/newPatient';
import PatientDocSearchResponse from "../../interfaces/responses/patients/patientDocSearch";
import PatientPolicySearchResponse from "../../interfaces/responses/patients/patientPolicySearch";

export default {
  fetchPatients: function (limit: number,  offset: number, token: string): Promise<AxiosResponse<PatientResponse[]>> {
    return apiInstance.get(
      `/client/save?deleted=0&limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  savePatient(patient: NewPatientPayload, token: string) {
    return apiInstance.post(`/client/save`, patient, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  editPatient(patient: NewPatientPayload, token: string) {
    return apiInstance.put(`/client/save`, patient, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  fetchIdPatient(id: number, token: string): Promise<AxiosResponse<PatientResponse[]>> {
    return apiInstance.get(`/client/save?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  queryPatients(
    token: string,
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
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  findPatientPolicy(params: FindPolicyParams, token: string): Promise<AxiosResponse<PatientPolicySearchResponse>> {
    return apiInstance.post('/client/tfoms/getPolicyHmao', params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  findPatientDoc(params: FindDocParams, token: string): Promise<AxiosResponse<PatientDocSearchResponse>> {
    return apiInstance.post('/client/tfoms/getDocumentsHmao', params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },
};
