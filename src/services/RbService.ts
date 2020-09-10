import apiInstance from './api';
import { AxiosResponse } from 'axios';

export default {
  fetchPersons(): Promise<AxiosResponse<any>> {
    return apiInstance.get('/person?deleted=0&limit=1000');
  },
  fetchEventTypes(): Promise<AxiosResponse<any>> {
    return apiInstance.get('/event?deleted=0&limit=1000');
  },
};
