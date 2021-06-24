export default interface PatientContact {
  id?: number;
  contactType_id: number;
  contact: string;
  isPrimary: 0 | 1;
  notes: string;
  deleted?: 0 | 1;
}

