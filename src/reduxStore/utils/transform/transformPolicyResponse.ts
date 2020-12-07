import PatientPolicyResponse from '../../../interfaces/responses/patients/patientPolicy';

const transformPolicyResponse = (item: PatientPolicyResponse) => {
  return {
    id: item.client_id,
    cmo: item.smoId?.toString() ?? '',
    serial: item.serial,
    number: item.number,
    timeType: '',
    from: item.begDate,
    to: item.endDate,
    type: item.policyType_id?.toString() ?? '',
    name: '',
    note: ''
  };
};

export default transformPolicyResponse;
