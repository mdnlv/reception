import PersonAppointment from "../../../types/data/PersonAppointment";

export type PatientReceptionsProps = {
  onClose?(): void;
  isVisible: boolean;
  title: string;
  receptions: PersonAppointment[];
};
