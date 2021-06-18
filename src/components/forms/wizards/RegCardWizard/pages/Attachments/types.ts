export interface PersonAttachment {
  id?: number;
  type: string;
  lpu: string;
  unit: string;
  fromDate: string;
  endDate: string;
  detachmentReason: string | null;
  deleted?: 0 | 1;
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
