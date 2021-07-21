import {Modify} from "../../../types/modify";
import {PassportInfoType} from "../wizards/RegCardWizard/pages/PassportGeneral/types";

export interface SocialStatus {
  [key: string]: any;
  id?: number;
  statusType?: string;
  note?: string;
  fromDate: any;
  endDate: any;
  class?: string;
  document: PassportInfoType;
}

export interface SocialStatusDeleted extends Modify<SocialStatus, {
  deleted?: 1;
}> {}

export interface FormState {
  socialStatus: SocialStatus[];
  deleted: SocialStatusDeleted[];
}
