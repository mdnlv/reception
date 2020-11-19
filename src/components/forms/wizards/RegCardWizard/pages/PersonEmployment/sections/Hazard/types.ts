export const DROPDOWN_TITLE = 'Вредность';

export enum LABELS {
  HAZARD = 'Вредность',
  EXPERIENCE = 'Опыт',
  FACTOR = 'Фактор',
  ORG = 'Организация',
  POSITION = 'Должность',
}

export interface ListOptionProps {
  id: number;
  name: string;
}

export interface SectionProps {
  hurtTypesList: ListOptionProps[];
  hurtFactorTypesList: ListOptionProps[];
  orgsList: ListOptionProps[];
  isLoadingOrgs: boolean;
  isLoadingHurtTypes: boolean;
  isLoadingHurtFactorTypes: boolean;
}
