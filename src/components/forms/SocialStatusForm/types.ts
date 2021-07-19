import {Modify} from "../../../types/modify";

export interface SocialStatus {
  [key: string]: any;
  id?: number;
  statusType?: string;
  note?: string;
  fromDate: any;
  endDate: any;
  class?: string;
  docId?: number | null;
  docType?: string;
  serialFirst?: string;
  serialSecond?: string;
  number?: string;
  date?: any;
  givenBy?: string;
  deleted?: 0;
}

export interface SocialStatusDeleted extends Modify<SocialStatus, {
  deleted?: 1;
}> {}

export interface FormState {
  socialStatus: SocialStatus[];
  deleted: SocialStatusDeleted[];
}
