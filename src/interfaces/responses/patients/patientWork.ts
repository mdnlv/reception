export default interface PatientWorkResponse {
  org_id: number;
  freeInput: string;
  post: string;
  stage: number;
  client_work_hurt_info: PatientWorkHurtInfo[];
  client_work_hurt_factor_info: PatientWorkHurtFactorInfo[];
}

interface PatientWorkHurtInfo {
  hurtType_id: number;
  stage: number;
}

interface PatientWorkHurtFactorInfo {
  factorType_id: number;
}
