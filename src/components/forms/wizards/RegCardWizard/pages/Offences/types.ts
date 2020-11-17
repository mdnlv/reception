export interface PersonOffence {
  article: string;
  court: string;
  number: number;
  startDate: Date;
  nextCourtDate: Date;
  note: string;
  resolution: string;
}

export default interface OffencesForm {
  offences: PersonOffence[];
}

export const DROPDOWN_TITLE = 'Правонарушения';

export enum LABELS {
  ARTICLE = 'Статья УК',
  COURT = 'Суд',
  NUMBER = '№ дела',
  DATE = 'Дата постановления',
  DECREE = 'Постановление',
  DOCTOR = 'Врач',
  NEXT_COURT = 'Дата очередного обращения в суд',
  NOTE = 'Примечание',
}
