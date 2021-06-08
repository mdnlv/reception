export interface PersonOutsideId {
    outsideSchema: string;
    idRef: string;
    date: Date;
    deleted?: 0 | 1;
}

export default interface FormState {
    outsideIds: PersonOutsideId[];
}
