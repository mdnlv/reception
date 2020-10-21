import { AxiosResponse } from 'axios';
import apiInstance from './api';
import PatientResponse from '../interfaces/responses/patients/patient';
import PatientFiltersQueryPayload from '../interfaces/payloads/patients/patientFiltersQuery';
import FilterSearchPatientResponse from '../interfaces/responses/patients/filterSearchPatient';

type FetchPatientsFilter = {
  id: string;
  firstName: string;
  lastName: string;
};

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
  ): Promise<AxiosResponse<FilterSearchPatientResponse[]>> {
    return apiInstance.post(`/client/find?limit=20&deleted=0`, {
      value: query,
    });
  },
};
