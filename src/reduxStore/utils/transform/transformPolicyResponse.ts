import {parseISO} from "date-fns";

import PatientPolicyResponse from '../../../interfaces/responses/patients/patientPolicy';

const transformPolicyResponse = (item: PatientPolicyResponse) => {
  return {
    itemId: item.id,
    id: item.client_id,
    cmo: item.insurer_id?.toString() ?? '',
    serial: item.serial,
    number: item.number,
    timeType: item.policyKind_id?.toString() ?? '',
    from: item.begDate ? parseISO(item.begDate) : '',
    to: item.endDate ? parseISO(item.endDate) : '',
    type: item.policyType_id?.toString() ?? '',
    name: item.name,
    note: item.note,
    deleted: item.deleted,
  };
};

export default transformPolicyResponse;
