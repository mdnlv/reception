export default interface PatientPolicyResponse {
  id: number;
  client_id: number;
  insurer_id: number;
  serial: string;
  number: string;
  insuranceArea: string;
  policyType_id: number;
  policyKind_id: number;
  begDate: string;
  endDate: string;
  name: string;
  note: string;
  deleted: 0 | 1;
  enp: string | null;
}
