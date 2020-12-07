import { PersonAttachment } from '../../../components/forms/wizards/RegCardWizard/pages/Attachments/types';
import {EmploymentItem, EmploymentHazardItem} from "../../../components/forms/EmploymentForm/types";
import {PersonViewType} from "../../../components/forms/PersonViewTypeForm/types";
import {PersonFeatureItem, PersonAllergyItem, MedIntoleranceItem, InspectionItem, AnthropometricDataItem} from "../../../components/forms/FeaturesForm/types";
import {PrivilegeItem, PrivilegeInvalidity} from "../../../components/forms/PrivilegesForm/types";
import {PersonOffence} from "../../../components/forms/OffencesForm/types";
import {PersonLink} from "../../../components/forms/PersonLinksForm/types";
import {PersonAddHospitalization} from "../../../components/forms/AdditionalHospitalizationForm/types";
import {PersonHospitalization} from "../../../components/forms/OutsideHospitalizationForm/types";
import {PersonOutsideId} from "../../../components/forms/OutsideIdentificationForm/types";
import {EtcItem} from "../../../components/forms/EtcForm/types";
import {NamedDoc, PassportDoc, PolicyDoc, SocialStatus} from "../../../components/forms/PersonDocumentsForm/types";

export default interface NewPatientPayload {
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
  hasImplants: boolean,
  hasProsthesis: boolean,
  docPersonId: string;
  startCardDate: string;
  hasCard: boolean;
  onlyTempRegistration: boolean;

  client_view_types?: PersonViewType[];
  client_features?: PersonFeatureItem[];
  client_allergy?: PersonAllergyItem[];
  client_med_intolerance?: MedIntoleranceItem[];
  client_inspections?: InspectionItem[];
  client_anthropometric?: AnthropometricDataItem[];
  client_privileges?: PrivilegeItem[];
  client_invalidity?: PrivilegeInvalidity[];
  client_offences?: PersonOffence[];
  client_relative_info?: PersonLink[];
  client_additional_hospitalization: PersonAddHospitalization[];
  client_outside_hospitalization: PersonHospitalization[];
  client_outside_identification: PersonOutsideId[];
  client_etc: EtcItem[];
  client_id_doc: PassportDoc[];
  client_policy: PolicyDoc[];
  client_named_doc: NamedDoc[];

  client_contact_info: {
    contactType_id: number;
    contact: string;
    isPrimary: 0 | 1;
    notes: string;
  }[],

  client_soc_status_info: {
    socStatusType_id: number | null;
    socStatusClass_id: number | null;
    begDate: string;
    endDate: string;
    notes: string | null;
  }[];

  client_work_info: {
    org_id: number;
    post: string;
    stage: number;
    client_work_hurt_info: {
      hurtType_id: number;
      stage: number;
    }[];
    client_work_hurt_factor_info: {
      factorType_id: number;
    }[];
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
    address: {
      address_house: {
        KLADRCode: string;
        KLADRStreetCode?: string;
        number: string;
        corpus: string;
        litera: string;
      };
      flat: string;
    };
    isVillager: number,
    type: number;
  }[];

  client_relation_info?: {
    relativeType_id: number;
    relative_id: number;
  }[]

  client_attach_info?: {
    LPU_id: number;
    attachType_id: number;
    begDate: string;
    orgStructure_id: number;
    reason: number;
  }[]
}
