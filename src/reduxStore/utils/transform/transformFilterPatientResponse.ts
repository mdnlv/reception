import FilterSearchPatientResponse from '../../../interfaces/responses/patients/filterSearchPatient';

export default function transformFilterPatientResponse(
  item: FilterSearchPatientResponse,
) {
  return {
    fullName: `${item.lastName} ${item.firstName} ${item.patrName}`,
    snils: item.SNILS,
    sex: item.sex,
    birthDate: item.birthDate ? item.birthDate : '',
    birthPlace: item.birthPlace,
    code: item.id,
    regAddress: '',
    livingAddress: '',

    policy: [],
    contacts: [],
    address: [],
  };
}
