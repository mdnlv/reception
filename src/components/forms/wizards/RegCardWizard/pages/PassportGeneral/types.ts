import PatientPolicy from '../../../../../../types/data/PatientPolicy';

export interface PassportContactType {
  isMain: boolean;
  number: string;
  type: string;
  note: string;
}

export interface PassportPolicyType {
  id?: number;
  timeType: string;
  from: string;
  to: string;
  serial: string;
  number: string;
  cmo: string;
  type: string;
  name: string;
  note: string;
}

export default interface FormState {
  passportInfo: {
    passportType: string;
    serial: string;
    number: string;
    fromDate: string;
    givenBy: string;

    addressRegistration: {
      [key: string]: any;
      isKLADR: boolean;
      city: string;
      area?: string;
      street?: string;
      houseNumber?: string | number;
      houseCharacter?: string | number;
      flatNumber: string | null | number;
      isDocumentedAddress: boolean;
      freeInput: string;
    };

    documentedAddress: {
      [key: string]: any;
      isKLADR: boolean;
      city: string;
      area?: string;
      street?: string;
      houseNumber?: string | number;
      houseCharacter?: string | number;
      flatNumber: string | null | number;
      isDocumentedAddress: boolean;
      freeInput: string;
    };
  };
  contacts: PassportContactType[];
  policyOms: PassportPolicyType[];
  policyDms: PassportPolicyType[];
}
