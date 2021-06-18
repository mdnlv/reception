export interface EmploymentItem {
  organization: string;
  freeInput: string;
  position: string;
  experience: number;
  inn: string;
  ogrn: string;
  deleted?: 0 | 1;
  hazardHistory: EmploymentHazardItem[];
  hazardFactors: HazardFactorItem[];
}

export interface EmploymentHazardItem {
  hazardDescription: string;
  exp: number;
}

export interface HazardFactorItem {
  factor: string;
}

export default interface FormState {
  employments: EmploymentItem[];
  hazardHistory: EmploymentHazardItem[];
  hazard?: EmploymentHazardItem;
}
