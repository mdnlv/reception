export const DROPDOWN_TITLE_HAZARD = 'Вредность';
export const DROPDOWN_TITLE_FACTOR = 'Фактор';

export enum LABELS {
  HAZARD = 'Вредность',
  EXPERIENCE = 'Опыт',
  FACTOR = 'Фактор',
}

export interface ListOptionProps {
  id: number;
  name: string;
}

export interface SectionProps {
  hurtTypesList: ListOptionProps[];
  hurtFactorTypesList: ListOptionProps[];
  isLoadingHurtTypes: boolean;
  isLoadingHurtFactorTypes: boolean;
  index: number;
}
