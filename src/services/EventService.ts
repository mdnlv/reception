import { AxiosResponse } from 'axios';

import apiInstance from './api';
import PatientEventResponse from '../interfaces/responses/events/patientEvent';

export default {
  fetchPersonEvents(
    id: number,
  ): Promise<AxiosResponse<PatientEventResponse[]>> {
    return apiInstance.get(`/event?client_id=${id}&limit=100`);
  },
};
