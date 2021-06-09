export interface PersonOutsideId {
    id?: number;
    outsideSchema: string;
    idRef: string;
    date: Date;
    deleted?: 0 | 1;
}

export default interface FormState {
    outsideIds: PersonOutsideId[];
}
