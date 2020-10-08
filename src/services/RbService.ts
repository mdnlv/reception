import apiInstance from './api';
import { AxiosResponse } from 'axios';
import RbEventTypeResponse from '../interfaces/responses/rb/rbEventType';
import RbPersonResponse from '../interfaces/responses/rb/rbPerson';
import RbOrganisationResponse from '../interfaces/responses/rb/rbOrganisation';
import RbInvalidReasonResponse from '../interfaces/responses/rb/rbInvalidReason';
import RbInvalidDocumentTypeResponse from '../interfaces/responses/rb/rbInvalidDocumentType';
import RbAccountingSystemResponse from '../interfaces/responses/rb/rbAccountingSystem';
import RbAttachTypeResponse from '../interfaces/responses/rb/rbAttachType';
import RbKladrResponse from '../interfaces/responses/rb/rbKladr';
import RbKladrStreetResponse from '../interfaces/responses/rb/rbKladrStreet';
import RbDocumentTypeResponse from '../interfaces/responses/rb/rbDocumentType';
import RbContactTypeResponse from '../interfaces/responses/rb/rbContactType';
import RbPolicyTypeResponse from '../interfaces/responses/rb/rbPolicyType';
import RbPolicyKindResponse from '../interfaces/responses/rb/rbPolicyKind';

export default {
  fetchPersons(limit = 1000): Promise<AxiosResponse<RbPersonResponse[]>> {
    return apiInstance.get(`/person?deleted=0&limit=${limit}`);
  },
  fetchEventTypes(limit = 1000): Promise<AxiosResponse<RbEventTypeResponse[]>> {
    return apiInstance.get(`/eventType?deleted=0&limit=${limit}`);
  },
  fetchOrganisation(): Promise<AxiosResponse<RbOrganisationResponse[]>> {
    return apiInstance.get(`/refBooks/Organisation`);
  },
  fetchInvalidReasons(): Promise<AxiosResponse<RbInvalidReasonResponse[]>> {
    return apiInstance.get(`/refBooks/rbTempInvalidReason`);
  },
  fetchDocumentTypes(): Promise<AxiosResponse<RbDocumentTypeResponse[]>> {
    return apiInstance.get('/refBooks/rbDocumentType');
  },
  fetchInvalidDocumentTypes(): Promise<
    AxiosResponse<RbInvalidDocumentTypeResponse[]>
  > {
    return apiInstance.get('/refBooks/rbTempInvalidDocument');
  },
  fetchAccountingSystem(): Promise<
    AxiosResponse<RbAccountingSystemResponse[]>
  > {
    return apiInstance.get('/refBooks/rbAccountingSystem');
  },
  fetchAttachTypes(): Promise<AxiosResponse<RbAttachTypeResponse[]>> {
    return apiInstance.get('/refBooks/rbAttachType');
  },
  fetchCityDisctricts(): Promise<AxiosResponse<any>> {
    return apiInstance.get('/refBooks/rbDistrict');
  },
  getRegionList(parent?: string): Promise<AxiosResponse<RbKladrResponse[]>> {
    if (parent) {
      return apiInstance.get(`/kladr?parent=${parent}`);
    } else {
      return apiInstance.get(`/kladr`);
    }
  },
  getRegionStreets(
    id: string,
  ): Promise<AxiosResponse<RbKladrStreetResponse[]>> {
    return apiInstance.get(`/kladr/street?code=${id}`);
  },
  fetchContactTypes(): Promise<AxiosResponse<RbContactTypeResponse[]>> {
    return apiInstance.get('/refBooks/rbContactType');
  },
  fetchPolicyTypes(): Promise<AxiosResponse<RbPolicyTypeResponse[]>> {
    return apiInstance.get('/refBooks/rbPolicyType');
  },
  fetchPolicyKind(): Promise<AxiosResponse<RbPolicyKindResponse[]>> {
    return apiInstance.get('/refBooks/rbPolicyKind');
  },
};
