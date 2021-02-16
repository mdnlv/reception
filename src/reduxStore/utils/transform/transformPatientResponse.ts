import {format, parseISO} from "date-fns";

import PatientResponse from '../../../interfaces/responses/patients/patient';
import transformPolicyResponse from './transformPolicyResponse';

export const transformPatientResponse = (item: PatientResponse) => {
  return {
    fullName: `${item.lastName} ${item.firstName} ${item.patrName}`,
    snils: item.SNILS,
    sex: item.sex,
    birthDate: item.birthDate ? format(parseISO(item.birthDate), 'dd.MM.yyyy') : '',
    birthPlace: item.birthPlace,
    code: item.id,
    regAddress: '',
    livingAddress: '',
    growth: parseInt(item.growth),
    weight: parseInt(item.weight),
    notes: item.notes,
    chartBeginDate: item.chartBeginDate ? parseISO(item.chartBeginDate) : '',

    work: item.client_work_info.map(item => ({
      id: item.org_id,
      freeInput: item.freeInput,
      post: item.post,
      stage: item.stage,
      client_work_hurt_info:
        item.client_work_hurt_info.length > 0
          ? item.client_work_hurt_info.map(item => ({
              hurtTypeId: item.hurtType_id ? item.hurtType_id : '',
              stage: item.stage ? item.stage : 0
            }))
          : [],
      client_work_hurt_factor_info:
        item.client_work_hurt_factor_info.length > 0
          ? item.client_work_hurt_factor_info.map(item => ({
            factorTypeId: item.factorType_id ? item.factorType_id : ''
          }))
          : []
    })),

    client_document_info: item.client_document_info && {
      givenBy: item.client_document_info.origin,
      fromDate: parseISO(item.client_document_info.date),
      serial: item.client_document_info.serial,
      number: item.client_document_info.number,
      passportType: item.client_document_info.documentType_id,
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
          } : null
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
  };
}
