
export interface PersonAttachment{
    type: string
    lpu: string
    unit: string
    fromDate: Date
    endDate: Date
    detachmentReason: string
}

export default interface FormState {
    attachments: PersonAttachment[]
}
