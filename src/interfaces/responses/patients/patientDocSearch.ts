import PatientDocumentResponse from "./patientDocument";

export interface DocFound extends PatientDocumentResponse {
  key?: number;
  enabled?: boolean;
}

export default interface PatientDocSearchResponse {
  documents: DocFound[];
  snils: string[];
}
