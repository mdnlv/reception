export default interface PatientWorkResponse {
  id: number;
  org_id: number;
  freeInput: string;
  post: string;
  stage: number;
  client_work_hurt_info: PatientWorkHurtInfo[];
  client_work_hurt_factor_info: PatientWorkHurtFactorInfo[];
  deleted: 0;
}

interface PatientWorkHurtInfo {
  id: number;
  master_id: number;
  hurtType_id: number;
  stage: number;
}

interface PatientWorkHurtFactorInfo {
  id: number;
  master_id: number;
  factorType_id: number;
}
