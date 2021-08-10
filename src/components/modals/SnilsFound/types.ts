import {SnilsFound} from "../../forms/wizards/RegCardWizard/pages/PassportGeneral/types";

export interface ModalProps {
  isVisible: boolean;
  onClose(): void;
  data: SnilsFound[];
  onOk(value: string): void;
}
