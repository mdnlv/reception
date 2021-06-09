import {parseISO} from "date-fns";

import PatientResponse from '../../../interfaces/responses/patients/patient';
import transformPolicyResponse from './transformPolicyResponse';

export const transformPatientResponse = (item: PatientResponse) => {
  // console.log('BIRTH DATE', item.birthDate);
  return {
    fullName: `${item.lastName} ${item.firstName} ${item.patrName}`,
    snils: item.SNILS,
    sex: item.sex,
    birthDate: item.birthDate,
    birthPlace: item.birthPlace,
    code: item.id,
    regAddress: '',
    livingAddress: '',
    growth: parseInt(item.growth),
    weight: parseInt(item.weight),
    notes: item.notes,
    chartBeginDate: item.chartBeginDate ? parseISO(item.chartBeginDate) : '',

    work: item.client_work_info[0].org_id && item.client_work_info[0].freeInput
      ? item.client_work_info.map(item => ({
          itemId: item.id,
          id: item.org_id,
          freeInput: item.freeInput,
          post: item.post,
          stage: item.stage,
          ...(item.client_work_hurt_info.length > 0 && {
            client_work_hurt_info: item.client_work_hurt_info.map(item => ({
              hurtTypeId: item.hurtType_id ? item.hurtType_id : '',
              stage: item.stage ? item.stage : 0
            }))
          }),
          ...(item.client_work_hurt_factor_info.length > 0 && {
            client_work_hurt_factor_info: item.client_work_hurt_factor_info.map(item => ({
              factorTypeId: item.factorType_id ? item.factorType_id : ''
            }))
          }),
          deleted: item.deleted,
        }))
      : [],

    client_document_info: item.client_document_info[0] && {
      id: item.id,
      givenBy: item.client_document_info[0].origin,
      fromDate: item.client_document_info[0].date ? parseISO(item.client_document_info[0].date) : null,
      serial: item.client_document_info[0].serial,
      number: item.client_document_info[0].number,
      passportType: item.client_document_info[0].documentType_id.toString(),
    },

    socialStatus:
      item.client_soc_status_info.map((item) => ({
        id: item.id,
        serialNumber: '',
        number: '',
        note: item.notes ?? '',
        class: item.socStatusClass_id?.toString(),
        type: item.socStatusType_id?.toString(),
        fromDate: item.begDate ? parseISO(item.begDate) : '',
        endDate: item.endDate ? parseISO(item.endDate) : '',
        document: Object.keys(item.document).length
          ? {
            id: item.document?.documentType_id,
            serial: item.document?.serial,
            number: item.document?.number,
            date: item.document?.date ? parseISO(item.document?.date) : '',
            origin: item.document?.origin
          } : null,
        deleted: item.deleted,
      })) || [],

    policy:
      item.client_policy_info.map((item) => transformPolicyResponse(item)) ||
      [],

    contacts:
      item.client_contact_info
        .filter((item) => item.deleted === 0)
        .map((item) => ({
          id: item.id,
          isPrimary: item.isPrimary,
          contactTypeId: item.contactType_id,
          note: item.notes,
          contact: item.contact,
          deleted: item.deleted,
        })) || [],

    address:
      item.client_address_info.map((item) => ({
        id: item.id,
        addressId: item.address_id,
        freeInput: item.freeInput,
        districtId: item.district_id,
        type: item.type,

        address: {
          id: item.address.id,
          KLADRCode: item.address.address_house.KLADRCode,
          KLADRStreetCode: item.address.address_house.KLADRStreetCode,
          house: item.address.address_house.number,
          corpus: item.address.address_house.corpus,
          litera: item.address.address_house.litera,
          flat: item.address.flat
        },
      })) || [],

    outsideIds: item.client_identification_info.map((item) => ({
      id: item.id,
      outsideSchema: item.accountingSystem_id,
      idRef: item.identifier,
      date: item.checkDate,
      deleted: item.deleted,
    })),
  };
}
