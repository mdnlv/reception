import {Modify} from "../../../types/modify";

export interface PersonOutsideId {
    id?: number;
    outsideSchema: string;
    idRef: string;
    date: Date;
    deleted?: 0 | 1;
}

export interface PersonOutsideIdDeleted extends Modify<PersonOutsideId, {
    deleted?: 1;
}> {}

export default interface FormState {
    outsideIds: PersonOutsideId[];
    deleted: PersonOutsideIdDeleted[];
}
