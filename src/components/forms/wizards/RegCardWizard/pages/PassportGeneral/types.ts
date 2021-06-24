import {Modify} from "../../../../../../types/modify";

export interface PassportContactType {
  [key: string]: any;
  id?: number;
  isMain: boolean;
  number: string;
  type: string;
  note: string;
  deleted?: 0;
}

export interface PassportContactTypeDeleted extends Modify<PassportContactType, {
  deleted?: 1;
}> {}

export interface PolicyAttachesType {
  mo: {
    id: number;
    shortName: string;
  };
  net: {
    id: number;
    code: string;
    name: string;
  };
}

export interface PassportPolicyType {
  id?: number;
  timeType?: string;
  from: string;
  to: string;
  serial: string;
  number: string;
  cmo: string;
  type: string;
  name?: string;
  note?: string;
  attachList?: PolicyAttachesType[];
  deleted?: 0 | 1;
}

export interface PassportAddressType {
  [key: string]: any;
  id?: number;
  addressId?: number;
  addressHouseId?: number;
  isKLADR: boolean;
  city: string;
  area: string;
  street?: string;
  houseNumber?: string | number;
  houseCharacter?: string | number;
  flatNumber?: string | null | number;
  isDocumentedAddress: boolean;
  freeInput: string;
  isVillager: boolean;
}

export default interface FormState {
  passportInfo: {
    id?: number;
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
  contacts: {
    contacts: PassportContactType[];
    deleted: PassportContactTypeDeleted[];
  };
  policyOms: {
    id?: number;
    timeType?: string;
    cmoArea?: string;
    from: string | Date;
    to: string | Date;
    serial: string;
    number: string;
    cmo: string;
    type: string;
    name?: string;
    note?: string;
    deleted?: 0 | 1;
  };
  policyDms: {
    id?: number;
    timeType?: string;
    cmoArea?: string;
    from: string | Date;
    to: string | Date;
    serial: string;
    number: string;
    cmo: string;
    type: string;
    name?: string;
    note?: string;
    deleted?: 0 | 1;
  };
}
