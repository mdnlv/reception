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
  inn?: string;
  ogrn?: string;
  infisCode?: string;
  smoShort?: string;
  attachList?: PolicyAttachesType[];
}

export interface PassportAddressType {
  [key: string]: any;
  id?: number;
  addressId?: number;
  addressHouseId?: number;
  houseId?: number;
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

export interface PassportInfoType {
  id?: number | null;
  passportType: string;
  serialFirst?: string;
  serialSecond: string;
  number?: string;
  fromDate?: any;
  givenBy?: string;
  serial?:string;
  deleted?: 0;
}

export interface PassportInfoTypeDeleted extends Modify<PassportInfoType, {
  deleted?: 1;
}> {}

export default interface FormState {
  passportInfo: {
    documents: PassportInfoType[];
    documentsDeleted: PassportInfoTypeDeleted[];
    addressRegistration: PassportAddressType;
    documentedAddress: PassportAddressType;
  };
  contacts: {
    contacts: PassportContactType[];
    deleted: PassportContactTypeDeleted[];
  };
  policyOms: PassportPolicyType;
  policyDms: PassportPolicyType;
}
