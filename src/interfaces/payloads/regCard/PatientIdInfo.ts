export default interface PatientIdInfo {
  id?: number;
  accountingSystem_id: number;
  checkDate: string;
  identifier: string;
  deleted?: 0 | 1;
}

