export interface PersonAttachment {
  type: string;
  lpu: string;
  unit: string;
  fromDate: Date;
  endDate: Date;
  detachmentReason: string;
}

export default interface FormState {
  attachments: PersonAttachment[];
}
export const DROPDOWN_TITLE = 'Прикрепление';

export enum LABELS {
  TYPE = 'Тип',
  LPU = 'ЛПУ',
  UNIT = 'Подразделение',
  ATTACHMENT_DATE = 'Дата прикрепления',
  DETACH_DATE = 'Дата открепления',
  DETACH_REASON = 'Причина открепления',
}
