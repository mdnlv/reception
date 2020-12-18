import PatientPolicySearchResponse from "../../../interfaces/responses/patients/patientPolicySearch";
import {toRusFormat} from "../../../utils/date/toRusFormat";

const transformPolicySearchResponse = (item: PatientPolicySearchResponse) => {
  return {
    id: item.client_id,
    cmo: item.smoId?.toString() ?? '',
    serial: item.policySerial,
    number: item.policyNumber,
    timeType: '',
    from: toRusFormat(item.begDate),
    to: toRusFormat(item.endDate),
    type: item.policyTypeId?.toString() ?? '',
    name: '',
    note: ''
  };
};

export default transformPolicySearchResponse;
