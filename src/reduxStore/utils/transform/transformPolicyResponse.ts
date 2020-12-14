import PatientPolicyResponse from '../../../interfaces/responses/patients/patientPolicy';

const transformPolicyResponse = (item: PatientPolicyResponse) => {
  return {
    id: item.client_id,
    cmo: item.insurer_id?.toString() ?? '',
    serial: item.serial,
    number: item.number,
    timeType: item.policyKind_id?.toString() ?? '',
    from: item.begDate,
    to: item.endDate,
    type: item.policyType_id?.toString() ?? '',
    name: '',
    note: ''
  };
};

export default transformPolicyResponse;
