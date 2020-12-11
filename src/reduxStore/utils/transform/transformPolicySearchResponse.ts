import PatientPolicySearchResponse from "../../../interfaces/responses/patients/patientPolicySearch";

const transformPolicySearchResponse = (item: PatientPolicySearchResponse) => {
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

export default transformPolicySearchResponse;
