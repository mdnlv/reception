export interface PersonLink {
  forwardRef: string;
  patientLink: string;
}

export default interface FormState {
  directLinks: PersonLink[];
  backLinks: PersonLink[];
}

export const DROPDOWN_TITLE = 'Связи';

export enum LABELS {
  DIRECT_LINK = 'Прямая связь',
  WITH_PATIENT = 'Связь с пациентом',
}
