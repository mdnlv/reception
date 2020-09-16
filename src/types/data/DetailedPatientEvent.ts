export default interface DetailedPatientEvent {
  id: number;
  type: string;
  assignDoc: string;
  executedDoc: string;
  state: string;
  startDate: Date;
  unit?: string;
}
