import Patient from "../../../types/data/Patient";
import PersonAppointment from "../../../types/data/PersonAppointment";

export type CardProps = {
  patient?: Patient;
  policyTitle?: string;
  isLoading: boolean;
  appointments?: PersonAppointment[];
};
