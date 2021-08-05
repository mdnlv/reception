import { ActionData } from "../../elements/Schedule/types";

export interface FormState {
  data: ActionData | undefined;
  currentPatientMemo: any;
  setButtonDisabled(arg: boolean): void;
}
