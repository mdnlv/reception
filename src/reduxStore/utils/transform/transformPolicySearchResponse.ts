import {parseISO} from "date-fns";

import PatientPolicySearchResponse from "../../../interfaces/responses/patients/patientPolicySearch";

const transformPolicySearchResponse = (item: PatientPolicySearchResponse) => {
  return {
    id: 0,
    cmo: item.smoId.id?.toString() ?? '',
    serial: item.policySerial,
    number: item.policyNumber,
    timeType: item.policySerial === 'ЕП' ? '3' : item.policySerial === 'ВС' ? '1' : '',
    from: item.begDate ? parseISO(item.begDate) : '',
    to: item.endDate ? parseISO(item.endDate) : '',
    type: '',
    name: '',
    note: '',
    enp: item.enp,
    attachList: item.attachList,
  };
};

export default transformPolicySearchResponse;
