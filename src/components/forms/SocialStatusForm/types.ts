export interface SocialStatus {
  id?: number;
  type?: string;
  serialNumber?: string;
  number?: string;
  note?: string;
  fromDate: any;
  endDate: any;
  class?: string;
  deleted?: 0 | 1;
}

export interface TrustedDoc {
  type?: string;
  serialFirst?: string;
  serialSecond?: string;
  number?: string;
  date?: any;
  givenBy?: string;
  deleted?: 0 | 1;
}

export interface FormState {
  socialStatus: SocialStatus[];
  trustedDoc: TrustedDoc[] | [];
}
