import PatientRelation from "../regCard/PatientRelation";
import PatientContact from "../regCard/PatientContact";
import PatientAttach from "../regCard/PatientAttach";

export default interface NewPatientPayload {
  id?: number;
  lastName: string;
  firstName: string;
  patrName: string;
  birthDate: string;
  birthTime: string | null;
  sex: 1 | 2 | null;
  SNILS: string;
  SNILSMissing_id: number | null;
  growth: string;
  weight: string;
  birthPlace: string;

  client_contact_info: PatientContact[];

  client_policy_info: {
    insurer_id: number | null;
    policyType_id: number | null;
    policyKind_id: number | null;
    begDate: string | null;
    endDate: string | null;
    name?: string;
    note?: string;
    number: string;
    serial: string;
    deleted?: 0 | 1;
  }[];

  client_document_info: {
    documentType_id: number;
    serial: string;
    number: string;
    date: string;
    endDate: string;
    origin: string;
    deleted?: 0 | 1;
  }[];

  client_address_info?: {
    address?: {
      address_house: {
        id?: number;
        KLADRCode: string;
        KLADRStreetCode?: string;
        number: string;
        corpus: string;
        litera: string;
      };
      flat: string;
      house_id?: number;
      id?: number;
    };
    id?: number;
    isIdenticalAddresses?: 1 | 0;
    freeInput: string;
    isVillager: 1 | 0,
    type: number;
  }[];

  client_relation_info?: PatientRelation[];
  client_attach_info?: PatientAttach[];
}
