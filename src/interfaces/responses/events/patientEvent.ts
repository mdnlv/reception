export default interface PatientEventResponse {
  id: number;
  createDatetime: string | null;
  createPerson_id: number | null;
  eventType_id: number;
  setDate?: Date;
  setPerson_id: number | null;
  note: string;
  externalId: string;
  contract_id: number | null;
  prevEventDate: string | null;
  isPrimary: 0 | 1;
  result_id: number | null;
  typeAsset_id: number | null;
}
