export interface SocialStatus {
  type?: string;
  serialNumber: string;
  number: string;
  note?: string;
  fromDate: string;
  endDate: string;
  class?: string;
}

export interface TrustedDoc {
  type?: string;
  serialFirst?: string;
  serialSecond?: string;
  number?: string;
  date?: string;
  givenBy?: string;
}

export interface FormState {
  socialStatus: SocialStatus[];
  trustedDoc: TrustedDoc[] | {};
}
