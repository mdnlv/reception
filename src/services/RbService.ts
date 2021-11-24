import { AxiosResponse } from 'axios';

import apiInstance from './api';
import RbPersonResponse from '../interfaces/responses/rb/rbPerson';
import RbOrganisationResponse from '../interfaces/responses/rb/rbOrganisation';
import RbAttachTypeResponse from '../interfaces/responses/rb/rbAttachType';
import RbKladrResponse from '../interfaces/responses/rb/rbKladr';
import RbKladrStreetResponse from '../interfaces/responses/rb/rbKladrStreet';
import RbDocumentTypeResponse from '../interfaces/responses/rb/rbDocumentType';
import RbRelationTypeResponse from '../interfaces/responses/rb/rbRelationType';
import RbContactTypeResponse from '../interfaces/responses/rb/rbContactType';
import RbPolicyTypeResponse from '../interfaces/responses/rb/rbPolicyType';
import RbPolicyKindResponse from '../interfaces/responses/rb/rbPolicyKind';
import RbOrgStructureResponse from "../interfaces/responses/rb/rbOrgStructure";
import RbDetachmentReasonResponse from "../interfaces/responses/rb/rbDetachmentReason";
import RbSNILSMissingReasonResponse from "../interfaces/responses/rb/rbSNILSMissingReason";
import RbPolicyDischargeReason from "../interfaces/responses/rb/rbPolicyDischargeReason";
import RbSocialTypeResponse from "../interfaces/responses/rb/rbSocialType";
import RbSocialClassResponse from "../interfaces/responses/rb/rbSocialClass";

export default {
  fetchPersons(limit = 10): Promise<AxiosResponse<RbPersonResponse[]>> {
    return apiInstance.get(`/person?deleted=0&limit=${limit}`);
  },
  fetchPersonsFind(query?:string): Promise<AxiosResponse<RbPersonResponse[]>> {
    return apiInstance.post(`/person/find`,{value:query,limit:10});
  },
  fetchGetCheckSum(name:string): Promise<AxiosResponse<any>> {
    return apiInstance.get(`/refBooks/${name}/checksum`);
  },
  fetchOrganisation(): Promise<AxiosResponse<RbOrganisationResponse[]>> {
    return apiInstance.get(`/refBooks/Organisation`);
  },
  fetchDocumentTypes(): Promise<AxiosResponse<RbDocumentTypeResponse[]>> {
    return apiInstance.get('/refBooks/rbDocumentType');
  },
  fetchSNILSMissingReasons(): Promise<AxiosResponse<RbSNILSMissingReasonResponse[]>> {
    return apiInstance.get('/refBooks/rbSNILSMissingReason');
  },
  fetchRelationTypes(): Promise<AxiosResponse<RbRelationTypeResponse[]>> {
    return apiInstance.get('/refBooks/rbRelationType');
  },
  fetchAttachTypes(): Promise<AxiosResponse<RbAttachTypeResponse[]>> {
    return apiInstance.get('/refBooks/rbAttachType');
  },
  fetchDetachmentReasons(): Promise<AxiosResponse<RbDetachmentReasonResponse[]>> {
    return apiInstance.get('/refBooks/rbDetachmentReason');
  },
  fetchCityDistricts(): Promise<AxiosResponse<any>> {
    return apiInstance.get('/refBooks/rbDistrict');
  },
  fetchOrgStructure(): Promise<AxiosResponse<RbOrgStructureResponse[]>> {
    return apiInstance.get('/refBooks/OrgStructure');
  },
  getRegionList(parent?: string, query?: string): Promise<AxiosResponse<RbKladrResponse[]>> {
    if (parent) {
      return apiInstance.get(`/kladr?parent=${parent}&name=${query}&limit=${10000}`);
    } else {
      return apiInstance.get(`/kladr`);
    }
  },
  getRegionStreets(
    id: string,
    query?: string
  ): Promise<AxiosResponse<RbKladrStreetResponse[]>> {
    return apiInstance.get(`/kladr/street?code=${id}&name=${query}&limit=${3500}`);
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
  fetchPolicyDischargeReason(): Promise<AxiosResponse<RbPolicyDischargeReason[]>> {
    return apiInstance.get('/refBooks/rbPolicyDischargeReason');
  },
  fetchSocialTypes(): Promise<AxiosResponse<RbSocialTypeResponse[]>> {
    return apiInstance.get(`/refBooks/vrbSocStatusType`);
  },
  fetchSocialClasses(): Promise<AxiosResponse<RbSocialClassResponse[]>> {
    return apiInstance.get(`/refBooks/rbSocStatusClass`);
  },
}

