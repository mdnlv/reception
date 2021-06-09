export interface EmploymentItem {
  id?: number;
  organization: string;
  freeInput: string;
  position: string;
  experience: number;
  inn?: string;
  ogrn?: string;
  deleted?: 1 | 0;
}

export interface EmploymentHazardItem {
  hazardDescription: string;
  hazardExp: number;
  factor: string;
  organization?: string;
  post?: string;
  exp?: number;
}

export default interface FormState {
  employment: EmploymentItem[];
  hazardHistory: EmploymentHazardItem[];
}
