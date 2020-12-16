export interface SocialStatus {
  type?: string;
  serialNumber?: string;
  number?: string;
  note?: string;
  fromDate: any;
  endDate: any;
  class?: string;
}

export interface TrustedDoc {
  type?: string;
  serialFirst?: string;
  serialSecond?: string;
  number?: string;
  date?: any;
  givenBy?: string;
}

export interface FormState {
  socialStatus: SocialStatus[];
  trustedDoc: TrustedDoc[] | {};
}
