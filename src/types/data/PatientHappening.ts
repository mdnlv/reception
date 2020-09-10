export default interface PatientHappening {
  id: number;
  startDate: Date;
  type: string;
  state: string;
  assignDoc: string;
  executedDoc: string;
}
