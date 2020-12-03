import PatientPolicyResponse from '../../../interfaces/responses/patients/patientPolicy';

const transformPolicyResponse = (item: PatientPolicyResponse) => {
  return {
    id: item.id,
    from: item.begDate,
    to: item.endDate,
    name: item.name,
    serial: item.serial,
    number: item.number,
    type: item.policyType_id?.toString() ?? '',
    timeType: item.policyKind_id?.toString() ?? '',
    cmo: item.insurer_id?.toString() ?? '',
    note: '',
  };
}

export default transformPolicyResponse;
