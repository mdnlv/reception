export default interface PatientContact {
  id: number;
  contactTypeId: number;
  note?: string;
  contact: string;
  isPrimary: number;
}
