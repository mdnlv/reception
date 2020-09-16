import apiInstance from './api';
import { AxiosResponse } from 'axios';
import RbEventTypeResponse from '../interfaces/responses/rb/rbEventType';
import RbPersonResponse from '../interfaces/responses/rb/rbPerson';
import RbOrganisationResponse from '../interfaces/responses/rb/rbOrganisation';
import RbInvalidReasonResponse from '../interfaces/responses/rb/rbInvalidReason';
import RbInvalidDocumentTypeResponse from '../interfaces/responses/rb/rbInvalidDocumentType';
import RbAccountingSystemResponse from '../interfaces/responses/rb/rbAccountingSystem';

export default {
  fetchPersons(): Promise<AxiosResponse<RbPersonResponse[]>> {
    return apiInstance.get('/person?deleted=0&limit=1000');
  },
  fetchEventTypes(): Promise<AxiosResponse<RbEventTypeResponse[]>> {
    return apiInstance.get('/eventType?deleted=0&limit=1000');
  },
  fetchOrganisation(): Promise<AxiosResponse<RbOrganisationResponse[]>> {
    return apiInstance.get(`/refBooks/Organisation`);
  },
  fetchInvalidReasons(): Promise<AxiosResponse<RbInvalidReasonResponse[]>> {
    return apiInstance.get(`/refBooks/rbTempInvalidReason`);
  },
  fetchInvalidDocumentTypes(): Promise<
    AxiosResponse<RbInvalidDocumentTypeResponse[]>
  > {
    return apiInstance.get('/refBooks/rbTempInvalidDocument');
  },
  fetchAccountingSystem(): Promise<
    AxiosResponse<RbAccountingSystemResponse[]>
  > {
    return apiInstance.get('/refBooks/rbAcountingSystem');
  },
};
