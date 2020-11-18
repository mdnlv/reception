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
  date: string;
  type?: string;
  givenBy: string;
  serial: string;
  number: string;
}

export interface FormState {
  socialStatus: SocialStatus[];
  trustedDoc: TrustedDoc[];
}
