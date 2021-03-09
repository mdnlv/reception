export interface PassportContactType {
  isMain: boolean;
  number: string;
  type: string;
  note: string;
}

export interface PassportPolicyType {
  timeType?: string;
  from: string;
  to: string;
  serial: string;
  number: string;
  cmo: string;
  type: string;
  name?: string;
  note?: string;
}

export interface PassportAddressType {
  [key: string]: any;
  isKLADR: boolean;
  city: string;
  area: string;
  street?: string;
  houseNumber?: string | number;
  houseCharacter?: string | number;
  flatNumber?: string | null | number;
  isDocumentedAddress: boolean;
  freeInput: string;
}

export default interface FormState {
  passportInfo: {
    passportType: string;
    serialFirst?: string;
    serialSecond: string;
    number?: string;
    fromDate?: any;
    givenBy?: string;
    serial?:string;
    addressRegistration: PassportAddressType;
    documentedAddress: PassportAddressType;
    
  };
  contacts: PassportContactType[];
  policyOms: {
    id?: number;
    timeType?: string;
    from: string | Date;
    to: string | Date;
    serial: string;
    number: string;
    cmo: string;
    type: string;
    name?: string;
    note?: string;
  };
  policyDms: {
    id?: number;
    timeType?: string;
    from: string | Date;
    to: string | Date;
    serial: string;
    number: string;
    cmo: string;
    type: string;
    name?: string;
    note?: string;
  };
}
