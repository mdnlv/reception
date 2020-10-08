export interface PassportContactType {
  isMain: boolean;
  number: string;
  type: number;
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
  policyOms: {
    timeType: string;
    from: string;
    to: string;
    serial: string;
    number: string;
    cmo: string;
    type: string;
    name: string;
    note: string;
  };
  policyDms: {
    timeType: string;
    from: string;
    to: string;
    serial: string;
    number: string;
    cmo: string;
    type: string;
    name: string;
    note: string;
  };
}
