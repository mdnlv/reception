export interface PersonAttachment {
  type: string;
  lpu: string;
  unit: string;
  fromDate: string;
  endDate: string;
  detachmentReason: string;
}

export default interface FormState {
  attachments: PersonAttachment[];
}
