import PatientContactType from "../../../../../../../../types/data/PatientContactType";

export interface SectionProps {
  contactTypes: PatientContactType[];
}

export enum LABELS {
  MAIN = 'Основной',
  TYPE = 'Тип',
  NUMBER = 'Номер',
  NOTE = 'Примечание',
}
