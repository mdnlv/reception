import PatientDocumentResponse from "./patientDocument";

export interface DocFound extends PatientDocumentResponse {
  key?: number
}

export default interface PatientDocSearchResponse {
  documents: DocFound[];
}
