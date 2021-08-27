import PatientAddress from './PatientAddress';
import PatientPolicy from './PatientPolicy';
import PatientContact from './PatientContact';
import PatientDocument from "./PatientDocument";
import PatientAttach from "./PatientAttach";

export default interface Patient {
  fullName: string;
  birthDate: string;
  code: number;
  id: string;
  quotes?: string[];
  medicalAttachment?: string;
  snils: string;
  sex: 1 | 2;
  doc?: string;
  policyOMC?: string;
  regAddress: string;
  livingAddress: string;
  employment?: string;
  phone?: Map<string, string>[];
  birthPlace?: string;
  notes?: string;
  eisAcceptDate?: string;
  misRegDate?: string;
  medExamination?: string;

  address: PatientAddress[];
  policy: PatientPolicy[];
  contacts: PatientContact[];
  client_document_info: PatientDocument;
  attachments: PatientAttach[];
}
