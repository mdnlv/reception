export const DROPDOWN_TITLE = 'Соц.статус';

export enum LABELS {
  CLASS = 'Класс',
  TYPE = 'Тип',
  START_DATE = 'Дата начала',
  END_DATE = 'Дата окончания',
  NOTE = 'Примечание',
}

export interface ListOptionProps {
  id: number;
  name: string;
  classId: number;
}

export interface StatusProps {
  socialTypesList: ListOptionProps[];
  socialClassesList: ListOptionProps[];
  isLoadingClasses: boolean;
  isLoadingTypes: boolean;
}
