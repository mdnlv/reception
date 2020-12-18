import PatientPolicyResponse from '../../../interfaces/responses/patients/patientPolicy';
import {toRusFormat} from "../../../utils/date/toRusFormat";

const transformPolicyResponse = (item: PatientPolicyResponse) => {
  return {
    id: item.client_id,
    cmo: item.insurer_id?.toString() ?? '',
    serial: item.serial,
    number: item.number,
    timeType: item.policyKind_id?.toString() ?? '',
    from: toRusFormat(item.begDate),
    to: toRusFormat(item.endDate),
    type: item.policyType_id?.toString() ?? '',
    name: item.name,
    note: item.note
  };
};

export default transformPolicyResponse;
