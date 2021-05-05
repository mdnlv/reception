import {PassportPolicyType} from "../../forms/wizards/RegCardWizard/pages/PassportGeneral/types";
import {ListOptionItem} from "../../forms/PolicyAddForm/types";

export interface ModalProps {
  isVisible: boolean;
  onClose?(): void;
  policy?: PassportPolicyType;
  onOk?(): void;
  cmoType: ListOptionItem[];
}
