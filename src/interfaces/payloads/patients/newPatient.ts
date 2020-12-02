import { PersonAttachment } from '../../../components/forms/wizards/RegCardWizard/pages/Attachments/types';
import {EmploymentItem, EmploymentHazardItem} from "../../../components/forms/EmploymentForm/types";

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

  client_attachments?: PersonAttachment[];
  client_employment?: EmploymentItem[];
  client_hazard?: EmploymentHazardItem[];

  client_contact_info: {
    contactType_id: number;
    contact: string;
    isPrimary: 0 | 1;
    notes: string;
  }[],

  social_status_info: {
    type: number | null;
    class: number | null;
    begDate: string;
    endDate: string;
    notes: string | null;
  }[];

  client_policy_info: {
    id?: number | null;
    insurer_id: number | null;
    policyType_id: number | null;
    policyKind_id: number | null;
    begDate: string | null;
    endDate: string | null;
    name: string;
    note: string;
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
}
