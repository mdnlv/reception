import {parseISO} from "date-fns";

import PatientPolicyResponse from '../../../interfaces/responses/patients/patientPolicy';

const transformPolicyResponse = (item: PatientPolicyResponse) => {
  return {
    id: item.id,
    cmoArea: item.insuranceArea,
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
    inn: '',
    ogrn: '',
    infisCode: '',
    smoShort: '',
  };
};

export default transformPolicyResponse;
