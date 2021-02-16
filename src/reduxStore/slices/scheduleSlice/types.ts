interface SchedulePatientInfo {
  action_id: number;
  clientInfo: {
    id: number;
    createDatetime: string | null;
    createPerson_id: number | null;
    modifyDatetime: string;
    modifyPerson_id: number;
    attendingPerson_id: number;
    deleted: number;
    lastName: string;
    firstName: string;
    patrName: string;
    birthDate: string;
    birthTime: string | null;
    sex: number;
    SNILS: string;
    bloodType_id: number | null;
    bloodDate: string | null;
    bloodNotes: string;
    growth: string;
    weight: string;
    embryonalPeriodWeek: string;
    birthPlace: string;
    chronicalMKB: string;
    diagNames: string;
    chartBeginDate: string;
    rbInfoSource_id: null | number;
    notes: string;
    IIN: string;
    isConfirmSendingData: number;
    isUnconscious: number;
    filial: number;
    dataTransferConfirmationDate: string | null;
  }
}

export interface ScheduleItem {
  action_id: number;
  person_id: string;
  year: string;
  month: string;
  schedule: {
    begTime: string;
    endTime: string;
    planned: number;
    receptionTypeCode: string;
    availableForExternalSystem: number;
    items: {
      [name: string]: SchedulePatientInfo
    }
  };
}
