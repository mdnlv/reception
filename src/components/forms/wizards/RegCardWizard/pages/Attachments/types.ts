export interface PersonAttachment {
  id?: number;
  type: string;
  lpu: string;
  unit: number | string;
  fromDate: string;
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
  ATTACHMENT_DATE = 'Дата начала',
  DETACH_DATE = 'Дата окончания',
  DETACH_REASON = 'Причина открепления',
}
