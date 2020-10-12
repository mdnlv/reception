export interface PassportContactType {
  isMain: boolean;
  number: string;
  type: string;
  note: string;
}

export interface PassportPolicyType {
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
      isKLADR: boolean;
      city: string;
      area: string;
      street: string;
      houseNumber?: number;
      houseCharacter?: number;
      flatNumber?: number;
      isDocumentedAddress: boolean;
      freeInput: string;
    };

    documentedAddress: {
      isKLADR: boolean;
      city: string;
      area: string;
      street: string;
      houseNumber?: number;
      houseCharacter?: number;
      flatNumber?: number;
      isDocumentedAddress: boolean;
      freeInput: string;
    };
  };
  contacts: PassportContactType[];
  policyOms: PassportPolicyType[];
  policyDms: PassportPolicyType[];
}
