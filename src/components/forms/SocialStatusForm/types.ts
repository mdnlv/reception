export interface SocialStatus {
  statusId?: number;
  statusType?: string;
  note?: string;
  fromDate: any;
  endDate: any;
  class?: string;
  docId?: number;
  docType?: string;
  serialFirst?: string;
  serialSecond?: string;
  number?: string;
  date?: any;
  givenBy?: string;
  deleted?: 0 | 1;
}

export interface FormState {
  socialStatus: SocialStatus[];
}
