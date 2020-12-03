export interface ListOptionItem {
  id: number;
  name: string;
}

export interface SectionProps {
  policyKey: 'policyOms' | 'policyDms';
  policyTimeType: ListOptionItem[];
  policyType: ListOptionItem[];
}

export enum LABELS {
  FROM = 'С',
  TO = 'До',
  SERIAL = 'Серия',
  NUMBER = 'Номер',
  CMO = 'СМО',
  NAME = 'Название',
  NOTE = 'Примечание',
}
