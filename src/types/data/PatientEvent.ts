export default interface PatientEvent {
  id: number;
  createDatetime: string | null;
  createPersonId: number | null;
  eventTypeId: number;
  setDate?: Date;
  setPersonId: number | null;
  note: string;
}
