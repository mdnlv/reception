export default interface PatientSocialStatusResponse {
  id: number;
  socStatusType_id: number;
  socStatusClass_id: number;
  begDate: string;
  endDate: string;
  notes: string | null;
}
