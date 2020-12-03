export const DROPDOWN_TITLE = 'Документ, подтверждающий соц.статус';

export enum LABELS {
  TYPE = 'Тип документа',
  SERIAL = 'Серия',
  NUMBER = 'Номер',
  DATE = 'Дата выдачи',
  GIVEN = 'Кем выдан',
}

export interface ListOptionProps {
  id: number;
  name: string;
}

export interface SectionProps {
  isLoadingDocuments: boolean;
  documentTypesList: ListOptionProps[];
}
