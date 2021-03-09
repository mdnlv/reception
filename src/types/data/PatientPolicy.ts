export default interface  PatientPolicy {
  id: number;
  begDate: string;
  endDate: string;
  name: string;
  serial: string;
  number: string;
  policyTypeId: number;
  policyKindId: number;
  insurerId: number;
  clientId: number;
  from: number | Date,
  to: number | Date,
  type: number | undefined,
}
