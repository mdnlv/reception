export interface EmploymentItem {
  organization: string;
  freeInput: string;
  position: string;
  experience: number;
  inn: string;
  ogrn: string;
}

export interface EmploymentHazardItem {
  hazardDescription: string;
  exp: number;
  factor: string;
}

export default interface FormState {
  employments: EmploymentItem[];
  hazardHistory: EmploymentHazardItem[];
  hazard?: EmploymentHazardItem;
}
