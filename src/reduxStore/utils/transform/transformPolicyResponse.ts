import PatientPolicyResponse from '../../../interfaces/responses/patients/patientPolicy';

const transformPolicyResponse = (item: PatientPolicyResponse) => {
  return {
    id: item.id,
    cmoArea: item.insuranceArea,
    cmo: item.insurer_id?.toString() ?? '',
    serial: item.policyType_id === 1 ? 'ВС' : item.policyType_id === 3 ? 'ЕП' : item.serial,
    number: item.number,
    timeType: item.policyKind_id?.toString() ?? '',
    from: item.begDate ? item.begDate : '',
    to: item.endDate ? item.endDate : '',
    type: item.policyType_id?.toString() ?? '',
    name: item.name,
    note: item.note,
    deleted: item.deleted,
    inn: '',
    ogrn: '',
    infisCode: '',
    smoShort: '',
    enp: item.enp,
    cancelReason: item.discharge_id,
  };
};

export default transformPolicyResponse;
