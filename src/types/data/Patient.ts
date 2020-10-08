import PatientAddress from './PatientAddress';
import PatientPolicy from './PatientPolicy';
import PatientContact from './PatientContact';

export default interface Patient {
  fullName: string;
  birthDate: string;
  code: number;
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
  note?: string;
  eisAcceptDate?: string;
  misRegDate?: string;
  medExamination?: string;

  address: PatientAddress[];
  policy: PatientPolicy[];
  contacts: PatientContact[];
}
