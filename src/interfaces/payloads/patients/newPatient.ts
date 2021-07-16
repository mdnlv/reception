import PatientRelation from "../regCard/PatientRelation";
import PatientContact from "../regCard/PatientContact";
import PatientSocStatus from "../regCard/PatientSocStatus";
import PatientWork from "../regCard/PatientWork";
import PatientAttach from "../regCard/PatientAttach";
import PatientIdInfo from "../regCard/PatientIdInfo";

export default interface NewPatientPayload {
  id?: number;
  lastName: string;
  firstName: string;
  patrName: string;
  birthDate: string;
  birthTime: string | null;
  sex: 1 | 2;
  SNILS: string;
  growth: string;
  weight: string;
  birthPlace: string;
  chartBeginDate: string | Date;
  // hasImplants: boolean,
  // hasProsthesis: boolean,
  // docPersonId: string;
  // hasCard: boolean;
  // onlyTempRegistration: boolean;

  // client_view_types?: PersonViewType[];
  // client_features?: PersonFeatureItem[];
  // client_allergy?: PersonAllergyItem[];
  // client_med_intolerance?: MedIntoleranceItem[];
  // client_inspections?: InspectionItem[];
  // client_anthropometric?: AnthropometricDataItem[];
  // client_privileges?: PrivilegeItem[];
  // client_invalidity?: PrivilegeInvalidity[];
  // client_offences?: PersonOffence[];
  // client_relative_info?: PersonLink[];
  // client_additional_hospitalization: PersonAddHospitalization[];
  // client_outside_hospitalization: PersonHospitalization[];
  // client_etc: EtcItem[];
  // client_id_doc: PassportDoc[];
  // client_policy: PolicyDoc[];
  // client_named_doc: NamedDoc[];

  client_contact_info: PatientContact[];
  client_soc_status_info: PatientSocStatus[];
  client_work_info: PatientWork[];

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
  client_identification_info?: PatientIdInfo[];
}
