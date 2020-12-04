import PatientPolicyResponse from '../../../interfaces/responses/patients/patientPolicy';

const transformPolicyResponse = (item: PatientPolicyResponse) => {
  return {
    id: item.client_id,
    cmo: item.smoId?.toString() ?? '',
    serial: item.policySerial,
    number: item.policyNumber,
    timeType: '',
    from: item.begDate,
    to: item.endDate,
    type: item.policyTypeId?.toString() ?? '',
    name: '',
    note: ''
  };
};

export default transformPolicyResponse;
