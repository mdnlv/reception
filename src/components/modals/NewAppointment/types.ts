import Speciality from "../../../types/data/Speciality";
import { ActionData, ActionPost } from "../../elements/Schedule/types";

export interface AppointmentProps {
  data?: ActionData | undefined;
  visible: boolean;
  loading: boolean;
  setVisible(arg: boolean): void;
  actionTicket(data: ActionPost, id: number): void;
  postLoading: boolean;
  setResult(arg: Result): void;
  currentPatientMemo: any;
}

export interface Result {
  pacient: string,
  date: string,
  time: string,
  person: string,
  speciality: string
}