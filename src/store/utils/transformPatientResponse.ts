import PatientResponse from '../../interfaces/responses/patients/patient';

export default function transformPatientResponse(item: PatientResponse) {
  return {
    fullName: `${item.lastName} ${item.firstName} ${item.patrName}`,
    snils: item.SNILS,
    sex: item.sex,
    birthDate: new Date(item.birthDate),
    birthPlace: item.birthPlace,
    code: item.id,
    regAddress: '',
    livingAddress: '',

    policy: item.client_policy_info.map((item) => ({
      id: item.id,
      begDate: item.begDate,
      endDate: item.endDate,
      name: item.name,
      serial: item.serial,
      number: item.number,
      policyTypeId: item.policyType_id,
      policyKindId: item.policyKind_id,
      insurerId: item.insurer_id,
      clientId: item.client_id,
    })),

    contacts: item.client_contact_info
      .filter((item) => item.deleted === 0)
      .map((item) => ({
        id: item.id,
        isPrimary: item.isPrimary,
        contactTypeId: item.contactType_id,
        note: item.notes,
        contact: item.contact,
      })),

    address: item.client_address_info.map((item) => ({
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
      },
    })),
  };
}
