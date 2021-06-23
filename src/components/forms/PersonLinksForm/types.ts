import {Modify} from "../../../types/modify";

export interface PersonLink {
    id?: number;
    forwardRef: number | null;
    refName: string;
    patientLink: string;
    deleted?: 0;
}

export interface PersonLinkDeleted extends Modify<PersonLink, {
    deleted?: 1;
}> {}

export default interface FormState {
    directLinks: {
        directLinks: PersonLink[];
        deleted: PersonLinkDeleted[];
    }
    backLinks: {
        backLinks: PersonLink[];
        deleted: PersonLinkDeleted[];
    }
}
