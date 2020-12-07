export default interface PatientPolicyResponse {
  client_id: number;
  smoId: number;
  serial: string;
  number: string;
  policyType_id: number;
  begDate: string;
  endDate: string;
  attach?: string;
  attachList?: number[][];
}
