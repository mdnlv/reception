export default interface PatientRelation {
  id?: number;
  relativeType_id: number;
  relative_id: number | null;
  client_id?: number | null;
  deleted: 0 | 1;
}

