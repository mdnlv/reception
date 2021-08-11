import axios, {AxiosResponse} from 'axios';

import apiInstance from '../api';
import PatientResponse from '../../interfaces/responses/patients/patient';
import PatientFiltersQueryPayload from '../../interfaces/payloads/patients/patientFiltersQuery';
import FilterSearchPatientResponse from '../../interfaces/responses/patients/filterSearchPatient';
import PatientPolicyResponse from '../../interfaces/responses/patients/patientPolicy';
import FindPolicyParams from '../../interfaces/payloads/patients/findPatientPolicy';
import FindSnilsParams from "../../interfaces/payloads/patients/findPatientSnils";
import NewPatientPayload from '../../interfaces/payloads/patients/newPatient';
import PatientSnilsSearchResponse from "../../interfaces/responses/patients/patientSnilsSearch";
import PatientPolicySearchResponse from "../../interfaces/responses/patients/patientPolicySearch";

export default {
  fetchPatients: function (
    token: string,
    limit: number,
    offset: number,
  ): Promise<AxiosResponse<PatientResponse[]>> {
    return apiInstance.get(
      `/client/save?deleted=0&limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  savePatient(token: string, patient: NewPatientPayload) {
    return apiInstance.post(
      `/client/save`,
      patient,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  editPatient(token: string, patient: NewPatientPayload) {
    return apiInstance.put(
      `/client/save`,
      patient,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  fetchIdPatient(token: string, id: number): Promise<AxiosResponse<PatientResponse[]>> {
    return apiInstance.get(
      `/client/save?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  detailedQueryPatients(
    token: string,
    query: Partial<PatientFiltersQueryPayload> | string,
  ): Promise<AxiosResponse<FilterSearchPatientResponse[]>> {
    if (typeof query === 'string') {
      return apiInstance.post(
        `/client/find`,
        query,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } else {
      return apiInstance.post(`/client/extFind`, query);
    }
  },

  fetchPatientById(
    token: string,
    id: number,
  ): Promise<AxiosResponse<FilterSearchPatientResponse[]>> {
    return apiInstance.get(
      `/client?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
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

  findPatientPolicy(token: string, params: FindPolicyParams): Promise<AxiosResponse<PatientPolicySearchResponse>> {
    return apiInstance.post(
      '/client/tfoms/getPolicyHmao',
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  },

  findPatientSnils(params: FindSnilsParams): Promise<AxiosResponse<PatientSnilsSearchResponse>> {
    return axios.post('http://neftu1:8096/api/client/tfoms/getSnils', params);
  },
};
