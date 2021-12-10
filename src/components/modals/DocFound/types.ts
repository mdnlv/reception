import {DocFound} from "../../../interfaces/responses/patients/patientDocSearch";

export interface ModalProps {
  isVisible: boolean;
  onClose(): void;
  data: DocFound[];
  onOk(item: DocFound): void;
  errorMessage: boolean;
}
