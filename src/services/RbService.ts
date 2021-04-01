import { AxiosResponse } from 'axios';

import apiInstance from './api';
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
import RbRelationTypeResponse from '../interfaces/responses/rb/rbRelationType';
import RbContactTypeResponse from '../interfaces/responses/rb/rbContactType'; 
import RbPolicyTypeResponse from '../interfaces/responses/rb/rbPolicyType';
import RbPolicyKindResponse from '../interfaces/responses/rb/rbPolicyKind';
import RbSocialTypeResponse from '../interfaces/responses/rb/rbSocialType';
import RbSocialClassResponse from '../interfaces/responses/rb/rbSocialClass';
import RbHurtType from '../interfaces/responses/rb/rbHurtType';
import RbHurtFactorType from '../interfaces/responses/rb/rbHurtFactorType';
import RbOrgStructureResponse from "../interfaces/responses/rb/rbOrgStructure";

export default {
  fetchSocialTypes(): Promise<AxiosResponse<RbSocialTypeResponse[]>> {
    return apiInstance.get(`/refBooks/rbSocStatusType`);
  },
  fetchSocialClasses(): Promise<AxiosResponse<RbSocialClassResponse[]>> {
    return apiInstance.get(`/refBooks/rbSocStatusClass`);
  },
  fetchHurtTypes(): Promise<AxiosResponse<RbHurtType[]>> {
    return apiInstance.get(`/refBooks/rbHurtType`);
  },
  fetchHurtFactorTypes(): Promise<AxiosResponse<RbHurtFactorType[]>> {
    return apiInstance.get(`/refBooks/rbHurtFactorType`);
  },
  fetchPersons(limit = 10): Promise<AxiosResponse<RbPersonResponse[]>> {
    return apiInstance.get(`/person?deleted=0&limit=${limit}`);
  },
  
  fetchPersonsFind(query?:string): Promise<AxiosResponse<RbPersonResponse[]>> {
    return apiInstance.post(`/person/find`,{value:query,limit:10});
  },
  fetchEventTypes(limit = 1000): Promise<AxiosResponse<RbEventTypeResponse[]>> {
    return apiInstance.get(`/eventType?deleted=0&limit=${limit}`);
  },

  fetchGetCheckSum(name:string): Promise<AxiosResponse<any>> {
    return apiInstance.get(`/refBooks/${name}/checksum`);
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
  fetchRelationTypes(): Promise<AxiosResponse<RbRelationTypeResponse[]>> {
    return apiInstance.get('/refBooks/rbRelationType');
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
  fetchCityDistricts(): Promise<AxiosResponse<any>> {
    return apiInstance.get('/refBooks/rbDistrict');
  },
  fetchOrgStructure(): Promise<AxiosResponse<RbOrgStructureResponse[]>> {
    return apiInstance.get('/refBooks/OrgStructure');
  },
  getRegionList(parent?: string, query?: string): Promise<AxiosResponse<RbKladrResponse[]>> {
    if (parent) {
      return apiInstance.get(`/kladr?parent=${parent}&name=${query}&limit=${10}`);
    } else {
      return apiInstance.get(`/kladr`);
    }
  },
  getRegionStreets(
    id: string,
    query?: string
  ): Promise<AxiosResponse<RbKladrStreetResponse[]>> {
    return apiInstance.get(`/kladr/street?code=${id}&name=${query}&limit=${10}`);
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
