import {toServerFormat} from "../../../utils/date/toServerFormat";

export default interface PatientDocument {
  id?: number;
  deleted?: 0 | 1;
  documentType_id: number;
  serial: string;
  number: string;
  date: string;
  origin: string;
  endDate: string;
}
