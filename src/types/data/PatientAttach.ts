export default interface PatientAttach {
  id: number;
  type: number;
  lpu: number;
  unit: number;
  fromDate: string | null;
  endDate: string | null;
  detachmentReason: number | null;
  deleted: 0;
}
