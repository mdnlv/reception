export default interface PatientSocialStatusResponse {
  id: number;
  socStatusType_id: number;
  socStatusClass_id: number;
  begDate: string;
  endDate: string;
  notes: string | null;
  document: {
    id: number;
    documentType_id?: number;
    serial?: string;
    number?: string;
    date?: string;
    origin?: string;
  }
  deleted: 0;
}
