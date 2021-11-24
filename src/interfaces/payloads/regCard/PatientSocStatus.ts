export default interface PatientSocStatus {
  id?: number;
  socStatusType_id: number | null;
  socStatusClass_id: number | null;
  begDate: string;
  endDate: string;
  notes: string | null;
  deleted?: 0 | 1;
  document: {
    id?: number;
    date: string;
    documentType_id: number | null;
    number: string;
    origin: string;
    serial: string;
  }
}

