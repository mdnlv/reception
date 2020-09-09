export default interface PatientContactResponse {
  id: number;
  createDatetime: string;
  createPerson_id: number | null;
  modifyDatetime: string;
  modifyPerson_id: number | null;
  deleted: 0 | 1;
  client_id: number;
  contactType_id: number;
  isPrimary: number;
  contact: string;
  notes: string;
  agreement: string;
}
