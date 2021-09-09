export default interface PatientSocialStatusResponse {
  document: {
    id: number;
    documentType_id?: number;
    serial?: string;
    number?: string;
    date?: string;
    origin?: string;
  } | {};
  id: number;
  deleted: 0;
  socStatusType_id: number;
  socStatusClass_id: number;
  begDate: string;
  endDate: string;
  notes: string | null;
}
