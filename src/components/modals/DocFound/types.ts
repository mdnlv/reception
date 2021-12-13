import {DocFound} from "../../../interfaces/responses/patients/patientDocSearch";

export interface ModalResult {
  doc: DocFound | null; snils: string
}

export interface ModalProps {
  isVisible: boolean;
  onClose(): void;
  data: DocFound[];
  onOk(res: ModalResult): void;
  errorMessage: boolean;
  snils: string[];
}

export interface SnilsType {
  key: number;
  lastName: string;
  firstName: string;
  patrName: string;
  birthDate: string;
  snils: string;
}
