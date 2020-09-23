export default interface RbKladrResponse {
  NAME: string;
  SOCR: string;
  CODE: string;
  INDEX: string;
  GNINMB: string;
  UNO: string;
  OCATD: string;
  STATUS: 0 | 1;
  parent: string;
  infis: string;
  prefix: string;
  isInsuranceArea: 0 | 1;
}
