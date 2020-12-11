export default interface PatientPolicyResponse {
  client_id: number;
  insurer_id: number;
  serial: string;
  number: string;
  policyType_id: number;
  begDate: string;
  endDate: string;
}
