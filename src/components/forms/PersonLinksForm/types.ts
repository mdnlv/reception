export interface PersonLink {
    id?: number;
    forwardRef: string
    patientLink: string;
    deleted?: 0 | 1;
}

export default interface FormState {
    directLinks: PersonLink[],
    backLinks: PersonLink[]
}
