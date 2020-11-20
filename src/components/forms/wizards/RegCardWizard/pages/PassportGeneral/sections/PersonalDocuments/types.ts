export interface SectionProps {
  documentTypes: { id: number; name: string }[];
  isLoadingDocuments: boolean;
}

export enum LABELS {
  PASSPORT = 'Паспорт',
  SERIAL = 'Серия',
  NUMBER = 'Номер',
  GIVEN_DATE = 'Дата выдачи',
  GIVEN_BY = 'Кем выдан',
}