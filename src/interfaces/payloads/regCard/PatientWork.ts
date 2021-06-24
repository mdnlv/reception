export default interface PatientWork {
  id?: number;
  org_id?: number;
  post?: string;
  stage?: number;
  freeInput?: string;
  client_work_hurt_info: {
    master_id?: number;
    id?: number;
    hurtType_id?: number;
    stage?: number;
  }[];
  client_work_hurt_factor_info: {
    master_id?: number;
    id?: number;
    factorType_id?: number;
  }[];
  deleted?: 0 | 1;
}

