export interface PersonHospitalization {
  serialNumber: string;
  lpu: string;
  hospitalizationReason: string;
  arrivalDate: Date;
  departureDate: Date;
  mkb: string;
  diagnosis: string;
}

export default interface FormState {
  outsideHospitalization: PersonHospitalization[];
}

export const DROPDOWN_TITLE = 'Госпитализация в другие ЛПУ';

export enum LABELS {
  NUMBER = '№ п/п',
  LPU = 'Наименование ЛПУ',
  AIM = 'Цель госпитализации',
  DATE = 'Дата поступления',
  END_DATE = 'Дата выбытия',
  MKB = 'МКБ',
  DIAGNOSIS = 'Клинический диагноз',
}
