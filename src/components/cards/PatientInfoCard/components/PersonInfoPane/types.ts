import Patient from "../../../../../types/data/Patient";

export type PaneProps = {
  patient?: Partial<Patient>;
  policyTitle?: string;
};

export interface PatientPolicyPane {
  cmo?: string;
  from: number | Date;
  id: number;
  name: string;
  note?: string;
  number: string;
  serial: string;
  timeType?: string;
  to: number | Date ;
  type?: number | undefined;
}
