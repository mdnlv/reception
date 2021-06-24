import PatientRelation from "../regCard/PatientRelation";

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

  client_contact_info: {
    contactType_id: number;
    contact: string;
    isPrimary: 0 | 1;
    notes: string;
    deleted?: 0 | 1;
  }[],

  client_soc_status_info: {
    socStatusType_id: number | null;
    socStatusClass_id: number | null;
    begDate: string;
    endDate: string;
    notes: string | null;
    deleted?: 0 | 1;
  }[];

  client_work_info: {
    id?: number;
    org_id?: number;
    post?: string;
    stage?: number;
    freeInput?: string;
    client_work_hurt_info: {
      master_id?: number;
      id?: number;
      hurtType_id?: number;
      stage?: number;
    }[];
    client_work_hurt_factor_info: {
      master_id?: number;
      id?: number;
      factorType_id?: number;
    }[];
    deleted?: 0 | 1;
  }[];

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
    documentType_id: string;
    serial: string;
    number: string;
    date: string;
    endDate: string;
    origin: string;
  }[];

  client_address_info?: {
    address?: {
      address_house: {
        KLADRCode: string;
        KLADRStreetCode?: string;
        number: string;
        corpus: string;
        litera: string;
      };
      flat: string;
    };
    isIdenticalAddresses?: 1 | 0;
    freeInput: string;
    isVillager: number,
    type: number;
  }[];

  client_relation_info?: PatientRelation[];

  client_attach_info?: {
    LPU_id: number;
    attachType_id: number;
    begDate: string;
    orgStructure_id: number;
    detachment_id: number | null;
    deleted?: 0 | 1;
  }[];

  client_identification_info?: {
    accountingSystem_id: number;
    checkDate: string;
    identifier: string;
    deleted?: 0 | 1;
  }[];
}
