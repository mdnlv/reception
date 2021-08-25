export default interface PatientRelationResponse {
  id: number;
  createDatetime: string;
  createPerson_id: number;
  modifyDatetime: string;
  modifyPerson_id: number;
  deleted: 0 | 1;
  client_id: number;
  relativeType_id: number;
  relative_id: number;
  freeInput: string | null;
  relativeName: string;
}
