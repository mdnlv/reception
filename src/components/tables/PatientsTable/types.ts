import Patient from "../../../types/data/Patient";

export type TableProps = {
  patients: Patient[];
  isLoading: boolean;
  onChangeOffset: (value: number) => void;
};

