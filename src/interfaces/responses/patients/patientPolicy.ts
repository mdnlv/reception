export default interface PatientPolicyResponse {
  id: number;
  begDate: string;
  endDate: string;
  name: string;
  serial: string;
  number: string;
  policyType_id: number;
  policyKind_id: number;
  insurer_id: number;
  client_id: number;
}
