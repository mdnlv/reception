import {parseISO} from "date-fns";

import PatientResponse from '../../../interfaces/responses/patients/patient';
import transformPolicyResponse from './transformPolicyResponse';

export const transformPatientResponse = (item: PatientResponse) => {
  // console.log('BIRTH DATE', item.birthDate);
  const vahtStatus = item.client_soc_status_info.find((a) => a.socStatusClass_id === 51);
  return {
    code: item.id,
    fullName: `${item.lastName} ${item.firstName} ${item.patrName}`,
    birthDate: item.birthDate || '',
    growth: parseInt(item.growth),
    weight: parseInt(item.weight),
    sex: item.sex,
    snils: item.SNILS,
    SNILSMissingReason: item.SNILSMissing_id ? item.SNILSMissing_id.toString() : '',
    birthPlace: item.birthPlace,
    birthTime: item.birthTime?.substr(0,5),
    isShiftWorker: item.client_is_vaht || vahtStatus,

    client_document_info: item.client_document_info[0] ? {
      id: item.client_document_info[0].id,
      givenBy: item.client_document_info[0].origin,
      fromDate: item.client_document_info[0].date ? parseISO(item.client_document_info[0].date) : null,
      serialFirst: item.client_document_info[0].serial.substr(0,2),
      serialSecond: item.client_document_info[0].serial.substr(2),
      number: item.client_document_info[0].number,
      passportType: item.client_document_info[0].documentType_id.toString(),
    } : {
      id: null,
      givenBy: '',
      fromDate: '',
      serialFirst: '',
      serialSecond: '',
      number: '',
      passportType: '',
    },

    documents: item.client_document_info.length > 0
      ? item.client_document_info.map((item) => ({
          id: item.id,
          givenBy: item.origin,
          fromDate: item.date ? parseISO(item.date) : null,
          serialFirst: item.serial.substring(0, item.serial.length/2),
          serialSecond: item.serial.substring(item.serial.length/2, item.serial.length),
          number: item.number,
          passportType: item.documentType_id.toString(),
        }))
      : [],

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
        isVillager: item.isVillager,

        address: {
          addressHouseId: item.address.address_house.id,
          KLADRRegionCode: item.address.address_house.KLADRRegionCode,
          KLADRCode: item.address.address_house.KLADRCode,
          KLADRStreetCode: item.address.address_house.KLADRStreetCode,
          house: item.address.address_house.number,
          corpus: item.address.address_house.corpus,
          litera: item.address.address_house.litera,
          flat: item.address.flat,
          houseId: item.address.house_id,
        },
      })) || [],

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
      relativeName: item.relativeName,
    })),
  };
}
