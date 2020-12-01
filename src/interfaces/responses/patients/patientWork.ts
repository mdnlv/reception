export default interface PatientWorkResponse {
  org_id: number;
  freeInput: string;
  post: string;
  stage: number;
  client_work_hurt_info: PatientWorkHurtInfo[];
}

interface PatientWorkHurtInfo {
  hurtType_id: number;
  stage: number;
}
