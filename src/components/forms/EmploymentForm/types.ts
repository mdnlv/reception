import {Modify} from "../../../types/modify";

export interface EmploymentItem {
  [key: string]: any;
  id?: number;
  organization: string;
  freeInput: string;
  position: string;
  experience: number;
  inn?: string;
  ogrn?: string;
  deleted?: 0;
  hazardHistory: EmploymentHazardItem[];
  hazardFactors: HazardFactorItem[];
}

export interface EmploymentItemDeleted extends Modify<EmploymentItem, {
  deleted?: 1;
}> {}

export interface EmploymentHazardItem {
  masterId?: number;
  id?: number;
  hazardDescription: string;
  hazardExp: number;
}

export interface HazardFactorItem {
  masterId?: number;
  id?: number;
  factor: string;
}

export default interface FormState {
  employment: EmploymentItem[];
  deleted: EmploymentItemDeleted[];
}
