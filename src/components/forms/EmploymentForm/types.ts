export interface EmploymentItem {
  organization: string;
  position: string;
  experience: number;
  inn?: string;
  ogrn?: string;
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
