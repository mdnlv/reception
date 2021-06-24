import {parseISO} from "date-fns";

import PatientResponse from '../../../interfaces/responses/patients/patient';
import transformPolicyResponse from './transformPolicyResponse';

export const transformPatientResponse = (item: PatientResponse) => {
  // console.log('BIRTH DATE', item.birthDate);
  return {
    fullName: `${item.lastName} ${item.firstName} ${item.patrName}`,
    snils: item.SNILS,
    sex: item.sex,
    birthDate: item.birthDate || '',
    birthPlace: item.birthPlace,
    code: item.id,
    regAddress: '',
    livingAddress: '',
    growth: parseInt(item.growth),
    weight: parseInt(item.weight),
    notes: item.notes,
    chartBeginDate: item.chartBeginDate ? parseISO(item.chartBeginDate) : '',

    work: item.client_work_info[0].org_id || item.client_work_info[0].freeInput
      ? item.client_work_info.map(item => ({
          id: item.id,
          orgId: item.org_id,
          freeInput: item.freeInput,
          post: item.post,
          stage: item.stage,
          ...(item.client_work_hurt_info.length > 0 && {
            client_work_hurt_info: item.client_work_hurt_info.map(a => ({
              master_id: a.master_id,
              id: a.id,
              hurtTypeId: a.hurtType_id ? a.hurtType_id : '',
              stage: a.stage ? a.stage : 0
            }))
          }),
          ...(item.client_work_hurt_factor_info.length > 0 && {
            client_work_hurt_factor_info: item.client_work_hurt_factor_info.map(b => ({
              master_id: b.master_id,
              id: b.id,
              factorTypeId: b.factorType_id ? b.factorType_id : ''
            }))
          }),
          deleted: item.deleted,
        }))
      : [],

    client_document_info: item.client_document_info[0] && {
      id: item.client_document_info[0].id,
      givenBy: item.client_document_info[0].origin,
      fromDate: item.client_document_info[0].date ? parseISO(item.client_document_info[0].date) : null,
      serial: item.client_document_info[0].serial,
      number: item.client_document_info[0].number,
      passportType: item.client_document_info[0].documentType_id.toString(),
    },

    socialStatus:
      item.client_soc_status_info.map((i) => ({
        id: i.id,
        note: i.notes ?? '',
        class: i.socStatusClass_id?.toString(),
        type: i.socStatusType_id?.toString(),
        fromDate: i.begDate ? parseISO(i.begDate) : '',
        endDate: i.endDate ? parseISO(i.endDate) : '',
        document: Object.keys(i.document).length
          ? {
            id: i.document?.documentType_id,
            serial: i.document?.serial,
            number: i.document?.number,
            date: i.document?.date ? parseISO(i.document?.date) : '',
            origin: i.document?.origin
          } : {
            id: 1,
            serial: '',
            number: '',
            date: '',
            origin: ''
          },
        deleted: 0,
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
          addressHouseId: item.address.address_house.id,
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

    attachments: item.client_attach_info.map((item) => ({
      id: item.id,
      deleted: 0,
      type: item.attachType_id,
      lpu: item.LPU_id,
      unit: item.orgStructure_id || '',
      fromDate: item.begDate,
      endDate: item.endDate,
      detachmentReason: item.detachment_id,
    })),

    relations: item.client_relation_info.map((item) => ({
      id: item.id,
      deleted: 0,
      relativeTypeId: item.relativeType_id,
      relativeId: item.relative_id,
      clientId: item.client_id,
    })),
  };
}
