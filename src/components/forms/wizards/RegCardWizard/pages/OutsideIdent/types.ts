export interface PersonOutsideId {
  outsideSchema: string;
  idRef: string;
  date: Date;
}

export default interface FormState {
  outsideIds: PersonOutsideId[];
}

export const DROPDOWN_TITLE = 'Идентификаторы во внешних учетных системах';

export enum LABELS {
  OUTSIDE_IDENTS = 'Идентификаторы во внешних учетных системах',
  IDENTS = 'Идентификаторы',
  DATE = 'Дата подтверждения',
}
