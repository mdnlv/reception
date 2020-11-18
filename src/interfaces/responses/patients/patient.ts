import AddressResponse from './patientAddress';
import PatientContactResponse from './patientContact';
import PatientPolicyResponse from './patientPolicy';
import PatientSocialStatusResponse from './patientSocialStatus';

export default interface PatientResponse {
  id: number;
  createDatetime: Date | null;
  createPerson_id: number | null;
  modifyDatetime: Date | null;
  modifyPerson_id: number | null;
  attendingPerson_id: null | number;
  deleted: 0 | 1;
  lastName: string;
  firstName: string;
  patrName: string;
  birthDate: string;
  birthTime: Date | null;
  sex: 1 | 2;
  SNILS: string;
  bloodType_id: number | null;
  bloodDate: Date | null;
  bloodNotes: string;
  growth: string;
  weight: string;
  embryonalPeriodWeek: string;
  birthPlace: string;
  chronicalMKB: string;
  diagNames: string;
  chartBeginDate: Date;
  rbInfoSource_id: null | number;
  notes: string;
  IIN: string;
  isConfirmSendingData: 0 | 1;
  isUnconscious: 0 | 1;
  filial: number;
  dataTransferConfirmationDate: Date | null;
  uuid_id: number;
  version: number;

  client_address_info: AddressResponse[];

  client_social_status: PatientSocialStatusResponse[];

  client_document_info: {
    documentType_id: string;
    serial: string;
    number: string;
    date: string;
    endDate: string;
    origin: string;
  };

  client_policy_info: PatientPolicyResponse[];
  client_contact_info: PatientContactResponse[];

  client_work_info?: [];
}
