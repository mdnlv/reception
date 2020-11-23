import Patient from "../../../types/data/Patient";
import PatientEvent from "../../../types/data/PatientEvent";

export default interface StateType {
  currentPatient?: Patient | any;
  loading: {
    patient: boolean;
    events: boolean;
  };
  events: PatientEvent[];
}
