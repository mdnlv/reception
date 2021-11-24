export const DROPDOWN_TITLE = 'Соц.статус';

export enum LABELS {
  CLASS = 'Класс',
  STATUS_TYPE = 'Тип',
  START_DATE = 'Дата начала',
  END_DATE = 'Дата окончания',
  NOTE = 'Примечание',
  DOC_TYPE = 'Тип документа',
  SERIAL = 'Серия',
  NUMBER = 'Номер',
  DATE = 'Дата выдачи',
  GIVEN = 'Кем выдан',
}

export interface ListOptionProps {
  id: number;
  name: string;
  classId?: number;
}

export interface StatusProps {
  socialTypesList: ListOptionProps[];
  socialClassesList: ListOptionProps[];
  documentTypesList: ListOptionProps[];
  isLoadingDocuments: boolean;
  isLoadingClasses: boolean;
  isLoadingTypes: boolean;
}
