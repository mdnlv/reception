import PatientResponse from '../../../interfaces/responses/patients/patient';
import transformPolicyResponse from './transformPolicyResponse';

export const transformPatientResponse = (item: PatientResponse) => {
  return {
    fullName: `${item.lastName} ${item.firstName} ${item.patrName}`,
    snils: item.SNILS,
    sex: item.sex,
    birthDate: item.birthDate ? item.birthDate : '',
    birthPlace: item.birthPlace,
    code: item.id,
    regAddress: '',
    livingAddress: '',
    notes: item.notes,

    work: item.client_work_info.map(item => ({
      id: item.id,
      freeInput: item.freeInput
    })),

    client_document_info: item.client_document_info && {
      givenBy: item.client_document_info.origin,
      fromDate: item.client_document_info.date,
      serial: item.client_document_info.serial,
      number: item.client_document_info.number,
      passportType: item.client_document_info.documentType_id,
    },

    socialStatus:
      item.client_social_status.map((item) => ({
        id: item.id,
        serialNumber: '',
        number: '',
        note: item.notes ?? '',
        class: item.socStatusClass_id?.toString(),
        type: item.socStatusType_id?.toString(),
        fromDate: item.begDate,
        endDate: item.endDate,
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
