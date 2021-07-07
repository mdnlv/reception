export enum LABELS {
  INN = 'ИНН',
  OGRN = 'ОГРН',
  EMPLOYMENT = 'Занятость',
  ORG = 'Организация',
  POSITION = 'Должность',
  EXPERIENCE = 'Стаж',
}

export interface ListOptionProps {
  id: number;
  name: string;
  freeInput?: string;
  inn?: string;
  ogrn?: string;
}

export interface SectionProps {
  orgsList: ListOptionProps[];
  isLoadingOrgs: boolean;
}
