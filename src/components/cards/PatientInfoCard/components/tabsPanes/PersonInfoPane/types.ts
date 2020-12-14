import Patient from "../../../../../../types/data/Patient";

export type PaneProps = {
  patient?: Partial<Patient>;
  policyTitle?: string;
};

export interface PatientPolicyPane {
  cmo: string;
  from: string;
  id: number;
  name: string;
  note: string;
  number: string;
  serial: string;
  timeType: string;
  to: string;
  type: string;
}
