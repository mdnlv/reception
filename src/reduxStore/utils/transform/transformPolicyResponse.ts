import PatientPolicyResponse from '../../../interfaces/responses/patients/patientPolicy';

export default function transformPolicyResponse(item: PatientPolicyResponse) {
  return {
    id: item.id,
    begDate: item.begDate,
    endDate: item.endDate,
    name: item.name,
    serial: item.serial,
    number: item.number,
    policyTypeId: item.policyType_id,
    policyKindId: item.policyKind_id,
    insurerId: item.insurer_id,
    clientId: item.client_id,
  };
}
