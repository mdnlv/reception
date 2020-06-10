
export interface PersonOutsideId {
    outsideSchema: string
    idRef: string
    date: Date
}

export default interface FormState {
    outsideIds: PersonOutsideId[]
}
