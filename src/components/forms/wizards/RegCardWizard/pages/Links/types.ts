export interface PersonLink {
  forwardRef: string;
  patientLink: string;
}

export default interface FormState {
  directLinks: PersonLink[];
  backLinks: PersonLink[];
}
