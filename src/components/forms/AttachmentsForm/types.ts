import {Modify} from "../../../types/modify";

export interface PersonAttachment {
  id?: number;
  type: string;
  lpu: string;
  unit: string;
  fromDate: string;
  endDate: string;
  detachmentReason: string | null;
  deleted?: 0;
}

export interface PersonAttachmentDeleted extends Modify<PersonAttachment, {
  deleted?: 1;
}> {}

export default interface FormState {
  attachments: PersonAttachment[];
  deleted: PersonAttachmentDeleted[];
}
