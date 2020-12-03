export interface PersonAddHospitalization {
  code: string;
  fromDate: Date;
  endDate: Date;
  codeMo: string;
}

export default interface FormState {
  hospitalizations: PersonAddHospitalization[];
}

export const DROPDOWN_TITLE = 'Дополнительная диспансеризация';

export enum LABELS {
  CODE = 'Код',
  DATE = 'Дата начала',
  END_DATE = 'Дата окончания',
  CODE_MO = 'Код МО',
}
