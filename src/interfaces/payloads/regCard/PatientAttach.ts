export default interface PatientAttach {
  id?: number;
  LPU_id: number;
  attachType_id: number;
  begDate: string;
  orgStructure_id: number;
  deleted?: 0 | 1;
}

