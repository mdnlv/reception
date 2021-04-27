import {PassportPolicyType} from "../../forms/wizards/RegCardWizard/pages/PassportGeneral/types";

export interface ModalProps {
  isVisible: boolean;
  onClose?(): void;
  policy?: PassportPolicyType;
  onOk?(): void;
}
