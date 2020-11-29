export const DROPDOWN_TITLE = 'Документ, подтверждающий соц.статус';

export enum LABELS {
  SERIAL = 'Серия',
  NUMBER = 'Номер',
  DATE = 'Дата',
  GIVEN = 'Выдан',
}

export interface ListOptionProps {
  id: number;
  name: string;
}

export interface SectionProps {
  documentTypesList: ListOptionProps[];
}
