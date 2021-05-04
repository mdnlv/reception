export default interface PatientDocumentResponse {
  id: number;
  createDatetime: string;
  createPerson_id: number;
  modifyDatetime: string;
  modifyPerson_id: number;
  deleted: number;
  client_id: number;
  documentType_id: number;
  serial: string;
  number: string;
  date: string | null;
  origin: string;
  endDate: string | null;
}
