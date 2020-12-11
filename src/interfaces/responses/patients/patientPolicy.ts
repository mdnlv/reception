export default interface PatientPolicyResponse {
  client_id: number;
  smoId: number;
  policySerial: string;
  policyNumber: string;
  policyTypeId: number;
  begDate: string;
  endDate: string;
  attach?: string;
  attachList?: number[][];
}
