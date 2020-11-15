import Patient from "../../../types/data/Patient";

export type TableProps = {
  patients: Patient[];
  isLoading: boolean;
  onPatientClick: (id: number) => void;
  currentPatient?: number;
};

export type ToolTipInfo = {
  fullName: string;
  lastChange: Date;
};
