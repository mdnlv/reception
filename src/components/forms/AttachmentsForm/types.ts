export interface PersonAttachment {
  id?: number;
  type: string;
  lpu: string;
  unit: string;
  fromDate: string;
  endDate: string;
  detachmentReason: string;
  deleted?: 0 | 1
}

export default interface FormState {
  attachments: PersonAttachment[];
}
