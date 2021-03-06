export interface SectionProps {
  documentTypes: { id: number; name: string }[];
  isLoadingDocuments: boolean;
  error?: {
    passportType: string;
  }
}

export enum LABELS {
  PASSPORT = 'Тип документа',
  SERIAL = 'Серия',
  NUMBER = 'Номер',
  GIVEN_DATE = 'Дата выдачи',
  GIVEN_BY = 'Кем выдан',
}
