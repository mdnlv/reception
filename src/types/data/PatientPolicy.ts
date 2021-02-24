export default interface PatientPolicy<Array> {
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
  type: number | undefined,
}
