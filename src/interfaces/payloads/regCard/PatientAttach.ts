export default interface PatientAttach {
  id?: number;
  LPU_id: number;
  attachType_id: number;
  begDate: string;
  orgStructure_id: number;
  detachment_id: number | null;
  deleted?: 0 | 1;
}

