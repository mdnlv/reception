export interface EtcItem {
  infoAboutMedOrg?: string;
  date?: Date;
  note?: string;
}

export default interface FormState {
  items: EtcItem[];
}

export const DROPDOWN_TITLE = 'Прочее';

export enum LABELS {
  NOTE = 'Примечание',
}
