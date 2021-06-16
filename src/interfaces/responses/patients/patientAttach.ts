export default interface PatientAttachResponse {
  id: number;
  createDatetime: string;
  createPerson_id: number;
  modifyDatetime: string;
  modifyPerson_id: number;
  deleted: 0;
  client_id: number;
  attachType_id: number;
  LPU_id: number;
  orgStructure_id: number;
  begDate: string | null;
  endDate: string | null;
  document_id: number | null;
  detachment_id: number | null;
  sentToTFOMS: number;
  errorCode: number | null;
  reason: number;
}
